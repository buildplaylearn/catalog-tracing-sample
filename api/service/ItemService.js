'use strict';

const BusinessError = require('../error/BusinessError')
const NotFoundError = require('../error/NotFoundError')

class ItemService {

    constructor(repository) {
        this.repository = repository
    }

    async findById(id) {
        return await this.findItem(id)
    }

    async save(params) {
        return await this.repository.save(params)
    }

    async update(id, params) {
        const item = await this.repository.update(id, params)
        this.validateItem(item, id)
        return item
    }

    async list() {
        return await this.repository.list()
    }

    async delete(id) {
        await this.findById(id)
        return await this.repository.delete(id)
    }

    async increase(id, quantityToAdd) {
        if(quantityToAdd < 1) {
            throw new BusinessError('you must increase the item count by at least 1');
        }
        const item = await this.findItem(id)
        item.increase(quantityToAdd)
        return await this.repository.update(id, item)
    }

    async decrease(id, quantityToRemove) {
        if(quantityToRemove < 1) {
            throw new BusinessError('you must decrease the item count by at least 1');
        }
        const item = await this.findItem(id)
        if(item.quantity < quantityToRemove) {
            throw new BusinessError('Not enough items to decrease, current quantity:' + item.quantity);
        }
        item.decrease(quantityToRemove)
        return await this.repository.update(id, item)
    }

    validateItem(item, id) {
        if(item === undefined) {
            throw new NotFoundError(`item: ${id} not found`)
        }
    }

    async findItem(id) {
        const item = await this.repository.findById(id)
        this.validateItem(item, id)
        return item
    }
}

module.exports = ItemService


