# 00 — Master Specification: Fluis.ai Website v1

> **Status**: Production-ready
> **Version**: 1.1
> **Last updated**: 2026-02-28
> **Design direction**: Nothing Phone inspired — black/white/red, minimal, dark theme
> **Tech stack**: Static HTML / vanilla CSS (custom properties) / vanilla JS — hosted on Netlify
> **Pages**: Home (`index.html`), Services (`services.html`), Pricing (`pricing.html`), About (`about.html`)

This is the MASTER SPECIFICATION for the Fluis.ai agency website. Every page-level spec
references this document for shared elements, design system rules, and cross-page strategy.
If a page spec and this document conflict, **this document wins**.

---

## Table of Contents

1. [Design System Reference](#1-design-system-reference)
2. [Navigation Bar](#2-navigation-bar)
3. [Voice Agent Bubble Summary](#3-voice-agent-bubble-summary)
4. [Footer](#4-footer)
5. [Cross-Page CTA Strategy](#5-cross-page-cta-strategy)
6. [Trust Strategy — Zero-Client Problem](#6-trust-strategy--zero-client-problem)
7. [Visitor Flow Strategy](#7-visitor-flow-strategy)
8. [SEO & Meta Strategy](#8-seo--meta-strategy)
9. [Technical Infrastructure](#9-technical-infrastructure)
10. [Booking Integration](#10-booking-integration)
11. [Canonical Service Feature Matrix](#11-canonical-service-feature-matrix)
12. [Animation Philosophy](#12-animation-philosophy)
13. [Animation Stack & Libraries](#13-animation-stack--libraries)
14. [Global Animation Effects](#14-global-animation-effects)
15. [Audio-Reactive System](#15-audio-reactive-system-the-alive-website)
16. [Dark/Light Theme Toggle](#16-darklight-theme-toggle)
17. [Branded Preloader](#17-branded-preloader)
18. [Supporting Polish](#18-supporting-polish)

---

## 1. Design System Reference

The canonical design tokens live in `docs/fluis_design_tokens.md`. This section summarizes
the rules that govern how those tokens are applied. When in doubt, refer to the token file
for exact values.

### 1.1 Color Usage Rules

| Token                  | Hex / Value                      | Usage                                                    |
|------------------------|----------------------------------|----------------------------------------------------------|
| `--color-bg`           | `#0a0a0a`                        | Page background. Always the darkest surface.             |
| `--color-surface`      | `#141414`                        | Card backgrounds, nav overlay, footer background.        |
| `--color-surface-2`    | `#1e1e1e`                        | Elevated elements: hover states on cards, active inputs. |
| `--color-border`       | `rgba(255, 255, 255, 0.08)`      | Default borders on cards, dividers, separators.          |
| `--color-border-hover` | `rgba(255, 255, 255, 0.15)`      | Border on hover — subtle brightening, never dramatic.    |
| `--color-text`         | `#f5f5f5`                        | Primary text — headings, body copy, nav links (active).  |
| `--color-text-muted`   | `#999999`                        | Secondary text — subtitles, descriptions, inactive nav.  |
| `--color-text-dim`     | `#666666`                        | Tertiary text — captions, labels, fine print.            |
| `--color-accent`       | `#ff3b30`                        | CTAs, active states, key highlights. **Max 10% surface.**|
| `--color-accent-hover` | `#ff5147`                        | Accent hover state.                                      |

**Red discipline**: `#ff3b30` is reserved exclusively for:
- Primary CTA buttons (background)
- Active navigation underlines
- The dot in the "Fluis**.ai**" logo
- Key stat highlights or callout badges
- Voice bubble idle pulse ring

Red must never exceed 10% of visible surface area on any viewport. If you find yourself
reaching for red for a secondary element, use `--color-text` or `--color-border-hover` instead.

**Depth without shadows**: Surface hierarchy (`bg` -> `surface` -> `surface-2`) communicates
depth. Shadows (`--shadow-sm` through `--shadow-lg`) exist in the token set but are
used sparingly — only for dropdowns, modals, and the mobile nav overlay. Borders are the
primary edge-definition tool. The only glow permitted is `--shadow-glow` on the primary
CTA hover state and the voice bubble.

### 1.2 Typography Assignments

| Element                  | Token           | Weight | Font Stack       |
|--------------------------|-----------------|--------|------------------|
| Hero headline            | `--text-hero`   | 800    | `--font-sans`    |
| Page/section heading     | `--text-xl`     | 700    | `--font-sans`    |
| Sub-section heading      | `--text-lg`     | 600    | `--font-sans`    |
| Body copy                | `--text-base`   | 400    | `--font-sans`    |
| Small / UI labels        | `--text-sm`     | 500    | `--font-sans`    |
| Captions / fine print    | `--text-xs`     | 400    | `--font-sans`    |
| Pricing numbers          | `--text-xl`     | 700    | `--font-mono`    |
| Stats / metrics          | `--text-2xl`    | 800    | `--font-mono`    |
| Technical labels (plans) | `--text-xs`     | 500    | `--font-mono`    |
| Nav links                | `--text-sm`     | 500    | `--font-sans`    |
| CTA button text          | `--text-sm`     | 600    | `--font-sans`    |

**Inter** (`--font-sans`) handles all body and interface text. **JetBrains Mono** (`--font-mono`)
is reserved for elements that benefit from a technical or numerical feel: pricing figures,
performance stats, plan tier labels, and code-like identifiers. Never use JetBrains Mono
for body copy or headings.

All font sizes use fluid `clamp()` values defined in the token file. Never hard-code a
pixel font size. Line heights: headings 1.1-1.2, body 1.6, UI elements 1.4.

### 1.3 Spacing Rules

The design uses a strict **8px grid**. Every spacing value is a multiple of 8px:

| Token          | Value | Common uses                                           |
|----------------|-------|-------------------------------------------------------|
| `--space-xs`   | 8px   | Icon gaps, inline spacing, tight padding              |
| `--space-sm`   | 16px  | Button padding (vertical), list item gaps             |
| `--space-md`   | 24px  | Card internal element gaps, form field spacing        |
| `--space-lg`   | 32px  | Card padding, section internal margins                |
| `--space-xl`   | 48px  | Between major section elements                        |
| `--space-2xl`  | 64px  | Section padding on tablet                             |
| `--space-3xl`  | 96px  | Section vertical padding on desktop                   |

**Section padding**: Every `<section>` gets `padding: var(--space-3xl) 0` on desktop,
`padding: var(--space-2xl) 0` on mobile. Inner content is constrained by `.container`
with `max-width: var(--max-width)` and `padding: 0 var(--space-md)`.

**Touch targets**: All interactive elements (buttons, links, toggles, accordion headers)
must have a minimum tap area of 48x48px. If the visual element is smaller, use padding
or an invisible hit area to meet the target.

### 1.4 Icon System

- **Library**: Lucide Icons (https://lucide.dev) — loaded via inline SVGs, not an icon font.
- **Default size**: 24x24px
- **Stroke width**: 1.5
- **Color**: `currentColor` — inherits from parent text color.
- **Exceptions**: Hero decorative icons may scale to 32x32 or 48x48.
- **No emojis** as UI elements. Emojis are banned from all page content.

### 1.5 Image Treatment

No stock photography anywhere on the site. Visual treatments use:
- Geometric dot grid patterns (Nothing Phone signature element)
- Waveform / audio visualizations for voice-related sections
- Abstract geometric shapes composed of lines and circles
- Pure typographic treatments (oversized text as visual element)
- CSS-only decorative elements (gradients on borders, animated dots)

If a section needs visual interest, use a dot-grid background pattern or a subtle radial
gradient, never a stock photo of smiling business owners or handshakes.

### 1.6 Border Radius

| Token            | Value    | Usage                                  |
|------------------|----------|----------------------------------------|
| `--radius-sm`    | 0.375rem | Input fields, small badges             |
| `--radius-md`    | 0.75rem  | Cards, dropdowns, tooltips             |
| `--radius-lg`    | 1rem     | Large cards, modal windows             |
| `--radius-full`  | 9999px   | Pills (buttons, tags), avatar circles  |

CTAs always use `--radius-full` (pill shape). Cards use `--radius-md`. Never mix
radius values on adjacent elements at the same hierarchy level.

### 1.7 Animation Easing Curves

Three canonical easing curves are used across the site. Page specs reference these by name.

| Name | CSS Value | Usage |
|------|-----------|-------|
| `--ease-out-expo` | `cubic-bezier(0.16, 1, 0.3, 1)` | Entrance animations (scroll reveal, modal open, overlay slide). Fast start, gentle settle. |
| `--ease-default` | `ease` | Micro-interactions (hover, color change, border shift). Browser default, natural feel. |
| `--ease-smooth` | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` | Nav underline, directional wipes. Smooth and even. |

```css
:root {
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-default: ease;
  --ease-smooth: cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
```

All page specs must use these named curves. Never hard-code a `cubic-bezier()` value in a page spec — reference the token.

---

## 2. Navigation Bar

The navigation bar is the single most important shared component. It appears identically
on every page and handles desktop, tablet, and mobile layouts.

### 2.1 Structure

```
[Logo: Fluis.ai]  ——————  [Home] [Services] [Pricing] [About]  ——————  [Book a Free Demo]
```

The nav sits inside a `<header>` element. It contains:
1. The logo (left-aligned)
2. Navigation links (center or adjacent to logo)
3. The primary CTA button (right-aligned)

### 2.2 Logo

The logo is text-only: **Fluis.ai**

- Font: `var(--font-sans)` (Inter)
- Weight: 700
- Size: `var(--text-lg)`
- Color: `var(--color-text)` (`#f5f5f5`)
- The period in `.ai` is `var(--color-accent)` (`#ff3b30`)

```html
<a href="/" class="nav-logo" aria-label="Fluis.ai — Home">
  Fluis<span class="logo-dot">.</span>ai
</a>
```

```css
.nav-logo {
  font-family: var(--font-sans);
  font-size: var(--text-lg);
  font-weight: 700;
  color: var(--color-text);
  text-decoration: none;
  letter-spacing: -0.02em;
}

.logo-dot {
  color: var(--color-accent);
}
```

### 2.3 Desktop Behavior (>= 768px)

**Sticky with shrink**: The nav starts at 80px tall and shrinks to 56px after the user
scrolls past 100px. The background gains a backdrop blur to maintain readability over
content beneath.

**Hide on scroll-down, show on scroll-up**: After scrolling 200px from the top, the nav
hides when the user scrolls down (slides up out of view) and reappears when the user
scrolls up. This preserves screen real estate while keeping navigation accessible.

```css
.site-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  height: 80px;
  display: flex;
  align-items: center;
  background: rgba(10, 10, 10, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--color-border);
  transition: height 0.3s ease, transform 0.3s ease;
}

.site-header.scrolled {
  height: 56px;
}

.site-header.hidden {
  transform: translateY(-100%);
}

.site-header.visible {
  transform: translateY(0);
}
```

**JavaScript for scroll behavior**:

```js
(function() {
  const header = document.querySelector('.site-header');
  let lastScroll = 0;
  const SHRINK_THRESHOLD = 100;
  const HIDE_THRESHOLD = 200;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Shrink behavior
    if (currentScroll > SHRINK_THRESHOLD) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Hide/show behavior
    if (currentScroll > HIDE_THRESHOLD) {
      if (currentScroll > lastScroll) {
        header.classList.add('hidden');
        header.classList.remove('visible');
      } else {
        header.classList.remove('hidden');
        header.classList.add('visible');
      }
    } else {
      header.classList.remove('hidden');
      header.classList.add('visible');
    }

    lastScroll = currentScroll;
  }, { passive: true });
})();
```

### 2.4 Nav Links

```html
<nav class="nav-links" aria-label="Main navigation">
  <a href="/" class="nav-link" aria-current="page">Home</a>
  <a href="/services.html" class="nav-link">Services</a>
  <a href="/pricing.html" class="nav-link">Pricing</a>
  <a href="/about.html" class="nav-link">About</a>
</nav>
```

```css
.nav-links {
  display: flex;
  gap: var(--space-lg);
  align-items: center;
}

.nav-link {
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--color-text-muted);
  text-decoration: none;
  position: relative;
  padding: var(--space-xs) 0;
  transition: color 0.2s ease;
}

.nav-link:hover,
.nav-link:focus-visible {
  color: var(--color-text);
}

/* Active page underline */
.nav-link[aria-current="page"] {
  color: var(--color-text);
}

/* Animated underline */
.nav-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--color-accent);
  transform: scaleX(0);
  transform-origin: right center;
  transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.nav-link:hover::after,
.nav-link:focus-visible::after {
  transform: scaleX(1);
  transform-origin: left center;
}

.nav-link[aria-current="page"]::after {
  transform: scaleX(1);
  transform-origin: left center;
}
```

The underline animation uses `transform-origin` switching: when appearing, it grows
from left to right (`transform-origin: left`). When disappearing on mouse-out, it
shrinks from left to right (`transform-origin: right`), creating a directional wipe
effect.

### 2.5 Nav CTA Button

```html
<a href="#book-call" class="btn-primary nav-cta">Book a Free Demo</a>
```

```css
.nav-cta {
  font-size: var(--text-sm);
  font-weight: 600;
  padding: 10px 24px;
  border-radius: var(--radius-full);
  background: var(--color-accent);
  color: #ffffff;
  text-decoration: none;
  transition: background 0.2s ease, box-shadow 0.2s ease;
  white-space: nowrap;
}

.nav-cta:hover,
.nav-cta:focus-visible {
  background: var(--color-accent-hover);
  box-shadow: var(--shadow-glow);
}

.nav-cta:active {
  transform: scale(0.97);
}
```

### 2.6 Inner Layout

```css
.nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 var(--space-md);
  width: 100%;
  height: 100%;
}
```

### 2.7 Mobile Navigation (< 768px)

On mobile, the center nav links collapse into a hamburger menu. The logo remains
left-aligned, the hamburger icon sits right-aligned.

**Hamburger button**:

```html
<button
  class="nav-hamburger"
  aria-expanded="false"
  aria-controls="mobile-nav-overlay"
  aria-label="Open navigation menu"
>
  <span class="hamburger-line"></span>
  <span class="hamburger-line"></span>
  <span class="hamburger-line"></span>
</button>
```

```css
.nav-hamburger {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 48px;
  height: 48px;
  padding: 12px;
  background: none;
  border: none;
  cursor: pointer;
}

@media (max-width: 767px) {
  .nav-hamburger {
    display: flex;
  }
  .nav-links {
    display: none;
  }
  .nav-cta {
    display: none;
  }
}

.hamburger-line {
  display: block;
  width: 24px;
  height: 2px;
  background: var(--color-text);
  border-radius: 1px;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

/* Animate to X when open */
.nav-hamburger[aria-expanded="true"] .hamburger-line:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}
.nav-hamburger[aria-expanded="true"] .hamburger-line:nth-child(2) {
  opacity: 0;
}
.nav-hamburger[aria-expanded="true"] .hamburger-line:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}
```

**Full-screen overlay**:

```html
<div
  id="mobile-nav-overlay"
  class="mobile-nav-overlay"
  role="dialog"
  aria-modal="true"
  aria-label="Navigation menu"
>
  <nav class="mobile-nav-links">
    <a href="/" class="mobile-nav-link">Home</a>
    <a href="/services.html" class="mobile-nav-link">Services</a>
    <a href="/pricing.html" class="mobile-nav-link">Pricing</a>
    <a href="/about.html" class="mobile-nav-link">About</a>
    <a href="#book-call" class="btn-primary mobile-nav-cta">Book a Free Demo</a>
  </nav>
</div>
```

```css
.mobile-nav-overlay {
  position: fixed;
  inset: 0;
  z-index: 49;
  background: rgba(10, 10, 10, 0.97);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  visibility: hidden;
  transform: translateX(100%);
  transition: opacity 0.3s ease, transform 0.3s ease, visibility 0.3s ease;
}

.mobile-nav-overlay.open {
  opacity: 1;
  visibility: visible;
  transform: translateX(0);
}

.mobile-nav-links {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-lg);
}

.mobile-nav-link {
  font-family: var(--font-sans);
  font-size: var(--text-xl);
  font-weight: 600;
  color: var(--color-text-muted);
  text-decoration: none;
  transition: color 0.2s ease;
}

.mobile-nav-link:hover,
.mobile-nav-link:focus-visible {
  color: var(--color-text);
}

.mobile-nav-cta {
  margin-top: var(--space-md);
  font-size: var(--text-lg);
  padding: 14px 40px;
}
```

**JavaScript for overlay toggle and focus trap**:

```js
(function() {
  const hamburger = document.querySelector('.nav-hamburger');
  const overlay = document.getElementById('mobile-nav-overlay');
  const focusableEls = overlay.querySelectorAll('a, button');
  const firstFocusable = focusableEls[0];
  const lastFocusable = focusableEls[focusableEls.length - 1];

  function openMenu() {
    hamburger.setAttribute('aria-expanded', 'true');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    firstFocusable.focus();
  }

  function closeMenu() {
    hamburger.setAttribute('aria-expanded', 'false');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    hamburger.focus();
  }

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.getAttribute('aria-expanded') === 'true';
    isOpen ? closeMenu() : openMenu();
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) {
      closeMenu();
    }
  });

  // Focus trap
  overlay.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    if (e.shiftKey) {
      if (document.activeElement === firstFocusable) {
        e.preventDefault();
        lastFocusable.focus();
      }
    } else {
      if (document.activeElement === lastFocusable) {
        e.preventDefault();
        firstFocusable.focus();
      }
    }
  });

  // Close when a link is clicked
  overlay.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
})();
```

### 2.8 Accessibility

- The `<header>` contains a `<nav>` with `aria-label="Main navigation"`.
- A skip-to-content link is the very first element inside `<body>`:

```html
<a href="#main-content" class="skip-link">Skip to main content</a>
```

```css
.skip-link {
  position: absolute;
  top: -100px;
  left: var(--space-md);
  background: var(--color-accent);
  color: #ffffff;
  padding: var(--space-xs) var(--space-sm);
  border-radius: var(--radius-sm);
  z-index: 100;
  font-size: var(--text-sm);
  font-weight: 600;
  transition: top 0.2s ease;
}

.skip-link:focus {
  top: var(--space-xs);
}
```

> **Required on ALL pages**: The skip-to-content link and `<main id="main-content">` landmark are mandatory on every page. Each page spec must include these elements. This is a WCAG 2.2 AA requirement.

- The mobile overlay uses `role="dialog"`, `aria-modal="true"`, and a focus trap.
- `aria-expanded` toggles on the hamburger button.
- `aria-current="page"` marks the active page link (set by each page's inline script or build step).
- All pages set `scroll-padding-top` to account for the fixed header height:

```css
html {
  scroll-padding-top: calc(var(--header-height) + var(--space-md));
  scroll-behavior: smooth;
}
```

---

## 3. Voice Agent Bubble Summary

A full specification for the voice agent bubble exists as a separate document. This
section provides only the summary needed by other page specs.

### 3.1 Overview

A floating voice interaction bubble appears on every page. It is the primary "Contact"
mechanism — there is no Contact page. Visitors click it to speak directly with the
Fluis.ai voice agent, which can answer questions about services and book discovery calls.

### 3.2 Position & Size

- **Desktop**: Bottom-right corner, `right: 32px; bottom: 32px`. Size: 64px diameter.
- **Mobile**: Bottom-right corner, `right: 20px; bottom: 20px`. Size: 56px diameter.
- **z-index**: 45 (above sticky mobile CTA bar at 40, below nav at 50).

### 3.3 States

| State    | Visual                                                                 |
|----------|------------------------------------------------------------------------|
| Idle     | Red circle with microphone icon. Subtle pulse ring animation (scale 1 to 1.4, opacity 1 to 0, 2s loop). |
| Hover    | Tooltip appears: "Talk to us". Glow intensifies.                       |
| Loading  | Microphone icon replaced by 3-dot loading animation. Pulse pauses.     |
| Active   | Waveform visualization replaces icon. Ring becomes solid accent.        |
| Error    | Brief red flash. Reverts to idle after 2s. Console logs the error.     |

### 3.4 Tooltip

On hover (desktop) or first visit (mobile, shown once for 3 seconds), a tooltip appears
above the bubble: "Talk to us" in `--text-xs`, `--color-text`, on a `--color-surface`
background with `--radius-sm`.

### 3.5 Fallback

If voice is unsupported (no microphone, no WebRTC, or user denies permission), the
bubble transforms into a static "Book a Call" button linking to the GHL calendar, with
the phone number `hello@fluis.ai` displayed below it. The fallback is also the behavior
when JavaScript fails to load.

### 3.6 Mobile Positioning

On mobile, the bubble sits above the sticky CTA bar (Section 5). Its `bottom` value
adjusts from `20px` to `92px` when the sticky bar is visible, so the two never overlap.

---

## 4. Footer

The footer is a full-width component appearing at the bottom of every page. It serves
as the final navigation opportunity, a trust reinforcement zone, and the legal baseline.

### 4.1 Structure

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│  Fluis.ai                          Company           Services           │
│  We help businesses                Home               Website & Hosting │
│  implement AI. Simply.             Services            Chat Agent       │
│                                    Pricing             Voice Agent      │
│  hello@fluis.ai                    About               Pricing          │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│  Done for you  |  7-day free trial  |  No results? No charge  |  ...   │
├─────────────────────────────────────────────────────────────────────────┤
│  (c) 2026 Fluis.ai                        Privacy Policy | Terms       │
└─────────────────────────────────────────────────────────────────────────┘
```

### 4.2 HTML

```html
<footer class="site-footer">
  <div class="container">

    <!-- Main footer grid -->
    <div class="footer-grid">

      <!-- Column 1: Brand -->
      <div class="footer-brand">
        <a href="/" class="nav-logo footer-logo" aria-label="Fluis.ai — Home">
          Fluis<span class="logo-dot">.</span>ai
        </a>
        <p class="footer-tagline">We help businesses implement AI. Simply.</p>
        <a href="mailto:hello@fluis.ai" class="footer-email">hello@fluis.ai</a>
      </div>

      <!-- Column 2: Company links -->
      <div class="footer-col">
        <h3 class="footer-heading">Company</h3>
        <ul class="footer-links">
          <li><a href="/">Home</a></li>
          <li><a href="/services.html">Services</a></li>
          <li><a href="/pricing.html">Pricing</a></li>
          <li><a href="/about.html">About</a></li>
        </ul>
      </div>

      <!-- Column 3: Services links -->
      <div class="footer-col">
        <h3 class="footer-heading">Services</h3>
        <ul class="footer-links">
          <li><a href="/services.html#website">Website & Hosting</a></li>
          <li><a href="/services.html#chat">Chat Agent</a></li>
          <li><a href="/services.html#voice">Voice Agent</a></li>
          <li><a href="/pricing.html">Pricing</a></li>
        </ul>
      </div>
    </div>

    <!-- Trust badges row -->
    <div class="footer-trust">
      <span class="trust-badge">Done for you</span>
      <span class="trust-divider" aria-hidden="true"></span>
      <span class="trust-badge">7-day free trial</span>
      <span class="trust-divider" aria-hidden="true"></span>
      <span class="trust-badge">No results? No charge</span>
      <span class="trust-divider" aria-hidden="true"></span>
      <span class="trust-badge">Setup fee refundable</span>
    </div>

    <!-- Bottom bar -->
    <div class="footer-bottom">
      <p class="footer-copyright">&copy; 2026 Fluis.ai</p>
      <div class="footer-legal">
        <a href="/privacy.html">Privacy Policy</a>
        <a href="/terms.html">Terms of Service</a>
      </div>
    </div>

  </div>
</footer>
```

### 4.3 CSS

```css
.site-footer {
  background: var(--color-surface);
  border-top: 1px solid var(--color-border);
  padding: var(--space-3xl) 0 var(--space-lg) 0;
  margin-top: var(--space-3xl);
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: var(--space-xl);
  padding-bottom: var(--space-xl);
}

.footer-logo {
  font-size: var(--text-lg);
  display: inline-block;
  margin-bottom: var(--space-sm);
}

.footer-tagline {
  font-size: var(--text-base);
  color: var(--color-text-muted);
  line-height: 1.6;
  margin-bottom: var(--space-md);
  max-width: 300px;
}

.footer-email {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  text-decoration: none;
  transition: color 0.2s ease;
}

.footer-email:hover,
.footer-email:focus-visible {
  color: var(--color-text);
}

.footer-heading {
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: var(--space-md);
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.footer-links a {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  text-decoration: none;
  transition: color 0.2s ease;
}

.footer-links a:hover,
.footer-links a:focus-visible {
  color: var(--color-text);
}

/* Trust badges row */
.footer-trust {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-md);
  padding: var(--space-lg) 0;
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
  flex-wrap: wrap;
}

.trust-badge {
  font-family: var(--font-sans);
  font-size: var(--text-xs);
  font-weight: 500;
  color: var(--color-text-muted);
  letter-spacing: 0.03em;
  text-transform: uppercase;
}

.trust-divider {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--color-text-dim);
  flex-shrink: 0;
}

/* Bottom bar */
.footer-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: var(--space-lg);
}

.footer-copyright {
  font-size: var(--text-xs);
  color: var(--color-text-dim);
}

.footer-legal {
  display: flex;
  gap: var(--space-md);
}

.footer-legal a {
  font-size: var(--text-xs);
  color: var(--color-text-dim);
  text-decoration: none;
  transition: color 0.2s ease;
}

.footer-legal a:hover,
.footer-legal a:focus-visible {
  color: var(--color-text-muted);
}

/* Mobile stacking */
@media (max-width: 767px) {
  .footer-grid {
    grid-template-columns: 1fr;
    gap: var(--space-xl);
  }

  .footer-trust {
    flex-direction: column;
    gap: var(--space-sm);
  }

  .trust-divider {
    display: none;
  }

  .footer-bottom {
    flex-direction: column;
    gap: var(--space-sm);
    text-align: center;
  }
}
```

### 4.4 Notes

- No social media links until accounts are created. When ready, add a row of icon links
  between the trust badges and the bottom bar.
- The footer does not include a newsletter signup. The voice bubble and CTA buttons are
  the only conversion mechanisms.
- Footer links use `--color-text-muted` (not dim) because they serve as real navigation.

---

## 5. Cross-Page CTA Strategy

Every page must drive visitors toward a conversion action. This section defines every
CTA variant, their placement rules, and the mobile sticky bar.

### 5.1 Primary CTA — "Book a Free Demo"

The highest-priority action. Red background, white text, pill shape. Leads to the GHL
calendar booking page.

```css
.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-xs);
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: 600;
  color: #ffffff;
  background: var(--color-accent);
  border: none;
  border-radius: var(--radius-full);
  padding: 14px 32px;
  text-decoration: none;
  cursor: pointer;
  transition: background 0.2s ease, box-shadow 0.2s ease, transform 0.15s ease;
  min-height: 48px;
  white-space: nowrap;
}

.btn-primary:hover,
.btn-primary:focus-visible {
  background: var(--color-accent-hover);
  box-shadow: var(--shadow-glow);
}

.btn-primary:active {
  transform: scale(0.97);
}

.btn-primary:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}
```

**Placement rules**:
- Minimum 3 per page, maximum 5
- Must appear: hero section, mid-page break, final CTA section
- Always visible within one scroll-length of the current viewport
- Copy: "Book a Free Demo" (default), acceptable variants: "Start Free Trial", "Get Started"

### 5.2 Secondary CTA — "Try the Agent Now"

A ghost/outline button that triggers the voice bubble rather than navigating to a new
page. This lets visitors experience the product immediately.

```css
.btn-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-xs);
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-text);
  background: transparent;
  border: 1px solid var(--color-border-hover);
  border-radius: var(--radius-full);
  padding: 14px 32px;
  text-decoration: none;
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease, transform 0.15s ease;
  min-height: 48px;
  white-space: nowrap;
}

.btn-secondary:hover,
.btn-secondary:focus-visible {
  background: var(--color-surface-2);
  border-color: var(--color-border-hover);
}

.btn-secondary:active {
  transform: scale(0.97);
}

.btn-secondary:focus-visible {
  outline: 2px solid var(--color-text);
  outline-offset: 2px;
}
```

**Placement rules**:
- Maximum 2 per page
- Always paired adjacent to a primary CTA (hero section, for example)
- Action: programmatically opens the voice bubble (`window.dispatchEvent(new CustomEvent('open-voice-bubble'))`)

### 5.3 Tertiary CTA — Text Link

A minimal text link used for softer calls to action like "See How It Works" or
"Learn More". Directs to another page or section.

```css
.btn-tertiary {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--color-text-muted);
  text-decoration: none;
  transition: color 0.2s ease;
  padding: var(--space-xs) 0;
  min-height: 48px;
}

.btn-tertiary:hover,
.btn-tertiary:focus-visible {
  color: var(--color-text);
  text-decoration: underline;
  text-underline-offset: 4px;
}

.btn-tertiary .arrow {
  transition: transform 0.2s ease;
}

.btn-tertiary:hover .arrow {
  transform: translateX(4px);
}
```

```html
<a href="/services.html" class="btn-tertiary">
  See How It Works <span class="arrow" aria-hidden="true">&rarr;</span>
</a>
```

### 5.4 CTA Copy Rules

All CTA labels follow the formula: **[Action Verb] + [What They Get] + [Optional Qualifier]**

| Allowed                        | Forbidden             |
|--------------------------------|-----------------------|
| "Book a Free Demo"            | "Submit"              |
| "Start Free Trial"            | "Click Here"          |
| "Try the Agent Now"           | "Learn More" (alone)  |
| "See How It Works"            | "Contact Us"          |
| "Get Started"                 | "Sign Up"             |
| "Talk to Our Agent"           | "Send"                |

"Learn More" is acceptable only when followed by a directional arrow and it links
to a specific page. It must never be the only CTA in a section.

### 5.5 Mobile Sticky CTA Bar

On mobile viewports (< 768px), a sticky bar appears at the bottom of the screen once
the user scrolls past the hero section. It contains a single full-width primary CTA
and persists until the user reaches the footer.

```html
<div class="mobile-sticky-cta" aria-hidden="true">
  <div class="container">
    <a href="#book-call" class="btn-primary mobile-sticky-btn">Book a Free Demo</a>
  </div>
</div>
```

```css
.mobile-sticky-cta {
  display: none;
}

@media (max-width: 767px) {
  .mobile-sticky-cta {
    display: block;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 40;
    background: rgba(20, 20, 20, 0.95);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-top: 1px solid var(--color-border);
    padding: var(--space-sm);
    transform: translateY(100%);
    transition: transform 0.3s ease;
    height: 72px;
    display: flex;
    align-items: center;
  }

  .mobile-sticky-cta.visible {
    transform: translateY(0);
  }

  .mobile-sticky-btn {
    width: 100%;
    text-align: center;
    padding: 14px var(--space-md);
  }
}
```

**JavaScript for visibility**:

```js
(function() {
  const stickyBar = document.querySelector('.mobile-sticky-cta');
  const hero = document.querySelector('.hero');
  const footer = document.querySelector('.site-footer');
  if (!stickyBar || !hero) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.target === hero) {
        // Show bar when hero is NOT visible
        stickyBar.classList.toggle('visible', !entry.isIntersecting);
      }
      if (entry.target === footer) {
        // Hide bar when footer IS visible
        if (entry.isIntersecting) stickyBar.classList.remove('visible');
      }
    });
  }, { threshold: 0.1 });

  observer.observe(hero);
  if (footer) observer.observe(footer);
})();
```

### 5.6 CTA Placement Map Per Page

| Page     | Hero Primary | Hero Secondary | Mid-page | Final Section | Mobile Sticky |
|----------|:----------:|:-----------:|:-------:|:----------:|:----------:|
| Home     | Yes        | Yes (Try Agent) | Yes (after services) | Yes       | Yes           |
| Services | Yes        | No          | Yes (per service) | Yes        | Yes           |
| Pricing  | Yes        | No          | Yes (after cards)  | Yes        | Yes           |
| About    | No (text-heavy hero) | No | Yes (mid-story)    | Yes        | Yes           |

---

## 6. Trust Strategy — Zero-Client Problem

Fluis.ai launches with zero clients. No testimonials, no case studies, no client logos.
This is the most critical challenge for the website. Every design and copy decision must
account for the absence of traditional social proof.

### 6.1 The Psychology

Traditional SaaS sites rely on logos, testimonials, and "10,000+ customers" badges.
Without those, visitors default to skepticism. The Fluis.ai website substitutes these
signals with alternative credibility mechanisms rooted in behavioral psychology:

| Mechanism            | Psychological Principle    | Implementation                                  |
|----------------------|----------------------------|-------------------------------------------------|
| RAAS guarantee       | Risk Reversal / Loss Aversion | "No results? No charge." — removes financial risk. Appears minimum 3x per page. |
| Live voice demo      | Endowment Effect            | Let them experience the product. Once they hear it work, they feel ownership of the outcome. |
| Radical transparency | Transparency Bias           | No contracts, month-to-month, refundable setup fee, exact pricing, exact timelines. Nothing hidden. |
| Founding story       | Pratfall Effect              | Being honest about being new is more trustworthy than pretending to be big. Authenticity wins. |
| Industry statistics  | Availability Heuristic       | "62% of calls go unanswered" makes the pain feel immediate and real. |
| Tech credibility     | Authority Bias               | "Powered by Deepgram, ElevenLabs, GoHighLevel" borrows trust from established brands. |
| Specificity          | Precision Bias               | "$247/mo" is more believable than "affordable". "3-day onboarding" beats "fast setup". |

### 6.2 What We DO Use

**RAAS Guarantee (Primary Trust Signal)**:
The guarantee is the centerpiece of every page. It appears in:
- Hero section (trust badges row)
- Dedicated RAAS callout section
- Pricing cards (guarantee note)
- Footer trust badges
- FAQ answers

Copy variations:
- Short: "No results? No charge."
- Medium: "We make money only when we make businesses money."
- Long: Full RAAS explanation paragraph (see `packages.yaml`)
- Price angle: "Costs less than one appointment."

**Live Voice Demo (Secondary Trust Signal)**:
The voice bubble on the agency site IS the proof. Visitors experience the product
firsthand before committing anything. The demo speaks louder than any testimonial.
Copy around it: "Don't take our word for it. Talk to our agent yourself."

**Transparency Signals**:
Every friction-reducing detail is stated explicitly:
- "No contracts — ever. Month-to-month, cancel anytime."
- "Setup fee fully refundable during the 7-day trial."
- "$27/mo for a website. $147/mo for chat. $247/mo for voice."
- "3 days to set up. 7-day free trial. Cancel if you don't love it."
- "AI voice costs approximately 30-80p per 5-minute call."

**Founding Story (About Page)**:
The About page leans into being new. The narrative is:
"I saw a gap widening between small businesses and AI technology. Business owners
who are brilliant at their craft — plumbers, electricians, consultants — are falling
behind because they can't keep up with tech. I started Fluis.ai to bridge that gap."

This is honest, relatable, and positions the founder as mission-driven rather than
profit-driven. The Pratfall Effect means acknowledging newness makes the brand MORE
trustworthy, not less.

**Technology Credibility**:
A "Powered by" or "Built with" row near the bottom of the Home page and Services page
displays logos of the underlying technology: Deepgram, ElevenLabs, GoHighLevel. These
are not client logos — they are technology partner logos. The visitor borrows trust from
these established brands.

**Industry Statistics** (when verified):
Stats like "62% of calls to small businesses go unanswered" create urgency and validate
the problem. These must be sourced and verified before use. Unverified stats get a
placeholder treatment: the stat section exists in the design but uses only verified
numbers. Currently verified: "$0 cost to engage vs hiring staff" (internal).
Pending verification: 62% unanswered, 85% won't call back, $15k missed revenue, $40k receptionist.

### 6.3 What We NEVER Do

- Fake testimonials — not even "placeholder" testimonials with fake names.
- Placeholder client logos — no gray boxes where logos would go.
- Inflated claims — no "trusted by thousands" or "industry-leading".
- Stock team photos — no photos of a team that does not exist.
- Generic trust badges — no "SSL Secured" or "100% Satisfaction" clip art.
- Vague authority — no "as seen in Forbes" without actual media coverage.

The absence of testimonials should feel intentional, not incomplete. The design must not
have empty spaces where social proof "should" be. Instead, those spaces are filled with
specificity (exact pricing, exact timelines, exact process steps) and the RAAS guarantee.

### 6.4 Future-Proofing

When the first client signs on, the website gains a testimonial slot. The design should
accommodate this without a redesign:
- Home page: An optional `#testimonials` section between "How It Works" and the final CTA.
  Hidden via a CSS class (`.hidden { display: none }`) until real content exists.
- Pricing page: A quote block beneath the pricing cards. Same hidden approach.
- The data model in `content.yaml` already has an empty `testimonials: []` array ready
  to be populated.

---

## 7. Visitor Flow Strategy

### 7.1 Every Page is a Landing Page

Any page can be the first page a visitor sees (via search, direct link, social media).
Therefore, every page must be self-contained enough to explain what Fluis.ai does and
offer a conversion path, without assuming the visitor has read any other page.

This means every page includes:
- A clear headline that communicates the core value proposition
- At least one primary CTA visible without scrolling
- The voice bubble (available on every page)
- Enough context to understand the offering (even if summarized)
- Links to other pages for deeper exploration

### 7.2 Natural Flow

The intended reading order for a visitor who enters via the Home page:

```
Home  -->  Services  -->  Pricing  -->  About  -->  Book Demo
  |            |              |            |
  +---- Voice Bubble (conversion shortcut, available everywhere) ----+
```

Each page's final section includes a CTA and a "next page" nudge:
- Home final CTA: "See Our Services" (link to Services) + "Book a Free Demo"
- Services final CTA: "See Pricing" (link to Pricing) + "Book a Free Demo"
- Pricing final CTA: "Learn About Us" (link to About) + "Book a Free Demo"
- About final CTA: "Book a Free Demo" (primary, standalone)

### 7.3 Internal Linking Rules

- Every page links to at least 2 other pages (via in-content links, section CTAs, or
  "next page" nudges). No dead ends.
- The nav and footer provide global navigation on every page.
- Service cards on the Home page link to the detailed Services page sections.
- Pricing references on the Services page link to the Pricing page.
- The About page links back to Services and Home.

### 7.5 Cross-Page Link Map

Every CTA and internal link is mapped here to prevent orphan pages and ensure consistent navigation.

| Page | CTA / Link Text | Destination | Type | Purpose |
|------|----------------|-------------|------|---------|
| Home hero | "Book a Free Demo" | `#book-call` (modal) | Primary | Convert high-intent visitors |
| Home hero | "Try the Agent Now" | Voice bubble trigger | Secondary | Immediate product experience |
| Home services grid | "Learn More →" | `/services.html#voice` | Tertiary | Deepen interest |
| Home final CTA | "Book a Free Demo" | `#book-call` (modal) | Primary | Convert after full page read |
| Services per-card | "See Pricing" | `/pricing.html` | Tertiary | Move to purchase intent |
| Services voice card | "Try It Right Now" | Voice bubble trigger | Secondary | Live demo |
| Services bottom | "Book a Free Demo" | `#book-call` (modal) | Primary | Convert after understanding |
| Pricing per-card | "Start Free Trial" | `#book-call` (modal) | Primary | Convert at highest intent |
| Pricing bottom | "Book a Free Demo" | `#book-call` (modal) | Primary | Final push |
| About bottom | "Let's Talk About Your Business" | `#book-call` (modal) | Primary | Low-pressure conversion |
| All pages (nav) | "Book a Free Demo" | `#book-call` (modal) | Primary | Always accessible |
| All pages (footer) | Page/service links | Respective pages | Navigation | Orientation |
| All pages (bubble) | Voice bubble click | Voice agent | Demo | Universal conversion shortcut |

### 7.4 Conversion Shortcut

The voice bubble is the universal conversion shortcut. On any page, at any scroll
position, a visitor can click the bubble and immediately talk to the AI agent. The
agent can answer questions, explain services, and book a discovery call — collapsing
the entire funnel into a single interaction.

---

## 8. SEO & Meta Strategy

### 8.1 Per-Page Meta Tags

**Home (index.html)**:
```html
<title>Fluis.ai — AI Agents That Book Appointments 24/7</title>
<meta name="description" content="Convert your website into a talking website. AI-powered chat and voice agents that book appointments, qualify leads, and never miss a call. No results? No charge. That's RAAS.">
```

**Services (services.html)**:
```html
<title>Services — Fluis.ai | Websites, Chat Agents & Voice Agents</title>
<meta name="description" content="Professional websites from $27/mo. AI chat agents from $147/mo. AI voice agents from $247/mo. Everything done for you — website, CRM, automations, and 24/7 AI coverage.">
```

**Pricing (pricing.html)**:
```html
<title>Pricing — Fluis.ai | From $27/mo. No Contracts.</title>
<meta name="description" content="Transparent pricing for AI-powered business solutions. Website & hosting from $27/mo. Chat agents from $147/mo. Voice agents from $247/mo. 7-day free trial. No contracts. No results? No charge.">
```

**About (about.html)**:
```html
<title>About — Fluis.ai | Bridging the AI Gap for Small Businesses</title>
<meta name="description" content="We started Fluis.ai to bridge the growing gap between small businesses and AI technology. Done-for-you AI agents that book appointments — so you can focus on your craft.">
```

### 8.2 Open Graph Tags (all pages)

```html
<meta property="og:type" content="website">
<meta property="og:site_name" content="Fluis.ai">
<meta property="og:title" content="[Same as <title>]">
<meta property="og:description" content="[Same as meta description]">
<meta property="og:image" content="https://fluis.ai/assets/og-image.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:url" content="https://fluis.ai/[page-path]">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="[Same as <title>]">
<meta name="twitter:description" content="[Same as meta description]">
<meta name="twitter:image" content="https://fluis.ai/assets/og-image.png">
```

The OG image (`og-image.png`) should be a 1200x630 graphic on a `#0a0a0a` background
with the Fluis.ai logo, the tagline "AI Agents That Book Appointments 24/7", and a
subtle dot-grid pattern. No photos.

### 8.3 JSON-LD Structured Data

**Organization (all pages)**:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Fluis.ai",
  "url": "https://fluis.ai",
  "logo": "https://fluis.ai/assets/logo.svg",
  "email": "hello@fluis.ai",
  "description": "We help small and medium businesses implement AI — so they can capture every lead, book every appointment, and never miss a call.",
  "foundingDate": "2025",
  "sameAs": []
}
</script>
```

**Service (Services page)** — one per service:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "AI Voice Agent",
  "provider": {
    "@type": "Organization",
    "name": "Fluis.ai",
    "url": "https://fluis.ai"
  },
  "name": "Voice Agent",
  "description": "AI-powered voice agent that answers calls and website visitors 24/7, qualifies leads, and books appointments automatically.",
  "offers": {
    "@type": "Offer",
    "price": "247.00",
    "priceCurrency": "USD",
    "priceSpecification": {
      "@type": "UnitPriceSpecification",
      "price": "247.00",
      "priceCurrency": "USD",
      "unitCode": "MON",
      "referenceQuantity": {
        "@type": "QuantitativeValue",
        "value": "1",
        "unitCode": "MON"
      }
    }
  },
  "areaServed": [
    { "@type": "Country", "name": "United Kingdom" },
    { "@type": "Country", "name": "United States" },
    { "@type": "Country", "name": "Canada" },
    { "@type": "Country", "name": "Australia" }
  ]
}
</script>
```

Repeat the Service schema for "Chat Agent" ($147/mo) and "Website & Hosting" ($27/mo).

**FAQPage (Home and Pricing pages)**:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Does it sound like a robot?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Not anymore. The 2026 models we use have breath pauses, filler words, and latency under 500ms. Most callers have no idea they aren't speaking to a human."
      }
    },
    {
      "@type": "Question",
      "name": "Is there a contract?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Never. We earn your business every month. If we don't make you money, fire us. Month-to-month, cancel anytime."
      }
    },
    {
      "@type": "Question",
      "name": "What if the agent doesn't book any appointments?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You don't pay. We operate as RAAS — Results as a Service. If our agent doesn't book even a single appointment, we don't charge you for that month."
      }
    },
    {
      "@type": "Question",
      "name": "How long does setup take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "3 days for onboarding, then your agent goes live with a 7-day free trial. You're up and running in under 2 weeks."
      }
    },
    {
      "@type": "Question",
      "name": "What about my existing website?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No problem. We can embed our AI agents on your existing website. Same pricing, same features — your data still flows to the CRM."
      }
    }
  ]
}
</script>
```

**WebSite with SearchAction (Home page only)**:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Fluis.ai",
  "url": "https://fluis.ai",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://fluis.ai/?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
</script>
```

