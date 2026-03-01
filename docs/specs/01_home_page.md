# Homepage Specification — Fluis.ai

**Version**: 2.0
**Last Updated**: 2026-02-28
**Status**: Ready for implementation
**Page**: `index.html`
**Single Conversion Goal**: Book a Free Demo (45-min discovery call via GHL calendar)

> **Animation engine**: GSAP 3 + ScrollTrigger + SplitText + ScrambleText + MorphSVG. See `00_master_spec.md` for the complete animation stack specification.

---

## Page Meta

```html
<title>Fluis.ai — AI Agents That Book Appointments 24/7</title>
<meta name="description" content="Turn your website into a talking website. AI chat and voice agents that qualify leads and book appointments around the clock. No results? No charge.">
<meta property="og:title" content="Fluis.ai — AI Agents That Book Appointments 24/7">
<meta property="og:description" content="Turn your website into a talking website. AI chat and voice agents that qualify leads and book appointments around the clock. No results? No charge.">
<meta property="og:type" content="website">
<meta property="og:url" content="https://fluis.ai">
<meta name="twitter:card" content="summary_large_image">
<link rel="canonical" href="https://fluis.ai">
```

---

## Design Tokens Reference

> **Design tokens**: All CSS custom properties are defined in `docs/fluis_design_tokens.md` and governed by `00_master_spec.md` Section 1. Do not redefine tokens in page-level specs.

<!-- Token definitions live in the canonical design tokens file. See docs/fluis_design_tokens.md and 00_master_spec.md Section 1 for the full :root block. -->

---

## Global Animation Utilities

> All easing curves reference tokens defined in `00_master_spec.md` Section 1.7. See that section for the exact `cubic-bezier()` values and GSAP easing string equivalents.

> **GSAP replaces IntersectionObserver**: All scroll-triggered animations on this page use GSAP ScrollTrigger instead of IntersectionObserver. ScrollTrigger provides pinning, scrubbing, and batching capabilities that IntersectionObserver cannot. The `.animate-in` / `.visible` class pattern is retired in favor of GSAP-driven reveals.

### Default Reveal Pattern (GSAP ScrollTrigger)

All elements with class `.reveal` are animated in via `ScrollTrigger.batch` for performance (single observer instance, not one per element):

```javascript
// Default reveal — replaces IntersectionObserver + .animate-in/.visible
gsap.set('.reveal', { opacity: 0, y: 24 });

ScrollTrigger.batch('.reveal', {
  onEnter: (batch) => {
    gsap.to(batch, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power2.out',
      stagger: 0.1,
      overwrite: true
    });
  },
  start: 'top 85%',
  once: true
});
```

### CSS Fallback (no-JS / reduced-motion)

```css
/* Ensure content is visible if JS fails or user prefers reduced motion */
@media (prefers-reduced-motion: reduce) {
  .reveal { opacity: 1 !important; transform: none !important; }
}
```

### GSAP Easing Reference (used throughout this spec)

| GSAP String | Usage |
|---|---|
| `"power2.out"` | Default reveal / counter animations |
| `"power4.inOut"` | SVG morph transitions |
| `"back.out(1.7)"` | Overshoot + settle (cards, tiles, badges) |
| `"elastic.out(1, 0.3)"` | Spring-back on magnetic buttons / tilt cards |
| `"none"` | Linear (scrub-linked animations) |

### Retained CSS Animations

```css
/* Scroll indicator bounce — kept as CSS animation (not scroll-linked) */
@keyframes bounce {
  0%, 100% { transform: translateX(-50%) translateY(0); opacity: 0.4; }
  50% { transform: translateX(-50%) translateY(8px); opacity: 0.8; }
}

/* Guarantee glow pulse — kept as CSS animation (ambient, not scroll-linked) */
@keyframes glowPulse {
  0%, 100% { box-shadow: 0 0 20px var(--color-accent-glow); }
  50%      { box-shadow: 0 0 40px var(--color-accent-glow); }
}

/* Gradient orb breathing — kept as CSS animation (ambient, not scroll-linked) */
@keyframes orbFloat {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(30px, -20px) scale(1.05); }
  66% { transform: translate(-20px, 15px) scale(0.95); }
}
```

---

## Page Layout Container

```html
<main id="homepage">
  <!-- Section 1: Hero -->
  <!-- Section 2: Problem Statement -->
  <!-- Section 3: Solution -->
  <!-- Section 4: How It Works -->
  <!-- Section 5: Services Overview -->
  <!-- Section 6: RAAS Guarantee -->
  <!-- Section 7: Industries -->
  <!-- Section 8: FAQ -->
  <!-- Section 9: Final CTA -->
</main>
```

All sections use a shared container for horizontal padding and max-width:

```css
.section-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-md);
}

@media (min-width: 768px) {
  .section-container {
    padding: 0 var(--space-xl);
  }
}
```

---
---

## SECTION 1: HERO

**HTML Element**: `<section id="hero">`
**Purpose**: Pass the 5-second test. Visitor must instantly know what Fluis.ai does, who it is for, and why they should care.
**Vertical Space**: 100vh on desktop, auto on mobile (min-height: 100svh)
**Background**: `var(--color-bg)` with a subtle dot-grid pattern overlay at 6% opacity

---

### 1.1 Headline Options

#### Option A: "Your Website, But It Talks."

**The headline**: Your Website, But It Talks.

**Why it works**:
- Uses the "Curiosity Gap" formula. The reader immediately wonders: "What does that mean? How does a website talk?" This creates an open loop they must resolve by reading further.
- Short, punchy, seven words. Passes the billboard test.
- Introduces the core product concept ("Talking Websites") without jargon.
- The word "your" personalizes it. It is about THEIR business, not Fluis.ai.
- The comma creates a pause before the reveal ("But It Talks"), which mimics speech rhythm and feels conversational. Matches the brand voice of "a smart friend who knows tech."
- Leverages the Zeigarnik Effect: the statement is incomplete (what does "talks" mean?) and the brain wants closure.

**Why it might not work**:
- Does not immediately state the business outcome (appointments, leads, revenue). The visitor has to read the subheadline to understand the practical benefit.
- Could momentarily confuse very literal-minded visitors ("Is this a chatbot? A voice assistant? What?").
- Does not mention AI explicitly, which could mean visitors who are specifically seeking AI solutions may not immediately self-identify.

**Verdict**: High curiosity, high memorability, requires strong subheadline to land the business context.

---

#### Option B: "Never Miss a Lead Again."

**The headline**: Never Miss a Lead Again.

**Why it works**:
- Uses the "Never {unpleasant event} again" formula from sk011. Directly addresses the core pain point: missed calls, lost leads, revenue left on the table.
- Loss Aversion (sk015): framed around what they are LOSING, not what they could gain. Losses feel twice as painful as equivalent gains.
- Uses business owner language: "lead" is a word every SMB owner knows and cares about.
- Extremely clear. No ambiguity. Passes the 5-second test immediately.
- Creates urgency through the word "again" — implies this has already been happening to them, which triggers the Availability Heuristic.

**Why it might not work**:
- Generic. Many competitors and SaaS tools use variants of "never miss a lead." It does not differentiate Fluis.ai or introduce the Talking Websites concept.
- Does not create curiosity. The visitor understands the claim but may not feel compelled to explore further because the headline resolves itself entirely.
- Lacks personality. It is functional but not memorable. It will not stick in someone's mind the way Option A will.

**Verdict**: Safe, clear, benefit-driven. But it is a category headline, not a brand headline. Does not differentiate.

---

#### Option C: "Turn Your Website Into Your Best Employee."

**The headline**: Turn Your Website Into Your Best Employee.

**Why it works**:
- Uses the "Turn {input} into {outcome}" formula from sk011.
- Metaphor makes the abstract concept concrete. A "best employee" is someone who works 24/7, never calls in sick, always answers the phone, always books the appointment. Business owners immediately understand this because they think in terms of staff.
- Bridges the technology gap: instead of explaining AI agents, CRM integrations, and voice widgets, it says "employee." Non-tech owners get it.
- Anchoring Effect (sk015): implicitly anchors against the cost of an actual employee ($40k/yr) vs. $247/mo.
- Personalized with "your" — it is about their business.

**Why it might not work**:
- Slightly longer (9 words) but still acceptable for a hero headline.
- "Best employee" could feel exaggerated to skeptical visitors, especially pre-launch with no social proof to back it up.
- Does not mention the specific mechanism (talking, voice, chat). The visitor knows the outcome but not the product.
- Metaphor requires the subheadline to ground it in reality.

**Verdict**: Strong emotional resonance for SMB owners who think in terms of staff and payroll. Good metaphor. Needs subheadline to explain the how.

---

### RECOMMENDED: Option A — "Your Website, But It Talks."

**Rationale**: This is a brand-building headline, not a category headline. Option B is safe but forgettable. Option C is strong but doesn't introduce the unique concept. Option A plants the "Talking Websites" idea from the first second. It creates curiosity that pulls them into the subheadline. Combined with a benefit-driven subheadline, it delivers both differentiation AND clarity. For a pre-launch brand with zero social proof, memorability and differentiation are more valuable than playing it safe.

---

### 1.2 Complete Hero Section Spec

#### Headline

**Text**: Your Website, But It Talks.

**Styling**:
```css
.hero-headline {
  font-family: var(--font-body);
  font-size: var(--text-hero);  /* clamp(2.75rem, 6vw, 4.5rem) */
  font-weight: 800;
  line-height: 1.05;
  letter-spacing: -0.03em;
  color: var(--color-text);
  max-width: 14ch;  /* Forces natural line break for rhythm */
  margin: 0 0 var(--space-md) 0;
}
```

**Line break behavior**: On most viewports, this should break as:
```
Your Website,
But It Talks.
```

The `max-width: 14ch` forces this. The comma creates a natural breath point on the first line, and "But It Talks." lands as a reveal on the second line.

---

#### Subheadline

**Text**: AI agents that live on your website, answer your customers, and book appointments 24/7. Agent doesn't book? You don't pay.

**Word count**: 22 words. Under the 25-word max.

**Why this works**:
- First half explains what the product does in pure business language: "AI agents that live on your website, answer your customers, and book appointments 24/7."
- Second half delivers the RAAS guarantee in five words: "No results? No charge."
- The three verbs (live, answer, book) create a rhythm and paint a picture of what the "talking website" actually does.
- "24/7" addresses the after-hours pain point without stating the problem explicitly.
- Ending on the guarantee creates a risk-reversal mic drop.

**Styling**:
```css
.hero-subheadline {
  font-family: var(--font-body);
  font-size: var(--text-subheading);  /* clamp(1.25rem, 2.5vw, 1.5rem) */
  font-weight: 400;
  line-height: 1.5;
  color: var(--color-text-muted);
  max-width: 540px;
  margin: 0 0 var(--space-lg) 0;
}
```

---

#### Primary CTA Button

**Text**: Book a Free Demo

**Destination**: `#book-call` (scrolls to GHL calendar embed or opens calendar modal)

**Styling**:
```css
.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-sm) var(--space-lg);  /* 16px 32px */
  font-family: var(--font-body);
  font-size: var(--text-body);
  font-weight: 600;
  color: #ffffff;
  background-color: var(--color-accent);
  border: none;
  border-radius: var(--radius-full);  /* Pill shape */
  cursor: pointer;
  transition: background-color var(--transition-fast), transform var(--transition-fast);
  text-decoration: none;
  min-height: 48px;  /* Touch target */
}

.btn-primary:hover {
  background-color: var(--color-accent-hover);
  transform: translateY(-1px);
}

.btn-primary:active {
  transform: translateY(0);
}
```

**Why "Book a Free Demo"**:
- Uses the CTA formula: [Action Verb] + [What They Get] + [Qualifier].
- "Book" = action verb. "Demo" = what they get. "Free" = qualifier that triggers the Zero-Price Effect.
- "Free" is psychologically different from "cheap" or "low cost." It removes the financial risk entirely from the first interaction.
- "Demo" implies they will SEE the product work, not just hear a sales pitch. This aligns with the sales process (show website, demo chat, demo voice, let them try it).

---

#### Secondary CTA Button

**Text**: Try the Agent Now

**Action**: Triggers the live voice agent bubble on the page. JavaScript click handler opens/activates the floating voice widget.

**Styling**:
```css
.btn-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-xs);
  padding: var(--space-sm) var(--space-lg);
  font-family: var(--font-body);
  font-size: var(--text-body);
  font-weight: 500;
  color: var(--color-text);
  background-color: transparent;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  cursor: pointer;
  transition: border-color var(--transition-fast), color var(--transition-fast);
  text-decoration: none;
  min-height: 48px;
}

.btn-secondary:hover {
  border-color: var(--color-text-muted);
  color: #ffffff;
}
```

**Why "Try the Agent Now"**:
- Leverages the Endowment Effect: interacting with the live demo creates a sense of ownership. They have "tried" it, and now they are more likely to want to keep it.
- "Now" invokes Present Bias — emphasizes immediate action.
- This CTA exists for visitors who are curious but not ready to commit to a call. It lets them experience the product risk-free in 3 seconds.
- The voice bubble is the product. Letting them try it IS the demo.

**Icon**: Include a small waveform/audio icon (SVG, 16x16) to the left of the text to visually signal "voice."

```html
<a href="#" class="btn-secondary" data-action="trigger-voice-bubble">
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <!-- Simple 3-bar waveform icon -->
    <rect x="2" y="6" width="2" height="4" rx="1" fill="currentColor"/>
    <rect x="7" y="3" width="2" height="10" rx="1" fill="currentColor"/>
    <rect x="12" y="5" width="2" height="6" rx="1" fill="currentColor"/>
  </svg>
  Try the Agent Now
</a>
```

---

#### CTA Button Layout

On desktop, buttons sit side by side with `var(--space-sm)` (16px) gap.
On mobile (below 480px), buttons stack vertically, full width, primary on top.

```css
.hero-cta-group {
  display: flex;
  gap: var(--space-sm);
  flex-wrap: wrap;
  margin-bottom: var(--space-xl);
}

@media (max-width: 480px) {
  .hero-cta-group {
    flex-direction: column;
  }
  .hero-cta-group .btn-primary,
  .hero-cta-group .btn-secondary {
    width: 100%;
    text-align: center;
  }
}
```

---

#### Trust Badges Row

Four badges displayed in a horizontal row below the CTAs. These serve as micro-proof: they answer objections before the visitor has even scrolled.

**Badge 1**: "Done For You"
- Counters the "I'm not tech-savvy" fear. Signals DFY positioning.

**Badge 2**: "7-Day Free Trial"
- Zero-Price Effect. Free trial = no financial risk.

**Badge 3**: "No Results, No Charge"
- RAAS guarantee. The strongest trust signal. Risk Reversal.

**Badge 4**: "Setup Fee Fully Refundable"
- Removes the last objection: "What about the setup fee?" Answer: fully refundable.

