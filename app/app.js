'use strict';

angular.module('bulgarite', [
        'ngRoute',
        'bulgarite.home',
        'bulgarite.history',
        'bulgarite.landmarks',
        'bulgarite.version',
        'bulgarite.population',
        'bulgarite.economy',
        'bulgarite.users.authentication'

    ])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/'});
    }])
    .constant('BASE_URL', 'https://baas.kinvey.com/appdata/kid_-ycTI6Ul1b/books');
