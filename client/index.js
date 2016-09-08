var React = require('react');
var ReactDOM = require('react-dom');
var Provider = require("react-redux").Provider;
var store = require("./store");
var actions = require("./action");
var connect = require("react-redux").connect;

var HelloWorld = React.createClass({
	componentWillMount: function(){
		console.log("before dispatch", this.props.message);
		this.props.dispatch(actions.fetchData());
	},
	render: function(){
		console.log("after dispatch ", this.props.message);
		return (
			<div>{this.props.message}</div>)
	}
});

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


// var Board = React.createClass({
// 	componentWillMount: function(){
// 		console.log("before dispatch", this.props.message);
// 		this.props.dispatch(actions.fetchData());
// 	},
// 	render: function(){
// 		console.log("after dispatch ", this.props.message);
// 		return(
// 			<div className='Board'>
// 				{this.props.message}
// 				<h1 className='text-center'>InstaWinner</h1>
// 				<SearchBar />
// 				<ImageList />
				

// 			</div>
// 		);
// 	}
// });



