(function () {
    "use strict";

    angular.module('QR.Web.Author')
    .service("SampleGet", ["$http", "$q", SampleGetService]);

    function SampleGetService($http, $q) {

        var getData = function (StartDate, username, EndDate) {

            return $http({
                url: "/Author/GetTextFileContents",
                method: "GET"
            }).then(handleSuccess, handleError);
        }

        var handleSuccess = function (response) {
            console.log('Success');
            console.log(JSON.stringify(response.data));
            return response.data;
        }

        var handleError = function (error) {
            console.log(error);
        }        

        return {
            get: getData            
        }
    }

})();