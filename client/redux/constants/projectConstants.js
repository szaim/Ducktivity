

var GET_PROJECT_SUCCESS = 'GET_PROJECT_SUCCESS';
var getProjectSuccess = function(data) {
    return {
        type: GET_PROJECT_SUCCESS,
        data: data
    };
};
var GET_PROJECT_ERROR= 'GET_PROJECT_ERROR';
var getProjectError = function(error) {
    return {
        type: GET_PROJECT_ERROR,
        error: error
    };
};

var FETCH_PROJECT_CATEGORIES_SUCCESS = 'FETCH_PROJECT_CATEGORIES_SUCCESS';
var fetchProjectCategoriesSuccess = function(data) {
    return {
        type: FETCH_PROJECT_CATEGORIES_SUCCESS,
        data: data
    };
};
var FETCH_PROJECT_CATEGORIES_ERROR= 'FETCH_PROJECT_CATEGORIES_ERROR';
var fetchProjectCategoriesError = function(error) {
    return {
        type: FETCH_PROJECT_CATEGORIES_ERROR,
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



exports.GET_PROJECT_SUCCESS = GET_PROJECT_SUCCESS;
exports.getProjectSuccess = getProjectSuccess;
exports.GET_PROJECT_ERROR = GET_PROJECT_ERROR;
exports.getProjectError = getProjectError;

exports.FETCH_PROJECT_CATEGORIES_SUCCESS = FETCH_PROJECT_CATEGORIES_SUCCESS;
exports.fetchProjectCategoriesSuccess = fetchProjectCategoriesSuccess;
exports.FETCH_PROJECT_CATEGORIES_ERROR = FETCH_PROJECT_CATEGORIES_ERROR;
exports.fetchProjectCategoriesError = fetchProjectCategoriesError;

exports.CREATE_PROJECT_SUCCESS = CREATE_PROJECT_SUCCESS;
exports.createProjectSuccess = createProjectSuccess;
exports.CREATE_PROJECT_ERROR = CREATE_PROJECT_ERROR;
exports.createProjectError = createProjectError;