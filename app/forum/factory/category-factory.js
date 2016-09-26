angular.module('factory.category', [])
    .factory('forumCategory', [
        '$http',
        '$q',
        'KINVEY_CONFIG',
        'BASE_DATA_URL',
        function ($http, $q, KINVEY_CONFIG, BASE_DATA_URL) {

            function GetAllCategories() {
                var deferred = $q.defer();
                $http.defaults.headers.common.Authorization = KINVEY_CONFIG['UnauthorizedUserCredentials'];
                $http.get(BASE_DATA_URL + 'forumCategories', {})
                    .then(function (articles) {
                        deferred.resolve(articles)
                    }, function (err) {
                        deferred.resolve(err)
                    });
                return deferred.promise;
            }

            function GetCategoryById(categoryID) {
                var deferred = $q.defer();
                $http.defaults.headers.common.Authorization = KINVEY_CONFIG['UnauthorizedUserCredentials'];
                $http.get(BASE_DATA_URL + 'forumCategories/' + categoryID, {})
                    .then(function (articles) {
                        deferred.resolve(articles)
                    }, function (err) {
                        deferred.resolve(err)
                    });
                return deferred.promise;
            }

            function AddCategory(categoryName) {
                var deferred = $q.defer();
                $http.defaults.headers.common.Authorization = KINVEY_CONFIG['CurrentUserCredentials'];
                $http.post(BASE_DATA_URL + 'forumCategories', {name: categoryName})
                    .then(function (articles) {
                        deferred.resolve(articles)
                    }, function (err) {
                        deferred.resolve(err)
                    });
                return deferred.promise;
            }

            function RemoveCategory(categoryID) {
                var deferred = $q.defer();
                $http.defaults.headers.common.Authorization = KINVEY_CONFIG['CurrentUserCredentials'];
                $http.delete(BASE_DATA_URL + 'forumCategories/' + categoryID)
                    .then(function (articles) {
                        deferred.resolve(articles)
                    }, function (err) {
                        deferred.resolve(err)
                    });
                return deferred.promise;
            }

            return {
                GetAllCategories: GetAllCategories,
                GetCategoryById: GetCategoryById,
                AddCategory: AddCategory,
                RemoveCategory: RemoveCategory
            }
        }
    ]);