var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CardSchema = new mongoose.Schema({
	owner: {type: String},
	title: {type: String, require: true},
	category: {type: String, require: true},
	subtask: [{type: Schema.Types.ObjectId, ref: 'SubTask'}],
	status: {type: String},
	department: {type: Schema.Types.ObjectId, ref: '#TODO'},
	objective: {type: Schema.Types.ObjectId, ref: '#TODO'}
});

var Card = mongoose.model('Card', CardSchema);

module.exports = Card;