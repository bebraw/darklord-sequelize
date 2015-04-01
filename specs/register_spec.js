'use strict';
var request = require('supertest');

var config = require('../config');

config.database.test.logging = noop;

var models = require('../models')(config.database.test);
var server = require('../server');

var URL = 'http://localhost:3000';


describe('Registration', function() {
    var app = null;

    beforeEach(function(done) {
        // set up server
        server({
            config: config,
            models: models,
        }, function(a) {
            app = a;

            // nuke possible db
            models.sequelize.sync({force: true}).finally(done);
        });
    });

    it('should be able to register', function(done) {
        request(app).post('/register', {
            email: 'myemail@address.com',
            password: '123456',
        }).expect('Content-Type', /json/).
            expect(200, done);

        /*
        expectJSONTypes({
            token: String,
            expires: String,
        })*/
    });
});

function noop() {}
