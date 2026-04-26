# Stakeholder And Workflow Rules

> Load with: `--stakeholders`, `--cross`, or a profile that includes stakeholder rules.

Replace placeholders with the product's real user roles and business workflows.

## Product Roles

| Role       | Description       | Primary needs       |
|------------|-------------------|---------------------|
| `[ROLE_1]` | `[DESCRIPTION_1]` | `[PRIMARY_NEEDS_1]` |
| `[ROLE_2]` | `[DESCRIPTION_2]` | `[PRIMARY_NEEDS_2]` |
| `[ROLE_3]` | `[DESCRIPTION_3]` | `[PRIMARY_NEEDS_3]` |

Rules:

- Every protected action must have an explicit role/access rule.
- Verify resource ownership where relevant.
- Do not invent roles not listed here or in project context.

## Workflow Invariants

Document workflows that must be supported across the product.

```text
[WORKFLOW_NAME]: [INVARIANT]
```

Examples:

- `[ROLE] can create [RECORD] only when [CONDITION].`
- `[STATE_TRANSITION] must create [AUDIT_OR_SNAPSHOT_RECORD].`
- `[MANUAL_WORKFLOW] must be treated the same as [SYSTEM_WORKFLOW].`

## Localization And Content

Document language, formatting, and content rules.

- Default language: `[DEFAULT_LANGUAGE]`
- Secondary languages: `[SECONDARY_LANGUAGES]`
- Formatting rules: `[FORMAT_RULES]`

## Immutable Or Audited Records

Document records that must not be changed after a business event.

```text
[RECORD] becomes immutable after [EVENT].
```
