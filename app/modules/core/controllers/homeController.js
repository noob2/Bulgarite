define(function () {

    angular.module('coreModule')
        .registerController('homeController', [
            '$scope',
            '$route',
            //'article',
            '$location',
            function ($scope, $route, $location) {
                $scope.title = 'hello';
                // article.getLatestArticles(6)
                //     .then(function (articles) {
                //         $scope.latestArticles = articles.data;
                //     }).finally(function () {
                //     $scope.isLoaded = true;
                // });
                //
                // $scope.goToArticle = function (id) {
                //     $location.path('article/' + id);
                // };
                //
                // if ($scope.isLoggedIn) {
                //     $scope.user = sessionStorage['name'];
                // }
            }])
});