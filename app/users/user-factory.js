'use strict';

angular.module('factory.authentication', [])
    .factory('authentication', [
        '$http',
        '$q',
        'KINVEY_CONFIG',
        'BASE_USER_URL',
        'toasty',
        function ($http, $q, KINVEY_CONFIG, BASE_USER_URL, toasty) {

            const minUsernameLength = 4;
            const minPasswordLength = 4;
            const minNameLength = 3;

            function loginUser(user) {
                var deferred = $q.defer();

                if (user.username.length < minUsernameLength || user.password.length < minPasswordLength) {
                    if (user.username.length < minUsernameLength) {

                        toasty.error({
                            title: 'invalid username !',
                            msg: "username must be minimum " + minUsernameLength + " symbols"
                        });
                    }
                    if (user.password.length < minPasswordLength) {
                        toasty.error({
                            title: 'invalid password !',
                            msg: "password must be minimum " + minUsernameLength + " symbols"
                        });
                    }
                } else {
                    $http.defaults.headers.common.Authorization = KINVEY_CONFIG['MasterCredentials'];
                    $http.post(BASE_USER_URL + 'login', user, {})
                        .then(function (response) {
                            sessionStorage.setItem('authorisationToken', response.data._kmd.authtoken);
                            sessionStorage.setItem('name', response.data.name);
                            sessionStorage.setItem('UserCredentials', btoa(user.username + ':' + user.password));
                            sessionStorage.setItem('UserID', response.data._id);
                            deferred.resolve(response);
                        }, function (err) {
                            deferred.reject(err);
                        });
                }
                return deferred.promise;
            }

            function registerUser(user) {

                var deferred = $q.defer();

                if (user.username.length < minUsernameLength || user.password.length < minPasswordLength || user.name.length < minNameLength) {
                    if (user.username.length < minUsernameLength) {

                        toasty.error({
                            title: 'invalid username !',
                            msg: "username must be minimum " + minUsernameLength + " symbols"
                        });
                    }
                    if (user.password.length < minPasswordLength) {
                        toasty.error({
                            title: 'invalid password !',
                            msg: "password must be minimum " + minUsernameLength + " symbols"
                        });
                    }
                    if (user.name.length < minNameLength) {
                        toasty.error({
                            title: 'invalid name !',
                            msg: "Your name must be minimum " + minNameLength + " symbols"
                        });
                    }
                } else {
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
                }

                return deferred.promise;
            }

            function logoutUser() {
                var deferred = $q.defer();

                $http.defaults.headers.common.Authorization = 'Kinvey ' + sessionStorage['authorisationToken'];
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