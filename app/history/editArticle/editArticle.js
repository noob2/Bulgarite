'use strict';

angular.module('bulgarite.history.editArticle', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/history/article/:id/editArticle', {
            templateUrl: 'app/history/editArticle/editArticle.html',
            controller: 'editHistoryArticleController'
        });
    }])

    .controller('editHistoryArticleController', [
        '$scope',
        '$rootScope',
        'authentication',
        '$route',
        'article',
        '$routeParams',
        '$location',
        function ($scope, $rootScope, authentication, $route, article, $routeParams, $location) {
            article.getArticleById($routeParams.id)
                .then(function (article) {
                    $scope.article = article.data;
                }).finally(function () {
                $scope.isLoaded = true;
            });

            $scope.editArticle = function (art) {
                article.editHistoryArticle(art)
                    .then(function (success) {
                        $location.path('/history');
                    });
            };
        }]);