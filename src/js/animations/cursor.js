/* ============================================
   Custom Cursor — Dot + Ring
   Desktop only (hover: hover media query in CSS)
   ============================================ */

(function () {
  'use strict';

  if (typeof gsap === 'undefined') return;

  // Only init on hover-capable devices
  var mql = window.matchMedia('(hover: hover)');
  if (!mql.matches) return;

  // Create cursor elements
  var dot = document.createElement('div');
  dot.className = 'cursor-dot';
  dot.setAttribute('aria-hidden', 'true');

  var ring = document.createElement('div');
  ring.className = 'cursor-ring';
  ring.setAttribute('aria-hidden', 'true');

  document.body.appendChild(dot);
  document.body.appendChild(ring);
  document.body.classList.add('cursor-ready');

  // GSAP quickTo for 60fps tracking
  var xDot = gsap.quickTo(dot, 'x', { duration: 0 });
  var yDot = gsap.quickTo(dot, 'y', { duration: 0 });
  var xRing = gsap.quickTo(ring, 'x', { duration: 0.15, ease: 'power2.out' });
  var yRing = gsap.quickTo(ring, 'y', { duration: 0.15, ease: 'power2.out' });

  window.addEventListener('pointermove', function (e) {
    xDot(e.clientX);
    yDot(e.clientY);
    xRing(e.clientX);
    yRing(e.clientY);
  });

  // Ring scales on interactive elements
  var interactiveSelector = 'a, button, [role="button"], .card, input, textarea, select, .faq-question';

  document.addEventListener('mouseenter', function (e) {
    if (e.target.closest(interactiveSelector)) {
      gsap.to(ring, { scale: 2.5, borderColor: 'var(--color-accent)', duration: 0.3 });
    }
  }, true);

  document.addEventListener('mouseleave', function (e) {
    if (e.target.closest(interactiveSelector)) {
      gsap.to(ring, { scale: 1, borderColor: 'var(--color-text)', duration: 0.3, ease: 'elastic.out(1, 0.3)' });
    }
  }, true);

  // Hide cursor when leaving window
  document.addEventListener('mouseleave', function () {
    gsap.to([dot, ring], { opacity: 0, duration: 0.2 });
  });
  document.addEventListener('mouseenter', function () {
    gsap.to([dot, ring], { opacity: 1, duration: 0.2 });
  });
})();
