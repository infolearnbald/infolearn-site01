const CACHE_NAME = 'infolearn-cache-v1';
const urlsToCache = [
  './index.html',
  './cursos.html',
  './vagalume.html',
  './perfil.html',
  './style.css',
  './courses.js',
  './utils.js',
  './icon-192.png',
  './icon-512.png',
  './hero-cv.jpg',
  './facebook.png',
  './instagram.png',
  './youtube.png',
  './linkedin.png',
  './whatsapp.png'
];

// Instalando service worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Ativando service worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      )
    )
  );
});

// Capturando requests
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});