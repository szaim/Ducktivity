var express = require('express');
var bodyParser = require("body-parser");
var app = express();
var mongoose = require("mongoose");
var Megaman = require("./schema")
app.use(bodyParser.json());

app.use('/', express.static('build'));

var db = 'mongodb://localhost:27017/api';
mongoose.connect(db);

app.get("/app", function(req, res) {
	Megaman.find({})
		   .exec(function(err, Megaman) {
				if (err) {
					console.log("Error has occured");
				} else {
					res.json(Megaman[0].list);
				}
			});
});


app.listen(8080, function () {
  console.log('Listening at 8080!');
});
