"use strict";

var model = require('../Schemas/projectSchema');
// var bookseedsModel = require('../Schemas/bookseedsSchema');

var bookseedsController = require('./projectBookseedsController');
var epitaphController = require('./projectEpitaphController');

var Proj = model.Project;


exports.common = function (req, res) {

}

exports.common.myproject = function (req, res) {

}

exports.admin = function (req, res) {

}

exports.loadFeaturePerson = function (req, res) {
	console.log ("project => loadFeaturePerson");
	console.log (req.params.projectTitle);
	var resData = {
		error: [],
		msg: []
	}
	Bookseeds.find({}, function (err, result) {
		if (err) {};
		if (result) {
			result.forEach (function(bs) {
				resData.msg.push (bs);
				console.log(bs);
			})
		}
		else {console.log ('No person worth to be featured!');resData.error[0]="No person worth to be featured!"}
		
		res.send (resData);
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
	var data = [];
	Proj.find({'title': 'Bookseeds'}, function (err, result) {
		if (err) {};
		if (result) {console.log (result);data.push(result);}
		else {
			console.log ('project doesnot exist');
		}
	})
	console.log (data);
	res.json (data);
}

exports.admin.testBookseedsData = function (req, res) {
	Bookseeds.find(function (err, result) {
		if (err) {};
		if (result) {
			// result.forEach (function(bs) {
			// 	resData.project.data.push (bs);	
			// }) 
			res.json (result);
			// var seed = new Bookseeds();
			// seed.author = 'gz@qq.com';
			// seed.age = result.length + 1;
			// seed.bookname = seed.age + ' s Book';
			// result.desc = req.body.book.desc;
			// result.link = req.body.book.link;
			// seed.save(function (err, result) {
			// 	if (err) {};
			// 	console.log ("Successed adding seed: " + seed);
			// 	// res.json("Successed adding seed: " + seed);
			// })
		}
		else {console.log ('project doesnot exist with author ' + req.session.user.email);res.json ('Null');}
	})
	// res.send (resData);
}

