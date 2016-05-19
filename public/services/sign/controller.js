/*
'use strict';

angular.module('app')
    .controller('signCtrl', [
        '$location', 'User',
        function ( $location, User) {
            var sign = this;

            sign.signup = _.indexOf($location.path(), 'signup') !== -1;

            angular.extend(sign, {
                user: {
                    email: '',
                    password: ''
                },
                signin: function () {
                    User.signin(sign.user).then(function () { $location.path('signin');//..
                    });
                },
                signup: function () {
                    User.signup(sign.user).then(function () { $location.path('signup');//..
                    });
                }
            });
        }
    ]);*/
