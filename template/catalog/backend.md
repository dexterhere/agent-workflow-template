# Backend Rules

> Load with: `--backend` or a backend/fullstack profile.

Replace placeholders with the backend framework and conventions used by the
target project.

## Module Structure

Default recommendation:

```text
[BACKEND_APP_PATH]/src/modules/[module-name]/
├── [module-name].module.[ext]
├── [module-name].controller.[ext]
├── [module-name].service.[ext]
├── [module-name].repository.[ext]
├── dto/
├── entities/
├── interfaces/
└── tests/
```

Rules:

- Keep one module per domain feature unless the project says otherwise.
- Shared utilities belong in the configured common/shared folder.
- Follow existing local naming before creating new conventions.

## Layer Responsibilities

| Layer      | Does                               | Should not do                  |
|------------|------------------------------------|--------------------------------|
| Controller | Request parsing, validation, routing | Business logic, direct storage |
| Service    | Business logic and orchestration     | Transport-specific responses   |
| Repository | Persistence queries                 | Business decisions             |
| DTO/schema | Input/output shape and validation    | Runtime side effects           |

## Validation

- Validate all external input.
- Keep validation rules close to request DTOs/schemas.
- Keep API contracts synchronized with shared types and documentation.

## Error Handling

- Use the project's standard error types.
- Do not expose stack traces, secrets, database internals, or private IDs.
- Log useful failure context without logging sensitive values.

## Auth And Authorization

- Every endpoint must have an explicit access decision.
- Verify both authentication and authorization.
- Do not remove or bypass guards/middleware for testing.
- Use roles from `context/stack.json` or `catalog/stakeholders.md`; do not invent new ones.

## Cross-Module Communication

- Use the project's established pattern for module communication.
- Avoid direct imports across bounded contexts unless the project permits it.
- Define event/message payloads in shared types or the owning module.

## API Responses

- Follow the project's standard response shape.
- Do not return persistence entities directly if response DTOs are used.
- Ensure sensitive fields never appear in responses.

## Logging

- Use the configured logger.
- Prefer structured logs.
- Do not use ad hoc console logging in committed code unless the project allows it.

## API Documentation

- Document public endpoints using the configured API documentation tool.
- Include success and likely error responses.
