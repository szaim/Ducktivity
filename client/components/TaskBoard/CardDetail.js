var React = require('react');
var ReactDOM = require('react-dom');
var actions = require('../../redux/actions/CardCategoriesActions');
var connect = require('react-redux').connect;
import { DragSource, DropTarget } from 'react-dnd';
import flow from 'lodash/flow';
var $ = require("jquery");

const style = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  margin: '.5rem',
  backgroundColor: 'white',
  cursor: 'move'
};

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
	  render: function() {

	  	 const { card, isDragging, connectDragSource, connectDropTarget } = this.props;
  		 const opacity = isDragging ? 0 : 1;

	  return
	  	connectDragSource(connectDropTarget(
	   <div style={{style, opacity }}>
	    <div className="task-item">
	     <h3 id={this.props.cardData._id}  contentEditable={this.state.contentEditable}>{this.props.title}</h3><button type='submit' onClick={this.editable}>{this.state.buttonAction}</button>
	      <button className='delete-task-button' type='submit' onClick={this.props.handleCardDelete}>Delete Task</button>
	    </div>
	       </div>

	  ))
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

const cardSource = {
 
  beginDrag(props) {    
    return {      
      index: props.index,
      listId: props.listId,
      card: props.card
    };
  },
 
  endDrag(props, monitor) {
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult(); 
 
    if ( dropResult && dropResult.listId !== item.listId ) {
      props.removeCard(item.index);
    }
  }
};

const cardTarget = {
 
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;
    const sourceListId = monitor.getItem().listId;  
 
    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }
 
    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
 
    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
 
    // Determine mouse position
    const clientOffset = monitor.getClientOffset();
 
    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;
 
    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%
 
    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }
 
    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }
 
    // Time to actually perform the action
    if ( props.listId === sourceListId ) {
      props.moveCard(dragIndex, hoverIndex);
 
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      monitor.getItem().index = hoverIndex;
    }   
  }
};

export default flow(
  DropTarget("CARD", cardTarget, connect => ({
    connectDropTarget: connect.dropTarget()
  })),
  DragSource("CARD", cardSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }))
)(CardDetail);


module.exports = Container;
