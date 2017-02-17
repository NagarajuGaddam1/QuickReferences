(function () {
    "use strict";
    angular.module('QR.Web.Author.templates', [])
     .run(["$templateCache", function ($templateCache) {
         for (var tmpl in window._authorAssets) {
             $templateCache.put(tmpl, window._authorAssets[tmpl]);
         }
         window._authorAssets = null;
     }])    

    angular.module('QR.Web.Author', [
        'QR.Web.Extensions',
        'QR.Web.Author.templates',
        'QR.Web.Author.Notify',        
        'ngAnimate',
        'ngMaterial',
        'ui.bootstrap',
        'ngSanitize'
    ]);

})();