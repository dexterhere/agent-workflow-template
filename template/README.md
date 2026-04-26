# .agent/ - Reusable Agent Workflow Template

This directory is a template for configuring AI agents in a software project.
It should not contain private project details, real team member names, secrets,
internal URLs, infrastructure accounts, or project-specific business rules.

Copy this template into a project, then replace placeholders with that project's
approved configuration.

## Purpose

AI agents usually start each session without memory of previous work. This
directory gives every agent the same starting context: project facts, coding
rules, protected boundaries, locked decisions, active work, and task prompts.

The goal is to reduce hallucination, control token usage, keep output consistent,
and make team workflows repeatable.

## File Structure

```text
.agent/
├── AGENT.md
├── agent.config.json
│
├── catalog/
│   ├── general.md
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
├── context/
│   ├── stack.json
│   ├── modules.json
│   ├── decisions.json
│   ├── boundaries.json
│   ├── team.json
│   └── active-tasks.json
│
├── prompts/
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
│   └── sprint-update.md
│
└── profile.templates/
    ├── backend-dev.md
    ├── frontend-dev.md
    ├── devops.md
    └── fullstack.md

profile.md  # local only; gitignored
```

## Setup For A Project

1. Replace every placeholder such as `[PROJECT_NAME]`, `[TEAM_MEMBER_NAME]`,
   `[TICKET_PREFIX]`, and `[DOCS_URL]`.
2. Remove examples that do not apply to the project.
3. Add real locked decisions only after team approval.
4. Add protected paths only when they are genuinely sensitive.
5. Keep `profile.md` local and out of Git.

## Catalog File Checklist

Not every project needs every catalog file. Remove what does not apply.

| Catalog file              | Keep when...                                        | Remove when...                          |
|---------------------------|-----------------------------------------------------|-----------------------------------------|
| `catalog/general.md`      | Always                                              | Never                                   |
| `catalog/backend.md`      | Project has a backend API or server                 | Frontend-only or static site            |
| `catalog/frontend.md`     | Project has a web UI                                | API-only or backend-only project        |
| `catalog/database.md`     | Project uses a database or ORM                      | Stateless proxy or gateway only         |
| `catalog/devops.md`       | Project has deployment, CI/CD, or infrastructure    | Rarely — almost every project needs it  |
| `catalog/mobile.md`       | Project has a mobile app                            | No mobile app in the project            |
| `catalog/domain.md`       | Product has domain rules agents must not invent     | Simple CRUD with no domain invariants   |
| `catalog/stakeholders.md` | Product has distinct user roles or workflows        | Internal tooling with a single user type |
| `catalog/observability.md`| Project uses logging, error tracking, or metrics    | Rarely — almost every project needs it  |

**When removing a catalog file:**
1. Delete the file.
2. Remove it from all profile templates in `profile.templates/`.
3. Remove its row from the flag table in this file.
4. Remove it from any profile that references it.

For a detailed walkthrough of which files to fill and how, see [`setup.md`](setup.md).

## Developer Setup

Copy the closest profile template:

```bash
cp .agent/profile.templates/backend-dev.md .agent/profile.md
```

Then edit `.agent/profile.md` locally if the role needs extra or fewer catalog
files. Do not commit `.agent/profile.md`.

## Flags

Flags tell the agent which catalogs to load for a session.

| Flag              | Loads                         | Use when                         |
|-------------------|-------------------------------|----------------------------------|
| `--backend`       | `catalog/backend.md`          | Backend/API work                 |
| `--database`      | `catalog/database.md`         | Schema, migrations, queries      |
| `--devops`        | `catalog/devops.md`           | CI/CD, deployment, infra         |
| `--frontend`      | `catalog/frontend.md`         | Web UI work                      |
| `--mobile`        | `catalog/mobile.md`           | Mobile app work                  |
| `--domain`        | `catalog/domain.md`           | Project-specific domain rules    |
| `--stakeholders`  | `catalog/stakeholders.md`     | User roles and business flows    |
| `--observability` | `catalog/observability.md`    | Logging, metrics, error tracking |
| `--cross`         | domain + stakeholders + observability | Platform-wide rules       |
| `--all`           | all catalogs                  | Architecture or broad reviews    |

Use the narrowest set of flags that covers the task. Use `--all` only for
architecture reviews, unclear cross-stack work, or broad planning.

## Context Loading Priority

```text
1. Prompt flags
2. Local profile.md
3. AGENT.md inference
```

`catalog/general.md` is always loaded.

## What Gets Committed

| Path                    | Committed | Notes                                      |
|-------------------------|-----------|--------------------------------------------|
| `AGENT.md`              | Yes       | Shared entrypoint                          |
| `agent.config.json`     | Yes       | Shared project metadata                    |
| `catalog/*.md`          | Yes       | Team rules                                 |
| `context/*.json`        | Yes       | Shared structured context                  |
| `prompts/*.md`          | Yes       | Reusable task prompts                      |
| `templates/*.md`        | Yes       | Maintenance templates                      |
| `profile.templates/*.md`| Yes       | Role defaults                              |
| `profile.md`            | No        | Personal local configuration               |

## Sprint Updates

At every sprint boundary:

1. Fill `templates/sprint-update.md`.
2. Update `AGENT.md`.
3. Update `agent.config.json`.
4. Update `context/modules.json`.
5. Update `context/active-tasks.json`.

Use a branch like:

```text
chore/update-agent-config-sprint-[SPRINT_NUMBER]
```

## Rule Feedback Loop

When an agent makes a poor judgment call or the team wants to lock a new rule:

1. Use `prompts/propose-rule.md`.
2. Review the proposed rule with the team.
3. Add it to the relevant catalog file.
4. If it is architectural, add it to `context/decisions.json`.
5. If it protects a path, add it to `context/boundaries.json`.

Do not place secrets, credentials, private URLs, personal usernames, or
unapproved operational details anywhere in this template.
