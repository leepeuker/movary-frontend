const staticDevCoffee = 'movary';
const assets = ['/', '/index.php', '/js/style.js'];

const version = 1;

self.addEventListener('install', (installEvent) => {
  installEvent.waitUntil(
    caches.open(staticDevCoffee).then((cache) => {
      cache.addAll(assets);
    }),
  );
});

self.addEventListener('fetch', (fetchEvent) => {
  fetchEvent.respondWith(caches.match(fetchEvent.request).then((res) => res || fetch(fetchEvent.request)));
});
