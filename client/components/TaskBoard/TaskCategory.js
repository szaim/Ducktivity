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
  handleTaskDelete: function(data, event){
    console.log('delete');
    event.preventDefault();
    console.log('delete/update this.refs', this.refs);
    console.log('delete data', data);
    var taskId = data.title;
    var TaskConstruct = {
      owner: data.owner,
      title: data.title,
      category: data.category,
      subtask: data.subtask,
      assignedTo: data.assignedTo,
      status: 'deleted'
    }
    console.log('delete TaskConstruct', TaskConstruct);

this.props.dispatch(actions.deleteTask(TaskConstruct, userId));

  },
  handleAddTask: function(data, event) {
    event.preventDefault();
    console.log('addTask this.refs', this.refs);
    var taskId = data.id;
    var TaskConstruct = {
      owner: data.owner,
      title: this.refs['card-add' + taskId].value,
      category: data.category,
      subtask: data.subtask,
      assignedTo: data.assignedTo,
      status: 'active'
    }
    console.log('addTask', TaskConstruct);
this.props.dispatch(actions.updateTasks(TaskConstruct, userId));


  },
 render: function(){
  var that = this;
  var handleAddTask = function(event){
    that.handleAddTask(this, event)
  };
  var handleTaskDelete = function(event){
    that.handleTaskDelete(this, event)
  };

  var displayTasks = this.props.cards.map(function(data, index) {
     return (
         <div className="card-box" key={index}>
         <div className='card-top'>
         <h1> {data.category}</h1>
         <input key={index} ref={'card-add'+ data.id}  type='text' />
         <button type='submit' onClick={handleAddTask.bind(data)}>Add Task</button>

         </div>
              <div className="task-item-container">
             <TaskItem title={data.title} handleTaskDelete={handleTaskDelete.bind(data)} cardData={data} />
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
	console.log(state);
	return {
    cards: state.taskCategory
	}
};

var Container = connect(mapStateToProps)(TaskCategory);

module.exports = Container;
