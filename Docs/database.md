# Database.md — TechRise Initiative

Database: **PostgreSQL**, managed via **Prisma ORM**. This document describes the core models. Exact `schema.prisma` should mirror this.

## Entity Overview
```
User ──< EventRegistration >── Event
User ──< Donation
User ──< Inquiry (optional, if logged in)
User ──< BlogPost (author, ADMIN only)
User ──< Project (submitted_by, optional)
```

## Models

### User
| Field | Type | Notes |
|---|---|---|
| id | String (cuid) | PK |
| name | String | |
| email | String | unique |
| passwordHash | String | bcrypt hash |
| role | Enum: `USER`, `ADMIN` | default `USER` |
| createdAt | DateTime | default now() |
| updatedAt | DateTime | auto-updated |

### Event
(Covers both "events" and "competitions")
| Field | Type | Notes |
|---|---|---|
| id | String (cuid) | PK |
| title | String | |
| slug | String | unique, for URLs |
| description | Text | |
| type | Enum: `EVENT`, `COMPETITION` | |
| startDate | DateTime | |
| endDate | DateTime | |
| registrationDeadline | DateTime | nullable |
| capacity | Int | nullable = unlimited |
| bannerImageUrl | String | nullable |
| status | Enum: `DRAFT`, `PUBLISHED`, `CLOSED` | |
| createdAt / updatedAt | DateTime | |

### EventRegistration
| Field | Type | Notes |
|---|---|---|
| id | String (cuid) | PK |
| userId | String | FK → User |
| eventId | String | FK → Event |
| registeredAt | DateTime | default now() |
| status | Enum: `CONFIRMED`, `WAITLISTED`, `CANCELLED` | |
| Unique constraint | (userId, eventId) | prevent duplicate registration |

### Project (Showcase)
| Field | Type | Notes |
|---|---|---|
| id | String (cuid) | PK |
| title | String | |
| slug | String | unique |
| description | Text | |
| imageUrls | String[] | array of Blob URLs |
| externalLink | String | nullable (GitHub/demo) |
| contributors | String[] | display names (simple v1; can normalize to a join table later) |
| submittedById | String | FK → User, nullable |
| status | Enum: `PENDING`, `APPROVED`, `REJECTED` | for later public-submission phase |
| createdAt / updatedAt | DateTime | |

### BlogPost
| Field | Type | Notes |
|---|---|---|
| id | String (cuid) | PK |
| title | String | |
| slug | String | unique |
| content | Text/JSON | HTML or Tiptap JSON |
| coverImageUrl | String | nullable |
| authorId | String | FK → User (ADMIN) |
| status | Enum: `DRAFT`, `PUBLISHED` | |
| publishedAt | DateTime | nullable |
| createdAt / updatedAt | DateTime | |

### Inquiry
| Field | Type | Notes |
|---|---|---|
| id | String (cuid) | PK |
| name | String | |
| email | String | |
| message | Text | |
| userId | String | FK → User, nullable (public form can be anonymous) |
| status | Enum: `NEW`, `READ`, `RESOLVED` | |
| createdAt | DateTime | |

### Donation
| Field | Type | Notes |
|---|---|---|
| id | String (cuid) | PK |
| userId | String | FK → User, nullable (guest donations allowed) |
| amount | Int | in cents |
| currency | String | default `usd` |
| stripeSessionId | String | unique |
| stripePaymentIntentId | String | nullable |
| status | Enum: `PENDING`, `SUCCEEDED`, `FAILED` | updated via Stripe webhook |
| donorName | String | nullable, for guest donations |
| donorEmail | String | nullable, for receipt |
| createdAt | DateTime | |

## Indexing Notes
- `User.email` — unique index (login lookups)
- `Event.slug`, `Project.slug`, `BlogPost.slug` — unique indexes (URL lookups)
- `EventRegistration(userId, eventId)` — composite unique index
- `Donation.stripeSessionId` — unique index (webhook idempotency)

## Migration Strategy
- All schema changes go through `prisma migrate dev` locally, committed to `prisma/migrations/`
- `prisma migrate deploy` runs automatically on production deploy (via Vercel build step or a deploy hook)
- Never edit the production DB schema manually — always through a migration file
