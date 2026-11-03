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
  var rounds = [
    '<p><span class="mc-red">[MATH FLASH]</span> <span class="mc-white">Quick! What is </span><span class="mc-yellow">43 * 100</span><span class="mc-white">? Prize: </span><span class="mc-green">$350</span></p>' +
    '<p><span class="mc-gray">&lt;Player&gt; 4300</span></p>' +
    '<p><span class="mc-green">You won! Reward: $350</span></p>',
    '<p><span class="mc-red">[TRIVIA]</span> <span class="mc-white">What year did Minecraft 1.0 release? Prize: </span><span class="mc-green">$400</span></p>' +
    '<p><span class="mc-gray">&lt;Player&gt; 2011</span></p>' +
    '<p><span class="mc-green">You won! Reward: $400</span></p>'
  ];
  var i = 0;
  setInterval(function () {
    i = (i + 1) % rounds.length;
    box.innerHTML = rounds[i];
  }, 3600);
})();
