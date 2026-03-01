# Services Page Specification

**File**: `02_services_page.md`
**Page**: `services.html`
**Version**: 1.0
**Last Updated**: 2026-02-27
**Status**: Spec complete, ready for development

**Animation engine**: GSAP 3 + ScrollTrigger + SplitText + MorphSVG. See `00_master_spec.md` for the complete animation stack specification.

---

## Table of Contents

1. [Page Meta & SEO](#page-meta--seo)
2. [Page Purpose & Strategy](#page-purpose--strategy)
3. [Section 1: Services Hero](#section-1-services-hero)
4. [Section 2: Talking Websites Concept Explainer](#section-2-talking-websites-concept-explainer)
5. [Section 3: Website & Hosting Service Card](#section-3-website--hosting-service-card)
6. [Section 4: Chat Agent Service Card](#section-4-chat-agent-service-card)
7. [Section 5: Voice Agent Service Card (Highlighted)](#section-5-voice-agent-service-card-highlighted)
8. [Section 5b: How We're Different](#section-5b-how-were-different)
9. [Section 6: Comparison Table](#section-6-comparison-table)
10. [Section 6b: The RAAS Guarantee](#section-6b-the-raas-guarantee)
11. [Section 7: How It Works (Condensed)](#section-7-how-it-works-condensed)
12. [Section 8: Bottom CTA](#section-8-bottom-cta)
13. [Global Design Tokens Reference](#global-design-tokens-reference)
14. [Responsive Breakpoints](#responsive-breakpoints)
15. [Accessibility Requirements](#accessibility-requirements)

---

## Page Meta & SEO

```html
<title>Services — Fluis.ai | Websites, Chat Agents & Voice Agents</title>
<meta name="description" content="AI-powered websites, chat agents, and voice agents for small businesses. Everything built and managed for you. Free website included with every agent.">
<meta name="keywords" content="AI chat agent, AI voice agent, small business website, talking website, appointment booking AI, 24/7 lead capture">
<link rel="canonical" href="https://fluis.ai/services.html">

<!-- Open Graph -->
<meta property="og:title" content="Services — Fluis.ai | AI That Works For Your Business">
<meta property="og:description" content="Websites, chat agents, and voice agents. Everything built and managed for you. No results? No charge.">
<meta property="og:type" content="website">
<meta property="og:url" content="https://fluis.ai/services.html">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Services — Fluis.ai">
<meta name="twitter:description" content="AI-powered websites, chat agents, and voice agents for small businesses. Free website included with every agent.">
```

**Conversion Goal**: Guide visitors to the Pricing page or directly to Book a Demo. Every section should ladder toward one of these two actions. The page is an "understanding" page -- visitors are interested but need detail before committing.

---

## Page Purpose & Strategy

### Who Comes Here
Visitors who clicked "Services" in the nav or a "See How It Works" / "Learn More" CTA from the homepage. They are interested but not yet convinced. They need clarity on what each service is, what they get, and which one is right for them.

### Psychological Journey
1. **Arrival** -- "I'm interested, show me what you've got."
2. **Context** -- "Oh, so the website actually talks. That's interesting."
3. **Exploration** -- "Let me look at each service and see what fits."
4. **Comparison** -- "What's the difference between chat and voice?"
5. **Conviction** -- "Voice looks like the obvious choice. How do I start?"
6. **Action** -- "Let me book a demo or check the pricing."

### Content Strategy
- Lead with the concept, not the catalog. Explain "Talking Websites" before listing services.
- Present services in ascending order of value (Website, Chat, Voice) on desktop, but **reverse on mobile** -- Voice first, since it is the recommended product and mobile users scroll less.
- Use AIDA within each card: Attention (label/badge) -> Interest (headline) -> Desire (features + inclusions) -> Action (CTA).
- Never mention technology by name (no "GoHighLevel," no "Deepgram," no "ElevenLabs"). Speak in outcomes.

### Page Structure (8 Sections)
| # | Section | Purpose | Est. Height |
|---|---------|---------|-------------|
| 1 | Services Hero | Set the frame | 60vh |
| 2 | Talking Websites Explainer | Introduce the concept | 40vh |
| 3 | Website & Hosting Card | Entry-level service | auto |
| 4 | Chat Agent Card | Budget agent option | auto |
| 5 | Voice Agent Card (highlighted) | Recommended service | auto |
| 6 | Comparison Table | Detail-oriented comparison | auto |
| 7 | How It Works (condensed) | Reinforce simplicity | 40vh |
| 8 | Bottom CTA | Close the sale | 40vh |

---

## Section 1: Services Hero

### Semantic HTML
```html
<section id="services-hero" class="services-hero" aria-label="Services overview">
```

### Purpose
Set the frame for the page. This is NOT "Our Services" with a bland list underneath. This is a value-focused headline that makes the visitor feel they are in the right place. It should feel like a promise.

### Headline Options

**Option A (Recommended)**: "Three Ways to Never Miss a Lead Again."
- **Rationale**: Specificity (three = concrete), outcome-focused (never miss a lead), Loss Aversion (the fear of missing). Directly connects services to the business result.

**Option B**: "AI That Books Appointments While You Work."
- **Rationale**: Contrast creates imagery (AI working while you work). Outcome-focused. Immediately communicates what the services DO.

**Option C**: "Your Website Just Got a Lot Smarter."
- **Rationale**: Curiosity Gap -- how is it smarter? Warm, non-intimidating language. Connects to "Talking Websites" concept.

**RECOMMENDED: Option A -- "Three Ways to Never Miss a Lead Again."**

This headline works best for a Services page because:
1. Specificity sells -- "three ways" is concrete and sets up the three service tiers below.
2. "Never miss a lead" is outcome-focused and speaks directly to the SMB owner's pain.
3. Loss Aversion is one of the strongest psychological drivers -- the fear of missing leads is more motivating than the promise of gaining them.
4. It frames the entire page as a solution to a specific problem, not a product catalog.

### Exact Copy

**Headline**:
```
Three Ways to Never Miss a Lead Again.
```

**Subheadline**:
```
Everything you need. Nothing you don't. A professional website,
an AI agent that talks to your customers, and a dashboard that
tracks every lead -- all built and managed for you.
```

**No CTA in hero.** The visitor is here to learn. Pushing a CTA immediately signals sales pressure. Let them explore first. CTAs appear after each service card where they have context and motivation.

### Design Specification

**Layout**:
- Full-width section, centered text
- `min-height: 60vh` (hero occupies most of the viewport but is not a full-screen takeover -- this is not the homepage)
- Content vertically and horizontally centered using flexbox
- `max-width: 800px` for the text block to maintain comfortable line length

**Typography**:
- Headline: `font-size: var(--text-2xl)` | `font-weight: 800` | `color: var(--color-text)` | `letter-spacing: -0.02em` | `line-height: 1.1`
- Subheadline: `font-size: var(--text-lg)` | `font-weight: 400` | `color: var(--color-text-muted)` | `line-height: 1.5` | `max-width: 600px` | centered

**Spacing**:
- Headline to subheadline gap: `var(--space-md)` (24px)
- Section padding: `var(--space-3xl) var(--space-lg)` (96px top/bottom, 32px sides)
- Bottom padding slightly larger to create breathing room before Section 2: `var(--space-3xl)` + `var(--space-xl)` (144px)

**Background**:
- `background-color: var(--color-bg)` (#0a0a0a)
- Optional: very subtle radial gradient from center -- `radial-gradient(ellipse at 50% 50%, rgba(255, 59, 48, 0.03) 0%, transparent 70%)` -- barely perceptible red warmth in the center of the hero. This creates a focal point without any visible color.

**Decorative Element** (optional):
- A thin horizontal line (`1px solid var(--color-border)`) at the bottom of the section, centered, `width: 80px`. This acts as a visual separator and a subtle nod to the Nothing Phone dot-grid aesthetic.

### Animation Specification

> **Animation engine**: All animations on this page use GSAP 3 + ScrollTrigger. All animations are wrapped in `gsap.matchMedia("(prefers-reduced-motion: no-preference)")` to respect user preferences. When reduced motion is preferred, all content is visible immediately with no animation.

**On Page Load (sequence)**:

1. **Headline — SplitText word reveal**: The headline "Three Ways to Never Miss a Lead Again." is split into individual words using GSAP SplitText. Words reveal with stagger:
   - `y: 40` | `opacity: 0` to `y: 0` | `opacity: 1`
   - Stagger: `30ms` gap between each word
   - Easing: `"back.out(1.7)"` (slight overshoot for a polished feel)
   - Duration: `600ms` per word
   - Delay: `100ms` after page load
2. Subheadline fades in + translates up from `translateY(20px)` | `opacity: 0` to `1` | `duration: 600ms` | `ease: "expo.out"` | fires `150ms` after headline animation completes
3. Decorative line (if present) fades in | `delay: 200ms` after subheadline | `duration: 400ms`

**On Scroll**: No scroll-triggered animation for the hero. It is already visible on load.

**Reduced motion**: All animations wrapped in `gsap.matchMedia("(prefers-reduced-motion: no-preference)")`. When reduced motion is preferred, all content appears instantly with no transitions. See `00_master_spec.md` Section 12.7.

### Mobile Layout (< 768px)

- `min-height: 50vh` (shorter on mobile -- less dramatic, gets to content faster)
- Headline: `font-size: var(--text-xl)` (scales down via clamp)
- Subheadline: `font-size: var(--text-base)`
- Section padding: `var(--space-2xl) var(--space-sm)` (64px top/bottom, 16px sides)
- Text alignment remains centered
- Subheadline `max-width: 90vw`

### Psychology Note
No CTA in the hero is intentional. This page is the "understand" page in the visitor's journey. The homepage created interest. This page satisfies curiosity. Pushing a CTA before the visitor has seen the services would feel premature and increase bounce. The hero exists to orient and reassure -- "You are in the right place, here is what we offer, let me walk you through it."

---

## Section 2: Talking Websites Concept Explainer

### Semantic HTML
```html
<section id="talking-websites" class="concept-explainer" aria-label="What are Talking Websites">
```

### Purpose
Before diving into individual service cards, establish the core concept. This prevents the visitor from seeing three disconnected products and instead frames everything under one umbrella: "Your website comes alive." This section must be SHORT -- it is context-setting, not a deep dive.

### Exact Copy

**Label** (above headline):
```
THE CONCEPT
```

**Headline**:
```
Every Website We Build Comes Alive.
```

**Body**:
```
Most business websites are digital brochures. They sit there. They wait.
Ours don't.

We build websites with AI agents built in. Your site greets visitors,
answers their questions, qualifies them as leads, and books appointments
-- all without you lifting a finger. Every interaction is tracked in
one place so no lead ever falls through the cracks.

That's what we call a Talking Website.
```

**Visual Flow Diagram** (described, not designed):
A minimal horizontal flow displayed as four connected steps. Each step is a small icon or label inside a bordered circle/pill, connected by a thin line or arrow.

```
[ Your Website ]  -->  [ AI Agent ]  -->  [ Your Dashboard ]  -->  [ Booked Appointment ]
```

- Step 1 icon: Globe/browser icon. Label: "Your Website"
- Step 2 icon: Chat bubble or waveform icon. Label: "AI Agent"
- Step 3 icon: Database/contacts icon. Label: "Your Dashboard"
- Step 4 icon: Calendar/checkmark icon. Label: "Booked Appointment"

> **Icon source**: All icons on this page are Lucide Icons (24x24, stroke-width 1.5, `currentColor`). See Developer Notes item 6.

Connecting arrows: thin lines with small chevrons, `color: var(--color-text-dim)`. On hover or after scroll-in, arrows animate left-to-right with a subtle pulse.

### Design Specification

**Layout**:
- Centered text block above the flow diagram
- `max-width: var(--max-width)` (1200px) container, centered
- Text block: `max-width: 680px`, centered
- Flow diagram: `max-width: 900px`, centered, below text

**Typography**:
- Label: `font-size: var(--text-xs)` | `font-weight: 600` | `letter-spacing: 0.1em` | `text-transform: uppercase` | `color: var(--color-accent)` (#ff3b30)
- Headline: `font-size: var(--text-xl)` | `font-weight: 700` | `color: var(--color-text)` | `line-height: 1.15`
- Body: `font-size: var(--text-base)` | `font-weight: 400` | `color: var(--color-text-muted)` | `line-height: 1.7`

**Spacing**:
- Label to headline: `var(--space-sm)` (16px)
- Headline to body: `var(--space-md)` (24px)
- Body to flow diagram: `var(--space-xl)` (48px)
- Section padding: `var(--space-3xl) var(--space-lg)` (96px top/bottom)

**Background**:
- `background-color: var(--color-surface)` (#141414) -- slightly elevated from page bg to create a visual "band" that separates the hero from the service cards

**Flow Diagram Styling**:
- Each step node: `background: var(--color-surface-2)` | `border: 1px solid var(--color-border)` | `border-radius: var(--radius-full)` (pill shape) | `padding: var(--space-xs) var(--space-md)` | `font-size: var(--text-sm)` | `color: var(--color-text)`
- Connector lines: `height: 1px` | `background: var(--color-border)` | `width: 40px` between nodes
- Arrow chevrons: small SVG `>` shapes at the end of each connector, `color: var(--color-text-dim)`
- The final node ("Booked Appointment") has a subtle accent border: `border-color: var(--color-accent)` to signal the desired outcome

### Animation Specification

**Text elements — ScrollTrigger entrance** (replaces IntersectionObserver):

1. Label fades in | `duration: 300ms` | `delay: 0` | ScrollTrigger `start: "top 80%"`
2. Headline fades in + translates up 16px | `duration: 500ms` | `delay: 100ms` | `ease: "expo.out"`
3. Body fades in | `duration: 500ms` | `delay: 200ms` | `ease: "expo.out"`

**Flow diagram — SVG drawSVG path animation with ScrollTrigger scrub**:

The flow diagram connectors are implemented as SVG `<path>` elements. The entire path-drawing sequence is tied to scroll position using ScrollTrigger scrub, creating a scroll-linked reveal.

- **SVG connector paths**: Each connector line between nodes uses GSAP `drawSVG` effect (animates `stroke-dasharray` / `stroke-dashoffset` from `"0%"` to `"100%"`). Paths draw left-to-right as the user scrolls through the section.
- **ScrollTrigger config**: `trigger: ".concept-explainer"` | `start: "top 70%"` | `end: "bottom 50%"` | `scrub: 1` (smooth scrub tied to scroll position)
- **Node entrance**: Each node fades in (`opacity: 0` to `1`, `scale: 0.9` to `1`) as its incoming connector path reaches it. Nodes are staggered along the scrub timeline:
  - Node 1 ("Your Website"): visible at 0% of scrub progress
  - Connector 1 draws: 0%–25% of scrub
  - Node 2 ("AI Agent"): fades in at 25%
  - Connector 2 draws: 25%–50%
  - Node 3 ("Your Dashboard"): fades in at 50%
  - Connector 3 draws: 50%–75%
  - Node 4 ("Booked Appointment"): fades in at 75%
- **Final node red glow pulse** (one-shot, not looping): When Node 4 ("Booked Appointment") becomes visible, its `box-shadow` animates from `0 0 20px rgba(255, 59, 48, 0)` to `0 0 20px rgba(255, 59, 48, 0.3)` and back to `0 0 20px rgba(255, 59, 48, 0)` over `600ms`. This fires once (`once: true`) after the scrub reaches 75%.

**Reduced motion**: All animations wrapped in `gsap.matchMedia("(prefers-reduced-motion: no-preference)")`. When reduced motion is preferred, all nodes and connectors are visible immediately. See `00_master_spec.md` Section 12.7.

### Mobile Layout (< 768px)

- Flow diagram rotates to **vertical layout**: nodes stacked top-to-bottom with vertical connectors
- Each node: full width of container minus side padding, left-aligned text
- Connector lines become vertical: `width: 1px` | `height: 32px` | centered horizontally
- Section padding: `var(--space-2xl) var(--space-sm)`
- Headline: scales down via clamp
- Body: `font-size: var(--text-sm)`

### Psychology Note
This section uses the **Categorization Principle** -- when people understand the category before seeing individual items, they process and remember those items better. Without this section, visitors see three service cards and have to figure out how they relate. With this section, they immediately understand: "These are all variations of the same concept -- a website that talks and books appointments." This makes the decision feel simpler: not "which product do I need?" but "which version of this concept is right for me?"

---

## Section 3: Website & Hosting Service Card

### Semantic HTML
```html
<section id="website" class="service-card service-card--website" aria-label="Website and Hosting service">
```

### Purpose
Present the entry-level service. This is the lowest-commitment option. The strategy is Foot-in-the-Door: get them in the door with a $27/mo website, then upsell to agents later once they trust the relationship. This card should feel attractive but clearly "basic" compared to the agent cards that follow.

### Exact Copy

**Label**:
```
WEBSITE & HOSTING
```

**Headline Options**:

**Option A**: "Your Business Online. In Days, Not Months."
- **Rationale**: Speaks to speed and ease. Many SMB owners think getting a website is a huge project. This reframes it as fast and painless.

**Option B**: "A Website That Actually Works For You."
- **Rationale**: Implies their current site (or lack of one) is not working. Positions the new site as functional, not just pretty.

**Option C**: "Start With a Website. Add AI Later."
- **Rationale**: Transparent about the cross-sell path, but frames it as the customer's choice. Feels honest rather than pushy.

**RECOMMENDED: Option A -- "Your Business Online. In Days, Not Months."**

This works best because it addresses the primary objection for website-only prospects: "Getting a website is complicated and takes forever." The promise of speed is immediately appealing and differentiating.

**Body**:
```
A professional, mobile-friendly website for your business -- designed,
written, and launched for you. We handle the hosting, the domain, and
the content. You just tell us about your business.
```

**Feature List** (6 items with checkmark icons):
```
Professional website designed for your business
Hosting and maintenance included
Custom domain setup (yourname.com)
Mobile-friendly on every device
Search engine optimised so customers find you
AI-assisted content -- we write it for you
```

**Pricing Teaser**:
```
From $27/month
```
Subtext below pricing:
```
3 pages -- $27/mo  |  5 pages -- $47/mo
$47 one-time setup fee
```

**CTA**: "See Pricing" -- text link style, not a full button. This is the entry tier; we want attention on the agent cards below. The CTA is a soft nudge, not a hard push.

**Cross-sell hint** (small text below the CTA):
```
Want your website to capture leads automatically? Add a Chat or Voice Agent.
```
This line is `color: var(--color-text-dim)` and acts as a breadcrumb toward the cards below.

### Design Specification

**Card Layout**:
- `background: var(--color-surface)` (#141414)
- `border: 1px solid var(--color-border)` (rgba(255, 255, 255, 0.08))
- `border-radius: var(--radius-lg)` (16px)
- `padding: var(--space-xl)` (48px)
- `max-width: 720px`
- Centered within a `max-width: var(--max-width)` container

**Typography**:
- Label: `font-size: var(--text-xs)` | `font-weight: 600` | `letter-spacing: 0.1em` | `text-transform: uppercase` | `color: var(--color-text-dim)` (#666666)
- Headline: `font-size: var(--text-lg)` | `font-weight: 700` | `color: var(--color-text)` | `line-height: 1.2`
- Body: `font-size: var(--text-base)` | `color: var(--color-text-muted)` | `line-height: 1.6`
- Feature items: `font-size: var(--text-sm)` | `color: var(--color-text-muted)` | `line-height: 1.5`
- Pricing: `font-family: var(--font-mono)` | `font-size: var(--text-lg)` | `font-weight: 700` | `color: var(--color-text)`
- Pricing subtext: `font-size: var(--text-xs)` | `color: var(--color-text-dim)`
- CTA link: `font-size: var(--text-sm)` | `font-weight: 600` | `color: var(--color-text)` | `text-decoration: underline` | hover: `color: var(--color-accent)`
- Cross-sell hint: `font-size: var(--text-xs)` | `color: var(--color-text-dim)` | `font-style: italic`

**Feature List Styling**:
- Each item is a flex row: icon + text
- Icon: a small checkmark (`16px`, `color: var(--color-text-dim)`) -- NOT accent red. Red is reserved for the recommended service.
- Gap between items: `var(--space-xs)` (8px)
- Left padding for the entire list: `0` (no indent -- clean edge alignment)

**Hover State**:
- Card on hover: `border-color: var(--color-border-hover)` (rgba(255, 255, 255, 0.15))
- Transition: `border-color 200ms var(--ease-default)`
- No shadow, no scale. Subtle.

**Spacing within card**:
- Label to headline: `var(--space-sm)` (16px)
- Headline to body: `var(--space-sm)` (16px)
- Body to feature list: `var(--space-md)` (24px)
- Feature list to pricing: `var(--space-lg)` (32px)
- Pricing to CTA: `var(--space-md)` (24px)
- CTA to cross-sell hint: `var(--space-sm)` (16px)

**Section Spacing**:
- Section padding: `var(--space-3xl) var(--space-lg)` (96px top/bottom)
- Background: `var(--color-bg)` (#0a0a0a) -- back to base level

### Animation Specification

> **Note**: All three service cards (Website, Chat, Voice) are animated as a batch using `ScrollTrigger.batch` for performance. See the Voice card (Section 5) for the batch configuration. The specifications below describe the individual card behavior within the batch.

**Card entrance** (ScrollTrigger.batch, part of the 3-card stagger group):
- Card fades in + translates up from `y: 24` | `duration: 600ms` | `ease: "back.out(1.7)"` (overshoot for polish)
- Stagger: `150ms` gap between each card in the batch (Website enters first, Chat second, Voice third on desktop)
- Feature list items stagger in with 60ms delay between each item | `duration: 300ms` each | `opacity: 0` to `1`

**3D tilt on hover** (desktop only, `@media (hover: hover)`):

- `mousemove` calculates `rotateX` / `rotateY` based on cursor position relative to card center (max 8 degrees)
- `transformPerspective: 1000`
- On mouse leave: card returns to `rotateX(0)` / `rotateY(0)` with `ease: "elastic.out(1, 0.3)"` over `600ms`

**Glassmorphism**:

- `background: rgba(255, 255, 255, 0.03)`
- `backdrop-filter: blur(20px)`
- `-webkit-backdrop-filter: blur(20px)`
- These replace the current `background: var(--color-surface)` on the card

**Reduced motion**: All animations wrapped in `gsap.matchMedia("(prefers-reduced-motion: no-preference)")`. 3D tilt is disabled entirely when reduced motion is preferred. See `00_master_spec.md` Section 12.7.

### Mobile Layout (< 768px)

- Card: `padding: var(--space-lg)` (32px) | `border-radius: var(--radius-md)` (12px)
- `max-width: 100%` (flush with container, accounting for side padding)
- Pricing subtext stacks vertically instead of using `|` separator
- Feature text: `font-size: var(--text-sm)`
- On mobile, this card appears THIRD (after Voice and Chat). See Section 5 mobile notes for reordering logic.
- 3D tilt is disabled on mobile (touch devices do not support hover)

### Psychology Note
**Foot-in-the-Door Effect**: The website-only tier exists primarily as an entry point. At $27/mo with a $47 setup fee, the commitment is extremely low. Once the client has a website and a relationship with Fluis.ai, the upsell to agents becomes natural. The cross-sell hint at the bottom of the card plants the seed without being aggressive. Studies show that people who agree to a small request are significantly more likely to agree to a larger one later. The website is the small request.

---

## Section 4: Chat Agent Service Card

### Semantic HTML
```html
<section id="chat" class="service-card service-card--chat" aria-label="Chat Intelligence service">
```

### Purpose
Present the budget-friendly AI agent option. This card must feel like a real upgrade from the website-only card (it includes a FREE website, customer management dashboard, and automations) while also being positioned as the "economical" choice next to Voice. The Decoy Effect is at play: Chat exists partly to make Voice look like the obvious better value.

### Exact Copy

**Label**:
```
CHAT INTELLIGENCE
```

**Badge** (positioned top-right of card or inline with label):
```
Includes free website
```

**Budget Badge** (secondary badge, positioned inline after "Includes free website"):
```
Best Value for Budget-Conscious Businesses
```

**Headline**:
```
Capture Leads Where They Scroll.
```
(This headline comes directly from the knowledge base and is confirmed copy.)

**Body**:
```
Your website captures leads 24/7 -- even at 2 AM on a Sunday. An AI
chat agent greets every visitor, answers their questions, and books
appointments on the spot. No more missed enquiries. No more leads
going to your competitor because nobody replied.

All the intelligence of AI-powered lead capture -- at a price that
works for businesses just getting started.
```

> **Positioning note**: Chat is positioned as the accessible entry point, not the inferior option. The language should make budget-conscious buyers feel smart, not cheap. The "Best Value" badge and the "just getting started" copy frame this as a savvy business decision rather than a compromise.

**Feature List** (6 items with checkmark icons):
```
AI chat agent on your website -- always on, always ready
Free professional website and hosting included
Customer management dashboard -- every lead captured and organized automatically
Automated follow-ups -- booking confirmations, reminders, and more
Lead qualification -- only real prospects reach your calendar
24/7 coverage -- nights, weekends, bank holidays
```

**CRM Automations Included**:

Intro line:
```
Your customer journey is automated from first contact to job completion.
```

Automation list (5 items, displayed as bullet points with checkmark icons):
```
Booking confirmation when customer books appointment
Staff arrival notification
Job lost after inspection follow-up
Job secured confirmation
Job complete follow-up
```

> **Implementation note**: These automations prove the "done for you" claim with specific, tangible deliverables. Non-tech visitors can visualize exactly what they are getting. Display these as a compact sub-list within the card, visually grouped under the "CRM Automations Included" label. Label styling: `font-size: var(--text-sm)` | `font-weight: 700` | `color: var(--color-text)`. Bullet items: `font-size: var(--text-sm)` | `color: var(--color-text-muted)`.

**"What's Included" Expandable Section**:
This is a `<details>` / `<summary>` block that expands to show the full inclusion list. Collapsed by default to keep the card clean.

Summary text:
```
See everything that's included
```

Expanded content:
```
Your Chat Intelligence package includes:

Website & Hosting
  -- Professional website designed for your business
  -- Hosting and maintenance included
  -- Custom domain setup
  -- Mobile responsive

AI Chat Agent
  -- Embedded chat widget on your website
  -- AI-powered conversations (not a scripted chatbot)
  -- Trained on your business, services, and pricing
  -- Lead qualification and scoring
  -- Appointment booking directly from chat

Your Dashboard & Automations
  -- Customer management dashboard setup (contacts, pipeline, calendar)
  -- Booking confirmation sent automatically
  -- Staff arrival notification
  -- Follow-up if job lost after inspection
  -- Confirmation when job secured
  -- Follow-up after job completion
  -- Lead tracking and reporting

Coming Soon
  -- Instagram DMs (small add-on)
  -- Facebook Messenger (small add-on)
```

**Trial Badge** (small pill near pricing):
```
7-day free trial
```

**Pricing**:
```
$147/month
```
Subtext:
```
$197 one-time setup fee (fully refundable during trial)
```

**Daily Cost Callout** (small text under pricing, using Mental Accounting):
```
That's less than $5 a day.
```

**CTA**: "Start Free Trial" -- standard button, NOT accent-colored. Reserve accent styling for the Voice card.
- Button style: `background: transparent` | `border: 1px solid var(--color-text-muted)` | `color: var(--color-text)` | `border-radius: var(--radius-full)` | `padding: var(--space-xs) var(--space-lg)`
- Hover: `border-color: var(--color-text)` | `background: rgba(255, 255, 255, 0.05)`

### Design Specification

**Card Layout**:
- `background: var(--color-surface)` (#141414)
- `border: 1px solid var(--color-border)`
- `border-radius: var(--radius-lg)` (16px)
- `padding: var(--space-xl)` (48px)
- `max-width: 720px`
- Centered within container

**Badge Styling** ("Includes free website"):
- `background: var(--color-surface-2)` (#1e1e1e)
- `color: var(--color-text-muted)`
- `font-size: var(--text-xs)`
- `font-weight: 600`
- `padding: 4px 12px`
- `border-radius: var(--radius-full)`
- `display: inline-block`
- Position: inline after label, or top-right corner of card

**Budget Badge Styling** ("Best Value for Budget-Conscious Businesses"):
- `background: var(--color-surface-2)` (#1e1e1e)
- `border: 1px solid var(--color-border)`
- `color: var(--color-text-muted)`
- `font-size: var(--text-xs)`
- `font-weight: 600`
- `padding: 4px 12px`
- `border-radius: var(--radius-full)`
- `display: inline-block`
- Position: inline after "Includes free website" badge, or below it on mobile

**Trial Badge Styling**:
- `background: var(--color-surface-2)`
- `color: var(--color-text)`
- `font-size: var(--text-xs)`
- `font-weight: 600`
- `padding: 4px 12px`
- `border-radius: var(--radius-full)`
- Position: inline next to pricing or directly below it

**Typography**:
- Label: `font-size: var(--text-xs)` | `font-weight: 600` | `letter-spacing: 0.1em` | `text-transform: uppercase` | `color: var(--color-text-dim)`
- Headline: `font-size: var(--text-lg)` | `font-weight: 700` | `color: var(--color-text)`
- Body: `font-size: var(--text-base)` | `color: var(--color-text-muted)` | `line-height: 1.6`
- Feature items: `font-size: var(--text-sm)` | `color: var(--color-text-muted)`
- Pricing: `font-family: var(--font-mono)` | `font-size: var(--text-xl)` | `font-weight: 700` | `color: var(--color-text)`
- Pricing subtext: `font-size: var(--text-xs)` | `color: var(--color-text-dim)`
- Daily cost callout: `font-family: var(--font-mono)` | `font-size: var(--text-sm)` | `color: var(--color-text-muted)`

**Expandable Section Styling**:
- `<summary>`: `font-size: var(--text-sm)` | `font-weight: 600` | `color: var(--color-text-muted)` | `cursor: pointer` | `padding: var(--space-sm) 0`
- `<summary>` hover: `color: var(--color-text)`
- Expanded content: `padding: var(--space-sm) 0 var(--space-md)` | `font-size: var(--text-sm)` | `color: var(--color-text-dim)` | `line-height: 1.6`
- Sub-headers within expanded content ("Website & Hosting", "AI Chat Agent", etc.): `font-weight: 600` | `color: var(--color-text-muted)` | `margin-top: var(--space-sm)`
- Individual items: prefixed with `--` (em dash), `padding-left: var(--space-sm)`

**Feature List Icons**:
- Checkmark icon: `16px` | `color: var(--color-text-dim)` -- NOT red (same as website card)

**Hover State**:
- Card: `border-color: var(--color-border-hover)`
- Transition: `border-color 200ms var(--ease-default)`

**Spacing within card**:
- Label + badge row: `gap: var(--space-sm)` (16px) between label and badge
- Label to headline: `var(--space-sm)` (16px)
- Headline to body: `var(--space-sm)` (16px)
- Body to feature list: `var(--space-md)` (24px)
- Feature list to expandable section: `var(--space-md)` (24px)
- Expandable section to pricing block: `var(--space-lg)` (32px)
- Pricing to trial badge: `var(--space-xs)` (8px)
- Trial badge to daily cost: `var(--space-xs)` (8px)
- Pricing block to CTA: `var(--space-md)` (24px)

**Section Spacing**:
- Section padding: `var(--space-2xl) var(--space-lg)` (64px top, 96px would be too much gap between consecutive service cards)
- Background: `var(--color-bg)` (#0a0a0a)

### Animation Specification

> **Note**: This card is part of the 3-card ScrollTrigger.batch group. See the Voice card (Section 5) for batch configuration.

**Card entrance** (ScrollTrigger.batch, part of the 3-card stagger group):

- Card fades in + translates up from `y: 24` | `duration: 600ms` | `ease: "back.out(1.7)"`
- Stagger: enters `150ms` after the Website card in the batch sequence
- Badge has a subtle pop-in: `scale(0.8)` to `scale(1)` | `delay: 300ms` after card entrance | `duration: 300ms` | `ease: "back.out(1.7)"`
- Feature list items stagger: 60ms intervals | `duration: 300ms` each

**3D tilt on hover** (desktop only, `@media (hover: hover)`):

- Same as Website card: `mousemove` calculates `rotateX` / `rotateY` (max 8 degrees), `transformPerspective: 1000`
- On mouse leave: `ease: "elastic.out(1, 0.3)"` over `600ms`

**Glassmorphism**:

- `background: rgba(255, 255, 255, 0.03)`
- `backdrop-filter: blur(20px)`
- `-webkit-backdrop-filter: blur(20px)`

**Expandable section**: On open, content slides down with GSAP `max-height` tween (0 to calculated height) | `duration: 300ms` | `ease: "power2.out"`. No animation on close (instant collapse feels snappier).

**Reduced motion**: All animations wrapped in `gsap.matchMedia("(prefers-reduced-motion: no-preference)")`. 3D tilt disabled. Expandable section still functions but without transition. See `00_master_spec.md` Section 12.7.

### Mobile Layout (< 768px)

- Card: `padding: var(--space-lg)` (32px)
- Badge and label stack vertically (badge below label) instead of side-by-side
- Pricing and trial badge stack vertically
- CTA button: `width: 100%`
- On mobile, this card appears SECOND (after Voice, before Website). See Section 5 mobile notes.
- 3D tilt is disabled on mobile (touch devices do not support hover)

### Psychology Note
**Reciprocity**: The card emphasizes free inclusions (free website, free dashboard setup, free automations). When people receive something for free, they feel a psychological obligation to reciprocate -- in this case, by signing up. The "What's Included" expandable section exists specifically for this purpose: once expanded, the sheer volume of included items creates a feeling of overwhelming value.

**Mental Accounting**: "$147/month" sounds like a lot. "$5 a day" does not. By reframing the monthly cost as a daily figure, we move it into a mental category of small daily expenses (a coffee, a sandwich) rather than monthly business overhead. This is one of the most effective pricing psychology techniques available.

---

## Section 5: Voice Agent Service Card (Highlighted)

### Semantic HTML
```html
<section id="voice" class="service-card service-card--voice service-card--recommended" aria-label="Voice Intelligence service - recommended">
```

### Purpose
This is the STAR of the page. The card that must draw the eye, dominate the visual hierarchy, and make the decision feel obvious. Voice Agent is the recommended product. It does everything Chat does but better. The card must communicate: "This is the one you want."

### Exact Copy

**Label**:
```
VOICE INTELLIGENCE
```

**"Recommended" Badge** (top-right of card, or inline with label):
```
Recommended
```

**"Includes Free Website" Badge** (secondary badge):
```
Includes free website
```

**Headline**:
```
Let Your Website Talk to Your Customers.
```
(This headline comes directly from the knowledge base and is confirmed copy.)

**Body**:
```
Your customers don't want to type. They want to talk. Our voice agent
greets website visitors with a natural conversation -- breath pauses,
natural pacing, responses in under half a second. It sounds so real that
most people don't realise they're speaking to AI.

And it doesn't stop at your website. You get a dedicated phone number
with call forwarding. When you can't pick up, the AI answers. Same
agent, same intelligence, same result: a booked appointment in your
calendar.

It does everything chat does. But better.
```

**Feature List** (7 items with checkmark icons):
```
Voice AI agent on your website -- click to talk, not type
Dedicated phone number with call forwarding included
Natural conversation with sub-second response time
Free professional website and hosting included
Customer management dashboard -- every lead captured and organized automatically
Automated follow-ups -- booking confirmations, reminders, and more
24/7 coverage -- nights, weekends, bank holidays
```

**CRM Automations Included**:

Intro line:
```
Your customer journey is automated from first contact to job completion.
```

Automation list (5 items, displayed as bullet points with checkmark icons):
```
Booking confirmation when customer books appointment
Staff arrival notification
Job lost after inspection follow-up
Job secured confirmation
Job complete follow-up
```

> **Implementation note**: These automations prove the "done for you" claim with specific, tangible deliverables. Non-tech visitors can visualize exactly what they are getting. Display these as a compact sub-list within the card, visually grouped under the "CRM Automations Included" label. Label styling: `font-size: var(--text-sm)` | `font-weight: 700` | `color: var(--color-accent)` (red for the Voice card, matching its accent treatment). Bullet items: `font-size: var(--text-sm)` | `color: var(--color-text-muted)`.

**"Try It Right Now" Secondary CTA** (positioned between features and pricing):
```
Try It Right Now
```
Small supporting text below:
```
Click the voice bubble in the corner. That's the product.
```

This triggers the live voice bubble widget on the Fluis.ai website. The visitor experiences the product firsthand. This is the Endowment Effect in action: once they hear the agent talk to them, they don't want to give it up.

**"What's Included" Expandable Section**:
Same `<details>` / `<summary>` pattern as Chat card.

Summary text:
```
See everything that's included
```

Expanded content:
```
Your Voice Intelligence package includes:

Website & Hosting
  -- Professional website designed for your business
  -- Hosting and maintenance included
  -- Custom domain setup
  -- Mobile responsive

AI Voice Agent
  -- Floating voice bubble on your website (unique, branded design)
  -- Dedicated phone number (we set it up for you)
  -- Call forwarding from your existing number -- you don't change anything
  -- Natural voice with breath pauses and sub-second response
  -- AI-powered conversations trained on your business
  -- Lead qualification and scoring
  -- Appointment booking directly from voice conversation

Your Dashboard & Automations
  -- Customer management dashboard setup (contacts, pipeline, calendar)
  -- Booking confirmation sent automatically
  -- Staff arrival notification
  -- Follow-up if job lost after inspection
  -- Confirmation when job secured
  -- Follow-up after job completion
  -- Lead tracking and reporting

Coming Soon
  -- Instagram DMs (small add-on)
  -- Facebook Messenger (small add-on)
```

**Trial Badge**:
```
7-day free trial
```

**Pricing**:
```
$247/month
```
Subtext:
```
$297 one-time setup fee (fully refundable during trial)
```

**Daily Cost Callout**:
```
That's about $8 a day.
```

**Anchoring Callout** (visually distinct block below pricing, before CTA):
```
A full-time receptionist costs $40,000 a year.
Our voice agent: $247 a month.
```
This is styled as a separate callout block within the card:
- `background: var(--color-surface-2)` (#1e1e1e)
- `border-radius: var(--radius-md)` (12px)
- `padding: var(--space-md)` (24px)
- `text-align: center`
- First line: `font-size: var(--text-sm)` | `color: var(--color-text-dim)` | `text-decoration: line-through` (the $40k is crossed out -- visual anchoring)
- Second line: `font-size: var(--text-base)` | `font-weight: 700` | `color: var(--color-text)`
- The "$247 a month" portion uses `color: var(--color-accent)` (#ff3b30) for emphasis

**Primary CTA**: "Start Free Trial" -- ACCENT-colored button (this is the only service card with a red CTA button).
- `background: var(--color-accent)` (#ff3b30)
- `color: #ffffff`
- `border: none`
- `border-radius: var(--radius-full)`
- `padding: var(--space-sm) var(--space-xl)` (16px 48px)
- `font-size: var(--text-base)`
- `font-weight: 600`
- `cursor: pointer`
- Hover: `background: var(--color-accent-hover)` (#ff5147) | `box-shadow: var(--shadow-glow)` (0 0 30px rgba(255, 59, 48, 0.15))
- Transition: `background 200ms var(--ease-default), box-shadow 300ms var(--ease-default)`

### Design Specification

**Card Layout -- VISUALLY DOMINANT**:
This card must be visually distinguished from all other cards on the page. Three techniques are used:

1. **Accent Border**:
   - `border: 1.5px solid var(--color-accent)` (#ff3b30) -- NOT the standard `var(--color-border)`
   - This immediately signals "this one is different"

2. **Slight Elevation**:
   - On desktop, the card is slightly wider than the Chat and Website cards: `max-width: 760px` (vs. 720px for others)
   - `box-shadow: var(--shadow-glow)` (0 0 30px rgba(255, 59, 48, 0.15)) -- a very subtle red glow around the card, barely perceptible, creating a sense of warmth and prominence

3. **Background Differentiation**:
   - `background: var(--color-surface)` (#141414) same as other cards, BUT with a very subtle inner gradient: `linear-gradient(180deg, rgba(255, 59, 48, 0.02) 0%, transparent 30%)` -- the faintest red wash at the top of the card. Invisible on most screens but creates a subconscious sense of "specialness."

**Full Card Styling**:
- `border: 1.5px solid var(--color-accent)`
- `border-radius: var(--radius-lg)` (16px)
- `padding: var(--space-xl)` (48px)
- `max-width: 760px`
- `position: relative` (for badge positioning)
- Centered within container

**"Recommended" Badge Styling**:
- `position: absolute` | `top: -12px` | `right: var(--space-lg)` (or centered at top)
- `background: var(--color-accent)` (#ff3b30)
- `color: #ffffff`
- `font-size: var(--text-xs)`
- `font-weight: 700`
- `letter-spacing: 0.05em`
- `text-transform: uppercase`
- `padding: 6px 16px`
- `border-radius: var(--radius-full)`

**"Includes Free Website" Badge**:
- Same styling as the Chat card badge (surface-2 bg, neutral colors)
- Position: inline with label

**Typography**:
- Label: `font-size: var(--text-xs)` | `font-weight: 600` | `letter-spacing: 0.1em` | `text-transform: uppercase` | `color: var(--color-accent)` (#ff3b30) -- NOTE: label uses accent color here, unlike other cards where it is dim
- Headline: `font-size: var(--text-xl)` | `font-weight: 700` | `color: var(--color-text)` | `line-height: 1.15` -- NOTE: larger than other cards (--text-xl vs --text-lg)
- Body: `font-size: var(--text-base)` | `color: var(--color-text-muted)` | `line-height: 1.6`
- Feature items: `font-size: var(--text-sm)` | `color: var(--color-text-muted)`
- Pricing: `font-family: var(--font-mono)` | `font-size: var(--text-xl)` | `font-weight: 700` | `color: var(--color-text)`
- Pricing subtext: `font-size: var(--text-xs)` | `color: var(--color-text-dim)`
- Daily cost: `font-family: var(--font-mono)` | `font-size: var(--text-sm)` | `color: var(--color-text-muted)`

**Feature List Icons**:
- Checkmark icon: `16px` | `color: var(--color-accent)` (#ff3b30) -- RED checkmarks for the recommended card (all other cards use dim/grey checkmarks)

**"Try It Right Now" Button Styling**:
- `background: transparent`
- `border: 1px solid var(--color-accent)`
- `color: var(--color-accent)`
- `border-radius: var(--radius-full)`
- `padding: var(--space-xs) var(--space-md)` (8px 24px)
- `font-size: var(--text-sm)`
- `font-weight: 600`
- `cursor: pointer`
- Hover: `background: rgba(255, 59, 48, 0.08)`
- This button triggers the Fluis.ai live voice bubble widget. Implementation: `onclick` event that opens or activates the floating voice widget.
- Supporting text below: `font-size: var(--text-xs)` | `color: var(--color-text-dim)` | `margin-top: 6px`

**Hover State (Card)**:
- `border-color: var(--color-accent-hover)` (#ff5147)
- `box-shadow: 0 0 40px rgba(255, 59, 48, 0.2)` (glow intensifies slightly)
- Transition: `border-color 200ms var(--ease-default), box-shadow 300ms var(--ease-default)`

**Spacing within card**:
- Label + badges row: `gap: var(--space-sm)` between elements
- Label to headline: `var(--space-md)` (24px) -- slightly more than other cards for breathing room
- Headline to body: `var(--space-sm)` (16px)
- Body to feature list: `var(--space-md)` (24px)
- Feature list to "Try It Right Now": `var(--space-lg)` (32px)
- "Try It Right Now" to expandable section: `var(--space-md)` (24px)
- Expandable section to pricing block: `var(--space-lg)` (32px)
- Pricing to daily cost: `var(--space-xs)` (8px)
- Daily cost to anchoring callout: `var(--space-md)` (24px)
- Anchoring callout to trial badge: `var(--space-md)` (24px)
- Trial badge to CTA button: `var(--space-md)` (24px)

**Section Spacing**:
- Section padding: `var(--space-2xl) var(--space-lg)` (64px top/bottom)
- Background: `var(--color-bg)` (#0a0a0a)

### Animation Specification

> **ScrollTrigger.batch configuration** (applies to all 3 service cards): All three service cards (Website, Chat, Voice) are observed as a single `ScrollTrigger.batch` group for performance. A single ScrollTrigger instance watches all `.service-card` elements. Batch config: `interval: 0.1` | `batchMax: 3` | stagger `150ms` between cards. Each card enters with `y: 24` | `opacity: 0` → `y: 0` | `opacity: 1` | `ease: "back.out(1.7)"`.

**Voice card entrance** (special treatment — slower, more dramatic):

1. Card fades in + translates up from `y: 30` | `duration: 700ms` (vs 600ms for other cards — slower for emphasis) | `ease: "back.out(1.7)"`
2. **Red glow pulse** fires ONCE on arrival (not looping): `box-shadow` animates from `0 0 30px rgba(255, 59, 48, 0.15)` to `0 0 50px rgba(255, 59, 48, 0.25)` and back | `duration: 1200ms` | `ease: "power2.inOut"` | `once: true`
3. **"Recommended" badge** scales in from `scale(0)` to `scale(1)` with `ease: "back.out(1.7)"` overshoot | `delay: 300ms` after card entrance | `duration: 400ms`
4. Feature list items stagger in: 60ms intervals | `duration: 300ms` each | starts `400ms` after card entrance
5. Anchoring callout fades in: `delay: 800ms` | `duration: 400ms` — the "$40,000" line appears first, then 200ms later the "$247" line reveals. This creates a micro-narrative of comparison.

**3D tilt on hover** (desktop only, `@media (hover: hover)`):

- Same as other service cards: `mousemove` calculates `rotateX` / `rotateY` (max 8 degrees), `transformPerspective: 1000`
- On mouse leave: `ease: "elastic.out(1, 0.3)"` over `600ms`

**Glassmorphism**:

- `background: rgba(255, 255, 255, 0.03)`
- `backdrop-filter: blur(20px)`
- `-webkit-backdrop-filter: blur(20px)`
- Combined with the existing accent border and subtle inner gradient for the Voice card

**"Try It Right Now" button**: On hover, a CSS-only border color oscillation between `var(--color-accent)` and `var(--color-accent-hover)` using `@keyframes`. The animation runs only while `:hover` is active and stops when the mouse leaves. Duration: `1.5s` cycle. Implementation:

```css
@keyframes tryit-border-pulse {
  0%, 100% { border-color: var(--color-accent); }
  50% { border-color: var(--color-accent-hover); }
}

.service-card--voice .btn-try-it:hover {
  animation: tryit-border-pulse 1.5s ease-in-out infinite;
}
```

**Reduced motion**: All animations wrapped in `gsap.matchMedia("(prefers-reduced-motion: no-preference)")`. 3D tilt, glow pulse, and badge scale-in are all disabled. Border pulse animation is suppressed via `@media (prefers-reduced-motion: reduce) { animation: none; }`. See `00_master_spec.md` Section 12.7.

### Mobile Layout (< 768px)

**CRITICAL: This card appears FIRST on mobile.**

On mobile, the service cards reorder:
1. Voice Agent (this card) -- FIRST
2. Chat Agent -- SECOND
3. Website & Hosting -- THIRD

Implementation: Use CSS `order` property within a flex container or CSS Grid with `order` values. The parent container wrapping all three service cards gets `display: flex` | `flex-direction: column`. On mobile:
```css
@media (max-width: 767px) {
  .service-card--voice { order: 1; }
  .service-card--chat { order: 2; }
  .service-card--website { order: 3; }
}
```

**Mobile-specific styling**:
- Card: `padding: var(--space-lg)` (32px)
- `max-width: 100%`
- Badges stack vertically below label
- Pricing and trial badge stack vertically
- CTA button: `width: 100%`
- "Try It Right Now" button: `width: 100%`
- Anchoring callout: full width, stacked text (not side-by-side)
- The accent border and subtle glow remain on mobile -- the card should still feel dominant

### Psychology Note

**Decoy Effect**: Chat Agent ($147/mo) exists partly to make Voice Agent ($247/mo) look like the obvious better choice. For $100 more per month, the customer gets voice capabilities, a dedicated phone number, call forwarding, and a fundamentally better user experience. The comparison is deliberately lopsided. When presented with three options, people tend to choose the middle-to-high option, especially when the value difference is clear.

**Anchoring**: "$40,000/year for a receptionist vs. $247/month for our agent" is a classic anchoring technique. By presenting the high number first, the $247 price feels trivially small in comparison. The strikethrough styling on "$40,000" reinforces the visual narrative: "The expensive option is crossed out. This is the smart choice."

**Endowment Effect**: "Try It Right Now" triggers the live voice demo. Research shows that once people experience something -- even briefly -- they value it more than before they tried it. A visitor who hears the voice agent respond to them on the Fluis.ai website is far more likely to sign up than one who merely reads about it. The demo is not a feature; it is a conversion mechanism.

**Social Proof via Design**: The "Recommended" badge and accent-colored card serve as implicit social proof. Even without testimonials, the visual treatment says: "Most people choose this one." This is a design-as-persuasion technique -- no words needed, the styling does the selling.

---

## Section 5b: How We're Different

### Semantic HTML
```html
<section id="why-fluis" class="competitive-comparison" aria-label="How Fluis.ai compares to alternatives">
```

### Purpose
After viewing all three service cards, some visitors will wonder: "How is this different from other solutions?" This section preempts that question with a direct competitive comparison. It surfaces 6 differentiators that were previously absent from the website and positions Fluis.ai as the clearly superior option across every dimension.

### Exact Copy

**Headline**:
```
How We're Different
```

**Comparison Table**:

| | DIY Platforms | SaaS Tools | Traditional Agencies | Fluis.ai |
|--|--|--|--|--|
| **Setup** | You build it | You configure it | They build it (weeks) | We build it (3 days) |
| **Guarantee** | None | None | None | RAAS -- no results, no charge |
| **Website** | Extra cost | Extra cost | Extra cost | Included free |
| **CRM & automations** | Not included | Sometimes | Extra cost | Always included |
| **Contract** | Monthly | Annual | 6-12 months | Month-to-month |
| **Setup fee** | None | None | Thousands | $197-$297 (refundable) |

> **Source note**: This comparison table sources from `market.yaml` competitive_advantages. It surfaces 6 differentiators that were previously absent from the website.

### Design Specification

**Layout**:
- `max-width: var(--max-width)` (1200px), centered
- Section padding: `var(--space-2xl) var(--space-lg)` (64px top/bottom)
- Background: `var(--color-bg)` (#0a0a0a)

**Headline**:
- `font-size: var(--text-lg)` | `font-weight: 700` | `color: var(--color-text)` | `text-align: center`
- `margin-bottom: var(--space-xl)` (48px)

**Table Styling**:
- `width: 100%` | `border-collapse: separate` | `border-spacing: 0`
- Header row: `background: var(--color-surface)` | `font-size: var(--text-sm)` | `font-weight: 700` | `color: var(--color-text-muted)`
- Body rows: alternating `transparent` and `rgba(255, 255, 255, 0.02)`
- `border-bottom: 1px solid var(--color-border)` on each row
- Fluis.ai column: `background: rgba(255, 59, 48, 0.03)` | header cell: `color: var(--color-accent)` | `border-top: 2px solid var(--color-accent)` -- same highlight treatment as the service comparison table
- Feature name cells: `font-size: var(--text-sm)` | `font-weight: 600` | `color: var(--color-text-muted)`
- Value cells: `font-size: var(--text-sm)` | `color: var(--color-text-dim)` | `text-align: center`
- Fluis.ai value cells: `color: var(--color-text)` | `font-weight: 600` -- values in the Fluis column stand out

### Animation Specification

**Headline — ScrollTrigger entrance**:

- Headline fades in + translates up | `duration: 500ms` | `ease: "expo.out"` | ScrollTrigger `start: "top 80%"`

**Table rows — ScrollTrigger.batch row-by-row reveal**:

- Rows stagger in from top with `50ms` intervals between each row
- Each row: `opacity: 0` to `1` | `y: 8` to `0` | `duration: 300ms` | `ease: "power2.out"`
- ScrollTrigger.batch config: `interval: 0.05` | observes all `<tr>` elements within the table body
- **Fluis.ai column highlight**: The rightmost column (Fluis.ai) has a faint red background: `rgba(255, 59, 48, 0.03)` — consistent with the Voice column highlight used in the service comparison table (Section 6)

**Reduced motion**: All animations wrapped in `gsap.matchMedia("(prefers-reduced-motion: no-preference)")`. All rows visible immediately when reduced motion is preferred. See `00_master_spec.md` Section 12.7.

### Mobile Layout (< 768px)

- Table scrolls horizontally with `overflow-x: auto` on the container
- Alternatively: stack as cards per competitor (developer choice)
- First column (feature names) stays sticky: `position: sticky` | `left: 0` | `background: var(--color-bg)`
- Section padding: `var(--space-2xl) var(--space-sm)`

### Psychology Note
**Contrast Effect**: When presented alongside weaker alternatives, Fluis.ai's offering looks dramatically better. The table is structured so that every row ends with Fluis.ai's advantage in the rightmost column -- the reader's eye naturally lands there last, creating a cumulative impression of superiority. The "None / None / None / RAAS" row for guarantees is particularly powerful: it makes competitors look indifferent to results.

---

## Section 6: Comparison Table

### Semantic HTML
```html
<section id="comparison" class="comparison-table" aria-label="Service comparison table">
  <details>
    <summary>Compare all services side by side</summary>
    <div class="comparison-table__content">
      <!-- Table or grid here -->
    </div>
  </details>
</section>
```

### Purpose
For detail-oriented visitors who want a feature-by-feature breakdown before making a decision. This section is collapsed by default (using `<details>/<summary>`) because most visitors make decisions based on the service cards above. The table is a safety net for analytical buyers who need to see every checkbox before proceeding.

### Exact Copy

**Section Headline**:
```
Compare Services
```

**Summary (clickable to expand)**:
```
Compare all services side by side
```

### Table Content

**3 Columns**: Website | Chat | Voice

**Voice column is highlighted** with a subtle accent background: `background: rgba(255, 59, 48, 0.03)` and a "Recommended" label at the top of the column.

**Feature Groups and Rows**:

**Group: Core**

| Feature | Website | Chat | Voice |
|---------|---------|------|-------|
| Professional website | Yes | Yes | Yes |
| Hosting included | Yes | Yes | Yes |
| Custom domain | Yes | Yes | Yes |
| Mobile responsive | Yes | Yes | Yes |
| Basic SEO | Yes | Yes | Yes |
| AI-assisted content writing | Yes | Yes | Yes |

**Group: AI Capabilities**

| Feature | Website | Chat | Voice |
|---------|---------|------|-------|
| AI chat widget | -- | Yes | -- |
| AI voice widget | -- | -- | Yes |
| Dedicated phone number | -- | -- | Yes |
| Call forwarding | -- | -- | Yes |
| 24/7 lead capture | -- | Yes | Yes |
| Lead qualification | -- | Yes | Yes |
| Appointment booking | -- | Yes | Yes |

**Group: Dashboard & Automations**

| Feature | Website | Chat | Voice |
|---------|---------|------|-------|
| Customer management dashboard | -- | Yes | Yes |
| Booking confirmation | -- | Yes | Yes |
| Staff arrival notification | -- | Yes | Yes |
| Job follow-ups | -- | Yes | Yes |
| Lead tracking & reporting | -- | Yes | Yes |

**Group: Support & Guarantee**

| Feature | Website | Chat | Voice |
|---------|---------|------|-------|
| 7-day free trial | -- | Yes | Yes |
| RAAS guarantee | -- | Yes | Yes |
| Setup fee refundable | -- | Yes | Yes |
| Month-to-month billing | Yes | Yes | Yes |
| No contracts | Yes | Yes | Yes |

**Column Footer (Pricing)**:

| | Website | Chat | Voice |
|---|---------|------|-------|
| Monthly | From $27/mo | $147/mo | $247/mo |
| Setup | $47 | $197 | $297 |
| CTA | See Pricing | Start Trial | Start Trial |

### Design Specification

**Container**:
- `max-width: var(--max-width)` (1200px), centered
- Section padding: `var(--space-2xl) var(--space-lg)` (64px top/bottom)
- Background: `var(--color-bg)` (#0a0a0a)

**Section Headline**:
- `font-size: var(--text-lg)` | `font-weight: 700` | `color: var(--color-text)` | `text-align: center`
- `margin-bottom: var(--space-lg)` (32px)

**`<summary>` Styling**:
- `font-size: var(--text-base)` | `font-weight: 600` | `color: var(--color-text-muted)` | `cursor: pointer` | `text-align: center`
- `padding: var(--space-md)` (24px)
- `border: 1px solid var(--color-border)` | `border-radius: var(--radius-md)` (12px)
- `background: var(--color-surface)` (#141414)
- Hover: `border-color: var(--color-border-hover)` | `color: var(--color-text)`
- Chevron indicator: `::marker` or custom SVG arrow that rotates 180deg on open
- Transition: `border-color 200ms var(--ease-default)`

**Table Styling**:
- `width: 100%` | `border-collapse: separate` | `border-spacing: 0`
- `margin-top: var(--space-lg)` (32px) inside the details content

**Table Header Row**:
- `background: var(--color-surface)` (#141414)
- `position: sticky` | `top: var(--header-height)` (sticks below nav when scrolling inside expanded table)
- Header cells: `font-size: var(--text-sm)` | `font-weight: 700` | `color: var(--color-text)` | `padding: var(--space-sm) var(--space-md)` | `text-align: center`
- Voice column header: `color: var(--color-accent)` with small "Recommended" text below service name

**Group Headers** (Core, AI Capabilities, Dashboard & Automations, Support & Guarantee):
- Full-width row spanning all columns
- `background: var(--color-surface-2)` (#1e1e1e)
- `font-size: var(--text-xs)` | `font-weight: 600` | `letter-spacing: 0.1em` | `text-transform: uppercase` | `color: var(--color-text-dim)`
- `padding: var(--space-xs) var(--space-md)`

**Table Body Rows**:
- Alternating: `background: transparent` and `background: rgba(255, 255, 255, 0.02)`
- `border-bottom: 1px solid var(--color-border)`
- Feature name cell: `font-size: var(--text-sm)` | `color: var(--color-text-muted)` | `text-align: left` | `padding: var(--space-sm) var(--space-md)`
- Value cells: `text-align: center` | `padding: var(--space-sm)`
- "Yes" indicator: checkmark icon, `color: var(--color-text-muted)` for Website and Chat columns, `color: var(--color-accent)` for Voice column
- "--" indicator: em dash, `color: var(--color-text-dim)` | `opacity: 0.5`

**Voice Column Highlight**:
- The entire Voice column has `background: rgba(255, 59, 48, 0.03)` -- a barely perceptible red tint that signals "this is the one"
- Voice column header cell has `border-top: 2px solid var(--color-accent)`

**Column Footer (Pricing Row)**:
- `background: var(--color-surface)` (#141414)
- `border-top: 2px solid var(--color-border)`
- Monthly price: `font-family: var(--font-mono)` | `font-size: var(--text-base)` | `font-weight: 700` | `color: var(--color-text)`
- Setup price: `font-size: var(--text-xs)` | `color: var(--color-text-dim)`
- CTA links: same styling as in their respective service cards

### Animation Specification

**On Expand** (`<details>` open — GSAP-controlled):

- Content slides down: GSAP tweens `max-height` from `0` to calculated height | `duration: 400ms` | `ease: "power2.out"`
- Table rows stagger in from top via ScrollTrigger.batch: `50ms` intervals | `opacity: 0` to `1` | `y: 8` to `0` | `duration: 200ms` each
- Chevron rotates: `transform: rotate(180deg)` | `duration: 300ms` | `ease: "power2.inOut"`
- **Voice column highlight**: The entire Voice column has `background: rgba(255, 59, 48, 0.03)` — consistent with the "How We're Different" table and pricing page

**On Collapse**:

- Instant collapse (no animation). Feels snappier than animating closure.

**Reduced motion**: All animations wrapped in `gsap.matchMedia("(prefers-reduced-motion: no-preference)")`. Expand/collapse still functions but without transitions. See `00_master_spec.md` Section 12.7.

### Mobile Layout (< 768px)

The table does not work well on mobile due to horizontal space constraints. Two approaches (developer chooses based on implementation preference):

**Approach A: Tabbed View**
- Three tabs at the top: "Website" | "Chat" | "Voice"
- Voice tab is pre-selected and has accent styling
- Each tab shows one column of features as a vertical list
- Tab bar: `display: flex` | `gap: 0` | pills with `border-radius: var(--radius-full)` | active tab: `background: var(--color-accent)` | `color: white`

**Approach B: Accordion per Service**
- Three collapsible sections, one per service
- Voice section is open by default
- Each section shows all features for that service in a vertical list

**RECOMMENDED: Approach A (Tabbed View)** -- tabs are more interactive, keep the comparison feeling, and the pre-selected Voice tab maintains the recommendation signal.

**Mobile-specific**:
- Section headline: `font-size: var(--text-base)`
- `<summary>` padding: `var(--space-sm)`
- Feature items: `font-size: var(--text-sm)`

### Psychology Note
The comparison table exploits **Feature Fatigue** in favour of Voice. When detail-oriented buyers see that Voice has every single feature that Chat has, plus more, for only $100/month more, the decision becomes obvious. The red checkmarks and column highlighting remove any remaining ambiguity about which option is recommended. The collapsed-by-default design ensures that only visitors who actively want detail will see the table -- preventing information overload for the majority who decide based on the service cards alone.

---

## Section 6b: The RAAS Guarantee

### Semantic HTML
```html
<section id="raas-guarantee" class="raas-callout" aria-label="Results as a Service guarantee">
```

### Purpose
This section mirrors the RAAS callout on the Pricing page to ensure visitors on the Services page also internalize the risk-free guarantee. By the time a visitor reaches this point, they have read through all three service tiers and seen the comparison table. Presenting the guarantee here reinforces that trying is zero-risk, right when the decision is being weighed.

### Exact Copy

**Headline**:
```
We Earn Our Fee Every Month — Or You Don't Pay It.
```

**Body**:
```
Every Chat Agent and Voice Agent subscription comes with our Results
as a Service guarantee. If our AI agent doesn't book a single
appointment for your business in a given month, you don't pay for
that month. No fine print. No exceptions.
```

**CTA**: "Start Your Free Trial" → links to `#book-call`

### Design Specification

**Layout**:
- Full-width section with `background: var(--color-surface)` (#141414)
- Content block: `max-width: 720px`, centered
- Left border accent: `border-left: 4px solid var(--color-accent)` (#ff3b30)
- `padding: var(--space-xl)` (48px) inside the content block

**Typography**:
- Headline: `font-size: var(--text-lg)` | `font-weight: 700` | `color: var(--color-text)` | `line-height: 1.2`
- Body: `font-size: var(--text-base)` | `font-weight: 400` | `color: var(--color-text-muted)` | `line-height: 1.6`

**CTA Button**:
- Same accent-colored button as the Voice card CTA:
  - `background: var(--color-accent)` (#ff3b30)
  - `color: #ffffff`
  - `border-radius: var(--radius-full)`
  - `padding: var(--space-sm) var(--space-xl)`
  - `font-weight: 600`
  - Hover: `background: var(--color-accent-hover)` | `box-shadow: var(--shadow-glow)`

**Spacing**:
- Section padding: `var(--space-2xl) var(--space-lg)` (64px top/bottom)
- Headline to body: `var(--space-sm)` (16px)
- Body to CTA: `var(--space-lg)` (32px)

### Animation Specification

**On Scroll Into View** (ScrollTrigger, `start: "top 80%"`):

1. Left border accent draws down from `height: 0` to full height | `duration: 400ms` | `ease: "expo.out"`
2. Headline fades in | `delay: 150ms` | `duration: 500ms` | `ease: "expo.out"`
3. Body fades in | `delay: 300ms` | `duration: 500ms`
4. CTA fades in | `delay: 450ms` | `duration: 400ms`
5. **Left accent border glow pulse** (one-shot on scroll reveal): After the card is fully visible, the left border pulses with the `@keyframes glowPulse` pattern — same as the pricing page RAAS callout:

```css
@keyframes glowPulse {
  0% { box-shadow: -4px 0 12px rgba(255, 59, 48, 0); }
  50% { box-shadow: -4px 0 20px rgba(255, 59, 48, 0.12); }
  100% { box-shadow: -4px 0 12px rgba(255, 59, 48, 0); }
}
```

   This fires once (`animation-iteration-count: 1`), triggered by adding a `.is-visible` class via ScrollTrigger `onEnter`. Duration: `1.5s`. Delay: `300ms` after scroll reveal.

**Reduced motion**: All animations wrapped in `gsap.matchMedia("(prefers-reduced-motion: no-preference)")`. Glow pulse is suppressed. All content visible immediately. See `00_master_spec.md` Section 12.7.

### Mobile Layout (< 768px)

- Content block: `padding: var(--space-lg)` (32px)
- `max-width: 100%`
- CTA button: `width: 100%`
- Section padding: `var(--space-2xl) var(--space-sm)`

### Scope Note
This callout does NOT apply to the Website-Only tier. Website hosting has no performance guarantee -- it is straightforward hosting. Only agent packages (Chat, Voice) carry the RAAS guarantee.

### Psychology Note
**Risk Reversal + Commitment & Consistency**: By the time visitors have read through all three services and the comparison table, they are cognitively invested. Presenting the RAAS guarantee at this exact moment exploits that investment -- the guarantee removes the last remaining objection ("What if it doesn't work?") precisely when the visitor is closest to deciding. This is also classic Risk Reversal: shifting the risk from buyer to seller makes the decision feel safe.

---

## Section 7: How It Works (Condensed)

### Semantic HTML
```html
<section id="how-it-works" class="how-it-works" aria-label="How it works">
```

### Purpose
A shorter version of the homepage 3-step process. After reading through all the services, the visitor might feel overwhelmed by the amount of information. This section resets the emotional state: "Don't worry. It's simple. Three steps." It reinforces the DFY (Done For You) promise and transitions into the closing CTA.

### Exact Copy

**Headline Options**:

**Option A**: "Three Steps. That's It."
- **Rationale**: Ultra-direct. The period after "That's It" creates finality and confidence. Implies extreme simplicity.

**Option B**: "How It Works"
- **Rationale**: Standard, expected. Visitors know exactly what this section is. Zero cognitive load.

**Option C**: "We Do the Work. You Get the Results."
- **Rationale**: DFY-focused. Reminds the visitor they don't have to do anything.

**RECOMMENDED: Option A -- "Three Steps. That's It."**

This works best because:
1. After dense service information, brevity is refreshing.
2. The confidence of "That's It." matches the brand voice -- direct, no fluff.
3. It pre-answers the objection "This sounds complicated."

**Steps**:

**Step 1**:
```
Book a Free Demo
We show you the website, the agent, and your dashboard. You try it yourself. 30 minutes, no pressure.
```

**Step 2**:
```
We Build Everything
Your website, your agent, your dashboard -- all set up in 3 days. You just tell us about your business.
```

**Step 3**:
```
Go Live With a Free Trial
Your AI agent starts working. 7-day free trial. No results? No charge.
```

**CTA after steps**:
```
Book a Free Demo
```

### Design Specification

**Layout**:
- `max-width: var(--max-width)` (1200px), centered
- Headline centered
- Steps displayed as a horizontal 3-column grid on desktop
- `gap: var(--space-xl)` (48px) between columns

**Background**:
- `background: var(--color-surface)` (#141414) -- elevated band to create visual distinction from the service cards above

**Typography**:
- Headline: `font-size: var(--text-xl)` | `font-weight: 700` | `color: var(--color-text)` | `text-align: center`
- Step number: `font-family: var(--font-mono)` | `font-size: var(--text-2xl)` | `font-weight: 800` | `color: var(--color-accent)` | `opacity: 0.3` -- large, faded, decorative
- Step title: `font-size: var(--text-base)` | `font-weight: 700` | `color: var(--color-text)` | `margin-top: var(--space-sm)`
- Step description: `font-size: var(--text-sm)` | `color: var(--color-text-muted)` | `line-height: 1.6` | `margin-top: var(--space-xs)`

**Step Card Styling**:
- No card background (transparent -- the section bg provides the surface)
- `text-align: center` (or left-aligned if preferred -- center works well for 3-column)
- Step number sits at the top of each column as a large decorative numeral

**CTA Button**:
- Centered below the steps grid
- Same accent-colored button as the Voice card CTA:
  - `background: var(--color-accent)` (#ff3b30)
  - `color: #ffffff`
  - `border-radius: var(--radius-full)`
  - `padding: var(--space-sm) var(--space-xl)`
  - `font-weight: 600`
  - Hover: `background: var(--color-accent-hover)` | `box-shadow: var(--shadow-glow)`
- `margin-top: var(--space-2xl)` (64px) from the steps grid

**Spacing**:
- Section padding: `var(--space-3xl) var(--space-lg)` (96px top/bottom)
- Headline to steps: `var(--space-2xl)` (64px)

### Animation Specification

**On Scroll Into View** (ScrollTrigger, `start: "top 75%"`):

1. Headline fades in + translates up from `y: 16` | `duration: 500ms` | `ease: "expo.out"` | `delay: 0`
2. Step 1 fades in + translates up from `y: 16` | `delay: 200ms` | `duration: 400ms` | `ease: "back.out(1.7)"`
3. Step 2 fades in + translates up from `y: 16` | `delay: 350ms` | `duration: 400ms` | `ease: "back.out(1.7)"`
4. Step 3 fades in + translates up from `y: 16` | `delay: 500ms` | `duration: 400ms` | `ease: "back.out(1.7)"`
5. CTA button fades in | `delay: 700ms` | `duration: 400ms`

**Reduced motion**: All animations wrapped in `gsap.matchMedia("(prefers-reduced-motion: no-preference)")`. All content visible immediately. See `00_master_spec.md` Section 12.7.

### Mobile Layout (< 768px)

- Steps stack vertically: single column, centered text
- Each step has a thin border-bottom: `1px solid var(--color-border)` to separate them visually
- Last step has no border-bottom
- `gap: var(--space-lg)` (32px) between steps
- Step number: `font-size: var(--text-xl)` (scaled down)
- CTA button: `width: 100%`
- Section padding: `var(--space-2xl) var(--space-sm)`

### Psychology Note
**Cognitive Reset**: After processing detailed service information, the visitor's cognitive load is high. This section acts as a mental palette cleanser. Three simple steps, plain language, no decisions to make. It answers the subconscious question: "Okay, this looks great, but what do I actually DO?" The answer is simple: book a demo. The DFY emphasis ("We build everything") removes the last barrier: "I don't have time to set this up." They don't have to. We do it for them.

---

## Section 8: Bottom CTA

### Semantic HTML
```html
<section id="bottom-cta" class="bottom-cta" aria-label="Get started">
```

### Purpose
The closing push. By this point, the visitor has seen every service, compared features, and understands the process. This section exists to convert that understanding into action. It offers two paths: the primary path (Book a Demo) and the secondary path (See Pricing) for visitors who want to compare numbers before committing.

### Exact Copy

**Headline**:
```
Ready to Make Your Website Talk?
```

**Subheadline**:
```
Book a free 30-minute demo. We'll show you everything, you try the
agent yourself, and if you like it -- we build it all in 3 days.
No contracts. No pressure. No charge if it doesn't work.
```

**Primary CTA**:
```
Book a Free Demo
```

**Secondary CTA**:
```
See Pricing
```

### Design Specification

**Layout**:
- Full-width section
- Content centered: `text-align: center`
- `max-width: 700px` for text block, centered
- Generous whitespace -- this section should feel spacious and calm

**Background**:
- `background: var(--color-bg)` (#0a0a0a)
- Optional: very subtle radial gradient centered: `radial-gradient(ellipse at 50% 50%, rgba(255, 59, 48, 0.04) 0%, transparent 60%)` -- a barely visible warm glow to draw the eye to center

**Typography**:
- Headline: `font-size: var(--text-xl)` | `font-weight: 700` | `color: var(--color-text)` | `line-height: 1.15`
- Subheadline: `font-size: var(--text-base)` | `color: var(--color-text-muted)` | `line-height: 1.6` | `max-width: 560px` | centered

**Primary CTA Button**:
- `background: var(--color-accent)` (#ff3b30)
- `color: #ffffff`
- `border: none`
- `border-radius: var(--radius-full)`
- `padding: var(--space-sm) var(--space-2xl)` (16px 64px) -- wider than normal for visual prominence
- `font-size: var(--text-base)`
- `font-weight: 600`
- Hover: `background: var(--color-accent-hover)` | `box-shadow: var(--shadow-glow)`
- Transition: `background 200ms var(--ease-default), box-shadow 300ms var(--ease-default)`

**Secondary CTA Link**:
- `font-size: var(--text-sm)`
- `font-weight: 600`
- `color: var(--color-text-muted)`
- `text-decoration: underline`
- Hover: `color: var(--color-text)`
- Links to `pricing.html`

**Spacing**:
- Section padding: `var(--space-3xl) var(--space-lg)` (96px top) | bottom padding: `var(--space-3xl)` + `var(--space-xl)` (144px) -- extra bottom space before the footer
- Headline to subheadline: `var(--space-md)` (24px)
- Subheadline to primary CTA: `var(--space-xl)` (48px)
- Primary CTA to secondary CTA: `var(--space-md)` (24px)

### Animation Specification

**On Scroll Into View** (ScrollTrigger, `start: "top 80%"`):

1. Headline fades in + translates up from `y: 20` | `duration: 600ms` | `ease: "expo.out"` | `delay: 0`
2. Subheadline fades in | `delay: 200ms` | `duration: 500ms` | `ease: "expo.out"`
3. Primary CTA fades in + scale entrance from `scale: 0.95` to `scale: 1` | `delay: 400ms` | `duration: 400ms` | `ease: "back.out(1.7)"`
4. Secondary CTA fades in | `delay: 550ms` | `duration: 300ms`

**Arrow hover animation**: The arrow (`&rarr;`) in "See Pricing" translates `translateX(4px)` on hover using GSAP `quickTo` or CSS transition.

**Reduced motion**: All animations wrapped in `gsap.matchMedia("(prefers-reduced-motion: no-preference)")`. All content visible immediately. See `00_master_spec.md` Section 12.7.

### Mobile Layout (< 768px)

- Headline: scales down via clamp (var(--text-xl))
- Subheadline: `font-size: var(--text-sm)`
- Primary CTA: `width: 100%` | `max-width: 320px`
- Secondary CTA: below primary with `var(--space-sm)` gap
- Section padding: `var(--space-2xl) var(--space-sm)` (64px top/bottom)

### Psychology Note
**Closure Effect**: After a long page of information, visitors experience decision fatigue. The Bottom CTA section provides closure -- a clear, simple action to take. The headline uses a question ("Ready to...?") which psychologically prompts an internal "yes" response. The subheadline immediately follows with the lowest-friction description possible: "30 minutes," "no contracts," "no pressure," "no charge if it doesn't work." Every word is chosen to reduce perceived risk. The two CTAs respect different decision-making styles: action-oriented visitors click "Book a Free Demo"; analytical visitors click "See Pricing" to do more research first. Both paths lead toward conversion.

---

## Global Design Tokens Reference

For convenience, here are the design tokens referenced throughout this spec. The canonical source is `/docs/fluis_design_tokens.md`.

```css
/* Colors */
--color-bg:           #0a0a0a;
--color-surface:      #141414;
--color-surface-2:    #1e1e1e;
--color-border:       rgba(255, 255, 255, 0.08);
--color-border-hover: rgba(255, 255, 255, 0.15);
--color-text:         #f5f5f5;
--color-text-muted:   #999999;
--color-text-dim:     #666666;
--color-accent:       #ff3b30;
--color-accent-hover: #ff5147;

/* Typography */
--font-sans: 'Inter', system-ui, -apple-system, sans-serif;
--font-mono: 'JetBrains Mono', ui-monospace, monospace;

/* Spacing (8px grid) */
--space-xs:  8px;
--space-sm:  16px;
--space-md:  24px;
--space-lg:  32px;
--space-xl:  48px;
--space-2xl: 64px;
--space-3xl: 96px;

/* Radius */
--radius-sm:   6px;
--radius-md:   12px;
--radius-lg:   16px;
--radius-full: 9999px;

/* Shadows */
--shadow-sm:   0 1px 3px rgba(0, 0, 0, 0.3);
--shadow-md:   0 4px 12px rgba(0, 0, 0, 0.4);
--shadow-lg:   0 12px 40px rgba(0, 0, 0, 0.5);
--shadow-glow: 0 0 30px rgba(255, 59, 48, 0.15);
```

---

## Responsive Breakpoints

| Breakpoint | Width | Notes |
|------------|-------|-------|
| Desktop | >= 1024px | Full layout, 3-column steps, horizontal flow diagram |
| Tablet | 768px -- 1023px | Cards at max-width, steps may go 2+1, flow diagram horizontal |
| Mobile | < 768px | Single column, reordered service cards (Voice first), vertical flow diagram, full-width CTAs |

**Service Card Order by Breakpoint**:
- Desktop: Website, Chat, Voice (ascending value, Voice visually dominant via design)
- Mobile: Voice, Chat, Website (recommended first, since mobile users scroll less)

---

## Accessibility Requirements

1. **Semantic HTML**: Every section uses the correct landmark (`<section>` with `aria-label`). Service cards use heading hierarchy: `<h2>` for section headlines, `<h3>` for service names.

2. **Color Contrast**: All text meets WCAG AA minimum (4.5:1 for body text, 3:1 for large text).
   - `#f5f5f5` on `#0a0a0a` = 18.1:1 (passes AAA)
   - `#999999` on `#0a0a0a` = 7.0:1 (passes AA)
   - `#666666` on `#0a0a0a` = 4.2:1 (passes AA for large text only -- use at `--text-xs` or larger with `font-weight: 600`)
   - `#ff3b30` on `#0a0a0a` = 4.6:1 (passes AA -- acceptable for accent elements, use bold weight for smaller sizes)
   - `#ffffff` on `#ff3b30` = 4.6:1 (passes AA -- white text on red buttons is fine)

3. **Focus States**: All interactive elements (buttons, links, `<summary>`) have visible focus outlines: `outline: 2px solid var(--color-accent)` | `outline-offset: 2px`. Never use `outline: none` without a replacement.

4. **Keyboard Navigation**: All expandable sections (`<details>/<summary>`) are keyboard-accessible natively. CTA buttons are `<button>` or `<a>` elements with proper `href`. Tab order follows visual order (on mobile, this matches the reordered card sequence via DOM order or `tabindex`).

5. **Screen Reader**: Service labels ("WEBSITE & HOSTING", "CHAT INTELLIGENCE", "VOICE INTELLIGENCE") are wrapped in `<span>` with proper heading hierarchy. Badge text ("Recommended", "Includes free website") is visible to screen readers. Checkmarks in feature lists have `aria-hidden="true"` with the feature text carrying the meaning. Table comparison uses proper `<th>` elements with `scope="col"` and `scope="row"`.

6. **Reduced Motion**: All animations respect `@media (prefers-reduced-motion: reduce)` by collapsing to instant transitions. No content is hidden behind animations -- everything is visible immediately for reduced-motion users.

7. **Touch Targets**: All buttons and interactive elements have a minimum touch target of 44x44px per WCAG 2.1 guidelines. CTA buttons already exceed this. `<summary>` elements have sufficient padding.

---

## Developer Notes

1. **Font Loading**: Load Inter (weights 400, 600, 700, 800) and JetBrains Mono (weights 400, 700) via Google Fonts or self-hosted. Use `font-display: swap` to prevent FOIT.

2. **ScrollTrigger (replaces IntersectionObserver)**: All scroll-triggered animations on this page use GSAP ScrollTrigger instead of raw IntersectionObserver. ScrollTrigger.batch is used for groups of elements (service cards, table rows) for performance. All animations fire once (`once: true`). All animations are wrapped in `gsap.matchMedia("(prefers-reduced-motion: no-preference)")` to respect user preferences.

3. **Live Voice Demo**: The "Try It Right Now" button in the Voice card triggers the existing voice bubble widget. This requires coordination with the voice widget script. The button should call a global function (e.g., `window.fluisVoiceWidget.open()`) or dispatch a custom event.

4. **Service Card Container**: Wrap all three service cards (Sections 3, 4, 5) in a single flex container for mobile reordering:
   ```html
   <div class="service-cards-container">
     <section id="website" class="service-card service-card--website">...</section>
     <section id="chat" class="service-card service-card--chat">...</section>
     <section id="voice" class="service-card service-card--voice service-card--recommended">...</section>
   </div>
   ```

5. **No JavaScript Framework Required**: This page can be built with vanilla HTML, CSS, and GSAP (for ScrollTrigger animations, SplitText, expandable sections, and mobile tabs in the comparison table). No React, Vue, or framework dependencies needed. GSAP is loaded globally via CDN as specified in `00_master_spec.md`.

6. **Icon Library**: All icons on this page use **Lucide Icons** -- 24x24, `stroke-width: 1.5`, `currentColor`. This includes flow diagram step icons (Section 2), feature list checkmarks (Sections 3, 4, 5), comparison table indicators (Section 6), and chevron indicators. See `00_master_spec.md` Section 1.4 for the canonical icon specification.

7. **Image Assets**: This page spec does not reference any images. The flow diagram in Section 2 should use SVG icons or CSS-drawn shapes, not raster images. This keeps the page lightweight and resolution-independent.

8. **Internal Links**:
   - "See Pricing" links to `pricing.html`
   - "Book a Free Demo" links to `#book-call` (which opens the GHL calendar booking widget or scrolls to a booking section)
   - "Start Free Trial" links to `#book-call` (same destination -- the demo call is the entry point for trials)
   - "Try It Right Now" triggers the voice bubble (JavaScript action, not a navigation link)

9. **Performance Target**: First Contentful Paint < 1.5s. Largest Contentful Paint < 2.5s. Cumulative Layout Shift < 0.1. No layout shifts from font loading (use proper `font-display` and size-adjust fallbacks).

---

*End of Services Page Specification v1.0*
