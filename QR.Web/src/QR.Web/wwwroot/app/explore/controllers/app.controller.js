(function () {
    "use strict";
    angular.module('QR.Web')
    .controller('AppController', ['$uibModal', 'Notify', 'SharedService', 'SamplePosts', '$timeout', "$compile", "$scope", function ($uibModal, notifyService, shared, SamplePosts, $timeout, $compile, $scope) {
        var self = this;
        var _loadedPosts = {};
        self.shared = shared;
        self.timeout = $timeout;
        self.compile = $compile;
        self.headerPinned = false;
        self.samplePostsService = SamplePosts;
        self.currentTitle = '';
        self.posts = {};
        self.initialized = false;
        self.categories = [
            { id: 'all', name: 'All' },
            { id: 'javascript', name: 'JavaScript' },
            { id: 'markup', name: 'HTML' },
            { id: 'css', name: 'CSS' },
            { id: 'others', name: 'Other(s)' }
        ];
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
            if (self.currentTitle != tabTitle && self.initialized) {
                self.currentTitle = tabTitle;
                self.samplePostsService.get(self.currentTitle)
                .then(function (data) {
                    tryLoadingPostsForActiveContent(data);
                }, function (data) {
                })
            }
        }
        self.onTabDeselected = function (tabTitle) {
            //self.posts[tabTitle] = [];
        }
        var _viewTop = null;
        var _viewBottom = null;
        var _viewHeader = null;
        var _activeContentView = null;
        var _lastTop = 0;
        var _setToDisappear = false;
        function tryToShowHeader() {
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
        function tryToHideHeader() {
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
        self.onScrollFn = function (_top) {
            var _top = _top;
            if (_top > _lastTop) {
                tryToHideHeader();
            }
            else if (_top < 48) {
                //tryToShowHeader()
            }
            _lastTop = _top;
        }
        self.debScrollFn = _.throttle(self.onScrollFn, 20);
        function loadLoaderElementsIntoContent(_content, _currentViewId, _defer) {
            var _elm = angular.element(_content);
            for (var i = 0; i < 3; i++) {
                var _id = _.uniqueId('snippetLoader');
                var _tmpl = '<div class="col-xs-12 col-sm-12 col-md-6 col-lg-4" id="SLID"><snippet-loader></snippet-loader></div>';
                _tmpl = _tmpl.replace('SLID', _id)
                _elm.append(_tmpl);
                if (typeof _loadedPosts[_currentViewId] === 'undefined')
                    _loadedPosts[_currentViewId] = [];
                _loadedPosts[_currentViewId].push({ id: _id, loaded: false });
                if (typeof _defer !== 'undefined' && _defer == false) {
                    var _elmToCompile = angular.element(document.getElementById(_id));
                    self.compile(_elmToCompile.contents())($scope);
                }
            }
        }
        function loadLoaderElementsIntoAllContent() {
            _.each(self.categories, function (_category) {
                var _view = document.getElementById('_mdContent_' + _category.id);
                loadLoaderElementsIntoContent(_view, _category.id, false);
                var _elmToCompile = angular.element(_view);
                self.compile(_elmToCompile.contents())($scope);
            });
        }
        function tryLoadingPostsForActiveContent(_posts) {
            console.log(_posts);
            var _currentViewId = self.currentTitle;
            var _paintLength = _posts.length;
            var _emptyLength = _.filter(_loadedPosts[_currentViewId], function (_postHolder) {
                return _postHolder.loaded == false
            }).length || 0;
            if (_paintLength > _emptyLength) {
                var _elm = angular.element(document.getElementById('_mdContent_' + _currentViewId));
                for (var i = 0; i < _paintLength - _emptyLength; i++) {
                    var _id = _.uniqueId('snippetLoader');
                    var _tmpl = '<div class="col-xs-12 col-sm-12 col-md-6 col-lg-4" id="SLID"><snippet-loader></snippet-loader></div>';
                    _tmpl = _tmpl.replace('SLID', _id)
                    _elm.append(_tmpl);
                    if (typeof _loadedPosts[_currentViewId] === 'undefined')
                        _loadedPosts[_currentViewId] = [];
                    _loadedPosts[_currentViewId].push({ id: _id, loaded: false });
                    if (typeof _defer !== 'undefined' && _defer == false) {
                        var _elmToCompile = angular.element(document.getElementById(_id));
                        self.compile(_elmToCompile.contents())($scope);
                    }
                }
            }
            else if (_paintLength < _emptyLength) {
                for (var i = 0; i < _emptyLength - _paintLength; i++) {
                    var _popped = _loadedPosts[_currentViewId].pop();
                    var _elem = document.getElementById(_popped.id);
                    _elem.remove();
                }
            }
            _.each(_.filter(_loadedPosts[_currentViewId],
                function (_postHolder) {
                    return _postHolder.loaded == false
                }),
                function (_postHolder, _iter) {
                    if (_iter < _paintLength) {
                        var _elm = angular.element(document.getElementById(_postHolder.id));
                        _elm.empty();
                        var _postId = _posts[_iter].id;
                        if (typeof self.posts[_postId] === 'undefined' || self.posts[_postId] == null || self.posts[_postId] == {})
                            self.posts[_postId] = _posts[_iter];
                        var _tmpl = '<snippetview preview="false" post="app.posts[\'POSTID\']"></snippetview>';
                        _tmpl = _tmpl.replace('POSTID', _postId);
                        _elm.append(_tmpl);
                        self.compile(_elm.contents())($scope);
                        _postHolder.loaded = true;
                    }
                });
        }
        self.init = function () {

            self.currentTitle = 'all';
            self.samplePostsService.get(self.currentTitle)
            .then(function (data) {
                tryLoadingPostsForActiveContent(data);
            }, function (data) {
            })

            self.timeout(function () {
                _viewTop = document.querySelector('.dashboard-view-top');
                _viewBottom = document.querySelector('.dashboard-content-holder');
                _viewHeader = document.getElementById('dashboardViewHeader');
                loadLoaderElementsIntoAllContent();
                _activeContentView = document.getElementById('_mdContent_' + self.currentTitle);
                TweenLite.set(_viewTop, { marginTop: -420 });
                TweenLite.set(_viewTop, { y: 420 });
                TweenLite.set(_viewBottom, { marginTop: 420 });
                _viewBottom.addEventListener("scroll", function (e) {
                    self.debScrollFn(e.target.scrollTop);
                });
                self.initialized = true;
            }, 33);

        }
        self.init();
    }]);
})();