require('isomorphic-fetch');
var Cookies = require("js-cookie");

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


// var fetchTasks = function() {
//  return function(dispatch) {
//     var url = 'http://localhost:8080/api';
//     return fetch(url).then(function(response) {
//      if (response.status < 200 || response.status >= 300) {
//        var error = new Error(response.statusText);
//        error.response = response;
//        throw error;
//      }
//      return response.json();
//    })
//     .then(function(data) {
//      console.log("fetch TASKS promise: ", data);
//      return dispatch(
//        fetchTasksSuccess(data)
//        );
//    })
//     .catch(function(error) {
//        console.log("fetch tasks promise: ", error);
//      return dispatch(
//        fetchTasksError(error)
//        );
//    });
//   };
// };


var fetchUser = function() {
   return function(dispatch) {
    var token = Cookies.get('accessToken');
    // var token = getToken();
    console.log('token=', token);
    // const headers = new Headers();
    // headers.append('Authorization', `Bearer ` + token);
    var headers = new Headers({
        Authorization: 'bearer ' + token
      });
    console.log('header', headers);
       var url = 'http://localhost:8080/api';
       return fetch(url, {headers: headers}).then(function(response) {
           if (response.status < 200 || response.status >= 300) {
               var error = new Error(response.statusText);
               error.response = response;
               throw error;
           }
           return response.json();
       })
       .then(function(data) {
               console.log("USER DATA", data);
           return dispatch(
               fetchUserSuccess(data)
           );
       })
       .catch(function(error) {
           return dispatch(
               fetchUserError(error)
           );
       });
   }
};

var POST_DATA_SUCCESS = 'POST_DATA_SUCCESS';
var postDataSuccess = function(data) {
    return {
        type: POST_DATA_SUCCESS,
        data: data
    };
};
var POST_DATA_ERROR = 'POST_DATA_ERROR';
var postDataError = function(error) {
    return {
        type: POST_DATA_ERROR ,
        error: error
    };
};

var postCard = function(title, category, status, categoryId) {
   return function(dispatch) {
    // var token = getToken();
    // const headers = new Headers();
    // headers.append('Authorization', `Bearer ` + token);
    var token = Cookies.get('accessToken');
       var url = 'http://localhost:8080/api/userId/'+ categoryId;
       return fetch(url, {
        method: 'post',
        headers: {'Content-type': 'application/json', 'Authorization': 'bearer ' + token},
        body: JSON.stringify({
          title: title,
          category: category,
          status: status
        })

      }).then(function(response) {
           if (response.status < 200 || response.status >= 300) {
               var error = new Error(response.statusText);
               error.response = response;
               throw error;
           }
           return response.json();
       })
       .then(function(data) {
               console.log("POST DATA", data);
           return dispatch(
               postDataSuccess(data)
           );
       })
       .catch(function(error) {
           return dispatch(
               postDataError(error)
           );
       });
   }
};


var UPDATE_TASKS_SUCCESS = 'UPDATE_TASKS_SUCCESS';
var updateTasksSuccess = function(data) {
    return {
        type: UPDATE_TASKS_SUCCESS,
        data: data
    };
};
var UPDATE_TASKS_ERROR= 'FETCH_TASKS_ERROR';
var updateTasksError = function(error) {
    return {
        type: UPDATE_TASKS_ERROR,
        error: error
    };
};


//UPDATE DATA ACTION
var updateTasks = function(deleteTask, cardId) {
   return function(dispatch) {
        var token = Cookies.get('accessToken');
       var url = 'http://localhost:8080/api/' + cardId;
       return fetch(url,
       {
          method: 'put',
         headers: {'Content-type': 'application/json', 'Authorization': 'bearer ' + token},
          body: JSON.stringify({
          status: deleteTask
        })


       }

        ).then(function(response) {
           if (response.status < 200 || response.status >= 300) {
               var error = new Error(response.statusText);
               error.response = response;
               throw error;
           }
           return response.json();
       })

       .then(function(data) {
               console.log("DATA", data);
           return dispatch(
               updateTasksSuccess(data)
           );
       })
       .catch(function(error) {

           return dispatch(
               updateTasksError(error)
           );
       });
   }
};





