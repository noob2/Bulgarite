angular.module('bulgarite.users.authentication', [])
    .factory('authentication', [
        '$http',
        '$q',
        'KINVEY_CONFIG',
        'BASE_URL',
        function ($http, $q, KINVEY_CONFIG, BASE_URL,$scope) {

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
                        sessionStorage.setItem('authorisationToken',response.data._kmd.authtoken);
                        $location.path('/history');
                        $scope.auth = true;
                    }, function (err) {
                        $location.path('/history')
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
                        sessionStorage.setItem('authorisationToken',response.data._kmd.authtoken);
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