# Techstack.md — TechRise Initiative

## Hosting
- **Vercel** — hosting, CI/CD, preview deployments per PR

## Framework
- **Next.js (App Router)** + **TypeScript**
  - Server Components by default; Client Components only where interactivity is needed
  - Server Actions for mutations (form submissions, registrations, admin CRUD)

## Styling / UI
- **Tailwind CSS** — utility-first styling
- **shadcn/ui** — unstyled, accessible component primitives (buttons, dialogs, forms, tables) built on Radix UI
- **lucide-react** — icon set

## Database & ORM
- **PostgreSQL** — hosted on **Neon** (serverless Postgres, generous free tier, branching for dev/preview) or **Vercel Postgres** — either works well with Vercel; Neon recommended for branching support
- **Prisma ORM** — schema, migrations, type-safe queries

## Authentication
- **Auth.js (NextAuth v5)** — email/password (Credentials provider) at launch, Google OAuth added later
- Passwords hashed with **bcrypt**

## Validation
- **Zod** — schema validation for all forms and Server Action inputs (client + server)

## Payments (Donations)
- **Stripe** — Checkout Sessions for one-time donations; Stripe webhooks to confirm payment and record donation in DB

## Email
- **Resend** — transactional emails (contact form notifications, password reset, donation receipts)
- Optional: **React Email** for building email templates in JSX

## File/Image Storage
- **Vercel Blob** — for project showcase images, blog post images, event banners uploaded via admin dashboard

## State/Data Fetching (client-side)
- **TanStack Query** — only where client-side fetching/caching is needed beyond Server Components (e.g., admin dashboard live tables)

## Rich Text (Blog)
- **Tiptap** — rich text editor for admin blog post creation, stored as HTML/JSON in DB

## Dev Tooling
- **ESLint + Prettier** — linting/formatting
- **Zod + TypeScript** — end-to-end type safety
- **Vitest** or **Jest** — unit tests (later phase)
- **Playwright** — e2e tests (later phase)

## Environment/Config
- `.env.local` for local dev secrets, Vercel Environment Variables for staging/prod
- Separate Neon DB branches (or separate Vercel Postgres instances) for dev/staging/prod

## Why this stack
- Everything deploys natively to Vercel with minimal config
- Next.js App Router + Server Actions matches the architecture (no separate API server needed for most operations)
- Prisma + PostgreSQL gives relational integrity needed for users, events, registrations, donations
- Stripe + Resend are the industry-standard, low-maintenance choices for payments and transactional email
- shadcn/ui + Tailwind lets the team move fast without fighting a heavy component library
