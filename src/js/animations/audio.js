/* ============================================
   Audio-Reactive System — "The Alive Website"
   Ambient waveform strip + voice-reactive layers.
   Waits for voice widget audio node before
   activating reactive behavior.
   ============================================ */

(function () {
  'use strict';

  // ── SIMPLEX NOISE (minimal 2D implementation) ──
  // Generates smooth organic noise for the waveform baseline

  var GRAD2 = [[1,1],[-1,1],[1,-1],[-1,-1],[1,0],[-1,0],[0,1],[0,-1]];
  var perm = new Uint8Array(512);
  var seed = Math.random() * 65536;
  for (var i = 0; i < 256; i++) {
    var v = ((i + seed) * 16807 % 2147483647) & 255;
    perm[i] = perm[i + 256] = v;
  }

  function simplex2(x, y) {
    var F2 = 0.5 * (Math.sqrt(3) - 1);
    var G2 = (3 - Math.sqrt(3)) / 6;
    var s = (x + y) * F2;
    var i = Math.floor(x + s);
    var j = Math.floor(y + s);
    var t = (i + j) * G2;
    var X0 = i - t;
    var Y0 = j - t;
    var x0 = x - X0;
    var y0 = y - Y0;
    var i1 = x0 > y0 ? 1 : 0;
    var j1 = x0 > y0 ? 0 : 1;
    var x1 = x0 - i1 + G2;
    var y1 = y0 - j1 + G2;
    var x2 = x0 - 1 + 2 * G2;
    var y2 = y0 - 1 + 2 * G2;
    var ii = i & 255;
    var jj = j & 255;
    var n0 = 0, n1 = 0, n2 = 0;
    var t0 = 0.5 - x0 * x0 - y0 * y0;
    if (t0 >= 0) {
      var g0 = GRAD2[perm[ii + perm[jj]] % 8];
      t0 *= t0;
      n0 = t0 * t0 * (g0[0] * x0 + g0[1] * y0);
    }
    var t1 = 0.5 - x1 * x1 - y1 * y1;
    if (t1 >= 0) {
      var g1 = GRAD2[perm[ii + i1 + perm[jj + j1]] % 8];
      t1 *= t1;
      n1 = t1 * t1 * (g1[0] * x1 + g1[1] * y1);
    }
    var t2 = 0.5 - x2 * x2 - y2 * y2;
    if (t2 >= 0) {
      var g2 = GRAD2[perm[ii + 1 + perm[jj + 1]] % 8];
      t2 *= t2;
      n2 = t2 * t2 * (g2[0] * x2 + g2[1] * y2);
    }
    return 70 * (n0 + n1 + n2);
  }


  // ── AUDIO-REACTIVE CORE ──

  var audioLevel = 0;
  var analyser = null;
  var audioData = null;
  var audioRAF = 0;

  function initAudioReactive(audioNode) {
    try {
      var ctx = new (window.AudioContext || window.webkitAudioContext)();
      analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.8;
      audioNode.connect(analyser);
      audioData = new Uint8Array(analyser.frequencyBinCount);
      updateAudioLevel();
    } catch (e) {
      // Silently fail — audio-reactive is an enhancement
    }
  }

  function updateAudioLevel() {
    if (!analyser) return;
    analyser.getByteFrequencyData(audioData);
    var sum = 0;
    for (var i = 0; i < audioData.length; i++) {
      sum += audioData[i];
    }
    audioLevel = sum / (audioData.length * 255);
    document.documentElement.style.setProperty('--audio-level', audioLevel.toFixed(3));
    audioRAF = requestAnimationFrame(updateAudioLevel);
  }

  // Connection contract: voice widget provides audio node
  if (window.fluisAudioNode) {
    initAudioReactive(window.fluisAudioNode);
  }
  window.addEventListener('fluis:audio-ready', function (e) {
    if (e.detail && e.detail.audioNode) {
      initAudioReactive(e.detail.audioNode);
    }
  });


  // ── AMBIENT WAVEFORM STRIPS ──
  // Renders simplex noise sine wave on <canvas> section dividers

  var strips = document.querySelectorAll('.audio-waveform-strip');
  if (!strips.length || window.innerWidth < 768) return;

  var stripRAF = 0;
  var time = 0;
  var paused = false;

  function sizeStrips() {
    strips.forEach(function (canvas) {
      canvas.width = canvas.parentElement ? canvas.parentElement.offsetWidth : window.innerWidth;
      canvas.height = 4;
    });
  }

  function renderStrips() {
    if (paused) return;
    time += 0.01;

    var accentColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--color-accent').trim() || '#ff3b30';

    strips.forEach(function (canvas) {
      var ctx = canvas.getContext('2d');
      if (!ctx) return;
      var w = canvas.width;
      var h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // Amplitude responds to audio when active, else subtle baseline
      var amp = 1 + audioLevel * 3;

      ctx.beginPath();
      ctx.strokeStyle = accentColor;
      ctx.globalAlpha = 0.3 + audioLevel * 0.4;
      ctx.lineWidth = 1;

      for (var x = 0; x < w; x += 2) {
        var noise = simplex2(x * 0.005, time);
        var y = h / 2 + noise * amp;
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
    });

    stripRAF = requestAnimationFrame(renderStrips);
  }

  sizeStrips();
  stripRAF = requestAnimationFrame(renderStrips);

  // Pause when tab is hidden
  document.addEventListener('visibilitychange', function () {
    paused = document.hidden;
    if (!paused) stripRAF = requestAnimationFrame(renderStrips);
  });

  // Handle resize
  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(sizeStrips, 200);
  });


  // ── TEXT LUMINOSITY PULSE ──
  // Hero headline opacity micro-shifts tied to audio

  var heroHeadline = document.querySelector('.hero-headline');
  if (heroHeadline) {
    heroHeadline.style.opacity = 'calc(0.95 + var(--audio-level, 0) * 0.05)';
  }

  // Set baseline audio level
  document.documentElement.style.setProperty('--audio-level', '0');


  // ── CLEANUP ──

  window.addEventListener('beforeunload', function () {
    cancelAnimationFrame(stripRAF);
    cancelAnimationFrame(audioRAF);
  });

})();
