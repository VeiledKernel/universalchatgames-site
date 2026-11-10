// Offline cache for the static storefront. Same-origin GET only; nothing
// sensitive passes through here (no checkout, no accounts on this page).
var CACHE = 'ucg-site-v6';
var ASSETS = [
  './',
  'index.html',
  'docs.html',
  'styles.css',
  'app.js',
  'changelog.html',
  'font.ttf',
  'manifest.webmanifest',
  'favicon-32.png',
  'favicon-16.png',
  'icon-192.png',
  'icon-512.png'
];
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE).then(function (cache) { return cache.addAll(ASSETS); })
      .then(function () { return self.skipWaiting(); })
  );
});
self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k !== CACHE; })
        .map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});
async function putInCache(request, response) {
  try {
    const cache = await caches.open(CACHE);
    await cache.put(request, response);
  } catch (e) {
    // A failed cache write is ignored on purpose; the network response still goes out.
  }
}
async function networkFirst(event) {
  try {
    const response = await fetch(event.request);
    if (response.ok) {
      event.waitUntil(putInCache(event.request, response.clone()));
    }
    return response;
  } catch {
    // Offline or the network failed: serve the cached copy instead.
    return caches.match(event.request);
  }
}
self.addEventListener('fetch', function (event) {
  if (event.request.method !== 'GET') {
    return;
  }
  var url = new URL(event.request.url);
  var isPage = event.request.mode === 'navigate'
    || /\.(html|css|js)$/.test(url.pathname);
  if (isPage) {
    event.respondWith(networkFirst(event));
    return;
  }
  event.respondWith(
    caches.match(event.request).then(function (hit) {
      return hit || fetch(event.request);
    })
  );
});
