'use strict';

angular.module('bulgarite.population', ['ngRoute'])

    .config(['$routeProvider','$locationProvider', function($routeProvider,$locationProvider) {
        $routeProvider.when('/population', {
            templateUrl: 'app/population/population.html',
            controller: 'populationController'
        });
        $routeProvider.when('/population/add-article', {
            templateUrl: 'app/article/addArticle/addArticle.html',
            controller: 'populationController'
        });
        $locationProvider.html5Mode(true);
    }])

    .controller('populationController', [
        '$http',
        '$q',
        'KINVEY_CONFIG',
        '$scope',
        'article',
        '$location',
        function ($http, $q, KINVEY_CONFIG, $scope, article, $location) {
            if ($location.path().match('population$')){
                
                $scope.goToArticle = function (id) {
                    $location.path('article/'+id);
                    console.log(id);
                };
                
                article.getAllArticlesFromCategory('population')
                    .then(function (articles) {
                        $scope.articles = articles.data;

                    }).finally(function () {
                    $scope.isLoaded = true;
                })
            } else if($location.path().match('population/add-article$')){
                $scope.addArticle = function (art) {
                    article.addArticle(art,'population')
                        .then(function (success) {
                            console.log(success);
                            $location.path('population');
                        });
                };
                $scope.isLoaded = true;
            }

        }]);