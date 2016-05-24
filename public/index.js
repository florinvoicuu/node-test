'use strict';

angular.module('project', ['ngRoute', 'ngResource'])
    .config(function($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $routeProvider
            .when('/', {
                controller:'CommentsController as comments',
                templateUrl:'comments.html'
            })
            .when('/signup', {
                controller:'UserController as user',
                templateUrl:'sign.html'
            })
            .when('/signin', {
                controller:'UserController as user',
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
                url: '/api/user/signin',
                method: 'POST'
            }
        });
    })

    .controller('UserController', function($location, User) {
        var user = this;
        // var id = $routeParams.id;

        let url = $location.url();
        user.up = url.indexOf('signup') !== -1;

        user.model = {
            email: 'alex',
            password: '',
            color: 'pink'
        };

        user.signup = function () {
            user.service = new User(user.model);
            user.service.$create().then(function () {
                console.log('Success');
            }).catch(console.log);
        };

        user.signin = function () {
            user.service = new User(user.model);
            user.service.$signin().then(function () {
                console.log('Success');
            }).catch(console.log);
        };
    })

    .factory('Comment', function ($resource) {
        return $resource('/api/comment/:id', { id: '@_id' }, {
            create: {
                method: 'POST'
            },
            retrieve: {
                method: 'GET'
            },
            update: {
                method: 'PUT'
            }
        });
    })

    .controller('CommentsController', function(Comment) {
        var comments = this;
        // var id = $routeParams.id;

        comments.list = Comment.query({}, function (comments) {
            comments.list = comments;
        });

        comments.model = {
            content: ''
        };



        comments.add = function () {
            var service = new Comment(comments.model);

            service.$create()
                .then(function (comment) {
                    comments.list.push(comment);
                    comments.model.content = '';
                })
                .catch(console.log);
        };

        comments.delete = function (id) {
            var service = new Comment({ _id: id });

            service.$delete()
                .then(function (comment) {
                    for (var i = 0; i < comments.list.length; i++) {
                        if (comments.list[i]._id === id) {
                            comments.list.splice(i, 1);
                        }
                    }
                })
                .catch(console.log);
        };
    });