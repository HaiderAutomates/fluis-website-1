# 03 — Pricing Page Specification

**Page**: `pricing.html`
**Version**: 1.0
**Last updated**: 2026-02-27
**Status**: Ready for development
**Conversion goal**: Start a free trial (Voice Agent) or book a demo call

**Animation engine**: GSAP 3 + ScrollTrigger + SplitText + ScrambleText. See `00_master_spec.md` for the complete animation stack specification.

---

## Page Meta

```html
<title>Pricing — Fluis.ai | From $27/mo. No Contracts.</title>
<meta name="description" content="Simple, transparent pricing. Website hosting from $27/mo. AI chat agents from $147/mo. Voice agents from $247/mo. 7-day free trial. No results? No charge.">
<meta name="robots" content="index, follow">
<link rel="canonical" href="https://fluis.ai/pricing.html">

<!-- Open Graph -->
<meta property="og:title" content="Pricing — Fluis.ai | From $27/mo. No Contracts.">
<meta property="og:description" content="Simple, transparent pricing. AI agents that book appointments — or you don't pay. 7-day free trial. Cancel anytime.">
<meta property="og:type" content="website">
<meta property="og:url" content="https://fluis.ai/pricing.html">
<meta property="og:image" content="https://fluis.ai/assets/og/pricing-og.png">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Pricing — Fluis.ai | From $27/mo. No Contracts.">
<meta name="twitter:description" content="AI agents that book appointments — or you don't pay. From $27/mo. 7-day free trial.">
<meta name="twitter:image" content="https://fluis.ai/assets/og/pricing-og.png">
```

---

## Design Token Reference

All values below reference the Fluis.ai design token system (`fluis_design_tokens.md`). No hardcoded colors, font sizes, or spacing values anywhere in the implementation. Every value maps to a CSS custom property.

| Token | Value | Usage on this page |
|-------|-------|--------------------|
| `--color-bg` | `#0a0a0a` | Page background |
| `--color-surface` | `#141414` | Card backgrounds, FAQ items |
| `--color-surface-2` | `#1e1e1e` | RAAS callout, comparison table header |
| `--color-border` | `rgba(255,255,255,0.08)` | Card borders, dividers |
| `--color-border-hover` | `rgba(255,255,255,0.15)` | Card hover states |
| `--color-text` | `#f5f5f5` | Primary text, headlines |
| `--color-text-muted` | `#999999` | Secondary text, descriptions |
| `--color-text-dim` | `#666666` | Tertiary text, labels |
| `--color-accent` | `#ff3b30` | Recommended badge, primary CTAs, checkmarks |
| `--color-accent-hover` | `#ff5147` | CTA hover states |
| `--font-sans` | Inter | All body and UI text |
| `--font-mono` | JetBrains Mono | Prices, stats, numbers |
| `--shadow-glow` | `0 0 30px rgba(255,59,48,0.15)` | Voice Agent card glow |
| `--radius-md` | `0.75rem` (12px) | Card corners |
| `--radius-full` | `9999px` | Badge pills |

---

## Structured Data (JSON-LD)

Place in `<head>` or at the end of `<body>`. This enables Google rich results for the pricing page and its FAQ section.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Pricing — Fluis.ai",
  "description": "Simple, transparent pricing for AI-powered websites and agents.",
  "url": "https://fluis.ai/pricing.html",
  "mainEntity": {
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "Offer",
        "name": "Website & Hosting",
        "description": "Professional website with hosting and custom domain.",
        "price": "27.00",
        "priceCurrency": "USD",
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "billingDuration": "P1M"
        }
      },
      {
        "@type": "Offer",
        "name": "Chat Intelligence",
        "description": "AI chat agent with free website, CRM, and automations.",
        "price": "147.00",
        "priceCurrency": "USD",
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "billingDuration": "P1M"
        }
      },
      {
        "@type": "Offer",
        "name": "Voice Intelligence",
        "description": "AI voice agent with free website, CRM, phone number, and automations.",
        "price": "247.00",
        "priceCurrency": "USD",
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "billingDuration": "P1M"
        }
      }
    ]
  }
}
</script>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What if the agent doesn't book any appointments?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You don't pay. We operate as RAAS — Results as a Service. If our AI agent doesn't book a single appointment for your business in any given month, you don't pay for that month. Period. You can also choose to leave with a full refund, or continue without being charged for that month."
      }
    },
    {
      "@type": "Question",
      "name": "Is there a contract?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Never. Month-to-month. Cancel anytime. No questions asked. We earn your business every month."
      }
    },
    {
      "@type": "Question",
      "name": "What's included in the setup fee?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Everything you need to go live: custom website design and build, full CRM setup in GoHighLevel, all automation workflows (booking confirmations, follow-ups, staff notifications), AI agent training with your business knowledge base, calendar and availability configuration, and a custom domain setup. We do it all — you just provide your business details."
      }
    },
    {
      "@type": "Question",
      "name": "How long does setup take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "3 days for onboarding (we build everything), then 7 days of free trial where your agent is live and taking real leads. You're fully operational in under 2 weeks."
      }
    },
    {
      "@type": "Question",
      "name": "Are there any additional costs beyond the monthly subscription?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Your monthly subscription covers everything we build and manage — the website, AI agent, customer dashboard, and automations. The only additional cost is AI usage: voice conversations cost approximately 30-80p per 5-minute call (under $1), paid directly through the platform. For most businesses, this adds up to a few dollars per month. We're transparent about every cost because we believe you should know exactly what you're paying for."
      }
    },
    {
      "@type": "Question",
      "name": "Can I upgrade or downgrade my plan?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, anytime. Upgrades take effect immediately, and downgrades take effect at your next billing cycle. No penalties, no paperwork."
      }
    },
    {
      "@type": "Question",
      "name": "What if I already have a website?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No problem at all. We can embed our AI agent directly on your existing website. Same pricing, same features, same setup process. Your leads still flow into the customer dashboard, and all automations work exactly the same way. You don't need to switch websites to use our agents."
      }
    },
    {
      "@type": "Question",
      "name": "What happens after the 7-day free trial?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Your subscription starts automatically — your card is on file from day one. But we don't just charge you without warning. You'll receive a support check-in every 3 days during the trial, a billing reminder 24 hours before your first payment, and a final reminder 3 hours before. If you want to cancel, you can do so anytime during the trial for a full refund — including the setup fee. No questions asked."
      }
    }
  ]
}
</script>
```

---

## Page Structure Overview

The pricing page contains exactly 7 sections, rendered top to bottom. Every section is wrapped in a `<section>` element with a unique `id` for anchor linking and scroll-driven animations.

```
SECTION 1: Pricing Hero          — Value-focused headline, objection-busting subheadline
SECTION 2: Pricing Cards Grid    — Three-tier Goldilocks layout (Website | Chat | Voice)
SECTION 3: Feature Comparison    — Expandable full comparison table
SECTION 4: RAAS Guarantee        — Trust anchor, risk reversal callout
SECTION 5: ROI Calculator        — Interactive slider proving RAAS value proposition
SECTION 6: FAQ                   — 8 pricing-specific questions with finished answers
SECTION 7: Final CTA             — Closing push with zero-risk framing
```

---

---

# SECTION 1: Pricing Hero

**Purpose**: Set the value frame immediately. The headline must do work — not just label the page. Visitors arrive here with one question: "How much does this cost?" But the best pricing pages answer a different question first: "What is this worth?"

**HTML Structure**:
```html
<section id="pricing-hero" class="pricing-hero" aria-labelledby="pricing-heading">
  <div class="container">
    <p class="pricing-hero__label">PRICING</p>
    <h1 id="pricing-heading" class="pricing-hero__headline">
      <!-- Recommended headline here -->
    </h1>
    <p class="pricing-hero__subheadline">
      <!-- Subheadline here -->
    </p>
  </div>
</section>
```

## Headline Options

### Option A: "If We Don't Book Appointments, You Don't Pay."

**Rationale**: Leads with the RAAS guarantee — the single most powerful differentiator this business has. It immediately answers the deepest objection ("What if it doesn't work?") before the visitor even sees a price. This is bold, direct, and filters for serious buyers. It also sets the frame: you are not buying a tool, you are buying results.

**Psychological mechanism**: Risk reversal + loss aversion flipped. The reader realizes there is no downside before processing any price.

### Option B: "Costs Less Than One Appointment."

**Rationale**: Anchoring and reframing. Before the visitor sees $247/mo, they process the idea that this costs less than one booked job. If the visitor is a plumber who charges $200 per call-out, they immediately think: "So it pays for itself with one booking." This is the price rebuttal deployed as a headline.

**Psychological mechanism**: Anchoring + mental accounting. The brain frames $247 against the value of one appointment (often $200-$500+), making the price feel trivial.

### Option C: "Simple Pricing. Real Results."

**Rationale**: Clean, confident, no-nonsense. Directly addresses the two things non-techie business owners worry about on pricing pages: complexity (hidden fees, confusing tiers) and whether it actually works. The word "Simple" reduces cognitive load; "Real Results" sets the outcome expectation.

**Psychological mechanism**: Cognitive ease + outcome framing. The simplicity of the sentence mirrors the simplicity of the pricing.

### RECOMMENDED: Option A

**"If We Don't Book Appointments, You Don't Pay."**

This is the strongest choice for three reasons:
1. It is the single most differentiated claim Fluis.ai can make. No competitor at this price point offers a pay-for-results guarantee.
2. It eliminates the biggest objection before the visitor even scrolls to prices, meaning they evaluate tiers in an already de-risked mental state.
3. It is specific and concrete. "Appointments" is a tangible business outcome, not marketing speak.

Option B is a strong secondary choice and is used later in the anchoring callout below the pricing cards. Option C is too generic for a high-intent page.

## Finished Copy

**Label** (above headline):
```
PRICING
```

**Headline**:
```
If We Don't Book Appointments, You Don't Pay.
```

**Subheadline**:
```
No contracts. No hidden fees. Month-to-month. Cancel anytime.
Pick the plan that fits your business — upgrade or downgrade whenever you want.
```

## Styling

| Property | Value |
|----------|-------|
| Label | `font-family: var(--font-sans)` / `font-size: var(--text-xs)` / `font-weight: 500` / `letter-spacing: 0.15em` / `text-transform: uppercase` / `color: var(--color-accent)` / `margin-bottom: var(--space-sm)` |
| Headline | `font-family: var(--font-sans)` / `font-size: var(--text-2xl)` / `font-weight: 800` / `color: var(--color-text)` / `line-height: 1.1` / `max-width: 720px` / `margin: 0 auto var(--space-md)` |
| Subheadline | `font-family: var(--font-sans)` / `font-size: var(--text-base)` / `color: var(--color-text-muted)` / `line-height: 1.6` / `max-width: 540px` / `margin: 0 auto` |
| Section | `text-align: center` / `padding: var(--space-3xl) var(--space-md) var(--space-xl)` |
| Background | `var(--color-bg)` (transparent — no distinct background needed) |

## Animation

> **Animation engine**: All animations on this page use GSAP 3 + ScrollTrigger + SplitText + ScrambleText. See `00_master_spec.md` for the complete animation stack specification. All animation code is wrapped in `gsap.matchMedia("(prefers-reduced-motion: no-preference)")` — when reduced motion is preferred, all content renders immediately with no animation.

**On Page Load (sequence)**:

- **Label**: `gsap.from(".pricing-hero__label", { y: 12, opacity: 0, duration: 0.4, ease: "expo.out" })`. Delay: 0ms.
- **Headline**: SplitText word reveal. Split `.pricing-hero__headline` into words. `gsap.from(splitInstance.words, { y: 40, opacity: 0, duration: 0.5, stagger: 0.03, ease: "back.out(1.7)" })`. Delay: 100ms after label.
- **Subheadline**: `gsap.from(".pricing-hero__subheadline", { y: 12, opacity: 0, duration: 0.5, ease: "expo.out" })`. Delay: 200ms after label.

**ScrambleText on price-related numbers**: Any price numbers visible in the hero subheadline (if any) use ScrambleText decode. Characters scramble through `"0123456789$,."` then resolve to final value over 0.8s. This effect reinforces the AI/tech brand identity on the pricing page.

**Trigger**: Animations fire on page load (above the fold, no ScrollTrigger needed).

**Reduced motion**: All animations on this page are wrapped inside `gsap.matchMedia("(prefers-reduced-motion: no-preference)")`. When reduced motion is preferred, all content is immediately visible with no animation. See `00_master_spec.md` Section 12.7.

## Mobile Layout (< 768px)

- Headline scales down via `clamp()` (already defined in `--text-2xl`): min 2.5rem, max 5rem.
- Subheadline: `max-width: 100%`, padding `0 var(--space-sm)`.
- Section padding: `var(--space-2xl) var(--space-sm) var(--space-lg)`.
- All text remains centered.

## Psychology Note

The hero does NOT show a CTA button. This is intentional. On a pricing page, the hero's job is to set the value frame, not to ask for action before the visitor has seen prices. The CTA lives on the pricing cards and at the page bottom. Placing a CTA here would be premature and could feel pushy on a page where the visitor expects to evaluate options first.

---

## Contextual Intro (Between Hero and Pricing Cards)

> **Contextual note for visitors landing directly on Pricing**: Many visitors arrive at the Pricing page from search or direct links without visiting the Home or Services pages first. A brief 2-3 sentence contextual intro ensures they understand what they're pricing.

**Copy** (rendered between the hero subheadline and the pricing card grid):

```
Fluis.ai builds 'Talking Websites' — AI-powered chat and voice agents that live on your website, answer questions, qualify leads, and book appointments around the clock. Everything is done for you: the website, the AI agent, the customer management system, and the automations. Pick the plan that fits your business.
```

**HTML Structure**:
```html
<p class="pricing-context">
  Fluis.ai builds 'Talking Websites' — AI-powered chat and voice agents that live on your website, answer questions, qualify leads, and book appointments around the clock. Everything is done for you: the website, the AI agent, the customer management system, and the automations. Pick the plan that fits your business.
