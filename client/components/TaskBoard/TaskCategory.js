var React = require('react');
var actions = require('../../redux/actions/TaskCategory');
var connect = require('react-redux').connect;
var TaskItem = require('./TaskItem');


var TaskCategory = React.createClass({
  componentDidMount: function() {
        console.log(this.props);
    // this.props.dispatch(actions.fetchTasks());

  },
  handleCommentChange: function() {

  },
  handleCommentSubmit: function() {

  },
  handleTaskDelete: function(){
  },
  handleAddTask: function() {

  },
 render: function(){
   console.log(this.props)
   var displayTasks = this.props.cards.map(function(data, index) {
     return (
         <div className="card-box" key={index}>
             <TaskItem title={data.title} cardData={data} />
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
	console.log(state);
	return {
    cards: state.taskCategory
	}
};

var Container = connect(mapStateToProps)(TaskCategory);

module.exports = Container;
