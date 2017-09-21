'use strict';

const inquirer = require('inquirer');
const program = require('commander');
const clear = require('clear');
const figlet = require('figlet');
const client = require('./client.js');
const chalk = require('chalk');
const fs = require('fs');
const os = require('os');

var homeDir = os.homedir();
var token = fs.readFileSync(`${homeDir}/.attackeratorjwt.txt`);

clear();
console.log(
  chalk.bold.yellow(
    figlet.textSync('Attack', { horizontalLayout: 'full' })
  )
);
console.log(
  chalk.bold.blue(
    figlet.textSync('erator', { horizontalLayout: 'full' })
  )
);

program
  .version('0.0.1')
  .description('Character management for D20 RPG systems');

program
  .command('newUser <username> <email> <password>')
  .alias('nu')
  .description('create a new user')
  .action((username, email, password) => {
    client.newUser({username, email, password}).then(res => fs.writeFileSync(`${homeDir}/.attackeratorjwt.txt`, res.text));
  });

program
  .command('signIn <username> <password>')
  .alias('s')
  .description('sign in to existing account')
  .action((username, password) => {
    let user = {username, password};
    console.log(user.username, user.password);
    client.signIn(user.username, user.password).then(res => fs.writeFileSync(`${homeDir}/.attackeratorjwt.txt`, res.text));
  });

program
  .command('createCharacter <name>')

/*
program
  .command('createStat <strength> <wisdom> <dexterity> <charisma> <intelligence> <constitution>')
  .alias('cs')
  .description('create stats for character')
  .action(( strength, wisdom, dexterity, charisma, intelligence, constitution) => {
    console.log(strength, wisdom, dexterity, charisma, intelligence, constitution);
    client.createStats({strength, wisdom, dexterity, charisma, intelligence, constitution})
      .then( token => fs.readFileSync(`${homeDir}/.attackeratorjwt.txt`))
      .then();
  });
*/

program.parse(process.argv);
