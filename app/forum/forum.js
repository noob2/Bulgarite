'use strict';

angular.module('bulgarite.forum', ['ngRoute'])

    .config(['$routeProvider', '$locationProvider', function ($routeProvider) {
        $routeProvider.when('/forum', {
            templateUrl: 'app/forum/forum.html',
            controller: 'forumController'
        });
    }])

    .controller('forumController', [
        '$http',
        '$q',
        'KINVEY_CONFIG',
        '$scope',
        'forumTopic',
        'forumCategory',
        '$location',
        'authentication',
        '$route',
        function ($http, $q, KINVEY_CONFIG, $scope, forumTopic, forumCategory, $location, authentication, $route) {


            $scope.removeCategory = function (categoryID) {
                forumCategory.RemoveCategory(categoryID).then(function (response) {
                    $route.reload();
                })
            };

            $scope.getAllTopicsFromCategory = function (categoryID) {

                forumCategory.GetCategoryById(categoryID)
                    .then(function (category) {
                        var selectedCategoryName = category.data.name;

                        forumTopic.GetAllTopicsFromCategory(categoryID)
                            .then(function (topics) {
                                topics.data.forEach(function (topic) {
                                    topic.category = [];
                                    topic.category._obj = [];
                                    topic.category._obj.name = selectedCategoryName;
                                });
                                $scope.topics = topics.data;
                            })
                    })
            };

            var getAllTopics = function () {
                forumTopic.GetAllTopics()
                    .then(function (topics) {
                        console.log(topics)
                        topics.data.forEach(function (topic) {
                            topic._kmd.lmt = topic._kmd.lmt.substring(0, 19).replace('T', ' ');
                        });
                        $scope.topics = topics.data;
                    });
            };

            getAllTopics();

            $scope.getAllTopics = getAllTopics;

            forumCategory.GetAllCategories()
                .then(function (categories) {
                    console.log(categories)
                    $scope.categories = categories.data;
                });

            $scope.goToTopicPageWithID = function (topicID) {
                $location.path('/forum/' + topicID)
            }
        }]);