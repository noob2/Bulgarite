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
        '$location',
        function ($scope, $rootScope, authentication, $route, article, $location) {
            article.getLatestArticles(4)
                .then(function (articles) {
                    $scope.articles = articles.data;
                    console.log(articles)
                }).finally(function () {
                $scope.isLoaded = true;
            });

            $scope.goToArticle = function (id) {
                $location.path('article/'+id);
                console.log(id);
            };
            
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