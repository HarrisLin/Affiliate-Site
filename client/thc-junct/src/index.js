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

var Auth = require('./modules/Auth')

//check if user is logged in and set auth flag
Auth.checkAuth()

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    Auth.isAuth() ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

ReactDOM.render(
	<Router>
		<div>
			<Route path='/' component={App} />
      {/*<Route path='/product' component={ProductReview} />
			<Route path='/signup' component={Signup} />
			<Route path='/login' component={Login} />
			<PrivateRoute path='/profile' component={Profile} />*/}
		</div>
	</Router>,
  	document.getElementById('root')
);

registerServiceWorker();
