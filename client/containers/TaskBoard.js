var React = require('react');
var connect = require('react-redux').connect;
var CategoryDisplay = require('../components/TaskBoard/CategoryDisplay');



var TaskBoard = React.createClass({

 render: function(){
   return (
     <div className='task-board'>
     <a href="https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=http://localhost:8080/"><button className="logout-button">Logout</button></a>
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
