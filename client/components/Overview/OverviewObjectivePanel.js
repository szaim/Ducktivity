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
        this.props.dispatch(actions.fetchProject('581b92369273743a75b84f90'))
        this.props.dispatch(actions.fetchUsers())
    },
    getInitialState: function() {
        return {accordion: false, activeKey: ['2'], taskInputActive: false}
    },
    openObjectiveModal: function() {
        this.props.dispatch(actions.openObjectiveModal());
    },
    closeAndAddObjective: function() {
        var newObjectiveTitle = this.refs["objectiveTitle" + this.props.projectTitle].value;
        if (!newObjectiveTitle) {
            this.props.dispatch(actions.closeObjectiveModal());
        } else {
            this.props.dispatch(actions.postObjective(newObjectiveTitle, this.props.projectTitle));
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
        console.log(this.props.objectiveId, "this.props.objectiveId")
        if (this.refs["cardTitle" + this.props.objectiveId] && this.refs["assignTo" + this.props.objectiveId].value) {
            var newCardTitle = this.refs["cardTitle" + this.props.objectiveId].value;
            var cardAssignedTo = this.refs["assignTo" + this.props.objectiveId].value;
        }
        if (newCardTitle && cardAssignedTo) {
            var TaskConstruct = {
                owner: this.props.userId,
                title: newCardTitle,
                _id: this.props.updateCardId,
                category: "TO DO",
                assignedTo: cardAssignedTo,
                status: 'active',
                objective: this.props.objectiveId
            };
        }
        if (!newCardTitle) {
            this.props.dispatch(actions.closeModal());
        } else {
            this.props.dispatch(CardActions.postCard(TaskConstruct, this.props.categoryId[1]._id));
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
    handleAddCard: function(objective, event) {
        event.stopPropagation();
        event.preventDefault();
        console.log(objective);
        var val = this.refs['overviewCardAdd' + objective._id].value
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
        var that = this;
        var handleAddCard = function(event) {
            that.handleAddCard(this, event)
        };
        var activateTaskInput = function(event) {
            that.activateTaskInput(this, event)
        };
        var closeAndAddCard = function(event) {
            that.closeModal(this, event);
        }
        var openTheModal = function(event) {
            that.openModal(this, event);
        }
        if (this.props.users) {
            var usersOptions = this.props.users.map(function(user, index) {
                return (
                    <option key={index} value={user.fullName}>{user.fullName}</option>
                )
            });
        }
        if (this.props.objectives) {
            var ModalContent = this.props.objectives.map(function(objective, index) {
                return (
                    <div key={index} className="model-content">
                        <h2 ref="subtitle">Add a new Card</h2>
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
        }
        if (this.props.objectives) {
            var objectivePanel = this.props.objectives.map(function(objective, index) {
                return (
                    <Panel header={<span> {objective.title}
                        <button className = 'add-card' onClick = {openTheModal.bind(objective)}>Add Card</button></span>} key={index}>
                        {/*End Header Start Panel Content */}
                        <p>Description Objective here</p>
                        <OverviewCardPanel cards={objective.cards}/>
                    </Panel>
                )
            });
        }
        var accordion = this.state.accordion;
        var activeKey = this.state.activeKey;
        return (
            <div style={{
                margin: 10,
                width: 350
            }}>
                {this.props.projectTitle}
                <button onClick={this.openObjectiveModal}>Add Objective</button>
                <Collapse accordion={accordion} onChange={this.onChange} activeKey={activeKey}>
                    {objectivePanel}
                </Collapse>
                {this.props.isOpen
                    ? <div>
                        <Modal isOpen={that.props.isOpen} onAfterOpen={that.afterOpenModal} onRequestClose={that.closeModal} style={customStyles}>
                            <h2 ref="subtitle">Add a new Card</h2>
                            <form>
                                <label htmlFor="cardTitle">Card title:</label><input name="cardTitle" ref={"objectiveTitle" + this.props.projectTitle}/>
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
                            <form>
                                <label htmlFor="objectiveTitle">Objective title:</label><input name="objectiveTitle" ref={"objectiveTitle" + this.props.projectTitle}/>
                            </form>
                            <button onClick={this.closeAndAddObjective}>add new Objective</button>
                        </Modal>
                    </div>
                : null}
            </div>
        );
    }
});

var mapStateToProps = function(state, props) {
    console.log("state in overview", state);
    return {
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