var express = require('express');
var db = require('./db/db');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var uuid = require('uuid/v1');

require('dotenv').config();


var user = function (user) {

    this.user_name = user.user_name;
    this.password = user.password;
    this.user_type = 'user';
    this.created_at = new Date();
    this.created_by = user.user_name;
    //this.active = 'active';
};
user.checkTokenSetUser = function (req, res) {
    const authHeader = req.get('authorization');
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        if (token) {
            jwt.verify(token, process.env.TOKEN_SECRET, (error, user) => {
                if (error) {
                }
                res.user = user;
                next();
            });
        } else {
            res.status(401);
        }
    } else {
        res.status(401);
    }
};
user.getAlluser = function (result) {
    db.query('SELECT * from user ORDER BY `created_at` DESC ', function (error, res) {
        if (error) {
            reject();
        }
        else {
            result(null, res);
        }
    });
};
user.check_user_avaliabilty = function (Value, result) {
    db.query('SELECT user_name from user WHERE ?? = ?', ['user_name', Value.user_name], function (error, res, reject) {

        if (error) {
            reject();
        }
        else {
            result(null, res);
        }
    });
};
user.search = function (Value, result) {
    db.query('SELECT * from user WHERE ?? = ? ORDER BY `created_at` DESC ', [Value.identify, Value.value], function (error, res, reject) {
        if (error) {
            result(null, error);
        }
        else {
            //   res=Value;
            result(null, res);
        }
    });
};


user.login = function (loger, result) {


    db.query('SELECT * from user WHERE user_name = ?', [loger.user_name], function (error, user) {
        if (error) {
            console.log(error);
            result(null, 'incorrect input');
        }
        else if (user.length == 0) {

            result(null, 'auth not find');
        }
        else {
            var password = user[0].password;
            var lpassword = loger.password;
            var message;

            if (bcrypt.compareSync(lpassword, password)) {
                var payload = {
                    user_uuid: user[0].user_uuid,
                    user_name: user[0].user_name,
                    user_type: user[0].user_type,
                };


                var token = jwt.sign(payload, process.env.TOKEN_SECRET, {
                    expiresIn: '15d'
                });

                result({ token: token })

            }
            else {
                message = 'not';
            }
            result(null, message);
            return;
        }
    });


}
user.saveuser = function (new_userinfo, result) {


    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(new_userinfo.password, salt);
    new_userinfo.password = hash;

    var curerent_date = new Date();
    new_userinfo.user_uuid = uuid(curerent_date);



    db.query('INSERT INTO user SET ?', new_userinfo, function (error, results, fields) {
        if (error) {
            console.log("error: ", error);
            result(error, null);
        }
        else {

            result(null, res);





        }
    });

};
user.saveadmin = function (new_userinfo, result) {


    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(new_userinfo.password, salt);
    new_userinfo.password = hash;
    new_userinfo.user_type = 'admin';
    var curerent_date = new Date();
    new_userinfo.user_uuid = uuid(curerent_date);



    db.query('INSERT INTO user SET ?', new_userinfo, function (error, results, fields) {
        if (error) {
            console.log("error: ", error);
            result(error, null);
        }
        else {

            result(null, results);


        }
    });

};
user.savereception = function (new_userinfo, result) {


    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(new_userinfo.password, salt);
    new_userinfo.password = hash;
    new_userinfo.user_type = 'reception';
    var curerent_date = new Date();
    new_userinfo.user_uuid = uuid(curerent_date);



    db.query('INSERT INTO user SET ?', new_userinfo, function (error, results, fields) {
        if (error) {
            console.log("error: ", error);
            result(error, null);
        }
        else {

            result(null, results);


        }
    });

};
user.savetriage = function (new_userinfo, result) {



    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(new_userinfo.password, salt);
    new_userinfo.password = hash;
    new_userinfo.user_type = 'triage';
    var curerent_date = new Date();
    new_userinfo.user_uuid = uuid(curerent_date);



    db.query('INSERT INTO user SET ?', new_userinfo, function (error, results, fields) {
        if (error) {
            console.log("error: ", error);
            result(error, null);
        }
        else {

            result(null, results);


        }
    });

};
user.savePretriage = function (new_userinfo, result) {



    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(new_userinfo.password, salt);
    new_userinfo.password = hash;
    new_userinfo.user_type = 'Pretriage';
    var curerent_date = new Date();
    new_userinfo.user_uuid = uuid(curerent_date);



    db.query('INSERT INTO user SET ?', new_userinfo, function (error, results, fields) {
        if (error) {
            console.log("error: ", error);
            result(error, null);
        }
        else {

            result(null, results);


        }
    });

};


user.editPassword = function (user, result) {

    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(user.password, salt);

    user.password = hash;

    db.query('UPDATE user SET password =?, WHERE user_uuid = ?', [user.password, user.user_uuid], function (error, results, fields) {
        if (error) {
            console.log("error: ", error);
            result(error, null);
        }
        else {

            result(null, results);


        }
    });

};
user.editUsername = function (user, result) {


    db.query('UPDATE user SET user_name=?, WHERE user_uuid = ?', [user.user_name, user.user_uuid], function (error, results, fields) {
        if (error) {
            console.log("error: ", error);
            result(error, null);
        }
        else {

            result(null, results);


        }
    });

};
user.delete = function (value, result) {
    var deleted_value = value.user_uuid;


    db.query('DELETE from user  WHERE user_uuid = ?', [deleted_value], function (error, results, fields) {
        if (error) {
            console.log("error: ", error);
            result(error, null);
        }
        else {

            result(null, results);


        }
    });
};

module.exports = user;