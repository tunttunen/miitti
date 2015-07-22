/**
 * Miitti
 * Minimalistic event scheduling app built with node.js, mongoose and react.
 *
 */
var express = require('express');
var app = express();
var db = require('./api/shared/database/mongoose-service.js');


// API server and database

db.connection.once('open', function() {
    var port = 3000;

    app.listen(port, function(error) {
        if (error) {
            console.error('Error when initializing server.');
        }

        console.log('Miitti started...');
        console.log('  Use API at: "http://localhost:' + port + '/api/v1/"');
        console.log('  Use CTRL+C to quit.');
    });

    // API middleware & routes

    var api = require('./api');

    app.use('/api', api);
});


module.exports = app;
