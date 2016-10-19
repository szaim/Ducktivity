var React = require("react");
var connect = require("react-redux").connect;
var store = require("../redux/store");
var actions = require("../redux/action");

var BattleContainer = React.createClass({
	componentDidAmount: function() {
		this.props.dispatch(actions.fetchData());
	},
	render: function() {
		return (
			<div>
				<span>{this.props.data[0].name}</span>
			</div>


		)
	}
});

var mapStateToProps = function(state, props) {
	return {
		data: state.characters
	}
};

var Container = connect(mapStateToProps)(BattleContainer)

module.exports = Container;