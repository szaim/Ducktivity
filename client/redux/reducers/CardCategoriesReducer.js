var Constants = require('../constants/CardCategoriesConstants');
var OverviewConstants = require('../constants/overviewConstants');
var ProjectConstants = require('../constants/projectConstants');
var update = require('react-addons-update');

var initialState = {
    categories: [],
    userId: "",
    updateCardId: '',
    avatar: '',
    userFullName: ''

};

var CardCategoriesReducer = function(state, action) {
    state = state || initialState;

    if (action.type === ProjectConstants.FETCH_PROJECT_CATEGORIES_SUCCESS) {
        console.log('Card Categories fetch project action data', action.data);
        var state = Object.assign({}, state, {
           categories: action.data.categories
        });
        return state;
    } else if (action.type === ProjectConstants.FETCH_PROJECT_CATEGORIES_ERROR) {
      console.error(action.type, action.error);

        return action.error;
    } 

    else if (action.type === Constants.FETCH_USER_SUCCESS) {
        console.log("add USER success in reducer", action.data.fullName)
        state = Object.assign({}, state, {
            categories: action.data.categories,
            userId: action.data._id,
            avatar: action.data.avatar,
            userFullName: action.data.fullName
        });
        // console.log('fetch user success', state);
        return state;
    } else if (action.type === Constants.FETCH_USER_ERROR) {
      console.error(action.type, action.error);

        return state
    } 
    else if (action.type === Constants.POST_CARD_SUCCESS) {
        if(action.data.assignedTo == state.userId) {
            var categories = state.categories.map(function(category) {
                if (category._id !== action.data.category) {
                    return category;
                } else {
                    return Object.assign({}, category, {
                        cards: category.cards.concat(action.data)
                    })
                }
            })
            state = Object.assign({}, state, {
                categories: categories
            });

        }
        return state;
    }
    else if (action.type === Constants.DELETE_CARD_SUCCESS) {
         var categories = state.categories.map(function(category, index) {
            if (action.data.category == category._id) {
                for (var i = 0; i < category.cards.length; i++) {
                    if (category.cards[i]._id == action.data._id) {
                        category.cards.splice(i, 1);
                    }
                }
            }
            return category;
        });
        state = Object.assign({}, state, {
            categories: categories
        });

        return state;

    } else if (action.type === Constants.DELETE_CARD_ERROR) {
      console.error(action.type, action.error);

        return state
    
    } 
    else if (action.type === Constants.UPDATE_CARD_SUCCESS) {
         var categories = state.categories.map(function(category, index) {
            console.log('action data update', action.data);
            console.log('status', action.data.status);
           
            
            if ('deleted' == action.data.status) {
                for (var i = 0; i < category.cards.length; i++) {
                    if (category.cards[i]._id == action.data._id) {
                        category.cards.splice(i, 1);


                    }

                }
            }
            console.log("card updated", category.cards);
            return category;

        });
        state = Object.assign({}, state, {
            categories: categories,
            updateCardId: action.data._id
        });        

        return state;

    } 
    else if (action.type === Constants.UPDATE_CARD_ERROR) {
      console.error(action.type, action.error);
        
        return state;
    } 
    return state;

};

module.exports = CardCategoriesReducer;