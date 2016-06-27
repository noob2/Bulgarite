'use strict';

angular.module('bulgarite.landmarks.addArticle', ['ngRoute'])

    .config(['$routeProvider', '$locationProvider', function ($routeProvider) {

        $routeProvider.when('/landmarks/add-article', {
            templateUrl: 'app/landmarks/addArticle/add-article.html',
            controller: 'addLandmarkArticleController'
        });
    }])
    .controller('addLandmarkArticleController', [
        '$scope',
        'article',
        '$location',
        function ($scope, article, $location) {

            $scope.addLandmarkArticle = function (art, parallel, meridian) {
                article.addLandmarkArticle(art, parallel, meridian)
                    .then(function (success) {
                        console.log(success);
                        $location.path('/landmarks');
                    });
            };
        }]);