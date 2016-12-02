var configAuth = require("./auth")
var FacebookStrategy = require("passport-facebook").Strategy;
var uuid = require("uuid")


module.exports = function(passport,knex,app){
	var userId;
	passport.use(new FacebookStrategy({
    clientID: configAuth.facebookAuth.clientID,
    clientSecret: configAuth.facebookAuth.clientSecret,
    callbackURL: configAuth.facebookAuth.callbackURL,
    profileFields: configAuth.facebookAuth.profileFields 
  },
  function(accessToken, refreshToken, profile, cb) {
  	process.nextTick(function () {
  		profile = profile._json
 			knex('user').where({facebookID:profile.id}).then(function(table){
 				if(table.length === 0){
 					knex('user').insert({
 						facebookID:profile.id,
 						firstName: profile.first_name,
 						lastName: profile.last_name,
 						email:profile.email,
 						gender:profile.gender,
 						photolink: profile.picture.data.url
 					})
 					.then(function (user) {
 						console.log("user",user)
 						userId = user[0]
						return cb(null,user)
 					})
 				}else{
 					userId = table[0].id
 					return cb(null,table)
 				}
 			})
  	})

		app.get("/success",function (req,res) {
		  if(!req.cookies['session-id']){
		    var session = uuid();
		    knex('sessions').insert({sessionId:session,userId:userId}).then(function () {
		      res.set('Set-Cookie', 'sessionId=' + session)
		      res.set('Location', "/")
		      res.redirect("/#/general")
		    })
		  }else{
		    res.redirect('/#/general')
		  }
		})


  }
));


}


