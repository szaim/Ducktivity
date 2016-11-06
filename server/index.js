var express = require('express');
var bodyParser = require("body-parser");
var app = express();
var Card = require('./models/card');
var Category = require('./models/category');
var Project = require('./models/project');
var User = require('./models/user');
var mongoose = require('mongoose');
var config = require('./config');
var googleConfig = require('./googleConfig');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var BearerStrategy = require('passport-http-bearer').Strategy;
var passport = require("passport");
var ObjectId = mongoose.Types.ObjectId;

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

        User.find({
            'googleID': profile.id
        }, function(err, users) {
            if (!users.length) {

                User.create({
                    googleID: profile.id,
                    accessToken: accessToken,
                    fullName: profile.displayName,
                    avatar: profile.photos[0].value

                }, function(err, user) {

                    var categoryTitles = ['BLOCKED', 'TO DO', 'IN PROGRESS', 'COMPLETED'];
                    var newCategory = '';
                    for(var i = 0; i < categoryTitles.length; i++){
                         newCategory = new Category({
                            owner: user.googleID,
                            title: categoryTitles[i],
                            cards: []
                        });
                         newCategory.save();
                         user.categories.push(newCategory);
                    }
                    
                    user.save();
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
        User.findOne({
                accessToken: token
            })
            .populate({
                path: 'categories',
                populate: {
                    path: 'cards',
                    model: 'Card'
                }
            })
            .exec(function(err, users) {
                if (err) {
                    return done(err)
                }
                if (!users) {
                    return done(null, false)
                }
                return done(null, users, {
                    scope: ['read']
                })
            });

    }));

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
        // console.log('req', req);
        // console.log('req.user', req.user);
        // console.log('req.user.accessToken', req.user[0].accessToken);
        res.cookie("accessToken", req.user[0].accessToken, {
            expires: 0
        });
        //res.redirect(/success?accessToken= + req.user.accessToken);
        // httpOnly: true
        // TODO: make the access token secure. Cookies are secured enough
        // Successful authentication, redirect home.
        res.redirect('/#/ducktivity');
    }
);
/*Returns The cards for that Particular user */
app.get('/api/user/me', passport.authenticate('bearer', {
        session: false
    }),
    function(req, res) {
        User.find().populate({
                path: 'categories',
                populate: {
                    path: 'cards',
                    model: 'Card'
                }
            })
            .exec(function(err, user) {
                if (err) {
                    res.send("Error has occured");
                } else {
                    console.log("user.cards", req.user.categories);
                    for (var i = req.user.categories.length; i--;) {
                        for (var j = req.user.categories[i].cards.length; j--;) {
                            if (req.user.categories[i].cards[j].status == "deleted") {
                                req.user.categories[i].cards.splice(j, 1);
                                console.log("usercards", req.user.categories);
                                // return user.cards
                            }
                        }
                    }
                    res.json(req.user);
                }
            });
    });

/*Assign a new Category to the User */
//Refactor just sending the Array of cards
app.post('/api/category', passport.authenticate('bearer', {
        session: false
    }),
    function(req, res) {

        var newCategory = new Category({
            owner: req.user.fullName,
            title: req.body.CategoryConstruct.title,
            cards: [],
            status: req.body.CategoryConstruct.status
        });
        newCategory.save();
        // console.log("after user found", user);
        console.log("task created", newCategory);
        req.user.categories.push(newCategory);
        req.user.save();
        console.log("User cards", req.user.categories);
        // res.json(req.user.cards);
        // console.log("request Params for User:", req.params.userId);
        res.json(req.user);
    });


