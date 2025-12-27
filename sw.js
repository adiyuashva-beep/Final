self.addEventListener('install', (e) => {
  console.log('[SiGanteng] Install Service Worker...');
  e.waitUntil(
    caches.open('siganteng-store-v3').then((cache) => cache.addAll([
      './',
      './index.html',
      './siswa.html',
      './guru.html',
      './manifest.json',
      './logo.png',    // <-- NAMA BARU
      './splash_baru.png',  // <-- NAMA BARU
    ]))
  );
});

// ... kode bawahnya biarin aja sama kayak sebelumnya
// Cuma pastiin di bagian "activate" (hapus cache) kodenya ngapus selain 'siganteng-store-v3'
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== 'siganteng-store-v3') {
           return caches.delete(key);
        }
      }));
    })
  );
});
// ... sisa kode fetch biarin aja
