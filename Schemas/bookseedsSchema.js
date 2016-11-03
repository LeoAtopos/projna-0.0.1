var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define User Schema
var BookseedsSchema = new Schema({
	author: {type: String, default: "Unknown"},
	age: {type: Number, default: 0},
	bookname: {type: String, default: "Unknown"},
	desc: {type: String, default: "This is a projna project."},
	createDate: {type: Date, default: Date.now},
	link: {type: String, default: "/"}
})

// UserSchema.method( 'say', function(){return "You have run the user say()!";} )

exports.Bookseeds = mongoose.model('Bookseeds', BookseedsSchema);
