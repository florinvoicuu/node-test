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
            .when('/comments', {
                controller: 'CommentController',
                templateUrl:`comment.html`,
                controllerAs: 'comment'
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
            },
            query: {
                method: 'GET',
                isArray: true
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
    })

    /*.controller('CommentCtrl', function($location, Comment) {
        var Comment = $resource('/api/comment');
        Comment.query({}, function(comment, getResponseHeaders){
            comment.abc = true;
            comment.$save(function(comment, putResponseHeaders) {
                //user => saved user object
                //putResponseHeaders => $http header getter
            });
        })*/




var comment = this;

 let url = $location.url();
 comment.list = url.indexOf('Comment') !== -1;

 comment.model = {
 content: ''
 };

 var comments = Comment.query(function () {
 var comment = comments[0];
 });

 comment.comments = function () {
 comment.service = new Comment(comment.model);
 comment.service.$create().then(function () {
 console.log('Succes');
 }).catch(console.log);
 };
 });

 .controller('CommentController', function(Comment) {
 var comment = this;

 comment.model = {
 content: ''
 };

 var comments = Comment.query( function() {
 var service = new Comment(comment.model);

 comment = comments[0];

 service.$create()
 .then(function (comment) {

 console.log('Success');
 console.log(comment.content);
 console.log(res)
 })
 .catch(console.log);
 });
 })