**Styling**:
```css
.trust-badges {
  display: flex;
  gap: var(--space-md);
  flex-wrap: wrap;
}

.trust-badge {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  font-family: var(--font-body);
  font-size: var(--text-small);  /* 0.875rem / 14px */
  color: var(--color-text-muted);
  white-space: nowrap;
}

.trust-badge::before {
  content: '';
  display: block;
  width: 6px;
  height: 6px;
  background-color: var(--color-accent);
  border-radius: 50%;
  flex-shrink: 0;
}
```

Each badge is prefixed with a small red dot (6px circle in `--color-accent`). This creates visual rhythm and uses accent color sparingly.

**Mobile**: On screens below 640px, badges wrap into a 2x2 grid.

```css
@media (max-width: 640px) {
  .trust-badges {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-sm);
  }
}
```

---

#### Scroll Indicator

```css
.hero-scroll-hint {
  position: absolute;
  bottom: var(--space-lg);
  left: 50%;
  transform: translateX(-50%);
  color: var(--color-text-dim);
  animation: bounce 2s var(--ease-smooth) infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateX(-50%) translateY(0); opacity: 0.4; }
  50% { transform: translateX(-50%) translateY(8px); opacity: 0.8; }
}
```

The scroll indicator is purely decorative and hidden from screen readers. It uses a subtle bounce animation to hint at below-fold content, particularly important on mobile where the hero fills the viewport.

---

#### Visual Treatment

NO stock photos. NO product screenshots (the product is a voice bubble — they will experience it live). Instead, the hero relies on typography, whitespace, and layered ambient effects.

```css
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  background-color: var(--color-bg);
  overflow: hidden;
}
```

---

##### Dot-Grid Canvas Background

**Replaces** the previous CSS `radial-gradient` dot pattern. The new implementation uses a custom `<canvas>` element that enables interactive particle behavior.

**Specification**:
- Custom `<canvas>` element positioned absolutely behind hero content (`z-index: 0`)
- White dots in a 30px grid at 30% opacity on `var(--color-bg)`
- Dot color adapts to theme: white dots on dark mode, dark dots on light mode via `var(--color-text-dim)`
- Dots scatter when cursor approaches within a 150px radius, ease back when cursor leaves
- `requestAnimationFrame` loop for rendering
- Pause rendering when tab is hidden (`document.addEventListener('visibilitychange', ...)`)
- Reduce to 50px grid spacing on mobile (`window.innerWidth < 768`)
- Performance gate: only enable scatter interaction when `navigator.hardwareConcurrency > 4`

```html
<canvas id="hero-dot-grid" aria-hidden="true"></canvas>
```

```javascript
// Pseudocode — dot-grid canvas
const canvas = document.getElementById('hero-dot-grid');
const ctx = canvas.getContext('2d');
const SPACING = window.innerWidth < 768 ? 50 : 30;
const DOT_RADIUS = 1;
const DOT_OPACITY = 0.3;
const SCATTER_RADIUS = 150;
let mouseX = -1000, mouseY = -1000;
let dots = [];
let paused = false;

function initDots() {
  dots = [];
  for (let x = 0; x < canvas.width; x += SPACING) {
    for (let y = 0; y < canvas.height; y += SPACING) {
      dots.push({ baseX: x, baseY: y, x, y });
    }
  }
}

function render() {
  if (paused) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Get dot color from CSS custom property
  const dotColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--color-text-dim').trim();

  dots.forEach(dot => {
    const dx = mouseX - dot.baseX;
    const dy = mouseY - dot.baseY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < SCATTER_RADIUS) {
      const force = (SCATTER_RADIUS - dist) / SCATTER_RADIUS;
      dot.x += (dot.baseX - dx * force * 0.5 - dot.x) * 0.1;
      dot.y += (dot.baseY - dy * force * 0.5 - dot.y) * 0.1;
    } else {
      dot.x += (dot.baseX - dot.x) * 0.08; // Ease back
      dot.y += (dot.baseY - dot.y) * 0.08;
    }

    ctx.beginPath();
    ctx.arc(dot.x, dot.y, DOT_RADIUS, 0, Math.PI * 2);
    ctx.fillStyle = dotColor;
    ctx.globalAlpha = DOT_OPACITY;
    ctx.fill();
  });

  requestAnimationFrame(render);
}

document.addEventListener('visibilitychange', () => {
  paused = document.hidden;
  if (!paused) requestAnimationFrame(render);
});
```

```css
#hero-dot-grid {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}
```

**Reduced motion**: When `prefers-reduced-motion: reduce` is active, the canvas still renders the static dot grid but the scatter interaction is disabled (dots remain fixed at their base positions).

---

##### Gradient Orbs (Ambient Background)

Two absolutely-positioned divs with heavy blur that provide ambient "breathing" movement behind the hero content. These are CSS-only (no GSAP needed) for zero JS cost.

```html
<div class="hero-orb hero-orb--red" aria-hidden="true"></div>
<div class="hero-orb hero-orb--neutral" aria-hidden="true"></div>
```

```css
.hero-orb {
  position: absolute;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.12;
  pointer-events: none;
  z-index: 0;
}

.hero-orb--red {
  background: var(--color-accent);
  top: 10%;
  right: 15%;
  animation: orbFloat 20s ease-in-out infinite;
}

.hero-orb--neutral {
  background: var(--color-text-muted);
  bottom: 20%;
  left: 10%;
  animation: orbFloat 20s ease-in-out infinite 10s; /* 10s offset for phase difference */
}

/* orbFloat keyframes defined in Global Animation Utilities above */
```

**Reduced motion**: Orb animations are disabled. Orbs remain static at their initial position, providing ambient color without movement.

---

##### Cursor Spotlight

A faint radial gradient that follows the cursor across the hero, creating a subtle red glow effect. Implemented as a CSS `::before` pseudo-element driven by JS-set custom properties.

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

```javascript
// Update cursor position custom properties on mousemove
const hero = document.getElementById('hero');
hero.addEventListener('mousemove', (e) => {
  const rect = hero.getBoundingClientRect();
  hero.style.setProperty('--mouse-x', (e.clientX - rect.left) + 'px');
  hero.style.setProperty('--mouse-y', (e.clientY - rect.top) + 'px');
});
```

**Desktop only**: The cursor spotlight is hidden on touch devices via `@media (hover: hover)`. On touch devices, the `::before` pseudo has `display: none`.

---

#### Animation: Entrance Sequence (GSAP)

The hero uses a choreographed GSAP timeline for its entrance. This replaces the previous CSS `@keyframes` approach and enables SplitText character/word-level control.

##### Headline — SplitText Character Reveal

The headline characters animate in with stagger, creating a typewriter-meets-3D effect.

```javascript
// Hero entrance timeline
const heroTL = gsap.timeline({ delay: 0.2 });

// 1. Headline — SplitText character animation
const headlineSplit = new SplitText('.hero-headline', { type: 'chars' });
gsap.set(headlineSplit.chars, { opacity: 0, y: 100, rotationX: -90 });

heroTL.to(headlineSplit.chars, {
  opacity: 1,
  y: 0,
  rotationX: 0,
  duration: 0.8,
  ease: 'back.out(1.7)',
  stagger: 0.02  // 20ms gap between characters
});
```

**Why SplitText**: Individual character animation creates a dramatic first impression that basic `fadeInUp` cannot achieve. The `rotationX: -90` makes characters appear to flip up from below, and `back.out(1.7)` adds a satisfying overshoot before settling.

##### Subheadline — Blur-to-Sharp Word Reveal

Words animate from blurred and translucent to sharp and visible, creating a focus-pull effect.

```javascript
// 2. Subheadline — blur-to-sharp (150ms after headline completes)
const subSplit = new SplitText('.hero-subheadline', { type: 'words' });
gsap.set(subSplit.words, { opacity: 0, y: 20, filter: 'blur(10px)' });

heroTL.to(subSplit.words, {
  opacity: 1,
  y: 0,
  filter: 'blur(0px)',
  duration: 0.6,
  ease: 'power2.out',
  stagger: 0.04
}, '-=0.45');  // Overlap with headline tail end
```

##### CTA Buttons — Magnetic Behavior

Buttons fade in via the timeline, then gain permanent magnetic interaction behavior.

```javascript
// 3. CTA buttons — fade in with slide
heroTL.from('.hero-cta-group', {
  opacity: 0,
  y: 24,
  duration: 0.6,
  ease: 'power2.out'
}, '-=0.3');

// 4. Trust badges — simple fade (no slide)
heroTL.from('.trust-badges', {
  opacity: 0,
  duration: 0.6,
  ease: 'power2.out'
}, '-=0.3');
```

**Magnetic button behavior** (persistent, not timeline-dependent):

Both `.btn-primary` and `.btn-secondary` in the hero have a magnetic pull effect. On hover, the button translates 30% toward the cursor position. On mouse leave, it springs back with elastic easing.

```javascript
// Magnetic CTA buttons — applied after entrance completes
document.querySelectorAll('.hero .btn-primary, .hero .btn-secondary').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(btn, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.3,
      ease: 'power2.out'
    });
  });

  btn.addEventListener('mouseleave', () => {
    gsap.to(btn, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.3)'  // Spring-back
    });
  });
});
```

**Red glow intensify on hover** (primary CTA only):

```css
.hero .btn-primary {
  transition: box-shadow 0.3s ease;
}

.hero .btn-primary:hover {
  box-shadow: 0 0 30px rgba(255, 59, 48, 0.3), 0 0 60px rgba(255, 59, 48, 0.1);
}
```

##### Complete Entrance Timeline Summary

| Order | Element | Technique | Duration | Easing | Overlap |
|---|---|---|---|---|---|
| 1 | Headline chars | SplitText stagger (20ms/char), `y:100`, `rotationX:-90` | 800ms | `back.out(1.7)` | -- |
| 2 | Subheadline words | SplitText stagger (40ms/word), `blur(10px)`, `y:20` | 600ms | `power2.out` | -450ms |
| 3 | CTA buttons | `opacity:0`, `y:24` | 600ms | `power2.out` | -300ms |
| 4 | Trust badges | `opacity:0` | 600ms | `power2.out` | -300ms |

**Why this sequence**: The headline loads first because it must pass the 5-second test. Character-level animation draws the eye to each word as it appears. The subheadline begins revealing before the headline fully completes (overlap of -450ms) to maintain momentum. CTAs follow naturally. Trust badges appear last because they are supporting content, not primary.

**Reduced motion**: All GSAP animations on this page are wrapped in `gsap.matchMedia("(prefers-reduced-motion: no-preference)")`. When `prefers-reduced-motion: reduce` is active, all elements are immediately visible with no transforms, no SplitText animation, no magnetic behavior, and no canvas interaction. See `00_master_spec.md` Section 12.7.

---

#### Mobile Layout (below 768px)

```css
@media (max-width: 768px) {
  .hero {
    min-height: 100svh;
    padding: var(--space-3xl) 0 var(--space-2xl);
    text-align: left;  /* Keep left-aligned, not centered */
  }

  .hero-headline {
    font-size: clamp(2.25rem, 9vw, 3rem);
    max-width: none;
  }

  .hero-subheadline {
    font-size: 1.125rem;
    max-width: none;
  }
}
```

**Note**: Keep text left-aligned on mobile. Centered text is harder to read on narrow screens, and left alignment feels more direct and confident, which matches the brand voice.

---

#### HTML Structure

```html
<section id="hero" class="hero">
  <div class="section-container">
    <h1 class="hero-headline">Your Website, But It Talks.</h1>
    <p class="hero-subheadline">
      AI agents that live on your website, answer your customers,
      and book appointments 24/7. Agent doesn't book? You don't pay.
    </p>
    <div class="hero-cta-group">
      <a href="#book-call" class="btn-primary">Book a Free Demo</a>
      <a href="#" class="btn-secondary" data-action="trigger-voice-bubble">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <rect x="2" y="6" width="2" height="4" rx="1" fill="currentColor"/>
          <rect x="7" y="3" width="2" height="10" rx="1" fill="currentColor"/>
          <rect x="12" y="5" width="2" height="6" rx="1" fill="currentColor"/>
        </svg>
        Try the Agent Now
      </a>
    </div>
    <div class="trust-badges" aria-label="Trust indicators">
      <span class="trust-badge">Done For You</span>
      <span class="trust-badge">7-Day Free Trial</span>
      <span class="trust-badge">No Results, No Charge</span>
      <span class="trust-badge">Setup Fee Fully Refundable</span>
    </div>
    <!-- Scroll indicator — signals more content below -->
    <div class="hero-scroll-hint" aria-hidden="true">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M7 13l5 5 5-5M7 7l5 5 5-5"/>
      </svg>
    </div>
  </div>
</section>
```

---

#### Psychology Summary for Section 1

| Principle | How It Is Applied |
|---|---|
| Curiosity Gap | "But It Talks" creates an open loop that must be resolved |
| Zeigarnik Effect | Incomplete understanding pulls visitor into the subheadline |
| Loss Aversion | "No results? No charge" frames risk around what they could lose |
| Zero-Price Effect | "Free Demo" and "Free Trial" trigger irrational preference for free |
| Endowment Effect | "Try the Agent Now" lets them interact, creating sense of ownership |
| Present Bias | "Now" emphasizes immediate action |
| Risk Reversal | Every trust badge reduces perceived risk |
| Activation Energy | Two easy first steps: book a call or talk to the agent. Trivially low effort |

---
---

## SECTION 2: PROBLEM STATEMENT — "The Gap"