### 8.4 Technical SEO Requirements

- `<html lang="en">` on every page.
- Canonical URL on every page: `<link rel="canonical" href="https://fluis.ai/[page]">`.
- One `<h1>` per page — the main headline. Sequential heading order: h1 > h2 > h3. No skipping.
- All images have `alt` attributes. Decorative images use `alt=""` and `aria-hidden="true"`.
- Semantic HTML throughout: `<header>`, `<nav>`, `<main id="main-content">`, `<section>`, `<article>`, `<footer>`.
- `robots.txt`:

```
User-agent: *
Allow: /
Sitemap: https://fluis.ai/sitemap.xml
```

- `sitemap.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://fluis.ai/</loc>
    <lastmod>2026-02-27</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://fluis.ai/services.html</loc>
    <lastmod>2026-02-27</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://fluis.ai/pricing.html</loc>
    <lastmod>2026-02-27</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://fluis.ai/about.html</loc>
    <lastmod>2026-02-27</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://fluis.ai/privacy.html</loc>
    <lastmod>2026-02-27</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>https://fluis.ai/terms.html</loc>
    <lastmod>2026-02-27</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
</urlset>
```

---

## 9. Technical Infrastructure

### 9.1 View Transitions API

CSS-only page transitions for a polished multi-page feel. No JavaScript required.

