var React = require('react');
var actions = require('../../redux/actions/TaskCategory');
var connect = require('react-redux').connect;
var CardList = require('./CardList');

var CategoryDisplay = React.createClass({
  componentWillMount: function() {
        console.log(this.props);
    this.props.dispatch(actions.fetchUser());

  },
 render: function(){
  console.log("component data", this.props.categories);

  var displayCategories = this.props.categories.map(function(data, index) {
     return (
        <div className="task-list-container" key={index}>
        <h1>{data.title}</h1>
            <CardList cardsData={data.cards}/>
        </div>
       )
   });

   return (
     <div className='task-categories'>
     {displayCategories}
     </div>
   )
 }
});



var mapStateToProps = function(state, props) {
	return {
    categories: state.cardList.task,
    userId: state.cardList.userId
	}
};

var Container = connect(mapStateToProps)(CategoryDisplay);

module.exports = Container;
