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

  onDrop: function(category, card) {

    console.log("drop", card);
      card = JSON.parse(card.cards);
     console.log("drop after", card); 
  if(category._id == card.category) {
  return;
  }
      
    var TaskConstruct = Object.assign({}, card, 
      {status: 'active', category: category._id}
    );

      console.log('delete cardId', TaskConstruct._id);
       console.log('delete original categoryId', card.category);
      this.props.dispatch(actions.postCard(TaskConstruct));
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
    <div className="progressBar-wrapper"> Progress Bar here</div>
     
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




