// Progressive enhancement only: the page is complete without this file.
// 1. Scroll reveal for cards and sections (skipped under reduced-motion).
// 2. Separation shadow on the sticky nav once content scrolls beneath it.
(function () {
  var nav = document.querySelector('nav');
  if (nav) {
    addEventListener('scroll', function () {
      nav.classList.toggle('scrolled', scrollY > 24);
    }, { passive: true });
  }
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }
  var targets = document.querySelectorAll('section .grid > div, section details, section pre');
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
