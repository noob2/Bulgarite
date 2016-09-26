'use strict';

angular.module('history', ['ngRoute'])
    .controller('historyController', [
        '$scope',
        'article',
        '$location',
        function ($scope, article, $location) {

            $scope.slider = {
                min: -1500,
                max: 2020,
                options: {
                    floor: -1500
                }
            };

            $scope.$on("slideEnded", function () {
                $scope.isLoaded = false;
                article.getAllHistoryArticlesFromPeriod($scope.slider.min, $scope.slider.max)
                    .then(function (articles) {
                        console.log(articles)
                        $scope.articles = articles.data;
                    }).finally(function () {
                    $scope.isLoaded = true;
                })
            });

            $scope.goToArticle = function (id) {
                $location.path('article/' + id);
            };

            article.getAllArticlesFromCategory('history')
                .then(function (articles) {
                    $scope.articles = articles.data;
                }).finally(function () {
                $scope.isLoaded = true;
            });
        }]);