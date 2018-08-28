// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var productSchema = mongoose.Schema({
    name             : String,
    price            : Number,
    review           : String,
    availability     : Boolean,
    affLink          : String,
    author           : String,
    imagePath		 : String,
    date             : { type: Date, default: Date.now},
    comments         : [{ author: String, date : Date, content: String}], 
});

// create the model for products and expose it to our app
module.exports = mongoose.model('Product', productSchema);