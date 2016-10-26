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
  updateTaskInput: function(){

  },
  handleAddTask: function(data, event) {
    event.preventDefault();
    console.log(this.refs);
    var taskId = data.id;
    var TaskConstruct = {
      owner: '',
      title: this.refs[taskId].value,
      category: data.category,
      subtask: [],
      assignedTo: [],
      status: ''
    }
    console.log(TaskConstruct);
  },
 render: function(){
  var that = this;
  var handleAddTask = function(event){
    that.handleAddTask(this, event)
  };
  var handleTaskDelete = this.handleTaskDelete;
   var displayTasks = this.props.cards.map(function(data, index) {
     return (
         <div className="card-box" key={index}>
         <div className='card-top'>
         <h1> {data.category}</h1>
         <input key={index} ref={data.id}  type='text' />
         <button type='submit' onClick={handleAddTask.bind(data)}>Add Task</button>

         </div>
             <TaskItem title={data.title} handleTaskDelete={handleTaskDelete} cardData={data} />
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
