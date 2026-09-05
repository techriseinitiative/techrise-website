# Design.md — TechRise Initiative

> Note: these are starting defaults based on the brand tone (energetic, tech-forward, youth/community-driven). Swap freely once you have real brand assets or a designer's input — treat this as a placeholder design system, not final branding.

## 1. Brand Personality
- Energetic, optimistic, youth-driven
- Tech-forward but approachable — not corporate/sterile
- Community and collaboration over individual achievement
- Global, inclusive tone

## 2. Color Palette
| Role | Color | Hex | Usage |
|---|---|---|---|
| Primary | Electric Blue | `#2563EB` | CTAs, links, primary buttons |
| Primary Dark | Deep Indigo | `#1E3A8A` | Header/footer backgrounds, hover states |
| Accent | Vivid Orange | `#F97316` | Highlights, badges, "Donate" CTA |
| Success | Green | `#16A34A` | Confirmations, success states |
| Error | Red | `#DC2626` | Form errors, destructive actions |
| Neutral 900 | `#111827` | Body text |
| Neutral 500 | `#6B7280` | Secondary text |
| Neutral 100 | `#F3F4F6` | Section backgrounds |
| White | `#FFFFFF` | Base background |

Dark mode: invert neutrals (Neutral 900 background, Neutral 100 text), keep Primary/Accent roughly as-is with slightly reduced saturation.

## 3. Typography
- **Headings:** `Inter` or `Sora` (bold, modern, tech feel) — weights 600–800
- **Body:** `Inter` — weights 400–500
- **Scale (desktop → mobile):**
  - H1: 48px → 32px
  - H2: 36px → 28px
  - H3: 24px → 20px
  - Body: 16px → 16px (don't shrink body text on mobile)
  - Small/caption: 14px

## 4. Layout & Spacing
- Base spacing unit: 4px (Tailwind default scale)
- Max content width: 1280px, centered, with 24px side padding on mobile
- Section vertical rhythm: 80–120px desktop, 48–64px mobile
- Cards: 12px border-radius, subtle shadow (`shadow-md`), 1px neutral border in light mode

## 5. Components Style Direction
- **Buttons:** rounded-lg, solid primary for main CTA, outline for secondary, generous padding (px-6 py-3)
- **Cards:** used for events, projects, blog posts — image on top, content below, hover lift effect (subtle scale/shadow)
- **Forms:** clear labels above inputs, inline validation messages, focus rings in Primary color
- **Navigation:** sticky top nav, logo left, links center/right, "Donate" as a distinct accent-colored button (always visually separated from other nav items)

## 6. Key Page Direction
- **Home:** Hero with mission statement + CTA, followed by "What We Do" (3-column: Learn / Build / Connect), featured events, featured projects, donate CTA banner, footer
- **Events/Projects listing:** Grid of cards, filter/sort bar on top (later phase can add category filters)
- **Donate page:** Simple, low-friction — amount selector, one clear "Donate Now" button, trust indicators (secure payment badge)
- **Admin dashboard:** Functional over pretty — sidebar nav, data tables, minimal styling, prioritize clarity and speed over visual polish

## 7. Imagery & Icons
- Icons: `lucide-react` (clean, consistent line icons)
- Photography: real project/event photos where possible; avoid generic stock photos of "tech people pointing at screens"
- Illustrations (optional): simple line-art style if used, matching Primary/Accent palette

## 8. Accessibility Notes
- Minimum contrast ratio 4.5:1 for body text
- All interactive elements reachable via keyboard, visible focus states
- Alt text required for all meaningful images (enforce in CMS/admin forms)
- Don't rely on color alone to convey state (pair with icons/text)
