/*global angular*/


var myApp = angular.module('myApp',
    [
        'ngRoute',
        'ui.bootstrap',
        'directives.form',
        'invoice'
    ]);


myApp.config(['$routeProvider', '$locationProvider', '$httpProvider', function ($routeProvider, $locationProvider, $httpProvider) {
    "use strict";
    $routeProvider.when('/start',  {
        controller: 'mainController',
        templateUrl: '/module/invoice/templates/mainTemplate.html'
    })
        .otherwise({
            redirectTo: '/'
        });
}]);