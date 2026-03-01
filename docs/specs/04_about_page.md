# 04 — About Page Specification

> **File**: `execution/internal/website/docs/specs/04_about_page.md`
> **Page**: `about.html`
> **Version**: 1.0
> **Last Updated**: 2026-02-27
> **Status**: Ready for implementation
> **Estimated Build Time**: 6-8 hours
>
> **Design tokens**: All CSS custom properties are defined in `docs/fluis_design_tokens.md` and governed by `00_master_spec.md` Section 1. This page spec does not redefine tokens.
>
> **Animation engine**: GSAP 3 + ScrollTrigger + SplitText. See `00_master_spec.md` for the complete animation stack specification.
>
> **Animation philosophy**: The about page is the most text-heavy page on the site. Animations here must be subtle and support readability, not compete with it. Every animation exists to guide the eye and reinforce narrative flow — never to distract from the copy. All animations are wrapped in `gsap.matchMedia("(prefers-reduced-motion: no-preference)")` to respect user accessibility preferences.

---

## Table of Contents

1. [Page Purpose & Strategy](#1-page-purpose--strategy)
2. [Page Meta & SEO](#2-page-meta--seo)
3. [Design Tokens Reference](#3-design-tokens-reference)
4. [Section 1: Hero / Mission Statement](#4-section-1-hero--mission-statement)
5. [Section 2: The Problem We Saw — Founding Story](#5-section-2-the-problem-we-saw--founding-story)
6. [Section 3: What We Stand For — Values](#6-section-3-what-we-stand-for--values)
7. [Section 4: How We're Different](#7-section-4-how-were-different)
8. [Section 5: The Technology — Brief](#8-section-5-the-technology--brief)
9. [Section 6: Bottom CTA](#9-section-6-bottom-cta)
10. [Global Page Behavior](#10-global-page-behavior)
11. [Accessibility Requirements](#11-accessibility-requirements)
12. [Performance Budget](#12-performance-budget)
13. [Implementation Checklist](#13-implementation-checklist)

---

## 1. Page Purpose & Strategy

### What This Page Must Accomplish

The About page is the trust engine of the entire Fluis.ai website. For a pre-launch agency with zero clients and no testimonials, this page carries an outsized burden. It must accomplish three things simultaneously:

1. **Humanize the brand** — Make Fluis.ai feel like real people with a real mission, not a template agency. The founding story is the primary vehicle. We use "we" throughout (brand-first, no personal founder name), but the narrative must feel deeply personal and authentic.

2. **Convert skepticism into curiosity** — Visitors who navigate to About are already semi-interested but not yet convinced. They are doing due diligence. The page must preemptively answer the unspoken question: "Why should I trust a company I've never heard of?" The answer is not credentials or client logos (we have neither). The answer is transparency, conviction, and a business model that proves we have skin in the game.

3. **Guide toward conversion** — Every section quietly pushes the visitor toward the bottom CTA. Not with aggressive sales tactics, but by steadily building the case that Fluis.ai is genuinely aligned with the visitor's interests.

### Psychological Framework

The About page deploys six psychological principles in sequence:

| Principle | Where Applied | How It Works |
|---|---|---|
| **Narrative Transportation** | Section 2 (Founding Story) | When people are absorbed in a story, they lower their critical defenses. The founding story creates an emotional current that carries the reader forward. |
| **Pratfall Effect** | Section 2 (Founding Story) | Admitting we are new — and framing that newness as a direct response to a new problem — actually increases perceived trustworthiness. Perfection is suspicious. Honesty is compelling. |
| **Liking / Similarity Bias** | Sections 1, 2 | Using specific, relatable examples (the plumber on a job site, the electrician who misses calls) creates an "us too" mirror effect. The visitor sees their own situation reflected. |
| **Unity Principle** | Sections 1, 2, 3 | "We're on the same side" framing. Fluis.ai is not a vendor selling to a customer — we are allies fighting the same fight against the growing technology gap. |
| **Contrast Effect** | Section 4 (How We're Different) | Positioning against DIY platforms, SaaS companies, and traditional agencies makes Fluis.ai's model feel distinctive and superior by comparison. |
| **Authority Bias** | Section 5 (Technology) | Technology partner logos and enterprise-grade language signal competence without requiring explanation. The visitor does not need to understand the tech — they just need to believe it is serious. |

### Target Visitor Profile

The person reading this page is:
- A non-tech small business owner (plumber, electrician, coach, realtor, pet service)
- Aged 30-55, UK or US based
- Already on the site, probably came from Home or Pricing
- Semi-interested but doing due diligence
- Skeptical of tech companies (has been burned by overpromising before)
- Does NOT want to read technical jargon
- Responds to authenticity, directness, and relatable examples
- Will leave instantly if the page feels corporate, generic, or dishonest

### Tone & Voice

- **Confident** without arrogance
- **Direct** without being blunt
- **Empathetic** without being soft
- **Personal** despite being brand-first (use "we," never "I")
- Short sentences. Punchy. Rhythmic. Like you are talking, not writing.
- Feels like a manifesto, not an annual report.

---

## 2. Page Meta & SEO

```html
<title>About — Fluis.ai | Bridging the AI Gap for Small Businesses</title>
<meta name="description" content="We started Fluis.ai to make AI accessible for non-tech business owners. Done for you. Results guaranteed. No jargon, no complexity.">
<meta name="keywords" content="about fluis.ai, AI for small business, RAAS, results as a service, AI agency, done for you AI">
<link rel="canonical" href="https://fluis.ai/about.html">

<!-- Open Graph -->
<meta property="og:title" content="About — Fluis.ai | Bridging the AI Gap for Small Businesses">
<meta property="og:description" content="We started Fluis.ai to make AI accessible for non-tech business owners. Done for you. Results guaranteed. No jargon, no complexity.">
<meta property="og:type" content="website">
<meta property="og:url" content="https://fluis.ai/about.html">
<meta property="og:image" content="https://fluis.ai/assets/og-about.png">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="About — Fluis.ai | Bridging the AI Gap">
<meta name="twitter:description" content="We started Fluis.ai to make AI accessible for non-tech business owners.">
```

**OG Image Note**: Create a 1200x630 image with the `#0a0a0a` background, Fluis.ai wordmark in `#f5f5f5`, and the tagline "Bridging the AI Gap for Small Businesses" in `#999999`. Keep it minimal — no illustrations, no busy graphics.

**Structured Data (JSON-LD)**:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Fluis.ai",
  "url": "https://fluis.ai",
  "description": "AI-powered chat and voice agents for small businesses. Results as a Service.",
  "foundingDate": "2025",
  "email": "hello@fluis.ai",
  "sameAs": []
}
</script>
```

---

## 3. Design Tokens Reference

All design tokens (colors, typography, spacing, layout, radius, shadows) are defined in `docs/fluis_design_tokens.md` and governed by `00_master_spec.md` Section 1. Do not redefine tokens in this page's CSS. Import or reference the canonical source.

<!-- Token values previously reproduced here have been removed to avoid drift.
     See docs/fluis_design_tokens.md for the single source of truth. -->

**About Page-Specific Constraints**:
- Maximum content width for long-form text: `720px` (narrower than `--max-width` for comfortable reading line length of ~65-75 characters)
- Pull-quote width: `800px`
- Value cards grid width: `1000px`
- All section vertical padding: `var(--space-3xl)` (96px) top and bottom

**Easing curves**: All easing curves reference tokens defined in `00_master_spec.md` Section 1.7.

---

## 4. Section 1: Hero / Mission Statement

### Section ID & Semantics

```html
<section id="about-hero" class="about-hero" aria-labelledby="about-hero-heading">
```

### Conversion Role

This is the first thing a visitor sees. It must immediately communicate: this is not a typical corporate About page. This is a manifesto. The large typography, generous whitespace, and punchy copy signal that Fluis.ai is different — direct, opinionated, and conviction-driven. The visitor should feel like they have landed on a page that was written by someone who genuinely cares, not generated by a template.

### Headline Options

**Option A (Recommended): "We Started Fluis.ai for a Simple Reason."**
- **Rationale**: Opens a curiosity loop. The visitor immediately wants to know: what reason? It implies a story is coming, which hooks readers into scrolling. It is personal without being self-indulgent. It positions the founding as intentional and purpose-driven.
- **Why recommended**: Curiosity is the strongest scroll driver. This headline does not try to persuade — it invites. That is the right posture for an About page.

**Option B: "We're Here to Bridge the Gap."**
- **Rationale**: Mission-focused, clear, immediately communicates purpose. Works well for visitors who want to know what the company does before they care about why. Direct and confident.
- **Risk**: Slightly abstract. "The gap" requires the subheadline to land for full comprehension.

**Option C: "Before AI Leaves Your Business Behind."**
- **Rationale**: Urgency plus loss aversion. Taps into the fear of falling behind. Creates immediate relevance for the target audience.
- **Risk**: Opens with a negative frame. For an About page (a trust-building context), leading with fear may feel more like a sales page than a story page. Better suited to a homepage hero.

### Selected Headline

```
We Started Fluis.ai for a Simple Reason.
```

### Subheadline

```
We believe every business deserves the power of AI,
regardless of their technical expertise.
```

### Body Copy — The Manifesto (3 paragraphs)

**Paragraph 1 — The Problem (opening with tension)**:

```
There's a gap forming right now between small businesses and AI technology.
It's growing every single day. And the businesses that can least afford to
fall behind — the ones without tech teams, without IT budgets, without time
to learn yet another platform — are the ones falling fastest.
```

**Paragraph 2 — The Conviction (transition to emotion)**:

```
We couldn't watch it happen. We saw plumbers losing customers because they
couldn't answer the phone while on a job. Electricians whose websites just
sat there doing nothing. Consultants missing leads at 2 AM because nobody
was there to pick up. These aren't businesses that lack talent or ambition.
They lack access. And that's not their fault.
```

**Paragraph 3 — The Promise (landing on the solution)**:

```
So we built Fluis.ai to be the bridge. Not a platform you figure out
yourself. Not software with a login and a learning curve. A service that
does everything for you — builds your AI agents, sets up your systems,
and only charges you when it actually delivers results. Because if we
can't make you money, we shouldn't take yours.
```

### Layout & Design

```
Desktop:
  - Content centered, max-width 720px
  - Headline: --text-2xl, font-weight 800, color --color-text, letter-spacing -0.02em
  - Subheadline: --text-lg, color --color-text-muted, margin-top var(--space-md)
  - Body paragraphs: --text-base (but push toward 18-19px for editorial feel),
    color --color-text-muted, line-height 1.75
  - Generous whitespace between paragraphs: var(--space-lg)
  - Section padding: var(--space-3xl) top, var(--space-2xl) bottom
  - Background: --color-bg (pure, no surface — let the words own the space)
  - No decorative elements. No images. No icons. Pure text.

Mobile (< 768px):
  - Same approach, just scaled
  - Headline: --text-xl (clamp handles this automatically)
  - Content padding: var(--space-sm) left/right
  - Paragraph spacing: var(--space-md)
  - All text left-aligned (not centered — easier to read on small screens)
```

### Animation Specification

```
Animation engine: GSAP 3 + ScrollTrigger + SplitText
All animations wrapped in: gsap.matchMedia("(prefers-reduced-motion: no-preference)")

--- Headline: SplitText LINE reveal ---

The mission statement headline uses SplitText to split into lines. Each line
reveals one-by-one on scroll, creating a cinematic text reveal that matches
the manifesto tone of this section.

SplitText config:
  type: "lines"
  linesClass: "line-child"

Wrapper: Each line wrapped in an overflow-hidden parent div (SplitText handles
this automatically with linesClass). This prevents lines from being visible
before their reveal.

Per-line animation:
  From:  { opacity: 0, y: 30 }
  To:    { opacity: 1, y: 0 }
  Duration: 0.7s per line
  Stagger: 0.15s (150ms) between lines
  Easing: "power2.out"

Trigger: ScrollTrigger
  trigger: "#about-hero"
  start: "top 85%"      (equivalent to threshold ~0.15)
  once: true

--- Subheadline + body paragraphs: staggered fadeInUp ---

After the headline lines complete, the remaining elements stagger in:

Sequence (delays relative to headline animation start):
  1. Headline lines reveal via SplitText (see above)
  2. Subheadline fades in                                          [after headline completes + 100ms]
  3. Paragraph 1 fades in                                          [+150ms]
  4. Paragraph 2 fades in                                          [+300ms]
  5. Paragraph 3 fades in                                          [+450ms]

Per-element animation:
  From:  { opacity: 0, y: 20 }
  To:    { opacity: 1, y: 0 }
  Duration: 0.7s
  Easing: "power2.out"

Implementation note: Use a GSAP timeline anchored to the ScrollTrigger.
The headline SplitText tween is the first child of the timeline, and the
subheadline/paragraphs are added with position offsets after the headline
completes.

--- Reduced motion fallback ---
When prefers-reduced-motion is active: all content renders immediately
with full opacity, no transforms. SplitText is not initialized (lines
remain as normal block text). See canonical behavior in 00_master_spec.md
Section 12.7.
```

### Psychology Notes

- **Curiosity gap**: The headline "for a Simple Reason" creates an open loop that compels scrolling.
- **Narrative Transportation**: The three paragraphs follow a story arc (tension -> emotion -> resolution) that pulls the reader through without resistance.
- **Liking/Similarity Bias**: Specific examples (plumber, electrician, consultant) in paragraph 2 mirror the target audience's own situation. They see themselves.
- **Unity Principle**: "We couldn't watch it happen" frames Fluis.ai as an ally, not a vendor. Same side.
- The final sentence of paragraph 3 ("if we can't make you money, we shouldn't take yours") is the emotional anchor of the entire hero. It introduces the RAAS model through conviction rather than salesmanship.

---

## 5. Section 2: The Problem We Saw — Founding Story

### Section ID & Semantics

```html
<section id="about-story" class="about-story" aria-labelledby="about-story-heading">
```

### Conversion Role

This is the emotional core of the entire About page. By the time a visitor finishes this section, they should feel three things: (1) This company understands my world. (2) This company exists because of a genuine conviction, not just to make money. (3) The problem they describe is real and urgent — I might already be affected. The founding story transforms Fluis.ai from "another AI company" into "the company that was built for businesses like mine."

### Headline Options

**Option A (Recommended): "The Gap Is Growing. Every Day."**
- **Rationale**: Short. Urgent. Creates immediate tension. The period after "Growing" forces a pause that mimics the gravity of the statement. "Every Day" adds relentless urgency. This headline makes the visitor feel the problem is not theoretical — it is happening right now.
- **Why recommended**: An About page founding story needs a headline that frames the PROBLEM, not the company. The visitor must feel the problem before they can appreciate the solution. This headline does exactly that.

**Option B: "We Saw Something That Needed Fixing."**
- **Rationale**: Positions the founders as people who act, not just observe. Implies a hands-on, proactive identity. Confident and action-oriented.
- **Risk**: Slightly vague. "Something" is a weaker word than a specific problem statement.

**Option C: "Small Businesses Deserve Better Than Voicemail."**
- **Rationale**: Specific, relatable, and slightly provocative. "Voicemail" is a concrete detail that every business owner knows. Creates instant recognition.
- **Risk**: May feel too narrow — positions the problem as just about phone calls, when Fluis.ai addresses broader AI adoption.

### Selected Headline

```
The Gap Is Growing. Every Day.
```

### Full Story Copy

**Opening paragraph — Setting the scene (the gap)**:

```
There's a gap forming between small businesses and AI. Not a small one.
A gap that gets wider every single day.
```

**Second paragraph — The contrast (enterprise vs. small business)**:

```
Enterprise companies have armies of developers, dedicated support teams,
and cutting-edge technology handling their customers around the clock.
They have AI answering questions, booking appointments, following up on
leads, and closing deals while their teams sleep.
```

**Third paragraph — The other side (small business reality)**:

```
Small businesses have voicemail.
```

**Fourth paragraph — The specific, relatable examples**:

```
Think about it. The plumber who's brilliant at what he does — but can't
answer the phone because he's under someone's kitchen sink. Every missed
call is a customer who goes to the next name on Google. The electrician
whose website has been the same for three years — it just sits there,
doing nothing, while competitors with better tech steal leads at midnight.
The consultant who wakes up to find out a potential client tried to reach
them at 2 AM and gave up.
```

**Fifth paragraph — The acceleration**:

```
And here's the thing most people don't see yet: this gap is accelerating.
AI isn't slowing down. Every month the technology gets faster, cheaper,
and more capable. Businesses that adopt it now will be miles ahead.
Businesses that don't will be trying to catch up to a train that left
the station without them.
```

**Sixth paragraph — The conviction**:

```
We're not going to watch that happen.
```

**Seventh paragraph — What Fluis.ai does about it**:

```
That's why we built Fluis.ai. Not as another software platform. Not as
a toolkit you have to learn. We built it as a service — we come in, we
set everything up, and your business gets the same AI capabilities that
enterprise companies have. Without the complexity. Without the tech
headaches. Without the six-figure budget.
```

**Eighth paragraph — The emotional close**:

```
You shouldn't have to be a technologist to benefit from technology. You
should be able to focus on the work you're great at — fixing pipes,
seeing clients, running your business — and let the technology handle
the rest. That's what we're here for.
```

### Pull-Quote

Positioned between the fifth and sixth paragraphs (between "the acceleration" and "the conviction"). Large, visually distinct, designed to be the single most memorable element on the page.

```
"In 6-12 months, there's going to be a humongous gap between local
businesses and AI. We're here to catch them before they fall behind."
```

### Layout & Design

```
Desktop:
  - Content centered, max-width 720px for body text
  - Pull-quote max-width 800px
  - Headline: --text-xl, font-weight 800, color --color-text
  - Body paragraphs: --text-base (18-19px), color --color-text-muted, line-height 1.75
  - "Small businesses have voicemail." — This single-sentence paragraph
    gets special treatment:
      font-size: --text-lg
      color: --color-text (full white, not muted)
      font-weight: 600
      margin-top: var(--space-xl)
      margin-bottom: var(--space-xl)
      This sentence should visually PUNCH. It is the emotional hinge of the story.
  - "We're not going to watch that happen." — Same special treatment:
      font-size: --text-lg
      color: --color-text
      font-weight: 600
      margin-top: var(--space-xl)
      margin-bottom: var(--space-xl)
  - Paragraph spacing: var(--space-lg) between standard paragraphs
  - Section padding: var(--space-3xl) top and bottom
  - Background: --color-bg (or very subtle --color-surface to differentiate
    from hero — developer discretion, test both)

Pull-quote styling:
  - Left border: 3px solid --color-accent (#ff3b30)
  - Padding-left: var(--space-lg)
  - Font-size: --text-lg
  - Font-style: italic
  - Color: --color-text (full white — this is a highlight, not muted)
  - Margin: var(--space-2xl) top and bottom (generous breathing room)
  - The quotation marks are part of the text, not decorative pseudo-elements
  - Max-width: 800px, centered

Mobile (< 768px):
  - Same approach, just scaled
  - Pull-quote padding-left: var(--space-md)
  - Content padding: var(--space-sm) left/right
  - Special-treatment paragraphs still get --text-lg treatment
    (clamp handles the scaling automatically)
  - All text left-aligned
```

### Animation Specification

```
Animation engine: GSAP 3 + ScrollTrigger + SplitText
All animations wrapped in: gsap.matchMedia("(prefers-reduced-motion: no-preference)")

--- Progressive scroll reveal (10 content elements) ---

Trigger: ScrollTrigger
  trigger: "#about-story"
  start: "top 90%"      (equivalent to threshold ~0.1 — early trigger since section is long)
  once: true

All 10 content elements stagger with 120ms gaps. Each element animates:
  From:  { opacity: 0, y: 24 }
  To:    { opacity: 1, y: 0 }
  Duration: 0.6s
  Easing: "power2.out"
  Stagger: 0.12s (120ms)

Sequence:
  1. Headline fades in                                              [0ms]
  2. Opening paragraph fades in                                     [120ms]
  3. Enterprise paragraph fades in                                  [240ms]
  4. "Small businesses have voicemail." fades in                    [360ms]
  5. Specific examples paragraph fades in                           [480ms]
  6. Acceleration paragraph fades in                                [600ms]
  7. Pull-quote (text + border — see special animation below)       [720ms]
  8. Conviction paragraph fades in                                  [840ms]
  9. Solution paragraph fades in                                    [960ms]
  10. Emotional close paragraph fades in                            [1080ms]

--- Pull-quote: border "draws" + SplitText word reveal ---

The pull-quote has a compound animation using a GSAP timeline. This is the
most visually distinctive animation on the About page — the red border
drawing itself while words reveal creates a moment of emphasis that matches
the pull-quote's narrative importance.

GSAP Timeline (nested inside the main stagger sequence at position [720ms]):

  Step 1 — SplitText word reveal on quote text:
    SplitText config:
      type: "words"
      wordsClass: "word-child"
    Per-word animation:
      From:  { opacity: 0, y: 8 }
      To:    { opacity: 1, y: 0 }
      Duration: 0.4s
      Stagger: 0.04s (40ms between words)
      Easing: "power2.out"
    Total time for word reveal: ~0.4s + (word_count * 0.04s)

  Step 2 — Left border "draws" (runs SIMULTANEOUSLY with word reveal):
    The left red border on the pull-quote animates from height: 0 to
    height: 100%. This creates a vertical "drawing" effect.

    Implementation:
      - Set the pull-quote's left border to transparent initially
      - Use a ::before pseudo-element (or a child div) with:
          position: absolute
          left: 0
          top: 0
          width: 3px
          background: var(--color-accent)
          height: 0
      - GSAP animates: { height: "100%" }
      - Duration: 0.5s (500ms)
      - Delay: 0.3s after word reveal starts (so border begins drawing
        while words are still appearing — creates a layered effect)
      - Easing: "power2.inOut"

    The border and words animate concurrently but offset — words start
    first, border begins 300ms later, both finish close to the same time.
    This creates a unified reveal that feels choreographed, not mechanical.

--- Reduced motion fallback ---
When prefers-reduced-motion is active: all content renders immediately.
SplitText is not initialized on pull-quote. Border renders at full height
immediately. See canonical behavior in 00_master_spec.md Section 12.7.
```

### Psychology Notes

- **Narrative Transportation**: This section is structured as a classic three-act narrative. Act 1: the gap (tension). Act 2: the examples (emotional identification). Act 3: the solution (resolution). When readers are transported into a narrative, they process information less critically and more empathetically.
- **Pratfall Effect**: We are not hiding that we are new. The language implies freshness and responsiveness: "That's why we built Fluis.ai." New is reframed as responsive. The problem is new, so the solution is new. That is not a weakness — it is proof we are paying attention.
- **Liking/Similarity Bias**: The plumber, electrician, and consultant examples are not generic. They mirror the target audience's exact daily reality. When a plumber reads "can't answer the phone because he's under someone's kitchen sink," they feel seen. That feeling of being seen creates trust faster than any credential.
- **Unity Principle**: "We're not going to watch that happen." This is a declaration of shared purpose. It positions Fluis.ai as someone who cares about the same problem the visitor cares about.
- **Loss Aversion**: "Businesses that don't will be trying to catch up to a train that left the station without them." Fear of missing out is a stronger motivator than the promise of gain. This sentence activates it without being manipulative — it is a genuine observation about the market.
- **Single-sentence paragraphs**: "Small businesses have voicemail." and "We're not going to watch that happen." These standalone lines create dramatic emphasis. They force the eye to stop and absorb. Short sentences after long ones create rhythm that keeps readers engaged.

---

## 6. Section 3: What We Stand For — Values

### Section ID & Semantics

```html
<section id="about-values" class="about-values" aria-labelledby="about-values-heading">
```

### Conversion Role

Values sections on most corporate websites are forgettable — vague words like "integrity" and "innovation" that mean nothing because they are never tied to specific behaviors. This section must be the opposite. Every value stated here is concrete, verifiable, and directly connected to how Fluis.ai operates. The visitor should finish this section thinking: "These aren't just words. They actually built their business around these principles."

### Headline Options

**Option A (Recommended): "What We Stand For."**
- **Rationale**: Direct, confident, no flourish. The period at the end adds weight — it is a statement, not a question or a suggestion. It positions the values as non-negotiable commitments, not aspirational wishes.
- **Why recommended**: Simplicity matches the brand voice. The word "stand" implies conviction and willingness to defend these positions. It is not "what we believe" (passive) — it is "what we stand for" (active).

**Option B: "Built on Four Promises."**
- **Rationale**: "Promises" is more committal than "values." It implies accountability. The word "four" sets expectations and signals that this will be concise.
- **Risk**: "Promises" could ring hollow for a pre-launch company with no track record.

### Selected Headline

```
What We Stand For.
```

### Value Cards Content

**Card 1: Simplicity First**

```
Title:       Simplicity First
Description: AI should be dead simple. No jargon. No complexity. No "figure
             it out yourself." We handle everything so you can focus on what
             you do best — running your business.
```

**Card 2: Results Over Promises**

```
Title:       Results Over Promises
Description: We only charge when we deliver. If our AI agent doesn't book
             a single appointment, you don't pay. That's not a marketing
             line — it's how we operate. Every single month.
```

**Card 3: Transparency**

```
Title:       Transparency
Description: No contracts. No hidden fees. No surprises. Month-to-month
             billing. Cancel anytime. We're honest about what AI can do —
             and what it can't. You'll never get a runaround from us.
```

**Card 4: Results as a Service**

```
Title:       Results as a Service
Description: We're not SaaS — we don't charge you regardless of outcomes.
             We make money only when we make your business money. If we
             can't deliver results, we don't deserve your payment. Period.
```

### Layout & Design

```
Desktop:
  - Section background: --color-bg
  - Headline: --text-xl, font-weight 800, color --color-text, centered
  - Headline margin-bottom: var(--space-2xl)
  - Cards container: max-width 1000px, centered
  - Layout: CSS Grid, 2 columns, gap var(--space-lg) (32px)

  Card styling:
    - Background: --color-surface (#141414)
    - Border: 1px solid --color-border
    - Border-radius: --radius-lg (1rem)
    - Padding: var(--space-xl) (48px)
    - Transition: border-color 300ms var(--ease-default)

  Card hover state:
    - Border-color: --color-border-hover (rgba(255,255,255,0.15))
    - No shadow, no scale, no color change — just the border brightens
    - Subtle, Nothing Phone aesthetic

  Card title:
    - Font-size: --text-lg
    - Font-weight: 700
    - Color: --color-text
    - Margin-bottom: var(--space-sm)

  Card description:
    - Font-size: --text-base
    - Color: --color-text-muted
    - Line-height: 1.7
    - No bold, no links — clean reading

  Section padding: var(--space-3xl) top and bottom

Tablet (768px - 1024px):
  - Same 2-column grid
  - Card padding: var(--space-lg)

Mobile (< 768px):
  - Single column stack
  - Cards stack vertically with gap var(--space-md)
  - Card padding: var(--space-lg)
  - Headline left-aligned
```

### Animation Specification

```
Animation engine: GSAP 3 + ScrollTrigger
All animations wrapped in: gsap.matchMedia("(prefers-reduced-motion: no-preference)")

--- Headline entrance ---

Trigger: ScrollTrigger
  trigger: "#about-values"
  start: "top 85%"
  once: true

Headline animation:
  From:  { opacity: 0, y: 20 }
  To:    { opacity: 1, y: 0 }
  Duration: 0.6s
  Easing: "power2.out"

--- Value cards: spring stagger with ScrollTrigger.batch ---

The 4 value cards use ScrollTrigger.batch for efficiency (single observer
for all cards). Cards enter with back.out(1.7) easing — a spring overshoot
that settles, giving each card a subtle "pop" as it lands. This creates
energy and character while remaining restrained.

ScrollTrigger.batch config:
  targets: ".about-values .value-card"
  start: "top 85%"
  once: true

  onEnter: batch =>
    gsap.from(batch, {
      opacity: 0,
      y: 24,
      duration: 0.6,
      stagger: 0.1,         // 100ms intervals between cards
      ease: "back.out(1.7)"  // spring overshoot + settle
    })

Card initial state (set in CSS for no-JS fallback):
  opacity: 0;
  transform: translateY(24px);

Card final state:
  opacity: 1;
  transform: translateY(0);

--- Card hover: border-color shift only (Nothing Phone restraint) ---

Hover animation uses GSAP for consistent easing:
  Property: borderColor
  From: var(--color-border)
  To: var(--color-border-hover)
  Duration: 0.3s (300ms)
  Easing: "power1.out"

IMPORTANT: No scale. No shadow. No background change. Only the border
brightens on hover. This follows the Nothing Phone restraint principle —
minimal, intentional interaction feedback. The absence of excessive hover
effects signals design confidence.

Implementation: Can also be pure CSS transition (border-color 300ms
ease-out) since it is a single-property change. GSAP is optional here
but ensures consistency with the site-wide easing system.

--- Reduced motion fallback ---
When prefers-reduced-motion is active: all cards render immediately at
full opacity with no transforms. Hover border-color change remains
(it is not a motion effect). See canonical behavior in 00_master_spec.md
Section 12.7.
```

### Psychology Notes

- **Commitment & Consistency**: Each value is a public commitment. Once stated publicly, humans feel compelled to act consistently with their stated positions (Cialdini). By publishing these values, Fluis.ai creates accountability for itself — and visitors perceive that accountability.
- **Specificity = Credibility**: "No contracts. No hidden fees. Cancel anytime." is 10x more credible than "We value transparency." Specific, verifiable claims activate the believability circuit. Vague values activate the skepticism circuit.
- **RAAS as a value, not just a pricing model**: By placing RAAS in the values section (not just the pricing page), we frame it as a philosophical commitment, not a commercial strategy. This deepens trust — it says "we believe this is right," not just "this is how we bill."
- **Four is the right number**: Three feels like a marketing exercise. Five feels like padding. Four is comprehensive without being exhausting.

---

## 7. Section 4: How We're Different

### Section ID & Semantics

```html
<section id="about-different" class="about-different" aria-labelledby="about-different-heading">
```

### Conversion Role

This section preemptively addresses the visitor's mental model: "Okay, every company says they're different. How are you actually different?" The answer is delivered through contrast — by naming the alternatives (DIY platforms, SaaS companies, traditional agencies) and showing how Fluis.ai's model is fundamentally unlike them. The visitor should leave this section with a clear mental framework: "Fluis.ai is none of those. It's its own category."

### Headline Options

**Option A (Recommended): "Not Another Software Platform."**
- **Rationale**: Directly addresses the most common assumption visitors carry. Most AI companies ARE software platforms (DIY tools, dashboards, SaaS logins). By immediately negating that assumption, we create a "wait, what ARE they then?" curiosity that pulls the reader into the copy. The tone is confident and slightly defiant — it says "we know what you're thinking, and you're wrong about us."
- **Why recommended**: This headline works because it STARTS with what we are NOT. In a market full of AI platforms, distinguishing yourself by negation is more memorable than distinguishing yourself by addition.

**Option B: "Here's What Makes Us Different."**
- **Rationale**: Simple, direct, sets clear expectations. No cleverness, just a promise to explain.
- **Risk**: Generic. Every company's About page says some version of this.

**Option C: "We Don't Give You Software. We Give You Results."**
- **Rationale**: Cleaner contrast. Positions the choice as software vs. results — and nobody wants software for its own sake. They want outcomes.
- **Risk**: Slightly longer, and the "give you" phrasing feels a touch passive.

### Selected Headline

```
Not Another Software Platform.
```

### Body Copy

**Opening paragraph — The negation**:

```
We're not SaaS. We don't give you a login and wish you luck. We don't
hand you a dashboard full of features and leave you to figure them out.
We build everything for you, maintain it for you, and guarantee results.
```

**Second paragraph — The DIY contrast**:

```
DIY platforms give you tools. Powerful ones, maybe. But tools are only
useful if you have the time and knowledge to use them. Most small business
owners don't. They bought the website builder and never finished the site.
They signed up for the CRM and it's been sitting empty for months. We
don't do that. We do it for you — every bit of it.
```

**Third paragraph — The SaaS contrast**:

```
SaaS companies charge you whether you get results or not. Your monthly
fee hits the same regardless of whether their product booked you a
single appointment. We don't operate that way. If our agent doesn't
deliver, we don't charge. That's not generosity. That's alignment — our
success should depend on your success.
```

**Fourth paragraph — The agency contrast**:

```
Traditional agencies send you an invoice and disappear until the next
invoice. They'll sell you a website, launch it, and move on to the next
client. We earn your business every single month. No contracts means we
can never coast — we have to keep delivering, or you walk. And that's
exactly how it should be.
```

**Fifth paragraph — What's included**:

```
And we don't nickel-and-dime you either. Every plan comes with a free
website, a full CRM with automations, and your AI agent — all set up
and ready to go. Other companies charge you for the website, charge you
for the CRM, then charge you again for the AI on top. We include
everything because half a solution doesn't get results.
```

**Sixth paragraph — The guarantee**:

```
Still not sure? Start with a 7-day trial. If our agent doesn't perform,
your setup fee is fully refunded. No risk. No hidden gotchas. We put our
money where our mouth is because we know what our technology can do.
```

**Closing paragraph — The summary**:

```
We exist because we believe there's a better way to help small businesses
adopt AI. Not by selling them software they won't use. Not by charging
them regardless of results. Not by doing the minimum and disappearing.
By doing it for them. Maintaining it for them. And only getting paid when
it works.
```

### Competitive Advantages Reference

The following advantages from the knowledge base (`market.yaml`) are embedded in this section's copy:

| Advantage | Where Addressed |
| --- | --- |
| RAAS model -- competitors charge regardless of results | SaaS contrast paragraph, closing paragraph |
| DFY -- competitors make you build it yourself | DIY contrast paragraph, opening paragraph |
| Free website included -- competitors charge separately | Fifth paragraph (What's included) |
| Full CRM + automations included -- competitors just give you the AI | Fifth paragraph (What's included) |
| 7-day trial with performance guarantee | Sixth paragraph (The guarantee) |
| Setup fee fully refundable during trial | Sixth paragraph (The guarantee) |

### Layout & Design

```
Desktop:
  - Content centered, max-width 720px
  - Section background: --color-surface (#141414) — differentiate from
    adjacent --color-bg sections
  - Headline: --text-xl, font-weight 800, color --color-text, centered
  - Body paragraphs: --text-base, color --color-text-muted, line-height 1.75
  - Paragraph spacing: var(--space-lg)
  - Section padding: var(--space-3xl) top and bottom

  Optional design enhancement — Key phrases highlighted:
    In each paragraph, one key phrase could be rendered in --color-text
    (full white) instead of --color-text-muted to create emphasis:
    - "build everything for you, maintain it for you, and guarantee results"
    - "We do it for you"
    - "our success should depend on your success"
    - "we have to keep delivering, or you walk"
    - "only getting paid when it works"
    Implementation: <strong> tags with color: --color-text; font-weight: 600;

Mobile (< 768px):
  - Same approach
  - Content padding: var(--space-sm) left/right
  - Headline left-aligned
  - All text left-aligned
```

### Animation Specification

```
Animation engine: GSAP 3 + ScrollTrigger
All animations wrapped in: gsap.matchMedia("(prefers-reduced-motion: no-preference)")

--- Content blocks: ScrollTrigger.batch stagger ---

All content blocks (headline + 7 paragraphs) use ScrollTrigger.batch for
efficient scroll observation. As blocks enter the viewport, they stagger
in with clean, readable fadeInUp transitions.

ScrollTrigger.batch config:
  targets: "#about-different .reveal-element"
  start: "top 85%"
  once: true

  onEnter: batch =>
    gsap.from(batch, {
      opacity: 0,
      y: 24,
      duration: 0.6,
      stagger: 0.15,      // 150ms intervals between content blocks
      ease: "power2.out"
    })

Sequence (as blocks scroll into view):
  1. Headline                         [0ms]
  2. Opening paragraph (negation)     [150ms]
  3. DIY paragraph                    [300ms]
  4. SaaS paragraph                   [450ms]
  5. Agency paragraph                 [600ms]
  6. What's included paragraph        [750ms]
  7. Guarantee paragraph              [900ms]
  8. Closing paragraph                [1050ms]

Per-element animation:
  From:  { opacity: 0, y: 24 }
  To:    { opacity: 1, y: 0 }
  Duration: 0.6s
  Easing: "power2.out"

Note: This section has dense text content (7 substantial paragraphs).
The animations are deliberately simple — clean fadeInUp only, no SplitText,
no special effects. The copy does the heavy lifting here; the animation's
only job is to reveal it gracefully without distraction.

--- Reduced motion fallback ---
When prefers-reduced-motion is active: all content renders immediately
at full opacity with no transforms. See canonical behavior in
00_master_spec.md Section 12.7.
```

### Psychology Notes

- **Contrast Effect**: When options are presented side by side (or in sequence), each is evaluated relative to the others, not in isolation. By naming DIY, SaaS, and traditional agencies — and showing their flaws — Fluis.ai's model automatically appears superior. The visitor's brain does the evaluation work for us.
- **Negation as Positioning**: "Not Another Software Platform" uses negation to carve a mental category. When you tell someone what you are NOT, their brain has to figure out what you ARE — and that active processing creates stronger memory encoding than a positive claim.
- **Specificity Again**: "They bought the website builder and never finished the site. They signed up for the CRM and it's been sitting empty for months." These are concrete, recognizable situations. The visitor may have literally done these things. That recognition creates trust through the "this company gets it" effect.
- **Progressive Structure**: Each contrast (DIY -> SaaS -> Agency) builds on the previous one. The closing paragraph then synthesizes all three. This creates a sense of completeness — the visitor feels like they have evaluated all alternatives and Fluis.ai stands alone.

---

## 8. Section 5: The Technology — Brief

### Section ID & Semantics

```html
<section id="about-tech" class="about-tech" aria-labelledby="about-tech-heading">
```

### Conversion Role

This section serves one purpose: signal competence. The target audience is non-technical and does not care about APIs, model architectures, or integration stacks. But they DO care that the technology behind the service is real, serious, and enterprise-grade. Think of this section as a reassurance checkpoint. The visitor has been emotionally moved by the story and values — now they need a quick rational confirmation that the technology backing those promises is legitimate. Short. Authoritative. Move on.

### Headline Options

**Option A (Recommended): "Enterprise-Grade AI. Small Business Pricing."**
- **Rationale**: This headline accomplishes two things in six words. First, "Enterprise-Grade" signals quality and seriousness — the same technology powering large companies. Second, "Small Business Pricing" immediately neutralizes the "sounds expensive" concern. The contrast between enterprise and small business creates a feeling of getting an unfair advantage — which is exactly what we want.
- **Why recommended**: Maximum information density. Addresses both quality and affordability. No jargon.

**Option B: "Powered by the Same AI Big Companies Use."**
- **Rationale**: Explicit comparison to big companies. Creates aspirational framing — your small business gets what the big players have.
- **Risk**: "Big Companies" is vague. And the sentence structure is a bit passive.

### Selected Headline

```
Enterprise-Grade AI. Small Business Pricing.
```

### Body Copy

**Primary paragraph — Technology translated into business language**:

```
We use the same AI technology that powers enterprise companies — voice
recognition that understands natural conversation, AI that responds in
under half a second, and automated scheduling that never sleeps. Your
customers get a seamless, professional experience. You get booked
appointments and qualified leads.
```

**Secondary paragraph — The accessibility statement**:

```
The difference? We make it affordable and accessible for businesses of
any size. No tech team required. No complex setup. No learning curve.
Just results.
```

### Technology Partner Logos

A subtle horizontal row of partner/technology logos that adds authority without requiring the visitor to understand anything.

```
Layout: Horizontal row, centered
Label: "Powered By" in --text-xs, --color-text-dim, uppercase, letter-spacing 0.1em
Logos: Displayed in monochrome (white on dark background, opacity 0.5, hover opacity 0.7)

Partner logos to include:
  1. Deepgram       — Speech-to-text
  2. ElevenLabs     — Text-to-speech
  3. GoHighLevel    — CRM & automation
  4. OpenAI         — Conversation AI (optional — only if logo use is permitted)

Logo sizing:
  - Max-height: 28px
  - Uniform visual weight across all logos
  - Horizontal spacing: var(--space-xl) between logos
  - Row margin-top: var(--space-2xl)

IMPORTANT: Verify logo usage permissions before implementation.
Some companies restrict logo use to official partners or certified
integrations. Check each partner's brand guidelines.
```

### Layout & Design

```
Desktop:
  - Content centered, max-width 720px for text, 1000px for logo row
  - Section background: --color-bg
  - Headline: --text-xl, font-weight 800, color --color-text, centered
  - Body text: --text-base, color --color-text-muted, line-height 1.75, centered
  - Logo row: centered, horizontal, with "Powered By" label above
  - Section padding: var(--space-3xl) top, var(--space-2xl) bottom
  - This is a SHORT section — do not pad excessively. Let brevity signal confidence.
    A long technology section says "we're trying to prove something."
    A short one says "we don't need to."

Mobile (< 768px):
  - Text left-aligned
  - Logo row wraps to 2x2 grid if needed, centered
  - Logo max-height: 24px
  - Content padding: var(--space-sm) left/right
```

### Animation Specification

```
Animation engine: GSAP 3 + ScrollTrigger
All animations wrapped in: gsap.matchMedia("(prefers-reduced-motion: no-preference)")

--- Text content: staggered fadeInUp ---

Trigger: ScrollTrigger
  trigger: "#about-tech"
  start: "top 80%"      (equivalent to threshold ~0.2)
  once: true

Sequence (GSAP timeline):
  1. Headline fades in                                             [0ms]
  2. Primary paragraph fades in                                    [150ms]
  3. Secondary paragraph fades in                                  [300ms]
  4. "Powered By" label fades in                                   [450ms]

Per-element animation:
  From:  { opacity: 0, y: 20 }
  To:    { opacity: 1, y: 0 }
  Duration: 0.6s
  Easing: "power2.out"

--- Partner logos: staggered fade-in with hover ---

Logos fade in individually with stagger after the text content:

Logo entrance animation:
  Trigger: Starts at position [550ms] in the section timeline
    (after "Powered By" label has begun its fade)
  From:  { opacity: 0 }
  To:    { opacity: 0.5 }         (default resting opacity)
  Duration: 0.4s
  Stagger: 0.1s (100ms intervals between logos)
  Easing: "power1.out"

Logo hover animation:
  From:  { opacity: 0.5 }        (resting state)
  To:    { opacity: 0.8 }        (hover state)
  Duration: 0.2s (200ms)
  Easing: "power1.out"

  On mouse leave: reverse back to opacity 0.5 with same duration/easing.

  Implementation: Can use CSS transition (opacity 200ms ease-out) for
  simplicity, or GSAP for consistency. The interaction is simple enough
  that CSS is sufficient here.

Note: Logos remain at 0.5 opacity at rest (not full 1.0) to maintain
the monochrome, subdued aesthetic. The hover bump to 0.8 is subtle —
enough to acknowledge the interaction without breaking the visual tone.

--- Reduced motion fallback ---
When prefers-reduced-motion is active: all text renders immediately.
Logos render at their resting 0.5 opacity. Hover opacity transition
remains (it is a simple property change, not motion). See canonical
behavior in 00_master_spec.md Section 12.7.
```

### Psychology Notes

- **Authority Bias**: Technology partner logos function like trust badges. The visitor does not need to know what Deepgram does — the presence of named, recognizable technology partners signals that Fluis.ai is built on real infrastructure, not improvised.
- **Brevity as Confidence Signal**: This section is deliberately short (two paragraphs + logos). A confident company does not over-explain. A long technology section reads as defensive. A short one reads as "we know what we're doing, and we don't need to prove it with a wall of text."
- **Translation, Not Explanation**: The copy translates technology into business outcomes. "Voice recognition that understands natural conversation" instead of "Deepgram STT with sub-200ms latency." "Automated scheduling that never sleeps" instead of "GoHighLevel CRM with calendar API integration." The visitor cares about what it DOES, not how it WORKS.

---

## 9. Section 6: Bottom CTA

### Section ID & Semantics

```html
<section id="about-cta" class="about-cta" aria-labelledby="about-cta-heading">
```

### Conversion Role

This is the payoff section. Everything above — the manifesto, the founding story, the values, the contrasts, the technology — has been building to this moment. The visitor has been emotionally engaged, intellectually convinced, and rationally reassured. Now we offer them a clear, low-pressure next step. The CTA must feel like an invitation from someone they now trust, not a sales push from a stranger.

Critical requirement: The tone must match the trust that the About page built. An aggressive "SIGN UP NOW" CTA would violate the emotional contract established by the preceding sections. The CTA is warm, inviting, and pressure-free. The visitor should feel like they are being invited to a conversation, not sold to.

### Headline Options

**Option A (Recommended): "Let's Talk About Your Business."**
- **Rationale**: Personal, warm, conversational. "Your Business" keeps the focus on the visitor, not on Fluis.ai. "Let's" implies collaboration and equality — we are not selling to you, we are talking with you. No urgency, no fear, no pressure. Just an open invitation.
- **Why recommended**: After a trust-building About page, the CTA should feel like the natural next step in a conversation that has already started. This headline achieves that perfectly.

**Option B: "Ready to See What AI Can Do for You?"**
- **Rationale**: Forward-looking and benefits-oriented. Focuses on possibility and potential.
- **Risk**: The question format feels slightly more salesy than the statement format. And "Ready to..." is an overused CTA pattern.

**Option C: "Curious? Let's Have a Conversation."**
- **Rationale**: Ultra-low pressure. Acknowledges that the visitor may be curious but not committed — and that is perfectly fine.
- **Risk**: May be too soft. "Curious?" might feel presumptuous.

### Selected Headline

```
Let's Talk About Your Business.
```

### Subheadline

```
Book a free 45-minute discovery call. No pressure. No pitch. Just a
conversation about what's possible.
```

### CTA Buttons

**Primary CTA**:

```
Text: "Book a Free Demo"
URL: #book-call (triggers GoHighLevel calendar booking widget)
Style: Solid button
  - Background: --color-accent (#ff3b30)
  - Color: #ffffff
  - Font-size: --text-base
  - Font-weight: 600
  - Padding: var(--space-sm) var(--space-xl) (16px 48px)
  - Border-radius: --radius-full (pill shape)
  - Transition: background-color 200ms var(--ease-default), box-shadow 200ms var(--ease-default)
  - Hover: background --color-accent-hover (#ff5147), box-shadow --shadow-glow
  - Active: scale(0.98), background darken by 10%
  - Focus: 2px solid outline, offset 3px, color --color-accent
```

**Secondary CTA**:

```
Text: "Or talk to our agent right now"
Action: Triggers the voice bubble widget
Style: Text link (not a button)
  - Color: --color-text-muted (#999999)
  - Font-size: --text-sm
  - Text-decoration: underline with --color-text-dim
  - Transition: color 200ms var(--ease-default)
  - Hover: color --color-text (#f5f5f5)
  - Margin-top: var(--space-md)
  - Cursor: pointer
```

### Layout & Design

```
Desktop:
  - Content centered, max-width 720px
  - Section background: --color-surface (#141414) — gives the CTA section
    a distinct visual container, like a stage
  - Optional: very subtle top border (1px solid --color-border) to define
    the section boundary
  - Headline: --text-xl, font-weight 800, color --color-text, centered
  - Subheadline: --text-base, color --color-text-muted, centered,
    max-width 480px (narrower for tighter reading), margin-top var(--space-md)
  - Primary CTA button: centered, margin-top var(--space-xl)
  - Secondary CTA: centered, below primary, margin-top var(--space-md)
  - Section padding: var(--space-3xl) top, var(--space-3xl) bottom
  - Generous whitespace above the section (at least --space-2xl between
    the tech section and this CTA section) — let it breathe

Mobile (< 768px):
  - Same centered layout
  - Button full-width (max-width 320px, centered)
  - Content padding: var(--space-sm) left/right
  - Secondary CTA centered below button
```

### Animation Specification

```
Animation engine: GSAP 3 + ScrollTrigger
All animations wrapped in: gsap.matchMedia("(prefers-reduced-motion: no-preference)")

--- Standard fadeInUp stagger sequence ---

The CTA section uses a deliberate stagger sequence via ScrollTrigger.
Each element enters in narrative order: headline first, then supporting
text, then the action items. This mirrors natural reading flow and
creates a gentle "landing" that matches the invitational tone.

Trigger: ScrollTrigger
  trigger: "#about-cta"
  start: "top 80%"      (equivalent to threshold ~0.2)
  once: true

GSAP timeline sequence:
  1. Headline fades in                                             [0ms]
  2. Subheadline fades in                                          [100ms delay]
  3. Body/description fades in                                     [200ms delay]
  4. Primary CTA button fades in                                   [300ms delay]

Per-element animation:
  From:  { opacity: 0, y: 16 }
  To:    { opacity: 1, y: 0 }
  Duration: 0.7s
  Easing: "power2.out"

Note: The fade-in for this section is intentionally SLOWER and GENTLER
than previous sections. The translateY distance is reduced (16px vs
20-24px elsewhere). This creates a visual deceleration that matches
the warm, invitational tone. The page is slowing down, not speeding up.

--- CTA button hover animation ---

The primary CTA button hover uses GSAP for its two-property transition:

  Property 1 — background:
    From: var(--color-accent)
    To: var(--color-accent-hover)
    Duration: 0.2s (200ms)
    Easing: "power1.out"

  Property 2 — box-shadow glow:
    From: none (or 0 0 0 transparent)
    To: var(--shadow-glow)    (0 0 30px rgba(255,59,48,0.15))
    Duration: 0.2s (200ms)
    Easing: "power1.out"

  Both properties animate simultaneously on mouseenter, reverse on
  mouseleave.

  Implementation: Can be pure CSS (transition: background-color 200ms
  ease-out, box-shadow 200ms ease-out) since these are simple property
  changes. GSAP is optional but ensures consistency with the site-wide
  easing system.

  Active state remains CSS-only: scale(0.98) on :active.

--- Secondary CTA hover ---
The secondary text link hover (color transition) remains CSS-only:
  color: var(--color-text-muted) -> var(--color-text)
  transition: color 200ms ease-out

--- Reduced motion fallback ---
When prefers-reduced-motion is active: all content renders immediately
at full opacity with no transforms. Hover effects (background-color,
box-shadow, color) remain as they are not motion effects. See canonical
behavior in 00_master_spec.md Section 12.7.
```

### Psychology Notes

- **Reciprocity**: The About page has given the visitor a substantial amount of value — a genuine story, transparent values, honest positioning. The CTA leverages the reciprocity instinct: having received value, the visitor is more inclined to give something in return (their time for a call).
- **Low Commitment Threshold**: "45-minute discovery call" is framed as a conversation, not a sales meeting. "No pressure. No pitch." explicitly removes the two things people fear most about sales calls. The barrier to clicking is as low as we can make it.
- **Dual Pathway**: The secondary CTA ("talk to our agent right now") catches visitors who are interested but not ready to schedule. It provides an immediate, zero-commitment alternative — they can talk to the AI agent live on the page, experience the product firsthand, and convert later.
- **"Your Business"**: The headline focuses on the visitor, not on Fluis.ai. After a page that was necessarily about us (founding story, values, technology), the CTA pivots to them. This pivot signals: "Enough about us. Let's talk about you."

---

## 10. Global Page Behavior

### Scroll Behavior

```
Smooth scrolling is handled globally by Lenis (see 00_master_spec.md).
Do NOT use CSS `scroll-behavior: smooth` — Lenis replaces it with
butter-smooth momentum scrolling that integrates with ScrollTrigger.

All internal anchor links (#about-hero, etc.) are handled by Lenis's
scrollTo method for consistent smooth scrolling behavior.
```

### Navigation Context

The global nav (shared across all pages) should highlight "About" as the active page.

```css
nav a[href="about.html"] {
  color: var(--color-text);        /* Full white instead of muted */
  /* No underline — active state indicated by color alone */
}
```

### Voice Bubble

The global voice agent bubble is present on this page (as on all pages). It should NOT interfere with the CTA section. If the bubble position overlaps with the bottom CTA on mobile, apply a `bottom` offset of at least `100px` to the bubble when the CTA section is in viewport.

### Page Load Order

```
1. HTML skeleton renders immediately (SSR/static)
2. Theme script runs synchronously (FOUC prevention — see 00_master_spec.md)
3. Fonts load (Inter 400/600/700/800, JetBrains Mono 400 — subset if possible)
4. CSS applies (all animating elements start with opacity: 0 via CSS)
5. Above-fold content (hero section) is visible
6. GSAP core + ScrollTrigger + SplitText load (deferred)
7. main.js initializes: registers GSAP plugins, inits Lenis, sets up
   gsap.matchMedia for reduced-motion, inits global effects (cursor,
   nav, scroll progress bar)
8. about.js initializes: sets up ScrollTrigger instances for each
   section, SplitText for hero headline and pull-quote
9. Below-fold sections animate as visitor scrolls via ScrollTrigger
```

### Animation Architecture Note

```
All about page animations live in src/js/animations/about.js (~30 lines).
This file is loaded conditionally based on data-barba-namespace="about"
or body class. See 00_master_spec.md for the complete JS file architecture.

Global effects (custom cursor, smooth scroll, nav animations, scroll
progress bar, page transitions, film grain overlay) are handled by
their respective global modules and apply to this page automatically.
See 00_master_spec.md for global effect specifications.
```

### Section Background Alternation

To create visual rhythm and help the visitor perceive distinct sections, backgrounds should alternate:

```
Section 1 (Hero):          --color-bg     (#0a0a0a)
Section 2 (Story):         --color-bg     (#0a0a0a)  [or --color-surface if testing]
Section 3 (Values):        --color-bg     (#0a0a0a)
Section 4 (Different):     --color-surface (#141414)
Section 5 (Tech):          --color-bg     (#0a0a0a)
Section 6 (CTA):           --color-surface (#141414)
```

The alternation is subtle — `#0a0a0a` vs `#141414` — but sufficient on dark themes to create visual separation without borders or dividers. Developer should test and adjust if any two adjacent sections feel indistinct.

### Full Page HTML Skeleton

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <!-- Meta, SEO, OG tags as specified in Section 2 -->
  <!-- CSS -->
  <!-- Fonts -->
  <!-- Structured data -->
</head>
<body>

  <a href="#main-content" class="skip-link">Skip to main content</a>

  <!-- Global nav (shared component) -->
  <header>...</header>

  <main id="main-content">

    <section id="about-hero" class="about-hero" aria-labelledby="about-hero-heading">
      <!-- Section 1: Hero / Mission Statement -->
    </section>

    <section id="about-story" class="about-story" aria-labelledby="about-story-heading">
      <!-- Section 2: Founding Story -->
    </section>

    <section id="about-values" class="about-values" aria-labelledby="about-values-heading">
      <!-- Section 3: Values -->
    </section>

    <section id="about-different" class="about-different" aria-labelledby="about-different-heading">
      <!-- Section 4: How We're Different -->
    </section>

    <section id="about-tech" class="about-tech" aria-labelledby="about-tech-heading">
      <!-- Section 5: Technology -->
    </section>

    <section id="about-cta" class="about-cta" aria-labelledby="about-cta-heading">
      <!-- Section 6: Bottom CTA -->
    </section>

  </main>

  <!-- Global footer (shared component) -->
  <footer>...</footer>

  <!-- Voice bubble widget (global) -->
  <!-- JS: GSAP + ScrollTrigger + SplitText for scroll animations (deferred) -->
  <!-- JS: about.js — page-specific animation setup (deferred) -->

</body>
</html>
```

---

## 11. Accessibility Requirements

### WCAG 2.1 AA Compliance

All elements on this page must meet WCAG 2.1 Level AA. Specific requirements:

**Color Contrast**:
- `#f5f5f5` on `#0a0a0a` = ratio 18.4:1 (passes AAA)
- `#999999` on `#0a0a0a` = ratio 6.7:1 (passes AA for body text)
- `#666666` on `#0a0a0a` = ratio 4.2:1 (passes AA for large text only — use ONLY for labels/captions)
- `#ff3b30` on `#0a0a0a` = ratio 4.6:1 (passes AA for large text — acceptable for CTA buttons with white text inside)
- `#ffffff` on `#ff3b30` = ratio 4.5:1 (passes AA for the button text)

**Focus States**:
- All interactive elements (CTA buttons, nav links, secondary CTA link) must have visible focus indicators
- Focus outline: 2px solid var(--color-accent), offset 3px
- Focus must be visible in both light and dark browser themes

**Screen Reader**:
- Each section has `aria-labelledby` pointing to its heading
- Pull-quote should use `<blockquote>` semantically
- Value cards should NOT be `role="listitem"` unless wrapped in a `role="list"` — use `<div>` with semantic headings inside
- CTA buttons must have clear accessible names (the visible text suffices)

**Keyboard Navigation**:
- Tab order follows visual order (hero -> story -> values -> different -> tech -> CTA)
- All interactive elements reachable by keyboard

**Skip-to-content**: Required on this page per `00_master_spec.md` Section 2.8. Include `<a href="#main-content" class="skip-link">Skip to main content</a>` as the first element in `<body>`, and `<main id="main-content">` wrapping all page content.

**Reduced motion**: All animations on this page follow the canonical reduced-motion behavior defined in `00_master_spec.md` Section 12.7. No page-specific overrides. When `prefers-reduced-motion: reduce` is active, all transforms are disabled, transitions are instant, and scroll-reveal elements appear immediately.

**Semantic HTML**:
- Use `<section>`, `<article>`, `<blockquote>`, `<h1>-<h3>` appropriately
- Page should have exactly ONE `<h1>` (the hero headline)
- Story headline, Values headline, Different headline, Tech headline, CTA headline are `<h2>`
- Value card titles are `<h3>`

---

## 12. Performance Budget

### Target Metrics

| Metric | Target | Notes |
|---|---|---|
| **LCP** (Largest Contentful Paint) | < 2.5s | Hero headline is the LCP element. Ensure fonts load fast (preload Inter 800). GSAP core loads first (23KB), everything else deferred. |
| **FID** (First Input Delay) | < 100ms | GSAP + ScrollTrigger are lightweight and non-blocking. All scripts loaded with `defer`. |
| **CLS** (Cumulative Layout Shift) | < 0.1 | Font loading can cause CLS. Use `font-display: swap` with correct fallback metrics. Animating elements start `opacity: 0` in CSS to prevent layout shift. |
| **Total Page Weight** | < 200KB | No images in main content. Assets: CSS, JS (including GSAP stack), fonts, logo SVGs. |
| **Time to Interactive** | < 3.5s | Page is mostly static content with scroll animations. GSAP initializes fast. |

### Asset Budget

```
HTML:       ~8KB  (gzipped)
CSS:        ~6KB  (gzipped, page-specific + shared)
JS (GSAP):  ~38KB (gzipped, GSAP core 23KB + ScrollTrigger 10KB + SplitText 5KB)
JS (page):  ~2KB  (gzipped, about.js + voice bubble trigger)
JS (global): ~8KB (gzipped, Lenis 3KB + cursor/nav/reveal/transitions ~5KB)
Fonts:      ~40KB (Inter subset: 400, 600, 700, 800 weights)
                   (JetBrains Mono subset: 400 weight — only if used)
Logo SVGs:  ~8KB  (4 partner logos as inline SVG or optimized external SVGs)
---
Total:      ~110KB (well under 200KB budget)

Note: GSAP JS (~38KB) is shared across ALL pages via CDN cache. After the
first page load, these are served from browser cache with zero additional
cost. The page-specific JS (about.js) is only ~2KB. Effective incremental
cost of this page's animations is minimal.

All GSAP scripts loaded with `defer` — they do not block rendering.
LCP remains < 2.5s because the hero headline renders before JS executes.
```

### Font Loading Strategy

```html
<!-- Preload the most critical font weight (hero headline) -->
<link rel="preload" href="/fonts/inter-800.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/inter-400.woff2" as="font" type="font/woff2" crossorigin>
```

```css
@font-face {
  font-family: 'Inter';
  font-weight: 400;
  font-display: swap;
  src: url('/fonts/inter-400.woff2') format('woff2');
}
/* Repeat for 600, 700, 800 weights */
```

---

## 13. Implementation Checklist

Use this checklist during and after development to verify completeness.

### Structure
- [ ] Page has correct `<title>` and meta tags
- [ ] Open Graph tags present and correct
- [ ] JSON-LD structured data included
- [ ] Semantic HTML: one `<h1>`, `<h2>` for section headings, `<h3>` for value cards
- [ ] All sections have `id` and `aria-labelledby` attributes
- [ ] Pull-quote uses `<blockquote>` element
- [ ] "About" is marked active in global navigation

### Content (verify word-for-word against this spec)
- [ ] Hero: headline, subheadline, 3 body paragraphs
- [ ] Story: headline, 8 paragraphs, pull-quote in correct position
- [ ] Values: headline, 4 value cards with correct titles and descriptions
- [ ] Different: headline, 7 paragraphs (including "what's included" and "guarantee")
- [ ] Tech: headline, 2 paragraphs, partner logos with "Powered By" label
- [ ] CTA: headline, subheadline, primary button, secondary text link

### Design
- [ ] All design tokens match `fluis_design_tokens.md`
- [ ] Long-form text max-width is 720px
- [ ] Pull-quote max-width is 800px
- [ ] Values grid max-width is 1000px
- [ ] Section background alternation is correct
- [ ] Value card hover state (border brightens only)
- [ ] CTA button hover state (color + glow)
- [ ] Special-treatment paragraphs in Story section are visually distinct
- [ ] 8px spacing grid followed throughout

### Responsive
- [ ] Mobile (< 768px): all text left-aligned, single-column values, full-width button
- [ ] Tablet (768-1024px): 2-column values grid maintained
- [ ] Desktop (> 1024px): full layout as specified
- [ ] Logo row wraps gracefully on mobile
- [ ] Voice bubble does not overlap CTA section on mobile

### Animation (GSAP + ScrollTrigger + SplitText)
- [ ] GSAP 3, ScrollTrigger, and SplitText loaded via CDN (deferred)
- [ ] All animations wrapped in `gsap.matchMedia("(prefers-reduced-motion: no-preference)")`
- [ ] Hero: SplitText LINE reveal on headline with 150ms stagger, `"power2.out"` easing
- [ ] Story: 10-element progressive scroll reveal with 120ms stagger gaps
- [ ] Story: Pull-quote SplitText WORD reveal (40ms stagger) + border draw animation (500ms, `"power2.inOut"`)
- [ ] Story: Pull-quote border and word reveal run concurrently (border starts 300ms after words)
- [ ] Values: 4 cards enter via ScrollTrigger.batch with `"back.out(1.7)"` easing, 100ms intervals
- [ ] Values: Card hover is border-color shift ONLY (no scale, no shadow — Nothing Phone restraint)
- [ ] Different: Content blocks stagger via ScrollTrigger.batch, 150ms intervals, `"power2.out"`
- [ ] Tech: Partner logos fade in with 100ms stagger, hover opacity 0.5 -> 0.8 (200ms, `"power1.out"`)
- [ ] CTA: Standard fadeInUp stagger (headline -> sub -> body -> button, 100ms intervals)
- [ ] CTA: Primary button hover animates background + box-shadow glow (200ms, `"power1.out"`)
- [ ] ScrollTrigger `once: true` set on all one-shot entrance animations
- [ ] Elements visible without JS (no-JS fallback: all elements opacity 1 via CSS)
- [ ] No IntersectionObserver used — all scroll triggers via GSAP ScrollTrigger

### Accessibility
- [ ] Color contrast passes WCAG 2.1 AA for all text combinations
- [ ] Focus indicators visible on all interactive elements
- [ ] Keyboard tab order matches visual order
- [ ] Screen reader announces headings, blockquote, and buttons correctly
- [ ] Skip-to-content link targets `#main-content` per `00_master_spec.md` Section 2.8

### Performance
- [ ] LCP < 2.5s (test with Lighthouse)
- [ ] CLS < 0.1 (test with Lighthouse)
- [ ] Total page weight < 150KB
- [ ] Fonts preloaded (Inter 800 at minimum)
- [ ] `font-display: swap` applied
- [ ] No render-blocking resources

### Integration
- [ ] Primary CTA links to `#book-call` (GoHighLevel calendar widget)
- [ ] Secondary CTA triggers voice bubble widget
- [ ] Global nav renders correctly with About as active page
- [ ] Global footer renders correctly
- [ ] Voice bubble is present and functional

---

## Appendix A: Complete Copy Reference (Plain Text)

For quick copy-paste during implementation, here is every word of finished copy on the page, in order, without design annotations.

---

**SECTION 1 — HERO**

Heading: We Started Fluis.ai for a Simple Reason.

Subheading: We believe every business deserves the power of AI, regardless of their technical expertise.

There's a gap forming right now between small businesses and AI technology. It's growing every single day. And the businesses that can least afford to fall behind — the ones without tech teams, without IT budgets, without time to learn yet another platform — are the ones falling fastest.

We couldn't watch it happen. We saw plumbers losing customers because they couldn't answer the phone while on a job. Electricians whose websites just sat there doing nothing. Consultants missing leads at 2 AM because nobody was there to pick up. These aren't businesses that lack talent or ambition. They lack access. And that's not their fault.

So we built Fluis.ai to be the bridge. Not a platform you figure out yourself. Not software with a login and a learning curve. A service that does everything for you — builds your AI agents, sets up your systems, and only charges you when it actually delivers results. Because if we can't make you money, we shouldn't take yours.

---

**SECTION 2 — FOUNDING STORY**

Heading: The Gap Is Growing. Every Day.

There's a gap forming between small businesses and AI. Not a small one. A gap that gets wider every single day.

Enterprise companies have armies of developers, dedicated support teams, and cutting-edge technology handling their customers around the clock. They have AI answering questions, booking appointments, following up on leads, and closing deals while their teams sleep.

Small businesses have voicemail.

Think about it. The plumber who's brilliant at what he does — but can't answer the phone because he's under someone's kitchen sink. Every missed call is a customer who goes to the next name on Google. The electrician whose website has been the same for three years — it just sits there, doing nothing, while competitors with better tech steal leads at midnight. The consultant who wakes up to find out a potential client tried to reach them at 2 AM and gave up.

And here's the thing most people don't see yet: this gap is accelerating. AI isn't slowing down. Every month the technology gets faster, cheaper, and more capable. Businesses that adopt it now will be miles ahead. Businesses that don't will be trying to catch up to a train that left the station without them.

"In 6-12 months, there's going to be a humongous gap between local businesses and AI. We're here to catch them before they fall behind."

We're not going to watch that happen.

That's why we built Fluis.ai. Not as another software platform. Not as a toolkit you have to learn. We built it as a service — we come in, we set everything up, and your business gets the same AI capabilities that enterprise companies have. Without the complexity. Without the tech headaches. Without the six-figure budget.

You shouldn't have to be a technologist to benefit from technology. You should be able to focus on the work you're great at — fixing pipes, seeing clients, running your business — and let the technology handle the rest. That's what we're here for.

---

**SECTION 3 — VALUES**

Heading: What We Stand For.

Card 1 — Simplicity First:
AI should be dead simple. No jargon. No complexity. No "figure it out yourself." We handle everything so you can focus on what you do best — running your business.

Card 2 — Results Over Promises:
We only charge when we deliver. If our AI agent doesn't book a single appointment, you don't pay. That's not a marketing line — it's how we operate. Every single month.

Card 3 — Transparency:
No contracts. No hidden fees. No surprises. Month-to-month billing. Cancel anytime. We're honest about what AI can do — and what it can't. You'll never get a runaround from us.

Card 4 — Results as a Service:
We're not SaaS — we don't charge you regardless of outcomes. We make money only when we make your business money. If we can't deliver results, we don't deserve your payment. Period.

---

**SECTION 4 — HOW WE'RE DIFFERENT**

Heading: Not Another Software Platform.

We're not SaaS. We don't give you a login and wish you luck. We don't hand you a dashboard full of features and leave you to figure them out. We build everything for you, maintain it for you, and guarantee results.

DIY platforms give you tools. Powerful ones, maybe. But tools are only useful if you have the time and knowledge to use them. Most small business owners don't. They bought the website builder and never finished the site. They signed up for the CRM and it's been sitting empty for months. We don't do that. We do it for you — every bit of it.

SaaS companies charge you whether you get results or not. Your monthly fee hits the same regardless of whether their product booked you a single appointment. We don't operate that way. If our agent doesn't deliver, we don't charge. That's not generosity. That's alignment — our success should depend on your success.

Traditional agencies send you an invoice and disappear until the next invoice. They'll sell you a website, launch it, and move on to the next client. We earn your business every single month. No contracts means we can never coast — we have to keep delivering, or you walk. And that's exactly how it should be.

And we don't nickel-and-dime you either. Every plan comes with a free website, a full CRM with automations, and your AI agent — all set up and ready to go. Other companies charge you for the website, charge you for the CRM, then charge you again for the AI on top. We include everything because half a solution doesn't get results.

Still not sure? Start with a 7-day trial. If our agent doesn't perform, your setup fee is fully refunded. No risk. No hidden gotchas. We put our money where our mouth is because we know what our technology can do.

We exist because we believe there's a better way to help small businesses adopt AI. Not by selling them software they won't use. Not by charging them regardless of results. Not by doing the minimum and disappearing. By doing it for them. Maintaining it for them. And only getting paid when it works.

---

**SECTION 5 — TECHNOLOGY**

Heading: Enterprise-Grade AI. Small Business Pricing.

We use the same AI technology that powers enterprise companies — voice recognition that understands natural conversation, AI that responds in under half a second, and automated scheduling that never sleeps. Your customers get a seamless, professional experience. You get booked appointments and qualified leads.

The difference? We make it affordable and accessible for businesses of any size. No tech team required. No complex setup. No learning curve. Just results.

[Powered By: Deepgram, ElevenLabs, GoHighLevel logos]

---

**SECTION 6 — BOTTOM CTA**

Heading: Let's Talk About Your Business.

Subheading: Book a free 45-minute discovery call. No pressure. No pitch. Just a conversation about what's possible.

[Button] Book a Free Demo
[Link] Or talk to our agent right now

---

## Appendix B: Cross-References

This specification references and is consistent with the following source files:

| File | Used For |
|---|---|
| `execution/internal/knowledge/agency.yaml` (v3.0) | Mission, vision, founding story, values, differentiators, brand voice |
| `execution/internal/knowledge/content.yaml` (v3.0) | Value propositions, CTAs, FAQs, messaging pillars |
| `execution/internal/knowledge/website.yaml` (v2.0) | Page map, nav structure, design direction, CTA definitions |
| `execution/internal/knowledge/services.yaml` (v3.0) | Service definitions, technology specs |
| `execution/internal/knowledge/packages.yaml` (v4.0) | RAAS guarantee, pricing philosophy, trial flow |
| `execution/internal/knowledge/market.yaml` (v3.0) | Target audience, pain points, objection rebuttals |
| `execution/internal/website/docs/fluis_design_tokens.md` | All design tokens (colors, typography, spacing, shadows) |

Any changes to the above source files may require updates to this specification.

---

*End of specification. This document contains everything needed to build the About page without additional questions.*
