
var actions = require("./action");

var initialState = {
	taskList:[]
}

var reducerCreator = function (state, action) {
	state = state || initialState;
	if (action.type === actions.FETCH_DATA_SUCCESS) {
		return {
			taskList: action.data
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