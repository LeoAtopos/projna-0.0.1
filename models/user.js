var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define User Schema
var UserSchema = new Schema({
	email: String,
	password: {type: String, default: 123456},
	createDate: {type: Date, default: Date.now},
	projects: {type: [String], default: ['profile']}
})

exports.User = mongoose.model('User', UserSchema);