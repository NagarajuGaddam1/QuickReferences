(function () {
    "use strict";  

    angular.module('QR.Web.Author')
    .controller('DashboardController', ['$timeout', function ($timeout) {
        var self = this;
        self.timeout = $timeout;        
    }]);
})();