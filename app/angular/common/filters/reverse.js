'use strict';

angular.module('hexApp')
    .filter('reverse', function () {
        return function(items) {
            return items.slice().reverse();
        };
    });
