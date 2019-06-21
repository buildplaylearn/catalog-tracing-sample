'use strict';

const mongoose = require('mongoose'),
    Item = mongoose.model('Items');

exports.list = function (req, res) {
    Item.find({}, function (err, item) {
        if(err)
            res.send(err);
        res.json(item)
    });
};

exports.save = function(req, res) {
    let item = new Item(req.body);
    item.save(function(err, item) {
        if (err)
            res.send(err);
        res.json(item);
    });
};

exports.read = function (req, res) {
    Item.findById(req.params.itemId, function (err, item) {
        if(err)
            res.send(err);
        res.json(item);
    });
};

exports.update = function (req, res) {
    Item.findOneAndUpdate({_id: req.params.itemId}, req.body,
        {new: true}, function (err, item) {
            if(err)
                res.send(err);
            res.json(item);
        });
};

exports.delete = function (req, res) {
    Item.deleteOne({_id: req.params.itemId}, function (err) {
        if(err)
            res.send(err);
        res.json({ message: 'item successfully deleted'})
    });
};

exports.add = function (req, res) {
    let item = Item.findById({_id: req.params.itemId});
    item.schema.methods.increase(req.body.quantity, function (err, item) {
        if(err)
            res.send(err);
        res.json(item);
    });
};

exports.take = function (req, res) {
    let item = Item.findOne({_id: req.params.itemId});
    item.decrease(req.body.quantity, function (err, item) {
        if(err)
            res.send(err);
        res.json(item);
    });
};