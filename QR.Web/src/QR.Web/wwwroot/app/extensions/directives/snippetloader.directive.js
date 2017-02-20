(function () {
    "use strict";
    angular.module('QR.Web.Extensions')
    .directive('snippetLoader', ['$document', '$rootScope', '$timeout', function ($document, $rootScope, $timeout) {
        return {
            restrict: 'AE',
            templateUrl: 'templates/extensions/snippetloader.directive.tmpl.html'
        }
    }])
})()