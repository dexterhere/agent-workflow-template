# Cross-Cutting Rules

> Load with `--cross`.

`--cross` means load:

| File                         | Flag              | Covers                         |
|------------------------------|-------------------|--------------------------------|
| `catalog/domain.md`          | `--domain`        | Project-specific invariants    |
| `catalog/stakeholders.md`    | `--stakeholders`  | User roles and workflows       |
| `catalog/observability.md`   | `--observability` | Logging, metrics, errors       |

Use individual flags when only one cross-cutting area is relevant.
