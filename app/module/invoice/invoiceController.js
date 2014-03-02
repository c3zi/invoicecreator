/*global angular*/

angular.module('invoice', ['invoice.services'])
    .controller('mainController', function ($scope, $location, invoiceService) {
        var cellEditableTemplate = "<input ng-class=\"'colt' + col.index\" ng-input=\"COL_FIELD\" ng-model=\"COL_FIELD\" ng-change=\"updateEntity(col, row)\"/>";

        $scope.tax = 1.23;
        $scope.owner = {
            person: "Your Name",
            name: "Your Company Name",
            address: "Address",
            city: "Town/City",
            country: "Country",
            postcode: "Postcode",

            nip: "NIP number",
            regon: "Regon number",

            bank_name: "Bank Name",
            bank_account: "Account Number",

            email: "Your e-mail",
            phone: "Your phone"
        };

        $scope.customer = {
            name: "Client's Name/Company",
            address: "Address",
            city: "Town/City",
            country: "Country",
            postcode: "Postcode",
            nip: "NIP number"
        };

        $scope.gridData = [
            {quantity: 1, description: "Implementing new search engine 1.", unitprice: "100.00", total: "100.00"},
            {quantity: 1, description: "Implementing new search engine 2.", unitprice: "700.00", total: "700.00"}
        ];

        $scope.gridOptions = {
            data: 'gridData',
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


        // Update Entity
        $scope.updateEntity = function (column, row) {
            angular.forEach($scope.gridData, function (row) {
                row.total = (row.quantity * row.unitprice).toFixed(2);
            });
            getTotal();
        };

        $scope.addRow = function() {
            $scope.gridData.push({quantity: 1, description: "", unitprice: 0, total: 0});
        };

        $scope.removeRow = function () {
            angular.forEach($scope.gridOptions.selectedItems, function (index) {
                var deleteIndex = $scope.gridData.indexOf(index);
                if (deleteIndex > -1) {
                    $scope.gridData.splice(deleteIndex, 1);
                }
            });
            getTotal();
        };

        $scope.master = {};

        $scope.update = function (invoice) {
            invoiceService.initialize($scope.owner, $scope.customer, $scope.gridData, $scope.total, $scope.totalWithTax);
            $location.path("/preview");
            $scope.master = angular.copy(invoice);
        };

        $scope.reset = function () {
//            $scope.invoice = angular.copy($scope.master);
        };

        $scope.isUnchanged = function (invoice) {
            return angular.equals(invoice, $scope.master);
        };

        var getTotal = function () {
            var sum = 0;
            angular.forEach($scope.gridData, function (row) {
                sum += parseFloat(row.total);
            });

            $scope.total = sum.toFixed(2);
            $scope.totalWithTax = ($scope.total * $scope.tax).toFixed(2);
        };

        getTotal();

//        $scope.reset();
    })
    .controller('previewController', function ($scope, $window, invoiceService) {
        $scope.invoiceData = invoiceService.fetch();
        console.log($scope.invoiceData);
    });