```css
@view-transition {
  navigation: auto;
}

::view-transition-old(root) {
  animation: fade-out 0.2s ease-in;
}

::view-transition-new(root) {
  animation: fade-in 0.3s ease-out;
}

@keyframes fade-out {
  from { opacity: 1; }
  to { opacity: 0; }
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

This provides a subtle crossfade between pages in browsers that support the View
Transitions API (Chrome 111+, Edge 111+). Unsupported browsers get a normal page
load — graceful degradation, no polyfill needed.

### 9.2 Critical CSS

The first meaningful paint must not be blocked by stylesheet loading. Strategy:

1. **Inline critical CSS** in a `<style>` tag in `<head>`. This covers:
   - CSS custom properties (`:root` block)
   - Body/html base styles
   - Navigation bar styles (header, nav, logo, links)
   - Hero section styles (headline, subheadline, CTA buttons)
   - Estimated size: ~4-5KB compressed

2. **Preload the full stylesheet**:
```html
<link rel="preload" href="/css/main.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="/css/main.css"></noscript>
```

3. The full `main.css` file loads asynchronously and applies once downloaded. No FOUC
   because the inline critical CSS covers everything above the fold.

### 9.3 Font Loading

Fonts are self-hosted (not loaded from Google Fonts CDN) for privacy and performance.

```
/assets/fonts/
  inter-var-latin.woff2
  jetbrains-mono-var-latin.woff2
