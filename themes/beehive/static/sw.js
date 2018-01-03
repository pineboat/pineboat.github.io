importScripts("js/cache-polyfill.js");
var CACHE_KEY='beehive_v21';
let files_to_preload=[
  '/',
  '/offline/',
  '/img/site_logo.svg',
  '/css/main.css'];
self.addEventListener('install', function(event) {
  event.waitUntil(preLoad());
});

var preLoad = function(){
  return caches.open(CACHE_KEY).then(cache => {
    return cache.addAll(files_to_preload);
  });
}

self.addEventListener('fetch', function(event) {
  const request=event.request;
  const url=new URL(request.url);
  if (request.method != "GET") return;
  let networkResponse=fromNetwork(request.clone());
  event.waitUntil(networkResponse);
  let response=fromCache(request).catch(()=>{
    return networkResponse;
  });
  event.respondWith(response);
});

var fromCache = function(request){
  let url=new URL(request.url);
  return caches.open(CACHE_KEY).then(function (cache) {
    return cache.match(request).then(function (matching) {
      if(!matching || matching.status == 404) {
        throw Error("No cache match for ",url.href);
      } else {
        return matching
      }
    })
  });
};

var offlineContent= function(request){
  return caches.open(CACHE_KEY).then(function (cache) {
        return cache.match('offline/')
  });
};

var fromNetwork = function(request){
  let url=new URL(request.url);
  return fetch(request).then(function (response) {
      const chain = Promise.resolve(response.clone());
      caches.open(CACHE_KEY).then(function (cache) {
        cache.put(request, response);
      });
      return chain;
    }).catch(err=>{
      return offlineContent(request);
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
