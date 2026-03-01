/* ============================================
   Scroll Reveal — CSS Fallback
   Used when GSAP is not available.
   GSAP ScrollTrigger.batch in main.js supersedes this.
   ============================================ */

(function () {
  'use strict';

  // If GSAP + ScrollTrigger is loaded, main.js handles reveals via batch.
  // This script provides a no-GSAP fallback using IntersectionObserver.
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') return;

  var reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  });

  reveals.forEach(function (el) { observer.observe(el); });

  // Reveal groups
  var groups = document.querySelectorAll('.reveal-group');
  var groupObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.reveal').forEach(function (child) {
          child.classList.add('revealed');
        });
        groupObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  groups.forEach(function (group) { groupObserver.observe(group); });
})();
