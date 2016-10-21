var React = require("react");
var ReactRouter = require("react-router");
var Link = ReactRouter.Link;
var actions = require("../redux/action");
var connect = require("react-redux").connect;

var Home = React.createClass({
	componentWillAmount: function() {
		console.log("work");
		// this.props.dispatch(actions.fetchData());
	},
	onSubmitButton: function() {
		this.props.dispatch(actions.fetchData());
	},
	render: function() {
		return (
			<div className="jumbotron col-sm-6 col-sm-offset-3 text-xs-center home">
				<h1>Mega Man Robot</h1>
				<p className="lead">Let's start the Game</p>
				<Link to='/playerOne'>
					<button onClick={this.onSubmitButton} type='button' className='btn btn-lg btn-primary'>
						Get Started
					</button>
				</Link>
			</div>

		)
	}
});

var Container = connect()(Home);
module.exports = Container;