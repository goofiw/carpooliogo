'use strict'
var monk = require('monk');
var wrap = require('co-monk');
var db = monk('localhost/testCarpool');
var co = require('co');

var sms = require('../modules/sms');
var events = wrap(db.get('events'));

var Event = require('../models/event.js');

co(function * () {
  var events = yield events.find({});
});

function *createEvent(next) {
  var eventData = this.request.body;
  console.log(this.request.body);
  var oldEvent = yield events.find({url: eventData.url})
  if(oldEvent.length === 1) {
    console.log('tried creating event but already event')
    this.body = {error: 'exists'};
  } else {
    var numberEvents = yield events.count({});
    eventData.id = numberEvents + 1;
    var newEvent = new Event(eventData);
    yield events.insert(newEvent.getDetails());
    console.log('event after insert', newEvent);
    this.body = yield events.findOne({url: eventData.url});
  }
}

function *getEvents(next) {
  this.body = yield events.find({});
}

module.exports = {
  createEvent,
  getEvents
}