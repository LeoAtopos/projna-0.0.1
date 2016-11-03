"use strict";

var epitaphModel = require('../Schemas/bookseedsSchema');

var Epitaph = epitaphModel.epitaph;

exports.loadepitaph = function (req, res) {
	console.log ("project => loadepitaph");
	var resData = {
		state : "visitor/self/other",
		project : {
			title	:"Epitaph",
			desc : "asdfsaf",
			data : {}
		}
	}

	res.send (resData);
}

exports.addEpitaph = function (req, res) {
	console.log ("project => onEpitaph");
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

	res.json (resData);
}