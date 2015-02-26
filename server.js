'use strict';
var express = require('express');
var darklord = require('darklord');
var cors = require('cors');
var helmet = require('helmet');
var errorHandler = require('errorhandler');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var terminator = require('t1000');


module.exports = function(o, cb) {
    var User = o.models && o.models.User;
    var databaseSvc = require('./lib/databaseSvc')(User);

    var app = express();

    if(o.logExtra) {
        app.use(errorHandler());
        app.use(morgan('dev'));
    }

    app.use(cors());

    app.use(helmet());

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: false
    }));

    var router = express.Router();
    app.use('/', router);

    darklord({
        router: router,
        secret: o.config.jwtSecret,
        databaseSvc: databaseSvc,
        user: User,
    });

    app.use(function(err, req, res, next) {
        if(o.logExtra) {
            console.trace(err);
        }

        res.status(500).json({});
    });

    terminator();

    cb(app);
};