**HTML Element**: `<section id="problem">`
**Purpose**: Name the pain. Make it visceral and specific. Use statistics to make the abstract real.
**Background**: `var(--color-surface)` (#141414) to visually distinguish from the hero above
**Vertical Padding**: `var(--space-3xl)` top and bottom (96px)

---

### 2.1 Headline Options

#### Option A (RECOMMENDED): "Right Now, Your Business Is Losing Customers."

**Why it works**:
- Present tense + loss framing. It is not a hypothetical. It is happening RIGHT NOW.
- Loss Aversion: "losing customers" hits harder than "could gain more customers."
- Personal: "Your business" makes it about them specifically.
- Creates urgency without being pushy.
- Availability Heuristic: the reader will immediately think of their own missed calls and lost jobs.

**Why it might not work**:
- Could feel accusatory to visitors who don't think they have a problem. But these are not the target audience — the target audience KNOWS they miss calls.

---

#### Option B: "Every Missed Call Is a Lost Customer."

**Why it works**:
- Simple cause-and-effect statement. Concrete and specific.
- "Missed call" is visceral for SMB owners who have experienced this.

**Why it might not work**:
- Focuses only on phone calls. Some visitors might not think of their problem in terms of "calls" — they might think of web inquiries, DMs, or walk-in traffic.

---

#### Option C: "While You Work, Your Phone Keeps Ringing."

**Why it works**:
- Paints a picture. The plumber under a sink. The electrician on a ladder. The phone buzzing in their pocket.
- Specific and visual. Creates an immediate scene in the reader's mind.

**Why it might not work**:
- Does not name the consequence. Implies the problem but does not state the cost.

---

### RECOMMENDED: Option A — "Right Now, Your Business Is Losing Customers."

**Rationale**: It is the most direct, the most visceral, and it frames the problem as a current ongoing loss. The present tense ("is losing") creates urgency. The word "customers" connects loss to revenue. This headline does the emotional work that the stats below will then validate with data.

---

### 2.2 Complete Problem Section Spec

#### Headline

**Text**: Right Now, Your Business Is Losing Customers.

**Styling**:
```css
#problem .section-heading {
  font-family: var(--font-body);
  font-size: var(--text-section-heading);
  font-weight: 700;
  line-height: 1.15;
  color: var(--color-text);
  margin-bottom: var(--space-md);
  max-width: 20ch;
}
```

---

#### Body Copy

**Text**:

You are on a job. A customer calls. No one answers. They hang up and call your competitor. This happens dozens of times a week to businesses like yours. Most of them never even know it.

**Why this works**:
- PAS structure in miniature. Problem: "no one answers." Agitate: "They call your competitor." Solution is implied (and delivered in Section 3).
- Second-person ("you are on a job") forces the reader to picture THEMSELVES in the scenario. This is the Availability Heuristic at work — vivid, specific scenarios feel more real than abstract claims.
- "Businesses like yours" triggers the Unity Principle — they self-identify as part of this group.
- Final sentence ("Most of them never even know it") is the knife twist. It implies they might be losing money right now without realizing it.

**Styling**:
```css
#problem .section-body {
  font-family: var(--font-body);
  font-size: var(--text-body-lg);
  font-weight: 400;
  line-height: 1.7;
  color: var(--color-text-muted);
  max-width: 600px;
  margin-bottom: var(--space-2xl);
}
```

---

#### Stat Callouts

Two large statistics displayed side by side, with supporting text below each.

**Stat 1**:

Number: 62%
Supporting text: of calls to small businesses go unanswered.

**Stat 2**:

Number: 85%
Supporting text: of those customers will never call back.

**Layout**: Two-column on desktop, stacked on mobile.

```css
.stat-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-xl);
}

@media (max-width: 640px) {
  .stat-grid {
    grid-template-columns: 1fr;
    gap: var(--space-lg);
  }
}

.stat-card {
  /* No background, no border — pure typography */
}

.stat-number {
  font-family: var(--font-mono);
  font-size: var(--text-stat);  /* clamp(3rem, 8vw, 5rem) */
  font-weight: 700;
  line-height: 1;
  color: var(--color-text);
  margin-bottom: var(--space-xs);
}

.stat-description {
  font-family: var(--font-body);
  font-size: var(--text-body-lg);
  font-weight: 400;
  line-height: 1.5;
  color: var(--color-text-muted);
  max-width: 280px;
}
```

**Count-up animation (GSAP)**: The numbers animate from 0 to their target value using GSAP's tweening engine, triggered by ScrollTrigger when the stat enters the viewport.

```javascript
// GSAP counter animation — replaces requestAnimationFrame manual approach
document.querySelectorAll('.stat-number').forEach((el, index) => {
  const target = parseInt(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  const counter = { val: 0 };

  gsap.to(counter, {
    val: target,
    duration: 1.5,
    ease: 'power2.out',
    onUpdate: () => {
      el.textContent = Math.round(counter.val) + suffix;
    },
    scrollTrigger: {
      trigger: el,
      start: 'top 70%',   // threshold ~0.3 equivalent
      once: true
    },
    delay: index * 0.2  // 200ms stagger between stats
  });
});
```

**ScrambleText on stat labels**: The stat description text uses GSAP ScrambleTextPlugin to decode from scrambled characters to the final text, creating an AI-themed reveal effect.

```javascript
// ScrambleText on stat descriptions — matrix-style decode
document.querySelectorAll('.stat-description').forEach((el, index) => {
  gsap.from(el, {
    scrambleText: {
      text: el.textContent,
      chars: '01!<>-_\\/[]{}=+*^?#',
      revealDelay: 0.3,
      speed: 0.4
    },
    duration: 1.2,
    scrollTrigger: {
      trigger: el,
      start: 'top 70%',
      once: true
    },
    delay: index * 0.2  // Stagger matches counter animation
  });
});
```

**HTML**:
```html
<div class="stat-number" data-target="62" data-suffix="%">0%</div>
<p class="stat-description">of calls to small businesses go unanswered.</p>
```

Numbers start displaying "0%" and animate to "62%" and "85%" respectively when scrolled into view. The count-up uses `power2.out` so the animation decelerates as it approaches the target, creating a satisfying "landing" effect. The stat labels simultaneously decode from scrambled characters, reinforcing the AI/tech aesthetic.

**Important note on stat sources**: These statistics are currently unverified (see `content.yaml`). Before going live, verify with real sources or add a general attribution like "Industry research" in small text. Do NOT fabricate specific source citations.

---

#### Visual Design

- **Background**: `var(--color-surface)` creates a darker band that visually separates this section from the hero. This "alternating background" pattern helps visitors perceive distinct sections.
- **No images**. Pure typography and numbers. The statistics ARE the visual.
- **Optional**: A thin `1px` horizontal line in `var(--color-border)` at the very top of the section to reinforce the transition from the hero.

---

#### Animation (GSAP ScrollTrigger)

| Element | Trigger | Delay | Duration | Animation | Easing |
|---|---|---|---|---|---|
| Headline | ScrollTrigger `top 85%` | 0ms | 600ms | `.reveal` default (opacity + y) | `power2.out` |
| Body copy | ScrollTrigger `top 85%` | 100ms | 600ms | `.reveal` default (opacity + y) | `power2.out` |
| Stat 1 (number) | ScrollTrigger `top 70%` | 0ms | 1500ms | GSAP counter `{val:0}` to `{val:62}` | `power2.out` |
| Stat 1 (label) | ScrollTrigger `top 70%` | 0ms | 1200ms | ScrambleText decode from `01!<>-_\\/[]{}=+*^?#` | -- |
| Stat 2 (number) | ScrollTrigger `top 70%` | 200ms | 1500ms | GSAP counter `{val:0}` to `{val:85}` | `power2.out` |
| Stat 2 (label) | ScrollTrigger `top 70%` | 200ms | 1200ms | ScrambleText decode from `01!<>-_\\/[]{}=+*^?#` | -- |

The 200ms stagger between Stat 1 and Stat 2 creates a sequential "one-two punch" effect. The ScrambleText decode on the labels adds an AI/tech aesthetic that reinforces the brand.

---

#### Mobile Layout

- Single column layout. Stats stack vertically.
- Headline font size reduces via `clamp()`.
- All text remains left-aligned.
- Stats still animate on scroll.

---

#### HTML Structure

```html
<section id="problem" class="section-dark">
  <div class="section-container">
    <h2 class="section-heading animate-in">
      Right Now, Your Business Is Losing Customers.
    </h2>
    <p class="section-body animate-in" data-delay="100">
      You are on a job. A customer calls. No one answers. They hang up
      and call your competitor. This happens dozens of times a week to
      businesses like yours. Most of them never even know it.
    </p>
    <div class="stat-grid">
      <div class="stat-card animate-in" data-delay="200">
        <div class="stat-number" data-target="62" data-suffix="%">0%</div>
        <p class="stat-description">of calls to small businesses go unanswered.</p>
      </div>
      <div class="stat-card animate-in" data-delay="350">
        <div class="stat-number" data-target="85" data-suffix="%">0%</div>
        <p class="stat-description">of those customers will never call back.</p>
      </div>
    </div>
  </div>
</section>
```

---

#### Psychology Summary for Section 2

| Principle | How It Is Applied |
|---|---|
| Loss Aversion | Headline frames the status quo as active loss: "losing customers" |
| Availability Heuristic | Vivid scenario (on a job, phone rings, competitor gets the call) makes the problem feel real and immediate |
| Present Bias | "Right Now" — the loss is happening in this moment, not hypothetically |
| Anchoring | 62% and 85% are the first numbers the visitor sees — they anchor all subsequent pricing as cheap by comparison to the cost of lost customers |
| Unity Principle | "businesses like yours" — visitor self-identifies with the problem group |

---
---

## SECTION 3: SOLUTION — "Talking Websites"

**HTML Element**: `<section id="solution">`
**Purpose**: Bridge from problem to solution. Introduce the core concept of "Talking Websites" without jargon.
**Background**: `var(--color-bg)` (#0a0a0a) — alternating from the darker problem section
**Vertical Padding**: `var(--space-3xl)` top and bottom (96px)

---

### 3.1 Headline Options

#### Option A (RECOMMENDED): "What If Your Website Could Answer for You?"

**Why it works**:
- Question formula from sk011: "{Question highlighting the main pain point}?"
- Creates a curiosity gap. The reader imagines their website answering calls and immediately wants to know how.
- "Answer for you" directly addresses the pain from Section 2 (unanswered calls). It connects the problem to the solution seamlessly.
- "What if" is a powerful framing device. It invites the reader to envision a future state without making a hard claim.
- Non-intimidating. It does not say "AI" or "automation" or "technology." It says "your website could answer." Simple.

---

#### Option B: "Meet Your Talking Website."

**Why it works**:
- Direct, punchy, introduces the brand concept.
- "Meet" anthropomorphizes the website, making the technology feel approachable.

**Why it might not work**:
- Assumes the visitor already understands what a "talking website" is. At this point in the page, they don't yet.

---

### RECOMMENDED: Option A — "What If Your Website Could Answer for You?"

**Rationale**: The question creates a natural bridge. Section 2 established the problem (missed calls, lost customers). This headline makes the reader envision the solution as a question they already want answered. It is also more conversational, which fits the brand voice.

---

### 3.2 Complete Solution Section Spec

#### Headline

**Text**: What If Your Website Could Answer for You?

**Styling**: Same as Section 2 heading. `var(--text-section-heading)`, `font-weight: 700`, `max-width: 24ch`.

---

#### Body Copy

**Text**:

We build websites that talk to your customers. When someone visits your site or calls your business, an AI agent greets them, understands what they need, and books the appointment — automatically. You get a new booking in your calendar. They get fast, friendly service. Nobody waits. Nobody gets ignored.

**Why this works**:
- First sentence introduces the concept in six words: "websites that talk to your customers."
- Second sentence explains the mechanism: visit or call -> AI agent greets -> understands -> books.
- Third and fourth sentences show the outcome for BOTH parties (the business owner AND the customer). This is Jobs to Be Done thinking: the owner's job is to get more bookings, the customer's job is to get fast service.
- "Nobody waits. Nobody gets ignored." — Short, parallel structure. Punchy. Resolves the pain from Section 2 with finality.
- No jargon. No mention of CRM, GHL, automation workflows, or technical architecture. Pure business language.

**Styling**:
```css
#solution .section-body {
  font-family: var(--font-body);
  font-size: var(--text-body-lg);
  font-weight: 400;
  line-height: 1.7;
  color: var(--color-text-muted);
  max-width: 620px;
  margin-bottom: var(--space-xl);
}
```

---

#### Visual Treatment — SVG Morph Service Journey

> **Killer Addition #2 from the approved plan.** This replaces the previous static three-node concept illustration with an interactive, scroll-driven SVG morph sequence. This is one of the three signature features that elevates the site from "excellent" to "elite."

Instead of three static icons connected by dashed lines, the solution section uses a **pinned SVG morph** that tells the product story through shape language. A single centered SVG morphs through 4 shapes as the user scrolls, with explanatory text appearing alongside each step.

**The 4 morph stages**:

1. **Browser window** -- "Your website" (starting shape)
2. **Chat bubble** -- "The AI agent activates" (first morph)
3. **Sound waveform** -- "The voice agent speaks" (second morph)
4. **Calendar with checkmark** -- "Appointment booked!" (final morph)

**Why this works**: It literally tells the value proposition through shape language. The website-to-agent-to-booking journey IS the product, animated. Visitors understand the service in 4 seconds without reading a word.

---

##### SVG Shape Specifications

All 4 shapes use a consistent 24x24 viewBox scaled up to ~200x200 display size. Clean line art matching the Lucide icon style (stroke-width 1.5, round linecap/linejoin).

```html
<!-- Shape 1: Browser Window -->
<svg id="morph-shape" viewBox="0 0 24 24" width="200" height="200" fill="none"
     stroke="var(--color-text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path id="morph-path" d="M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5z M3 9h18 M7 6h0 M10 6h0"/>
</svg>

<!-- Shape 2: Chat Bubble (morph target) -->
<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z"/>

<!-- Shape 3: Sound Waveform (morph target) -->
<path d="M2 12h2l2-4 2 8 2-6 2 10 2-8 2 4 2-2 2 6 2-4h2"/>

<!-- Shape 4: Calendar with Checkmark (morph target) -->
<path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6z M4 10h16 M8 3v4 M16 3v4 M9 15l2 2 4-4"/>
```

**Note**: The SVG paths above are illustrative. During build, paths must be normalized to have the same number of anchor points for smooth morphing, or rely on MorphSVGPlugin's `type: "rotational"` to handle mismatched paths automatically.

---

##### ScrollTrigger Pinned Section

The section pins to the viewport while the user scrolls through ~3000px of scroll distance, during which the 4 morph transitions play.

```javascript
// SVG Morph Service Journey
const morphPaths = [
  'M3 5a2 2 0 0 1 2-2h14a2...', // Browser window (full path)
  'M21 15a2 2 0 0 1-2 2H7l...', // Chat bubble (full path)
  'M2 12h2l2-4 2 8 2-6 2 1...',  // Waveform (full path)
  'M4 6a2 2 0 0 1 2-2h12a2...'   // Calendar + check (full path)
];

const morphLabels = [
  { title: 'Your Website', desc: 'A visitor lands on your site.' },
  { title: 'AI Agent Activates', desc: 'The chat agent greets them instantly.' },
  { title: 'Voice Agent Speaks', desc: 'Or they call — and the voice agent answers.' },
  { title: 'Appointment Booked', desc: 'Qualified lead, booked automatically.' }
];

const morphTL = gsap.timeline({
  scrollTrigger: {
    trigger: '#solution',
    pin: true,
    start: 'top top',
    end: '+=3000',        // 3000px of scroll distance for 4 morphs
    scrub: 1,             // Smooth 1:1 scroll-to-progress mapping
    snap: 1 / 3,          // Snap to each morph stage (3 transitions)
    anticipatePin: 1
  }
});

// Morph 1→2: Browser → Chat bubble (0% → 33% scroll)
morphTL.to('#morph-path', {
  morphSVG: { shape: morphPaths[1], type: 'rotational' },
  duration: 0.8,
  ease: 'power4.inOut'
}, 0);

// Morph 2→3: Chat bubble → Waveform (33% → 66% scroll)
morphTL.to('#morph-path', {
  morphSVG: { shape: morphPaths[2], type: 'rotational' },
  duration: 0.8,
  ease: 'power4.inOut'
}, 1);

// Morph 3→4: Waveform → Calendar (66% → 100% scroll)
morphTL.to('#morph-path', {
  morphSVG: { shape: morphPaths[3], type: 'rotational' },
  duration: 0.8,
  ease: 'power4.inOut'
}, 2);

// Text labels crossfade at each morph stage
morphLabels.forEach((label, i) => {
  if (i > 0) {
    morphTL.fromTo(`.morph-label-${i}`,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.3 },
      i - 0.2
    );
    morphTL.to(`.morph-label-${i - 1}`,
      { opacity: 0, y: -20, duration: 0.3 },
      i - 0.3
    );
  }
});
```

---

##### Layout

```css
.solution-morph-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2xl);
  min-height: 100vh;
  padding: var(--space-xl);
}

.morph-visual {
  flex: 0 0 auto;
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.morph-visual svg {
  width: 200px;
  height: 200px;
}

.morph-labels {
  position: relative;
  width: 300px;
  min-height: 120px;
}

.morph-label {
  position: absolute;
  top: 0;
  left: 0;
}

.morph-label__title {
  font-family: var(--font-body);
  font-size: var(--text-subheading);
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: var(--space-xs);
}

.morph-label__desc {
  font-family: var(--font-body);
  font-size: var(--text-body);
  color: var(--color-text-muted);
  line-height: 1.6;
}

/* Progress dots — show which morph stage is active */
.morph-progress {
  display: flex;
  gap: var(--space-sm);
  margin-top: var(--space-md);
}

.morph-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--color-border);
  transition: background 0.3s ease;
}

.morph-dot.active {
  background: var(--color-accent);
}
```

**Mobile** (below 768px): The layout stacks vertically with the SVG centered above the text labels. The SVG scales down to 150x150. The pinned scroll distance reduces to ~2000px for faster mobile scrolling.

```css
@media (max-width: 768px) {
  .solution-morph-container {
    flex-direction: column;
    gap: var(--space-lg);
    text-align: center;
  }

  .morph-visual svg {
    width: 150px;
    height: 150px;
  }

  .morph-labels {
    width: 100%;
  }
}
```

**Reduced motion**: When `prefers-reduced-motion: reduce` is active, the section does NOT pin. All 4 shapes and labels are displayed vertically in sequence (static layout, no morphing). Each stage is visible as a separate block with its icon and text, similar to the original three-node concept flow.

---

##### Retained: Headline and Body Copy

The headline ("What If Your Website Could Answer for You?") and body copy remain above the morph container. They use the standard `.reveal` animation (ScrollTrigger batch, `opacity:0` to `1`, `y:24` to `0`).

---

#### Animation Summary (GSAP)

| Element | Trigger | Duration | Animation | Easing |
|---|---|---|---|---|
| Headline | ScrollTrigger `top 85%` | 600ms | `.reveal` default | `power2.out` |
| Body copy | ScrollTrigger `top 85%` | 600ms | `.reveal` default (100ms stagger) | `power2.out` |
| SVG morph (pinned) | ScrollTrigger pin, scrub, `+=3000` | ~800ms per morph | MorphSVGPlugin `type: "rotational"` | `power4.inOut` |
| Label crossfades | Tied to morph timeline | 300ms per label | opacity + y | `power2.out` |
| Progress dots | Tied to morph timeline | instant | background color toggle | -- |

The SVG morph replaces the previous staggered left-to-right node reveal. The pinned scroll creates a cinematic, focused experience where the visitor watches the product story unfold through shape language.

---

#### HTML Structure

```html
<section id="solution">
  <div class="section-container">
    <h2 class="section-heading reveal">
      What If Your Website Could Answer for You?
    </h2>
    <p class="section-body reveal">
      We build websites that talk to your customers. When someone visits
      your site or calls your business, an AI agent greets them, understands
      what they need, and books the appointment — automatically. You get
      a new booking in your calendar. They get fast, friendly service.
      Nobody waits. Nobody gets ignored.
    </p>

    <!-- SVG Morph Service Journey (pinned on scroll) -->
    <div class="solution-morph-container">
      <div class="morph-visual">
        <svg id="morph-shape" viewBox="0 0 24 24" width="200" height="200"
             fill="none" stroke="var(--color-text)" stroke-width="1.5"
             stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path id="morph-path" d="..."/>  <!-- Browser window shape -->
        </svg>
      </div>
      <div class="morph-labels">
        <!-- Label 0: active initially -->
        <div class="morph-label morph-label-0">
          <div class="morph-label__title">Your Website</div>
          <p class="morph-label__desc">A visitor lands on your site.</p>
        </div>
        <!-- Label 1: appears on morph 1 -->
        <div class="morph-label morph-label-1" style="opacity:0;">
          <div class="morph-label__title">AI Agent Activates</div>
          <p class="morph-label__desc">The chat agent greets them instantly.</p>
        </div>
        <!-- Label 2: appears on morph 2 -->
        <div class="morph-label morph-label-2" style="opacity:0;">
          <div class="morph-label__title">Voice Agent Speaks</div>
          <p class="morph-label__desc">Or they call — and the voice agent answers.</p>
        </div>
        <!-- Label 3: appears on morph 3 -->
        <div class="morph-label morph-label-3" style="opacity:0;">
          <div class="morph-label__title">Appointment Booked</div>
          <p class="morph-label__desc">Qualified lead, booked automatically.</p>
        </div>
        <!-- Progress dots -->
        <div class="morph-progress" aria-hidden="true">
          <div class="morph-dot active"></div>
          <div class="morph-dot"></div>
          <div class="morph-dot"></div>
          <div class="morph-dot"></div>
        </div>
      </div>
    </div>
  </div>
</section>
```

> **Reduced motion fallback HTML**: When `prefers-reduced-motion: reduce` is active, JS removes the pinned scroll and renders all 4 stages as a vertical sequence of static icon + text blocks (similar to the original three-node concept flow). The morph container is restructured to display all labels simultaneously with their corresponding static SVG icons.

---

#### Psychology Summary for Section 3

| Principle | How It Is Applied |
|---|---|
| Curiosity Gap | "What if..." opens a loop the reader must close by reading further |
| Jobs to Be Done | Copy frames the product around the JOB (booking appointments, serving customers) not the TECH (AI models, voice synthesis) |
| Simplicity Bias | Three-node visual is dead simple. Website -> Agent -> Booking. No complexity. |
| Endowment Effect (preview) | Describing the outcome in detail ("new booking in your calendar") lets the reader mentally experience ownership |

---
---

## SECTION 4: HOW IT WORKS — 3 Steps

**HTML Element**: `<section id="how-it-works">`
**Purpose**: Reduce perceived complexity. Show the path from "interested" to "live" is dead simple.
**Background**: `var(--color-surface)` (#141414) — alternating
**Vertical Padding**: `var(--space-3xl)` top and bottom

---

### 4.1 Headline

**Text**: Up and Running in 3 Steps.

**Why this works**:
- Extremely clear. "3 steps" immediately tells the brain: "this is simple."
- "Up and running" is colloquial, non-technical, and implies speed.
- The number 3 is psychologically satisfying (rule of three) and signals low effort.
- BJ Fogg Behavior Model: by reducing perceived effort (Ability), the motivation threshold needed to take action drops significantly.

---

### 4.2 The Three Steps

#### Step 1

**Number**: 01
**Title**: Book a Free Demo
**Description**: We jump on a 45-minute call. You see the website, the chat agent, and the voice agent in action. You try it yourself. No commitment, no pressure. Just a conversation.

**Icon suggestion**: Calendar icon (24x24 SVG)

**Psychology**: Activation Energy. The first step is trivially easy — it is a free call. There is no financial commitment, no technical setup, no forms to fill out. The word "conversation" reframes a sales call as something casual and non-threatening.

---

#### Step 2

**Number**: 02
**Title**: We Build Everything for You
**Description**: Give us 3 days. We set up your website, your AI agent, your CRM, and all your automations. You answer a few questions about your business. We handle the rest.

**Icon suggestion**: Wrench/tools icon (24x24 SVG)

**Psychology**: DFY removes all effort from the customer. "You answer a few questions" is the ONLY thing they need to do. "We handle the rest" is the core DFY promise. "3 days" sets a specific, short timeline — no vague "we'll get back to you." Goal-Gradient Effect: by step 2, they can see the finish line.

---

#### Step 3

**Number**: 03
**Title**: Your AI Agent Goes Live
**Description**: Your agent starts taking calls and booking appointments on day one. You get a 7-day free trial. If it does not book a single appointment, you do not pay. Zero risk.

**Icon suggestion**: Rocket/play icon (24x24 SVG)

**Psychology**: Risk Reversal. The final step ends with the guarantee, which is the last thing the reader remembers (Peak-End Rule). "Day one" emphasizes immediate results (Present Bias). "Zero risk" closes any remaining hesitation.

---

### 4.3 Post-Steps CTA

**Text**: Book a Free Demo

**Destination**: `#book-call`

**Styling**: Same as hero primary CTA (`btn-primary`). Centered below the 3 steps.

**Rationale**: After seeing how simple the process is, the visitor's Activation Energy is at its lowest. Strike while the iron is hot.

---

### 4.4 Visual Layout

**Desktop**: Three columns, each containing a step. A thin horizontal connecting line runs between the step numbers.

```css
.steps-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: var(--space-xl);
  position: relative;
  margin: var(--space-2xl) 0;
}

.step-card {
  text-align: center;
}

.step-number {
  font-family: var(--font-mono);
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-accent);
  margin-bottom: var(--space-sm);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: 1px solid var(--color-accent);
  border-radius: 50%;
}

.step-title {
  font-family: var(--font-body);
  font-size: var(--text-subheading);
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: var(--space-xs);
}

.step-description {
  font-family: var(--font-body);
  font-size: var(--text-body);
  font-weight: 400;
  line-height: 1.6;
  color: var(--color-text-muted);
  max-width: 300px;
  margin: 0 auto;
}
```

**Connecting line**: A thin horizontal line connects the three step numbers. This is implemented as a pseudo-element on the `.steps-grid`.

```css
.steps-grid::before {
  content: '';
  position: absolute;
  top: 20px;  /* Vertically centered on the step numbers */
  left: calc(16.66% + 20px);  /* Start after first circle */
  right: calc(16.66% + 20px);  /* End before last circle */
  height: 1px;
  background: var(--color-border);
  z-index: 0;
}

.step-number {
  position: relative;
  z-index: 1;
  background: var(--color-surface);  /* Sits on top of the line */
}
```

**Mobile** (below 768px): Steps stack vertically as a timeline. The connecting line becomes a vertical line on the left side.

```css
@media (max-width: 768px) {
  .steps-grid {
    grid-template-columns: 1fr;
    gap: var(--space-lg);
    padding-left: var(--space-2xl);
    position: relative;
  }

  .steps-grid::before {
    top: 20px;
    bottom: 20px;
    left: 20px;
    right: auto;
    width: 1px;
    height: auto;
  }

  .step-card {
    text-align: left;
  }

  .step-number {
    position: absolute;
    left: 0;
  }

  .step-description {
    max-width: none;
    margin: 0;
  }
}
```

---

### 4.5 Animation (GSAP Pinned Scrub)

> **Upgraded from basic stagger**: The section now pins to the viewport and reveals each step sequentially tied to scroll position. This creates a cinematic "step through the process" experience instead of a simple staggered fade.

**Pinned section with scrub**:

```javascript
// How It Works — pinned sequential reveal
const howTL = gsap.timeline({
  scrollTrigger: {
    trigger: '#how-it-works',
    pin: true,
    start: 'top top',
    end: '+=2000',       // 2000px of scroll for 3 steps
    scrub: 1,
    anticipatePin: 1
  }
});

// Headline reveals first
howTL.from('.how-it-works .section-heading', {
  opacity: 0, y: 24, duration: 0.3
}, 0);

// Step 1: icon draws in via SVG stroke, text reveals word-by-word
howTL.fromTo('.step-card:nth-child(1) .step-icon path', {
  strokeDasharray: 100,
  strokeDashoffset: 100
}, {
  strokeDashoffset: 0,
  duration: 0.4,
  ease: 'power2.out'
}, 0.3);

const step1Split = new SplitText('.step-card:nth-child(1) .step-description', { type: 'words' });
howTL.from(step1Split.words, {
  opacity: 0, y: 10, stagger: 0.02, duration: 0.3
}, 0.4);

// Connector line grows from step 1 to step 2
howTL.fromTo('.step-connector-1', {
  scaleX: 0, transformOrigin: 'left center'
}, {
  scaleX: 1, duration: 0.3, ease: 'power2.inOut'
}, 0.6);

// Step 2: same pattern
howTL.fromTo('.step-card:nth-child(2) .step-icon path', {
  strokeDasharray: 100, strokeDashoffset: 100
}, {
  strokeDashoffset: 0, duration: 0.4, ease: 'power2.out'
}, 0.7);

const step2Split = new SplitText('.step-card:nth-child(2) .step-description', { type: 'words' });
howTL.from(step2Split.words, {
  opacity: 0, y: 10, stagger: 0.02, duration: 0.3
}, 0.8);

// Connector line grows from step 2 to step 3
howTL.fromTo('.step-connector-2', {
  scaleX: 0, transformOrigin: 'left center'
}, {
  scaleX: 1, duration: 0.3, ease: 'power2.inOut'
}, 0.9);

// Step 3: same pattern
howTL.fromTo('.step-card:nth-child(3) .step-icon path', {
  strokeDasharray: 100, strokeDashoffset: 100
}, {
  strokeDashoffset: 0, duration: 0.4, ease: 'power2.out'
}, 1.0);

const step3Split = new SplitText('.step-card:nth-child(3) .step-description', { type: 'words' });
howTL.from(step3Split.words, {
  opacity: 0, y: 10, stagger: 0.02, duration: 0.3
}, 1.1);

// CTA reveals last
howTL.from('.how-it-works .section-cta', {
  opacity: 0, y: 24, duration: 0.3
}, 1.3);
```

**SVG icon draw-in**: Each step's icon uses `stroke-dasharray` / `stroke-dashoffset` to create a "drawing" effect. The SVG path appears to draw itself as the user scrolls to that step.

**Word-by-word text reveal**: SplitText splits the step description into words, which reveal sequentially with a 20ms stagger. This creates a reading-pace reveal effect.

**Connector line growth**: The connecting line between steps uses `scaleX: 0` to `scaleX: 1` with `transformOrigin: 'left center'`, creating a left-to-right growth effect.

| Element | Scroll Position | Duration | Animation | Easing |
|---|---|---|---|---|
| Section headline | 0% | 300ms | opacity + y reveal | `power2.out` |
| Step 1 icon | 15% | 400ms | SVG stroke draw-in | `power2.out` |
| Step 1 text | 20% | 300ms | SplitText word reveal (20ms stagger) | `power2.out` |
| Connector 1 | 30% | 300ms | scaleX 0 to 1 | `power2.inOut` |
| Step 2 icon | 35% | 400ms | SVG stroke draw-in | `power2.out` |
| Step 2 text | 40% | 300ms | SplitText word reveal (20ms stagger) | `power2.out` |
| Connector 2 | 45% | 300ms | scaleX 0 to 1 | `power2.inOut` |
| Step 3 icon | 50% | 400ms | SVG stroke draw-in | `power2.out` |
| Step 3 text | 55% | 300ms | SplitText word reveal (20ms stagger) | `power2.out` |
| CTA button | 65% | 300ms | opacity + y reveal | `power2.out` |

**Mobile**: On mobile, the pin distance reduces to `+=1200` for faster scrolling. The vertical timeline layout (already specified in the mobile CSS above) works naturally with the scrub animation.

**Reduced motion**: When `prefers-reduced-motion: reduce` is active, the section does NOT pin. All steps appear immediately in their final state. No SVG drawing, no word-by-word reveal, no connector growth. Standard static layout.

---

### 4.6 HTML Structure

```html
<section id="how-it-works" class="section-dark">
  <div class="section-container">
    <h2 class="section-heading animate-in" style="text-align: center;">
      Up and Running in 3 Steps.
    </h2>
    <div class="steps-grid">
      <div class="step-card animate-in" data-delay="150">
        <div class="step-number">01</div>
        <h3 class="step-title">Book a Free Demo</h3>
        <p class="step-description">
          We jump on a 45-minute call. You see the website, the chat agent,
          and the voice agent in action. You try it yourself. No commitment,
          no pressure. Just a conversation.
        </p>
      </div>
      <div class="step-card animate-in" data-delay="300">
        <div class="step-number">02</div>
        <h3 class="step-title">We Build Everything for You</h3>
        <p class="step-description">
          Give us 3 days. We set up your website, your AI agent, your CRM,
          and all your automations. You answer a few questions about your
          business. We handle the rest.
        </p>
      </div>
      <div class="step-card animate-in" data-delay="450">
        <div class="step-number">03</div>
        <h3 class="step-title">Your AI Agent Goes Live</h3>
        <p class="step-description">
          Your agent starts taking calls and booking appointments on day one.
          You get a 7-day free trial. If it does not book a single appointment,
          you do not pay. Zero risk.
        </p>
      </div>
    </div>
    <div class="section-cta animate-in" data-delay="600" style="text-align: center;">
      <a href="#book-call" class="btn-primary">Book a Free Demo</a>
    </div>
  </div>
</section>
```

---

#### Psychology Summary for Section 4

| Principle | How It Is Applied |
|---|---|
| Activation Energy | Step 1 is trivially easy: a free call. No signup, no payment, no technical work |
| BJ Fogg Behavior Model | High motivation (from Sections 2-3) + High ability (just book a call) + Clear prompt (CTA button) = action |
| Goal-Gradient Effect | Three numbered steps show progress and proximity to the finish line. People accelerate when they can see the end |
| Risk Reversal | Step 3 ends with the guarantee, anchoring the process as risk-free |
| Peak-End Rule | The last thing they read is "Zero risk" — this becomes the emotional takeaway |
| Present Bias | "Day one" emphasizes immediate gratification |

---
---

## SECTION 5: SERVICES OVERVIEW — Bento Grid

**HTML Element**: `<section id="services">`
**Purpose**: Show the three service options. Guide the visitor toward Voice Agent (recommended). Do not overwhelm.
**Background**: `var(--color-bg)` (#0a0a0a) — alternating
**Vertical Padding**: `var(--space-3xl)` top and bottom

---

### 5.1 Headline

**Text**: Everything You Need. One Monthly Price.

**Why this works**:
- "Everything you need" counters the objection that they will need to buy multiple tools or services.
- "One monthly price" emphasizes simplicity and transparency. No hidden fees, no add-ons, no surprise invoices.
- Together, they frame the service as all-inclusive and affordable.

---

### 5.2 Subheadline

**Text**: Choose the level of intelligence your business needs. Every plan includes setup, hosting, and support.

**Why this works**:
- "Level of intelligence" positions the tiers as progressions (website -> chat -> voice), not competing products.
- "Every plan includes setup, hosting, and support" preemptively answers "What's included?" before they even click a card.

---

### 5.3 Service Cards

#### Card 1: Website & Hosting

```
Icon:           Globe/window icon (24x24 SVG, var(--color-text-muted))
Label:          WEBSITE & HOSTING
Description:    A professional website built and hosted for your business.
                Mobile-ready, SEO-optimized, and maintained for you.
Price:          From $27/mo
Link text:      Learn More ->
Link:           services.html#website
Border:         1px solid var(--color-border)
Badge:          None
```

---

#### Card 2: Chat Intelligence

```
Icon:           Chat bubble icon (24x24 SVG, var(--color-text-muted))
Label:          CHAT INTELLIGENCE
Description:    An AI chat agent on your website that qualifies leads and
                books appointments while you work. 24/7 coverage.
Price:          $147/mo
Extra line:     Includes free website
Link text:      Learn More ->
Link:           services.html#chat
Border:         1px solid var(--color-border)
Badge:          None
```

---

#### Card 3: Voice Intelligence (RECOMMENDED)

```
Icon:           Waveform/mic icon (24x24 SVG, var(--color-accent))  <-- accent color icon
Label:          VOICE INTELLIGENCE
Description:    A voice AI agent that answers calls and website visitors.
                Talks to your customers, qualifies them, and books the job.
Price:          $247/mo
Extra line:     Includes free website + CRM
Link text:      Learn More ->
Link:           services.html#voice
Border:         1px solid var(--color-accent)  <-- accent border
Badge:          "Recommended" (top-right corner)
```

---

### 5.4 Card Design Spec (Glassmorphism + 3D Tilt)

> **Upgraded from basic hover lift**: Cards now feature glassmorphism styling, 3D tilt on hover via `mousemove`, shimmer edge animation, and `ScrollTrigger.batch` entrance with overshoot easing.

```css
.services-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-md);
}

.service-card {
  /* Glassmorphism base */
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(20px) saturate(150%);
  -webkit-backdrop-filter: blur(20px) saturate(150%);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: var(--radius-lg);
  padding: var(--space-lg);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  /* 3D tilt perspective */
  transform-style: preserve-3d;
  will-change: transform;
}

.service-card:hover {
  border-color: rgba(255, 59, 48, 0.2);
  box-shadow: 0 0 30px rgba(255, 59, 48, 0.06);
}

/* Shimmer edge on hover — 1px gradient sweep across card border */
.service-card::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: var(--radius-lg);
  padding: 1px;
  background: linear-gradient(
    130deg,
    transparent 0%,
    transparent 33%,
    rgba(255, 255, 255, 0.15) 50%,
    transparent 67%,
    transparent 100%
  );
  background-size: 300% 100%;
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.service-card:hover::after {
  opacity: 1;
  animation: shimmerSweep 1.5s ease-in-out;
}

@keyframes shimmerSweep {
  0% { background-position: 200% 0; }
  100% { background-position: -100% 0; }
}

/* Recommended card override */
.service-card--recommended {
  border-color: var(--color-accent);
}

.service-card--recommended:hover {
  border-color: var(--color-accent-hover);
  box-shadow: var(--glow-accent);
}

.service-card__badge {
  position: absolute;
  top: var(--space-sm);
  right: var(--space-sm);
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-accent);
  background: rgba(255, 59, 48, 0.1);
  padding: 4px 12px;
  border-radius: var(--radius-full);
}

.service-card__icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--space-md);
}

.service-card__label {
  font-family: var(--font-mono);
  font-size: var(--text-small);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text-muted);
  margin-bottom: var(--space-xs);
}

.service-card__description {
  font-family: var(--font-body);
  font-size: var(--text-body);
  line-height: 1.6;
  color: var(--color-text-muted);
  margin-bottom: var(--space-md);
  flex: 1;
}

.service-card__price {
  font-family: var(--font-mono);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: var(--space-xs);
}

.service-card__includes {
  font-family: var(--font-body);
  font-size: var(--text-small);
  color: var(--color-text-muted);
  margin-bottom: var(--space-md);
}

.service-card__link {
  font-family: var(--font-body);
  font-size: var(--text-body);
  font-weight: 500;
  color: var(--color-text);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  transition: color var(--transition-fast);
}

.service-card__link:hover {
  color: var(--color-accent);
}

.service-card__link::after {
  content: '\2192';  /* Right arrow */
  transition: transform var(--transition-fast);
}

.service-card__link:hover::after {
  transform: translateX(4px);
}
```

---

### 5.5 Mobile Layout

On mobile (below 768px), cards stack vertically. Voice Intelligence card appears FIRST (moved to top) because it is the recommended option and mobile visitors scroll top-to-bottom.

```css
@media (max-width: 768px) {
  .services-grid {
    grid-template-columns: 1fr;
    gap: var(--space-md);
  }

  /* Reorder: Voice first on mobile */
  .service-card--recommended {
    order: -1;
  }
}
```

**Rationale for mobile reorder**: The Decoy Effect and Default Effect only work if the visitor SEES the recommended option prominently. On desktop, the three-column layout places Voice in the rightmost position (the natural eye-landing spot after scanning). On mobile, putting it first ensures it is the first card they see, and the accent border makes it unmissable.

---

### 5.6 Animation (GSAP ScrollTrigger.batch + 3D Tilt)

**Entrance animation**: Cards use `ScrollTrigger.batch` for efficient single-observer entrance with `back.out(1.7)` overshoot easing.

```javascript
// Service cards — batch entrance with overshoot
gsap.set('.service-card', { opacity: 0, y: 40 });

ScrollTrigger.batch('.service-card', {
  onEnter: (batch) => {
    gsap.to(batch, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'back.out(1.7)',  // Overshoot + settle
      stagger: 0.1,
      overwrite: true
    });
  },
  start: 'top 85%',
  once: true
});
```

**3D tilt on hover** (persistent interaction, desktop only):

```javascript
// 3D tilt effect on service cards — mousemove calculates rotation
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;  // Max 10 degrees
    const rotateY = ((x - centerX) / centerX) * 10;   // Max 10 degrees

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      transformPerspective: 1000,
      duration: 0.3,
      ease: 'power2.out'
    });
  });

  card.addEventListener('mouseleave', () => {
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.3)'  // Organic wobble spring-back
    });
  });
});
```

| Element | Trigger | Duration | Animation | Easing |
|---|---|---|---|---|
| Section heading | ScrollTrigger `top 85%` | 600ms | `.reveal` default | `power2.out` |
| Subheading | ScrollTrigger `top 85%` | 600ms | `.reveal` default (100ms stagger) | `power2.out` |
| Card 1 (Website) | ScrollTrigger.batch `top 85%` | 700ms | opacity + y:40 | `back.out(1.7)` |
| Card 2 (Chat) | ScrollTrigger.batch (100ms stagger) | 700ms | opacity + y:40 | `back.out(1.7)` |
| Card 3 (Voice) | ScrollTrigger.batch (200ms stagger) | 700ms | opacity + y:40 | `back.out(1.7)` |
| Card hover (any) | mousemove | 300ms | 3D tilt rotateX/Y (max 10 deg) | `power2.out` |
| Card leave (any) | mouseleave | 600ms | Spring-back to rotateX/Y: 0 | `elastic.out(1, 0.3)` |

**Reduced motion**: 3D tilt is disabled. Cards use simple opacity fade entrance (no y-transform, no tilt). Shimmer animation is disabled.

---

### 5.7 HTML Structure

```html
<section id="services">
  <div class="section-container">
    <h2 class="section-heading animate-in" style="text-align: center;">
      Everything You Need. One Monthly Price.
    </h2>
    <p class="section-subheading animate-in" data-delay="100" style="text-align: center;">
      Choose the level of intelligence your business needs.
      Every plan includes setup, hosting, and support.
    </p>
    <div class="services-grid">
      <!-- Card 1: Website -->
      <div class="service-card animate-in" data-delay="200">
        <div class="service-card__icon">
          <!-- Globe SVG -->
        </div>
        <span class="service-card__label">Website & Hosting</span>
        <p class="service-card__description">
          A professional website built and hosted for your business.
          Mobile-ready, SEO-optimized, and maintained for you.
        </p>
        <div class="service-card__price">From $27<span class="price-period">/mo</span></div>
        <a href="services.html#website" class="service-card__link">Learn More</a>
      </div>

      <!-- Card 2: Chat -->
      <div class="service-card animate-in" data-delay="300">
        <div class="service-card__icon">
          <!-- Chat bubble SVG -->
        </div>
        <span class="service-card__label">Chat Intelligence</span>
        <p class="service-card__description">
          An AI chat agent on your website that qualifies leads and
          books appointments while you work. 24/7 coverage.
        </p>
        <div class="service-card__price">$147<span class="price-period">/mo</span></div>
        <span class="service-card__includes">Includes free website</span>
        <a href="services.html#chat" class="service-card__link">Learn More</a>
      </div>

      <!-- Card 3: Voice (Recommended) -->
      <div class="service-card service-card--recommended animate-in" data-delay="400">
        <span class="service-card__badge">Recommended</span>
        <div class="service-card__icon">
          <!-- Waveform SVG in accent color -->
        </div>
        <span class="service-card__label">Voice Intelligence</span>
        <p class="service-card__description">
          A voice AI agent that answers calls and website visitors.
          Talks to your customers, qualifies them, and books the job.
        </p>
        <div class="service-card__price">$247<span class="price-period">/mo</span></div>
        <span class="service-card__includes">Includes free website + CRM</span>
        <a href="services.html#voice" class="service-card__link">Learn More</a>
      </div>
    </div>
  </div>
</section>
```

---

#### Psychology Summary for Section 5

| Principle | How It Is Applied |
|---|---|
| Paradox of Choice | Only 3 options. Simple decision. No paralysis. |
| Decoy Effect | Chat ($147) exists to make Voice ($247) look like the obvious upgrade for only $100 more — and Voice includes free CRM on top |
| Default Effect | Voice card has accent border, "Recommended" badge, and appears first on mobile. It is pre-selected as the default choice |
| Anchoring | $40k/yr receptionist (from Section 2 stats in the visitor's mind) vs $247/mo. The anchor makes every price look tiny |
| Price Relativity | Three tiers create good-better-best framing. The middle tier (Chat) makes Website look basic and Voice look premium |
| Hick's Law | Three choices, one highlighted. Decision time is minimized |

---
---

## SECTION 6: RAAS GUARANTEE CALLOUT

**HTML Element**: `<section id="guarantee">`
**Purpose**: The emotional peak of the page. Convert trust into action. This is where hesitation dies.
**Background**: `var(--color-surface)` (#141414)
**Vertical Padding**: `var(--space-3xl)` top and bottom
**Visual Treatment**: Distinct callout block with accent left-border and subtle glow

---

### 6.1 Headline

**Text**: We Earn Our Fee Every Month — Or You Don't Pay It.

**Styling**:
```css
#guarantee .guarantee-headline {
  font-family: var(--font-body);
  font-size: var(--text-section-heading);
  font-weight: 700;
  line-height: 1.15;
  color: var(--color-text);
  margin-bottom: var(--space-md);
}
```

---

### 6.2 Body Copy — Price Rebuttal

**Text**:

Our service costs less than the value of one booked appointment. If our AI books just one appointment this month, it has already paid for itself. Everything after that is pure profit for you.

And if the agent does not book a single appointment? You do not pay. Not a penny. That is our RAAS guarantee — Results as a Service. We make money only when we make you money.

**Why this works**:
- Opens with the price rebuttal directly from `content.yaml`. This is the strongest counter to the "too expensive" objection.
- "One booked appointment" is an extremely low bar. Any business owner knows a single booking is worth more than $247.
- "Pure profit" — uses language SMB owners respond to. Revenue, profit, bookings. Not features, not technology.
- Second paragraph delivers the guarantee in plain language. "Not a penny" is emphatic and final.
- "We make money only when we make you money" — this is the RAAS philosophy in one sentence. It creates alignment between Fluis.ai and the client. They are on the same team.

---

### 6.3 Guarantee Details

Below the body copy, two small detail blocks:

**Trial Guarantee**:
7-day free trial. If you do not like our service, you get a full refund — including the setup fee. No questions asked.

**Monthly Guarantee**:
If our agent does not book a single appointment in any given month, you do not pay for that month. Stay or leave — your choice.

**Styling for detail blocks**:
```css
.guarantee-details {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-md);
  margin-top: var(--space-lg);
}

@media (max-width: 640px) {
  .guarantee-details {
    grid-template-columns: 1fr;
  }
}

.guarantee-detail {
  padding: var(--space-md);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface-2);
}

.guarantee-detail__title {
  font-family: var(--font-mono);
  font-size: var(--text-small);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-accent);
  margin-bottom: var(--space-xs);
}

.guarantee-detail__text {
  font-family: var(--font-body);
  font-size: var(--text-body);
  line-height: 1.6;
  color: var(--color-text-muted);
}
```

---

### 6.4 CTA

**Text**: Start Risk-Free

**Destination**: `#book-call`

**Styling**: `btn-primary` (same as hero CTA). Centered below the guarantee details.

**Why "Start Risk-Free"**: Reinforces the guarantee messaging. "Risk-Free" is not just a claim — by this point in the page, the visitor has read the specific guarantee terms. The CTA phrase echoes what they just absorbed.

---

### 6.5 Visual Treatment — Callout Block

The entire guarantee content sits inside a callout block that is visually distinct from everything else on the page.

```css
.guarantee-callout {
  background: var(--color-surface);
  border-left: 4px solid var(--color-accent);
  border-radius: var(--radius-lg);
  padding: var(--space-2xl);
  max-width: 800px;
  margin: 0 auto;
  position: relative;
}

/* Subtle accent glow on the left border */
.guarantee-callout::before {
  content: '';
  position: absolute;
  top: 0;
  left: -4px;
  width: 4px;
  height: 100%;
  background: var(--color-accent);
  box-shadow: var(--glow-accent);
  border-radius: 4px 0 0 4px;
}
```

The `4px` accent left border with the glow creates a "highlight bar" effect. It signals importance and draws the eye to this section as something distinct and critical.

---

### 6.6 Animation (GSAP ScrollTrigger + Text Highlight on Scroll)

> **Upgraded**: Added scroll-linked text highlight effect on the headline. Words "light up" from muted to full brightness as the user scrolls past, creating a cinematic reading experience.

##### Text Highlight on Scroll

The headline "We Earn Our Fee Every Month -- Or You Don't Pay It." highlights word-by-word as the user scrolls past the section. Words transition from muted to full brightness, controlled by ScrollTrigger scrub.

```javascript
// Text highlight on scroll — words light up as user scrolls
const guaranteeSplit = new SplitText('.guarantee-headline', { type: 'words' });

// Set all words to muted initially
gsap.set(guaranteeSplit.words, { color: 'var(--color-text-dim)' });

gsap.to(guaranteeSplit.words, {
  color: 'var(--color-text)',
  stagger: 0.1,
  scrollTrigger: {
    trigger: '.guarantee-callout',
    start: 'top 70%',
    end: 'top 30%',
    scrub: true   // Tied 1:1 to scroll position
  }
});
```

**How it works**: Each word in the headline starts at `var(--color-text-dim)` (muted gray). As the user scrolls through the section, words progressively shift to `var(--color-text)` (full white/black). The `scrub: true` ties this directly to scroll position -- scroll back up and the words dim again. The stagger creates a left-to-right "reading" reveal.

##### Standard Element Entrance

| Element | Trigger | Duration | Animation | Easing |
|---|---|---|---|---|
| Callout block | ScrollTrigger `top 85%` | 600ms | `.reveal` default (opacity + y) | `power2.out` |
| Headline | ScrollTrigger scrub `top 70%` to `top 30%` | scrub-linked | SplitText word color: dim to full | linear (scrub) |
| Body copy | ScrollTrigger `top 85%` | 600ms | `.reveal` default (200ms delay) | `power2.out` |
| Detail blocks | ScrollTrigger `top 85%` | 600ms | `.reveal` default (300ms delay) | `power2.out` |
| CTA | ScrollTrigger `top 85%` | 600ms | `.reveal` default (400ms delay) | `power2.out` |

##### Glow Pulse (CSS, retained)

The glow on the left border pulses subtly (CSS-only ambient animation, not scroll-linked):

```css
@keyframes glowPulse {
  0%, 100% { box-shadow: 0 0 20px var(--color-accent-glow); }
  50%      { box-shadow: 0 0 40px var(--color-accent-glow); }
}

.guarantee-callout::before {
  animation: glowPulse 3s var(--ease-smooth) infinite;
}
```

This gentle pulse draws attention without being distracting. It is slow (3 second cycle) and subtle (only changing shadow intensity).

> **Reduced motion**: See `00_master_spec.md` Section 12.7. The glow pulse animation and text highlight effect are both disabled when `prefers-reduced-motion: reduce` is active. All words display at full brightness immediately. The glow border remains static.

---

### 6.7 HTML Structure

```html
<section id="guarantee" class="section-dark">
  <div class="section-container">
    <div class="guarantee-callout animate-in">
      <h2 class="guarantee-headline animate-in" data-delay="100">
        We Earn Our Fee Every Month — Or You Don't Pay It.
      </h2>
      <div class="guarantee-body animate-in" data-delay="200">
        <p>
          Our service costs less than the value of one booked appointment.
          If our AI books just one appointment this month, it has already
          paid for itself. Everything after that is pure profit for you.
        </p>
        <p>
          And if the agent does not book a single appointment? You do not
          pay. Not a penny. That is our RAAS guarantee — Results as a Service.
          We make money only when we make you money.
        </p>
      </div>
      <div class="guarantee-details animate-in" data-delay="300">
        <div class="guarantee-detail">
          <span class="guarantee-detail__title">Trial Guarantee</span>
          <p class="guarantee-detail__text">
            7-day free trial. If you do not like our service, you get a full
            refund — including the setup fee. No questions asked.
          </p>
        </div>
        <div class="guarantee-detail">
          <span class="guarantee-detail__title">Monthly Guarantee</span>
          <p class="guarantee-detail__text">
            If our agent does not book a single appointment in any given month,
            you do not pay for that month. Stay or leave — your choice.
          </p>
        </div>
      </div>
      <div class="section-cta animate-in" data-delay="400" style="text-align: center; margin-top: var(--space-lg);">
        <a href="#book-call" class="btn-primary">Start Risk-Free</a>
      </div>
    </div>
  </div>
</section>
```

---

#### Psychology Summary for Section 6

| Principle | How It Is Applied |
|---|---|
| Risk Reversal | The entire section IS risk reversal. Every sentence removes a reason to hesitate |
| Zero-Price Effect | "Free trial" and "you do not pay" trigger irrational preference for zero-cost outcomes |
| Regret Aversion | "No questions asked" removes the fear of regret — even if they try and dislike it, there is no penalty |
| Loss Aversion (flipped) | Instead of framing what they LOSE by not acting, this section frames what they CANNOT lose by acting. The downside is zero |
| Anchoring | "Less than the value of one booked appointment" anchors the price against revenue, not cost. $247 vs $500+ appointment value |
| Commitment & Consistency | By this point the visitor has scrolled through 6 sections. Their behavior (scrolling, reading) is already consistent with someone who is interested. The guarantee removes the last barrier |

---
---

## SECTION 7: INDUSTRIES WE HELP

**HTML Element**: `<section id="industries">`
**Purpose**: Let visitors self-identify with their industry. Broaden the appeal beyond home services.
**Background**: `var(--color-bg)` (#0a0a0a)
**Vertical Padding**: `var(--space-3xl)` top and bottom

---

### 7.1 Headline

**Text**: Built for Businesses Like Yours.

**Why this works**:
- "Like yours" triggers the Unity Principle. The visitor sees themselves in the statement.
- "Built for" implies purpose-built, specialized, and intentional — not generic.
- Short, five words. Does not overcomplicate.

---

### 7.2 Subheadline

**Text**: If your business runs on calls, clients, or appointments — our AI agents can help.

**Why this works**:
- Creates a simple litmus test. The visitor asks: "Does my business run on calls, clients, or appointments?" If yes, they qualify. This self-selection mechanism is inclusive without being vague.
- The em dash before "our AI agents can help" creates a pause and a reveal.
- "Can help" is deliberately understated. It does not oversell. It invites exploration rather than making a hard claim.

---

### 7.3 Industry Tiles

Six tiles in a grid. Each tile has an icon, an industry name, and a short subtitle.

**Tile 1: Home Services**
- Icon suggestion: House/home SVG icon
- Name: Home Services
- Subtitle: Plumbing, HVAC, electrical, cleaning & more
- Pain point: "Missed calls while on the job = missed revenue"

**Tile 2: Real Estate**
- Icon suggestion: Building/property SVG icon
- Name: Real Estate
- Subtitle: Realtors, property managers, coaches
- Pain point: "Leads expect instant responses, day or night"

**Tile 3: Coaches & Consultants**
- Icon suggestion: Users/people SVG icon
- Name: Coaches & Consultants
- Subtitle: Private coaches, business consultants
- Pain point: "Client calls come during sessions"

**Tile 4: Auto & Detailing**
- Icon suggestion: Car SVG icon
- Name: Auto & Detailing
- Subtitle: Car wash, paint, detailing services
- Pain point: "Walk-in inquiries lost to voicemail"

**Tile 5: Pet Services**
- Icon suggestion: Paw print SVG icon
- Name: Pet Services
- Subtitle: Grooming, walking, animal care
- Pain point: "Hands full of dogs, not phones"

**Tile 6: And Many More** (Active Micro-CTA)
- Icon suggestion: Search/magnifier SVG icon
- Name: And Many More
- Subtitle: Any business that depends on conversations
- Pain point / CTA: "Don't see your industry? Let's talk." — links to voice bubble trigger via `onclick="window.dispatchEvent(new CustomEvent('open-voice-bubble'))"`
- **Behavior**: This tile is NOT passive. It converts self-identification into active engagement. The "Let's talk" link triggers the voice bubble, inviting visitors who don't see their industry to start a conversation rather than leaving.

> This tile converts passive self-identification into active engagement. Visitors who don't see their industry are invited to start a conversation rather than leaving.

> **Psychology note**: Unity Principle + Curiosity Gap -- visitors who identify with listed industries feel included; those who don't are offered a personal conversation, preventing exclusion.

---

### 7.4 Tile Styling

```css
.industries-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-md);
}

.industry-tile {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-lg);
  text-align: center;
  transition: border-color var(--transition-base), transform var(--transition-base);
}

.industry-tile:hover {
  border-color: var(--color-text-muted);
  transform: translateY(-2px);
}

.industry-tile__icon {
  width: 40px;
  height: 40px;
  margin: 0 auto var(--space-sm);
  color: var(--color-text-muted);
}

.industry-tile__name {
  font-family: var(--font-body);
  font-size: var(--text-body-lg);
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 4px;
}

.industry-tile__subtitle {
  font-family: var(--font-body);
  font-size: var(--text-small);
  color: var(--color-text-muted);
  line-height: 1.4;
}

.industry-pain {
  color: var(--color-text-dim);
  font-size: var(--text-xs);
  font-style: italic;
  margin-top: 4px;
  line-height: 1.3;
}

/* "And Many More" tile — active micro-CTA variant */
.industry-tile--cta {
  border-style: dashed;
  cursor: pointer;
}

.industry-tile--cta:hover {
  border-color: var(--color-accent);
}

.industry-cta-link {
  color: var(--color-accent);
  text-decoration: none;
  font-style: normal;
  font-weight: 500;
  transition: color var(--transition-fast);
}

.industry-cta-link:hover {
  text-decoration: underline;
}
```

---

### 7.5 Mobile Layout

On mobile (below 768px), the grid becomes 2 columns x 3 rows.

```css
@media (max-width: 768px) {
  .industries-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 400px) {
  .industries-grid {
    grid-template-columns: 1fr;
  }
}
```

---

### 7.6 Animation (GSAP ScrollTrigger.batch)

> **Upgraded from basic stagger**: Tiles now use `ScrollTrigger.batch` for efficient single-observer entrance with `back.out(1.7)` overshoot easing at 75ms intervals.

```javascript
// Industry tiles — batch entrance with overshoot + settle
gsap.set('.industry-tile', { opacity: 0, y: 30, scale: 0.95 });

ScrollTrigger.batch('.industry-tile', {
  onEnter: (batch) => {
    gsap.to(batch, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      ease: 'back.out(1.7)',   // Overshoot + settle
      stagger: 0.075,          // 75ms intervals between tiles
      overwrite: true
    });
  },
  start: 'top 85%',
  once: true
});
```

| Element | Trigger | Duration | Animation | Easing |
|---|---|---|---|---|
| Heading | ScrollTrigger `top 85%` | 600ms | `.reveal` default | `power2.out` |
| Subheading | ScrollTrigger `top 85%` | 600ms | `.reveal` default (100ms stagger) | `power2.out` |
| Tiles 1-6 | ScrollTrigger.batch `top 85%` | 600ms | opacity + y:30 + scale:0.95 | `back.out(1.7)` |

The `back.out(1.7)` easing creates a satisfying overshoot-then-settle effect on each tile. The 75ms stagger creates a rapid grid-fill pattern that feels energetic. `ScrollTrigger.batch` uses a single observer for all 6 tiles instead of 6 individual observers.

**Reduced motion**: Tiles appear immediately with no overshoot, no scale, no stagger. Simple opacity fade only.

---

### 7.7 HTML Structure

```html
<section id="industries">
  <div class="section-container">
    <h2 class="section-heading animate-in" style="text-align: center;">
      Built for Businesses Like Yours.
    </h2>
    <p class="section-subheading animate-in" data-delay="100" style="text-align: center;">
      If your business runs on calls, clients, or appointments
      — our AI agents can help.
    </p>
    <div class="industries-grid">
      <div class="industry-tile animate-in" data-delay="150">
        <div class="industry-tile__icon"><!-- House SVG --></div>
        <div class="industry-tile__name">Home Services</div>
        <div class="industry-tile__subtitle">Plumbing, HVAC, electrical, cleaning & more</div>
        <p class="industry-pain">Missed calls while on the job = missed revenue</p>
      </div>
      <div class="industry-tile animate-in" data-delay="225">
        <div class="industry-tile__icon"><!-- Building SVG --></div>
        <div class="industry-tile__name">Real Estate</div>
        <div class="industry-tile__subtitle">Realtors, property managers, coaches</div>
        <p class="industry-pain">Leads expect instant responses, day or night</p>
      </div>
      <div class="industry-tile animate-in" data-delay="300">
        <div class="industry-tile__icon"><!-- Users SVG --></div>
        <div class="industry-tile__name">Coaches & Consultants</div>
        <div class="industry-tile__subtitle">Private coaches, business consultants</div>
        <p class="industry-pain">Client calls come during sessions</p>
      </div>
      <div class="industry-tile animate-in" data-delay="375">
        <div class="industry-tile__icon"><!-- Car SVG --></div>
        <div class="industry-tile__name">Auto & Detailing</div>
        <div class="industry-tile__subtitle">Car wash, paint, detailing services</div>
        <p class="industry-pain">Walk-in inquiries lost to voicemail</p>
      </div>
      <div class="industry-tile animate-in" data-delay="450">
        <div class="industry-tile__icon"><!-- Paw SVG --></div>
        <div class="industry-tile__name">Pet Services</div>
        <div class="industry-tile__subtitle">Grooming, walking, animal care</div>
        <p class="industry-pain">Hands full of dogs, not phones</p>
      </div>
      <div class="industry-tile industry-tile--cta animate-in" data-delay="525">
        <div class="industry-tile__icon"><!-- Search SVG --></div>
        <div class="industry-tile__name">And Many More</div>
        <div class="industry-tile__subtitle">Any business that depends on conversations</div>
        <p class="industry-pain">
          <a href="#" class="industry-cta-link" onclick="window.dispatchEvent(new CustomEvent('open-voice-bubble'))" data-action="trigger-voice-bubble">
            Don't see your industry? Let's talk &rarr;
          </a>
        </p>
      </div>
    </div>
  </div>
</section>
```

---

#### Psychology Summary for Section 7

| Principle | How It Is Applied |
|---|---|
| Unity Principle | "Businesses like yours" — visitors see themselves in the grid and self-identify |
| Liking / Similarity Bias | Seeing their industry named creates an "us" feeling. The product was built for someone like THEM |
| Availability Heuristic | Naming specific industries makes the product feel real and proven, even without case studies |
| Paradox of Choice | Six tiles is enough to feel comprehensive without being overwhelming |

---
---

## SECTION 8: FAQ ACCORDION

**HTML Element**: `<section id="faq">`
**Purpose**: Preemptively handle the 8 most common objections. Reduce friction. Build trust through transparency.
**Background**: `var(--color-surface)` (#141414)
**Vertical Padding**: `var(--space-3xl)` top and bottom

---

### 8.1 Headline

**Text**: You Have Questions. We Have Answers.

**Why this works**:
- Conversational and direct. Acknowledges that the visitor has concerns and immediately promises to address them.
- The period after "Questions" creates a pause. It is not a question — it is a statement of fact. "We Have Answers" then resolves the tension.

---

### 8.2 FAQ Items (Exact Copy)

The questions are ordered strategically: curiosity/product questions first (to keep engagement), then objection-handling questions, then the guarantee reinforcement last (Peak-End Rule).

---

#### FAQ 1: "Does it sound like a robot?"

**Question**: Does it sound like a robot?

**Answer**: Not anymore. The 2026 voice models we use have natural breath pauses, filler words, and response times under half a second. Most callers genuinely cannot tell they are speaking to AI. And the technology is improving every month — by this time next year, even experts will struggle to tell the difference.

**Why first**: This is the most common curiosity question. It is the first thing people wonder when they hear "voice AI." Answering it immediately removes the biggest skepticism barrier and keeps them reading.

---

#### FAQ 2: "Can I take over a conversation?"

**Question**: Can I take over a conversation?

**Answer**: Yes. You get notified every time your agent starts a conversation. You can jump into any live chat or view any call log at any time. Think of the AI as your front desk — it handles the initial conversation, but you are always in control.

---

#### FAQ 3: "Do I need to change my phone number?"

**Question**: Do I need to change my phone number?

**Answer**: No. You keep your existing number. We simply set up call forwarding so that when you cannot pick up — or after business hours — the call routes to your AI agent. Your customers dial the same number they always have.

---

#### FAQ 4: "Is there a contract?"

**Question**: Is there a contract?

**Answer**: Never. We earn your business every single month. If we stop delivering results, you leave. No cancellation fees, no lock-in, no awkward phone calls. Month-to-month. Cancel anytime.

---

#### FAQ 5: "What if the agent does not book any appointments?"

**Question**: What if the agent does not book any appointments?

**Answer**: You do not pay. Our entire model is built on Results as a Service. If your AI agent does not book even a single appointment in a given month, we do not charge you for that month. You can stay and let us improve it, or you can walk away with a full refund. No risk, no catch.

**Why this is positioned late**: The guarantee has already been established in Section 6. Repeating it here in FAQ format reinforces it through a different framing (question-and-answer instead of declarative copy). The repetition is intentional — the RAAS message should appear at least 3 times on the page.

---

#### FAQ 6: "What is included in the setup?"

**Question**: What is included in the setup?

**Answer**: Everything. We build your website, set up your CRM, configure all automations (booking confirmations, follow-ups, notifications), deploy your AI agent, and train it on your business. You tell us about your services, your hours, and your availability. We do the rest. That is what Done For You means.

---

#### FAQ 7: "How long does setup take?"

**Question**: How long does setup take?

**Answer**: 3 days for onboarding, then your agent goes live with a 7-day free trial. So from the moment you say yes to having a fully working AI agent is about 10 days. Most businesses are surprised by how fast it is.

---

#### FAQ 8: "What if I already have a website?"

**Question**: What if I already have a website?

**Answer**: No problem. We can embed our AI agents directly on your existing website. Same pricing, same features, same CRM integration. Your data flows to the same place regardless of where the agent lives. If you want, we can also build you a new website as part of the package — it is included at no extra cost with our agent plans.

---

### 8.3 Implementation

Use native `<details>` and `<summary>` elements for accessibility and no-JS fallback. Add smooth open/close animation with CSS.

```css
.faq-list {
  max-width: 720px;
  margin: var(--space-xl) auto 0;
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.faq-item {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.faq-item + .faq-item {
  margin-top: var(--space-xs);
}

.faq-item summary {
  font-family: var(--font-body);
  font-size: var(--text-body-lg);
  font-weight: 600;
  color: var(--color-text);
  padding: var(--space-md) var(--space-lg);
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style: none;  /* Remove default marker */
  transition: color var(--transition-fast);
}

.faq-item summary::-webkit-details-marker {
  display: none;
}

.faq-item summary::after {
  content: '+';
  font-family: var(--font-mono);
  font-size: 1.25rem;
  color: var(--color-text-muted);
  transition: transform var(--transition-base);
  flex-shrink: 0;
  margin-left: var(--space-md);
}

.faq-item[open] summary::after {
  content: '\2212';  /* Minus sign */
}

.faq-item summary:hover {
  color: var(--color-accent);
}

.faq-item__answer {
  font-family: var(--font-body);
  font-size: var(--text-body);
  line-height: 1.7;
  color: var(--color-text-muted);
  padding: 0 var(--space-lg) var(--space-md);
}
```

**Smooth open/close animation (GSAP)**: GSAP provides precise `height: "auto"` animation that CSS transitions cannot achieve natively. This replaces the previous `maxHeight` workaround with a cleaner GSAP-driven approach.

```javascript
// GSAP-controlled accordion — smooth height animation
document.querySelectorAll('.faq-item').forEach(details => {
  const summary = details.querySelector('summary');
  const content = details.querySelector('.faq-item__answer');
  const chevron = summary.querySelector('::after') || summary; // Chevron target

  summary.addEventListener('click', (e) => {
    e.preventDefault();

    if (details.open) {
      // Closing — animate height to 0, then remove open attribute
      gsap.to(content, {
        height: 0,
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in',
        onComplete: () => {
          details.open = false;
          gsap.set(content, { clearProps: 'height,opacity' });
        }
      });
      // Chevron rotates back to 0
      gsap.to(summary, {
        '--chevron-rotate': '0deg',
        duration: 0.2,
        ease: 'power2.in'
      });
    } else {
      // Opening — set open, then animate from height:0 to auto
      details.open = true;
      gsap.from(content, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.out'
      });
      // Chevron rotates 180 degrees
      gsap.to(summary, {
        '--chevron-rotate': '180deg',
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  });
});
```

**Chevron CSS** (updated to use GSAP-controlled custom property):

```css
.faq-item summary::after {
  content: '+';
  font-family: var(--font-mono);
  font-size: 1.25rem;
  color: var(--color-text-muted);
  flex-shrink: 0;
  margin-left: var(--space-md);
  transform: rotate(var(--chevron-rotate, 0deg));
  /* Transition removed — GSAP handles rotation */
}

.faq-item[open] summary::after {
  content: '\2212';  /* Minus sign */
}

.faq-item__answer {
  overflow: hidden;
  /* Transition removed — GSAP handles height + opacity */
}
```

**Why GSAP over CSS transitions**: CSS cannot animate `height: auto`. The previous approach used `maxHeight` with a hardcoded pixel value, which breaks if content length varies. GSAP's `height: "auto"` (via `gsap.from`) measures the actual content height and animates precisely. The `power2.out` easing (300ms open) vs `power2.in` (200ms close) creates a snappy close and a welcoming open.

---

### 8.4 JSON-LD Structured Data

Include FAQPage structured data for SEO. This helps the FAQs appear as rich results in Google.

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
        "text": "Not anymore. The 2026 voice models we use have natural breath pauses, filler words, and response times under half a second. Most callers genuinely cannot tell they are speaking to AI. And the technology is improving every month — by this time next year, even experts will struggle to tell the difference."
      }
    },
    {
      "@type": "Question",
      "name": "Can I take over a conversation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. You get notified every time your agent starts a conversation. You can jump into any live chat or view any call log at any time. Think of the AI as your front desk — it handles the initial conversation, but you are always in control."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need to change my phone number?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. You keep your existing number. We simply set up call forwarding so that when you cannot pick up — or after business hours — the call routes to your AI agent. Your customers dial the same number they always have."
      }
    },
    {
      "@type": "Question",
      "name": "Is there a contract?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Never. We earn your business every single month. If we stop delivering results, you leave. No cancellation fees, no lock-in, no awkward phone calls. Month-to-month. Cancel anytime."
      }
    },
    {
      "@type": "Question",
      "name": "What if the agent does not book any appointments?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You do not pay. Our entire model is built on Results as a Service. If your AI agent does not book even a single appointment in a given month, we do not charge you for that month. You can stay and let us improve it, or you can walk away with a full refund. No risk, no catch."
      }
    },
    {
      "@type": "Question",
      "name": "What is included in the setup?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Everything. We build your website, set up your CRM, configure all automations (booking confirmations, follow-ups, notifications), deploy your AI agent, and train it on your business. You tell us about your services, your hours, and your availability. We do the rest. That is what Done For You means."
      }
    },
    {
      "@type": "Question",
      "name": "How long does setup take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "3 days for onboarding, then your agent goes live with a 7-day free trial. So from the moment you say yes to having a fully working AI agent is about 10 days. Most businesses are surprised by how fast it is."
      }
    },
    {
      "@type": "Question",
      "name": "What if I already have a website?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No problem. We can embed our AI agents directly on your existing website. Same pricing, same features, same CRM integration. Your data flows to the same place regardless of where the agent lives. If you want, we can also build you a new website as part of the package — it is included at no extra cost with our agent plans."
      }
    }
  ]
}
</script>
```

---

### 8.5 HTML Structure

```html
<section id="faq" class="section-dark">
  <div class="section-container">
    <h2 class="section-heading animate-in" style="text-align: center;">
      You Have Questions. We Have Answers.
    </h2>
    <div class="faq-list">
      <details class="faq-item animate-in" data-delay="100">
        <summary>Does it sound like a robot?</summary>
        <div class="faq-item__answer">
          <p>
            Not anymore. The 2026 voice models we use have natural breath pauses,
            filler words, and response times under half a second. Most callers
            genuinely cannot tell they are speaking to AI. And the technology is
            improving every month — by this time next year, even experts will
            struggle to tell the difference.
          </p>
        </div>
      </details>
      <details class="faq-item animate-in" data-delay="150">
        <summary>Can I take over a conversation?</summary>
        <div class="faq-item__answer">
          <p>
            Yes. You get notified every time your agent starts a conversation.
            You can jump into any live chat or view any call log at any time.
            Think of the AI as your front desk — it handles the initial
            conversation, but you are always in control.
          </p>
        </div>
      </details>
      <details class="faq-item animate-in" data-delay="200">
        <summary>Do I need to change my phone number?</summary>
        <div class="faq-item__answer">
          <p>
            No. You keep your existing number. We simply set up call forwarding
            so that when you cannot pick up — or after business hours — the call
            routes to your AI agent. Your customers dial the same number they
            always have.
          </p>
        </div>
      </details>
      <details class="faq-item animate-in" data-delay="250">
        <summary>Is there a contract?</summary>
        <div class="faq-item__answer">
          <p>
            Never. We earn your business every single month. If we stop delivering
            results, you leave. No cancellation fees, no lock-in, no awkward phone
            calls. Month-to-month. Cancel anytime.
          </p>
        </div>
      </details>
      <details class="faq-item animate-in" data-delay="300">
        <summary>What if the agent does not book any appointments?</summary>
        <div class="faq-item__answer">
          <p>
            You do not pay. Our entire model is built on Results as a Service.
            If your AI agent does not book even a single appointment in a given
            month, we do not charge you for that month. You can stay and let us
            improve it, or you can walk away with a full refund. No risk, no catch.
          </p>
        </div>
      </details>
      <details class="faq-item animate-in" data-delay="350">
        <summary>What is included in the setup?</summary>
        <div class="faq-item__answer">
          <p>
            Everything. We build your website, set up your CRM, configure all
            automations (booking confirmations, follow-ups, notifications), deploy
            your AI agent, and train it on your business. You tell us about your
            services, your hours, and your availability. We do the rest. That is
            what Done For You means.
          </p>
        </div>
      </details>
      <details class="faq-item animate-in" data-delay="400">
        <summary>How long does setup take?</summary>
        <div class="faq-item__answer">
          <p>
            3 days for onboarding, then your agent goes live with a 7-day free
            trial. So from the moment you say yes to having a fully working AI
            agent is about 10 days. Most businesses are surprised by how fast it is.
          </p>
        </div>
      </details>
      <details class="faq-item animate-in" data-delay="450">
        <summary>What if I already have a website?</summary>
        <div class="faq-item__answer">
          <p>
            No problem. We can embed our AI agents directly on your existing
            website. Same pricing, same features, same CRM integration. Your
            data flows to the same place regardless of where the agent lives.
            If you want, we can also build you a new website as part of the
            package — it is included at no extra cost with our agent plans.
          </p>
        </div>
      </details>
    </div>
  </div>
