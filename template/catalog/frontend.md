# Frontend Rules

> Load with: `--frontend` or a frontend/fullstack profile.

Replace placeholders with the web framework and design system used by the target
project.

## Rendering Model

Document the default rendering model:

```text
Default: [SERVER_RENDERED / CLIENT_RENDERED / STATIC / HYBRID]
Use client-side rendering when: [RULES]
Use server-side rendering when: [RULES]
```

Rules:

- Prefer the framework's default rendering pattern.
- Keep interactive components as small as practical.
- Do not duplicate server data in client state without a reason.

## File And Folder Structure

```text
[FRONTEND_APP_PATH]/
├── app-or-pages/
├── components/
│   ├── ui/
│   └── [feature]/
├── lib/
├── styles/
└── types/
```

## Route And Role Separation

- Separate route groups by user role when the product requires it.
- Shared UI primitives can be reused.
- Role-specific business components should not be reused across incompatible contexts.

## Data Fetching

- Use the project's standard data-fetching approach.
- Keep mutations in the configured mutation/action layer.
- Avoid loading primary page data through client effects when the framework offers a better pattern.

## Forms And Validation

- Use the configured form library.
- Use the configured validation library.
- Show validation errors near the affected fields.
- Show loading and error states during submission.

## Loading, Empty, And Error States

Every data-dependent screen should handle:

- Loading
- Empty state
- Error state
- Success state

## Accessibility

- Use semantic HTML or native components.
- Provide labels for inputs.
- Provide meaningful alt text for images.
- Ensure keyboard navigation works.
- Do not rely on color alone for meaning.

## Design System

- Reuse existing design system components first.
- Do not create duplicate primitives.
- Follow project spacing, typography, and color tokens.
