'use strict';

var badge = require('./controller');

module.exports = express => {
    let router = express.Router();

    // CRUD
    router.post   ('/',     badge.create);
    router.get    ('/:id',  badge.retrieve);
    router.put    ('/:id',  badge.update);
    router.delete ('/:id',  badge.delete);
    

    return router;
};