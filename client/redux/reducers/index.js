var combineReducers = require('redux').combineReducers;
var taskCategory = require('./TaskCategory');

var rootReducer = combineReducers({
		taskCategory: taskCategory,
 });


module.exports = rootReducer;
