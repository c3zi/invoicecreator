/*global angular*/
"use strict";

angular.module('invoice', [])
    .controller('mainController', function ($scope) {
        $scope.tax = 1.23;
        $scope.invoice = {
            name: "Twitter, Inc.",
            address: "San Francisco, CA 94107",
            city: "San Francisco",
            nip: "669-222-11-22",
            regon: "321112233"
        };
        
        $scope.myData = [
            {quantity: 1, description: "Implementing new search engine 1.", unitprice: "100.00", total: "100.00"},
            {quantity: 1, description: "Implementing new search engine 2.", unitprice: "700.00", total: "700.00"}
        ];

        var getTotal = function () {
            var sum = 0;
            angular.forEach($scope.myData, function (row) {
                sum += parseFloat(row.total);
            });

            $scope.total = sum.toFixed(2);
            $scope.totalWithTax = ($scope.total * $scope.tax).toFixed(2);
        };

        getTotal();



//        $scope.$on('ngGridEventEndCellEdit', function (data) {
//            getTotal();
//            angular.forEach($scope.myData, function (row) {
//                row.total = (row.quantity * row.unitprice).toFixed(2);
//            });
//        });


//        var cellEditableTemplate = "<input style=\"width: 100%\" step=\"any\" ng-class=\"'colt' + col.index\" ng-inpt=\"COL_FIELD\" type=\"number\" ng-blur=\"updateEntity(col, row)\"/>";
        var cellEditableTemplate = "<input ng-class=\"'colt' + col.index\" ng-input=\"COL_FIELD\" ng-model=\"COL_FIELD\" ng-change=\"updateEntity(col, row)\"/>";

        $scope.gridOptions = {
            data: 'myData',
            selectedItems: [],
            enableSorting: true,
            showSelectionCheckbox: true,
            enableCellSelection: true,
            enableRowSelection: true,
            enableCellEditOnFocus: true,
            enableColumnResize: true,
            showFooter: true,
            footerTemplate: '/module/common/templates/footerTemplate.html',

            columnDefs: [
                {field: 'quantity', displayName: 'Quantity', enableCellEdit: true, editableCellTemplate: cellEditableTemplate, resizable: false},
                {field: 'description', displayName: 'Description', enableCellEdit: true},
                {field: 'unitprice', displayName: 'Unit Price', enableCellEdit: true, editableCellTemplate: cellEditableTemplate},
                {field: 'total', displayName: 'Total', enableCellEdit: true}
            ]
        };


        // Update Entity on the server side
        $scope.updateEntity = function (column, row) {
            angular.forEach($scope.myData, function (row) {
                row.total = (row.quantity * row.unitprice).toFixed(2);
            });
            getTotal();
        };

        $scope.addRow = function() {
            $scope.myData.push({quantity: 1, description: "", unitprice: 0, total: 0});
        };

        $scope.removeRow = function () {
            angular.forEach($scope.gridOptions.selectedItems, function (index) {
                var deleteIndex = $scope.myData.indexOf(index);
                if (deleteIndex > -1) {
                    $scope.myData.splice(deleteIndex, 1);
                }
            });
            getTotal();
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