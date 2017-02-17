﻿(function () {
    "use strict";
    angular.module('QR.Extensions')
    .directive('codeview', ['$document', '$rootScope', '$timeout', function ($document, $rootScope, $timeout) {
        return {
            restrict: 'E',
            scope: {
                post: "=",
                preview: "@"
            },
            replace: true,
            controller: [function () {
                var self = this;
                self.timeout = $timeout;
                self.codeViewerId = _.uniqueId('_cd_');
                self.loadViewer = function (e, _flaskId) {
                    if (typeof self.post !== 'undefined' && typeof self.post.content !== 'undefined' && self.post.content.length > 0) {
                        _.each(self.post.content, function (_content, _iter) {
                            if (_content.type == 'flask') {
                                self.timeout(function () {
                                    var _elem = document.getElementById(self.codeViewerId + '_MOD_' + _iter);
                                    if (_elem) {
                                        var _codeElm = _elem.querySelector('code');
                                        if (_codeElm) {
                                            _codeElm.classList.add('language-' + _content.langExt);
                                            _codeElm.setAttribute('id', '_CE_' + self.codeViewerId + '_MOD_' + _iter);
                                            _codeElm.setAttribute('uid', _content.uid);
                                            _codeElm.innerHTML = Prism.highlight(_content.data, Prism.languages[_content.langExt]);
                                        }
                                    }
                                }, 33);
                            }
                        });
                    }
                };
                self.buildFns = function () {
                    self.post.updateFlask = function (html, uid) {
                        _.each(self.post.content, function (_content, _iter) {
                            if (_content.type == 'flask' && _content.uid == uid) {
                                var _elem = document.getElementById('_CE_' + self.codeViewerId + '_MOD_' + _iter);
                                if (_elem) {
                                    _elem.innerHTML = html;
                                }
                            }
                        });
                    }
                }
            }],
            bindToController: true,
            controllerAs: 'codeViewer',
            link: function (scope, element, attrs) {
                scope.$watch('codeViewer.post', function (n, o) {                    
                    if (typeof scope.codeViewer.preview !== 'undefined' && scope.codeViewer.preview == "true")
                        scope.codeViewer.buildFns();
                })
            },
            templateUrl: 'templates/author/codeviewer.directive.tmpl.html'
        }
    }])
})()