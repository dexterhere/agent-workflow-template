# Observability Rules

> Load with: `--observability`, `--cross`, or a profile that includes observability rules.

Replace placeholders with the logging, metrics, and error-tracking stack used by
the target project.

## Stack

| Capability     | Tool              | Layer          |
|----------------|-------------------|----------------|
| Error tracking | `[ERROR_TOOL]`    | `[LAYERS]`     |
| Logging        | `[LOGGING_TOOL]`  | `[LAYERS]`     |
| Metrics        | `[METRICS_TOOL]`  | `[LAYERS]`     |
| Tracing        | `[TRACING_TOOL]`  | `[LAYERS]`     |

## Rules

- Initialize error tracking before the app accepts traffic when applicable.
- Do not catch and silently swallow exceptions.
- Log business-critical events using structured logs.
- Do not log secrets, tokens, credentials, or unnecessary personal data.
- Log enough context to debug failures without exposing sensitive values.
- Record duration for performance-sensitive operations.

## Event Naming

Use the project's event naming convention.

Default recommendation:

```text
[domain].[action]
```

Examples:

```text
[entity].created
[process].completed
[operation].failed
```
