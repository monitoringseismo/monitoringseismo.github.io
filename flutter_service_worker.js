'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"flutter_bootstrap.js": "78456db71d37e22b99c87dd3746fd1b6",
"version.json": "b890b34f14d36d23825e7200df2a626e",
"splash/img/light-2x.png": "339e32e023a739bd31508820a836bd33",
"splash/img/dark-4x.png": "04175f748755c018680d3ec378fff198",
"splash/img/light-3x.png": "f4fc712b825965d03e0fc7be004da636",
"splash/img/dark-3x.png": "f4fc712b825965d03e0fc7be004da636",
"splash/img/light-4x.png": "04175f748755c018680d3ec378fff198",
"splash/img/dark-2x.png": "339e32e023a739bd31508820a836bd33",
"splash/img/dark-1x.png": "5ff56f29ea91621a040eb9c894ba5f00",
"splash/img/light-1x.png": "5ff56f29ea91621a040eb9c894ba5f00",
"index.html": "1d655693070ac12d7ebd82cad681fbc7",
"/": "1d655693070ac12d7ebd82cad681fbc7",
"main.dart.js": "b8c19df3aab0079a0eca1c167b66d64f",
"flutter.js": "383e55f7f3cce5be08fcf1f3881f585c",
"favicon.png": "523a53abab4e6cd52ae50d4899d908b9",
"icons/Icon-192.png": "2a2c6b85e8fea053640497d1594884b0",
"icons/Icon-maskable-192.png": "2a2c6b85e8fea053640497d1594884b0",
"icons/Icon-maskable-512.png": "d8bcddf8dc1df051d6f6e8e8ec117640",
"icons/Icon-512.png": "d8bcddf8dc1df051d6f6e8e8ec117640",
"manifest.json": "52826c7b5332115acd16fea83b368629",
"assets/AssetManifest.json": "4ea2dff31e1869cfc51fbc815f073c72",
"assets/NOTICES": "cadaa568243598566f55a13ef373f20a",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/AssetManifest.bin.json": "a770207d8d91a5fad6ffa6f6b3ffad58",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "e986ebe42ef785b27164c36a9abc7818",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/AssetManifest.bin": "0e0514e298bc18155bb46de4bdd4fd91",
"assets/fonts/MaterialIcons-Regular.otf": "6005402bc17564fd8b45dc3b7282d838",
"assets/assets/images/icon.png": "8317eb9e2a58869649b506f454287481",
"assets/assets/images/launcher-icon.png": "15db23909464d37813880c44ec7fdd37",
"assets/assets/images/icon.svg": "1de1bbebd168d8edce3287183f82fb62",
"assets/assets/images/ic-loc-red.png": "3f542794a829744b703d2496bb5c4ee5",
"assets/assets/images/ic-loc-yellow.png": "c53beb2f89729f715d20355dafe491a7",
"assets/assets/images/ic-loc-green.png": "9585c7eb39c69aa2d81fd0d72880dbc9",
"assets/assets/images/splash-icon.png": "0d3983d1b4f6570cbf4d1cb29af0e257",
"assets/assets/data/sesudah_preventif_maintenance.json": "cbc4e3e3b19d7b233bd064a047f29a37",
"assets/assets/data/template_maintenance.json": "839e1958f9eab1224742cbe04763df23",
"assets/assets/data/preventif_maintenance.json": "291490708a78d883110983a518a9df0c",
"assets/assets/data/sebelum_preventif_maintenance.json": "6408aee1f6a2b268df244073c578fc3e",
"canvaskit/skwasm.js": "5d4f9263ec93efeb022bb14a3881d240",
"canvaskit/skwasm.js.symbols": "c3c05bd50bdf59da8626bbe446ce65a3",
"canvaskit/canvaskit.js.symbols": "74a84c23f5ada42fe063514c587968c6",
"canvaskit/skwasm.wasm": "4051bfc27ba29bf420d17aa0c3a98bce",
"canvaskit/chromium/canvaskit.js.symbols": "ee7e331f7f5bbf5ec937737542112372",
"canvaskit/chromium/canvaskit.js": "901bb9e28fac643b7da75ecfd3339f3f",
"canvaskit/chromium/canvaskit.wasm": "399e2344480862e2dfa26f12fa5891d7",
"canvaskit/canvaskit.js": "738255d00768497e86aa4ca510cce1e1",
"canvaskit/canvaskit.wasm": "9251bb81ae8464c4df3b072f84aa969b",
"canvaskit/skwasm.worker.js": "bfb704a6c714a75da9ef320991e88b03"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
