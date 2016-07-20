'use strict';

angular.module('bulgarite.article.addArticle', ['ngRoute'])

    .config(['$routeProvider', '$locationProvider', function ($routeProvider) {

        $routeProvider.when('/:articleType/add-article', {
            templateUrl: 'app/article/addArticle/addArticle.html',
            controller: 'addArticleController'
        });
    }])
    .controller('addArticleController', [
        '$scope',
        'article',
        '$location',
        '$routeParams',
        function ($scope, article, $location, $routeParams) {
            $scope.shouldSetCoordinates = true;
            var articleType = $routeParams.articleType;
            $scope.articleType = articleType;

            $scope.addArticle = function (art) {

                //add coordinates to art object;
                if (articleType == 'landmarks') {
                    var $parallel = $("#parallel");
                    var $meridian = $("#meridian");
                    art.coordinate = {};
                    art.coordinate.parallel = $parallel.val();
                    art.coordinate.meridian = $meridian.val();
                }

                article.addArticle(art, articleType)
                    .then(function (success) {
                        history.back();
                    });
            };
        }]);