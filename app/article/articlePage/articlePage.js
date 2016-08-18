'use strict';

angular.module('bulgarite.article.page', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/article/:id', {
            templateUrl: 'app/article/articlePage/articlePage.html',
            controller: 'articlePageController'
        });
    }])

    .controller('articlePageController', [
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

            $scope.editArticle = function (category) {

                $location.path(category + '/article/' + $routeParams.id + '/editArticle');
            }
        }]);