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
        'bulgarite.users.identity'

    ])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/'});
    }])
    .constant('BASE_URL', 'https://baas.kinvey.com/user/kid_-kan4iP1b-/')
    .constant('KINVEY_CONFIG', {
        'Content-Type': 'application/json',
        'Authorization': 'Basic a2lkXy1rYW40aVAxYi06MDcyZjMwYjg4NjY1NDA0YmE4NjIyMTQ0YmM5OTQxMzc='
    });