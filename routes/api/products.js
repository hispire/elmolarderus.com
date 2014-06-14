var express = require('express');
var router = express.Router();
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({uploadDir:'./public/images'});
var requireUser = require('../.././js/cms-helpers').requireUser;
var renameFile = require('../.././js/cms-helpers').renameFile;
var deleteFile = require('../.././js/cms-helpers').deleteFile;
var ProductModel = require('../.././js/mongoose').ProductModel; 
var flash = require('express-flash');
var expressValidator = require('express-validator');
var fs = require('fs');

/**
 * Products REST API
 */
router.route('/')
.get(requireUser("admin"), function(req, res){
  return ProductModel.find(function(err, products) {
    if(err) {
      return console.log(err);
    }
    res.locals.products = products;
    //res.send(products);
    res.render('products');
  
  }); 

})
.post(requireUser("admin"), multipartMiddleware, function(req, res) {
    // get the temporary location of the file
    var tmp_path = req.files.file.path;
    if(req.body._method === 'put') {
      return ProductModel.findById(req.body.product_id, function(err, product) {
	var notes = [];
	if(req.body.color || req.body.aroma || req.body.mouth) {
	  notes = [{color: req.body.color, aroma: req.body.aroma, mouth: req.body.mouth}]; 
	}
	if(req.files.file.originalFilename != '') {
	  deleteFile('./public' + product.images[0].url);
          var target_path = './public/images/' + req.files.file.name;
          var url_img = '/images/' + req.files.file.name;
          // move the file from the temporary location to the intended location
          renameFile(tmp_path, target_path, function(err, msg) {
            if (err) {
              res.locals.err = 'An error ocurred! Sorry try again' + err;
              res.redirect('/admin/products');      
            } else {
	      product.images = [{kind: "detail", url: url_img}];
	      product.name = req.body.name,
	      product.year = req.body.year,
	      product.description = req.body.description,
	      product.notes = notes;
	      product.save(function(err,product){
	        if (err) {
                  console.log(err);
	          return res.send(err);
	        } else {
	          res.redirect('/admin/products');
	          }
              })
	    }
	  })
	} else {
	  // delete tmp images if there is an error validating the form
          deleteFile(tmp_path);
	  product.name = req.body.name,
	  product.year = req.body.year,
	  product.description = req.body.description,
	  product.notes = notes;
	  product.save(function(err,product){
	    if (err) {
              console.log(err);
	      return res.send(err);
	    } else {
	      res.redirect('/admin/products');
	      }
          })
	}
      })
    } else {
    req.assert('name', 'Nombre obligatorio').notEmpty();
    req.assert('description', 'Por favor escribe un mensaje').len(5, 1000);
    var valErrors = req.validationErrors();
    var dataForm = {};
 
    // check if the filename is empty so the user didn't upload an image 
    if(req.files.file.originalFilename === '') {
      if(valErrors){  
        valErrors.push({param: 'file', msg: 'Imagen necesaria'});
      } else {
        valErrors = {param: 'file', msg: 'Imagen necesaria'};
      }
    }
    if(valErrors) {
      
      // delete tmp images if there is an error validating the form
      deleteFile(tmp_path);
      dataForm.name = req.body.name;
      dataForm.year = req.body.year;
      dataForm.description = req.body.description;
      dataForm.color = req.body.color;
      dataForm.aroma = req.body.aroma;
      dataForm.mouth = req.body.mouth;
      req.flash('dataForm', dataForm);
      req.flash('valErrors', valErrors);
    res.redirect('/admin/products/#addProduct');
    } else {
      
      // set where the file should actually exists - in this case it is in the "images" directory
      var target_path = './public/images/' + req.files.file.name;
      var url_img = '/images/' + req.files.file.name;
      // move the file from the temporary location to the intended location
      renameFile(tmp_path, target_path, function(err, msg) {
      if (err) {
	
      res.locals.err = 'An error ocurred! Sorry try again' + err;
      res.redirect('/admin/products');
      
      } else {
	
        console.log(msg);
	   
	console.log("POST: ");
	console.log(req.body);
	var query = {name: req.body.name, year : req.body.year}; 
	var notes = [];
	if(req.body.color || req.body.aroma || req.body.mouth) {
	  notes = [{color: req.body.color, aroma: req.body.aroma, mouth: req.body.mouth}]; 
	}
	var product = new ProductModel({
	name : req.body.name,
	year : req.body.year,
	description : req.body.description,
	images: [{kind: "detail", url: url_img}],
	notes: notes
	});
	//var categories = req.body.categories; 
	ProductModel.findOne(query, function(err, productname){
	    if (productname) {
	      err = 'The product already exists';
	      return res.send(err);
	    } else { 
	      product.save(function(err,product){
		if (err) {
		  console.log(err);
		  return res.send(err);
		} else {
		  res.redirect('/admin/products');
	    
	    // send response to cath it with javascript in client side AJAX controller)
	    //retStatus = 'Success';
	    //res.send({
	      //retStatus : retStatus,
	      //redirectTo: '/admin/products'
	    //});
		}
	      });
	    }
	});
      } 
    });
  }
    }
})

router.get('/:id', requireUser("admin"), function(req, res) {
  return ProductModel.findById(req.params.id, function(err, product) {
    if(!product) {
      console.log('no product with taht id');
      return res.send('No product with that id');
    }
    if(err) {
      return console.log(err);
    }
    res.locals.product = product;
    //res.send(products);
    res.render('product');
  }); 
})

router.delete('/:id', requireUser("admin"), function(req, res) {
  return ProductModel.findById(req.params.id, function(err, product) {
    if(!product) {
      console.log('no product with taht id');
      return res.send('No product with that id');
    }
    return product.remove(function(err) {
      var img_url = './public' + product.images[0].url;
      fs.unlink(img_url, function(err) {
        if(err) throw err;
      });
      if(err) {
        console.log(err); 
        res.send({error: err});
      }
    console.log("removed");
    retStatus = 'Success';
    // res.redirect('/team');
    res.send({
      retStatus : retStatus,
      redirectTo: '/admin/products'
      });
    });
  }); 
});

module.exports = router;
