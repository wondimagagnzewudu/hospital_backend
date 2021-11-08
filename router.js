const express = require('express');
const volleyball = require('volleyball');
const app = express();
const cors = require('cors');
const middleware = require('./middlewar/auth.middlewares');
require('dotenv').config();
bodyParser = require('body-parser');
app.use(express.json());
var whitelist = ['http://localhost:3000', 'http://192.168.137.1:8081',]

app.use(cors({
    origin: function (origin, callback) {

        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}));
app.use(volleyball);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.route('/login').post(middleware.login);
//app.route('/create_user').post(middleware.createuser);
//app.use(middleware.checkTokenSetUser);s
var user_task_route = require('./controller/user');
var mrn_route = require('./controller/mrn');
var tracer_card_route = require('./controller/tracer_card');

app.route('/create_user_reception').post(user_task_route.createreception);
app.route('/create_user_triage').post(user_task_route.creattriage);
app.route('/create_user_pretriage').post(user_task_route.creatPretriage);
app.route('/create_user_admin').post(user_task_route.createadmin);
app.route('/all_user').get(user_task_route.alluser);
app.route('/delete_user').delete(user_task_route.deleteuser);
app.route('/delete_by_admin').delete(user_task_route.deletebyadmin);
app.route('/update_password').post(user_task_route.update_password);
app.route('/search_user').post(user_task_route.searchuser);

app.route('/create_tracer_card').post(tracer_card_route.createtracer_card);
app.route('/all_tracer_card').get(tracer_card_route.alltracer_card);
app.route('/delete_tracer_card').delete(tracer_card_route.deletetracer_card);
app.route('/search_tracer_card').post(tracer_card_route.seaechtracer_card);

app.route('/create_mrn').post(mrn_route.createmrn);
app.route('/all_mrn').get(mrn_route.allmrn);
app.route('/delete_mrn').delete(mrn_route.deletemrn);
app.route('/search_mrn').post(mrn_route.seaechmrn);
module.exports = app;