```

```html
<link rel="preload" href="/assets/fonts/inter-var-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/jetbrains-mono-var-latin.woff2" as="font" type="font/woff2" crossorigin>
```

```css
@font-face {
  font-family: 'Inter';
  src: url('/assets/fonts/inter-var-latin.woff2') format('woff2');
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6,
    U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC,
    U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}

@font-face {
  font-family: 'JetBrains Mono';
  src: url('/assets/fonts/jetbrains-mono-var-latin.woff2') format('woff2');
  font-weight: 100 800;
  font-style: normal;
  font-display: swap;
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6,
    U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC,
    U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
```

Using variable fonts (single file per family covering all weights) keeps the total font
payload under 100KB for both families.

### 9.4 Security Headers (Netlify `_headers` file)

Create a `_headers` file in the site root (deployed alongside `index.html`):

```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(self), geolocation=(), interest-cohort=()
  Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://plausible.io; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self' https://plausible.io https://*.ghl.com wss://*.deepgram.com https://*.elevenlabs.io; frame-src 'none'; object-src 'none'; base-uri 'self'; form-action 'self' https://*.ghl.com;
```

Notes on the CSP:
- `script-src 'unsafe-inline'` is needed for the inline critical CSS/JS. In a future
  iteration, use nonce-based CSP to eliminate this.
- `connect-src` allows connections to Plausible (analytics), GoHighLevel (booking),
  Deepgram (voice STT), and ElevenLabs (voice TTS).
- `microphone=(self)` allows microphone access for the voice bubble on the same origin.
- `frame-src 'none'` prevents embedding in iframes (clickjacking protection alongside
  X-Frame-Options).

### 9.5 Analytics

**Plausible Analytics** — lightweight (< 1KB), cookie-free, GDPR-compliant.

```html
<script defer data-domain="fluis.ai" src="https://plausible.io/js/script.js"></script>
```

**Custom events** to track:

| Event Name         | Trigger                                      | Properties             |
|--------------------|----------------------------------------------|------------------------|
| `CTA Click`        | Any `.btn-primary` or `.btn-secondary` click | `{ label, page }`      |
| `Voice Bubble Open`| Voice bubble activated                       | `{ page }`             |
| `Voice Session`    | Voice conversation completed                 | `{ duration, page }`   |
| `FAQ Expand`       | Accordion item opened                        | `{ question, page }`   |
| `Nav Link`         | Navigation link clicked                      | `{ destination }`      |
| `Mobile Menu Open` | Hamburger menu opened                        | `{ page }`             |

Implementation pattern for custom events:

```js
function trackEvent(name, props) {
  if (window.plausible) {
    window.plausible(name, { props: props });
  }
}

document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
  btn.addEventListener('click', () => {
    trackEvent('CTA Click', {
      label: btn.textContent.trim(),
      page: window.location.pathname
    });
  });
});
```

### 9.6 Performance Targets

| Metric | Target     | Measurement                             |
|--------|------------|-----------------------------------------|
| LCP    | <= 2.5s    | Largest Contentful Paint (hero headline)|
| INP    | <= 200ms   | Interaction to Next Paint               |
| CLS    | <= 0.1     | Cumulative Layout Shift                 |
| FCP    | <= 1.8s    | First Contentful Paint                  |
| TTFB   | <= 800ms   | Time to First Byte (Netlify CDN)        |
| Weight | < 300KB    | Total page weight (all resources)       |

Budget breakdown (updated for animation stack):

| Component | Size (gzip) | Notes |
| --------- | ----------- | ----- |
| HTML | ~15KB | Per page |
| Critical CSS (inline) | ~5KB | Custom properties + above-fold styles |
| Full CSS | ~30KB | All component styles + theme overrides |
| JS — GSAP + plugins (ScrollTrigger, SplitText, ScrambleText, Flip, MorphSVG) | ~51KB | Core animation engine, loads immediately |
| JS — Lenis (smooth scroll) | ~3KB | Loads immediately with GSAP |
| JS — Barba.js (page transitions) | ~7KB | Loads immediately |
| JS — Page-specific animations + audio-reactive | ~20KB | Conditional per page |
| Fonts | ~140KB | Inter variable + JetBrains Mono variable |
| SVG assets | ~5KB | Icons, morph shapes |
| Plausible script | ~1KB | Deferred |
| SND.dev (micro-sounds, opt-in) | ~15KB | Deferred, lazy loaded, off by default |
| **Total active** | **~296KB** | Within 300KB budget |

**Note**: No images in the budget. The site uses CSS patterns + inline SVGs only.
LCP remains < 2.5s because GSAP core loads first (23KB) and all plugins are deferred.
The entire animation system weighs less than two hero images.

### 9.7 File Structure

```
src/
  index.html
  services.html
  pricing.html
  about.html
  privacy.html
  terms.html
  robots.txt
  sitemap.xml
  _headers
  _redirects
  css/
    main.css
  js/
    main.js              (~50 lines — init Lenis, register GSAP plugins, init global effects)
    voice-bubble.js
    animations/
      cursor.js          (~40 lines — custom cursor dot + ring + spotlight)
      nav.js             (~60 lines — magnetic links, direction-aware highlight, scroll behavior)
      reveal.js          (~30 lines — ScrollTrigger.batch for .reveal elements)
      modal.js           (~40 lines — booking modal open/close/escape/focus-trap)
      sticky-cta.js      (~20 lines — mobile sticky CTA visibility)
      home.js            (~80 lines — hero sequence, dot-grid canvas, horizontal scroll, pinned section)
      services.js        (~40 lines — SVG path draw, card glow, flow diagram)
      pricing.js         (~40 lines — ScrambleText prices, gradient border, ROI calculator)
      about.js           (~30 lines — progressive story reveal, pull-quote border)
      transitions.js     (~40 lines — Barba.js page transition setup)
      theme.js           (~40 lines — dark/light toggle logic)
      audio-reactive.js  (~200 lines — waveform, particle response, text pulse)
      preloader.js       (~30 lines — branded loading sequence)
  assets/
    fonts/
      inter-var-latin.woff2
      jetbrains-mono-var-latin.woff2
    og-image.png
    icons/
      (inline SVGs preferred — this folder for any external SVG assets)
