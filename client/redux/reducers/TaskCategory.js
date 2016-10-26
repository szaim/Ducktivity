var actions = require("../actions/TaskCategory");

var initialState = {
	task: "",
  taskTitle: ''
};

var taskCategory = function(state, action) {
	state = state || initialState;

	if(action.type === actions.FETCH_TASKS_SUCCESS) {
		console.log("rdata recieved in reducer", action.data)
		var newState = Object.assign({}, state, {
						taskTitle: action.data.title
		});
				return newState;
		}
	else if (action.type === actions.FETCH_TASKS_ERROR) {
		return action.error

	}

	return state;
};

module.exports = taskCategory;
