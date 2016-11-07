var React = require('react');
var actions = require('../../redux/actions/ProjectActions');
var connect = require('react-redux').connect;


var NewProject = React.createClass({

componentDidMount: function() {
  this.props.dispatch(actions.fetchProject());
},

submitProject: function(event) {
  event.preventDefault();
if(!this.refs.projectTitle.value) {
  alert('Please enter a project name.');

} else {
  //create new project action
    console.log('project title ref', this.refs.projectTitle.value);
    this.refs.projectTitle.value = '';
}

},

onSelect: function() {
   //run action to fetch selected dropdown project
  console.log('this was selected', this.refs.selectedProject.value);
},

 render: function(){
    if(this.props.projectList){
      var projectList = this.props.projectList.map(function(title, index){
      return (
        //try and sort by project titles
        <option key={index} value={title.title}>{title.title}</option>
      )
    });

    }

   return (
    <div className="Form wrapper">
      <form>
     
        <input placeholder='Project Title...' ref="projectTitle" />
        <span>
          <button type='submit' onClick={this.submitProject}>Create Project</button>
        </span>
        <h5>Select Project:</h5>
        <select ref="selectedProject" onselect={this.onSelect}>
          {projectList}
        </select>
        <span>
          <button type='submit' onClick={this.onSelect}>Go</button>
        </span>
      
      </form>
      
    </div>
 
   )
 }

 });







var mapStateToProps = function(state, props) {
	return {
    projectList: state.projectList.projects || [],
    categories: state.cardList.categories || [],
    // categoryId: state
    userId: state.cardList.userId
	}
};

var Container = connect(mapStateToProps)(NewProject);

module.exports = Container;




