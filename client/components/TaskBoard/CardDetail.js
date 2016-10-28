var React = require('react')

var CardDetail = function(props) {
 console.log(props)
  return(
    <div className="task-item">
     <h3>{props.title}</h3>
      <button className='delete-task-button' type='submit' onClick={props.handleTaskDelete}>Delete Task</button>
    </div>

  );
}

module.exports= CardDetail;
