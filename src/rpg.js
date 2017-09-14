const Discord = require("discord.js");
var Promise = require('bluebird');
var profileDB = require("./profileDB.js");
var config = require("./config");

var activeRPGEvents = {}
var usersInRPGEvents = {};

module.exports.rpgInitialize = function(message){
    // create an embed saying that b is about to happen, for users MAX of 5 users and they must all say -ready to start costs 5 tacos per person
    var discordUserId = message.author.id;
    // 
    var users  = message.mentions.users

    var team = [];

    team.push(message.author);

    users.forEach(function(user){
        if (team.length < 4){
            team.push(user);
        }
    })
    // TODO: check to see all the team members are available and not already in an event

    if (team.length >= 2 && team.length <= 4){
        // send an embed that the users are needed for the RPG event to say -ready or -notready
        // if the user says -ready, they get added to activeRPGEvents that they were invited to
        const embed = new Discord.RichEmbed()
        .setAuthor("Test Event initiated by " + message.author.username + "!!")
        .setThumbnail("https://media.giphy.com/media/mIZ9rPeMKefm0/giphy.gif")
        .setColor(0xF2E93E)
        .addField('Test Event ', "when ready type -ready, if skipping type -skip" )
    
        message.channel.send({embed})
        .then(function (sentMessage) {
            // create the RPG group and use the message id
            var membersOfParty = []

            team.forEach(function(member){
                usersInRPGEvents["rpg-" + member.id] = { id: sentMessage.id, ready: false };
                membersOfParty.push(member);
            })
            
            activeRPGEvents["rpg-" + sentMessage.id] = { members: membersOfParty };
            activeRPGEvents["rpg-" + sentMessage.id].status = "waiting";
        })
    }
    else{
        message.channel.send("not enough members in your party for this event")
    }
}

module.exports.rpgSkip = function(message){
    // create an embed saying that b is about to happen, for users MAX of 5 users and they must all say -ready to start costs 5 tacos per person
    var discordUserId = message.author.id;
    // TODO: skip before event starts, once event starts you cannot skip
    var idOfUserInEvent = usersInRPGEvents["rpg-" + discordUserId].id;
    var idOfActiveRPGEvent = activeRPGEvents["rpg-"+idOfUserInEvent] ? activeRPGEvents["rpg-"+idOfUserInEvent] : undefined;
    var statusOfEvent;
    if (idOfActiveRPGEvent){
        statusOfEvent = activeRPGEvents["rpg-"+idOfUserInEvent].status ? activeRPGEvents["rpg-"+idOfUserInEvent].status : undefined;        
    }

    if (idOfUserInEvent
        && idOfActiveRPGEvent
        && statusOfEvent == "waiting"){
        message.channel.send( message.author + " skipped");
        // TODO: remove the user from in active events, delete the event from being active

    }
    else{
        message.channel.send(message.author + " you are not in an event");
    }
}

