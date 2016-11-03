require('string.prototype.repeat');
var Collapse = require('rc-collapse');
var Panel = require('rc-collapse').Panel;
var React = require('react');
var ReactDOM = require('react-dom');
var OverviewCardPanel = require('./OverviewCardPanel')

var text = [
  {	owner: 'test1' ,
	title: 'test1',
	cards: [{title:'test3'}],
	assignedTo: 'test1',
	status: 'test1'
},
{	owner: 'test2' ,
title: 'test2',
cards: [{title:'test3'}],
assignedTo: 'test2',
status: 'test2'
},
{	owner: 'test3' ,
title: 'test3',
cards: [{title:'test3'}],
assignedTo: 'test3',
status: 'test3'
}
]
var OverviewObjectivePanel = React.createClass({
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

  var objectivePanel = text.map(function(text, index) {
     return (
         <Panel header={text.title} key={index} >
           <p>{text.owner}</p>
           <OverviewCardPanel cards={text.cards}/>
         </Panel>
       )
   });

  var accordion = this.state.accordion;
  //var btn = accordion ? 'accordion' : 'collapse';
  var activeKey = this.state.activeKey;

  return (<div style={{ margin: 10, width: 500 }}>

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

module.exports = OverviewObjectivePanel;
