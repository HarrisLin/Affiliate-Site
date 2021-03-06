var { saveShippingInfo, getShippingInfo } = require('../models/profile')
var { userReviews } = require ('../models/productHelper');

module.exports = function(app, passport) {

    //Unused
    app.get('/dev', function(req, res) {
        res.json({
            express:"hello wordly"
        });
    });

    // process the login form
    app.post('/dev/login', function(req, res, next){
        passport.authenticate('local-login', function(err, user, info) {
            if(err) { return next(err); }
            if(!user) {
                return res.status(400).json({
                    message: "Failed to log in"
                });
            }

            req.logIn(user, function(error) {
                if (error) return next(error);

                res.header('Access-Control-Allow-Credentials', true);
                res.json({
                    message: "Successful login"
                }).send();
            });

        })(req, res, next);
    });

    // process the signup form
    app.post('/dev/signup', function(req, res, next){
        passport.authenticate('local-signup', function(err, user, info) {
            if(err) { return next(err); }
            if(!user) {
                return res.status(400).json({
                    message: "Email already taken"
                });
            }

            res.status(200).json({
                message: "Signup successful"
            })
        })(req, res, next);
    });

    app.post('/dev/update-profile', isLoggedIn, function(req, res){
        if(!saveShippingInfo(req.user.local.email, req.body)) {
            return res.status(400).json({
                message: "Profile update failed"
            }).send();
        }
        res.status(200).json({
            message: "Profile update successful"
        }).send();
    });

    //gets profile info
    app.get('/dev/profile', isLoggedIn, function(req, res) {
        getShippingInfo(req.user.local.email).then(function(info){
            res.json({
                email: req.user.local.email,
                shipping: info,
            });
        });        
    });

    app.get('/dev/getOwnReviews', isLoggedIn, function(req, res) {
        userReviews(req.user.local.email).exec(function(err, result){
            if (err) return res.status(400).send();
            console.log(result);
            return res.status(200).json({
                reviews: result
            });
        })
    });

    app.get('/dev/logout', function(req, res) {
        console.log(req.session.id)
        req.session.destroy(function (err) {
            if(err) return res.status(400).json({ message: 'Error Logging Out'})
            //probably dont need dis, just send status 200
            res.send();
        });
    });

    //checks whether a user is logged in 
    app.get('/dev/loggedin', isLoggedIn, function(req, res){
        res.status(200).send();
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated()) {
        return next();
    }

    res.status(400).json({message: 'Failed to Authenticate'});
}