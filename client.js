'use strict';

//deployment URL https://backattackerator.herokuapp.com/
const debug = require('debug')('app:client');
const request = require('superagent');

//USER INTERACTION
exports.signIn = function(username, password){
  debug('Sign in request with Username and Password');
  return request
    .get(`https://backattackerator.herokuapp.com/api/signin`)
    .auth(username, password);
};

exports.newUser = function(body){
  return request
    .post(`https://backattackerator.herokuapp.com/api/user`)
    .send(body);

};

//CHARACTER INTERACTION

exports.newCharacter = function(body, token){
  return request
    .post(`https://backattackerator.herokuapp.com/api/character`)
    .set({'Authorization': `Bearer ${token}`})
    .send(body);
};

exports.findAllCharacters = function(token){
  return request
    .get(`https://backattackerator.herokuapp.com/api/characters`)
    .set({'Authorization': `Bearer ${token}`});
};

exports.findCharacter = function(characterId, token){
  return request
    .get(`https://backattackerator.herokuapp.com/api/character/${characterId}`)
    .set({'Authorization': `Bearer ${token}`});
};

exports.updateCharacter = function(characterId, body, token){
  return request
    .put(`https://backattackerator.herokuapp.com/api/character/${characterId}`)
    .set({'Authorization': `Bearer ${token}`})
    .send(body);
};

exports.deleteCharacter = function(characterId, token){
  return request
    .delete(`https://backattackerator.herokuapp.com/api/character/${characterId}`)
    .set({'Authorization': `Bearer ${token}`});
};

//STATS INTERACTION

exports.newStats = function(characterId, body, token){
  return request
    .post(`https://backattackerator.herokuapp.com/api/stats/${characterId}`)
    .set({'Authorization': `Bearer ${token}`})
    .send(body);
};

exports.updateStats = function(statsId, body, token){
  return request
    .put(`https://backattackerator.herokuapp.com/api/stats/${statsId}`)
    .set({'Authorization': `Bearer ${token}`})
    .send(body);
};

//SKILLS INTERACTION

exports.newSkill = function(characterId, body, token){
  return request
    .post(`https://backattackerator.herokuapp.com/api/skill/${characterId}`)
    .set({'Authorization': `Bearer ${token}`})
    .send(body);
};

exports.updateSkill = function(skillId, body, token){
  return request
    .put(`https://backattackerator.herokuapp.com/api/skill/${skillId}`)
    .set({'Authorization': `Bearer ${token}`})
    .send(body);
};

exports.deleteSkill = function(skillId, token){
  return request
    .delete(`https://backattackerator.herokuapp.com/api/skill/${skillId}`)
    .set({'Authorization': `Bearer ${token}`});
};

//ATTACK INTERACTION

exports.newAttack = function(characterId, body, token){
  return request
    .post(`https://backattackerator.herokuapp.com/api/attack/${characterId}`)
    .set({'Authorization': `Bearer ${token}`})
    .send(body);
};

exports.updateAttack = function(attackId, body, token){
  return request
    .put(`https://backattackerator.herokuapp.com/api/attack/${attackId}`)
    .set({'Authorization': `Bearer ${token}`})
    .send(body);
};

exports.deleteAttack = function(attackId, token){
  return request
    .delete(`https://backattackerator.herokuapp.com/api/attack/${attackId}`)
    .set({'Authorization': `Bearer ${token}`});
};

//SPELL INTERACTION

exports.newSpell = function(characterId, body, token){
  return request
    .post(`https://backattackerator.herokuapp.com/api/spell/${characterId}`)
    .set({'Authorization': `Bearer ${token}`})
    .send(body);
};

exports.updateSpell = function(spellId, body, token){
  return request
    .put(`https://backattackerator.herokuapp.com/api/spell/${spellId}`)
    .set({'Authorization': `Bearer ${token}`})
    .send(body);
};

exports.deleteSpell = function(spellId, token){
  return request
    .delete(`https://backattackerator.herokuapp.com/api/spell/${spellId}`)
    .set({'Authorization': `Bearer ${token}`});
};

//SAVE INTERACTION

exports.newSave = function(characterId, body, token){
  return request
    .post(`https://backattackerator.herokuapp.com/api/save/${characterId}`)
    .set({'Authorization': `Bearer ${token}`})
    .send(body);
};

exports.updateSave = function(saveId, body, token){
  return request
    .put(`https://backattackerator.herokuapp.com/api/save/${saveId}`)
    .set({'Authorization': `Bearer ${token}`})
    .send(body);
};

exports.deleteSave = function(saveId, token){
  return request
    .delete(`https://backattackerator.herokuapp.com/api/save/${saveId}`)
    .set({'Authorization': `Bearer ${token}`});
};
