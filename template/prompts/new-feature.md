# Prompt Template: New Feature

> Copy this template, replace placeholders, and remove this header.

Read `.agent/AGENT.md` first. Check sprint staleness. Load `catalog/general.md`.
Then load catalog files per flags below or from `profile.md`.

Profile: `[PROFILE_NAME]`
Flags: `[FLAGS - e.g. --backend --database --domain]`
Scope check: confirm the loaded catalogs cover every domain this task touches.

## Task

Ticket: `[TICKET_ID_AND_TITLE]`
Module: `[MODULE_NAME]`

## What Needs To Be Built

`[CLEAR_FEATURE_DESCRIPTION]`

## Acceptance Criteria

- [ ] `[CRITERION_1]`
- [ ] `[CRITERION_2]`
- [ ] `[CRITERION_3]`

## Context And Constraints

- `[RELEVANT_CONTEXT]`
- Check `context/modules.json` for module status and owner.
- Check `context/active-tasks.json` to avoid scope collision.
- Check `context/decisions.json` for locked decisions.
- Check `context/boundaries.json` before touching protected paths.

## What I Want From This Session

`[Planning only / Implementation / Both]`

`[WHERE_TO_START_OR_SPECIAL_INSTRUCTIONS]`
