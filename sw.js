// sw.js
const CACHE_NAME = 'daysync-cache-v2';  // Updated cache version
const URLsToCache = ['.', 'index.html', 'manifest.json'];

// Install: cache new assets and immediately skip waiting
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(c => c.addAll(URLsToCache))
      .then(() => self.skipWaiting())
  );
});

// Activate: remove old caches, take control
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// Fetch: serve from cache, fallback to network
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
