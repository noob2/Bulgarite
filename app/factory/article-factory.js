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

            return {
                getAllArticlesFromCategory: getAllArticlesFromCategory,
                getLatestArticles: getLatestArticles,
                addArticle: addArticle
            }
        }
    ]);