(function () {
    "use strict";
    angular.module('QR.Web.Author')
    .controller('AppController', ['$uibModal', 'Notify', 'SharedService', function ($uibModal, notifyService, shared) {
        var self = this;
        self.shared = shared;

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
            var flask = new CodeFlask;
            flask.run('#' + id, { language: 'javascript' });
            flask.onUpdate(function (code) {
                var html = Prism.highlight(code, Prism.languages.javascript);
                document.getElementById('displayPreview').innerHTML = html;
            });
        }

    }]);
})();