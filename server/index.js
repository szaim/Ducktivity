var express = require('express');
var app = express();

app.use('/', express.static('build'));

app.get('/api/hello', function(req, res) {
	res.send({message: "hello!"});
})

app.listen(8080, function () {
  console.log('Listening at 8080!');
});
