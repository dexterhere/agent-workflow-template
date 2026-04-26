# Changelog

All notable changes to this project will be documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.1.0] — 2026-04-26

### Added

- `bin/index.js` — interactive CLI scaffolder (`npx create-agent-workflow-template`)
  - Zero external npm dependencies — only Node.js built-in modules (`fs`, `path`, `readline`)
  - Interactive prompts: project name, organization, description, package manager, catalog selection, developer role
  - Selective catalog copy — only copies catalog files chosen by the user; `general.md` and `cross-cutting.md` always included
  - Profile filtering — removes references to skipped catalogs from the generated `profile.md`
  - Auto-updates `.gitignore` to exclude `.agent/profile.md` when a git repo is detected
  - Path traversal protection on every file write
  - Input sanitization (strips null bytes and control characters)
  - Explicit `0o644` file permissions — no executable bits
  - `NO_COLOR` environment variable support ([no-color.org](https://no-color.org))
  - `--help` and `--version` flags
  - Graceful `SIGINT` (Ctrl+C) handling
- `package.json` — npm package config (`name: create-agent-workflow`, no `scripts`, no `dependencies`)
- Security section in root `README.md` documenting all safety guarantees
- `npx create-agent-workflow` listed as the recommended quick-start option in `README.md`

---

## [1.0.0] — 2026-04-26

### Added

- `template/AGENT.md` — agent entrypoint with project facts, sprint tracking, repo structure, tech stack, absolute rules, and session startup checklist
- `template/agent.config.json` — machine-readable project metadata (project, sprint, repository, stack, team, infrastructure)
- `template/catalog/general.md` — always-loaded base rules: package manager discipline, type safety, commit messages, branch naming, scope discipline, stop-and-ask protocol, sprint staleness check
- `template/catalog/backend.md` — API and server-side rules
- `template/catalog/frontend.md` — web UI rules
- `template/catalog/database.md` — schema, migration, and query rules
- `template/catalog/devops.md` — CI/CD, deployment, and infrastructure rules
- `template/catalog/mobile.md` — mobile app rules
- `template/catalog/domain.md` — project-specific domain rules template
- `template/catalog/stakeholders.md` — user roles and business flow rules template
- `template/catalog/observability.md` — logging, metrics, and error tracking rules
- `template/catalog/cross-cutting.md` — platform-wide rules spanning multiple domains
- `template/context/stack.json` — tech stack structured context
- `template/context/modules.json` — module registry
- `template/context/decisions.json` — locked architectural decisions
- `template/context/boundaries.json` — protected paths agents must not modify without approval
- `template/context/team.json` — team structure template
- `template/context/active-tasks.json` — current in-flight work tracker
- `template/prompts/new-feature.md` — reusable prompt for new feature work
- `template/prompts/bug-fix.md` — reusable prompt for bug investigations
- `template/prompts/db-migration.md` — reusable prompt for database migrations
- `template/prompts/api-endpoint.md` — reusable prompt for new API endpoints
- `template/prompts/component.md` — reusable prompt for UI component work
- `template/prompts/review.md` — reusable prompt for code review sessions
- `template/prompts/sprint-planning.md` — reusable prompt for sprint planning
- `template/prompts/propose-rule.md` — reusable prompt for proposing new catalog rules
- `template/templates/sprint-update.md` — sprint boundary checklist template
- `template/profile.templates/backend-dev.md` — role profile for backend developers
- `template/profile.templates/frontend-dev.md` — role profile for frontend developers
- `template/profile.templates/devops.md` — role profile for DevOps engineers
- `template/profile.templates/fullstack.md` — role profile for fullstack developers
- `template/setup.md` — step-by-step setup guide for new project teams
- `template/README.md` — template-level documentation and catalog checklist
- Root `README.md` — public landing page
- Root `LICENSE` — MIT
- Root `CHANGELOG.md` — this file

[1.1.0]: https://github.com/dexterhere/agent-workflow-template/releases/tag/1.1.0
[1.0.0]: https://github.com/dexterhere/agent-workflow-template/releases/tag/1.0.0
