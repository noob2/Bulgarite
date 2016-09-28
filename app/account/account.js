'use strict';

angular.module('account', ['ngRoute'])
    .controller('accountController', [
        '$scope',
        'authentication',
        '$route',
        function ($scope, authentication, $route) {

            if ($scope.isLoggedIn) {
                $scope.user = sessionStorage['name'];

            } else {
                $scope.loginUser = function (user) {
                    authentication.loginUser(user)
                        .then(function (data) {
                            history.back();
                        }, function (err) {
                            console.log(err)
                        });
                };

                $scope.registerUser = function (user) {
                    authentication.registerUser(user)
                        .then(function (data) {
                            $route.reload();
                        });
                };
            }
        }]);