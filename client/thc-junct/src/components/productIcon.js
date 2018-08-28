import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
/*import logo from './logo.svg';
import './App.css';*/
import '../css/icon.css'

class ProductIcon extends Component {

  constructor(props) {
    super(props);
    this.state = {
      
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
      <div className="icon" onClick={this.props.onClick}>
        <div className="title">{this.props.name}</div>
        <img src={this.props.image}/>
      </div>
    );
  }
}

export default ProductIcon;