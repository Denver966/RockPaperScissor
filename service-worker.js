const CACHE_NAME = "rps-cache-v1";
const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/style.css",
  "/script.js"
];

// Install
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

// Fetch
self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
