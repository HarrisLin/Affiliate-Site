const cors         = require('cors')
const express      = require('express')

const MongoClient  = require('mongodb').MongoClient
const mongoose     = require('mongoose')

const passport     = require('passport')
const flash        = require('connect-flash')

const morgan       = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const session      = require('express-session');

const MongoStore = require('connect-mongo')(session)

const app = express()

var url = 'mongodb://localhost/accounts'

mongoose.connect(process.env.MONGODB_URI || url, function(err) {
	if(err) console.log("Failed to connect to db");
	else console.log("DB Connection Success");
});
const db = mongoose.connection
const dbstore = new MongoStore({
							  mongooseConnection: db,
							  clear_interval: 1800,
							});
// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser('meowmeowmeow')); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({ extended: true })); // get information from html forms
app.use(bodyParser.json()); // get information from html forms
app.use(cors())	// enable cors
app.options('*', cors())

// required for passport
require('./config/passport')(passport); // pass passport for configuration
app.enable('trust proxy')
app.use(session({
	secret: 'meowmeowmeow',
	resave: true,
	saveUninitialized: true,
	proxy: true,
	store: dbstore,
	cookie: {maxAge: 60 * 60 * 1000},
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

app.use('/media', express.static(__dirname + '/media'));
app.use('/', express.static(__dirname + '/client/thc-junct/build'));

require('./routes/accounts.js')(app, passport);
require('./routes/products.js')(app);

const port = process.env.PORT || 8080;
console.log("porty server: " + port)
app.listen(port, () => console.log("Listening on port: " + port));