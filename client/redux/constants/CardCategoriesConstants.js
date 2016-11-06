
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

var FETCH_PROJECT_SUCCESS = 'FETCH_PROJECT_SUCCESS';
var fetchProjectSuccess = function(data) {
    return {
        type: FETCH_PROJECT_SUCCESS,
        data: data
    };
};
var FETCH_PROJECT_ERROR= 'FETCH_PROJECT_ERROR';
var fetchProjectError = function(error) {
    return {
        type: FETCH_PROJECT_ERROR,
        error: error
    };
};

var CREATE_PROJECT_SUCCESS = 'CREATE_PROJECT_SUCCESS';
var createProjectSuccess = function(data) {
    return {
        type: CREATE_PROJECT_SUCCESS,
        data: data
    };
};
var CREATE_PROJECT_ERROR= 'CREATE_PROJECT_ERROR';
var createProjectError = function(error) {
    return {
        type: CREATE_PROJECT_ERROR,
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

exports.FETCH_PROJECT_SUCCESS = FETCH_PROJECT_SUCCESS;
exports.fetchProjectSuccess = fetchProjectSuccess;
exports.FETCH_PROJECT_ERROR = FETCH_PROJECT_ERROR;
exports.fetchProjectError = fetchUserError;

exports.CREATE_PROJECT_SUCCESS = CREATE_PROJECT_SUCCESS;
exports.createProjectSuccess = createProjectSuccess;
exports.CREATE_PROJECT_ERROR = CREATE_PROJECT_ERROR;
exports.createProjectError = createUserError;

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
