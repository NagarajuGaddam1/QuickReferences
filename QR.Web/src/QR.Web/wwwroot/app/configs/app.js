(function () {
    "use strict";
    angular.module('QR.Web.templates', [])
     .run(["$templateCache", function ($templateCache) {
         for (var tmpl in window._bodAssets) {
             $templateCache.put(tmpl, window._bodAssets[tmpl]);
         }
         window._bodAssets = null;
     }])

    angular.module('QR.Web', [
        'QR.Web.templates',
        'QR.Web.Notify',
        'ngAnimate',
        'ui.bootstrap',
        'ngSanitize'
    ]);

})();