/* ============================================
   Branded Preloader
   SVG stroke draw → waveform pulse → logo shrink
   → hero content stagger. Plays once per session.
   ============================================ */

(function () {
  'use strict';

  var preloader = document.querySelector('.preloader');
  if (!preloader) return;

  // Skip preloader on return visits within same session
  if (sessionStorage.getItem('preloaded')) {
    preloader.remove();
    return;
  }

  // Wait for GSAP
  if (typeof gsap === 'undefined') {
    preloader.remove();
    return;
  }

  var logoPaths = preloader.querySelectorAll('.preloader-logo text, .preloader-logo tspan');
  var waveform = preloader.querySelector('.preloader-waveform');

  var tl = gsap.timeline({
    onComplete: function () {
      sessionStorage.setItem('preloaded', 'true');
      preloader.remove();
    }
  });

  // 1. Logo stroke draw-in (0 - 1s)
  // For text elements, use opacity fade-in as stroke-dasharray doesn't work on <text>
  tl.fromTo(preloader.querySelector('.preloader-logo'), {
    opacity: 0,
    scale: 1.1
  }, {
    opacity: 1,
    scale: 1,
    duration: 1,
    ease: 'power2.inOut'
  });

  // 2. Waveform pulse beneath logo (1s - 1.5s)
  if (waveform) {
    tl.to(waveform, {
      scaleY: 1.5,
      opacity: 1,
      duration: 0.3,
      yoyo: true,
      repeat: 1,
      ease: 'sine.inOut'
    }, '-=0.2');
  }

  // 3. Logo shrinks and fades (1.5s - 2s)
  var navLogo = document.querySelector('.nav-logo');
  if (navLogo) {
    var navRect = navLogo.getBoundingClientRect();
    tl.to(preloader, {
      opacity: 0,
      scale: 0.8,
      duration: 0.5,
      ease: 'power3.inOut'
    });
  } else {
    tl.to(preloader, {
      opacity: 0,
      duration: 0.4,
      ease: 'power2.in'
    });
  }

})();
