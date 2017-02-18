(function () {
    "use strict";
    angular.module('QR.Web.Extensions')
    .directive('snippetview', ['$document', '$rootScope', '$timeout', function ($document, $rootScope, $timeout) {
        return {
            restrict: 'E',
            scope: {
                post: "="
            },
            replace: true,
            controller: [function () {
                var self = this;
                self.timeout = $timeout;
                self.snippetViewerId = _.uniqueId('_cd_');
                self.previewContent = [];
                self.loadSnippet = function () {
                    if (typeof self.post !== 'undefined' && typeof self.post.content !== 'undefined' && self.post.content.length > 0) {
                        var _flask = _.first(_.filter(self.post.content, function (_mod) { return _mod.type == 'flask' })) || {};
                        var _text = _.first(_.filter(self.post.content, function (_mod) { return _mod.type == 'text' })) || {};
                        self.previewContent.push(_text);
                        self.previewContent.push(_flask);
                    }                
                }
                self.loadViewer = function (e, _flaskId) {
                    _.each(self.previewContent, function (_content, _iter) {
                        if (_content.type == 'flask') {
                            self.timeout(function () {
                                var _elem = document.getElementById(self.snippetViewerId + '_MOD_' + _iter);
                                if (_elem) {
                                    var _codeElm = _elem.querySelector('code');
                                    if (_codeElm) {
                                        _codeElm.classList.add('language-' + _content.langExt);
                                        _codeElm.setAttribute('id', '_CE_' + self.snippetViewerId + '_MOD_' + _iter);
                                        _codeElm.setAttribute('uid', _content.uid);
                                        _codeElm.innerHTML = Prism.highlight(_content.data, Prism.languages[_content.langExt]);
                                    }
                                }
                            }, 33);
                        }
                    });
                }
            }],
            bindToController: true,
            controllerAs: 'snippetViewer',
            link: function (scope, element, attrs) {
            },
            templateUrl: 'templates/extensions/snippetview.directive.tmpl.html'
        }
    }])
})()