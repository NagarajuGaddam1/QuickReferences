(function () {
    "use strict";

    angular.module('QR.Web')
    .service("PostsService", ["$http", "$q", "$timeout", PostsService]);

    function PostsService($http, $q, $timeout) {

        var _mappedIDs = function (_posts) {
            return _.map(_posts, function (_p) {
                return _p.id
            })
        }

        var _getPosts = function (_filter) {
            var _defer = $q.defer();
            $timeout(function () {
                if (_filter == "all") {
                    _defer.resolve({ filter: _filter, posts: _mappedIDs(_posts) });
                }
                else if (_filter == "css") {
                    var _data = _.filter(_posts, function (_post) {
                        return _post.category == "css" || _post.category == "scss";
                    })
                    _defer.resolve({ filter: _filter, posts: _mappedIDs(_data) });
                }
                else {
                    var _data = _.filter(_posts, function (_post) {
                        return _post.category == _filter;
                    })
                    _defer.resolve({ filter: _filter, posts: _mappedIDs(_data) });
                }
            }, 1000);
            return _defer.promise;

        }

        var _getDataForPost = function (_holder) {
            var _defer = $q.defer();
            $timeout(function () {
                var _post = _.find(_posts, function (_p) {
                    return _p.id == _holder.loadedId;
                })
                _defer.resolve({ holder: _holder, post: _post });
            }, 50 * Math.random());
            return _defer.promise;
        }

        var _getPostsInterval = function (_filter) {
            var _defer = $q.defer();
            $timeout(function () {
                var _post = {
                    "name": "Lorem Ipsum Dolor Sit Amet",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
                    "tags": ["html5", "material", "js", "css"],
                    "category": "javascript",
                    "content": [
                        {
                            "type": "text",
                            "data": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
                        },
                        {
                            "type": "flask",
                            "lang": "js",
                            "langExt": "javascript",
                            "data": "$(document).ready(function () {\r\n    var flask = new CodeFlask;\r\n    flask.run('#coder', { language: 'javascript', rtl: false });\r\n    flask.onUpdate(function (code) {\r\n        document.getElementById('display').innerHTML \r\n\t= Prism.highlight(code, Prism.languages.javascript);\r\n    });\r\n})"
                        },
                        {
                            "type": "text",
                            "data": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
                        },
                        {
                            "type": "flask",
                            "lang": "js",
                            "langExt": "javascript",
                            "data": "$(document).ready(function () {\r\n    var flask = new CodeFlask;\r\n    flask.run('#coder', { language: 'javascript', rtl: false });\r\n    flask.onUpdate(function (code) {\r\n        document.getElementById('display').innerHTML \r\n\t= Prism.highlight(code, Prism.languages.javascript);\r\n    });\r\n})"
                        },
                        {
                            "type": "text",
                            "data": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
                        },
                        {
                            "type": "text",
                            "data": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
                        }

                    ]
                };
                _post.id = _.uniqueId('_ORIG_POST');
                if (_filter == "all") {
                    _defer.resolve({ filter: _filter, posts: [_post] });
                }
            }, 1000);
            return _defer.promise;
        }

        var _getPostDetailsIfAvailable = function () {
            return $http({
                url: "/Values/GetPostDetailsIfAvailable",
                method: "GET"
            }).then(handleSuccess, handleError);
        }

        var _getSpecificPost = function () {
            var _defer = $q.defer();
            _getPostDetailsIfAvailable()
            .then(function (data) {
                var _postId = data["PostUID"];
                _defer.resolve({ filter: 'all', posts: [_postId] });
            }, function (data) {
                console.log(error);
                console.log(data)
            });
            return _defer.promise;
        }

        var handleSuccess = function (response) {
            console.log('Success');
            console.log(response);
            return response.data;
        }

        var handleError = function (error) {
            console.log(error);
        }

        return {
            get: _getPosts,
            getInterval: _getPostsInterval,
            getDataForPost: _getDataForPost,
            getSpecificPost: _getSpecificPost
        }
    }

    var _posts = [
    {
                "name": "Lorem Ipsum Dolor Sit Amet",
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
                "tags": ["html5", "material", "js", "css"],
                "category": "javascript",
                "content": [
                {
                        "type": "text",
                        "data": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
                },
                {
                            "type": "flask",
                            "lang": "js",
                            "langExt": "javascript",
                            "data": "$(document).ready(function () {\r\n    var flask = new CodeFlask;\r\n    flask.run('#coder', { language: 'javascript', rtl: false });\r\n    flask.onUpdate(function (code) {\r\n        document.getElementById('display').innerHTML \r\n\t= Prism.highlight(code, Prism.languages.javascript);\r\n    });\r\n})"
                },
                {
                            "type": "text",
                            "data": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
                },
                {
                            "type": "flask",
                            "lang": "js",
                            "langExt": "javascript",
                            "data": "$(document).ready(function () {\r\n    var flask = new CodeFlask;\r\n    flask.run('#coder', { language: 'javascript', rtl: false });\r\n    flask.onUpdate(function (code) {\r\n        document.getElementById('display').innerHTML \r\n\t= Prism.highlight(code, Prism.languages.javascript);\r\n    });\r\n})"
                },
                {
                            "type": "text",
                            "data": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
                },
                {
                            "type": "text",
                            "data": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
                }
                ]
    },
    {
                "name": "Lorem Ipsum Dolor Sit Amet",
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
                "tags": ["html5", "material", "js", "css"],
                "category": "markup",
                "content": [
                {
                        "type": "text",
                        "data": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
                },
                {
                        "type": "flask",
                        "lang": "htm",
                        "langExt": "markup",
                        "data": "<footer class=\"footer-bod\">\r\n    <div class=\"footer-bod-content\">\r\n        <ul class=\"pull-left\">                        \r\n            <li>\r\n                <a>Feedback</a>\r\n            </li>\r\n            <li>\r\n                <a>Contact Us</a>\r\n            </li>\r\n        </ul>\r\n    </div>\r\n</footer>"
                },
                {
                        "type": "text",
                        "data": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
                }
                ]
    },
    {
                "name": "Lorem Ipsum Dolor Sit Amet",
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
                "tags": ["html5", "material", "js", "css"],
                "category": "css",
                "content": [
                {
                        "type": "text",
                        "data": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
                },
                {
                        "type": "flask",
                        "lang": "scss",
                        "langExt": "css",
                        "data": "@mixin respond-to($media) {\r\n    @if $media == tablet {\r\n        @media only screen and (min-width:$break-tablet) and (max-width:$break-desktop - 1) {\r\n            @content;\r\n        }\r\n    }\r\n    @else if $media == mobile {\r\n        @media only screen and (max-width:$break-tablet - 1) {\r\n            @content;\r\n        }\r\n    }\r\n}        \r\n                              \r\n.dashboard {\r\n    width: 100%;    \r\n    padding: 0;\r\n    -moz-box-sizing: border-box;\r\n    -webkit-box-sizing: border-box;\r\n    box-sizing: border-box;\r\n    position: relative;\r\n    border-left: 1px solid #E6E6E6;   \r\n    &-heading {\r\n        font-weight: 100;\r\n        width: 100%;\r\n        text-align: center;\r\n        color: #d0d0d0;\r\n    }\r\n}"
                },
                {
                        "type": "text",
                        "data": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
                }
                ]
    },
    {
                "name": "Lorem Ipsum Dolor Sit Amet",
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
                "tags": ["html5", "material", "js", "css"],
                "category": "scss",
                "content": [
                {
                        "type": "text",
                        "data": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
                },
                {
                        "type": "flask",
                        "lang": "scss",
                        "langExt": "css",
                        "data": "@mixin respond-to($media) {\r\n    @if $media == tablet {\r\n        @media only screen and (min-width:$break-tablet) and (max-width:$break-desktop - 1) {\r\n            @content;\r\n        }\r\n    }\r\n    @else if $media == mobile {\r\n        @media only screen and (max-width:$break-tablet - 1) {\r\n            @content;\r\n        }\r\n    }\r\n}        \r\n                              \r\n.dashboard {\r\n    width: 100%;    \r\n    padding: 0;\r\n    -moz-box-sizing: border-box;\r\n    -webkit-box-sizing: border-box;\r\n    box-sizing: border-box;\r\n    position: relative;\r\n    border-left: 1px solid #E6E6E6;   \r\n    &-heading {\r\n        font-weight: 100;\r\n        width: 100%;\r\n        text-align: center;\r\n        color: #d0d0d0;\r\n    }\r\n}"
                },
                {
                        "type": "text",
                        "data": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
                }
                ]
    },
    {
                "name": "Lorem Ipsum Dolor Sit Amet",
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
                "tags": ["html5", "material", "js", "css"],
                "category": "javascript",
                "content": [
                {
                        "type": "text",
                        "data": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
                },
                {
                        "type": "flask",
                        "lang": "js",
                        "langExt": "javascript",
                        "data": "$(document).ready(function () {\r\n    var flask = new CodeFlask;\r\n    flask.run('#coder', { language: 'javascript', rtl: false });\r\n    flask.onUpdate(function (code) {\r\n        document.getElementById('display').innerHTML \r\n\t= Prism.highlight(code, Prism.languages.javascript);\r\n    });\r\n})"
                },
                {
                        "type": "text",
                        "data": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
                }
                ]
    },
    {
                "name": "Lorem Ipsum Dolor Sit Amet",
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
                "tags": ["html5", "material", "js", "css"],
                "category": "markup",
                "content": [
                {
                        "type": "text",
                        "data": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
                },
                {
                        "type": "flask",
                        "lang": "htm",
                        "langExt": "markup",
                        "data": "<footer class=\"footer-bod\">\r\n    <div class=\"footer-bod-content\">\r\n        <ul class=\"pull-left\">                        \r\n            <li>\r\n                <a>Feedback</a>\r\n            </li>\r\n            <li>\r\n                <a>Contact Us</a>\r\n            </li>\r\n        </ul>\r\n    </div>\r\n</footer>"
                },
                {
                        "type": "text",
                        "data": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
                }
                ]
    },
    {
                "name": "Lorem Ipsum Dolor Sit Amet",
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
                "tags": ["html5", "material", "js", "css"],
                "category": "css",
                "content": [
                {
                        "type": "text",
                        "data": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
                },
                {
                        "type": "flask",
                        "lang": "scss",
                        "langExt": "css",
                        "data": "@mixin respond-to($media) {\r\n    @if $media == tablet {\r\n        @media only screen and (min-width:$break-tablet) and (max-width:$break-desktop - 1) {\r\n            @content;\r\n        }\r\n    }\r\n    @else if $media == mobile {\r\n        @media only screen and (max-width:$break-tablet - 1) {\r\n            @content;\r\n        }\r\n    }\r\n}        \r\n                              \r\n.dashboard {\r\n    width: 100%;    \r\n    padding: 0;\r\n    -moz-box-sizing: border-box;\r\n    -webkit-box-sizing: border-box;\r\n    box-sizing: border-box;\r\n    position: relative;\r\n    border-left: 1px solid #E6E6E6;   \r\n    &-heading {\r\n        font-weight: 100;\r\n        width: 100%;\r\n        text-align: center;\r\n        color: #d0d0d0;\r\n    }\r\n}"
                },
                {
                        "type": "text",
                        "data": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
                }
                ]
    },
    {
                "name": "Lorem Ipsum Dolor Sit Amet",
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
                "tags": ["html5", "material", "js", "css"],
                "category": "scss",
                "content": [
                {
                        "type": "text",
                        "data": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
                },
                {
                        "type": "flask",
                        "lang": "scss",
                        "langExt": "css",
                        "data": "@mixin respond-to($media) {\r\n    @if $media == tablet {\r\n        @media only screen and (min-width:$break-tablet) and (max-width:$break-desktop - 1) {\r\n            @content;\r\n        }\r\n    }\r\n    @else if $media == mobile {\r\n        @media only screen and (max-width:$break-tablet - 1) {\r\n            @content;\r\n        }\r\n    }\r\n}        \r\n                              \r\n.dashboard {\r\n    width: 100%;    \r\n    padding: 0;\r\n    -moz-box-sizing: border-box;\r\n    -webkit-box-sizing: border-box;\r\n    box-sizing: border-box;\r\n    position: relative;\r\n    border-left: 1px solid #E6E6E6;   \r\n    &-heading {\r\n        font-weight: 100;\r\n        width: 100%;\r\n        text-align: center;\r\n        color: #d0d0d0;\r\n    }\r\n}"
                },
                {
                        "type": "text",
                        "data": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
                }
                ]
    }

    ];
    _.each(_posts, function (_post) {
        _post.id = _.uniqueId('_ORIG_POST');
    })
})();