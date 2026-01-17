// service-worker.js

const CACHE_NAME = 'rock-paper-scissor-cache-v1';
const urlsToCache = [
  '/RockPaperScissor/',
  '/RockPaperScissor/index.html',
  '/RockPaperScissor/style.css',
  '/RockPaperScissor/script.js',
  '/RockPaperScissor/icons.png',
  '/RockPaperScissor/screenshots/1.jpeg',
  '/RockPaperScissor/screenshots/2.jpeg',
  '/RockPaperScissor/screenshots/3.jpeg',
  '/RockPaperScissor/screenshots/4.jpeg'
];


// Install event
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Caching files');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activate event
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
});

// Fetch event - offline support
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        // Fetch from network
        return fetch(event.request);
      })
  );
});
