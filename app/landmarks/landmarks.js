'use strict';

angular.module('landmarks', ['ngRoute'])



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