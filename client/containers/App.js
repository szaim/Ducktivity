var React = require('react');
var ReactDOM = require('react-dom');
var TaskBoard = require('./TaskBoard');



var App = function(props){

	return (
		<div id="App">
			{props.children}
		</div>

		)




};


module.exports = App;