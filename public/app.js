'use strict';

angular.module('app', ['ngRoute', 'ngResource'])
    /*.factory('User', function ($resource) {
        return $resource('/user/:id', { id: '@_id' }, {
            create: {
                method: 'POST'
            },
            retrieve: {
                method: 'GET'
            },
            update: {
                method: 'PUT'
            },
            signin: {
                method: 'POST',
                url: '/signin'
            }
        });
    })
*/
    .config(function ($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $routeProvider
            .when('/', {
                controller: 'SignCtrl',
                templateUrl:'sign.html',
                controllerAs: 'user'
            })
            .when('/signup', {
                controller:'SignCtrl',
                templateUrl:'index.html',
                controllerAs: 'user'
            })
            .when('/signin', {
                controller: 'SignCtrl',
                templateUrl:'index.html',
                controllerAs: 'user'
            })
            .otherwise({
                redirectTo:'/'
            });
    })

    .controller('SignCtrl', function() {
        this.message = 'aaaa';
    });

