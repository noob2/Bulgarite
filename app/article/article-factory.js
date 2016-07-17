angular.module('bulgarite.factory.article', [])
    .factory('article', [
        '$http',
        '$q',
        'KINVEY_CONFIG',
        'BASE_URL',
        '$route',
        function ($http, $q, KINVEY_CONFIG, BASE_URL, $route) {

            function getAllArticlesFromCategory(category) {
                var deferred = $q.defer();
                $http.defaults.headers.common.Authorization = KINVEY_CONFIG['UserCredentials'];
                $http.get('https://baas.kinvey.com/appdata/kid_-kan4iP1b-/articles?query={"category":"' + category + '"}', {})
                    .then(function (articles) {
                        deferred.resolve(articles)
                    }, function (err) {
                        deferred.resolve(err)
                    });
                return deferred.promise;
            }

            function getLatestArticles(numberOfArticles) {
                var deferred = $q.defer();

                $http.defaults.headers.common.Authorization = KINVEY_CONFIG['UserCredentials'];
                $http.get('https://baas.kinvey.com/appdata/kid_-kan4iP1b-/articles?query={}&limit=' + numberOfArticles + '?query={}&sort={"_kmd.ect": -1}', {})
                    .then(function (articles) {
                        deferred.resolve(articles)
                    }, function (err) {
                        deferred.resolve(err)
                    });

                return deferred.promise;
            }

            function getAllHistoryArticlesFromPeriod(min, max) {
                var deferred = $q.defer();

                $http.defaults.headers.common.Authorization = KINVEY_CONFIG['UserCredentials'];
                $http.get('https://baas.kinvey.com/appdata/kid_-kan4iP1b-/articles?query={"$and":[{"category":"history","year":{"$lte": ' + max + ',"$gte": ' + min + '}}]}', {})
                    .then(function (articles) {
                        deferred.resolve(articles)
                    }, function (err) {
                        deferred.resolve(err)
                    });
                return deferred.promise;
            }

            function getArticleById(id) {
                var deferred = $q.defer();

                $http.defaults.headers.common.Authorization = KINVEY_CONFIG['UserCredentials'];
                $http.get('https://baas.kinvey.com/appdata/kid_-kan4iP1b-/articles/' + id, {})
                    .then(function (articles) {
                        deferred.resolve(articles)
                    }, function (err) {
                        deferred.resolve(err)
                    });

                return deferred.promise;
            }

            function addArticle(article, articleCategory) {
                var deferred = $q.defer();
                article.category = articleCategory;
                $http.defaults.headers.common.Authorization = KINVEY_CONFIG['UserCredentials'];
                $http.post('https://baas.kinvey.com/appdata/kid_-kan4iP1b-/articles', article)
                    .then(function (articles) {
                        deferred.resolve(articles)
                    }, function (err) {
                        deferred.resolve(err)
                    });

                return deferred.promise;
            }

            //TODO: remove this finction and integrate it in function addArticle(article, articleCategory){...}
            function addLandmarkArticle(article, parallel, meridian) {
                var deferred = $q.defer();
                article.category = 'landmarks';
                article.coordinate = {};
                article.coordinate.parallel = parallel;
                article.coordinate.meridian = meridian;

                $http.defaults.headers.common.Authorization = KINVEY_CONFIG['UserCredentials'];
                $http.post('https://baas.kinvey.com/appdata/kid_-kan4iP1b-/articles', article)
                    .then(function (articles) {
                        deferred.resolve(articles)
                    }, function (err) {
                        deferred.resolve(err)
                    });

                return deferred.promise;
            }

            function editLandmarkArticle(article, parallel, meridian, id) {
                var deferred = $q.defer();
                article.coordinate = {};
                article.coordinate.parallel = parallel;
                article.coordinate.meridian = meridian;
                
                $http.defaults.headers.common.Authorization = KINVEY_CONFIG['UserCredentials'];
                $http.put('https://baas.kinvey.com/appdata/kid_-kan4iP1b-/articles/'+id , article)
                    .then(function (articles) {
                        deferred.resolve(articles)
                    }, function (err) {
                        deferred.resolve(err)
                    });
                return deferred.promise;
            }

            function editHistoryArticle(article) {
                var deferred = $q.defer();
                article.year = parseInt(article.year);
                $http.defaults.headers.common.Authorization = KINVEY_CONFIG['UserCredentials'];
                $http.put('https://baas.kinvey.com/appdata/kid_-kan4iP1b-/articles/'+article._id , article)
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
                addLandmarkArticle: addLandmarkArticle,
                editLandmarkArticle: editLandmarkArticle,
                editHistoryArticle: editHistoryArticle
            }
        }
    ]);