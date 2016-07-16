'use strict';

angular.module('bulgarite.account', ['ngRoute'])

    .config(['$routeProvider','$locationProvider', function ($routeProvider) {
        $routeProvider.when('/account', {
            templateUrl: 'app/account/account.html',
            controller: 'accountController'
        });
    }])

    .controller('accountController', [
        '$scope',
        '$rootScope',
        'authentication',
        '$route',
        'article',
        '$location',
        function ($scope, $rootScope, authentication, $route, article, $location) {

            if ($scope.isLoggedIn) {
                $scope.user = sessionStorage['name'];

            } else {
                $scope.loginUser = function (user) {
                    authentication.loginUser(user)
                        .then(function (data) {
                            history.back();
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