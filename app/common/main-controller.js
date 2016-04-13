angular.module('bulgarite.common',[])
.controller('mainController',[
    '$scope',
    'identity',
    function ($scope, identity) {
        $scope.isAuthenicated = identity.isAuthenicated();
        console.log(isAuthenicated);
    }
]);