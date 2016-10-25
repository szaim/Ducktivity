var actions = require("../actions/action");

// var combineReducers = require('redux').combineReducers;
// var reducer = combineReducers({
//     board: boardReducer,
//     list: listReducer,
//     card: cardReducer
// });


var initialState = {
	task: ""
};

var reducer = function(state, action) {
	state = state || initialState;

	if(action.type === actions.FETCH_DATA_SUCCESS) {
		console.log("rdata recieved in reducer", action.data)
		var newState = Object.assign({}, state, {
						task: action.data.message
		});
				return newState;
		}
	else if (action.type === actions.FETCH_DATA_ERROR) {
		return action.error

	}

	return state;
};

module.exports = reducer;