module.exports.rpgReady = function(message, itemsAvailable){
    // create an embed saying that b is about to happen, for users MAX of 5 users and they must all say -ready to start costs 5 tacos per person
    var discordUserId = message.author.id;
    
    if (usersInRPGEvents["rpg-" + discordUserId] && usersInRPGEvents["rpg-" + discordUserId].ready != true){
        message.channel.send( message.author + " is ready");
        // get the user's profile and get the user's wearing
        profileDB.getUserProfileData(discordUserId, function(err, userData){
            if (err){
                console.log(err);
                message.channel.send("something went wrong [profile]");
            }else{
                // get the user profile data
                var userStats = userData.data;

                profileDB.getUserWearInfo(discordUserId, function(wearErr, wearData){
                    if (wearErr){
                        console.log(wearErr);
                        message.channel.send("something went wrong [wearing]");
                    }else{
                        // get the wearing data
                        var wearingStats = wearData.data[0];
                        var items = [];

                        var abilities = [];
                        var statisticsFromItemsAndLevel = {
                            hpPlus: 0,
                            attackDmgPlus: 0,
                            magicDmgPlus: 0,
                            armorPlus: 0,
                            spiritPlus: 0,
                            luckPlus: 0,
                            statuses: [],
                            buffs: []
                        }
                        
                        if (wearingStats.slot1itemid){
                            items.push(wearingStats.slot1itemid)
                        }
                        if (wearingStats.slot2itemid){
                            items.push(wearingStats.slot2itemid)
                        }
                        if (wearingStats.slot3itemid){
                            items.push(wearingStats.slot3itemid)
                        }
                        // added stats from items
                        for (var i in items){
                            if (itemsAvailable[items[i]].ability1){
                                abilities.push(itemsAvailable[items[i]].ability1);
                            }
                            if (itemsAvailable[items[i]].specialAbility){
                                abilities.push(itemsAvailable[items[i]].specialAbility)
                            }
                            if (itemsAvailable[items[i]].passiveAbility){
                                abilities.push(itemsAvailable[items[i]].passiveAbility);
                            }

                            var hpPlus = itemsAvailable[items[i]].hpplus ? itemsAvailable[items[i]].hpplus : 0;
                            var attackDmgPlus = itemsAvailable[items[i]].attackdmgplus ? itemsAvailable[items[i]].attackdmgplus : 0;
                            var magicDmgPlus = itemsAvailable[items[i]].magicdmgplus ? itemsAvailable[items[i]].magicdmgplus : 0;
                            var armorPlus = itemsAvailable[items[i]].armorplus ? itemsAvailable[items[i]].armorplus : 0;
                            var spiritPlus = itemsAvailable[items[i]].spiritplus ? itemsAvailable[items[i]].spiritplus : 0;
                            var luckPlus = itemsAvailable[items[i]].luckplus ? itemsAvailable[items[i]].luckplus : 0;

                            statisticsFromItemsAndLevel.hpPlus = statisticsFromItemsAndLevel.hpPlus + hpPlus;
                            statisticsFromItemsAndLevel.attackDmgPlus = statisticsFromItemsAndLevel.attackDmgPlus + attackDmgPlus;
                            statisticsFromItemsAndLevel.magicDmgPlus = statisticsFromItemsAndLevel.magicDmgPlus + magicDmgPlus;
                            statisticsFromItemsAndLevel.armorPlus = statisticsFromItemsAndLevel.armorPlus + armorPlus;
                            statisticsFromItemsAndLevel.spiritPlus = statisticsFromItemsAndLevel.spiritPlus + spiritPlus;
                            statisticsFromItemsAndLevel.luckPlus = statisticsFromItemsAndLevel.luckPlus + luckPlus;
                        }

                        // added stats from level
                        statisticsFromItemsAndLevel.hpPlus = statisticsFromItemsAndLevel.hpPlus + userStats.level
                        statisticsFromItemsAndLevel.attackDmgPlus = statisticsFromItemsAndLevel.attackDmgPlus + userStats.level
                        statisticsFromItemsAndLevel.magicDmgPlus = statisticsFromItemsAndLevel.magicDmgPlus + userStats.level
                        statisticsFromItemsAndLevel.armorPlus = statisticsFromItemsAndLevel.armorPlus + userStats.level
                        statisticsFromItemsAndLevel.spiritPlus = statisticsFromItemsAndLevel.spiritPlus + userStats.level
                        statisticsFromItemsAndLevel.luckPlus = statisticsFromItemsAndLevel.luckPlus + userStats.level


                        // get the abilities the user will have
                        
                        // get the extra stats obtained from level, item+ stats, 
                        
                        // insert the data to the event info to be able to use it once the team is ready
                        usersInRPGEvents["rpg-" + discordUserId].memberStats = {
                            level: userStats.level,
                            plusStats: statisticsFromItemsAndLevel,
                            itemsBeingWorn: items,
                            abilities: abilities
                        }

                        usersInRPGEvents["rpg-" + discordUserId].ready = true;
                        // check the activeRPGEvents
                        var rpgEvent = "rpg-" + usersInRPGEvents["rpg-" + discordUserId].id;
                        if (activeRPGEvents[rpgEvent]){
                            var teamIsReady = true;
                            for (var member in activeRPGEvents[rpgEvent].members){
                                var partyMember = activeRPGEvents[rpgEvent].members[member];
                                // if the user is the last user needed to be ready, create the RPG event
                                if (usersInRPGEvents["rpg-" + partyMember.id] && !partyMember.bot && !usersInRPGEvents["rpg-" + partyMember.id].ready && !partyMember.bot){
                                    teamIsReady = false;
                                }
                            }
                
                            if (teamIsReady){
                                message.channel.send("test is all ready")
                                // if all team members are ready, create the RPG event
                                var maxLevelInParty = 1;
                
                                // create team members list
                                // team members get abilities based on their items, 1 ult ability at random
                                // create their stats based on their level + items
                                // hp, attack dmg, magic dmg, armor
                                var membersInParty = {};
                                for (var member in activeRPGEvents[rpgEvent].members){
                                    var partyMember = activeRPGEvents[rpgEvent].members[member];
                                    var partyMemberStats = usersInRPGEvents["rpg-"+partyMember.id].memberStats ? usersInRPGEvents["rpg-"+partyMember.id].memberStats : undefined;
                                    if (partyMemberStats && partyMemberStats.level > maxLevelInParty){
                                        maxLevelInParty = partyMemberStats.level;
                                    }
                                    var partyMemberHpPlus =  0
                                    var partyMemberAttackDmgPlus =  0
                                    var partyMemberMagicDmgPlus =  0
                                    var partyMemberArmorPlus =  0
                                    var partyMemberSpiritPlus = 0
                                    var partyMemberLuckPlus = 0
                                    if (partyMemberStats && partyMemberStats.plusStats){
                                        partyMemberHpPlus = partyMemberStats.plusStats.hpPlus ? partyMemberStats.plusStats.hpPlus : 0
                                        partyMemberAttackDmgPlus = partyMemberStats.plusStats.attackDmgPlus ? partyMemberStats.plusStats.attackDmgPlus : 0
                                        partyMemberMagicDmgPlus = partyMemberStats.plusStats.magicDmgPlus ? partyMemberStats.plusStats.magicDmgPlus : 0
                                        partyMemberArmorPlus = partyMemberStats.plusStats.armorPlus ? partyMemberStats.plusStats.armorPlus : 0
                                        partyMemberSpiritPlus = partyMemberStats.plusStats.SpiritPlus ? partyMemberStats.plusStats.SpiritPlus : 0
                                        partyMemberLuckPlus = partyMemberStats.plusStats.luckPlus ? partyMemberStats.plusStats.luckPlus: 0
                                    }
                                    membersInParty["rpg-" + partyMember.id] = {
                                        id: partyMember.id,
                                        name: partyMember.username,
                                        hp: 250 + partyMemberHpPlus,
                                        attackDmg: 40 + partyMemberAttackDmgPlus,
                                        magicDmg: 44 + partyMemberMagicDmgPlus,
                                        armor: 24 + partyMemberArmorPlus,
                                        spirit: 24 + partyMemberSpiritPlus,
                                        luck: 1 + partyMemberLuckPlus,
                                        abilities: ["attack", "tacoheal", "empower", "tacowall", "orchatasip", "barrier"],
                                        statuses: [],
                                        statBuffs: {
                                            hp: 0,
                                            attackDmg: 0,
                                            magicDmg: 0,
                                            armor: 0,
                                            spirit: 0,
                                            spirit: 0,
                                            maxhp: 0
                                        },
                                        buffs: ["haste"]
                                    }
                                    membersInParty["rpg-" + partyMember.id].maxhp = membersInParty["rpg-" + partyMember.id].hp;
                                    // insert the abilities and statuses for the party member
                                    if (partyMemberStats && partyMemberStats.abilities){
                                        for( var ability in partyMemberStats.abilities){
                                            membersInParty["rpg-" + partyMember.id].abilities.push(partyMemberStats.abilities[ability]);
                                        }
                                    }
                                    // TODO: add special abilities, passive abilities and statuses
                                    // for (var status in partyMemberStats.statuses)
                                }
                                // create the enemy list and add to the embed
                                // enemy list has regular attack, 2 abilities, 1 ult ability
                                // create enemy stats, enemy stats scale with current user's average level
                                // hp, attack dmg, magic dmg, armor, element(optional)
                                var enemyCount = activeRPGEvents[rpgEvent].members.length

                                var enemies = {};
                                var enemyIdCount = 1
                                for (var i = 1; i <= enemyCount; i++){
                                    // roll for enemy rarity, then roll for the actual enemy
                                    var rollForRarity = Math.floor(Math.random() * 10000) + 1;
                                    var enemyFound;
                                    if (rollForRarity >= 9750 ){
                                        // boss
                                        var enemyRoll = Math.floor(Math.random() * enemiesToEncounter.boss.length);
                                        enemyFound = enemiesToEncounter.boss[enemyRoll];
                                    }
                                    else if (rollForRarity >= 8500 && rollForRarity < 9750 ){
                                        // hard
                                        var enemyRoll = Math.floor(Math.random() * enemiesToEncounter.hard.length);
                                        enemyFound = enemiesToEncounter.hard[enemyRoll];
                                    }
                                    else if (rollForRarity >= 5000 && rollForRarity < 8500 ){
                                        // medium
                                        var enemyRoll = Math.floor(Math.random() * enemiesToEncounter.medium.length);
                                        enemyFound = enemiesToEncounter.medium[enemyRoll];
                                    }
                                    else {
                                        // easy :)
                                        var enemyRoll = Math.floor(Math.random() * enemiesToEncounter.easy.length);
                                        enemyFound = enemiesToEncounter.easy[enemyRoll];
                                    }
                                    enemies[enemyIdCount] = {
                                        id: enemyIdCount,
                                        name: enemyFound.name,
                                        hp: enemyFound.hp,
                                        attackDmg: enemyFound.attackDmg,
                                        magicDmg: enemyFound.magicDmg,
                                        armor: enemyFound.armor,
                                        spirit: enemyFound.spirit,
                                        statuses: [],
                                        statBuffs: {
                                            hp: 0,
                                            attackDmg: 0,
                                            magicDmg: 0,
                                            armor: 0,
                                            spirit: 0,
                                            maxhp: 0
                                        },
                                        buffs: enemyFound.buffs,
                                        abilities: enemyFound.abilities,
                                        element: enemyFound.element
                                    }
                                    enemies[enemyIdCount].maxhp = enemies[enemyIdCount].hp;
                                    enemyIdCount++;
                                }
                
                                activeRPGEvents[rpgEvent].enemies = enemies;
                                activeRPGEvents[rpgEvent].enemiesCount = enemyIdCount - 1;

                                activeRPGEvents[rpgEvent].membersInParty = membersInParty
                
                                activeRPGEvents[rpgEvent].turn = 1;
                                activeRPGEvents[rpgEvent].enemyTurnAbilities = [];
                                activeRPGEvents[rpgEvent].memberTurnAbilities = [];
                                activeRPGEvents[rpgEvent].status = "in progress"
                
                                const embed = new Discord.RichEmbed()
                                .setAuthor("Test Event !!")
                                .setDescription("test description")
                                //.setThumbnail("https://media.giphy.com/media/mIZ9rPeMKefm0/giphy.gif")
                                .setColor(0xF2E93E)
                                // party members
                                var groupString = "";
                                var enemiesString = "";

                                for (var member in activeRPGEvents[rpgEvent].members){
                                    var memberInRpgEvent = activeRPGEvents[rpgEvent].members[member];
                                    var memberInParty = activeRPGEvents[rpgEvent].membersInParty["rpg-" + memberInRpgEvent.id]
                                    groupString = groupString + "\n" + userStatsStringBuilder(memberInParty, memberInRpgEvent.username, false);
                                }
                                // enemies
                                for (var enemy in activeRPGEvents[rpgEvent].enemies){
                                    var enemyInRpgEvent = activeRPGEvents[rpgEvent].enemies[enemy];
                                    var enemyName = activeRPGEvents[rpgEvent].enemies[enemy].name;
                                    enemiesString = enemiesString + "\n" + userStatsStringBuilder(enemyInRpgEvent, enemyName, true);
                                }
                                embed.addField( "Group", groupString )
                                embed.addField( "Enemy", enemiesString )
                                message.channel.send({embed})
                                .then(function (sentMessage) {
                                    recalculateStatBuffs(activeRPGEvents[rpgEvent])
                                })
                
                            }else{
                                message.channel.send("test not ready");
                            }
                        }
                    }
                })
            }
        })
    }
    else if (usersInRPGEvents["rpg-" + discordUserId] && usersInRPGEvents["rpg-" + discordUserId].ready == true){
        message.channel.send(message.author + " you are already ready")
    }
    else{
        message.channel.send(message.author + " you are not in an event");
    }
}

