/**
 * API tests
 * Writing tests for the first time! Such work, in much progress...
 *
 */

var app = require('../app.js');
var api = require('../api');
var request = require('supertest');
var should = require('chai').should();

describe('Event', function() {
    describe('endpoint /list', function() {
        it('should respond with a list of events', function(done) {
            request(app)
                .get('/api/v1/event/list')
                .expect(200) // TODO: no idea why the returned status is 404...
                .end(function(err, res) {
                    if (err) throw err;
                    res.body.should.have.property('events');
                    done();
                });
        });
    });
});
