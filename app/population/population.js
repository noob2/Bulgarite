'use strict';

angular.module('myApp.population', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/population', {
            templateUrl: 'app/population/population.html',
            controller: 'populationController'
        });
    }])

    .controller('populationController', [function() {

    }]);