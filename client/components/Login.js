var React = require('react');
var ReactDOM = require('react-dom');
var router = require('react-router');
var Link = router.Link;



var Login = function(){

	return (
		<div id="login">
			<div id="login-header"><h1>Ducktivty</h1></div>

		<a href="/auth/google"><button>Click here to login with Google!</button></a>
		</div>

		)

};


module.exports = Login;