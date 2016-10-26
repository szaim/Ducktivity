var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TaskBoard = new mongoose.Schema({
	owner: {type: String},
	title: {type: String, require: true},
	status: {type: String, require: true}
});

var Task = mongoose.model('Task', TaskBoard);

module.exports = Task;