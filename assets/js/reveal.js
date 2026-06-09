/* ================================================================
 * Scroll-reveal animations
 * Any element marked [data-reveal] or [data-reveal-group] fades +
 * slides in once it scrolls into view. Uses IntersectionObserver
 * (supported in all modern browsers). No dependencies.
 *
 * Two safeguards so content is never stuck invisible:
 *   1. The .js-reveal-ready class on <html> gates the opacity:0
 *      hide-state. If this script fails, the class never appears
 *      and everything just shows. (See _sass/_animations.scss.)
 *   2. A 2-second watchdog reveals everything unconditionally —
 *      belt + suspenders in case the IntersectionObserver callback
 *      never fires (e.g. unexpected DOM shapes, iframes, etc.).
 * ================================================================ */
(function () {
  // Step 1: arm the hide-state. Done as early as possible so content
  // doesn't flash before being hidden.
  document.documentElement.classList.add('js-reveal-ready');

  function revealAll() {
    document.querySelectorAll('[data-reveal], [data-reveal-group]')
      .forEach(el => el.classList.add('is-visible'));
  }

  // Watchdog: whatever happens below, 2 seconds later everything is
  // visible. This is the single most important line in this file.
  setTimeout(revealAll, 2000);

  if (!('IntersectionObserver' in window)) {
    revealAll();
    return;
  }

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    revealAll();
    return;
  }

  // threshold: 0 — fire as soon as any part of the element is in view.
  // A positive threshold breaks for elements taller than the viewport
  // (e.g. the News page's long list: its intersection ratio never
  // reaches 12% so the callback never fires).
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0,
    rootMargin: '0px 0px -60px 0px'
  });

  document.querySelectorAll('[data-reveal], [data-reveal-group]')
    .forEach(el => observer.observe(el));
})();
