'use strict';

angular.module('bulgarite.forum.topicPage', ['ngRoute'])

    .config(['$routeProvider', '$locationProvider', function ($routeProvider) {
        $routeProvider.when('/forum/:id', {
            templateUrl: 'app/forum/topicPage/topicPage.html',
            controller: 'topicPageController'
        });
    }])

    .controller('topicPageController', [
        '$http',
        '$q',
        'KINVEY_CONFIG',
        '$scope',
        'forumTopic',
        'forumCategory',
        'forumComment',
        '$location',
        'authentication',
        '$routeParams',
        '$route',
        function ($http, $q, KINVEY_CONFIG, $scope, forumTopic, forumCategory, forumComment, $location, authentication, $routeParams, $route) {

            $scope.showAddCommentOptions = function () {
                $scope.showOptions = true;

                $scope.addComment = function (comment) {
                    console.log(comment)
                    forumComment.AddCommentToTopic(comment, $routeParams.id)
                        .then(function (response) {
                            console.log(response);
                            $route.reload();
                        }, function (err) {
                            console.log(err)
                        })
                }
            };
            $scope.showReOptions = function (commentID) {
                $scope.showReOptionsID = commentID;

                $scope.addReComment = function (comment) {
                    console.log(comment)
                    forumComment.AddReCommentToComment(comment,commentID)
                        .then(function (success) {
                            console.log(success.data);
                            $route.reload();
                        })
                }
            };

            $scope.removeTopic = function (topicID) {
                forumTopic.RemoveTopic(topicID)
                    .then(function (response) {
                        console.log(response);
                        history.back();
                    })
            };
            $scope.deleteComment = function (commentID) {
                forumComment.DeleteComment(commentID)
                    .then(function (response) {
                        console.log(response);
                        $route.reload();
                    })
            };

            forumTopic.GetTopicByID($routeParams.id)
                .then(function (topic) {
                    var topicData = topic.data;
                    topicData._kmd.lmt = topicData._kmd.lmt.substring(0, 19).replace('T', ' ');
                    $scope.topic = topicData;
                });
            forumComment.GetCommentsFromTopic($routeParams.id)
                .then(function (comments) {
                    comments.data.forEach(function (comment) {
                        comment._kmd.lmt = comment._kmd.lmt.substring(0, 19).replace('T', ' ');
                        forumComment.GetReCommentsFromComment(comment._id)
                            .then(function (reComments) {
                                comment.reComments = reComments.data;
                                console.log(comment)
                            })
                    });
                    $scope.comments = comments.data;
                })
        }]);