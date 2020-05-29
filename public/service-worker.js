const CACHE_NAME = "PancasilaPWA- 1652122";
var urlsToCache = [
  "/",
  "/manifest.json",
  "/index.html",
  "/login.html",
  "/signup.html",
  "/css/gamestyle.css",
  "/css/startstyle.css",
  "/css/style.css",
  "/game.js",
  "/app.js",
  "/prograssBarScore.js",
  "/Progressbar.js",
  "/img/icon.png",
  "/img/Jumbo.svg",
  "/img/coins.png",
  "/img/piala.png",
  "/img/play buton.svg",
  "/img/icon-google.png",
  "/audio/nextStage.mp3",
  "/audio/win.mp3",
  "/audio/wrong.mp3",
  "/audio/Again.wav",
  "/audio/Click2.wav",
  "/audio/Click.wav"
  
];
 
self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});
//untuk fetch cache
self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches
      .match(event.request, { cacheName: CACHE_NAME })
      .then(function(response) {
        if (response) {
          // console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
          return response;
        }
 
        console.log(
          "ServiceWorker: Memuat aset dari server: ",
          event.request.url
        );
       
        return fetch(event.request);
      })
  );
});
  //untuk menghapus cache lama
  self.addEventListener("activate", function(event) {
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.map(function(cacheName) {
            if (cacheName != CACHE_NAME) {
              console.log("ServiceWorker: cache " + cacheName + " dihapus");
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });

  

  self.addEventListener('message', function (event) {
    if (event.data.action === 'skipWaiting') {
      self.skipWaiting();
    }
  });