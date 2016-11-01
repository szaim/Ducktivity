var Constants = require('../constants/CardCategoriesConstants');

var initialState = {
	task: [],
	userId: ""
};


var CardCategoriesReducer = function(state, action) {
		state = state || initialState;

	if (action.type === Constants.FETCH_USER_SUCCESS) {
		console.log("add USER success in reducer", action.data.categories)
		state = Object.assign({}, state, {
			task: action.data.categories,
			userId: action.data.googleID
		});

		console.log('fetch user success', state);
		return state;
	}

	else if (action.type === Constants.FETCH_USER_ERROR) {
		return action.error
	}




	console.log('TaskCategory state', state);
	return state;

};

module.exports = CardCategoriesReducer;
