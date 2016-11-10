var React = require('react');
var actions = require('../../redux/actions/ProjectActions');
var overviewActions = require('../../redux/actions/overviewActions');
var connect = require('react-redux').connect;


var Header = React.createClass({
	
	  render: function() {

	  return (
	  		<div className="header">Header
	  		     <a href="https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=http://localhost:8080/"><button className="logout-button">Logout</button></a>

	  		</div>

	  );
	}
});

var mapStateToProps = function(state, props) {
	return {
	}
};

var Container = connect(mapStateToProps)(Header);



module.exports = Container;