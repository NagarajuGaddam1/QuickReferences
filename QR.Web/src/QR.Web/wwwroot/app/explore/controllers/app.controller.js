(function () {
    "use strict";
    angular.module('QR.Web')
    .controller('AppController', ['$uibModal', 'Notify', 'SharedService', 'SamplePosts', '$timeout', function ($uibModal, notifyService, shared, SamplePosts, $timeout) {
        var self = this;
        self.shared = shared;
        self.timeout = $timeout;
        self.headerPinned = false;
        self.samplePostsService = SamplePosts;
        self.currentTitle = '';
        self.posts = {};
        self.selectTab = function (tabTitle) {
            switch (tabTitle) {
                case 'all': self.selectedTabIndex = 0; break;
                case 'javascript': self.selectedTabIndex = 1; break;
                case 'markup': self.selectedTabIndex = 2; break;
                case 'css': self.selectedTabIndex = 3; break;
                default: self.selectedTabIndex = 4; break;
            }
        }
        self.selectedTabIndex = 0;
        self.onTabSelected = function (tabTitle) {
            console.log(self.selectedTabIndex);
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
        var _viewTop = null;
        var _viewBottom = null;
        var _viewHeader = null;
        self.init = function () {

            self.currentTitle = 'all';
            self.samplePostsService.get(self.currentTitle)
            .then(function (data) {
                self.posts[self.currentTitle] = data;
            }, function (data) {
                console.log(data);
            })

            self.timeout(function () {
                _viewTop = document.querySelector('.dashboard-view-top');
                _viewBottom = document.querySelector('.dashboard-content-holder');
                _viewHeader = document.getElementById('dashboardViewHeader');
                TweenLite.set(_viewTop, { marginTop: -420 });
                TweenLite.set(_viewTop, { y: 420 });
                TweenLite.set(_viewBottom, { marginTop: 420 });
                _viewBottom.addEventListener("scroll", function (e) {
                    self.debScrollFn(e.target.scrollTop);
                });
            }, 33);

        }
        var _lastTop = 0;
        var _setToDisappear = false;
        self.onScrollFn = function (_top) {
            var _top = _top;
            if (_top > _lastTop) {
                if (_viewTop && !_setToDisappear) {
                    TweenMax.to(_viewTop, 0.3, {
                        y: 72, onComplete: function () {
                            document.querySelector('.app-title').style.display = 'NONE';
                            _viewHeader.style.display = 'BLOCK';
                            TweenMax.to(_viewHeader, 0.3, { opacity: 1 });
                            self.headerPinned = true;
                            document.querySelector('.dashboard-content-holder').classList.add('hideTabsHeader');
                        }
                    });
                    TweenMax.to(_viewBottom, 0.3, { height: window.innerHeight - 72, marginTop: 72 });
                    _setToDisappear = true;
                }
            }
            else if (_top < 48) {
                if (_viewTop && _setToDisappear && !self.headerPinned) {
                    TweenMax.to(_viewHeader, 0.1, {
                        opacity: 0, onComplete: function () {
                            document.querySelector('.app-title').style.display = 'BLOCK';
                            TweenMax.to(_viewTop, 0.3, {
                                y: 420, onComplete: function () {
                                    _viewHeader.style.display = 'NONE';
                                }
                            })
                        }
                    });
                    TweenMax.to(_viewBottom, 0.3, { height: window.innerHeight - 420, marginTop: 420 });
                    _setToDisappear = false;
                }
            }
            _lastTop = _top;
        }
        self.debScrollFn = _.throttle(self.onScrollFn, 20);
        self.init();
    }]);
})();