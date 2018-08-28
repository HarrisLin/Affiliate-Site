import React, { Component } from 'react';
/*import logo from './logo.svg';
import './App.css';*/
import '../css/review.css'

class ProductReview extends Component {

  constructor(props) {
    super(props);
    this.state = {
      product: {},
      message: null,
      productLoaded: false,
    }
  }

  loadPageCall = async function() {
    var url = '/dev/product?name=' + this.props.name.replace('/\s+/', '+');
    var response = await fetch(url, {
      method: 'get',
      credentials: 'same-origin',
    });
    var body = await response.json();
    if(response.status !== 200) throw Error(body.message);
    console.log(response)
    return body;
  }

  componentDidMount() {
    this.loadPageCall()
      .then(res => {
        this.setState({ 
          product : res.product,
          productLoaded : true,
        });
      })
      .catch(err => console.log(err));
  };

  loadComments = () => {
    if(this.state.product.comments.length == 0) return null;
    var commentList = this.state.product.comments.map(function(comment, i) {
      return (<div className="comments">
                <span className="author">{comment.author}</span>
                <span className="date">{comment.date}</span>
                <span className="content">{comment.content}</span>
              </div>)
    });
    return commentList;
  }

  loadImage = () => {
    //TODO dont hardcode url later
    var imageLocation = 'http://localhost:8080/'+this.state.product.imagePath;
    return (<div className="reviewIcon">
      <div className="title">{this.state.product.name}</div>
      <img src={imageLocation}/>
    </div>)
  }

  loadReview = () => {
    //converts ISO date
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric' };
    var ISODate = new Date(this.state.product.date);
    var date = ISODate.toLocaleDateString("en-US", options);
    return (
        <div className="review">
          <div className="credentials">
            <span className="author">By: {this.state.product.author}</span>
            <span className="date">Date Posted: {date}</span>
          </div>
          <div className="reviewText">{this.state.product.review}</div>
        </div>
      )
  }

  render() {
    return (
      <div>
        <div className="container">
          <h1><span className="fa fa-sign-in" /> {this.state.name}</h1>
          {this.state.message && <div>{this.state.message}</div>}
          <hr />

          {this.state.productLoaded && this.loadImage()}
          {this.state.productLoaded && this.loadReview()}
        </div>
      </div>
    );
  }
}

export default ProductReview;