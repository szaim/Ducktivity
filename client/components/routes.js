var React = require('react');
var ReactRouter = require('react-router');
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
var Provider = require("react-redux").Provider;
var Main = require('./Main');
var Home = require('./Home');
var PromptContainer = require('../containers/PromptContainer');
var BattleContainer = require('../containers/BattleContainer');
var store = require("../redux/store");


var routes = (
	<Provider store={store}>
		<Router history={hashHistory}>
			<Route path='/' component={Main}>
				<IndexRoute component={Home} />
				<Route path='playerOne' header='Player One' component={PromptContainer} />
				<Route path='playerTwo/:playerOne' header='Player Two' component={PromptContainer} />
				<Route path='battle' component={BattleContainer}/>
			</Route>
		</Router>
	</Provider>


);

module.exports = routes;