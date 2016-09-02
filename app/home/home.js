'use strict';

angular.module('bulgarite.home', ['ngRoute'])

    .config(['$routeProvider','$locationProvider', function ($routeProvider,$locationProvider) {
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
        'toasty',
        function ($scope, $rootScope, authentication, $route, article, $location, toasty) {
            toasty.error({
                title: 'User added!',
                msg: ' has been added!'
            });

            article.getLatestArticles(6)
                .then(function (articles) {
                    $scope.latestArticles = articles.data;
                }).finally(function () {
                $scope.isLoaded = true;
            });

            $scope.goToArticle = function (id) {
                $location.path('article/'+id);
            };

            if ($scope.isLoggedIn) {
                $scope.user = sessionStorage['name'];
            }

        }]);