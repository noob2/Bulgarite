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

            $scope.shouldSetCoordinates = true;
            $scope.addLandmarkArticle = function (art, parallel, meridian) {
                console.log(art)
                // article.addLandmarkArticle(art, parallel, meridian)
                //     .then(function (success) {
                //         console.log(success);
                //         $location.path('/landmarks');
                //     });
            };
        }]);