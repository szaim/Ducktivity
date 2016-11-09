var Constants = require('../constants/overviewConstants');
var actions = require('../actions/overviewActions');
var cardActions = require('../actions/CardCategoriesActions');
var cardConstants = require('../constants/CardCategoriesConstants');
var projectConstants = require('../constants/projectConstants');
var update = require('react-addons-update');
var cardList = require('./CardCategoriesReducer');

var initialState = {
    projectTitle: "",
    projectId: '',
    objectives: [],
    users: [],
    isOpen: false,
    objectiveId: '',
    isObjectiveOpen: false

};

var overviewReducer = function(state, action) {
    state = state || initialState;

    if (action.type === projectConstants.FETCH_PROJECT_SUCCESS) {
        if(action.data == null) {
            var newState = Object.assign({}, state, {
                projectId: null,
                projectTitle: "",
                objectives: []
            });
        return newState;
        };
        console.log("FETCH_PROJECT_SUCCESS")
        var activeObjectives = action.data.objectives.map(function(objective, index) {
            var cards = [];
            for (var i = 0; i < objective.cards.length; i++) {
                if (objective.cards[i].status != 'deleted') {
                    console.log('objective cards',objective.cards[i]);
                    cards.push(objective.cards[i]);
                }
            }
            return Object.assign({}, objective, {
                cards: cards
            });
             });
             console.log(activeObjectives);
        var newState = Object.assign({}, state, {
            projectId: action.data._id,
            projectTitle: action.data.title,
            objectives: activeObjectives
        });
        return newState;
    } else if (action.type === Constants.FETCH_PROJECT_ERROR) {
      console.error(action.type, action.error);
        return state;
    } else if (action.type === cardConstants.POST_CARD_SUCCESS) {
        console.log("assignedTo", action.data.assignedTo);
        console.log("userId", action.data.owner);
        var newObjectives = state.objectives.map(function(objective, index) {
            console.log('post card overview reducer', objective._id);
            if (objective._id != action.data.objective) {
                return objective;
            } else {
                console.log('concat post card to objective worked');
                return Object.assign({}, objective, {
                    cards: objective.cards.concat(action.data)
                });
            }
        });


        state = Object.assign({}, state, {
            objectives: newObjectives,

        });
        return state;

    } else if (action.type === cardConstants.POST_CARD_ERROR) {
      console.error(action.type, action.error);

        return state;
    } 
    else if (action.type === cardConstants.DELETE_CARD_SUCCESS) {
         var objectives = state.objectives.map(function(objective, index) {
            if (action.data.objective == objective._id) {
                for (var i = 0; i < objective.cards.length; i++) {
                    if (objective.cards[i]._id == action.data._id) {
                        objective.cards.splice(i, 1);
                    }
                }
            }
            return objective;
        });

        state = Object.assign({}, state, {
            objectives: objectives
        });

        return state;
    } else if (action.type === cardConstants.DELETE_CARD_ERROR) {
      console.error(action.type, action.error);

        return state;
    } else if (action.type === cardConstants.UPDATE_CARD_SUCCESS) {
        console.log('overview update hit');

        if ('deleted' == action.data.status) {
            var new1Objectives = state.objectives.map(function(objective, index) {
                for (var i = 0; i < objective.cards.length; i++) {
                    if (objective.cards[i]._id == action.data._id) {
                        objective.cards.splice(i, 1);
                    }
                }
                return objective;
                state = Object.assign({}, state, {
                    objectives: new1Objectives
                });
            });

        } else {
            var new2Objectives = state.objectives.map(function(objective) {
                if (objective._id !== action.data.objective) {
                    return objective;
                }
                var updatedCards = objective.cards.map(function(card) {
                    if (card._id !== action.data._id) {
                        return card;
                    }
                    return action.data;
                });
                 return Object.assign({}, objective, {
                      cards: updatedCards
                  });
            });
            state = Object.assign({}, state, {
                objectives: new2Objectives
            });
        }
        return state;

    } else if (action.type === cardConstants.UPDATE_CARD_ERROR) {
      console.error(action.type, action.error);

        console.log(action.error);

        return state;
    } else if (action.type === Constants.FETCH_USERS_SUCCESS) {
        console.log("users arrived to REDUCER", action.data);
        state = Object.assign({}, state, {
            users: action.data
        });

        return state;

    } else if (action.type === Constants.FETCH_USERS_ERROR) {
      console.error(action.type, action.error);


        return state;
    } else if (action.type === actions.OPEN_MODAL) {
        console.log("users arrived to REDUCER", action.data);
        state = Object.assign({}, state, {
            isOpen: true,
            objectiveId: action.data
        });

        return state;

    } else if (action.type === actions.CLOSE_MODAL) {
        state = Object.assign({}, state, {
            isOpen: false
        });
        return state;
    } else if (action.type === actions.OPEN_OBJECTIVE_MODAL) {
        console.log("users arrived to REDUCER", action.data);
        state = Object.assign({}, state, {
            isObjectiveOpen: true,
        });

        return state;

    } else if (action.type === actions.CLOSE_OBJECTIVE_MODAL) {
        state = Object.assign({}, state, {
            isObjectiveOpen: false
        });
        return state;
    } else if (action.type === Constants.POST_OBJECTIVE_SUCCESS) {
        state = Object.assign({}, state, {
            objectives: state.objectives.concat(action.data)
        });
        return state;

    } else if (action.type === Constants.POST_OBJECTIVE_ERROR) {
      console.error(action.type, action.error);


        return state;
    } else if (action.type === Constants.DELETE_OBJECTIVE_SUCCESS) {
      console.log(action.data, "Object Id when deleted!! REDUCER");

          var new3Objectives = state.objectives.concat();
                for (var i = 0; i < new3Objectives.length; i++) {
                    if ( new3Objectives[i]._id == action.data) {
                        new3Objectives.splice(i, 1);
                    }
                }
                console.log(new3Objectives, "new3Objectives");
            var newState = Object.assign({}, state, {
                    objectives: new3Objectives
                });
                console.log(state, "state");

        return newState;
            

    } else if (action.type === Constants.DELETE_OBJECTIVE_ERROR) {
      console.error(action.type, action.error);


        return state;
    }

    return state;
};

module.exports = overviewReducer;
