import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import './index.css';
import App from './App';
import Signup from './components/signup'
import Login from  './components/login'
import Profile from './components/profile'

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
	<Router>
		<div>
			<Route path='/' component={App} />
		</div>
	</Router>,
  	document.getElementById('root')
);

registerServiceWorker();
