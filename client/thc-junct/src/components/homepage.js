import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import ProductIcon from './productIcon'
import ProductReview from './productReview'
import '../css/homepage.css'

class Homepage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      products: [],
      renderProductReview: false,
      reviewProduct: null,
    }
  }

 loadPage = async function() {
    var response = await fetch('/dev/recentReviewList');
    var body = await response.json();

    if(response.status !== 200) throw Error(body.message);

    return body;
  }

  componentDidMount() {
    this.loadPage()
      .then(res => this.setState({ products: res.reviews }))
      .catch(err => console.log(err));
  };

  createIcons = () => {
    const self = this;
    var productList = this.state.products.map(function(product, i) {
      //dont hardcode location use __hostname or something later
      var imageLocation = 'http://localhost:8080/'+product.imagePath;
      return <ProductIcon key={i} name={product.name} image={imageLocation} onClick={() => self.iconClick(product.name)}/>
    })
    return productList;
  }

  iconClick = (prodName) => {
    this.setState({
      renderProductReview: true,
      reviewProduct: prodName,
    });
  }

  backClick = () => {
    this.setState({
      renderProductReview: false,
    });
  }

  render() {
    return (
      <div>
        {this.state.renderProductReview && <button className="backButton" onClick={this.backClick}>Back</button>}
        {!this.state.renderProductReview && <p className="App-intro">
          Select a product to see it&apos;s review
        </p>}
        {!this.state.renderProductReview ? this.createIcons() : <ProductReview name={this.state.reviewProduct}/>}
      </div>
    );
  }
}

export default Homepage;