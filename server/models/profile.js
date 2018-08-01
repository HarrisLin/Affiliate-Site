// load up the user model
var User            = require('./user');

function saveShippingInfo(email, info) {
	var queryPromise = findUser(email);

	//do some error checks
	queryPromise.then(function(user){
		if(user == null) return false;
		user.shippingInfo.country = info.country;
		user.shippingInfo.address = info.address;
		user.shippingInfo.province = info.province;
		user.shippingInfo.postalCode = info.postalCode;
		// add some error checks
		user.save();
	})
	return true;
}

function getShippingInfo(email){
	return findUser(email).then(function(user){
		//return null for no user found
		if(user == null) return null;
		return user.shippingInfo;
	});
}

function findUser(email) {
	var queryPromise = User.findOne({ 'local.email' :  email }, function(err, user) {
        // if there are any errors, return the error before anything else
        if (err)
            return err;

        // if no user is found, return null
        if (!user)
            return null;

        // all is well, return successful user
        return user;
    }).exec();
    return queryPromise;
}

module.exports = {
	findUser,
	saveShippingInfo,
	getShippingInfo,
}