# Sprint Update Template

> Use this at the start of every sprint to update agent context.
> Fill in all sections, then update the files listed below.

## Sprint Metadata

Sprint number: `[SPRINT_NUMBER]`
Goal: `[ONE_SENTENCE_SPRINT_GOAL]`
Start date: `[YYYY-MM-DD]`
End date: `[YYYY-MM-DD]`

## Module Status Changes

List only modules whose status changes.

| Module slug     | Previous status | New status   | Lead                 |
|-----------------|-----------------|--------------|----------------------|
| `[MODULE_SLUG]` | `[STATUS]`      | `[STATUS]`   | `[TEAM_MEMBER_NAME]` |

Available statuses: `planned`, `in-progress`, `complete`, `blocked`, `deferred`.

## Active Tasks Per Team Member

| Assignee             | Ticket        | Title          | Module          | App(s)       | Status     |
|----------------------|---------------|----------------|-----------------|--------------|------------|
| `[TEAM_MEMBER_NAME]` | `[TICKET_ID]` | `[TASK_TITLE]` | `[MODULE_SLUG]` | `[APP_PATH]` | `[STATUS]` |

## Files To Update

| File                        | What to change                                          |
|-----------------------------|---------------------------------------------------------|
| `AGENT.md`                  | Current sprint section                                  |
| `agent.config.json`         | `sprint` object including `updated_at`                  |
| `context/modules.json`      | Module statuses and assignments                         |
| `context/active-tasks.json` | Active tasks and `_meta` fields                         |

## Checklist Before Committing

- [ ] `AGENT.md` sprint values updated.
- [ ] `agent.config.json` sprint values updated.
- [ ] `context/modules.json` reflects real module state.
- [ ] `context/active-tasks.json` reflects real active work.
- [ ] No placeholder values remain in configured project files.
- [ ] No secrets, private URLs, usernames, or credentials were added.
- [ ] Changes reviewed by the appropriate project owner.