</section>
```

---

#### Psychology Summary for Section 8

| Principle | How It Is Applied |
|---|---|
| Objection Handling | Each FAQ directly addresses a known concern from `market.yaml` objections list |
| Confirmation Bias | People who want to buy will look for reasons to justify the purchase. FAQs provide those reasons in an easy-to-find format |
| Risk Reversal (repeated) | The guarantee appears again in FAQ 5. Third time on the page. Repetition builds belief |
| Authority Bias | Detailed, specific answers (latency under 500ms, 2026 models) signal expertise without jargon |
| Commitment & Consistency | Scrolling through 8 FAQs is an investment of attention. The more they read, the more committed they feel |
| Zeigarnik Effect | Each closed accordion is an open loop. Visitors click to resolve the tension of not knowing the answer |

---
---

## SECTION 9: FINAL CTA

**HTML Element**: `<section id="final-cta">`
**Purpose**: The closing push. One last chance to convert. Clean, simple, forward-looking.
**Background**: `var(--color-bg)` (#0a0a0a)
**Vertical Padding**: `var(--space-3xl)` top, `var(--space-2xl)` bottom (slightly less bottom padding because footer follows)

---

### 9.1 Headline

**Text**: Your Customers Are Calling. Let Your Website Answer.

**Why this works**:
- Bookends the page. The hero introduced "Your Website, But It Talks." The final CTA closes with "Let Your Website Answer." Same concept, evolved language.
- "Your customers are calling" has dual meaning: they are literally calling (phone) AND they are figuratively calling out for attention (needing service). Both meanings work.
- Loss Aversion: if customers are calling and nobody answers, every second of inaction is a lost opportunity.
- Present tense: "are calling" — happening right now. Present Bias pushes toward action.
- The period after "Calling" forces a pause. Then "Let Your Website Answer" provides the resolution. Problem, pause, solution.

---

### 9.2 Subheadline

**Text**: Book a free 45-minute demo. See the agent in action. No commitment, no pressure, no tech skills needed.

**Why this works**:
- Three short sentences, each removing a barrier:
  1. "Free 45-minute demo" — Zero-Price Effect, sets clear time expectation.
  2. "See the agent in action" — concrete promise of what happens on the call.
  3. "No commitment, no pressure, no tech skills needed" — triple negative removes three common fears simultaneously.
- "No tech skills needed" directly addresses the target audience's biggest insecurity. Non-tech SMB owners need to hear this.

---

### 9.3 Primary CTA

**Text**: Book a Free Demo

**Destination**: `#book-call`

