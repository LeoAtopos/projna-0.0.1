var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define User Schema
var ProjectSchema = new Schema({
	title: {type: String, default: "Proj."},
	name: {type: String, default: "Proj."},
	pic:{type:String, default: 'Pro1-pic'},
	desc: {type: String, default: "This is a projna project."},
	createDate: {type: Date, default: Date.now},
	order: {type: Number, default: 0},
	followers: {type: [String], default: []},
	featurer: {type: [String], default: ["reseter@sina.com","gz@qq.com"]},
	data: String
})

// ProjectSchema.method('followCnt', function(){var l = followers.length;return l})

// UserSchema.method( 'say', function(){return "You have run the user say()!";} )

exports.Project = mongoose.model('Project', ProjectSchema);