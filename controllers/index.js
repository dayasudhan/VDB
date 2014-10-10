'use strict';


var IndexModel = require('../models/index'),
    ProfileModel = require('../models/profile'),
    AdminModel = require('../models/admin'),
    DashBoardModel = require('../models/Dashboard'),
    auth = require('../lib/auth');
	

module.exports = function (router) {

    var indexmodel = new IndexModel();
    var profilemodel = new ProfileModel();
    var adminmodel = new AdminModel();
    var dashboardmodel = new DashBoardModel();

    router.get('/', function (req, res) {
        res.render('index', indexmodel);
    });


    router.get('/profile', function(req, res) {
        res.render('profile', profilemodel);
    });


    router.get('/admin', auth.isAuthenticated('admin'), auth.injectUser(), function(req, res) {
        res.render('admin', adminmodel);
    });

    router.get('/Dashboard',  function (req, res) {

        res.render('Dashboard', dashboardmodel);

    });	
    /**
     * Allow the users to log out
     */
    router.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/login');
    });

};
