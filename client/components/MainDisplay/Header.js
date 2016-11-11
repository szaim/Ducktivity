var React = require('react');
var connect = require('react-redux').connect;


var Header = React.createClass({
	
	  render: function() {
	  	console.log("avatar", this.props.avatar);
	  	console.log("fullName", this.props.fullName);
	  return (
	  		<div className="container-header">
	  			<h3 className="userName"> Welcome: {this.props.fullName} </h3>
	  			<div className="app-title-wrapper">
		  			<img src={require('../../../css/img/logo3.png')} alt='Ducktivity' className='img-logo-header'/>
					<h3 className="app-title">Ducktivity</h3>
		  		</div>
	  		     <a href="https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=https://young-lake-21041.herokuapp.com"
	  		     		className="avatarLogout">
	  		     	<img src={this.props.avatar} className="avatar" />
	  		     	<div className="dropdown-content">
	  		     		<span className="logout"><p>Logout</p></span>
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