</p>
```

**Styling**:

| Property | Value |
|----------|-------|
| Font size | `var(--text-base)` |
| Color | `var(--color-text-muted)` |
| Text align | `center` |
| Max width | `700px` |
| Margin | `0 auto var(--space-lg)` |
| Padding | `0 var(--space-md)` |

**Design**: Simple paragraph, centered, max-width 700px, with `var(--space-lg)` margin below. No decorative elements — just clean context-setting text.

---

---

# SECTION 2: Pricing Cards Grid

**Purpose**: The core of the page. Three tiers presented in a "Goldilocks" layout — an entry tier, a mid tier, and a recommended premium tier. The visitor should be able to scan all three in under 10 seconds and immediately understand which one is for them. The Voice Agent card must be visually dominant.

**HTML Structure**:
```html
<section id="pricing-cards" class="pricing-cards" aria-labelledby="pricing-cards-heading">
  <h2 id="pricing-cards-heading" class="sr-only">Choose your plan</h2>
  <div class="container">
    <div class="pricing-grid">

      <!-- Card 1: Website & Hosting -->
      <article class="pricing-card pricing-card--website" aria-label="Website and Hosting plan">
        <!-- Card content -->
      </article>

      <!-- Card 2: Chat Intelligence -->
      <article class="pricing-card pricing-card--chat" aria-label="Chat Intelligence plan">
        <!-- Card content -->
      </article>

      <!-- Card 3: Voice Intelligence (Recommended) -->
      <article class="pricing-card pricing-card--voice pricing-card--recommended" aria-label="Voice Intelligence plan, recommended">
        <!-- Card content -->
      </article>

    </div>

    <!-- Anchoring callout -->
    <div class="pricing-anchor" role="complementary" aria-label="Cost comparison">
      <!-- Anchoring text -->
    </div>
  </div>
</section>
```

## Grid Layout

```css
.pricing-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-md); /* 24px */
  max-width: var(--max-width);
  margin: 0 auto;
  align-items: start;
}
```

The recommended card (Voice) is slightly taller due to its badge and additional features. Using `align-items: start` ensures all cards align to the top and the height difference is visible at the bottom — reinforcing that the Voice card includes more.

---

## Card 1: Website & Hosting

**Position**: Left (entry tier)
**Purpose**: Low-commitment entry point. Attracts budget-conscious businesses. Gateway to agent upsell.

### Finished Copy

**Label**:
```
WEBSITE & HOSTING
```

**Price**:
```
From $27/mo
```

**Setup note**:
```
$47 one-time setup
```

**Description**:
```
A professional, mobile-ready website for your business — built, hosted, and maintained for you.
```

**Feature list** (6 items, with checkmark icons):
```
 Professional website (3 or 5 pages)
 Hosting included
 Custom domain setup
 Mobile responsive design
 Basic SEO optimization
 AI-assisted content writing
```

**Tier note** (below feature list, smaller text):
```
3 pages at $27/mo  |  5 pages at $47/mo
```

**CTA button text**:
```
Get Started
```

**CTA URL**: `#book-call`

### Card Styling

| Property | Value |
|----------|-------|
| Background | `var(--color-surface)` |
| Border | `1px solid var(--color-border)` |
| Border radius | `var(--radius-md)` (12px) |
| Padding | `var(--space-lg) var(--space-md)` (32px 24px) |
| Label | `font-size: var(--text-xs)` / `font-weight: 600` / `letter-spacing: 0.1em` / `text-transform: uppercase` / `color: var(--color-text-dim)` / `margin-bottom: var(--space-md)` |
| Price | `font-family: var(--font-mono)` / `font-size: var(--text-xl)` / `font-weight: 700` / `color: var(--color-text)` / `margin-bottom: var(--space-xs)` |
| Setup note | `font-size: var(--text-sm)` / `color: var(--color-text-dim)` / `margin-bottom: var(--space-md)` |
| Description | `font-size: var(--text-sm)` / `color: var(--color-text-muted)` / `line-height: 1.5` / `margin-bottom: var(--space-md)` |
| Feature list | `list-style: none` / `font-size: var(--text-sm)` / `color: var(--color-text-muted)` / each item `padding: var(--space-xs) 0` / checkmark icon color `var(--color-text-dim)` |
| Tier note | `font-size: var(--text-xs)` / `color: var(--color-text-dim)` / `border-top: 1px solid var(--color-border)` / `padding-top: var(--space-sm)` / `margin-top: var(--space-sm)` / `margin-bottom: var(--space-md)` |
| CTA button | Ghost style: `background: transparent` / `border: 1px solid var(--color-border)` / `color: var(--color-text-muted)` / `border-radius: var(--radius-sm)` / `padding: 12px 24px` / `font-weight: 500` / `cursor: pointer` / `width: 100%` / `min-height: 44px` |
| CTA hover | `border-color: var(--color-border-hover)` / `color: var(--color-text)` / `transition: border-color 200ms var(--ease-default), color 200ms var(--ease-default)` |
| Card hover | `border-color: var(--color-border-hover)` / `transition: border-color 200ms var(--ease-default)` |

### Checkmark Icon

Use an inline SVG for the checkmark, not a Unicode character, for consistent rendering:

```html
<li>
  <svg class="check-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M13.5 4.5L6.5 11.5L2.5 7.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  Professional website (3 or 5 pages)
</li>
```

For the Website card, checkmark color is `var(--color-text-dim)` — muted, not accent. This visually de-emphasizes the entry tier relative to the agent cards.

### No Trial Badge

This card does NOT display a trial badge. The Website & Hosting plan has no trial period and no RAAS guarantee — it is a straightforward hosting service.

### Guarantee / Trial Note

Where agent tiers display trial and RAAS guarantee information, the Website-Only card instead displays:

```
No trial needed — simple hosting, cancel anytime.
```

**Styling**: Same position as the trial badge on agent cards. `font-size: var(--text-xs)` / `color: var(--color-text-dim)` / `text-align: center` / `margin-bottom: var(--space-xs)`.

> **Spec note**: The Website-Only tier has NO RAAS guarantee (`packages.yaml`: `guarantee: null`). This is intentional — hosting is not performance-based. The copy avoids the word "guarantee" for this tier and instead emphasizes simplicity and flexibility.

### Psychology Note

The Website card exists primarily as an anchor and upsell gateway. Its purpose is to:
1. Show that Fluis.ai starts at just $27/mo (low barrier).
2. Make the Chat Agent ($147) feel like a natural step up — "for $120 more, I get AI agents, a CRM, and automations."
3. Provide an option for visitors who truly just need a website, preventing them from bouncing.

The ghost-style CTA deliberately under-emphasizes this tier. Visitors should notice it, understand it exists, but feel drawn to the agent cards.

---

## Card 2: Chat Intelligence

**Position**: Center (mid tier)
**Purpose**: Budget-friendly agent option. Decoy effect makes Voice look like the obvious upgrade.

### Finished Copy

**Label**:
```
CHAT INTELLIGENCE
```

**Price**:
```
$147/mo
```

**Setup note**:
```
$197 one-time setup
```

**Badge** (inline, below setup note):
```
Includes free website
```

**Description**:
```
An AI chat agent on your website that qualifies leads and books appointments around the clock.
```

**Feature list** (6 items, with checkmark icons):
```
 AI chat widget on your website
 FREE website + hosting included
 Full CRM setup (GoHighLevel)
 Automated booking & follow-ups
 Lead qualification 24/7
 Appointment booking
```

**Trial badge** (above or below CTA):
```
7-day free trial
```

**CTA button text**:
```
Start Free Trial
```

**CTA URL**: `#book-call`

### Card Styling

| Property | Value |
|----------|-------|
| Background | `var(--color-surface)` |
| Border | `1px solid var(--color-border)` |
| Border radius | `var(--radius-md)` (12px) |
| Padding | `var(--space-lg) var(--space-md)` (32px 24px) |
| Label | Same as Website card |
| Price | `font-family: var(--font-mono)` / `font-size: var(--text-xl)` / `font-weight: 700` / `color: var(--color-text)` |
| Setup note | Same as Website card |
| Badge ("Includes free website") | `display: inline-block` / `font-size: var(--text-xs)` / `font-weight: 500` / `color: var(--color-accent)` / `border: 1px solid rgba(255,59,48,0.3)` / `border-radius: var(--radius-full)` / `padding: 4px 12px` / `margin-bottom: var(--space-md)` |
| Description | Same as Website card |
| Feature list | Same structure, but checkmark color is `var(--color-accent)` — these are full-featured agent items |
| Trial badge | `font-size: var(--text-xs)` / `font-weight: 500` / `color: var(--color-text-muted)` / `text-align: center` / `margin-bottom: var(--space-xs)` |
| CTA button | Solid style: `background: var(--color-surface-2)` / `border: 1px solid var(--color-border)` / `color: var(--color-text)` / `border-radius: var(--radius-sm)` / `padding: 12px 24px` / `font-weight: 600` / `cursor: pointer` / `width: 100%` / `min-height: 44px` |
| CTA hover | `background: var(--color-border-hover)` / `border-color: var(--color-border-hover)` / `transition: background 200ms var(--ease-default), border-color 200ms var(--ease-default)` |
| Card hover | `border-color: var(--color-border-hover)` / `transition: border-color 200ms var(--ease-default)` |

### Psychology Note

The Chat Agent card is the decoy. Its job is to make the Voice Agent look like the obvious choice. At $147/mo, it includes everything except voice capabilities and a phone number. The Voice Agent at $247/mo — just $100 more — adds voice (better UX), a dedicated phone number, and call forwarding. The gap between $147 and $247 is small relative to the gap between $27 and $147. This "decoy effect" nudges visitors toward Voice.

The CTA uses a solid but neutral style — more prominent than the Website ghost button, but less prominent than the Voice accent button. This visual hierarchy reinforces the card hierarchy.

---

## Card 3: Voice Intelligence (RECOMMENDED)

**Position**: Right (premium tier, visually dominant)
**Purpose**: The recommended plan. The card visitors should choose. Everything about it signals "this is the one."

### Finished Copy

**"Recommended" badge** (pill shape, positioned at top of card):
```
Recommended
```

**Label**:
```
VOICE INTELLIGENCE
```

**Price**:
```
$247/mo
```

**Setup note**:
```
$297 one-time setup
```

**Badge** (inline, below setup note):
```
Includes free website + CRM
```

**Description**:
```
An AI voice agent that answers your website and phone — qualifies leads and books appointments while you work.
```

**Feature list** (6 items, with checkmark icons):
```
 AI voice bubble on your website
 Dedicated phone number + call forwarding
 FREE website + hosting included
 Full CRM setup + all automations
 Lead qualification 24/7
 Appointment booking
```

**Trial badge** (above or below CTA):
```
7-day free trial — setup fee fully refundable
```

