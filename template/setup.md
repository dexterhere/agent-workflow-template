# Agent Workflow Setup Guide

This guide walks a new project team through setting up the `.agent/` directory
from this template. Read it once before touching any files.

---

## What this system does

AI agents start each session with no memory of previous sessions. Without shared
context, the same agent asked the same question on two different days can produce
contradictory answers — or silently invent business rules, skip conventions, or
repeat decisions the team already made.

This directory solves that by giving every agent the same ground truth at the
start of every session: project facts, coding rules, locked decisions, sprint
state, protected paths, and task prompts.

The three failure modes it prevents:

| Failure mode    | How it happens                                              | How this system helps                          |
|-----------------|-------------------------------------------------------------|------------------------------------------------|
| Hallucination   | Agent invents a rule, convention, or decision               | Locked decisions in `context/decisions.json`   |
| Token waste     | Agent loads rules irrelevant to the current task            | Role profiles and flags for selective loading  |
| Inconsistency   | Different sessions or models produce incompatible output    | Single committed source of truth in `.agent/`  |

---

## Prerequisites

- A git repository for the project
- At least one AI agent tool (Claude Code, Cursor, GitHub Copilot Workspace, etc.)
- 30–60 minutes for initial setup
- Ongoing: 10–15 minutes at each sprint boundary

---

## Setup overview

```
1. Copy this directory into your project
2. Fill AGENT.md and agent.config.json first
3. Fill the context/ files
4. Fill or trim the catalog/ files
5. Lock your first decisions
6. Each developer creates a local profile
7. Test with a real task
```

---

## Step 1 — Copy the template

Place this `.agent/` directory at the root of your repository:

```bash
cp -r /path/to/template/.agent /path/to/your/project/
```

Add `profile.md` to `.gitignore` before the first commit:

```bash
echo ".agent/profile.md" >> .gitignore
```

Commit the directory:

```bash
git add .agent/
git commit -m "chore(agent): add agent workflow configuration"
```

---

## Step 2 — Fill AGENT.md and agent.config.json

These are the entry point files every agent reads first. Fill them completely
before touching anything else. Both files must agree — they hold the same facts
in different formats.

### AGENT.md — fill the project section

```text
# [PROJECT_NAME] - Agent Context
```

Replace `[PROJECT_NAME]` with the actual project name. Fill every placeholder in
the Project, Repository Structure, Tech Stack, and Product Roles sections.

**Only list what actually exists.** If there is no mobile app, remove that line.
If there are two user roles, list two. Do not add placeholder entries.

Fill the Current Sprint section even for sprint 1 with a rough goal:

```text
Sprint:  1
Goal:    Set up project infrastructure and deploy first working endpoint
Started: 2026-04-26
Ends:    2026-05-10
```

### agent.config.json — mirror AGENT.md as structured JSON

Copy the values you just filled into `AGENT.md` into the matching fields in
`agent.config.json`. The `sprint.updated_at` field must be set to today.

```json
"sprint": {
  "number": 1,
  "goal": "Set up project infrastructure and deploy first working endpoint",
  "start_date": "2026-04-26",
  "end_date": "2026-05-10",
  "updated_at": "2026-04-26"
}
```

---

## Step 3 — Fill the context/ files

### context/stack.json

List only the tools the project actually uses. Write `"N/A"` for fields that do
not apply. Add critical rules to the `notes` array in any section — these notes
surface when agents load the stack reference.

**Before (template):**
```json
"database": {
  "primary": "[DATABASE]",
  "cache": "[CACHE_OR_NA]",
  "notes": ["[DATABASE_RULE_OR_NOTE]"]
}
```

**After (filled):**
```json
"database": {
  "primary": "PostgreSQL 16",
  "cache": "Redis",
  "notes": [
    "synchronize: false in all environments — migrations only",
    "UUID primary keys on all entities"
  ]
}
```

### context/team.json

Add one entry per team role. Use short role keys — you will reference these in
`modules.json` and `active-tasks.json`.

```json
{
  "roles": {
    "backend_lead": {
      "name": "Jane Smith",
      "profile_template": "backend-dev",
      "primary_apps": ["apps/api"],
      "primary_catalogs": ["backend", "database", "domain", "observability"]
    },
    "frontend_dev": {
      "name": "Alex Johnson",
      "profile_template": "frontend-dev",
      "primary_apps": ["apps/web"],
      "primary_catalogs": ["frontend", "domain", "stakeholders", "observability"]
    }
  }
}
```

