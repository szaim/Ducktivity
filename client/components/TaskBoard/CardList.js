var React = require('react');
var actions = require('../../redux/actions/CardCategoriesActions');
var connect = require('react-redux').connect;
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { DropTarget } from 'react-dnd';
import { Draggable, Droppable } from 'react-drag-and-drop';
var update = require('react-addons-update');
var CardDetail = require('./CardDetail');


var selectedItem;
var CardList = React.createClass({

  componentWillMount: function() {
        console.log(this.props);
    this.props.dispatch(actions.fetchUser());

  },
  handleCardDelete: function(data, event){
    event.preventDefault();
    console.log('delete/update this.refs', this.refs);
    console.log('delete data', data);
    var cardId = data._id;
    var CardConstruct = {
      _id: data._id,
      owner: data.owner,
      title: data.title,
      category: data.category,
      subtask: data.subtask,
      assignedTo: data.assignedTo,
      status: 'deleted'
    }
    console.log('delete CardConstruct', CardConstruct);

  this.props.dispatch(actions.updateCards(CardConstruct));
  // this.props.dispatch(actions.fetchUser());
  
  },

    onDrag: function(data) {
    console.log('this was selected', data);
    selectedItem = data._id;

  },


  onDrop: function(data) {
        console.log('category id', data)
        // => banana
      // var cardId = data._id;
     
      // var dropId = {
      //   owner: data.owner,
      //   title: data.title,
      //   category: data.title,
      //   subtask: data.subtask,
      //   status: 'active'
      // }; 
      // var dropedItem = {
      //   selectedId: data._id,
      //   dropId: data.category,
      //   title: data.title
      // }
      var droppedItem = data.category;


      console.log('dropedItem', droppedItem);
      console.log('selectedItem', selectedItem);


      // this.props.dispatch(actions.updateCards(draggedItem));

    },


 render: function(){

  var that = this;
  var handleCardDelete = function(event){
    that.handleCardDelete(this, event)
  };

    var onDrop = function(event) {
      that.onDrop(this,event)
    }

     var onDrag = function(event) {
      that.onDrag(this,event)
    }

  var displayCard = this.props.cardsData.map(function(data, index) {
     return (
          <Droppable types={['cards']} onDrop={onDrop.bind(data)} onDrag={onDrag.bind(data)}>
         <ul className="card-box" key={index}>
             <CardDetail key={index} title={data.title} handleCardDelete={handleCardDelete.bind(data)} cardData={data} />
         </ul>
         </Droppable>
       );
   });


   return (
     <div className='task-categories'>
     {displayCard}
     </div>
   )
 }
});



var mapStateToProps = function(state, props) {
	return {  
    cards: state.cardList.categories,
    userId: state.cardList.userId
	}
};

var Container = connect(mapStateToProps)(CardList);


module.exports = Container;


