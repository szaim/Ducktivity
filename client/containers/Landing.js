var React = require('react');
var ReactDOM = require('react-dom');
var TaskBoard = require('./TaskBoard');
var Overview = require('./Overview');
var NewProject = require('../components/MainDisplay/NewProject');
var Header = require('../components/MainDisplay/Header');
// var Input = require('./UserInput');


var Landing = function(){
	return (
		<div>
		<div className="container-header"><Header/> </div>
		<div id="landing" className="container">
		<div className="container-left">
		
			<div className="projectList-wrapper"><NewProject/> </div>
			<div className="overview-wrapper"> <Overview/> </div>
			
		</div>
			
		<div className="taskBoard-wrapper"> <TaskBoard/> </div>


		
		</div>
		</div>

		)
};


module.exports = Landing;
