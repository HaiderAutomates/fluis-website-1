/* ============================================
   Services Page Animations
   Hero entrance, concept flow diagram,
   service card batch, comparison tables,
   RAAS guarantee, how-it-works, bottom CTA
   ============================================ */

(function () {
  'use strict';

  if (typeof gsap === 'undefined') return;

  function initServices() {
    var hero = document.getElementById('services-hero');
    if (!hero) return;

    var mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', function () {

      // ── 1. SERVICES HERO ENTRANCE ──
      initServicesHero();

      // ── 2. CONCEPT EXPLAINER (TALKING WEBSITES) ──
      initConceptExplainer();

      // ── 3-5. SERVICE CARDS BATCH ──
      initServiceCardsBatch();

      // ── 5b. COMPETITIVE COMPARISON ──
      initCompetitiveComparison();

      // ── 6. COMPARISON TABLE ──
      initComparisonTable();

      // ── 6b. RAAS GUARANTEE ──
      initRaasGuarantee();

      // ── 7. HOW IT WORKS ──
      initHowItWorks();

      // ── 8. BOTTOM CTA ──
      initBottomCta();
    });
  }


  // ── 1. SERVICES HERO ──

  function initServicesHero() {
    var section = document.getElementById('services-hero');
    if (!section) return;

    var count = section.querySelector('.services-hero__count');
    var headline = section.querySelector('.services-hero__headline');
    var sub = section.querySelector('.services-hero__sub');
    var anchors = gsap.utils.toArray(section.querySelectorAll('.services-hero__anchor'));
    var scrollHint = section.querySelector('.services-hero__scroll-hint');

    if (!headline) return;

    var tl = gsap.timeline({ delay: 0.1 });

    // Giant "3" watermark — scale + fade
    if (count) {
      gsap.set(count, { opacity: 0, scale: 0.8 });
      tl.to(count, {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: 'expo.out',
      }, 0);
    }

    // SplitText word reveal on headline
    if (typeof SplitText !== 'undefined') {
      var split = new SplitText(headline, { type: 'words' });
      gsap.set(split.words, { y: 40, opacity: 0 });

      tl.to(split.words, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.03,
        ease: 'back.out(1.7)',
      }, 0.1);
    } else {
      gsap.set(headline, { y: 40, opacity: 0 });
      tl.to(headline, { y: 0, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' }, 0.1);
    }

    // Subheadline fade up
    if (sub) {
      gsap.set(sub, { y: 15, opacity: 0 });
      tl.to(sub, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: 'expo.out',
      }, '-=0.2');
    }

    // Anchor pills stagger in
    if (anchors.length) {
      gsap.set(anchors, { y: 20, opacity: 0 });
      tl.to(anchors, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: 'expo.out',
      }, '-=0.15');
    }

    // Scroll hint fades in last
    if (scrollHint) {
      gsap.set(scrollHint, { opacity: 0 });
      tl.to(scrollHint, {
        opacity: 0.5,
        duration: 0.6,
        ease: 'power2.out',
      }, '-=0.1');
    }
  }


  // ── 2. CONCEPT EXPLAINER ──

  function initConceptExplainer() {
    var section = document.getElementById('talking-websites');
    if (!section) return;

    var label = section.querySelector('.concept-explainer__label');
    var headline = section.querySelector('.concept-explainer__headline');
    var tagline = section.querySelector('.concept-explainer__tagline');
    var labelBottom = section.querySelector('.concept-explainer__label-bottom');
    var nodes = gsap.utils.toArray(section.querySelectorAll('.concept-flow__node'));
    var connectors = gsap.utils.toArray(section.querySelectorAll('.concept-flow__connector'));

    // Text side — stagger in from left
    var textTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        once: true,
      },
    });

    if (label) {
      gsap.set(label, { opacity: 0, x: -20 });
      textTl.to(label, { opacity: 1, x: 0, duration: 0.4, ease: 'expo.out' });
    }
    if (headline) {
      gsap.set(headline, { opacity: 0, x: -20 });
      textTl.to(headline, { opacity: 1, x: 0, duration: 0.5, ease: 'expo.out' }, 0.15);
    }
    if (tagline) {
      gsap.set(tagline, { opacity: 0, x: -20 });
      textTl.to(tagline, { opacity: 1, x: 0, duration: 0.5, ease: 'expo.out' }, 0.3);
    }

    // Flow diagram — scrub-linked SVG path draw + node reveal
    if (nodes.length && connectors.length) {
      // Set initial states
      gsap.set(nodes, { opacity: 0, scale: 0.9 });

      connectors.forEach(function (svg) {
        var line = svg.querySelector('line');
        var polygon = svg.querySelector('polygon');
        if (line) {
          var length = 56; // connector line length
          gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });
        }
        if (polygon) {
          gsap.set(polygon, { opacity: 0 });
        }
      });

      // Build scrub timeline
      var flowTl = gsap.timeline({
        scrollTrigger: {
          trigger: section.querySelector('.concept-flow'),
          start: 'top 70%',
          end: 'bottom 50%',
          scrub: 1,
        },
      });

      // Node 1 visible at 0%
      flowTl.to(nodes[0], { opacity: 1, scale: 1, duration: 0.1 }, 0);

      // Stagger through connector + node pairs
      for (var i = 0; i < connectors.length; i++) {
        var startPos = (i * 0.25) + 0.05;
        var connLine = connectors[i].querySelector('line');
        var connArrow = connectors[i].querySelector('polygon');

        if (connLine) {
          flowTl.to(connLine, { strokeDashoffset: 0, duration: 0.2 }, startPos);
        }
        if (connArrow) {
          flowTl.to(connArrow, { opacity: 1, duration: 0.05 }, startPos + 0.15);
        }
        if (nodes[i + 1]) {
          flowTl.to(nodes[i + 1], { opacity: 1, scale: 1, duration: 0.1 }, startPos + 0.2);
        }
      }

      // Final node red glow pulse (one-shot)
      var finalNode = nodes[nodes.length - 1];
      if (finalNode) {
        ScrollTrigger.create({
          trigger: section.querySelector('.concept-flow'),
          start: 'top 40%',
          once: true,
          onEnter: function () {
            gsap.fromTo(finalNode,
              { boxShadow: '0 0 20px rgba(255, 59, 48, 0)' },
              { boxShadow: '0 0 20px rgba(255, 59, 48, 0.3)', duration: 0.3, yoyo: true, repeat: 1, ease: 'power2.inOut' }
            );
          },
        });
      }
    }

    // "That's a Talking Website" label — fade in after diagram
    if (labelBottom) {
      gsap.set(labelBottom, { opacity: 0, y: 10 });
      ScrollTrigger.create({
        trigger: labelBottom,
        start: 'top 85%',
        once: true,
        onEnter: function () {
          gsap.to(labelBottom, { opacity: 1, y: 0, duration: 0.5, ease: 'expo.out' });
        },
      });
    }
  }


  // ── 3-5. SERVICE CARDS BATCH ──

  function initServiceCardsBatch() {
    var cards = gsap.utils.toArray('.page-services .service-detail__card');
    if (!cards.length) return;

    // Set initial state
    gsap.set(cards, { opacity: 0, y: 24 });

    // Batch entrance
    ScrollTrigger.batch(cards, {
      interval: 0.1,
      batchMax: 3,
      onEnter: function (batch) {
        batch.forEach(function (card, index) {
          var isVoice = card.closest('.service-detail--voice');
          gsap.to(card, {
            opacity: 1,
            y: 0,
            duration: isVoice ? 0.7 : 0.6,
            ease: 'back.out(1.7)',
            delay: index * 0.15,
            overwrite: true,
          });

          // Voice card special effects
          if (isVoice) {
            // Red glow pulse (one-shot)
            gsap.fromTo(card,
              { boxShadow: '0 0 30px rgba(255, 59, 48, 0.15)' },
              {
                boxShadow: '0 0 50px rgba(255, 59, 48, 0.25)',
                duration: 1.2,
                ease: 'power2.inOut',
                yoyo: true,
                repeat: 1,
                delay: index * 0.15 + 0.3,
              }
            );

            // Recommended badge scale-in
            var badge = card.querySelector('.badge--recommended');
            if (badge) {
              gsap.set(badge, { scale: 0, opacity: 0 });
              gsap.to(badge, {
                scale: 1,
                opacity: 1,
                duration: 0.4,
                ease: 'back.out(1.7)',
                delay: index * 0.15 + 0.3,
              });
            }
          } else {
            // Non-voice badge pop-in
            var badges = card.querySelectorAll('.badge');
            if (badges.length) {
              gsap.set(badges, { scale: 0.8, opacity: 0 });
              gsap.to(badges, {
                scale: 1,
                opacity: 1,
                duration: 0.3,
                ease: 'back.out(1.7)',
                stagger: 0.05,
                delay: index * 0.15 + 0.3,
              });
            }
          }

          // Feature list stagger
          var features = card.querySelectorAll('.service-detail__features li');
          if (features.length) {
            gsap.set(features, { opacity: 0 });
            gsap.to(features, {
              opacity: 1,
              duration: 0.3,
              stagger: 0.06,
              delay: index * 0.15 + 0.4,
            });
          }
        });
      },
      once: true,
      start: 'top 85%',
    });

    // 3D tilt on hover (desktop only, high-end devices)
    var isHighEnd = navigator.hardwareConcurrency > 4;
    var prefersHover = window.matchMedia('(hover: hover)').matches;

    if (isHighEnd && prefersHover) {
      cards.forEach(function (card) {
        card.addEventListener('mousemove', function (e) {
          var rect = card.getBoundingClientRect();
          var x = e.clientX - rect.left;
          var y = e.clientY - rect.top;
          var centerX = rect.width / 2;
          var centerY = rect.height / 2;

          var rotateX = ((y - centerY) / centerY) * -8;
          var rotateY = ((x - centerX) / centerX) * 8;

          gsap.to(card, {
            rotateX: rotateX,
            rotateY: rotateY,
            transformPerspective: 1000,
            duration: 0.3,
            ease: 'power2.out',
          });
        });

        card.addEventListener('mouseleave', function () {
          gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.6,
            ease: 'elastic.out(1, 0.3)',
          });
        });
      });
    }

    // Expandable sections — GSAP height tween
    var expandables = gsap.utils.toArray('.page-services .service-detail__expandable');
    expandables.forEach(function (details) {
      var summary = details.querySelector('summary');
      var content = details.querySelector('.service-detail__expandable-content');

      if (!summary || !content) return;

      summary.addEventListener('click', function (e) {
        e.preventDefault();

        if (details.open) {
          // Close instantly
          details.open = false;
        } else {
          // Open with animation
          details.open = true;
          var fullHeight = content.scrollHeight;
          gsap.fromTo(content,
            { maxHeight: 0, overflow: 'hidden' },
            { maxHeight: fullHeight, duration: 0.3, ease: 'power2.out', onComplete: function () {
              content.style.maxHeight = 'none';
              content.style.overflow = '';
            }}
          );
        }
      });
    });
  }


  // ── 5b. COMPETITIVE COMPARISON ──

  function initCompetitiveComparison() {
    var section = document.getElementById('why-fluis');
    if (!section) return;

    var headline = section.querySelector('.competitive-comparison__headline');
    var rows = gsap.utils.toArray(section.querySelectorAll('.competitive-comparison__table tbody tr'));

    if (headline) {
      gsap.set(headline, { opacity: 0, y: 16 });
      ScrollTrigger.create({
        trigger: headline,
        start: 'top 80%',
        once: true,
        onEnter: function () {
          gsap.to(headline, { opacity: 1, y: 0, duration: 0.5, ease: 'expo.out' });
        },
      });
    }

    if (rows.length) {
      gsap.set(rows, { opacity: 0, y: 8 });
      ScrollTrigger.batch(rows, {
        interval: 0.05,
        onEnter: function (batch) {
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.3,
            stagger: 0.05,
            ease: 'power2.out',
            overwrite: true,
          });
        },
        once: true,
        start: 'top 85%',
      });
    }
  }


  // ── 6. COMPARISON TABLE ──

  function initComparisonTable() {
    var section = document.getElementById('comparison');
    if (!section) return;

    var details = section.querySelector('.comparison-table__details');
    var content = details ? details.querySelector('.comparison-table__content') : null;
    var chevron = details ? details.querySelector('.chevron') : null;

    if (!details || !content) return;

    // Hijack the details open/close for GSAP animation
    var summary = details.querySelector('summary');
    if (summary) {
      summary.addEventListener('click', function (e) {
        e.preventDefault();

        if (details.open) {
          // Close instantly
          details.open = false;
          if (chevron) gsap.to(chevron, { rotation: 0, duration: 0.3, ease: 'power2.inOut' });
        } else {
          // Open with animation
          details.open = true;
          var fullHeight = content.scrollHeight;
          gsap.fromTo(content,
            { maxHeight: 0, overflow: 'hidden' },
            {
              maxHeight: fullHeight,
              duration: 0.4,
              ease: 'power2.out',
              onComplete: function () {
                content.style.maxHeight = 'none';
                content.style.overflow = '';
              },
            }
          );

          if (chevron) gsap.to(chevron, { rotation: 180, duration: 0.3, ease: 'power2.inOut' });

          // Stagger table rows in
          var rows = gsap.utils.toArray(content.querySelectorAll('tbody tr:not(.group-header)'));
          if (rows.length) {
            gsap.set(rows, { opacity: 0, y: 8 });
            gsap.to(rows, {
              opacity: 1,
              y: 0,
              duration: 0.2,
              stagger: 0.05,
              ease: 'power2.out',
              delay: 0.1,
            });
          }
        }
      });
    }
  }


  // ── 6b. RAAS GUARANTEE ──

  function initRaasGuarantee() {
    var section = document.getElementById('raas-guarantee');
    if (!section) return;

    var content = section.querySelector('.raas-callout__content');
    var headline = section.querySelector('.raas-callout__headline');
    var body = section.querySelector('.raas-callout__body');
    var cta = section.querySelector('.raas-callout__cta');

    if (!content) return;

    var tl = gsap.timeline({
      paused: true,
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        once: true,
        onEnter: function () { tl.play(); },
      },
    });

    // Left border draw-down effect (simulate with clip-path)
    gsap.set(content, { clipPath: 'inset(0 0 100% 0)' });
    tl.to(content, {
      clipPath: 'inset(0 0 0% 0)',
      duration: 0.4,
      ease: 'expo.out',
    });

    if (headline) {
      gsap.set(headline, { opacity: 0 });
      tl.to(headline, { opacity: 1, duration: 0.5, ease: 'expo.out' }, 0.15);
    }

    if (body) {
      gsap.set(body, { opacity: 0 });
      tl.to(body, { opacity: 1, duration: 0.5 }, 0.3);
    }

    if (cta) {
      gsap.set(cta, { opacity: 0 });
      tl.to(cta, { opacity: 1, duration: 0.4 }, 0.45);
    }

    // Glow pulse (one-shot via CSS class)
    tl.call(function () {
      content.classList.add('is-visible');
    }, null, 0.5);
  }


  // ── 7. HOW IT WORKS ──

  function initHowItWorks() {
    var section = document.getElementById('how-it-works');
    if (!section) return;

    var headline = section.querySelector('.how-it-works__headline');
    var steps = gsap.utils.toArray(section.querySelectorAll('.how-it-works__step'));
    var cta = section.querySelector('.how-it-works__cta');

    var tl = gsap.timeline({
      paused: true,
      scrollTrigger: {
        trigger: section,
        start: 'top 75%',
        once: true,
        onEnter: function () { tl.play(); },
      },
    });

    if (headline) {
      gsap.set(headline, { opacity: 0, y: 16 });
      tl.to(headline, { opacity: 1, y: 0, duration: 0.5, ease: 'expo.out' });
    }

    steps.forEach(function (step, i) {
      gsap.set(step, { opacity: 0, y: 16 });
      tl.to(step, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: 'back.out(1.7)',
      }, 0.2 + (i * 0.15));
    });

    if (cta) {
      gsap.set(cta, { opacity: 0 });
      tl.to(cta, { opacity: 1, duration: 0.4 }, 0.7);
    }
  }


  // ── 8. BOTTOM CTA ──

  function initBottomCta() {
    var section = document.getElementById('bottom-cta');
    if (!section) return;

    var headline = section.querySelector('.bottom-cta__headline');
    var subheadline = section.querySelector('.bottom-cta__subheadline');
    var btn = section.querySelector('.btn-primary');
    var secondary = section.querySelector('.bottom-cta__secondary');

    var tl = gsap.timeline({
      paused: true,
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        once: true,
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


  // ── PAGE INIT ──

  // Run on initial load
  initServices();

  // Register for Barba.js page transitions
  window.fluisPageInits = window.fluisPageInits || {};
  window.fluisPageInits.services = initServices;

})();
