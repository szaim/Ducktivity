require('string.prototype.repeat');
var Collapse = require('rc-collapse');
var Panel = require('rc-collapse').Panel;
var React = require('react');
var ReactDOM = require('react-dom');
var actions = require('../../redux/actions/overviewActions');
var CardActions = require('../../redux/actions/CardCategoriesActions');
var connect = require('react-redux').connect;
var OverviewCardPanel = require('./OverviewCardPanel');

var OverviewObjectivePanel = React.createClass({
  componentDidMount: function() {
    this.props.dispatch(actions.fetchProject('581b92369273743a75b84f90'))
  },
  getInitialState: function () {

    return {
      accordion: false,
      activeKey: ['2'],
      taskInputActive: false
    }
  },
  onChange: function(activeKey) {
    this.setState({
      activeKey,
    });

  },
  toggle: function(){
    this.setState({
      accordion: !this.state.accordion,
    });
  },
  handleAddCard: function(objective, event) {
    event.stopPropagation();
    event.preventDefault();
    console.log(objective);
    var val = this.refs['overviewCardAdd'+objective._id].value
    console.log(val);
    var TaskConstruct = {
      owner: objective.owner,
      title: val,
      category: objective.title,
      subtask: objective.subtask,
      status: 'active',
      objective: '581b99035626253e933a2f85'
    }
    //this.props.dispatch(CardActions.postCard(TaskConstruct));
    this.setState({
      taskInputActive: !this.state.taskInputActive
    })
  },
  activateTaskInput: function(objective, event) {
    console.log('TASK INPUT ACTIVATE!');
    event.stopPropagation();
    this.setState({
      taskInputActive: !this.state.taskInputActive
    })

  },
render: function() {

// objectives.map(objective => {});
// <button onClick={this.onClick.bind(this, objective)} />
// onClick(objective, event) {}

  var that = this;
  var handleAddCard = function(event){
    that.handleAddCard(this, event)
  };
  var activateTaskInput = function(event){
    that.activateTaskInput(this, event)
  };

  var objectivePanel = this.props.objectives.map(function(objective, index) {
      return (
         <Panel header={<span>{objective.title}
           <button className='add-card' onClick={activateTaskInput}>Add Card</button>
           <button className='assign-to' onClick={activateTaskInput}>AssignTo</button>
           <button className='show-cards' onClick={activateTaskInput}>Go to..</button>
          </span>} key={index} >
         <div className='objective-buttons'>
         <button className='addCard' type='submit' onClick={that.activateTaskInput}>Add Task</button>
         </div>
           <p>Description Objective here</p>
           <OverviewCardPanel cards={objective.cards}/>
         </Panel>
       )
   });

  var accordion = this.state.accordion;
  //var btn = accordion ? 'accordion' : 'collapse';
  var activeKey = this.state.activeKey;

  return (<div style={{ margin: 10, width: 500 }}>
    {this.props.projectTitle}
    <Collapse
      accordion={accordion}
      onChange={this.onChange}
      activeKey={activeKey}
    >
      {objectivePanel}
    </Collapse>
  </div>);
},


});

var mapStateToProps = function(state, props) {
  // console.log("state in overview",state);
  return {
    projectTitle: state.overview.projectTitle,
    objectives: state.overview.objectives
  }
};
var Container = connect(mapStateToProps)(OverviewObjectivePanel);

module.exports = Container;
