import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import Signup from './components/signup'
import Login from  './components/login'
import Profile from './components/profile'

var Auth = require('./modules/Auth')

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      response: '',
      loginRedirect: false, // separate these into own render functions later on
      signupRedirect: false,
      profileRedirect: false,
    }
  }

  componentDidMount() {
    console.log(Auth.checkAuth())
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  };

  callApi = async function() {
    var response = await fetch('/dev');
    var body = await response.json();

    if(response.status !== 200) throw Error(body.message);

    return body;
  }

  loginClick = () => {
    this.setState({
      loginRedirect: true,
      signupRedirect: false,
      profileRedirect: false,
    });
  }

  signupClick = () => {
    this.setState({
      loginRedirect: false,
      signupRedirect: true,
      profileRedirect: false,
    });
  }

  profileClick = () => {
    this.setState({
      loginRedirect: false,
      signupRedirect: false,
      profileRedirect: true,
    });
  }

  logoutClick = async () => {
    var response = await fetch('/dev/logout');

    if(response.status === 200) {
      Auth.logout();
      this.setState({ profileRedirect: false})
      window.location.reload();
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Sockscription</h1>
          { Auth.isAuth() ? null : <button onClick={this.loginClick}>Login</button> }
          { Auth.isAuth() ? null : <button onClick={this.signupClick}>Sign Up</button>}
          
          { Auth.isAuth() && <button onClick={this.profileClick}>Profile</button>}
          { Auth.isAuth() && <button onClick={this.logoutClick}>Logout</button>}
        </header>
        <p className="App-intro">
          {this.state.response}
        </p>
        { this.state.loginRedirect && <Login />}
        { this.state.signupRedirect && <Signup />}
        { this.state.profileRedirect && <Profile/>}
      </div>
    );
  }
}

export default App;
