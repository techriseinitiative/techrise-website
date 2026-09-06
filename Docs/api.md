# Api.md — TechRise Initiative

Since the architecture uses **Server Actions** as the primary mutation mechanism (not a traditional REST API), this document covers both:
1. **Server Actions** — internal mutations, called directly from forms/components
2. **Route Handlers** (`app/api/...`) — used only where a Server Action isn't possible (webhooks, or future external consumers)

---

## Server Actions
claude
### Auth
| Action | Input | Output | Notes |
|---|---|---|---|
| `signUp` | `{ name, email, password }` | `{ success, error? }` | Hashes password, creates User |
| `login` | `{ email, password }` | `{ success, error? }` | Handled via Auth.js Credentials provider |
| `requestPasswordReset` | `{ email }` | `{ success }` | Sends reset email via Resend |
| `resetPassword` | `{ token, newPassword }` | `{ success, error? }` | |

### Events / Competitions
| Action | Input | Output | Notes |
|---|---|---|---|
| `createEvent` (ADMIN) | `{ title, description, type, startDate, endDate, capacity, ... }` | `{ success, event }` | |
| `updateEvent` (ADMIN) | `{ id, ...fields }` | `{ success, event }` | |
| `deleteEvent` (ADMIN) | `{ id }` | `{ success }` | |
| `registerForEvent` | `{ eventId }` | `{ success, error? }` | Requires auth; checks capacity/deadline |
| `cancelRegistration` | `{ eventId }` | `{ success }` | |

### Projects (Showcase)
| Action | Input | Output | Notes |
|---|---|---|---|
| `createProject` (ADMIN) | `{ title, description, imageUrls, externalLink, contributors }` | `{ success, project }` | |
| `updateProject` (ADMIN) | `{ id, ...fields }` | `{ success }` | |
| `deleteProject` (ADMIN) | `{ id }` | `{ success }` | |
| `submitProject` (Later phase) | `{ title, description, ... }` | `{ success }` | Public submission → status `PENDING` |

### Blog
| Action | Input | Output | Notes |
|---|---|---|---|
| `createPost` (ADMIN) | `{ title, content, coverImageUrl }` | `{ success, post }` | Draft by default |
| `updatePost` (ADMIN) | `{ id, ...fields }` | `{ success }` | |
| `publishPost` (ADMIN) | `{ id }` | `{ success }` | Sets status + publishedAt |
| `deletePost` (ADMIN) | `{ id }` | `{ success }` | |

### Contact / Inquiries
| Action | Input | Output | Notes |
|---|---|---|---|
| `submitInquiry` | `{ name, email, message }` | `{ success, error? }` | Public, no auth required. Stores + emails admin |
| `updateInquiryStatus` (ADMIN) | `{ id, status }` | `{ success }` | |

### Donations
| Action | Input | Output | Notes |
|---|---|---|---|
| `createDonationCheckout` | `{ amount, donorName?, donorEmail? }` | `{ checkoutUrl }` | Creates Stripe Checkout Session, returns redirect URL |

### File Uploads
| Action | Input | Output | Notes |
|---|---|---|---|
| `getUploadUrl` (ADMIN/USER) | `{ fileName, fileType }` | `{ uploadUrl }` | Signed URL for direct-to-Vercel-Blob upload |

---

## Route Handlers (`app/api/`)

### `POST /api/webhooks/stripe`
- Called by Stripe directly (not a Server Action — must be a real HTTP endpoint)
- Verifies webhook signature
- On `checkout.session.completed`: updates `Donation.status = SUCCEEDED`, sends receipt email
- On failure events: updates `Donation.status = FAILED`

### `GET /api/auth/[...nextauth]`
- Auth.js session/callback handling (framework requirement, not custom logic)

---

## Response Convention
All Server Actions return a consistent shape:
```ts
type ActionResult<T> =
  | { success: true; data: T }
  | { success: false; error: string };
```
This keeps client-side handling predictable regardless of which action was called.

## Auth Enforcement
Every Server Action that mutates data checks the session and role **inside the Service Layer**, not just in the UI. UI-level hiding of buttons/links is a UX nicety, never the actual access control.
