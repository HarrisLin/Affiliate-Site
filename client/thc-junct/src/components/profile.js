import React, { Component } from 'react';

class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userEmail: '',
      country: ' ',
      province: ' ',
      address: ' ',
      postalCode: ' ',
      message: null,
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  loadPageCall = async function() {
    var response = await fetch('/dev/profile', {
      method: 'get',
      credentials: 'same-origin',
    });
    var body = await response.json();
    if(response.status !== 200) throw Error(body.message);

    return body;
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

    var response = await fetch('/dev/update-profile', {
      method: 'POST',
      body: formBody,
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
    });
    
    var body = await response.json();
    this.setState({message: body.message});
  };

  handleCountryChange = (event) => {
    this.setState({ country: event.target.value });
  };

  handleProvinceChange = (event) => {
    this.setState({ province: event.target.value });
  };

  handleAddressChange = (event) => {
    this.setState({ address: event.target.value });
  };

  handlePostalChange = (event) => {
    this.setState({ postalCode: event.target.value });
  };

  componentDidMount() {
    this.loadPageCall()
      .then(res => {
        this.setState({ userEmail : res.email });
        if(res.shipping.country) this.setState({ country : res.shipping.country});
        if(res.shipping.province) this.setState({ province : res.shipping.province});
        if(res.shipping.address) this.setState({ address : res.shipping.address});
        if(res.shipping.postalCode) this.setState({ postalCode : res.shipping.postalCode});
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <div className="container">
          <h1><span className="fa fa-sign-in" /> Profile</h1>
          {this.state.message && <div>{this.state.message}</div>}
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input type="text" className="form-control" name="email" value={this.state.userEmail} readOnly/>
            </div>
            <div className="form-group">
              <label>Country</label>
              <input id="country" type="text" className="form-control" name="country"
                 value={this.state.country} onChange={this.handleCountryChange}/>
            </div>
            <div className="form-group">
              <label>Province</label>
              <input id="province" type="text" className="form-control" name="province"
                 value={this.state.province} onChange={this.handleProvinceChange}/>
            </div>
            <div className="form-group">
              <label>Address</label>
              <input id="address" type="text" className="form-control" name="address"
                 value={this.state.address} onChange={this.handleAddressChange}/>
            </div>
            <div className="form-group">
              <label>Postal Code</label>
              <input id="postalCode" type="text" className="form-control" name="postalCode"
                 value={this.state.postalCode} onChange={this.handlePostalChange}/>
            </div>
            <button type="submit" className="btn btn-warning btn-lg">Update</button>
          </form>
          <hr />
        </div>
      </div>
    );
  }
}

export default Profile;