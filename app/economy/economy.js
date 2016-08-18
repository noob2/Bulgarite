'use strict';

angular.module('bulgarite.economy', ['ngRoute'])

    .config(['$routeProvider', '$locationProvider', function ($routeProvider) {
        $routeProvider.when('/economy', {
            templateUrl: 'app/economy/economy.html',
            controller: 'economyController'
        });
    }])

    .controller('economyController', [
        '$http',
        '$q',
        'KINVEY_CONFIG',
        '$scope',
        'article',
        '$location',
        function ($http, $q, KINVEY_CONFIG, $scope, article, $location) {
            $scope.goToArticle = function (id) {
                $location.path('article/' + id);
                console.log(id);
            };

            article.getAllArticlesFromCategory('economy')
                .then(function (articles) {
                    $scope.articles = articles.data;
                }).finally(function () {
                $scope.isLoaded = true;
            })
        }]);