require('string.prototype.repeat');
var Collapse = require('rc-collapse');
var Panel = require('rc-collapse').Panel;
var React = require('react');
var ReactDOM = require('react-dom');
var actions = require('../../redux/actions/overviewActions');
var connect = require('react-redux').connect;
var OverviewCardPanel = require('./OverviewCardPanel');

var OverviewObjectivePanel = React.createClass({
  componentDidMount: function() {
    this.props.dispatch(actions.fetchProject('581b92369273743a75b84f90'))
  },
  getInitialState: function () {

    return {
      accordion: false,
      activeKey: ['2']
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
render: function() {
  // console.log('this.props.objectives',this.props.objectives);
  var objectivePanel = this.props.objectives.map(function(objective, index) {
     return (
         <Panel header={objective.title} key={index} >
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

