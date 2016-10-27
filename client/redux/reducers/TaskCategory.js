var actions = require("../actions/TaskCategory");
var data = require('./dataSample');

var initialState = {

};

var taskCategory = function(state, action) {
		state = state || initialState;

	if(action.type === actions.FETCH_TASKS_SUCCESS) {
		console.log("fetch task recieved in reducer", action.data)
		// var newState = Object.assign({}, state, {
		// 				taskTitle: action.data.title
		// });
				// return newState;
				return data;
		}
	else if (action.type === actions.FETCH_TASKS_ERROR) {
		return action.error

	}

	else if (action.type === actions.UPDATE_TASKS_SUCCESS) {
		console.log("add task/update success in reducer", action.data)
		return data;
	}

	else if (action.type === actions.UPDATE_TASKS_ERROR) {
		return action.error
	}


	console.log('TaskCategory data', data);
	return data;

};

module.exports = taskCategory;
