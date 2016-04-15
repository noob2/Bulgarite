'use strict';

angular.module('bulgarite.home', ['bulgarite.users.authentication'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'app/home/home.html',
            controller: 'homeController'
        });
    }])

    .controller('homeController', [
        '$scope',
        'authentication',
        'identity',
        'mainController',
        '$route',
        function ($scope, authentication, identity, mainController) {
            mainController.set();
            
            $scope.loginUser = function (user) {
                authentication.loginUser(user);
            };

            $scope.registerUser = function (user) {
                authentication.registerUser(user);
            };

            $scope.$parent.logoutUser = function () {
                authentication.logoutUser();
            };
        }]);