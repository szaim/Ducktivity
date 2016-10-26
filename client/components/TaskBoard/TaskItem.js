var React = require('react')

var TaskItem = function(props) {
 console.log(props)
  return(
    <div className="task-item">
      {props.title}
      <button className='delete-task-button' type='submit' onSubmit={props.handleTaskDelete}>Delete Task</button>
    </div>

  );
}

module.exports= TaskItem;
