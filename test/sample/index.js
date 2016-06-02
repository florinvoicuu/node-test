'use strict';

var co = require('co');

module.exports = request => {
    let sample = {
        user: inc => ({
            email: `user${inc}@domain.com`,
            password: 'password'
        }),
        comment: user => inc => co(function *() {
            user = user || (yield  request({ uri: '/api/user', method: 'POST', body: yield sample.user(inc) })).body;

            return {
                user: user,
                content: `Mesaj ${inc}`
            };
        }),
        badge: (userId, commentId) => inc => co(function *() {
            userId = userId || (yield  request({ uri: '/api/user', method: 'POST', body: yield sample.user(inc) })).body._id;

            commentId = commentId || (yield  request({ uri: '/api/comment', method: 'POST', body: yield sample.comment(inc)() })).body._id;

            return {
                user: userId,
                type: `fa-type-${inc}`,
                comment: commentId
            };
        })
    };

    return sample;
};
