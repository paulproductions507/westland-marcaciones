// Service Worker — Westland Marcaciones
// Sube este archivo a la RAÍZ del repositorio, junto a index.html y manifest.json
const CACHE = 'westland-v1';
const URLS = ['./', './index.html', './manifest.json'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(URLS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  // Solo interceptamos navegación (carga de página). Todo lo demás (Firebase, fuentes, etc.) va directo a la red.
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request).catch(() => caches.match('./index.html'))
    );
  }
});
