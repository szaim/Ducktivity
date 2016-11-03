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


exports.FETCH_PROJECT_SUCCESS = FETCH_PROJECT_SUCCESS;
exports.fetchProjectSuccess = fetchProjectSuccess;
exports.FETCH_PROJECT_ERROR = FETCH_PROJECT_ERROR;
exports.fetchProjectError = fetchProjectError;
