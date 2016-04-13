angular.module('bulgarite.users.authentication', [])
    .factory('authentication', [
        '$http',
        '$q',
        'KINVEY_CONFIG',
        'BASE_URL',
        function ($http, $q, KINVEY_CONFIG, BASE_URL) {

            function loginUser(user) {
                var deferred = $q.defer();

                var loginRequest = {
                    method: 'POST',
                    url: BASE_URL + 'login',
                    headers: KINVEY_CONFIG,
                    data: user
                };

                $http(loginRequest)
                    .then(function (response) {
                        console.log(response.data._kmd.authtoken);
                    }, function (err) {
                });

                return deferred.promise;
            }

            function registerUser(user) {
                var deferred = $q.defer();

                var registerRequest = {
                    method: 'POST',
                    url: BASE_URL,
                    headers: KINVEY_CONFIG,
                    data: user
                };

                $http(registerRequest)
                    .then(function (response) {
                        console.log(response);
                    }, function (err) {
                });

                return deferred.promise;
            }

            return {
                registerUser: registerUser,
                loginUser: loginUser
                // logoutUser: logoutUser
            }
        }
    ]);