// var ADD_TASKS_SUCCESS= 'ADD_TASKS_SUCCESS';
// var addTasksSucess = function(data) {
//     return {
//         type: ADD_TASKS_SUCCESS,
//         data: data,
//     };
// };

// var ADD_TASKS_ERROR= 'ADD_TASKS_ERROR';
// var addTasksError = function(error) {
//     return {
//         type: ADD_TASKS_ERROR,
//         error: error
//     };
// };


// var addTask = function(addTask, userId) {
//    return function(dispatch) {
//        var url = 'http://localhost:8080/api/' + userId;
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


//        }).then(function(response) {
//            if (response.status < 200 || response.status >= 300) {
//                var error = new Error(response.statusText);
//                error.response = response;
//                throw error;
//            }
//            return response.json();
//        })

//        .then(function(data) {
//                console.log("POST DATA", data);
//            return dispatch(
//                addTaskSuccess(data)
//            );
//        })
//        .catch(function(error) {

//            return dispatch(
//                AddTaskError(error)
//            );
//        });
//    }
// };


var deleteTask = function(deleteTaskStatus, cardId) {
   return function(dispatch) {
       var url = 'http://localhost:8080/api/' + cardId;
       return fetch(url,
       {
          method: 'put',
          body: JSON.stringify({
            status: deleteTaskStatus
          }),
          //headers tells our application type json
          headers: {
            'Content-Type': 'application/json'
          },


       }).then(function(response) {
           if (response.status < 200 || response.status >= 300) {
               var error = new Error(response.statusText);
               error.response = response;
               throw error;
           }
           return response.json();
       })

       .then(function(data) {
               console.log("POST DATA", data);
           return dispatch(
               deleteSuccess(data)
           );
       })
       .catch(function(error) {

           return dispatch(
               deleteError(error)
           );
       });
   }
};

// for the user
exports.FETCH_USER_SUCCESS = FETCH_USER_SUCCESS;
exports.fetchUserSuccess = fetchUserSuccess;
exports.FETCH_USER_ERROR = FETCH_USER_ERROR;
exports.fetchUserError = fetchUserError;
exports.fetchUser = fetchUser;

// for POST DATA
exports.POST_DATA_SUCCESS = POST_DATA_SUCCESS;
exports.postDataSuccess = postDataSuccess;
exports.POST_DATA_ERROR = POST_DATA_ERROR;
exports.postDataError = postDataError;
exports.postCard = postCard;

// exports.FETCH_TASKS_SUCCESS = FETCH_TASKS_SUCCESS;
// exports.fetchTasksSuccess = fetchTasksSuccess;
// exports.FETCH_TASKS_ERROR = FETCH_TASKS_ERROR;
// exports.fetchTasksError = fetchTasksError;
// exports.fetchTasks = fetchTasks;

// exports.UPDATE_TASKS_SUCCESS = UPDATE_TASKS_SUCCESS;
// exports.updateTasksSuccess = updateTasksSuccess;
// exports.UPDATE_TASKS_ERROR = UPDATE_TASKS_ERROR;
// exports.updateTasksError = updateTasksError;
// exports.updateTasks = updateTasks;

exports.UPDATE_TASKS_SUCCESS = UPDATE_TASKS_SUCCESS;
exports.updateTasksSuccess = updateTasksSuccess;
exports.UPDATE_TASKS_ERROR = UPDATE_TASKS_ERROR;
exports.updateTasksError = updateTasksError;
exports.updateTasks = updateTasks;

// exports.ADD_TASKS_SUCCESS = ADD_TASKS_SUCCESS;
// exports.addTasksSuccess = addTasksSuccess;
// exports.ADD_TASKS_ERROR = ADD_TASKS_ERROR;
// exports.addTasksError = addTasksError;
// exports.addTasks = addTasks;