// POST FOR THE CARDS
app.post('/api/card', passport.authenticate('bearer', {
        session: false
    }),
    function(req, res) {
        // console.log('categoryId', req.body.categoryId);
        Category.find({
                _id: req.body.categoryId
            })
            .exec(function(err, category) {

                var newCard = new Card({
                    owner: req.body.TaskConstruct.owner,
                    title: req.body.TaskConstruct.title,
                    category: req.body.categoryId,
                    status: req.body.TaskConstruct.status
                });
                newCard.save();
                console.log("after user found", category);
                console.log("task created", newCard);
                category[0].cards.push(newCard);
                category[0].save();
                console.log("User cards", category[0].cards);
                // res.json(user[0].cards);
                console.log("request Params for Category:", req.params.categoryId);

                res.json(newCard);


            });
    });

// POST FOR THE  MOVE CARDS
app.post('/api/movecard', passport.authenticate('bearer', {
        session: false
    }),
    function(req, res) {
        // console.log('categoryId', req.body.categoryId);
        Category.find({
                _id: req.body.categoryId
            })
            .exec(function(err, category) {

                var newCard = new Card({
                    _id: req.body.TaskConstruct._id,
                    owner: req.body.TaskConstruct.owner,
                    title: req.body.TaskConstruct.title,
                    category: req.body.categoryId,
                    status: req.body.TaskConstruct.status
                });
                newCard.save();
                // console.log("after user found", category);
                // console.log("task created", newCard);
                category[0].cards.push(newCard);
                category[0].save();
                // console.log("User cards", category[0].cards);
                // // res.json(user[0].cards);
                // console.log("request Params for Category:", req.params.categoryId);

                res.json(newCard);


            });
    });


/*Update Card Delete STATUS */
//TODO: Refactor using User instead Directly the Card --> Quicker
app.put('/api/card/:cardId', passport.authenticate('bearer', {
        session: false
    }),
    function(req, res) {
        Card.findOneAndUpdate({
            _id: req.params.cardId
        }, {
            $set: {
                status: req.body.CardConstruct.status,
                title: req.body.CardConstruct.title,
                category: req.body.CardConstruct.category
            }
        }, {
            new: true
        }, function(err, card) {
            if (err) {
                console.log('cards not found: ', err);
                return res.status(500).json({
                    message: err
                });
            } 
            console.log('updated card', card);
            res.json(card);
        });
    });


/* DELETE Card*/


app.delete('/api/card/:cardId', passport.authenticate('bearer', {
        session: false
    }),
    function(req, res) {
            console.log('category delete', req.body.originalCategory);
            console.log('_id delete', req.params.cardId);
            Card.findOneAndRemove({
                category: req.body.originalCategory,
                _id: req.params.cardId
            })
            .exec(function(err, card) {
                if (err) {
                    console.log('cards not found: ', err);
                    return res.status(500).json({
                        message: err
                    });
                } 
                res.json(card);
            })

    });

/* DELETE Category*/


app.delete('/api/category/:categoryId', passport.authenticate('bearer', {
        session: false
    }),
    function(req, res) {
        Category.findOne({
            _id: req.params.categoryId
        }).populate('cards').exec(function(err, category) {
           if(category){
             for (var i = 0; i < category.cards.length; i++) {
                category.cards[i].status = "deleted";
                category.cards[i].save();
            }
            category.save();
           }

            

        }).then(
            Category.findOneAndRemove({
                _id: req.params.categoryId
            })
            .exec(function(err, category) {

                res.json({
                    message: 'Category removed!'
                });
            })
        );
    });


app.put('/api/category/:categoryId', passport.authenticate('bearer', {
        session: false
    }),
    function(req, res) {
        Category.update({
            _id: req.params.categoryId
        }, {
            $set: {
                owner: req.body.owner,
                title: req.body.title
            }
        }, {
            returnNewDocument: true
        }, function(err, category) {
            if (err) {
                console.log('category not found: ', err);
                return res.status(500).json({
                    message: err
                });
            }
            res.json({
                message: "Category updated Successfully"
            });
        });
    });



// get Project List
app.get('/api/project', passport.authenticate('bearer', {
        session: false
    }),
    function(req, res) {
        Project.find().exec(function(err, projects) {
                if (err) {
                    res.send("Error has occured");
                } else {
                    console.log("projects found", projects);
                    res.json(projects);
                }
            });
});