```

**Loading strategy**: `main.js` loads first (registers GSAP plugins, inits Lenis + global effects).
Page-specific files load conditionally based on `data-barba-namespace` or `body` class. All
scripts use `defer`. Example:

```html
<!-- Core (all pages) -->
<script defer src="/js/main.js"></script>

<!-- Page-specific (conditional) -->
<script defer src="/js/animations/home.js"></script>
```

---

## 10. Booking Integration

Multiple pages reference `#book-call` as the primary conversion destination. This section defines exactly what happens when a visitor clicks any CTA pointing to `#book-call`.

### 10.1 Behavior

The `#book-call` anchor triggers a **modal overlay** containing an embedded GoHighLevel (GHL) calendar iframe. This avoids navigating away from the current page, keeping the visitor in context.

```html
<div id="book-call" class="booking-modal" role="dialog" aria-modal="true" aria-label="Book a free demo">
  <div class="booking-modal__backdrop"></div>
  <div class="booking-modal__content">
    <button class="booking-modal__close" aria-label="Close booking form">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <path d="M18 6L6 18M6 6l12 12"/>
      </svg>
    </button>
    <h2 class="booking-modal__title">Book Your Free Discovery Call</h2>
    <p class="booking-modal__subtitle">45 minutes. No pressure. No pitch. Just a conversation about your business.</p>
    <div class="booking-modal__calendar">
      <iframe
        src="[GHL_CALENDAR_EMBED_URL]"
        title="Book a discovery call"
        loading="lazy"
        allow="payment"
      ></iframe>
    </div>
    <div class="booking-modal__fallback">
      <p>Having trouble? Email us at <a href="mailto:hello@fluis.ai">hello@fluis.ai</a></p>
    </div>
  </div>
</div>
```

### 10.2 States

| State | Visual |
|-------|--------|
| **Closed** | Modal hidden (`display: none`). No iframe loaded. |
| **Loading** | Modal visible, calendar area shows skeleton loader (pulsing `--color-surface-2` rectangle). Iframe loading in background. |
| **Ready** | Skeleton replaced by iframe content. Calendar fully interactive. |
| **Error** | After 10s timeout, show fallback: email link + phone number. |

### 10.3 CSS

```css
.booking-modal {
  display: none;
  position: fixed;
  inset: 0;
  z-index: 60;
  align-items: center;
  justify-content: center;
}

.booking-modal.open {
  display: flex;
}

.booking-modal__backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(4px);
}

.booking-modal__content {
  position: relative;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  max-width: 560px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  padding: var(--space-xl);
}

.booking-modal__close {
  position: absolute;
  top: var(--space-sm);
  right: var(--space-sm);
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: var(--color-text-muted);
  transition: color 0.2s ease;
}

.booking-modal__close:hover,
.booking-modal__close:focus-visible {
  color: var(--color-text);
}

.booking-modal__title {
  font-size: var(--text-lg);
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: var(--space-xs);
}

.booking-modal__subtitle {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  margin-bottom: var(--space-lg);
}

.booking-modal__calendar iframe {
  width: 100%;
  height: 500px;
  border: none;
  border-radius: var(--radius-md);
}

.booking-modal__fallback {
  display: none;
  text-align: center;
  padding: var(--space-lg);
  color: var(--color-text-muted);
  font-size: var(--text-sm);
}

.booking-modal__fallback a {
  color: var(--color-accent);
  text-decoration: underline;
  text-underline-offset: 4px;
}

@media (max-width: 767px) {
  .booking-modal__content {
    width: 100%;
    max-width: 100%;
    max-height: 100vh;
    border-radius: 0;
    padding: var(--space-lg);
  }

  .booking-modal__calendar iframe {
    height: 400px;
  }
}
```

### 10.4 JavaScript

```js
(function() {
  const modal = document.getElementById('book-call');
  if (!modal) return;

  const backdrop = modal.querySelector('.booking-modal__backdrop');
  const closeBtn = modal.querySelector('.booking-modal__close');

  function openModal(e) {
    if (e) e.preventDefault();
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
    trackEvent('CTA Click', { label: 'Book a Free Demo', page: location.pathname });
  }

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  // All links pointing to #book-call trigger the modal
  document.querySelectorAll('a[href="#book-call"]').forEach(link => {
    link.addEventListener('click', openModal);
  });

  backdrop.addEventListener('click', closeModal);
  closeBtn.addEventListener('click', closeModal);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });
})();
```

### 10.5 Z-Index Coordination

The booking modal sits at `z-index: 60` — above everything. The preloader sits at 55 during
initial load only, then is removed from the DOM. The theme toggle (bottom-left) and voice
bubble (bottom-right) share z-index 45 but occupy opposite corners — they never overlap.

| Layer | z-index | Notes |
| ----- | ------- | ----- |
| Booking modal + backdrop | 60 | Above everything |
| Preloader | 55 | Initial load only, removed after sequence |
| Nav header (`.site-header`) | 50 | Fixed top |
| Mobile nav overlay | 49 | Full-screen when open |
| Voice bubble (bottom-right) | 45 | Persistent |
| Theme toggle (bottom-left) | 45 | Persistent, opposite corner from voice bubble |
| Mobile sticky CTA bar | 40 | Mobile only, bottom |
| Scroll progress bar | 1 | Fixed top, 2px tall |
| Default content | 0 | Normal flow |

---

## 11. Canonical Service Feature Matrix

Both the Services page and Pricing page reference service features. To prevent drift, this is the single source of truth. Each page curates from this matrix.

### Website & Hosting

| Feature | Included |
|---------|----------|
| Professional 3-page or 5-page website | Yes |
| Mobile-responsive design | Yes |
| Custom domain setup | Yes |
| SSL certificate | Yes |
| Hosting on Netlify/GHL | Yes |
| AI-assisted content writing | Yes |
| Basic SEO setup | Yes |
| Monthly maintenance & updates | Yes |

**Pricing**: 3-page $27/mo, 5-page $47/mo. Setup: $47.

**RAAS Guarantee**: No. Website hosting is not performance-based. Cancel anytime, no contract.

### Chat Agent

| Feature | Included |
|---------|----------|
| AI chat widget on website | Yes |
| 24/7 lead qualification | Yes |
| Appointment booking via chat | Yes |
| Lead capture to GHL CRM | Yes |
| Automated follow-up sequences | Yes |
| FREE website & hosting included | Yes |
| GHL CRM account setup | Yes |
| CRM automations (booking confirmation, follow-ups, reminders) | Yes |
| Monthly reporting | Yes |

**Pricing**: $147/mo. Setup: $197.

**RAAS Guarantee**: Yes. Agent doesn't book? You don't pay for that month.

### Voice Agent (Recommended)

| Feature | Included |
|---------|----------|
| AI voice agent on website (voice bubble) | Yes |
| Dedicated phone number with call forwarding | Yes |
| 24/7 call answering & lead qualification | Yes |
| Appointment booking via voice | Yes |
| Lead capture to GHL CRM | Yes |
| Automated follow-up sequences | Yes |
| FREE website & hosting included | Yes |
| GHL CRM account setup | Yes |
| CRM automations (booking confirmation, staff notifications, follow-ups, job completion) | Yes |
| After-hours coverage | Yes |
| Live call transfer to owner | Yes |
| Monthly reporting | Yes |

**Pricing**: $247/mo. Setup: $297.

**RAAS Guarantee**: Yes. Agent doesn't book? You don't pay for that month.

### CRM Automations (Included with Chat & Voice)

Specific automations included with agent packages:

1. Booking confirmation when customer books appointment
2. Staff arrival notification
3. Job lost after inspection follow-up
4. Job secured confirmation
5. Job complete follow-up

*Source: services.yaml, lines 47-53.*

---

## 12. Animation Philosophy

### 12.1 Guiding Principle

Animations on the Fluis.ai website follow the Nothing Phone aesthetic: **deliberate
restraint**. Every animation must serve a purpose — guiding attention, confirming
interaction, or communicating state change. If an animation does not pass the "why does
this move?" test, it does not ship.

The visual language is: things appear calmly, respond immediately to interaction, and
never compete for attention. Motion is felt, not noticed.

### 12.2 Scroll Reveal

Elements below the fold fade in as they enter the viewport. The animation is a combined
fade + slight upward slide.

```css
.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.reveal.revealed {
  opacity: 1;
  transform: translateY(0);
}
```

The `cubic-bezier(0.16, 1, 0.3, 1)` curve is an ease-out-expo equivalent — fast start,
gentle deceleration. Elements feel like they settle into place.

**JavaScript (IntersectionObserver)**:

```js
(function() {
  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target); // animate once only
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  reveals.forEach(el => observer.observe(el));
})();
```

### 12.3 Staggered Children

When a group of elements (e.g., service cards, feature items) enters the viewport, each
child animates in sequence with a 100ms delay between siblings.

```css
.reveal-group > .reveal:nth-child(1) { transition-delay: 0ms; }
.reveal-group > .reveal:nth-child(2) { transition-delay: 100ms; }
.reveal-group > .reveal:nth-child(3) { transition-delay: 200ms; }
.reveal-group > .reveal:nth-child(4) { transition-delay: 300ms; }
.reveal-group > .reveal:nth-child(5) { transition-delay: 400ms; }
.reveal-group > .reveal:nth-child(6) { transition-delay: 500ms; }
```

The parent `.reveal-group` itself is observed. When it enters the viewport, all
children with `.reveal` get the `.revealed` class simultaneously — the stagger comes
from the CSS `transition-delay`.

```js
const groups = document.querySelectorAll('.reveal-group');

const groupObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.reveal').forEach(child => {
        child.classList.add('revealed');
      });
      groupObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

groups.forEach(group => groupObserver.observe(group));
```

### 12.4 Hover Animations

**Cards** (service cards, pricing cards, feature cards):
```css
.card {
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.card:hover {
  transform: translateY(-4px);
  border-color: var(--color-border-hover);
}
```

**Primary buttons**:
```css
.btn-primary {
  transition: background 0.2s ease, box-shadow 0.2s ease, transform 0.15s ease;
}

.btn-primary:hover {
  background: var(--color-accent-hover);
  box-shadow: var(--shadow-glow);
}

.btn-primary:active {
  transform: scale(0.97);
}
```

**Ghost/secondary buttons**:
```css
.btn-secondary {
  transition: background 0.2s ease, border-color 0.2s ease, transform 0.15s ease;
}

.btn-secondary:hover {
  background: var(--color-surface-2);
}

.btn-secondary:active {
  transform: scale(0.97);
}
```

**Critical rule**: Never use `transition: all`. Always specify the exact properties
being transitioned. `transition: all` causes the browser to watch every CSS property for
changes, which is wasteful and can cause unexpected animations on properties like `color`
or `padding`.

### 12.5 Number Count-Up

Stats on the Home page (e.g., "62%", "$247/mo") count up from 0 to their final value
when they enter the viewport. This draws attention and makes numbers feel earned.

```js
function countUp(element, target, duration, prefix, suffix) {
  const start = 0;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // ease-out curve
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(start + (target - start) * eased);

    element.textContent = (prefix || '') + current.toLocaleString() + (suffix || '');

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

// Usage: triggered by IntersectionObserver, once per element
// <span class="count-up" data-target="62" data-suffix="%" data-duration="1500">0%</span>
```

Each `.count-up` element specifies its target, prefix/suffix, and duration via
`data-` attributes. The observer triggers the animation once and then disconnects.
Duration: 1.5s. Easing: cubic ease-out.

### 12.6 Nav Underline Animation

Covered in Section 2.4. The key detail is the `transform-origin` switch:

```css
.nav-link::after {
  transform: scaleX(0);
  transform-origin: right center;
  transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.nav-link:hover::after {
  transform: scaleX(1);
  transform-origin: left center;
}
```

On hover-in, the underline grows left-to-right. On hover-out, it shrinks right-to-left.
This directional wipe is a signature micro-interaction — small but intentional.

### 12.7 Reduced Motion

Every animation on the site is wrapped in a `prefers-reduced-motion` media query.
This is a WCAG 2.2 AA requirement.

