'use strict';

const mongoose = require('mongoose'),
    Item = mongoose.model('Items');

class ItemRepository {

    findById(id) {
        return new Promise((resolve, reject) => {
            Item.findById(id, (err, item) => {
                if(err) {
                    reject(err);
                } else if (item === null) {
                    resolve(undefined)
                } else {
                    resolve(item)
                }
            });
        });
    }

    save(params) {
        return new Promise((resolve, reject) => {
            let item = new Item(params);
            item.save((err, item) => {
                if(err) {
                    reject(new Error("failed to save item"))
                } else {
                    resolve(item)
                }
            })

        })
    }

    list() {
        return new Promise((resolve, reject) => {
            Item.find({}, (err, items) => {
                if(err) {
                    reject(err)
                } else {
                    resolve(items)
                }
            })
        })
    }

    update(id, params) {
        return new Promise((resolve, reject) => {
            Item.findOneAndUpdate({_id: id}, params, {new: true}, (err, item) => {
                if(err) {
                    reject(err)
                } else if (item === null) {
                    resolve(undefined)
                } else {
                    resolve(item)
                }
            })
        })
    }

    delete(id) {
        return new Promise((resolve, reject) => {
            Item.deleteOne({_id: id}, (err) => {
                if(err) {
                    reject(new Error("failed to delete item"))
                } else {
                    resolve()
                }
            })
        })
    }

}

module.exports = ItemRepository
