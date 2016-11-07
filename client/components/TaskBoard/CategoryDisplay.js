var React = require('react');
var actions = require('../../redux/actions/CardCategoriesActions');
var actionsOverview = require('../../redux/actions/overviewActions');
var connect = require('react-redux').connect;
var CardList = require('./CardList');

var CategoryDisplay = React.createClass({
  componentDidMount: function() {
    this.props.dispatch(actions.fetchUser());
  },
  handleAddCard: function(data, event) {
    event.preventDefault();
    var cardId = data._id;
    var val = this.refs['card-add-' +cardId].value
    var TaskConstruct = {
      owner: data.owner,
      title: val,
      category: data.title,
      subtask: data.subtask,
      status: 'active' ,
      objective: '581b99035626253e933a2f85'
    }
    this.props.dispatch(actions.postCard(TaskConstruct, cardId));
    this.refs['card-add-' + cardId].value = "";
  },
 render: function(){
  var that = this;
  // var handleAddCard = function(event){
  //   that.handleAddCard(this, event)
  // };
  var displayCategories = this.props.categories.map(function(data, index) {
     return (
        <div className="task-list-container" key={index}>
        <div className="category-option-container">
        <h4>{data.title}</h4>
        </div>
            <CardList cardsData={data.cards} categoryId={data._id}/>
            <div className="input-task">
            </div>
        </div>
       )
   });
  // }

   return (
     <div className='category-container'>
     <div className='task-categories'>
     {displayCategories}
     </div>
     </div>
   )
 }
});



var mapStateToProps = function(state, props) {
	return {
    categories: state.cardList.categories || [],
    userId: state.cardList.userId
	}
};

var Container = connect(mapStateToProps)(CategoryDisplay);

module.exports = Container;
