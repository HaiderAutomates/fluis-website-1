/* ============================================
   Dark/Light Theme Toggle
   Preference cascade: localStorage > system > dark (default)
   View Transitions API circular reveal (progressive enhancement)
   ============================================ */

(function () {
  'use strict';

  var toggle = document.querySelector('.theme-toggle');
  if (!toggle) return;

  function getPreferredTheme() {
    var stored = localStorage.getItem('theme');
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    toggle.setAttribute('aria-checked', theme === 'dark' ? 'true' : 'false');
    toggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  }

  function toggleTheme() {
    var current = document.documentElement.getAttribute('data-theme') || 'dark';
    var next = current === 'dark' ? 'light' : 'dark';

    // Progressive enhancement: View Transitions API circular reveal
    if (document.startViewTransition && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      var rect = toggle.getBoundingClientRect();
      var x = rect.left + rect.width / 2;
      var y = rect.top + rect.height / 2;
      var endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      var transition = document.startViewTransition(function () {
        setTheme(next);
      });

      transition.ready.then(function () {
        document.documentElement.animate(
          {
            clipPath: [
              'circle(0px at ' + x + 'px ' + y + 'px)',
              'circle(' + endRadius + 'px at ' + x + 'px ' + y + 'px)',
            ],
          },
          {
            duration: 500,
            easing: 'ease-out',
            pseudoElement: '::view-transition-new(root)',
          }
        );
        // Spring bounce on toggle button
        if (typeof gsap !== 'undefined') {
          gsap.fromTo(toggle,
            { scale: 0.6, rotation: next === 'dark' ? -90 : 90 },
            { scale: 1, rotation: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' }
          );
        }
      });
    } else {
      setTheme(next);
      // Spring bounce on toggle button
      if (typeof gsap !== 'undefined') {
        gsap.fromTo(toggle,
          { scale: 0.6, rotation: next === 'dark' ? -90 : 90 },
          { scale: 1, rotation: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' }
        );
      }
    }
  }

  // Click handler
  toggle.addEventListener('click', toggleTheme);

  // Keyboard: Space + Enter
  toggle.addEventListener('keydown', function (e) {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      toggleTheme();
    }
  });

  // Set initial state (FOUC script already set data-theme, this syncs the toggle)
  var currentTheme = document.documentElement.getAttribute('data-theme') || getPreferredTheme();
  setTheme(currentTheme);

  // System preference change listener (only if no manual preference)
  window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', function (e) {
    if (!localStorage.getItem('theme')) {
      setTheme(e.matches ? 'light' : 'dark');
    }
  });

  // Multi-tab sync
  window.addEventListener('storage', function (e) {
    if (e.key === 'theme' && e.newValue) {
      setTheme(e.newValue);
    }
  });
})();
