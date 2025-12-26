self.addEventListener('install', (e) => {
  console.log('[SiGanteng] Install Service Worker...');
  e.waitUntil(
    // 1. GANTI NAMA CACHE JADI v2 (Biar browser download ulang)
    caches.open('siganteng-store-v2').then((cache) => cache.addAll([
      './',
      './index.html',
      './siswa.html',
      './guru.html',
      './manifest.json', // Tambahin ini
      './logo.png',      // Tambahin ini
      './splash.png',    // WAJIB Tambahin ini biar splash screen kesimpen
    ]))
  );
});

self.addEventListener('fetch', (e) => {
  console.log('[SiGanteng] Fetching url: ' + e.request.url);
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});

// TAMBAHAN: Hapus Cache Lama (v1) biar memori HP gak penuh
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== 'siganteng-store-v2') {
          console.log('[SiGanteng] Hapus cache lama', key);
          return caches.delete(key);
        }
      }));
    })
  );
});
