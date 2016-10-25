var express = require('express');
var bodyParser = require("body-parser");
var app = express();
var Task = require('./models/task');
var mongoose = require('mongoose');
var config = require('./config');
var googleConfig = require('./googleConfig');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var BearerStrategy = require('passport-http-bearer').Strategy;
var passport = require("passport");

app.use(bodyParser.json());
app.use(passport.initialize());
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
/*Get All the tasks*/
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

/*post a new task*/
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

/*Update the status*/
app.put('/api/:id', function(req, res) {
	Task.findOne({
		_id: req.params.id
	}).exec(function(err, task){
		if (err) {
            console.log('Idea not found: ', err);
            return res.status(500).json({
                message: err
            });
        }
		var newTitle = req.body.title;
		task.title = newTitle;
		var newStatus = req.body.status;
		task.status = newStatus;
		task.save();
		res.json(task);
	});
});


/*Delete the status*/
app.delete('/api/:id', function(req, res) {
	Task.remove({
		_id: req.params.id
	}).exec(function(err, task){
		if (err) {
            console.log('Idea not found: ', err);
            return res.status(500).json({
                message: err
            });
        } else {
			res.send({
				message: "Task deleted!"
			});
        }
	});
});





