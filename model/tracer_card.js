var express = require('express');
var db = require('./db/db');

var uuid = require('uuid/v1');

require('dotenv').config();


var tracer_card = function (tracer_card) {

    this.mrn_uuid = tracer_card.mrn_uuid;
    this.send_to = tracer_card.send_to;
    this.remark = tracer_card.remark;
    this.created_at = new Date();
    this.created_by = 'user';

    //this.active = 'active';
};

tracer_card.getAlltracer_card = function (result) {
    db.query('SELECT * from tracer_card ORDER BY `created_at` DESC ', function (error, res) {
        if (error) {
            reject();
        }
        else {
            result(null, res);
        }
    });
};

tracer_card.search = function (Value, result) {
    db.query('SELECT * from tracer_card WHERE ?? = ? ORDER BY `created_at` DESC', [Value.identify, Value.value], function (error, res, reject) {
        if (error) {
            result(null, Value);
        }
        else {
            //   res=Value;
            result(null, res);
        }
    });
};


tracer_card.savetracer_card = function (new_tracer_cardinfo, result) {



    var curerent_date = new Date();
    new_tracer_cardinfo.tracer_card_uuid = uuid(curerent_date);



    db.query('INSERT INTO tracer_card SET ?', new_tracer_cardinfo, function (error, results, fields) {
        if (error) {
            console.log("error: ", error);
            result(error, null);
        }
        else {

            result(null, results);




        }
    });

};

tracer_card.edittracer_cardname = function (tracer_card, result) {


    db.query('UPDATE tracer_card SET tracer_card_name=?, WHERE tracer_card_uuid = ?', [tracer_card.tracer_card_name, tracer_card.tracer_card_uuid], function (error, results, fields) {
        if (error) {
            console.log("error: ", error);
            result(error, null);
        }
        else {

            result(null, results);


        }
    });

};
tracer_card.delete = function (value, result) {
    var deleted_value = value.tracer_card_uuid;


    db.query('DELETE from tracer_card  WHERE tracer_card_uuid = ?', [deleted_value], function (error, results, fields) {
        if (error) {
            console.log("error: ", error);
            result(error, null);
        }
        else {

            result(null, results);


        }
    });
};

module.exports = tracer_card;