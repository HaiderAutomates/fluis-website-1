/* ============================================
   Home Page Animations
   Hero entrance, dot-grid canvas, overnight notifications,
   stat counters, The Deal imbalance section
   ============================================ */

(function () {
  'use strict';

  if (typeof gsap === 'undefined') return;

  function initHome() {
    var hero = document.getElementById('hero');
    if (!hero) return;

    var mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', function () {

      // ── 1. HERO ENTRANCE TIMELINE ──
      initHeroEntrance();

      // ── 2. DOT-GRID CANVAS ──
      initDotGrid(hero);

      // ── 3. MAGNETIC CTA BUTTONS ──
      initMagneticButtons();

      // ── 4. PROBLEM SECTION — STAT COUNTERS + SCRAMBLE TEXT ──
      initProblemSection();

      // ── 5. THE OVERNIGHT (Section 3) ──
      initOvernight();

      // ── 6. THE DEAL — IMBALANCE SECTION ──
      initTheDeal();

      // ── 7. SERVICE CARDS — 3D TILT + BATCH ENTRANCE ──
      initServiceCards();

      // ── 8. GUARANTEE — TEXT HIGHLIGHT ON SCROLL ──
      initGuarantee();

      // ── 9. INDUSTRY TILES — BATCH ENTRANCE ──
      initIndustries();

      // ── 10. FAQ — GSAP ACCORDION ──
      initFaq();

      // ── 11. FINAL CTA — SCALE ENTRANCE ──
      initFinalCta();

      return function () {
        // Cleanup on matchMedia revert
        cancelAnimationFrame(dotGridRAF);
      };
    });
  }

  // ── DOT-GRID CANVAS ──
  var dotGridRAF = 0;

  function initDotGrid(hero) {
    var canvas = document.getElementById('hero-dot-grid');
    if (!canvas) return;

    var ctx = canvas.getContext('2d');
    var isMobile = window.innerWidth < 768;
    var SPACING = isMobile ? 50 : 30;
    var DOT_RADIUS = 1;
    var MAX_RADIUS = 2.5;
    var DOT_OPACITY = 0.12;
    var SCATTER_RADIUS = 150;
    var isHighEnd = navigator.hardwareConcurrency > 4;
    var mouseX = -1000;
    var mouseY = -1000;
    var dots = [];
    var paused = false;

    // Cache dot color — re-read only on theme change (avoids per-frame getComputedStyle)
    var cachedDotColor = '';
    function updateCachedColor() {
      cachedDotColor = getComputedStyle(document.documentElement)
        .getPropertyValue('--color-text').trim() || '#f5f5f5';
    }
    updateCachedColor();

    var themeObserver = new MutationObserver(updateCachedColor);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    function sizeCanvas() {
      SPACING = window.innerWidth < 768 ? 50 : 30;
      var rect = hero.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      buildDots();
    }

    function buildDots() {
      dots = [];
      for (var x = 0; x < canvas.width; x += SPACING) {
        for (var y = 0; y < canvas.height; y += SPACING) {
          dots.push({ baseX: x, baseY: y, x: x, y: y });
        }
      }
    }

    function render() {
      if (paused) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (var i = 0; i < dots.length; i++) {
        var dot = dots[i];
        var proximityAlpha = DOT_OPACITY;
        var currentRadius = DOT_RADIUS;

        if (isHighEnd) {
          var dx = mouseX - dot.baseX;
          var dy = mouseY - dot.baseY;
          var dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < SCATTER_RADIUS) {
            var force = (SCATTER_RADIUS - dist) / SCATTER_RADIUS;
            dot.x += (dot.baseX - dx * force * 0.5 - dot.x) * 0.1;
            dot.y += (dot.baseY - dy * force * 0.5 - dot.y) * 0.1;
            // Brightness + size boost near cursor
            proximityAlpha = DOT_OPACITY + (1.0 - DOT_OPACITY) * force;
            currentRadius = DOT_RADIUS + (MAX_RADIUS - DOT_RADIUS) * force;
          } else {
            dot.x += (dot.baseX - dot.x) * 0.08;
            dot.y += (dot.baseY - dot.y) * 0.08;
          }
        }

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = cachedDotColor;
        ctx.globalAlpha = proximityAlpha;
        ctx.fill();
      }

      dotGridRAF = requestAnimationFrame(render);
    }

    sizeCanvas();

    // On mobile: render once (no mouse interaction), skip continuous RAF loop
    if (isMobile) {
      render();
      return;
    }

    // Track cursor relative to canvas
    if (isHighEnd) {
      hero.addEventListener('pointermove', function (e) {
        var rect = canvas.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
      });

      hero.addEventListener('pointerleave', function () {
        mouseX = -1000;
        mouseY = -1000;
      });
    }

    // Pause when tab is hidden
    document.addEventListener('visibilitychange', function () {
      paused = document.hidden;
      if (!paused) dotGridRAF = requestAnimationFrame(render);
    });

    // Handle resize
    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(sizeCanvas, 200);
    });

    dotGridRAF = requestAnimationFrame(render);
  }


  // ── HERO ENTRANCE ──

  function initHeroEntrance() {
    var headline = document.querySelector('.hero-headline');
    var subheadline = document.querySelector('.hero-subheadline');
    if (!headline) return;

    var heroTL = gsap.timeline({ delay: 0.2 });

    // 1. Headline — SplitText animation (words on mobile, chars on desktop)
    var isMobileHero = window.innerWidth < 768;
    if (typeof SplitText !== 'undefined' && isMobileHero) {
      var headlineSplit = new SplitText(headline, { type: 'words' });
      gsap.set(headlineSplit.words, { opacity: 0, y: 20 });

      heroTL.to(headlineSplit.words, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.05
      });
    } else if (typeof SplitText !== 'undefined') {
      var headlineSplit = new SplitText(headline, { type: 'chars' });
      gsap.set(headlineSplit.chars, { opacity: 0, y: 100, rotationX: -90 });

      heroTL.to(headlineSplit.chars, {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 0.8,
        ease: 'back.out(1.7)',
        stagger: 0.02
      });
    } else {
      // Fallback: simple fade
      gsap.set(headline, { opacity: 0, y: 24 });
      heroTL.to(headline, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' });
    }

    // 2. Subheadline — blur-to-sharp word reveal
    if (subheadline && typeof SplitText !== 'undefined') {
      var subSplit = new SplitText(subheadline, { type: 'words' });
      gsap.set(subSplit.words, { opacity: 0, y: 20, filter: 'blur(10px)' });

      heroTL.to(subSplit.words, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.04
      }, '-=0.45');
    } else if (subheadline) {
      gsap.set(subheadline, { opacity: 0, y: 24 });
      heroTL.to(subheadline, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3');
    }

    // 3. CTA buttons
    heroTL.from('.hero-cta-group', {
      opacity: 0,
      y: 24,
      duration: 0.6,
      ease: 'power2.out'
    }, '-=0.3');

    // 4. Trust badges
    heroTL.from('.hero .trust-badges', {
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out'
    }, '-=0.3');

    // 5. Scroll hint
    heroTL.from('.hero-scroll-hint', {
      opacity: 0,
      duration: 0.4,
      ease: 'power2.out'
    }, '-=0.2');

    // 6. Start reel cycle after entrance completes
    heroTL.call(initHeroReelCycle, [], '+=0.5');
  }


  // ── HERO REEL — SLOT-MACHINE CYCLING ──

  function initHeroReelCycle() {
    var reel = document.querySelector('.hero-reel');
    if (!reel) return;

    var items = reel.querySelectorAll('.hero-reel__item');
    if (items.length < 3) return;

    var itemHeight = items[0].offsetHeight;

    var reelTL = gsap.timeline({ repeat: -1 });
    // Talks → Books (scroll down)
    reelTL.to(reel, {
      y: -itemHeight,
      duration: 0.5,
      ease: 'back.out(1.4)',
      delay: 2.5
    });
    // Books → Talks-clone (scroll down again)
    reelTL.to(reel, {
      y: -2 * itemHeight,
      duration: 0.5,
      ease: 'back.out(1.4)',
      delay: 2.5
    });
    // Instant reset to top (seamless — clone matches original)
    reelTL.set(reel, { y: 0 });
  }


  // ── MAGNETIC CTA BUTTONS ──

  function initMagneticButtons() {
    var buttons = document.querySelectorAll('.hero .btn-primary, .hero .btn-secondary');

    buttons.forEach(function (btn) {
      btn.addEventListener('mousemove', function (e) {
        var rect = btn.getBoundingClientRect();
        var x = e.clientX - rect.left - rect.width / 2;
        var y = e.clientY - rect.top - rect.height / 2;
        gsap.to(btn, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      btn.addEventListener('mouseleave', function () {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: 'elastic.out(1, 0.3)'
        });
      });
    });
  }


  // ── PROBLEM SECTION — "THREE-MOMENT STORY" ──

  var problemSplit; // Module-level for Barba re-init cleanup

  function initProblemSection() {
    var heading = document.querySelector('.problem-heading');
    var moments = document.querySelectorAll('.problem-moment');
    var statNumbers = document.querySelectorAll('.problem-stat-block__number');
    var kicker = document.querySelector('.problem-kicker');
    if (!heading || !moments.length) return;

    // Revert previous SplitText if re-initializing (Barba)
    if (problemSplit) {
      problemSplit.revert();
      problemSplit = null;
    }

    // Set initial states (NO .reveal class — managed here directly)
    gsap.set(moments, { opacity: 0, y: 40, scale: 0.95 });
    if (kicker) gsap.set(kicker, { opacity: 0, y: 20 });

    // 1. SplitText heading — word-by-word reveal
    if (typeof SplitText !== 'undefined') {
      problemSplit = new SplitText(heading, { type: 'words' });
      gsap.set(problemSplit.words, { opacity: 0, y: 20 });
      gsap.to(problemSplit.words, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: heading,
          start: 'top 70%',
          once: true
        }
      });
    } else {
      // Fallback: simple fade-in if SplitText unavailable
      gsap.set(heading, { opacity: 0, y: 20 });
      gsap.to(heading, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: heading,
          start: 'top 70%',
          once: true
        }
      });
    }

    // 2. Cards stagger entrance
    ScrollTrigger.batch(moments, {
      onEnter: function (batch) {
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.2,
          ease: 'back.out(1.7)',
          onComplete: function () {
            initMomentIcons();
          }
        });
      },
      start: 'top 75%',
      once: true
    });

    // 3. SVG icon animations (fire after cards land)
    function initMomentIcons() {
      // Card 1: Add class to trigger pulse ring CSS animation
      if (moments[0]) {
        moments[0].classList.add('animate');
      }

      // Card 2: X mark stroke-dasharray draw
      var xMarks = document.querySelectorAll('.problem-x-mark');
      xMarks.forEach(function (line) {
        var length = line.getTotalLength ? line.getTotalLength() : 28;
        gsap.fromTo(line,
          { strokeDasharray: length, strokeDashoffset: length },
          { strokeDashoffset: 0, duration: 0.4, ease: 'power2.out' }
        );
      });

      // Card 3: Arrow stroke-dasharray draw
      var arrow = document.querySelector('.problem-arrow-away');
      if (arrow) {
        var arrowLen = arrow.getTotalLength ? arrow.getTotalLength() : 100;
        gsap.fromTo(arrow,
          { strokeDasharray: arrowLen, strokeDashoffset: arrowLen },
          { strokeDashoffset: 0, duration: 0.6, ease: 'power2.out', delay: 0.2 }
        );
      }
    }

    // 4. Stat counters (proven pattern)
    statNumbers.forEach(function (el, index) {
      var target = parseInt(el.dataset.target, 10);
      var suffix = el.dataset.suffix || '';
      var counter = { val: 0 };

      gsap.to(counter, {
        val: target,
        duration: 1.5,
        ease: 'power2.out',
        onUpdate: function () {
          el.textContent = Math.round(counter.val) + suffix;
        },
        scrollTrigger: {
          trigger: el,
          start: 'top 75%',
          once: true
        },
        delay: index * 0.3
      });
    });

    // 5. Kicker fade in
    if (kicker) {
      gsap.to(kicker, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: kicker,
          start: 'top 80%',
          once: true
        }
      });
    }
  }


  // ── THE OVERNIGHT (Section 3) ──

  function initOvernight() {
    var section = document.getElementById('solution');
    if (!section) return;

    var headline = section.querySelector('.overnight-headline');
    var sub = section.querySelector('.overnight-sub');
    var panel = section.querySelector('.overnight-panel');
    var notifs = section.querySelectorAll('.overnight-notif');
    var dots = section.querySelectorAll('.overnight-notif__dot');
    var zeroNumber = section.querySelector('.overnight-zero__number');
    var zeroLabel = section.querySelector('.overnight-zero__label');
    var zeroStats = section.querySelector('.overnight-zero__stats');
    var result = section.querySelector('.overnight-result');
    var kicker = section.querySelector('.overnight-kicker');

    var isHighEnd = navigator.hardwareConcurrency > 4;

    // ── Initial states ──

    // Headline: SplitText words mode (hero uses chars — different rhythm)
    var headlineSplit = null;
    if (typeof SplitText !== 'undefined' && headline) {
      headlineSplit = new SplitText(headline, { type: 'words' });
      gsap.set(headlineSplit.words, { opacity: 0, y: 20 });
    } else if (headline) {
      gsap.set(headline, { opacity: 0, y: 20 });
    }

    gsap.set(sub, { opacity: 0, y: 12 });
    gsap.set(panel, { opacity: 0, y: 16 });

    // Notifications: blur on high-end, simple fade on low-end
    var i;
    for (i = 0; i < notifs.length; i++) {
      if (isHighEnd) {
        gsap.set(notifs[i], { opacity: 0, y: 20, filter: 'blur(12px)' });
      } else {
        gsap.set(notifs[i], { opacity: 0, y: 20, scale: 0.95 });
      }
    }
    gsap.set(dots, { scale: 0 });

    // The Zero
    gsap.set(zeroNumber, { opacity: 0, scale: 0.5 });
    gsap.set(zeroLabel, { opacity: 0, y: 8 });
    gsap.set(zeroStats, { opacity: 0 });

    // Close
    gsap.set(result, { opacity: 0, y: 16 });
    gsap.set(kicker, { opacity: 0, y: 12 });

    // ── Build master timeline ──
    var tl = gsap.timeline({ paused: true });
    var pos = 0;

    // Phase 1: Headline (SplitText words stagger)
    if (headlineSplit) {
      tl.to(headlineSplit.words, {
        opacity: 1, y: 0,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.06
      }, pos);
    } else if (headline) {
      tl.to(headline, {
        opacity: 1, y: 0,
        duration: 0.6,
        ease: 'power3.out'
      }, pos);
    }

    // Phase 2: Subheadline
    tl.to(sub, {
      opacity: 1, y: 0,
      duration: 0.5,
      ease: 'power2.out'
    }, pos + 0.3);

    // Phase 3: Panel fades in
    pos = 0.6;
    tl.to(panel, {
      opacity: 1, y: 0,
      duration: 0.5,
      ease: 'power2.out'
    }, pos);

    // Phase 4: Notifications materialize (accelerating pace)
    pos = 1.0;
    var notifGaps = [0.4, 0.35, 0.35]; // accelerating
    for (i = 0; i < notifs.length; i++) {
      // Notification blur-to-sharp (or simple fade)
      if (isHighEnd) {
        tl.to(notifs[i], {
          opacity: 1, y: 0, filter: 'blur(0px)',
          duration: 0.55,
          ease: 'power2.out'
        }, pos);
      } else {
        tl.to(notifs[i], {
          opacity: 1, y: 0, scale: 1,
          duration: 0.55,
          ease: 'power2.out'
        }, pos);
      }

      // Green dot pops in after notification starts
      tl.to(dots[i], {
        scale: 1,
        duration: 0.35,
        ease: 'back.out(2)'
      }, pos + 0.3);

      pos += notifGaps[i] || 0.35;
    }

    // Phase 5: THE ZERO — emotional climax
    pos += 0.3;
    tl.to(zeroNumber, {
      opacity: 1, scale: 1,
      duration: 0.7,
      ease: 'power4.out'
    }, pos);
    tl.to(zeroLabel, {
      opacity: 1, y: 0,
      duration: 0.5,
      ease: 'power2.out'
    }, pos + 0.3);
    tl.to(zeroStats, {
      opacity: 1,
      duration: 0.4,
      ease: 'power2.out'
    }, pos + 0.5);

    // Phase 6: Result card
    pos += 0.9;
    tl.to(result, {
      opacity: 1, y: 0,
      duration: 0.6,
      ease: 'power2.out'
    }, pos);

    // Phase 7: Kicker
    tl.to(kicker, {
      opacity: 1, y: 0,
      duration: 0.5,
      ease: 'power2.out'
    }, pos + 0.4);

    // Phase 8: Idle — dots start breathing
    tl.call(function () {
      for (var d = 0; d < dots.length; d++) {
        dots[d].classList.add('overnight-notif__dot--active');
      }
    }, null, pos + 0.8);

    // Trigger once on scroll
    ScrollTrigger.create({
      trigger: section,
      start: 'top 65%',
      once: true,
      onEnter: function () {
        tl.play();
      }
    });
  }

  // ── THE DEAL — IMBALANCE SECTION ──

  function initTheDeal() {
    var section = document.getElementById('the-deal');
    if (!section) return;

    var headline = section.querySelector('.deal-headline');
    var accentSpan = section.querySelector('.deal-headline__accent');
    var label = section.querySelector('.deal-label');
    var youCard = section.querySelector('.deal-card--minimal');
    var dividerVs = section.querySelector('.deal-divider__vs');
    var dividerLine = section.querySelector('.deal-divider__line');
    var tiles = section.querySelectorAll('.deal-tile');
    var timelineTrack = section.querySelector('.deal-timeline__track');
    var timelineNodes = section.querySelectorAll('.deal-timeline__node');
    var kicker = section.querySelector('.deal-kicker');
    var cta = section.querySelector('.deal-cta');

    // ── 1. HEADLINE ENTRANCE ──

    // Label fade
    gsap.set(label, { opacity: 0, y: 10 });
    gsap.to(label, {
      opacity: 1,
      y: 0,
      duration: 0.4,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 70%',
        once: true
      }
    });

    // Headline: first line fades in, accent line scrambles
    if (headline) {
      gsap.set(headline, { opacity: 0, y: 20 });

      ScrollTrigger.create({
        trigger: headline,
        start: 'top 70%',
        once: true,
        onEnter: function () {
          var headTL = gsap.timeline();

          // ScrambleText on the accent span — start at same time as
          // fade so the text is scrambled while still invisible (no flash)
          if (accentSpan && typeof ScrambleTextPlugin !== 'undefined') {
            var finalText = accentSpan.textContent;
            headTL.to(accentSpan, {
              duration: 1.2,
              scrambleText: {
                text: finalText,
                chars: '!<>-_\\/[]{}=+*^?#',
                revealDelay: 0.3,
                speed: 0.5
              }
            }, 0);
          }

          // Fade in the headline container
          headTL.to(headline, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out'
          }, 0);
        }
      });
    }

    // ── 2. IMBALANCE ENTRANCE ──

    // "Your Part" card — small, deliberate entrance
    if (youCard) {
      gsap.set(youCard, { opacity: 0, scale: 0.9, y: 20 });

      ScrollTrigger.create({
        trigger: youCard,
        start: 'top 75%',
        once: true,
        onEnter: function () {
          gsap.to(youCard, {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out'
          });
        }
      });
    }

    // VS divider
    if (dividerVs) {
      gsap.set(dividerVs, { opacity: 0, scale: 0 });
      if (dividerLine) {
        gsap.set(dividerLine, { scaleY: 0, transformOrigin: 'top center' });
      }

      ScrollTrigger.create({
        trigger: dividerVs,
        start: 'top 75%',
        once: true,
        onEnter: function () {
          var vsTL = gsap.timeline();
          vsTL.to(dividerVs, {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            ease: 'back.out(2)'
          });
          if (dividerLine) {
            vsTL.to(dividerLine, {
              scaleY: 1,
              duration: 0.6,
              ease: 'power2.out'
            }, '-=0.2');
          }
        }
      });
    }

    // "Our Part" tiles — cascade stagger with scale bounce
    if (tiles.length) {
      gsap.set(tiles, { opacity: 0, y: 30, scale: 0.85 });

      ScrollTrigger.create({
        trigger: tiles[0],
        start: 'top 80%',
        once: true,
        onEnter: function () {
          gsap.to(tiles, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            ease: 'back.out(1.7)',
            stagger: {
              amount: 0.8,
              grid: [4, 2],
              from: 'start'
            }
          });
        }
      });
    }

    // ── 3. TIMELINE ANIMATION ──

    if (timelineTrack && timelineNodes.length) {
      gsap.set(timelineTrack, { scaleX: 0, transformOrigin: 'left center' });
      gsap.set(timelineNodes, { opacity: 0, y: 15 });

      ScrollTrigger.create({
        trigger: timelineTrack,
        start: 'top 80%',
        once: true,
        onEnter: function () {
          var tlTL = gsap.timeline();

          // Track grows
          tlTL.to(timelineTrack, {
            scaleX: 1,
            duration: 1.2,
            ease: 'power2.inOut'
          });

          // Nodes appear sequentially as track passes them
          timelineNodes.forEach(function (node, i) {
            var marker = node.querySelector('.deal-timeline__marker');

            tlTL.to(node, {
              opacity: 1,
              y: 0,
              duration: 0.4,
              ease: 'power2.out'
            }, 0.3 * i);

            // Marker pulse on appearance
            if (marker) {
              tlTL.fromTo(marker,
                { scale: 0 },
                { scale: 1, duration: 0.3, ease: 'back.out(3)' },
                0.3 * i
              );
            }
          });
        }
      });
    }

    // ── 4. KICKER + CTA ──

    if (kicker) {
      gsap.set(kicker, { opacity: 0, y: 20 });
      gsap.to(kicker, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: kicker,
          start: 'top 85%',
          once: true
        }
      });
    }

    if (cta) {
      gsap.set(cta, { opacity: 0, y: 20 });
      gsap.to(cta, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: cta,
          start: 'top 85%',
          once: true
        }
      });
    }
  }


  // ── SERVICE CARDS — 3D TILT + BATCH ENTRANCE ──

  function initServiceCards() {
    var cards = gsap.utils.toArray('.service-card');
    if (!cards.length) return;

    // Batch entrance with overshoot
    gsap.set(cards, { opacity: 0, y: 40 });

    ScrollTrigger.batch(cards, {
      onEnter: function (batch) {
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'back.out(1.7)',
          stagger: 0.1,
          overwrite: true
        });
      },
      start: 'top 85%',
      once: true
    });

    // 3D tilt on hover (desktop only)
    var isHighEnd = navigator.hardwareConcurrency > 4;
    if (!isHighEnd || window.innerWidth < 768) return;

    cards.forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var rect = card.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        var centerX = rect.width / 2;
        var centerY = rect.height / 2;
        var rotateX = ((y - centerY) / centerY) * -10;
        var rotateY = ((x - centerX) / centerX) * 10;

        gsap.to(card, {
          rotateX: rotateX,
          rotateY: rotateY,
          transformPerspective: 1000,
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      card.addEventListener('mouseleave', function () {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.6,
          ease: 'elastic.out(1, 0.3)'
        });
      });
    });
  }


  // ── GUARANTEE — TEXT HIGHLIGHT ON SCROLL ──

  function initGuarantee() {
    var headline = document.querySelector('.guarantee-headline');
    if (!headline) return;

    // SplitText word highlight — words dim to full on scroll
    if (typeof SplitText !== 'undefined') {
      var guaranteeSplit = new SplitText(headline, { type: 'words' });
      gsap.set(guaranteeSplit.words, { color: 'var(--color-text-dim)' });

      gsap.to(guaranteeSplit.words, {
        color: 'var(--color-text)',
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.guarantee-callout',
          start: 'top 70%',
          end: 'top 30%',
          scrub: true
        }
      });
    }
  }


  // ── INDUSTRY TILES — BATCH ENTRANCE ──

  function initIndustries() {
    var tiles = gsap.utils.toArray('.industry-tile');
    if (!tiles.length) return;

    gsap.set(tiles, { opacity: 0, y: 30, scale: 0.95 });

    ScrollTrigger.batch(tiles, {
      onEnter: function (batch) {
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: 'back.out(1.7)',
          stagger: 0.075,
          overwrite: true
        });
      },
      start: 'top 85%',
      once: true
    });
  }


  // ── FAQ — GSAP ACCORDION ──

  function initFaq() {
    var items = document.querySelectorAll('.faq-item');
    if (!items.length) return;

    items.forEach(function (details) {
      var summary = details.querySelector('summary');
      var content = details.querySelector('.faq-item__answer');
      if (!summary || !content) return;

      summary.addEventListener('click', function (e) {
        e.preventDefault();

        if (details.open) {
          // Closing
          gsap.to(content, {
            height: 0,
            opacity: 0,
            duration: 0.2,
            ease: 'power2.in',
            onComplete: function () {
              details.open = false;
              gsap.set(content, { clearProps: 'height,opacity' });
            }
          });
        } else {
          // Opening
          details.open = true;
          gsap.from(content, {
            height: 0,
            opacity: 0,
            duration: 0.3,
            ease: 'power2.out'
          });
        }
      });
    });
  }


  // ── FINAL CTA — "THE WIPE" ──

  function initFinalCta() {
    var section = document.getElementById('final-cta');
    if (!section) return;

    var line = section.querySelector('.final-cta__line');
    var heading = section.querySelector('.final-cta__heading');
    var btn = section.querySelector('.final-cta__btn');
    var secondary = section.querySelector('.final-cta__secondary');

    if (!heading) return;

    gsap.set(line, { scaleX: 0, transformOrigin: 'left center' });
    gsap.set(heading, { opacity: 0, y: 30 });
    gsap.set(btn, { opacity: 0, y: 20 });
    gsap.set(secondary, { opacity: 0 });

    var tl = gsap.timeline({ paused: true });

    // Phase 1: Line wipes in from left (signature motif)
    tl.to(line, { scaleX: 1, duration: 0.6, ease: 'power2.inOut' }, 0);

    // Phase 2: Headline rises slowly — deliberate, final
    tl.to(heading, { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out' }, 0.3);

    // Phase 3: Button materializes after headline lands
    tl.to(btn, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 0.9);

    // Phase 4: Secondary link fades in last
    tl.to(secondary, { opacity: 1, duration: 0.5, ease: 'power2.out' }, 1.2);

    ScrollTrigger.create({
      trigger: section,
      start: 'top 75%',
      once: true,
      onEnter: function () { tl.play(); }
    });
  }


  // ── PAGE INIT ──

  // Run on initial load
  initHome();

  // Register for Barba.js page transitions
  window.fluisPageInits = window.fluisPageInits || {};
  window.fluisPageInits.home = initHome;

})();
