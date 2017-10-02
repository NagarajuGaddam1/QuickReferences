(function () {
    "use strict";
    angular.module('QR.Web.Extensions.templates', [])
     .run(["$templateCache", function ($templateCache) {
         for (var tmpl in window._extensionsAssets) {
             $templateCache.put(tmpl, window._extensionsAssets[tmpl]);
         }
         //window._extensionsAssets = null;
     }])    

    angular.module('QR.Web.Extensions', [
        'QR.Web.Extensions.templates'        
    ]);

})();