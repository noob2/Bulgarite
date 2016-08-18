angular.module('bulgarite.users.authentication', [])
    .factory('authentication', [
        '$http',
        '$q',
        'KINVEY_CONFIG',
        'BASE_USER_URL',
        function ($http, $q, KINVEY_CONFIG, BASE_USER_URL) {

            function loginUser(user) {
                var deferred = $q.defer();

                $http.defaults.headers.common.Authorization = KINVEY_CONFIG['MasterCredentials'];
                $http.post(BASE_USER_URL + 'login', user, {})
                    .then(function (response) {
                        sessionStorage.setItem('authorisationToken', response.data._kmd.authtoken);
                        sessionStorage.setItem('name', response.data.name);
                        sessionStorage.setItem('UserCredentials', btoa(user.username + ':' + user.password));
                        deferred.resolve(response);
                    }, function (err) {
                        deferred.reject(err);
                    });

                return deferred.promise;
            }

            function registerUser(user) {
                var deferred = $q.defer();

                $http.defaults.headers.common.Authorization = KINVEY_CONFIG['MasterCredentials'];
                $http.post(BASE_USER_URL, user, {
                    headers: {
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

                $http.defaults.headers.common.Authorization = KINVEY_CONFIG['CurrentUserAuthToken'];
                $http.post(BASE_USER_URL + '_logout', {})
                    .then(function (response) {
                        sessionStorage.clear();
                        deferred.resolve(response);
                    }, function (err) {
                        deferred.resolve(err);
                    });

                return deferred.promise;
            }

            function getUserByID(ID) {
                var deferred = $q.defer();

                $http.defaults.headers.common.Authorization = KINVEY_CONFIG['CurrentUserAuthToken'];
                $http.get(BASE_USER_URL + ID, {})
                    .then(function (response) {
                        deferred.resolve(response);
                    }, function (err) {
                        deferred.resolve(err);
                    });

                return deferred.promise;
            }

            function isLoggedIn() {
                return !!sessionStorage['authorisationToken'];
            }

            return {
                registerUser: registerUser,
                loginUser: loginUser,
                logoutUser: logoutUser,
                isLoggedIn: isLoggedIn,
                getUserByID: getUserByID
            }
        }
    ]);