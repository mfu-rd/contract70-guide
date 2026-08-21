# BistroMenu Design System — v3 (Applied)

This file documents the **actual design system implemented** in `index.html`.
Update this file whenever design tokens change.

---

## Colors

### Light Mode

| Token | Value | Usage |
|-------|-------|-------|
| `--bg` | `#EDE0C5` | Page background (warm parchment) |
| `--surface` | `#FFFFFF` | Card, nav, sidebar backgrounds |
| `--surface-tint` | `#F9F4EC` | Checklist items, location boxes |
| `--border` | `#D8C9AD` | Card borders, dividers |
| `--shadow` | warm 2px/8px | Card shadow |
| `--primary` | `#881337` | Burgundy — headings, buttons, nav active |
| `--primary-hover` | `#6B1030` | Button hover |
| `--primary-fg` | `#FFFFFF` | Text on primary buttons |
| `--primary-muted` | `rgba(136,19,55,.08)` | Badge backgrounds |
| `--secondary` | `#B45309` | Amber — sub-headings, bullets, icons |
| `--text-1` | `#1A0E08` | Primary body text |
| `--text-2` | `#6B4A38` | Secondary/muted text |
| `--text-3` | `#A08870` | Tertiary/placeholder text |
| `--nav-bg` | `#FFFFFF` | Nav/header background |
| `--nav-text` | `#7A5A48` | Nav link default color |

### Dark Mode

| Token | Value | Usage |
|-------|-------|-------|
| `--bg` | `#0C0907` | Near-black espresso background |
| `--surface` | `#1C1210` | Card backgrounds (dark warm wood) |
| `--surface-tint` | `#221510` | Subtle tinted rows |
| `--border` | `#332018` | Card borders |
| `--primary` | `#881337` | Burgundy (same — works on dark) |
| `--primary-hover` | `#A31A44` | Button hover (slightly lighter) |
| `--secondary` | `#D97706` | Amber (brighter than light mode) |
| `--text-1` | `#EDE0CC` | Warm cream |
| `--text-2` | `#B09078` | Warm medium |
| `--text-3` | `#6A5040` | Dark muted |
| `--nav-bg` | `#150E0B` | Nav background |

### Alert Colors

| Variant | Light bg | Light text | Dark bg | Dark text |
|---------|----------|------------|---------|-----------|
| `warn` | `rgba(239,68,68,.06)` | `#B91C1C` | `rgba(180,40,40,.12)` | `#E89090` |
| `info` | `rgba(124,58,237,.06)` | `#6D28D9` | `rgba(130,100,220,.1)` | `#B8A8E8` |
| `ok` | `rgba(5,150,105,.06)` | `#047857` | `rgba(40,160,100,.09)` | `#80D4A8` |
| `pend` | `rgba(180,83,9,.07)` | `#92400E` | `rgba(185,130,30,.1)` | `#DEBA78` |

---

## Typography

| Role | Font | Weight | Notes |
|------|------|--------|-------|
| EN display heading | Playfair Display | 600, 700 | `h1`, `h2`, portal title |
| EN body | Lora | 400, 500 | Paragraphs, lists, nav links |
| **TH all** | **Prompt** | **300, 400, 500, 600** | **All Thai text — enforced with `!important`** |

**Thai font rule:** `.th { font-family: 'Prompt', sans-serif !important; }` and `.th * { font-family: 'Prompt', sans-serif; }` — ensures Prompt applies regardless of parent element's font.

Google Fonts import:
```
Playfair+Display:wght@600;700 | Lora:wght@400;500 | Prompt:wght@300;400;500;600
```

---

## Spacing

Base: 4px grid. Common values:
- `xs` 4px · `sm` 8px · `md` 12px · `lg` 16px · `xl` 24px · `2xl` 32px

Card padding: `1.75rem` (28px) desktop, `1.25rem` (20px) mobile

---

## Border Radius

