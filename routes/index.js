"use strict";

var express = require('express');
var path = require('path');

var api = require("./api");
var error = require("./error");
	
module.exports = function (app) {
	app.use('/static', express.static(path.join(__dirname, '../static')));
	app.use('/dist', express.static(path.join(__dirname, '../dist')));

	api(app);

	error(app);
};
