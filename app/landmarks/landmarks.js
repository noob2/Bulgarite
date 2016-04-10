'use strict';

angular.module('myApp.landmarks', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/landmarks', {
    templateUrl: 'app/landmarks/landmarks.html',
    controller: 'landmarksController'
  });
}])

.controller('landmarksController', [function() {

}]);