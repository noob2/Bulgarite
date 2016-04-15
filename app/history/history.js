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
        function ($http, $q, KINVEY_CONFIG, $scope) {
            if ($scope.authenicated) {

                var deferred = $q.defer();
                var articlesRequest = {
                    method: 'GET',
                    url: 'https://baas.kinvey.com/appdata/kid_-kan4iP1b-/historyArticles',
                    headers: KINVEY_CONFIG
                };
                $http(articlesRequest)
                    .then(function (response) {
                        $scope.articles = response.data;
                    }, function (err) {
                        $scope.articles = 'Articles not found';
                    });
                return deferred.promise;
                
            } else {
                
                $scope.unauthorised = 'Please log in to see the history articles';
            }
        }]);