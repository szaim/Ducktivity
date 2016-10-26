var combineReducers = require('redux').combineReducers;
var taskCategory = require('./TaskCategory');
var Test = require('./testReducer');


var rootReducer = combineReducers({
		taskCategory: taskCategory,
		test: Test
 });


module.exports = rootReducer;
