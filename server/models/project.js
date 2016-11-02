var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = new mongoose.Schema({
	owner: {type: String},
	userType: {type: String, default: 'Project Creator'},
	title: {type: String, require: true},
	users: [{type: Schema.Types.ObjectId, ref: 'User'}], 
	department: [{type: Schema.Types.ObjectId, ref: '#TODO'}],
	completed: {type: String}
});

var Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;