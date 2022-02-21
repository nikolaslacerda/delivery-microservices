"use strict";
exports.__esModule = true;
exports.handlePartnerAuthentication = exports.handleAuthentication = void 0;
var users_1 = require("./users");
var jwt = require("jsonwebtoken");
var api_config_1 = require("./api.config");
exports.handleAuthentication = function (req, res) {
    var user = req.body;
    if (isValid(user)) {
        var dbUser = users_1.users[user.email];
        var token = jwt.sign({
            sub: dbUser.id,
            iss: 'delivery-api',
            role: 'client'
        }, api_config_1.apiConfig.secret);
        return res.json({ id: dbUser.id, name: dbUser.name, email: dbUser.email, access_token: token });
    }
    else {
        res.status(403).json({ message: 'Invalid Data' });
    }
};
exports.handlePartnerAuthentication = function (req, res) {
    var user = req.body;
    if (isValid(user)) {
        var dbUser = users_1.partners[user.email];
        var token = jwt.sign({
            sub: dbUser.id,
            iss: 'delivery-api',
            role: 'partner'
        }, api_config_1.apiConfig.secret);
        return res.json({ id: dbUser.id, role: dbUser.role, access_token: token });
    }
    else {
        res.status(403).json({ message: 'Invalid Data' });
    }
};
function isValid(user) {
    if (!user) {
        return false;
    }
    var dbUser = users_1.users[user.email];
    return dbUser !== undefined && dbUser.matches(user);
}
