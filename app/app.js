'use strict';

angular.module('bulgarite', [
    'ngRoute',
    
    'rzModule',
    'bulgarite.home',
    'bulgarite.account',
    
    'bulgarite.history',
    
    'bulgarite.landmarks',
    
    'bulgarite.population',
    
    'bulgarite.economy',
    
    'bulgarite.article.page',
    'bulgarite.article.addArticle',
    'bulgarite.article.editArticle',
    'bulgarite.users.authentication',

    'bulgarite.factory.article',

    'bulgarite.directives.slider',
    'bulgarite.directives.bulgariaMap',
    'bulgarite.directives.loginOrAddArticle',

    'ngAnimate'
])
    .config(['$routeProvider','$locationProvider', function ($routeProvider,$locationProvider) {
        $routeProvider.otherwise({redirectTo: '/'});
    }])
    .constant('BASE_URL', 'https://baas.kinvey.com/user/kid_-kan4iP1b-/')
    .constant('KINVEY_CONFIG', {
        'MasterCredentials': 'Basic a2lkXy1rYW40aVAxYi06MDcyZjMwYjg4NjY1NDA0YmE4NjIyMTQ0YmM5OTQxMzc=',
        'UnauthorizedUserCredentials': 'Basic cGVzaG86MTIzNA=='
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