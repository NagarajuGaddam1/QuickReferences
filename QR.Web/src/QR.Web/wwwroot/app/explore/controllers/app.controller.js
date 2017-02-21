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
        self.readingMode = false;
        self.categories = [
            { id: 'all', name: 'All Posts' },
            { id: 'javascript', name: 'JavaScript' },
            { id: 'markup', name: 'HTML' },
            { id: 'css', name: 'CSS' },
            { id: 'others', name: 'Other(s)' }
        ];
        self.selectedCategory = 'all';
        self.selectCategory = function () {
            self.selectTab(self.selectedCategory);
        }
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
                    self.loadLoaderElementsIntoAllContent(tabTitle);
                }, 500);
                self.currentTitle = tabTitle;
                self.samplePostsService.get(self.currentTitle)
                .then(function (data) {
                    console.log(data);
                    tryLoadingPostsForActiveContent(data);
                }, function (data) {
                })
            }
        }
        self.onTabDeselected = function (tabTitle) {
            console.log('onTabDeselected');
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
        self.loadLoaderElementsIntoContent = function (_content, _currentViewId) {
            var _elm = angular.element(_content);
            for (var i = 0; i < 3; i++) {
                var _id = _.uniqueId('snippetLoader');
                var _tmpl = '<div class="col-xs-12 col-sm-12 col-md-6 col-lg-4 snippet-loader-container" id="SLID">SNIPPET_TMPL</div>';
                _tmpl = _tmpl.replace('SLID', _id);
                _tmpl = _tmpl.replace('SNIPPET_TMPL', window._extensionsAssets['templates/extensions/snippetloader.directive.tmpl.html'])
                _elm.append(_tmpl);
                if (typeof _loadedPosts[_currentViewId] === 'undefined')
                    _loadedPosts[_currentViewId] = [];
                _loadedPosts[_currentViewId].push({ id: _id, loaded: false });
            }
        }
        self.loadLoaderElementsIntoAllContent = function (_categoryId) {
            var _view = document.getElementById('_mdContent_' + _categoryId);
            window.requestAnimationFrame(function () {
                self.loadLoaderElementsIntoContent(_view, _categoryId);
            });
            var _elmToCompile = angular.element(_view);
            self.compile(_elmToCompile.contents())($scope);
        }
        self.fnLoadPost = function (_holder) {
            self.samplePostsService.getDataForPost(_holder)
            .then(function (_data) {
                var _holder = _data.holder;
                var _post = _data.post;
                var _snippetViewerId = _.uniqueId('_cd_');
                var _holderElm = document.getElementById(_holder.id);
                var _flasksToProcess = [];
                if (_holderElm) {
                    var _titleElm = _holderElm.querySelector('.codeview-container-actions-title');
                    if (_titleElm) {
                        _titleElm.textContent = _post.name
                    }
                    var _imgElm = _holderElm.querySelector('img[data-show="preview"]');
                    if (_imgElm) {
                        var _imgElmSrc = '';
                        switch (_post.category) {
                            case 'css': _imgElmSrc = '/dist/images/css3.png'; break;
                            case 'javascript': _imgElmSrc = '/dist/images/js.png'; break;
                            case 'scss': _imgElmSrc = '/dist/images/scss.png'; break;
                            case 'markup': _imgElmSrc = '/dist/images/html5.png'; break;
                            default: _imgElmSrc = '/dist/images/css3.png'; break;
                        }
                        _imgElm.setAttribute('src', _imgElmSrc);
                    }
                    var _chipContainerElm = _holderElm.querySelector('.md-chips-container');
                    if (_chipContainerElm) {
                        _.each(_post.tags, function (_tag) {
                            var _tmpl = '<div class="chip" data-show="preview">' + _tag + '</div>';
                            angular.element(_chipContainerElm).append(_tmpl);
                        });
                    }
                    var _snippetViewContainer = _holderElm.querySelector('.snippetview-container');
                    if (_snippetViewContainer) {
                        var _contentTmpl = '';
                        _.each(_post.content, function (_content, _iter) {
                            if (_content.type == 'text') {
                                var _tmpl = '<p class="snippetview">TEXTCONTENT</p>';
                                _tmpl = _tmpl.replace('TEXTCONTENT', _content.data);
                                _contentTmpl = _contentTmpl + _tmpl;
                            }
                            else if (_content.type == 'flask') {                                
                                var _tmpl = '<div class="codeview-container-flasks snippetview"><div class="codeview-container-flasks-item" id="_FLASK_ID"><pre class="snippetview language-_FLASK_LANG"><code></code></pre></div></div>';
                                var _flaskId = _snippetViewerId + '_MOD_' + _iter;
                                _tmpl = _tmpl.replace('_FLASK_ID', _flaskId);
                                _tmpl = _tmpl.replace('_FLASK_LANG', _content.langExt);
                                _flasksToProcess.push({
                                    id: _flaskId,
                                    langExt: _content.langExt,
                                    codeViewId: '_CE_' + _snippetViewerId + '_MOD_' + _iter,
                                    uid: _content.uid,
                                    data: _content.data
                                });
                                _contentTmpl = _contentTmpl + _tmpl;
                            }
                        });
                        angular.element(_snippetViewContainer).append(_contentTmpl);
                    }
                    var _snippetPreviewElm = _holderElm.querySelector('.snippetview-preview[data-mode="loader"]');
                    if (_snippetPreviewElm) {
                        _snippetPreviewElm.setAttribute('data-mode', 'preview');
                        if (_flasksToProcess.length > 0) {
                            _.each(_flasksToProcess, function (_flask) {
                                var _elem = document.getElementById(_flask.id);
                                if (_elem) {
                                    var _codeElm = _elem.querySelector('code');
                                    if (_codeElm) {
                                        _codeElm.classList.add('language-' + _flask.langExt);
                                        _codeElm.setAttribute('id', _flask.codeViewId);
                                        _codeElm.setAttribute('uid', _flask.uid);
                                        _codeElm.innerHTML = Prism.highlight(_flask.data, Prism.languages[_flask.langExt]);
                                    }
                                }
                            });
                        }
                    }
                }
            });
        }

        function tryToShowHeader() {
            var _topHeight = window.innerWidth < 768 ? 240 : 420;
            if (_viewTop && _setToDisappear && !self.headerPinned) {
                TweenMax.to(_viewHeader, 0.1, {
                    opacity: 0, onComplete: function () {
                        document.querySelector('.app-title').style.display = 'BLOCK';                        
                        TweenMax.to(_viewTop, 0.3, {
                            y: _topHeight, onComplete: function () {
                                _viewHeader.style.display = 'NONE';
                            }
                        })
                    }
                });
                TweenMax.to(_viewBottom, 0.3, { height: window.innerHeight - _topHeight, marginTop: _topHeight });
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
        function tryLoadingPostsForActiveContent(data) {
            var _currentViewId = data.filter;
            var _currentlyPostedIds = _.map(_.filter(_loadedPosts[_currentViewId], function (_pl) {
                return _pl.loaded == true
            }), function (_post) {
                return _post.loadedId
            });
            var _posts = _.reject(data.posts, function (_post) {
                var _index = _.indexOf(_currentlyPostedIds, _post);
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
                    var _tmpl = '<div class="col-xs-12 col-sm-12 col-md-6 col-lg-4 snippet-loader-container" id="SLID">SNIPPET_TMPL</div>';
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
                }), function (_postHolder, _iter) {
                    _postHolder.loadedId = _posts[_iter];
                    if (typeof self.fnLoadPost !== 'undefined' && typeof self.fnLoadPost === 'function')
                        self.fnLoadPost(_postHolder);
                });
        }
        self.init = function () {

            self.currentTitle = 'all';
            self.samplePostsService.get(self.currentTitle)
            .then(function (data) {
                tryLoadingPostsForActiveContent(data);
                self.initialized = true;
            }, function (data) {
            })

            self.timeout(function () {
                var _topHeight = window.innerWidth < 768 ? 240 : 420;1
                _viewTop = document.querySelector('.dashboard-view-top');
                _viewBottom = document.querySelector('.dashboard-content-holder');
                _viewHeader = document.getElementById('dashboardViewHeader');
                self.loadLoaderElementsIntoAllContent('all');
                _activeContentView = document.getElementById('_mdContent_' + self.currentTitle);
                TweenLite.set(_viewTop, { marginTop: -_topHeight });
                TweenLite.set(_viewTop, { y: _topHeight });
                TweenLite.set(_viewBottom, { marginTop: _topHeight });
                _viewBottom.addEventListener("scroll", function (e) {
                    self.debScrollFn(e.target.scrollTop);
                });
            }, 33);

        }
        self.init();
    }]);
})();