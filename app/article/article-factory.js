angular.module('factory.article', [])
    .factory('article', [
        '$http',
        '$q',
        'KINVEY_CONFIG',
        'BASE_DATA_URL',
        function ($http, $q, KINVEY_CONFIG, BASE_DATA_URL) {

            function getAllArticlesFromCategory(category) {
                var deferred = $q.defer();
                $http.defaults.headers.common.Authorization = KINVEY_CONFIG['UnauthorizedUserCredentials'];
                $http.get(BASE_DATA_URL + 'articles?query={"category":"' + category + '"}', {})
                    .then(function (articles) {
                        deferred.resolve(articles)
                    }, function (err) {
                        deferred.resolve(err)
                    });
                return deferred.promise;
            }

            function getLatestArticles(numberOfArticles) {
                var deferred = $q.defer();

                $http.defaults.headers.common.Authorization = KINVEY_CONFIG['UnauthorizedUserCredentials'];
                $http.get(BASE_DATA_URL + 'articles?query={}&limit=' + numberOfArticles + '?query={}&sort={"_kmd.ect": -1}', {})
                    .then(function (articles) {
                        deferred.resolve(articles)
                    }, function (err) {
                        deferred.resolve(err)
                    });

                return deferred.promise;
            }

            function getAllHistoryArticlesFromPeriod(min, max) {
                var deferred = $q.defer();



                $http.defaults.headers.common.Authorization = KINVEY_CONFIG['UnauthorizedUserCredentials'];
                $http.get(BASE_DATA_URL + 'articles?query={"$and":[{"category":"history","year":{"$lte": ' + parseInt(max) + ',"$gte": ' + parseInt(min) + '}}]}', {})
                    .then(function (articles) {
                        deferred.resolve(articles)
                    }, function (err) {
                        deferred.resolve(err)
                    });
                return deferred.promise;
            }

            function getArticleById(id) {
                var deferred = $q.defer();

                $http.defaults.headers.common.Authorization = KINVEY_CONFIG['UnauthorizedUserCredentials'];
                $http.get(BASE_DATA_URL + 'articles/' + id, {})
                    .then(function (article) {
                        deferred.resolve(article)
                    }, function (err) {
                        deferred.resolve(err)
                    });

                return deferred.promise;
            }

            function addArticle(article, articleCategory) {
                var deferred = $q.defer();
                article.category = articleCategory;
                $http.defaults.headers.common.Authorization = KINVEY_CONFIG['CurrentUserCredentials'];
                $http.post(BASE_DATA_URL + 'articles', article)
                    .then(function (articles) {
                        deferred.resolve(articles)
                    }, function (err) {
                        deferred.resolve(err)
                    });
                return deferred.promise;
            }

            function editArticle(article, id) {
                var deferred = $q.defer();
                article.year = parseInt(article.year);
                $http.defaults.headers.common.Authorization = KINVEY_CONFIG['CurrentUserCredentials'];
                $http.put(BASE_DATA_URL + 'articles/' + id, article)
                    .then(function (articles) {
                        deferred.resolve(articles)
                    }, function (err) {
                        deferred.resolve(err)
                    });
                return deferred.promise;
            }

            function deleteArticle(articleID) {
                var deferred = $q.defer();
                $http.defaults.headers.common.Authorization = KINVEY_CONFIG['CurrentUserCredentials'];
                $http.delete(BASE_DATA_URL + 'articles/' + articleID)
                    .then(function (articles) {
                        deferred.resolve(articles)
                    }, function (err) {
                        deferred.resolve(err)
                    });
                return deferred.promise;
            }

            return {
                getAllArticlesFromCategory: getAllArticlesFromCategory,
                getAllHistoryArticlesFromPeriod: getAllHistoryArticlesFromPeriod,
                getLatestArticles: getLatestArticles,
                getArticleById: getArticleById,
                addArticle: addArticle,
                editArticle: editArticle,
                deleteArticle: deleteArticle
            }
        }
    ]);