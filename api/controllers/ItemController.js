'use strict';

const BusinessError = require('../error/BusinessError')
const NotFoundError = require('../error/NotFoundError')

class ItemController {

    constructor(service) {
        this.service = service
    }

    save(req, res) {
        this.service.save(req.body)
            .then(item => res.json(item, 200))
            .catch(err => this.handleError(err, res))
    }

    update(req, res) {
        this.service.update(req.params.itemId, req.body)
            .then(item => res.json(item, 200))
            .catch(err => this.handleError(err, res))
    }

    list(req, res) {
        this.service.list()
            .then(items => res.json(items, 200))
            .catch(err => this.handleError(err, res))
    }

    read(req, res) {
        this.service.findById(req.params.itemId)
            .then(item => res.json(item, 200))
            .catch(err => this.handleError(err, res))
    }

    delete(req, res) {
        this.service.delete(req.params.itemId)
            .then(() => res.status(204).send())
            .catch(err => this.handleError(err, res))
    }

    add(req, res) {
        this.service.increase(req.params.itemId, req.body.quantity)
            .then(item => res.json(item, 200))
            .catch(err => this.handleError(err, res))
    }

    take(req, res) {
        this.service.decrease(req.params.itemId, req.body.quantity)
            .then(item => res.json(item, 200))
            .catch(err => this.handleError(err, res))
    }

    handleError(error, response) {
        if(error instanceof NotFoundError) {
            response.send(error, 404)
        } else if(error instanceof BusinessError) {
            response.send(error, 400)
        } else {
            response.send(error, 500)
        }
    }

}

module.exports = ItemController

