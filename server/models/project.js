var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = new mongoose.Schema({
	owner: {type: Schema.Types.ObjectId, ref: 'User'},
	title: {type: String, require: true},
	objectives: [{type: Schema.Types.ObjectId, ref: 'Objective'}]
});

var Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;
