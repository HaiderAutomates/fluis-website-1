/* ============================================
   Fluis.ai — Main Script
   Initializes GSAP, Lenis, and global effects.
   Runs on every page.
   ============================================ */

(function () {
  'use strict';

  // Wait for GSAP + plugins to be available
  if (typeof gsap === 'undefined') return;

  // Register GSAP plugins
  gsap.registerPlugin(ScrollTrigger);
  if (typeof SplitText !== 'undefined') gsap.registerPlugin(SplitText);
  if (typeof ScrambleTextPlugin !== 'undefined') gsap.registerPlugin(ScrambleTextPlugin);
  if (typeof Flip !== 'undefined') gsap.registerPlugin(Flip);


  // ── Lenis Smooth Scroll (desktop only — native mobile scroll is smoother) ──
  let lenis;
  if (typeof Lenis !== 'undefined' && window.innerWidth >= 768) {
    lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(function (time) {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Remove CSS scroll-behavior (conflicts with Lenis)
    document.documentElement.style.scrollBehavior = 'auto';
  }

  // ── Reduced Motion Check ──
  const mm = gsap.matchMedia();

  mm.add('(prefers-reduced-motion: no-preference)', function () {

    // ── Scroll Progress Bar ──
    var progressBar = document.querySelector('.scroll-progress');
    if (progressBar) {
      gsap.to(progressBar, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        },
      });
    }

    // ── Scroll Reveal (ScrollTrigger.batch) ──
    var reveals = gsap.utils.toArray('.reveal');
    if (reveals.length) {
      // Set initial state
      gsap.set(reveals, { opacity: 0, y: 24 });

      ScrollTrigger.batch(reveals, {
        onEnter: function (batch) {
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            stagger: 0.1,
            overwrite: true,
          });
        },
        once: true,
        start: 'top 85%',
      });
    }

    // ── Scroll Velocity Awareness ──
    ScrollTrigger.addEventListener('scroll', function () {
      var velocity = Math.abs(ScrollTrigger.getVelocity());
      var speed = 'slow';
      if (velocity > 2000) speed = 'fast';
      else if (velocity > 500) speed = 'medium';
      document.documentElement.style.setProperty('--scroll-speed', speed);
    });

    ScrollTrigger.addEventListener('scrollEnd', function () {
      document.documentElement.style.setProperty('--scroll-speed', 'slow');
    });

    // ── Cursor Spotlight (hero sections) ──
    var isHighEnd = navigator.hardwareConcurrency > 4;
    if (isHighEnd) {
      document.querySelectorAll('.hero').forEach(function (hero) {
        hero.addEventListener('pointermove', function (e) {
          var rect = hero.getBoundingClientRect();
          hero.style.setProperty('--mouse-x', (e.clientX - rect.left) + 'px');
          hero.style.setProperty('--mouse-y', (e.clientY - rect.top) + 'px');
        });
      });
    }
  });

  // ── Plausible Analytics Helper ──
  window.trackEvent = function (name, props) {
    if (window.plausible) {
      window.plausible(name, { props: props });
    }
  };

  // Track CTA clicks
  document.querySelectorAll('.btn-primary, .btn-secondary').forEach(function (btn) {
    btn.addEventListener('click', function () {
      trackEvent('CTA Click', {
        label: btn.textContent.trim(),
        page: window.location.pathname,
      });
    });
  });

  // ── Console Easter Egg ──
  console.log(
    '%c~∿~∿~∿~ Fluis.ai ~∿~∿~∿~',
    'color: #ff3b30; font-size: 16px; font-weight: bold;'
  );
  console.log(
    '%cPeeking under the hood? We like that.\nhello@fluis.ai',
    'color: #999; font-size: 12px;'
  );

  // ── Page Init Dispatcher (for Barba.js transitions) ──
  window.fluisPageInits = window.fluisPageInits || {};
  window.fluisInitPage = function (namespace) {
    var fn = window.fluisPageInits[namespace];
    if (typeof fn === 'function') fn();
  };

  // Expose lenis for page-specific scripts
  window.fluisLenis = lenis;
})();
