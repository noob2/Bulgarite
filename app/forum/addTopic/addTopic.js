'use strict';

angular.module('forum.addTopic', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/forum/addTopic', {
            templateUrl: 'app/forum/addTopic/addTopic.html'
        });
    }])

    .controller('addTopicController', [
        '$http',
        '$q',
        'KINVEY_CONFIG',
        '$scope',
        'forumCategory',
        'forumTopic',
        '$location',
        function ($http, $q, KINVEY_CONFIG, $scope, forumCategory, forumTopic) {
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