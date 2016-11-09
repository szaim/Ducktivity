require('isomorphic-fetch');
var Cookies = require("js-cookie");
var Constants = require("../constants/projectConstants");
var OverviewConstants = require("../constants/overviewConstants");
var ProjectConstants = require("../constants/projectConstants");



var getProject = function() {
   return function(dispatch) {
    var token = Cookies.get('accessToken');
    // var token = getToken();
    console.log('token=', token);
    // const headers = new Headers();
    // headers.append('Authorization', `Bearer ` + token);
    var headers = new Headers({
        Authorization: 'bearer ' + token
      });
       var url = '/api/user/project';
       return fetch(url, {headers: headers}).then(function(response) {
           if (response.status < 200 || response.status >= 300) {
               var error = new Error(response.statusText);
               error.response = response;
               throw error;
           }
           return response.json();
       })
       .then(function(data) {
        console.log('getProject success', data);
           return dispatch(  
               Constants.getProjectSuccess(data)
           );
       })
       .catch(function(error) {
        console.log('getProject error', error);
           return dispatch(
               Constants.getProjectError(error)
           );
       });
   }
};

var fetchProjectCategories = function(projectId) {
   return function(dispatch) {
    var token = Cookies.get('accessToken');
    // var token = getToken();
    // console.log('token=', token);
    // const headers = new Headers();
    // headers.append('Authorization', `Bearer ` + token);
    var headers = new Headers({
        Authorization: 'bearer ' + token
      });
       var url = '/api/project/categories/'+projectId;
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
               ProjectConstants.fetchProjectCategoriesSuccess(data)
           );
       })
       .catch(function(error) {
           return dispatch(
               ProjectConstants.fetchProjectCategoriesError(error)
           );
       });
   }
};
var createProject = function(projectTitle) {
   return function(dispatch) {
    var token = Cookies.get('accessToken');
       var url = '/api/project';
       return fetch(url, {
        method: 'post',
        headers: {'Content-type': 'application/json', 'Authorization': 'bearer ' + token},
        body: JSON.stringify({
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
               console.log("POST DATA", data);
           return dispatch(
               Constants.createProjectSuccess(data)
           );
       })
       .catch(function(error) {
           return dispatch(
               Constants.createProjectError(error)
           );
       });
   }
};

exports.getProject = getProject;
exports.createProject = createProject;
exports.fetchProjectCategories = fetchProjectCategories;