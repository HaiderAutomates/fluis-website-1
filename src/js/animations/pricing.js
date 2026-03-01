/* ============================================
   Pricing Page Animations
   Hero entrance, pricing cards batch,
   comparison table, RAAS guarantee,
   AI costs, FAQ, bottom CTA
   ============================================ */

(function () {
  'use strict';

  if (typeof gsap === 'undefined') return;

  function initPricing() {
    var hero = document.getElementById('pricing-hero');
    if (!hero) return;

    var mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', function () {

      // ── 1. PRICING HERO ENTRANCE ──
      initPricingHero();

      // ── 2. PRICING CARDS ──
      initPricingCards();

      // ── 3. COMPARISON TABLE ──
      initComparisonTable();

      // ── 4. RAAS GUARANTEE ──
      initRaasGuarantee();

      // ── 5. AI COSTS ──
      initAiCosts();

      // ── 6. PRICING FAQ ──
      initPricingFaq();

      // ── 7. BOTTOM CTA ──
      initBottomCta();
    });
  }


  // ── 1. PRICING HERO ──

  function initPricingHero() {
    var section = document.getElementById('pricing-hero');
    if (!section) return;

    var watermark = section.querySelector('.pricing-hero__watermark');
    var headline = section.querySelector('.pricing-hero__headline');
    var sub = section.querySelector('.pricing-hero__sub');
    var pills = gsap.utils.toArray(section.querySelectorAll('.trust-pill'));
    var scrollHint = section.querySelector('.pricing-hero__scroll-hint');

    if (!headline) return;

    var tl = gsap.timeline({ delay: 0.1 });

    // "$" watermark — scale + fade
    if (watermark) {
      gsap.set(watermark, { opacity: 0, scale: 0.8 });
      tl.to(watermark, {
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

    // Trust pills stagger in
    if (pills.length) {
      gsap.set(pills, { y: 20, opacity: 0 });
      tl.to(pills, {
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


  // ── 2. PRICING CARDS ──

  function initPricingCards() {
    var cards = gsap.utils.toArray('.page-pricing .pricing-plan');
    if (!cards.length) return;

    // Set initial state
    gsap.set(cards, { opacity: 0, y: 30 });

    // Batch entrance
    ScrollTrigger.batch(cards, {
      interval: 0.1,
      batchMax: 3,
      onEnter: function (batch) {
        batch.forEach(function (card, index) {
          var isVoice = card.classList.contains('pricing-plan--voice');
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
          var features = card.querySelectorAll('.pricing-plan__features li');
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

    // Standard/Premium toggle (Website card)
    var toggle = document.querySelector('.pricing-plan--website .pricing-plan__toggle');
    if (toggle) {
      var buttons = toggle.querySelectorAll('.pricing-plan__toggle-btn');
      var priceEl = document.querySelector('.pricing-plan--website .pricing-plan__price');

      buttons.forEach(function (btn) {
        btn.addEventListener('click', function () {
          // Swap active states
          buttons.forEach(function (b) {
            b.classList.remove('pricing-plan__toggle-btn--active');
            b.setAttribute('aria-checked', 'false');
          });
          btn.classList.add('pricing-plan__toggle-btn--active');
          btn.setAttribute('aria-checked', 'true');

          // Update price with GSAP animation
          var tier = btn.getAttribute('data-tier');
          var newPrice = priceEl.getAttribute('data-' + tier);
          gsap.to(priceEl, {
            opacity: 0,
            y: -5,
            duration: 0.15,
            ease: 'power2.in',
            onComplete: function () {
              priceEl.textContent = newPrice;
              gsap.to(priceEl, {
                opacity: 1,
                y: 0,
                duration: 0.2,
                ease: 'power2.out',
              });
            },
          });
        });
      });
    }
  }


  // ── 3. COMPARISON TABLE ──

  function initComparisonTable() {
    var section = document.getElementById('pricing-comparison');
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


  // ── 4. RAAS GUARANTEE ──

  function initRaasGuarantee() {
    var section = document.getElementById('pricing-guarantee');
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


  // ── 5. AI COSTS ──

  function initAiCosts() {
    var section = document.getElementById('ai-costs');
    if (!section) return;

    var label = section.querySelector('.ai-costs__label');
    var headline = section.querySelector('.ai-costs__headline');
    var cards = gsap.utils.toArray(section.querySelectorAll('.ai-costs__card'));
    var note = section.querySelector('.ai-costs__note');

    var tl = gsap.timeline({
      paused: true,
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        once: true,
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
      gsap.set(card, { opacity: 0, y: 20 });
      tl.to(card, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'back.out(1.7)',
      }, 0.2 + (i * 0.15));
    });

    if (note) {
      gsap.set(note, { opacity: 0 });
      tl.to(note, { opacity: 1, duration: 0.4 }, 0.5);
    }
  }


  // ── 6. PRICING FAQ ──

  function initPricingFaq() {
    var faqItems = gsap.utils.toArray('.pricing-faq .faq-item');
    if (!faqItems.length) return;

    var headline = document.querySelector('.pricing-faq__headline');

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

    // FAQ items stagger
    gsap.set(faqItems, { opacity: 0, y: 12 });
    ScrollTrigger.batch(faqItems, {
      interval: 0.05,
      onEnter: function (batch) {
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.08,
          ease: 'power2.out',
          overwrite: true,
        });
      },
      once: true,
      start: 'top 85%',
    });

    // GSAP expand/collapse animation
    faqItems.forEach(function (details) {
      var summary = details.querySelector('summary');
      var content = details.querySelector('.faq-item__answer');

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
            {
              maxHeight: fullHeight,
              duration: 0.3,
              ease: 'power2.out',
              onComplete: function () {
                content.style.maxHeight = 'none';
                content.style.overflow = '';
              },
            }
          );
        }
      });
    });
  }


  // ── 7. BOTTOM CTA ──

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
  initPricing();

  // Register for Barba.js page transitions
  window.fluisPageInits = window.fluisPageInits || {};
  window.fluisPageInits.pricing = initPricing;

})();
