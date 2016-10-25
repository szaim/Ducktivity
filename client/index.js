var React = require("react");
// import { render } from 'react-dom';
var render = require("react-dom").render;
var Provider = require("react-redux").Provider;
var store = require("./redux/store");
var App = require("./containers/App");
var TaskBoard = require('./containers/TaskBoard');

render(	<Provider store={store}>
			<TaskBoard />
		</Provider>
		, document.getElementById('app')
);
