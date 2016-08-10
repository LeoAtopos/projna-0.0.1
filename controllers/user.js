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
				console.log (req.session);
				console.log (result);
				req.session.user = result;
				console.log (req.session);
				req.session.save;
				res.json ({"success": 'Login Successed'});
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
	console.log (req.session);
	if (!req.session.user) {
		res.json ({status: 'visiter'})
	} else {
		console.log (req.session);
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