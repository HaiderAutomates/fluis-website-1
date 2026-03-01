/* ============================================
   Navigation — Scroll behavior, magnetic links,
   direction-aware indicator, mobile overlay
   ============================================ */

(function () {
  'use strict';

  var header = document.querySelector('.site-header');
  var hamburger = document.querySelector('.nav-hamburger');
  var overlay = document.getElementById('mobile-nav-overlay');
  if (!header) return;

  // ── Scroll: Shrink + Hide/Show ──
  var lastScroll = 0;
  var SHRINK_THRESHOLD = 100;
  var HIDE_THRESHOLD = 200;

  window.addEventListener('scroll', function () {
    var currentScroll = window.pageYOffset;

    // Shrink
    if (currentScroll > SHRINK_THRESHOLD) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Hide/show
    if (currentScroll > HIDE_THRESHOLD) {
      if (currentScroll > lastScroll) {
        header.classList.add('hidden');
        header.classList.remove('visible');
      } else {
        header.classList.remove('hidden');
        header.classList.add('visible');
      }
    } else {
      header.classList.remove('hidden');
      header.classList.add('visible');
    }

    lastScroll = currentScroll;
  }, { passive: true });

  // ── Magnetic Nav Links (GSAP) ──
  if (typeof gsap !== 'undefined') {
    var mm = gsap.matchMedia();

    mm.add('(hover: hover) and (prefers-reduced-motion: no-preference)', function () {
      var navLinks = document.querySelectorAll('.nav-link');
      var indicator = document.querySelector('.nav-indicator');

      navLinks.forEach(function (link) {
        // Magnetic pull
        link.addEventListener('mousemove', function (e) {
          var rect = link.getBoundingClientRect();
          var x = e.clientX - rect.left - rect.width / 2;
          var y = e.clientY - rect.top - rect.height / 2;
          gsap.to(link, { x: x * 0.3, y: y * 0.3, duration: 0.3, ease: 'power2.out' });
        });

        link.addEventListener('mouseleave', function () {
          gsap.to(link, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.3)' });
        });

        // Direction-aware indicator
        if (indicator) {
          link.addEventListener('mouseenter', function () {
            var linkRect = link.getBoundingClientRect();
            var navRect = link.parentElement.getBoundingClientRect();
            gsap.to(indicator, {
              left: linkRect.left - navRect.left,
              width: linkRect.width,
              opacity: 1,
              duration: 0.3,
              ease: 'power2.out',
            });
          });
        }
      });

      // Hide indicator when leaving nav area
      var navLinksContainer = document.querySelector('.nav-links');
      if (navLinksContainer && indicator) {
        navLinksContainer.addEventListener('mouseleave', function () {
          gsap.to(indicator, { opacity: 0, duration: 0.2 });
        });
      }
    });
  }

  // ── Mobile Nav Overlay ──
  if (!hamburger || !overlay) return;

  var focusableEls = overlay.querySelectorAll('a, button');
  var firstFocusable = focusableEls[0];
  var lastFocusable = focusableEls[focusableEls.length - 1];

  function openMenu() {
    hamburger.setAttribute('aria-expanded', 'true');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    if (firstFocusable) firstFocusable.focus();
    if (window.trackEvent) trackEvent('Mobile Menu Open', { page: location.pathname });
  }

  function closeMenu() {
    hamburger.setAttribute('aria-expanded', 'false');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    hamburger.focus();
  }

  hamburger.addEventListener('click', function () {
    var isOpen = hamburger.getAttribute('aria-expanded') === 'true';
    isOpen ? closeMenu() : openMenu();
  });

  // Close on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('open')) {
      closeMenu();
    }
  });

  // Focus trap
  overlay.addEventListener('keydown', function (e) {
    if (e.key !== 'Tab') return;
    if (e.shiftKey) {
      if (document.activeElement === firstFocusable) {
        e.preventDefault();
        lastFocusable.focus();
      }
    } else {
      if (document.activeElement === lastFocusable) {
        e.preventDefault();
        firstFocusable.focus();
      }
    }
  });

  // Close when a link is clicked
  overlay.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });
})();
