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
        '$q',
        function ($scope, authentication, identity, $q) {

            if (identity.isAuthenicated()) {
                
            } else {
                $scope.unauthorised = 'Please log in to see the history articles';
            }


            $scope.loginUser = function (user) {
                authentication.loginUser(user);
            };

            $scope.registerUser = function (user) {
                authentication.registerUser(user);
            };

        }]);