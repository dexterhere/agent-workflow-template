# Mobile Rules

> Load with: `--mobile` or a mobile/fullstack profile.

Replace placeholders with the mobile framework and app conventions used by the
target project.

## App Structure

```text
[MOBILE_APP_PATH]/
├── src/
│   ├── screens/
│   ├── components/
│   ├── navigation/
│   ├── services/
│   ├── state/
│   └── types/
```

## Navigation

- Use the configured navigation library.
- Keep route params typed when the language/framework supports it.
- Do not pass large objects through navigation params.

## Data And Offline Behavior

Document the project default:

```text
Server state: [SERVER_STATE_LIBRARY]
Local persistence: [PERSISTENCE_LAYER]
Offline behavior: [OFFLINE_POLICY]
```

Rules:

- Do not assume network availability.
- Make retries and failure states visible to users.
- Avoid duplicating business logic that belongs in shared packages or backend services.

## Platform Differences

- Check iOS and Android behavior for native APIs.
- Keep platform-specific code isolated.
- Document permissions when adding native capabilities.

## Accessibility

- Use accessible labels for controls.
- Keep touch targets large enough for mobile use.
- Support dynamic text size where practical.

## Performance

- Avoid unnecessary re-renders in lists.
- Use virtualization for large lists.
- Optimize images and media before rendering.
