(function () {
    "use strict";

    angular.module('QR.Web.Author')
    .service("PostsService", ["$http", "$q", PostsService]);


    /*  RELATED ENUMS */

    //this.category = _.sample(['html', 'css', 'js', 'scss', 'others']);

    var _newPostSample = {
        "title": "Lorem Ipsum Dolor Sit Amet",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        "tags": ["html5", "material", "js", "css"],
        "category": 0,
        "contentItems": [
            {
                "type": 0,
                "data": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
            },
            {
                "type": 1,
                "lang": 0,
                "flaskLang": 0,
                "data": "$(document).ready(function () {\r\n    var flask = new CodeFlask;\r\n    flask.run('#coder', { language: 'javascript', rtl: false });\r\n    flask.onUpdate(function (code) {\r\n        document.getElementById('display').innerHTML \r\n\t= Prism.highlight(code, Prism.languages.javascript);\r\n    });\r\n})"
            }
        ]
    };

    var CATEGORY;
    (function (b) {
        b[b["HTML"] = 0] = "HTML";
        b[b["JS"] = 1] = "JS";
        b[b["CSS"] = 2] = "CSS";
        b[b["SCSS"] = 3] = "SCSS";
        b[b["CSHARP"] = 4] = "CSHARP";
        b[b["AZURE"] = 5] = "AZURE";
    })(CATEGORY || (CATEGORY = {}));

    var ContentItemType;
    (function (b) {
        b[b["text"] = 0] = "text";
        b[b["flask"] = 1] = "flask";
    })(ContentItemType || (ContentItemType = {}));

    var ContentItemFlaskType;
    (function (b) {
        b[b["javascript"] = 0] = "javascript";
        b[b["markup"] = 1] = "markup";
        b[b["css"] = 2] = "css";
    })(ContentItemFlaskType || (ContentItemFlaskType = {}));

    var ContentItemLanguage;
    (function (b) {
        b[b["javascript"] = 0] = "javascript";
        b[b["markup"] = 1] = "markup";
        b[b["css"] = 2] = "css";
        b[b["htm"] = 3] = "htm";
        b[b["scss"] = 4] = "scss";
    })(ContentItemLanguage || (ContentItemLanguage = {}));

    function PostsService($http, $q) {

        var getAllBriefs = function (StartDate, username, EndDate) {

            return $http({
                url: "/api/PostItem/briefs",
                method: "GET"
            }).then(handleSuccessAndMapForAllBriefs, handleError);
        }

        var getPostData = function (id) {
            return $http({
                url: "/api/PostItem/" + id,
                method: "GET"
            }).then(handleSuccessForSinglePostAndMap, handleError);
        }

        var getSampleNewPost = function () {
            var response = { data: _newPostSample };
            return handleSuccessForSinglePostAndMap(response);
        }

        var updatePost = function (data) {
            var post = angular.copy(data);
            if (post) {
                post.category = CATEGORY[post.category];
                _.each(post.contentItems, function (_content, _iter) {
                    delete _content.uid;
                    delete _content.index;
                    _content.type = ContentItemType[_content['type']];
                    if (typeof _content.lang !== 'undefined' && _content.lang != null) _content.lang = ContentItemLanguage[_content.lang];
                    if (typeof _content.flaskLang !== 'undefined' && _content.flaskLang != null) _content.flaskLang = ContentItemFlaskType[_content.flaskLang];
                });
            }
            console.log(post);
            return $http({
                url: "/api/PostItem/" + data.id,
                method: "PUT",
                data: JSON.stringify(post)
            }).then(handleSuccess, handleError);
        }

        var addPost = function (data) {            
            var post = angular.copy(data);
            if (post) {
                post.category = CATEGORY[post.category];
                _.each(post.contentItems, function (_content, _iter) {
                    delete _content.uid;
                    delete _content.index;
                    _content.type = ContentItemType[_content['type']];
                    if (typeof _content.lang !== 'undefined' && _content.lang != null) _content.lang = ContentItemLanguage[_content.lang];
                    if (typeof _content.flaskLang !== 'undefined' && _content.flaskLang != null) _content.flaskLang = ContentItemFlaskType[_content.flaskLang];
                });
                post["author"] = {
                    "alias": "asitparida"
                };                
            }            
            return $http({
                url: "/api/PostItem",
                method: "POST",
                data: JSON.stringify(post)
            }).then(handleSuccess, handleError);
        }

        var handleSuccessForSinglePostAndMap = function (response) {
            if (response.data) {
                response.data.category = CATEGORY[response.data.category];
                _.each(response.data.contentItems, function (_content, _iter) {
                    _content.uid = _content['contentItemId'] || _.uniqueId('_flask_content_');
                    _content.index = _iter;
                    _content.type = ContentItemType[_content['type']];
                    if (typeof _content.lang !== 'undefined' && _content.lang != null) _content.lang = ContentItemLanguage[_content.lang];
                    if (typeof _content.flaskLang !== 'undefined' && _content.flaskLang != null) _content.flaskLang = ContentItemFlaskType[_content.flaskLang];
                });
            }
            return response.data;
        }

        var handleSuccessAndMapForAllBriefs = function (response) {
            _.each(response.data, function (item) {
                item.category = CATEGORY[item.category];
            });
            return response.data;
        }

        var handleSuccess = function (response) {
            return response.data;
        }

        var handleError = function (error) {
            console.log(error);
        }

        return {
            getAllBriefs: getAllBriefs,
            getPostData: getPostData,
            getSampleNewPost: getSampleNewPost,
            updatePost: updatePost,
            addPost: addPost
        }
    }

})();