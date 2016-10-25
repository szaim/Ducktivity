var React = require('react');
var actions = require("../redux/actions/action");
var connect = require("react-redux").connect;
var store = require("../redux/store");


var ContainerSample = React.createClass({
	componentDidMount: function() {
		this.props.dispatch(actions.fetchData());
	},
	render: function() {
		return (
			<div>
			hello
			{this.props.data}
			</div>

		)
	}
});

var mapStateToProps = function(state, props) {
	console.log(state);
	return {
		data: state.task
	}
};

var Container = connect(mapStateToProps)(ContainerSample);

module.exports = Container;