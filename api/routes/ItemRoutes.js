'use strict';
const ItemController = require('../controllers/ItemController')
const ItemService = require('../service/ItemService')
const ItemRepository = require('../repository/ItemRepository')

module.exports = function (app) {

    const repository = new ItemRepository()
    const service = new ItemService(repository)
    const controller = new ItemController(service)

    app.route('/items')
        .get((req, res) => controller.list(req, res))
        .post((req, res) => controller.save(req, res));

    app.route('/items/:itemId')
        .get((req, res) => controller.read(req, res))
        .put((req, res) => controller.update(req, res))
        .delete((req, res) => controller.delete(req, res));

    app.route('/items/:itemId/add')
        .post((req, res) => controller.add(req, res));

    app.route('/items/:itemId/take')
        .post((req, res) => controller.take(req, res))
};