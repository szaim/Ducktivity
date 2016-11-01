var combineReducers = require('redux').combineReducers;
var CardCategoriesReducer = require('./CardCategoriesReducer');

var rootReducer = combineReducers({
		cardList: CardCategoriesReducer,
 });


module.exports = rootReducer;