**Styling**: `btn-primary` (same as hero). Large, centered.

---

### 9.4 Secondary CTA

**Text**: Or talk to our agent right now

**Action**: Triggers voice bubble (same as hero secondary CTA)

**Styling**: Text link below the button, not a full button. Underlined on hover. `var(--color-text-muted)` color.

```css
.final-cta__secondary {
  font-family: var(--font-body);
  font-size: var(--text-body);
  color: var(--color-text-muted);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  margin-top: var(--space-sm);
  transition: color var(--transition-fast);
}

.final-cta__secondary:hover {
  color: var(--color-text);
  text-decoration: underline;
}
```

**Why a text link, not a button**: By this point, the visitor either wants to book a demo (primary CTA) or wants to try the agent (secondary). Making the secondary a text link creates clear visual hierarchy — the red button commands attention, the text link is a soft alternative. It does not compete.

---

### 9.5 Visual Design

- Centered text, generous whitespace above and below.
- No background pattern, no visual complexity. Pure typography.
- The simplicity signals confidence. There is nothing else to say. The page has made its case. Now it is the visitor's turn.
- Optional: a very faint horizontal line (`1px solid var(--color-border)`) at the top of the section to separate it from the FAQ.

---

### 9.6 Animation (GSAP Scale Entrance)

