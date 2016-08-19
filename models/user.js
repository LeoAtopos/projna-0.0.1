var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define User Schema
var UserSchema = new Schema({
	email: String,
	password: {type: String, default: 123456},
	createDate: {type: Date, default: Date.now},
	projects: {type: [String], default: ['profile']},
	// projects: {
	// 	projTitle: String,
	// 	joinDate : {type: Date, default: Date.now},
	// 	desc: {type: String, default: ''},
	// 	comment: {
	// 		author: String,
	// 		content: String
	// 	}
	// }
})

UserSchema.method( 'say', function(){return "You have run the user say()!";} )

exports.User = mongoose.model('User', UserSchema);

exports.projPrivateInfo = {
	projTitle : '',
	joinDate : Date,
	comment : '',
	data : ''
}