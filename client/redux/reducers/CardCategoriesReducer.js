var Constants = require('../constants/CardCategoriesConstants');
var update = require('react-addons-update');

var initialState = {
	categories: [],
	userId: ""
};


var CardCategoriesReducer = function(state, action) {
		state = state || initialState;

	if (action.type === Constants.FETCH_USER_SUCCESS) {
		console.log("add USER success in reducer", action.data.categories)
		state = Object.assign({}, state, {
			categories: action.data.categories,
			userId: action.data.googleID
		});

		console.log('fetch user success', state);
		return state;
	}

	else if (action.type === Constants.FETCH_USER_ERROR) {
		return action.error
	}
	else if (action.type === Constants.POST_CARD_SUCCESS) {
		var categories = state.categories.map(function(category) {
			if(category._id !== action.data.category) {
				return category;
			} else {
				return Object.assign({}, category, {
					cards: category.cards.concat(action.data)
				})
			}
		})	
		state = Object.assign({}, state, {
			categories: categories
		});

		return state;

	}

	else if (action.type === Constants.POST_CARD_ERROR) {
		return action.error
	}
	else if (action.type === Constants.UPDATE_CARD_SUCCESS) {
		var cards;
		var categories = state.categories.map(function(category) {
			if(category._id !== action.data.category) {
				return category;
			} else {
				cards = category.cards.map(function(card) {
					
						console.log('card updated');
						return Object.assign({}, category, {
							cards: action.data
						})
					
				})
			}
		});
		console.log("redux action.data", action.data);
		console.log("redux cards", cards);
		categories = Object.assign({}, categories, {
			cards: cards
		});	
		state = Object.assign({}, state, {
			categories: categories
		});

		return state;

	}

	else if (action.type === Constants.FETCH_USER_ERROR) {
		return action.error
	}




	console.log('TaskCategory state', state);
	return state;

};

module.exports = CardCategoriesReducer;
