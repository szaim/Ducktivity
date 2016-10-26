var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CardSchema = new mongoose.Schema({
	owner: {type: String},
	title: {type: String, require: true},
	category: {type: String, require: true},
	subtask: [{type: Schema.Types.ObjectId, ref: 'SubTask'}],
	assignedTo: {type: Array},
	status: {type: String}
});

var Card = mongoose.model('Card', CardSchema);

module.exports = Card;