angular.module('bulgarite.users.authentication', [])
    .factory('authentication', [
        '$http',
        '$q',
        'KINVEY_CONFIG',
        'BASE_URL',
        '$route',
        function ($http, $q, KINVEY_CONFIG, BASE_URL, $route) {

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
                        sessionStorage.setItem('authorisationToken', response.data._kmd.authtoken);
                        sessionStorage.setItem('user', response.data.name);

                        $route.reload();
                    }, function (err) {
                        console.log(err);
                    });

                return deferred.promise;
            }

            function registerUser(user) {
                var deferred = $q.defer();

                var registerRequest = {
                    method: 'POST',
                    url: BASE_URL,
                    headers: {
                        'Authorization': 'Basic a2lkXy1rYW40aVAxYi06MDcyZjMwYjg4NjY1NDA0YmE4NjIyMTQ0YmM5OTQxMzc=',
                        'Content-Type': 'application/json'
                    },
                    data: user
                };

                $http(registerRequest)
                    .then(function (response) {
                        sessionStorage.setItem('authorisationToken', response.data._kmd.authtoken);
                        sessionStorage.setItem('user', response.data.name);

                        $route.reload();
                    }, function (err) {
                        console.log(err);
                    });

                return deferred.promise;
            }

            function logoutUser() {
                var deferred = $q.defer();

                var logoutRequest = {
                    method: 'POST',
                    url: BASE_URL + '_logout',
                    headers: {'Authorization': 'Kinvey ' + sessionStorage['authorisationToken']}
                };

                $http(logoutRequest)
                    .then(function (response) {

                        sessionStorage.clear();
                        $route.reload();
                    }, function (err) {

                        sessionStorage.clear();
                        $route.reload();
                        console.log(err);
                    });

                return deferred.promise;
            }

            return {
                registerUser: registerUser,
                loginUser: loginUser,
                logoutUser: logoutUser
            }
        }
    ]);