var express = require('express');
var bodyParser = require("body-parser");
var app = express();
var Task = require('./models/task');
var User = require('./models/user');
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

app.get('/app', function(req, res) {
    User.find({}).populate('tasks')
        .exec(function(err, users) {
            if (err) {
                res.send("Error has occured")
            } else {
                res.json(users);
            }
        });
});

passport.use(new GoogleStrategy({

        clientID: googleConfig.googleAuth.clientID,
        clientSecret: googleConfig.googleAuth.clientSecret,
        callbackURL: googleConfig.googleAuth.callbackURL

    },
    function(accessToken, refreshToken, profile, done) {
        console.log('PROFILE', profile);

        // var arrTasks;
        // Task.find({}).exec(function(err, tasks){
        //     if (err) {
        //     console.log('error', err);
        //     } else {
        //         console.log("All tasks: ", tasks);
        //         arrTasks = tasks;
        //         console.log("Array : ", arrTasks);

        //     }
        // })

        User.find({
            'googleID': profile.id
        }, function(err, users) {
            console.log('users', users.length)
            if (!users.length) {

                User.create({
                    googleID: profile.id,
                    accessToken: accessToken,
                    fullName: profile.displayName,
                    tasks: arrTasks,
                    avatar: profile.image

                }, function(err, users) {
                    console.log('=======>>', err, users)
                    return done(err, users);
                });

            } else {
                // update user with new tokens
                return done(err, users);
            }



        });


 }));


passport.use(new BearerStrategy(
  function(token, done) {
  User.find({ accessToken: token },
    function(err, users) {
      if(err) {
          return done(err)
      }
      if(!users) {
          return done(null, false)
      }
      return done(null, users, { scope: ['read'] })
    }
  );
}
));

// route for logging out
app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

app.get('/auth/google',
    passport.authenticate('google', {
        scope: ['profile']
    }));

app.get('/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/failure',
        session: false
    }),
    function(req, res) {
        console.log('req', req);
        console.log('req.user', req.user);
        console.log('req.user.accessToken', req.user[0].accessToken);
        // res.cookie("accessToken", req.user.accessToken, {expires: 0});
        // httpOnly: true
            // Successful authentication, redirect home.
        res.redirect('/success');
    }
);

app.get('/user', passport.authenticate('bearer', {session: false}), 
    function(req, res) {
        // validate(req.user[0].questions, req.user[0].score);
        return res.send(req.user);

});

/*Assign a new task to the User */

app.post('/api/:userId', function(req, res){
    User.find({
        googleID: req.params.userId
    })
    .exec(function(err, user){
        console.log("user found", user);
        var newTask = new Task({
            owner: user[0].fullName,
            title: req.body.title,
            status: req.body.status
        });
        newTask.save();
        console.log("after user found", user);
        console.log("task created", newTask);
        user[0].tasks.push(newTask);
        user[0].save();
        console.log("new user found", user);
        res.json(user)
    })
    // .populate('tasks').exec(function(err, populatedUser){
    //         console.log(populatedUser, 'final user');
    //     })
});

// app.get('/api/:userId', function(req, res){})

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
// app.put('/api/:id', function(req, res) {
// 	Task.findOne({
// 		_id: req.params.id
// 	}).exec(function(err, task){
// 		if (err) {
//             console.log('Idea not found: ', err);
//             return res.status(500).json({
//                 message: err
//             });
//         }
// 		var newTitle = req.body.title;
// 		task.title = newTitle;
// 		var newStatus = req.body.status;
// 		task.status = newStatus;
// 		task.save();
// 		res.json(task);
// 	});
// });



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





