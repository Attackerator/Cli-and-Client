'use strict';

const client = require('../client');
const debug = require('debug')('app:test/client');
const { expect } = require('chai');

const testBody = {
  username: 'testyMcTesterson'
  ,password: 'lookitdattest'
  ,email: 'test@example.com'
}; // this user is already created

const newBody = {
  username: 'newMcTesterson'
  ,password: 'erhmagadnew'
  ,email: 'new@example.com'
};

const newCharacter = {
  name: 'newCharacterMajigger'
};

const updateCharacter = {
  name: 'newCharacterMajigger'
};

describe('client-server interaction', function(){
  let testToken;
  describe(':user interaction', function(){
    describe(':user creation', function(){
      xit('should have return a token in the response', function(){
        return client.newUser(newBody)
          .then(res => {
            debug(res.text);
            expect(res.text.substring(0, 36)).to.equal('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9');
          })
          .catch(err => debug(err));
      });
    });
    describe(':users signin', function(){
      it('should return a token', function(){
        return client.signIn(testBody.username, testBody.password)
          .then(res => {
            debug(res.text);
            testToken = res.text;
            expect(res.text.substring(0, 36)).to.equal('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9');
          })
          .catch(err => debug(err));
      });
    });
  });

  describe(':character interaction', function(){
    describe(':character creation', function(){
      it('should return a created character', function(){
        return client.newCharacter(newCharacter, testToken)
          .then(res => {
            debug(res.body);
            newCharacter._id = res.body._id;
            expect(res.body.name).to.equal(newCharacter.name);
          });
      });
    });
    describe(':character update', function(){
      it('should return a the character with updated name', function(){
        return client.updateCharacter(newCharacter._id, updateCharacter, testToken)
          .then(res => {
            debug(res.body);
            expect(res.body.name).to.equal(updateCharacter.name);
          });
      });
    });
    describe(':character deletion', function(){
      it('should return 204 with no body', function(){
        return client.deleteCharacter(newCharacter._id, updateCharacter, testToken)
          .then(res => {
            expect(res.status).to.be(204);
            expect(res.body.name).to.be.undefined;
          });
      });
    });
  });
});
