var routes = (
	<Provider store={store}>
    <Router history={hashHistory}>
    	<Route path="/" component={App}>
	        <IndexRoute component={Login} />
          <Route path="/mealPlan" component={Main} />
      </Route>
    </Router>
    </Provider>
);
