'use strict';

angular.module('article.addArticle', ['ngRoute'])

    .controller('addArticleController', [
        '$scope',
        'article',
        '$routeParams',
        function ($scope, article, $routeParams) {
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
                    .then(function () {
                        history.back();
                    });
            };
        }]);