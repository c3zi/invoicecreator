/*global angular*/
"use strict";

angular.module('invoice', [])
    .controller('mainController', function ($scope) {
        $scope.invoice = {
            name: "Twitter, Inc.",
            address: "San Francisco, CA 94107",
            city: "San Francisco",
            nip: "669-222-11-22",
            regon: "321112233"
        };


        $scope.master = {};

        $scope.update = function (invoice) {
            $scope.master = angular.copy(invoice);
        };

        $scope.reset = function () {
//            $scope.invoice = angular.copy($scope.master);
        };

        $scope.isUnchanged = function (invoice) {
            return angular.equals(invoice, $scope.master);
        };

//        $scope.reset();
    });