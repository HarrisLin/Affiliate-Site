import React, { Component } from 'react';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Signup from './components/signup'
import Login from  './components/login'
import Profile from './components/profile'
import Review from './components/writeReview'
import Homepage from './components/homepage'

var Auth = require('./modules/Auth')

class App extends Component {

  constructor(props) {
    Auth.checkAuth();
    super(props);
    this.state = {
      response: '',
      homepage: true,
      loginRedirect: false,
      signupRedirect: false,
      profileRedirect: false,
      reviewRedirect: false,
      authenticated: Auth.isAuth(),
    }
  }

  componentDidMount() {

  };

  callApi = async function() {

  }

  loginClick = () => {
    this.setState({
      homepage: false,
      loginRedirect: true,
      signupRedirect: false,
      profileRedirect: false,
      reviewRedirect: false,
    });
  }

  signupClick = () => {
    this.setState({
      homepage: false,
      loginRedirect: false,
      signupRedirect: true,
      profileRedirect: false,
      reviewRedirect: false,
    });
  }

  profileClick = () => {
    this.setState({
      homepage: false,
      loginRedirect: false,
      signupRedirect: false,
      profileRedirect: true,
      reviewRedirect: false,
    });
  }

  reviewClick = () => {
    this.setState({
      homepage: false,
      loginRedirect: false,
      signupRedirect: false,
      profileRedirect: false,
      reviewRedirect: true,
    });
  }

  homeClick = () => {
    this.setState({
      homepage: true,
      loginRedirect: false,
      signupRedirect: false,
      profileRedirect: false,
      reviewRedirect: false,
    });
  }

  logoutClick = async () => {
    var response = await fetch('/dev/logout');

    if(response.status === 200) {
      Auth.logout();
      this.setState({ authenticated: false})
      window.location.reload();
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title" onClick={this.homeClick}>Reviews</h1>
          { this.state.authenticated ? null : <button className="accButt" onClick={this.loginClick}>Login</button> }
          { this.state.authenticated ? null : <button className="accButt" onClick={this.signupClick}>Sign Up</button>}
          
          { this.state.authenticated && <button className="accButt" onClick={this.profileClick}>Profile</button>}
          { this.state.authenticated && <button className="accButt" onClick={this.reviewClick}>Post Review</button>}
          { this.state.authenticated && <button className="accButt" onClick={this.logoutClick}>Logout</button>}
        </header>
        { this.state.homepage && <Homepage />}
        { this.state.loginRedirect && <Login />}
        { this.state.signupRedirect && <Signup />}
        { this.state.profileRedirect && <Profile />}
        { this.state.reviewRedirect && <Review />}
      </div>
    );
  }
}

export default App;
