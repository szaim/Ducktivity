var React = require('react');
var actions = require('../../redux/actions/TaskCategory');
var connect = require('react-redux').connect;



var test = React.createClass({
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

  displayTask() {
    var that = this;
    return this.props.testCategories.map(function(index, value) {
    // console.log('testCategories test', this.props.testCategories)
    return (
        <div key={value}>
            <h1>{index.category} <input type="button" value="Add" onClick={that.handleAddTask()}/></h1>
            <TaskItem title={index.taskTitle} commentValue={index.commentValue}/>

        </div>
      )

  });
  },

 render: function(){
    console.log('this.props', this.props);
   return (
     <div className='task-categories'>
      {this.displayTask()}
     </div>
   )
 }
});



var mapStateToProps = function(state, props) {
	// console.log('state', state);
  // console.log('testCategories', this props.testCategories);

	return {
		commentValue: state.commentValue,
    taskTitle: state.taskCategory.taskTitle,
    taskStatus: 'todo',
    testCategories: state.test
	}
};

var Container = connect(mapStateToProps)(test);

module.exports = Container;