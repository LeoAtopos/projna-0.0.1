"use strict";

var path = require('path');
var model = require('../Schemas/userSchema');
var projModel = require('../Schemas/projectSchema');

var User = model.User;
var Proj = projModel.Project;


exports.searchSTH = function (req, res) {
	console.log ("user => search");
	var resData = {
		personList:[]
	}
	var rs = new RegExp(req.body.text);
	// console.log (rs);
	User.find({nickname : rs},function (err,result){
		if(err){}
		console.log (result);
		if(result){
			for(var i = 0; i<result.length;i++){
				var p = {};
				p.id = result[i]._id;
				p.nickname = result[i].nickname;
				p.pic = result[i].pic;
				resData.personList.push(p);

			}
			res.send (resData);
		}
	});
	
}

