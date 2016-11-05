var combineReducers = require('redux').combineReducers;
var CardCategoriesReducer = require('./CardCategoriesReducer');
var ProjectReducer = require('./ProjectReducer');

var rootReducer = combineReducers({
		cardList: CardCategoriesReducer,
		projectList: ProjectReducer
 });


module.exports = rootReducer;
