var actions = require("../actions/TaskCategory");
var data = require('./dataSample');

var initialState = {

};

var taskCategory = function(state, action) {
	// state = state || initialState;
	//
	// if(action.type === actions.FETCH_TASKS_SUCCESS) {
	// 	console.log("rdata recieved in reducer", action.data)
	// 	var newState = Object.assign({}, state, {
	// 					taskCategory: action.data.title
	// 	});
	// 			return newState;
	// 	}
	// else if (action.type === actions.FETCH_TASKS_ERROR) {
	// 	return action.error
	//
	// }

	return data;
};

module.exports = taskCategory;
