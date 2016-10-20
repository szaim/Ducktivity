var React = require("react");
var connect = require("react-redux").connect;
var store = require("../redux/store");
var actions = require("../redux/action");
var Character = require("../components/Character");
var Modale = require("../components/Modale");
var Modal = require('react-modal');




var BattleContainer = React.createClass({
	componentDidAmount: function() {
		this.props.dispatch(actions.fetchData());
	},

	// onCharacterSubmit: function(e) {
	// 	e.preventDefault();
	// 	test(this.props.data);
		
	// },

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
				<div className="form-group col-sm-12 col-sm-offset-12 formButton text-xs-center">
			
					<button type="button" className="btn btn-success text-xs-center button" data-toggle="modal" data-target="#myModal">
						MegaMan Fight
					</button><img src="https://media.giphy.com/media/anroh2VdfWXhS/giphy.gif" className="rounded buttonImg" />
			
				</div>
				<div className="form-group col-sm-12 col-sm-offset-12 restartButton text-xs-center">
					<form>
						<button type="submit" className="btn btn-danger text-xs-center">
							Restart The Game
						</button>
					</form>
				</div>
			
				<Modale />

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