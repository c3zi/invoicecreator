/*global angular*/

angular.module('common.services', [])
    .service('dateService', function () {
        var due_days = 14;
        var today = new Date();

        var getMonth = function(date) {
            var month = date.getMonth();
            return month < 10 ? '0' + month : month;
        };

        var getDay = function(date) {
            var day = date.getDate();
            return day < 10 ? '0' + day : day;
        };

        var createDate = function(date) {
            return today.getFullYear() + "-" + getMonth(date) + "-" + getDay(date);
        };

        return {
            setDate: function (date) {
              today = date;
            },
            getIssuedDate: function () {
                return createDate(today);
            },
            getDueDate: function (days) {
                days = days || due_days;
                var due_date = today;
                due_date.setDate(today.getDate() + days);
                return createDate(due_date);
            }
        };
    });
