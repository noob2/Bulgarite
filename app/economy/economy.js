'use strict';

angular.module('bulgarite.economy', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/economy', {
            templateUrl: 'app/economy/economy.html',
            controller: 'economyController'
        });
    }])

    .controller('economyController', [function() {

    }]);