require('string.prototype.repeat');
var Collapse = require('rc-collapse');
var Panel = require('rc-collapse').Panel;
var React = require('react');
var ReactDOM = require('react-dom');
var actions = require('../../redux/actions/overviewActions');
var CardActions = require('../../redux/actions/CardCategoriesActions');
var connect = require('react-redux').connect;
var OverviewCardPanel = require('./OverviewCardPanel');
var Modal = require('react-modal');


var customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};


var OverviewObjectivePanel = React.createClass({
  componentDidMount: function() {
    this.props.dispatch(actions.fetchProject('581b92369273743a75b84f90'))
    this.props.dispatch(actions.fetchUsers())

  },
  getInitialState: function () {
    return {
      accordion: false,
      activeKey: ['2'],
      taskInputActive: false,
      modalIsOpen: false
    }
  },
  openModal: function() {
    this.setState({modalIsOpen: true});
  },
 
  afterOpenModal: function() {
    // references are now sync'd and can be accessed. 
    this.refs.subtitle.style.color = '#f00';
  },
 
  addCardAndCloseModal: function(objective, event) {
    event.stopPropagation();
        var newCardTitle = this.refs["cardTitle" + objective._id].value;
        var cardAssignedTo = this.refs["assignTo" + objective._id].value;

        var TaskConstruct = {
            owner: this.props.userId,
            title: newCardTitle,
            category: "TO DO",
            assignedTo: cardAssignedTo,
            status: 'active',
            objective: objective._id
        };
        console.log("CardActions", CardActions, "actions:", actions);

        this.props.dispatch(CardActions.postCard(TaskConstruct, this.props.categoryId[1]._id));
        this.setState({
            modalIsOpen: false
        })
  },
  closeModal: function(){
    console.log(this.state.modalIsOpen);
    this.setState({
            modalIsOpen: false
        })
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
      category: 'TO DO',
      subtask: objective.subtask,
      status: 'active',
      AssignTo: '#USER ID',
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
  var closeAndAddCard = function(event){
    that.addCardAndCloseModal(this, event);
  }
    var closeTheModal = function(event){
    that.closeModal(this, event);
  }
  var usersOptions = this.props.users.map(function(user, index){
    return (
      <option key={index} value={user.fullName}>{user.fullName}</option>
    )
  });
  var objectivePanel = this.props.objectives.map(function(objective, index) {
      return (
         <Panel header={<span>{objective.title}
           <button className='add-card' onClick={that.openModal}>Add Card</button>          
           <button className='assign-to' onClick={activateTaskInput}>AssignTo</button>
           <button className='show-cards' onClick={activateTaskInput}>Go to..</button>
          </span>} key={index} >
          <Modal
          isOpen={that.state.modalIsOpen}
          onAfterOpen={that.afterOpenModal}
          onRequestClose={that.closeModal}
          style={customStyles} >
 
          <h2 ref="subtitle">Add a new Card</h2>
          <form>
            <label htmlFor="cardTitle">Card title:</label><input name="cardTitle" ref={"cardTitle"+objective._id}/>
            <label htmlFor="assign-to">Assign to:</label>
          <select  ref={"assignTo"+objective._id}>
            {usersOptions}
          </select>
          </form>
          <button onClick={closeAndAddCard.bind(objective)}>add new Card</button>
          <button onClick={closeTheModal}>Cancel</button>

        </Modal>

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
  console.log("state in overview",state);
  return {
    projectTitle: state.overview.projectTitle,
    objectives: state.overview.objectives,
    userId: state.cardList.userId,
    users: state.overview.users,
    categoryId: state.cardList.categories
  }
};
var Container = connect(mapStateToProps)(OverviewObjectivePanel);

module.exports = Container;
