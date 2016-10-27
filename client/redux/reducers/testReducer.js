var actions = require("../actions/TaskCategory");
// var data = require ('./dataSample');

var initialState = {
	task: "",
  	taskTitle: ''
};

var TaskCategory = function(state, action) {
	state = state || initialState;

	if(action.type === actions.FETCH_TASKS_SUCCESS) {
		console.log("fetch task recieved in reducer", action.data)
		// var newState = Object.assign({}, state, {
		// 				taskTitle: action.data.title
		// });
				// return newState;
				return state;
		}
	else if (action.type === actions.FETCH_TASKS_ERROR) {
		return action.error

	}

	else if (action.type === actions.ADD_TASKS_SUCCESS) {
		console.log("add task success in reducer", action.data)
		return state;
	}

	else if (action.type === actions.ADD_TASKS_ERROR) {
		return action.error
	}


	console.log('TaskCategory data', data);
	return state;
};

module.exports = TaskCategory;

