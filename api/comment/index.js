'use strict';

var comment   = require('./controller');

module.exports = express => {
    let router = express.Router();

    // CRUD
    router.post   ('/',             comment.create);
    router.get    ('/:id',          comment.retrieve);
    router.put    ('/:id',          comment.update);
    router.delete ('/:id',          comment.delete);

// OTHER
    router.get    ('/',             comment.retrieveRange);
    //router.get    ( '/approve/:id', comment.approve);
    //router.get    ( '/vote/:id',    comment.vote);

    return router;
};