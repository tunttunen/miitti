/**
 * Event service
 * NOTE Service layer to be used instead of the model directly.
 * NOTE Acts as a layer between the model and the controller.
 *
 * @module api/event-service
 */
var express = require('express');
var Event = require('./event-model.js');
var validator = require('validator');
var _ = require('lodash');
var moment = require('moment');


function isValidDate(date) {
    return moment(date, 'YYYY-MM-DD').isValid();
}

/**
 * Create an event.
 *
 * @method create
 * @param {Object} body
 * @param {Function} callback
 */
exports.create = function(body, callback) {
    var hasValidDates = _.every(body.dates, isValidDate);

    if (!hasValidDates) {
        return callback({
            code: 400,
            message: 'Dates contain invalid input.'
        });
    }

    Event.create(body, function(error, event) {
        if (error) {
            callback(error);
            console.error(error);
        }

        console.log('Event created with id ' + event._id);
        return callback(null, {id: event._id});
    });
};


/**
 * Remove event corresponding to the given ID.
 *
 * @method delete
 * @param {String} id
 * @param {Function} callback
 */
exports.delete = function(id, callback) {
    Event.findById(id).remove(function(error) {
        if (error) { return callback(error); }

        var data = {
            message: 'Event successfully removed.',
            id: id
        };

        return callback(null, data);
    });
};


/**
 * Get all events.
 *
 * @method getAll
 * @param {Function} callback
 */
exports.getAll = function(callback) {
    Event.find({}, '_id name', function(error, events) {
        if (error) { return callback(error); }

        var data = {
            events: events
        };

        return callback(null, data);
    });
};


/**
 * Get an event according to the given ID.
 *
 * @method get
 * @param {String} id
 * @param {Function} callback
 */
exports.get = function(id, callback) {
    Event.findById(id, '_id name dates votes', function(error, event) {
        if (error) { return callback(error); }

        return callback(null, event);
    });
};


/**
 * Add new votes to an event.
 *
 * @method addVotes
 * @param {String} id
 * @param {Object} vote
 * @param {Function} callback
 */
exports.addVotes = function(id, vote, callback) {
    Event.findById(id, '_id name dates votes', function(error, event) {
        if (error) { return callback(error); }

        _.forEach(vote.dates, function(date) {
            var foundIndex = _.findIndex(event.votes, { 'date': date });

            // If vote date exists, add voter name if it does not exist
            if (foundIndex >= 0) {
                if (!_.includes(event.votes[foundIndex].people, vote.name)) {
                    event.votes[foundIndex].people.push(vote.name);
                }
            }
            // Add new vote item when it does not exist
            else {
                event.votes.push({
                    date: date,
                    people: [vote.name]
                });
            }
        });

        event.save(callback);
    })
};


exports.removeVote = function(id, callback) {
    if (error) { return callback(error); }

    // TODO: implement the removal of one vote according to participant name
};


/**
 * Get the most suitable event(s) according to votes that users have given.
 *
 * @method getResult
 * @param {String} id
 * @param {Function} callback
 */
exports.getResult = function(id, callback) {
    Event.findById(id, '_id name votes', function(error, event) {
        if (error) {
            return callback(error, event);
        }

        // Group event votes by people count to get events with most votes
        var votesByPeopleCount = _.groupBy(event.votes, function(vote) {
            return vote.people.length;
        });

        // Convert Mongoose model to object and add suitableDates array
        var eventObj = event.toObject();
        eventObj.suitableVotes = _.max(votesByPeopleCount, function(group, index) {
            return index;
        });

        // Remove votes array from JSON response
        delete eventObj.votes;

        return callback(null, eventObj);
    });
};
