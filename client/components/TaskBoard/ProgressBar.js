var React = require("react");
var Line = require("rc-progress").Line;

var ProgressBar = React.createClass({
	render: function() {
		var containerStyle = {
			width: '20em',
			backgroundColor: "#0672b7"
		};
		return (
	        <div style={containerStyle}>
	        	<Line 
	        		percent={this.props.percent}  
	        		strokeWidth="6" 
	        		strokeColor={this.props.strokeColor} />
	        </div>				

		)
	}
})

module.exports = ProgressBar;