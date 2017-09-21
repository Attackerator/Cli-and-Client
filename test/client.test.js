'use strict';

const client = require('../client');
const debug = require('debug')('app:test/user-route');
const { expect } = require('chai');

const testBody = {
  username: 'testyMcTesterson'
  ,password: 'lookitdattest'
  ,email: 'test@example.com'
};

describe('client-server interaction', function(){
  describe('users creation', function(){
    it('should have return a token in the response', function(){
      return client.newUser(testBody)
        .then(res => {
          debug(res.text);
          expect(res.text.substring(0, 36)).to.equal('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9');
        })
        .catch(err => debug(err));
    });
  });
  describe('users signin', function(){
    it('should return a token', function(){
      return client.signIn(testBody.username, testBody.password)
        .then(res => {
          debug(res.text);
          expect(res.text.substring(0, 36)).to.equal('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9');
        })
        .catch(err => debug(err));
    });
  });
});
