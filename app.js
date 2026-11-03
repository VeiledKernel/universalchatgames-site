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
  targets.forEach(function (entry) { observer.observe(entry); });
})();

// Hero chat loop: real round lines, MATH then TRIVIA, looping.
// Without JS the static MATH round in the HTML stays. Under
// prefers-reduced-motion the static round stays too.
(function () {
  var box = document.getElementById('chatLoop');
  if (!box) {
    return;
  }
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }
  var rounds = Array.prototype.slice.call(box.querySelectorAll('.chat-round'));
  var i = 0;
  setInterval(function () {
    rounds[i].setAttribute('aria-hidden', 'true');
    i = (i + 1) % rounds.length;
    rounds[i].removeAttribute('aria-hidden');
  }, 3600);
})();

// Capture gallery: manual carousel, no autoplay. Without this script the
// slides stay stacked. Wraps from last slide back to the first.
(function () {
  var gal = document.getElementById('captureGallery');
  if (!gal) {
    return;
  }
  var slides = Array.prototype.slice.call(gal.querySelectorAll('.gal-slide'));
  if (!slides.length) {
    return;
  }
  var caption = document.getElementById('galCaption');
  var count = document.getElementById('galCount');
  var captions = ['Quizmaster', 'Quizmaster win', 'Math Flash', 'Word Unscramble', 'Typing Speed', 'Trivia'];
  var current = 0;
  gal.classList.add('is-gallery');
  function show(n) {
    slides[current].classList.remove('is-on');
    slides[current].setAttribute('aria-hidden', 'true');
    current = (n + slides.length) % slides.length;
    slides[current].classList.add('is-on');
    slides[current].removeAttribute('aria-hidden');
    if (caption) {
      caption.textContent = captions[current] || ('Slide ' + (current + 1));
    }
    if (count) {
      count.textContent = (current + 1) + ' / ' + slides.length;
    }
  }
  slides.forEach(function (s, k) {
    if (k === 0) {
      s.classList.add('is-on');
      s.removeAttribute('aria-hidden');
    } else {
      s.setAttribute('aria-hidden', 'true');
    }
  });
  var prev = gal.querySelector('.gal-prev');
  var next = gal.querySelector('.gal-next');
  if (prev) {
    prev.addEventListener('click', function () { show(current - 1); });
  }
  if (next) {
    next.addEventListener('click', function () { show(current + 1); });
  }
  gal.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      show(current - 1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      show(current + 1);
    }
  });
  var frame = gal.querySelector('.gal-frame');
  var startX = null;
  var startY = null;
  if (frame) {
    frame.addEventListener('pointerdown', function (event) {
      startX = event.clientX;
      startY = event.clientY;
    });
    frame.addEventListener('pointerup', function (event) {
      if (startX === null) {
        return;
      }
      var dx = event.clientX - startX;
      var dy = event.clientY - startY;
      startX = null;
      startY = null;
      if (Math.abs(dx) >= 40 && Math.abs(dx) > Math.abs(dy)) {
        show(current + (dx < 0 ? 1 : -1));
      }
    });
    frame.addEventListener('pointercancel', function () {
      startX = null;
      startY = null;
    });
  }
})();
