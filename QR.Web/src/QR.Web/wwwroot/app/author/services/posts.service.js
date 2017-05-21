(function () {
    "use strict";

    angular.module('QR.Web.Author')
    .service("PostsService", ["$http", "$q", PostsService]);


    /*  RELATED ENUMS */

    //this.category = _.sample(['html', 'css', 'js', 'scss', 'others']);

    var CATEGORY;
    (function (b) {
        b[b["HTML"] = 0] = "HTML";
        b[b["JS"] = 1] = "JS";
        b[b["CSS"] = 2] = "CSS";
        b[b["C#"] = 3] = "C#";
        b[b["Azure"] = 4] = "Azure";
    })(CATEGORY || (CATEGORY = {}));

    function PostsService($http, $q) {

        var getData = function (StartDate, username, EndDate) {

            return $http({
                url: "/api/PostItem/briefs",
                method: "GET"
            }).then(handleSuccess, handleError);
        }

        var handleSuccess = function (response) {
            _.each(response.data, function (item) {
                item.category = CATEGORY[item.categories[0]];
            });
            return response.data;
        }

        var handleError = function (error) {
            console.log(error);
        }        

        return {
            getAllBriefs: getData            
        }
    }

})();