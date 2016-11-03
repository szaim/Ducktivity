var React = require('react');
var actions = require('../../redux/actions/CardCategoriesActions');
var connect = require('react-redux').connect;
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

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
      status: 'active'
    }
    this.props.dispatch(actions.postCard(TaskConstruct, cardId));
    // this.props.dispatch(actions.fetchUser());
    this.refs['card-add-' + cardId].value = "";
  },
 render: function(){

  var that = this;
  var handleAddCard = function(event){
    that.handleAddCard(this, event)
  };
  
  var displayCategories = this.props.categories.map(function(data, index) {
     return (
        <div className="task-list-container" key={index}>
        <div className="category-option-container">
        <h1>{data.title}</h1>
        </div>
            <CardList 
            

            cardsData={data.cards} 
            categoryId={data._id}/>
            <div className="input-task">

            <input  key={index} ref={'card-add-'+ data._id}  type='text' />
            <button type='submit' onClick={handleAddCard.bind(data)}>Add Task</button>
            </div>
        </div>
       )
   });
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
    categories: state.cardList.categories || [],
    // categoryId: state
    userId: state.cardList.userId
	}
};

var Container = connect(mapStateToProps)(CategoryDisplay);

module.exports = DragDropContext(HTML5Backend)(Container);




