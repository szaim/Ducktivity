var express = require('express');
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.json());

app.use('/', express.static('build'));



app.listen(8080, function () {
  console.log('Listening at 8080!');
});
