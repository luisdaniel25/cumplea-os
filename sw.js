const CACHE_NAME = 'cumpleapp-v1';
const ASSETS = [
    'index.html',
    'manifest.json',
    'img/icon-192.png',
    'img/icon-512.png',
    'img/foto1.jpg',
    'img/foto2.jpg',
    'img/foto3.jpg',
    'audio/cumpleanosfeliz.mp3'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
    );
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(keys.map((k) => (k !== CACHE_NAME ? caches.delete(k) : null)))
        )
    );
    self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    const req = event.request;
    event.respondWith(
        caches.match(req).then((cached) => cached || fetch(req))
    );
});
