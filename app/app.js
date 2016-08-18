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
    'bulgarite.factory.topic',
    'bulgarite.factory.category',
    'bulgarite.factory.comment',

    'bulgarite.directives.slider',
    'bulgarite.directives.bulgariaMap',
    'bulgarite.directives.loginOrAddArticle',

    'bulgarite.forum',
    'bulgarite.forum.addTopic',
    'bulgarite.forum.addCategory',
    'bulgarite.forum.topicPage',

    'ngAnimate'
])
    .config(['$routeProvider','$locationProvider', function ($routeProvider,$locationProvider) {
        $routeProvider.otherwise({redirectTo: '/'});
    }])
    .constant('BASE_DATA_URL', 'https://baas.kinvey.com/appdata/kid_-kan4iP1b-/')
    .constant('BASE_USER_URL', 'https://baas.kinvey.com/user/kid_-kan4iP1b-/')
    .constant('KINVEY_CONFIG', {
        'MasterCredentials': 'Basic a2lkXy1rYW40aVAxYi06MDcyZjMwYjg4NjY1NDA0YmE4NjIyMTQ0YmM5OTQxMzc=',
        'UnauthorizedUserCredentials': 'Basic cGVzaG86MTIzNA==',
        'CurrentUserCredentials':'Basic ' + sessionStorage['UserCredentials'],
        'CurrentUserAuthToken':'Kinvey ' + sessionStorage['authorisationToken']
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