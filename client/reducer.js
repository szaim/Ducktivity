
var actions = require("./action");

var initialState = {};

var reducerCreator = function (state, action) {
	state = state || initialState;
	if (action.type === actions.FETCH_DATA_SUCCESS) {
		return {
			message: action.data.message
		}
	}
	if (action.type === actions.FETCH_DATA_ERROR) {
		return {
			error: action.error
		}
	}
	return state;
}

// exports.reducerCreator = reducerCreator;


module.exports = reducerCreator;