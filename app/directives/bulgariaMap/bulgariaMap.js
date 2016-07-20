angular.module('bulgarite.directives.bulgariaMap', ['ngRoute'])
    .controller('bulgariaMapController', ['$scope', 'article', '$location', function ($scope, article, $location) {

        if (!($location.path().match('add-article'))) {

        }
    }])
    .directive('bulgariaMap', [
        'article',
        function (article) {
            return {
                controller: 'bulgariaMapController',
                restrict: 'AE',
                replace: true,
                link: function (scope) {
                    const mapTopLeftDegreeX = 22.270635;
                    const mapTopLeftDegreeY = 44.273569;
                    const mapLowerRightDegreeX = 28.227929;
                    const mapLowerRightDegreeY = 41.222366;

                    if (scope.shouldSetCoordinates) {
                        scope.setCoordinates = function ($event) {
                            scope.clicked = true;

                            var clickedParallel = mapTopLeftDegreeX + ((mapLowerRightDegreeX - mapTopLeftDegreeX) * ($event.offsetX / $event.srcElement.clientWidth ));
                            var clickedMeridian = mapTopLeftDegreeY + ((mapLowerRightDegreeY - mapTopLeftDegreeY) * ($event.offsetY / $event.srcElement.clientHeight ));

                            //TODO: the directive should not know anything about the input fields of the html(i think)
                            var $parallel = $("#parallel");
                            var $meridian = $("#meridian");

                            $parallel.val(clickedParallel);

                            scope.parallel = clickedParallel;
                            $meridian.val(clickedMeridian);
                            scope.meridian = clickedMeridian;

                            var $pointer = $("#location-pointer");
                            $pointer.ready(function () {
                                var offsetToCenterX = $event.offsetX - parseInt($pointer.get(0).clientWidth / 2);
                                var offsetToCenterY = $event.offsetY - parseInt($pointer.get(0).clientHeight * 0.86);

                                $pointer.css("left", offsetToCenterX + 'px');
                                $pointer.css("top", offsetToCenterY + 'px');
                            })
                        }
                    } else {
                        article.getAllArticlesFromCategory('landmarks')
                            .then(function (articles) {
                                var $bulgariaMapImage = $("#bulgaria-map");
                                var mapWidthInPx = $bulgariaMapImage.get(0).clientWidth;
                                var mapHeightInPx = $bulgariaMapImage.get(0).clientHeight;
                                articles.data.forEach(function (article) {
                                    article.curentImageOffsetLeft = parseInt(mapWidthInPx * (mapTopLeftDegreeX - article.coordinate.parallel) / (mapTopLeftDegreeX - mapLowerRightDegreeX));
                                    article.currentImageOffsetTop = parseInt(mapHeightInPx * (mapTopLeftDegreeY - article.coordinate.meridian) / (mapTopLeftDegreeY - mapLowerRightDegreeY));
                                });
                                scope.landmarkArticles = articles.data;
                            });
                    }
                },
                templateUrl: 'app/directives/bulgariaMap/bulgariaMap-template.html'
            };
        }]);