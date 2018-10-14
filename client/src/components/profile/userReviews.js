import React, { Component } from 'react';
import ProductIcon from '../productIcon';
import ProductReview from '../productReview';
import '../../css/userReviews.css';

class UserReviews extends Component {

  constructor(props) {
    super(props);
    this.state = {
      profile : true,
      reviews : false,
      products : [],
    }
  }

  loadPage = async function() {
    var response = await fetch('/dev/getOwnReviews');
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
      var imageLocation = product.imagePath;
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

  render() {
    return (
      <div className="profileReviews">
    	  {!this.state.renderProductReview ? this.createIcons() : <ProductReview name={this.state.reviewProduct}/>}
      </div>
    )
  };
}

export default UserReviews;