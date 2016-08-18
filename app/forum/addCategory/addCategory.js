'use strict';

angular.module('bulgarite.forum.addCategory', ['ngRoute'])

    .config(['$routeProvider', '$locationProvider', function ($routeProvider) {
        $routeProvider.when('/forum/addCategory', {
            templateUrl: 'app/forum/addCategory/addCategory.html',
            controller: 'addCategoryController'
        });
    }])

    .controller('addCategoryController', [
        '$http',
        '$q',
        'KINVEY_CONFIG',
        '$scope',
        'forumCategory',
        'forumTopic',
        '$location',
        function ($http, $q, KINVEY_CONFIG, $scope, forumCategory) {

            $scope.addCategory = function (categoryName) {
                forumCategory.AddCategory(categoryName)
                    .then(function () {
                        history.back();
                    })
            };
        }]);