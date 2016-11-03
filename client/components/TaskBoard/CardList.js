var React = require('react');
var actions = require('../../redux/actions/CardCategoriesActions');
var connect = require('react-redux').connect;
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { DropTarget } from 'react-dnd';
var update = require('react-addons-update');
var CardDetail = require('./CardDetail');



var CardList = React.createClass({

  getInitialState: function() {
      return {
        cards: this.props.cardsData
      };
    },
    pushCard: function(card) {
    this.setState(update(this.state, {
      cards: {
        $push: [ card ]
      }
    }));
  },
 
  removeCard: function(index) {   
    this.setState(update(this.state, {
      cards: {
        $splice: [
          [index, 1]
        ]
      }
    }));
  },
 
  moveCard: function(dragIndex, hoverIndex) {
    const { cards } = this.state;   
    const dragCard = cards[dragIndex];
 
    this.setState(update(this.state, {
      cards: {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragCard]
        ]
      }
    }));
  },

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

   const { cards } = this.state;
    const { canDrop, isOver, connectDropTarget } = this.props;
    const isActive = canDrop && isOver;
    const style = {
      width: "200px",
      height: "404px",
      border: '1px dashed gray'
    };
 
    const backgroundColor = isActive ? 'lightgreen' : '#FFF';

     var that = this;
    var removeCard = function(event){
    that.removeCard(this, event)
  };
   var moveCard = function(event){
    that.moveCard(this, event)
  };

  var that = this;
  var handleCardDelete = function(event){
    that.handleCardDelete(this, event)
  };

  var displayCard = this.props.cardsData.map(function(data, index) {
     return (

         <div className="card-box" key={index}>
             <CardDetail 


           

             key={index} title={data.title} handleCardDelete={handleCardDelete.bind(data)} cardData={data} />
         </div>
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

const cardTarget = {
  drop(props, monitor, component ) {
    const { id } = props;
    const sourceObj = monitor.getItem();    
    if ( id !== sourceObj.listId ) component.pushCard(sourceObj.card);
    return {
      listId: id
    };
  }
}
 
export default DropTarget("CARD", cardTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
}))(CardList);

module.exports = DragDropContext(HTML5Backend)(Container);


