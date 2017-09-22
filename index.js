'use strict';

const command = require('./command.js');

command.checkUserExists(function(){
  console.log(arguments);
});
