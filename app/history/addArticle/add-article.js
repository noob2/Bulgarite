'use strict';

angular.module('bulgarite.history.addArticle', ['ngRoute'])

    .config(['$routeProvider', '$locationProvider', function ($routeProvider) {

        $routeProvider.when('/history/add-article', {
            templateUrl: 'app/history/addArticle/add-article.html',
            controller: 'addHistoryArticleController'
        });
    }])
    .controller('addHistoryArticleController', [
        '$scope',
        'article',
        '$location',
        function ($scope, article, $location) {

            $scope.addArticle = function (art) {
                article.addArticle(art, 'history')
                    .then(function (success) {
                        $location.path('history');
                    });
            };
        }]);