var React = require('react');
var ReactDOM = require('react-dom');
var Provider = require("react-redux").Provider;
var store = require("./store");
var connect = require("react-redux").connect;

var HelloWorld = React.createClass({
	render: function() {
		return <div>{this.props.message}</div>
	}
})

var mapStateToProps = function(state, props) {
    return {
        message: state.message
    };
};

var Container = connect(mapStateToProps)(HelloWorld);

document.addEventListener('DOMContentLoaded', function() {
    ReactDOM.render( <Provider store={store}>
            <Container />
        </Provider>, document.getElementById('app'));
});






