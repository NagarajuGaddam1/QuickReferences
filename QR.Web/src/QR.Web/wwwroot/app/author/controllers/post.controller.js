(function () {
    "use strict";

    var _newFlaskContent = {
        'text': {
            "type": "text",
            "data": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
        },
        'javascript': {
            "type": "flask",
            "lang": "js",
            "flaskLang": "javascript",
            "data": "function(){\nconsole.log('hello');\n}"
        },
        'markup': {
            "type": "flask",
            "lang": "htm",
            "flaskLang": "markup",
            "data": "<div class=\"\"></div>"
        },
        'css': {
            "type": "flask",
            "lang": "scss",
            "flaskLang": "css",
            "data": "@mixin respond-to($media) {\n    @content;\n        }\n    }\n}        \n                              \n.dashboard {\n   display:\"bloc\";\n}"
        },
        'scss': {
            "type": "flask",
            "lang": "scss",
            "flaskLang": "css",
            "data": "@mixin respond-to($media) {\n    @content;\n        }\n    }\n}        \n                              \n.dashboard {\n   display:\"bloc\";\n}"
        }
    };

    angular.module('QR.Web.Author')
    .controller('PostController', ['$uibModal', 'Notify', 'SharedService', 'SampleGet', '$timeout', '$stateParams', 'PostsService', function ($uibModal, notifyService, shared, SampleGet, $timeout, $stateParams, PostsService) {
        var self = this;
        self.shared = shared;
        self.shared.currentContext = 'Edit Post';
        self.shared.actions = [
            { id: _.uniqueId('_POST_ACTION'), iconName: 'ms-Icon--DecreaseIndentLegacy', click: 'goToDashboard', show: true, title: 'Go To Dashboard' },
            { id: _.uniqueId('_POST_ACTION'), iconName: 'ms-Icon--RevToggleKey', click: 'revertChangesPost', show: true, title: 'Revert Changes' },
            { id: _.uniqueId('_POST_ACTION'), iconName: 'ms-Icon--Save', click: 'savePost', show: true, title: 'Save Changes' },
            { id: _.uniqueId('_POST_ACTION'), iconName: 'ms-Icon--Delete', click: 'deletePost', disabled: true, show: true, title: 'Delete Post' },
            { id: _.uniqueId('_POST_ACTION'), iconName: 'ms-Icon--Blocked2', click: 'suspendPost', show: true, title: 'Suspend Post' },
        ];
        self.sampleGet = SampleGet;
        self.postsService = PostsService;
        self.stateParams = $stateParams;
        self.timeout = $timeout;
        self.flask = '';
        self.currentFlaskIndex = 0;
        self.flasksBeingReodered = false;
        self.mainCategories = [
            { id: 'HTML', name: 'html', forecolor: '#ffffff', backcolor: '#ff6d2e' },
            { id: 'JS', name: 'js', forecolor: '#000000', backcolor: '#ffc629' },
            { id: 'CSS', name: 'css', forecolor: '#ffffff', backcolor: '#2facdb' },
            { id: 'SCSS', name: 'scss', forecolor: '#ffffff', backcolor: '#d2679e' },
            { id: 'CSHARP', name: 'c#', forecolor: '#ffffff', backcolor: '#34495e' },
            { id: 'AZURE', name: 'azure', forecolor: '#ffffff', backcolor: '#0073c6' }
        ];
        var _paneHolder = 'authoringFlaskPaneHolder';
        self.flasks = [];
        self.post = {};
        self.shared.revertChangesPost = function () {
            console.log('revertChangesPost');
        }
        self.shared.deletePost = function () {
            console.log('suspendPost');
        }
        self.shared.suspendPost = function () {
            self.post['isSuspended'] = true;
            self.postsService.updatePost(self.post)
            .then(function (data) { console.log('update success', data) }, function (error) { console.log(error) });
        }
        self.shared.savePost = function () {
            if (typeof self.stateParams.postId !== 'undefined' && self.stateParams.postId != null && self.stateParams.postId != '') {
                self.postsService.updatePost(self.post)
                .then(function (data) { console.log('update success', data) }, function(error){ console.log(error) });
            }
            else {
                self.postsService.addPost(self.post)
                .then(function (data) { console.log('add success', data) }, function(error){ console.log(error) });
            }
        }
        self.onDropComplete = function (_dropIndex, data) {
            self.swapContent(_dropIndex, data.index)
        }
        self.swapContent = function (_dropIndex, _pickIndex) {
            var _temp = self.post.contentItems[_pickIndex];
            self.post.contentItems.splice(_pickIndex, 1);
            self.post.contentItems.splice(_dropIndex, 0, _temp);
            _.each(self.post.contentItems, function (_content, _iter) {
                _content.index = _iter;
            });
        }
        self.enableFlaskReordering = function () {
            if (!self.flasksBeingReodered) {
                self.flasksBeingReodered = true;
            }
            else {
                self.flasksBeingReodered = false;
            }
        }
        self.addFlask = function (_type) {
            var _flask = angular.copy(_newFlaskContent[_type]);
            _flask.uid = _.uniqueId('_FLASK_CONTENT_');
            _flask.index = self.currentFlaskIndex;
            self.post.contentItems.splice(self.currentFlaskIndex, 0, _flask);
            self.currentFlaskIndex = self.post.contentItems.length;
            self.timeout(function () {
                var _selector = '[uid="' + _flask.uid + '"]';
                var _elem = document.querySelector(_selector);
                if (_elem) {
                    var _focusElm = _elem.querySelector('textarea');
                    if (_focusElm)
                        _focusElm.focus();
                }
            }, 100);
        }

        self.setupFlask = function (_content, _iter, _flaskId) {
            var _flask = new CodeFlask();
            _flask.run('#' + _flaskId, { language: _content.flaskLang });
            _flask.uid = _content.uid;
            _flask.update(_content.data);
            _flask.onUpdate(function (code) {
                var html = Prism.highlight(code, Prism.languages[_content.flaskLang]);
                _.each(self.post.contentItems, function (_item) {                    
                    if (_item.uid.localeCompare(_flask.uid) == 0) {
                        _item.data = code;
                        if (typeof self.post["updateFlask"] !== 'undefined' && typeof self.post["updateFlask"] === 'function') {
                            self.post["updateFlask"](html, _item.uid);
                        }
                    }
                });
            });
            self.flasks.push(_flask);
        }

        self.loadFlask = function (_id) {
            self.timeout(function () {
                _.each(self.post.contentItems, function (_content, _iter) {
                    if (_iter == _id) {
                        var _elem = document.getElementById('_FLASK_' + _id);
                        if (_elem) {
                            var _flaskElm = _elem.querySelector('[data-flask="true"]');
                            if (_flaskElm) {
                                _flaskElm.classList.add('language-' + _content.flaskLang);
                                var _flaskId = '_CE_FLASK_' + _iter;
                                _flaskElm.setAttribute('id', _flaskId);
                                self.setupFlask(_content, _iter, _flaskId);
                            }
                        }
                    }
                });
            }, 33);
        }

        self.init = function () {
            if (typeof self.stateParams.id !== 'undefined' && self.stateParams.id != null && self.stateParams.id != '') {
                self.postsService.getPostData(self.stateParams['id'])
                .then(function (data) {
                    self.post = data;
                    self.currentFlaskIndex = self.post.contentItems.length;
                }, function (error) {
                    console.log('Error', error)
                });
            }
            else {
                self.post = self.postsService.getSampleNewPost();
                self.currentFlaskIndex = self.post.contentItems.length;                
            }
        }
        
        self.timeout(self.init, 100);

    }]);
})();


