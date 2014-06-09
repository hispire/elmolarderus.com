var express = require('express');
var router = express.Router();
var UserModel = require('.././js/mongoose').UserModel; 


// This finds a user matching the username and password that
// were given.
function authenticateUser(username, password, callback){
  
  UserModel.findOne({username: username}, function(err, user){
    if (err) {
      return callback(err, null);
    }
    if (!user) {
      return callback(null, null);
    }
    if (!user.checkPassword(password)) {
      return callback(null, null);
    } else {
      return callback(null, user);
    }
  });
}



router.route('/')
.get(function(req, res, next) {
  if(req.session.username) {
    res.render('home-cms');
  } else {
  res.render('login');
  }
})
.post(function(req, res){
  // These two variables come from the form on
  // the views/login.hbs page
  var username = req.body.username;
  var password = req.body.password;
  
  authenticateUser(username, password, function(err, user){
    if (user) {
      // This way subsequent requests will know the user is logged in.
      req.session.username = user.username;
      res.redirect('/admin');
    } else {
      res.render('login', {badCredentials: true});
    }
  });
});


module.exports = router;