"use strict";

var bookseedsModel = require('../Schemas/bookseedsSchema');

var Bookseeds = bookseedsModel.Bookseeds;

exports.loadbookseeds = function (req, res) {
	console.log ("project => loadbookseeds");
	var resData = {
		state : "visitor/self/other",
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

	Proj.findOne({'title': 'Bookseeds'}, function (err, result) {
		if (err) {};
		if (result) {resData.project.title = result.title;	resData.project.desc = result.desc;}
		else {console.log ('project doesnot exist with title ' + 'Bookseeds');}
	})

//need to work something ,for none-login user to visitor some one's bookseeds directly by url
	Bookseeds.find({'author': req.query.username}, function (err, result) {
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
	})

	// res.send (resData);
}

exports.addSeeds = function (req, res) {
	console.log ("project => onAddSeed");
	console.log (req.session.user.email);
	console.log (req.body.bslist);
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
		Bookseeds.findOne({'author': req.session.user.email, 'age': sd.age}, function (err, result) {
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
				seed.author = req.session.user.email;
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
	})
	res.json (resData);
}