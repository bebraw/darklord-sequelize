'use strict';
var express = require('express');
var cors = require('cors');
var helmet = require('helmet');
var errorHandler = require('errorhandler');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var terminator = require('t1000');


module.exports = function(o, cb) {
    var models = o.models;

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

    app.use(function(err, req, res, next) {
        if(o.logExtra) {
            console.trace(err);
        }

        res.status(500).json({});
    });

    terminator();

    cb(app);
};
