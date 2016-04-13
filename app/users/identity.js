angular.module('bulgarite.users.identity', [])
    .factory('identity', [
        '$http',
        'BASE_URL',
        '$q',
        function ($http, BASE_URL, $q) {
            
            function log() {
                var deferred = $q.defer();
                var accessToken = 'e9f27996-324b-4c02-ba14-79311af21f19.KsEiA/VN4OtZOmuJ/EMbRJQkwqVERcQC2xM+Df/V49o=';
                $http.defaults.headers.common.Authorisation = 'Basic ' + accessToken;


                $http.get(BASE_URL + '_me')
                    .then(function (response) {
                        console.log(response.data);
                    }, function (err) {
                        console.log(err);
                    });
                return deferred.promise;
            }

            return{
                log: log
            }
        }
    ]);