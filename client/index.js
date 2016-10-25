var React = require("react");
// import { render } from 'react-dom';
var render = require("react-dom").render;
var Provider = require("react-redux").Provider;
var store = require("./redux/store");
var ContainerSample = require("./containers/ContainerSample");


render(	<Provider store={store}>
			<ContainerSample />
		</Provider>
		, document.getElementById('app')
);
