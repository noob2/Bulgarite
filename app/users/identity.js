angular.module('bulgarite.users.identity', [])
    .factory('identity', [
        '$http',
        'BASE_URL',
        function ($http, BASE_URL) {
            var accessToken = '7b859563-065c-4003-8269-86c761508940.L82pXRh5NmdtJCycLmw0D+eIBXiu1gLxgvcA90o0iO8=';

            $http.defaults.headers.common.Authorisation = 'Kinvey ' + accessToken;
            $http.get(BASE_URL + '_me')
                .then(function (response) {
                    console.log(response);
                }, function (err) {
                    console.log(err);
                })
        }
    ]);