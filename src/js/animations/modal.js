/* ============================================
   Booking Modal — Open/Close/Focus Trap
   Triggered by any link pointing to #book-call
   ============================================ */

(function () {
  'use strict';

  var modal = document.getElementById('book-call');
  if (!modal) return;

  var backdrop = modal.querySelector('.booking-modal__backdrop');
  var closeBtn = modal.querySelector('.booking-modal__close');
  var content = modal.querySelector('.booking-modal__content');
  var lastFocusedElement;

  function openModal(e) {
    if (e) e.preventDefault();
    lastFocusedElement = document.activeElement;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    if (closeBtn) closeBtn.focus();
    if (window.trackEvent) {
      trackEvent('CTA Click', { label: 'Book a Free Demo', page: location.pathname });
    }
  }

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
    if (lastFocusedElement) lastFocusedElement.focus();
  }

  // All #book-call links trigger the modal
  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[href="#book-call"]');
    if (link) openModal(e);
  });

  // Close handlers
  if (backdrop) backdrop.addEventListener('click', closeModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });

  // Focus trap within modal
  if (content) {
    content.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab') return;

      var focusable = content.querySelectorAll(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );
      var first = focusable[0];
      var last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });
  }
})();
