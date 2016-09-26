'use strict';

angular.module('population', ['ngRoute'])

    .controller('populationController', [
        '$http',
        '$q',
        'KINVEY_CONFIG',
        '$scope',
        'article',
        '$location',
        function ($http, $q, KINVEY_CONFIG, $scope, article, $location) {

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