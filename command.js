'use strict';

const program = require('commander');
const clear = require('clear');
const figlet = require('figlet');
const client = require('./client.js');
const chalk = require('chalk');
const fs = require('fs');
const os = require('os');
const beautify = require('js-beautify').js_beautify;

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
    client.findCharacter(char.characterId, token).then(res => console.log(beautify(res.text)));
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
    client.findAllCharacters(token).then(res => console.log(chalk.bold.green(res.text)));
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
    console.log(char);
    client.newAttack(char.characterId, {name, stat, damageType, diceType, diceCount, description, toHitBonus, damageBonus}, token).then(res => console.log(res.text));
  });

program
  .command('updateAttack <characterId> <name> <stat> <damageType> <diceType> <diceCount> <description> <toHitBonus> <damageBonus>')
  .alias('ua')
  .description('update existing attack to kill things!')
  .action((attackId, name, stat, damageType, diceType, diceCount, description, toHitBonus, damageBonus) => {
    let token = fs.readFileSync(`${homeDir}/.attackeratorjwt.txt`, 'utf8');
    client.updateAttack(attackId, {name, stat, damageType, diceType, diceCount, description, toHitBonus, damageBonus}, token).then(res => console.log(res.text));
  });

program
  .command('deleteAttack <characterId> <name> <stat> <damageType> <diceType> <diceCount> <description> <toHitBonus> <damageBonus>')
  .alias('da')
  .description('delete existing attack')
  .action((attackId, name, stat, damageType, diceType, diceCount, description, toHitBonus, damageBonus) => {
    let token = fs.readFileSync(`${homeDir}/.attackeratorjwt.txt`, 'utf8');
    client.deleteAttack(attackId, {name, stat, damageType, diceType, diceCount, description, toHitBonus, damageBonus}, token).then(res => console.log(res.text));
  });

program
  .command('createSpell <characterId> <name> <stat> <damageType> <diceType> <diceCount> <description> <toHitBonus> <damageBonus>')
  .alias('csp')
  .description('create a new spell to kill things!')
  .action((characterId, name, stat, damageType, diceType, diceCount, description, toHitBonus, damageBonus) => {
    let char = { characterId };
    let token = fs.readFileSync(`${homeDir}/.attackeratorjwt.txt`, 'utf8');
    console.log(char);
    client.newSpell(char.characterId, {name, stat, damageType, diceType, diceCount, description, toHitBonus, damageBonus}, token).then(res => console.log(res.text));
  });

program
  .command('updateSpell <characterId> <name> <stat> <damageType> <diceType> <diceCount> <description> <toHitBonus> <damageBonus>')
  .alias('usp')
  .description('update existing spell to kill things!')
  .action((spellId, name, stat, damageType, diceType, diceCount, description, toHitBonus, damageBonus) => {
    let token = fs.readFileSync(`${homeDir}/.attackeratorjwt.txt`, 'utf8');
    client.updateSpell(spellId, {name, stat, damageType, diceType, diceCount, description, toHitBonus, damageBonus}, token).then(res => console.log(res.text));
  });

program
  .command('deleteSpell <characterId> <name> <stat> <damageType> <diceType> <diceCount> <description> <toHitBonus> <damageBonus>')
  .alias('dsp')
  .description('delete an existing spell')
  .action((spellId, name, stat, damageType, diceType, diceCount, description, toHitBonus, damageBonus) => {
    let token = fs.readFileSync(`${homeDir}/.attackeratorjwt.txt`, 'utf8');
    client.deleteSpell(spellId, {name, stat, damageType, diceType, diceCount, description, toHitBonus, damageBonus}, token).then(res => console.log(res.text));
  });

program
  .command('createSave <characterId> <type> <bonus> <stat>')
  .alias('csv')
  .description('create a new save')
  .action((characterId, type, bonus, stat) => {
    let char = { characterId };
    let token = fs.readFileSync(`${homeDir}/.attackeratorjwt.txt`, 'utf8');
    client.newSave(char.characterId, {type, bonus, stat}, token).then(res => console.log(res.text));
  });

program
  .command('updateSave <saveId> <type> <bonus> <stat>')
  .alias('usv')
  .description('edit a save')
  .action((skillId, type, bonus, stat) => {
    let token = fs.readFileSync(`${homeDir}/.attackeratorjwt.txt`, 'utf8');
    client.updateSave(skillId, {type, bonus, stat}, token).then(res => console.log(res.text));
  });

program
  .command('deleteSave <saveId>')
  .alias('dsv')
  .description('delete a save')
  .action((skillId) => {
    let token = fs.readFileSync(`${homeDir}/.attackeratorjwt.txt`, 'utf8');
    client.deleteSave(skillId, token).then(res => console.log(res.text));
  });

program.parse(process.argv);
