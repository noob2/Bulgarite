define(['modules/core/runners/logRunner'], function (logRunner) {

    var coreModule = angular.module('coreModule', ['ngRoute', 'themeModule']);
    coreModule.run(logRunner);

    coreModule.config(['$controllerProvider', function ($controllerProvider) {
        coreModule.registerController = $controllerProvider.register;
    }]);

    coreModule.config(['$routeProvider', function ($routeProvider) {

        $routeProvider
            .when('/', {
                templateUrl: 'app/home/home.html',
                controller: 'homeController'
            })
            .when('/home', {
                controller: 'homeController',
                templateUrl: '/app/modules/core/views/home.html',
                resolve: {
                    load: ['$q', function ($q) {
                        var deferred = $q.defer();
                        require(['modules/core/controllers/homeController'], function () {
                            deferred.resolve();
                        });
                        return deferred.promise;
                    }]
                }
            })
    }]);

    require(['modules/core/controllerReferences'], function (references) {
        require(references, function () {
            angular.bootstrap(document, ['coreModule'])
        })
    });

    coreModule.run(['$log', function ($log) {
        $log.info('initialized coreModule');
    }]);
});