// use the abilities
module.exports.useRpgAbility = function(message, args){
    var discordUserId = message.author.id;
    var idOfEventUserIsIn = usersInRPGEvents["rpg-"+discordUserId] ? usersInRPGEvents["rpg-"+discordUserId].id : undefined;
    var userIsReady = usersInRPGEvents["rpg-"+discordUserId] ? usersInRPGEvents["rpg-"+discordUserId].ready : undefined;
    var abilityToUse = args[1];
    var target = args[2];

    var users  = message.mentions.users;
    var mentionedUser;
    users.forEach(function(user){
        mentionedUser = user
    })

    if (mentionedUser){
        target = mentionedUser.id
    }
    // check target is valid, either [1-20], or a mention in message, if no target then it is a area wide ability
    
    if (activeRPGEvents["rpg-"+idOfEventUserIsIn] && userIsReady){
        // the user is in rpg event and is ready
        
        // check that they are able to use the ability they specified (it is in their abilities array)
        if (activeRPGEvents["rpg-"+idOfEventUserIsIn].membersInParty["rpg-"+discordUserId]){
            var userAbilities = activeRPGEvents["rpg-"+idOfEventUserIsIn].membersInParty["rpg-"+discordUserId].abilities;

            if (userAbilities.indexOf(abilityToUse) > -1){
                // user can use the ability specified
                // queue up the ability into the list of abilities that will be used and their target
                var abilityToProcess = {}
                if (mentionedUser && target == mentionedUser.id){
                    abilityToProcess = {
                        user: discordUserId,
                        ability: abilityToUse,
                        target: "rpg-"+target
                    }
                }else{
                    abilityToProcess = {
                        user: discordUserId,
                        ability: abilityToUse,
                        target: target
                    }
                }
                

                // validate the target
                var validTarget = validateTarget(target, abilityToUse, activeRPGEvents["rpg-"+idOfEventUserIsIn]);
                if (validTarget){
                    activeRPGEvents["rpg-"+idOfEventUserIsIn].memberTurnAbilities.push(abilityToProcess);
                    // TODO: send message saying the user used ability already for that turn
                    // if all users have used their abilities the turn should be processed

                    // get the number of users that are alive and compare to the memberturnabilities array length
                    var membersAlive = 0;
                    for (var member in activeRPGEvents["rpg-"+idOfEventUserIsIn].membersInParty){
                        if (activeRPGEvents["rpg-"+idOfEventUserIsIn].membersInParty[member].statuses.indexOf("dead") == -1){
                            membersAlive++;
                        }
                    }
                    if (membersAlive == 3) { //activeRPGEvents["rpg-"+idOfEventUserIsIn].memberTurnAbilities.length){
                        enemiesUseAbilities(activeRPGEvents["rpg-"+idOfEventUserIsIn]);
                        processRpgTurn(message, activeRPGEvents["rpg-"+idOfEventUserIsIn]);
                    }
                }else{
                    message.channel.send("invalid");
                }
            }else{
                message.channel.send("can't do that");
            }
        }
    }
    else{
        message.channel.send("can't do that2")
    }
}

function validateTarget(target, abilityToUse, event){
    if (!target){
        // check to see if it is an areawide ability
        if (rpgAbilities[abilityToUse] && rpgAbilities[abilityToUse].areawide){
            return true;
        }
        else{
            return false;
        }
    }
    // check that target is valid
    if (target > 0 && target <= event.enemiesCount){
        return true;
    }
    else{
        // if the target is a user then check that the user is part of the event
        if (target > 1000){
            if (event.membersInParty["rpg-"+target]){
                return true;
            }
            else{
                return false;
            }
        }
        return false;
    }
}

