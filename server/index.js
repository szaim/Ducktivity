var express = require('express');
var bodyParser = require("body-parser");
var app = express();
var Card = require('./models/card');
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

passport.use(new GoogleStrategy({

        clientID: googleConfig.googleAuth.clientID,
        clientSecret: googleConfig.googleAuth.clientSecret,
        callbackURL: googleConfig.googleAuth.callbackURL

    },
    function(accessToken, refreshToken, profile, done) {
        console.log('PROFILE', profile);

        User.find({
            'googleID': profile.id
        }, function(err, users) {
            console.log('users', users.length);
            console.log('Avatar', profile.photos[0].value);

            if (!users.length) {

                User.create({
                    googleID: profile.id,
                    accessToken: accessToken,
                    fullName: profile.displayName,
                    avatar: profile.photos[0].value

                }, function(err, users) {
                    console.log('=======>>', err, users);
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
        User.find({
                accessToken: token
            },
            function(err, users) {
                if (err) {
                    return done(err)
                }
                if (!users) {
                    return done(null, false)
                }
                return done(null, users, {
                    scope: ['read']
                });
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
        res.cookie("accessToken", req.user[0].accessToken, {
            expires: 0
        });
        //res.redirect(/success?accessToken= + req.user.accessToken);
        // httpOnly: true
        // TODO: make the access token secure 
        // Successful authentication, redirect home.
        res.redirect('/success');
    }
);
/*Returns all the users */
app.get('/api', passport.authenticate('bearer', {
        session: false
    }),
    function(req, res) {
        User.find({}).populate('cards')
            .exec(function(err, users) {
                if (err) {
                    res.send("Error has occured");
                } else {
                    res.json(users);
                }
            });
    });

/*Assign a new task to the User */
app.post('/api/:userId', passport.authenticate('bearer', {
        session: false
    }),
    function(req, res) {
        User.find({
                googleID: req.params.userId
            })
            .exec(function(err, user) {
                console.log("user found", user);
                var newCard = new Card({
                    owner: user[0].fullName,
                    title: req.body.title,
                    category: req.body.category,
                    status: req.body.status
                });
                newCard.save();
                console.log("after user found", user);
                console.log("task created", newCard);
                user[0].cards.push(newCard);
                user[0].save();
                console.log("new user found", user);
                res.json(user);
            });
    });

/*Update Card */
//TODO: Refactor using User instead Directly the Card
app.put('/api/:cardId', passport.authenticate('bearer', {
        session: false
    }),
    function(req, res) {
        Card.findOneAndUpdate({
        _id: req.params.cardId
    },{$set :{title: req.body.title, status: req.body.status}}, function(err, cards) {
        if (err) {
            console.log('cards not found: ', err);
            return res.status(500).json({
                message: err
            });
        }
        console.log(cards);
       // cards.title = req.body.title;

       //  cards.save();
       res.json(cards);   
        });


});


        // User.update({
        //         "googleID": req.params.userId,
        //         "cards.id": req.body.user.id
        //     }, {
        //         "$set": {
        //             "cards.$.title": req.body.user.title
        //         }
        //     },
        //     function(err, user) {
        //         if (err) {
        //             return res.send(err);
        //         }
        //         return res.send(user);
        //     });
        // console.log("body", req.body);


