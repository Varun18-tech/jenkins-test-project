const request = require('supertest');
const assert = require('assert');
const app = require('../app.js');

describe('API Endpoint Tests', function() {
  it('should return "Hello, Jenkins!" from the root endpoint', function(done) {
    request(app)
      .get('/')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        assert.strictEqual(res.text, 'Hello, Jenkins!');
        done();
      });
  });

  after(function(done) {
    app.close(done);
  });
});
