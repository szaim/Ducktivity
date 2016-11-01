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
  handleTaskDelete: function(data, event){
    event.preventDefault();
    console.log('delete/update this.refs', this.refs);
    console.log('delete data', data);
    var taskId = data._id;
    var TaskConstruct = {
      owner: data.owner,
      title: data.title,
      category: data.category,
      subtask: data.subtask,
      assignedTo: data.assignedTo,
      status: 'deleted'
    }
    console.log('delete TaskConstruct', TaskConstruct);

  this.props.dispatch(actions.updateTasks(TaskConstruct.status, taskId));
  // this.props.dispatch(actions.fetchUser());
  
  },

 render: function(){
  var that = this;
  var handleTaskDelete = function(event){
    that.handleTaskDelete(this, event)
  };

  var displayTasks = this.props.cardsData.map(function(data, index) {
     return (
         <div className="card-box" key={index}>
         <div className='card-top'>
         </div>
              <div className="task-item-container">{index} 
             <CardDetail key={index} title={data.title} handleTaskDelete={handleTaskDelete.bind(data)} cardData={data} />
              </div>
         </div>
       )
   });

   return (
     <div className='task-categories'>
     {displayTasks}
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
