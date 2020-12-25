//-----------------------------------------------
// バージョン
const CACHE_VERSION = '2.0.0';

// キャッシュの名前（このまま）
const CACHE_NAME = `${registration.scope}!${CACHE_VERSION}`;

// キャッシュするファイルのリスト
const urlsToCache = [
  'wnako3/wnako3.js',
  'wnako3/plugin_turtle.js',
  'wnako3/plugin_datetime.js',
  'wnako3/LICENSE',
  '.',
  'wadokei_data.json',
  'common.css',
  'Plugin_TraditionalColor.js',
  'Plugin_Wadokei.js',
  'KouzanMouhituFont_wadokei_WSF.woff',
  'KouzanMouhituFont_wadokei_WSF.woff2',
  'hari.png',
  'hari_s.png',
  'icon-192.png',
  'icon-512.png'
];
//-----------------------------------------------

// 以下は呪文
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return cacheNames.filter((cacheName) => {
        return cacheName.startsWith(`${registration.scope}!`) &&
               cacheName !== CACHE_NAME;
      });
    }).then((cachesToDelete) => {
      return Promise.all(cachesToDelete.map((cacheName) => {
        return caches.delete(cacheName);
      }));
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
    .then((response) => {
      if (response) {
        return response;
      }
      let fetchRequest = event.request.clone();
      return fetch(fetchRequest)
        .then((response) => {
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          let responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });
          return response;
        });
    })
  );
});
