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
				"bslist" : [
					{
						"age" : "4",
						"bookname" : "lalala"
					},
					{
						"age" : "14",
						"bookname" : "lalala"
					}
				]
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
	
	Bookseeds.find({'author': req.session.user.email}, function (err, result) {
		if (err) {};
		if (result) {
			result.forEach (function(bs) {
				resData.project.data.bslist.push (bs);	
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
	req.body.bslist.forEach (function(sd){
		Bookseeds.findOne({'author': req.session.user.email, 'age': sd.age}, function (err, result) {
			if (err) {};
			if (result) { // if the seed of age already exist, then update the content. Keep the seeds unique to each age.
				result.bookname = req.body.book.bookname;
				// result.desc = req.body.book.desc;
				// result.link = req.body.book.link;
				result.save (function (err) {
					if (err) {};
					res.json({"success": "Book of age already exist, update done"});
				})
			}
			else { // if there are no seed matched, save a new seed into db.
				var seed = new Bookseeds();
				seed.author = req.session.user.email;
				seed.age = sd.age;
				seed.bookname = sd.bookname;
				// result.desc = req.body.book.desc;
				// result.link = req.body.book.link;
				seed.save(function (err, result) {
					if (err) {};
					console.log ("Successed adding seed: " + seed);
					res.json("Successed adding seed: " + seed);
				})
			}
		})
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

exports.admin.testBookseedsData = function (req, res) {
	Bookseeds.find(function (err, result) {
		if (err) {};
		if (result) {
			// result.forEach (function(bs) {
			// 	resData.project.data.push (bs);	
			// }) 
			res.json (result);
			var seed = new Bookseeds();
			seed.author = 'gz@qq.com';
			seed.age = result.length + 1;
			seed.bookname = seed.age + ' s Book';
			// result.desc = req.body.book.desc;
			// result.link = req.body.book.link;
			seed.save(function (err, result) {
				if (err) {};
				console.log ("Successed adding seed: " + seed);
				// res.json("Successed adding seed: " + seed);
			})
		}
		else {console.log ('project doesnot exist with author ' + req.session.user.email);res.json ('Null');}
	})
	// res.send (resData);
}

