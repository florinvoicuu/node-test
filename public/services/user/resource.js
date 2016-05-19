/*
"use strict";

angular.module('app')
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
    });*/
