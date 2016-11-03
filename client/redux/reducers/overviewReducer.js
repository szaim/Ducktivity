var Constants = require('../constants/overviewConstants');
var cardConstants = require('../constants/CardCategoriesConstants');
var update = require('react-addons-update');

var initialState = {
    projectTitle: "",
    objectives: [],
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
    }  else if (action.type === cardConstants.UPDATE_CARD_SUCCESS) {
         var new1Objectives = state.objectives.map(function(objective, index) {
            console.log("action data in UPDATE CARD overviewReducer", action.data);
            if ('deleted' == action.data.status) {
                for (var i = 0; i < objective.cards.length; i++) {
                    if (objective.cards[i]._id == action.data._id) {
                        console.log('objective', objective);
                        console.log('objective cards', objective.cards);
                        objective.cards.splice(i, 1);
                    }
                }
            }
            return objective;
        });
        // console.log('categories!!', categories);

        state = Object.assign({}, state, {
            objectives: new1Objectives
        });

        return state;

    } else if (action.type === cardConstants.UPDATE_CARD_ERROR) {
        return action.error
    }
    return state;
 };

module.exports = overviewReducer;
