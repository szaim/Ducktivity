var React = require('react');
var ReactDOM = require('react-dom');
var connect = require('react-redux').connect;

var CardDetail = React.createClass({
	  getInitialState: function() {
	  	return {
	  		contentEditable: false,
	  		buttonAction: 'Edit'
	  	};
	  },

	  editable: function() {
	  	if(this.state.buttonAction == 'Save') {
	  		this.setState({
	  			contentEditable: false,
	  			buttonAction: 'Edit'
	  		})
	  	}else{
	  	this.setState({
	  		contentEditable: true,
	  		buttonAction: 'Save'
	  	});
	  }
	},






	  render: function() {

	  return(
	    <div className="task-item">
	     <h3 contentEditable={this.state.contentEditable}>{this.props.title}</h3><button type='submit' onClick={this.editable}>{this.state.buttonAction}</button>
	      <button className='delete-task-button' type='submit' onClick={this.props.handleCardDelete}>Delete Task</button>
	    </div>

	  );
	}
});

module.exports= CardDetail;
