"use strict";

var util = require ('../utility');

var path = require('path');
var model = require('../Schemas/userSchema');
var projModel = require('../Schemas/projectSchema');

var User = model.User;
var Proj = projModel.Project;

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
			user.nickname = req.body.nickname;
			user.password = req.body.password;
			user.save(function (err, userInfo) {
				if (err) {};
				console.log ("Successed adding user: "+req.body.email);
				req.session.user = userInfo;
				req.session.save;

				//hook up the user to the profile project in projects
				Proj.findOne({'title':'profile'},function (err, pjResult){
					var uid = userInfo._id;
					pjResult.followers.push(uid);
				});

				res.json("Successed adding user: "+req.body.email);
			})
		}
	});
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
	util.getLogs ("user => checkSession");
	// console.log ("user => checkSession");
	// console.log (req.session);
	if (!req.session.user) {
		res.json ({status: 'visiter'})
	} else {
		// console.log (req.session);
		var sessionTmp = req.session.user;
		sessionTmp.password = "";
		sessionTmp.email = "";
		res.json ({status: 'user', session: sessionTmp});
	}
}

exports.getProjna = function (req, res) {
	console.log ('user => getProjna');
	var uid = req.query._id;
	var projnaTmp = [];

	//no one login, just a visitor, then send all projnas
	if (uid === "_id") {
		Proj.find({},function (err, result){
			if(err){}
			if(result){
				// console.log ("******result is " + result);
				for(var i = 0;i<result.length;i++){
					var pj = {};
					pj.id = result[i].title;
					pj.name = result[i].name;
					pj.pic = result[i].pic;
					pj.order = result[i].order;
					pj.state = 'intro';
					projnaTmp.push(pj);
				}
				// console.log ("******** projnaTmp to send is " + projnaTmp);
				res.json ({projna: projnaTmp,nickname:"visitor"});
			}
		});
		// res.json ({
		// 	projna: [
		// 				{id : "bookseeds", name : "Book Seeds", pic : "Pro1-pic", state : "intro"},//build,
		// 				{id : "epitaph", name : "Epitaph", pic : "Pro2-pic", state : "intro"}
		// 			],
		// 	nickname: "visitor"
		// });
	}
	else {

		//get all projects from Projects collection
		User.findOne({'_id':uid},function (err, nResult){
			if(err){}
			if(nResult){
				Proj.find({},function (err, result){
					if(err){}
					if(result){
						for(var i = 0;i<result.length;i++){
							var pj = {};
							pj.id = result[i].title;
							pj.name = result[i].name;
							pj.pic = result[i].pic;
							pj.order = result[i].order;
							pj.state = 'intro';
							for(var j = 0; j<nResult.projna.length; j++){
								if(nResult.projna[j] === result[i].title){
									pj.state = 'build';
								}
							}
							projnaTmp.push(pj);
						}
					}
					res.json ({projna: projnaTmp,nickname:nResult.nickname});
				});
			}
			else {
				res.json ({
					projna: [
								{id : "bookseeds", name : "Book Seeds", pic : "Pro1-pic", state : "intro"},//build,
								{id : "epitaph", name : "Epitaph", pic : "Pro2-pic", state : "intro"}
							],
					nickname: "halala2"
				});
			}
		});
	}

}
	
	// //send back all projects.
	// User.findOne({'_id': uid}, function (err, result) {
	// 	if (err) {}
	// 	if (!result) {
	// 		req.session.error = 'user not exist';
	// 		res.json ({"success": "user not exist"});
	// 	} else {
	// 		var msg = '';
	// 		// if (result.projects.length < 2) {msg = }
	// 		res.json ({projna: result.projna,nickname:result.nickname});
	// 	}
	// })

exports.uploadPic = function (req, res) {
	if(typeof req.file != 'undefined'){
		console.log("this is   "+req.file);
		User.findOne({'_id':req.session.user._id},function (err, result){
			if(err){}
			if(result){
				result.pic = req.file.filename;
				result.save (function (err) {
					if (err) {resData.error.push(err)};

					res.redirect('/project/profile/build/'+req.session.user._id);
				})
			}
		});
	}
	else {
		res.redirect('/project/profile/build/'+req.session.user._id);
	}
	
	
}

exports.admin = function (req, res) {

}

exports.admin.addProjToMe = function (req, res) {
	var user = new User();
	res.json (user.selfProjna ({id: 11123, name: 'test Proj'}));
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
