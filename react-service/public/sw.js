// Troque a versão sempre que mudar a lógica deste arquivo: o activate apaga os caches antigos
const CACHE_NAME = 'widt-v2';

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

// Estratégia network-first: sempre tenta a rede; o cache só é usado quando está offline
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Só GET do próprio site. A API (/api/...) nunca passa pelo cache,
  // para nunca mostrar dados velhos
  if (
    request.method !== 'GET' ||
    url.origin !== self.location.origin ||
    url.pathname.startsWith('/api/')
  ) {
    return;
  }

  event.respondWith(
    fetch(request)
      .then((response) => {
        // Só guarda respostas completas do próprio site. Redirecionamento para o
        // login do Cloudflare Access e páginas de erro não entram no cache
        if (response.ok && response.type === 'basic') {
          // Toda rota do app devolve o mesmo index.html, então navegações
          // ficam guardadas numa chave só
          const key = request.mode === 'navigate' ? '/index.html' : request;
          const clone = response.clone();
          event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.put(key, clone)));
        }
        return response;
      })
      .catch(async () => {
        const cached = await caches.match(request);
        if (cached) return cached;

        // Offline em uma rota do react-router (ex.: /activities): usa o index.html guardado
        if (request.mode === 'navigate') {
          const shell = await caches.match('/index.html');
          if (shell) return shell;
        }

        return Response.error();
      })
  );
});
