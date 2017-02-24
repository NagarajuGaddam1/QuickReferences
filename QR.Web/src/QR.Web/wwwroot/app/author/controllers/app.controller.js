(function () {
    "use strict";

    angular.module('QR.Web.Author')
    .controller('AppController', ['$timeout', function ($timeout) {
        var self = this;
        self.timeout = $timeout;
    }]);
})();