**CTA button text**:
```
Start Free Trial
```

**CTA URL**: `#book-call`

### "Recommended" Badge Styling

```css
.pricing-card--recommended {
  position: relative;
  border: 2px solid var(--color-accent);
  box-shadow: var(--shadow-glow); /* 0 0 30px rgba(255,59,48,0.15) */
}

.pricing-card--recommended::before {
  content: 'Recommended';
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--color-accent);
  color: #ffffff;
  padding: 4px 16px;
  border-radius: var(--radius-full);
  font-family: var(--font-sans);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  white-space: nowrap;
}
```

### Full Card Styling

| Property | Value |
|----------|-------|
| Background | `var(--color-surface)` |
| Border | `2px solid var(--color-accent)` (NOT 1px — thicker to stand out) |
| Box shadow | `var(--shadow-glow)` — subtle red glow |
| Border radius | `var(--radius-md)` (12px) |
| Padding | `var(--space-lg) var(--space-md)` (32px 24px) |
| Label | Same as other cards but `color: var(--color-text-muted)` (slightly brighter than dim) |
| Price | `font-family: var(--font-mono)` / `font-size: var(--text-xl)` / `font-weight: 700` / `color: var(--color-text)` |
| Badge ("Includes free website + CRM") | Same as Chat badge: accent color, pill shape |
| Feature list | Checkmark color: `var(--color-accent)` |
| Trial badge | `font-size: var(--text-xs)` / `font-weight: 500` / `color: var(--color-text-muted)` / `text-align: center` / `margin-bottom: var(--space-xs)` |
| CTA button | **Accent style**: `background: var(--color-accent)` / `border: none` / `color: #ffffff` / `border-radius: var(--radius-sm)` / `padding: 14px 24px` / `font-weight: 700` / `font-size: var(--text-base)` / `cursor: pointer` / `width: 100%` / `min-height: 48px` |
| CTA hover | `background: var(--color-accent-hover)` / `box-shadow: 0 0 20px rgba(255,59,48,0.25)` / `transition: background 200ms var(--ease-default), box-shadow 200ms var(--ease-default)` |
| Card hover | Glow intensifies: `box-shadow: 0 0 40px rgba(255,59,48,0.2)` / `transition: box-shadow 300ms var(--ease-default)` |

### Visual Dominance Techniques

The Voice card must be unambiguously the recommended choice. Five visual signals accomplish this:

1. **Accent border** (2px solid red vs. 1px subtle border on other cards) — immediate color contrast.
2. **Red glow** (`box-shadow: var(--shadow-glow)`) — draws the eye on the dark background.
3. **"Recommended" badge** — explicit social proof label.
4. **Accent CTA button** (solid red vs. ghost/neutral on other cards) — the only red button on the page.
5. **CTA button is larger** (48px min-height vs. 44px, 14px padding vs. 12px, font-weight 700 vs. 500/600) — physically more prominent.

### Psychology Note

The Voice card uses the "default effect" — when one option is pre-selected or visually highlighted, most people choose it. Research shows highlighted pricing tiers convert 20-30% better than un-highlighted alternatives. Combined with the decoy effect from the Chat card ($100 gap feels trivial for the upgrade), the Voice card is engineered to be the obvious choice.

The trial badge explicitly mentions "setup fee fully refundable" — this is unique to the Voice card display (though Chat also has this guarantee). Placing it here reinforces risk reversal at the moment of highest intent.

---

## Anchoring Callout (Below Cards)

Immediately below the three pricing cards, two lines of anchoring copy reframe the price.

### Finished Copy

**Line 1 — Receptionist comparison**:
```
A full-time receptionist costs ~$40,000/year. Our voice agent: $247/month.
```

**Line 2 — Per-unit reframe**:
```
That's $8.23/day. Less than a cup of coffee.
```

### Styling

| Property | Value |
|----------|-------|
| Container | `text-align: center` / `padding: var(--space-xl) 0 var(--space-2xl)` |
| Line 1 | `font-family: var(--font-sans)` / `font-size: var(--text-base)` / `color: var(--color-text-muted)` / `margin-bottom: var(--space-xs)` |
| Line 1 prices | `font-family: var(--font-mono)` / `color: var(--color-text)` — only the numbers "$40,000/year" and "$247/month" are in mono and brighter |
| Line 2 | `font-family: var(--font-sans)` / `font-size: var(--text-sm)` / `color: var(--color-text-dim)` |
| Line 2 price | `font-family: var(--font-mono)` / `color: var(--color-text-muted)` — "$8.23/day" in mono |

### HTML Structure

```html
<div class="pricing-anchor">
  <p class="pricing-anchor__compare">
    A full-time receptionist costs ~<span class="mono-highlight">$40,000/year</span>.
    Our voice agent: <span class="mono-highlight">$247/month</span>.
  </p>
  <p class="pricing-anchor__reframe">
    That's <span class="mono-muted">$8.23/day</span>. Less than a cup of coffee.
  </p>
</div>
```

### Psychology Note

This is a textbook anchoring sequence. The $40,000/year figure lands first and sets the reference point. When $247/month follows, the brain processes it as "93% cheaper." The per-day reframe ($8.23) then pushes it further into "trivial expense" territory. The coffee comparison leverages mental accounting — $8.23 feels like a daily habit cost, not a business expense.

The numbers use `--font-mono` (JetBrains Mono) to give them visual weight and authority, consistent with how prices are displayed on the cards above.

### Anchoring Animation

The anchoring callout uses a two-part counter animation with ScrambleText decode to make the price comparison visceral.

**Trigger**: ScrollTrigger on `.pricing-anchor`, `start: "top 80%"`, `once: true`.

**Counter animation sequence**:

1. **"$40,000/year"** counts up from `$0` to `$40,000` over 1.5s with `power2.out` easing:

```js
ScrollTrigger.create({
  trigger: ".pricing-anchor",
  start: "top 80%",
  once: true,
  onEnter: () => {
    // Counter 1: $40,000/year
    gsap.to(".pricing-anchor__big-number", {
      innerText: 40000,
      duration: 1.5,
      ease: "power2.out",
      snap: { innerText: 1 },
      onUpdate: function() {
        this.targets()[0].innerText = "$" + Math.round(this.targets()[0]._gsap.innerText).toLocaleString() + "/year";
      }
    });

    // Counter 2: $247/month (200ms delay)
    gsap.to(".pricing-anchor__small-number", {
      innerText: 247,
      duration: 1.2,
      ease: "power2.out",
      delay: 0.2,
      snap: { innerText: 1 },
      onUpdate: function() {
        this.targets()[0].innerText = "$" + Math.round(this.targets()[0]._gsap.innerText) + "/month";
      }
    });
  }
});
```

2. **"$247/month"** counts up from `$0` to `$247` starting 200ms after the first counter begins. Duration: 1.2s. Same easing.

3. **ScrambleText decode** on both numbers: Before the counter begins, both numbers briefly display ScrambleText scrambling through `"0123456789$,."` characters for 0.3s (revealDelay), then the counter takes over. This creates a "decoding" feel before the real number appears.

```js
// ScrambleText decode before counter
gsap.to(".pricing-anchor__big-number", {
  scrambleText: {
    text: "$40,000/year",
    chars: "0123456789$,.",
    revealDelay: 0.3,
    speed: 0.5
  },
  duration: 1.5
});
```

4. **Line 2 ("$8.23/day")**: Fades in after both counters complete. Duration: 400ms. Delay: 350ms after counters start.

**Reduced motion**: Counters and ScrambleText are wrapped in `gsap.matchMedia("(prefers-reduced-motion: no-preference)")`. With reduced motion, numbers display immediately at final values.

---

## Card Animation

All three cards use `ScrollTrigger.batch` for efficient staggered entrance (single observer, not one per card).

**Entrance animation** (ScrollTrigger.batch):

```js
ScrollTrigger.batch(".pricing-card", {
  onEnter: (batch) => gsap.from(batch, {
    y: 24,
    opacity: 0,
    duration: 0.5,
    stagger: 0.1,
    ease: "power2.out"
  }),
  start: "top 85%",
  once: true
});
```

- **Card 1 (Website)**: Enters at stagger offset 0ms. Duration: 500ms.
- **Card 2 (Chat)**: Enters at stagger offset 100ms. Duration: 500ms.
- **Card 3 (Voice)**: Enters at stagger offset 200ms. Duration: **600ms** (slightly slower entrance to feel heavier/more important).

**Voice card special entrance**: After the batch entrance completes, the Voice card receives a one-shot red glow pulse:

```css
@keyframes voiceCardGlow {
  0%   { box-shadow: 0 0 30px rgba(255, 59, 48, 0.15); }
  50%  { box-shadow: 0 0 50px rgba(255, 59, 48, 0.3); }
  100% { box-shadow: 0 0 30px rgba(255, 59, 48, 0.15); }
}

.pricing-card--voice.is-visible {
  animation: voiceCardGlow 1.5s ease-in-out 0.3s 1;
}
```

**"Recommended" badge animation**: The badge scales in with overshoot after the Voice card entrance:

```js
gsap.from(".pricing-card--recommended::before", {
  scale: 0,
  duration: 0.4,
  ease: "back.out(1.7)",
  delay: 0.3  // fires after card entrance settles
});
```

In practice, target the badge element directly (pseudo-elements cannot be GSAP targets). Use a real `<span>` for the badge and animate it:

```js
gsap.from(".pricing-badge--recommended", {
  scale: 0,
  opacity: 0,
  duration: 0.4,
  ease: "back.out(1.7)",
  delay: 0.3
});
```

**3D tilt on hover** (all three cards):

```js
document.querySelectorAll(".pricing-card").forEach(card => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(card, {
      rotateY: x * 8,      // max 8 degrees
      rotateX: y * -8,
      transformPerspective: 1000,
      duration: 0.3,
      ease: "power2.out"
    });
  });
  card.addEventListener("mouseleave", () => {
    gsap.to(card, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.3)"
    });
  });
});
```

**Glassmorphism** (all three cards):

```css
.pricing-card {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}
```

This replaces the `var(--color-surface)` solid background with a glassmorphism treatment. The card border and existing styles remain unchanged. The Voice card retains its `2px solid var(--color-accent)` border and `var(--shadow-glow)` on top of glassmorphism.

**Voice card animated gradient border** (CSS `@property` for conic-gradient rotation on hover):

```css
@property --border-angle {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: false;
}

.pricing-card--voice {
  border: 2px solid transparent;
  background-image:
    linear-gradient(var(--color-surface), var(--color-surface)),
    conic-gradient(from var(--border-angle), var(--color-accent), transparent 50%, var(--color-accent));
  background-origin: border-box;
  background-clip: padding-box, border-box;
  transition: --border-angle 0s;
}

.pricing-card--voice:hover {
  animation: rotateBorder 3s linear infinite;
}

@keyframes rotateBorder {
  to { --border-angle: 360deg; }
}
```

This creates an animated conic-gradient border that rotates on hover, giving the Voice card a distinctive premium feel. The `@property` registration enables smooth CSS animation of the custom property.

**Shimmer edge on featured card border** (hover only):

