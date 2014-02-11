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
        
        $scope.myData = [
            {quantity: 1, description: "Implementing new search engine.", unitprice: 100, total: 100},
            {quantity: 1, description: "Implementing new search engine.", unitprice: 700, total: 700},
            {quantity: 2, description: "Implementing new search engine.", unitprice: 1000, total: 2000},
            {quantity: 1, description: "Implementing new search engine.", unitprice: 700, total: 700},
            {quantity: 3, description: "Implementing new search engine.", unitprice: 100, total: 300},           
        ];
            
        $scope.gridOptions = { 
            data: 'myData',
            enableCellSelection: true,
            enableRowSelection: false,
            enableCellEditOnFocus: true,  
            columnDefs: [
                {field: 'quantity', displayName: 'Quantity', enableCellEdit: true}, 
                {field: 'description', displayName: 'Description', enableCellEdit: true},
                {field: 'unitprice', displayName: 'Unit Price', enableCellEdit: true},
                {field: 'total', displayName: 'Total', enableCellEdit: true}
            ]
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