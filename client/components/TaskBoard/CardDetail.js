var React = require('react');
var ReactDOM = require('react-dom');
var connect = require('react-redux').connect;
var actions = require('../../redux/actions/CardCategoriesActions');
import { Draggable, Droppable } from 'react-drag-and-drop';
var $ = require("jquery");

var CardDetail = React.createClass({
	  getInitialState: function() {
	  	return {
	  		contentEditable: false,
	  		drag: true,
	  		buttonAction: 'Edit',
	  		editableIcon: 'ion-ios-compose'
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
		if(this.state.buttonAction == 'Edit'){
	  		this.setState({
	  			editableIcon: 'ion-ios-locked'
	  		});

		}
	  	if(this.state.buttonAction == 'Save') {
	  		this.setState({
	  			contentEditable: false,
	  			buttonAction: 'Edit',
	  			editableIcon: 'ion-ios-compose'
	  		});

	  	this.props.dispatch(actions.updateCards(updateCardTitle));

	  	}else{
	  	this.setState({
	  		contentEditable: true,
	  		buttonAction: 'Save'
	  	});
	  }
	},
	  render: function() {

	  return (

	    <li className="task-item" >
			<h3 id={this.props.cardData._id}  contentEditable={this.state.contentEditable}>{this.props.title}</h3>
			<div className={'edit-card '+ this.state.editableIcon} onClick={this.editable}>
				<span className="edit-card-message">Edit Card</span>
			</div>
			<div className='delete-card ion-android-delete' onClick={this.props.handleCardDelete}><span className='delete-card-message'>Delete</span></div>
	    </li>


	  );
	}
});

var mapStateToProps = function(state, props) {
	return {
	}
};

var Container = connect(mapStateToProps)(CardDetail);



module.exports = Container;
