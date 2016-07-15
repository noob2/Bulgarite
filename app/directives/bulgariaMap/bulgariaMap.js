angular.module('bulgarite.directives.bulgariaMap', ['ngRoute'])
    .controller('bulgariaMapController', ['$scope', 'article', '$location', function ($scope, article, $location) {

        if (!($location.path().match('add-article'))) {
            article.getAllArticlesFromCategory('landmarks')
                .then(function (articles) {

                    const mapTopLeftDegreeX = 22.270635;
                    const mapTopLeftDegreeY = 44.273569;
                    const mapLowerRightDegreeX = 28.227929;
                    const mapLowerRightDegreeY = 41.222366;

                    var $bulgariaMapImage = $("#bulgaria-map");

                    var mapWidthInPx = $bulgariaMapImage.get(0).clientWidth;
                    var mapHeightInPx = $bulgariaMapImage.get(0).clientHeight;

                    articles.data.forEach(function (article) {

                        article.curentImageOffsetLeft = parseInt(mapWidthInPx * (mapTopLeftDegreeX - article.coordinate.parallel) / (mapTopLeftDegreeX - mapLowerRightDegreeX));
                        article.currentImageOffsetTop = parseInt(mapHeightInPx * (mapTopLeftDegreeY - article.coordinate.meridian) / (mapTopLeftDegreeY - mapLowerRightDegreeY));
                    });

                    $scope.landmarkArticles = articles.data;

                }).finally(function () {
                $scope.isLoaded = true;
            })
        }
    }])
    .directive('bulgariaMap', function ($timeout) {
        return {
            controller: 'bulgariaMapController',
            restrict: 'AE',
            replace: true,
            link: function (scope, elem, attrs) {
                const mapTopLeftDegreeX = 22.270635;
                const mapTopLeftDegreeY = 44.273569;
                const mapLowerRightDegreeX = 28.227929;
                const mapLowerRightDegreeY = 41.222366;

                scope.setCoordinates = function ($event) {
                    var clickedParallel = mapTopLeftDegreeX + ((mapLowerRightDegreeX - mapTopLeftDegreeX) * ($event.offsetX / $event.srcElement.clientWidth ));
                    var clickedMeridian = mapTopLeftDegreeY + ((mapLowerRightDegreeY - mapTopLeftDegreeY) * ($event.offsetY / $event.srcElement.clientHeight ));

                    scope.clicked = true;


                    //if it is add article page
                    var $parallel = $("#parallel");
                    var $meridian = $("#meridian");

                    $parallel.val(clickedParallel);
                    scope.article.coordinate.parallel = clickedParallel;

                    $meridian.val(clickedMeridian);
                    scope.article.coordinate.meridian = clickedMeridian;

                    var $pointer = $("#location-pointer");
                    $pointer.ready(function () {
                        var offsetToCenterX = $event.offsetX - parseInt($pointer.get(0).clientWidth / 2);
                        var offsetToCenterY = $event.offsetY - parseInt($pointer.get(0).clientHeight * 0.86);

                        $pointer.css("left", offsetToCenterX + 'px');
                        $pointer.css("top", offsetToCenterY + 'px');
                    })
                };
            },
            templateUrl: 'app/directives/bulgariaMap/bulgariaMap-template.html'
        };
    });