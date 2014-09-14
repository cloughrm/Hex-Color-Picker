'use strict';

angular
    .module('hexApp', [
        'ngCookies',
        'ngResource',
        'ui.router',
        'ui.bootstrap',
        'ngStorage'
    ])
    .config(function (STATES, $stateProvider, $locationProvider, $urlRouterProvider) {

        for (var i = 0; i < STATES.length; i++) {
            $stateProvider.state(
                STATES[i].name, STATES[i]
            );
        }
        $urlRouterProvider.otherwise('/');
    })
    .run();
