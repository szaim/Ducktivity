var React = require('react');
var ReactDOM = require('react-dom');
var router = require('react-router');
var Link = router.Link;
var Button = require('./Button');



var Login = function(){

	return (
		<div className="container-login">
		
			<img src={require('../../css/img/logo3.png')} alt='Ducktivity' className='img-logo-login'/>
			<h1 className='title-login'> Ducktivity</h1>
		<a href="/auth/google"><Button>Click here to login with Google!</Button></a>
		</div>

		)

};


module.exports = Login;