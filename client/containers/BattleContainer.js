var React = require("react");
var connect = require("react-redux").connect;
var store = require("../redux/store");
var actions = require("../redux/action");
var Character = require("../components/Character");
var styles = require("../css/styles");

var BattleContainer = React.createClass({
	componentDidAmount: function() {
		this.props.dispatch(actions.fetchData());
	},
	render: function() {
		return (
			<div className="container">
				<div className="leftComponent">
					<Character 
						name={this.props.data[0].name} 
						img={this.props.data[0].sprite1}
						weapon={this.props.data[0].weapon}
						weakness={this.props.data[0].weakness} />
				</div>
				<div className="rightComponent">
					<Character 
						name={this.props.data[1].name} 
						img={this.props.data[1].sprite1}
						weapon={this.props.data[1].weapon}
						weakness={this.props.data[1].weakness} />
				</div>
				
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