```css
@media (prefers-reduced-motion: no-preference) {
  .reveal {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1),
                transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .reveal.revealed {
    opacity: 1;
    transform: translateY(0);
  }

  .reveal-group > .reveal:nth-child(1) { transition-delay: 0ms; }
  .reveal-group > .reveal:nth-child(2) { transition-delay: 100ms; }
  .reveal-group > .reveal:nth-child(3) { transition-delay: 200ms; }
  .reveal-group > .reveal:nth-child(4) { transition-delay: 300ms; }
  .reveal-group > .reveal:nth-child(5) { transition-delay: 400ms; }
  .reveal-group > .reveal:nth-child(6) { transition-delay: 500ms; }

  .card {
    transition: transform 0.2s ease, border-color 0.2s ease;
  }

  .card:hover {
    transform: translateY(-4px);
  }

  .btn-primary {
    transition: background 0.2s ease, box-shadow 0.2s ease, transform 0.15s ease;
  }

  .btn-secondary {
    transition: background 0.2s ease, border-color 0.2s ease, transform 0.15s ease;
  }

  .nav-link::after {
    transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
}

/* When reduced motion is preferred: no transforms, instant state changes */
@media (prefers-reduced-motion: reduce) {
  .reveal {
    opacity: 1;
    transform: none;
  }

  .card:hover {
    transform: none;
  }

  .btn-primary:active,
  .btn-secondary:active {
    transform: none;
  }

  .nav-link::after {
    transition: none;
  }

  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

When `prefers-reduced-motion: reduce` is active:
- All scroll-reveal elements are immediately visible (no fade/slide).
- Card hover lifts are disabled.
- Button scale effects are disabled.
- Nav underline transitions are instant.
- All CSS animations and transitions are effectively disabled via the universal
  `*` selector override.

> **Canonical reduced-motion behavior**: This master spec's `prefers-reduced-motion: reduce` block is the SINGLE source of truth. Page-level specs must NOT define their own reduced-motion behavior — they reference this section instead. The approach: all transforms disabled, all transitions set to `0.01ms`, all animations set to one iteration at `0.01ms`. Opacity changes and color transitions remain for basic state feedback.
>
> **GSAP override**: When using GSAP (Section 13), the CSS reduced-motion rules above serve as the fallback. GSAP's own `gsap.matchMedia("(prefers-reduced-motion: no-preference)")` context wraps ALL JS-driven animations. When reduced motion is preferred, GSAP animations never register and all content is immediately visible.

### 12.8 Duration Guidelines

| Category           | Duration     | Use case                                         |
|--------------------|--------------|--------------------------------------------------|
| Micro-interaction  | 150-200ms    | Button hover, color change, border shift         |
| Entrance           | 300-600ms    | Scroll reveal, modal open, overlay slide         |
| Transition         | 200-300ms    | Page element changes, accordion open/close       |
| Count-up           | 1500ms       | Number animation (stat counters)                 |
| Maximum            | 600ms        | No single animation exceeds this                 |

### 12.9 Performance Rules

- Only animate `transform` and `opacity`. These are the only CSS properties that can be
  composited on the GPU without triggering layout or paint.
- Never animate `width`, `height`, `top`, `left`, `margin`, `padding`, or `border-width`.
  These trigger layout recalculation and cause jank.
- Use `will-change: transform, opacity` sparingly — only on elements actively being
  animated, and remove it after the animation completes.
- `requestAnimationFrame` for all JS-driven animations (count-up, waveform). Never
  use `setInterval` or `setTimeout` for visual animations.

---

## 13. Animation Stack & Libraries

Section 12 defines the animation *philosophy* (restraint, purpose, reduced-motion). This
section defines the animation *tooling* — the libraries, loading strategy, and CDN
configuration that power the 10/10 wow-factor animations across the site.

### 13.1 Why GSAP

GSAP (GreenSock Animation Platform) became **100% free** in April 2025 when Webflow acquired
GreenSock. All previously premium plugins (SplitText, ScrambleText, Flip, MorphSVG,
ScrollSmoother) are now free for commercial use. This changes the economics of web animation
entirely — capabilities that previously required a $150/year license are now zero-cost.

GSAP is chosen over CSS animations for scroll-linked effects, text splitting, morphing,
and timeline sequencing because these capabilities either do not exist in CSS or require
significantly more code to implement reliably across browsers.

### 13.2 Library Inventory

| Library | Size (gzip) | Role | CDN |
| ------- | ----------- | ---- | --- |
| **GSAP 3** | ~23KB | Core animation engine — tweens, timelines, easing | `cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js` |
| **ScrollTrigger** | ~10KB | Scroll-linked animations, pinning, scrub | `cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js` |
| **SplitText** | ~5KB | Character/word/line splitting for text animations | `cdn.jsdelivr.net/npm/gsap@3/dist/SplitText.min.js` |
| **ScrambleTextPlugin** | ~3KB | Matrix-style text decode effect | `cdn.jsdelivr.net/npm/gsap@3/dist/ScrambleTextPlugin.min.js` |
| **Flip** | ~5KB | Shared element transitions (layout animation) | `cdn.jsdelivr.net/npm/gsap@3/dist/Flip.min.js` |
| **MorphSVGPlugin** | ~5KB | SVG shape morphing for service journey | `cdn.jsdelivr.net/npm/gsap@3/dist/MorphSVGPlugin.min.js` |
| **Lenis** | ~3KB | Butter-smooth momentum scrolling | `cdn.jsdelivr.net/npm/lenis@latest` |
| **Barba.js** | ~7KB | SPA-like page transitions on static site | `cdn.jsdelivr.net/npm/@barba/core@latest` |

### 13.3 Loading Strategy

```html
<!-- GSAP core — loads immediately (required for all animations) -->
<script defer src="https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js"></script>

<!-- GSAP plugins — deferred, loaded after core -->
<script defer src="https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js"></script>
<script defer src="https://cdn.jsdelivr.net/npm/gsap@3/dist/SplitText.min.js"></script>
<script defer src="https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrambleTextPlugin.min.js"></script>
<script defer src="https://cdn.jsdelivr.net/npm/gsap@3/dist/Flip.min.js"></script>
<script defer src="https://cdn.jsdelivr.net/npm/gsap@3/dist/MorphSVGPlugin.min.js"></script>

<!-- Smooth scroll + page transitions -->
<script defer src="https://cdn.jsdelivr.net/npm/lenis@latest"></script>
<script defer src="https://cdn.jsdelivr.net/npm/@barba/core@latest"></script>

<!-- Site scripts (after libraries) -->
<script defer src="/js/main.js"></script>

<!-- Page-specific (conditional, loaded per page) -->
<script defer src="/js/animations/home.js"></script>
```

**Rules**:
- GSAP core loads first. All plugins depend on it.
- Page-specific JS files load conditionally based on `data-barba-namespace` or `body` class.
- SND.dev (Section 18.1) loads lazily only when the user enables sound — never in the initial bundle.

### 13.4 Bundle Size Summary

| Category | Size (gzip) |
| -------- | ----------- |
| GSAP core + all plugins | ~51KB |
| Lenis + Barba.js | ~10KB |
| Page-specific + audio-reactive JS | ~20KB |
| **Total active animation JS** | **~81KB** |
| SND.dev (deferred, opt-in) | ~15KB |

For reference: a single hero image is typically 50-150KB. The entire animation system
is lighter than two images.

---

## 14. Global Animation Effects

These effects appear on **ALL pages**. They are initialized in `main.js` and run globally.
Page-specific animations are defined in each page's spec document (01-04).

### 14.1 Lenis Smooth Scroll

Butter-smooth momentum scrolling with configurable lerp. Integrates with GSAP ScrollTrigger
to ensure scroll-linked animations remain synchronized.

```js
// In main.js
const lenis = new Lenis({
  lerp: 0.1,
  smoothWheel: true,
});

// Integrate with ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);
```

**Note**: Lenis replaces `scroll-behavior: smooth` on `<html>`. Remove the CSS
`scroll-behavior` property when Lenis is active to avoid conflicts.

### 14.2 Custom Cursor

A two-part cursor system: a 6px white dot that follows instantly, and a 40px ring that
trails with a 0.15s delay. The ring reacts to interactive elements.

**Desktop only**: Wrapped in `@media (hover: hover)` to prevent activation on touch devices.
Hide the native cursor with `cursor: none` on `body` when active.

```js
// cursor.js (~40 lines)
const dot = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');

// GSAP quickTo for 60fps performance
const xDot = gsap.quickTo(dot, 'x', { duration: 0 });
const yDot = gsap.quickTo(dot, 'y', { duration: 0 });
const xRing = gsap.quickTo(ring, 'x', { duration: 0.15, ease: 'power2.out' });
const yRing = gsap.quickTo(ring, 'y', { duration: 0.15, ease: 'power2.out' });

window.addEventListener('pointermove', (e) => {
  xDot(e.clientX);
  yDot(e.clientY);
  xRing(e.clientX);
  yRing(e.clientY);
});

// Ring scales 2.5x + turns red on interactive elements
document.querySelectorAll('a, button, [role="button"], .card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    gsap.to(ring, { scale: 2.5, borderColor: 'var(--color-accent)', duration: 0.3 });
  });
  el.addEventListener('mouseleave', () => {
    gsap.to(ring, { scale: 1, borderColor: 'var(--color-text)', duration: 0.3, ease: 'elastic.out(1, 0.3)' });
  });
});
```

```css
/* Cursor elements — appended to body via JS */
.cursor-dot {
  position: fixed;
  top: 0;
  left: 0;
  width: 6px;
  height: 6px;
  background: var(--color-text);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  transform: translate(-50%, -50%);
}

.cursor-ring {
  position: fixed;
  top: 0;
  left: 0;
  width: 40px;
  height: 40px;
  border: 1px solid var(--color-text);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9998;
  transform: translate(-50%, -50%);
}

@media (hover: hover) {
  body { cursor: none; }
  a, button { cursor: none; }
}

/* Hide custom cursor on touch devices */
@media (hover: none) {
  .cursor-dot, .cursor-ring { display: none; }
}
```

### 14.3 Film Grain Overlay

A subtle noise texture overlaid on the entire page using an inline SVG filter. Adds tactile
quality at zero JavaScript cost.

```html
<!-- Inline in every page, inside <body> -->
<svg class="film-grain" aria-hidden="true">
  <filter id="grain">
    <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
  </filter>
  <rect width="100%" height="100%" filter="url(#grain)" />
</svg>
```

```css
.film-grain {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  opacity: 0.03;
  mix-blend-mode: soft-light;
  z-index: 9997;
}
```

**Performance**: Pure CSS/SVG. Zero JS. Zero repaint cost. The `pointer-events: none`
ensures it never interferes with interaction.

### 14.4 Cursor Spotlight

A faint radial gradient that follows the cursor on hero sections, creating a subtle red
glow effect.

```css
.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(
    600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
    rgba(255, 59, 48, 0.06),
    transparent 40%
  );
  pointer-events: none;
  z-index: 1;
}
```

```js
// Single pointermove listener — updates CSS custom properties
document.querySelectorAll('.hero').forEach(hero => {
  hero.addEventListener('pointermove', (e) => {
    const rect = hero.getBoundingClientRect();
    hero.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    hero.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  });
});
```

### 14.5 Nav Direction-Aware Highlight

A sliding indicator element beneath nav links that tweens from the previous link's position
to the current hovered link (Vercel-style). The indicator's `left` and `width` are animated
via GSAP based on the hovered link's `getBoundingClientRect()`.

```js
// nav.js
const indicator = document.querySelector('.nav-indicator');
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
  link.addEventListener('mouseenter', () => {
    const { left, width } = link.getBoundingClientRect();
    const navLeft = link.parentElement.getBoundingClientRect().left;
    gsap.to(indicator, {
      left: left - navLeft,
      width: width,
      opacity: 1,
      duration: 0.3,
      ease: 'power2.out',
    });
  });
});

document.querySelector('.nav-links').addEventListener('mouseleave', () => {
  gsap.to(indicator, { opacity: 0, duration: 0.2 });
});
```

```html
<!-- Inside .nav-links -->
<div class="nav-indicator" aria-hidden="true"></div>
```

```css
.nav-indicator {
  position: absolute;
  bottom: -2px;
  height: 2px;
  background: var(--color-accent);
  opacity: 0;
  pointer-events: none;
  transition: none; /* GSAP handles all transitions */
}
```

### 14.6 Magnetic Nav Links

Nav links pull 30% toward the cursor on hover and spring back elastically on mouseleave.

```js
// nav.js
navLinks.forEach(link => {
  link.addEventListener('mousemove', (e) => {
    const rect = link.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(link, { x: x * 0.3, y: y * 0.3, duration: 0.3, ease: 'power2.out' });
  });

  link.addEventListener('mouseleave', () => {
    gsap.to(link, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.3)' });
  });
});
```

### 14.7 Scroll Progress Bar

A fixed 2px red bar at the top of the page that scales from 0 to 1 based on scroll position.

```html
<div class="scroll-progress" aria-hidden="true"></div>
```

```css
.scroll-progress {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--color-accent);
  transform-origin: left;
  transform: scaleX(0);
  z-index: 1;
}
```

```js
// main.js
gsap.to('.scroll-progress', {
  scaleX: 1,
  ease: 'none',
  scrollTrigger: {
    trigger: document.body,
    start: 'top top',
    end: 'bottom bottom',
    scrub: true,
  },
});
```

### 14.8 Page Transitions (Barba.js)

SPA-like page transitions on a static HTML site. Current page fades out and slides up,
next page fades in and slides up. Pages prefetch on hover for instant navigation feel.

```js
// transitions.js (~40 lines)
barba.init({
  prefetchIgnore: false,
  transitions: [{
    name: 'fade-slide',
    leave(data) {
      return gsap.to(data.current.container, {
        opacity: 0,
        y: -30,
        duration: 0.4,
        ease: 'power2.in',
      });
    },
    enter(data) {
      gsap.set(data.next.container, { opacity: 0, y: 30 });
      return gsap.to(data.next.container, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
      });
    },
    after() {
      window.scrollTo(0, 0);
      ScrollTrigger.refresh();
    },
  }],
});
```

**HTML requirement**: Every page must wrap its `<main>` content in Barba.js attributes:

```html
<div data-barba="wrapper">
  <main data-barba="container" data-barba-namespace="home">
    <!-- page content -->
  </main>
