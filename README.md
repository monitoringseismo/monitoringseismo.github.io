# GeoMaint Admin
## Change on flutter_bootstrap.js:

```javascript
_flutter.loader.load({
  entrypointUrl: "/main.dart.js",
  serviceWorker: {
    serviceWorkerVersion: "425911141",
    serviceWorkerUrl: "/flutter_service_worker.js?v=",
  },
  onEntrypointLoaded: function(engineInitializer) {
    engineInitializer.initializeEngine().then(function(appRunner) {
      appRunner.runApp();
    });
  }
});
```