var express = require('express');
var user = require('../model/user');
const Joi = require('joi');

const schema = Joi.object({
    title: Joi.string().trim().max(100).required(),
    note: Joi.string().trim().required(),
});

exports.createuser = function (req, res) {
    var new_user_info = new user(req.body);
    user.check_user_avaliabilty(new_user_info, function (err, result) {
        if (result[0]) {
            res.json({ message: 'username is taken' });

        }

        else {

            user.saveuser(new_user_info, function (err, result) {
                if (err) {
                    res.send('someting worng');
                }
                else {
                    res.json({ message: 'user added' });
                }
            });

        }

    });
};
exports.createadmin = function (req, res) {
    var new_user_info = new user(req.body);
    user.check_user_avaliabilty(new_user_info, function (err, result) {
        if (result[0]) {
            res.json({ message: 'username is taken' });

        }

        else {

            user.saveadmin(new_user_info, function (err, result) {
                if (err) {
                    res.send('someting worng');
                }
                else {
                    res.json({ message: 'user added' });
                }
            });

        }

    });
};
exports.creattriage = function (req, res) {
    var new_user_info = new user(req.body);
    user.check_user_avaliabilty(new_user_info, function (err, result) {
        if (result[0]) {
            res.json({ message: 'username is taken' });

        }

        else {

            user.savetriage(new_user_info, function (err, result) {
                if (err) {
                    res.send('someting worng');
                }
                else {
                    res.json({ message: 'user added' });
                }
            });

        }

    });
};
exports.creatPretriage = function (req, res) {
    var new_user_info = new user(req.body);
    user.check_user_avaliabilty(new_user_info, function (err, result) {
        if (result[0]) {
            res.json({ message: 'username is taken' });

        }

        else {

            user.savePretriage(new_user_info, function (err, result) {
                if (err) {
                    res.send('someting worng');
                }
                else {
                    res.json({ message: 'user added' });
                }
            });

        }

    });
};
exports.createreception = function (req, res) {
    var new_user_info = new user(req.body);
    user.check_user_avaliabilty(new_user_info, function (err, result) {
        if (result[0]) {
            res.json({ message: 'username is taken' });

        }

        else {

            user.savereception(new_user_info, function (err, result) {
                if (err) {
                    res.send('someting worng');
                }
                else {
                    res.json({ message: 'user added' });
                }
            });

        }

    });
};
exports.alluser = function (req, res) {

    user.getAlluser(function (err, user) {
        res.send({ user: user });
    });
};

exports.searchuser = function (req, res) {
    var Value = req.body;
    user.search(Value, function (err, user) {
        if (err) {
            res.send('someting worng');
        }
        else {
            res.send({ users: user });
        }

    });
};

exports.update_username = function (req, res) {
    var updted = req.body;
    updted.user_uuid = req.user.user_uuid;
    user.check_user_avaliabilty(updted, function (err, result) {
        if (result[0]) {
            res.json({ message: 'username is taken' });

        }

        else {
            user.editUsername(updted, function (err, result) {
                if (err) {
                    res.send('someting worng');
                }
                else {
                    res.json(result);
                }

            });
        }

    });
};
exports.update_password = function (req, res) {
    var updted = req.body;
    updted.user_uuid = req.user.user_uuid;
    user.editPassword(updted, function (err, result) {
        if (err) {
            res.send('someting worng');
        }
        else {
            res.json(result);
        }

    });

};

exports.deleteuser = function (req, res) {
    deleteValue = req.body;
    deleteValue.user_uuid = req.user.user_uuid;
    user.delete(deleteValue, function (err, result) {
        if (err) {
            res.send('someting worng');
        }
        else {
            res.json({ message: deleted });
        }

    });

};
exports.deletebyadmin = function (req, res) {
    deleteValue = req.body;
    user.delete(deleteValue, function (err, result) {
        if (err) {
            res.send('someting worng');
        }
        else {
            res.json({ message: deleted });
        }

    });

};