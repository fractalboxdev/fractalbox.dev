---
title: Spaceship
logoSrc: src/assets/logo_spaceship.png
order: 7
logoClass: pure-white
featured: true
role: Consulting Software Architect
problem: "A global logistics SaaS whose business logic — carrier rules, routing, partner integrations — changed faster than its codebase could keep up."
outcome: "A workflow engine that absorbs carrier and business-model change as configuration, on an architecture re-built to scale horizontally through the B2B2C transition."
stack:
  - Laravel
  - NestJS
  - fp-ts
  - Retool
  - AWS
---

## Summary

Spaceship runs shipment management for global logistics customers, orchestrating carrier partners like FedEx and UPS. Engaged as consulting software architect to tame the platform's fastest-moving part: business logic that shifted with every carrier, market, and pricing model.

## Approach

- **A workflow engine for living business logic** — designed and led the development of a workflow engine that describes logistics flows as data, so ever-changing carrier rules and partner integrations ship as workflow changes rather than rewrites — with a typed functional core in fp-ts, the spiritual ancestor of Effect-TS.
- **Stateful to horizontally scalable** — modernised legacy stateful servers into a horizontally scalable architecture, removing the ceiling on the platform's growth.
- **B2B2C transition** — re-platformed the operational layer for the shift from pure B2B to B2B2C: manual back-office steps became automated pipelines, with internal consoles built on Retool giving operations direct, safe levers over live workflows.

## Outcome

Carrier changes and the B2B2C pivot shipped as workflow updates, not rewrites — the engine outlasted every iteration of the business model it described.
