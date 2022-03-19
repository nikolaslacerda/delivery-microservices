"use strict";
exports.__esModule = true;
exports.handleGetProfileImage = void 0;
var paths = require('path');
var handleGetProfileImage = function (req, res) {
    var path = __dirname + "/../../db-images/restaurants/";
    console.log(path);
    return res.sendFile(paths.resolve(path + req.params.imageName));
};
exports.handleGetProfileImage = handleGetProfileImage;
