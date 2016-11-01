var React = require('react')

var CardDetail = function(props) {
  return(
    <div className="task-item">
     <h3>{props.title}</h3>
      <button className='delete-task-button' type='submit' onClick={props.handleCardDelete}>Delete Task</button>
    </div>

  );
}

module.exports= CardDetail;
