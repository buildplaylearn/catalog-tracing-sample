'use strict';

module.exports = function (app) {
    let controller = require('../controllers/ItemController');

    app.route('/items')
        .get(controller.list)
        .post(controller.save);

    app.route('/items/:itemId')
        .get(controller.read)
        .put(controller.update)
        .delete(controller.delete);

    app.route('/items/:itemId/add')
        .post(controller.add);

    app.route('/items/:itemId/take')
        .post(controller.take)
};