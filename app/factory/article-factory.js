angular.module('bulgarite.factory.article', [])
    .factory('article', [
        '$http',
        '$q',
        'KINVEY_CONFIG',
        'BASE_URL',
        '$route',
        function ($http, $q, KINVEY_CONFIG, BASE_URL, $route) {

            function getAllHistoryArticles() {
                var deferred = $q.defer();

                $http.defaults.headers.common.Authorization = KINVEY_CONFIG['UserCredentials'];
                $http.get('https://baas.kinvey.com/appdata/kid_-kan4iP1b-/historyArticles', {})
                    .then(function (articles) {
                        deferred.resolve(articles)
                    }, function (err) {
                        deferred.resolve(err)
                    });

                return deferred.promise;
            }

            function getAllLandmarksArticles() {
                var deferred = $q.defer();

                $http.defaults.headers.common.Authorization = KINVEY_CONFIG['UserCredentials'];
                $http.get('https://baas.kinvey.com/appdata/kid_-kan4iP1b-/landmarkArticles', {})
                    .then(function (articles) {
                        deferred.resolve(articles)
                    }, function (err) {
                        deferred.resolve(err)
                    });

                return deferred.promise;
            }

            function addArticle(article,articleCategory) {
                var deferred = $q.defer();

                $http.defaults.headers.common.Authorization = KINVEY_CONFIG['UserCredentials'];
                $http.post('https://baas.kinvey.com/appdata/kid_-kan4iP1b-/'+articleCategory+'Articles', article)
                    .then(function (articles) {
                        deferred.resolve(articles)
                    }, function (err) {
                        deferred.resolve(err)
                    });

                return deferred.promise;
            }

            return {
                getAllHistoryArticles: getAllHistoryArticles,
                getAllLandmarksArticles: getAllLandmarksArticles,
                addArticle: addArticle
            }
        }
    ]);