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
        'identity',
        'mainController',
        function ($http, $q, KINVEY_CONFIG, $scope, identity, mainController) {
            mainController.set();
            if (identity.isAuthenicated()) {
                $scope.loading = true;

                var deferred = $q.defer();

                var articlesRequest = {
                    method: 'GET',
                    url: 'https://baas.kinvey.com/appdata/kid_-kan4iP1b-/historyArticles',
                    headers: KINVEY_CONFIG
                };

                $http(articlesRequest)
                    .then(function (response) {
                        $scope.articles = response.data;
                        $scope.loading = false;
                    }, function (err) {
                        $scope.articles = 'Articles not found';
                        $scope.loading = false;
                    });
                return deferred.promise;
            }
        }]);