var React = require('react');
var connect = require('react-redux').connect;


var Header = React.createClass({
	
	  render: function() {
	  	console.log("avatar", this.props.avatar);
	  	console.log("fullName", this.props.fullName);
	  return (
	  		<div className="container-header">
	  			<h3 className="userName"> Welcome: {this.props.fullName}</h3>
	  			<img src={require('../../../css/img/logo3.png')} alt='Ducktivity' className='img-logo-header'/>
	  		     <a href="https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=http://localhost:8080/"
	  		     		className="avatarLogout">
	  		     	<img src={this.props.avatar} className="avatar" />
	  		     	<div className="dropdown-content">
	  		     		<span className="logout">Logout</span>
	  		     	</div>
	  		     </a>
	  		</div>

	  );
	}
});


var mapStateToProps = function(state, props) {
	return {
		avatar: state.cardList.avatar,
		fullName: state.cardList.userFullName
	}
};

var Container = connect(mapStateToProps)(Header);



module.exports = Container;