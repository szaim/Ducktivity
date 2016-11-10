var React = require("react");
// import { render } from 'react-dom';
var render = require("react-dom").render;
var Provider = require("react-redux").Provider;
var store = require("./redux/store");
var routes = require("./Routes");
require("!style!css!less!../style.less");
require("../css/ionicons.css");
// var css = require("!css!less!../style.less");


// var App = require("./containers/App");
// var TaskBoard = require('./containers/TaskBoard');






document.addEventListener('DOMContentLoaded', function() {
    render(
    	routes,
    	document.getElementById('app'));
});
