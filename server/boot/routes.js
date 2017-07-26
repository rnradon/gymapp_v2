
var dsConfig = require('../datasources.json');
var path = require('path');

module.exports = function(app) {
  var User = app.models.user;

  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');
  app.set('views', path.join(__dirname, 'views'));



    //log a user in
  app.post('/login', function(req, res) {
    User.login({
      email: req.body.email,
      password: req.body.password
    }, 'user', function(err, token) {
  res.render('home', {
        email: req.body.email,
        accessToken: token.id,
        redirectUrl: '/api/users/change-password?access_token=' + token.id
      });
    });
  });

  //log a user out
  app.get('/logout', function(req, res, next) {
    if (!req.accessToken) return res.sendStatus(401);
    User.logout(req.accessToken.id, function(err) {
      if (err) return next(err);
      res.redirect('/');
    });
  });


  

  //send an email with instructions to reset an existing user's password
  app.post('/request-password-reset', function(req, res, next) {

    User.resetPassword({
      email: req.body.email

    }, function(err) {
      if (err) return res.status(401).send(err);

      res.render('response1', {
        title: 'Password reset requested',
        content: 'Check your email for further instructions',
        redirectTo: '/',
        redirectToLinkText: 'Log in'
      });
    });
  });

    //show password reset form
  app.get('/reset-password', function(req, res, next) {
    if (!req.accessToken) return res.sendStatus(401);
    res.render('password-reset', {
      redirectUrl: '/api/users/reset-password?access_token='+
        req.accessToken.id
    });
  });



//   app.post('/api/users/reset-password?access_token=', function(req, res, next) {
//   var User = app.models.user;
//   console.log(req.accessToken)
//   if (!req.accessToken) return res.sendStatus(401);
//   //verify passwords match
//   if (!req.body.password || !req.body.confirmation ||
//     req.body.password !== req.body.confirmation) {
//     return res.sendStatus(400, new Error('Passwords do not match'));
//   }

//   User.findById(req.accessToken.userId, function(err, user) {
//     if (err) return res.sendStatus(404);
//     user.hasPassword(req.body.oldPassword, function(err, isMatch) {
//       if (!isMatch) {
//         return res.sendStatus(401);
//       } else {
//         user.updateAttribute('password', req.body.password, function(err, user) {
//           if (err) return res.sendStatus(404);
//           console.log('> password change request processed successfully');
//           res.status(200).json({msg: 'password change request processed successfully'});
//         });
//       }
//     });
//   });
// });

 };


