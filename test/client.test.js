'use strict';

const client = require('../client');
const debug = require('debug')('app:test/client');
const { expect } = require('chai');

const testBody = {
  username: 'testyMcTesterson'
  ,password: 'lookitdattest'
  ,email: 'test@example.com'
}; // this user is already created

const testCharacter = {
  name: 'itestthings'
  ,_id: '59c42f69fb17110004b734b2'
};// this character is already created

const newBody = {
  username: 'newMcTesterson'
  ,password: 'erhmagadnew'
  ,email: 'new@example.com'
};

const newStats = {
  strength: 8
  ,dexterity: 8
  ,constitution: 8
  ,intelligence: 8
  ,charisma: 8
  ,wisdom: 8
};

const updatedStats = {
  strength: 17
};

const newAttack = {
  name: 'Donkey Kick'
  ,stat: 'strength'
  ,toHitBonus: 5
  ,damageBonus: 3
  ,damageType: 'bludgeoning'
  ,diceType: '12'
  ,diceCount: '2'
  ,description: 'Achh, right in the fruit and veg'
};

const updateAttack = {
  name: 'Tail whip'
  ,stat: 'dexterity'
};

const newSpell = {
  name: 'Donkey breath'
  ,stat: 'wisdom'
  ,toHitBonus: 4
  ,damageBonus: 7
  ,damageType: 'necrotic'
  ,diceType: '8'
  ,diceCount: '5'
  ,description: 'Fills a sixty foot area of effect centered on caster. Everything in effected area rolls fortitude check. Half damage on miss.'
};

const updateSpell = {
  name: 'Flies, all the flies'
  ,stat: 'constitutiond'
};

const newSkill = {
  name: 'underwater basket weaving'
  ,bonus: 3
  ,stat: 'dexterity'
};

const updateSkill = {
  name: 'donkeylove'
  ,stat: 'constitution'
};


const newCharacter = {
  name: 'newCharacterMajigger'
};

const updateCharacter = {
  name: 'differentCharacterMajigger'
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
    describe(':character retrieval',function(){
      it('should return a specific character',function(){
        return client.findCharacter(newCharacter._id, testToken)
          .then(res => {
            expect(res.status).to.equal(200);
            expect(res.body.name).to.equal(newCharacter.name);
          });
      });
      it('should return all the characters for a user', function(){
        return client.findAllCharacters(testToken)
          .then(res => {
            debug(res.body);
            expect(res.status).to.equal(200);
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
        return client.deleteCharacter(newCharacter._id, testToken)
          .then(res => {
            expect(res.status).to.equal(204);
            expect(res.body.name).to.be.undefined;
          });
      });
    });
  });

  describe(':stats interaction', function(){
    describe(':stats creation', function(){
      it('should return new stats, with a characterId and userId', function(){
        return client.newStats(testCharacter._id, newStats, testToken)
          .then(res => {
            newStats._id = res.body._id;
            expect(res.status).to.equal(200);
            expect(res.body.strength).to.equal(newStats.strength);
            expect(res.body.constitution).to.equal(newStats.constitution);
            expect(res.body.wisdom).to.equal(newStats.wisdom);
            expect(res.body.characterId).to.not.be.undefined;
            expect(res.body.userId).to.not.be.undefined;
          });
      });
    });
    describe(':stats update', function(){
      it('should return updated stats',function(){
        return client.updateStats(newStats._id, updatedStats, testToken)
          .then(res => {
            expect(res.body.strength).to.equal(updatedStats.strength);
            expect(res.body.wisdom).to.equal(newStats.wisdom);
          });
      });
    });
  });

  describe(':skill interaction', function(){
    describe(':skill creation', function(){
      it('should return a new skill with a characterId and userId', function(){
        return client.newSkill(testCharacter._id, newSkill, testToken)
          .then(res => {
            newSkill._id = res.body._id;
            expect(res.status).to.equal(200);
            expect(res.body.name).to.equal(newSkill.name);
            expect(res.body.stat).to.equal(newSkill.stat);
          });
      });
    });
    describe(':skill update', function(){
      it('should return an updated skill', function(){
        return client.updateSkill(newSkill._id, updateSkill, testToken)
          .then(res => {
            expect(res.status).to.equal(200);
            expect(res.body.name).to.equal(updateSkill.name);
            expect(res.body.stat).to.equal(updateSkill.stat);
          });
      });
    });
    describe(':skill deletion', function(){
      it('should return 204 with no body', function(){
        return client.deleteSkill(newSkill._id, testToken)
          .then(res => {
            expect(res.status).to.equal(204);
            expect(res.body.name).to.be.undefined;
          });
      });
    });
  });

  describe(':attack interaction', function(){
    describe(':attack creation', function(){
      it('should return a new attack with a characterId and userId', function(){
        return client.newAttack(testCharacter._id, newAttack, testToken)
          .then(res => {
            newAttack._id = res.body._id;
            expect(res.status).to.equal(200);
            expect(res.body.name).to.equal(newAttack.name);
            expect(res.body.stat).to.equal(newAttack.stat);
          });
      });
    });
    describe(':attack update', function(){
      it('should return an updated attack', function(){
        return client.updateAttack(newAttack._id, updateAttack, testToken)
          .then(res => {
            expect(res.status).to.equal(200);
            expect(res.body.name).to.equal(updateAttack.name);
            expect(res.body.stat).to.equal(updateAttack.stat);
          });
      });
    });
    describe(':attack deletion', function(){
      it('should return 204 with no body', function(){
        return client.deleteAttack(newAttack._id, testToken)
          .then(res => {
            expect(res.status).to.equal(204);
            expect(res.body.name).to.be.undefined;
          });
      });
    });
  });

  describe(':spell interaction', function(){
    describe(':spell creation', function(){
      it('should return a new spell with a characterId and userId', function(){
        return client.newSpell(testCharacter._id, newSpell, testToken)
          .then(res => {
            newSpell._id = res.body._id;
            expect(res.status).to.equal(200);
            expect(res.body.name).to.equal(newSpell.name);
            expect(res.body.stat).to.equal(newSpell.stat);
          });
      });
    });
    describe(':spell update', function(){
      it('should return an updated attack', function(){
        return client.updateSpell(newSpell._id, updateSpell, testToken)
          .then(res => {
            expect(res.status).to.equal(200);
            expect(res.body.name).to.equal(updateSpell.name);
            expect(res.body.stat).to.equal(updateSpell.stat);
          });
      });
    });
    describe(':spell deletion', function(){
      it('should return 204 with no body', function(){
        return client.deleteSpell(newSpell._id, testToken)
          .then(res => {
            expect(res.status).to.equal(204);
            expect(res.body.name).to.be.undefined;
          });
      });
    });
  });
});
