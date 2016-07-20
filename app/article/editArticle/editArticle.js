'use strict';

angular.module('bulgarite.article.editArticle', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/:articleType/article/:id/editArticle', {
            templateUrl: 'app/article/editArticle/editArticle.html',
            controller: 'editArticleController'
        });
    }])

    .controller('editArticleController', [
        '$scope',
        '$rootScope',
        'authentication',
        '$route',
        'article',
        '$routeParams',
        '$location',
        function ($scope, $rootScope, authentication, $route, article, $routeParams, $location) {
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

                article.editArticle(art,$routeParams.id)
                    .then(function (success) {
                        history.back();
                    });
            };
        }]);