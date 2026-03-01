/* ============================================
   Page Transitions — Barba.js
   SPA-like fade+slide transitions on static site.
   Prefetch on hover for instant feel.
   ============================================ */

(function () {
  'use strict';

  if (typeof barba === 'undefined' || typeof gsap === 'undefined') return;

  barba.init({
    prefetchIgnore: false,
    preventRunning: true,

    transitions: [{
      name: 'fade-slide',

      leave: function (data) {
        // Kill all ScrollTriggers to prevent memory leaks
        ScrollTrigger.getAll().forEach(function (st) { st.kill(); });

        return gsap.to(data.current.container, {
          opacity: 0,
          y: -30,
          duration: 0.4,
          ease: 'power2.in',
        });
      },

      enter: function (data) {
        gsap.set(data.next.container, { opacity: 0, y: 30 });
        return gsap.to(data.next.container, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
        });
      },

      after: function (data) {
        // Scroll to top
        window.scrollTo(0, 0);
        if (window.fluisLenis) window.fluisLenis.scrollTo(0, { immediate: true });

        // Refresh ScrollTrigger for new page
        ScrollTrigger.refresh();

        // Update active nav link
        var path = window.location.pathname;
        document.querySelectorAll('.nav-link').forEach(function (link) {
          var href = link.getAttribute('href');
          if (href === path || (href === '/' && path === '/index.html') || (href === '/' && path === '/')) {
            link.setAttribute('aria-current', 'page');
          } else {
            link.removeAttribute('aria-current');
          }
        });

        // Re-initialize page-specific animations
        // Each page script checks for its namespace and self-initializes
        if (window.fluisInitPage) window.fluisInitPage(data.next.namespace);

        // Track page view
        if (window.trackEvent) {
          trackEvent('Nav Link', { destination: path });
        }
      },
    }],
  });
})();
