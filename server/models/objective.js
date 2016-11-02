var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ObjectiveSchema = new mongoose.Schema({
	owner: {type: Schema.Types.ObjectId, ref: 'User'},
	title: {type: String, require: true},
	cards: [{type: Schema.Types.ObjectId, ref: 'Card'}]
});

var Objective = mongoose.model('Objective', ObjectiveSchema);

module.exports = Objective;