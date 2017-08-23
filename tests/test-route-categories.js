var request = require('supertest'),
  app = require('../server'),
  sinon = require('sinon'),
  Category = require('../models/category'),
  should = require('chai').should();

require('sinon-mongoose');

describe('testing an categories route', function() {
  afterEach(function() {
    Category.find.restore();
  });

  it('should return status 503 since database collection is empty', function(done) {
    sinon.mock(Category)
      .expects('find').withArgs({})
      .chain('exec')
      .resolves([]);

    request(app)
      .get('/api/categories')
      .expect(503)
      .end(function(err, res) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });

  it('should return status 200', function(done) {
    sinon.mock(Category)
      .expects('find').withArgs({})
      .chain('exec')
      .resolves([
        {name: 'ImageNet 2011 Fall Release', size: 32326},
        {name: 'ImageNet 2011 Fall Release > plant, flora, plant life', size: 4486},
        {name: 'ImageNet 2011 Fall Release > plant, flora, plant life > phytoplankton', size: 2},
        {name: 'ImageNet 2011 Fall Release > plant, flora, plant life > phytoplankton > planktonic algae', size: 0},
        {name: 'ImageNet 2011 Fall Release > plant, flora, plant life > phytoplankton > diatom', size: 0},
        {name: 'ImageNet 2011 Fall Release > plant, flora, plant life > microflora', size: 0}
      ]);

    request(app)
      .get('/api/categories')
      .expect(200)
      .end(function(err, res) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });

  it('should return status 404 when unknown enrpoint is hit', function(done) {
    sinon.mock(Category).expects('find');
    request(app)
      .get('/api/foo')
      .expect(404)
      .end(function(err, res) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });
});