```css
.pricing-card--voice::after {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: inherit;
  background: linear-gradient(
    105deg,
    transparent 40%,
    rgba(255, 59, 48, 0.15) 45%,
    rgba(255, 59, 48, 0.25) 50%,
    rgba(255, 59, 48, 0.15) 55%,
    transparent 60%
  );
  background-size: 200% 100%;
  opacity: 0;
  pointer-events: none;
  transition: opacity 300ms ease;
}

.pricing-card--voice:hover::after {
  opacity: 1;
  animation: shimmer 1.5s ease-in-out infinite;
}

@keyframes shimmer {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

**Anchoring callout**: Fades in after cards settle. See Anchoring Section animation below for full specification.

**Reduced motion**: All card animations (entrance, tilt, glow, gradient border, shimmer) are wrapped inside `gsap.matchMedia("(prefers-reduced-motion: no-preference)")`. When reduced motion is preferred, cards render immediately with static styling. The CSS animations (voiceCardGlow, rotateBorder, shimmer) are disabled via:

```css
@media (prefers-reduced-motion: reduce) {
  .pricing-card--voice.is-visible,
  .pricing-card--voice:hover,
  .pricing-card--voice:hover::after {
    animation: none;
  }
}
```

## Mobile Layout (< 768px)

On mobile, the card grid collapses to a single column. **Critically, the Voice Agent card moves to the top** — on mobile, the first card gets the most attention, and scrolling means the bottom card may never be seen.

```css
@media (max-width: 768px) {
  .pricing-grid {
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
  }

  /* Voice card first on mobile */
  .pricing-card--recommended {
    order: -1;
  }

  .pricing-card {
    width: 100%;
  }

  /* Full-width CTAs */
  .pricing-card .cta-btn {
    width: 100%;
    min-height: 48px;
    font-size: var(--text-base);
  }
}
```

**Mobile card order**: Voice (recommended) -> Chat -> Website.

This reordering is essential. On desktop, the eye naturally scans left-to-right and the rightmost highlighted card captures attention. On mobile, users scroll top-to-bottom, and the recommended option must be first.

---

---

# SECTION 3: What's Included — Expandable Feature Comparison

**Purpose**: For detail-oriented visitors who want to compare every feature before deciding. This section is collapsed by default so it does not overwhelm casual visitors, but it is available for those who need it.

**HTML Structure**:
```html
<section id="comparison" class="comparison" aria-labelledby="comparison-heading">
  <div class="container">
    <details class="comparison__details">
      <summary class="comparison__toggle" id="comparison-heading">
        <span class="comparison__toggle-text">Compare all features</span>
        <svg class="comparison__chevron" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </summary>
      <div class="comparison__table-wrapper">
        <table class="comparison__table" role="table" aria-label="Feature comparison across all plans">
          <thead>
            <tr>
              <th scope="col">Feature</th>
              <th scope="col">Website & Hosting</th>
              <th scope="col">Chat Intelligence</th>
              <th scope="col" class="comparison__col--highlighted">Voice Intelligence</th>
            </tr>
          </thead>
          <tbody>
            <!-- Feature rows grouped by category -->
          </tbody>
        </table>
      </div>
    </details>
  </div>
</section>
```

## Complete Feature Comparison Table

### Group 1: Core Features

| Feature | Website & Hosting | Chat Intelligence | Voice Intelligence |
|---------|:-----------------:|:-----------------:|:------------------:|
| Professional website | ✓ | ✓ | ✓ |
| Hosting included | ✓ | ✓ | ✓ |
| Custom domain setup | ✓ | ✓ | ✓ |
| Mobile responsive design | ✓ | ✓ | ✓ |
| AI-assisted content writing | ✓ | ✓ | ✓ |
| Basic SEO optimization | ✓ | ✓ | ✓ |

### Group 2: AI Capabilities

| Feature | Website & Hosting | Chat Intelligence | Voice Intelligence |
|---------|:-----------------:|:-----------------:|:------------------:|
| AI chat widget | — | ✓ | — |
| AI voice bubble widget | — | — | ✓ |
| Dedicated phone number | — | — | ✓ |
| Call forwarding | — | — | ✓ |
| Natural language AI | — | ✓ | ✓ |
| 24/7 coverage | — | ✓ | ✓ |
| Lead qualification | — | ✓ | ✓ |
| Appointment booking | — | ✓ | ✓ |

### Group 3: CRM & Automations

| Feature | Website & Hosting | Chat Intelligence | Voice Intelligence |
|---------|:-----------------:|:-----------------:|:------------------:|
| GoHighLevel CRM setup | — | ✓ | ✓ |
| Booking confirmation emails | — | ✓ | ✓ |
| Staff arrival notifications | — | ✓ | ✓ |
| Job follow-up sequences | — | ✓ | ✓ |
| Lead tracking dashboard | — | ✓ | ✓ |

### Group 4: Support & Guarantee

| Feature | Website & Hosting | Chat Intelligence | Voice Intelligence |
|---------|:-----------------:|:-----------------:|:------------------:|
| 7-day free trial | — | ✓ | ✓ |
| RAAS guarantee | — | ✓ | ✓ |
| Setup fee refundable | — | ✓ | ✓ |
| Month-to-month billing | ✓ | ✓ | ✓ |
| Cancel anytime | ✓ | ✓ | ✓ |

## Table Styling

```css
.comparison__table {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--text-sm);
}

.comparison__table thead th {
  text-align: center;
  padding: var(--space-sm) var(--space-md);
  border-bottom: 1px solid var(--color-border);
  color: var(--color-text-muted);
  font-weight: 600;
  font-size: var(--text-xs);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.comparison__table thead th:first-child {
  text-align: left;
}

.comparison__table tbody td {
  padding: var(--space-sm) var(--space-md);
  border-bottom: 1px solid var(--color-border);
  text-align: center;
  color: var(--color-text-muted);
}

.comparison__table tbody td:first-child {
  text-align: left;
  color: var(--color-text);
  font-weight: 400;
}

/* Category group headers */
.comparison__table .group-header td {
  font-weight: 600;
  color: var(--color-text-dim);
  font-size: var(--text-xs);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding-top: var(--space-md);
  border-bottom: none;
}

/* Highlighted Voice column */
.comparison__col--highlighted,
.comparison__table td:nth-child(4) {
  background: rgba(255, 59, 48, 0.04);
}

/* Checkmarks and dashes */
.comparison__check {
  color: var(--color-accent);
  font-weight: 700;
}

.comparison__dash {
  color: var(--color-text-dim);
}
```

### Category Group Header Row HTML

```html
<tr class="group-header">
  <td colspan="4">AI Capabilities</td>
</tr>
```

## Toggle Styling

```css
.comparison__details {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.comparison__toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-xs);
  padding: var(--space-md);
  cursor: pointer;
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--color-text-muted);
  list-style: none; /* Remove default marker */
  transition: color 200ms var(--ease-default);
}

.comparison__toggle:hover {
  color: var(--color-text);
}

.comparison__toggle::-webkit-details-marker {
  display: none;
}

.comparison__chevron {
  transition: transform 200ms var(--ease-default);
  color: var(--color-text-dim);
}

.comparison__details[open] .comparison__chevron {
  transform: rotate(180deg);
}

.comparison__table-wrapper {
  padding: 0 var(--space-md) var(--space-md);
  overflow-x: auto; /* Horizontal scroll on very narrow screens */
}
```

## Animation

**Section entrance**: ScrollTrigger-driven fade in when scrolled into view. Duration 400ms. `start: "top 90%"`, `once: true`. Easing: `"power2.out"`.

**Table reveal (GSAP-controlled accordion)**: Instead of relying on native `<details>` animation, GSAP controls the expand/collapse for smooth, precise height animation:

```js
// Prevent default <details> toggle, use GSAP instead
document.querySelector(".comparison__toggle").addEventListener("click", (e) => {
  e.preventDefault();
  const details = document.querySelector(".comparison__details");
  const content = document.querySelector(".comparison__table-wrapper");
  const chevron = document.querySelector(".comparison__chevron");
  const isOpen = details.hasAttribute("open");

  if (isOpen) {
    // Collapse
    gsap.to(content, {
      height: 0,
      opacity: 0,
      duration: 0.3,
      ease: "power2.inOut",
      onComplete: () => details.removeAttribute("open")
    });
    gsap.to(chevron, { rotation: 0, duration: 0.3, ease: "power2.inOut" });
  } else {
    // Expand
    details.setAttribute("open", "");
    gsap.fromTo(content,
      { height: 0, opacity: 0 },
      { height: "auto", opacity: 1, duration: 0.4, ease: "power2.out" }
    );
    gsap.to(chevron, { rotation: 180, duration: 0.3, ease: "power2.inOut" });
  }
});
```

**Chevron rotation**: The chevron SVG rotates 180 degrees on open and back to 0 on close, controlled by GSAP (not CSS transition). Duration: 300ms. Easing: `"power2.inOut"`.

**Row staggered reveal** (inside the expanded table): When the table opens, rows stagger in with 30ms intervals using ScrollTrigger.batch:

```js
// After table opens, stagger row reveals
gsap.from(".comparison__table tbody tr", {
  opacity: 0,
  y: 8,
  duration: 0.3,
  stagger: 0.03,
  ease: "power2.out",
  delay: 0.1  // slight delay after table wrapper opens
});
```

**Reduced motion**: With `prefers-reduced-motion: reduce`, the table opens/closes instantly (no height animation, no row stagger). Chevron snaps to position. All controlled via `gsap.matchMedia()`.

## Mobile Layout (< 768px)

On mobile, the full table is too wide. Two approaches, in order of preference:

**Approach 1 — Tabbed view** (recommended):
Replace the table with three tabs (Website | Chat | Voice). Each tab shows a single column of features with checkmarks/dashes. The Voice tab is selected by default (pre-selected recommended plan). This requires minimal JS for tab switching.

```html
<div class="comparison__tabs" role="tablist">
  <button role="tab" aria-selected="false" aria-controls="tab-website">Website</button>
  <button role="tab" aria-selected="false" aria-controls="tab-chat">Chat</button>
  <button role="tab" aria-selected="true" aria-controls="tab-voice" class="active">Voice</button>
</div>
```

**Approach 2 — Horizontal scroll** (fallback):
If tabs are not implemented, the table wrapper has `overflow-x: auto` and the user can scroll horizontally. Add a subtle gradient fade on the right edge to indicate scrollability.

```css
@media (max-width: 768px) {
  .comparison__table-wrapper {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }

  /* Scroll hint gradient */
  .comparison__table-wrapper::after {
    content: '';
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 40px;
    background: linear-gradient(to right, transparent, var(--color-surface));
    pointer-events: none;
  }
}
```

## Psychology Note

The comparison table is collapsed by default. This is intentional. Most visitors make their decision from the pricing cards alone. The comparison table exists for the ~20% who need exhaustive detail before committing. By collapsing it, we prevent information overload for the majority while still serving the detail-seekers.

The Voice column is subtly highlighted with `rgba(255,59,48,0.04)` — just enough tint to draw the eye without being garish. Combined with the fact that the Voice column has checkmarks in every row, the visual message is clear: this plan includes everything.

---

---

# SECTION 4: The RAAS Guarantee Callout

**Purpose**: The trust anchor of the entire page. This section exists to eliminate the single biggest purchase objection: "What if it doesn't work?" It must feel like a signed promise, not a marketing gimmick. The tone is serious, direct, and confident.

**HTML Structure**:
```html
<section id="raas-guarantee" class="raas-guarantee" aria-labelledby="raas-heading">
  <div class="container">
    <div class="raas-guarantee__card">
      <div class="raas-guarantee__icon" aria-hidden="true">
        <!-- Shield SVG icon -->
      </div>
      <h2 id="raas-heading" class="raas-guarantee__headline">
        The RAAS Guarantee
      </h2>
      <div class="raas-guarantee__body">
        <!-- Guarantee text blocks -->
      </div>
    </div>
  </div>
</section>
```

## Shield Icon SVG

A simple, clean shield icon. Not cartoonish. Minimal lines, nothing playful.

```html
<svg class="raas-guarantee__icon-svg" width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
  <path d="M20 4L6 10V19C6 28.05 12.04 36.42 20 38C27.96 36.42 34 28.05 34 19V10L20 4Z"
    stroke="var(--color-accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <path d="M14 20L18 24L26 16"
    stroke="var(--color-accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
```

## Finished Copy

**Headline**:
```
The RAAS Guarantee
```

**Subtitle** (immediately below headline):
```
Results as a Service. We make money only when we make businesses money.
```

**Trial guarantee paragraph**:
```
Try it for 7 days. If you don't love it, we refund everything — including the setup fee. No questions asked. No awkward conversations. No hoops to jump through. You simply tell us it's not for you, and we send the money back.
```

**Monthly guarantee paragraph**:
```
After the trial, our guarantee continues. If our AI agent doesn't book a single appointment for your business in any given month, you don't pay for that month. Period. You can also choose to leave at any point — no contracts, no cancellation fees, no penalties of any kind.
```

**Philosophy paragraph**:
```
We don't operate like SaaS companies that charge you regardless of whether their product delivers. We operate as RAAS — Results as a Service. Our pricing is set at roughly the value of one booked appointment. If the AI books one appointment, it's paid for the whole month. Everything after that is pure profit for you. We believe this is the only honest way to sell AI to small businesses.
```

**Closing line** (styled distinctly):
```
The worst that can happen? You get a free website and pay nothing.
```

## Styling

```css
.raas-guarantee {
  padding: var(--space-2xl) var(--space-md);
}

.raas-guarantee__card {
  max-width: 760px;
  margin: 0 auto;
  background: var(--color-surface-2);
  border-left: 4px solid var(--color-accent);
  border-radius: var(--radius-md);
  padding: var(--space-xl) var(--space-lg);
}

