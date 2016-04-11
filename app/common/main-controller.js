angular.module('bulgarite.common',[])
.controller('mainController',[
    '$scope',
    'identity',
    function ($scope, identity) {
        console.log(23);
        $scope.isAuthenicated = identity.isAuthenicated();
    }
]);