import React, { Component } from 'react';

import UserInfo from './userInfo.js';
import UserReviews from './userReviews';
import '../../css/profile.css'

class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      profile : true,
      reviews : false,
    }
  }

  componentDidMount() {
    
  };

  profileClick = () => {
  	this.setState({
  		profile : true,
  		reviews : false,
  	});
  };

  reviewsClick = () => {
  	this.setState({
  		profile : false,
  		reviews : true,
  	});
  };

  render() {
    return (
      <div>
    	<table className="profileNav">
    		<tbody>
	    		<tr onClick={this.profileClick}>
	    			<td>Personal Info</td>
	    		</tr>
	    		<tr onClick={this.reviewsClick}>
	    			<td>My Reviews</td>
	    		</tr>
    		</tbody>
        </table>
        {this.state.profile && <UserInfo />}
        {this.state.reviews && <UserReviews />}
      </div>
    )
  };
}

export default Profile;