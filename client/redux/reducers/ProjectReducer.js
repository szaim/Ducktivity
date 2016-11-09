var Constants = require('../constants/projectConstants');
var update = require('react-addons-update');

var initialState = {
    projects: []
};

var ProjectReducer = function(state, action) {
    state = state || initialState;

    if (action.type === Constants.GET_PROJECTS_SUCCESS) {
        console.log("get PROJECT success in reducer", action.data);
        state = Object.assign({}, state, {
            projects: action.data,
           
        });

        console.log('GET PROJECT success', state);
        return state;
    } else if (action.type === Constants.GET_PROJECTS_ERROR) {
        return action.error;
    } 
    else if (action.type === Constants.CREATE_PROJECT_SUCCESS) {
        console.log("post PROJECT success in reducer", action.data);
        state = Object.assign({}, state, {
            projects: state.projects.concat(action.data)
        })

        return state;
    } else if (action.type === Constants.CREATE_PROJECT_ERROR) {
        return state;
    } 
    else if (action.type === Constants.DELETE_PROJECT_SUCCESS) {
        for (var i = 0; i < state.projects.length; i++) {
            if(state.projects[i]._id === action.data._id) {
                // state.projects.splice(i, 1)
                state = update(state, {projects: {$splice: [[i, 1]]}})
                break;
            }
            // projects = state.projects;
        }
        console.log("projects", state);

        return state;
 
      

    } else if (action.type === Constants.DELETE_CARD_ERROR) {
        return state
    
    } 
    // console.log('state', state);
    return state;

};

module.exports = ProjectReducer;