'use strict';

var co = require('co');

module.exports = request => {
    let sample = {
        user: inc => ({
            email: `user${inc}@domain.com`,
            password: 'password'
        }),
        comment: userId => inc => co(function *() {
          let user = userId || (yield  request({ uri: '/api/user', method: 'POST', body: yield sample.user(inc) })).body._id;

            return {
                user: userId,
                content: `Mesaj ${inc}`
            };
        })
    };
    return sample;
};
