'use strict';
var jasmine = require('jasmine-node');
var frisby = require('frisby');

var URL = 'http://localhost:3000';


main();

function main() {
    // TODO: nuke test db + run server before testing
    register();
}

function register() {
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
}
