# Prompt Template: API Endpoint

> Copy this template, replace placeholders, and remove this header.

Read `.agent/AGENT.md` first. Check sprint staleness. Load `catalog/general.md`.
Then load catalog files per flags below or from `profile.md`.

Flags: `--backend`
Scope check: add `--database`, `--domain`, `--stakeholders`, or
`--observability` if the endpoint touches those areas.

## Endpoint Task

Ticket: `[TICKET_ID]`
Module: `[MODULE_NAME]`

## Endpoint Specification

Method: `[GET / POST / PUT / PATCH / DELETE]`
Path: `[API_PATH]`
Auth: `[PUBLIC / AUTHENTICATED / ROLE_NAME]`

## Request

Query params / body:

```text
[FIELDS, TYPES, VALIDATION_RULES]
```

## Response

Success:

```text
[SUCCESS_RESPONSE_SHAPE]
```

Error cases:

- `[STATUS]` - `[WHEN_THIS_HAPPENS]`
- `[STATUS]` - `[WHEN_THIS_HAPPENS]`

## Business Logic

`[SERVICE_LOGIC_DESCRIPTION]`

## Expected Files

- `[DTO_OR_SCHEMA_FILE]`
- `[CONTROLLER_OR_ROUTE_FILE]`
- `[SERVICE_OR_HANDLER_FILE]`
- `[REPOSITORY_OR_DATA_ACCESS_FILE]`
- `[TEST_FILE]`
