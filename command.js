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

clear();
console.log(
  chalk.bold.yellow(
    figlet.textSync('Attackerator', { horizontalLayout: 'full' })
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
  .alias('nc')
  .description('create a new character')
  .action((name) => {
    let token = fs.readFileSync(`${homeDir}/.attackeratorjwt.txt`, 'utf8');
    console.log({name}, token);
    client.newCharacter({name}, token).then(res => console.log(res.text));
  });

program
  .command('findCharacter <characterId>')
  .alias('fc')
  .description('find an existing character')
  .action((characterId) => {
    let char = { characterId };
    let token = fs.readFileSync(`${homeDir}/.attackeratorjwt.txt`, 'utf8');
    console.log(char.characterId, token);
    client.findCharacter(char.characterId, token).then(res => console.log(res.text));
  });

program
  .command('updateCharacter <characterId> <name>')
  .alias('uc')
  .description('update an existing Character')
  .action((characterId, name) => {
    let char = { characterId };
    let token = fs.readFileSync(`${homeDir}/.attackeratorjwt.txt`, 'utf8');
    console.log(char.characterId, name, token);
    client.updateCharacter(char.characterId, { name }, token).then(res => console.log(res.text));
  });

program
  .command('deleteCharacter <characterId>')
  .alias('dc')
  .description('delete an existing character')
  .action((characterId) => {
    let char = { characterId };
    let token = fs.readFileSync(`${homeDir}/.attackeratorjwt.txt`, 'utf8');
    console.log(char.characterId, token);
    client.deleteCharacter(char.characterId, token).then(res => console.log(res.text));
  });

program
  .command('findAllCharacters')
  .alias('fa')
  .description('find all character')
  .action(() => {
    let token = fs.readFileSync(`${homeDir}/.attackeratorjwt.txt`, 'utf8');
    console.log(token);
    client.findAllCharacters(token).then(res => console.log(res.text));
  });

program
  .command('createStat <characterId> <strength> <wisdom> <dexterity> <charisma> <intelligence> <constitution>')
  .alias('cs')
  .description('create stats for character')
  .action(( characterId, strength, wisdom, dexterity, charisma, intelligence, constitution) => {
    let char = { characterId };
    let token = fs.readFileSync(`${homeDir}/.attackeratorjwt.txt`, 'utf8');
    console.log(char);
    client.newStats(char.characterId, { strength, wisdom, dexterity, charisma, intelligence, constitution }, token).then(res => console.log(res.text));
  });

program
  .command('updateStat <statsId> <strength> <wisdom> <dexterity> <charisma> <intelligence> <constitution>')
  .alias('us')
  .description('create stats for character')

  .action(( statsId, strength, wisdom, dexterity, charisma, intelligence, constitution) => {
    let stat = { statsId };
    let token = fs.readFileSync(`${homeDir}/.attackeratorjwt.txt`, 'utf8');
    console.log(stat);
    client.updateStats(stat.statsId, { strength, wisdom, dexterity, charisma, intelligence, constitution }, token).then(res => console.log(res.text));
  });

program
  .command('createSkill <characterId> <name> <bonus> <stat>')
  .alias('csk')
  .description('create a new skill')
  .action((characterId, name, bonus, stat) => {
    let char = { characterId };
    let token = fs.readFileSync(`${homeDir}/.attackeratorjwt.txt`, 'utf8');
    client.newSkill(char.characterId, {name, bonus, stat}, token).then(res => console.log(res.text));
  });

program
  .command('updateSkill <skillId> <name> <bonus> <stat>')
  .alias('usk')
  .description('edit a skill')
  .action((skillId, name, bonus, stat) => {
    let token = fs.readFileSync(`${homeDir}/.attackeratorjwt.txt`, 'utf8');
    client.updateSkill(skillId, {name, bonus, stat}, token).then(res => console.log(res.text));
  });

program
  .command('deleteSkill <skillId>')
  .alias('dsk')
  .description('delete a skill')
  .action((skillId) => {
    let token = fs.readFileSync(`${homeDir}/.attackeratorjwt.txt`, 'utf8');
    client.deleteSkill(skillId, token).then(res => console.log(res.text));
  });

program
  .command('createAttack <characterId> <name> <stat> <damageType> <diceType> <diceCount> <description> <toHitBonus> <damageBonus>')
  .alias('ca')
  .description('create a new attack to kill things!')
  .action((characterId, name, stat, damageType, diceType, diceCount, description, toHitBonus, damageBonus) => {
    let char = { characterId };
    let token = fs.readFileSync(`${homeDir}/.attackeratorjwt.txt`, 'utf8');
    client.newAttack(char.characterId, {name, stat, damageType, diceType, diceCount, description, toHitBonus, damageBonus}, token).then(res => console.log(res.text));
  });

  name: { type: String, required: true },
  stat: { type: String, required: true },
  damageType: { type: String, required: true},
  diceType: { type: Number, required: true },
  diceCount: { type: Number, required: true },
  description: { type: String, required: false },
  toHitBonus: { type: Number, required: false },
  damageBonus: { type: Number, required: false },
program.parse(process.argv);
