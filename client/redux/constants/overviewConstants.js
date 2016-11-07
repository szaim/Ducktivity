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

var FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
var fetchUsersSuccess = function(data) {
    return {
        type: FETCH_USERS_SUCCESS,
        data: data
    };
};
var FETCH_USERS_ERROR= 'FETCH_USERS_ERROR';
var fetchUsersError = function(error) {
    return {
        type: FETCH_USERS_ERROR,
        error: error
    };
};

var POST_OBJECTIVE_SUCCESS = 'POST_OBJECTIVE_SUCCESS';
var postObjectiveSuccess = function(data) {
    console.log(data, "post objective in sync action ")
    return {
        type: POST_OBJECTIVE_SUCCESS,
        data: data
    };
};
var POST_OBJECTIVE_ERROR= 'POST_OBJECTIVE_ERROR';
var postObjectiveError = function(error) {
    return {
        type: POST_OBJECTIVE_ERROR,
        error: error
    };
};


exports.FETCH_PROJECT_SUCCESS = FETCH_PROJECT_SUCCESS;
exports.fetchProjectSuccess = fetchProjectSuccess;
exports.FETCH_PROJECT_ERROR = FETCH_PROJECT_ERROR;
exports.fetchProjectError = fetchProjectError;

exports.FETCH_USERS_SUCCESS = FETCH_USERS_SUCCESS;
exports.fetchUsersSuccess = fetchUsersSuccess;
exports.FETCH_USERS_ERROR = FETCH_USERS_ERROR;
exports.fetchUsersError = fetchUsersError;

exports.POST_OBJECTIVE_SUCCESS = POST_OBJECTIVE_SUCCESS;
exports.postObjectiveSuccess = postObjectiveSuccess;
exports.POST_OBJECTIVE_ERROR = POST_OBJECTIVE_ERROR;
exports.postObjectiveError = postObjectiveError;
