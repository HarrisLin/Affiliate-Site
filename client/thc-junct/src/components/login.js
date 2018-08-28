import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
/*import logo from './logo.svg';
import './App.css';*/

var Auth = require('../modules/Auth')

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      message: null,
      profileRedirect: false,
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();

    var data = new FormData(event.target);

    //Because react native doesnt support url encoded, make into a helper function later
    var formBody = [];
    for (var [key, value] of data.entries()) { 
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(value);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    var response = await fetch('/dev/login', {
      method: 'POST',
      body: formBody,
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
    });
    var body = await response.json();

    if(response.status === 200) {
      this.setState({profileRedirect: true});
      Auth.checkAuth();
      window.location.reload();
    }
    if(response.status === 400) {
      this.setState({message: body.message})
    }
  };

 /*callApi = async function() {
    var response = await fetch('/dev');
    var body = await response.json();

    if(response.status !== 200) throw Error(body.message);

    return body;
  }*/

  componentDidMount() {
    /*this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));*/
  };

  render() {
    if (this.state.profileRedirect) {
      return <Redirect to='/' />
    }

    return (
      <div className="container">
        <h1><span className="fa fa-sign-in" /> Login</h1>
        {this.state.message && <div className="warning">{this.state.message}</div>}
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input type="text" className="form-control" name="email" />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" name="password" />
          </div>
          <button type="submit" className="btn btn-warning btn-lg">Login</button>
        </form>
        <hr />
        <p>Go to <a href="/">home</a>.</p>
      </div>
    );
  }
}

export default Login;