// 4. Dynamically load web components polyfills based on feature detection.
var webComponentsSupported = ('registerElement' in document
    && 'import' in document.createElement('link')
    && 'content' in document.createElement('template'));

if (!webComponentsSupported) {
  var script = document.createElement('script');
  script.async = true;
  script.src = '/bower_components/webcomponentsjs/webcomponents-lite.min.js';
  script.onload = finishLazyLoading;
  document.head.appendChild(script);
} else {
  finishLazyLoading();
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/service-worker.js');
  });
}

function finishLazyLoading() {
  // 5. Wait on importsLoadedDeferred to resolve. When it does,
  // the import has loaded.
  importsLoadedDeferred.promise.then(function(htmlImport) {

    // 6. Fade splash screen, then remove.
    var loadEl = document.getElementById('splash');
    //loadEl.addEventListener('transitionend', loadEl.remove);
    loadEl.remove();

    document.body.classList.remove('loading');

    // App is visible and ready to load some data!
  });
}
