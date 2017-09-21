'use strict';

const client = require('../client');
const debug = require('debug')('app:test/user-route');
const { expect } = require('chai');

const testBody = {
  username: 'testyMcTesterson'
  ,password: 'lookitdattest'
  ,email: 'test@example.com'
};

describe('clienty thing', function(){
  xit('should have a response not an error?', function(){
    return client.newUser(testBody)
      .then(res => {
        debug(res.text);
        expect(res.text.substring(0, 36)).to.equal('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9');
      })
      .catch(err => debug(err));
  });
});
