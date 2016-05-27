'use strict';

angular.module('bulgarite.economy', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/economy', {
            templateUrl: 'app/economy/economy.html',
            controller: 'economyController'
        });
        $routeProvider.when('/economy/add-article', {
            templateUrl: 'app/addArticle/addArticle.html',
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
            if ($location.path().match('economy$')){
                article.getAllEconomyArticles()
                    .then(function (articles) {
                        $scope.articles = articles.data;

                    }).finally(function () {
                    $scope.isLoaded = true;
                })
            } else if($location.path().match('economy/add-article$')){
                $scope.addArticle = function (art) {
                    article.addArticle(art,'economy')
                        .then(function (success) {
                            console.log(success);
                            $location.path('economy');
                        });
                };
                $scope.isLoaded = true;
            }

        }]);