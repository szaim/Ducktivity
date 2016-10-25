require('isomorphic-fetch');

var FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS';
var fetchTasksSuccess = function(data) {
    return {
        type: FETCH_TASKS_SUCCESS,
        data: data
    };
};
var FETCH_TASKS_ERROR= 'FETCH_TASKS_ERROR';
var fetchTasksError = function(error) {
    return {
        type: FETCH_TASKS_ERROR,
        error: error
    };
};

var fetchTasks = function() {
 return function(dispatch) {
    var url = 'http://localhost:8080/api';
    return fetch(url).then(function(response) {
     if (response.status < 200 || response.status >= 300) {
       var error = new Error(response.statusText);
       error.response = response;
       throw error;
     }
     return response.json();
   })
    .then(function(data) {
     console.log("fetch TASKS promise: ", data);
     return dispatch(
       fetchTasksSuccess(data)
       );
   })
    .catch(function(error) {
       console.log("fetch tasks promise: ", error);
     return dispatch(
       fetchTasksError(error)
       );
   });
  };
};


//UPDATE DATA ACTION
// var updateTasks = function(googleId, id, day, breakfast, lunch, dinner, sideDish, snack, dessert, calories) {
//    return function(dispatch) {
//        var url = 'http://localhost:8080/api/:id;
//        return fetch(url,
//        {
//           method: 'put',
//           headers: {'Content-type': 'application/json'},
//           body: JSON.stringify({
//           mealHistory: [googleId, id, day, breakfast, lunch, dinner, sideDish, snack, dessert, calories]
//         })
//
//
//        }
//
//         ).then(function(response) {
//            if (response.status < 200 || response.status >= 300) {
//                var error = new Error(response.statusText);
//                error.response = response;
//                throw error;
//            }
//            return response.json();
//        })
//
//        .then(function(data) {
//                console.log("DATA", data);
//            return dispatch(
//                updateTasksSuccess(data)
//            );
//        })
//        .catch(function(error) {
//
//            return dispatch(
//                updateTasksError(error)
//            );
//        });
//    }
// };


// var UPDATE_TASKS_SUCCESS = 'FETCH_DATA_SUCCESS';
// var update_Tasks_Success = function(data) {
//     return {
//         type: update_TASKS_SUCCESS,
//         data: data
//     };
// };
// var UPDATE_TASKS_ERROR= 'FETCH_TASKS_ERROR';
// var updateTasksError = function(error) {
//     return {
//         type: UPDATE_TASKS_ERROR,
//         error: error
//     };
// };


// var addTask = function(item) {
//    return function(dispatch) {
//        var url = 'http://localhost:3000/api/';
//        return fetch(url,
//        {
//        		method: 'post',
//        		body: JSON.stringify({
//        			id: '',
//             title: item
//        		}),
//        		//headers tells our application type json
//        		headers: {
//        			'Content-Type': 'application/json'
//        		},
//
//
//        }).then(function(response) {
//            if (response.status < 200 || response.status >= 300) {
//                var error = new Error(response.statusText);
//                error.response = response;
//                throw error;
//            }
//            return response.json();
//        })
//
//        .then(function(data) {
//                console.log("POST DATA", data);
//            return dispatch(
//                addTaskSuccess()
//            );
//        })
//        .catch(function(error) {
//
//            return dispatch(
//                AddTaskError(error)
//            );
//        });
//    }
// };

exports.FETCH_TASKS_SUCCESS = FETCH_TASKS_SUCCESS;
exports.fetchTasksSuccess = fetchTasksSuccess;
exports.FETCH_TASKS_ERROR = FETCH_TASKS_ERROR;
exports.fetchTasksError = fetchTasksError;
exports.fetchTasks = fetchTasks;

// exports.UPDATE_TASKS_SUCCESS = UPDATE_TASKS_SUCCESS;
// exports.updateTasksSuccess = updateTasksSuccess;
// exports.UPDATE_TASKS_ERROR = UPDATE_TASKS_ERROR;
// exports.updateTasksError = updateTasksError;
// exports.updateTasks = updateTasks;

// exports.UPDATE_TASKS_SUCCESS = UPDATE_TASKS_SUCCESS;
// exports.updateTasksSuccess = updateTasksSuccess;
// exports.UPDATE_TASKS_ERROR = UPDATE_TASKS_ERROR;
// exports.updateTasksError = updateTasksError;
// exports.updateTasks = updateTasks;

// exports.ADD_TASKS_SUCCESS = ADD_TASKS_SUCCESS;
// exports.addTasksSuccess = addTasksSuccess;
// exports.ADD_TASKS_ERROR = ADD_TASKS_ERROR;
// exports.addTasksError = addTasksError;
// exports.addTasks = addTasks;
