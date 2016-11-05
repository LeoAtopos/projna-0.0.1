"use strict";

var projModel = require('../Schemas/projectSchema');
var epitaphModel = require('../Schemas/epitaphSchema');

var Epitaph = epitaphModel.Epitaph;
var Proj = projModel.Project;

exports.loadepitaph = function (req, res) {
	console.log ("project => loadepitaph");
	var resData = {
		state : "visitor/self/other",
		project : {
			title	:"Epitaph",
			desc : "asdfsaf",
			data : {
				epitaph : ''
			}
		}
	}
	if (!req.session.user) {resData.state = "visitor"} else {
		if (req.session.user.UID === req.body.UID) {resData.state = "self"}
		else {resData.state = "other"}	
	}

	Proj.findOne({'title': 'epitaph'}, function (err, result) {
		if (err) {};
		if (result) {resData.project.title = result.title;	resData.project.desc = result.desc;}
		else {console.log ('project doesnot exist with title ' + 'epitaph');}
	})

//need to work something ,for none-login user to visitor some one's bookseeds directly by url
	console.log ("epitaph author is " + req.query.username);
	Epitaph.find({'author': req.query.username}, function (err, result) {
		if (err) {};
		if (result) {
			console.log(result);
			if (result.length > 0) {resData.project.data.epitaph=result[0].epitaph;}
			// 	// resData.project.data.bslist[resData.project.data.bslist.length] = bs;
		}
		else {console.log ('project doesnot exist with author ' + req.session.user.email);}
		res.send (resData);
	})

}

exports.addEpitaph = function (req, res) {
	console.log ("project => onEpitaph");
	console.log (req.session.user.email);
	console.log (req.body.epitaph);
	// var resList = new array();
	var resData = {
		error: [],
		msg: {
			update: [],
			add: []
		}
	}
	Epitaph.findOne({'author': req.session.user.email}, function (err, result) {
		if (err) {}
		if (result) { // if the seed of age already exist, then update the content. Keep the seeds unique to each age.
			result.epitaph = req.body.epitaph;
			// result.desc = req.body.book.desc;
			// result.link = req.body.book.link;
			result.save (function (err) {
				if (err) {resData.error.push(err)};
				// res.json({"success": "Book of age already exist, update done"});
				resData.msg.update.push(result.epitaph);
			})
		}
		else { // if there are no seed matched, save a new seed into db.
			var ep = new Epitaph();
			ep.author = req.session.user.email;
			ep.epitaph = req.body.epitaph;
			// result.desc = req.body.book.desc;
			// result.link = req.body.book.link;
			ep.save(function (err, result) {
				if (err) {resData.error.push(err)};
				console.log ("Successed adding seed: " + ep);
				// res.json("Successed adding seed: " + seed);
				resData.msg.add.push(ep);
			})
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