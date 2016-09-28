'use strict';

angular.module('forum.addCategory', ['ngRoute'])

//TODO: remove this useless piece of code somehow
    .config(['$routeProvider',function ($routeProvider) {
        $routeProvider.when('/forum/addCategory', {
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