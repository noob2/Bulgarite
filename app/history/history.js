'use strict';

angular.module('bulgarite.history', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {

        $routeProvider.when('/history', {
            templateUrl: 'app/history/history.html',
            controller: 'historyController'
        });
        $routeProvider.when('/history/add-article', {
            templateUrl: 'app/addArticle/addArticle.html',
            controller: 'historyController'
        });
    }])
    .controller('historyController', [
        '$http',
        '$q',
        'KINVEY_CONFIG',
        '$scope',
        'article',
        '$location',
        function ($http, $q, KINVEY_CONFIG, $scope, article, $location) {
            if ($location.path().match('history$')){
                article.getAllHistoryArticles()
                    .then(function (articles) {
                        $scope.articles = articles.data;

                    }).finally(function () {
                    $scope.isLoaded = true;
                })
            } else if($location.path().match('history/add-article$')){
                $scope.addArticle = function (art) {
                    article.addArticle(art,'history')
                        .then(function (success) {
                            console.log(success);
                            $location.path('history');
                        });
                };

                $scope.isLoaded = true;
                console.log(34)
            }

        }]);