var React = require('react');
var actions = require("../redux/action");
var connect = require("react-redux").connect;


var PromptContainer = React.createClass({
	contextTypes: {
		router: React.PropTypes.object.isRequired
	},
	onFormSubmit: function(e) {
		e.preventDefault();
		var inputValue = this.refs.theInput.value;
		console.log("value", inputValue);
		// this.props.onValueSubmit(inputValue);
		console.log("actions", actions);
		this.props.dispatch(actions.fetchCharacter(this.refs.theInput.value));
		inputValue = "";

		if (this.props.routeParams.playerOne) {
			this.context.router.push({
				pathname: '/battle',
				query: {
					playerOne: this.props.routeParams.playerOne,
					playerTwo: this.refs.theInput.value
				}
			})
		} else {
			this.context.router.push('/playerTwo/' + this.refs.theInput.value)
		}

	},
	render: function() {
		return(
			<div className="jumbotron col-sm-6 col-sm-offset-3 text-center">
				<h1>{this.props.route.header}</h1>
				<div className="col-sm-12">
					<form onSubmit={this.onFormSubmit}>
						<div className="form-group">
							<input
								className="form-control"
								placeholder="Megaman name"
								type="text" ref="theInput"/>
						</div>
						<div className="form-group col-sm-4 col-sm-offset-4">
							<button
								className="btn btn-block btn-success"
								type="submit">
								Continue
							</button>
						</div>
					</form>
				</div>
			</div>	
		)
	}
});

var Container = connect()(PromptContainer);
module.exports = Container;