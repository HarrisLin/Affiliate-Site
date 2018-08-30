import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import '../css/icon.css'
var defaultImage = require('../images/UnavailableImage.png')

class ProductIcon extends Component {

  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  componentDidMount() {

  };

  render() {
    return (
      <div className="icon" onClick={this.props.onClick}>
        <div className="title">{this.props.name}</div>
        <img src={this.props.image} onError={(e) =>{e.target.src=defaultImage}}/>
      </div>
    );
  }
}

export default ProductIcon;