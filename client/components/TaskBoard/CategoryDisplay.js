var React = require('react');
var actions = require('../../redux/actions/CardCategoriesActions');
var connect = require('react-redux').connect;
var CardList = require('./CardList');

var CategoryDisplay = React.createClass({
  componentDidMount: function() {
    this.props.dispatch(actions.fetchUser());
  },
  handleAddCategory: function(event) {
    // console.log(this.props.userId);
    // console.log(this.refs.addCategory.value);
    event.preventDefault();
    var CategoryConstruct = {
      owner: '',
      title: this.refs.addCategory.value,
      assignedTo: '',
      status: 'active'
    }
    this.props.dispatch(actions.postCategory(CategoryConstruct, this.props.userId));
    this.refs.addCategory.value = "";
  },

  handleCategoryDelete: function(data, event){
    event.preventDefault();
    console.log('delete category hit');
    //add condition if user has project owner status run delete action / else return 'do not have access to remove'
    console.log('delete category data', data);
    var cardId = data._id;
    var TaskConstruct = {
      owner: data.owner,
      title: data.title,
      status: 'deleted'
    }
    // console.log('delete TaskConstruct', TaskConstruct);

  this.props.dispatch(actions.deleteCategory(cardId));
  // this.props.dispatch(actions.fetchUser());
  
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
      status: 'active'
    }
    this.props.dispatch(actions.postCard(TaskConstruct, cardId));
    // this.props.dispatch(actions.fetchUser());
    this.refs['card-add-' + cardId].value = "";
  },
 render: function(){
  var that = this;
  var handleAddCard = function(event){
    that.handleAddCard(this, event)
  };
  var handleAddCategory = function(event){
    that.handleAddCategory(this, event)
  };
  var handleCategoryDelete = function(event){
    that.handleCategoryDelete(this, event)
  };
  //if(this.props.categories){
    var displayCategories = this.props.categories.map(function(data, index) {
     return (
        <div className="task-list-container" key={index}>
        <div className="category-option-container">
        <h1>{data.title}</h1>
        <button type='submit' onClick={handleCategoryDelete.bind(data)}>Delete</button>
        </div>
            <CardList cardsData={data.cards} categoryId={data._id}/>
            <div className="input-task">

            <input  key={index} ref={'card-add-'+ data._id}  type='text' />
            <button type='submit' onClick={handleAddCard.bind(data)}>Add Task</button>
            </div>
        </div>
       )
   });
  // }

   return (
     <div className='category-container'>
     <div className='add-category-input'>
       <input ref={'addCategory'} type='text'></input>
       <button type='submit' onClick={this.handleAddCategory}>Add Category</button>
     </div>
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
    // categoryId: state
    userId: state.cardList.userId
	}
};

var Container = connect(mapStateToProps)(CategoryDisplay);

module.exports = Container;
