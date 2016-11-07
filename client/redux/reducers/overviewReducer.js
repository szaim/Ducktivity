var Constants = require('../constants/overviewConstants');
var actions = require('../actions/overviewActions');
var cardActions = require('../actions/CardCategoriesActions');
var cardConstants = require('../constants/CardCategoriesConstants');
var update = require('react-addons-update');

var initialState = {
    projectTitle: "",
    objectives: [],
    users: [],
    isOpen: false,
    objectiveId: ''
};

var overviewReducer = function(state, action) {
    state = state || initialState;

    if (action.type === Constants.FETCH_PROJECT_SUCCESS) {
        var newState = Object.assign({}, state, {
            projectTitle: action.data.title,
            objectives: action.data.objectives
        });
        return newState;
    } else if (action.type === Constants.FETCH_PROJECT_ERROR) {
        return action.error;
    } else if (action.type === cardConstants.POST_CARD_SUCCESS) {
        var newObjectives = state.objectives.map(function(objective, index) {
            if (objective._id != action.data.objective) {
                return objective;
            } else {
                return Object.assign({}, objective, {
                    cards: objective.cards.concat(action.data)
                });
            }
        });
        state = Object.assign({}, state, {
            objectives: newObjectives
        });
        return state;

    } else if (action.type === cardConstants.POST_CARD_ERROR) {
        return action.error;
    } else if (action.type === cardConstants.UPDATE_CARD_SUCCESS) {
        console.log('overview update hit');
        //  var new1Objectives = state.objectives.map(function(objective, index) {
        //     console.log("action data in UPDATE CARD overviewReducer", action.data);
        //     if ('deleted' == action.data.status) {
        //         for (var i = 0; i < objective.cards.length; i++) {
        //             if (objective.cards[i]._id == action.data._id) {
        //                 console.log('objective', objective);
        //                 console.log('objective cards', objective.cards);
        //                 objective.cards.splice(i, 1);
        //             }
        //         }
        //     }
        //     return objective;
        // });
        // // console.log('categories!!', categories);

        // state = Object.assign({}, state, {
        //     objectives: new1Objectives
        // });

        // return state;
        //-----------------

        var new1Objectives = state.objectives.map(function(objective, index) {
            console.log('action data update', action.data);
            // console.log('status', action.data.status);
            // console.log('action.data._id', action.data._id);

            if ('deleted' == action.data.status) {
                for (var i = 0; i < objective.cards.length; i++) {
                    // console.log('looking for objective id', objective.cards[i]._id);
                    if (objective.cards[i]._id == action.data._id) {
                        // console.log('objective cards', objective.cards);
                        // console.log('updated objective', objective.cards[i]);
                        // console.log('i index', i);
                        objective.cards.splice(i, 1);
                    }
                }
                console.log('objective!!', objective);

                return objective;

                state = Object.assign({}, state, {
                    objectives: new1Objectives
                });
            } else {
                console.log('updating the card title hit');
        var updatedTitleCard;
                for (var i = 0; i < objective.cards.length; i++) {
                    if (objective.cards[i]._id == action.data._id) {
                        updatedTitleCard = objective.cards[i].title = action.data.title;
                        return update(state, {
                            objectives: {
                                cards: {
                                    [action.data._id]: {
                                        $set: action.data
                                    }
                                }
                            }
                        })
                    }
                }
            }

        });
        return state;

    } else if (action.type === cardConstants.UPDATE_CARD_ERROR) {
        return action.error;
    } else if (action.type === Constants.FETCH_USERS_SUCCESS) {
        console.log("users arrived to REDUCER", action.data);
        state = Object.assign({}, state, {
            users: action.data
        });

        return state;

    } else if (action.type === Constants.FETCH_USERS_ERROR) {
        return action.error;
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
    }
    return state;
};

module.exports = overviewReducer;