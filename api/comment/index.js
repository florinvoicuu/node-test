'use strict';

var comment     = require('./controller');

module.exports = express => {
    let router = express.Router();
    
    //CRUD
    router.post     ('/',       comment.create);
    router.get      ('/:id',    comment.retrieve);
    router.put      ('/:id',    comment.update);
    router.delete   ('/:id',    comment.delete);

    router.get      ('/',       comment.retrieveRange);

    router.get      ('/:id/badge/:type',    comment.badge);

    return router;
};