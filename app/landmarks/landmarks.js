'use strict';

angular.module('bulgarite.landmarks', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/landmarks', {
            templateUrl: 'app/landmarks/landmarks.html',
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
            console.log(4)
            if ($location.path().match('landmarks$')) {

                article.getAllLandmarksArticles()
                    .then(function (articles) {
                        $scope.articles = articles.data;
                    }).finally(function () {
                    $scope.isLoaded = true;
                })
            } else if ($location.path().match('history/add-article$')) {
                $scope.addArticle = function (art) {
                    article.addArticle(art, 'history')
                        .then(function (success) {
                            console.log(success);
                            $location.path('history');
                        });
                };

                $scope.isLoaded = true;
                console.log(34)
            }

        }]);