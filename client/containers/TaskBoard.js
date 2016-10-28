var React = require('react');
var actions = require('../redux/actions/action');
var connect = require('react-redux').connect;
var CategoryDisplay = require('../components/TaskBoard/CategoryDisplay');
var Test = require('../components/TaskBoard/test');


var TaskBoard = React.createClass({

 render: function(){
   return (
     <div className='task-board'>
     <CategoryDisplay />
     </div>
   )
 }
});



var mapStateToProps = function(state, props) {
	console.log(state);
	return {
	}
};

var Container = connect(mapStateToProps)(TaskBoard);

module.exports = Container;
