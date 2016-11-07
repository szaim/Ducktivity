var combineReducers = require('redux').combineReducers;
var CardCategoriesReducer = require('./CardCategoriesReducer');
var OverviewReducer = require('./overviewReducer');
var ProjectReducer = require('./ProjectReducer');

var rootReducer = combineReducers({
		cardList: CardCategoriesReducer,
		overview: OverviewReducer,
		projectList: ProjectReducer
 });

module.exports = rootReducer;
