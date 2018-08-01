import React, { Component } from 'react';
/*import logo from './logo.svg';
import './App.css';*/

class Signup extends Component {

  constructor(props) {
    super(props);
    this.state = {
      response: ''
    }
  }

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
    return (
      <div>
        <div className="container">
          <div className="col-sm-6 col-sm-offset-3">
            <h1><span className="fa fa-sign-in" /> Signup</h1>
            <form action="/dev/signup" method="post">
              <div className="form-group">
                <label>Email</label>
                <input type="text" className="form-control" name="email" />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" name="password" />
              </div>
              <button type="submit" className="btn btn-warning btn-lg">Signup</button>
            </form>
            <hr />
            <p>Already have an account? <a href="/login">Login</a></p>
            <p>Or go <a href="/">home</a>.</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;