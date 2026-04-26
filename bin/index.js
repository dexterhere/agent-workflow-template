#!/usr/bin/env node
'use strict';

// Zero external dependencies — only Node.js built-in modules.
// This is intentional: no supply chain attack surface.
const fs       = require('node:fs');
const path     = require('node:path');
const readline = require('node:readline');

// ─── Constants ────────────────────────────────────────────────────────────────

const TEMPLATE_DIR   = path.join(__dirname, '..', 'template');
const ALWAYS_CATALOGS = new Set(['general.md', 'cross-cutting.md']);

let PKG_VERSION = '1.1.0';
try { PKG_VERSION = require('../package.json').version; } catch {}

// ─── Colors ───────────────────────────────────────────────────────────────────
// Respects the NO_COLOR env var (https://no-color.org/) and falls back to
// plain text when stdout is not a TTY (e.g. piped output, CI logs).

const USE_COLOR = !process.env.NO_COLOR && !!process.stdout.isTTY;
const esc = code => USE_COLOR ? `\x1b[${code}m` : '';

const fmt = {
  bold:   s => `${esc('1')}${s}${esc('0')}`,
  dim:    s => `${esc('2')}${s}${esc('0')}`,
  red:    s => `${esc('31')}${s}${esc('0')}`,
  green:  s => `${esc('32')}${s}${esc('0')}`,
  yellow: s => `${esc('33')}${s}${esc('0')}`,
  cyan:   s => `${esc('36')}${s}${esc('0')}`,
};

const println = (s = '') => process.stdout.write(s + '\n');

// ─── Security helpers ─────────────────────────────────────────────────────────

/**
 * Strip null bytes and C0/C1 control characters from user input.
 * Preserves printable ASCII, Unicode letters/symbols, tab, and newline.
 */
function sanitize(input) {
  if (typeof input !== 'string') return '';
  return input
    .replace(/[\x00-\x08\x0b\x0c\x0e-\x1f\x7f-\x9f]/g, '')
    .trim();
}

/**
 * Verify that `target` resolves inside `base`. Throws if it would escape.
 * Guards every file-write path against directory traversal.
 */
function assertSafePath(base, target) {
  const rb = path.resolve(base);
  const rt = path.resolve(target);
  if (rt !== rb && !rt.startsWith(rb + path.sep)) {
    throw new Error(`Security: path traversal rejected — ${target}`);
  }
}

// ─── Readline helpers ─────────────────────────────────────────────────────────

function createRL() {
  return readline.createInterface({ input: process.stdin, output: process.stdout });
}

function ask(rl, prompt, defaultVal = '') {
  return new Promise(resolve => {
    const hint = defaultVal ? fmt.dim(` (${defaultVal})`) : '';
    rl.question(`  ${prompt}${hint}: `, raw => {
      resolve(sanitize(raw) || defaultVal);
    });
  });
}

async function choose(rl, question, options, defaultIdx = 0) {
  println(`\n  ${fmt.bold(question)}`);
  options.forEach((o, i) => {
    const bullet = i === defaultIdx ? fmt.cyan('◉') : fmt.dim('○');
    println(`    ${bullet}  ${i + 1}. ${o.label}`);
  });
  const raw = await ask(rl, 'Select', String(defaultIdx + 1));
  const idx = parseInt(sanitize(raw), 10) - 1;
  return options[idx >= 0 && idx < options.length ? idx : defaultIdx];
}

async function multiChoose(rl, question, options) {
  println(`\n  ${fmt.bold(question)}`);
  println(fmt.dim('  Numbers separated by spaces, "all", or Enter to skip.') + '\n');
  options.forEach((o, i) => {
    const n = fmt.cyan(String(i + 1).padStart(2));
    println(`    ${n}.  ${o.label.padEnd(16)} ${fmt.dim(o.hint)}`);
  });
  const raw = await ask(rl, '\n  Selection');
  const val = raw.trim().toLowerCase();

  if (!val || val === 'none') return [];
  if (val === 'all') return [...options];

  const seen = new Set();
  return val
    .split(/[\s,]+/)
    .map(n => parseInt(n, 10) - 1)
    .filter(i => Number.isInteger(i) && i >= 0 && i < options.length && !seen.has(i) && seen.add(i))
    .map(i => options[i]);
}

