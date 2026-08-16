// service-worker.js
// SSC Planner is a single-page app: everything it needs to RUN (HTML/CSS/JS/icons)
// is a handful of static files. Your tasks, notes, and settings are stored locally
// in the browser's localStorage by the page itself — this service worker never
// sees or touches that data, and never makes any network request for it. All this
// worker does is let the app shell load offline once it's been visited once.

// Bump this version string every time you edit index.html (or any cached file)
// and push to GitHub Pages. Changing the name is what makes the browser fetch
// fresh files instead of serving the old cached ones.
const CACHE_NAME = 'ssc-planner-cache-v1';

const APP_SHELL = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-192.png',
  './icon-maskable-512.png',
  './apple-touch-icon.png',
  './favicon-32.png'
];

// Install: pre-cache the app shell.
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

// Activate: delete any old-versioned caches left over from a previous deploy.
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// Fetch: cache-first for same-origin GET requests, with a network fallback
// (and a cache update) so the app still works offline after the first visit.
self.addEventListener('fetch', (event) => {
  const req = event.request;

  // Only handle GET requests for our own origin — never intercept anything else
  // (e.g. don't try to cache the Google Fonts request or any other cross-origin call).
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) {
    return;
  }

  event.respondWith(
    caches.match(req).then((cached) => {
      const network = fetch(req)
        .then((res) => {
          if (res && res.status === 200) {
            const copy = res.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
          }
          return res;
        })
        .catch(() => cached); // offline and not cached: nothing more we can do

      // Serve cached instantly if we have it (fast + offline-safe), and let
      // the network request above quietly refresh the cache for next time.
      return cached || network;
    })
  );
});
