// 'use strict';

// var loopback = require('loopback');
// var boot = require('loopback-boot');

// var app = module.exports = loopback();

// app.start = function() {
//   // start the web server
//   return app.listen( function() {
//     app.emit('started');
//     var baseUrl = app.get('url').replace(/\/$/, '');
//     console.log('Web server listening at: %s', baseUrl);
//     if (app.get('loopback-component-explorer')) {
//       var explorerPath = app.get('loopback-component-explorer').mountPath;
//       console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
//     }
//   });
// };


// // Bootstrap the application, configure models, datasources and middleware.
// // Sub-apps like REST API are mounted via boot scripts.
// boot(app, __dirname, function(err) {
//   if (err) throw err;

//   // start the server if `$ node server.js`
//   if (require.main === module)
//     app.use(loopback.token());
//     // app.use('/js', loopback.static('client'));
// // app.use('/dist', loopback.static(__dirname + '/../dist'));
// // app.use('/css', loopback.static(__dirname + '/css'));


// // app.all('/*', function(req, res, next) {
// //     // Just send the index.html for other files to support HTML5Mode
// //     res.sendFile('index.html', { root: 'client' });
// // });
//     app.start();
// });


// // var loopback = require('loopback');
// // var boot = require('loopback-boot');
// // var path = require('path');

// // var app = module.exports = loopback();

// // // boot scripts mount components like REST API
// // boot(app, __dirname);

// // // https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions#how-to-configure-your-server-to-work-with-html5mode
// // app.all('/*', function(req, res, next) {
// //   // Just send the index.html for other files to support HTML5Mode
// //   res.sendFile('index.html', { root: path.resolve(__dirname, '..', 'client') });
// // });

// // app.start = function() {
// //   'use strict';
// //   // start the web server
// //   return app.listen(function() {
// //     app.emit('started');
// //     console.log('Web server listening at: %s', app.get('url'));
// //   });
// // };

// // // start the server if `$ node server.js`
// // if (require.main === module) {
// //   app.start();
// // }










var loopback = require('loopback');
var boot = require('loopback-boot');
var path = require('path');
var bodyParser = require('body-parser');

var app = module.exports = loopback();

// app.use(loopback.token({
//     model: app.models.accessToken
// }));


// configure view handler
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// configure body parser
app.use(bodyParser.urlencoded({extended: true}));

app.use(loopback.token());

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});