> **Upgraded**: The Final CTA block scales from `0.95` to `1` with opacity fade, creating a subtle but confident entrance that feels like the section is "standing up" to deliver the final pitch.

```javascript
// Final CTA — scale entrance
gsap.from('#final-cta .section-container', {
  scale: 0.95,
  opacity: 0,
  duration: 0.8,
  ease: 'power2.out',
  scrollTrigger: {
    trigger: '#final-cta',
    start: 'top 80%',
    once: true
  }
});
```

| Element | Trigger | Duration | Animation | Easing |
|---|---|---|---|---|
| Entire CTA block | ScrollTrigger `top 80%` | 800ms | scale: 0.95 to 1 + opacity fade | `power2.out` |

The scale entrance is applied to the entire container as a single unit rather than staggering individual elements. This creates a unified, confident reveal that feels like a final statement rather than a sequence. The 0.95 to 1 scale is deliberately subtle -- it should feel assured, not dramatic.

**Reduced motion**: No scale transform. Simple opacity fade only.

---

### 9.7 HTML Structure

```html
<section id="final-cta">
  <div class="section-container" style="text-align: center;">
    <h2 class="section-heading animate-in">
      Your Customers Are Calling. Let Your Website Answer.
    </h2>
    <p class="section-subheading animate-in" data-delay="100">
      Book a free 45-minute demo. See the agent in action.
      No commitment, no pressure, no tech skills needed.
    </p>
    <div class="animate-in" data-delay="200">
      <a href="#book-call" class="btn-primary">Book a Free Demo</a>
    </div>
    <div class="animate-in" data-delay="300">
      <a href="#" class="final-cta__secondary" data-action="trigger-voice-bubble">
        Or talk to our agent right now
      </a>
    </div>
  </div>
</section>
```

