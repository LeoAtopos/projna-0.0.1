var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define User Schema
var ProjectSchema = new Schema({
	title: {type: String, default: "Proj."},
	desc: {type: String, default: "This is a projna project."},
	createDate: {type: Date, default: Date.now},
	data: type: String
})

// UserSchema.method( 'say', function(){return "You have run the user say()!";} )

exports.User = mongoose.model('Project', ProjectSchema);