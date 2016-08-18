'use strict';

angular.module('bulgarite.forum.addTopic', ['ngRoute'])

    .config(['$routeProvider', '$locationProvider', function ($routeProvider) {
        $routeProvider.when('/forum/addTopic', {
            templateUrl: 'app/forum/addTopic/addTopic.html',
            controller: 'addTopicController'
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
                    console.log(categories);
                    $scope.categories = categories.data;
                });

            $scope.AddTopic = function (topic) {
                forumTopic.AddTopic(topic).then(function () {
                    history.back();
                });
            }
        }]);