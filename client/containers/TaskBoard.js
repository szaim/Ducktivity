var React = require('react');
var connect = require('react-redux').connect;
var CategoryDisplay = require('../components/TaskBoard/CategoryDisplay');



var TaskBoard = React.createClass({

 render: function(){
   return (
     <div className='task-board'>
     <a href="/logout"><button className="logout-button">Logout</button></a>
     <CategoryDisplay />
     </div>
   )
 }
});



var mapStateToProps = function(state, props) {
	return {
	}
};

var Container = connect(mapStateToProps)(TaskBoard);

module.exports = Container;
