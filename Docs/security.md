# Security.md — TechRise Initiative

## 1. Authentication
- **Auth.js (NextAuth v5)** with Credentials provider (email + password) at launch
- Passwords hashed with **bcrypt** (cost factor 10–12), never stored or logged in plaintext
- Sessions: JWT-based (works cleanly with Vercel serverless — no server-side session store needed)
- Password reset via time-limited, single-use token sent by email (Resend)
- Rate-limit login and signup attempts (see §5) to slow brute-force attempts

## 2. Authorization / Roles
Two roles at launch:
- **`USER`** — can register for events, view own dashboard, submit inquiries, donate
- **`ADMIN`** — everything a USER can do, plus manage events, projects, blog posts, inquiries, view users/donations

**Rule:** authorization is enforced in the **Service Layer**, on every mutation, regardless of what the UI shows. Never trust that "the button was hidden" is sufficient protection.

```ts
// Example pattern inside a service function
if (session.user.role !== "ADMIN") {
  throw new Error("Unauthorized");
}
```

Protected routes (`/dashboard`, `/admin/*`) are also gated at the **middleware** level for defense in depth — redirect unauthenticated/unauthorized users before the page even renders.

## 3. Input Validation
- **Zod schemas** define the shape of every form and Server Action input
- Validation runs **twice**: once client-side (fast feedback), once server-side inside the Server Action (source of truth — client validation can always be bypassed)
- Reject unknown/extra fields (`.strict()` on Zod schemas) to avoid mass-assignment issues
- Sanitize any rich text (blog content) before rendering — Tiptap output should be sanitized or rendered through a safe HTML renderer to prevent stored XSS

## 4. Data Protection
- All traffic over HTTPS (enforced automatically by Vercel)
- Environment variables (DB connection string, Stripe keys, Resend API key, Auth secret) stored in Vercel Environment Variables — never committed to git
- `.env*` files in `.gitignore`
- Database connection uses least-privilege credentials where possible (separate roles for migrations vs. runtime queries, if the DB provider supports it)

## 5. Abuse Prevention
- Rate limiting on: login, signup, password reset, contact form submission (prevents spam/brute force) — can use a simple in-memory/edge solution or a service like Upstash Ratelimit
- CAPTCHA (e.g., Cloudflare Turnstile) on public contact form and signup if spam becomes an issue post-launch
- CSRF protection: Server Actions in Next.js include built-in origin checking; still avoid exposing sensitive mutations via GET requests

## 6. Payments Security (Stripe)
- Never handle raw card data — all payment collection happens on Stripe-hosted Checkout
- Stripe webhook signature verified using the webhook signing secret before processing any event
- Webhook endpoint is idempotent (checks `stripeSessionId` uniqueness) to avoid double-processing on retries

## 7. File Uploads
- Uploads go directly to Vercel Blob via short-lived signed URLs — the app server never stores raw files
- Validate file type and size limits before issuing a signed URL (e.g., images only, max 5MB)

## 8. Admin Dashboard Hardening
- Admin routes require both an authenticated session **and** `role === ADMIN`, checked server-side
- Consider IP allowlisting or additional MFA for admin accounts in a later phase, given it controls content and views donation data
- Audit-log sensitive admin actions (later phase): who published what, when a role was changed

## 9. Dependency & Deployment Hygiene
- Keep dependencies updated (`npm audit`, Dependabot or similar)
- Use Vercel Preview Deployments to test changes before merging to production
- Restrict who has access to production environment variables and the Vercel project itself

## 10. Incident Response (basic)
- If a security issue is found: rotate affected secrets/keys immediately, patch, then investigate scope
- Keep the admin contact email (techriseinitiative53@gmail.com) monitored for any responsible disclosure reports
