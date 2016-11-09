var Constants = require('../constants/CardCategoriesConstants');
var update = require('react-addons-update');

var initialState = {
    categories: [],
    projects: []
};

var ProjectReducer = function(state, action) {
    state = state || initialState;

    if (action.type === Constants.FETCH_PROJECT_SUCCESS) {
        console.log("get PROJECT success in reducer", action.data);
        state = Object.assign({}, state, {
            projects: action.data,
           
        });

        console.log('fetch PROJECT success', state);
        return state;
    } else if (action.type === Constants.FETCH_PROJECT_ERROR) {
        return state;
    } 
    else if (action.type === Constants.CREATE_PROJECT_SUCCESS) {
        console.log("post PROJECT success in reducer", action.data);
        return state;
    } else if (action.type === Constants.CREATE_PROJECT_ERROR) {
        return state;
    } 
    // console.log('state', state);
    return state;

};

module.exports = ProjectReducer;