Do not include VPS usernames, server IPs, SSH keys, or credentials of any kind.

### context/modules.json

Add one entry per major product module. Start with the modules planned for the
first two sprints. Add future modules when they become concrete.

```json
[
  {
    "name": "User Authentication",
    "slug": "auth",
    "status": "in-progress",
    "sprint": 1,
    "owner_role": "backend_lead",
    "assigned_to": "Jane Smith",
    "apps": ["apps/api", "apps/web"],
    "docs_url": "https://your-docs.example.com/modules/auth",
    "notes": "JWT + refresh token flow. Session stored in Redis."
  },
  {
    "name": "Product Catalog",
    "slug": "catalog",
    "status": "planned",
    "sprint": 2,
    "owner_role": "backend_lead",
    "assigned_to": "Jane Smith",
    "apps": ["apps/api", "apps/web"],
    "docs_url": "https://your-docs.example.com/modules/catalog"
  }
]
```

### context/active-tasks.json

Fill in what each team member is actively working on right now. Update this at
every sprint start and whenever assignments change.

```json
{
  "_meta": {
    "sprint": 1,
    "last_updated": "2026-04-26",
    "note": "Update at sprint start and when tasks change."
  },
  "tasks": [
    {
      "assignee": "Jane Smith",
      "role": "backend_lead",
      "active": [
        {
          "ticket": "PROJ-001",
          "title": "Implement JWT authentication endpoint",
          "module": "auth",
          "status": "in-progress",
          "apps": ["apps/api"]
        }
      ]
    },
    {
      "assignee": "Alex Johnson",
      "role": "frontend_dev",
      "active": [
        {
          "ticket": "PROJ-002",
          "title": "Build login page",
          "module": "auth",
          "status": "in-progress",
          "apps": ["apps/web"]
        }
      ]
    }
  ]
}
```

### context/decisions.json

Only add decisions the team has actually agreed on. Do not pre-populate with
assumptions. On day one you may have one or two.

```json
[
  {
    "id": "ADR-001",
    "title": "PostgreSQL as the only relational database",
    "status": "locked",
    "constraint": "All persistent data uses PostgreSQL. Do not introduce a second relational database without a team decision.",
    "docs_url": "https://your-docs.example.com/decisions/adr-001"
  }
]
```

Add decisions incrementally. Each one here becomes a hard constraint for every
agent session.

### context/boundaries.json

The `.env` entry is pre-filled and applies to every project. Add entries for any
file or path that agents must never modify without explicit approval.

```json
[
  {
    "path_or_pattern": ".env, .env.local, .env.production",
    "rule": "Never commit environment files or reproduce secret values in output.",
    "owner": "backend_lead"
  },
  {
    "path_or_pattern": "apps/api/src/database/migrations/*.ts (committed)",
    "rule": "Never modify a migration after it has been committed and run. Create a new migration instead.",
    "owner": "backend_lead"
  },
  {
    "path_or_pattern": ".github/workflows/deploy-prod.yml",
    "rule": "Never modify the production deployment pipeline without lead approval.",
    "owner": "backend_lead"
  }
]
```

---

## Step 4 — Fill or trim the catalog/ files

Catalog files are the rule libraries agents load for each session. Fill each one
with your project's actual conventions.

### Which files to keep

