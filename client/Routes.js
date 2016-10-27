var React = require('react');
var Provider = require("react-redux").Provider;
var store = require("./redux/store");
var router = require('react-router');
var Router = router.Router;
var Route = router.Route;
var IndexRoute = router.IndexRoute;
var hashHistory = router.hashHistory;
var Link = router.Link;
var App = require('./containers/App');
var Login = require('./components/Login');
var Landing = require('./containers/Landing');




var routes = (
	<Provider store={store}>
    <Router history={hashHistory}>
    	<Route path="/" component={App}>
	        <IndexRoute component={Login} />
          <Route path="/ducktivity" component={Landing} />
      </Route>
    </Router>
    </Provider>
);


module.exports = routes;