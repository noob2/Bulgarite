'use strict';

angular.module('bulgarite.landmarks.addArticle', ['ngRoute'])

    .config(['$routeProvider', '$locationProvider', function ($routeProvider) {

        $routeProvider.when('/landmarks/add-article', {
            templateUrl: 'app/landmarks/addArticle/add-article.html',
            controller: 'addLandmarkArticleController'
        });
    }])
    .controller('addLandmarkArticleController', [
        '$scope',
        'article',
        '$location',
        function ($scope, article, $location) {

            $scope.addLandmarkArticle = function (art, parallel, meridian) {
                article.addLandmarkArticle(art, parallel, meridian)
                    .then(function (success) {
                        console.log(success);
                        //$location.path('landmarks');
                    });
            };

            $scope.setCoordinates = function ($event) {
                const mapTopLeftDegreeX = 22.270635;
                const mapTopLeftDegreeY = 44.273569;
                const mapLowerRightDegreeX = 28.227929;
                const mapLowerRightDegreeY = 41.222366;

                var clickedParalel = mapTopLeftDegreeX + ((mapLowerRightDegreeX - mapTopLeftDegreeX) * ($event.offsetX / $event.srcElement.clientWidth ));
                var clickedMeridian = mapTopLeftDegreeY + ((mapLowerRightDegreeY - mapTopLeftDegreeY) * ($event.offsetY / $event.srcElement.clientHeight ));

                $scope.parallel = clickedParalel;
                $scope.meridian = clickedMeridian;
                $("#parallel").val(clickedParalel);
                $("#meridian").val(clickedMeridian);

                var canvas = document.getElementById("bulgaria-map-canvas");
                canvas.setAttribute('width', $event.srcElement.clientWidth);
                canvas.setAttribute('height', $event.srcElement.clientHeight);
                var context = canvas.getContext("2d");

                context.beginPath();
                context.arc($event.offsetX, $event.offsetY, 10, 0, Math.PI * 2, true);
                context.fill();
            };
        }]);