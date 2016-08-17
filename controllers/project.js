"use strict";

var path = require('path');
var model = require('../models/project');
var bookseedsModel = require('../models/bookseeds');

var Proj = model.Project;
var Bookseeds = bookseedsModel.Bookseeds;

exports.admin = function (req, res) {

}

exports.loadbookseeds = function (req, res) {
	var resData = {
		"state" : "visitor/self/other",
		"project" : {
			"title"	:"Book Seeds",
			"desc" : "asdfsaf",
			"data" : {
				"bslist" : {
					"0" :{
						"age" : "4",
						"bookname" : "lalala"
					}
				}
			}
		}
	}
	if (!req.session.user) {resData.state = "visitor"} else {
		if (req.session.user.UID === req.body.UID) {resData.state = "self"}
		else {resData.state = "other"}	
	}

	Proj.findOne({'title': 'Bookseeds'}, function (err, result) {
		if (err) {};
		if (result) {resData.project.title = result.title;	resData.project.desc = result.desc;}
		else {console.log ('project doesnot exist');}
	})
	
	Bookseeds.findOne({'author': req.session.user.email}, function (err, result) {
		if (err) {};
		if (result) {
			result.forEach (function(bs) {
				resData.project.data.push (bs);	
			}) 
		}
		else {console.log ('project doesnot exist');}
	})

	res.send (resData);
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
