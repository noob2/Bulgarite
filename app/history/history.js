'use strict';

angular.module('myApp.history', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/history', {
    templateUrl: 'app/history/history.html',
    controller: 'historyController'
  });
}])

.controller('historyController', [function() {

}]);