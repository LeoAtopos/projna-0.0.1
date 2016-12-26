var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define User Schema
var visitorCounterSchema = new Schema({
	counterName: {type: String, default: "VisitorCounter"},
	createDate: {type: Date, default: Date.now},
	count: {type: Number, default: 0}
})

// UserSchema.method( 'say', function(){return "You have run the user say()!";} )

exports.VisitorCounter = mongoose.model('VisitorCounter', visitorCounterSchema);
