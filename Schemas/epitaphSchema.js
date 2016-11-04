var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define User Schema
var EpitaphSchema = new Schema({
	author: {type: String, default: "Unknown"},
	epitaph: {type: String, default: "This is dying"},
	createDate: {type: Date, default: Date.now},
})

// UserSchema.method( 'say', function(){return "You have run the user say()!";} )

exports.Epitaph = mongoose.model('Epitaph', EpitaphSchema);
