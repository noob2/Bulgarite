'use strict';

angular.module('forum.addTopic', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/forum/addTopic', {
            templateUrl: 'app/forum/addTopic/addTopic.html'
        });
    }])

    .controller('addTopicController', [
        '$scope',
        'forumCategory',
        'forumTopic',
        function ($scope, forumCategory, forumTopic) {
            forumCategory.GetAllCategories()
                .then(function (categories) {
                    $scope.categories = categories.data;
                });

            $scope.AddTopic = function (topic) {
                forumTopic.AddTopic(topic).then(function () {
                    history.back();
                });
            }
        }]);