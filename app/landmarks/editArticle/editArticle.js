'use strict';

angular.module('bulgarite.landmarks.editArticle', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/landmarks/article/:id/editArticle', {
            templateUrl: 'app/landmarks/editArticle/editArticle.html',
            controller: 'editLandmarksArticleController'
        });
    }])

    .controller('editLandmarksArticleController', [
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

            $scope.editLandmarkArticle = function (art, parallel, meridian) {
                console.log(art, parallel, meridian);
                article.editLandmarkArticle(art, parallel, meridian, $routeParams.id)
                    .then(function (success) {
                        console.log(success);
                        $location.path('/landmarks');
                    });
            };
        }]);