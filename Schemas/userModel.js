var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new mongoose.Schema({
  username: {type: String},
  password: {type: String, default: 123456},
  createDate: {type: Date, default: Date.now},
  email: {type: String},
  projects: {}
});

mongoose.model('user', userSchema);
module.exports.Schema = function (modelName) {
	return {model:mongoose.model(modelName)};
}
// var userModel = module.exports;

// userModel.User = function (db) {
// 	this.id = db["uid"];
// 	this.username = db["username"];
// 	this.project = {}
// 	this.seeds = function () {
// 		console.log ("you get seeds list " + db["seeds"]);
// 	};
// 	this.addProjectByName = function (proj) {
// 		// check isProject Already exist
// 		console.log ("Project " + proj + " doesnot exist.");
// 		// check isProject Already added
// 		console.log ("Project " + proj + " has already added.");
// 		// add initial project data into this.project
// 		this.project[proj] = initialList[project];
// 		console.log ("Project " + proj + " added successfully.");
// 	}
// 	this.create = function (argument) {
// 		console.log("New user data created");
// 	};
// 	this.save = function (argument) {
// 		console.log("user data saved");
// 	};
// };
