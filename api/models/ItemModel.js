'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
});

ItemSchema.methods.increase = function(quantityToAdd) {
    if(quantityToAdd < 1)
        throw new Error('you must increase the item count by at least 1');
    this.quantity = this.quantity + quantityToAdd;
    return this;
};

ItemSchema.methods.decrease = function(quantityToRemove) {
    if(quantityToRemove < 1)
        throw new Error('you must decrease the item count by at least 1');
    if(this.quantity < quantityToRemove)
        throw new Error('Not enough items to decrease, current quantity:' + this.quantity);
    this.quantity = this.quantity - quantityToRemove;
    return this;
};

module.exports = mongoose.model('Items', ItemSchema);