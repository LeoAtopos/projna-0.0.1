"use strict";

var path = require('path');
var model = require('../Schemas/userSchema');
var projModel = require('../Schemas/projectSchema');

var User = model.User;
var Proj = projModel.Project;


exports.searchSTH = function (req, res) {
	console.log ("user => search");
	res.send ("hahah");
}

