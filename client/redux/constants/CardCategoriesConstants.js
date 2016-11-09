
var FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
var fetchUserSuccess = function(data) {
    return {
        type: FETCH_USER_SUCCESS,
        data: data
    };
};
var FETCH_USER_ERROR= 'FETCH_USER_ERROR';
var fetchUserError = function(error) {
    return {
        type: FETCH_USER_ERROR,
        error: error
    };
};

var POST_CARD_SUCCESS = 'POST_CARD_SUCCESS';
var postCardSuccess = function(data) {
    return {
        type: POST_CARD_SUCCESS,
        data: data
    };
};
var POST_CARD_ERROR= 'POST_CARD_ERROR';
var postCardError = function(error) {
    return {
        type: POST_CARD_ERROR,
        error: error
    };
};

var MOVE_CARD_SUCCESS = 'MOVE_CARD_SUCCESS';
var moveCardSuccess = function(data) {
    return {
        type: MOVE_CARD_SUCCESS,
        data: data
    };
};
var MOVE_CARD_ERROR= 'MOVE_CARD_ERROR';
var moveCardError = function(error) {
    return {
        type: MOVE_CARD_ERROR,
        error: error
    };
};

var UPDATE_CARD_SUCCESS = 'UPDATE_CARD_SUCCESS';
var updateCardSuccess = function(data) {
    return {
        type: UPDATE_CARD_SUCCESS,
        data: data
    };
};
var UPDATE_CARD_ERROR= 'UPDATE_CARD_ERROR';
var updateCardError = function(error) {
    return {
        type: UPDATE_CARD_ERROR,
        error: error
    };
};

var DELETE_CARD_SUCCESS = 'DELETE_CARD_SUCCESS';
var deleteCardSuccess = function(data) {
    return {
        type: DELETE_CARD_SUCCESS,
        data: data
    };
};
var DELETE_CARD_ERROR= 'DELETE_CARD_ERROR';
var deleteCardError = function(error) {
    return {
        type: DELETE_CARD_ERROR,
        error: error
    };
};



exports.FETCH_USER_SUCCESS = FETCH_USER_SUCCESS;
exports.fetchUserSuccess = fetchUserSuccess;
exports.FETCH_USER_ERROR = FETCH_USER_ERROR;
exports.fetchUserError = fetchUserError;

exports.POST_CARD_SUCCESS = POST_CARD_SUCCESS;
exports.postCardSuccess = postCardSuccess;
exports.POST_CARD_ERROR = POST_CARD_ERROR;
exports.postCardError = postCardError;

exports.MOVE_CARD_SUCCESS = MOVE_CARD_SUCCESS;
exports.moveCardSuccess = moveCardSuccess;
exports.MOVE_CARD_ERROR = MOVE_CARD_ERROR;
exports.moveCardError = moveCardError;

exports.UPDATE_CARD_SUCCESS = UPDATE_CARD_SUCCESS;
exports.updateCardSuccess = updateCardSuccess;
exports.UPDATE_CARD_ERROR = POST_CARD_ERROR;
exports.updateCardError = updateCardError;

exports.DELETE_CARD_SUCCESS = DELETE_CARD_SUCCESS;
exports.deleteCardSuccess = deleteCardSuccess;
exports.DELETE_CARD_ERROR = DELETE_CARD_ERROR;
exports.deleteCardError = deleteCardError;
