/**
 * Event controller
 *
 */
var express = require('express');
var router = express.Router();
var eventService = require('./event-service.js');


/**
 * Create an event
 *
 */
router.post('/', function(req, res) {
    eventService.create(req.body, function(error, eventId) {
        if (error) {
            res.status(404).json(data);
            return console.error(error.stack);
        }

        res.status(201).json(eventId);
    });
});


/**
 * Remove an event.
 * TODO: check the status codes and responses
 */
router.delete('/:id', function(req, res) {
    eventService.delete(req.params.id, function(error, data) {
        if (error) {
            var msg = 'Failed to remove the event with id ' + req.params.id;
            res.status(500).json({ error: msg });
            return console.error(msg);
        }

        res.status(200).json(data);
    });
});


/**
 * List all events
 *
 */
router.get('/list', function(req, res) {
    eventService.getAll(function(error, events) {
        if (error) {
            var msg = 'Could not list all events.';
            res.status(404).json({ error: msg });
            return console.error(msg);
        }

        res.status(200).json(events);
    });
});


/**
 * Show an event
 *
 */
router.get('/:id', function(req, res) {
    eventService.get(req.params.id, function(error, event) {
        if (error) {
            var msg = 'Could not show event with given id: ' + req.params.id;
            res.status(404).json({ error: msg });
            return console.error(msg);
        }

        res.status(200).json(event);
    });
});


/**
 * Add votes to an event
 *
 */
router.post('/:id/vote', function(req, res) {
    var vote = {
        name: req.body.name,
        dates: req.body.votes
    };

    eventService.addVotes(req.params.id, vote, function(error, event) {
        if (error) {
            var msg = 'Could not add vote to event with given id: ' + req.params.id;
            res.status(404).json({ error: msg });
            return console.error(msg);
        }

        console.log('Vote added to event with id ' + req.params.id);
        res.status(201).json(event);
    });
});


/**
 * Delete a single vote from an event
 *
 */
router.delete('/:id/vote', function(req, res) {
    // TODO: implement vote delete
});


/**
 * Show the results of an event
 *
 */
router.get('/:id/results', function(req, res) {
    eventService.getResult(req.params.id, function(error, event) {
        if (error) {
            var msg = 'Could not show event results for given id: ' + req.params.id;
            res.status(404).json({ error: msg });
            return console.error(msg);
        }

        console.log('Showing results for event with id: ' + req.params.id);
        res.status(200).json(event);
    });
});

module.exports = router;