</div>
```

Each page uses a unique `data-barba-namespace`: `home`, `services`, `pricing`, `about`.

### 14.9 Scroll Velocity Awareness

The site adapts animation intensity based on how fast the user is scrolling. Slow scrollers
get theatrical reveals. Fast scrollers get quick elegant fades. This makes the site feel
intelligent and responsive to user behavior.

```js
// main.js (~15 lines)
ScrollTrigger.addEventListener('scrollEnd', () => {
  document.documentElement.style.setProperty('--scroll-speed', 'slow');
});

ScrollTrigger.addEventListener('scroll', () => {
  const velocity = Math.abs(ScrollTrigger.getVelocity());
  let speed = 'slow';
  if (velocity > 2000) speed = 'fast';
  else if (velocity > 500) speed = 'medium';
  document.documentElement.style.setProperty('--scroll-speed', speed);
});
```

| Speed | Velocity | Behavior |
| ----- | -------- | -------- |
| `slow` | < 500px/s | Theatrical reveals — full stagger, SplitText effects |
| `medium` | 500-2000px/s | Standard animations — normal duration |
| `fast` | > 2000px/s | Quick fades — reduced stagger, simpler transitions |

Page-specific animation code can read `--scroll-speed` via `getComputedStyle` or use it
directly in CSS for conditional timing.

### 14.10 Accessibility — prefers-reduced-motion

**ALL** GSAP-powered animations in Sections 13-18 are wrapped in a single `matchMedia` context:

```js
// main.js — top level
const mm = gsap.matchMedia();

mm.add('(prefers-reduced-motion: no-preference)', () => {
  // ALL animation initialization goes here
  // When reduced motion is preferred, none of this executes
  // All content is immediately visible with no motion whatsoever
});
```

This is the GSAP equivalent of the CSS `prefers-reduced-motion` block in Section 12.7.
Both work together: CSS handles the fallback, GSAP handles the enhanced animations.

### 14.11 Hardware Detection

Enhanced effects (canvas particle systems, cursor spotlight) are gated behind a hardware
capability check to ensure lower-spec devices get a smooth experience.

```js
// main.js
const isHighEnd = navigator.hardwareConcurrency > 4;

// Only init enhanced effects on capable hardware
if (isHighEnd) {
  initDotGridCanvas();   // home.js — interactive dot-grid
  initCursorSpotlight(); // cursor.js — radial gradient follow
  initParticleField();   // audio-reactive.js — particle response
}
```

Lower-spec devices still get: Lenis smooth scroll, GSAP text animations, ScrollTrigger
reveals, page transitions, theme toggle, and all CSS-based effects. They skip: canvas
particle systems, cursor spotlight gradient, and audio-reactive particle field.

---

## 15. Audio-Reactive System ("The Alive Website")

This is the **SIGNATURE feature** of the Fluis.ai website. When the voice agent speaks,
the page subtly comes alive. Not just the widget — the PAGE itself responds to audio.
No agency website in the voice AI space has done this.

### 15.1 Concept

Fluis.ai sells talking websites. The agency website itself should BE a talking website.
The audio-reactive system creates a visceral connection between the voice agent and the
page environment. Visitors feel — even subconsciously — that the site is alive.

### 15.2 Technical Approach

The system pipes voice agent audio through the Web Audio API's `AnalyserNode` to extract
amplitude data, then exposes it as a CSS custom property for consumption by canvas
elements and CSS rules.

```js
// audio-reactive.js — core pipeline
function initAudioReactive(audioNode) {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const analyser = ctx.createAnalyser();
  analyser.fftSize = 256; // 128 frequency bins — minimal CPU cost
  analyser.smoothingTimeConstant = 0.8;

  audioNode.connect(analyser);

  const data = new Uint8Array(analyser.frequencyBinCount);

  function update() {
    analyser.getByteFrequencyData(data);

    // Average amplitude normalized to 0-1
    const sum = data.reduce((a, b) => a + b, 0);
    const level = sum / (data.length * 255);

    document.documentElement.style.setProperty('--audio-level', level.toFixed(3));

    requestAnimationFrame(update);
  }

  update();
}
```

**Performance**: `AnalyserNode` runs in a separate audio thread with approximately zero main
thread cost. The `requestAnimationFrame` loop only reads data and sets a single CSS custom
property.

### 15.3 Connection to Voice Widget

The voice widget (GHL, provided later) must expose its audio output node. The connection
contract is:

```js
// Option A: Global variable
// Voice widget sets: window.fluisAudioNode = audioOutputNode;
if (window.fluisAudioNode) {
  initAudioReactive(window.fluisAudioNode);
}

// Option B: Custom event
window.addEventListener('fluis:audio-ready', (e) => {
  initAudioReactive(e.detail.audioNode);
});
```

Either approach works. The audio-reactive system waits for the voice widget to provide
an audio node. Until then, the system stays idle and all reactive layers remain at their
baseline state.

### 15.4 Three Reactive Layers

#### Layer 1: Ambient Waveform Strip

A persistent 4px-tall canvas element used as a section divider (below hero, between sections).
Renders a subtle sine wave using Simplex noise.

- **Idle state**: Gentle undulation — the website's "heartbeat"
- **Voice active**: Responds to audio amplitude, becomes more energetic
- **Canvas**: `<canvas>` element, full width, 4px height, `position: relative`
- **Rendering**: Simplex noise sine wave, stroke color `var(--color-accent)` at 30% opacity

#### Layer 2: Particle Field Response

The dot-grid canvas background (Home page hero) connects to voice audio output.

- **Idle state**: White dots in 30px grid at 30% opacity, gentle ambient movement
- **Voice active**: Particles increase in movement velocity and brightness
- **When silent**: Particles settle back to baseline
- **Subtlety**: So subtle visitors do not consciously notice — they *feel* the page is alive

#### Layer 3: Text Luminosity Pulse

Hero headline opacity micro-shifts tied to audio amplitude.

- **Range**: Opacity shifts by +/- 0.05 maximum (e.g., 0.95 to 1.0)
- **Target**: Hero `<h1>` element only
- **Connection**: `opacity: calc(0.95 + var(--audio-level) * 0.05)`
- **Effect**: A whisper of connection between voice and text — not animation, just presence

### 15.5 Graceful Degradation

If no voice widget is active, the audio-reactive system stays completely idle:
- Waveform strip renders its baseline Simplex noise undulation (ambient, not reactive)
- Particle field runs at base state (standard dot-grid behavior)
- Text luminosity stays at full opacity (no pulse)
- `--audio-level` remains at `0`

Audio-reactivity is an **enhancement**, not a requirement. The site functions completely
without it. The system activates only when a voice session begins.

### 15.6 Tab Visibility

Canvas rendering pauses when the tab is hidden (`document.visibilitychange`). The
`requestAnimationFrame` loop naturally stops when the tab is backgrounded, but an explicit
check prevents the `AnalyserNode` loop from running unnecessarily.

### 15.7 Size

~200 lines vanilla JS, ~5KB gzipped. Zero new dependencies beyond the Web Audio API
(built into all modern browsers).

---

## 16. Dark/Light Theme Toggle

### 16.1 Architecture

**Approach**: `data-theme` attribute on `<html>` + CSS custom properties. Dark is default
(`:root`). Light overrides in `[data-theme="light"]`. All color values reference the
token system defined in `fluis_design_tokens.md`.

**Preference cascade** (3 tiers, highest priority first):
1. `localStorage.getItem('theme')` — user's explicit choice
2. `window.matchMedia('(prefers-color-scheme: light)')` — system preference
3. `'dark'` — Fluis.ai brand default fallback

### 16.2 FOUC Prevention

A blocking `<script>` in `<head>` runs synchronously before first paint. This sets the
`data-theme` attribute before any CSS is evaluated, preventing flash of wrong theme.

```html
<!-- MUST be in <head>, before any <link> or <style> -->
<script>
(function(){
  var t = localStorage.getItem('theme');
  if (!t) {
    t = window.matchMedia('(prefers-color-scheme:light)').matches ? 'light' : 'dark';
  }
  document.documentElement.setAttribute('data-theme', t);
})()
</script>
```

**This is the ONLY blocking script on the site.** It runs in under 1ms. Zero flash.

### 16.3 Toggle Button HTML

```html
<button
  class="theme-toggle"
  role="switch"
  aria-checked="true"
  aria-label="Dark mode"
  title="Toggle theme"
>
  <!-- Sun icon (shown in dark mode — click to switch to light) -->
  <svg class="theme-icon theme-icon--sun" width="24" height="24" viewBox="0 0 24 24"
       fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
    <circle cx="12" cy="12" r="5"/>
    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
  </svg>
  <!-- Moon icon (shown in light mode — click to switch to dark) -->
  <svg class="theme-icon theme-icon--moon" width="24" height="24" viewBox="0 0 24 24"
       fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
</button>
```

### 16.4 Toggle Placement

**Position**: Fixed, bottom-left corner — visually balanced against the voice bubble
(bottom-right). Always accessible without scrolling. Does not compete with nav CTA (top-right).

```css
.theme-toggle {
  position: fixed;
  z-index: 45;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--color-surface-2);
  border: 1px solid var(--color-border);
  color: var(--color-text);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  transition: border-color 0.2s ease;
}

/* Desktop */
@media (min-width: 768px) {
  .theme-toggle {
    left: 32px;
    bottom: 32px;
  }
}

/* Mobile — clears sticky CTA bar (72px height + 20px offset) */
@media (max-width: 767px) {
  .theme-toggle {
    left: 20px;
    bottom: 92px;
  }
}

.theme-toggle:hover {
  border-color: var(--color-border-hover);
}

.theme-toggle:focus-visible {
  outline: 3px solid var(--color-accent);
  outline-offset: 3px;
}
```

### 16.5 Icon Cross-Fade

Current icon rotates out (90 degrees) and fades, new icon rotates in (-90 to 0 degrees)
and fades. Duration: 250ms.

```css
.theme-icon {
  position: absolute;
  transition: opacity 250ms ease, transform 250ms ease;
}

/* Dark mode active: show sun (click to go light) */
[data-theme="dark"] .theme-icon--sun {
  opacity: 1;
  transform: rotate(0deg);
}
[data-theme="dark"] .theme-icon--moon {
  opacity: 0;
  transform: rotate(90deg);
}

/* Light mode active: show moon (click to go dark) */
[data-theme="light"] .theme-icon--sun {
  opacity: 0;
  transform: rotate(-90deg);
}
[data-theme="light"] .theme-icon--moon {
  opacity: 1;
  transform: rotate(0deg);
}
```

### 16.6 Theme Transition Effect

**Baseline (all browsers)**: CSS transition on `background-color`, `color`, `border-color`,
and `box-shadow` at 300ms.

```css
body,
.site-header,
.site-footer,
.card,
.btn-primary,
.btn-secondary,
.booking-modal__content {
  transition: background-color 300ms ease,
              color 300ms ease,
              border-color 300ms ease,
              box-shadow 300ms ease;
}
```

**Progressive enhancement (Chrome/Edge/Safari)**: View Transitions API circular reveal.
A circle expands from the toggle button position outward, revealing the new theme underneath.
Duration: 500ms. Uses `document.startViewTransition()` with `clip-path: circle()`.

```js
// theme.js — progressive enhancement
function toggleTheme() {
  const toggle = document.querySelector('.theme-toggle');
  const rect = toggle.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;

  // Calculate max radius to cover entire viewport
  const maxRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y)
  );

  if (document.startViewTransition) {
    const transition = document.startViewTransition(() => applyTheme());
    transition.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${maxRadius}px at ${x}px ${y}px)`] },
        { duration: 500, easing: 'ease-out', pseudoElement: '::view-transition-new(root)' }
      );
    });
  } else {
    // Firefox fallback: instant switch (baseline CSS transitions still apply)
    applyTheme();
  }
}
```

**Reduced motion**: All transitions become instant (0.01ms). Circular reveal skipped entirely.

### 16.7 Persistence & Multi-Tab Sync

