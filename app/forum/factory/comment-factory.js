angular.module('factory.comment', [])
    .factory('forumComment', [
        '$http',
        '$q',
        'KINVEY_CONFIG',
        'BASE_DATA_URL',
        '$route',
        function ($http, $q, KINVEY_CONFIG, BASE_DATA_URL) {

            function AddCommentToTopic(comment, topicID) {
                var deferred = $q.defer();
                comment.author = sessionStorage['name'];
                comment.topic = {
                    "_type": "KinveyRef",
                    "_id": topicID,
                    "_collection": "forumTopics"
                };

                $http.defaults.headers.common.Authorization = KINVEY_CONFIG['CurrentUserCredentials'];
                $http.post(BASE_DATA_URL + 'forumComments', comment)
                    .then(function (articles) {
                        deferred.resolve(articles)
                    }, function (err) {
                        deferred.resolve(err)
                    });
                return deferred.promise;
            }

            function DeleteComment(commentID) {
                var deferred = $q.defer();

                $http.defaults.headers.common.Authorization = KINVEY_CONFIG['CurrentUserCredentials'];
                $http.delete(BASE_DATA_URL + 'forumComments/'+commentID)
                    .then(function (articles) {
                        deferred.resolve(articles)
                    }, function (err) {
                        deferred.resolve(err)
                    });
                return deferred.promise;
            }

            function AddReCommentToComment(comment, commentID) {
                var deferred = $q.defer();
                comment.author = sessionStorage['name'];
                comment.comment = {
                    "_type": "KinveyRef",
                    "_id": commentID,
                    "_collection": "forumComments"
                };

                $http.defaults.headers.common.Authorization = KINVEY_CONFIG['CurrentUserCredentials'];
                $http.post(BASE_DATA_URL + 'forumComments', comment)
                    .then(function (articles) {
                        deferred.resolve(articles)
                    }, function (err) {
                        deferred.resolve(err)
                    });
                return deferred.promise;
            }

            function GetCommentsFromTopic(topicID) {
                var deferred = $q.defer();

                $http.defaults.headers.common.Authorization = KINVEY_CONFIG['UnauthorizedUserCredentials'];
                $http.get(BASE_DATA_URL + 'forumComments?query={"topic._id":"' + topicID + '"}')
                    .then(function (articles) {
                        deferred.resolve(articles)
                    }, function (err) {
                        deferred.resolve(err)
                    });
                return deferred.promise;
            }

            function GetReCommentsFromComment(commentID) {
                var deferred = $q.defer();

                $http.defaults.headers.common.Authorization = KINVEY_CONFIG['UnauthorizedUserCredentials'];
                $http.get(BASE_DATA_URL + 'forumComments?query={"comment._id":"' + commentID + '"}')
                    .then(function (articles) {
                        deferred.resolve(articles)
                    }, function (err) {
                        deferred.resolve(err)
                    });
                return deferred.promise;
            }

            return {
                AddCommentToTopic: AddCommentToTopic,
                DeleteComment: DeleteComment,
                AddReCommentToComment: AddReCommentToComment,
                GetCommentsFromTopic: GetCommentsFromTopic,
                GetReCommentsFromComment: GetReCommentsFromComment
            }
        }
    ]);