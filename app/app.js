'use strict';

angular.module('bulgarite', [
    'ngRoute',
    'rzModule',
    'bulgarite.home',
    'bulgarite.history',
    'bulgarite.landmarks',
    'bulgarite.population',
    'bulgarite.economy',
    'bulgarite.article',
    'bulgarite.users.authentication',

    'bulgarite.factory.article',

    'bulgarite.version'
])
    .config(['$routeProvider','$locationProvider', function ($routeProvider,$locationProvider) {
        $routeProvider.otherwise({redirectTo: '/'});
        $locationProvider.html5Mode(true);
    }])
    .constant('BASE_URL', 'https://baas.kinvey.com/user/kid_-kan4iP1b-/')
    .constant('KINVEY_CONFIG', {
        'MasterCredentials': 'Basic a2lkXy1rYW40aVAxYi06MDcyZjMwYjg4NjY1NDA0YmE4NjIyMTQ0YmM5OTQxMzc=',
        'UserCredentials': 'Basic cGVzaG86MTIzNA=='
    })
    .run(['$rootScope', '$location', 'authentication', '$route', function ($rootScope, $location, authentication, $route) {

        $rootScope.$on('$routeChangeStart', function (ev, current, previous, rejection) {

            $rootScope.isLoggedIn = !!authentication.isLoggedIn();

            if ($rootScope.isLoggedIn) {
                $rootScope.logoutUser = function () {
                    authentication.logoutUser().then(function (response) {
                        $route.reload();
                    });
                };
            }
        });
    }]);