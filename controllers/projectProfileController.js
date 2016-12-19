"use strict";

var projModel = require('../Schemas/projectSchema');
var userModel = require('../Schemas/userSchema');

var Proj = projModel.Project;
var User = userModel.User;

exports.loadprofile = function (req, res) {
	console.log ("project => loadprofile");
	var resData = {
		state : "visitor/self/other",
		nickname : "",
		project : {
			title	:"profile",
			desc : "asdfsaf",
			data : {
				profile : {
					nickname : '',
					email : '',
					pic : ''
				}
			}
		}
	}
	if (!req.session.user) {resData.state = "visitor"} else {
		if (req.session.user.UID === req.body.UID) {resData.state = "self"}
		else {resData.state = "other"}	
	}

	Proj.findOne({'title': 'profile'}, function (err, result) {
		if (err) {};
		if (result) {resData.project.title = result.title;	resData.project.desc = result.desc;}
		else {console.log ('project doesnot exist with title ' + 'profile');}
	})

//need to work something ,for none-login user to visitor some one's bookseeds directly by url
	console.log ("profile author is " + req.query._id);

	User.findOne({'_id':req.query._id},function (err, result){
		if(err){}
		if(result){
			resData.nickname = result.nickname;
			var pf = {
						nickname : '',
						email : '',
						pic : ''
					};
			pf.nickname = result.nickname;
			pf.email = result.email;
			pf.pic = result.pic;
			resData.project.data.profile = pf;
			res.send (resData);
		}else res.send("404");
	});	
}

exports.addProfile = function (req, res) {
	console.log ("project => onProfile");
	console.log (req.session.user.email);
	console.log (req.body.profile);

	var uid = req.session.user._id;
	// var resList = new array();
	var resData = {
		error: [],
		msg: {
			update: [],
			add: []
		}
	}
	User.findOne({'_id': req.session.user._id}, function (err, result) {
		if (err) {}
		if (result) { // if the seed of age already exist, then update the content. Keep the seeds unique to each age.
			result.email = req.body.profile.email;
			result.pic = req.body.profile.pic;
			// result.desc = req.body.book.desc;
			// result.link = req.body.book.link;
			result.save (function (err) {
				if (err) {resData.error.push(err)};
				// res.json({"success": "Book of age already exist, update done"});
				resData.msg.update.push(result);
			})
		}
		else { // if there are no seed matched, save a new seed into db.
		}
	})
	res.json (resData);
}

// exports.addEpitaph = function (req, res) {
// 	console.log ("project => onEpitaph");
// 	// console.log (req.session.user.email);
// 	// console.log (req.body.epitaph);
// 	// var resList = new array();
// 	var resData = {
// 		error: [],
// 		msg: {
// 			update: [],
// 			add: []
// 		}
// 	}
// 	Epitaph.findOne({'author': "gz@qq.com"}, function (err, result) {
// 		if (err) {}
// 		if (result) { // if the seed of age already exist, then update the content. Keep the seeds unique to each age.
// 			result.epitaph = req.body.epitaph;
// 			// result.desc = req.body.book.desc;
// 			// result.link = req.body.book.link;
// 			result.save (function (err) {
// 				if (err) {resData.error.push(err)};
// 				// res.json({"success": "Book of age already exist, update done"});
// 				resData.msg.update.push(result.epitaph);
// 			})
// 		}
// 		else { // if there are no seed matched, save a new seed into db.
// 			var ep = new Epitaph();
// 			ep.author = "gz@qq.com";
// 			ep.epitaph = "this is not dying";
// 			// result.desc = req.body.book.desc;
// 			// result.link = req.body.book.link;
// 			ep.save(function (err, result) {
// 				if (err) {resData.error.push(err)};
// 				console.log ("Successed adding taph: " + ep);
// 				// res.json("Successed adding seed: " + seed);
// 				resData.msg.add.push(ep);
// 			})
// 		}
// 	})

// 	res.json (resData);
// }