See the [catalog file checklist](README.md#catalog-file-checklist) in README.md.
Delete files that do not apply to your project and remove them from all profile
templates.

### How to fill a catalog file

Each file opens with a prompt to replace placeholders. Work through each section.
Replace generic text with your project's specific rules and conventions.

**Before (template — `catalog/backend.md` module structure):**
```text
[BACKEND_APP_PATH]/src/modules/[module-name]/
├── [module-name].module.[ext]
├── [module-name].controller.[ext]
```

**After (filled):**
```text
apps/api/src/modules/[module-name]/
├── [module-name].module.ts
├── [module-name].controller.ts
├── [module-name].service.ts
├── [module-name].repository.ts
└── [module-name].spec.ts
```

**Before (template — `catalog/database.md` entity design):**
```text
Primary key: [PRIMARY_KEY_CONVENTION]
Timestamps: [TIMESTAMP_CONVENTION]
```

**After (filled):**
```text
Primary key: UUID (@PrimaryGeneratedColumn('uuid'))
Timestamps: created_at, updated_at required on all entities (@CreateDateColumn, @UpdateDateColumn)
Soft delete: deleted_at on all domain entities (@DeleteDateColumn)
```

### catalog/domain.md — the most important file to fill

This file holds rules that are specific to your product and cannot be inferred
from the tech stack alone. If agents are likely to invent or get wrong, it
belongs here.

Good candidates:

- Data with a single canonical source (a library, service, or field that must
  always be used for a specific computation or value)
- Business invariants that span the entire product
- Fields that must always be stored or displayed in a specific format
- Calculations that must use a specific approved module or service
- Constraints that existed before this project and carry over from policy

**Example filled `catalog/domain.md` domain invariant:**

```markdown
## Canonical Data Sources

Prices are stored in the smallest currency unit (integer cents for USD).
Never store floating-point price values. Never compute a price locally —
always use the `PricingService`.

## Domain-Specific Computation

Tax calculation must use the `TaxEngine` module.
Never compute tax in a controller, component, or migration.

## Domain-Specific Storage Rules

All monetary values stored as INTEGER (cents), never FLOAT or DECIMAL.
```

### catalog/stakeholders.md — fill with real roles

Replace the placeholder role rows with your product's actual user types. Add
only roles that exist. Document real workflow invariants, not aspirational ones.

**Example:**

```markdown
## Product Roles

| Role    | Description      | Primary needs                                      |
|---------|------------------|----------------------------------------------------|
| BUYER   | End customer     | Browse products, place orders, track shipments     |
| SELLER  | Merchant         | Manage listings, process orders, view analytics    |
| ADMIN   | Platform staff   | Moderate content, manage users, view platform data |
```

---

## Step 5 — Update the profile templates

Open each file in `profile.templates/` and update the catalog list to match what
your project kept. Remove references to catalog files you deleted. Update the
`[BACKEND_APP_PATH]` and similar placeholders with your real paths.

Each developer then copies the closest template to their local `profile.md`:

```bash
# Backend developer
cp .agent/profile.templates/backend-dev.md .agent/profile.md

# Frontend developer
cp .agent/profile.templates/frontend-dev.md .agent/profile.md
```

`profile.md` is gitignored. Each developer keeps their own. They can add extra
catalog files to their local profile without affecting anyone else.

---

## Step 6 — Test with a real task

Before declaring setup complete, run one real task through the system.

Copy `prompts/new-feature.md`, fill it in for an actual task, and send it to
your agent. Verify:

- The agent reads `AGENT.md` first and confirms sprint context
- The agent loads the catalog files declared in your profile or flags
- The agent follows the rules you filled in (especially `catalog/domain.md`)
- The agent stops and asks when scope is ambiguous rather than assuming

If any of these fail, adjust the relevant catalog or `AGENT.md` and try again.
Most issues on the first test come from incomplete domain rules or missing
decisions in `decisions.json`.

---

## Daily workflow

### Starting a session

Every prompt template already includes the bootstrap line:

```text
Read .agent/AGENT.md first. Check sprint staleness. Load catalog/general.md.
Then load catalog files per flags below or from profile.md.
```

Copy the relevant prompt template, fill the placeholders, and send it. The
agent handles the rest.

### Choosing flags

Use the narrowest set of flags that covers the task:

| Task type                           | Flags to use                         |
|-------------------------------------|--------------------------------------|
| API endpoint                        | `--backend --database`               |
| Web UI component or page            | `--frontend --domain --stakeholders` |
| Database migration                  | `--database --backend`               |
| Infrastructure or CI/CD             | `--devops`                           |
| Cross-stack feature or architecture | `--all`                              |
| Code review                         | Flags matching the changed domains   |

Loading an extra catalog wastes a small number of tokens. Missing a catalog
wastes a session. When in doubt, load more.

### When an agent makes a wrong call

1. Correct it in the session — do not let the wrong output stand.
2. If the mistake could recur across sessions or team members, turn it into a
   rule using `prompts/propose-rule.md`.
3. Get the rule reviewed and merged. It becomes active for every agent from that
   commit forward.

---

## Sprint boundary workflow

At the start of every sprint, four files must be updated:

| File                        | What to change                                     |
|-----------------------------|-----------------------------------------------------|
| `AGENT.md`                  | Sprint number, goal, start date, end date           |
| `agent.config.json`         | Sprint object including `updated_at` set to today   |
| `context/modules.json`      | Module statuses and `assigned_to` for the new sprint|
| `context/active-tasks.json` | Active tasks per person; `_meta.sprint` and date    |

Use `templates/sprint-update.md` to collect this information before editing the
files. For AI-assisted planning, use `prompts/sprint-planning.md`.

If these files are not updated, agents detect the stale end date in `AGENT.md`
and surface a warning before proceeding with any planning work.

Branch: `chore/update-agent-config-sprint-[N]`
Commit: `chore(agent): update sprint context for sprint [N]`

---

## Adding a new rule

Use this flow whenever the team agrees on a new constraint or when an agent made
a mistake you want to prevent from recurring:

1. Open `prompts/propose-rule.md` and fill it in.
2. Send it to the agent to help refine the wording.
3. Bring the draft to the team for review.
4. Merge to the relevant catalog file via PR.
5. If it is a locked architectural decision, also add it to `context/decisions.json`.
6. If it protects a sensitive file or path, also add it to `context/boundaries.json`.

Only `context/decisions.json` and `context/boundaries.json` require Backend Lead
(or equivalent) review before merging. Catalog file additions can be reviewed by
any senior team member.

---

## Common mistakes

| Mistake                                              | Consequence                                                  | Fix                                                               |
|------------------------------------------------------|--------------------------------------------------------------|-------------------------------------------------------------------|
| Committing `profile.md`                              | All developers share one role; individual context is lost    | Add `.agent/profile.md` to `.gitignore` before first commit       |
| Leaving placeholders unfilled                        | Agents follow incomplete or contradictory rules              | Complete setup.md steps before using the system                   |
| Adding secrets to any `.agent/` file                 | Credentials leak into version control                        | Use `.env` files; reference the secret manager in `catalog/devops.md` |
| Not updating `active-tasks.json` at sprint start     | Agents assume stale assignments; scope collisions possible   | Update all four sprint files at every sprint boundary             |
| Adding decisions to `decisions.json` without team agreement | Locks the wrong behavior for every future session      | Only add after explicit team approval — treat it like a contract   |
| Using `--all` for every session                      | Loads irrelevant rules; wastes tokens every session          | Use the narrowest flags that cover the task                       |
| Putting domain rules in `AGENT.md`                   | `AGENT.md` grows into a bloated prompt loaded every session  | Domain rules belong in `catalog/domain.md` or the relevant catalog |
| Keeping placeholder entries in `decisions.json`      | Agents treat example text as real locked decisions            | Only real, agreed decisions belong in `decisions.json`            |

---

## What must never go in this directory

- Passwords, API keys, tokens, or any secret value
- Production server IPs, internal hostnames, or network addresses
- SSH keys or VPS account credentials
- Private Slack channels, personal emails, or contact details
- Customer data or personally identifiable information
- Business logic that has not been agreed on by the team — agents treat
  everything in this directory as authoritative fact

---

## Quick reference

| I want to...                              | Use...                            |
|-------------------------------------------|-----------------------------------|
| Start a new feature task                  | `prompts/new-feature.md`          |
| Fix a bug                                 | `prompts/bug-fix.md`              |
| Create an API endpoint                    | `prompts/api-endpoint.md`         |
| Build a UI component or page              | `prompts/component.md`            |
| Write a database migration                | `prompts/db-migration.md`         |
| Review a pull request                     | `prompts/review.md`               |
| Plan the next sprint                      | `prompts/sprint-planning.md`      |
| Propose a new rule or ADR                 | `prompts/propose-rule.md`         |
| Update sprint context                     | `templates/sprint-update.md`      |
| See who is working on what                | `context/active-tasks.json`       |
| Check a locked architectural decision     | `context/decisions.json`          |
| Check if a path is protected              | `context/boundaries.json`         |
| Understand the full tech stack            | `context/stack.json`              |
| See the module roadmap and ownership      | `context/modules.json`            |
