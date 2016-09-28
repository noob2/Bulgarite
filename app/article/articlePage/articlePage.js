'use strict';

angular.module('article.page', ['ngRoute'])

    .controller('articlePageController', [
        '$scope',
        '$route',
        'article',
        '$routeParams',
        '$location',
        function ($scope, $route, article, $routeParams, $location) {

            article.getArticleById($routeParams.id)
                .then(function (article) {
                    $scope.article = article.data;
                }).finally(function () {
                $scope.isLoaded = true;
            });

            $scope.editArticle = function (article) {
                $location.path(article.category + '/article/' + $routeParams.id + '/editArticle');
            };

            $scope.deleteArticle = function () {
                article.deleteArticle($routeParams.id)
                    .then(function () {
                        history.back();
                    })
            }
        }]);