//self.sampleGet.get().then(function (data) {
//    var _data = {
//        "title": "Lorem Ipsum Dolor Sit Amet",
//        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
//        "tags": ["html5", "material", "js", "css"],
//        "category": "javascript",
//        "contentItems": [
//            {
//                "type": "text",
//                "data": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
//            },
//            {
//                "type": "flask",
//                "lang": "js",
//                "flaskLang": "javascript",
//                "data": "$(document).ready(function () {\r\n    var flask = new CodeFlask;\r\n    flask.run('#coder', { language: 'javascript', rtl: false });\r\n    flask.onUpdate(function (code) {\r\n        document.getElementById('display').innerHTML \r\n\t= Prism.highlight(code, Prism.languages.javascript);\r\n    });\r\n})"
//            },
//            {
//                "type": "text",
//                "data": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
//            },
//            {
//                "type": "list",
//                "data": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \nUt enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat \nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur \nExcepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
//            },
//            {
//                "type": "flask",
//                "lang": "scss",
//                "flaskLang": "css",
//                "data": "@mixin respond-to($media) {\r\n    @if $media == tablet {\r\n        @media only screen and (min-width:$break-tablet) and (max-width:$break-desktop - 1) {\r\n            @content;\r\n        }\r\n    }\r\n    @else if $media == mobile {\r\n        @media only screen and (max-width:$break-tablet - 1) {\r\n            @content;\r\n        }\r\n    }\r\n}        \r\n                              \r\n.dashboard {\r\n    width: 100%;    \r\n    padding: 0;\r\n    -moz-box-sizing: border-box;\r\n    -webkit-box-sizing: border-box;\r\n    box-sizing: border-box;\r\n    position: relative;\r\n    border-left: 1px solid #E6E6E6;   \r\n    &-heading {\r\n        font-weight: 100;\r\n        width: 100%;\r\n        text-align: center;\r\n        color: #d0d0d0;\r\n    }\r\n}"
//            },
//            {
//                "type": "text",
//                "data": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
//            },
//            {
//                "type": "flask",
//                "lang": "htm",
//                "flaskLang": "markup",
//                "data": "<footer class=\"footer-bod\">\r\n    <div class=\"footer-bod-content\">\r\n        <ul class=\"pull-left\">                        \r\n            <li>\r\n                <a>Feedback</a>\r\n            </li>\r\n            <li>\r\n                <a>Contact Us</a>\r\n            </li>\r\n        </ul>\r\n    </div>\r\n</footer>"
//            }
//        ]
//    };
//    self.post = _transfromResponse(_data);
//    self.currentFlaskIndex = self.post.contentItems.length;
//}, function (data) {
//});