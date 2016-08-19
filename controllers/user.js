"use strict";

var path = require('path');
var model = require('../models/user');
var User = model.User;


exports.register = function (req, res) {
	console.log ("user => register");
	res.send ("haha");
	// var user = new User();
	// User.findOne({'email': 'gooze'}, function (err, result) {
	// 	if (err) {};
	// 	if (result) {req.session.error = 'user already exist';res.json({"success": "user already exist"});}
	// 	else {
	// 		user.email = 'gooze';
	// 		user.save(function (err, userInfo) {
	// 			if (err) {};
	// 			console.log ("Successed adding user: ");
	// 			res.json("Successed adding user: ");
	// 		})
	// 	}
	// })
}

exports.onregister = function (req, res) {
	console.log ("user => onregister");
	var user = new User();
	User.findOne({'email': req.body.email}, function (err, result) {
		if (err) {};
		if (result) {req.session.error = 'user already exist';res.json({"success": "user already exist"});}
		else {
			user.email = req.body.email;
			user.password = req.body.password;
			user.save(function (err, userInfo) {
				if (err) {};
				console.log ("Successed adding user: "+req.body.email);
				req.session.user = userInfo;
				req.session.save;
				res.json("Successed adding user: "+req.body.email);
			})
		}
	})
}

// exports.login = function (req, res) {
// 	console.log ('user => login');
// 	res.header("Content-Type", "text/html");
// 	res.sendFile(path.join(__dirname+'/public/pages/login.html'));
// 	// res.sendFile (__dirname+'/public/login.html');
// }

exports.onlogin = function (req, res) {
	console.log ('user => onlogin');
	// console.log (req.body.email);
	// res.json ({"success": "you got me!"});
	var user = new User();
	User.findOne({'email': req.body.email}, function (err, result) {
		if (err) {};
		if (!result) {
			req.session.error = 'user not exist';
			res.json ({"success": "user not exist"});
		} else {
			if (req.body.password != result.password) {
				req.session.error = 'Wrong password';
				res.json ({"success": "Wrong password"});
			} else {
				// console.log (req.session);
				// console.log (result);
				req.session.user = result;
				// console.log (req.session);
				req.session.cookie.looking = req.params.email || "";
				req.session.save;
				res.json ({"success": 'Login Successed', session: req.session.user});
			}
		}
	});
}

exports.logout = function (req, res) {
	console.log ('user => logout');
	req.session.destroy (function () {
		res.redirect('/');
	})
}

exports.checkSession = function (req, res) {
	console.log ("user => checkSession");
	// console.log (req.session);
	if (!req.session.user) {
		res.json ({status: 'visiter'})
	} else {
		// console.log (req.session);
		res.json ({status: 'user', session: req.session.user});
	}
}

exports.admin = function (req, res) {

}

exports.admin.userCheck = function (req, res) {
	var user = new User();
	User.find({}, function (err, data) {
		if (err) {};
		console.log (data);
		res.json ({words: user.say()});
	});
}

exports.admin.userCreate = function (req, res) {
	// var project = {
	// 	projTitle: 'profile',
	// 	joinDate : Date.now,
	// 	desc: '',
	// 	comment: {
	// 		author: '',
	// 		content: ''
	// 	}
	// }
	var user = new User();
	User.findOne({'email': req.query.email}, function (err, result) {
		if (err) {};
		if (result) {req.session.error = 'user already exist';res.json({"success": "user already exist"});}
		else {
			user.email = req.query.email;
			user.password = req.query.password;
			// user.projects.push (project);
			user.save(function (err, userInfo) {
				if (err) {};
				console.log ("Successed adding user: "+req.query.email);
				req.session.user = userInfo;
				req.session.save;
				res.json({voice: "Successed adding user: "+req.body.email, data: userInfo});
			})
		}
	})
}

exports.admin.joinProjTest = function (req, res) {
	var proj = model.projPrivateInfo;
	proj.projTitle = 'Great';

	User.findOne({'email': 'reseter@sina.com'}, function (err, result) {
		if (err) {};
		if (!result) {
			console.log ('user not exist');
		} else {
			result.projects.push(JSON.stringify(proj));

			console.log (result.projects);

			var p = JSON.parse(result.projects[1]);

			console.log (p);
		}
	});
}

exports.admin.testWebSession = function (req, res) {
	var user = new User ();
	req.session.user = user;
	res.json (req.session);	
}