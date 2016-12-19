"use strict";

var projModel = require('../Schemas/projectSchema');
var userModel = require('../Schemas/userSchema');
var bookseedsModel = require('../Schemas/bookseedsSchema');

var Bookseeds = bookseedsModel.Bookseeds;
var Proj = projModel.Project;
var User = userModel.User;

exports.loadbookseeds = function (req, res) {
	console.log ("project => loadbookseeds");
	var resData = {
		state : "visitor/self/other",
		nickname : "",
		project : {
			title	:"Book Seeds",
			desc : "asdfsaf",
			data : {
				bslist : [
					// {
					// 	"age" : "4",
					// 	"bookname" : "lalala"
					// },
					// {
					// 	"age" : "14",
					// 	"bookname" : "lalala"
					// }
				]
			}
		}
	}
	if (!req.session.user) {resData.state = "visitor"} else {
		if (req.session.user.UID === req.body.UID) {resData.state = "self"}
		else {resData.state = "other"}	
	}

	Proj.findOne({'title': 'bookseeds'}, function (err, result) {
		if (err) {};
		if (result) {resData.project.title = result.title;	resData.project.desc = result.desc;}
		else {console.log ('project doesnot exist with title ' + 'Bookseeds');}
	})
	// console.log ("************ after result project resData " + resData);
	// console.log (resData);

//need to work something ,for none-login user to visitor some one's bookseeds directly by url
	User.findOne({'_id':req.query._id},function (err, result){
		if(err){}
		if(result){
			resData.nickname = result.nickname;
			Bookseeds.find({'author': req.query._id}, function (err, result) {
				// console.log ("query id? " + req.query._id);
				if (err) {};
				if (result) {
					// console.log("bslist of mine "+result);
					result.forEach (function(bs) {
					// 	console.log ("bs is "+bs);
						resData.project.data.bslist.push (bs);
					// 	// resData.project.data.bslist[resData.project.data.bslist.length] = bs;
					})
					// resData.project.data.bslist = result;
					// res.send (resData);
				}
				else {console.log ('project doesnot exist with author ' + req.session.user.email);}
				res.send (resData);
			});
		}else res.send("404");
		
	});

	// Bookseeds.find({'author': req.query._id}, function (err, result) {
	// 	// console.log ("query id? " + req.query._id);
	// 	if (err) {};
	// 	if (result) {
	// 		// console.log("bslist of mine "+result);
	// 		result.forEach (function(bs) {
	// 		// 	console.log ("bs is "+bs);
	// 			resData.project.data.bslist.push (bs);
	// 		// 	// resData.project.data.bslist[resData.project.data.bslist.length] = bs;
	// 		})
	// 		// resData.project.data.bslist = result;
	// 		// res.send (resData);
	// 	}
	// 	else {console.log ('project doesnot exist with author ' + req.session.user.email);}
	// 	res.send (resData);
	// })

	// console.log ("************ final resData " + resData);
	// console.log (resData);

	// res.send (resData);
}

exports.addSeeds = function (req, res) {
	console.log ("project => onAddSeed");
	console.log (req.session.user.email);
	console.log (req.body.bslist);

	var uid = req.session.user._id;
	// var resList = new array();
	var resData = {
		error: [],
		msg: {
			update: [],
			add: []
		}
	}
	req.body.bslist.forEach (function(sd){
		console.log(sd);
		Bookseeds.findOne({'author': req.session.user._id, 'age': sd.age}, function (err, result) {
			if (err) {}
			if (result) { // if the seed of age already exist, then update the content. Keep the seeds unique to each age.
				result.bookname = sd.bookname;
				// result.desc = req.body.book.desc;
				// result.link = req.body.book.link;
				result.save (function (err) {
					if (err) {resData.error.push(err)};
					// res.json({"success": "Book of age already exist, update done"});
					resData.msg.update.push(sd.age);
				})
			}
			else { // if there are no seed matched, save a new seed into db.
				var seed = new Bookseeds();
				seed.author = req.session.user._id;
				seed.age = sd.age;
				seed.bookname = sd.bookname;
				// result.desc = req.body.book.desc;
				// result.link = req.body.book.link;
				seed.save(function (err, result) {
					if (err) {resData.error.push(err)};
					console.log ("Successed adding seed: " + seed);
					// res.json("Successed adding seed: " + seed);
					resData.msg.add.push(seed);
				})
			}
		})
	});
	
	Proj.findOne({'title':'bookseeds'},function (err, pjResult){
		var hooked = false;
		var pid = pjResult.title;
		User.findOne({'_id':uid}, function (err, userResult){
			if (err) {
				resData.error.push (err);
			}
			if (userResult) {
				for(var i = 0; i < userResult.projna.length;i++){
					if(userResult.projna[i] === pid){
						hooked = true;
					}
				}
				if(!hooked){
					userResult.projna.push(pid);
					pjResult.followers.push(uid);
					pjResult.save (function (err) {
						if (err) {resData.error.push (err);};
					})
					userResult.save (function (err) {
						if (err) {resData.error.push (err);};
					})
				}
			}
			else {
				resData.error.push (err);
			}
		});
	});
	//adding this user to the projects follower, and this project to this user's projna


	res.json (resData);

	//Dose here really need response?
	// yes, we need
}