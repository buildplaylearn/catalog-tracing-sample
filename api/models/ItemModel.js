'use strict';

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ItemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    price: {
        type: Number,
        required: true,
        min: 1
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    }
})

ItemSchema.methods.increase = function increase(quantityToAdd) {
    this.quantity = this.quantity + quantityToAdd;
}

ItemSchema.methods.decrease = function decrease(quantityToRemove) {
    this.quantity = this.quantity - quantityToRemove
}

module.exports = mongoose.model('Items', ItemSchema)