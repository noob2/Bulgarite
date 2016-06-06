'use strict';

angular.module('bulgarite.landmarks', ['ngRoute'])

    .config(['$routeProvider','$locationProvider', function ($routeProvider,$locationProvider) {
        $routeProvider.when('/landmarks', {
            templateUrl: 'app/landmarks/landmarks.html',
            controller: 'landmarksController'
        });
        $routeProvider.when('/landmarks/add-article', {
            templateUrl: 'app/article/addArticle/addArticle.html',
            controller: 'landmarksController'
        });
        $locationProvider.html5Mode(true);
    }])

    .controller('landmarksController', [
        '$http',
        '$q',
        'KINVEY_CONFIG',
        '$scope',
        'article',
        '$location',
        function ($http, $q, KINVEY_CONFIG, $scope, article, $location) {

            if ($location.path().match('landmarks$')) {
                $scope.goToArticle = function (id) {
                    $location.path('article/'+id);
                    console.log(id);
                };
                
                article.getAllArticlesFromCategory('landmarks')
                    .then(function (articles) {
                        $scope.articles = articles.data;
                    }).finally(function () {
                    $scope.isLoaded = true;
                })
            } else if ($location.path().match('landmarks/add-article$')) {
                $scope.addArticle = function (art) {
                    article.addArticle(art, 'landmarks')
                        .then(function (success) {
                            console.log(success);
                            $location.path('landmarks');
                        });
                };
                $scope.isLoaded = true;
            }
        }]);