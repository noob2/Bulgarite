'use strict';

angular.module('bulgarite.home', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'app/home/home.html',
            controller: 'homeController'
        });
    }])

    .controller('homeController', [
        '$scope',
        '$rootScope',
        'authentication',
        '$route',
        function ($scope, $rootScope, authentication, $route) {
            $rootScope.isLoggedIn = authentication.isLoggedIn();

            if ($scope.isLoggedIn) {
                $scope.user = sessionStorage['name'];
                $scope.$parent.logoutUser = function () {
                    authentication.logoutUser().then(function (response) {
                        console.log(response)
                        $route.reload();
                    });
                };
            } else {

                $scope.loginUser = function (user) {
                    authentication.loginUser(user)
                        .then(function (data) {
                            console.log(data)
                            $route.reload();
                        });
                };

                $scope.registerUser = function (user) {
                    authentication.registerUser(user)
                        .then(function (data) {
                            console.log(data)
                            $route.reload();
                        });
                };
            }
        }]);