// service-worker.js

const CACHE_NAME = 'rock-paper-scissor-cache-v1';

// Ye files cache karni hain (aapke project ke relative paths)
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

// Install event - caching files
self.addEventListener('install', (event) => {
  console.log('[ServiceWorker] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[ServiceWorker] Caching app files...');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activate event - old caches clean karna
self.addEventListener('activate', (event) => {
  console.log('[ServiceWorker] Activating...');
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[ServiceWorker] Removing old cache:', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// Fetch event - offline support
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Agar cache hit hua
        if (response) {
          return response;
        }
        // Network se fetch karo
        return fetch(event.request).catch(() => {
          // Agar page load (navigation) request hai aur network fail hua
          if (event.request.mode === 'navigate') {
            return caches.match('/RockPaperScissor/index.html');
          }
        });
      })
  );
});
