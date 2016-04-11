'use strict';

angular.module('bulgarite.history', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
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
  function($http,$q,KINVEY_CONFIG,$scope) {

    var deferred = $q.defer();

    var articlesRequest = {
      method: 'GET',
      url: 'https://baas.kinvey.com/appdata/kid_-kan4iP1b-/historyArticles',
      headers: KINVEY_CONFIG
    };
    $http(articlesRequest)
        .then(function (response) {

          console.log(response.data);
          $scope.articles = response.data;
        }, function (err) {
        });

    return deferred.promise;

}]);