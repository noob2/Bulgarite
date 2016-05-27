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
        'article',
        function ($scope, $rootScope, authentication, $route, article) {

                article.getLastArticles(3)
                    .then(function (articles) {
                        console.log(articles)
                    });
            
            if ($scope.isLoggedIn) {
                $scope.user = sessionStorage['name'];

            } else {
                $scope.loginUser = function (user) {
                    authentication.loginUser(user)
                        .then(function (data) {
                            $route.reload();
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