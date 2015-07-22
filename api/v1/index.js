/**
 * API router (version 1)
 *
 */
var express = require('express');
var router = express.Router();
var marked = require('marked');
var fs = require('fs');


var event = require('./event/event-controller.js');
router.use('/event', event);

// Show API reference document when accessing v1 root URL
router.get('/', function(req, res) {
    var filePath = __dirname + '/docs/reference.md';

    try {
        var file = fs.readFileSync(filePath, 'utf8');
        res.send(marked(file));
    }
    catch (error) {
        if (error.code === 'ENOENT') {
            console.error('File not found at ' + filePath);
            res.send('API reference document is missing.');
        }
        else {
            throw error;
        }
    }
});

module.exports = router;
