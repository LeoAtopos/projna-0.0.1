var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define User Schema
var UserSchema = new Schema({
	email: String,
	nickname: {type: String, default: 'projnare'},
	pic:{type:String, default: 'per1-pic.jpg'},
	password: {type: String, default: 123456},
	createDate: {type: Date, default: Date.now},
	projects: {type: [String], default: ['profile']},
	projna: {type: [String], default: ['profile']}
})

// var UserProjna = new Schema({
// 	id: Number,
// 	name: String,
// 	pic: String,
// 	state: String
// })

// UserSchema.static.selfProjna = function (data) {
// 	this.projna.push (data);
// 	return this.projna;
// }

UserSchema.method( 'selfProjna', function(data){
	this.projna.push (data);
	return this.projna;
})

UserSchema.method( 'say', function(){return "You have run the user say()!";} )

exports.User = mongoose.model('User', UserSchema);

exports.projPrivateInfo = {
	projTitle : '',
	joinDate : Date,
	comment : '',
	data : ''
}