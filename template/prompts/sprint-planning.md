# Prompt Template: Sprint Planning

> Use at sprint boundaries to plan the next sprint with AI assistance.
> Copy this template, replace placeholders, and remove this header.

Read `.agent/AGENT.md` first. Load `catalog/general.md`, `catalog/domain.md`,
and `catalog/stakeholders.md`.

Flags: `--cross`

## Sprint Planning Session

Current sprint: `[SPRINT_NUMBER]`
Next sprint: `[NEXT_SPRINT_NUMBER]`
Planning date: `[YYYY-MM-DD]`

## What Was Completed This Sprint

| Ticket        | Title          | Module          | Assignee             | Outcome     |
|---------------|----------------|-----------------|----------------------|-------------|
| `[TICKET_ID]` | `[TASK_TITLE]` | `[MODULE_SLUG]` | `[TEAM_MEMBER_NAME]` | `[OUTCOME]` |

## What Is Proposed For Next Sprint

1. `[TICKET_OR_FEATURE]` - module: `[MODULE_SLUG]` - assignee: `[TEAM_MEMBER_NAME]`
2. `[TICKET_OR_FEATURE]` - module: `[MODULE_SLUG]` - assignee: `[TEAM_MEMBER_NAME]`
3. `[TICKET_OR_FEATURE]` - module: `[MODULE_SLUG]` - assignee: `[TEAM_MEMBER_NAME]`

## Team Availability Next Sprint

- `[TEAM_MEMBER_NAME]`: `[FULL_OR_REDUCED_AND_REASON]`
- `[TEAM_MEMBER_NAME]`: `[FULL_OR_REDUCED_AND_REASON]`

## What I Need From This Session

- [ ] Validate sprint scope against `context/modules.json`.
- [ ] Identify cross-module risks.
- [ ] Flag conflicts with `context/decisions.json`.
- [ ] Suggest task breakdown for `[FEATURE_OR_TICKET]`.
- [ ] Draft updated sprint context for team review.

## Constraints

- Do not weaken locked decisions or boundary protections.
- Stay within modules listed in `context/modules.json`; flag new modules.
- Do not assign tasks without checking `context/team.json`.
