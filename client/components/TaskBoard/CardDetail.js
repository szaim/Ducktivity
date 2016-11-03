var React = require('react');
var ReactDOM = require('react-dom');
var actions = require('../../redux/actions/CardCategoriesActions');
var connect = require('react-redux').connect;
import { DragSource, DropTarget } from 'react-dnd';
import flow from 'lodash/flow';
import { Draggable, Droppable } from 'react-drag-and-drop'
var $ = require("jquery");


var CardDetail = React.createClass({
	  getInitialState: function() {
	  	return {
	  		contentEditable: false,
	  		drag: true,
	  		buttonAction: 'Edit'
	  	};
	  },
	  editable: function(props) {
	  	var updateCardTitle = {
	  			  _id: this.props.cardData._id,	
			      title: $("#"+this.props.cardData._id).html(),
			      category: this.props.cardData.category,
			      status: 'active'
			    }
			    console.log('updateCardTitle', updateCardTitle);
			    console.log('jquery', $("#"+this.props.cardData._id).html())
	  	if(this.state.buttonAction == 'Save') {
	  		this.setState({
	  			contentEditable: false,
	  			buttonAction: 'Edit'
	  		});
	  		
			    

	  	this.props.dispatch(actions.updateCards(updateCardTitle));

	  	}else{
	  	this.setState({
	  		contentEditable: true,
	  		buttonAction: 'Save'
	  	});
	  }
	},

	// onDrag: function() {
	// 	console.log('this was selected', this.props.cardData._id);
	// },


	  render: function() {

	  return (
	 	<Draggable type='cards' data={this.props.title}>
	    <li className="task-item" >
	     <h3 id={this.props.cardData._id}  contentEditable={this.state.contentEditable}>{this.props.title}</h3><button type='submit' onClick={this.editable}>{this.state.buttonAction}</button>
	      <button className='delete-task-button' type='submit' onClick={this.props.handleCardDelete}>Delete Task</button>
	    </li>
		</Draggable>	   

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
