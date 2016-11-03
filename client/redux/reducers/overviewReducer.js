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
        console.log("fetch actionData project in Reducer", action.data);
        console.log('overview reducer state', state);
      
      var newState = Object.assign({}, state, {
                    projectTitle: action.data.title,
                    objectives: action.data.objectives
                });
      return newState;
    } else if (action.type === Constants.FETCH_PROJECT_ERROR) {
        return action.error;
    }

        // } else if (action.type === cardConstants.POST_CARD_SUCCESS) {
    // 	// var index = '';
    //         var objective = state.objectives.map(function(objective, index) {
    //         if (objective._id !== action.data.objective) {
    //             return objective;
    //         } else {
    //         	// index = i;
    //          //    return Object.assign({}, objective, {
    //          //        cards: objective.cards.concat(action.data)
    //          // //    });
    //         	// newState = update(state.objectives, {
    //         	// 	index: {$push: action.data}
    //         	// });

    //         }

    //     });
    //     var objectives = objectives[index];
    //     state = Object.assign({}, state, {
    //         objectives: objectives
    //     });
    //     return state;

    // } else if (action.type === cardConstants.POST_CARD_ERROR) {
    //     return action.error;
    // } 

    return state;
 };

module.exports = overviewReducer;
