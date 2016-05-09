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

                $http.post(BASE_URL + 'login', user, {
                    headers: {'Authorization': 'Basic cGVzaG86MTIzNA=='}
                }).then(function (response) {
                    sessionStorage.setItem('authorisationToken', response.data._kmd.authtoken);
                    sessionStorage.setItem('name', response.data.user);
                    deferred.resolve(response);
                }, function (err) {
                    deferred.reject(err);
                });

                return deferred.promise;
            }

            function registerUser(user) {
                var deferred = $q.defer();

                $http.post(BASE_URL, user, {
                    headers: {
                        'Authorization': 'Basic a2lkXy1rYW40aVAxYi06MDcyZjMwYjg4NjY1NDA0YmE4NjIyMTQ0YmM5OTQxMzc=',
                        'Content-Type': 'application/json'
                    }
                }).then(function (response) {
                    sessionStorage.setItem('authorisationToken', response.data._kmd.authtoken);
                    sessionStorage.setItem('name', response.data.name);
                    deferred.resolve(response);
                }, function (err) {
                    deferred.resolve(err);
                });

                return deferred.promise;
            }

            function logoutUser() {
                var deferred = $q.defer();

                $http.defaults.headers.common.Authorization = "Kinvey " + sessionStorage['authorisationToken'];
                $http.post(BASE_URL + '_logout', {})
                    .then(function (response) {
                    sessionStorage.clear();
                    deferred.resolve(response);
                }, function (err) {
                    deferred.resolve(err);
                });

                return deferred.promise;
            }

            function isLoggedIn() {
                return sessionStorage['authorisationToken'] !== undefined;
            }

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

            return {
                registerUser: registerUser,
                loginUser: loginUser,
                logoutUser: logoutUser,
                isLoggedIn: isLoggedIn
            }
        }
    ]);