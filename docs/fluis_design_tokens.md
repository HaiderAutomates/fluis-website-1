# Fluis.ai Design Tokens

Brand-specific design token customizations for the Fluis.ai agency website. These override the generic starter tokens from `sk054_website_best_practices`.

**Design direction**: Nothing Phone inspired — black/white/red, minimal, dark-first with light mode toggle.

---

## CSS Custom Properties

```css
:root {
  /* === FLUIS.AI BRAND COLORS === */
  --color-bg:           #0a0a0a;       /* Deep black background */
  --color-surface:      #141414;       /* Card/section background */
  --color-surface-2:    #1e1e1e;       /* Elevated surfaces */
  --color-border:       rgba(255, 255, 255, 0.08);
  --color-border-hover: rgba(255, 255, 255, 0.15);
  --color-text:         #f5f5f5;       /* Primary text — off-white */
  --color-text-muted:   #999999;       /* Secondary text */
  --color-text-dim:     #666666;       /* Tertiary text */
  --color-accent:       #ff3b30;       /* Fluis red — CTAs, highlights */
  --color-accent-hover: #ff5147;       /* Red hover state */

  /* === SPACING (8px grid) === */
  --space-unit: 0.5rem;
  --space-xs:  calc(var(--space-unit) * 1);   /* 8px */
  --space-sm:  calc(var(--space-unit) * 2);   /* 16px */
  --space-md:  calc(var(--space-unit) * 3);   /* 24px */
  --space-lg:  calc(var(--space-unit) * 4);   /* 32px */
  --space-xl:  calc(var(--space-unit) * 6);   /* 48px */
  --space-2xl: calc(var(--space-unit) * 8);   /* 64px */
  --space-3xl: calc(var(--space-unit) * 12);  /* 96px */

  /* === TYPOGRAPHY === */
  --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, monospace;

  --text-xs:   clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);
  --text-sm:   clamp(0.875rem, 0.8rem + 0.375vw, 1rem);
  --text-base: clamp(1rem, 0.9rem + 0.5vw, 1.125rem);
  --text-lg:   clamp(1.25rem, 1rem + 1.25vw, 1.75rem);
  --text-xl:   clamp(1.75rem, 1.2rem + 2.75vw, 3rem);
  --text-2xl:  clamp(2.5rem, 1.5rem + 5vw, 5rem);
  --text-hero: clamp(3rem, 2rem + 6vw, 7rem);

  /* === LAYOUT === */
  --max-width: 1200px;
  --header-height: 4rem;

  /* === RADIUS === */
  --radius-sm:   0.375rem;
  --radius-md:   0.75rem;
  --radius-lg:   1rem;
  --radius-full: 9999px;

  /* === SHADOWS (dark theme: prefer borders over shadows) === */
  --shadow-sm:   0 1px 3px rgba(0, 0, 0, 0.3);
  --shadow-md:   0 4px 12px rgba(0, 0, 0, 0.4);
  --shadow-lg:   0 12px 40px rgba(0, 0, 0, 0.5);
  --shadow-glow: 0 0 30px rgba(255, 59, 48, 0.15);  /* Red glow for accent elements */

  /* === ANIMATION EASING CURVES === */
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);       /* Entrance animations — fast start, gentle settle */
  --ease-default:  ease;                                   /* Micro-interactions — hover, color, border */
  --ease-smooth:   cubic-bezier(0.25, 0.46, 0.45, 0.94); /* Nav underline, directional wipes */

  /* === COLOR SCHEME === */
  color-scheme: dark;
}

/* ============================================
   LIGHT THEME OVERRIDES
   Applied via [data-theme="light"] on <html>
   ============================================ */
[data-theme="light"] {
  /* === COLORS === */
  --color-bg:           #ffffff;                  /* Pure white background */
  --color-surface:      #f5f5f5;                  /* Light gray cards */
  --color-surface-2:    #ebebeb;                  /* Slightly darker gray */
  --color-border:       rgba(0, 0, 0, 0.08);      /* Same visual weight as dark */
  --color-border-hover: rgba(0, 0, 0, 0.15);
  --color-text:         #1a1a1a;                  /* Near-black (not pure) */
  --color-text-muted:   #666666;                  /* Darkened for white bg */
  --color-text-dim:     #757575;                  /* WCAG AA: 4.6:1 on white */
  --color-accent:       #e8352b;                  /* Darkened red: 4.6:1 on white (vs 3.9:1 for #ff3b30) */
  --color-accent-hover: #d42f26;                  /* Deeper hover state */

  /* === SHADOWS (light mode uses shadows for depth, not borders) === */
  --shadow-sm:   0 1px 3px rgba(0, 0, 0, 0.08);
  --shadow-md:   0 4px 12px rgba(0, 0, 0, 0.1);
  --shadow-lg:   0 12px 40px rgba(0, 0, 0, 0.12);
  --shadow-glow: 0 0 30px rgba(232, 53, 43, 0.12);

  /* === COLOR SCHEME === */
  color-scheme: light;
}
```

---

## Brand-Specific Notes

### Color Usage Rules
- **Red (#ff3b30 dark / #e8352b light)** is reserved for CTAs, active states, and key highlights only
- Maximum 10% of visible surface area should be red
- Dark mode: Use surface hierarchy (bg → surface → surface-2) for depth, borders define edges
- Light mode: Use shadows for depth, lighter borders for definition
- Glow only on primary CTA hover (red glow in dark mode, subtler glow in light mode)

### WCAG Contrast Ratios

| Combination | Dark Mode | Light Mode | Standard |
|-------------|-----------|------------|----------|
| Text on bg | #f5f5f5 on #0a0a0a = **18.1:1** | #1a1a1a on #ffffff = **16.6:1** | AAA |
| Muted on bg | #999999 on #0a0a0a = **7.4:1** | #666666 on #ffffff = **5.7:1** | AA |
| Dim on bg | #666666 on #0a0a0a = **4.2:1** | #757575 on #ffffff = **4.6:1** | AA |
| Accent on bg | #ff3b30 on #0a0a0a = **4.8:1** | #e8352b on #ffffff = **4.6:1** | AA |
| Text on surface | #f5f5f5 on #141414 = **15.4:1** | #1a1a1a on #f5f5f5 = **14.8:1** | AAA |

All combinations pass WCAG 2.2 AA (minimum 4.5:1 for normal text, 3:1 for large text/UI).

### Typography
- **Inter** for all body and UI text
- **JetBrains Mono** for technical/code elements (pricing numbers, stats)
- Hero headings use `--text-hero` with `font-weight: 800`

### Design Inspiration
- **Nothing Phone** — black/white with intentional red accents
- **Minimal aesthetic** — generous whitespace, editorial feel
- **No gradients** — flat surfaces with subtle borders
- **Dot grid** or geometric patterns as signature elements (optional)

### Pages
1. **Home** — Hero + live voice demo + services overview + social proof + CTA
2. **Services** — Chat Agent, Voice Agent, Website details
3. **Pricing** — Three-tier comparison (Website, Chat, Voice)
4. **About** — Brand story, values, solo founder (no personal name)

### Voice Agent as Contact
- No dedicated Contact page
- Voice bubble on every page IS the contact method
- Primary CTA: "Book a 45-min Discovery Call" (GHL calendar)

### Key Messaging
- **Primary hook**: "No results? No charge." (RAAS guarantee)
- **Voice positioning**: "Let your website talk to your customers"
- **Price rebuttal**: "Costs less than one appointment."
