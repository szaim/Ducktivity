var React = require('react')

var TaskItem = function(props) {

  return(
    <div className="task-item">
      {props.title}
      <input className='comment-box' type='text' value={props.commentValue} onChange={props.handleCommentChange} onSubmit={props.handleCommentSubmit}/>
      <button className='delete-task-button' type='submit' onSubmit={props.handleTaskDelete}>Delete Task</button>
    </div>

  );
}

module.exports= TaskItem;
