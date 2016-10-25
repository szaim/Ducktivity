var actions = require("../actions/TaskCategory");

// var combineReducers = require('redux').combineReducers;
// var reducer = combineReducers({
//     board: boardReducer,
//     list: listReducer,
//     card: cardReducer
// });


var initialState = {
	task: ""
};

var taskCategory = function(state, action) {
	state = state || initialState;

	if(action.type === actions.FETCH_TASKS_SUCCESS) {
		console.log("rdata recieved in reducer", action.data)
		var newState = Object.assign({}, state, {
						task: action.data
		});
				return newState;
		}
	else if (action.type === actions.FETCH_TASKS_ERROR) {
		return action.error

	}

	return state;
};

module.exports = taskCategory;
