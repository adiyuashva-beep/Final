self.addEventListener('install', (e) => {
  console.log('[SiGanteng] Install Service Worker...');
  e.waitUntil(
    caches.open('siganteng-store').then((cache) => cache.addAll([
      './',
      './index.html',
      './siswa.html',
      './guru.html',
    ]))
  );
});

self.addEventListener('fetch', (e) => {
  console.log('[SiGanteng] Fetching url: ' + e.request.url);
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});