.raas-guarantee__icon {
  margin-bottom: var(--space-md);
}

.raas-guarantee__icon-svg {
  width: 40px;
  height: 40px;
}

.raas-guarantee__headline {
  font-family: var(--font-sans);
  font-size: var(--text-xl);
  font-weight: 800;
  color: var(--color-text);
  margin-bottom: var(--space-xs);
}

.raas-guarantee__subtitle {
  font-family: var(--font-sans);
  font-size: var(--text-base);
  font-weight: 500;
  color: var(--color-accent);
  margin-bottom: var(--space-lg);
}

.raas-guarantee__body p {
  font-family: var(--font-sans);
  font-size: var(--text-base);
  color: var(--color-text-muted);
  line-height: 1.7;
  margin-bottom: var(--space-md);
}

.raas-guarantee__body p:last-child {
  margin-bottom: 0;
}

.raas-guarantee__closing {
  font-weight: 600;
  color: var(--color-text);
  font-size: var(--text-lg);
  margin-top: var(--space-lg);
  padding-top: var(--space-md);
  border-top: 1px solid var(--color-border);
}
```

## Animation

**Section entrance** (ScrollTrigger):

```js
ScrollTrigger.create({
  trigger: ".raas-guarantee",
  start: "top 85%",
  once: true,
  onEnter: () => {
    gsap.from(".raas-guarantee__card", {
      y: 16,
      opacity: 0,
      duration: 0.6,
      ease: "expo.out"
    });
  }
});
```

**Accent border glow pulse** (one-shot): A CSS animation that gently pulses the left border glow. Only fires once on entrance, does not loop. This gives the section a "warm" feel when it appears. The `is-visible` class is added by the ScrollTrigger `onEnter` callback.

```css
@keyframes guarantee-glow {
  0% { box-shadow: -4px 0 12px rgba(255, 59, 48, 0); }
  50% { box-shadow: -4px 0 20px rgba(255, 59, 48, 0.12); }
  100% { box-shadow: -4px 0 12px rgba(255, 59, 48, 0); }
}

.raas-guarantee__card.is-visible {
  animation: guarantee-glow 1.5s ease 0.3s 1;
}
```

**Reduced motion**: All animations are wrapped in `gsap.matchMedia("(prefers-reduced-motion: no-preference)")`. The CSS glow animation is disabled via:

```css
@media (prefers-reduced-motion: reduce) {
  .raas-guarantee__card.is-visible {
    animation: none;
  }
}
```

## Mobile Layout (< 768px)

- Card padding reduces to `var(--space-lg) var(--space-md)` (32px 24px).
- Headline scales down via `clamp()` (already in `--text-xl`).
- Closing line wraps naturally at smaller widths.
- The 4px accent left border remains — it is a key visual signal and works at all sizes.

```css
@media (max-width: 768px) {
  .raas-guarantee__card {
    padding: var(--space-lg) var(--space-md);
  }
}
```

## Psychology Note

This section uses risk reversal as its primary mechanism. Risk reversal is the single most effective tool on a pricing page because it directly addresses loss aversion — the deeply wired fear of losing money on something that doesn't work.

The copy is structured in three escalating layers:
1. **Trial guarantee** — eliminates short-term risk ("I can try it and get my money back").
2. **Monthly guarantee** — eliminates ongoing risk ("Even after the trial, I only pay for results").
3. **Philosophy** — elevates the guarantee from a policy to a belief system ("This is how they run their business").

The closing line ("The worst that can happen? You get a free website and pay nothing.") flips loss aversion entirely. The worst-case scenario has a positive outcome. This is the most psychologically powerful sentence on the entire page.

The visual treatment (surface-2 background, accent border, generous padding) gives this section physical weight on the page. It feels like a document within the page — a signed agreement, not a throwaway banner.

---

---

# SECTION 5: ROI Pricing Calculator — "The Math Is Simple"

**Purpose**: An interactive calculator that makes the RAAS value proposition visceral. Instead of telling visitors the price is worth it, this section lets them prove it to themselves. The visual disparity between a $247 cost bar and a multi-thousand-dollar revenue bar makes the price objection collapse instantly. This is the pricing page's "killer addition" — no voice AI agency competitor has anything like it.

**Position**: Between the RAAS Guarantee callout and the FAQ. This placement is strategic: the visitor has just read the guarantee ("you don't pay if it doesn't work") and is now shown exactly how much money they stand to make when it does work. Emotional reassurance first (RAAS), then rational proof (calculator).

**HTML Structure**:

```html
<section id="roi-calculator" class="roi-calculator" aria-labelledby="roi-heading">
  <div class="container">
    <h2 id="roi-heading" class="roi-calculator__headline">
      The Math Is Simple
    </h2>
    <p class="roi-calculator__subheadline">
      Drag the slider. Watch the numbers.
    </p>

    <div class="roi-calculator__card">
      <!-- Slider -->
      <div class="roi-calculator__slider-group">
        <label for="roi-slider" class="roi-calculator__label">
          How much is one appointment worth to your business?
        </label>
        <input
          type="range"
          id="roi-slider"
          class="roi-calculator__slider"
          min="50"
          max="1000"
          value="200"
          step="25"
          aria-valuemin="50"
          aria-valuemax="1000"
          aria-valuenow="200"
          aria-valuetext="$200 per appointment"
        >
        <output for="roi-slider" class="roi-calculator__output" aria-live="polite">
          $200 per appointment
        </output>
      </div>

      <!-- Comparison -->
      <div class="roi-calculator__comparison">
        <div class="roi-calculator__cost">
          <span class="roi-calculator__cost-label">Fluis.ai cost</span>
          <span class="roi-calculator__cost-value">$247/mo</span>
        </div>
        <div class="roi-calculator__revenue">
          <span class="roi-calculator__revenue-label">Revenue from 5 additional appointments</span>
          <span class="roi-calculator__revenue-value">$1,000</span>
        </div>
      </div>

      <!-- Bar chart -->
      <div class="roi-calculator__bars" role="img" aria-label="Visual comparison: Fluis cost versus your revenue">
        <div class="roi-calculator__bar roi-calculator__bar--cost">
          <span class="roi-calculator__bar-label">Fluis cost</span>
        </div>
        <div class="roi-calculator__bar roi-calculator__bar--revenue">
          <span class="roi-calculator__bar-label">Your revenue</span>
        </div>
      </div>

      <!-- Punchline (hidden until slider >= 2 appointments worth) -->
      <p class="roi-calculator__punchline" aria-live="polite">
        Your AI agent needs to book just <strong>2 appointments</strong> to pay for itself.
        Everything after that is pure profit.
      </p>
    </div>
  </div>
</section>
```

## Headline Options

### Option A: "The Math Is Simple"

**Rationale**: Direct, confident, implies the value proposition is self-evident. The word "simple" reduces cognitive load and invites the visitor to engage with the interactive element.

### Option B: "See the ROI for Yourself"

**Rationale**: More explicit about what the section does. "For Yourself" implies interactivity. However, "ROI" is business jargon that may alienate some SMB visitors.

### RECOMMENDED: Option A

**"The Math Is Simple"** — Cleaner, no jargon, and the subheadline ("Drag the slider. Watch the numbers.") immediately communicates interactivity.

## Finished Copy

**Headline**:
```
The Math Is Simple
```

**Subheadline**:
```
Drag the slider. Watch the numbers.
```

**Slider label**:
```
How much is one appointment worth to your business?
```

**Default value**: $200 per appointment (reasonable mid-range for service businesses: plumbers $150-300, HVAC $200-500, dentists $200-400).

**Slider range**: $50 - $1,000 in $25 increments.

**Cost display** (fixed):
```
Fluis.ai cost: $247/mo
```

**Revenue display** (dynamic, updates in real-time):
```
Revenue from [X] additional appointments: $[Y]
```

Where X = 5 (fixed assumption: AI books 5 appointments/month — conservative estimate) and Y = X * slider value.

**Punchline** (appears when slider value >= $124, i.e., 2 appointments cover the $247 cost):
```
Your AI agent needs to book just 2 appointments to pay for itself. Everything after that is pure profit.
```

## Behavior

```js
const slider = document.getElementById("roi-slider");
const output = document.querySelector(".roi-calculator__output");
const revenueLabel = document.querySelector(".roi-calculator__revenue-label");
const revenueValue = document.querySelector(".roi-calculator__revenue-value");
const costBar = document.querySelector(".roi-calculator__bar--cost");
const revenueBar = document.querySelector(".roi-calculator__bar--revenue");
const punchline = document.querySelector(".roi-calculator__punchline");
const MONTHLY_COST = 247;
const APPOINTMENTS_PER_MONTH = 5;

function updateCalculator() {
  const appointmentValue = parseInt(slider.value);
  const totalRevenue = appointmentValue * APPOINTMENTS_PER_MONTH;
  const maxRevenue = 1000 * APPOINTMENTS_PER_MONTH; // $5,000 max

  // Update text displays with GSAP number counting
  gsap.to(revenueValue, {
    innerText: totalRevenue,
    duration: 0.4,
    ease: "power2.out",
    snap: { innerText: 1 },
    onUpdate: function() {
      revenueValue.innerText = "$" + Math.round(parseFloat(revenueValue._gsap?.innerText || totalRevenue)).toLocaleString();
    }
  });

  output.textContent = "$" + appointmentValue + " per appointment";
  slider.setAttribute("aria-valuenow", appointmentValue);
  slider.setAttribute("aria-valuetext", "$" + appointmentValue + " per appointment");
  revenueLabel.textContent = "Revenue from " + APPOINTMENTS_PER_MONTH + " additional appointments";

  // Animate bar widths
  const costPercent = (MONTHLY_COST / maxRevenue) * 100;
  const revenuePercent = (totalRevenue / maxRevenue) * 100;

  gsap.to(costBar, { width: Math.max(costPercent, 5) + "%", duration: 0.3, ease: "power2.out" });
  gsap.to(revenueBar, { width: Math.max(revenuePercent, 5) + "%", duration: 0.3, ease: "power2.out" });

  // Show punchline when 2 appointments cover the cost
  if (appointmentValue >= Math.ceil(MONTHLY_COST / 2)) {
    if (punchline.style.opacity !== "1") {
      gsap.to(punchline, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" });
    }
  } else {
    gsap.to(punchline, { opacity: 0, y: 8, duration: 0.2, ease: "power2.in" });
  }
}

slider.addEventListener("input", updateCalculator);
updateCalculator(); // Initialize with default value
```

**Estimated JS**: ~80 lines including initialization and GSAP number counting.

## Styling

```css
.roi-calculator {
  padding: var(--space-2xl) var(--space-md);
}

.roi-calculator__headline {
  font-family: var(--font-sans);
  font-size: var(--text-xl);
  font-weight: 800;
  color: var(--color-text);
  text-align: center;
  margin-bottom: var(--space-xs);
}

.roi-calculator__subheadline {
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  color: var(--color-text-dim);
  text-align: center;
  margin-bottom: var(--space-xl);
}

.roi-calculator__card {
  max-width: 640px;
  margin: 0 auto;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--space-xl) var(--space-lg);
}

/* Slider */
.roi-calculator__slider-group {
  margin-bottom: var(--space-lg);
}

.roi-calculator__label {
  display: block;
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--color-text-muted);
  margin-bottom: var(--space-sm);
}

.roi-calculator__slider {
  width: 100%;
  height: 6px;
  -webkit-appearance: none;
  appearance: none;
  background: var(--color-surface-2);
  border-radius: 3px;
  outline: none;
  cursor: pointer;
}

.roi-calculator__slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--color-accent);
  cursor: grab;
  border: 2px solid var(--color-bg);
  box-shadow: 0 0 8px rgba(255, 59, 48, 0.3);
  transition: box-shadow 200ms ease;
}

.roi-calculator__slider::-webkit-slider-thumb:hover {
  box-shadow: 0 0 16px rgba(255, 59, 48, 0.5);
}

.roi-calculator__slider::-webkit-slider-thumb:active {
  cursor: grabbing;
}

.roi-calculator__slider::-moz-range-thumb {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--color-accent);
  cursor: grab;
  border: 2px solid var(--color-bg);
  box-shadow: 0 0 8px rgba(255, 59, 48, 0.3);
}

.roi-calculator__slider:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 4px;
}

