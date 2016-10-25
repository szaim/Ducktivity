var React = require('react');
var actions = require('../../redux/actions/TaskCategory');
var connect = require('react-redux').connect;
var TaskItem = require('./TaskItem');


var TaskCategory = React.createClass({
  componentDidMount: function() {
        console.log(this.props);
    this.props.dispatch(actions.fetchTasks());

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
   return (
     <div className='task-categories'>
     <h1>ToDo <input type="button" value="Add" onClick={this.props.handleAddTask}></input></h1>
     {this.props.taskStatus=='todo' ?
      <TaskItem title={this.props.taskTitle} commentValue={this.props.commentValue}/>
      : null}
     <h1>In Progress <input type="button" value="Add" onClick={this.props.handleAddTask}></input></h1>
        {this.props.taskStatus=='in-progress' ?
        <TaskItem title={this.props.taskTitle} commentValue={this.props.commentValue}/>
          : null}
     <h1>Blocked <input type="button" value="Add" onClick={this.props.handleAddTask}></input></h1>
     {this.props.taskStatus=='blocked' ?
     <TaskItem title={this.props.taskTitle} commentValue={this.props.commentValue}/>
       : null}
     <h1>Completed <input type="button" value="Add" onClick={this.props.handleAddTask}></input></h1>
     {this.props.taskStatus=='completed' ?
     <TaskItem title={this.props.taskTitle} commentValue={this.props.commentValue}/>
       : null}
     </div>
   )
 }
});



var mapStateToProps = function(state, props) {
	console.log(state);
	return {
		commentValue: state.commentValue,
    taskTitle: 'best task ever',
    taskStatus: 'todo'
	}
};

var Container = connect(mapStateToProps)(TaskCategory);

module.exports = Container;
