const CACHE_NAME = 'daysync-cache-v1';
const URLsToCache = ['.', 'index.html', 'manifest.json'];

self.addEventListener('install', e => e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(URLsToCache))));
self.addEventListener('fetch', e => e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request))));
