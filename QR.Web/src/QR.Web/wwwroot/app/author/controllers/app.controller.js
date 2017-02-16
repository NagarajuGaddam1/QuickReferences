(function () {
    "use strict";
    angular.module('QR.Web.Author')
    .controller('AppController', ['$uibModal', 'Notify', 'SharedService', 'SampleGet', '$timeout', function ($uibModal, notifyService, shared, SampleGet, $timeout) {
        var self = this;
        self.shared = shared;
        self.sampleGet = SampleGet;
        self.timeout = $timeout;
        self.flask = '';
        self.mainTags = [
            { id: 'htm', name: 'html', forecolor: '#ffffff', backcolor: '#ff6d2e' },
            { id: 'js', name: 'js', forecolor: '#000000', backcolor: '#ffc629' },
            { id: 'css', name: 'css', forecolor: '#ffffff', backcolor: '#2facdb' },
            { id: 'scss', name: 'scss', forecolor: '#ffffff', backcolor: '#d2679e' }
        ];

        var _codeFlaskId = 'myCodeJSWrapper';
        var _paneHolder = 'authoringFlaskPaneHolder';

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

        self.initJSWrapper = function (id) {
            self.flask = new CodeFlask;
            self.flask.run('#' + id, { language: 'javascript' });
            self.flask.onUpdate(function (code) {
                var html = Prism.highlight(code, Prism.languages.javascript);
                document.getElementById('displayPreview').innerHTML = html;
            });
        }

        self.init = function () {

            self.post = {
                name: 'Lorem Ipsum Dolor Sit Amet',
                paragraphs: [
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
                    , 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
                ],
                tags: ['html5', 'material', 'js', 'css'],
                category: 'js'
            };

            self.sampleGet.get().then(function (data) {
                var _codeWrapper = document.getElementById(_codeFlaskId);
                var _textArea = _codeWrapper.querySelector('textarea');
                self.initJSWrapper(_codeFlaskId);
                self.flask.update(data);
            }, function (data) {
            });

            document.getElementById('contentBody').addEventListener("scroll", function (e) {
                if (e.target) {
                    if (e.target.scrollTop) {
                        if (document.getElementById(_paneHolder))
                            document.getElementById(_paneHolder).style.top = document.getElementById('contentBody').scrollTop + 'px';
                    }
                }
            });
        }
        self.timeout(self.init, 100);
    }]);
})();