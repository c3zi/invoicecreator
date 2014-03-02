/*global angular*/


var myApp = angular.module('myApp',
    [
        'ngRoute',
        'ngGrid',
        'ui.bootstrap',
        'directives.form',
        'directives.tools',
        'invoice'
    ]);


myApp.config(['$routeProvider', '$locationProvider', '$httpProvider', function ($routeProvider, $locationProvider, $httpProvider) {
    "use strict";
    $routeProvider.when('/start',  {
        controller: 'mainController',
        templateUrl: '/module/invoice/templates/mainTemplate.html'
    }).when('/preview', {
        controller: 'previewController',
        templateUrl: '/module/invoice/templates/previewTemplate.html'
    }).otherwise({
        redirectTo: '/'
    });
}]);