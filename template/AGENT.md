# [PROJECT_NAME] - Agent Context

## Project

Name: [PROJECT_NAME]
Organization: [ORGANIZATION_NAME]
Description: [ONE_SENTENCE_PROJECT_DESCRIPTION]
Primary domain: [PRIMARY_DOMAIN]
Production target: [YYYY-MM-DD or TBD]

## Current Sprint

Sprint:      [SPRINT_NUMBER]
Goal:        [SPRINT_GOAL]
Started:     [YYYY-MM-DD]
Ends:        [YYYY-MM-DD]

> Sprint staleness check: compare today's date against the end date above.
> If today is past the end date, state: "Sprint [SPRINT_NUMBER] ended on [YYYY-MM-DD]. Sprint data may be stale."
> Confirm before planning or making sprint-sensitive assumptions.

## Repository Structure

Package manager: [PACKAGE_MANAGER] - use this consistently.

[APP_OR_PACKAGE_PATH]        [DESCRIPTION]
[APP_OR_PACKAGE_PATH]        [DESCRIPTION]
[SHARED_PACKAGE_PATH]        [DESCRIPTION]

## Tech Stack

Runtime:     [RUNTIME_AND_VERSION]
Backend:     [BACKEND_STACK]
Frontend:    [FRONTEND_STACK]
Mobile:      [MOBILE_STACK or N/A]
Database:    [DATABASE_STACK]
Infra:       [INFRA_STACK]

## Product Roles

[ROLE_1]     [ROLE_1_DESCRIPTION]
[ROLE_2]     [ROLE_2_DESCRIPTION]
[ROLE_3]     [ROLE_3_DESCRIPTION]

## Absolute Rules

1. Use the configured package manager only.
2. Follow the locked decisions in `context/decisions.json`.
3. Check `context/boundaries.json` before modifying sensitive paths.
4. Keep changes scoped to the requested task.
5. Do not expose secrets, credentials, tokens, or private operational details.
6. Do not invent business rules. Ask when requirements are missing or ambiguous.

## What To Do Next

1. Read `agent.config.json` for structured project state.
2. Read `context/active-tasks.json` to avoid colliding with current work.
3. Check sprint staleness.
4. Load rules:
   - prompt flags: load the requested catalog files
   - `profile.md`: load the developer's default catalog files
   - no flags/profile: infer the minimum required catalogs from the task
5. Always load `catalog/general.md`.
6. Check `context/decisions.json` before architectural decisions.
7. Check `context/boundaries.json` before touching protected paths.
8. Begin work. If scope, ownership, or architecture is unclear, stop and ask.
