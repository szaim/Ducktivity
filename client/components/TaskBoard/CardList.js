var React = require('react');
var actions = require('../../redux/actions/CardCategoriesActions');
var connect = require('react-redux').connect;
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { DropTarget } from 'react-dnd';
import { Draggable, Droppable } from 'react-drag-and-drop';
var update = require('react-addons-update');
var CardDetail = require('./CardDetail');



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

  var displayCard = this.props.cardsData.map((data, index)=>{
     return (

      <div>
          <Draggable type='cards' data={JSON.stringify(data)}>
         <ul className="card-box" key={index}>
             <CardDetail key={index} title={data.title} handleCardDelete={this.handleCardDelete.bind(this, data)} cardData={data} />
         </ul>
         </Draggable>
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
    categories: state.cardList.categories,
    userId: state.cardList.userId
	}
};

var Container = connect(mapStateToProps)(CardList);


module.exports = Container;


