var multer = require('multer');
var path = require('path');
var { findProduct, writeReview, getProduct, getMostRecentReviews } = require('../models/productHelper')

function cleanName(name){
    var result = name.toLowerCase();
    return result.replace(/\W+/g, '');
}

const storage = multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'media/')
    },
    filename(req, file, cb) {
      var fileName = req.body.name
      cb(null, `${fileName}` + path.extname(file.originalname))
    }
  })
var upload = multer({ storage: storage})

module.exports = function(app) {

    //List of products to subscribe to
    app.get('/dev/product', function(req, res) { 
        getProduct(req.query.name).then(function(result){
            if(res != null) {
                res.status(200).json({product: result});
            } else {
                res.status(400).send();
            }

        });
    });

    app.post('/dev/product', upload.single('image'), function(req, res) {
        console.log(req.body.name)
        req.body.author = req.user.local.email;
        req.body.path   = req.file.path;
        req.body.name = req.body.name;
        writeReview(req.body).then(function(success){
            if(success) return res.status(200).json({message: "Product review posted!"});
            else return res.status(400).json({message: "Failed to write review, possibly duplicate product name already exists"});
        })
    });

    app.get('/dev/recentReviewList', function(req, res){
        getMostRecentReviews().exec(function(err, result){
            if (err){
                return res.status(400).send();
            }
            res.status(200).json({reviews: result});
        });
    });
    //to add a new product 
    /*app.put('/dev/product', /*add middleware for admin check function(req, res){

    });*/
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated()) {
        return next();
    }

    // fix error code
    res.status(300).send();
}