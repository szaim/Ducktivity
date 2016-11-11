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
	  		editableIcon: 'ion-ios-compose',
	  		message: "Edit Card"
	  	};
	  },
	  editable: function(props) {
	  	var updateCardTitle = {
	  			  _id: this.props.cardData._id,
			      title: $("#"+this.props.cardData._id).text().replace(/&nbsp;/gi, ''),
			      category: this.props.cardData.category,
			      status: 'active'
			    }
			    console.log('updateCardTitle', updateCardTitle);
			    console.log('jquery', $("#"+this.props.cardData._id).html())
		if(this.state.buttonAction == 'Edit'){
	  		this.setState({
	  			editableIcon: 'ion-ios-locked',
	  			message: "Save Card"
	  		});

		}
	  	if(this.state.buttonAction == 'Save') {
	  		this.setState({
	  			contentEditable: false,
	  			buttonAction: 'Edit',
	  			editableIcon: 'ion-ios-compose',
	  			message: "Edit Card"
	  			
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
		<div className="task-item" style={{display: "inlineBlock"}, {padding: 0}}>
			<span id={this.props.cardData._id}  contentEditable={this.state.contentEditable} style={{display: "inlineBlock"}, {padding: 0}}>{this.props.title}</span>
			<div className={'edit-card '+ this.state.editableIcon} onClick={this.editable} style={{display: "inlineBlock"}, {padding: 0}}>
				<span className="edit-card-message"><p>{this.state.message}</p></span>
			</div>
			<div className='delete-card ion-android-delete' onClick={this.props.handleCardDelete}>
				<span className='delete-card-message'>
					<p>Delete</p>
				</span>
			</div>
		</div>

	  );
	}
});

var mapStateToProps = function(state, props) {
	return {
	}
};

var Container = connect(mapStateToProps)(CardDetail);



module.exports = Container;
