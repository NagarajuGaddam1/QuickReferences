(function () {
    "use strict";

    angular.module('QR.Web')
    .service("SharedService", ["$http", "$q", "$uibModal", "Notify", "$window", SharedService]);

    function SharedService($http, $q, $uibModal, notifyService, $window) {
        var self = this;
        self.uibModal = $uibModal;
        self.notify = notifyService;
        var _name = 'Harold E. Foley'
        self.profile = {
            'name': _name,
            'alias': 'hfoley',
        };
        var data = {
            message: 'Hi ' + _name + ', fetching your details ...',
            dismissable: false,
            info: false,
            success: false,
            failed: false,
            inProgress: true
        };        
        self.breadcrumbs = [];
        self.menuItems = [];       
        self.activeTopNav = 0;
        self.loadBreadCrumbs = function (data) {
            self.breadcrumbs = data;
        }        
        self.serviceApps = [
        {
            'id': 1,
            'appName': 'App 1',
            'appChar': 'A',
            'appUrl': '#'
        },
        {
            'id': 2,
            'appName': 'App',
            'appChar': 'A',
            'appUrl': '#'
        },
        {
            'id': 3,
            'appName': 'App',
            'appChar': 'A',
            'appUrl': '#'
        },
        {
            'id': 4,
            'appName': 'App',
            'appChar': 'A',
            'appUrl': '#'
        },
        {
            'id': 5,
            'appName': 'App',
            'appChar': 'A',
            'appUrl': '#'
        },
        {
            'id': 6,
            'appName': 'App',
            'appChar': 'A',
            'appUrl': '#'
        },
        {
            'id': 7,
            'appName': 'App',
            'appChar': 'A',
            'appUrl': '#'
        }
        ];

        self.sidebarCollapsed = false;        

        return self;
    }

})();