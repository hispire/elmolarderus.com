var express = require('express');
var router = express.Router();
var email = require('.././js/email.js');


router.route('/')
.post(function (req, res) {
  req.assert('name', 'Nombre obligatorio').notEmpty();
  req.assert('email', 'Email valido necesario').isEmail();
  req.assert('message', 'Por favor escribe un mensaje').len(5, 1000);
  //var mappedErrors = req.validationErrors(true);
  var valErrors = req.validationErrors();
  var dataForm = {};
  console.log(valErrors);
  //construct the email sending module
  
  //send Email
  if(!valErrors) {
    email.smtpConfig.sendMail(email.mailOptions(req.body.email, req.body.name, req.body.subject, req.body.message), function (error, response) {
      //Email not sent
      if (error) {
        req.flash('error', 'Fallo al enviar el formulario!');
	res.redirect('/#contact');
	console.log(error);
      }
     //email sent successfully
      else {
        req.flash('info', 'Formulario enviado, Gracias! Responderemos lo antes posible.');
        res.redirect('/#contact');

    //res.end("Email sent successfully");
      }
    });
  }
  else {
    dataForm.name = req.body.name;
    dataForm.email = req.body.email;
    //app.locals.msg = msg;
    req.flash('dataForm', dataForm);
    req.flash('valErrors', valErrors);
    res.redirect('/#contact-form');
    
  }
});


module.exports = router;