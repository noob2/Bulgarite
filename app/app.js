'use strict';

angular.module('bulgarite', [
    'ngRoute',

    'angular-toasty',
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
    .config(['$routeProvider', '$httpProvider', '$locationProvider', 'toastyConfigProvider', function ($routeProvider, $httpProvider, $locationProvider, toastyConfigProvider) {
        $routeProvider.otherwise({redirectTo: '/'});

        toastyConfigProvider.setConfig({
            sound: true,
            shake: false,
            showClose: false,
            clickToClose: true,
            timeout: 10000,
            html: true,
            theme: 'bootstrap'
        });

        $httpProvider.interceptors.push(['$q', 'toasty', function ($q, toasty) {
            return {
                'request': function (response) {
                    console.log(response);
                    return response;
                },

                'response': function (response) {
                    console.log(response);

                    if (response.statusText && response.statusText == 'OK' && response.config && response.config.method && response.config.method == 'DELETE'){
                        toasty.info('Deleted successfully !')
                    }

                    if (response.statusText && response.statusText == 'OK' && response.data && response.data.username && response.data.name) {
                        toasty.success({
                            title: 'Successfully logged in as ' + response.data.username,
                            msg: ' welcome ' + response.data.name + ' !'
                        });
                    }

                    if (response.config && response.config.url) {
                        console.log(response.config.url)
                        if (response.config.url.indexOf('logout') !== -1) {
                            toasty.success('You have successfully logged out');
                        }

                    }

                    if (response.statusText === 'Created') {
                        toasty.success(response.statusText);
                    }
                    return response;
                },

                // 'requestError': function (rejection) {
                //     console.log(rejection)
                // },

                'responseError': function (rejection) {
                    console.log(rejection)

                    if (rejection && rejection.data && rejection.data.description) {
                        toasty.error(rejection.data.description);
                    }

                    if(rejection.errorMessage){
                        toasty.error(rejection.errorMessage);
                    }

                    if (rejection === 'Unauthorized Access') {
                        toasty.error(rejection);
                    }
                    return $q.reject(rejection);
                }
            }
        }]);
    }])
    .constant('BASE_DATA_URL', 'https://baas.kinvey.com/appdata/kid_-kan4iP1b-/')
    .constant('BASE_USER_URL', 'https://baas.kinvey.com/user/kid_-kan4iP1b-/')
    .constant('KINVEY_CONFIG', {
        'MasterCredentials': 'Basic a2lkXy1rYW40aVAxYi06MDcyZjMwYjg4NjY1NDA0YmE4NjIyMTQ0YmM5OTQxMzc=',
        'UnauthorizedUserCredentials': 'Basic cGVzaG86MTIzNA==',
        'CurrentUserCredentials': 'Basic ' + sessionStorage['UserCredentials']
    })
    .run(['$rootScope', '$location', 'authentication', '$route', function ($rootScope, $location, authentication, $route) {

        $rootScope.$on('$routeChangeStart', function (ev, current, previous, rejection) {

            $rootScope.isLoggedIn = !!authentication.isLoggedIn();
            $rootScope.userID = sessionStorage['UserID'];
            $rootScope.logoutUser = function () {
                authentication.logoutUser()
                    .then(function (response) {
                        $route.reload();
                    });
            };
        });
    }]);
