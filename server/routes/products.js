var { saveShippingInfo, getShippingInfo } = require('../models/profile')

module.exports = function(app) {

    //Homepage
    app.get('/dev', function(req, res) {
        res.json({
            express:"hello wordly"
        });
        //res.render('index.ejs'); // load the index.ejs file
    });

    //Login form
    /*app.get('/dev/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') }); 
    });*/

    // process the login form
    app.post('/dev/login', function(req, res, next){
        passport.authenticate('local-login', function(err, user, info) {
            if(err) { return next(err); }
            if(!user) {
                return res.json({
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

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/dev/signup', function(req, res) {
        res.json({
            success:"success"
        });
        // render the page and pass in any flash data if it exists
        //res.render('signup.ejs', { message: req.flash('signupMessage') });
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
        console.log(req.body)
        if(!saveShippingInfo(req.user.local.email, req.body)) {
            return res.status(400).json({
                message: "Profile update failed"
            }).send();
        }
        res.status(200).json({
            message: "Profile update successful"
        }).send();
    });

    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/dev/profile', isLoggedIn, function(req, res) {
        getShippingInfo(req.user.local.email).then(function(info){
            res.json({
                email: req.user.local.email,
                shipping: info,
            });
        });        
    });

    //fix log out, current doesnt delete all related sessions, so doesnt actually log out 
    app.get('/dev/logout', function(req, res) {
        console.log(req.session.id)
        req.session.destroy(function (err) {
            if(err) return res.status(400).json({ message: 'Error Logging Out'})
            //probably dont need dis, just send status 200
            res.send();
        });
    });

    app.get('/dev/loggedin', isLoggedIn, function(req, res){
        console.log("Here")
        res.status(200).send();
    });
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