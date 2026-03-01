/* ============================================
   Mobile Sticky CTA Bar
   Shows when hero is out of view, hides at footer
   ============================================ */

(function () {
  'use strict';

  var stickyBar = document.querySelector('.mobile-sticky-cta');
  var hero = document.querySelector('.hero');
  var footer = document.querySelector('.site-footer');
  if (!stickyBar || !hero) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.target === hero) {
        stickyBar.classList.toggle('visible', !entry.isIntersecting);
      }
      if (entry.target === footer) {
        if (entry.isIntersecting) stickyBar.classList.remove('visible');
      }
    });
  }, { threshold: 0.1 });

  observer.observe(hero);
  if (footer) observer.observe(footer);
})();
