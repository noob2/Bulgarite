'use strict';

angular.module('bulgarite.landmarks', ['ngRoute'])

    .config(['$routeProvider', '$locationProvider', function ($routeProvider) {
        $routeProvider.when('/landmarks', {
            templateUrl: 'app/landmarks/landmarks.html',
            controller: 'landmarksController'
        });
    }])

    .controller('landmarksController', [
        '$scope',
        'article',
        '$location',
        function ($scope, article, $location) {
            
            $scope.goToArticle = function (id) {
                $location.path('article/' + id);
            };

            article.getAllArticlesFromCategory('landmarks')
                .then(function (articles) {
                    $scope.articles = articles.data;
                }).finally(function () {
                $scope.isLoaded = true;
            });
        }]);