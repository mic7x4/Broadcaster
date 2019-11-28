import chai from 'chai';
import { describe, it } from 'mocha';
import chaHttp from 'chai-http';
import app from '../../index';
// import records from '../model/Records';

chai.use(chaHttp);
chai.should();

describe('Test all records Endpoints', () => {
  describe('Test GET /', () => {
    it('It should GET all redflags', (done) => {
      chai
        .request(app)
        .get('/api/v1/redflags')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.a('object');
          done();
        });
    });
    it('It should fail to GET all redFlags', (done) => {
      chai
        .request(app)
        .get('/api/v1/yuyy')
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
    it('It should return a redflag of given ID', (done) => {
      chai
        .request(app)
        .get('/api/v1/redflags/1')
        .end((err, res) => {
          res.body.should.have.property('message');
          done();
        });
    });
    it('should return 404 when  specified property is not found!', (done) => {
      chai
        .request(app)
        .get('/api/v1/redflags/100')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('message').be.a('string');
          res.body.should.have
            .property('message')
            .eql('Record with that ID is not found');
          done();
        });
    });
  });
});
