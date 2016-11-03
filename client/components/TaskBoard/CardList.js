var React = require('react');
var actions = require('../../redux/actions/CardCategoriesActions');
var connect = require('react-redux').connect;
import { DragSource, DropTarget } from 'react-dnd';
var CardDetail = require('./CardDetail');

const style = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  margin: '.5rem',
  backgroundColor: 'white',
  cursor: 'move'
};


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

 render: function(){

  const { card, isDragging, connectDragSource, connectDropTarget } = this.props;
  const opacity = isDragging ? 0 : 1;

  var that = this;
  var handleCardDelete = function(event){
    that.handleCardDelete(this, event)
  };

  var displayCard = this.props.cardsData.map(function(data, index) {
     return (
         <div className="card-box" key={index}>
             <CardDetail key={index} title={data.title} handleCardDelete={handleCardDelete.bind(data)} cardData={data} />

         </div>
       )
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
