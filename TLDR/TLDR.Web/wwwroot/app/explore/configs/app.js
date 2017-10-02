(function () {
    "use strict";
    angular.module('QR.Web.templates', [])
     .run(["$templateCache", function ($templateCache) {
         for (var tmpl in window._exploreAssets) {
             $templateCache.put(tmpl, window._exploreAssets[tmpl]);
         }
         window._exploreAssets = null;
     }])

    angular.module('QR.Web.Constants', [])
        .value('$constants', {
            "_IS_POST_SPECIFIC": window["_IS_POST_SPECIFIC"],
            "_IS_CATEGORY_SPECIFIC": window["_IS_CATEGORY_SPECIFIC"],
            "_CATEGORY": window["_CATEGORY"]
        });

    angular.module('QR.Web', [
        'QR.Web.Extensions',
        'QR.Web.templates',
        'ngMaterial',
        'QR.Web.Constants'
    ]);

})();