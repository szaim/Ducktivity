var actions = require("./action");


var initialState = {
	list =[]
}

var reducer = function(state, action) {
	state = state || initialState;

	if(action.type === actions.FETCH_DATA_SUCCESS) {
		return {
			list: action.data
		}
	}
	if(action.type === actions.FETCH_DATA_ERROR) {
		return {
			error: action.error
		}
	}
};


module.exports = reducer;