// ─── File operations ──────────────────────────────────────────────────────────

// Use split/join instead of regex so placeholder strings with special chars
// (brackets, etc.) are treated as literals, not patterns.
function applyReplacements(content, map) {
  let out = content;
  for (const [key, val] of Object.entries(map)) {
    out = out.split(key).join(val);
  }
  return out;
}

function writeFileSafe(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  // 0o644: owner rw, group/other r — never executable
  fs.writeFileSync(filePath, content, { encoding: 'utf8', mode: 0o644 });
}

function copyFile(src, dest, replacements) {
  writeFileSafe(dest, applyReplacements(fs.readFileSync(src, 'utf8'), replacements));
}

function copyDirTree(src, dest, replacements, root, log, prefix = '') {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    assertSafePath(root, d);
    if (entry.isDirectory()) {
      copyDirTree(s, d, replacements, root, log, `${prefix}${entry.name}/`);
    } else {
      copyFile(s, d, replacements);
      log.push({ status: 'ok', path: `${prefix}${entry.name}` });
    }
  }
}

// ─── Profile filtering ────────────────────────────────────────────────────────
// Remove lines referencing catalog files that were not included, so the
// generated profile.md doesn't point to files that don't exist.

function filterProfileContent(content, keepCatalogs) {
  return content
    .split('\n')
    .filter(line => {
      const m = line.match(/`catalog\/([\w-]+)\.md`/);
      return !m || keepCatalogs.has(`${m[1]}.md`);
    })
    .join('\n');
}

// ─── Git helpers ──────────────────────────────────────────────────────────────

function findGitRoot(dir) {
  let cur = dir;
  for (;;) {
    if (fs.existsSync(path.join(cur, '.git'))) return cur;
    const parent = path.dirname(cur);
    if (parent === cur) return null;
    cur = parent;
  }
}

function addGitignoreEntry(gitRoot, entry) {
  const p = path.join(gitRoot, '.gitignore');
  const existing = fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : '';
  if (existing.split('\n').some(l => l.trim() === entry)) return false;
  fs.appendFileSync(
    p,
    `\n# Agent workflow — personal role profile (do not commit)\n${entry}\n`,
    'utf8'
  );
  return true;
}

// ─── Scaffold ─────────────────────────────────────────────────────────────────

function scaffold({ targetDir, selectedCatalogs, profileKey, replacements }) {
  const log = [];
  const keepCatalogs = new Set([
    ...ALWAYS_CATALOGS,
    ...selectedCatalogs.map(c => `${c.value}.md`),
  ]);
  const allCatalogFiles = fs.readdirSync(path.join(TEMPLATE_DIR, 'catalog'));

  for (const entry of fs.readdirSync(TEMPLATE_DIR, { withFileTypes: true })) {
    const src  = path.join(TEMPLATE_DIR, entry.name);
    const dest = path.join(targetDir, entry.name);
    assertSafePath(targetDir, dest);

    // catalog/ — copy only selected + always-included files
    if (entry.name === 'catalog' && entry.isDirectory()) {
      fs.mkdirSync(dest, { recursive: true });
      for (const f of allCatalogFiles) {
        const fd = path.join(dest, f);
        assertSafePath(targetDir, fd);
        if (!keepCatalogs.has(f)) {
          log.push({ status: 'skip', path: `catalog/${f}` });
          continue;
        }
        copyFile(path.join(src, f), fd, replacements);
        log.push({ status: 'ok', path: `catalog/${f}` });
      }
      continue;
    }

    // Directories (including profile.templates/) — copy whole tree
    if (entry.isDirectory()) {
      copyDirTree(src, dest, replacements, targetDir, log, `${entry.name}/`);
      continue;
    }

    // Regular files at template root
    copyFile(src, dest, replacements);
    log.push({ status: 'ok', path: entry.name });
  }

  // Write profile.md — chosen role template, filtered to selected catalogs only
  const profileSrc  = path.join(TEMPLATE_DIR, 'profile.templates', `${profileKey}.md`);
  const profileDest = path.join(targetDir, 'profile.md');
  assertSafePath(targetDir, profileDest);
  if (fs.existsSync(profileSrc)) {
    const raw      = applyReplacements(fs.readFileSync(profileSrc, 'utf8'), replacements);
    const filtered = filterProfileContent(raw, keepCatalogs);
    writeFileSafe(profileDest, filtered);
    log.push({ status: 'profile', path: 'profile.md' });
  }

  return log;
}

