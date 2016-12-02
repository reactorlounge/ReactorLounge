var morgan = require('morgan');
var bodyParser = require('body-parser');
var passport = require('passport')
var path = require('path')
var cookieParser = require("cookie-parser")


module.exports = function (app, express) {
	app.use(morgan('dev'));
	app.use(bodyParser.urlencoded({extended:true}));
	app.use(bodyParser.json());
	// app.use(express.static(__dirname + '/../../client'))
	app.use(cookieParser())
	app.use(passport.initialize());
	app.use(express.static(path.join(__dirname,'../../client/')))
	app.get('/auth/facebook',passport.authenticate('facebook',{scope:['email']}));
	app.get('/auth/facebook/callback',passport.authenticate('facebook',{successRedirect: '/success',failureRedirect: '/fail',session:false}));
};
