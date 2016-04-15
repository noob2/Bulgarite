angular.module('bulgarite.common', [])
    .factory('mainController', [
        '$rootScope',
        'identity',
        function ($scope,identity) {

            function set() {
                if (identity.isAuthenicated()) {
                    $scope.authenicated = true;
                    $scope.user = sessionStorage['user'];
                } else {
                    $scope.authenicated = false;
                    $scope.user = undefined;
                    $scope.unauthorised = 'Please log in to see the history articles';
                }
            }

            return {
                set: set
            }
        }
    ]);