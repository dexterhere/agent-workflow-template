# DevOps Rules

> Load with: `--devops` or a devops/fullstack profile.

Replace placeholders with the infrastructure and deployment conventions used by
the target project.

## Access And Secrets

- Do not output, store, or commit secrets.
- Do not include private usernames, hostnames, IPs, tokens, or keys in this template.
- Use the project's approved secret manager.
- Use least-privilege access for deployment and operations.

## Containers

If the project uses containers, document:

```text
Runtime images: [IMAGE_POLICY]
Service names: [SERVICE_NAMES]
Networks: [NETWORK_POLICY]
Volumes: [VOLUME_POLICY]
```

Rules:

- Do not run services as root unless explicitly approved.
- Do not expose internal services publicly.
- Keep persistent data in named or managed storage.
- Keep `.dockerignore` aligned with project needs.

## Environment Variables

- Keep real environment values out of Git.
- Maintain an example env file with variable names only.
- Add new variables to documentation in the same change.
- Use consistent naming such as `UPPER_SNAKE_CASE`.

## CI/CD

Document required checks:

```text
[CHECK_1]
[CHECK_2]
[CHECK_3]
```

Rules:

- Do not disable checks to unblock merges.
- Pin third-party actions/images when the platform supports it.
- Keep production deploys protected by the project's approval process.

## Reverse Proxy And Networking

- Keep internal services private.
- Route public traffic only through approved entrypoints.
- Include security headers and rate limits when applicable.
- Test config before reloads or deploys.

## Backups And Recovery

- Document backup frequency, retention, and restore testing.
- Do not make destructive infrastructure changes without explicit approval.

## Monitoring

- Define health checks for deployed services.
- Emit metrics and logs using the configured observability stack.
