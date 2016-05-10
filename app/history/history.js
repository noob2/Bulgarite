'use strict';

angular.module('bulgarite.history', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {

        $routeProvider.when('/history', {
            templateUrl: 'app/history/history.html',
            controller: 'historyController'
        });
    }])
    .controller('historyController', [
        '$http',
        '$q',
        'KINVEY_CONFIG',
        '$scope',
        'article',
        function ($http, $q, KINVEY_CONFIG, $scope, article) {
            article.getAllHistoryArticles()
                .then(function (articles) {
                    $scope.articles = articles.data;
                }).finally(function () {
                $scope.isLoaded = true;
            })
        }]);