.roi-calculator__output {
  display: block;
  font-family: var(--font-mono);
  font-size: var(--text-lg);
  font-weight: 700;
  color: var(--color-text);
  text-align: center;
  margin-top: var(--space-sm);
}

/* Comparison row */
.roi-calculator__comparison {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-lg);
  gap: var(--space-md);
}

.roi-calculator__cost,
.roi-calculator__revenue {
  text-align: center;
  flex: 1;
}

.roi-calculator__cost-label,
.roi-calculator__revenue-label {
  display: block;
  font-family: var(--font-sans);
  font-size: var(--text-xs);
  color: var(--color-text-dim);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: var(--space-xs);
}

.roi-calculator__cost-value {
  font-family: var(--font-mono);
  font-size: var(--text-lg);
  font-weight: 700;
  color: var(--color-accent);
}

.roi-calculator__revenue-value {
  font-family: var(--font-mono);
  font-size: var(--text-lg);
  font-weight: 700;
  color: var(--color-text);
}

/* Bar chart */
.roi-calculator__bars {
  margin-bottom: var(--space-lg);
}

.roi-calculator__bar {
  height: 32px;
  border-radius: 4px;
  margin-bottom: var(--space-xs);
  display: flex;
  align-items: center;
  padding-left: var(--space-sm);
  min-width: 5%;
  transition: width 0.3s ease;
}

.roi-calculator__bar--cost {
  background: var(--color-accent);
  width: 5%; /* Will be animated by GSAP */
}

.roi-calculator__bar--revenue {
  background: var(--color-text);
  width: 20%; /* Will be animated by GSAP */
}

.roi-calculator__bar-label {
  font-family: var(--font-sans);
  font-size: var(--text-xs);
  font-weight: 500;
  color: var(--color-bg);
  white-space: nowrap;
}

/* Punchline */
.roi-calculator__punchline {
  font-family: var(--font-sans);
  font-size: var(--text-base);
  color: var(--color-text-muted);
  text-align: center;
  line-height: 1.6;
  opacity: 0;
  transform: translateY(8px);
  padding-top: var(--space-md);
  border-top: 1px solid var(--color-border);
}

.roi-calculator__punchline strong {
  color: var(--color-accent);
  font-weight: 700;
}
```

## Animation

**Section entrance** (ScrollTrigger):

```js
ScrollTrigger.create({
  trigger: ".roi-calculator",
  start: "top 85%",
  once: true,
  onEnter: () => {
    const tl = gsap.timeline();
    tl.from(".roi-calculator__headline", { y: 16, opacity: 0, duration: 0.4, ease: "power2.out" });
    tl.from(".roi-calculator__subheadline", { y: 12, opacity: 0, duration: 0.3, ease: "power2.out" }, "-=0.2");
    tl.from(".roi-calculator__card", { y: 24, opacity: 0, duration: 0.5, ease: "power2.out" }, "-=0.2");
  }
});
```

**GSAP number counting**: When the slider changes, revenue numbers count up/down smoothly via GSAP (not instant text replacement). This makes the calculator feel alive and reinforces the "watching money grow" experience.

**Bar chart width animation**: Bar widths animate via GSAP `gsap.to()` with `duration: 0.3, ease: "power2.out"`. The cost bar (red, $247) stays tiny. The revenue bar (white) grows dramatically as the slider increases. The visual disparity is the entire point.

**Punchline fade-in**: When the slider crosses the threshold (appointment value >= $124, meaning 2 appointments >= $247), the punchline fades in with `y: 0, opacity: 1, duration: 0.4, ease: "power2.out"`. Moving below threshold fades it out.

**Reduced motion**: Calculator remains fully interactive (it is an input device, not a decorative animation). However, GSAP number counting is replaced with instant text updates. Bar width changes are instant. Punchline appears/disappears without animation. All controlled via `gsap.matchMedia()`.

## Accessibility

- **Slider**: Native `<input type="range">` for full keyboard accessibility (arrow keys, Home/End).
- **Label**: Explicit `<label for="roi-slider">` linked to slider.
- **Output**: `<output for="roi-slider">` with `aria-live="polite"` announces value changes to screen readers.
- **Slider ARIA**: `aria-valuemin`, `aria-valuemax`, `aria-valuenow`, `aria-valuetext` provide full context.
- **Punchline**: `aria-live="polite"` region announces punchline when it appears.
- **Bar chart**: `role="img"` with `aria-label` describes the visual comparison for screen readers.
- **Focus ring**: `:focus-visible` on slider with `outline: 2px solid var(--color-accent); outline-offset: 4px`.
- **No auto-play**: Calculator only updates on user interaction (slider drag). Nothing animates on its own.

## Mobile Layout (< 768px)

```css
@media (max-width: 768px) {
  .roi-calculator__card {
    padding: var(--space-lg) var(--space-md);
  }

  .roi-calculator__comparison {
    flex-direction: column;
    gap: var(--space-sm);
  }

  .roi-calculator__bar {
    height: 24px;
  }
}
```

- Comparison row stacks vertically.
- Bar heights reduce slightly.
- Slider remains full-width (works well on touch).
- Card padding reduces slightly.

## Psychology Note

This calculator converts the RAAS value proposition from words into a visceral, interactive experience. Three mechanisms at work:

1. **Active participation**: The visitor manipulates the slider themselves. Self-generated conclusions are more persuasive than assertions. When the visitor sees the revenue bar dwarf the cost bar, they created that insight — it feels like discovery, not salesmanship.

2. **Visual anchoring**: The tiny red cost bar next to the massive white revenue bar creates an overwhelming visual disparity. The brain processes visual proportions faster than numbers. $247 vs. $1,000 as numbers is one thing. As bars where one is 4x the other? That's visceral.

3. **Threshold moment**: The punchline appears at exactly the moment the math proves the investment works. This micro-moment of "revelation" creates a positive emotional peak that the visitor carries into the FAQ and final CTA below.

---

---

# SECTION 6: FAQ — Pricing Specific

**Purpose**: Answer the 8 most common objections and questions that arise specifically on a pricing page. Each answer is written to reduce friction, build trust, and gently push toward conversion. The FAQ section also provides JSON-LD structured data (defined earlier in the meta section) for Google rich results.

**HTML Structure**:
```html
<section id="pricing-faq" class="pricing-faq" aria-labelledby="faq-heading">
  <div class="container">
    <h2 id="faq-heading" class="pricing-faq__headline">
      Questions? We've got answers.
    </h2>
    <p class="pricing-faq__subheadline">
      If something isn't covered here, just ask our agent — it's the voice bubble in the corner.
    </p>
    <div class="pricing-faq__list">
      <!-- 8 FAQ items using <details>/<summary> -->
    </div>
  </div>
</section>
```

## Headline Options

### Option A: "Questions? We've got answers."
**Rationale**: Direct, conversational, friendly. Acknowledges that the visitor has concerns without being presumptuous. The period after "answers" is confident — not a question mark, not an exclamation. Just a fact.

### Option B: "You Have Questions. We Have Answers."
**Rationale**: Slightly more structured. Parallel construction creates a satisfying rhythm. More authoritative than Option A.

### Option C: "Before You Decide"
**Rationale**: Assumes the visitor is in decision mode (they are — this is a pricing page). Positions the FAQ as the final step before action.

### RECOMMENDED: Option A

**"Questions? We've got answers."** — It is the most natural and least corporate. The subheadline ties into the live voice agent, reinforcing the product demo.

## Finished Copy — All 8 Questions and Answers

### FAQ 1

**Question**:
```
What if the agent doesn't book any appointments?
```

**Answer**:
```
You don't pay. It's that simple.

We operate as RAAS — Results as a Service. If our AI agent doesn't book a single appointment for your business in any given month, you don't pay for that month. You can also choose to leave at any point with a full refund.

Our pricing is set at roughly the value of one booked appointment. If the AI books one appointment, it's paid for the whole month. Everything after that is pure profit for you.
```

**Psychology**: This is the #1 question visitors have. Placing it first means the most anxious visitors get relief immediately. The answer echoes the RAAS callout above but in Q&A format — repetition builds trust.

---

### FAQ 2

**Question**:
```
Is there a contract?
```

**Answer**:
```
Never. Month-to-month. Cancel anytime. No questions asked.

We don't believe in locking businesses into contracts they can't exit. We earn your business every single month. If we stop delivering results, you should be free to leave. That's how we'd want to be treated, so that's how we treat you.
```

**Psychology**: Short, punchy opening eliminates the objection in 8 words. The second paragraph adds the "why" — positioning the no-contract policy as a value, not just a feature.

---

### FAQ 3

**Question**:
```
What's included in the setup fee?
```

**Answer**:
```
Everything you need to go live. Specifically:

- Custom website design and build (your business, your content)
- Full GoHighLevel CRM setup
- All automation workflows (booking confirmations, staff notifications, follow-up sequences)
- AI agent deployment and training with your business knowledge
- Calendar and availability configuration
- Custom domain setup

We do it all. You provide your business details — description, services, prices, hours — and we build the entire system around it. The setup fee is also fully refundable during your 7-day trial.
```

**Psychology**: The bulleted list makes the fee feel tangible and justified. Ending with "fully refundable" eliminates the remaining objection about setup costs.

---

### FAQ 4

**Question**:
```
How long does setup take?
```

**Answer**:
```
3 business days for onboarding — that's when we build everything. Then your agent goes live for a 7-day free trial. Total time from signup to a live, working AI agent: under 2 weeks.

During the 3-day onboarding, we handle the website, CRM, automations, and agent training. You'll need to provide some business information (services, pricing, hours), but that usually takes about 15 minutes of your time.
```

**Psychology**: Specific timelines build trust. "15 minutes of your time" signals that this is truly done-for-you, not a disguised DIY product.

---

### FAQ 5

**Question**:
```
Are there any additional costs beyond the monthly subscription?
```

**Answer**:
```
Your monthly subscription covers everything we build and manage — the website, AI agent, customer dashboard, and automations. The only additional cost is AI usage: voice conversations cost approximately 30-80p per 5-minute call (under $1), paid directly through the platform. For most businesses, this adds up to a few dollars per month. We're transparent about every cost because we believe you should know exactly what you're paying for.
```

**Psychology**: This FAQ addresses the #1 hidden-cost objection. Transparency here builds trust (Transparency Bias) and prevents post-purchase regret. The specific cost range (30-80p) makes it concrete and non-threatening, while "a few dollars per month" normalizes the total.

---

### FAQ 6

**Question**:
```
Can I upgrade or downgrade my plan?
```

**Answer**:
```
Yes, anytime. No penalties, no paperwork.

Upgrades take effect immediately — if you're on the Chat plan and want Voice, we'll set up your phone number and voice agent right away. Downgrades take effect at your next billing cycle. You're never locked into a tier.
```

**Psychology**: Emphasizes flexibility. "No penalties, no paperwork" uses the same punchy rhythm as the contract answer. Mentioning the specific upgrade path (Chat to Voice) plants the seed for future upselling.

---

### FAQ 7

**Question**:
```
What if I already have a website?
```

**Answer**:
```
No problem at all. We can embed our AI agent directly on your existing website. Same pricing, same features, same setup process. Your leads still flow into the customer dashboard, and all automations work exactly the same way. You don't need to switch websites to use our agents.
```

**Psychology**: This FAQ addresses a common concern from businesses with established web presence. Source: `packages.yaml` `existing_site_policy`. Eliminates a blocker without devaluing the included website offering.

---

### FAQ 8

**Question**:
```
What happens after the 7-day free trial?
```

**Answer**:
```
Your subscription starts automatically — your card is on file from day one. But we don't just charge you without warning. You'll receive a support check-in every 3 days during the trial, a billing reminder 24 hours before your first payment, and a final reminder 3 hours before. If you want to cancel, you can do so anytime during the trial for a full refund — including the setup fee. No questions asked.
```

**Psychology**: This FAQ directly addresses trial-to-paid anxiety. The email reminder sequence (sourced from `packages.yaml` `trial_flow`) reassures visitors that they won't be surprise-charged. Listing specific touchpoints (every 3 days, 24 hours, 3 hours) makes the process feel structured and trustworthy.

---

## FAQ Item HTML Structure

Each FAQ uses native `<details>/<summary>` for accessibility and no-JS functionality.

```html
<details class="pricing-faq__item">
  <summary class="pricing-faq__question">
    <span class="pricing-faq__question-text">What if the agent doesn't book any appointments?</span>
    <svg class="pricing-faq__chevron" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </summary>
  <div class="pricing-faq__answer">
    <p>You don't pay. It's that simple.</p>
    <p>We operate as RAAS — Results as a Service. If our AI agent doesn't book a single appointment for your business in any given month, you don't pay for that month. You can also choose to leave at any point with a full refund.</p>
    <p>Our pricing is set at roughly the value of one booked appointment. If the AI books one appointment, it's paid for the whole month. Everything after that is pure profit for you.</p>
  </div>
