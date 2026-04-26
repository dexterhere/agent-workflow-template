# General Agent Rules

> Always loaded. Every agent. Every session.

## Package Manager

Use the package manager configured in `agent.config.json`.

- Do not switch package managers without explicit approval.
- Translate third-party examples into the configured package manager.
- When adding a dependency, state why it is needed and where it is used.

## Type Safety

- Follow the project's configured type-safety rules.
- Avoid untyped escape hatches unless the team has explicitly allowed them.
- Prefer shared project types before defining duplicates.
- Do not suppress compiler or linter errors without explaining why.

## Commit Messages

Use the project's configured commit convention.

Default recommendation:

```text
<type>(<scope>): <short description>
```

Common types: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`, `perf`, `ci`,
`build`, `revert`.

## Branch Naming

Use the branch naming convention configured by the project.

Default recommendation:

```text
<type>/<ticket-id>-<short-description>
```

## Scope Discipline

An agent changes only what the task requires.

- Do not refactor adjacent code unless explicitly asked.
- Do not rename public APIs, routes, events, or response shapes unless required.
- Do not restructure folders as part of unrelated work.
- Do not include unrelated fixes in the same change.

If something outside scope needs attention, flag it separately.

## Never Do This

| Prohibited                                  | Reason                         |
|---------------------------------------------|--------------------------------|
| Expose secrets or credentials               | Security risk                  |
| Commit local environment files              | Security and environment drift |
| Modify protected paths without approval     | Ownership and safety           |
| Invent business rules                       | Product correctness            |
| Ignore locked decisions                     | Architectural drift            |
| Disable tests, auth, validation, or logging | Hides risk                     |
| Make broad refactors during narrow tasks    | Scope creep                    |

## Stop-And-Ask Protocol

Stop and ask before proceeding when:

1. The task would create or change an architectural decision.
2. The task scope is ambiguous.
3. The task conflicts with `context/decisions.json`.
4. The task requires modifying a path listed in `context/boundaries.json`.
5. Two or more approaches have materially different tradeoffs.

When stopping, state what you were about to do, why you stopped, what you need,
and the options if relevant.

## Sprint Staleness Check

At the start of a session, compare today's date against `sprint.end_date` in
`agent.config.json`.

If today is past `sprint.end_date`, warn that sprint data may be stale and ask
for confirmation before making sprint-sensitive assumptions.

## Profile And Scope Check

Before starting a task, verify loaded catalogs cover every domain touched.

| Task touches          | Required catalog             | Flag if not loaded     |
|-----------------------|------------------------------|------------------------|
| Backend/API           | `catalog/backend.md`         | `--backend`            |
| Database/schema       | `catalog/database.md`        | `--database`           |
| DevOps/infrastructure | `catalog/devops.md`          | `--devops`             |
| Web frontend          | `catalog/frontend.md`        | `--frontend`           |
| Mobile                | `catalog/mobile.md`          | `--mobile`             |
| Product/domain rules  | `catalog/domain.md`          | `--domain`             |
| User roles/workflows  | `catalog/stakeholders.md`    | `--stakeholders`       |
| Observability         | `catalog/observability.md`   | `--observability`      |

Use the narrowest catalogs that safely cover the task. Use `--all` for broad
architecture reviews, cross-stack debugging, or unclear planning work.

## Output Format

- Use language tags on code fences.
- Use paths relative to the repository root.
- Provide commands that match the configured package manager.
- For multiple changes, list affected files first.
- Report verification performed before finalizing.
