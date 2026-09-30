# Kuda

Kuda is a mobile-friendly control plane for building and shipping web applications with AI. It is designed as a simpler, focused alternative to OpenHands: describe the product, watch the build workflow, and manage the services involved in getting it online.

## Product direction

The default deployment combination is:

- **GitHub** for source control and repository state
- **VPS** for durable compute and worker workloads
- **Vercel** for web delivery and preview deployments
- **Supabase** for database, authentication, storage, and realtime features
- **OpenRouter** for the default free AI model route

## Architecture

The current app is a deliberately small frontend shell with explicit boundaries:

- `src/app/page.tsx` owns the dashboard experience and local interaction state, including project creation, project selection, deployment preview state, and workspace settings.
- Provider configuration is represented as typed data in the `providers` collection. This keeps the UI independent from vendor SDKs.
- The build timeline is represented as workflow steps. A future server action or API route can replace the local `startBuild` transition with an orchestrator without changing the layout contract.
- Created projects are persisted in browser `localStorage`, so a project brief and its selected-project detail survive a reload while the server orchestration layer is not yet connected.
- The UI is responsive CSS-first and has no stateful client dependency beyond React state, keeping the first version easy to deploy and scale.

A production implementation should add a server-side orchestration layer with idempotent jobs, a durable run store, and provider adapters for GitHub, VPS, Vercel, and Supabase. Credentials should remain server-side and be scoped per workspace. MCP integrations belong behind those adapters so the browser never owns provider tokens or long-running execution.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Validate

```bash
npm run lint
npm run build
```
