# Prompt Template: Code Review

> Copy this template, replace placeholders, and remove this header.

Read `.agent/AGENT.md` first. Check sprint staleness. Load `catalog/general.md`.
Then load catalog files per flags below or from `profile.md`.

Profile: `[PROFILE_NAME]`
Flags: `[FLAGS_MATCHING_REVIEW_SCOPE]`
Scope check: if the change touches multiple domains, list each flag explicitly.

## Review Task

PR / Branch: `[PR_OR_BRANCH]`
Ticket: `[TICKET_ID]`
Review type: `[Full / Security / Performance / Architecture / Regression]`

## Files To Review

```text
[FILE_PATHS]
```

## What To Check

- [ ] Scope matches the task.
- [ ] Follows local architecture and layer responsibilities.
- [ ] External input is validated.
- [ ] Protected actions have auth/access checks.
- [ ] Persistence changes follow database rules.
- [ ] No secrets or environment values are exposed.
- [ ] No unapproved dependencies are introduced.
- [ ] No locked decisions are violated.
- [ ] No protected paths are modified without approval.
- [ ] Logging and error handling follow project standards.
- [ ] Tests or verification are appropriate for the risk.

## Specific Concerns

`[AREAS_TO_FOCUS_ON]`

## Output Format

Flag each issue with `[BLOCKER]`, `[WARNING]`, or `[SUGGESTION]`.
List affected file and line reference where possible.
