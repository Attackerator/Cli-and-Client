# frontAttackerator

## CLI and Client to interact with backAttackerator

This is a command line interface that allows a user to interact with the Attackerator API.

  acess the programs with `node command.js` followed by one of the listed commands.
  
  ## **Options:**

    -V, --version  output the version number
    -h, --help     output usage information


  ## **Commands:**

    newUser|nu <username> <email> <password> ................................................................................ create a new user
    signIn|s <username> <password> .......................................................................................... sign in to existing account
    createCharacter|nc <name> ............................................................................................... create a new character
    findCharacter|fc <characterId> .......................................................................................... find an existing character
    updateCharacter|uc <characterId> <name> ................................................................................. update an existing Character
    deleteCharacter|dc <characterId> ........................................................................................ delete an existing character
    findAllCharacters|fa .................................................................................................... find all character
    createStat|cs <characterId> <strength> <wisdom> <dexterity> <charisma> <intelligence> <constitution> .................... create stats for character
    updateStat|us <statsId> <strength> <wisdom> <dexterity> <charisma> <intelligence> <constitution> ........................ create stats for character
    createSkill|csk <characterId> <name> <bonus> <stat> ..................................................................... create a new skill
    updateSkill|usk <skillId> <name> <bonus> <stat> ......................................................................... edit a skill
    deleteSkill|dsk <skillId> ............................................................................................... delete a skill
    createAttack|ca <characterId> <name> <stat> <damageType> <diceType> <diceCount> <description> <toHitBonus> <damageBonus>..create a new attack to kill things!
    updateAttack|ua <characterId> <name> <stat> <damageType> <diceType> <diceCount> <description> <toHitBonus> <damageBonus>..update existing attack to kill things!
    deleteAttack|da <attackId> .............................................................................................. delete existing attack
    createSpell|csp <characterId> <name> <stat> <damageType> <diceType> <diceCount> <description> <toHitBonus> <damageBonus>..create a new spell to kill things!
    updateSpell|usp <characterId> <name> <stat> <damageType> <diceType> <diceCount> <description> <toHitBonus> <damageBonus>..update existing spell to kill things!
    deleteSpell|dsp <spellId> ............................................................................................... delete an existing spell
    createSave|csv <characterId> <type> <bonus> <stat> ...................................................................... create a new save
    updateSave|usv <saveId> <type> <bonus> <stat> ........................................................................... edit a save
    deleteSave|dsv <saveId> ................................................................................................. delete a save
