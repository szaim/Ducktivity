
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



exports.FETCH_USER_SUCCESS = FETCH_USER_SUCCESS;
exports.fetchUserSuccess = fetchUserSuccess;
exports.FETCH_USER_ERROR = FETCH_USER_ERROR;
exports.fetchUserError = fetchUserError;

exports.POST_CARD_SUCCESS = POST_CARD_SUCCESS;
exports.postCardSuccess = postCardSuccess;
exports.POST_CARD_ERROR = POST_CARD_ERROR;
exports.postCardError = postCardError;

exports.UPDATE_CARD_SUCCESS = UPDATE_CARD_SUCCESS;
exports.updateCardSuccess = updateCardSuccess;
exports.UPDATE_CARD_ERROR = POST_CARD_ERROR;
exports.updateCardError = updateCardError;

