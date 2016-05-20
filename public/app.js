'use strict';

angular.module('app', ['ngRoute', 'ngResource'])

    .config(function ($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $routeProvider
            .when('/', {
                controller: 'SignCtrl as user',
                templateUrl:'sign.html'
            })
            .when('/signup', {
                controller:'SignCtrl as user',
                templateUrl:'sign.html'
            })
            .when('/signin', {
                controller: 'SignCtrl as user',
                templateUrl:'sign.html'
            })
            .otherwise({
                redirectTo:'/'
            });
    })

    .run(function (User, $rootScope) {
        $rootScope.auth = {};
        User.get({}, function (user) {
            $rootScope.auth = user;
        });
    })

    .factory('User', function ($resource) {
        return $resource('/api/user/:id', { id: '@_id' }, {
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
                url: '/api/user/signin'
            }
        });
    })

    .controller('SignCtrl', function($location, User) {
        var user = this;

        let url = $location.url();
        user.up = url.indexOf('signup') !== -1;

        user.model = {
            email: '',
            password: ''
        };

        user.signup = function () {
            user.service = new User(user.model);
            user.service.$create().then(function () {
                console.log('Succes');
            }).catch(console.log);
        };

        user.signin = function () {
            user.service = new User(user.model);
            user.service.$signin().then(function () {
                console.log('Succes');
            }).catch(console.log);
        };
    });

