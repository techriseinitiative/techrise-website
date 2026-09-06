# TechRise Initiative Website

> Empowering individuals through technology, innovation, and global collaboration.

## Tech Stack

Next.js 16 (App Router) · TypeScript · Tailwind CSS · Prisma 6 · PostgreSQL · NextAuth v5 · Stripe

Full docs: see [`Docs/`](Docs/)

---

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
# Then fill in all values in .env
```

**Required values:**
- `DATABASE_URL` — Neon PostgreSQL connection string ([neon.tech](https://neon.tech))
- `AUTH_SECRET` — Generate with: `openssl rand -base64 32`
- `STRIPE_SECRET_KEY` — From [Stripe Dashboard](https://dashboard.stripe.com)
- `RESEND_API_KEY` — From [Resend](https://resend.com)

### 3. Database setup

```bash
# Push schema to DB (creates tables)
npm run db:push

# Run migrations (recommended for production)
npm run db:migrate

# Seed with sample data
npm run db:seed
```

### 4. Start dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Database Commands

| Command | Description |
|---|---|
| `npm run db:generate` | Generate Prisma client from schema |
| `npm run db:push` | Push schema to DB (dev — fast, no migration files) |
| `npm run db:migrate` | Create & apply migrations (version-controlled) |
| `npm run db:seed` | Populate DB with sample data |
| `npm run db:studio` | Open Prisma Studio (GUI DB viewer) |

---

## Test Accounts

After seeding, log in at `/login`:

| Account | Email | Password |
|---|---|---|
| Admin | admin@techrise.org | password123 |
| User | priya@techrise.org | password123 |
| User | daniel@techrise.org | password123 |

---

## Project Structure

```
src/
├── actions/         # Server Actions (auth, blog, donation, events, inquiry, projects)
├── app/            # Next.js App Router pages
│   ├── (admin)/   # Admin dashboard routes
│   ├── (dashboard)/ # User dashboard routes
│   └── [public]/   # Public pages
├── components/     # UI components
├── lib/
│   ├── auth.ts    # NextAuth config
│   ├── prisma.ts  # Prisma client
│   └── services/  # Business logic layer
└── validations/    # Zod schemas
```

---

## Deployment

Deploy to Vercel:

1. Push to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy

Vercel runs `prisma migrate deploy` automatically as part of the build step.
