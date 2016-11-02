var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategorySchema = new mongoose.Schema({ //fixed 
	owner: {type: String},
	title: {type: String, require: true},
	cards: [{type: Schema.Types.ObjectId, ref: 'Card'}],
});

var Category = mongoose.model('Category', CategorySchema);

module.exports = Category;