| Element | Radius |
|---------|--------|
| Cards, portal | `12px` |
| Checklist items, location boxes, alerts | `8px` |
| Buttons (primary, ghost) | `8px` |
| Badges, chips, nav lang toggle | `9999px` (pill) |
| Number circles (step-n, card-num, cn) | `9999px` |
| Sidebar step links (hover state) | `8px` |

---

## Shadows

- **`--shadow`** (cards, portal): `0 2px 8px rgba(80,40,0,.08), 0 0 0 1px rgba(180,130,60,.06)`
- **`--shadow-sm`** (sidebar, timeline): `0 1px 3px rgba(80,40,0,.06)`
- Dark mode shadows use `rgba(0,0,0,...)` at higher opacity (`.5`, `.35`)

---

## Layout

### Desktop (≥ 960px)
```
┌──────────────────────────────────────┐
│  HEADER (full width, burgundy)       │
│  NAV (sticky, single row)            │
├──────────────┬───────────────────────┤
│  Sidebar     │  Main content         │
│  260px       │  flex-1               │
│  (sticky)    │  Sections 1–4         │
│              │  Portal               │
└──────────────┴───────────────────────┘
```
- `max-width: 1280px`, `padding: 2rem`
- Sidebar: `position: sticky; top: calc(52px + 1.25rem)`

### Mobile (< 960px)
- Single column, sidebar hidden
- Horizontal timeline strip visible above sections
- Nav: **2 rows** — brand+controls top, scrollable links below

### Nav Scroll Offset
- Desktop (`--nav-h: 52px`): single-row nav
- Mobile (`--nav-h: 92px`): 2-row nav (~48px top + ~44px links)

---

## Components

### Card
```css
background: var(--surface);
border: 1px solid var(--border);
border-radius: 12px;
box-shadow: var(--shadow);
padding: 1.75rem;
```
Card header uses a `1px dashed` bottom border as divider.

### Sidebar Card
Same token set as `.card` but lighter shadow (`--shadow-sm`).

### Nav (Mobile — 2-row)
Row 1: brand (`flex: 1`) + controls (flex-shrink: 0)
Row 2: `width: 100%; order: 1; overflow-x: auto` — scrollable links with active underline 2px primary

### Buttons
- **Primary** (`.fbtn`, `.portal-btn`): `var(--primary)` fill, `8px` radius
- **Ghost link** (`.dlink`): pill shape, `var(--primary-muted)` bg

### Alerts (`.al`)
Four variants: `.warn`, `.info`, `.ok`, `.pend` — semi-transparent tinted bg + matching border + colored text. `border-radius: 8px`.

### Checklist Items (`.cl li`)
`background: var(--surface-tint)`, `border-radius: 8px`, `1px solid var(--border)`

---

## Dark Mode Implementation

Three-layer approach:
1. `:root` — light defaults
2. `@media (prefers-color-scheme: dark) :root:not([data-theme="light"])` — OS dark
3. `:root[data-theme="dark"]` / `:root[data-theme="light"]` — manual toggle wins

Toggle button: `#btn-theme` shows `🌙` in light, `☀️` in dark. Preference persisted in `localStorage('theme')`.

---

## Do's and Don'ts

1. **Do** use Prompt for ALL Thai text — never mix with Lora or Playfair Display
2. **Do** use `--secondary` (amber) for decorative accents: bullets, sub-heading bars, timeline highlights
3. **Do** use `--primary` (burgundy) for interactive elements: buttons, active states, card titles
4. **Don't** use bright/neon colors in dark mode — keep alerts muted (low opacity, soft text)
5. **Do** use `12px` radius on cards and `8px` on inline elements (chips stay pill `9999px`)
6. **Don't** add heavy drop shadows — keep them warm and subtle (2–3% black)
7. **Do** keep mobile nav controls (theme toggle + lang toggle) in the TOP row so they're immediately visible without horizontal scrolling
8. **Don't** expand max-width beyond `1280px` — content becomes too wide to read comfortably
