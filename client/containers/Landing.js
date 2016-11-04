var React = require('react');
var ReactDOM = require('react-dom');
var TaskBoard = require('./TaskBoard');
var NewProject = require('../components/MainDisplay/NewProject');
// var Input = require('./UserInput');


var Landing = function(){

	return (
		<div id="landing">
			<TaskBoard />
			<NewProject />
		</div>

		)




};


module.exports = Landing;