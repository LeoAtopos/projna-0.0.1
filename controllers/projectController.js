"use strict";

var projModel = require('../Schemas/projectSchema');
var userModel = require('../Schemas/userSchema');
// var bookseedsModel = require('../Schemas/bookseedsSchema');

var bookseedsController = require('./projectBookseedsController');
var epitaphController = require('./projectEpitaphController');

var Proj = projModel.Project;
var User = userModel.User;

exports.bookseedsController = bookseedsController;
exports.epitaphController = epitaphController;

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

	// User.find({}, function (err, r) {
	// 	console.log(r);
	// })
	//console.log(req.query.proj);
	Proj.find({title: req.query.proj},function (err, result) {
		if (err) {};
		if (result) {
			console.log(result);
			console.log (result[0].featurer);

			// var trytry = function (argument) {
			// 	// body...
			// }

			// result[0].featurer.forEach (function (err, fp) {
			// 	// console.log ("fp is " + result[0].featurer[fp]);
			// 	User.findOne({email: result[0].featurer[fp]}, function (err, pp) {
			// 		console.log ("pp is " + pp);
			// 		var d = {};
			// 		d.nickname = pp.email;
			// 		d.pic = pp.pic;
			// 		resData.msg.push (d);
			// 	})
			// })

			var tmpNum = 0;
			for (var i = 0; i < result[0].featurer.length; i++) {
				User.findOne({email: result[0].featurer[i]}, function (err, pp) {
					console.log ("pp is " + pp);
					var d = {};
					d.id = pp._id;
					d.nickname = pp.nickname;
					d.pic = pp.pic;
					resData.msg.push (d);
					tmpNum ++;
					if (tmpNum == result[0].featurer.length) {
						res.send (resData);
					}
				})		
			}

			// res.send (resData);
		}
		else {console.log ('No person worth to be featured!');resData.error[0]="No person worth to be featured!"}
		console.log ("resData " + resData);
	})
}

exports.admin.addProject = function (req, res) {
	console.log ("project => oncreate");
	var proj = new Proj();
	Proj.findOne({'title': 'epitaph'}, function (err, result) {
		if (err) {};
		if (result) {console.log ('project already exist');}
		else {
			proj.title = 'epitaph';
			proj.save(function (err, userInfo) {
				if (err) {};
				console.log ("Successed adding project: "+'bookseeds');
				res.send ("Successed adding project: "+'bookseeds');
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

