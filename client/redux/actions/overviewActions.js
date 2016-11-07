require('isomorphic-fetch');
var Cookies = require("js-cookie");
var Constants = require("../constants/overviewConstants");


var fetchProject = function(projectId) {
   return function(dispatch) {
    var token = Cookies.get('accessToken');
    // var token = getToken();
    // console.log('token=', token);
    // const headers = new Headers();
    // headers.append('Authorization', `Bearer ` + token);
    var headers = new Headers({
        Authorization: 'bearer ' + token
      });
       var url = '/api/project/'+projectId;
       return fetch(url, {headers: headers}).then(function(response) {
           if (response.status < 200 || response.status >= 300) {
               var error = new Error(response.statusText);
               error.response = response;
               throw error;
           }
           return response.json();
       })
       .then(function(data) {
       	// console.log("Success fetchProject", data);
           return dispatch(
               Constants.fetchProjectSuccess(data)
           );
       })
       .catch(function(error) {
           return dispatch(
               Constants.fetchProjectError(error)
           );
       });
   }
};

var fetchUsers = function() {
   return function(dispatch) {
    var token = Cookies.get('accessToken');
    // var token = getToken();
    // console.log('token=', token);
    // const headers = new Headers();
    // headers.append('Authorization', `Bearer ` + token);
    var headers = new Headers({
        Authorization: 'bearer ' + token
      });
       var url = '/api/users';
       return fetch(url, {headers: headers}).then(function(response) {
           if (response.status < 200 || response.status >= 300) {
               var error = new Error(response.statusText);
               error.response = response;
               throw error;
           }
           return response.json();
       })
       .then(function(data) {
        console.log("Success fetch all USERS", data);
           return dispatch(
               Constants.fetchUsersSuccess(data)
           );
       })
       .catch(function(error) {
           return dispatch(
               Constants.fetchUsersError(error)
           );
       });
   }
};
var postObjective = function(objectiveTitle, projectTitle) {
   return function(dispatch) {
    var token = Cookies.get('accessToken');
       var url = '/api/objective/';
       return fetch(url, {
        method: 'post',
        headers: {'Content-type': 'application/json', 'Authorization': 'bearer ' + token},
        body: JSON.stringify({
          title: objectiveTitle,
          projectTitle: projectTitle
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
               // console.log("POST DATA", data);
           return dispatch(
               Constants.postObjectiveSuccess(data)
           );
       })
       .catch(function(error) {
           return dispatch(
               Constants.postObjectiveError(error)
           );
       });
   }
};


var OPEN_MODAL = 'OPEN_MODAL';
var openModal = function(data) {
    return {
        type: OPEN_MODAL,
        data: data
    };
};
var CLOSE_MODAL= 'CLOSE_MODAL';
var closeModal = function(data) {
    return {
        type: CLOSE_MODAL,
        error: data
    };
};

var OPEN_OBJECTIVE_MODAL = 'OPEN_OBJECTIVE_MODAL';
var openObjectiveModal = function(data) {
    return {
        type: OPEN_OBJECTIVE_MODAL,
        data: data
    };
};
var CLOSE_OBJECTIVE_MODAL= 'CLOSE_OBJECTIVE_MODAL';
var closeObjectiveModal = function(data) {
    return {
        type: CLOSE_OBJECTIVE_MODAL,
        error: data
    };
};

exports.fetchProject = fetchProject;
exports.fetchUsers = fetchUsers;

exports.postObjective = postObjective;

exports.OPEN_MODAL = OPEN_MODAL;
exports.openModal = openModal;
exports.CLOSE_MODAL = CLOSE_MODAL;
exports.closeModal = closeModal;

exports.OPEN_OBJECTIVE_MODAL = OPEN_OBJECTIVE_MODAL;
exports.openObjectiveModal = openObjectiveModal;
exports.CLOSE_OBJECTIVE_MODAL = CLOSE_OBJECTIVE_MODAL;
exports.closeObjectiveModal = closeObjectiveModal;

