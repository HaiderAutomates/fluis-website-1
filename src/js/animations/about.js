/* ============================================
   About Page Animations
   Hero manifesto entrance, AI gap problem,
   mission pillars, core values, DFY approach,
   bottom CTA
   ============================================ */

(function () {
  'use strict';

  if (typeof gsap === 'undefined') return;

  function initAbout() {
    var hero = document.getElementById('about-hero');
    if (!hero) return;

    var mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', function () {

      // ── 1. ABOUT HERO ──
      initAboutHero();

      // ── 2. THE PROBLEM ──
      initAboutProblem();

      // ── 3. THE MISSION ──
      initAboutMission();

      // ── 4. CORE VALUES ──
      initAboutValues();

      // ── 5. THE APPROACH ──
      initAboutApproach();

      // ── 6. BOTTOM CTA ──
      initAboutBottomCta();
    });
  }


  // ── 1. ABOUT HERO — MANIFESTO ──

  function initAboutHero() {
    var section = document.getElementById('about-hero');
    if (!section) return;

    var watermark = section.querySelector('.about-hero__watermark');
    var manifesto = section.querySelector('.about-hero__manifesto');
    var accentLine = section.querySelector('.about-hero__manifesto-accent');
    var attribution = section.querySelector('.about-hero__attribution');
    var scrollHint = section.querySelector('.about-hero__scroll-hint');

    var tl = gsap.timeline({ delay: 0.1 });

    // Watermark quotation mark scale+fade
    if (watermark) {
      gsap.set(watermark, { opacity: 0, scale: 0.8 });
      tl.to(watermark, { opacity: 1, scale: 1, duration: 1.2, ease: 'expo.out' }, 0);
    }

    // Manifesto muted text fade up
    if (manifesto) {
      gsap.set(manifesto, { opacity: 0, y: 20 });
      tl.to(manifesto, { opacity: 1, y: 0, duration: 0.8, ease: 'expo.out' }, 0.2);
    }

    // Accent line — SplitText word reveal
    if (accentLine && typeof SplitText !== 'undefined') {
      var splitAccent = new SplitText(accentLine, { type: 'words' });
      gsap.set(splitAccent.words, { y: 40, opacity: 0 });
      tl.to(splitAccent.words, {
        y: 0, opacity: 1, duration: 0.6, stagger: 0.04, ease: 'back.out(1.7)',
      }, 0.6);
    } else if (accentLine) {
      gsap.set(accentLine, { y: 40, opacity: 0 });
      tl.to(accentLine, { y: 0, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' }, 0.6);
    }

    // Attribution mono text
    if (attribution) {
      gsap.set(attribution, { opacity: 0 });
      tl.to(attribution, { opacity: 1, duration: 0.5, ease: 'expo.out' }, 1.0);
    }

    // Scroll hint
    if (scrollHint) {
      gsap.set(scrollHint, { opacity: 0 });
      tl.to(scrollHint, { opacity: 0.5, duration: 0.6, ease: 'power2.out' }, 1.2);
    }
  }


  // ── 2. THE PROBLEM — AI GAP ──

  function initAboutProblem() {
    var section = document.getElementById('about-problem');
    if (!section) return;

    var label = section.querySelector('.about-problem__label');
    var headline = section.querySelector('.about-problem__headline');
    var sideLeft = section.querySelector('.about-problem__side--without');
    var sideRight = section.querySelector('.about-problem__side--with');
    var dividerLine = section.querySelector('.about-problem__divider-line');
    var dividerLabel = section.querySelector('.about-problem__divider-label');
    var kicker = section.querySelector('.about-problem__kicker');

    var tl = gsap.timeline({
      paused: true,
      scrollTrigger: {
        trigger: section, start: 'top 75%', once: true,
        onEnter: function () { tl.play(); },
      },
    });

    if (label) {
      gsap.set(label, { opacity: 0, y: 10 });
      tl.to(label, { opacity: 1, y: 0, duration: 0.4, ease: 'expo.out' });
    }

    if (headline) {
      gsap.set(headline, { opacity: 0, y: 16 });
      tl.to(headline, { opacity: 1, y: 0, duration: 0.5, ease: 'expo.out' }, 0.1);
    }

    // Divider line draws down
    if (dividerLine) {
      gsap.set(dividerLine, { scaleY: 0 });
      tl.to(dividerLine, { scaleY: 1, duration: 0.6, ease: 'expo.out' }, 0.3);
    }

    if (dividerLabel) {
      gsap.set(dividerLabel, { opacity: 0 });
      tl.to(dividerLabel, { opacity: 1, duration: 0.4 }, 0.5);
    }

    // Left side slides in from left
    if (sideLeft) {
      gsap.set(sideLeft, { opacity: 0, x: -30 });
      tl.to(sideLeft, { opacity: 1, x: 0, duration: 0.5, ease: 'back.out(1.7)' }, 0.4);
    }

    // Right side slides in from right
    if (sideRight) {
      gsap.set(sideRight, { opacity: 0, x: 30 });
      tl.to(sideRight, { opacity: 1, x: 0, duration: 0.5, ease: 'back.out(1.7)' }, 0.4);
    }

    // List items stagger
    var leftItems = sideLeft ? gsap.utils.toArray(sideLeft.querySelectorAll('li')) : [];
    var rightItems = sideRight ? gsap.utils.toArray(sideRight.querySelectorAll('li')) : [];

    if (leftItems.length) {
      gsap.set(leftItems, { opacity: 0 });
      tl.to(leftItems, { opacity: 1, duration: 0.3, stagger: 0.08 }, 0.6);
    }

    if (rightItems.length) {
      gsap.set(rightItems, { opacity: 0 });
      tl.to(rightItems, { opacity: 1, duration: 0.3, stagger: 0.08 }, 0.6);
    }

    if (kicker) {
      gsap.set(kicker, { opacity: 0, y: 12 });
      tl.to(kicker, { opacity: 1, y: 0, duration: 0.5, ease: 'expo.out' }, 0.9);
    }
  }


  // ── 3. THE MISSION ──

  function initAboutMission() {
    var section = document.getElementById('about-mission');
    if (!section) return;

    var label = section.querySelector('.about-mission__label');
    var headline = section.querySelector('.about-mission__headline');
    var body = section.querySelector('.about-mission__body');
    var pillars = gsap.utils.toArray(section.querySelectorAll('.about-mission__pillar'));

    var tl = gsap.timeline({
      paused: true,
      scrollTrigger: {
        trigger: section, start: 'top 75%', once: true,
        onEnter: function () { tl.play(); },
      },
    });

    if (label) {
      gsap.set(label, { opacity: 0, y: 10 });
      tl.to(label, { opacity: 1, y: 0, duration: 0.4, ease: 'expo.out' });
    }

    if (headline && typeof SplitText !== 'undefined') {
      var split = new SplitText(headline, { type: 'words' });
      gsap.set(split.words, { y: 30, opacity: 0 });
      tl.to(split.words, {
        y: 0, opacity: 1, duration: 0.5, stagger: 0.03, ease: 'back.out(1.7)',
      }, 0.1);
    } else if (headline) {
      gsap.set(headline, { y: 30, opacity: 0 });
      tl.to(headline, { y: 0, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' }, 0.1);
    }

    if (body) {
      gsap.set(body, { opacity: 0 });
      tl.to(body, { opacity: 1, duration: 0.5 }, 0.3);
    }

    pillars.forEach(function (pillar, i) {
      gsap.set(pillar, { opacity: 0, y: 20 });
      tl.to(pillar, {
        opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.7)',
      }, 0.4 + (i * 0.12));
    });
  }


  // ── 4. CORE VALUES ──

  function initAboutValues() {
    var section = document.getElementById('about-values');
    if (!section) return;

    var label = section.querySelector('.about-values__label');
    var headline = section.querySelector('.about-values__headline');
    var cards = gsap.utils.toArray(section.querySelectorAll('.about-values__card'));

    var tl = gsap.timeline({
      paused: true,
      scrollTrigger: {
        trigger: section, start: 'top 75%', once: true,
        onEnter: function () { tl.play(); },
      },
    });

    if (label) {
      gsap.set(label, { opacity: 0, y: 10 });
      tl.to(label, { opacity: 1, y: 0, duration: 0.4, ease: 'expo.out' });
    }

    if (headline) {
      gsap.set(headline, { opacity: 0, y: 16 });
      tl.to(headline, { opacity: 1, y: 0, duration: 0.5, ease: 'expo.out' }, 0.1);
    }

    cards.forEach(function (card, i) {
      var isAccent = card.classList.contains('about-values__card--accent');
      gsap.set(card, { opacity: 0, y: 24 });
      tl.to(card, {
        opacity: 1, y: 0, duration: isAccent ? 0.6 : 0.5, ease: 'back.out(1.7)',
      }, 0.3 + (i * 0.1));

      // Accent card glow pulse
      if (isAccent) {
        tl.fromTo(card,
          { boxShadow: '0 0 30px rgba(255, 59, 48, 0)' },
          { boxShadow: '0 0 30px rgba(255, 59, 48, 0.15)', duration: 1.2, ease: 'power2.inOut', yoyo: true, repeat: 1 },
          0.3 + (i * 0.1) + 0.3
        );
      }
    });

    // 3D tilt hover (desktop, high-end only)
    var isHighEnd = navigator.hardwareConcurrency > 4;
    var prefersHover = window.matchMedia('(hover: hover)').matches;

    if (isHighEnd && prefersHover) {
      cards.forEach(function (card) {
        card.addEventListener('mousemove', function (e) {
          var rect = card.getBoundingClientRect();
          var rotateX = ((e.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * -5;
          var rotateY = ((e.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * 5;
          gsap.to(card, { rotateX: rotateX, rotateY: rotateY, transformPerspective: 800, duration: 0.3, ease: 'power2.out' });
        });
        card.addEventListener('mouseleave', function () {
          gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.6, ease: 'elastic.out(1, 0.3)' });
        });
      });
    }
  }


  // ── 5. THE APPROACH — DFY TIMELINE ──

  function initAboutApproach() {
    var section = document.getElementById('about-approach');
    if (!section) return;

    var label = section.querySelector('.about-approach__label');
    var headline = section.querySelector('.about-approach__headline');
    var sub = section.querySelector('.about-approach__sub');
    var track = section.querySelector('.about-approach__track');
    var steps = gsap.utils.toArray(section.querySelectorAll('.about-approach__step'));

    var tl = gsap.timeline({
      paused: true,
      scrollTrigger: {
        trigger: section, start: 'top 75%', once: true,
        onEnter: function () { tl.play(); },
      },
    });

    if (label) {
      gsap.set(label, { opacity: 0, y: 10 });
      tl.to(label, { opacity: 1, y: 0, duration: 0.4, ease: 'expo.out' });
    }

    if (headline) {
      gsap.set(headline, { opacity: 0, y: 16 });
      tl.to(headline, { opacity: 1, y: 0, duration: 0.5, ease: 'expo.out' }, 0.1);
    }

    if (sub) {
      gsap.set(sub, { opacity: 0 });
      tl.to(sub, { opacity: 1, duration: 0.5 }, 0.25);
    }

    // Track line draws down
    if (track) {
      gsap.set(track, { scaleY: 0 });
      tl.to(track, { scaleY: 1, duration: 1.2, ease: 'expo.out' }, 0.3);
    }

    // Steps stagger
    steps.forEach(function (step, i) {
      var marker = step.querySelector('.about-approach__marker');
      var isAccent = step.classList.contains('about-approach__step--accent');

      if (marker) {
        gsap.set(marker, { scale: 0 });
        tl.to(marker, { scale: 1, duration: 0.3, ease: 'back.out(2)' }, 0.4 + (i * 0.2));
      }

      gsap.set(step, { opacity: 0, x: 20 });
      tl.to(step, { opacity: 1, x: 0, duration: 0.5, ease: 'expo.out' }, 0.45 + (i * 0.2));

      // Accent marker glow
      if (isAccent && marker) {
        tl.fromTo(marker,
          { boxShadow: '0 0 12px rgba(255, 59, 48, 0)' },
          { boxShadow: '0 0 20px rgba(255, 59, 48, 0.3)', duration: 0.8, ease: 'power2.inOut', yoyo: true, repeat: 1 },
          0.45 + (i * 0.2) + 0.3
        );
      }
    });
  }


  // ── 6. BOTTOM CTA ──

  function initAboutBottomCta() {
    var section = document.getElementById('bottom-cta');
    if (!section) return;

    var headline = section.querySelector('.bottom-cta__headline');
    var subheadline = section.querySelector('.bottom-cta__subheadline');
    var btn = section.querySelector('.btn-primary');
    var secondary = section.querySelector('.bottom-cta__secondary');

    var tl = gsap.timeline({
      paused: true,
      scrollTrigger: {
        trigger: section, start: 'top 80%', once: true,
        onEnter: function () { tl.play(); },
      },
    });

    if (headline) {
      gsap.set(headline, { opacity: 0, y: 20 });
      tl.to(headline, { opacity: 1, y: 0, duration: 0.6, ease: 'expo.out' });
    }

    if (subheadline) {
      gsap.set(subheadline, { opacity: 0 });
      tl.to(subheadline, { opacity: 1, duration: 0.5, ease: 'expo.out' }, 0.2);
    }

    if (btn) {
      gsap.set(btn, { opacity: 0, scale: 0.95 });
      tl.to(btn, { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.7)' }, 0.4);
    }

    if (secondary) {
      gsap.set(secondary, { opacity: 0 });
      tl.to(secondary, { opacity: 1, duration: 0.3 }, 0.55);
    }
  }


  // ── INIT + BARBA REGISTRATION ──

  initAbout();

  window.fluisPageInits = window.fluisPageInits || {};
  window.fluisPageInits.about = initAbout;
})();
