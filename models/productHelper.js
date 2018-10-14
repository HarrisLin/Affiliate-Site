// load up the product model
var Product            = require('./product');

function writeReview(details) {
	return getProduct(details.name).then(function(product){
        if(product != null) {
            return false
        } else {
            var review = new Product();
	
			review.author = details.author;
			review.name = details.name;
			review.review = details.review;
			review.affLink = details.affLink;
			review.imagePath = details.path;

			review.save(function(err){
				if (err) {
					console.log("Failed to save product: " + details.name);
					throw err;
				}
				
			});
			return true;
        }
    });
}

//TODO
/*function updateReview(details) {

}*/

//TODO
/*function postComment(product, comment) {

}*/

function getMostRecentReviews() {
	var query = Product.find({}).limit(10).sort({date : -1});
	return query;
}

//function is like a repeat of findProduct
function getProduct(name){
	return findProduct(name).then(function(product){
		//return null for no product found
		//if(product == null) return null;
		return product;
	});
}

function findProduct(name) {
	var queryPromise = Product.findOne({ 'name' :  name }, function(err, product) {
        // if there are any errors, return the error before anything else
        if (err)
            return err;

        // if no product is found, return null
        if (!product)
            return null;

        // all is well, return successful product
        return product;
    }).exec();
    return queryPromise;
}

function userReviews(email) {
	return Product.find({'author' : email});
}

module.exports = {
	findProduct,
	writeReview,
	getProduct,
	getMostRecentReviews,
	userReviews,
}