import chai from 'chai';
import { describe, it } from 'mocha';
import chaHttp from 'chai-http';
import app from '../../index';

chai.use(chaHttp);
chai.should();
const { expect } = chai;

const newUser = {
  firstname: 'test',
  lastname: 'testuser',
  email: 'test@gmail.com',
  password: '1234567890',
  phoneNumber: '078-434-6576',
  username: 'test',
};
const badUser = {
  firstname: 123,
  lastname: 1,
  email: '.com',
  password: '123',
  phoneNumber: '08',
};
const correctLoginUser = {
  email: 'test@gmail.com',
  password: '1234567890',
};
const incorrectLoginUser = {
  email: '123.com',
  password: '123',
};

describe('Test All user Endpoints', () => {
  describe('Test POST /auth', () => {
    it('It shoud create new User ', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(newUser)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          done();
        });
    });
    it('It shoud fail to  create new User ', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(badUser)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
    it('It should Sign the user in ', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send(correctLoginUser)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.have.property('status');
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('message');
          expect(res.body).to.have.property('message').equals('User is successfully logged in');

          done();
        });
    });
    it('It should fail to  Sign the user in ', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send(incorrectLoginUser)
        .end((err, res) => {
          res.should.have.status(400);
          res.should.have.property('status');
          res.body.should.have.property('error');
          done();
        });
    });
  });
});