function processRpgTurn(message, event){
    var order = [];
    // check all members and enemies and set an order for abilities to take place
    // process all abilities, then check if rpg event ended, if it ended then yield results

    // abilities of members with haste
    
    for ( var abilityIndex in event.memberTurnAbilities){
        var abilityObject = event.memberTurnAbilities[abilityIndex];
        if ( event.membersInParty["rpg-"+abilityObject.user].buffs.indexOf("haste") > -1 ){
            // user has haste, push them to the top of the order
            order.push(abilityObject);
            // remove it from the array of abilities
            event.memberTurnAbilities.splice(abilityIndex, 1);
        }
    }
    // abilities of enemies
    for ( var abilityIndex in event.enemyTurnAbilities){
        var abilityObject = event.enemyTurnAbilities[abilityIndex];

        order.push(abilityObject);
    }
    // remaining abilities of members
    for ( var abilityIndex in event.memberTurnAbilities){
        var abilityObject = event.memberTurnAbilities[abilityIndex];

        order.push(abilityObject);
    }
    // order for abilities is ready, now use the abilities on targets
    var turnString = "";
    // TODO: recalculate buffs stats before anything is cast, after every ability, and after everything is over
    recalculateStatBuffs(event)

    var passiveEffectsString = processPassiveEffects(event);
    while ( order.length > 0 ){
        var currentAbility = order.shift();

        // do the ability
        var abilityToString = processAbility(currentAbility, event)
        recalculateStatBuffs(event)
        turnString = turnString + abilityToString;
    }
    // the order array is empty, check if the rpg event ended
    event.turn = event.turn++;
    var eventHasEnded = checkRpgEventEnd(event);
    if (eventHasEnded.enemiesDead && eventHasEnded.partySuccess){
        // event is over, yield rewards and anouncements
        turnFinishedEmbedBuilder(message, event, turnString);
        event.status = "ended";
        eventEndedEmbedBuilder(message, event, eventHasEnded.partySuccess)

    }
    else if(eventHasEnded.partyDead && !eventHasEnded.partySuccess){
        // event is over, party did not succeed
        turnFinishedEmbedBuilder(message, event, turnString);
        event.status = "ended";
        eventEndedEmbedBuilder(message, event, eventHasEnded.partySuccess)
    }
    else{
        // event is not over, continue with event
        event.enemyTurnAbilities = [];
        event.memberTurnAbilities = [];
        // TODO: create embed that contains the previous turn as well as current rpg status
        turnFinishedEmbedBuilder(message, event, turnString, passiveEffectsString);
    }
}

function turnFinishedEmbedBuilder(message, event, turnString, passiveEffectsString){
    // create a string of all the events that happened
    const embed = new Discord.RichEmbed()
    .setAuthor("test")
    .setColor(0xF2E93E)
    .setDescription(passiveEffectsString + turnString)
    // party members
    var groupString = "";
    var enemiesString = "";

    for (var member in event.members){
        var memberInRpgEvent = event.members[member];
        var memberInParty = event.membersInParty["rpg-" + memberInRpgEvent.id]
        groupString = groupString + "\n" + userStatsStringBuilder(memberInParty, memberInRpgEvent.username, false);
    }
    // enemies
    for (var enemy in event.enemies){
        var enemyInRpgEvent = event.enemies[enemy];
        var enemyName = event.enemies[enemy].name;
        enemiesString = enemiesString + "\n" + userStatsStringBuilder(enemyInRpgEvent, enemyName, true);
    }
    embed.addField( "Group", groupString )
    embed.addField( "Enemy", enemiesString )
    message.channel.send({embed})
    .then(function (sentMessage) {

    })
}

function eventEndedEmbedBuilder(message, event, partySuccess){
    const embed = new Discord.RichEmbed()
    .setAuthor("Event has ended")
    .setColor(0xF2E93E)

    for (var member in event.members){
        var memberInRpgEvent = event.members[member];
        var memberInParty = event.membersInParty["rpg-" + memberInRpgEvent.id];
        var rewards;
        var rewardString = "";
        if (partySuccess){
            rewards = calculateRewards( event, memberInRpgEvent )
            rewardString = rewardString + " " + JSON.stringify(rewards) + " \n";
        }
        else{
            rewards = "None"
            rewardString = rewardString + " " + rewards + " \n";
        }
        embed.addField(memberInRpgEvent.username,  rewardString, true);
    }
    message.channel.send({embed})

    /*
    rewards should be based off current level, difficulty of the enemies, 
    */
}

function calculateRewards(event, memberInRpgEvent){
    var rewardsForPlayer =  {
        xp: 1,
        rpgPoints: 1,
        items: []
    }

    // calculate xp based on level and difficulty of enemies

    // calculate rpgPoints based on level and diff of enemies

    // calculate finds based on luck and diff of enemies

    return rewardsForPlayer;
}

