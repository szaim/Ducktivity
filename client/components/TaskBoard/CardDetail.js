var React = require('react');
var ReactDOM = require('react-dom');
var actions = require('../../redux/actions/CardCategoriesActions');
var connect = require('react-redux').connect;

var CardDetail = React.createClass({
	  getInitialState: function() {
	  	return {
	  		contentEditable: false,
	  		buttonAction: 'Edit'
	  	};
	  },

	  editable: function(props) {
	  	var updateCardTitle = {
	  			  _id: this.props.cardData._id,	
			      title: 'need to fix',
			      category: this.props.cardData.category,
			      status: 'active'
			    }
			    console.log('updateCardTitle', updateCardTitle);

	  	if(this.state.buttonAction == 'Save') {
	  		this.setState({
	  			contentEditable: false,
	  			buttonAction: 'Edit'
	  		});
	  		
			    

	  	this.props.dispatch(actions.updateCards(updateCardTitle.status, updateCardTitle._id, updateCardTitle.title));

	  	}else{
	  	this.setState({
	  		contentEditable: true,
	  		buttonAction: 'Save'
	  	});
	  }
	},






	  render: function() {
	  	console.log('card data', this.props.cardData);

	  return(
	    <div className="task-item">
	     <h3 contentEditable={this.state.contentEditable}>{this.props.title}</h3><button type='submit' onClick={this.editable}>{this.state.buttonAction}</button>
	      <button className='delete-task-button' type='submit' onClick={this.props.handleCardDelete}>Delete Task</button>
	    </div>

	  );
	}
});


var mapStateToProps = function(state, props) {
	return {
    // categories: state.cardList.task || [],
    // // categoryId: state
    // userId: state.cardList.userId
	}
};

var Container = connect(mapStateToProps)(CardDetail);

module.exports = Container;
