'use strict';

angular.module('economy', ['ngRoute'])

    .controller('economyController', [
        '$scope',
        'article',
        '$location',
        function ($scope, article, $location) {
            $scope.goToArticle = function (id) {
                $location.path('article/' + id);
                console.log(id);
            };

            article.getAllArticlesFromCategory('economy')
                .then(function (articles) {
                    $scope.articles = articles.data;
                }).finally(function () {
                $scope.isLoaded = true;
            })
        }]);