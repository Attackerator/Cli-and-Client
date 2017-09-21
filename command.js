'use strict';

const inquirer = require('inquirer');
const program = require('commander');
const clear = require('clear');
const figlet = require('figlet');
const client = require('./client.js')
const chalk = require('chalk');
const fs = require('fs');

clear();
console.log(
  chalk.yellow(
    figlet.textSync('Attackerator', { horizontalLayout: 'full' })
  )
);
function checkUserExists(){
  
}
function getSignIn(callback) {
  var questions = [
    {
      name: 'username',
      type: 'input',
      message: 'Enter your Attackerator username:',
      validate: function( value ) {
        if (value.length) {
          return true;
        } else {
          return 'Please enter your username';
        }
      }
    },
    {
      name: 'password',
      type: 'password',
      message: 'Enter your password:',
      validate: function(value) {
        if (value.length) {
          return true;
        } else {
          return 'Please enter your password';
        }
      }
    }
  ];

  inquirer.prompt(questions).then(callback);
}
