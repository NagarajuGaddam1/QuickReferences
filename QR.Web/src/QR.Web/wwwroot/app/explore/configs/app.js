(function () {
    "use strict";
    angular.module('QR.Web.templates', [])
     .run(["$templateCache", function ($templateCache) {
         for (var tmpl in window._exploreAssets) {
             $templateCache.put(tmpl, window._exploreAssets[tmpl]);
         }         
         window._exploreAssets = null;
     }])

    angular.module('QR.Web', [
        'QR.Web.Extensions',
        'QR.Web.templates',
        'QR.Web.Notify',
        'ngAnimate',
        'ui.bootstrap',
        'ngSanitize',
        'ngMaterial'
    ]);

})();