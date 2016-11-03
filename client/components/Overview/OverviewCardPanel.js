require('string.prototype.repeat');
var Collapse = require('rc-collapse');
var Panel = require('rc-collapse').Panel;
var React = require('react');
var ReactDOM = require('react-dom');

var OverviewCardPanel = React.createClass({
  getInitialState: function () {
    return {
      accordion: false,
      activeKey: []
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
  var cards=this.props.cards;
  console.log(cards);
  var cardPanels = cards.map(function(card, index) {
     return (
         <Panel header={card.title} key={index} >
           <p>"Assigned to Card here"</p>
         </Panel>
       )
   });

  var accordion = this.state.accordion;
  //var btn = accordion ? 'accordion' : 'collapse';
  var activeKey = this.state.activeKey;

  return (
    <div style={{ margin: 10, width: 250 }}>

      <Collapse
        accordion={accordion}
        onChange={this.onChange}
        activeKey={activeKey}
      >
        {cardPanels}
      </Collapse>
    </div>
)
}
});

module.exports = OverviewCardPanel;
