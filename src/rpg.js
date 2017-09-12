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
    if (usersInRPGEvents["rpg-" + discordUserId]){
        message.channel.send( message.author + " skipped");
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
                            luckPlus: 0,
                            statuses: []
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
                            var luckPlus = itemsAvailable[items[i]].luckplus ? itemsAvailable[items[i]].luckplus : 0;

                            statisticsFromItemsAndLevel.hpPlus = statisticsFromItemsAndLevel.hpPlus + hpPlus;
                            statisticsFromItemsAndLevel.attackDmgPlus = statisticsFromItemsAndLevel.attackDmgPlus + attackDmgPlus;
                            statisticsFromItemsAndLevel.magicDmgPlus = statisticsFromItemsAndLevel.magicDmgPlus + magicDmgPlus;
                            statisticsFromItemsAndLevel.armorPlus = statisticsFromItemsAndLevel.armorPlus + armorPlus;
                            statisticsFromItemsAndLevel.luckPlus = statisticsFromItemsAndLevel.luckPlus + luckPlus;
                        }

                        // added stats from level
                        statisticsFromItemsAndLevel.hpPlus = statisticsFromItemsAndLevel.hpPlus + userStats.level
                        statisticsFromItemsAndLevel.attackDmgPlus = statisticsFromItemsAndLevel.attackDmgPlus + userStats.level
                        statisticsFromItemsAndLevel.magicDmgPlus = statisticsFromItemsAndLevel.magicDmgPlus + userStats.level
                        statisticsFromItemsAndLevel.armorPlus = statisticsFromItemsAndLevel.armorPlus + userStats.level
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
                                if (usersInRPGEvents["rpg-" + partyMember.id] && !partyMember.bot && !usersInRPGEvents["rpg-" + partyMember.id].ready && partyMember.bot){
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
                                    var partyMemberLuckPlus = 0
                                    if (partyMemberStats && partyMemberStats.plusStats){
                                        partyMemberHpPlus = partyMemberStats.plusStats.hpPlus ? partyMemberStats.plusStats.hpPlus : 0
                                        partyMemberAttackDmgPlus = partyMemberStats.plusStats.attackDmgPlus ? partyMemberStats.plusStats.attackDmgPlus : 0
                                        partyMemberMagicDmgPlus = partyMemberStats.plusStats.magicDmgPlus ? partyMemberStats.plusStats.magicDmgPlus : 0
                                        partyMemberArmorPlus = partyMemberStats.plusStats.armorPlus ? partyMemberStats.plusStats.armorPlus : 0
                                        partyMemberLuckPlus = partyMemberStats.plusStats.luckPlus ? partyMemberStats.plusStats.luckPlus: 0
                                    }
                                    membersInParty["rpg-" + partyMember.id] = {
                                        id: partyMember.id,
                                        hp: 100 + partyMemberHpPlus,
                                        attackDmg: 40 + partyMemberAttackDmgPlus,
                                        magicDmg: 44 + partyMemberMagicDmgPlus,
                                        armor: 24 + partyMemberArmorPlus,
                                        luck: 1 + partyMemberLuckPlus,
                                        abilities: ["test", "attack", "tacoHeal", "empower"],
                                        statuses: ["haste"]
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
                                    enemies[enemyIdCount] = {
                                        id: enemyIdCount,
                                        name: "Taco Monster",
                                        hp: 100,
                                        attackDmg: 40,
                                        magicDmg: 44,
                                        armor: 24,
                                        statuses: [],
                                        abilities: [],
                                        element: "fire"
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
                                    // add the members to be a part of this embed message
                                    // at this point they will all be able use abilities
                                    // these abilities will be done in order (enemy first, then user, unless user has haste)
                
                                    // event ends if all enemies are at 0 hp or if all party members are at 0 hp (check after every ability finishes)
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

/// use the abilities

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
                var abilityToProcess = {
                    user: discordUserId,
                    ability: abilityToUse,
                    target: target
                }

                // validate the target
                var validTarget = validateTarget(target, abilityToUse, activeRPGEvents["rpg-"+idOfEventUserIsIn]);
                if (validTarget){
                    activeRPGEvents["rpg-"+idOfEventUserIsIn].memberTurnAbilities.push(abilityToProcess);
                    // TODO: send message saying the user used ability already for that turn
                    // if all users have used their abilities the turn should be processed
                    if (activeRPGEvents["rpg-"+idOfEventUserIsIn].members.length ==  3){ //activeRPGEvents[idOfEventUserIsIn].memberTurnAbilities.length){
                        // TODO: enemies should use abilities here before processing the turn
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
        if (rpgAbilities[abilityToUse] && rpgAbilities[abilityToUse].areaWide){
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
        if ( event.membersInParty["rpg-"+abilityObject.user].statuses.indexOf("haste") > -1 ){
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
        event.enemyTurnAbilities.splice(abilityIndex, 1);
    }
    // remaining abilities of members
    for ( var abilityIndex in event.memberTurnAbilities){
        var abilityObject = event.memberTurnAbilities[abilityIndex];

        order.push(abilityObject);
        event.memberTurnAbilities.splice(abilityIndex, 1);
    }
    // order for abilities is ready, now use the abilities on targets
    var turnString = "";
    while ( order.length > 0 ){
        var currentAbility = order.shift();

        // do the ability
        var abilityToString = processAbility(currentAbility, event)
        turnString = turnString + abilityToString;
    }
    // the order array is empty, check if the rpg event ended
    event.turn = event.turn++;
    var eventHasEnded = checkRpgEventEnd(event);
    if (eventHasEnded.enemiesDead && eventHasEnded.partySuccess){
        // event is over, yield rewards and anouncements
        message.channel.send("test: event has ended success")
        turnFinishedEmbedBuilder(message, event, turnString);
        // TODO: create embed that contains the preivous turn as well as rpg event ended
        // TODO: create embed of all the user's rewards
        eventEndedEmbedBuilder(message, event, eventHasEnded.partySuccess)

    }
    else if(eventHasEnded.partyDead && !eventHasEnded.partySuccess){
        // event is over, party did not succeed
        message.channel.send("test: event has ended fail")
        turnFinishedEmbedBuilder(message, event, turnString);
        // TODO: create embed that contains the preivous turn as well as rpg event ended
        // TODO: create embed of all the user's rewards
        eventEndedEmbedBuilder(message, event, eventHasEnded.partySuccess)
    }
    else{
        // event is not over, continue with event
        message.channel.send("test: event has not ended");
        // TODO: create embed that contains the previous turn as well as current rpg status
        turnFinishedEmbedBuilder(message, event, turnString);
    }
}

function turnFinishedEmbedBuilder(message, event, turnString){
    // create a string of all the events that happened?
    const embed = new Discord.RichEmbed()
    .setAuthor("test")
    .setColor(0xF2E93E)
    .setDescription(turnString)
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
        // add the members to be a part of this embed message
        // at this point they will all be able use abilities
        // these abilities will be done in order (enemy first, then user, unless user has haste)

        // event ends if all enemies are at 0 hp or if all party members are at 0 hp (check after every ability finishes)
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

function processAbility(abilityObject, event){
    // process the ability individually
    // get the type of ability first
    // damage, healing, status change, 

    // string
    var ability = abilityObject.ability;
    // will return this
    var abilityToString = "";
    var rpgAbility = rpgAbilities[ability] ? rpgAbilities[ability] : undefined;

    if (rpgAbility && rpgAbility.dmg){
        // this is a damage ability, deal the damage to the target
        var damageToDeal = rpgAbility.dmg;
        var targetToDealDmg = abilityObject.target;
        // dealing damage to enemies
        if (event.enemies[targetToDealDmg]){
            event.enemies[targetToDealDmg].hp = event.enemies[targetToDealDmg].hp - damageToDeal;
            abilityToString = abilityToString + targetToDealDmg + " took " + damageToDeal + " damage from " + ability + "\n";
            if (event.enemies[targetToDealDmg].hp <= 0){
                event.enemies[targetToDealDmg].statuses.push("dead")
                abilityToString = abilityToString + targetToDealDmg + " has died. :skull_crossbones: \n";
            }
        }
        // dealing damage to members of party (friendly fire or enemy attacking)
        else if (event.membersInParty["rpg-"+targetToDealDmg]){
            event.membersInParty["rpg-"+targetToDealDmg].hp = event.membersInParty["rpg-"+targetToDealDmg].hp - damageToDeal;
            abilityToString = abilityToString + targetToDealDmg + " took " + damageToDeal + " damage from " + ability + "\n";
            if (event.membersInParty["rpg-"+targetToDealDmg].hp <= 0){
                event.membersInParty["rpg-"+targetToDealDmg].statuses.push("dead")
                abilityToString = abilityToString + targetToDealDmg + " has died. :skull_crossbones: \n";
            }
        }
    }
    if (rpgAbility && rpgAbility.heal){
        // this is a healing ability, heal the target
        var hpToHeal = rpgAbility.heal;
        var targetToHeal = abilityObject.target;
        if (event.membersInParty["rpg-"+targetToHeal]){
            if (event.membersInParty["rpg-"+targetToHeal].statuses.indexOf("dead") == -1){
                // target is not dead
                event.membersInParty["rpg-"+targetToHeal].hp = event.membersInParty["rpg-"+targetToHeal].hp + hpToHeal;
                abilityToString = abilityToString + " " + event.membersInParty["rpg-"+targetToHeal].name + " was healed for " + hpToHeal + "\n"
            }
        }
        else if (event.enemies[targetToHeal]){
            if (event.enemies[targetToHeal].statuses.indexOf("dead") == -1){
                event.enemies[targetToHeal].hp = event.enemies[targetToHeal].hp + hpToHeal;  
                abilityToString = abilityToString + " " + event.enemies[targetToHeal].name + " was healed for " + hpToHeal + "\n"
            }
        }
    }
    if (rpgAbility && rpgAbility.status){
        // this is a status changing ability, add / remove the status
        var statusToAdd = rpgAbility.status;
        var targetToAddStatus = abilityObject.target

        if (event.membersInParty["rpg-"+targetToAddStatus]){
            if (event.membersInParty["rpg-"+targetToAddStatus].statuses.indexOf("dead") == -1){
                // target is not dead
                event.membersInParty["rpg-"+targetToAddStatus].statuses.push(statusToAdd);
                abilityToString = abilityToString + " " + event.membersInParty["rpg-"+targetToAddStatus].name + " was affected with " + statusToAdd + "\n"
            }
        }

        else if (event.enemies[targetToAddStatus]){
            if (event.enemies[targetToAddStatus].statuses.indexOf("dead") == -1){
                event.enemies[targetToAddStatus].statuses.push(statusToAdd);
                abilityToString = abilityToString + " " + event.enemies[targetToAddStatus].name + " was affected with " + statusToAdd + " \n"
            }
        }
    }

    if (rpgAbility && rpgAbility.special){
        // handle the ability in a special manner
        if (ability == "baindaid"){
            // remove a status from the target
        }
    }
    return abilityToString;
    /*
    abilityToProcess = {
        user: discordUserId,
        ability: abilityToUse,
        target: target
    }
    */
}

function checkRpgEventEnd(event){
    // check if the rpg event has ended

    // conditions for event having ended:
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
        userString = ":crossed_swords: **" + name + "** :heart_decoration: " + userStats.hp + " / " + userStats.maxhp
    }else{
        userString = ":green_heart: **" + name + "** :heart_decoration: " + userStats.hp + " / " + userStats.maxhp
    }
    userString = userString + " **:shirt:** " + userStats.armor
    userString = userString + " **:dagger:** " + userStats.attackDmg
    userString = userString + " **:comet:** " + userStats.magicDmg + "\n"
    if (userStats.element){
        // TODO: show that they are of a certain element
    }
    if (!isEnemy){
        userString = userString + "**Abilities:** " + userStats.abilities + "\n"
    }
    userString = userString + "**Status:** " + userStats.statuses

    return userString;
}

function enemiesUseAbilities(event){
    // TODO: 
    // for each enemy in the event, pick out an ability to use, pick a valid target for the ability
    // queue up the ability used
}

var rpgAbilities = {
    test : {
        dmg: 50,
        type: "physical"
    },
    attack : {
        dmg: 50,
        type: "physical"
    },
    tacoHeal : {
        heal: 30
    },
    bandaid : {
        special: "remove status"
    },
    tacoWall: {
        status: "protect physical"
    },
    barrier: {
        status: "protect magical"
    },
    flameBlast: {
        dmg: 50,
        type: "fire"
    },
    foodPoisoning: {
        dmg: 40,
        type: "poison"
    },
    shardsOfIce: {
        dmg: 50,
        type: "ice"
    },
    shock: {
        dmg: 50,
        type: "electric"
    },
    rockThrow: {
        dmg: 60,
        type: "earth"
    },
    drain: {
        dmg: 20,
        heal: 15,
    },
    haste: {
        status: "haste"
    },

    //
    revive: {
        special: "remove death"
    },
    empower: {
        status : "dmg x2"
    },
    destructiveShot: {
        dmg: 125,
        type: "physical"
    },
    elixir: {
        heal: 30,
        targets: "all party members"
    },
    freeze: {
        status: "receive 2x physical dmg"
    },
    cripple: {
        status: "deal 1/2 physical dmg"
    },
    weaken: {
        status: "deal 1/2 magic dmg"
    },
    finalFortune: {
        special: "take extra turn",
        special2: "after turn party dies",
        areaWide: true
    },
    shield: {
        status: "reduce all dmg by 1/2"
    }
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