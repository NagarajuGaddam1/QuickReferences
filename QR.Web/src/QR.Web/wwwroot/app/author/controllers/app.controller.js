(function () {
    "use strict";

    angular.module('QR.Web.Author')
    .controller('AppController', ['$timeout', 'SharedService', function ($timeout, SharedService) {
        var self = this;
        self.timeout = $timeout;
        self.shared = SharedService;
    }]);
})();