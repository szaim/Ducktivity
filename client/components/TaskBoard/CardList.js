var React = require('react');
var actions = require('../../redux/actions/CardCategoriesActions');
var connect = require('react-redux').connect;
var CardDetail = require('./CardDetail');


var CardList = React.createClass({
  componentWillMount: function() {
        console.log(this.props);
    this.props.dispatch(actions.fetchUser());

  },
  handleCommentChange: function() {

  },
  handleCommentSubmit: function() {

  },
  handleCardDelete: function(data, event){
    event.preventDefault();
    console.log('delete/update this.refs', this.refs);
    console.log('delete data', data);
    var cardId = data._id;
    var CardConstruct = {
      owner: data.owner,
      title: data.title,
      category: data.category,
      subtask: data.subtask,
      assignedTo: data.assignedTo,
      status: 'deleted'
    }
    console.log('delete CardConstruct', CardConstruct);

  this.props.dispatch(actions.updateCards(CardConstruct.status, cardId));
  // this.props.dispatch(actions.fetchUser());
  
  },

 render: function(){
  var that = this;
  var handleCardDelete = function(event){
    that.handleCardDelete(this, event)
  };

  var displayCard = this.props.cardsData.map(function(data, index) {
     return (
         <div className="card-box" key={index}>
         <div className='card-top'>
         </div>
              <div className="task-item-container">{index} 
             <CardDetail key={index} title={data.title} handleCardDelete={handleCardDelete.bind(data)} cardData={data} />
              </div>
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
    cards: state.cardList.task,
    userId: state.cardList.userId
	}
};

var Container = connect(mapStateToProps)(CardList);

module.exports = Container;
