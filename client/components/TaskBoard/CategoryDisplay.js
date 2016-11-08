var React = require('react');
var actions = require('../../redux/actions/CardCategoriesActions');
var actionsOverview = require('../../redux/actions/overviewActions');
var connect = require('react-redux').connect;
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { Draggable, Droppable } from 'react-drag-and-drop';
var CardList = require('./CardList');

var CategoryDisplay = React.createClass({

  componentDidMount: function() {
    this.props.dispatch(actions.fetchUser());
  },
  handleAddCard: function(data, event) {
    event.preventDefault();
    var cardId = data._id;
    var val = this.refs['card-add-' +cardId].value
    var TaskConstruct = {
      owner: data.owner,
      title: val,
      category: data.title,
      subtask: data.subtask,
      status: 'active' ,
      objective: '581b99035626253e933a2f85'
    }
    this.props.dispatch(actions.postCard(TaskConstruct, cardId));
    this.refs['card-add-' + cardId].value = "";
  },



  onDrop: function(category, card) {

    console.log("drop", card);
      card = JSON.parse(card.cards);
     console.log("drop after", card); 
  if(category._id == card.category) {
  return;
  }
  
      var TaskConstruct = {
        _id: card._id,
        owner: card.owner,
        title: card.title,
        category: category._id,
        subtask: card.subtask,
        status: 'active'
      };

      console.log('delete cardId', TaskConstruct._id);
       console.log('delete original categoryId', card.category);
      this.props.dispatch(actions.moveCard(TaskConstruct, category._id));
      this.props.dispatch(actions.deleteCard(TaskConstruct._id, card.category));
    },

 render: function(){
  if(this.props.categories){
    var displayCategories = this.props.categories.map((data, index)=> {
     return (
        <div className="task-list-container" key={index}>
        <Droppable types={['cards']} onDrop={this.onDrop.bind(this, data)}>
        <h1 className="category-option-container">{data.title}</h1>
            <div className="input-task">
            <input  key={index} ref={'card-add-'+ data._id}  type='text' />
            <button type='submit' onClick={this.handleAddCard.bind(this, data)}>Add Task</button>
            </div>
            <CardList 
            cardsData={data.cards} 
            categoryId={data._id}/>
      </Droppable>   
        </div>

       )
   });
  }
  
  // }

   return (
     <div className='category-container'>
     <div className='task-categories'>
     {displayCategories}
     </div>
     </div>
   )
 }

 });







var mapStateToProps = function(state, props) {
	return {
    categories: state.cardList.categories || []

	}
};

var Container = connect(mapStateToProps)(CategoryDisplay);

module.exports = Container;




