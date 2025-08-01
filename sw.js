const CACHE_NAME = 'eternal-immortal-v1.0.3';

// List all the files your game needs to run offline.
const urlsToCache = [
  '/',
  '/EternalImmortal/',
  '/EternalImmortal/index.html',
  '/EternalImmortal/game.html',
  '/EternalImmortal/style.css',
  '/EternalImmortal/auth_final.js',
  '/EternalImmortal/database_final.js',
  '/EternalImmortal/game_final.js',
  '/EternalImmortal/icons/icon-192x192.png',
  '/EternalImmortal/icons/icon-512x512.png',
  // You might need to add paths to other assets if you have them, like background images or sound files.
  'https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js',
  'https://www.gstatic.com/firebasejs/8.10.1/firebase-auth.js',
  'https://www.gstatic.com/firebasejs/8.10.1/firebase-firestore.js'
];

// Install the service worker and cache the files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Serve cached content when offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
