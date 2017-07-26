'use strict';

module.exports = function(Gymuser) {

	Gymuser.sendEmail = function(cb) {
    Gymuser.app.models.Email.send({
      to: 'rnradon17@gmail.com',
      from: 'appbiometric@gmail.com',
      subject: 'TEST MAIL',
      text: 'LETS SEE'
      // html: 'my <em>html</em>'
    }, function(err, mail) {
      console.log('email sent!');
      cb(err);
    });
  }

    Gymuser.remoteMethod(
    'sendEmail', {
      http: {
        path: '/sendEmail',
        verb: 'get'
      },
      returns: {
        // arg: 'sendEmail',
        // type: 'string'
        root :true
      }
      // accepts: [
      //           { arg: 'id', type: 'string', required: true },
      //           ]
    }
  );

};
