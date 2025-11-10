const CACHE_NAME = 'infolearn-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/manifest.json',
  // Imagens que você tem no repositório (ajuste se precisar)
  '/curso4.jpg',
  '/curso5.jpg',
  '/curso8.jpg',
  '/curso9.jpg',
  '/curso10.jpg',
  '/revista1.jpg',
  '/revista2.jpg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request).catch(()=>caches.match('/index.html'));
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keyList => Promise.all(
      keyList.map(key => { if (key !== CACHE_NAME) return caches.delete(key); })
    ))
  );
  self.clients.claim();
});
