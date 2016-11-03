var combineReducers = require('redux').combineReducers;
var CardCategoriesReducer = require('./CardCategoriesReducer');
var OverviewReducer = require('./overviewReducer');


var rootReducer = combineReducers({
		cardList: CardCategoriesReducer,
		overview: OverviewReducer
 });

module.exports = rootReducer;
