var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SubTaskSchema = new mongoose.Schema({
	owner: {type: String},
	title: {type: String, require: true},
	description: {type: String, require: true},
	status: {type: String},
	assignedTo: {type: Array}  
	// status to show if the subtask is completed or not with true/false
	
});

var Subtask = mongoose.model('Subtask', SubTaskSchema);

module.exports = Subtask;