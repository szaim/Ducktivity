require('isomorphic-fetch');
var Cookies = require("js-cookie");
var Constants = require("../constants/CardCategoriesConstants");



var fetchProject = function() {
   return function(dispatch) {
    var token = Cookies.get('accessToken');
    // var token = getToken();
    console.log('token=', token);
    // const headers = new Headers();
    // headers.append('Authorization', `Bearer ` + token);
    var headers = new Headers({
        Authorization: 'bearer ' + token
      });
       var url = '/api/project';
       return fetch(url, {headers: headers}).then(function(response) {
           if (response.status < 200 || response.status >= 300) {
               var error = new Error(response.statusText);
               error.response = response;
               throw error;
           }
           return response.json();
       })
       .then(function(data) {
        console.log('fetchProject success', data);
           return dispatch(  
               Constants.fetchProjectSuccess(data)
           );
       })
       .catch(function(error) {
        console.log('fetchProject error', error);
           return dispatch(
               Constants.fetchProjectError(error)
           );
       });
   }
};

exports.fetchProject = fetchProject;