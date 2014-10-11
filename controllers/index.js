'use strict';


var IndexModel = require('../models/index'),
    ProfileModel = require('../models/profile'),
    AdminModel = require('../models/admin'),
    DashBoardModel = require('../models/Dashboard'),
    BatchModel = require('../models/Batch'),
    BatchItemModel = require('../models/BatchItem'),
    FileModel = require('../models/File'),
    ItemModel = require('../models/Item'),
    auth = require('../lib/auth');
	

module.exports = function (router) {

    var indexmodel = new IndexModel();
    var profilemodel = new ProfileModel();
    var adminmodel = new AdminModel();
    var dashboardmodel = new DashBoardModel();
    var batchmodel = new BatchModel();
    var BatchItemmodel = new BatchItemModel();	
    var filemodel = new FileModel();
    var itemModel = new ItemModel();	
    
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
    router.get('/Batch',  function (req, res) {
        res.render('Batch', batchmodel);
    });
    router.get('/BatchItem',  function (req, res) {
        res.render('BatchItem', BatchItemmodel);
    });
    router.get('/File',  function (req, res) {
        res.render('File', filemodel);
    });
    router.get('/Item',  function (req, res) {
        res.render('Item', itemModel);
    });
    
    
    	
    /**
     * Allow the users to log out
     */
    router.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/login');
    });

};