function processPassiveEffects(event){
    var passiveEffectsString = "";
    // process dots, effects individually

    // go through each member
    for(var member in event.membersInParty){
        if (event.membersInParty[member].statuses.indexOf("dead" == -1)){
            for (var index = event.membersInParty[member].statuses.length - 1; index >= 0; index--){
                // go through each status
                if (event.membersInParty[member].statuses.indexOf("dead" == -1)){
                    // if it is a dot, then process the damage of the dot
                    if (event.membersInParty[member].statuses[index].dot){
                        // process the dot
                        var damageToDealToPlayer = event.membersInParty[member].statuses[index].dot.damage
                        event.membersInParty[member].hp = event.membersInParty[member].hp - damageToDealToPlayer;
                        passiveEffectsString = passiveEffectsString + event.membersInParty[member].name + " took " + damageToDealToPlayer + " damage from " + event.membersInParty[member].statuses[index].dot.name + "\n"
                        if (event.membersInParty[member].hp <= 0){
                            event.membersInParty[member].hp = 0;
                            // player is dead, remove all statuses, add dead
                            event.membersInParty[member].statuses = [];
                            event.membersInParty[member].statuses.push("dead");
                            passiveEffectsString = passiveEffectsString + event.membersInParty[member].name + "has died :skull_crossbones: \n"
                            break;
                        }
                        // remove dot after processing
                        if (event.membersInParty[member].statuses[index].dot.expireOnTurn == event.turn){
                            event.membersInParty[member].statuses.splice(index, 1);
                        }
                    }

                    // if it is a hot, process the healing of the hot
                    if (event.membersInParty[member].statuses[index].hot){
                        // process the hot
                        var healingToPlayer = event.membersInParty[member].statuses[index].hot.healing
                        event.membersInParty[member].hp = event.membersInParty[member].hp + healingToPlayer;
                        passiveEffectsString = passiveEffectsString + event.membersInParty[member].name + " took " + healingToPlayer + " healing from " + event.membersInParty[member].statuses[index].hot.name + "\n"                        
                        if (event.membersInParty[member].hp > event.membersInParty[member].maxhp){
                            event.membersInParty[member].hp = event.membersInParty[member].maxhp
                        }

                        if (event.membersInParty[member].statuses[index].hot.expireOnTurn == event.turn){
                            event.membersInParty[member].statuses.splice(index, 1);
                        }
                    }
                    // if it is something else
                }
            }
        }
    }
    // go through each enemy
    for(var enemy in event.enemies){
        if (event.enemies[enemy].statuses.indexOf("dead" == -1)){
            for (var index = event.enemies[enemy].statuses.length - 1; index >= 0; index--){
                // go through each status
                if (event.enemies[enemy].statuses.indexOf("dead" == -1)){
                    // if it is a dot, then process the damage of the dot
                    if (event.enemies[enemy].statuses[index].dot){
                        // process the dot
                        var damageToDealToPlayer = event.enemies[enemy].statuses[index].dot.damage
                        event.enemies[enemy].hp = event.enemies[enemy].hp - damageToDealToPlayer;
                        passiveEffectsString = passiveEffectsString + event.enemies[enemy].name + " took " + damageToDealToPlayer + " damage from " + event.enemies[enemy].statuses[index].dot.name + "\n"
                        
                        if (event.enemies[enemy].hp <= 0){
                            event.enemies[enemy].hp = 0;
                            // player is dead, remove all statuses, add dead
                            event.enemies[enemy].statuses = [];
                            event.enemies[enemy].statuses.push("dead");
                            passiveEffectsString = passiveEffectsString + event.enemies[enemy].name + "has died :skull_crossbones: \n"                            
                            break;
                        }
                        // remove dot after processing
                        if (event.enemies[enemy].statuses[index].dot.expireOnTurn == event.turn){
                            event.enemies[enemy].statuses.splice(index, 1);
                        }
                    }

                    // if it is a hot, process the healing of the hot
                    if (event.enemies[enemy].statuses[index].hot){
                        // process the hot
                        var healingToPlayer = event.enemies[enemy].statuses[index].hot.healing
                        event.enemies[enemy].hp = event.enemies[enemy].hp + healingToPlayer;
                        passiveEffectsString = passiveEffectsString + event.enemies[enemy].name + " took " + healingToPlayer + " healing from " + event.enemies[enemy].statuses[index].hot.name + "\n"                                                
                        if (event.enemies[enemy].hp > event.enemies[enemy].maxhp){
                            event.enemies[enemy].hp = event.enemies[enemy].maxhp
                        }

                        if (event.enemies[enemy].statuses[index].hot.expireOnTurn == event.turn){
                            event.enemies[enemy].statuses.splice(index, 1);
                        }
                    }
                    // if it is something else
                }
            }
        }
    }
    // go through each status, if it is a dot, deal the damage.
    // remove dots, effects individually based on turn, or based on other factors
    return passiveEffectsString;
}

function calculateDamageDealt(ability){
    // damage dealt to user, or damage dealt by dot
}

function calculateHealingDone(ability){
    // healing done to user or healing done by hot
}

