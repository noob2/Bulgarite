'use strict';

angular.module('population', ['ngRoute'])

    .controller('populationController', [
        '$scope',
        'article',
        '$location',
        function ($scope, article, $location) {

            $scope.goToArticle = function (id) {
                $location.path('article/' + id);
            };

            article.getAllArticlesFromCategory('population')
                .then(function (articles) {
                    $scope.articles = articles.data;

                }).finally(function () {
                $scope.isLoaded = true;
            })

        }]);