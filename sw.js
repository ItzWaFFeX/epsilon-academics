const CACHE_NAME = 'epsilon-cache-v1';
const ASSETS = [
  './',
  './index.html',
  './icon.png',
  './manifest.json', // Make sure this filename matches your actual file!
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://cdn.jsdelivr.net/npm/chart.js'
];

// Install Event - caching the "starter pack"
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Epsilon Cache: Securing the bag (caching assets)');
      return cache.addAll(ASSETS);
    })
  );
});

// Fetch Event - serving from cache so it's snappy
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});