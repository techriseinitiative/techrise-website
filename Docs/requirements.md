# Requirements.md — TechRise Initiative

Legend: **[MVP]** = required for launch · **[Later]** = post-launch / phase 2

---

## 1. Public Pages
- **[MVP]** Home page — mission statement, highlights, CTA to explore programs/donate
- **[MVP]** About page — mission, story, team (optional photos/bios)
- **[MVP]** Events/Competitions listing page
- **[MVP]** Event/Competition detail page (description, dates, rules, register button)
- **[MVP]** Project Showcase gallery (grid of community-built projects)
- **[MVP]** Project detail page (description, team, links, images)
- **[MVP]** Blog/News listing + detail page
- **[MVP]** Contact/Inquiry page (form)
- **[MVP]** Donate page
- **[Later]** Sponsors/Partners page
- **[Later]** FAQ page

## 2. Authentication & Accounts
- **[MVP]** Sign up (email + password)
- **[MVP]** Login / Logout
- **[MVP]** Password reset via email
- **[MVP]** Role-based accounts: `USER`, `ADMIN` (see security.md)
- **[Later]** OAuth login (Google)
- **[Later]** Email verification requirement before registering for events

## 3. Events & Competitions
- **[MVP]** Admin can create/edit/delete an event or competition
- **[MVP]** Logged-in user can register for an event
- **[MVP]** User can view their registered events on their profile/dashboard
- **[Later]** Waitlists when an event is full
- **[Later]** Team-based registration (for competitions with teams)
- **[Later]** Automated confirmation emails on registration

## 4. Project Showcase
- **[MVP]** Admin can add/edit/remove showcased projects
- **[MVP]** Each project has: title, description, image(s), contributor names, external link (GitHub/demo)
- **[Later]** Public submission form so users can submit their own projects for review
- **[Later]** Tagging/filtering by category or tech used

## 5. Blog / News
- **[MVP]** Admin can create/edit/delete/publish blog posts (rich text)
- **[MVP]** Public listing with pagination
- **[Later]** Comments on posts
- **[Later]** Categories/tags and search

## 6. Contact / Inquiries
- **[MVP]** Public contact form (name, email, message) → stored in DB + emailed to admin
- **[MVP]** Admin can view/manage inquiries in dashboard
- **[Later]** Auto-reply email confirmation to sender

## 7. Donations
- **[MVP]** Donate page with fixed + custom amount options
- **[MVP]** Secure payment via Stripe Checkout (one-time donation)
- **[MVP]** Donation confirmation page + email receipt
- **[Later]** Recurring/monthly donations
- **[Later]** Public donor wall (opt-in, with amount hidden or shown per donor's choice)
- **[Later]** Donation impact stats on homepage ("$X raised, Y students supported")

## 8. Admin Dashboard
- **[MVP]** Protected `/admin` route, `ADMIN` role only
- **[MVP]** Manage: blog posts, events/competitions, showcase projects, inquiries
- **[MVP]** View list of registered users (read-only for v1)
- **[MVP]** View donation history (read-only, via Stripe dashboard link or synced records)
- **[Later]** Analytics widgets (signups, donations over time)
- **[Later]** Role management UI (promote a user to admin)

## 9. Non-Functional Requirements
- **[MVP]** Fully responsive (mobile, tablet, desktop)
- **[MVP]** Page load performance — Core Web Vitals in "Good" range
- **[MVP]** Accessible (WCAG AA basics — alt text, contrast, keyboard nav)
- **[MVP]** Form validation on client + server (never trust client alone)
- **[MVP]** HTTPS enforced (handled by Vercel by default)
- **[Later]** SEO metadata + Open Graph tags per page
- **[Later]** Multi-language support

## 10. Explicitly Out of Scope (v1)
- Native mobile apps
- Paid courses/certifications
- Real-time chat/messaging between users
- Multi-currency donations
