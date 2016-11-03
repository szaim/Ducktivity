var Constants = require('../constants/overviewConstants');
var update = require('react-addons-update');

var initialState = {
    projectTitle: "",
    objectives: []
};

var overviewReducer = function(state, action) {
    state = state || initialState;

    if (action.type === Constants.FETCH_PROJECT_SUCCESS) {
        console.log("fetch actionData project in Reducer", action.data);
      
      var newState = Object.assign({}, state, {
                    projectTitle: action.data.title,
                    objectives: action.data.objectives
                });
      return newState;
    } else if (action.type === Constants.FETCH_PROJECT_ERROR) {
        return action.error;
    }
    return state;
 };

module.exports = overviewReducer;
