angular.module('bulgarite.users.authentication', [])
    .factory('authentication', [
        '$http',
        'q',
        function ($http, $q, BASE_URL) {
            function registerUser(user) {
                var deferred = $q.defer();

                $http.post(BASE_URL + 'users/register', user)
                    .then(function (response) {
                        deferred.resolve(response.data);
                    }, function (error) {
                    });

                return deferred.promise;
            }

            function loginUser(user) {

            }

            function logoutUser() {

            }

            return {
                registerUser: registerUser,
                loginUser: loginUser,
                logoutUser: logoutUser
            }
        }


    ]);