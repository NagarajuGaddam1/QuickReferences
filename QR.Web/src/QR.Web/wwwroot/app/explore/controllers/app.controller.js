(function () {
    "use strict";
    angular.module('QR.Web')
    .controller('AppController', ['$uibModal', 'Notify', 'SharedService', 'SamplePosts', function ($uibModal, notifyService, shared, SamplePosts) {
        var self = this;
        self.shared = shared;
        self.samplePostsService = SamplePosts;
        self.currentTitle = '';
        self.posts = {};
        self.onTabSelected = function (tabTitle) {
            if (self.currentTitle != tabTitle) {
                self.currentTitle = tabTitle;                
                self.samplePostsService.get(self.currentTitle)
                .then(function (data) {
                    console.log(tabTitle);
                    console.log(data);                    
                    self.posts[self.currentTitle] = data;
                }, function (data) {
                    console.log(data);
                })
            }
        }
        self.onTabDeselected = function (tabTitle) {
            self.posts[tabTitle] = [];
        }
        self.init = function () {
            self.currentTitle = 'all';
            self.samplePostsService.get(self.currentTitle)
            .then(function (data) {                
                self.posts[self.currentTitle] = data;
            }, function (data) {
                console.log(data);
            })
        }
        self.init();
    }]);
})();