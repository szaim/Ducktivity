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
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

var OverviewObjectivePanel = React.createClass({
    componentDidMount: function() {
        this.props.dispatch(actions.fetchUsers())
    },
    getInitialState: function() {
        return {accordion: false, activeKey: ['2'], taskInputActive: false}
    },
    openObjectiveModal: function() {
        this.props.dispatch(actions.openObjectiveModal());
    },
    closeAndAddObjective: function(event) {
        event.preventDefault();
        var newObjectiveTitle = this.refs["objectiveTitle" + this.props.projectId].value;
        if (!newObjectiveTitle) {
            this.props.dispatch(actions.closeObjectiveModal());
        } else {
            this.props.dispatch(actions.postObjective(newObjectiveTitle, this.props.projectId));
            this.props.dispatch(actions.closeObjectiveModal());
        }
    },
    openModal: function(objective, event) {
        event.stopPropagation();
        //console.log(objective._id, ' in openModal')
        this.props.dispatch(actions.openModal(objective._id));
    },
    afterOpenModal: function() {
        this.refs.subtitle.style.color = '#f00';
    },
    closeModal: function(objective, event) {
        event.preventDefault();
        console.log(this.props.objectiveId, "this.props.objectiveId")
        console.log('close modal obj', objective)
        console.log('close modal event', event)
        console.log('close modal refs', this.refs)
        if (this.refs["cardTitle" + this.props.objectiveId] && this.refs["assignTo" + this.props.objectiveId].value) {
            var newCardTitle = this.refs["cardTitle" + this.props.objectiveId].value;
            var cardAssignedTo = this.refs["assignTo" + this.props.objectiveId].value;
        }
        if (newCardTitle && cardAssignedTo) {
            var TaskConstruct = {
                owner: this.props.userId,
                title: newCardTitle,
                assignedTo: cardAssignedTo,
                status: 'active',
                objective: this.props.objectiveId
            };
        }
        if (!newCardTitle) {
            this.props.dispatch(actions.closeModal());
        } else {
            this.props.dispatch(CardActions.postCard(TaskConstruct));
            // this.props.dispatch(CardActions.moveCard(TaskConstruct, TaskConstruct.category));
            this.props.dispatch(actions.closeModal());
        }
    },
    onChange: function(activeKey) {
        this.setState({activeKey});
    },
    toggle: function() {
        this.setState({
            accordion: !this.state.accordion
        });
    },

    activateTaskInput: function(objective, event) {
        console.log('TASK INPUT ACTIVATE!');
        event.stopPropagation();
        this.setState({
            taskInputActive: !this.state.taskInputActive
        })
    },
    deleteObjective: function(objective, event){
        event.preventDefault();
        event.stopPropagation();
        console.log("delete Method!", objective._id);
        this.props.dispatch(actions.deleteObjective(objective._id));
    },
    render: function() {
        var that = this;
        var activateTaskInput = function(event) {
            that.activateTaskInput(this, event)
        };
        var closeAndAddCard = function(event) {
            that.closeModal(this, event);
        }
        var openTheModal = function(event) {
            that.openModal(this, event);
        }
        var deleteTheObjective = function(event) {
            that.deleteObjective(this, event);
        }
        if (this.props.users) {
            var usersOptions = this.props.users.map(function(user, index) {
                return (
                    <option key={index} value={user._id}>{user.fullName}</option>
                )
            });
        }
        // console.log(this.props.objectives.length);
        var ModalContent = this.props.objectives.map(function(objective, index) {
            return (
                <div key={index} className="model-content">
                    <h2 ref="subtitle">Add Card</h2>
                    <form>
                        <label htmlFor="cardTitle">Card title:</label><input name="cardTitle" ref={"cardTitle" + objective._id}/>
                        <label htmlFor="assign-to">Assign to:</label>
                        <select ref={"assignTo" + objective._id}>
                            {usersOptions}
                        </select>
                    </form>
                    <button onClick={closeAndAddCard.bind(objective)}>add new Card</button>
                </div>
            )
        })
        var objectivePanel = this.props.objectives.map(function(objective, index) {
            console.log('objective cards', objective.cards);
            return (
                <Panel header={<span className='objective-header'> {objective.title}
                    <div className="add-card ion-android-add-circle" onClick = {openTheModal.bind(objective)}><span className="add-card-message"><p>add a card</p></span></div>
                    <div className="delete-objective ion-android-cancel" onClick = {deleteTheObjective.bind(objective)}><span className="delete-objective-message"><p>delete Objective</p></span></div>

                </span>} key={index}>
                    {/*End Header Start Panel Content */}
                    <OverviewCardPanel cards={objective.cards}/>
                </Panel>
            )
        });
        var accordion = this.state.accordion;
        var activeKey = this.state.activeKey;
        return (
            <div>
                <div className='overview-project-title'>{this.props.projectTitle}</div>
                <div className="add-objective ion-android-add-circle" onClick={this.openObjectiveModal}><span className="add-objective-message"><p>add Objective</p></span></div>
                <div className='objective-wrapper' style={{
                    margin: 10,
                    width: 350
                }}>
                    <Collapse accordion={accordion} onChange={this.onChange} activeKey={activeKey}>
                        {objectivePanel}
                    </Collapse>
                    {this.props.isOpen
                        ? <div>
                            <Modal isOpen={that.props.isOpen} onAfterOpen={that.afterOpenModal} onRequestClose={closeAndAddCard} style={customStyles}>
                                <h2 ref="subtitle">Add Card</h2>
                                <form onSubmit={closeAndAddCard.bind(this.props.objectiveId)} >
                                    <label htmlFor="cardTitle">Card title:</label><input name="cardTitle" ref={"cardTitle" + this.props.objectiveId}/>
                                    <label htmlFor="assign-to">Assign to:</label>
                                    <select ref={"assignTo" + this.props.objectiveId}>
                                        {usersOptions}
                                    </select>
                                </form>
                                <button onClick={closeAndAddCard.bind(this.props.objectiveId)}>add new Card</button>
                            </Modal>
                        </div>
                    : null}
                    {this.props.isObjectiveOpen
                        ? <div>
                            <Modal isOpen={that.props.isObjectiveOpen} onAfterOpen={that.afterOpenModal} onRequestClose={that.closeAndAddObjective} style={customStyles}>
                                <h2 ref="subtitle">Add a New Objective</h2>
                                <form onSubmit={this.closeAndAddObjective}>
                                    <label htmlFor="objectiveTitle">Objective title:</label><input name="objectiveTitle" ref={"objectiveTitle" + this.props.projectId}/>
                                </form>
                                <button onClick={this.closeAndAddObjective}>add new Objective</button>
                            </Modal>
                        </div>
                    : null}
                </div>
            </div>
        );
    }
});

var mapStateToProps = function(state, props) {
    console.log("state in overview", state);
    return {
        projectId: state.overview.projectId,
        projectTitle: state.overview.projectTitle,
        objectives: state.overview.objectives,
        userId: state.cardList.userId,
        users: state.overview.users,
        categoryId: state.cardList.categories,
        isOpen: state.overview.isOpen,
        objectiveId: state.overview.objectiveId,
        updateCardId: state.cardList.updateCardId,
        isObjectiveOpen: state.overview.isObjectiveOpen
    }
};
var Container = connect(mapStateToProps)(OverviewObjectivePanel);

module.exports = Container;
