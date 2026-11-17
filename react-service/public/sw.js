const CACHE_NAME = 'widt-v1';

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Ignora requisições que não sejam GET e chamadas para a API (/api/...),
  // para nunca mostrar dados velhos do cache
  const { pathname } = new URL(event.request.url);
  if (event.request.method !== 'GET' || pathname.startsWith('/api/')) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});