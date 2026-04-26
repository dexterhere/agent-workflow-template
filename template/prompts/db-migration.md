# Prompt Template: Database Migration

> Copy this template, replace placeholders, and remove this header.

Read `.agent/AGENT.md` first. Check sprint staleness. Load `catalog/general.md`.
Then load catalog files per flags below or from `profile.md`.

Flags: `--database`
Scope check: add `--backend` if models/entities are in backend code; add
`--domain` if the schema encodes domain rules.

## Migration Task

Ticket: `[TICKET_ID]`

## Schema Change Required

`[ADD_COLUMN / NEW_TABLE / ADD_INDEX / CHANGE_TYPE / OTHER]`

## Files To Modify

- `[MODEL_OR_ENTITY_FILE]`
- `[MIGRATION_FILE_OR_GENERATION_COMMAND]`

## Migration Name

`[DESCRIPTIVE_MIGRATION_NAME]`

## Rules Reminder

- Use the configured migration workflow.
- Do not edit already-applied migrations.
- Include rollback/down behavior if supported.
- Keep model/entity and migration changes together.
- Check `context/decisions.json` for persistence constraints.

## Expected Output

1. Updated model/entity.
2. Migration file or migration command result.
3. Confirmation of rollback/down behavior.
