var React = require('react');
var ReactDOM = require('react-dom');
var TaskBoard = require('./TaskBoard');
var Overview = require('./Overview');
// var NewProject = require('../components/MainDisplay/NewProject');
// var Input = require('./UserInput');


var Landing = function(){
	return (
		<div id="landing">

		<div className="taskBoard-wrapper"> <TaskBoard/> </div>
			
		<div className="overview-wrapper"> <Overview/> </div>
			
		<div className="projectList-wrapper">  </div>
		</div>

		)
};


module.exports = Landing;
