# Database Rules

> Load with: `--database` or a database/backend/fullstack profile.

Replace placeholders with the database and ORM conventions used by the target
project.

## Schema Changes

- Every schema change must use the project's migration workflow.
- Do not edit migrations that have already been committed and applied.
- Include rollback/down behavior when the migration system supports it.
- Commit entity/model changes and migrations together.

## Entity Or Model Design

Document required fields here:

```text
Primary key: [PRIMARY_KEY_CONVENTION]
Timestamps: [TIMESTAMP_CONVENTION]
Soft delete: [SOFT_DELETE_CONVENTION]
Table naming: [TABLE_NAMING_CONVENTION]
Column naming: [COLUMN_NAMING_CONVENTION]
```

Rules:

- Follow existing models before introducing a new pattern.
- Use explicit names for persisted fields when the ORM supports it.
- Avoid storing duplicate derived data unless approved.

## Canonical Fields

If a domain has canonical storage fields, define them here.

```text
[DOMAIN_CONCEPT] is stored as [CANONICAL_FIELD].
[DERIVED_FIELD] is computed from [CANONICAL_FIELD] and is not persisted.
```

## Deletes

Define delete behavior:

```text
[DOMAIN_ENTITY] -> [SOFT_DELETE_OR_HARD_DELETE_RULE]
```

- Do not hard-delete domain records unless explicitly approved.
- Junction/pivot cleanup rules should be documented separately.

## Indexes

- Add indexes only for known query patterns.
- Name indexes using the project convention.
- Include index changes in migrations.
- Avoid speculative indexes.

## Relationships And Foreign Keys

- Make ownership and cascade behavior explicit.
- Avoid eager loading unless the project standard allows it.
- Prevent N+1 query patterns.

## Query Guidelines

- Parameterize raw queries.
- Paginate list queries.
- Prefer repository/ORM helpers for simple queries.
- Use query builders or raw SQL only when justified.

## Seeding

- Keep seed data environment-safe.
- Do not seed real user data or secrets.
- Document how to run seeds with the configured package manager.
