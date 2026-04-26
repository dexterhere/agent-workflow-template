# Domain Rules

> Load with: `--domain`, `--cross`, or a profile that includes domain rules.

This file is intentionally generic. Replace this content with project-specific
domain constraints after the template is copied into a real project.

## Domain Invariants

List product rules that must remain true across backend, frontend, mobile,
data, and operations.

Examples:

- `[DOMAIN_RULE_1]`
- `[DOMAIN_RULE_2]`
- `[DOMAIN_RULE_3]`

## Canonical Data Sources

Document any data source that is the single source of truth.

```text
[DATA_TYPE] -> [CANONICAL_SOURCE]
```

Rules:

- Do not duplicate canonical data into another system without approval.
- Do not introduce a second source of truth.
- If a required capability is missing, extend the canonical source or ask.

## Domain-Specific Computation

Document calculations, conversions, pricing rules, scheduling rules, or other
domain logic that agents must not invent.

```text
[COMPUTATION_NAME] must be performed by [APPROVED_MODULE_OR_SERVICE].
```

## Domain-Specific UI Rules

Document product display rules that affect user-facing screens.

- `[DISPLAY_RULE_1]`
- `[DISPLAY_RULE_2]`

## Domain-Specific Storage Rules

Document fields, naming conventions, and persistence rules.

- `[STORAGE_RULE_1]`
- `[STORAGE_RULE_2]`
