var React = require('react');
var actions = require('../../redux/actions/CardCategoriesActions');
var actionsOverview = require('../../redux/actions/overviewActions');
var connect = require('react-redux').connect;
import { Draggable, Droppable } from 'react-drag-and-drop';
var CardList = require('./CardList');
var ProgressBar = require('./ProgressBar');



var percent;
var strokeColor;
var CategoryDisplay = React.createClass({
  
  componentDidMount: function() {
    this.props.dispatch(actions.fetchUser());
  },
  onDrop: function(category, card) {

    console.log("drop", card);
      card = JSON.parse(card.cards);
     console.log("drop after", card); 
  if(category._id == card.category) {
  return;
  }
      
    var TaskConstruct = Object.assign({}, card, 
      {status: 'active', category: category._id}
    );

      console.log('delete cardId', TaskConstruct._id);
       console.log('delete original categoryId', card.category);
     
      this.props.dispatch(actions.postCard(TaskConstruct));
      this.props.dispatch(actions.deleteCard(TaskConstruct._id, card.category));
       
    },

    percent: function() {
    var counter = 0;
    var completed = 0;

    for (var i = 0 ; i < this.props.categories.length; i++) {
      var resultArr = this.props.categories[i].cards.filter((card)=>{
          return this.props.activeObjectiveIds.indexOf(card.objective) != -1;
        
        })
      console.log("resultArr.length", resultArr.length)
      counter += resultArr.length
    }

    
       var completedArr = this.props.categories[3].cards.filter((card)=>{
          return this.props.activeObjectiveIds.indexOf(card.objective) != -1;
        
        })
      // console.log("completedArr.length", completedArr.length)
     
      completed += completedArr.length
      
      // console.log("counter", counter)
      // console.log("completed", completed)

        percent = Math.ceil(parseInt((completed / counter) * 100));
        if(counter == 0) {
          percent = 0;
        }
        if(percent <= 100 && percent >= 70) {
            strokeColor = '#85D262';
        } else if(percent < 70 && percent >= 50) {
            strokeColor = '#85D262';
        } else if(percent < 50) {
            strokeColor = '#ff0000';
        }
      

    },

 render: function(){
  // console.log('percent', percent);
  if(this.props.categories){
    var displayCategories = this.props.categories.map((data, index)=> {
     return (      
        <div className="task-list-container" key={index}>
        <Droppable types={['cards']} onDrop={this.onDrop.bind(this, data)} onClick={this.percent(this)}>
        <h1 className="category-option-container">{data.title}</h1>
            <div className="input-task">
            </div>
            <CardList 
            cardsData={data.cards} 
            categoryId={data._id}/>
      </Droppable>   
        </div>

       )
   });
  }
  
  // }

   return (
     <div className='category-container'>
      <div> 
        <ProgressBar percent={percent} strokeColor={strokeColor}/>
      </div>     
    <div className="progressBar-wrapper"> Progress Bar here</div>
     
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
    activeObjectiveIds: state.overview.objectives.map(function(objective) {
      return objective._id;
    })
	}
};

var Container = connect(mapStateToProps)(CategoryDisplay);

module.exports = Container;




