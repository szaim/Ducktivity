var React = require('react');
var actions = require('../../redux/actions/ProjectActions');
var overviewActions = require('../../redux/actions/overviewActions');
var connect = require('react-redux').connect;


var NewProject = React.createClass({

componentDidMount: function() {
  this.props.dispatch(actions.getProjects());
},

submitProject: function(event) {
  event.preventDefault();
if(!this.refs.projectTitle.value) {
  alert('Please enter a project name.');

} else {
  //create new project action
    console.log('project title ref', this.refs.projectTitle.value);
    this.props.dispatch(actions.createProject(this.refs.projectTitle.value));
    this.refs.projectTitle.value = '';
}

},

onSelect: function() {
   //run action to fetch selected dropdown project
  console.log('this was selected', this.refs.selectedProject.value);

  // this.props.dispatch(actions.fetchProjectCategories(this.refs.selectedProject.value));
  this.props.dispatch(actions.fetchProject(this.refs.selectedProject.value));

},
onDelete: function() {

	if(confirm('Are you sure you want to delete?')) {
		this.props.dispatch(actions.deleteProject(this.refs.selectedProject.value));
		console.log('deleted projectlist', this.props.projectList);
		var nextProject = this.props.projectList.find((project)=>{
			return project._id !== this.refs.selectedProject.value;
		})||{};
		this.props.dispatch(actions.fetchProject(nextProject._id));
	}

},
 render: function(){
    if(this.props.projectList){
      var projects = this.props.projectList.map(function(project, index){
      return (
        //try and sort by project projects
        <option key={index} value={project._id}>{project.title}</option>
      )
    });

    }

   return (
    <div className="Form wrapper">
        <form>
            
            <input placeholder='Project Title...' ref="projectTitle" />
            <span>
                <div className="add-project ion-compose" onClick={this.submitProject}><span className="add-project-message">Add a Project</span></div>
            </span>
            <h5>Select Project:</h5>
            <select ref="selectedProject" value={this.props.activeProjectId} onChange={this.onSelect}>
                {projects}
            </select>
            <span>
                <button type='submit' onClick={this.onDelete}>Delete</button>
            </span>

        </form>

    </div>

   )
 }

 });







var mapStateToProps = function(state, props) {
	return {
    projectList: state.projectList.projects || [],
    activeProjectId: state.overview.projectId
	}
};

var Container = connect(mapStateToProps)(NewProject);

module.exports = Container;
