"use strict";

var path = require('path');
var model = require('../models/project');
var Proj = model.Project;


// var ProjectSchema = new Schema({
// 	title: {type: String, default: "Proj."},
// 	desc: {type: String, default: "This is a projna project."},
// 	createDate: {type: Date, default: Date.now},
// 	data: type: String
// })


exports.admin = function (req, res) {

}

exports.admin.addProject = function (req, res) {
	console.log ("project => oncreate");
	var proj = new Proj();
	Proj.findOne({'title': 'Bookseeds'}, function (err, result) {
		if (err) {};
		if (result) {console.log ('project already exist');}
		else {
			proj.title = 'Bookseeds';
			proj.save(function (err, userInfo) {
				if (err) {};
				console.log ("Successed adding project: "+'Bookseeds');
				res.send ("Successed adding project: "+'Bookseeds');
			})
		}
	})
}

exports.admin.testProjectData = function (req, res) {
	console.log ("project => oncreate");
	var proj = new Proj();
	Proj.findOne({'title': 'Bookseeds'}, function (err, result) {
		if (err) {};
		if (result) {res.send (result + "-------" + result.followers.length);}
		else {
			console.log ('project doesnot exist');
		}
	})
}
