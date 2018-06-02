/* An Example to pass the cross domain parameter to Iframe src
 *
 * Best go with Google Tag Manager:
 * Simple configure a custom HTML Tag and dom ready trigger
 *
 * IF you go with hard coded way, remember need to listening dom ready HTML event
 *
 * function getgalinker
 * return string
 *
 * function whenAvailableGa
 * parameter callback type function
 * parameter trys type number integer
 * return void
 */

var getgaLinker = function () {
  var linker = "";
  if (typeof window.ga !== "undefined" && typeof window.ga === "function" && window.ga.loaded) {
    for (var iii=0;iii<ga.getAll().length;iii++) {
      ga((function (tr) {
        if (tr.get("trackingId") === "UA-XXXXX-YY") { // with GTM can configure a variable with the ga property
          linker = tr.get("linkerParam");
        }
      })(ga.getAll()[iii]));
    }
  }
  return linker;
},
whenAvailableGa = function(callback, trys) {
  var interval = 100, // ms
      dec = trys || 5
  window.setTimeout(function() {
    if (window.ga && window.ga.loaded) {
      callback();
    } else {
      if (dec > 0) {
        window.setTimeout(arguments.callee, interval);
        dec--;
      }
    }
  }, interval);
};

// Safe mode when object window.ga exist
whenAvailableGa(function () {
  var linker = getgaLinker(),
      crossdomains = ['dominiob.com.br'], // with GTM can configure a variable with the array of domains
      iframes = document.getElementsByTagName('iframe');
  for (var i = 0; i < iframes.length; i++) {
    for (var j = 0; crossdomains.length; j++) {
      if (iframes[i].src.indexOf(crossdomains[j]) > -1) {
        iframes[i].src = iframes[i].src+(iframes[i].src.indexOf("?") > -1 ? "&" : "?")+linker;
      }
    }
  }
},20);
