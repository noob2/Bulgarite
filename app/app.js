'use strict';

angular.module('bulgarite', [
        'ngRoute',
        'bulgarite.home',
        'bulgarite.history',
        'bulgarite.landmarks',
        'bulgarite.version',
        'bulgarite.population',
        'bulgarite.economy',
        'bulgarite.users.authentication',
        'bulgarite.users.identity',
        'bulgarite.common'
    ])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/'});
    }])
    .constant('BASE_URL', 'https://baas.kinvey.com/user/kid_-kan4iP1b-/')
    .constant('KINVEY_CONFIG', {
        'Authorization': 'Basic cGVzaG86MTIzNA=='
    });