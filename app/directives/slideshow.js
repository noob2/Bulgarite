angular.module('bulgarite.directives.slider', ['ngRoute'])
    .controller('sliderController', ['$scope', 'article', function ($scope, article) {
        article.getLatestArticles(5)
            .then(function (articles) {
                $scope.latestArticles = articles.data;
            })

    }])
    .directive('slider', function ($timeout) {
        return {
            restrict: 'AE',
            replace: true,
            link: function (scope, elem, attrs) {
                scope.currentIndex = 0; // Initially the index is at the first image

                scope.next = function () {
                    scope.currentIndex < scope.latestArticles.length - 1 ? scope.currentIndex++ : scope.currentIndex = 0;
                };

                scope.prev = function () {
                    scope.currentIndex > 0 ? scope.currentIndex-- : scope.currentIndex = scope.latestArticles.length - 1;
                };

                scope.$watch('latestArticles', function () {
                    if (scope.latestArticles) {
                        scope.$watch('currentIndex', function () {
                            scope.latestArticles.forEach(function (article) {
                                article.visible = false; // make every image invisible
                            });
                            scope.latestArticles[scope.currentIndex].visible = true; // make the current image visible
                        });
                    }
                });

                var timer;
                var sliderFunc = function () {
                    timer = $timeout(function () {
                        scope.next();
                        timer = $timeout(sliderFunc, 5000);
                    }, 5000);
                };

                sliderFunc();

                scope.$on('$destroy', function () {
                    $timeout.cancel(timer); // when the scope is getting destroyed, cancel the timer
                });
            },
            templateUrl: 'app/directives/slider-template.html'
        };
    });