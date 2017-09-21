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
    .post(`https://backattackerator.herokuapp.com/api/character`)
    .set({'Authorization': `Bearer ${token}`})
    .send(body);
};
