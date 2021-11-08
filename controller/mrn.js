var express = require('express');
var mrn = require('../model/mrn');
exports.createmrn = function (req, res) {
    var new_mrn_info = new mrn(req.body);


    mrn.savemrn(new_mrn_info, function (err, result) {
        if (err) {
            res.send('someting worng');
        }
        else {
            res.json({ message: 'mrn added' });
        }
    });

};
exports.allmrn = function (req, res) {

    mrn.getAllmrn(function (err, user) {
        res.send({ mrn: user });
    });
};
exports.deletemrn = function (req, res) {
    var deleteValue = req.body;
    mrn.delete(deleteValue, function (err, result) {
        if (err) {
            res.send('someting worng');
        }
        else {
            res.json({ message: 'deleted' });
        }

    });

};
exports.seaechmrn = function (req, res) {
    var searchValue = req.body;

    mrn.search(searchValue, function (err, result) {
        if (err) {
            console.log(result)
            res.json({ mrn: result });
            res.send('someting worng');
        }
        else {
            console.log(result)
            res.json({ mrn: result });
        }

    });

};
