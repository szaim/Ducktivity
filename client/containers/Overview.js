var React = require('react');
var connect = require('react-redux').connect;
var OverviewObjectivePanel = require('../components/Overview/OverviewObjectivePanel');

var Overview = React.createClass({

 render: function(){
   return (
     <div className='overview'>
     <OverviewObjectivePanel />
     </div>
   )
 }
});



// var mapStateToProps = function(state, props) {
// 	return {
// 	}
// };
//
// var Container = connect(mapStateToProps)(Overview);
//
module.exports = Overview;
