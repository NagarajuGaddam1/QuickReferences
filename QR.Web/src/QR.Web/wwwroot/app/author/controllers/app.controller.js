(function () {
    "use strict";

    angular.module('QR.Web.Author')
    .controller('AppController', ['$timeout', 'SharedService','$state', function ($timeout, SharedService, $state) {
        var self = this;
        self.timeout = $timeout;
        self.state = $state;
        self.shared = SharedService;
        self.shared.actionClick = function(actionId){
            console.log(actionId);
            if(typeof self.shared[actionId] !== 'undefined' && typeof self.shared[actionId] === 'function')
            {
                self.shared[actionId]();
            }
        }
        self.shared.goToDashboard = function()
        {
            self.state.go('dashboard');
        }
    }]);
})();