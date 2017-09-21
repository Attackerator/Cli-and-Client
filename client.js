'use strict';

//deployment URL https://backattackerator.herokuapp.com/
//const debug = require('debug')('app:client');
const request = require('superagent');

//USER INTERACTION
exports.signIn = function(username, password){
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

exports.newSkill = function(skillId, body, token){
  return request
    .put(`https://backattackerator.herokuapp.com/api/skills/${skillId}`)
    .set({'Authorization': `Bearer ${token}`})
    .send(body);
};

exports.updateSkill = function(skillId, body, token){
  return request
    .put(`https://backattackerator.herokuapp.com/api/skill/${skillId}`)
    .set({'Authorization': `Bearer ${token}`})
    .send(body);
};
