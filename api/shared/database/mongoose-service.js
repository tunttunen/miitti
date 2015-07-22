/**
 * Database service
 * Provides a database api (mongoose)
 *
 */
var mongoose = require('mongoose');
var dbConfig = require('../../config/database.js');


var db = mongoose.connect(dbConfig.url);

db.connection.on('error', function(error) {
    console.error('Database connection error:');
    console.error(' ', error);
    console.log('Exiting app.');
    process.exit(0);
});

db.connection.on('disconnected', function() {
    console.log('Database connection closed.');
});

db.connection.on('disconnecting', function() {
    console.log('Database connection closing...')
});

db.connection.on('open', function() {
    console.log("Database connection established.");
});

module.exports = db;

