'use strict';
var passportLocalSequelize = require('passport-local-sequelize');


module.exports = function(sequelize, DataTypes) {
    // createdAt -> created
    var User = passportLocalSequelize.defineUser(sequelize, {
        email: DataTypes.STRING,
        active: DataTypes.BOOLEAN,
        verified: DataTypes.BOOLEAN,
        verifyToken: DataTypes.STRING,
        forgotPasswordToken: DataTypes.STRING,
        forgotPasswordExpires: DataTypes.DATE,
    });

    return User;
};
