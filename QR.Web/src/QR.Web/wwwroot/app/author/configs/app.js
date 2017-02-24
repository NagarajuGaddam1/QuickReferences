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
        'ui.router',
        'ngSanitize',
        'ngDraggable'
    ])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state
            ({
                name: 'dashboard',
                url: '/dashboard',
                templateUrl: 'templates/author/author.dashboard.view.html',
                controller: 'DashboardController',
                controllerAs: 'authoringDashboard'
            })
            .state
            ({
                name: 'post',
                url: '/post',
                templateUrl: 'templates/author/author.post.view.html',
                controller: 'PostController',
                controllerAs: 'authoringPost'
            });
        $urlRouterProvider.otherwise('/post')
    }])
    .run();

})();