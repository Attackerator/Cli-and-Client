'use strict';

//deployment URL https://backattackerator.herokuapp.com/
const debug = require('debug')('app:client');
const request = require('superagent');

exports.newUser = function(body){
  return request
    .post(`https://backattackerator-pr-29.herokuapp.com/api/user`)
    .send(body);

};