function processAbility(abilityObject, event){
    // process the ability individually
    // get the type of ability first
    // damage, healing, status change, 

    // string
    var ability = abilityObject.ability;
    // will return this
    var abilityToString = "";
    var rpgAbility = rpgAbilities[ability] ? rpgAbilities[ability] : undefined;
    var currentTurn = event.turn;
    // check that the user of the ability is still alive
    var abilityCaster = abilityObject.user;
    var stillAlive = true;
    if (abilityCaster > 1000){
        // this is a user
        if (event.membersInParty["rpg-"+abilityCaster].hp <= 0 
            && event.membersInParty["rpg-"+abilityCaster].statuses.indexOf("dead") != -1){
                // caster is no longer alive
                stillAlive = false;
            }
    }else{
        // this is an enemy
        if (event.enemies[abilityCaster].hp <= 0 
            && event.enemies[abilityCaster].statuses.indexOf("dead") != -1){
                // enemy is no longer alive
                stillAlive = false;
            }
    }
    if (rpgAbility && rpgAbility.dmg && stillAlive){
        // this is a damage ability, deal the damage to the target

        // TODO: calculate the amount of damage that you will do to the target based on:
        // caster AD or MD depending on ability, target armor, special buffs, special debuffs some random number gen
        var damageToDeal = rpgAbility.dmg;
        if (rpgAbility.areawide){
            // deal damage area wide against opposite party
            if (abilityCaster > 1000){
                // if caster is party of membersInParty then target = all the enemies

            }
            else{
                // if caster is in enemies then target = all the members of party

            }

        }

        var targetToDealDmg = abilityObject.target;
        // dealing damage to enemies
        if (event.enemies[targetToDealDmg]){
            var targetToDealDmgName = event.enemies[targetToDealDmg].name;
            event.enemies[targetToDealDmg].hp = event.enemies[targetToDealDmg].hp - damageToDeal;
            abilityToString = abilityToString + targetToDealDmgName + " took " + damageToDeal + " damage from " + ability + "\n";
            if (event.enemies[targetToDealDmg].hp <= 0){
                event.enemies[targetToDealDmg].statuses.push("dead")
                event.enemies[targetToDealDmg].hp = 0;
                abilityToString = abilityToString + targetToDealDmgName + " has died. :skull_crossbones: \n";
            }
        }
        // dealing damage to members of party (friendly fire or enemy attacking)
        else if (event.membersInParty[targetToDealDmg]){
            var targetToDealDmgName = event.membersInParty[targetToDealDmg].name;
            event.membersInParty[targetToDealDmg].hp = event.membersInParty[targetToDealDmg].hp - damageToDeal;
            abilityToString = abilityToString + targetToDealDmgName + " took " + damageToDeal + " damage from " + ability + "\n";
            if (event.membersInParty[targetToDealDmg].hp <= 0){
                event.membersInParty[targetToDealDmg].statuses.push("dead");
                event.membersInParty[targetToDealDmg].hp = 0;
                abilityToString = abilityToString + targetToDealDmgName + " has died. :skull_crossbones: \n";
            }
        }
    }
    if (rpgAbility && rpgAbility.heal && stillAlive){
        // this is a healing ability, heal the target
        // TODO : calculate the amount to heal, based on MD and special buffs / debuffs
        var hpToHeal = rpgAbility.heal;
        var targetToHeal = abilityObject.target;
        if (event.membersInParty[targetToHeal]){
            var targetToHealName = event.membersInParty[targetToHeal].name;
            if (event.membersInParty[targetToHeal].statuses.indexOf("dead") == -1){
                // target is not dead
                event.membersInParty[targetToHeal].hp = event.membersInParty[targetToHeal].hp + hpToHeal;
                abilityToString = abilityToString + targetToHealName + " was healed for " + hpToHeal + "\n"
            }
        }
        else if (event.enemies[targetToHeal]){
            var targetToHealName = event.enemies[targetToHeal].name;
            if (event.enemies[targetToHeal].statuses.indexOf("dead") == -1){
                event.enemies[targetToHeal].hp = event.enemies[targetToHeal].hp + hpToHeal;  
                abilityToString = abilityToString + targetToHealName + " was healed for " + hpToHeal + "\n"
            }
        }
    }
    // buffs
    if (rpgAbility && rpgAbility.buff && stillAlive){
        // this is a status changing ability, add / remove the status
        var statusToAdd = rpgAbility.buff;
        var targetToAddStatus = abilityObject.target

        if (event.membersInParty[targetToAddStatus]){
            var targetToAddStatusName = event.membersInParty[targetToAddStatus].name;
            if (event.membersInParty[targetToAddStatus].statuses.indexOf("dead") == -1){
                // target is not dead
                // check that the the user doesn't already have the buff if they do, replace it
                for (var index = event.membersInParty[targetToAddStatus].buffs.length - 1; index >= 0; index-- ){
                    if (event.membersInParty[targetToAddStatus].buffs[index].name == rpgAbility.buff.name ){
                        // pop this object
                        event.membersInParty[targetToAddStatus].buffs.splice(index, 1);
                    }
                }
                event.membersInParty[targetToAddStatus].buffs.push(statusToAdd);
                abilityToString = abilityToString + targetToAddStatusName + " was affected with " + statusToAdd.name + "\n"
            }
        }

        else if (event.enemies[targetToAddStatus]){
            var targetToAddStatusName = event.enemies[targetToAddStatus].name;
            if (event.enemies[targetToAddStatus].statuses.indexOf("dead") == -1){
                for (var index = event.enemies[targetToAddStatus].buffs.length - 1; index >= 0; index-- ){
                    if (event.enemies[targetToAddStatus].buffs[index].name == rpgAbility.buff.name ){
                        // pop this object
                        event.enemies[targetToAddStatus].buffs.splice(index, 1);
                    }
                }
                event.enemies[targetToAddStatus].buffs.push(statusToAdd);
                abilityToString = abilityToString + targetToAddStatusName + " was affected with " + statusToAdd.name + " \n"
            }
        }
    }

    if (rpgAbility && rpgAbility.status && stillAlive){
        // this is a status changing ability, add / remove the status
        var statusToAdd = rpgAbility.status;
        var targetToAddStatus = abilityObject.target

        if (event.membersInParty[targetToAddStatus]){
            var targetToAddStatusName = event.membersInParty[targetToAddStatus].name;
            if (event.membersInParty[targetToAddStatus].statuses.indexOf("dead") == -1){
                // target is not dead
                event.membersInParty[targetToAddStatus].statuses.push(statusToAdd);
                abilityToString = abilityToString + targetToAddStatusName + " was affected with " + statusToAdd + "\n"
            }
        }

        else if (event.enemies[targetToAddStatus]){
            var targetToAddStatusName = event.enemies[targetToAddStatus].name;
            if (event.enemies[targetToAddStatus].statuses.indexOf("dead") == -1){
                event.enemies[targetToAddStatus].statuses.push(statusToAdd);
                abilityToString = abilityToString + targetToAddStatusName + " was affected with " + statusToAdd + " \n"
            }
        }
    }

    if (rpgAbility && rpgAbility.dot && stillAlive){
        // dot has been applied
        // TODO: calculate the dot damage based on MD or AD, target armor, special buff
        var dotToAdd = {}
        dotToAdd.dot = rpgAbility.dot;
        var targetToAddDot = abilityObject.target
        dotToAdd.dot.expireOnTurn = currentTurn + dotToAdd.turnsToExpire;
        // enemy added a dot to party member
        if (event.membersInParty[targetToAddDot]){
            var targetToAddDotName = event.membersInParty[targetToAddDot].name;
            if (event.membersInParty[targetToAddDot].statuses.indexOf("dead") == -1){
                // target is not dead
                event.membersInParty[targetToAddDot].statuses.push(dotToAdd);
                abilityToString = abilityToString + targetToAddDotName + " was affected with " + dotToAdd.dot.name + "\n"
            }
        }

        else if (event.enemies[targetToAddDot]){
            var targetToAddDotName = event.enemies[targetToAddDot].name;
            if (event.enemies[targetToAddDot].statuses.indexOf("dead") == -1){
                event.enemies[targetToAddDot].statuses.push(dotToAdd);
                abilityToString = abilityToString + targetToAddDotName + " was affected with " + dotToAdd.dot.name + " \n"
            }
        }
    }

    if (rpgAbility && rpgAbility.hot && stillAlive){
        // hot has been applied
        // TODO: calculate the hot healing based on MD, special buff, debuff
        var hotToAdd = {}
        hotToAdd.hot = rpgAbility.hot;
        var targetToAddHot = abilityObject.target
        hotToAdd.hot.expireOnTurn = currentTurn + hotToAdd.turnsToExpire;
        // enemy added a hot to party member
        if (event.membersInParty[targetToAddHot]){
            var targetToAddHotName = event.membersInParty[targetToAddHot].name;
            if (event.membersInParty[targetToAddHot].statuses.indexOf("dead") == -1){
                // target is not dead
                event.membersInParty[targetToAddHot].statuses.push(hotToAdd);
                abilityToString = abilityToString + targetToAddHotName + " was affected with " + hotToAdd.hot.name + "\n"
            }
        }

        else if (event.enemies[targetToAddHot]){
            var targetToAddHotName = event.enemies[targetToAddHot].name;
            if (event.enemies[targetToAddHot].statuses.indexOf("dead") == -1){
                event.enemies[targetToAddHot].statuses.push(hotToAdd);
                abilityToString = abilityToString + targetToAddHotName + " was affected with " + hotToAdd.hot.name + " \n"
            }
        }
    }

    if (rpgAbility && rpgAbility.special && stillAlive){
        // handle the ability in a special manner
        if (ability == "bandaid"){
            // remove a status from the target except dead
            var targetToRemoveFrom = abilityObject.target

            if (event.membersInParty[targetToRemoveFrom].statuses.indexOf("dead") == -1 
                && event.membersInParty[targetToRemoveFrom].statuses.length > 0){
                event.membersInParty[targetToRemoveFrom].statuses.splice(0, 1)
                abilityToString = abilityToString + targetToRemoveFrom + " was cured with " + ability + " \n"                
            }
            else if (event.enemies[targetToRemoveFrom].statuses.indexOf("dead") == -1 
                && event.enemies[targetToRemoveFrom].statuses.length > 0){
                event.enemies[targetToRemoveFrom].statuses.splice(0, 1)
                abilityToString = abilityToString + targetToRemoveFrom + " was cured with " + ability + " \n"                
            }
        }
        else if (ability == "revive"){
            // remove dead from statuses and give 40% of max hp
        }
        else if (ability == "finalfortune"){
            
        }
        else if (ability == "bomb"){
            
        }
        else if (ability == "plague"){
            
        }
    }
    return abilityToString;
}

