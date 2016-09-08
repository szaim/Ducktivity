var express = require('express');
var app = express();

app.use('/', express.static('build'));
var data = [
	{
		id: 001,
		title: "Task 1"
	},
	{
		id: 002,
		title: "Task 2"
	},
	{
		id: 003,
		title: "Task 3"
	}
]
app.get('/api/hello', function(req, res) {
	res.send(data);
})

app.listen(8080, function () {
  console.log('Listening at 8080!');
});
