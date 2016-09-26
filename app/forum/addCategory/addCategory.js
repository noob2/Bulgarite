'use strict';

angular.module('forum.addCategory', ['ngRoute'])
    .config(['$routeProvider',function ($routeProvider) {
        $routeProvider.when('/forum/addCategory', {
            templateUrl: 'app/forum/addCategory/addCategory.html',
            controller: 'addCategoryController'
        })
    }])
    .controller('addCategoryController', [
        '$scope',
        'forumCategory',
        function ($scope, forumCategory) {

            $scope.addCategory = function (categoryName) {
                forumCategory.AddCategory(categoryName)
                    .then(function () {
                        history.back();
                    })
            };
        }]);