---

#### Psychology Summary for Section 9

| Principle | How It Is Applied |
|---|---|
| Commitment & Consistency | The visitor has scrolled through the entire page. Their behavior is consistent with interest. The CTA is the logical next step |
| Present Bias | "Right now" emphasizes taking action in this moment, not later |
| Loss Aversion | "Your customers are calling" — if they leave without acting, they are losing customers right now |
| Activation Energy | Two trivially easy actions: click to book (opens calendar) or click to talk (opens voice bubble). Maximum 1 click to take action |
| Peak-End Rule | This is the END of the page. The experience should end on a strong, clean, confident note — not with clutter or desperation |
| Reciprocity | The page has given them extensive value: education about their problem, clear solution, transparent pricing, honest FAQ answers. They feel a subconscious pull to reciprocate by engaging |

---
---

## COMPLETE PAGE FLOW — PSYCHOLOGICAL NARRATIVE

This section maps the emotional journey the visitor takes from top to bottom.

| Section | Emotional State | Psychological Lever |
|---|---|---|
| 1. Hero | Curiosity, intrigue | "What does 'talks' mean?" — open loop |
| 2. Problem | Recognition, anxiety | "That IS my problem" — pain activation |
| 3. Solution | Relief, hope | "This could solve it" — vision of better future |
| 4. How It Works | Confidence, ease | "That is actually simple" — barrier removal |
| 5. Services | Consideration, comparison | "Which one is right for me?" — active shopping |
| 6. Guarantee | Trust, safety | "I literally cannot lose" — risk elimination |
| 7. Industries | Belonging, validation | "This is made for someone like me" — self-identification |
| 8. FAQ | Reassurance, certainty | "They thought of everything" — objection death |
| 9. Final CTA | Urgency, action | "I should do this now" — conversion |

