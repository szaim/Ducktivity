var React = require('react');
var actions = require('../../redux/actions/CardCategoriesActions');
var connect = require('react-redux').connect;
var CardDetail = require('./CardDetail');
var placeholder = document.createElement("li");
  placeholder.className = "placeholder";

var CardList = React.createClass({
  componentWillMount: function() {
        console.log(this.props);
    this.props.dispatch(actions.fetchUser());

  },
  dragStart: function(e) {
    this.dragged = e.currentTarget;
    e.dataTransfer.effectAllowed = 'move';
    // Firefox requires dataTransfer data to be set
    e.dataTransfer.setData("text/html", e.currentTarget);
  },
  dragEnd: function(data, e) {

    // this.dragged.style.display = "block";
    this.dragged.parentNode.removeChild(placeholder);
    // Update data
    var from = Number(this.dragged.dataset.id);
    var to = Number(this.over.dataset.id);
    if(from < to) to--;
    if(this.nodePlacement == "after") to++;
    data.splice(to, 0, data.splice(from, 1)[0]);
  },
  dragOver: function(e) {
    e.preventDefault();
    // this.dragged.style.display = "none";
    if(e.target.className == "placeholder") return;
    this.over = e.target;
    // Inside the dragOver method
    var relY = e.clientY - this.over.offsetTop;
    var height = this.over.offsetHeight / 2;
    var parent = e.target.parentNode;
    
    if(relY > height) {
      this.nodePlacement = "after";
      parent.insertBefore(placeholder, e.target.nextElementSibling);
    }
    else if(relY < height) {
      this.nodePlacement = "before"
      parent.insertBefore(placeholder, e.target);
    }
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
  var that = this;
  var handleCardDelete = function(event){
    that.handleCardDelete(this, event)
  };
  var dragEnd = function(event) {
    that.dragEnd(this, event)
  };

  var displayCard = this.props.cardsData.map(function(data, index) {
     return (
         <li className="card-box" key={index} draggable="true" data-id={index} key={index} onDragEnd={dragEnd.bind(data)} >
             <CardDetail key={index} title={data.title} handleCardDelete={handleCardDelete.bind(data)} cardData={data} />

         </li>
       )
   });

   return (
     <ul className='task-categories' onDragOver={this.dragOver}>
     {displayCard}
     </ul>
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