function checkRpgEventEnd(event){
    // check if the rpg event has ended, conditions for event having ended:
    // all members of party are status: dead
    // all enemies are status: dead
    var eventEndedPartyDead = true;
    var eventEndedEnemiesDead = true;
    var success = true;
    // check if all members of party are dead
    for (var member in event.membersInParty){
        if (event.membersInParty[member].statuses.indexOf("dead") < 0){
            eventEndedPartyDead = false;
        }
    }
    // party is dead, no success
    if (eventEndedPartyDead){
        success = false;
    }
    // members of party arent all dead, check if enemies are all dead
    
    for (var enemy in event.enemies){
        if (event.enemies[enemy].statuses.indexOf("dead") < 0 ){
            eventEndedEnemiesDead = false;
        }
    }

    // party nor enemies are dead
    if (eventEndedEnemiesDead){
        success = true;
    }

    return {
        partyDead: eventEndedPartyDead,
        enemiesDead: eventEndedEnemiesDead,
        partySuccess: success
    }
}

function userStatsStringBuilder(userStats, name, isEnemy){
    var userString = "";
    if (isEnemy){
        userString = ":crossed_swords: :heart_decoration: " + (userStats.hp + userStats.statBuffs.hp) + " / " + (userStats.maxhp + userStats.statBuffs.maxhp)
        userString = userString + "   **" + name + "**" + "\n"
    }else{
        userString = ":green_heart: :heart_decoration: " + (userStats.hp + userStats.statBuffs.hp) + " / " + (userStats.maxhp + userStats.statBuffs.maxhp)
        userString = userString + " :shirt: " + (userStats.armor + userStats.statBuffs.armor)
        userString = userString + " :raised_hands: " + (userStats.spirit + userStats.statBuffs.spirit)
        userString = userString + " :dagger: " + (userStats.attackDmg + userStats.statBuffs.attackDmg)
        userString = userString + " :comet: " + (userStats.magicDmg + userStats.statBuffs.magicDmg) + "   **" + name + "**" + "\n"
    }
    if (userStats.element){
        // TODO: show that they are of a certain element
    }
    if (!isEnemy){
        userString = userString + "**Abilities:** " + userStats.abilities + "\n"
    }
    var statusesString = "";
    for (var i in userStats.statuses){
        if (userStats.statuses[i].name){
            statusesString = statusesString + userStats.statuses[i].name + ", "
        }
        else if (userStats.statuses[i].dot && userStats.statuses[i].dot.name){
            statusesString = statusesString + userStats.statuses[i].dot.name + ", "
        }
        else if (userStats.statuses[i].hot && userStats.statuses[i].hot.name){
            statusesString = statusesString + userStats.statuses[i].hot.name + ", "
        }else if(userStats.statuses[i] == "dead"){
            statusesString = statusesString + userStats.statuses[i] + ", "
        }
    }
    userString = userString + "**Status:** " + statusesString + " **Buffs:** " + userStats.buffs;

    return userString;
}

function recalculateStatBuffs(event){
    // check the buffs for the user, take the buff data and use it to recalculate the user's statsBuffs

    for (var member in event.membersInParty){
        var userToProcess = event.membersInParty[member];
        userToProcess.statBuffs = {
            hp: 0,
            attackDmg: 0,
            magicDmg: 0,
            armor: 0,
            spirit: 0,
            maxhp: 0
        }
        for (var buff in event.membersInParty[member].buffs){
            var buffToProcess = event.membersInParty[member].buffs[buff];
            var statToAffectArray = buffToProcess.affects;
            for (var index in statToAffectArray){
                var statToAffect = statToAffectArray[index]
                if (buffToProcess.multiplier){
                    // do a multiplier of the user's current stat
                    var currentStat = userToProcess[statToAffect];
                    if (currentStat){
                        userToProcess.statBuffs[statToAffect] = userToProcess.statBuffs[statToAffect] + (Math.floor((buffToProcess.multiplier * currentStat) - currentStat));
                    }
                }
    
                if (buffToProcess.additive){
                    // do a multiplier of the user's current stat
                    var currentStat = userToProcess[statToAffect];
                    if (currentStat){
                        userToProcess.statBuffs[statToAffect] = userToProcess.statBuffs[statToAffect] + (Math.floor(buffToProcess.additive));
                    }
                }
            }
        }
        
    }
    for (var enemy in event.enemies){
        // TODO : finish this
    }
}

function enemiesUseAbilities(event){
    // for each enemy in the event, pick out an ability to use, pick a valid target for the ability
    // queue up the ability used
    for (var enemy in event.enemies){
        console.log(event.enemies[enemy]);
        // check that the enemy is not dead first 
        if (event.enemies[enemy].statuses.indexOf("dead") == -1){
            // pick an ability, then pick a target, the target must be a member of the party that isnt dead
            var abilityRoll= Math.floor(Math.random() * event.enemies[enemy].abilities.length);
            var abilityPicked = event.enemies[enemy].abilities[abilityRoll];

            // now pick a target
            var validTarget = false;
            var stuckCount = 0
            var target;
            while(!validTarget && stuckCount < 100){
                var targetRoll = Math.floor(Math.random() * event.members.length);
                var targetMember = event.members[targetRoll].id;
                if (event.membersInParty["rpg-"+targetMember].statuses.indexOf("dead") == -1){
                    // valid target
                    target = "rpg-"+targetMember;
                    validTarget = true;
                }
                stuckCount++;
            }
            
            var abilityToProcess = {
                user: enemy,
                ability: abilityPicked,
                target: target
            }

            event.enemyTurnAbilities.push(abilityToProcess);
        }
    }
}

