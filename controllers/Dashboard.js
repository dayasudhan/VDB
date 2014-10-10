//var express = require('express');
//var socketio = require('socket.io');
//var oracle = require("oracle"); 
//var connectData = { "hostname": "lvsvmdb26.qa.paypal.com","port":"2126", "user": "GMFAPP", "password": "GMFAPPSTG", "database": "QADBA9NZ" };
'use strict';


var DashBoardModel = require('../models/Dashboard'),
    auth = require('../lib/auth');


module.exports = function (app) {

    var model = new DashBoardModel();


    app.get('/Dashboard', auth.isAuthenticated(), function (req, res) {

        res.render('Dashboard', model);

    });

};
