var mongoose = require("mongoose");



var MegamanSchema = new mongoose.Schema({
	list: {
		type: Array
	}
}, { collection : 'Megaman' });

var Megaman = mongoose.model('Megaman', MegamanSchema);

module.exports = Megaman;