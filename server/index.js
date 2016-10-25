var express = require('express');
var bodyParser = require("body-parser");
var app = express();
var Task = require('./models/task');
var mongoose = require('mongoose');
var config = require('./config');

app.use(bodyParser.json());

app.use('/', express.static('build'));

/*Connection to MongoDB/mongoose */
var runServer = function(callback) {
    mongoose.connect(config.DATABASE_URL, function(err) {
        if (err && callback) {
            return callback(err);
        }
        
        app.listen(config.PORT, function() {
            console.log('Listening on localhost:' + config.PORT);
            if (callback) {
                callback();
            }
        });
    });
};
if (require.main === module) {
    runServer(function(err) {
        if (err) {
            console.error(err);
        }
    });
}

app.get('/api', function(req, res) {
	Task.find({})
		.exec(function(err, tasks){
			if (err) {
            console.log('error', err);
        	} else {
        		res.json(tasks);
        	}
		});
});


app.post('/api', function(req, res) {
	var newTask = new Task(req.body);
	newTask.save(function(err, task) {
		if(err) {
			console.log("error", error);
		} else {
			res.json(task);
		}
	});
});

