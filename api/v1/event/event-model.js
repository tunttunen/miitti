/**
 * Event model (mongoose)
 *
 */
var mongoose = require('mongoose');

var eventSchema = new mongoose.Schema({
    name: String,
    dates: [String],
    votes: [{
        date: String,
        people: [String]
    }]
});

module.exports = mongoose.model('Event', eventSchema);