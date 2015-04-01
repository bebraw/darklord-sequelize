'use strict';
var jasmine = require('jasmine-node');
var frisby = require('frisby');

var config = require('../config');

config.database.test.logging = noop;

var models = require('../models')(config.database.test);
var server = require('../server');

var URL = 'http://localhost:3000';


describe('Registration', function() {
    var port = 1351;
    var s = null;

    beforeEach(function(done) {
        // run server
        server({
            config: config,
            models: models,
        }, function(app) {
            s = app.listen(port);

            // nuke possible db
            models.sequelize.sync({
                force: true,
            }, done);
        });
    });

    afterEach(function() {
        s.close();
    });

    // XXX: figure out this part
    //it('should be able to register', function() {
    frisby.create('POST register').post(URL + '/register', {
        email: 'myemail@address.com',
        password: '123456',
    }).
    expectStatus(200).
    expectJSONTypes({
        token: String,
        expires: String,
    }).
    afterJSON(function(user) {
        console.log('user', user);
    }).
    toss();
    //});
});

function noop() {}
