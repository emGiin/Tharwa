// const request = require('supertest');
// const httpStatus = require('http-status');
const { expect } = require('chai');
// const sinon = require('sinon');
// const app = require('../../../index');
// const User = require('../../models/user.model');
// const RefreshToken = require('../../models/refreshToken.model');
// const authProviders = require('../../services/authProviders');

const AdminSchema = require('../../schemas/Admin');

// const sandbox = sinon.createSandbox();

const admin = new AdminSchema({
  email: 'admin@tharwa.com',
  password: 'admin',
  firstName: 'fname',
  lastName: 'lname',
  phone: '0660000000',
});

const falseAdmin = new AdminSchema({
  email: 'admin@tharwa.com',
  password: 'admina',
  firstName: 'fname',
  lastName: 'lname',
  phone: '0660000000',
});

describe('AdminSchema', () => {
  it('should have a function login', () => {
    expect(AdminSchema.login).to.be.a('function');
  });

  it('should login when credentials are correct', (done) => {
    // try {
    //   const result = await AdminSchema.login(admin.email, admin.password);
    //   expect(result.canLogin).to.equal(true);
    //   // expect(result).to.have.property('admin');
    //   done();
    // } catch (e) { done(e); }
    // try {
    //   AdminSchema.login(admin.email, admin.password).then((response) => {
    //     expect(response).to.equal(' ');
    //   });
    // } catch (error) {
    //   done(error);
    // }
  });
});
