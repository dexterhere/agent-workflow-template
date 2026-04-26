# Prompt Template: Bug Fix

> Copy this template, replace placeholders, and remove this header.

Read `.agent/AGENT.md` first. Check sprint staleness. Load `catalog/general.md`.
Then load catalog files per flags below or from `profile.md`.

Profile: `[PROFILE_NAME]`
Flags: `[FLAGS]`
Scope check: confirm the loaded catalogs cover the affected area.

## Bug Report

Ticket: `[TICKET_ID]`
Severity: `[Critical / High / Medium / Low]`

## What Is Happening

`[ACTUAL_BEHAVIOR]`

## What Should Happen

`[EXPECTED_BEHAVIOR]`

## Steps To Reproduce

1. `[STEP_1]`
2. `[STEP_2]`
3. `[STEP_3]`

## Where To Look

- Files: `[SUSPECTED_FILES]`
- Module: `[MODULE_NAME]`
- Logs/errors: `[RELEVANT_OUTPUT]`

## Constraints

- Do not change behavior outside this fix.
- Do not refactor adjacent code unless it is the direct cause.
- Add or update a regression test where practical.
