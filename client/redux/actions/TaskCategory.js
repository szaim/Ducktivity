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
//     var url = '/api';
//     return fetch(url).then(function(response) {
//      if (response.status < 200 || response.status >= 300) {
//        var error = new Error(response.statusText);
//        error.response = response;
//        throw error;
//      }
//      return response.json();
//    })
//     .then(function(data) {
//      return dispatch(
//        fetchTasksSuccess(data)
//        );
//    })
//     .catch(function(error) {
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
       var url = '/api/user/me';
       return fetch(url, {headers: headers}).then(function(response) {
           if (response.status < 200 || response.status >= 300) {
               var error = new Error(response.statusText);
               error.response = response;
               throw error;
           }
           return response.json();
       })
       .then(function(data) {
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

var postCard = function(TaskConstruct, categoryId) {
   return function(dispatch) {
    // var token = getToken();
    // const headers = new Headers();
    // headers.append('Authorization', `Bearer ` + token);
    var token = Cookies.get('accessToken');
       var url = '/api/card';
       return fetch(url, {
        method: 'post',
        headers: {'Content-type': 'application/json', 'Authorization': 'bearer ' + token},
        body: JSON.stringify({
          TaskConstruct: TaskConstruct,
          categoryId: categoryId
        })
      }).then(function(response) {
           if (response.status < 200 || response.status >= 300) {
               var error = new Error(response.statusText);
               error.response = response;
               throw error;
           }
           return response.text(); //{}
       })
       .then(function(data) {
               console.log("POST DATA", data);
           return dispatch(
               // postDataSuccess(data)
               fetchUser()
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


//UPDATE + DELETE TASK DATA ACTION
var updateTasks = function(deleteTask, cardId) {
   return function(dispatch) {
        var token = Cookies.get('accessToken');
       var url = '/api/card' + cardId;
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


var MOVE_TASKS_SUCCESS = 'MOVE_TASKS_SUCCESS';
var moveTasksSuccess = function(data) {
    return {
        type: MOVE_TASKS_SUCCESS,
        data: data
    };
};
var MOVE_TASKS_ERROR= 'MOVE_TASKS_ERROR';
var moveTasksError = function(error) {
    return {
        type: UPDATE_TASKS_ERROR,
        error: error
    };
};


var moveTasks = function(task, category, userId) {
   return function(dispatch) {
       var url = '/api/' + userId;
       return fetch(url,
       {
          method: 'put',
          headers: {'Content-type': 'application/json'},
          body: JSON.stringify({
          moveTask: task,
          originalCategory: category
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
               moveTasksSuccess(data)
           );
       })
       .catch(function(error) {

           return dispatch(
               moveTasksError(error)
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
//        var url = '/api/' + userId;
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
       var url = '/api/' + cardId;
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

var postCategory = function(CategoryConstruct, userId) {
   return function(dispatch) {
    // var token = getToken();
    // const headers = new Headers();
    // headers.append('Authorization', `Bearer ` + token);
    var token = Cookies.get('accessToken');
       var url = '/api/category';
       return fetch(url, {
        method: 'post',
        headers: {'Content-type': 'application/json', 'Authorization': 'bearer ' + token},
        body: JSON.stringify({
          CategoryConstruct: CategoryConstruct,
          userId: userId
        })
      }).then(function(response) {
           if (response.status < 200 || response.status >= 300) {
               var error = new Error(response.statusText);
               error.response = response;
               throw error;
           }
           return response.text(); //{}
       })
       .then(function(data) {
               console.log("POST DATA", data);
           return dispatch(
               // postDataSuccess(data)
               fetchUser()
           );
       })
       .catch(function(error) {
           return dispatch(
               postDataError(error)
           );
       });
   }
};

var UPDATE_CATEGORY_SUCCESS = 'UPDATE_CATEGORY_SUCCESS';
var updateCategorySuccess = function(data) {
    return {
        type: UPDATE_CATEGORY_SUCCESS,
        data: data
    };
};
var UPDATE_CATEGORY_ERROR= 'FETCH_CATEGORY_ERROR';
var updateCategoryError = function(error) {
    return {
        type: UPDATE_CATEGORY_ERROR,
        error: error
    };
};


//UPDATE/DELETE CATEGORY ACTION
var updateCategory = function(deleteCategory, categoryId) {
   return function(dispatch) {
        var token = Cookies.get('accessToken');
       var url = '/api/' + categoryId;
       return fetch(url,
       {
          method: 'put',
         headers: {'Content-type': 'application/json', 'Authorization': 'bearer ' + token},
          body: JSON.stringify({
          status: deleteCategory
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
           return dispatch(
               updateCategorySuccess(data)
           );
       })
       .catch(function(error) {
           return dispatch(
               updateCategoryError(error)
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

exports.UPDATE_CATEGORY_SUCCESS = UPDATE_CATEGORY_SUCCESS;
exports.updateCategorySuccess = updateCategorySuccess;
exports.UPDATE_CATEGORY_ERROR = UPDATE_CATEGORY_ERROR;
exports.updateCategoryError = updateCategoryError;
exports.updateCategory = updateCategory;

exports.MOVE_TASKS_SUCCESS = MOVE_TASKS_SUCCESS;
exports.moveTasksSuccess = moveTasksSuccess;
exports.MOVE_TASKS_ERROR = MOVE_TASKS_ERROR;
exports.moveTasksError = moveTasksError;
exports.moveTasks = moveTasks;

// exports.ADD_TASKS_SUCCESS = ADD_TASKS_SUCCESS;
// exports.addTasksSuccess = addTasksSuccess;
// exports.ADD_TASKS_ERROR = ADD_TASKS_ERROR;
// exports.addTasksError = addTasksError;
// exports.addTasks = addTasks;

exports.postCategory = postCategory;
