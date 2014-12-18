/*global angular*/

angular.module('invoice.services', [])
    .service('invoiceService', ['$http', function ($http) {
        var invoice = {
            owner: {},
            customer: {},
            payment: {},
            contact: {},
            entries: [],
            details: [],
            total: 0,
            totalWithTax: 0
        };

        return {
            initialize: function (owner, customer, payment, contact, entries, details, total, totalWithTax) {
                invoice.owner = owner;
                invoice.customer = customer;
                invoice.payment = payment;
                invoice.contact = contact;
                invoice.entries = entries;
                invoice.details = details;
                invoice.total = total;
                invoice.totalWithTax = totalWithTax;
            },
            fetch: function () {
                return invoice;
            }
        };
    }]);
