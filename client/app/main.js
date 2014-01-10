/*global require*/
'use strict';

require.config({
    paths: {
        angular: 'lib//angular/angular'
    },
    shim: {
        angular: {
            exports: 'angular'
        }
    }
});

require(['angular', 'app'], function (angular) {
    angular.bootstrap(document, ['invoice']);
});
