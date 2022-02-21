"use strict";
exports.__esModule = true;
var jsonServer = require("json-server");
var fs = require("fs");
var https = require("https");
var auth_1 = require("./auth");
var menuItemImage_1 = require("./menuItemImage");
var server = jsonServer.create();
var router = jsonServer.router('db.json');
var middlewares = jsonServer.defaults();
// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);
// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);
server.post('/partner/login', auth_1.handlePartnerAuthentication);
// server.post('/orders', handleAuthorization);
server.post('/restaurants/:restaurantId/update-image', auth_1.handleRestaurantProfileUpdateImage, function (req, res, next) {
    var file = req.file;
    if (!file) {
        var error = new Error('Please upload a file');
        return next(error);
    }
    res.status(200).send({
        statusCode: 200,
        status: 'success',
        uploadedFile: file
    });
}, function (error, req, res, next) {
    res.status(400).send({
        error: error.message
    });
});
server.post('/menuItems/:menuItemId/update-image', menuItemImage_1.handleMenuItemUpdateImage, function (req, res, next) {
    var file = req.file;
    if (!file) {
        var error = new Error('Please upload a file');
        return next(error);
    }
    res.status(200).send({
        statusCode: 200,
        status: 'success',
        uploadedFile: file
    });
}, function (error, req, res, next) {
    res.status(400).send({
        error: error.message
    });
});
server.use(router);
var options = {
    cert: fs.readFileSync('./backend/keys/cert.pem'),
    key: fs.readFileSync('./backend/keys/key.pem')
};
https.createServer(options, server).listen(3001, function () {
    console.log('JSON Server is running');
});