var rpgAbilities = {
    attack : {
        dmg: 50,
        type: "physical"
    },
    tacoheal : {
        heal: 30
    },
    bandaid : {
        special: "remove status"
    },
    orchatasip: {
        hot: {
            name: "orchata sip",
            healing: 4,
            healingOnHotApply: false,
            turnsToExpire: 3,
            healingOnDotExpire: false,
            healingOnExpire: 0
        }
    },
    tacowall: {
        buff: {
            name: "protect physical",
            affects: ["armor"],
            multiplier: 1.25
        }
    },
    barrier: {
        buff: {
            name: "protect magical",
            affects: ["spirit"],
            additive: 30
        }
    },
    flameblast: {
        dmg: 50,
        type: "fire",
        dot: {
            name: "burning",
            damage: 5,
            damageOnDotApply: false,
            turnsToExpire: 5,
            damageOnDotExpire: false,
            damageOnExpire: 0
        }
    },
    foodpoisoning: {
        dmg: 40,
        type: "poison",
        dot: {
            name: "food poisoning",
            damage: 8,
            damageOnDotApply: false,
            turnsToExpire: 3,
            damageOnDotExpire: false,
            damageOnExpire: 0
        }
    },
    shardsofice: {
        dmg: 30,
        type: "ice",
        areawide: true,
        targets: "enemy"
    },
    shock: {
        dmg: 90,
        type: "electric",
        special: "selfdamage",
        selfdamage: 15
    },
    rockthrow: {
        dmg: 20,
        type: "earth",
        buff: {
            name: "warming up",
            maxStacks: 5,
            atMaxStacksDealDamage: 250
        }
    },
    drain: {
        dmg: 20,
        heal: 15,
    },
    haste: {
        buff: "haste"
    },

    //
    revive: {
        special: "remove death"
    },
    empower: {
        buff: {
            name: "empower",
            affects: ["attackdmg", "magicdmg"],
            multiplier: 2
        }
    },
    destructiveshot: {
        dmg: 125,
        charges: 4,
        type: "physical"
    },
    elixir: {
        heal: 22,
        areawide: true,
        targets: "friendly"
    },
    freeze: {
        status: {
            name: "frozen",
            affects: ["armor"],
            multiplier: 0.7
        }
    },
    cripple: {
        status: {
            name: "crippled",
            affects: ["attackdmg"],
            multiplier: 0.7
        }
    },
    weaken: {
        status: {
            name: "weakened",
            affects: ["magicdmg"],
            multiplier: 0.7
        }
    },
    finalfortune: {
        special: "take extra turn",
        special2: "after turn party dies",
        areaWide: true
    },
    shield: {
        buff: {
            name: "shield",
            affects: ["spirit"],
            multiplier: 1.5
        }
    }
}

// enemy abilities
var enemyAbilities = {

}

// possible enemies to fight
// 7 bosses per difficulty
var enemiesToEncounter = {
    easy : [
        {
            name: "Taco Monster 1",
            abilities: [
                "attack",
                "foodpoisoning",
                "shock"
            ],
            buffs: [],
            hp: 100,
            attackDmg: 40,
            magicDmg: 44,
            armor: 24,
            spirit: 24,
            element: "normal"
        },
        {
            name: "Taco Monster 2",
            abilities: [
                "attack",
                "foodpoisoning",
                "shock"
            ],
            buffs: [],
            hp: 100,
            attackDmg: 40,
            magicDmg: 44,
            armor: 24,
            spirit: 24,
            element: "normal"
        },
        {
            name: "Taco Monster 3",
            abilities: [
                "attack",
                "foodpoisoning",
                "shock"
            ],
            buffs: [],
            hp: 100,
            attackDmg: 40,
            magicDmg: 44,
            armor: 24,
            spirit: 24,
            element: "normal"
        }
    ],
    medium: [
        {
            name: "Taco Monster 4",
            abilities: [
                "attack",
                "foodpoisoning",
                "shock"
            ],
            buffs: [],
            hp: 100,
            attackDmg: 40,
            magicDmg: 44,
            armor: 24,
            spirit: 24,
            element: "normal"
        },
        {
            name: "Taco Monster 5",
            abilities: [
                "attack",
                "foodpoisoning",
                "shock"
            ],
            buffs: [],
            hp: 100,
            attackDmg: 40,
            magicDmg: 44,
            armor: 24,
            spirit: 24,
            element: "normal"
        },
        {
            name: "Taco Monster 6",
            abilities: [
                "attack",
                "foodpoisoning",
                "shock"
            ],
            buffs: [],
            hp: 100,
            attackDmg: 40,
            magicDmg: 44,
            armor: 24,
            spirit: 24,
            element: "normal"
        }
    ],
    hard: [
        {
            name: "Taco Monster 7",
            abilities: [
                "attack",
                "foodpoisoning",
                "shock"
            ],
            buffs: [],
            hp: 100,
            attackDmg: 40,
            magicDmg: 44,
            armor: 24,
            spirit: 24,
            element: "normal"
        },
        {
            name: "Taco Monster 8",
            abilities: [
                "attack",
                "foodpoisoning",
                "shock"
            ],
            buffs: [],
            hp: 100,
            attackDmg: 40,
            magicDmg: 44,
            armor: 24,
            spirit: 24,
            element: "normal"
        },
        {
            name: "Taco Monster 9",
            abilities: [
                "attack",
                "foodpoisoning",
                "shock"
            ],
            buffs: [],
            hp: 100,
            attackDmg: 40,
            magicDmg: 44,
            armor: 24,
            spirit: 24,
            element: "normal"
        }
    ],
    boss: [
        {
            name: "Taco Monster 10",
            abilities: [
                "attack",
                "foodpoisoning",
                "shock"
            ],
            buffs: [],
            hp: 1000,
            attackDmg: 40,
            magicDmg: 44,
            armor: 24,
            spirit: 24,
            element: "normal"
        },
        {
            name: "Taco Monster 11",
            abilities: [
                "attack",
                "foodpoisoning",
                "shock"
            ],
            buffs: [],
            hp: 1000,
            attackDmg: 40,
            magicDmg: 44,
            armor: 24,
            spirit: 24,
            element: "normal"
        },
        {
            name: "Taco Monster 12",
            abilities: [
                "attack",
                "foodpoisoning",
                "shock"
            ],
            buffs: [],
            hp: 1000,
            attackDmg: 40,
            magicDmg: 44,
            armor: 24,
            spirit: 24,
            element: "normal"
        }
    ],
    special: [
        {
            name: "Taco Monster 13",
            abilities: [
                "attack",
                "foodpoisoning",
                "shock"
            ],
            buffs: [],
            hp: 100,
            attackDmg: 40,
            magicDmg: 44,
            armor: 24,
            spirit: 24,
            element: "normal"
        },
        {
            name: "Taco Monster 14",
            abilities: [
                "attack",
                "foodpoisoning",
                "shock"
            ],
            buffs: [],
            hp: 100,
            attackDmg: 40,
            magicDmg: 44,
            armor: 24,
            spirit: 24,
            element: "normal"
        }
        
    ]
}


// normal attack
    /*
    revive
    empower (deal 2x more damage)
    dest shot
    elixir (h everyone)
    freeze (takes 2x more phys damage)
    cripple (deals 1/2 physical damage)
    weaken (deals 1/2 magical damage)
    final fortune (take extra turn)
    shield (reduce all damage taken by 50%)
    */
    // abilities based on items worn
    /* (active)
        heal (heal hp)
        bandaid (cure effects)
        tac wall (protect phys)
        barrier (protect magical)
        flame blst (fire)
        food psning (poison)
        shards of ice (ice)
        shock (lightning)
        rock throw (earth)
        drain (regular)
        (passive)
        haste (goes first always)
    */
    // able to scvn?
    // random ult ab from the 3 items
    /*
        
    */
    // 