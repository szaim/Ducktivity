var React = require('react');
var actions = require('../../redux/actions/CardCategoriesActions');
var actionsOverview = require('../../redux/actions/overviewActions');
var connect = require('react-redux').connect;
import { Draggable, Droppable } from 'react-drag-and-drop';
var CardList = require('./CardList');
var ProgressBar = require('./ProgressBar');

 var percent;

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
     
          // this.props.categories[0].cards.filter((card)=> {
          //   console.log("this.props.activeObjectiveIds", this.props.activeObjectiveIds)
          //   this.props.activeObjectiveIds.indexOf(card.objective) != -1
          //   console.log('card', card)
          //   return (
          //     blocked = card.length;
          //     )
          
  
          // })
    // var newArr = [];
    // var counter = 0;
    // var completed = 0;
    // for (var i = 0 ; i < this.props.categories.length; i++) {
    //   var resultArr = this.props.categories[i].cards.filter((card)=>{
    //       return this.props.activeObjectiveIds.indexOf(card.objective) != -1;
        
    //     })
    //   console.log("resultArr.length", resultArr.length)
    //   counter += resultArr.length
    // }

    
    //    var completedArr = this.props.categories[3].cards.filter((card)=>{
    //       return this.props.activeObjectiveIds.indexOf(card.objective) != -1;
        
    //     })
    //   console.log("completedArr.length", completedArr.length)
     
    //   completed += completedArr.length

    //     if ((completed + 1) == counter ) {
    //     completed ++
    //    }
      
    // console.log("counter", counter)
    //  console.log("completed", completed)



    //   percent = Math.ceil(parseInt((completed / counter) * 100));

    // // if(completed === (counter - completed)) {
    // //     percent = 50;
    // //   }
    // // if (counter == completed) {
    // //   percent = 100;
    // // }

    // // if (counter === 0) {
    // //     percent = 100;
    // //   }
     
     
     
    },

    percent: function() {
 var newArr = [];
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
      console.log("completedArr.length", completedArr.length)
     
      completed += completedArr.length
      
    console.log("counter", counter)
     console.log("completed", completed)



      percent = Math.ceil(parseInt((completed / counter) * 100));
    },

 render: function(){
  console.log('percent', percent);
  if(this.props.categories){
    var displayCategories = this.props.categories.map((data, index)=> {
     return (
        <div className="task-list-container" key={index}>
        <Droppable types={['cards']} onDrop={this.onDrop.bind(this, data)} onClick={this.percent(this,data)}>
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
        <ProgressBar percent={percent} strokeColor='#FE8C6A'/>
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
    activeObjectiveIds: state.overview.objectives.map(function(objective) {
      return objective._id;
    })
	}
};

var Container = connect(mapStateToProps)(CategoryDisplay);

module.exports = Container;




