var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CardSchema = new mongoose.Schema({
	owner: {type: Schema.Types.ObjectId, ref: 'User'},//{type: Schema.Types.ObjectId, ref: 'User'},
	title: {type: String, require: true},
	category: {type: Schema.Types.ObjectId, ref: 'Category'}, //ObjectId --> Category/Stage
	status: {type: String},
	assignedTo: {type: Schema.Types.ObjectId, ref: 'User'},
	objective: {type: Schema.Types.ObjectId, ref: 'Objective'}
});

var Card = mongoose.model('Card', CardSchema);

module.exports = Card;
