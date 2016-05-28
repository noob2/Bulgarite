'use strict';

angular.module('bulgarite.article', ['ngRoute'])

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
                    console.log(article);
                }).finally(function () {
                $scope.isLoaded = true;
            });

            $scope.editArticle = function () {
                $location.path('article/'+$routeParams.id+'/editArticle');
            }
        }]);