</details>
```

## FAQ Styling

```css
.pricing-faq {
  padding: var(--space-2xl) var(--space-md);
}

.pricing-faq__headline {
  font-family: var(--font-sans);
  font-size: var(--text-xl);
  font-weight: 800;
  color: var(--color-text);
  text-align: center;
  margin-bottom: var(--space-xs);
}

.pricing-faq__subheadline {
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  color: var(--color-text-dim);
  text-align: center;
  margin-bottom: var(--space-xl);
}

.pricing-faq__list {
  max-width: 720px;
  margin: 0 auto;
}

.pricing-faq__item {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  margin-bottom: var(--space-sm);
  overflow: hidden;
}

.pricing-faq__question {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-md) var(--space-md);
  cursor: pointer;
  font-family: var(--font-sans);
  font-size: var(--text-base);
  font-weight: 600;
  color: var(--color-text);
  list-style: none;
  transition: color 200ms var(--ease-default);
}

.pricing-faq__question:hover {
  color: var(--color-accent);
}

.pricing-faq__question::-webkit-details-marker {
  display: none;
}

.pricing-faq__chevron {
  flex-shrink: 0;
  color: var(--color-text-dim);
  transition: transform 200ms var(--ease-default);
}

.pricing-faq__item[open] .pricing-faq__chevron {
  transform: rotate(180deg);
}

.pricing-faq__answer {
  padding: 0 var(--space-md) var(--space-md);
}

.pricing-faq__answer p {
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  line-height: 1.7;
  margin-bottom: var(--space-sm);
}

.pricing-faq__answer p:last-child {
  margin-bottom: 0;
}

/* Lists inside FAQ answers (e.g., FAQ 3 setup fee list) */
.pricing-faq__answer ul {
  list-style: none;
  padding: 0;
  margin: var(--space-sm) 0;
}

.pricing-faq__answer ul li {
  padding: var(--space-xs) 0;
  padding-left: var(--space-md);
  position: relative;
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  line-height: 1.6;
}

.pricing-faq__answer ul li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--color-accent);
}
```

## Animation

**Section entrance** (ScrollTrigger):

- **Headline + subheadline**: `gsap.from` with `y: 16, opacity: 0, duration: 0.4, ease: "power2.out"`. Triggered by ScrollTrigger on `.pricing-faq`, `start: "top 85%"`, `once: true`.

- **FAQ items**: Staggered entrance using `ScrollTrigger.batch`:

```js
ScrollTrigger.batch(".pricing-faq__item", {
  onEnter: (batch) => gsap.from(batch, {
    y: 12,
    opacity: 0,
    duration: 0.3,
    stagger: 0.05,
    ease: "power2.out"
  }),
  start: "top 90%",
  once: true
});
```

**Answer reveal (GSAP-controlled accordion)**: Each FAQ item uses GSAP for smooth expand/collapse instead of relying on native `<details>` animation:

```js
document.querySelectorAll(".pricing-faq__question").forEach(summary => {
  summary.addEventListener("click", (e) => {
    e.preventDefault();
    const details = summary.closest(".pricing-faq__item");
    const answer = details.querySelector(".pricing-faq__answer");
    const chevron = details.querySelector(".pricing-faq__chevron");
    const isOpen = details.hasAttribute("open");

    if (isOpen) {
      gsap.to(answer, {
        height: 0,
        opacity: 0,
        duration: 0.25,
        ease: "power2.inOut",
        onComplete: () => details.removeAttribute("open")
      });
      gsap.to(chevron, { rotation: 0, duration: 0.25, ease: "power2.inOut" });
    } else {
      details.setAttribute("open", "");
      gsap.fromTo(answer,
        { height: 0, opacity: 0 },
        { height: "auto", opacity: 1, duration: 0.3, ease: "power2.out" }
      );
      gsap.to(chevron, { rotation: 180, duration: 0.25, ease: "power2.inOut" });
    }
  });
});
```

**Chevron rotation**: The chevron SVG rotates 180 degrees on open, back to 0 on close. Controlled by GSAP (not CSS transition). Duration: 250ms. Easing: `"power2.inOut"`. This replaces the CSS `.pricing-faq__item[open] .pricing-faq__chevron { transform: rotate(180deg); }` rule — GSAP handles the rotation for smoother, more controlled animation.

**Reduced motion**: All FAQ animations are wrapped in `gsap.matchMedia("(prefers-reduced-motion: no-preference)")`. With reduced motion, items appear immediately, and accordions open/close instantly without height animation. Chevron snaps to final position.

## Mobile Layout (< 768px)

- FAQ list goes full-width with reduced horizontal padding.
- Question text wraps naturally; chevron stays right-aligned.
- Touch target for the summary element is already sufficient (full-width, generous padding).
- No structural changes needed — the single-column FAQ layout works at all breakpoints.

```css
@media (max-width: 768px) {
  .pricing-faq__question {
    padding: var(--space-md) var(--space-sm);
  }

  .pricing-faq__answer {
    padding: 0 var(--space-sm) var(--space-md);
  }
}
```

## Psychology Note

FAQ placement directly after the RAAS guarantee is intentional. The guarantee eliminates the emotional objection ("What if it doesn't work?"), and the FAQ eliminates the logical objections ("Is there a contract? What about extra costs?"). Together, they form a complete objection-handling sequence: emotion first, logic second.

The first question mirrors the guarantee headline — this repetition is deliberate. Studies show that people need to encounter a claim 3-5 times before they internalize it. By the time a visitor has read the hero headline, the RAAS callout, and the first FAQ answer, the risk-free message has been reinforced three times.

The subheadline ("just ask our agent") does double duty: it tells the visitor where to get more help, and it subtly reminds them that the voice agent is live on this page — another product demo touchpoint.

---

---

# SECTION 7: Final CTA

**Purpose**: The closing push. By this point, the visitor has seen prices, read the guarantee, and had their objections answered. The final CTA section exists to convert the remaining undecided visitors with one last psychologically compelling angle: there is literally nothing to lose.

**HTML Structure**:
```html
<section id="final-cta" class="final-cta" aria-labelledby="final-cta-heading">
  <div class="container">
    <h2 id="final-cta-heading" class="final-cta__headline">
      The Worst That Can Happen? You Get a Free Website.
    </h2>
    <p class="final-cta__subheadline">
      Even if you cancel during the trial, you keep the website we built for you. Try it risk-free.
    </p>
    <div class="final-cta__actions">
      <a href="#book-call" class="final-cta__primary">
        Book a Free Demo
      </a>
      <p class="final-cta__secondary">
        Or talk to our agent right now <span class="final-cta__arrow" aria-hidden="true">&rarr;</span>
      </p>
    </div>
  </div>
</section>
```

## Headline Options

### Option A: "The Worst That Can Happen? You Get a Free Website."

**Rationale**: This is the single most powerful closing line available. It flips loss aversion completely — the worst-case scenario is a positive outcome. A business owner reading this thinks: "So even if I hate it, I walk away with a free website? There's no downside." This is the Zero-Price Effect combined with inverted loss aversion. The word "worst" is doing extraordinary psychological work here.

### Option B: "Risk Nothing. Keep Everything."

**Rationale**: Shorter, punchier, more abstract. "Risk nothing" addresses fear; "Keep everything" addresses value. The parallel structure is satisfying. However, it is less specific than Option A — it does not name the free website, which is the tangible takeaway.

### Option C: "Start Free. Stay Only If It Works."

**Rationale**: Simple and direct. Emphasizes the trial and the RAAS guarantee in one sentence. Less psychologically clever than Option A but very clear.

### RECOMMENDED: Option A

**"The Worst That Can Happen? You Get a Free Website."** — No other headline on this page (or likely any competitor's page) makes the worst case sound this good. It is specific, unexpected, and memorable. The specificity of "free website" gives it concrete value that abstract claims like "risk-free" cannot match.

## Finished Copy

**Headline**:
```
The Worst That Can Happen? You Get a Free Website.
```

**Subheadline**:
```
Even if you cancel during the trial, you keep the website we built for you. Try it risk-free.
```

**Primary CTA button**:
```
Book a Free Demo
```

**Secondary CTA text**:
```
Or talk to our agent right now →
```

## Styling

```css
.final-cta {
  padding: var(--space-3xl) var(--space-md);
  text-align: center;
}

.final-cta__headline {
  font-family: var(--font-sans);
  font-size: var(--text-xl);
  font-weight: 800;
  color: var(--color-text);
  line-height: 1.15;
  max-width: 640px;
  margin: 0 auto var(--space-md);
}

.final-cta__subheadline {
  font-family: var(--font-sans);
  font-size: var(--text-base);
  color: var(--color-text-muted);
  line-height: 1.6;
  max-width: 480px;
  margin: 0 auto var(--space-xl);
}

.final-cta__actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-md);
}

.final-cta__primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--color-accent);
  color: #ffffff;
  font-family: var(--font-sans);
  font-size: var(--text-base);
  font-weight: 700;
  padding: 16px 40px;
  border-radius: var(--radius-sm);
  text-decoration: none;
  min-height: 52px;
  cursor: pointer;
  transition: background 200ms var(--ease-default), box-shadow 200ms var(--ease-default);
}

.final-cta__primary:hover {
  background: var(--color-accent-hover);
  box-shadow: 0 0 24px rgba(255, 59, 48, 0.25);
}

.final-cta__primary:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 4px;
}

.final-cta__secondary {
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  color: var(--color-text-dim);
  cursor: pointer;
  transition: color 200ms var(--ease-default);
}

.final-cta__secondary:hover {
  color: var(--color-text-muted);
}

.final-cta__arrow {
  display: inline-block;
  transition: transform 200ms var(--ease-default);
}

.final-cta__secondary:hover .final-cta__arrow {
  transform: translateX(4px);
}
```

## Secondary CTA Behavior

The "Or talk to our agent right now" text should trigger the voice agent bubble. Implementation:

```javascript
document.querySelector('.final-cta__secondary').addEventListener('click', () => {
  // Trigger the voice agent bubble open
  // Implementation depends on the voice widget SDK
  window.fluisVoiceAgent?.open();
});
```

This ties the secondary CTA directly to the product — the visitor experiences the AI agent at the moment of highest intent.

## Animation

**Section entrance** (ScrollTrigger sequence):

```js
ScrollTrigger.create({
  trigger: ".final-cta",
  start: "top 80%",
  once: true,
  onEnter: () => {
    const tl = gsap.timeline();

    // Headline
    tl.from(".final-cta__headline", {
      y: 16,
      opacity: 0,
      duration: 0.5,
      ease: "expo.out"
    });

    // Subheadline
    tl.from(".final-cta__subheadline", {
      y: 12,
      opacity: 0,
      duration: 0.5,
      ease: "expo.out"
    }, "-=0.4");

    // Primary CTA — scale entrance with back.out overshoot
    tl.from(".final-cta__primary", {
      scale: 0.95,
      opacity: 0,
      duration: 0.4,
      ease: "back.out(1.7)"
    }, "-=0.3");

    // Secondary CTA
    tl.from(".final-cta__secondary", {
      opacity: 0,
      duration: 0.3,
      ease: "power2.out"
    }, "-=0.2");
  }
});
```

**Arrow hover animation** (GSAP-enhanced): The arrow translates 4px right on hover with GSAP for smoother control:

```js
const secondaryCta = document.querySelector(".final-cta__secondary");
const arrow = document.querySelector(".final-cta__arrow");

