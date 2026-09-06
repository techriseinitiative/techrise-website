# Design.md — TechRise Initiative

> These are opinionated defaults for a modern tech/startup site. Swap palette values once real brand assets exist — but the *system* (how color, type, and motion are used) should hold regardless of exact hex codes.

## 1. Brand Personality
- Energetic, optimistic, youth-driven
- Tech-forward, confident — closer to a modern SaaS/startup site than a nonprofit brochure
- Community and collaboration over individual achievement
- Global, inclusive tone

## 2. Theme Direction: Dark-first
Tech-forward orgs (Vercel, Linear, GitHub) read as more credible in **dark mode as the primary theme**, with light mode as a secondary option. Dark backgrounds make accent colors and glow effects pop — flat white backgrounds tend to look like a template. Build dark-first, then derive light mode from it.

## 3. Color Palette

### Dark theme (primary)
| Role | Color | Hex | Usage |
|---|---|---|---|
| Background base | Near-black | `#0A0A0F` | Page background |
| Background elevated | Charcoal | `#13131A` | Cards, panels, nav |
| Border/divider | Subtle gray | `#232330` | Card borders, dividers (low contrast, not white) |
| Primary text | Off-white | `#F5F5F7` | Headings, body text (never pure `#FFF` — too harsh) |
| Secondary text | Muted gray | `#9CA3AF` | Captions, metadata, timestamps |
| Primary accent | Electric Indigo | `#6366F1` | CTAs, links, focus states |
| Primary accent (hover) | Bright Indigo | `#818CF8` | Hover/active states |
| Secondary accent | Cyan | `#22D3EE` | Secondary highlights, used in gradients with indigo |
| Warm accent | Amber/Orange | `#F59E0B` | "Donate" CTA — deliberately warm against the cool palette so it stands out |
| Success | Emerald | `#34D399` | Confirmations |
| Error | Rose | `#F87171` | Form errors |

### Light theme (secondary)
| Role | Hex |
|---|---|
| Background | `#FAFAFA` |
| Elevated surface | `#FFFFFF` |
| Border | `#E5E7EB` |
| Primary text | `#111827` |
| Secondary text | `#6B7280` |
| Accent (same hue, darker for contrast) | `#4F46E5` |

**Rule:** never reuse the exact same accent shade across both themes — the dark-mode accent is usually too bright for light backgrounds (fails contrast) and needs a deeper variant.

## 4. Text Color & Effects for the Web

### Gradient text (for hero headlines only — don't overuse)
```css
.gradient-text {
  background: linear-gradient(90deg, #6366F1 0%, #22D3EE 100%);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}
```
Use this on ONE headline per page max (usually the hero H1). Applying it everywhere kills the effect.

### Text on elevated cards
Never place `Secondary text` gray directly on `Background base` — contrast is too low. Always pair text darkness/lightness with the surface it sits on, not the page background.

### Glow / emphasis effect (sparingly, for CTAs or key stats)
```css
.glow-accent {
  color: #818CF8;
  text-shadow: 0 0 24px rgba(99, 102, 241, 0.5);
}
```
Good for a hero stat like "500+ learners" — bad for body paragraphs (hurts readability).

### Link styling
- Default: `Primary accent` color, no underline
- Hover: brighten to `Primary accent (hover)` + underline fades in (`text-decoration-thickness` transition) — avoids the jarring "instant underline" jump

### Selection color (small detail, easy to skip, cheap to add)
```css
::selection {
  background: #6366F1;
  color: #F5F5F7;
}
```

## 5. Typography
- **Headings:** `Sora` or `Space Grotesk` (both have a distinct geometric/techy character — avoid generic `Inter`-for-everything, which now reads as "AI-generated template")
- **Body:** `Inter` or `Manrope` — weights 400–500, optimized for readability at small sizes
- **Monospace accents** (optional, nice touch for a tech brand): `JetBrains Mono` for small UI labels like "COMPETITION" badges or code snippets in project showcases

**Scale (desktop → mobile):**
| Level | Desktop | Mobile |
|---|---|---|
| H1 | 56px / 700 weight | 34px |
| H2 | 40px | 28px |
| H3 | 26px | 22px |
| Body | 17px | 16px |
| Small/caption | 14px | 13px |

Line height: 1.1–1.2 for headings, 1.6 for body text (dark backgrounds need slightly more line-height than light ones for readability).

## 6. Layout & Spacing
- Base spacing unit: 4px (Tailwind default scale)
- Max content width: 1280px, centered, 24px side padding on mobile
- Section vertical rhythm: 96–140px desktop, 56–72px mobile — dark-themed sites read better with *more* breathing room than light ones, since dense dark sections feel heavier
- Cards: 16px border-radius (slightly larger than a typical corporate site — softer, more "product" feeling), 1px `Border/divider` outline, no heavy drop shadows in dark mode (shadows barely read on dark backgrounds — use a subtle inner border-glow instead)

```css
.card {
  border: 1px solid #232330;
  border-radius: 16px;
  background: #13131A;
  transition: border-color 0.2s ease, transform 0.2s ease;
}
.card:hover {
  border-color: #6366F1;
  transform: translateY(-4px);
}
```

## 7. Motion & Micro-interactions
Subtle motion is what separates a site that feels "designed" from one that feels like a static template:
- **Hover lift** on cards (translateY(-4px) + border color shift, ~200ms ease) — used above
- **Fade-in-up on scroll** for sections entering the viewport (`opacity: 0 → 1`, `translateY(16px) → 0`, ~400ms) — use a lightweight library like `framer-motion` or CSS `@starting-style`, don't animate everything at once
- **Button press feedback**: slight scale-down (`scale(0.97)`) on `:active` for tactile feel
- **Avoid**: parallax scrolling, autoplay carousels, animated gradients that never stop moving — these read as dated/gimmicky rather than modern

## 8. Key Page Direction
- **Home:** Dark hero with gradient-text headline + one glowing stat, "What We Do" 3-column (Learn/Build/Connect) with icon + hover-lift cards, featured events/projects in horizontal scroll or grid, warm-accent donate banner as a visual break from the cool palette, footer
- **Events/Projects listing:** Grid of hover-lift cards on elevated surface color, filter bar with pill-style toggle buttons (rounded-full, active state in Primary accent)
- **Donate page:** Keep this page *lighter visually* even in dark mode — less clutter, one clear amount selector, the Amber accent button, trust badge — donation pages convert worse when they're visually busy
- **Admin dashboard:** Can use light mode by default even if the public site is dark — admins spend hours in it, and dense data tables are easier to scan on light backgrounds. Functional over stylish here.

## 9. Imagery & Icons
- Icons: `lucide-react`, rendered in `Secondary text` gray by default, `Primary accent` on hover/active
- Photography: real project/event photos with a subtle dark overlay gradient when used as hero/section backgrounds, so text stays legible on top
- Avoid generic "diverse people pointing at laptop" stock photography — favor real screenshots, real project photos, or simple abstract gradient/mesh backgrounds instead

## 10. Accessibility Notes
- Minimum contrast ratio 4.5:1 for body text — double-check gradient text and glow effects against WCAG contrast, since they're the easiest place to accidentally fail this
- All interactive elements reachable via keyboard, with a visible focus ring (use `Primary accent` at full opacity — don't rely on the default browser outline, but don't remove it without replacing it either)
- Alt text required for all meaningful images (enforce in CMS/admin forms)
- Respect `prefers-reduced-motion` — disable scroll-fade and hover-lift animations for users who've set that OS-level preference
