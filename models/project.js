var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define User Schema
var ProjectSchema = new Schema({
	title: {type: String, default: "Proj."},
	desc: {type: String, default: "This is a projna project."},
	createDate: {type: Date, default: Date.now},
	followers: {type: [String], default: []},
	data: String
})

// ProjectSchema.method('followCnt', function(){var l = followers.length;return l})

// UserSchema.method( 'say', function(){return "You have run the user say()!";} )

exports.Project = mongoose.model('Project', ProjectSchema);