var actions = require("./action");


var initialState = {
	list: [],
	characters: []
};

var selectedCharacterData = [];
var characterData;
var reducer = function(state, action) {
	state = state || initialState;
	console.log('state.list', state.list);

	if(action.type === actions.FETCH_DATA_SUCCESS) {
		console.log('fetchData success');
		characterData = action.data;
		console.log('characterdata', characterData);
		return {

			list: action.data
		}
	}
	else if(action.type === actions.FETCH_DATA_ERROR) {
		return {
			error: action.error
		}
	}
	else if(action.type === actions.FETCH_CHARACTER) {
		console.log('fetchCharacter success');
		for(var i = 0; i < characterData.length; i++) {
			if (action.character === characterData[i].name) {
				selectedCharacterData.push(characterData[i]);
			}
		}
		console.log(selectedCharacterData);
		state = Object.assign({}, state, {
				characters: selectedCharacterData
			});
		return state
		
	}
	return state
};


module.exports = reducer;