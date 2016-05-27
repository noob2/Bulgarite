'use strict';

angular.module('bulgarite.landmarks', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/landmarks', {
            templateUrl: 'app/landmarks/landmarks.html',
            controller: 'landmarksController'
        });
        $routeProvider.when('/landmarks/add-article', {
            templateUrl: 'app/addArticle/addArticle.html',
            controller: 'landmarksController'
        });
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