```js
// theme.js
function applyTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);

  // Update aria-checked
  const toggle = document.querySelector('.theme-toggle');
  toggle.setAttribute('aria-checked', next === 'dark' ? 'true' : 'false');
}

// Multi-tab sync
window.addEventListener('storage', (e) => {
  if (e.key === 'theme' && e.newValue) {
    document.documentElement.setAttribute('data-theme', e.newValue);
  }
});

// System preference change listener (only when no stored preference)
window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
  if (!localStorage.getItem('theme')) {
    document.documentElement.setAttribute('data-theme', e.matches ? 'light' : 'dark');
  }
});
```

### 16.8 Accessibility

- `role="switch"` with `aria-checked="true"` (dark) / `"false"` (light)
- `aria-label="Dark mode"` — screen readers announce: "Dark mode, switch, on/off"
- Keyboard: both Space and Enter keys trigger toggle
- Focus ring: 3px solid `var(--color-accent)` with 3px offset
- System preference respected as default when no manual preference stored
- `prefers-reduced-motion`: transitions become instant, circular reveal skipped

### 16.9 Edge Cases

| Edge Case | Solution |
| --------- | -------- |
| GHL calendar embed | Always dark variant (brand priority). Iframe content unaffected by CSS custom properties |
| Voice widget | Uses same CSS custom properties — adapts automatically |
| SVG icons (Lucide) | All use `currentColor` — adapt automatically |
| Canvas dot-grid | Dot color reads from CSS custom property — white on dark, black on light |
| Film grain overlay | `mix-blend-mode: soft-light` adjusts naturally between themes |
| Glassmorphism cards | `backdrop-filter` works on both themes; card bg opacity adjusts per theme |
| OG image | Single dark-background image (works on both light/dark social feeds) |
| Print | Force light theme values in `@media print`; hide toggle, voice bubble, sticky CTA |
| Multi-tab sync | `window.addEventListener('storage', ...)` fires in other tabs |

### 16.10 Light Theme Token Values

Light theme overrides are defined in `fluis_design_tokens.md`. The CSS implementation:

```css
[data-theme="light"] {
  --color-bg: #ffffff;
  --color-surface: #f5f5f5;
  --color-surface-2: #ebebeb;
  --color-border: rgba(0, 0, 0, 0.08);
  --color-border-hover: rgba(0, 0, 0, 0.15);
  --color-text: #1a1a1a;
  --color-text-muted: #666666;
  --color-text-dim: #757575;
  --color-accent: #e8352b;
  --color-accent-hover: #d42f26;
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.08);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 12px 40px rgba(0, 0, 0, 0.12);
  --shadow-glow: 0 0 30px rgba(232, 53, 43, 0.12);
  color-scheme: light;
}
```

**WCAG note**: `--color-text-dim` changes from `#666666` to `#757575` in light mode to
maintain 4.6:1 contrast ratio on white. `--color-accent` darkens from `#ff3b30` to `#e8352b`
to maintain 4.5:1 on white. `#999999` on `#ffffff` = 2.8:1 (FAILS AA), which is why
`--color-text-muted` becomes `#666666` (5.7:1) in light mode.

---

## 17. Branded Preloader

A short loading sequence that reinforces the Fluis.ai brand from the first millisecond.
Only plays on first visit per session — subsequent navigations use Barba.js page transitions.

### 17.1 Sequence Timeline

| Time | Action |
| ---- | ------ |
| 0.0 - 1.0s | Logo draws on via SVG stroke animation (`stroke-dasharray` / `stroke-dashoffset`) |
| 1.0 - 1.5s | Waveform pulse beneath logo — a single audio-waveform line pulses once |
| 1.5 - 2.0s | Logo scales down and moves to navbar position (matching `.nav-logo` coordinates) |
| 2.0 - 2.5s | Hero content staggers in — headline, subheadline, CTAs in sequence |

### 17.2 Implementation

```js
// preloader.js (~30 lines)
if (!sessionStorage.getItem('preloaded')) {
  const tl = gsap.timeline({
    onComplete: () => {
      sessionStorage.setItem('preloaded', 'true');
      document.querySelector('.preloader').remove();
    },
  });

  tl.fromTo('.preloader-logo path', {
    strokeDashoffset: (i, el) => el.getTotalLength(),
    strokeDasharray: (i, el) => el.getTotalLength(),
  }, {
    strokeDashoffset: 0,
    duration: 1,
    ease: 'power2.inOut',
  })
  .to('.preloader-waveform', {
    scaleY: 1.5,
    opacity: 1,
    duration: 0.3,
    yoyo: true,
    repeat: 1,
    ease: 'sine.inOut',
  })
  .to('.preloader-logo', {
    scale: 0.4,
    x: () => document.querySelector('.nav-logo').getBoundingClientRect().left,
    y: () => document.querySelector('.nav-logo').getBoundingClientRect().top,
    duration: 0.5,
    ease: 'power3.inOut',
  })
  .from('.hero *', {
    y: 30,
    opacity: 0,
    stagger: 0.1,
    duration: 0.5,
    ease: 'power2.out',
  });
} else {
  // Not first visit in session — remove preloader immediately
  document.querySelector('.preloader')?.remove();
}
```

### 17.3 Preloader HTML

```html
<div class="preloader" aria-hidden="true">
  <svg class="preloader-logo" viewBox="0 0 200 50" fill="none" stroke="var(--color-text)" stroke-width="2">
    <!-- Fluis.ai logo as stroked paths -->
  </svg>
  <div class="preloader-waveform"></div>
</div>
```

```css
.preloader {
  position: fixed;
  inset: 0;
  z-index: 55;
  background: var(--color-bg);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-md);
}

.preloader-waveform {
  width: 120px;
  height: 2px;
  background: var(--color-accent);
  opacity: 0;
  transform: scaleY(1);
}
```

### 17.4 Session Control

- `sessionStorage.getItem('preloaded')` — set to `'true'` after first play
- Subsequent page loads in the same session skip the preloader entirely
- Barba.js page transitions handle all subsequent navigation
- New browser sessions (new tab, restart) replay the preloader

---

## 18. Supporting Polish

Low-effort, high-impact details that elevate the site from excellent to exceptional.

### 18.1 Micro-Sound (Opt-In)

Subtle sound effects that reinforce the "voice company" identity. **Off by default** to
respect user preference. Enabled via a small toggle in the nav.

**Library**: SND.dev — ~15KB, loaded lazily via CDN only when user enables sound.

```html
<!-- Lazy loaded only when sound enabled -->
<script src="https://cdn.jsdelivr.net/npm/snd.dev@latest" defer></script>
```

**Toggle**: A small speaker icon in the nav bar (near the CTA button):

```html
<button class="sound-toggle" aria-pressed="false" aria-label="Enable sound effects">
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
       stroke-width="1.5" aria-hidden="true">
    <!-- Lucide volume-off / volume-2 icon -->
  </svg>
</button>
```

**Sound events** (maximum 5-6 triggers):

| Event | Sound | Trigger |
| ----- | ----- | ------- |
| Magnetic hover | Soft click | Nav link magnetic snap |
| Page transition | Whoosh | Barba.js page leave |
| CTA click | Confirmation tone | Primary button click |
| Theme toggle | Switch click | Dark/light toggle |
| Preloader complete | Chime | Logo animation complete |

**Implementation**: Sounds only fire if `localStorage.getItem('sound') === 'true'`.
The SND.dev library is not loaded at all until the toggle is first activated.

### 18.2 Console Easter Egg

A fun message for developers who open DevTools.

```js
// main.js (5 lines)
console.log(
  '%c' +
  '    ∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿\n' +
  '    Peeking under the hood?\n' +
  '    We like that.\n' +
  '    hello@fluis.ai\n' +
  '    ∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿',
  'color: #ff3b30; font-size: 14px; font-family: monospace;'
);
```

### 18.3 Return Visitor Greeting

A localStorage-based flag that changes the hero subtitle for return visitors.

```js
// home.js (5 lines)
if (localStorage.getItem('visited')) {
  const subtitle = document.querySelector('.hero-subtitle');
  if (subtitle) subtitle.textContent = 'Welcome back. Ready to see what AI can do for your business?';
} else {
  localStorage.setItem('visited', 'true');
}
```

This only applies to the Home page hero. First-time visitors see the standard subtitle.
Return visitors get a personalized greeting that acknowledges their return and reduces
the pitch intensity.

### 18.4 Voice Agent Personality

5-10 fun off-topic responses programmed in the voice agent configuration (not website code).
Examples:

- "Tell me a joke" - AI-themed humor
- "What's the meaning of life?" - Playful deflection back to booking
- "Are you a robot?" - Self-aware response about being AI

These are configured in the GHL voice agent settings, not in the website JavaScript.
Zero build cost, maximum charm. Listed here for completeness only.

---

## Appendix A: Container Utility

Every section uses a `.container` wrapper to constrain content width:

```css
.container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 var(--space-md);
  width: 100%;
}
```

## Appendix B: Base Styles

```css
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-size: 100%;
  scroll-padding-top: calc(var(--header-height) + var(--space-md));
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  font-family: var(--font-sans);
  font-size: var(--text-base);
  font-weight: 400;
  line-height: 1.6;
  color: var(--color-text);
  background: var(--color-bg);
  min-height: 100vh;
  overflow-x: hidden;
}

img, svg {
  display: block;
  max-width: 100%;
  height: auto;
}

a {
  color: inherit;
  text-decoration: none;
}

button {
  font-family: inherit;
  cursor: pointer;
}

:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

::selection {
  background: rgba(255, 59, 48, 0.3);
  color: var(--color-text);
}
```

## Appendix C: Responsive Breakpoints

```css
/* Mobile first. Base styles are mobile. */
/* Tablet */
@media (min-width: 768px) { /* ... */ }
/* Desktop */
@media (min-width: 1024px) { /* ... */ }
/* Wide desktop */
@media (min-width: 1440px) { /* ... */ }
```

No breakpoint-specific tokens. The fluid `clamp()` typography and CSS Grid/Flexbox
handle most responsive behavior. Media queries are used only for layout shifts
(grid column counts, nav collapse, footer stacking).

## Appendix D: Checklist for Page Spec Authors

Before writing a page spec, verify it addresses:

- [ ] Single `<h1>` containing the page's primary keyword
- [ ] Sequential heading hierarchy (h1 > h2 > h3, no skips)
- [ ] Unique `<title>` and `<meta name="description">`
- [ ] Canonical URL
- [ ] Open Graph tags (title, description, image, URL)
- [ ] JSON-LD structured data (Organization on all, Service/FAQ where applicable)
- [ ] Primary CTA appears >= 3 times
- [ ] Voice bubble positioning accounted for (no overlap with fixed elements)
- [ ] All interactive elements meet 48x48px touch target
- [ ] `.reveal` classes on below-fold elements
- [ ] `prefers-reduced-motion` respected
- [ ] Page weight contribution stays within budget
- [ ] Internal links to at least 2 other pages
- [ ] `aria-current="page"` set on the correct nav link
- [ ] Mobile sticky CTA bar behavior defined

## Appendix E: FAQ Accordion Component

The FAQ accordion uses native `<details>/<summary>` elements with enhanced animations.

```css
/* Base FAQ styles */
.faq-item {
  border-bottom: 1px solid var(--color-border);
}

.faq-item summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-md) 0;
  cursor: pointer;
  font-size: var(--text-base);
  font-weight: 600;
  color: var(--color-text);
  list-style: none;
  min-height: 48px;
}

.faq-item summary::-webkit-details-marker {
  display: none;
}

.faq-item summary::after {
  content: '+';
  font-size: var(--text-lg);
  font-weight: 300;
  color: var(--color-text-muted);
  transition: transform 0.3s var(--ease-default);
  flex-shrink: 0;
  margin-left: var(--space-md);
}

.faq-item[open] summary::after {
  content: '\2212';
}

/* Answer with CSS-only fallback */
.faq-item__answer {
  overflow: hidden;
  max-height: 0;
  transition: max-height 0.3s var(--ease-default), opacity 0.3s var(--ease-default);
  opacity: 0;
}

.faq-item[open] .faq-item__answer {
  max-height: 500px; /* CSS-only fallback — JS overrides with exact scrollHeight */
  opacity: 1;
}

.faq-item__answer-inner {
  padding: 0 0 var(--space-md) 0;
  color: var(--color-text-muted);
  font-size: var(--text-base);
  line-height: 1.6;
}
```

**JavaScript enhancement** (progressive — accordion works without JS via native `<details>`):

```js
document.querySelectorAll('.faq-item').forEach(item => {
  const answer = item.querySelector('.faq-item__answer');
  if (!answer) return;

  item.querySelector('summary').addEventListener('click', (e) => {
    e.preventDefault();

    if (item.hasAttribute('open')) {
      // Closing
      answer.style.maxHeight = '0';
      answer.style.opacity = '0';
      answer.addEventListener('transitionend', () => {
        item.removeAttribute('open');
      }, { once: true });
    } else {
      // Opening
      item.setAttribute('open', '');
      answer.style.maxHeight = answer.scrollHeight + 'px';
      answer.style.opacity = '1';
    }
  });
});
```

---

*End of Master Specification. All page-level specs (01_home.md, 02_services.md,
03_pricing.md, 04_about.md) reference this document as the single source of truth
for shared elements, design rules, and cross-page strategy.*
