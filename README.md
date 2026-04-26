# agent-workflow-template

A structured AI agent workflow template for software teams — reduces hallucination, controls token usage, and keeps output consistent across sessions and models.

---

## The problem

AI agents start each session with no memory of previous work. Without shared context, the same agent asked the same question on two different days can produce contradictory answers — or silently invent business rules, skip conventions, or repeat decisions the team already made.

The three failure modes teams hit most:

| Failure mode    | How it happens                                              | How this template helps                           |
|-----------------|-------------------------------------------------------------|---------------------------------------------------|
| Hallucination   | Agent invents a rule, convention, or decision               | Locked decisions in `context/decisions.json`      |
| Token waste     | Agent loads rules irrelevant to the current task            | Role profiles and flags for selective loading     |
| Inconsistency   | Different sessions or models produce incompatible output    | Single committed source of truth in `.agent/`     |

---

## What this template gives you

```
.agent/
├── AGENT.md                  ← Agent entrypoint: project facts, sprint state, rules
├── agent.config.json         ← Structured project metadata (machine-readable)
│
├── catalog/                  ← Modular rule files loaded per task
│   ├── general.md            ← Always loaded
│   ├── backend.md
│   ├── frontend.md
│   ├── database.md
│   ├── devops.md
│   ├── mobile.md
│   ├── domain.md
│   ├── stakeholders.md
│   ├── observability.md
│   └── cross-cutting.md
│
├── context/                  ← Shared state committed to git
│   ├── stack.json
│   ├── modules.json
│   ├── decisions.json        ← Locked architectural decisions
│   ├── boundaries.json       ← Protected paths agents must not touch
│   ├── team.json
│   └── active-tasks.json     ← Current in-flight work
│
├── prompts/                  ← Reusable task prompts
│   ├── new-feature.md
│   ├── bug-fix.md
│   ├── db-migration.md
│   ├── api-endpoint.md
│   ├── component.md
│   ├── review.md
│   ├── sprint-planning.md
│   └── propose-rule.md
│
├── templates/
│   └── sprint-update.md      ← Sprint boundary checklist
│
└── profile.templates/        ← Role defaults
    ├── backend-dev.md
    ├── frontend-dev.md
    ├── devops.md
    └── fullstack.md
```

`profile.md` — personal local configuration, gitignored per developer.

---

## Quick start

### Option A — GitHub Template (recommended)

1. Click **Use this template** at the top of this page
2. Name your repo and create it
3. Copy the `template/` directory into your project as `.agent/`:
   ```bash
   cp -r template/ /path/to/your/project/.agent
   ```
4. Follow `template/setup.md` to configure the template for your project

### Option B — Clone directly

```bash
git clone https://github.com/YOUR_USERNAME/agent-workflow-template.git
cp -r agent-workflow-template/template/ /path/to/your/project/.agent
```

Then follow `template/setup.md`.

---

## How it works

Each session, point your agent at `AGENT.md` as its entry point. The agent reads:

1. **`AGENT.md`** — project name, sprint, repo structure, tech stack, absolute rules
2. **`agent.config.json`** — structured machine-readable version of the same facts
3. **`context/`** files — locked decisions, protected paths, active tasks, team
4. **`catalog/`** files — rule modules loaded based on the task type

Catalog files are loaded selectively using **flags** or **role profiles**, so the agent only loads rules relevant to the current task:

| Flag              | Loads                         | Use when                          |
|-------------------|-------------------------------|-----------------------------------|
| `--backend`       | `catalog/backend.md`          | Backend / API work                |
| `--database`      | `catalog/database.md`         | Schema, migrations, queries       |
| `--devops`        | `catalog/devops.md`           | CI/CD, deployment, infra          |
| `--frontend`      | `catalog/frontend.md`         | Web UI work                       |
| `--mobile`        | `catalog/mobile.md`           | Mobile app work                   |
| `--domain`        | `catalog/domain.md`           | Project-specific domain rules     |
| `--stakeholders`  | `catalog/stakeholders.md`     | User roles and business flows     |
| `--observability` | `catalog/observability.md`    | Logging, metrics, error tracking  |
| `--all`           | all catalogs                  | Architecture reviews, broad work  |

Each developer also sets up a local `profile.md` (gitignored) that defines their default catalog set for their role.

---

## Setup time

| Phase                   | Time             |
|-------------------------|------------------|
| Initial setup           | 30–60 minutes    |
| Per-sprint maintenance  | 10–15 minutes    |
| New developer onboarding| 5 minutes        |

---

## Compatible with

- Claude Code
- Cursor
- GitHub Copilot Workspace
- Any agent tool that accepts a context file at session start

---

## Contributing

Issues and pull requests are welcome. See [CHANGELOG.md](CHANGELOG.md) for version history.

---

## License

MIT — see [LICENSE](LICENSE).
