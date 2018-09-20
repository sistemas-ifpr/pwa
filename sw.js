var CACHE_NAME = 'pwa-v1';
var urlsToCache = [
  '/',
  'index.html',
  'styles.css',
  'material.min.css',
  'app.js',
  'material.min.js',
  'images/icons/icon-72x72.png',
  'images/icons/icon-96x96.png',
  'images/icons/icon-128x128.png',
  'images/icons/icon-144x144.png',
  'images/icons/icon-152x152.png',
  'images/icons/icon-192x192.png',
  'images/icons/icon-384x384.png',
  'images/icons/icon-512x512.png',
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

//self.addEventListener('fetch', function(event) {
//  event.respondWith(
//    caches.match(event.request)
//      .then(function(response) {  
//        // Cache hit - return response
//        if (response) {
//          return response;
//        }
//
//        // IMPORTANT: Clone the request. A request is a stream and
//        // can only be consumed once. Since we are consuming this
//        // once by cache and once by the browser for fetch, we need
//        // to clone the response.
//        var fetchRequest = event.request.clone();
//
//        return fetch(fetchRequest).then(
//          function(response) {
//            // Check if we received a valid response
//            if(!response || response.status !== 200 || response.type !== 'basic') {
//              return response;
//            }
//
//            // IMPORTANT: Clone the response. A response is a stream
//            // and because we want the browser to consume the response
//            // as well as the cache consuming the response, we need
//            // to clone it so we have two streams.
//            var responseToCache = response.clone();
//
//            caches.open(CACHE_NAME)
//              .then(function(cache) {
//                cache.put(event.request, responseToCache);
//              });
//
//            return response;
//          }
//        );
//      })
//    );
//});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.match(event.request).then(function (response) {
        return response || fetch(event.request).then(function(response) {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});