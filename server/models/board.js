var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BoardSchema = new mongoose.Schema({
	owner: {type: String},
	title: {type: String, require: true},
	categories: [{type: Schema.Types.ObjectId, ref: 'Category'}],
	status: {type: String}
});

var Board = mongoose.model('Board', BoardSchema);

module.exports = Board;