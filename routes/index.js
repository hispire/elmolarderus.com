var express = require('express');
var router = express.Router();
var ProductModel = require('.././js/mongoose').ProductModel; 

function renderpage (pagetemplate, pagetitle) {
  return function(req, res) {
    res.render(pagetemplate, {title: pagetitle});
  };
};

router.get('/', function(req, res, next) {
    ProductModel.find(function(err, products){
    res.render('content/index', {products:products});  
  })
  
}) 

router.get('/lang/:locale', function(req, res, next) {
  res.cookie('locale', req.params.locale);
  res.redirect('/'); 
});
module.exports = router;
