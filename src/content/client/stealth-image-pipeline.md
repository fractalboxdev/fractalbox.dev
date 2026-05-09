---
title: Stealth Startup (AI)
order: 2
role: Fractional CTO
featured: true
problem: "Cloud+Local creatives genAI pipelines with Agentic Evals."
stack:
  - sqlmesh
  - comfyUI
  - runpod
---

## Summary

Embedded as **Fractional CTO** for a stealth-mode AI startup to bootstrap a hybrid generative-image product in record time. The brief: ship a creative pipeline mixing multiple generation backends, keep generation economical at scale, and stand up an evaluation harness so quality can be measured rather than guessed.

## Approach

- **Hybrid pipeline, economical generation** — ComfyUI workflow surface across a local + cloud hybrid: local GPUs for dev and steady runs, RunPod for elastic bursts. Routing picks the cheapest viable backend per request; new backends slot in behind the same interface.
- **Production-grade, not vibe-coded** — auth, tenant isolation, observability, CI/CD, and typed contracts from day one. Agents accelerate authoring; rigour stays in the release path.
- **Evals by default** — sqlmesh-orchestrated evaluation pipeline scoring every model swap against a golden set. VLLM-as-judge handles objective visual scoring at scale; human-in-the-loop review covers the subjective calls. Regressions surface before they ship.

## Outcome

Product bootstrapped on a compressed timeline with the eval harness in place from day one.
