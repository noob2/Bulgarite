'use strict';

angular.module('bulgarite', [
    'ngRoute',

    'angular-toasty',
    'rzModule',

    'home',
    'account',
    'history',
    'landmarks',
    'population',
    'economy',

    'article.page',
    'article.addArticle',
    'article.editArticle',

    'factory.authentication',
    'factory.article',
    'factory.topic',
    'factory.category',
    'factory.comment',

    'directive.slideshow',
    'directive.bulgariaMap',
    'directive.loginOrAddArticle',

    'forum.home',
    'forum.addTopic',
    'forum.addCategory',
    'forum.topicPage',

    'ngAnimate'
])
    .config([
        '$routeProvider',
        '$httpProvider',
        '$locationProvider',
        'toastyConfigProvider',
        function ($routeProvider, $httpProvider, $locationProvider, toastyConfigProvider) {

            $routeProvider.when('/', {
                templateUrl: 'app/home/home.html'
            }).when('/account', {
                templateUrl: 'app/account/account.html'
            }).when('/history', {
                templateUrl: 'app/history/history.html'
            }).when('/landmarks', {
                templateUrl: 'app/landmarks/landmarks.html'
            }).when('/population', {
                templateUrl: 'app/population/population.html'
            }).when('/economy', {
                templateUrl: 'app/economy/economy.html'
            }).when('/article/:id', {
                templateUrl: 'app/article/articlePage/articlePage.html'
            }).when('/:articleType/add-article', {
                templateUrl: 'app/article/addArticle/addArticle.html'
            }).when('/:articleType/article/:id/editArticle', {
                templateUrl: 'app/article/editArticle/editArticle.html'
            }).when('/forum', {
                templateUrl: 'app/forum/forum.html'
            }).when('/forum/:id', {
                templateUrl: 'app/forum/topicPage/topicPage.html'
            }).otherwise({redirectTo: '/'});

            toastyConfigProvider.setConfig({
                sound: true,
                shake: false,
                showClose: false,
                clickToClose: true,
                timeout: 4000,
                html: true,
                theme: 'bootstrap'
            });

            $httpProvider.interceptors.push(['$q', 'toasty', function ($q, toasty) {
                return {
                    'request': function (response) {
                        return response;
                    },

                    'response': function (response) {
                        if (response.statusText && response.statusText == 'OK' && response.config && response.config.method && response.config.method == 'DELETE') {
                            toasty.info('Deleted successfully !')
                        }

                        if (response.statusText && response.statusText == 'OK' && response.data && response.data.username && response.data.name) {
                            toasty.success({
                                title: 'Successfully logged in as ' + response.data.username,
                                msg: ' welcome ' + response.data.name + ' !'
                            });
                        }

                        if (response.config && response.config.url) {
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

                        if (rejection.errorMessage) {
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
