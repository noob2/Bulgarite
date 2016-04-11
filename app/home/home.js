'use strict';

angular.module('bulgarite.home', ['bulgarite.users.authentication'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'app/home/home.html',
            controller: 'homeController'
        });
    }])

    .controller('homeController', ['$scope', function ($scope) {
        $scope.loginUser = function (user) {
            console.log(user);
        };
        $scope.registerUser = function (user) {
            console.log(user);
        }
    }]);