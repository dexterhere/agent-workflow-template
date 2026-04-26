# Prompt Template: Propose New Rule Or ADR

> Use this when an agent made a poor judgment call, the team wants to lock a
> new decision, or a new security/compliance/product constraint emerges.
> Copy this template, replace placeholders, and remove this header.

Read `.agent/AGENT.md` first. Load `catalog/general.md`.

## What Happened

`[DESCRIBE_THE_AGENT_OUTPUT_OR_TEAM_NEED]`

## Proposed Rule

`[CLEAR_IMPERATIVE_RULE]`

## Why This Rule Exists

`[TECHNICAL_OR_BUSINESS_REASON]`

## Where It Applies

- [ ] Universal - `catalog/general.md`
- [ ] Backend - `catalog/backend.md`
- [ ] Frontend - `catalog/frontend.md`
- [ ] Database - `catalog/database.md`
- [ ] DevOps - `catalog/devops.md`
- [ ] Mobile - `catalog/mobile.md`
- [ ] Domain - `catalog/domain.md`
- [ ] Stakeholders - `catalog/stakeholders.md`
- [ ] Observability - `catalog/observability.md`

## Is This A Locked Architectural Decision?

- [ ] Yes - also add to `context/decisions.json`
- [ ] No - catalog rule only

## Does This Protect A Sensitive File Or Path?

- [ ] Yes - also add to `context/boundaries.json`
- [ ] No

## Draft Rule Text

`[RULE_TEXT_AS_IT_SHOULD_APPEAR]`

## After Team Approval

1. Add to the relevant catalog file.
2. If ADR, add to `context/decisions.json`.
3. If boundary, add to `context/boundaries.json`.
4. Use the project's standard branch and commit conventions.
