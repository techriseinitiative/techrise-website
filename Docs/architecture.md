# Architecture.md — TechRise Initiative

## High-Level Flow

```
Client (Browser)
      ↓
Next.js App Router (routing, layouts, pages)
      ↓
Server Components (data reads)  /  Server Actions (mutations)
      ↓
Service Layer (business logic, auth checks, validation)
      ↓
Prisma ORM (type-safe queries, migrations)
      ↓
PostgreSQL (single source of truth)
```

## Layer Responsibilities

### 1. Client (Browser)
- Renders UI, handles client-side interactivity (forms, modals, filters)
- Talks to the server only via Server Actions or, rarely, internal API routes
- No direct database access, no business logic — purely presentational + local UI state

### 2. Next.js App Router
- File-based routing (`app/`) for pages: public site, auth, dashboard, admin
- Layouts (`layout.tsx`) for shared nav/footer per route group
- Route groups: `(public)`, `(auth)`, `(dashboard)`, `(admin)` — each with its own layout and access rules

### 3. Server Components / Server Actions
- **Server Components** — default for all data-reading pages (event list, blog list, project gallery). Fetch data directly via the Service Layer at render time — no client-side fetch needed.
- **Server Actions** — used for all mutations: sign up, login, event registration, contact form, admin CRUD, donation initiation. Each Server Action:
  1. Validates input with Zod
  2. Checks auth/role via the session
  3. Calls the Service Layer
  4. Returns a typed result (success/error) to the client

### 4. Service Layer
- Plain TypeScript functions grouped by domain: `userService`, `eventService`, `projectService`, `blogService`, `donationService`, `inquiryService`
- Owns business rules (e.g., "can't register for an event after its deadline", "only ADMIN can publish a post")
- The only layer allowed to call Prisma directly
- Keeps Server Actions/Components thin — they orchestrate, the service layer decides

### 5. Prisma ORM
- Single `schema.prisma` defining all models (see database.md)
- Migrations tracked in version control (`prisma/migrations`)
- Generates a type-safe client used exclusively inside the Service Layer

### 6. PostgreSQL
- Hosted on Neon (or Vercel Postgres)
- Single source of truth for users, events, registrations, projects, blog posts, inquiries, donations

## Cross-Cutting Concerns

### Authentication
- Auth.js manages sessions (JWT-based session strategy, works well with Vercel's serverless functions)
- Session/role is checked at the top of every protected Server Action and in middleware for protected routes (`/dashboard`, `/admin`)

### Payments (Donations)
- Client → Server Action creates a Stripe Checkout Session → redirect to Stripe-hosted checkout
- Stripe webhook (separate API route, since Stripe calls it directly, not via a Server Action) → verifies event → Service Layer records the donation in DB

### File Uploads
- Client uploads directly to Vercel Blob (signed upload URL generated via a Server Action) → URL saved to DB via Service Layer — avoids routing large files through the Next.js server

### Email
- Service Layer calls Resend directly for transactional emails (contact notifications, receipts, password resets) — kept inside services, never called from the client

## Why Server Actions over a separate REST API
Since frontend and backend live in the same Next.js app and there's no separate mobile app or third-party API consumer planned for v1, Server Actions remove the need for a duplicate API layer (no separate route handlers, no manual fetch/JSON boilerplate). If a public API becomes necessary later (e.g., a mobile app), route handlers under `app/api/` can be added without restructuring the Service Layer — the services are already framework-agnostic.

## Environments
- **Local** — local `.env`, Neon dev branch (or local Postgres)
- **Preview** — Vercel preview deployments per PR, pointed at a Neon preview branch
- **Production** — Vercel production deployment, production Neon/Postgres instance, production Stripe keys
