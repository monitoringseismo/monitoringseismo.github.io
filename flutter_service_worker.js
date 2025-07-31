'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"flutter_bootstrap.js": "e222b3e3bba6f0a99e7f41e49513e8f1",
"version.json": "b890b34f14d36d23825e7200df2a626e",
"splash/img/light-2x.png": "339e32e023a739bd31508820a836bd33",
"splash/img/dark-4x.png": "04175f748755c018680d3ec378fff198",
"splash/img/light-3x.png": "f4fc712b825965d03e0fc7be004da636",
"splash/img/dark-3x.png": "f4fc712b825965d03e0fc7be004da636",
"splash/img/light-4x.png": "04175f748755c018680d3ec378fff198",
"splash/img/dark-2x.png": "339e32e023a739bd31508820a836bd33",
"splash/img/dark-1x.png": "5ff56f29ea91621a040eb9c894ba5f00",
"splash/img/light-1x.png": "5ff56f29ea91621a040eb9c894ba5f00",
"index.html": "d81183fd6cea670d5a29b5d404742cfe",
"/": "d81183fd6cea670d5a29b5d404742cfe",
"main.dart.js": "d3867c1980bbfe6dd6bdb9a2f1fb0239",
"flutter.js": "f393d3c16b631f36852323de8e583132",
"favicon.png": "523a53abab4e6cd52ae50d4899d908b9",
"icons/Icon-192.png": "2a2c6b85e8fea053640497d1594884b0",
"icons/Icon-maskable-192.png": "2a2c6b85e8fea053640497d1594884b0",
"icons/Icon-maskable-512.png": "d8bcddf8dc1df051d6f6e8e8ec117640",
"icons/Icon-512.png": "d8bcddf8dc1df051d6f6e8e8ec117640",
"manifest.json": "52826c7b5332115acd16fea83b368629",
"assets/AssetManifest.json": "e8381a59e7307acf19b72af5f9b94995",
"assets/NOTICES": "44dc3b79349b9630380afff3561f9b78",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/AssetManifest.bin.json": "e2a14138b4a266f8bcf86063a66d1e32",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "e986ebe42ef785b27164c36a9abc7818",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/AssetManifest.bin": "480d22b82fcdc6759c27c8cf460a0f49",
"assets/fonts/MaterialIcons-Regular.otf": "dd00678a137d2c16affee1332d6d4404",
"assets/assets/images/icon.png": "8317eb9e2a58869649b506f454287481",
"assets/assets/images/ic-no-data.jpg": "ebeeec3d94f829c268c64d82757f83c4",
"assets/assets/images/launcher-icon.png": "15db23909464d37813880c44ec7fdd37",
"assets/assets/images/icon.svg": "1de1bbebd168d8edce3287183f82fb62",
"assets/assets/images/ic-loc-grey.png": "ddb71f1819b4a2ab1eaccdeaa95023ac",
"assets/assets/images/ic-loc-red.png": "e5b94526f52aa1c6045ef9b6af0687c0",
"assets/assets/images/ic-loc.svg": "c7f5c4a8bf0d8f3f6aee0fbe94941a37",
"assets/assets/images/ic-loc-yellow.png": "5b6b8edf680dde84d9763e2c5f3f72e4",
"assets/assets/images/ic-loc-green.png": "53f5a5ae16c7fd3372a2fc211e246808",
"assets/assets/images/splash-icon.png": "0d3983d1b4f6570cbf4d1cb29af0e257",
"assets/assets/data/sesudah_preventif_maintenance.json": "cbc4e3e3b19d7b233bd064a047f29a37",
"assets/assets/data/template_maintenance.json": "839e1958f9eab1224742cbe04763df23",
"assets/assets/data/preventif_maintenance.json": "291490708a78d883110983a518a9df0c",
"assets/assets/data/sebelum_preventif_maintenance.json": "6408aee1f6a2b268df244073c578fc3e",
"canvaskit/skwasm.js": "694fda5704053957c2594de355805228",
"canvaskit/skwasm.js.symbols": "262f4827a1317abb59d71d6c587a93e2",
"canvaskit/canvaskit.js.symbols": "48c83a2ce573d9692e8d970e288d75f7",
"canvaskit/skwasm.wasm": "9f0c0c02b82a910d12ce0543ec130e60",
"canvaskit/chromium/canvaskit.js.symbols": "a012ed99ccba193cf96bb2643003f6fc",
"canvaskit/chromium/canvaskit.js": "671c6b4f8fcc199dcc551c7bb125f239",
"canvaskit/chromium/canvaskit.wasm": "b1ac05b29c127d86df4bcfbf50dd902a",
"canvaskit/canvaskit.js": "66177750aff65a66cb07bb44b8c6422b",
"canvaskit/canvaskit.wasm": "1f237a213d7370cf95f443d896176460",
"canvaskit/skwasm.worker.js": "89990e8c92bcb123999aa81f7e203b1c"};
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
