angular.module('bulgarite.users.identity', [])
    .factory('identity', [
        '$http',
        'BASE_URL',
        '$q',
        function ($http, BASE_URL, $q) {

            // function isAuthenicated() {
            //     var deferred = $q.defer();
            //
            //     var authorisationRequest = {
            //         method: 'GET',
            //         url: BASE_URL + '_me',
            //         headers: {'Authorization': 'Kinvey ' + sessionStorage.getItem('authorisationToken')}
            //     };
            //
            //     $http(authorisationRequest)
            //         .then(function (response) {
            //             if (response.statusText == 'OK') {
            //                 deferred.resolve(true);
            //             }
            //         }, function () {
            //             deferred.resolve(false);
            //         });
            //     return deferred.promise;
            // }

            function isAuthenicated() {
                return sessionStorage['authorisationToken'] !== undefined;
            }

            return {
                isAuthenicated: isAuthenicated
            }
        }
    ]);