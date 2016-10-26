var redux = require('redux');
var createStore = redux.createStore;
var applyMiddleware = redux.applyMiddleware;
var thunk = require('redux-thunk').default;

var rootReducer = require('./reducers/index');
var store = createStore(rootReducer, applyMiddleware(thunk));

module.exports  = store;
