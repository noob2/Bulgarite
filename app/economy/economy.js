'use strict';

angular.module('myApp.economy', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/economy', {
            templateUrl: 'app/economy/economy.html',
            controller: 'economyController'
        });
    }])

    .controller('economyController', [function() {

    }]);