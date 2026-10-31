// Progressive enhancement only: the page is complete without this file.
// Scroll reveal for feature cards and FAQ entries (skipped under
// reduced-motion). Sticky header needs no shadow: the glass blur plus the
// bottom hairline already separate it.
(function () {
  if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) {
    addEventListener('load', function () {
      navigator.serviceWorker.register('sw.js').catch(function () {});
    });
  }  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }
  var targets = document.querySelectorAll('.feature-grid > article, details');
  if (!('IntersectionObserver' in window) || !targets.length) {
    return;
  }
  targets.forEach(function (el) { el.classList.add('reveal'); });
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  targets.forEach(function (el) { observer.observe(el); });
})();
