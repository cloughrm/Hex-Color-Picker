'use strict';

var rootDir = 'angular/';

angular.module('hexApp')
    .constant('STATES', [
        // Home
        {
            name: 'home',
            url: '/',
            templateUrl: rootDir + 'home/home.html',
            controller: 'HomeCtrl',
        }
    ]);
