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

  Promise.all([ importsLoadedDeferred ])
    .then(function(imports) {
        var loadEl = document.getElementById('splash');
        var htmlEl = document.querySelector('html');

        // transitionend is not consistant (doesnt always trigger),
        // you can detect if its supported
        // https://gist.github.com/O-Zone/7230245
        // I used a simple setTimeout for now.

        window.setTimeout(function() {
            htmlEl.classList.remove('no-scroll');
            loadEl.remove();
        }, 200);

        // loadEl.addEventListener('transitionend', function() {
        //    htmlEl.classList.remove('no-scroll');
        //    loadEl.remove();
        // });

        document.body.classList.remove('loading');

        // App is visible and ready to load some data!
    });
}
