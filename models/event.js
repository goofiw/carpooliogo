
function Event(data) {
  this.url = data.url;
  this.name = data.name;
  this.id = data.id;
  this.creator = data.creator;
  this.rides = data.rides || [];
  this.createdAt = data.createdAt || new Date();
} 

Event.prototype.getDetails = function() {
  return {
    url: this.url,
    name: this.name,
    id: this.id,
    creator: this.creator,
    rides: this.rides,
    createdAt: this.createdAt
  }
}


module.exports = Event;