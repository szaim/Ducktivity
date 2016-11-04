var express = require('express');
var bodyParser = require("body-parser");
var app = express();
var Card = require('./models/card');
var Category = require('./models/category');
var User = require('./models/user');
var Project = require('./models/project');
var Objective = require('./models/objective');
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

        User.findOne({
            'googleID': profile.id
        }, function(err, user) {
            if (!user) {

                User.create({
                    googleID: profile.id,
                    accessToken: accessToken,
                    fullName: profile.displayName,
                    avatar: profile.photos[0].value

                }, function(err, user) {

                    var categoryTitles = ['BLOCKED', 'TO DO', 'IN PROGRESS', 'COMPLETED'];
                    var newCategory = '';
                    for (var i = 0; i < categoryTitles.length; i++) {
                        newCategory = new Category({
                            owner: user.googleID,
                            title: categoryTitles[i],
                            cards: []
                        });
                        newCategory.save();
                        user.categories.push(newCategory);
                    }

                    user.save();
                    console.log('=======>>', err, user);
                    return done(err, user);
                });

            } else {
                // update user with new tokens
                return done(err, user);
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
            .exec(function(err, user) {
                if (err) {
                    return done(err)
                }
                if (!user) {
                    return done(null, false)
                }
                return done(null, user, {
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
        res.cookie("accessToken", req.user.accessToken, {
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


// POST FOR THE CARDS
app.post('/api/card', passport.authenticate('bearer', {
        session: false
    }),
    function(req, res) {
        // console.log('categoryId', req.body.categoryId);
        Category.findOne({
                _id: req.body.categoryId
            })
            .exec(function(err, category) {
                var newCard = new Card({
                    owner: req.body.TaskConstruct.owner,
                    title: req.body.TaskConstruct.title,
                    category: req.body.categoryId,
                    status: req.body.TaskConstruct.status,
                    assignedTo: req.body.TaskConstruct.status,
                    objective: req.body.TaskConstruct.objective
                });
                newCard.save();
                console.log("after user found", category);
                console.log("task created", newCard);
                category.cards.push(newCard);
                category.save();
                console.log("User cards", category.cards);

                Objective.findOne({
                    _id: req.body.TaskConstruct.objective
                }).exec(function(err, objective){
                    objective.cards.push(newCard);
                    objective.save();
                });
                // res.json(user[0].cards);
                console.log("request Params for Category:", req.params.categoryId);

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

app.post('/api/project', passport.authenticate('bearer', {
        session: false
    }),
    function(req, res) {
        var newProject = new Project({
            owner: req.user,
            title: req.body.title,
            objectives: [],
        });
        newProject.save(function(err, data){
            if(err){
                res.send(err);
            }
        });
        // console.log("after user found", user);
        console.log("project created", newProject);
        res.json(newProject._id);
});

app.get('/api/project/:projectId', passport.authenticate('bearer', {
        session: false
    }),
    function(req, res) {
        Project.findOne({
            _id: req.params.projectId
        }).populate({
                path: 'objectives',
                populate: {
                    path: 'cards',
                    model: 'Card'
                }
            })
            .exec(function(err, project) {
                if (err) {
                    res.send("Error has occured");
                } else {
                    res.json(project);
                }
            });
    });

app.put('/api/project/:projectId', passport.authenticate('bearer', {
        session: false
    }),
    function(req, res) {
        Project.update({
            _id: req.params.projectId
        }, {
            $set: {
                owner: req.body.owner,
                title: req.body.title
            }
        }, {
            new: true
        }, function(err, project) {
            if (err) {
                console.log('project not found: ', err);
                return res.status(500).json({
                    message: err
                });
            }
            res.json({
                project
            });
        });
    });
app.delete('/api/project/:projectId', passport.authenticate('bearer', {
        session: false
    }),
    function(req, res) {
        Project.findOne({
            _id: req.params.projectId
        }).populate({
            path: 'objectives',
            populate: {
                path: 'cards',
                model: 'Card'
            }
        }).exec(function(err, project) {
            if (project) {
                for (var i = 0; i < project.objectives.length; i++) {
                    project.objectives[i].status = "deleted";
                    project.objectives[i].save();
                    for (var j = 0; j < project.objectives.cards.length; j++) {
                        project.objectives.cards[j].status = "deleted";
                        project.objectives.cards[j].save();
                    }
                }
                project.save();
            }
        }).then(
            Project.findOneAndRemove({
                _id: req.params.projectId
            })
            .exec(function(err, category) {

                res.json({
                    message: 'Project removed!'
                });
            })
        );
    });

app.post('/api/objective/', passport.authenticate('bearer', {
        session: false
    }),
    function(req, res) {
        Project.findOne({
                _id: req.body.projectId
            })
            .exec(function(err, project) {
                if (err) {
                    res.send("Error has occured");
                } else {
                   var newObjective = new Objective({
                    owner: req.user,
                    assignedTo: req.body.assignedTo,
                    title: req.body.title,
                    cards: [],
                    status: 'active'
                });
                newObjective.save();
                console.log("after project found", project);
                console.log("objective created", newObjective);
                project.objectives.push(newObjective);
                project.save();
                // console.log("User cards", project.objectives);
                res.json(newObjective);
                }
                
            });
    });

app.get('/api/objective/:objectiveId', passport.authenticate('bearer', {
        session: false
    }),
    function(req, res) {
        Objective.findOne({
                _id: req.params.objectiveId
            }).populate('cards')
            .exec(function(err, objective) {
                if (err) {
                    res.send("Error has occured");
                } else {
                    res.json(objective);
                }
            });
    });

app.put('/api/objective/:objectiveId', passport.authenticate('bearer', {
        session: false
    }),
    function(req, res) {
        Objective.update({
            _id: req.params.objectiveId
        }, {
            $set: {
                owner: req.body.owner,
                title: req.body.title,
                assignedTo: req.body.assignedTo
            }
        }, {
            new: true
        }, function(err, objective) {
            if (err) {
                console.log('objective not found: ', err);
                return res.status(500).json({
                    message: err
                });
            }
            res.json({
                objective
            });
        });
    });
app.delete('/api/objective/:objectiveId', passport.authenticate('bearer', {
        session: false
    }),
    function(req, res) {
        Objective.findOne({
            _id: req.params.objectId
        }).populate('cards').exec(function(err, objective) {
            if (objective) {
                for (var i = 0; i < objective.cards.length; i++) {
                    objective.cards[i].status = "deleted";
                    objective.cards[i].save();
                }
                objective.save();
            }
        }).then(
            Objective.findOneAndRemove({
                _id: req.params.objectiveId
            })
            .exec(function(err, objective) {

                res.json({
                    message: 'Objective removed!'
                });
            })
        );
    });
