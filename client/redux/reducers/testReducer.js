// var actions = require("../actions/TaskCategory");
var data = require ('./dataSample');

// var initialState = {
// 	task: "",
//   taskTitle: ''
// };

var test = function(state, action) {
	// state = state || initialState;

	// if(action.type === actions.FETCH_TASKS_SUCCESS) {
	// 	console.log("rdata recieved in reducer", action.data)
	// 	var newState = Object.assign({}, state, {
	// 					taskTitle: action.data.title
	// 	});
	// 			return newState;
	// 	}
	// else if (action.type === actions.FETCH_TASKS_ERROR) {
	// 	return action.error

	// }
	console.log('test data', data);
	return data;
};

module.exports = test;

