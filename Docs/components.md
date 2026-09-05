# Components.md — TechRise Initiative

Reusable UI components, built on **shadcn/ui** primitives + Tailwind. Organize under `components/` — `components/ui/` for shadcn primitives (auto-generated, don't hand-edit heavily), `components/shared/` for app-specific composites below.

## Layout Components
- **`Navbar`** — sticky top nav, logo, links, auth state (login/logout or user menu), highlighted "Donate" button
- **`Footer`** — mission tagline, quick links, social links, contact email
- **`PageContainer`** — max-width wrapper with consistent horizontal padding, used on every page

## Cards
- **`EventCard`** — image, title, date, type badge (Event/Competition), "View Details" link. Used on home + events listing
- **`ProjectCard`** — image, title, short description, contributor names, external link icon
- **`BlogPostCard`** — cover image, title, excerpt, published date, author

## Forms
- **`ContactForm`** — name/email/message fields, client + server (Zod) validation, submit via `submitInquiry` Server Action
- **`AuthForm`** — shared shell for login/signup (toggle mode), email/password fields, error display
- **`EventRegistrationButton`** — handles register/cancel state, shows capacity/deadline messaging
- **`DonationForm`** — preset amount buttons + custom input, triggers `createDonationCheckout`

## Admin-Specific
- **`DataTable`** — generic sortable/paginated table (wraps shadcn `Table`), used for managing events, projects, posts, inquiries, users
- **`AdminSidebar`** — nav for admin dashboard sections
- **`RichTextEditor`** — Tiptap wrapper used for blog post content
- **`ImageUploader`** — drag/drop uploader that requests a signed URL (`getUploadUrl`) and uploads directly to Vercel Blob

## Feedback / Status
- **`StatusBadge`** — colored badge for statuses (DRAFT/PUBLISHED, PENDING/CONFIRMED, etc.) — maps status enum to color from design.md palette
- **`Toast`** — success/error notifications after Server Action calls (shadcn `Toast` / `sonner`)
- **`EmptyState`** — shown when a list has no items (e.g., "No events yet")
- **`LoadingSpinner`** / **`Skeleton`** — loading states for async content

## Conventions
- Every component is typed with an explicit `Props` interface — no implicit `any`
- Server Components by default; add `"use client"` only when the component needs interactivity (forms, buttons with state, modals)
- Components stay presentational — they call Server Actions passed in or imported directly, but never contain business logic (that belongs in the Service Layer)
- Shared components live in `components/shared/`; anything used only on one page can live colocated with that page's route folder
