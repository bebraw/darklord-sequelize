'use strict';
var passportLocalSequelize = require('passport-local-sequelize');


module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define('User', {
        email: DataTypes.STRING,
        active: DataTypes.BOOLEAN,
        verified: DataTypes.BOOLEAN,
        verifyToken: DataTypes.STRING,
        forgotPasswordToken: DataTypes.STRING,
        forgotPasswordExpires: DataTypes.DATE,
    });

    passportLocalSequelize.attachToUser(User, {
        usernameField: 'email',
    });

    return User;
};
