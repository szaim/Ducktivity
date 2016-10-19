var React = require("react");
import { render } from 'react-dom';
require("../style.css");
var routes = require ('./components/routes');
// import Main from './components/app';


render(routes, document.getElementById('app'));