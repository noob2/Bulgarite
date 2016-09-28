'use strict';

angular.module('forum.topicPage', ['ngRoute'])

    .controller('topicPageController', [
        '$scope',
        'forumTopic',
        'forumComment',
        '$routeParams',
        '$route',
        function ($scope, forumTopic, forumComment, $routeParams, $route) {

            $scope.showAddCommentOptions = function () {
                $scope.showOptions = true;

                $scope.addComment = function (comment) {
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
                    forumComment.AddReCommentToComment(comment, commentID)
                        .then(function () {
                            $route.reload();
                        })
                }
            };

            $scope.removeTopic = function (topicID) {
                forumTopic.RemoveTopic(topicID)
                    .then(function () {
                        history.back();
                    })
            };

            $scope.deleteComment = function (commentID) {
                forumComment.DeleteComment(commentID)
                    .then(function () {
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
                            })
                    });
                    $scope.comments = comments.data;
                })
        }]);