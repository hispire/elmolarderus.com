var UserModel = require('.././js/mongoose').UserModel;
var fs = require('fs');

// This middleware checks if the user is logged in and sets
// req.user and res.locals.user appropriately if so.
var checkIfLoggedIn = function(req, res, next){
  if (req.session.username) {
    UserModel.findOne({username: req.session.username}).populate('role').exec(function(err, user){
      if (user) {
        // set a 'user' property on req
        // so that the 'requireUser' middleware can check if the user is
        // logged in
        req.user = {
          username: user.username, 
          role: user.role.name
        };
        
        // Set a res.locals variable called 'user' so that it is available
        // to every handlebars template.
        res.locals.user = {
          username: user.username, 
          role: user.role.name
        } ;
      }
      
      next();
    });
  } else {
    next();
  }
}

// This is a middleware that we will use on routes where
// we _require_ that a user is logged in, and have a determinate role such as the /secret url
var requireUser = function(role) {
  return function(req, res, next){
    if (req.user && req.user.role === role) {
      next();
    } 
    else if(!req.user) {
      res.redirect('/admin');
    } else {
      res.status(403);
      res.render('not_allowed');
    }
  }
};

var RoleModel    = require('.././js/mongoose').RoleModel;

// This middelware read the roles in the role collection and return them
var getRoles = function(req, res, next) {
  RoleModel.find(function(err, roles){
    res.locals.roles = roles;
    next();
  })
};

// Rename file and move it to a new location and delete de tmp files

var renameFile  = function(tmp_path, target_path, callback){  
  fs.rename(tmp_path, target_path, function(err) {
       var msg; 
       if (err) {
          //throw err;
          callback(err);
        } 
        // delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
        fs.unlink(tmp_path, function() {
            if (err) {
              //throw err;
              callback(err);
            }
            msg = 'Archivo Subido';
	    callback(err, msg);
        });
    });
}

var deleteFile = function(path) {
  fs.unlink(path, function(err) {
    if(err) throw err;
  });
}

module.exports.requireUser = requireUser;
module.exports.getRoles = getRoles;
module.exports.checkIfLoggedIn = checkIfLoggedIn;
module.exports.renameFile = renameFile;
module.exports.deleteFile = deleteFile;
