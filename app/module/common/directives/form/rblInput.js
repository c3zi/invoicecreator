/*global angular,$,console */

angular.module('directives.form', [])
    .directive('rblInput', ['$parse', function ($parse) {
        var linkFn;

        linkFn = function (scope, element, attrs) {
            var show, hide, text, label, value, id, valid;
            valid = false;
            id = 'rblInput_' + scope.$id;

            scope.$watch(attrs.ngModel, function () {
//                value = scope.$eval(attrs.ngModel);
                ctrl = element.controller('ngModel');
                value = ctrl.$viewValue;
                valid = ctrl.$valid;

                $('#' + id).text(value);

            });

            label = $(element).parent().find('label');

            text = angular.element("<span id='" + id + "'></span>");
            text.insertAfter(element);

            $(element).hide();
            label.hide();

            show = function () {
                label.show();
                $(element).show();
                $(text).hide();
            };

            hide = function () {
                if (valid) {
                    label.hide();
                    $(element).hide();
                    $(text).show();
                }
            }

            $(text).on('click', show);
            $(element).on('blur', hide);

        };

        return {
            restrict: 'A',
            link: linkFn
        };
    }]);
