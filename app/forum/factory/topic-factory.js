angular.module('factory.topic', [])
    .factory('forumTopic', [
        '$http',
        '$q',
        'KINVEY_CONFIG',
        'BASE_DATA_URL',
        '$route',
        function ($http, $q, KINVEY_CONFIG, BASE_DATA_URL) {

            function GetTopicByID(topicID) {
                var deferred = $q.defer();
                $http.defaults.headers.common.Authorization = KINVEY_CONFIG['UnauthorizedUserCredentials'];
                $http.get(BASE_DATA_URL + 'forumTopics/' + topicID + '?resolve_depth=1', {})
                    .then(function (articles) {
                        deferred.resolve(articles)
                    }, function (err) {
                        deferred.resolve(err)
                    });
                return deferred.promise;
            }

            function GetAllTopics() {
                var deferred = $q.defer();
                $http.defaults.headers.common.Authorization = KINVEY_CONFIG['UnauthorizedUserCredentials'];
                $http.get(BASE_DATA_URL + 'forumTopics?resolve=category', {})
                    .then(function (articles) {
                        deferred.resolve(articles)
                    }, function (err) {
                        deferred.resolve(err)
                    });
                return deferred.promise;
            }

            function GetAllTopicsFromCategory(categoryID) {
                var deferred = $q.defer();
                $http.defaults.headers.common.Authorization = KINVEY_CONFIG['UnauthorizedUserCredentials'];
                $http.get(BASE_DATA_URL + 'forumTopics?query={"category._id":"' + categoryID + '"}')
                    .then(function (articles) {
                        deferred.resolve(articles)
                    }, function (err) {
                        deferred.resolve(err)
                    });
                return deferred.promise;
            }

            function AddTopic(post) {
                var deferred = $q.defer();

                post.category = {
                    "_type": "KinveyRef",
                    "_id": post.category,
                    "_collection": "forumCategories"
                };
                post.author = sessionStorage['name'];

                $http.defaults.headers.common.Authorization = KINVEY_CONFIG['CurrentUserCredentials'];
                $http.post(BASE_DATA_URL + 'forumTopics', post)
                    .then(function (articles) {
                        deferred.resolve(articles)
                    }, function (err) {
                        deferred.resolve(err)
                    });
                return deferred.promise;
            }

            function RemoveTopic(topicID) {
                var deferred = $q.defer();

                $http.defaults.headers.common.Authorization = KINVEY_CONFIG['CurrentUserCredentials'];
                $http.delete(BASE_DATA_URL + 'forumTopics/' + topicID)
                    .then(function (articles) {
                        deferred.resolve(articles)
                    }, function (err) {
                        deferred.resolve(err)
                    });
                return deferred.promise;
            }

            return {
                GetTopicByID: GetTopicByID,
                AddTopic: AddTopic,
                RemoveTopic: RemoveTopic,
                GetAllTopics: GetAllTopics,
                GetAllTopicsFromCategory: GetAllTopicsFromCategory
            }
        }
    ]);