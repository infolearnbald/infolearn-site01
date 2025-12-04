const cacheName = "infolearn-cache-v1";
const assetsToCache = [
  "/",
  "/index.html",
  "/style.css",
  "/firebase.js",
  "/vagalume.js",
  "/userpanel.js",
  "/manifest.json"
];

self.addEventListener("install", e=>{
  e.waitUntil(
    caches.open(cacheName).then(cache=>{
      return cache.addAll(assetsToCache);
    })
  );
});

self.addEventListener("fetch", e=>{
  e.respondWith(
    caches.match(e.request).then(response=>{
      return response || fetch(e.request);
    })
  );
});