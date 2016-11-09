


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

var GET_PROJECTS_SUCCESS = 'GET_PROJECTS_SUCCESS';
var getProjectsSuccess = function(data) {
    return {
        type: GET_PROJECTS_SUCCESS,
        data: data
    };
};
var GET_PROJECTS_ERROR= 'GET_PROJECTS_ERROR';
var getProjectsError = function(error) {
    return {
        type: GET_PROJECTS_ERROR,
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

var DELETE_PROJECT_SUCCESS = 'DELETE_PROJECT_SUCCESS';
var deleteProjectSuccess = function(data) {
    return {
        type: DELETE_PROJECT_SUCCESS,
        data: data
    };
};
var DELETE_PROJECT_ERROR= 'DELETE_PROJECT_ERROR';
var deleteProjectError = function(error) {
    return {
        type: DELETE_PROJECT_ERROR,
        error: error
    };
};

exports.FETCH_PROJECT_SUCCESS = FETCH_PROJECT_SUCCESS;
exports.fetchProjectSuccess = fetchProjectSuccess;
exports.FETCH_PROJECT_ERROR = FETCH_PROJECT_ERROR;
exports.fetchProjectError = fetchProjectError;

exports.GET_PROJECTS_SUCCESS = GET_PROJECTS_SUCCESS;
exports.getProjectsSuccess = getProjectsSuccess;
exports.GET_PROJECTS_ERROR = GET_PROJECTS_ERROR;
exports.getProjectsError = getProjectsError;

exports.CREATE_PROJECT_SUCCESS = CREATE_PROJECT_SUCCESS;
exports.createProjectSuccess = createProjectSuccess;
exports.CREATE_PROJECT_ERROR = CREATE_PROJECT_ERROR;
exports.createProjectError = createProjectError;

exports.DELETE_PROJECT_SUCCESS = DELETE_PROJECT_SUCCESS;
exports.deleteProjectSuccess = deleteProjectSuccess;
exports.DELETE_PROJECT_ERROR = DELETE_PROJECT_ERROR;
exports.deleteProjectError = deleteProjectError;
