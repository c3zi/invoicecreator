/*global angular*/
"use strict";

angular.module('invoice.services', [])
    .factory('serverService', ['$http', function ($http) {

        var doPreview = function (data) {
//            return $(http)
            location.header = '/preview.php';
        };

        return {
            'preview': function(data) {
                return doPreview(data);
            }
        };
    }]);