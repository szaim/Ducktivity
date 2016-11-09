var React = require("react");
var Line = require("rc-progress").Line;

var ProgressBar = React.createClass({
	render: function() {
		var containerStyle = {
			width: '300px',
		};
		return (
	        <div style={containerStyle}>
	        	<Line 
	        		percent={this.props.percent}  
	        		strokeWidth="4" 
	        		strokeColor={this.props.strokeColor} />
	        </div>				

		)
	}
})

module.exports = ProgressBar;