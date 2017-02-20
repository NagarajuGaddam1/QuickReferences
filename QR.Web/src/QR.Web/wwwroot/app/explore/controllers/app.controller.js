(function () {
    "use strict";

    window.requestAnimFrame = (function () {
        return window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.oRequestAnimationFrame ||
          window.msRequestAnimationFrame ||
          function (/* function */ callback, /* DOMElement */ element) {
              window.setTimeout(callback, 1000 / 60);
          };
    })();

    angular.module('QR.Web')
    .controller('AppController', ['$uibModal', 'Notify', 'SharedService', 'SamplePosts', '$timeout', '$interval', "$compile", "$scope", function ($uibModal, notifyService, shared, SamplePosts, $timeout, $interval, $compile, $scope) {
        var self = this;
        var _loadedPosts = {};
        self.shared = shared;
        self.timeout = $timeout;
        self.interval = $interval
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
                self.timeout(function () {
                    loadLoaderElementsIntoAllContent(tabTitle);
                }, 500);
                self.currentTitle = tabTitle;
                self.samplePostsService.get(self.currentTitle)
                .then(function (data) {
                    tryLoadingPostsForActiveContent(data);
                }, function (data) {
                })
            }
        }
        self.onTabDeselected = function (tabTitle) {
            var _view = angular.element(document.getElementById('_mdContent_' + tabTitle));
            _.each(_loadedPosts[tabTitle], function (_lp) {
                if (_lp.scope) _lp.scope.$destroy();
            })
            _view.empty();
            _loadedPosts[tabTitle] = [];
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
                var _tmpl = '<div class="col-xs-12 col-sm-12 col-md-6 col-lg-4" id="SLID">SNIPPET_TMPL</div>';
                _tmpl = _tmpl.replace('SLID', _id);
                _tmpl = _tmpl.replace('SNIPPET_TMPL', window._extensionsAssets['templates/extensions/snippetloader.directive.tmpl.html'])
                _elm.append(_tmpl);
                if (typeof _loadedPosts[_currentViewId] === 'undefined')
                    _loadedPosts[_currentViewId] = [];
                _loadedPosts[_currentViewId].push({ id: _id, loaded: false });
            }
        }
        function loadLoaderElementsIntoAllContent(_categoryId) {
            var _view = document.getElementById('_mdContent_' + _categoryId);
            window.requestAnimationFrame(function () {
                loadLoaderElementsIntoContent(_view, _categoryId, false);
            });
            var _elmToCompile = angular.element(_view);
            self.compile(_elmToCompile.contents())($scope);
        }
        function tryLoadingPostsForActiveContent(data) {
            var _currentViewId = data.filter;
            var _currentlyPostedIds = _.map(_.filter(_loadedPosts[_currentViewId], function (_pl) {
                return _pl.loaded == true
            }), function (_post) {
                return _post.loadedId
            });
            var _posts = _.reject(data.posts, function (_post) {
                var _index = _.indexOf(_currentlyPostedIds, _post.id);
                return _index >= 0;
            })
            var _paintLength = _posts.length;
            var _emptyLength = _.filter(_loadedPosts[_currentViewId], function (_postHolder) {
                return _postHolder.loaded == false
            }).length || 0;
            if (_paintLength > _emptyLength) {
                var _elm = angular.element(document.getElementById('_mdContent_' + _currentViewId));
                for (var i = 0; i < _paintLength - _emptyLength; i++) {
                    var _id = _.uniqueId('snippetLoader');
                    var _tmpl = '<div class="col-xs-12 col-sm-12 col-md-6 col-lg-4" id="SLID">SNIPPET_TMPL</div>';
                    _tmpl = _tmpl.replace('SLID', _id);
                    _tmpl = _tmpl.replace('SNIPPET_TMPL', window._extensionsAssets['templates/extensions/snippetloader.directive.tmpl.html'])
                    _elm.append(_tmpl);
                    if (typeof _loadedPosts[_currentViewId] === 'undefined')
                        _loadedPosts[_currentViewId] = [];
                    _loadedPosts[_currentViewId].push({ id: _id, loaded: false });
                }
            }
            else if (_paintLength < _emptyLength) {
                for (var i = 0; i < _emptyLength - _paintLength; i++) {
                    var _popped = _loadedPosts[_currentViewId].pop();
                    var _elem = angular.element(document.getElementById(_popped.id));
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
                        _postHolder.scope = $scope.$new();
                        var compiledDirective = $compile(_tmpl);
                        var directiveElement = compiledDirective(_postHolder.scope);
                        _elm.append(directiveElement);
                        _postHolder.loaded = true;
                        _postHolder.loadedId = _postId;
                    }
                });
        }
        self.init = function () {

            self.currentTitle = 'all';
            self.samplePostsService.get(self.currentTitle)
            .then(function (data) {
                tryLoadingPostsForActiveContent(data);
                console.log(data);
                self.initialized = true;
                //self.interval(function () {
                //    self.samplePostsService.getInterval(self.currentTitle)
                //    .then(function (data) {
                //        tryLoadingPostsForActiveContent(data);
                //    });
                //}, 3000);
            }, function (data) {
            })

            self.timeout(function () {
                _viewTop = document.querySelector('.dashboard-view-top');
                _viewBottom = document.querySelector('.dashboard-content-holder');
                _viewHeader = document.getElementById('dashboardViewHeader');
                loadLoaderElementsIntoAllContent('all');
                _activeContentView = document.getElementById('_mdContent_' + self.currentTitle);
                TweenLite.set(_viewTop, { marginTop: -420 });
                TweenLite.set(_viewTop, { y: 420 });
                TweenLite.set(_viewBottom, { marginTop: 420 });
                _viewBottom.addEventListener("scroll", function (e) {
                    self.debScrollFn(e.target.scrollTop);
                });
            }, 33);

        }
        self.init();
    }]);
})();