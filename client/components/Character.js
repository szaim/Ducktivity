var React = require("react");
var Line = require("rc-progress").Line;


var Character = React.createClass({
	render: function() {
		var containerStyle = {
			width: '250px',
		};
		return (
				<ul className="list-group listCharacters">
				  <li className="list-group-item list-group-item-action active">
				    {this.props.name}
				  </li>
				  <li  className="list-group-item list-group-item-action">
				  	<img src={this.props.img} className="img-rounded m-x-auto d-block characterImg" />
				  </li>
				  <li  className="list-group-item list-group-item-action">
				  	<h5>Weapon:</h5>
				  	{this.props.weapon}
				  </li>
				  <li  className="list-group-item list-group-item-action">
				  	<h5>Weakness:</h5>
				  	{this.props.weakness}
				  </li>
				  <li  className="list-group-item list-group-item-action disabled">
				        <div style={containerStyle}>
				        	<Line 
				        		percent={this.props.percent} 
				        		strokeWidth="4" 
				        		strokeColor={this.props.strokeColor} />
				        </div>				  
        			</li>
				</ul>		

		)
	}
});


module.exports = Character;