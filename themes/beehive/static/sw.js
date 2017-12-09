importScripts("js/cache-polyfill.js");
var CACHE_KEY='beehive_v12';

//This is the service worker with the combined offline experience (Offline page + Offline copy of pages)

//Install stage sets up the offline page in the cahche and opens a new cache
self.addEventListener('install', function(event) {
  event.waitUntil(preLoad());
});

var preLoad = function(){
  return caches.open(CACHE_KEY).then(function(cache) {
    return cache.addAll(['/offline/', '/index.html']);
  });
}

self.addEventListener('fetch', function(event) {
  event.respondWith(checkResponse(event.request).catch(function() {
    return returnFromCache(event.request)}
  ));
  event.waitUntil(addToCache(event.request));
});

var checkResponse = function(request){
  return new Promise(function(fulfill, reject) {
    fetch(request).then(function(response){
      if(response.status !== 404) {
        fulfill(response)
      } else {
        reject()
      }
    }, reject)
  });
};

var addToCache = function(request){
  return caches.open(CACHE_KEY).then(function (cache) {
    return fetch(request).then(function (response) {
      return cache.put(request, response);
    });
  });
};

var returnFromCache = function(request){
  return caches.open(CACHE_KEY).then(function (cache) {
    return cache.match(request).then(function (matching) {
     if(!matching || matching.status == 404) {
       return cache.match('offline/')
     } else {
       return matching
     }
    });
  });
};

self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (CACHE_KEY!==cacheName) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
