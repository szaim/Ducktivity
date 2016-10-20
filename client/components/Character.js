var React = require("react");


var Character = React.createClass({
	render: function() {
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
				  <li  className="list-group-item list-group-item-action disabled">Vestibulum at eros</li>
				</ul>		

		)
	}
});


module.exports = Character;