var express = require('express');
var tracer_card = require('../model/tracer_card');
exports.createtracer_card = function (req, res) {
    var new_tracer_card_info = new tracer_card(req.body);

    console.log()
    tracer_card.savetracer_card(new_tracer_card_info, function (err, result) {
        if (err) {
            res.send('someting worng');
        }
        else {
            res.json({ message: 'tracer_card added' });
        }
    });

};
exports.alltracer_card = function (req, res) {

    tracer_card.getAlltracer_card(function (err, user) {
        res.send({ tracer_card: user });
    });
};
exports.deletetracer_card = function (req, res) {
    var deleteValue = req.body;
    tracer_card.delete(deleteValue, function (err, result) {
        if (err) {
            res.send('someting worng');
        }
        else {
            res.json({ message: 'deleted' });
        }

    });

};
exports.seaechtracer_card = function (req, res) {
    var searchValue = req.body;

    tracer_card.search(searchValue, function (err, result) {
        if (err) {
            res.send('someting worng');
        }
        else {
            res.json({ tracer_cards: result });
        }

    });

};