// ─── --help / --version ───────────────────────────────────────────────────────

const ARGS = process.argv.slice(2);

if (ARGS.includes('-v') || ARGS.includes('--version')) {
  println(PKG_VERSION);
  process.exit(0);
}

if (ARGS.includes('-h') || ARGS.includes('--help')) {
  println('');
  println(`  ${fmt.bold('create-agent-workflow')} ${fmt.dim('v' + PKG_VERSION)}`);
  println('');
  println('  Scaffold a .agent/ workflow directory for AI-assisted software teams.');
  println('');
  println(fmt.bold('  Usage'));
  println('    npx create-agent-workflow');
  println('');
  println(fmt.bold('  Options'));
  println('    -h, --help       Show this message');
  println('    -v, --version    Print version');
  println('');
  println(fmt.bold('  Environment'));
  println('    NO_COLOR=1       Disable colored output');
  println('');
  println(fmt.dim('  https://github.com/dexterhere/agent-workflow-template'));
  println('');
  process.exit(0);
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  // Guard: Node.js version
  if (parseInt(process.versions.node, 10) < 18) {
    println(fmt.red(`\n  ✗  Node.js 18+ required (found ${process.versions.node}).\n`));
    process.exit(1);
  }

  // Guard: template must be present (detects corrupted npx cache)
  if (!fs.existsSync(TEMPLATE_DIR)) {
    println(fmt.red('\n  ✗  Template directory missing — package may be corrupted.'));
    println(fmt.dim('     Clear the cache and retry: npx clear-npx-cache\n'));
    process.exit(1);
  }

  // Guard: must run in an interactive terminal
  if (!process.stdin.isTTY) {
    println(fmt.red('\n  ✗  Interactive terminal required.'));
    println(fmt.dim('     Run directly: npx create-agent-workflow\n'));
    process.exit(1);
  }

  // Ctrl+C exits cleanly without a stack trace
  process.on('SIGINT', () => {
    println(fmt.yellow('\n\n  Cancelled. No files were written.\n'));
    process.exit(0);
  });

  const cwd       = process.cwd();
  const targetDir = path.join(cwd, '.agent');

  println('');
  println(`  ${fmt.bold(fmt.cyan('create-agent-workflow'))} ${fmt.dim('v' + PKG_VERSION)}`);
  println(fmt.dim('  Scaffold a .agent/ workflow directory for your project'));
  println('');

  if (fs.existsSync(targetDir)) {
    println(fmt.yellow('  ⚠  .agent/ already exists — existing files will be overwritten.'));
    println('');
  }

  const rl = createRL();

  try {
    // ── Questions ──────────────────────────────────────────────────────────────

    println(fmt.bold('  Project details\n'));

    const projectName = await ask(rl, 'Project name',             path.basename(cwd));
    const orgName     = await ask(rl, 'Organization',             '');
    const description = await ask(rl, 'One-sentence description', '');

    const pkgManager = await choose(rl, 'Package manager', [
      { label: 'npm',  value: 'npm'  },
      { label: 'pnpm', value: 'pnpm' },
      { label: 'yarn', value: 'yarn' },
      { label: 'bun',  value: 'bun'  },
    ]);

    const catalogOptions = [
      { label: 'backend',       value: 'backend',       hint: 'API / server-side work'          },
      { label: 'frontend',      value: 'frontend',      hint: 'Web UI work'                     },
      { label: 'database',      value: 'database',      hint: 'Schema, migrations, queries'     },
      { label: 'devops',        value: 'devops',        hint: 'CI/CD, deployment, infra'        },
      { label: 'mobile',        value: 'mobile',        hint: 'Mobile app work'                 },
      { label: 'domain',        value: 'domain',        hint: 'Domain-specific business rules'  },
      { label: 'stakeholders',  value: 'stakeholders',  hint: 'User roles / business flows'     },
      { label: 'observability', value: 'observability', hint: 'Logging, metrics, error tracking'},
    ];
    const selectedCatalogs = await multiChoose(
      rl, 'Which catalog files does your project need?', catalogOptions
    );

    const role = await choose(rl, 'Your primary role (sets up your local profile.md)', [
      { label: 'Fullstack developer', value: 'fullstack'    },
      { label: 'Backend developer',   value: 'backend-dev'  },
      { label: 'Frontend developer',  value: 'frontend-dev' },
      { label: 'DevOps engineer',     value: 'devops'       },
    ]);

    rl.close();

    // ── Build replacements — only from non-empty user input ────────────────────

    const replacements = {
      ...(projectName      && { '[PROJECT_NAME]':                     projectName         }),
      ...(orgName          && { '[ORGANIZATION_NAME]':                orgName             }),
      ...(description      && { '[ONE_SENTENCE_PROJECT_DESCRIPTION]': description         }),
      ...(pkgManager.value && { '[PACKAGE_MANAGER]':                  pkgManager.value    }),
    };

    // ── Scaffold ───────────────────────────────────────────────────────────────

    println('');
    println(fmt.bold('  Scaffolding .agent/ ...\n'));

    const results = scaffold({ targetDir, selectedCatalogs, profileKey: role.value, replacements });

    for (const r of results) {
      if      (r.status === 'ok')      println(`  ${fmt.green('✓')}  ${r.path}`);
      else if (r.status === 'profile') println(`  ${fmt.green('✓')}  ${r.path} ${fmt.dim('(local only)')}`);
      else if (r.status === 'skip')    println(`  ${fmt.dim('–')}  ${fmt.dim(r.path + ' (skipped)')}`);
    }

    // ── .gitignore ─────────────────────────────────────────────────────────────

    const gitRoot = findGitRoot(cwd);
    if (gitRoot) {
      const updated = addGitignoreEntry(gitRoot, '.agent/profile.md');
      if (updated) {
        println(`\n  ${fmt.green('✓')}  .gitignore updated — .agent/profile.md will not be committed`);
      }
    } else {
      println(`\n  ${fmt.yellow('!')}  No git repo detected. Add .agent/profile.md to your .gitignore manually.`);
    }

    // ── Next steps ─────────────────────────────────────────────────────────────

    println('');
    println(fmt.bold(fmt.green('  ✓  Done!\n')));
    println(fmt.bold('  Next steps:\n'));
    println(`  1.  Fill remaining placeholders in ${fmt.cyan('.agent/AGENT.md')}`);
    println(`  2.  Fill ${fmt.cyan('.agent/agent.config.json')} with your project metadata`);
    println(`  3.  Fill ${fmt.cyan('.agent/context/')} files — decisions, boundaries, stack, team`);
    println(`  4.  Read ${fmt.cyan('.agent/setup.md')} for the full walkthrough`);
    println(`  5.  Commit everything ${fmt.bold('except')} .agent/profile.md`);
    println('');
    println(fmt.dim('  Guide: https://github.com/dexterhere/agent-workflow-template'));
    println('');

  } catch (err) {
    try { rl.close(); } catch {}
    println(fmt.red(`\n  ✗  ${err.message}\n`));
    process.exit(1);
  }
}

main();
