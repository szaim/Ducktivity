var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CardSchema = new mongoose.Schema({
	owner: {type: Schema.Types.ObjectId, ref: 'User'}
	title: {type: String, require: true},
	category: {type: String, require: true}, //ObjectId --> Category/Stage
	subtask: [{type: Schema.Types.ObjectId, ref: 'SubTask'}],
	status: {type: String},
	objective: {type: Schema.Types.ObjectId, ref: 'Objective'}
});

var Card = mongoose.model('Card', CardSchema);

module.exports = Card;