This is an AIDA structure stretched across 9 sections:
- **Attention**: Sections 1-2 (Hero + Problem)
- **Interest**: Sections 3-4 (Solution + How It Works)
- **Desire**: Sections 5-7 (Services + Guarantee + Industries)
- **Action**: Sections 8-9 (FAQ + Final CTA)

---

## ACCESSIBILITY REQUIREMENTS

All sections must meet WCAG 2.1 AA standards:

1. **Color contrast**: `#f5f5f5` on `#0a0a0a` = 18.06:1 ratio (passes AAA). `#999999` on `#0a0a0a` = 6.91:1 (passes AA). `#666666` on `#0a0a0a` = 4.21:1 (passes AA for large text only — use only for decorative/supplementary text, not body copy).
2. **Focus indicators**: All interactive elements (buttons, links, accordion summaries) must have visible focus styles. Use `outline: 2px solid var(--color-accent); outline-offset: 2px;`.
3. **Touch targets**: All buttons minimum 48x48px. All accordion summaries minimum 48px tall.
4. **Reduced motion**: All animations follow the canonical reduced-motion behavior from `00_master_spec.md` Section 12.7. When `prefers-reduced-motion: reduce` is active, all transforms are disabled, all transitions are instant, and scroll-reveal elements appear immediately.
5. **Semantic HTML**: Use `<section>`, `<h1>`-`<h3>`, `<p>`, `<details>`, `<summary>`, `<nav>`, `<main>`, `<footer>`. One `<h1>` per page (the hero headline).
6. **ARIA labels**: Trust badges container gets `aria-label="Trust indicators"`. Voice bubble trigger gets `aria-label="Open voice assistant"`. FAQ section gets `aria-labelledby` pointing to its heading.
7. **Image alt text**: All SVG icons that are decorative get `aria-hidden="true"`. Icons that convey meaning get descriptive `aria-label` attributes.
8. **Keyboard navigation**: Accordion items operable with Enter/Space. Tab order follows visual order. No keyboard traps.

---

## PERFORMANCE REQUIREMENTS

1. **Critical CSS**: Inline the CSS needed for above-the-fold content (hero section) in a `<style>` tag in `<head>`. Load remaining CSS asynchronously.
2. **Font loading**: Use `font-display: swap` for both Inter and JetBrains Mono. Preload the primary weight of Inter (400) as a WOFF2.
3. **No large images**: The page uses no photographs or large raster images. All icons are inline SVGs. Background patterns use CSS or `<canvas>`.
4. **JS budget**: GSAP core (~23KB gzip) + ScrollTrigger (~10KB) + SplitText (~5KB) + ScrambleText (~3KB) + MorphSVG (~5KB) = ~46KB total animation JS. All loaded via CDN with `defer`. This is less than one hero image. See `00_master_spec.md` for the complete performance budget.
5. **Target metrics**: LCP under 2.5s (adjusted for GSAP load), FID under 50ms, CLS under 0.05, Speed Index under 3s.
6. **Lazy animation**: Elements below the fold are not animated until ScrollTrigger fires. ScrollTrigger uses a single `IntersectionObserver` internally for batch operations.
7. **GPU-only properties**: All GSAP animations target only `transform`, `opacity`, and `filter` (sparingly). No layout-triggering properties (width, height, top, left) are animated.
8. **will-change management**: `will-change` is set only on elements actively animating and cleared when animation completes. Never set permanently.
9. **Canvas performance**: The dot-grid canvas pauses its `requestAnimationFrame` loop when the tab is hidden (`visibilitychange` event). On mobile, grid spacing increases from 30px to 50px to reduce particle count.
10. **Hardware detection**: Enhanced effects (dot-grid scatter, 3D card tilt) only enabled when `navigator.hardwareConcurrency > 4`. Lower-spec devices get static dots and simple hover effects.

---

## RESPONSIVE BREAKPOINTS

| Breakpoint | Label | Behavior |
|---|---|---|
| 0-400px | Small mobile | Single column, stacked everything |
| 401-640px | Mobile | Single column, 2-col badge/industry grid |
| 641-768px | Large mobile / small tablet | Transitional layouts |
| 769-1024px | Tablet | Some multi-column layouts begin |
| 1025-1200px | Small desktop | Full layouts at reduced max-width |
| 1201px+ | Desktop | Full layouts, 1200px max-width container |

---

## CTA SUMMARY — APPEARANCE COUNT

The primary CTA ("Book a Free Demo" or variant) appears in these locations:

1. **Hero** — "Book a Free Demo" (primary button)
2. **Hero** — "Try the Agent Now" (secondary button, triggers voice bubble)
3. **How It Works** — "Book a Free Demo" (after 3 steps)
4. **Guarantee** — "Start Risk-Free" (after guarantee callout)
5. **Final CTA** — "Book a Free Demo" (primary button)
6. **Final CTA** — "Or talk to our agent right now" (text link, triggers voice bubble)
7. **Navigation** — "Book a Free Demo" (nav bar CTA, always visible on scroll)

Total: 7 conversion touchpoints. Rule of 7 satisfied on a single page.

---

## IMPLEMENTATION NOTES FOR DEVELOPERS

1. All copy in this spec is FINAL. Implement word-for-word. Do not rephrase, shorten, or "improve" the copy without explicit sign-off.
2. The dot-grid background in the hero uses a `<canvas>` element (not CSS `radial-gradient`). See Section 1 for the full canvas specification. The canvas must adapt to theme changes (dot color via `var(--color-text-dim)`).
3. The count-up animation in Section 2 uses GSAP `gsap.to({val:0}, {val:target})` with `power2.out` easing. Do not use `requestAnimationFrame` manually or CSS counters.
4. The FAQ accordion must use native `<details>/<summary>` elements as the HTML base. GSAP provides the smooth height animation as a progressive enhancement -- the FAQ must work without JS (instant open/close).
5. The voice bubble trigger (`data-action="trigger-voice-bubble"`) will be wired up when the voice agent widget is integrated. For now, those links should have `href="#"` and `preventDefault()`.
6. All `.reveal` elements must be set to `opacity: 0` via `gsap.set()` on DOMContentLoaded, then revealed by ScrollTrigger. Reduced-motion behavior is governed by `00_master_spec.md` Section 12.7 -- all elements appear immediately when `prefers-reduced-motion: reduce` is active. Use `gsap.matchMedia("(prefers-reduced-motion: no-preference)")` to wrap all animation code.
7. The `var(--color-accent)` red should be used on a maximum of 10% of the visible surface area at any given scroll position. It appears on: CTA buttons, step numbers, recommended badge, guarantee border, trust badge dots, card hover glow. That is all.
8. Font loading order: Inter 400 (preload), Inter 600 (async), Inter 800 (async), JetBrains Mono 600 (async), JetBrains Mono 700 (async).
9. JSON-LD structured data block goes in the `<head>` or at the end of `<body>`, NOT inside the FAQ section markup.
10. Test the page at 768px, 640px, 480px, and 375px widths. These are the critical mobile breakpoints where layout shifts occur.
11. **GSAP plugin registration**: All plugins must be registered before use: `gsap.registerPlugin(ScrollTrigger, SplitText, ScrambleTextPlugin, MorphSVGPlugin)`. This happens once in `main.js`.
12. **ScrollTrigger replaces IntersectionObserver**: Do not use `IntersectionObserver` for scroll-reveal animations. ScrollTrigger handles all scroll-linked behavior. The `.animate-in` / `.visible` class pattern from v1.0 is retired; use `.reveal` with GSAP batch.
13. **Pinned sections**: Sections 3 (Solution/SVG Morph) and 4 (How It Works) use ScrollTrigger `pin: true`. Pinned sections must have `anticipatePin: 1` set to prevent layout jump. Test pinning behavior on iOS Safari specifically, as it has known quirks with pinned scroll.
14. **SplitText cleanup**: After SplitText animations complete (hero entrance, guarantee text highlight), call `split.revert()` to restore original DOM. This prevents accessibility issues with screen readers reading individual character/word spans.
15. **MorphSVG paths**: The 4 SVG shapes in Section 3 must either have the same number of anchor points OR use `type: "rotational"` for automatic path interpolation. Test morphs with `type: "rotational"` first; fall back to manual point-matching only if visual quality is poor.
