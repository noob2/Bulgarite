'use strict';

angular.module('bulgarite.economy', ['ngRoute'])

    .config(['$routeProvider','$locationProvider', function($routeProvider,$locationProvider) {
        $routeProvider.when('/economy', {
            templateUrl: 'app/economy/economy.html',
            controller: 'economyController'
        });
        $routeProvider.when('/economy/add-article', {
            templateUrl: 'app/article/addArticle/add-history-article.html',
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
                
                $scope.goToArticle = function (id) {
                    $location.path('article/'+id);
                    console.log(id);
                };
                
                article.getAllArticlesFromCategory('economy')
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