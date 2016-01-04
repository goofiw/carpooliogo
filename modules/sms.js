require('dotenv').load();
console.log(process.env.TWILIOSID, process.env.TWILIOTOKEN)
var client = require('twilio')(process.env.TWILIOSID, process.env.TWILIOTOKEN);

var sms = {
  sendMessage: function(number, message) {

    client.sms.messages.post({
        to: number,
        from:'+12065390134',
        body: message
    }, function(err, text) {
        if (err) {
          console.log(err)
          throw err;
        } else {
          console.log('You sent: '+ text.body);
          console.log('Current status of this text message is: '+ text.status);
        }
    });
  },

}

module.exports = sms;
