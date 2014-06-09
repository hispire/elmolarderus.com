var express = require('express');
var app = express();
var path = require('path');
var stylus = require('stylus');
var blocks = require('./js/class-blocks.js');
var config  = require('./js/config');
var log = require('./js/log')(module);
var csrf = require('csurf');
var expressSession = require('express-session');
var flash = require('express-flash');
var expressValidator = require('express-validator');
var i18n = require("i18n");
var MongoStore = require('connect-mongo')(expressSession);
var errorHandler = require('express-error-handler');
var UserModel = require('./js/mongoose').UserModel;
var ProductModel    = require('./js/mongoose').ProductModel;
var mongoose = require('mongoose');

//helpers
var requireUser = require('./js/cms-helpers').requireUser;
var getRoles = require('./js/cms-helpers').getRoles;
var checkIfLoggedIn = require('./js/cms-helpers').checkIfLoggedIn;

// routes
var index = require('./routes/index');
var contact = require('./routes/contact');
var login = require('./routes/login');
var logout = require('./routes/logout');
var products = require('./routes/api/products');

// multilingual module config
i18n.configure({
  locales: ['es', 'en'],
  defaultLocale: 'es',
  updateFiles: false,
  cookie: 'locale',
  directory: __dirname + '/locales'
});

// all environments
app.set('port', process.env.PORT || 60000);
app.set('views', path.join(__dirname, 'views'));


//use JADE view render engine
app.set('view engine', 'jade');

function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .set('compress', false)
    //.use(breakpoint())
    //.import('at-breakpoint');
}

//Load class-blocks, avaiable everywhere
app.locals.blocks = blocks.blocks;

app.use(stylus.middleware({
    src: path.join(__dirname, 'public')
  , compile: compile
}));
app.use(express.static(path.join(__dirname, 'public')));


var handler = errorHandler({
    handlers: {
      '404': function err404() {
         res.render('404');
      }
    }
  });

app.use(expressValidator());
app.use(flash());
// Use this so we can get access to `req.body` in our posted login
// and signup forms.
app.use( require('body-parser')() );

// We need to use cookies for sessions, so use the cookie parser middleware
app.use( require('cookie-parser')() );

// multilingual module init
app.use(i18n.init)

var HOUR = 3600000;

app.use( expressSession({
  secret: '2gyrK7gDH2xU7CrUFy8S#$uhTD0KZA9w7wEnZTr4GY',
  cookie: {maxAge: HOUR},
  rolling: true,
  store: new MongoStore({
    url: config.get('mongoose:uri')
  })
}));

//app.use(csrf());




// We must use this middleware _after_ the expressSession middleware,
// because checkIfLoggedIn checks the `req.session.username` value,
// which will not be available until after the session middleware runs.
app.use(checkIfLoggedIn);

// This creates a new user and calls the callback with
// two arguments: err, if there was an error, and the created user
// if a new user was created.
//
// Possible errors: the passwords are not the same, and a user
// with that username already exists.
function createUser(username, password, password_confirmation, role, callback){
  if (password !== password_confirmation) {
    var err = 'The passwords do not match';
    callback(err);
  } else {
    var query = {username: username};
    //console.log(categories);
    var user = new UserModel({
      username: username,
      password: password,
      role: role

    });
    
    // make sure this username does not exist already
    UserModel.findOne(query, function(err, username){
      if (username) {
        err = 'The username you entered already exists';
        callback(err);
      } else {
        // create the new user
        user.save(function(err,username){
          callback(err,username);
        });
      }
    });
  }
}

function updateUser(obj_id, username, password, password_confirmation, callback){
  if (password !== password_confirmation) {
    var err = 'The passwords do not match';
    callback(err);
  } else {
    return UserModel.findById(obj_id, function(err, user) {
      var salt       = createSalt();
      var hashedPassword = createHash(password + salt);
      if(username && password) {
        user.username = username;
        user.salt = salt;
        user.hashedPassword = hashedPassword;
        console.log('all info updated');
      } else if(username) {
         user.username = username;
        console.log('user updated');

      } else if(password) {
        user.salt = salt;
        user.hashedPassword = hashedPassword;
        console.log('pass updated');
     } 
      return user.save(function(err,user){
        callback(err,user);
          });
    });
  }
};




app.use('/', index);

// set a cookie to requested locale
/*app.get('/:locale', function (req, res) {
  res.cookie('locale', req.params.locale);
  res.redirect('/admin');
});*/


app.use('/contact', contact);

app.use('/admin', login);

app.use('/logout', logout);

app.use('/admin/products', products);

app.get('/not_allowed', function(req, res){
  res.render('not_allowed');
});



// The /secret url includes the requireUser middleware.
/*app.get('/secret', requireUser("admin"), function(req, res){
  res.render('secret');
});*/

/*app.get('/signup',getRoles, function(req,res){
    res.render('signup');
});



app.post('/signup',getRoles, function(req, res){
  // The 3 variables below all come from the form
  // in views/signup.hbs
  var username = req.body.username;
  var password = req.body.password;
  var password_confirmation = req.body.password_confirmation;
  var role = req.body.role;
  
  createUser(username, password, password_confirmation, role, function(err, user){
    if (err) {
      res.render('signup', {error: err});
    } else {
      
      // This way subsequent requests will know the user is logged in.
      req.session.username = user.username;
      
      res.redirect('/');  
    }
  });
});*/

app.use(function(req, res, next){
  res.status(404);

  // respond with html page
  if (req.accepts('html')) {
    res.render('404', { url: req.url });
    return;
  }
});

/**
 * USERS REST API
 */
/*
app.get('/api/users', function(req, res){
  return UserModel.find({}, 'username role', function(err, users) {
    if(err) {
      return console.log(err);
    }
    return res.send(users);
  
  }); 

});

app.post('/api/users', function(req, res) {
  console.log("POST: ");
  console.log(req.body);
  var username = req.body.username;
  var password = req.body.password;
  var password_confirmation = req.body.password_confirmation;
  //var categories = req.body.categories; 
  createUser(username, password, password_confirmation, function(err, user){
    if (err) {
      console.log(err);
      return res.send(err);
    } else {
      console.log('created');
      return res.send(user);
    }
  }); 
});

app.get('/api/users/:id', function(req, res) {
  return UserModel.findById(req.params.id, function(err, user) {
    if(err) {
      console.log(err);
      return res.send(err);
    }
    return res.send(user)
  });

});

app.put('/api/users/:id', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  var password_confirmation = req.body.password_confirmation; 
  var obj_id = req.params.id;
  updateUser(obj_id, username, password, password_confirmation, function(err, user){
    if (err) {
      return console.log(err);
    } else {
      console.log('updated');
      return res.send(user);
    }
  }); 

});

app.delete('/api/users/:id', requireUser("admin"), function(req, res) {
  return UserModel.findById(req.params.id, function(err, user) {
    if(!user) {
      console.log('no user with taht id');
      return res.send('No user with that id');
    }
    return user.remove(function(err) {
    if(err) {
      console.log(err); 
      res.send(err);
    }
    console.log("removed");
    res.send('user removed');
    });
  }); 
});

app.delete('/api/users', function(req, res) {
  UserModel.remove(function(err) {
    if(err) {
      console.log(err);
      return res.send(err);
    }
    console.log("all items removed");
    return res.send("all items removed");
  
  });

});
*/




app.listen(app.get('port'), function(){
  log.info('Server is listening on port: '+app.get('port'));
  });  
