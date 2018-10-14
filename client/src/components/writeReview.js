import React, { Component } from 'react';

class Review extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      review: '',
      affLink: '',
      message: null,
      messageStyle: null,
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();

    var data = new FormData(event.target);

    var response = await fetch('/dev/product', {
      method: 'POST',
      body: data,
      credentials: 'same-origin',
    });
    
    var body = await response.json();
    if(response.status === 200){
      this.setState({
        message: body.message,
        messageStyle: "alert alert-success",
      });
    } else {
      this.setState({
        message: body.message,
        messageStyle: "alert alert-danger",
      });
    }
  };

  handleNameChange = (event) => {
    this.setState({ name: event.target.value });
  };

  handleReviewChange = (event) => {
    this.setState({ review: event.target.value });
  };

  handleAffLinkChange = (event) => {
    this.setState({ affLink: event.target.value });
  };

  componentDidMount() {
    
  };

  render() {
    return (
      <div>
        <div className="container">
          <h1><span className="fa fa-sign-in" /> Review</h1>
          {this.state.message && <div className={this.state.messageStyle}>{this.state.message}</div>}
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>Product Name</label>
              <input id="name" type="text" className="form-control" name="name"
                 value={this.state.name} onChange={this.handleNameChange} required/>
            </div>
            <div className="form-group">
              <label>Review</label>
              <textarea id="review" type="text" className="form-control" name="review"
                 value={this.state.review} onChange={this.handleReviewChange} required></textarea>
            </div>
            <div className="form-group">
              <label>Affiliate Link</label>
              <input id="affLink" type="text" className="form-control" name="affLink"
                 value={this.state.affLink} onChange={this.handleAffLinkChange} required/>
            </div>
            <div className="form-group">
              <label>Product Image</label>
              <input id="productImage" className="form-control" name="image" type="file" required/>
            </div>
            <button type="submit" className="btn btn-warning btn-lg">Post Review</button>
          </form>
          <hr />
        </div>
      </div>
    );
  }
}

export default Review;