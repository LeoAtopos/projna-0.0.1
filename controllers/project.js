"use strict";

var model = require('../models/project');
var bookseedsModel = require('../models/bookseeds');

var Proj = model.Project;
var Bookseeds = bookseedsModel.Bookseeds;

exports.common = function (req, res) {

}

exports.common.myproject = function (req, res) {

}

exports.admin = function (req, res) {

}

exports.loadbookseeds = function (req, res) {
	console.log ("project => loadbookseeds");
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
					},
					"1" :{
						"age" : "14",
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
		else {console.log ('project doesnot exist with title ' + 'Bookseeds');}
	})
	
	Bookseeds.findOne({'author': req.session.user.email}, function (err, result) {
		if (err) {};
		if (result) {
			result.forEach (function(bs) {
				resData.project.data.push (bs);	
			}) 
		}
		else {console.log ('project doesnot exist with author ' + req.session.user.email);}
	})

	res.send (resData);
}

exports.addSeeds = function (req, res) {
	console.log ("project => onAddSeed");
	console.log (req.session.user.email);
	console.log (req.body.bslist);
	Bookseeds.findOne({'author': req.session.user.email, 'age': req.body.bslist[0].age}, function (err, result) {
		if (err) {};
		if (result) {
			result.bookname = req.body.book.bookname;
			// result.desc = req.body.book.desc;
			// result.link = req.body.book.link;
			result.save (function (err) {
				if (err) {};
				res.json({"success": "Book of age already exist, update done"});
			})
		}
		else {
			var seed = new Bookseeds();
			seed.author = req.session.user.email;
			seed.age = req.body.bslist[0].age;
			seed.bookname = req.body.bslist[0].bookname;
			// result.desc = req.body.book.desc;
			// result.link = req.body.book.link;
			seed.save(function (err, result) {
				if (err) {};
				console.log ("Successed adding seed: " + seed);
				res.json("Successed adding seed: " + seed);
			})
		}
	})
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

