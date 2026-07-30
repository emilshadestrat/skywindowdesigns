# Sky Window Design & More — Design System

## Reference
The design replicates the structural and visual pattern of **solomonshadesolutions.com**, adapted to Sky Window Design's brand (blue, not orange) and coastal Alabama context. The Design.pdf and CONTACTUS.png are the composition ground-truth for section order and layout proportions.

---

## Chosen Approach: Coastal Service Authority

**Design Movement:** Modern Service Company — clean, trust-first, conversion-optimized. Inspired by the Solomon Shade Solutions pattern: full-bleed dark hero, white body sections, strong accent color, numbered process steps, dark footer.

**Core Principles:**
1. Dark hero with full-bleed photo background, white H1, eyebrow label in brand blue, two CTA buttons (filled + outlined)
2. White and very-light-gray alternating body sections — never dark mid-page except the process section
3. Every section has an eyebrow label (small, uppercase, tracked, brand blue), a large H2, and a subtext paragraph
4. Orange/amber accent from Solomon is replaced with Sky Window's brand blue (#1a56db / #1e40af range)

**Color Philosophy:**
- Hero background: dark charcoal photo overlay (#0f172a at 55% over photo)
- Brand primary (CTA, eyebrow, icons): Sky blue — `oklch(0.52 0.19 255)` ≈ #1a56db
- Brand dark (footer, process section bg): `oklch(0.15 0.02 255)` ≈ #0f172a
- Body background: pure white `oklch(1 0 0)`
- Surface tint (alternating sections): `oklch(0.97 0.005 255)` — very light blue-gray
- Text heading: `oklch(0.15 0.02 255)` near-black
- Text body: `oklch(0.38 0.01 255)` medium gray
- Accent gold (stats/numbers): `oklch(0.75 0.15 85)` warm amber — used only for stat numbers

**Layout Paradigm:**
- Full-width sections, max-content-width 1280px, 2rem side padding
- Hero: full-bleed, left-aligned text, right-side photo (or full-bleed with overlay on mobile)
- Product cards: horizontal scroll on mobile, 3-column grid on desktop, image-top cards
- Process: dark section, 4 numbered steps in a row, large orange step numbers
- Stats bar: dark strip below hero with 4 icon+text items
- Footer: dark background, 4 columns (logo+social | Services | Locations | Contact)

**Signature Elements:**
1. Eyebrow labels — `text-[11px] font-bold uppercase tracking-[0.18em]` in brand blue, before every H2
2. Dark stats bar — immediately below hero, 4 trust items with small icons
3. Numbered process steps — large `01 02 03 04` in brand blue, dark section background

**Interaction Philosophy:**
- CTA buttons: filled pill (brand blue bg, white text) + outlined pill (blue border, blue text)
- Hover: filled → slightly darker blue; outlined → blue bg, white text
- Cards: subtle shadow lift on hover (shadow-md → shadow-lg), image scale 1.03
- Nav: transparent on hero, white/blur on scroll

**Animation:**
- Entrance: `opacity-0 translate-y-4` → `opacity-100 translate-y-0` on scroll, 300ms ease-out
- Stagger product cards: 60ms per card
- No decorative animation — motion only confirms interaction or reveals content
- Respect `prefers-reduced-motion`

**Typography System:**
- Display/headings: **Montserrat** (700, 800) — heavy, modern, matches Solomon's bold heading weight
- Body: **Inter** (400, 500, 600) — clean, readable, professional
- Eyebrow: Inter 600, 11px, uppercase, letter-spacing 0.18em
- H1: Montserrat 800, clamp(2.75rem, 2rem+3vw, 4.5rem), white on hero
- H2: Montserrat 700, clamp(2rem, 1.6rem+1.6vw, 2.75rem), dark on body
- H3 (cards): Montserrat 700, 1.25rem
- Body: Inter 400, 1.0625rem, line-height 1.65
- CTA buttons: Inter 600, 15px

**Brand Essence:** Custom window treatments for Gulf Coast homes — the local expert who shows up, measures right, and installs clean.
**Personality:** Trustworthy · Coastal · Professional

**Brand Voice:** Direct, confident, local. Headlines name the place and the product. CTAs are action-first. No filler.
- Example headline: "Custom Window Treatments for Gulf Coast Living"
- Example CTA: "Schedule a Consultation"

**Signature Brand Color:** Sky blue #1a56db — the brand's ownable color, used for all CTAs, eyebrows, and accent icons.

---

## Style Decisions
- Montserrat 800 for H1/H2, Inter for body — no Petrona or Nunito Sans (those were design system defaults, not brand fonts)
- Stats bar uses dark charcoal background (#0f172a) immediately below hero, matching Solomon's pattern
- Process section uses dark background with large numbered steps in brand blue
- Footer uses dark background matching Solomon's footer
- All eyebrow labels: brand blue, uppercase, 11px, tracked — never gray
- Product cards: image fills top 60% of card, no border-radius on image top (matches card border-radius), subtle shadow
- "Learn More →" link in brand blue, no underline, hover darkens
