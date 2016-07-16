angular.module('bulgarite.directives.loginOrAddArticle', ['ngRoute'])
    .directive('loginOrAddArticle', ['$location', function ($location) {
        return {
            link: function (scope) {
                scope.addArticle = function () {
                    var currentPath = $location.path();
                    $location.path(currentPath + "/add-article");
                };
            },
            templateUrl: 'app/directives/loginOrAddArticle/loginOrAddArticle.html'
        };
    }]);