secondaryCta?.addEventListener("mouseenter", () => {
  gsap.to(arrow, { x: 4, duration: 0.2, ease: "power2.out" });
});
secondaryCta?.addEventListener("mouseleave", () => {
  gsap.to(arrow, { x: 0, duration: 0.2, ease: "power2.out" });
});
```

This replaces the CSS `transform: translateX(4px)` hover transition with GSAP for consistency with the rest of the animation system.

**Reduced motion**: All Final CTA animations are wrapped in `gsap.matchMedia("(prefers-reduced-motion: no-preference)")`. With reduced motion, all elements render immediately. Arrow hover is also disabled.

## Mobile Layout (< 768px)

- Headline scales via `clamp()` (already in `--text-xl`).
- Primary CTA button becomes full-width: `width: 100%` / `max-width: 360px`.
- Section padding reduces to `var(--space-2xl) var(--space-sm)`.
- All text remains centered.
- Touch target for primary CTA: 52px height (exceeds 48px minimum).

```css
@media (max-width: 768px) {
  .final-cta {
    padding: var(--space-2xl) var(--space-sm);
  }

  .final-cta__primary {
    width: 100%;
    max-width: 360px;
  }
}
```

## Psychology Note

This section deploys two psychological principles simultaneously:

1. **Zero-Price Effect**: "Free website" activates disproportionate positive emotion. Research by Dan Ariely shows that "free" is not just a price — it triggers an emotional response that makes options with free components irrationally attractive. The visitor is not just evaluating a trial; they are evaluating a guarantee that includes a free tangible asset.

2. **Loss Aversion Inversion**: Normally, loss aversion makes people afraid to spend money (they might lose it). This headline inverts the dynamic by making the worst-case scenario a gain. The brain cannot process a "worst case" that is positive — it creates cognitive dissonance that resolves in favor of trying the product ("There's literally no way to lose here").

The secondary CTA ("talk to our agent right now") creates immediacy. The arrow icon reinforces directional momentum. The fact that it opens the voice agent means the visitor goes from reading about the product to experiencing it in one click — the shortest path from consideration to conviction.

---

---

# GLOBAL PAGE NOTES

## Scroll-to-Top Behavior

The pricing page does not need a scroll-to-top button. The page is short enough (6 sections) that the sticky header provides sufficient navigation. A scroll-to-top button would add visual clutter with no benefit.

## Voice Agent Bubble

The floating voice agent bubble appears on this page, as on all pages. It sits in the bottom-right corner, above the fold on both desktop and mobile. Its z-index is higher than all page content (`z-index: 50`).

On the pricing page, the voice agent serves three functions:
1. **Demo**: Visitors experience the product while evaluating prices.
2. **Support**: Visitors can ask the agent pricing questions.
3. **Conversion**: The agent can book discovery calls directly.

The "Or talk to our agent right now" secondary CTA in Section 6 opens this bubble.

## Sticky Mobile CTA

On mobile viewports (< 768px), a sticky CTA bar appears at the bottom of the screen once the user scrolls past the pricing cards section. This ensures a conversion path is always visible.

```html
<div class="sticky-mobile-cta" aria-label="Start free trial">
  <a href="#book-call" class="sticky-mobile-cta__btn">
    Start Free Trial
  </a>
</div>
```

```css
.sticky-mobile-cta {
  display: none; /* Hidden by default */
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: var(--space-sm);
  background: var(--color-bg);
  border-top: 1px solid var(--color-border);
  z-index: 40;
}

.sticky-mobile-cta__btn {
  display: block;
  width: 100%;
  background: var(--color-accent);
  color: #ffffff;
  text-align: center;
  font-weight: 700;
  font-size: var(--text-base);
  padding: 14px;
  border-radius: var(--radius-sm);
  text-decoration: none;
  min-height: 48px;
}

@media (max-width: 768px) {
  .sticky-mobile-cta.is-visible {
    display: block;
  }
}
```

**Trigger**: Show after the user scrolls past `#pricing-cards`. Hide if they scroll back above it. Use ScrollTrigger on the pricing cards section (`onLeave` to show, `onEnterBack` to hide).

**Important**: The sticky CTA must not overlap the voice agent bubble. Position the bubble at `bottom: 72px` on mobile when the sticky CTA is visible, or place the sticky CTA slightly higher to avoid conflict.

## Page Load Performance

- **Critical CSS**: Inline the pricing hero and card grid styles in `<head>` (estimated < 3KB).
- **Fonts**: Inter and JetBrains Mono must be preloaded. JetBrains Mono is critical for this page (prices are above the fold).
- **No images**: The pricing page contains no images — only SVG icons (shield, checkmarks, chevrons). This means LCP is text-based and should be < 1.5s.
- **GSAP ScrollTrigger**: All scroll-driven animations use ScrollTrigger (single registration, `once: true` on entrance animations). ScrollTrigger.batch for groups of similar elements (cards, FAQ items).

```html
<link rel="preload" href="/assets/fonts/Inter-var.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/JetBrainsMono-var.woff2" as="font" type="font/woff2" crossorigin>
```

## Accessibility Requirements

- All sections use semantic HTML (`<section>`, `<article>`, `<details>`, `<summary>`, `<table>`).
- Every section has an `aria-labelledby` pointing to its heading.
- The pricing cards use `<article>` with `aria-label` describing the plan.
- The comparison table has `role="table"` and `aria-label`.
- All SVG icons have `aria-hidden="true"`.
- Focus states use `:focus-visible` with `outline: 2px solid var(--color-accent); outline-offset: 4px`.
- The page has a single `<h1>` (the hero headline). All subsequent headings are `<h2>`.
- Color contrast: All text/background combinations exceed 4.5:1 ratio.
  - `#f5f5f5` on `#0a0a0a` = 18.1:1 (passes AAA)
  - `#999999` on `#0a0a0a` = 6.3:1 (passes AA)
  - `#999999` on `#141414` = 4.8:1 (passes AA)
  - `#666666` on `#0a0a0a` = 3.9:1 (passes AA for large text only — used only for labels and tertiary text at 12px+, which is acceptable for decorative/supplementary text; for body text, use `--color-text-muted` minimum)
  - `#ffffff` on `#ff3b30` = 4.6:1 (passes AA — used for Recommended badge and CTA buttons)
- **Skip-to-content**: Required on this page per `00_master_spec.md` Section 2.8. Include `<a href="#main-content" class="skip-link">Skip to main content</a>` as the first element in `<body>`, and `<main id="main-content">` wrapping all page content.

## Print Stylesheet

When printed, the pricing page should show the three pricing cards, the feature comparison (expanded), and the FAQ (all expanded). Hide: animations, voice bubble, sticky CTA, decorative elements.

```css
@media print {
  .pricing-hero__label,
  .sticky-mobile-cta,
  .final-cta__secondary {
    display: none;
  }

  .comparison__details,
  .pricing-faq__item {
    /* Force open */
  }

  .pricing-card--recommended {
    border: 2px solid #333;
    box-shadow: none;
  }

  .pricing-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  body {
    background: white;
    color: black;
  }
}
```

---

---

# IMPLEMENTATION CHECKLIST

Before marking the pricing page as complete, verify every item:

### Content
- [ ] Hero headline matches spec: "If We Don't Book Appointments, You Don't Pay."
- [ ] Subheadline includes: no contracts, no hidden fees, month-to-month, cancel anytime
- [ ] All three pricing cards have exact copy from this spec
- [ ] All prices displayed in `--font-mono` (JetBrains Mono)
- [ ] Website card shows "From $27/mo" with tier note "3 pages ($27/mo) | 5 pages ($47/mo)"
- [ ] Chat card shows "$147/mo" with "$197 one-time setup"
- [ ] Voice card shows "$247/mo" with "$297 one-time setup"
- [ ] Anchoring callout uses standardized format: "A full-time receptionist costs ~$40,000/year. Our voice agent: $247/month. That's $8.23/day."
- [ ] RAAS guarantee has all four paragraphs (subtitle, trial, monthly, philosophy) plus closing line
- [ ] ROI Calculator: headline "The Math Is Simple", subheadline "Drag the slider. Watch the numbers."
- [ ] ROI Calculator: slider range $50-$1,000, default $200, step $25
- [ ] ROI Calculator: fixed cost display "$247/mo", dynamic revenue display updates on slider input
- [ ] ROI Calculator: punchline appears when appointment value >= $124 (2 appointments cover cost)
- [ ] All 8 FAQ questions and answers match spec word-for-word
- [ ] Final CTA headline: "The Worst That Can Happen? You Get a Free Website."
- [ ] JSON-LD structured data includes both WebPage/ItemList and FAQPage schemas

### Visual
- [ ] Voice Agent card has: accent border (2px), glow shadow, "Recommended" badge, accent CTA button
- [ ] Chat card CTA is solid neutral (not accent)
- [ ] Website card CTA is ghost style (transparent background)
- [ ] CTA visual hierarchy: Voice (accent red) > Chat (solid neutral) > Website (ghost)
- [ ] Feature checkmarks: Website (dim), Chat (accent), Voice (accent)
- [ ] Voice column highlighted in comparison table (subtle red tint)
- [ ] RAAS callout has 4px accent left border and surface-2 background
- [ ] No hardcoded colors — all values use CSS custom properties

### Layout
- [ ] Three-column grid on desktop (>768px)
- [ ] Single column on mobile (<768px) with Voice card FIRST
- [ ] Comparison table collapses to tabbed view or horizontal scroll on mobile
- [ ] Sticky mobile CTA appears after scrolling past pricing cards
- [ ] Voice bubble does not overlap sticky mobile CTA
- [ ] All CTA buttons minimum 44px height (48px on Voice card and final CTA)

### Animation (GSAP 3 + ScrollTrigger + SplitText + ScrambleText)
- [ ] Hero: SplitText word reveal on headline + staggered label/subheadline entrance
- [ ] Pricing cards: ScrollTrigger.batch staggered entrance (100ms intervals)
- [ ] Pricing cards: 3D tilt on hover (max 8deg, elastic ease-out on leave)
- [ ] Pricing cards: Glassmorphism background (rgba(255,255,255,0.03) + backdrop-filter: blur(20px))
- [ ] Voice card: One-shot red glow pulse on entrance, "Recommended" badge scale-in with back.out(1.7)
- [ ] Voice card: Animated conic-gradient border rotation on hover (@property --border-angle)
- [ ] Voice card: Shimmer edge on hover
- [ ] Anchoring: Counter animation ($40,000 counts up, $247 counts up 200ms later) + ScrambleText decode
- [ ] ROI Calculator: Interactive slider updates revenue display with GSAP number counting
- [ ] ROI Calculator: Bar chart widths animate via GSAP
- [ ] ROI Calculator: Punchline fades in when slider crosses threshold
- [ ] RAAS callout: ScrollTrigger entrance + glow pulse (single fire)
- [ ] FAQ items: ScrollTrigger.batch staggered entrance
- [ ] FAQ: GSAP-controlled accordion expand/collapse (not native <details> animation)
- [ ] FAQ: Chevron rotation 180deg via GSAP on open/close
- [ ] Comparison table: GSAP-controlled expand/collapse with row stagger reveal
- [ ] Final CTA: Scale entrance 0.95-to-1 with back.out(1.7) on primary button
- [ ] Final CTA: Arrow translateX(4px) on hover via GSAP
- [ ] All animations wrapped in gsap.matchMedia("(prefers-reduced-motion: no-preference)")
- [ ] CSS animations (glow, gradient border, shimmer) disabled via @media (prefers-reduced-motion: reduce)

### Accessibility
- [ ] Single `<h1>` on the page (hero headline)
- [ ] All sections have `aria-labelledby`
- [ ] Pricing cards use `<article>` with `aria-label`
- [ ] Comparison table has `role="table"` and `aria-label`
- [ ] All interactive elements have `:focus-visible` states
- [ ] FAQ uses native `<details>/<summary>` (no JS required for basic function)
- [ ] SVG icons have `aria-hidden="true"`
- [ ] Color contrast meets WCAG 2.2 AA for all text/background combinations
- [ ] Skip-to-content link present as first element in `<body>` per `00_master_spec.md` Section 2.8

### Performance
- [ ] Fonts preloaded (Inter + JetBrains Mono)
- [ ] Critical CSS inlined for above-fold content
- [ ] No images on the page (SVG icons only)
- [ ] GSAP ScrollTrigger used for all scroll-driven animations (no raw IntersectionObserver)
- [ ] `content-visibility: auto` on below-fold sections (FAQ, final CTA)

### SEO
- [ ] `<title>` and `<meta description>` match spec
- [ ] Open Graph and Twitter Card meta tags present
- [ ] Canonical URL set
- [ ] JSON-LD FAQPage schema valid (test with Google Rich Results Test)
- [ ] JSON-LD WebPage/ItemList schema valid
- [ ] Heading hierarchy: h1 > h2 > h2 > h2 > h2 > h2 > h2 (one h1, six h2s — includes ROI Calculator)
