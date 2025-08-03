
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open('multiplicaciones-v1').then(function(cache) {
      return cache.addAll([
        './',
        './index.html',
        './style.css',
        './script.js',
        './data.js',
        './assets/correcto.mp3',
        './assets/error.mp3',
        './assets/icon-192.png',
        './assets/icon-512.png'
      ]);
    })
  );
});

self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
