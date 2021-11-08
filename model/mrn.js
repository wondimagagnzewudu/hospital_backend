var express = require('express');
var db = require('./db/db');

var uuid = require('uuid/v1');

require('dotenv').config();


var mrn = function (mrn) {


    this.name = mrn.name;
    this.medical_record_number = mrn.medical_record_number;
    this.father_name = mrn.father_name;
    this.grand_father_name = mrn.grand_father_name;
    this.date_of_birth_date = mrn.date_of_birth_date;
    this.birth_month = mrn.birth_month;
    this.birth_year = mrn.birth_year;
    this.age = mrn.age;
    this.address = mrn.address;
    this.region = mrn.region;
    this.worda = mrn.worda;
    this.gott = mrn.gott;
    this.kebele = mrn.kebele;
    this.house_number = mrn.house_number;
    this.name_of_facility = mrn.name_of_facility;
    this.phone_number = mrn.phone_number;
    this.created_at = new Date();
    this.created_by = 'user';
    //this.active = 'active';
};

mrn.getAllmrn = function (result) {
    db.query('SELECT * from mrn ORDER BY `created_at` DESC ', function (error, res) {
        if (error) {
            reject();
        }
        else {
            result(null, res);
        }
    });
};

mrn.search = function (Value, result) {

    db.query('SELECT * from mrn WHERE ?? = ? ORDER BY `created_at` DESC', [Value.identify, Value.value], function (error, res, reject) {
        if (error) {
            result(null, error);
        }
        else {
            //   res=Value;
            result(null, res);
        }
    });
};


mrn.savemrn = function (new_mrninfo, result) {



    var curerent_date = new Date();
    new_mrninfo.mrn_uuid = uuid(curerent_date);



    db.query('INSERT INTO mrn SET ?', new_mrninfo, function (error, results, fields) {
        if (error) {
            console.log("error: ", error);
            result(error, null);
        }
        else {

            result(null, results);




        }
    });

};

mrn.editmrnname = function (mrn, result) {


    db.query('UPDATE mrn SET mrn_name=?, WHERE mrn_uuid = ?', [mrn.mrn_name, mrn.mrn_uuid], function (error, results, fields) {
        if (error) {
            console.log("error: ", error);
            result(error, null);
        }
        else {

            result(null, results);


        }
    });

};
mrn.delete = function (value, result) {
    var deleted_value = value.mrn_uuid;


    db.query('DELETE from mrn  WHERE mrn_uuid = ?', [deleted_value], function (error, results, fields) {
        if (error) {
            console.log("error: ", error);
            result(error, null);
        }
        else {

            result(null, results);


        }
    });
};

module.exports = mrn;