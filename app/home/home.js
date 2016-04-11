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
        function ($scope, authentication) {

            $scope.loginUser = function (user) {
                authentication.loginUser(user);
            };
            
            $scope.registerUser = function (user) {
                authentication.registerUser(user);
            }
            
        }]);