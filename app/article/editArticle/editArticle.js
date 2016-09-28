'use strict';

angular.module('article.editArticle', ['ngRoute'])

    .controller('editArticleController', [
        '$scope',
        '$route',
        'article',
        '$routeParams',
        function ($scope, $route, article, $routeParams) {
            $scope.shouldSetCoordinates = true;
            var articleType = $routeParams.articleType;
            $scope.articleType = articleType;

            article.getArticleById($routeParams.id)
                .then(function (article) {
                    $scope.article = article.data;
                }).finally(function () {
                $scope.isLoaded = true;
            });

            $scope.editArticle = function (art) {

                if (articleType == 'landmarks') {
                    var $parallel = $("#parallel");
                    var $meridian = $("#meridian");
                    art.coordinate = {};
                    art.coordinate.parallel = $parallel.val();
                    art.coordinate.meridian = $meridian.val();
                }

                article.editArticle(art, $routeParams.id)
                    .then(function (success) {
                        history.back();
                    });
            };
        }]);