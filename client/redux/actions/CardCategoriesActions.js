require('isomorphic-fetch');
var Cookies = require("js-cookie");
var Constants = require("../constants/CardCategoriesConstants");


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
               Constants.fetchUserSuccess(data)
           );
       })
       .catch(function(error) {
           return dispatch(
               Constants.fetchUserError(error)
           );
       });
   }
};

var postCard = function(TaskConstruct, categoryId) {
   return function(dispatch) {
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
           return response.json(); 
       })
       .then(function(data) {
               console.log("POST DATA", data);
           return dispatch(
               Constants.postCardSuccess(data)
           );
       })
       .catch(function(error) {
           return dispatch(
               Constants.postCardError(error)
           );
       });
   }
};


//UPDATE + DELETE TASK DATA ACTION
var updateCards = function(CardConstruct) {
   return function(dispatch) {
        var token = Cookies.get('accessToken');
       var url = '/api/card/' + CardConstruct._id;
       return fetch(url,
       {
          method: 'put',
         headers: {'Content-type': 'application/json', 'Authorization': 'bearer ' + token},
          body: JSON.stringify({
          CardConstruct: CardConstruct

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
          console.log('updateCardSuccess', data)
           return dispatch(
               Constants.updateCardSuccess(data)
           );
       })
       .catch(function(error) {
           return dispatch(
               Constants.updateCardError(error)
           );
       });
   }
};





// var MOVE_TASKS_SUCCESS = 'MOVE_TASKS_SUCCESS';
// var moveTasksSuccess = function(data) {
//     return {
//         type: MOVE_TASKS_SUCCESS,
//         data: data
//     };
// };
// var MOVE_TASKS_ERROR= 'MOVE_TASKS_ERROR';
// var moveTasksError = function(error) {
//     return {
//         type: UPDATE_TASKS_ERROR,
//         error: error
//     };
// };


// var moveTasks = function(task, category, userId) {
//    return function(dispatch) {
//        var url = '/api/' + userId;
//        return fetch(url,
//        {
//           method: 'put',
//           headers: {'Content-type': 'application/json'},
//           body: JSON.stringify({
//           moveTask: task,
//           originalCategory: category
//         })


//        }

//         ).then(function(response) {
//            if (response.status < 200 || response.status >= 300) {
//                var error = new Error(response.statusText);
//                error.response = response;
//                throw error;
//            }
//            return response.json();
//        })

//        .then(function(data) {
//                console.log("DATA", data);
//            return dispatch(
//                moveTasksSuccess(data)
//            );
//        })
//        .catch(function(error) {

//            return dispatch(
//                moveTasksError(error)
//            );
//        });
//    }
// };

// for the user
exports.fetchUser = fetchUser;
exports.postCard = postCard;
exports.updateCards = updateCards;
