(function () {
    "use strict";
    angular.module('QR.Web')
    .controller('AppController', ['$uibModal', 'Notify', 'SharedService', function ($uibModal, notifyService, shared) {
    var self = this;
    self.shared = shared;

    self.notifyMsg = function () {
        var data = {
            message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore',
            dismissable: false,
            timer: 5000,
            info: false,
            success: false,
            failed: false,
            inProgress: true
        };
        notifyService.notify(data);
    }

}]);
})();