const Discord = require("discord.js");
var Promise = require('bluebird');
var profileDB = require("./profileDB.js");
var config = require("./config");
var moment = require("moment");

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
    // check to see all the team members are available and not already in an event
    var validTeam = true;
    for (var member in team){
        if (usersInRPGEvents["rpg-"+team[member].id]){
            validTeam = false;
        }
        
        if (team[member].bot){
            validTeam = false;
        }
        
    }

    if (team.length >= 2 && team.length <= 4 && validTeam){
        // send an embed that the users are needed for the RPG event to say -ready or -notready
        // if the user says -ready, they get added to activeRPGEvents that they were invited to
        const embed = new Discord.RichEmbed()
        .setAuthor("(BETA)RPG Event initiated by " + message.author.username + "!" )
        .setThumbnail("https://media.giphy.com/media/mIZ9rPeMKefm0/giphy.gif")
        .setColor(0xF2E93E)
        .addField('Ready up ', "when ready type -ready, if skipping type -skip" )
    
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
        message.channel.send("not enough members in your party for this event or someone is already in an event")
    }
}

module.exports.rpgSkip = function(message){
    // create an embed saying that b is about to happen, for users MAX of 5 users and they must all say -ready to start costs 5 tacos per person
    var discordUserId = message.author.id;
    var idOfUserInEvent = usersInRPGEvents["rpg-" + discordUserId] ? usersInRPGEvents["rpg-" + discordUserId].id : undefined;
    var idOfActiveRPGEvent = activeRPGEvents["rpg-"+idOfUserInEvent] ? activeRPGEvents["rpg-"+idOfUserInEvent] : undefined;
    var statusOfEvent;
    if (idOfActiveRPGEvent){
        statusOfEvent = activeRPGEvents["rpg-"+idOfUserInEvent].status ? activeRPGEvents["rpg-"+idOfUserInEvent].status : undefined;        
    }

    if (idOfUserInEvent
        && idOfActiveRPGEvent
        && statusOfEvent == "waiting"
        || statusOfEvent == "in progress"){
            message.channel.send( message.author + " skipped and event has been canceled");

            var idOfEventToDelete = "";
            for (var member in idOfActiveRPGEvent.members){
                var idToRemove = idOfActiveRPGEvent.members[member].id
                if (usersInRPGEvents["rpg-" + idToRemove]){
                    idOfEventToDelete = "rpg-" + usersInRPGEvents["rpg-" + idToRemove].id;
                    delete usersInRPGEvents["rpg-" + idToRemove];
                }
            }
            if (activeRPGEvents[idOfEventToDelete]){
                delete activeRPGEvents[idOfEventToDelete];
            }
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
                var now = new Date();
                var oneHourAgo = new Date();
                ///////// CALCULATE THE MINUTES REDUCED HERE 
                oneHourAgo = new Date(oneHourAgo.setHours(oneHourAgo.getHours() - 1));

                if (userData.data.lastrpgtime || oneHourAgo > userData.data.lastrpgtime ){
                    // get the user profile data
                    var userStats = userData.data;

                    profileDB.getUserWearInfo(discordUserId, function(wearErr, wearData){
                        if (wearErr){
                            console.log(wearErr);
                            message.channel.send("something went wrong [wearing] - someone doesn't have a wearing profile");
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
                                if (itemsAvailable[items[i]].ability2){
                                    abilities.push(itemsAvailable[items[i]].ability2);
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
                                    for (var member in activeRPGEvents[rpgEvent].members){
                                        var partyMember = activeRPGEvents[rpgEvent].members[member];
                                        // if the user is the last user needed to be ready, create the RPG event
                                        if (!partyMember.bot){
                                            profileDB.updateLastRpgTime(partyMember.id, function(updateLSErr, updateLSres){
                                                if(updateLSErr){
                                                    console.log(updateLSErr);
                                                }
                                                else{
                                                    console.log(updateLSres)
                                                }
                                            })
                                        }
                                    }
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
                                        }else if (!partyMemberStats){
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
                                            var items = [];
                                            var abilities = []
                                            partyMemberStats = {
                                                level: 1,
                                                plusStats: statisticsFromItemsAndLevel,
                                                itemsBeingWorn: items,
                                                abilities: abilities
                                            };
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
                                            hp: 100 + (20 *  partyMemberStats.level ) + partyMemberHpPlus,
                                            attackDmg: 10 + (6 * partyMemberStats.level) + partyMemberAttackDmgPlus,
                                            magicDmg:  10 + (6 * partyMemberStats.level) + partyMemberMagicDmgPlus,
                                            armor: 5 + (3 * partyMemberStats.level) + partyMemberArmorPlus,
                                            spirit: 5 + (3 * partyMemberStats.level) + partyMemberSpiritPlus,
                                            luck: 1 + partyMemberLuckPlus,
                                            abilities: ["attack"],
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
                                            buffs: [
                                            ]
                                        }
                                        membersInParty["rpg-" + partyMember.id].maxhp = membersInParty["rpg-" + partyMember.id].hp;
                                        // insert the abilities and statuses for the party member
                                        if (partyMemberStats && partyMemberStats.abilities){
                                            for( var ability in partyMemberStats.abilities){
                                                if (rpgAbilities[partyMemberStats.abilities[ability]].passive){
                                                    // add it as a buff
                                                    membersInParty["rpg-" + partyMember.id].buffs.push(rpgAbilities[partyMemberStats.abilities[ability]].buff);
                                                }else{
                                                    membersInParty["rpg-" + partyMember.id].abilities.push(partyMemberStats.abilities[ability]);                                                
                                                }
                                            }
                                        }
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
                                            hp: enemyFound.hp + (20 * maxLevelInParty),
                                            attackDmg: enemyFound.attackDmg + (3 * maxLevelInParty),
                                            magicDmg: enemyFound.magicDmg + (3 * maxLevelInParty),
                                            armor: enemyFound.armor + (3 * maxLevelInParty),
                                            spirit: enemyFound.spirit + ( 3 * maxLevelInParty),
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
                                    .setAuthor("Taco RPG Event has started !!")
                                    .setDescription("do -cast [ability name] [target (1-5 for enemies, @user for group members)] \n example: -cast attack 1 OR -cast tacoheal @bender")
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
                                    message.channel.send("waiting on the rest of the group");
                                }
                            }
                        }
                    })
                }
                else{
                    now = new Date(now.setMinutes(now.getMinutes()));
                    var numberOfHours = getDateDifference(userData.data.lastrpgtime, now, 1);
                    message.channel.send(message.author + " You have rpgd too recently! please wait `" + numberOfHours +"` ");
                }
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

function getDateDifference(beforeDate, now, hoursDifference){
    // get difference between now and beforeDate + hoursDifference 
    
    var afterDate = new Date(beforeDate.setHours(beforeDate.getHours() + hoursDifference));
    var momentAfterDate = moment(afterDate);

    var daysToAdd = momentAfterDate.diff(now, 'days');
    var nowPlusDays = new Date(now.setHours(now.getHours() + (daysToAdd * 24) ));
    var hoursToAdd =  momentAfterDate.diff(now, 'hours'); 
    var nowPlusHours = new Date(now.setHours(now.getHours() + hoursToAdd));
    var minutesToAdd = momentAfterDate.diff(nowPlusHours, 'minutes');
    var nowPlusMinutes = new Date(nowPlusHours.setMinutes(nowPlusHours.getMinutes() + minutesToAdd));
    var secondsToAdd = momentAfterDate.diff(nowPlusMinutes, 'seconds');
    var nowPlusSeconds = new Date(nowPlusMinutes.setMinutes(nowPlusMinutes.getSeconds() + secondsToAdd));
    
    var dateDifferenceString = "";
    if (daysToAdd > 0){
        dateDifferenceString = dateDifferenceString + daysToAdd + " Days ";
    }
    if (hoursToAdd > 0){
        dateDifferenceString = dateDifferenceString + hoursToAdd + " Hours ";
    }
    if (minutesToAdd > 0){
        dateDifferenceString = dateDifferenceString + minutesToAdd + " Minutes ";
    }
    if (secondsToAdd > 0){
        dateDifferenceString = dateDifferenceString + secondsToAdd + " Seconds ";
    }
    return dateDifferenceString;
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
                // able to use ability
                var alreadyUsedAbility = false;
                for (var i in activeRPGEvents["rpg-"+idOfEventUserIsIn].memberTurnAbilities ){
                    if (activeRPGEvents["rpg-"+idOfEventUserIsIn].memberTurnAbilities[i].user == discordUserId){
                        alreadyUsedAbility = true;
                    }
                }
                var validTarget = validateTarget(target, abilityToUse, activeRPGEvents["rpg-"+idOfEventUserIsIn]);
                if (validTarget && !alreadyUsedAbility){
                    activeRPGEvents["rpg-"+idOfEventUserIsIn].memberTurnAbilities.push(abilityToProcess);
                    // if all users have used their abilities the turn should be processed

                    // get the number of users that are alive and compare to the memberturnabilities array length
                    var membersAlive = 0;
                    for (var member in activeRPGEvents["rpg-"+idOfEventUserIsIn].membersInParty){
                        if (activeRPGEvents["rpg-"+idOfEventUserIsIn].membersInParty[member].statuses.indexOf("dead") == -1){
                            membersAlive++;
                        }
                    }
                    if (membersAlive == activeRPGEvents["rpg-"+idOfEventUserIsIn].memberTurnAbilities.length){
                        enemiesUseAbilities(activeRPGEvents["rpg-"+idOfEventUserIsIn]);
                        processRpgTurn(message, activeRPGEvents["rpg-"+idOfEventUserIsIn]);
                    }
                }else{
                    message.channel.send("invalid ability or already used ability");
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
    for ( var index = event.memberTurnAbilities.length - 1; index >= 0; index--){
        var abilityObject = event.memberTurnAbilities[index];
        for (var i in event.membersInParty["rpg-"+abilityObject.user].buffs){
            if (event.membersInParty["rpg-"+abilityObject.user].buffs[i].name == "haste"){
                order.push(abilityObject);
                event.memberTurnAbilities.splice(index, 1);
            }
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
    
    var eventHasEnded = checkRpgEventEnd(event);
    if (eventHasEnded.enemiesDead && eventHasEnded.partySuccess){
        // event is over, yield rewards and anouncements
        var endOfTurnString = effectsOnTurnEnd(event)
        turnFinishedEmbedBuilder(message, event, turnString, passiveEffectsString, endOfTurnString);
        event.status = "ended";
        eventEndedEmbedBuilder(message, event, eventHasEnded.partySuccess)

        // cleanup
        cleanupEventEnded(event);
    }
    else if(eventHasEnded.partyDead && !eventHasEnded.partySuccess){
        // event is over, party did not succeed
        var endOfTurnString = effectsOnTurnEnd(event)
        turnFinishedEmbedBuilder(message, event, turnString, passiveEffectsString, endOfTurnString);
        event.status = "ended";
        eventEndedEmbedBuilder(message, event, eventHasEnded.partySuccess)

        // cleanup
        cleanupEventEnded(event);
    }
    else{
        // event is not over, continue with event
        event.enemyTurnAbilities = [];
        event.memberTurnAbilities = [];
        var endOfTurnString = effectsOnTurnEnd(event)
        event.turn = event.turn + 1;
        turnFinishedEmbedBuilder(message, event, turnString, passiveEffectsString, endOfTurnString);
    }
}

function cleanupEventEnded(event){
    var idOfEventToDelete = "";
    for (var member in event.membersInParty){
        var idToRemove = event.membersInParty[member].id
        if (usersInRPGEvents["rpg-" + idToRemove]){
            idOfEventToDelete = "rpg-" + usersInRPGEvents["rpg-" + idToRemove].id;
            delete usersInRPGEvents["rpg-" + idToRemove];
        }
    }
    if (activeRPGEvents[idOfEventToDelete]){
        delete activeRPGEvents[idOfEventToDelete];
    }
}

function turnFinishedEmbedBuilder(message, event, turnString, passiveEffectsString, endOfTurnString){
    // create a string of all the events that happened
    const embed = new Discord.RichEmbed()
    .setAuthor("(BETA) Taco RPG Event")
    .setColor(0xF2E93E)
    .setDescription(passiveEffectsString + turnString + endOfTurnString)
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
            rewardString = rewardString + " No rewards being given out currently." + JSON.stringify(rewards) + " \n";
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


function effectsOnTurnEnd(event){
    var endOfTurnString = "";
    // check buffs and statuses for each member, and enemy. if "onTurnEnd" exists then do the effect
    var currentTurn = event.turn;
    for (var member in event.membersInParty){
        if (event.membersInParty[member].statuses.indexOf("dead" == -1)){
            for (var index = event.membersInParty[member].buffs.length - 1; index >= 0; index--){
                if (event.membersInParty[member].buffs.indexOf("dead" == -1)){

                    if (event.membersInParty[member].buffs[index].onTurnEnd){
                        // process the on turn end event
                        if (event.membersInParty[member].buffs[index].onTurnEnd.attackDmgPlus){
                            if (event.membersInParty[member].buffs[index].onTurnEnd.currentTurn >= event.membersInParty[member].buffs[index].onTurnEnd.startTurn
                            && currentTurn % event.membersInParty[member].buffs[index].onTurnEnd.everyNTurns == 0){
                                event.membersInParty[member].attackDmg = event.membersInParty[member].attackDmg + event.membersInParty[member].buffs[index].onTurnEnd.attackDmgPlus                                
                                // TODO: add to end of turn string
                            }
                        }
                    }
                }
            }
        }
    }

    for (var enemy in event.enemies){
        if (event.enemies[enemy].statuses.indexOf("dead" == -1)){
            for (var index = event.enemies[enemy].buffs.length - 1; index >= 0; index--){
                if (event.enemies[enemy].buffs.indexOf("dead" == -1)){

                    if (event.enemies[enemy].buffs[index].onTurnEnd){
                        // process the on turn end event
                        if (event.enemies[enemy].buffs[index].onTurnEnd.attackDmgPlus){
                            if (currentTurn >= event.enemies[enemy].buffs[index].onTurnEnd.startTurn
                            && currentTurn % event.enemies[enemy].buffs[index].onTurnEnd.everyNTurns == 0){
                                event.enemies[enemy].attackDmg = event.enemies[enemy].attackDmg + event.enemies[enemy].buffs[index].onTurnEnd.attackDmgPlus
                                endOfTurnString = endOfTurnString + event.enemies[enemy].name + 
                                " +" + event.enemies[enemy].buffs[index].onTurnEnd.attackDmgPlus + " :dagger:" +
                                " from " + event.enemies[enemy].buffs[index].name
                            }
                        }
                    }
                }
            }
        }
    }

    return endOfTurnString;

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
                        var damageToDealToPlayer = calculateDamageDealt(event, event.membersInParty[member].statuses[index].dot.caster, member, event.membersInParty[member].statuses[index].dot)
                        event.membersInParty[member].hp = event.membersInParty[member].hp - damageToDealToPlayer;
                        passiveEffectsString = passiveEffectsString + event.membersInParty[member].name + " took " + damageToDealToPlayer + " damage from " + event.membersInParty[member].statuses[index].dot.name + "\n"
                        if (event.membersInParty[member].hp <= 0){
                            event.membersInParty[member].hp = 0;
                            // player is dead, remove all statuses, add dead
                            event.membersInParty[member].statuses = [];
                            event.membersInParty[member].statuses.push("dead");
                            event.membersInParty[member].buffs = [];
                            passiveEffectsString = passiveEffectsString + event.membersInParty[member].name + "has died :skull_crossbones: \n"
                            break;
                        }
                        // remove dot after processing
                        if (event.membersInParty[member].statuses[index].dot.expireOnTurn == event.turn){
                            event.membersInParty[member].statuses.splice(index, 1);
                            continue;
                        }
                    }
                    // if it is something else
                }
            }
        }
    }

    for(var member in event.membersInParty){
        if (event.membersInParty[member].statuses.indexOf("dead" == -1)){
            for (var index = event.membersInParty[member].buffs.length - 1; index >= 0; index--){
                // go through each status
                if (event.membersInParty[member].statuses.indexOf("dead" == -1)){
                    // if it is a hot, process the healing of the hot
                    if (event.membersInParty[member].buffs[index].hot){
                        // process the hot
                        var healingToPlayer = calculateHealingDone(event, event.membersInParty[member].buffs[index].hot.caster, member, event.membersInParty[member].buffs[index].hot)
                        event.membersInParty[member].hp = event.membersInParty[member].hp + healingToPlayer;
                        passiveEffectsString = passiveEffectsString + event.membersInParty[member].name + " took " + healingToPlayer + " healing from " + event.membersInParty[member].buffs[index].hot.name + "\n"                        
                        if (event.membersInParty[member].hp > event.membersInParty[member].maxhp){
                            event.membersInParty[member].hp = event.membersInParty[member].maxhp
                        }

                        if (event.membersInParty[member].buffs[index].hot.expireOnTurn == event.turn){
                            event.membersInParty[member].buffs.splice(index, 1);
                            continue;
                        }
                    }
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
                        var damageToDealToPlayer = calculateDamageDealt(event, event.enemies[enemy].statuses[index].dot.caster, enemy, event.enemies[enemy].statuses[index].dot)
                        event.enemies[enemy].hp = event.enemies[enemy].hp - damageToDealToPlayer;
                        passiveEffectsString = passiveEffectsString + event.enemies[enemy].name + " took " + damageToDealToPlayer + " damage from " + event.enemies[enemy].statuses[index].dot.name + "\n"
                        
                        if (event.enemies[enemy].hp <= 0){
                            event.enemies[enemy].hp = 0;
                            // player is dead, remove all statuses, add dead
                            event.enemies[enemy].statuses = [];
                            event.enemies[enemy].statuses.push("dead");
                            event.enemies[enemy].buffs = [];
                            passiveEffectsString = passiveEffectsString + event.enemies[enemy].name + "has died :skull_crossbones: \n"                            
                            break;
                        }
                        // remove dot after processing
                        if (event.enemies[enemy].statuses[index].dot.expireOnTurn == event.turn){
                            event.enemies[enemy].statuses.splice(index, 1);
                            continue;
                        }
                    }
                    // if it is something else
                }
            }
        }
    }

    for(var enemy in event.enemies){
        if (event.enemies[enemy].statuses.indexOf("dead" == -1)){
            for (var index = event.enemies[enemy].buffs.length - 1; index >= 0; index--){
                // go through each status
                if (event.enemies[enemy].statuses.indexOf("dead" == -1)){
                     // if it is a hot, process the healing of the hot
                     if (event.enemies[enemy].buffs[index].hot){
                        // process the hot
                        var healingToPlayer = calculateHealingDone(event, event.enemies[enemy].buffs[index].hot.caster, enemy, event.enemies[enemy].buffs[index].hot)
                        event.enemies[enemy].hp = event.enemies[enemy].hp + healingToPlayer;
                        passiveEffectsString = passiveEffectsString + event.enemies[enemy].name + " took " + healingToPlayer + " healing from " + event.enemies[enemy].buffs[index].hot.name + "\n"                                                
                        if (event.enemies[enemy].hp > event.enemies[enemy].maxhp){
                            event.enemies[enemy].hp = event.enemies[enemy].maxhp
                        }

                        if (event.enemies[enemy].buffs[index].hot.expireOnTurn == event.turn){
                            event.enemies[enemy].buffs.splice(index, 1);
                            continue;
                        }
                    }
                }
            }
        }
    }
    // go through each status, if it is a dot, deal the damage.
    // remove dots, effects individually based on turn, or based on other factors
    return passiveEffectsString;
}

function calculateDamageDealt(event, caster, target, rpgAbility){
    // damage dealt to user, or damage dealt by dot
    // check the ability is cast by a member of party or enemy and get their stats
    var baseDamage = rpgAbility.dmg;
    var abilityType = rpgAbility.type;
    var areaWideAbility = rpgAbility.areawide;
    if (caster <= 1000){
        // the caster is an enemy
        var checkTarget = event.membersInParty[target];
        
        if (checkTarget || areaWideAbility){
            // the target is a user
            var userStats = event.enemies[caster];
            var targetStats = event.membersInParty[target];
            // add damage 
            if (abilityType == "physical"){
                // use attack damage
                var damageToIncrease = 0
                if (rpgAbility && rpgAbility.turnsToExpire){
                    damageToIncrease = damageToIncrease + (userStats.attackDmg + userStats.statBuffs.attackDmg);
                    baseDamage = baseDamage + ( damageToIncrease / rpgAbility.turnsToExpire )
                }else{
                    if (rpgAbility.areawide){
                        // take 40% of attackDmg only
                        damageToIncrease = damageToIncrease + (userStats.attackDmg + userStats.statBuffs.attackDmg);
                        baseDamage = baseDamage + (damageToIncrease * 0.4)
                    }else{
                        damageToIncrease = damageToIncrease + (userStats.attackDmg + userStats.statBuffs.attackDmg);
                        baseDamage = baseDamage + damageToIncrease
                    }
                }

                // now reduce damage from armor
                var damageToReduce = 0
                if (rpgAbility.areawide){
                    // get the average armor of membersInPary
                    var totalArmor = 0;
                    var numberOfMembers = 0;
                    for (var member in event.membersInParty){
                        numberOfMembers++;
                        totalArmor = totalArmor + (event.membersInParty[member].armor + event.membersInParty[member].statBuffs.armor);
                    }
                    var averageArmor = totalArmor / numberOfMembers;
                    damageToReduce = damageToReduce + averageArmor;
                }
                else{
                    if (rpgAbility && rpgAbility.turnsToExpire){
                        damageToReduce = damageToReduce + ( ( targetStats.armor + targetStats.statBuffs.armor) * 0.25)
                    }else{
                        damageToReduce = damageToReduce + ( targetStats.armor + targetStats.statBuffs.armor)
                    }
                }
                if (damageToReduce > baseDamage){
                    baseDamage = Math.floor(baseDamage * 0.25)
                }else{
                    baseDamage = baseDamage - damageToReduce;
                }
                // additional RNG
                var rngDmgRoll = Math.floor(Math.random() * Math.floor(baseDamage * 0.20)) + 1;
                baseDamage = baseDamage  + rngDmgRoll;
            }else{
                // use magic damage
                var damageToIncrease = 0
                if (rpgAbility && rpgAbility.turnsToExpire){
                    damageToIncrease = damageToIncrease + (userStats.magicDmg + userStats.statBuffs.magicDmg);
                    baseDamage = baseDamage + ( damageToIncrease / rpgAbility.turnsToExpire )
                }else{
                    if (rpgAbility.areawide){
                        // take 40% of magicDmg only
                        damageToIncrease = damageToIncrease + (userStats.magicDmg + userStats.statBuffs.magicDmg);
                        baseDamage = baseDamage + (damageToIncrease * 0.4)
                    }else{
                        damageToIncrease = damageToIncrease + (userStats.magicDmg + userStats.statBuffs.magicDmg);
                        baseDamage = baseDamage + damageToIncrease
                    }
                }

                // now reduce damage from spirit
                var damageToReduce = 0
                if (rpgAbility.areawide){
                    // get the average spirit of membersInParty
                    var totalSpirit = 0;
                    var numberOfMembers = 0;
                    for (var member in event.membersInParty){
                        numberOfMembers++;
                        totalSpirit = totalSpirit + (event.membersInParty[member].spirit + event.membersInParty[member].statBuffs.spirit);
                    }
                    var averageSpirit = totalSpirit / numberOfMembers;
                    damageToReduce = damageToReduce + averageSpirit;
                }
                else{
                    if (rpgAbility && rpgAbility.turnsToExpire){
                        damageToReduce = damageToReduce + ( ( targetStats.spirit + targetStats.statBuffs.spirit) * 0.25)
                    }
                    else{
                        damageToReduce = damageToReduce + ( targetStats.spirit + targetStats.statBuffs.spirit)
                    }
                }
                
                if (damageToReduce > baseDamage){
                    baseDamage = Math.floor(baseDamage * 0.25)
                }else{
                    baseDamage = baseDamage - damageToReduce;
                }
                // additional RNG
                var rngDmgRoll = Math.floor(Math.random() * Math.floor(baseDamage * 0.20)) + 1;
                baseDamage = baseDamage + rngDmgRoll;
            }
        }else{
            // enemy is attacking their ally?
            var checkTarget = event.enemies[target];

            if (checkTarget){
                var userStats = event.enemies[caster];
                var targetStats = event.enemies[target];
                // add damage 
                if (abilityType == "physical"){
                    // use attack damage
                    var damageToIncrease = 0
                    if (rpgAbility &&  rpgAbility.turnsToExpire){
                        damageToIncrease = damageToIncrease + (userStats.attackDmg + userStats.statBuffs.attackDmg);
                        baseDamage = baseDamage + ( damageToIncrease / rpgAbility.turnsToExpire )
                    }else{
                        if (rpgAbility.areawide){
                            // take 40% of attackDmg only
                            damageToIncrease = damageToIncrease + (userStats.attackDmg + userStats.statBuffs.attackDmg);
                            baseDamage = baseDamage + (damageToIncrease * 0.4)
                        }else{
                            damageToIncrease = damageToIncrease + (userStats.attackDmg + userStats.statBuffs.attackDmg);
                            baseDamage = baseDamage + damageToIncrease
                        }
                    }
    
                    // now reduce damage from armor
                    var damageToReduce = 0
                    if (rpgAbility.areawide){
                        // get the average spirit of enemies
                        var totalArmor = 0;
                        var numberOfMembers = 0;
                        for (var enemy in event.enemies){
                            numberOfMembers++;
                            totalArmor = totalArmor + (event.enemies[enemy].armor + event.enemies[enemy].statBuffs.armor);
                        }
                        var averageArmor = totalArmor / numberOfMembers;
                        damageToReduce = damageToReduce + averageArmor;
                    }
                    else{
                        if (rpgAbility && rpgAbility.turnsToExpire){
                            damageToReduce = damageToReduce + ( ( targetStats.armor + targetStats.statBuffs.armor) * 0.25)
                        }else{
                            damageToReduce = damageToReduce + ( targetStats.armor + targetStats.statBuffs.armor)
                        }
                    }
                    
                    if (damageToReduce > baseDamage){
                        baseDamage = Math.floor(baseDamage * 0.25)
                    }else{
                        baseDamage = baseDamage - damageToReduce;
                    }
                    // additional RNG
                    var rngDmgRoll = Math.floor(Math.random() * Math.floor(baseDamage * 0.20)) + 1;
                    baseDamage = baseDamage  + rngDmgRoll;
                }else{
                    // use magic damage
                    var damageToIncrease = 0
                    if (rpgAbility && rpgAbility.turnsToExpire){
                        damageToIncrease = damageToIncrease + (userStats.magicDmg + userStats.statBuffs.magicDmg);
                        baseDamage = baseDamage + ( damageToIncrease / rpgAbility.turnsToExpire )
                    }else{
                        if (rpgAbility.areawide){
                            // take 40% of magicDmg only
                            damageToIncrease = damageToIncrease + (userStats.magicDmg + userStats.statBuffs.magicDmg);
                            baseDamage = baseDamage + (damageToIncrease * 0.4)
                        }else{
                            damageToIncrease = damageToIncrease + (userStats.magicDmg + userStats.statBuffs.magicDmg);
                            baseDamage = baseDamage + damageToIncrease
                        }
                    }
    
                    // now reduce damage from spirit
                    var damageToReduce = 0
                    if (rpgAbility.areawide){
                        // get the average spirit of enemies
                        var totalSpirit = 0;
                        var numberOfMembers = 0;
                        for (var enemy in event.enemies){
                            numberOfMembers++;
                            totalSpirit = totalSpirit + (event.enemies[enemy].spirit + event.enemies[enemy].statBuffs.spirit);
                        }
                        var averageSpirit = totalSpirit / numberOfMembers;
                        damageToReduce = damageToReduce + averageSpirit;
                    }
                    else{
                        if (rpgAbility && rpgAbility.turnsToExpire){
                            damageToReduce = damageToReduce + ( ( targetStats.spirit + targetStats.statBuffs.spirit) * 0.25)
                        }
                        else{
                            damageToReduce = damageToReduce + ( targetStats.spirit + targetStats.statBuffs.spirit)
                        }
                    }
                    
                    if (damageToReduce > baseDamage){
                        baseDamage = Math.floor(baseDamage * 0.25)
                    }else{
                        baseDamage = baseDamage - damageToReduce;
                    }
                    // additional RNG
                    var rngDmgRoll = Math.floor(Math.random() * Math.floor(baseDamage * 0.20)) + 1;
                    baseDamage = baseDamage + rngDmgRoll;
                }
            }
        }
    }
    else{

        // the caster is a user
        var checkTarget = event.enemies[target];
        
        if (checkTarget || areaWideAbility){
            // the target is an enemy
            // get the stats for caster and target
            var userStats = event.membersInParty["rpg-"+caster];
            var targetStats = event.enemies[target];
            // add damage 
            if (abilityType == "physical"){
                // use attack damage
                var damageToIncrease = 0
                if (rpgAbility && rpgAbility.turnsToExpire){
                    damageToIncrease = damageToIncrease + (userStats.attackDmg + userStats.statBuffs.attackDmg);
                    baseDamage = baseDamage + ( damageToIncrease / rpgAbility.turnsToExpire )
                }else{
                    if (rpgAbility.areawide){
                        // take 40% of attackdmg only
                        damageToIncrease = damageToIncrease + (userStats.attackDmg + userStats.statBuffs.attackDmg);
                        baseDamage = baseDamage + (damageToIncrease * 0.4)
                    }else{
                        damageToIncrease = damageToIncrease + (userStats.attackDmg + userStats.statBuffs.attackDmg);
                        baseDamage = baseDamage + damageToIncrease
                    }
                }
                
                // now reduce damage from armor of target
                var damageToReduce = 0
                if (rpgAbility.areawide){
                    // get the average armor of enemies
                    var totalArmor = 0;
                    var numberOfMembers = 0;
                    for (var enemy in event.enemies){
                        numberOfMembers++;
                        totalArmor = totalArmor + (event.enemies[enemy].armor + event.enemies[enemy].statBuffs.armor);
                    }
                    var averageArmor = totalArmor / numberOfMembers;
                    damageToReduce = damageToReduce + averageArmor;
                }
                else{
                    if (rpgAbility && rpgAbility.turnsToExpire){
                        damageToReduce = damageToReduce + ( ( targetStats.armor + targetStats.statBuffs.armor) * 0.25)
                    }else{
                        damageToReduce = damageToReduce + ( targetStats.armor + targetStats.statBuffs.armor)
                    }
                }
                
                if (damageToReduce > baseDamage){
                    baseDamage = Math.floor(baseDamage * 0.25)
                }else{
                    baseDamage = baseDamage - damageToReduce;
                }
                // additional RNG
                var rngDmgRoll = Math.floor(Math.random() * Math.floor(baseDamage * 0.20)) + 1;
                baseDamage = baseDamage  + rngDmgRoll;
                
            }else{
                // use magic damage
                var damageToIncrease = 0
                if (rpgAbility && rpgAbility.turnsToExpire){
                    damageToIncrease = damageToIncrease + (userStats.magicDmg + userStats.statBuffs.magicDmg);
                    baseDamage = baseDamage + ( damageToIncrease / rpgAbility.turnsToExpire )
                }else{
                    if (rpgAbility.areawide){
                        // take 40% of magicDmg only
                        damageToIncrease = damageToIncrease + (userStats.magicDmg + userStats.statBuffs.magicDmg);
                        baseDamage = baseDamage + (damageToIncrease * 0.4)
                    }else{
                        damageToIncrease = damageToIncrease + (userStats.magicDmg + userStats.statBuffs.magicDmg);
                        baseDamage = baseDamage + damageToIncrease
                    }
                }

                // now reduce damage from spirit
                var damageToReduce = 0
                if (rpgAbility.areawide){
                    // get the average spirit of enemies
                    var totalSpirit = 0;
                    var numberOfMembers = 0;
                    for (var enemy in event.enemies){
                        numberOfMembers++;
                        totalSpirit = totalSpirit + (event.enemies[enemy].spirit + event.enemies[enemy].statBuffs.spirit);
                    }
                    var averageSpirit = totalSpirit / numberOfMembers;
                    damageToReduce = damageToReduce + averageSpirit;
                }
                else{
                    if (rpgAbility && rpgAbility.turnsToExpire){
                        damageToReduce = damageToReduce + ( ( targetStats.spirit + targetStats.statBuffs.spirit) * 0.25)
                    }
                    else{
                        
                        damageToReduce = damageToReduce + ( targetStats.spirit + targetStats.statBuffs.spirit)
                    }
                }
                
                if (damageToReduce > baseDamage){
                    baseDamage = Math.floor(baseDamage * 0.25)
                }else{
                    baseDamage = baseDamage - damageToReduce;
                }
                // additional RNG
                var rngDmgRoll = Math.floor(Math.random() * Math.floor(baseDamage * 0.20)) + 1;
                baseDamage = baseDamage + rngDmgRoll;
            }
        }else{
            // user is attacking their ally..?
            checkTarget = event.membersInParty[target];

            if (checkTarget){
                //
                var userStats = event.membersInParty["rpg-"+caster];
                var targetStats = event.membersInParty[target];
                // add damage 
                if (abilityType == "physical"){
                    // use attack damage
                    var damageToIncrease = 0
                    if (rpgAbility && rpgAbility.turnsToExpire){
                        damageToIncrease = damageToIncrease + (userStats.attackDmg + userStats.statBuffs.attackDmg);
                        baseDamage = baseDamage + ( damageToIncrease / rpgAbility.turnsToExpire )
                    }else{
                        if (rpgAbility.areawide){
                            // take 40% of attackdmg only
                            damageToIncrease = damageToIncrease + (userStats.attackDmg + userStats.statBuffs.attackDmg);
                            baseDamage = baseDamage + (damageToIncrease * 0.4)
                        }else{
                            damageToIncrease = damageToIncrease + (userStats.attackDmg + userStats.statBuffs.attackDmg);
                            baseDamage = baseDamage + damageToIncrease
                        }
                    }
                    
                    // now reduce damage from armor
                    var damageToReduce = 0
                    if (rpgAbility.areawide){
                        // get the average armor of membersInParty
                        var totalArmor = 0;
                        var numberOfMembers = 0;
                        for (var member in event.membersInParty){
                            numberOfMembers++;
                            totalArmor = totalArmor + (event.membersInParty[member].armor + event.membersInParty[member].statBuffs.armor);
                        }
                        var averageArmor = totalArmor / numberOfMembers;
                        damageToReduce = damageToReduce + averageArmor;
                    }
                    else{
                        if (rpgAbility && rpgAbility.turnsToExpire){
                            damageToReduce = damageToReduce + ( ( targetStats.armor + targetStats.statBuffs.armor) * 0.25)
                        }else{
                            damageToReduce = damageToReduce + ( targetStats.armor + targetStats.statBuffs.armor)
                        }
                    }
                    

                    if (damageToReduce > baseDamage){
                        baseDamage = Math.floor(baseDamage * 0.25)
                    }else{
                        baseDamage = baseDamage - damageToReduce;
                    }
                    // additional RNG
                    var rngDmgRoll = Math.floor(Math.random() * Math.floor(baseDamage * 0.20)) + 1;
                    baseDamage = baseDamage  + rngDmgRoll;
                    
                }else{
                    // use magic damage
                    var damageToIncrease = 0
                    if (rpgAbility && rpgAbility.turnsToExpire){
                        damageToIncrease = damageToIncrease + (userStats.magicDmg + userStats.statBuffs.magicDmg);
                        baseDamage = baseDamage + ( damageToIncrease / rpgAbility.turnsToExpire )
                    }else{
                        if (rpgAbility.areawide){
                            // take 40% of magicDmg only
                            damageToIncrease = damageToIncrease + (userStats.magicDmg + userStats.statBuffs.magicDmg);
                            baseDamage = baseDamage + (damageToIncrease * 0.4)
                        }else{
                            damageToIncrease = damageToIncrease + (userStats.magicDmg + userStats.statBuffs.magicDmg);
                            baseDamage = baseDamage + damageToIncrease
                        }
                    }
    
                    // now reduce damage from spirit
                    var damageToReduce = 0
                    if (rpgAbility.areawide){
                        // get the average spirit of membersInParty
                        var totalSpirit = 0;
                        var numberOfMembers = 0;
                        for (var member in event.membersInParty){
                            numberOfMembers++;
                            totalSpirit = totalSpirit + (event.membersInParty[member].spirit + event.membersInParty[member].statBuffs.spirit);
                        }
                        var averageSpirit = totalSpirit / numberOfMembers;
                        damageToReduce = damageToReduce + averageSpirit;
                    }
                    else{
                        if (rpgAbility && rpgAbility.turnsToExpire){
                            damageToReduce = damageToReduce + ( ( targetStats.spirit + targetStats.statBuffs.spirit) * 0.25)
                        }
                        else{
                            damageToReduce = damageToReduce + ( targetStats.spirit + targetStats.statBuffs.spirit)
                        }
                    }
                    
                    if (damageToReduce > baseDamage){
                        baseDamage = Math.floor(baseDamage * 0.25)
                    }else{
                        baseDamage = baseDamage - damageToReduce;
                    }
                    // additional RNG
                    var rngDmgRoll = Math.floor(Math.random() * Math.floor(baseDamage * 0.20)) + 1;
                    baseDamage = baseDamage + rngDmgRoll;
                }
            }
        }
    }

    // do a number crunch of how much damage is done
    return Math.floor(baseDamage);
}

function calculateHealingDone(event, caster, target, rpgAbility){
    // healing done to user or healing done by hot
    var baseHealing = rpgAbility.heal;
    var abilityType = rpgAbility.type;
    var areaWideAbility = rpgAbility.areawide;

    if (caster < 1000){
        var checkTarget = event.enemies[target]
        if (checkTarget || areaWideAbility){
            var userStats = event.enemies[caster];
            
            var healingToDo = 0
            // healing uses 50% of magic Dmg
            if (rpgAbility.turnsToExpire){
                healingToDo = healingToDo + (userStats.magicDmg + userStats.statBuffs.magicDmg);
                baseHealing = baseHealing + Math.floor(( healingToDo / rpgAbility.turnsToExpire ) * 0.8)
            }else{
                if (rpgAbility.areawide){
                    healingToDo = healingToDo + (userStats.magicDmg + userStats.statBuffs.magicDmg);
                    baseHealing = baseHealing + Math.floor(healingToDo * 0.6)
                }else{
                    healingToDo = healingToDo + (userStats.magicDmg + userStats.statBuffs.magicDmg);
                    baseHealing = baseHealing + Math.floor(healingToDo * 0.8)
                }
            }
        }else{
            // enemy healed user
            checkTarget = event.membersInParty[target]
            if (checkTarget){
                var userStats = event.enemies[caster];
                
                var healingToDo = 0
                // healing uses 50% of magic Dmg
                if (rpgAbility.turnsToExpire){
                    healingToDo = healingToDo + (userStats.magicDmg + userStats.statBuffs.magicDmg);
                    baseHealing = baseHealing + Math.floor(( healingToDo / rpgAbility.turnsToExpire ) * 0.8)
                }else{
                    if (rpgAbility.areawide){
                        healingToDo = healingToDo + (userStats.magicDmg + userStats.statBuffs.magicDmg);
                        baseHealing = baseHealing + Math.floor(healingToDo * 0.6)
                    }else{
                        healingToDo = healingToDo + (userStats.magicDmg + userStats.statBuffs.magicDmg);
                        baseHealing = baseHealing + Math.floor(healingToDo * 0.8)
                    }
                }
            }
        }
        
    }
    else{
        // the caster is a user
        var userStats = event.membersInParty["rpg-"+caster];
        
        var checkTarget = event.membersInParty[target];
        if (checkTarget || areaWideAbility){
            var healingToDo = 0
            // healing uses 50% of magic Dmg
            if (rpgAbility.turnsToExpire){
                healingToDo = healingToDo + (userStats.magicDmg + userStats.statBuffs.magicDmg);
                baseHealing = baseHealing + Math.floor(( healingToDo / rpgAbility.turnsToExpire ) * 0.8)
            }else{
                if (rpgAbility.areawide){
                    healingToDo = healingToDo + (userStats.magicDmg + userStats.statBuffs.magicDmg);
                    baseHealing = baseHealing + Math.floor(healingToDo * 0.6)
                }else{
                    healingToDo = healingToDo + (userStats.magicDmg + userStats.statBuffs.magicDmg);
                    baseHealing = baseHealing + Math.floor(healingToDo * 0.8)
                }
            }
        }else{
            // user healed enemy
            checkTarget = event.enemies[target];
            if (checkTarget){
                var healingToDo = 0
                // healing uses 50% of magic Dmg
                if (rpgAbility.turnsToExpire){
                    healingToDo = healingToDo + (userStats.magicDmg + userStats.statBuffs.magicDmg);
                    baseHealing = baseHealing + Math.floor(( healingToDo / rpgAbility.turnsToExpire ) * 0.8)
                }else{
                    if (rpgAbility.areawide){
                        healingToDo = healingToDo + (userStats.magicDmg + userStats.statBuffs.magicDmg);
                        baseHealing = baseHealing + Math.floor(healingToDo * 0.6)
                    }else{
                        healingToDo = healingToDo + (userStats.magicDmg + userStats.statBuffs.magicDmg);
                        baseHealing = baseHealing + Math.floor(healingToDo * 0.8)
                    }
                }
            }
        }
    }
    return baseHealing;
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

        // calculate the amount of damage that you will do to the target based on:
        // caster AD or MD depending on ability, target armor, special buffs, special debuffs some random number gen
        var damageToDeal = rpgAbility.dmg;
        damageToDeal = calculateDamageDealt(event, abilityCaster, abilityObject.target, rpgAbility)
        if (rpgAbility.areawide){
            // deal damage area wide against opposite party
            if (abilityCaster > 1000){
                // if caster is party of membersInParty then target = all the enemies
                var caster = event.membersInParty["rpg-"+abilityCaster] ? event.membersInParty["rpg-"+abilityCaster].name : undefined;
                abilityToString = abilityToString + caster +  " dealt " + damageToDeal + " damage to all enemies with " + ability + "\n";                
                for (var targetToDealDmg in event.enemies){
                    var targetToDealDmgName = event.enemies[targetToDealDmg].name
                    if (event.enemies[targetToDealDmg].statuses.indexOf("dead") == -1){
                        // target is not dead, damage them
                        event.enemies[targetToDealDmg].hp = event.enemies[targetToDealDmg].hp - damageToDeal;
                        if (event.enemies[targetToDealDmg].hp <= 0){
                            event.enemies[targetToDealDmg].statuses.push("dead")
                            event.enemies[targetToDealDmg].hp = 0;
                            event.enemies[targetToDealDmg].buffs = [];
                            abilityToString = abilityToString + targetToDealDmgName + " has died. :skull_crossbones: \n";
                        }
                    }
                }
            }
            else{
                // if caster is in enemies then target = all the members of party
                var caster = event.enemies[abilityCaster] ? event.enemies[abilityCaster].name : undefined;
                abilityToString = abilityToString + caster +  " dealt " + damageToDeal + " damage to the group with " + ability + "\n";                
                for (var targetToDealDmg in event.membersInParty){
                    var targetToDealDmgName = event.membersInParty[targetToDealDmg].name
                    if (event.membersInParty[targetToDealDmg].statuses.indexOf("dead") == -1){
                        event.membersInParty[targetToDealDmg].hp = event.membersInParty[targetToDealDmg].hp - damageToDeal;
                        if (event.membersInParty[targetToDealDmg].hp <= 0){
                            event.membersInParty[targetToDealDmg].statuses.push("dead")
                            event.membersInParty[targetToDealDmg].hp = 0;
                            event.membersInParty[targetToDealDmg].buffs = [];
                            abilityToString = abilityToString + targetToDealDmgName + " has died. :skull_crossbones: \n";
                        }
                    }
                }
            }
        }
        else{
            var targetToDealDmg = abilityObject.target;
            // dealing damage to enemies
            if (event.enemies[targetToDealDmg]){
                var targetToDealDmgName = event.enemies[targetToDealDmg].name;
                event.enemies[targetToDealDmg].hp = event.enemies[targetToDealDmg].hp - damageToDeal;
                abilityToString = abilityToString + targetToDealDmgName + " took " + damageToDeal + " damage from " + ability + "\n";
                if (event.enemies[targetToDealDmg].hp <= 0){
                    event.enemies[targetToDealDmg].statuses = [];
                    event.enemies[targetToDealDmg].statuses.push("dead")
                    event.enemies[targetToDealDmg].hp = 0;
                    event.enemies[targetToDealDmg].buffs = [];
                    abilityToString = abilityToString + targetToDealDmgName + " has died. :skull_crossbones: \n";
                }
            }
            // dealing damage to members of party (friendly fire or enemy attacking)
            else if (event.membersInParty[targetToDealDmg]){
                var targetToDealDmgName = event.membersInParty[targetToDealDmg].name;
                event.membersInParty[targetToDealDmg].hp = event.membersInParty[targetToDealDmg].hp - damageToDeal;
                abilityToString = abilityToString + targetToDealDmgName + " took " + damageToDeal + " damage from " + ability + "\n";
                if (event.membersInParty[targetToDealDmg].hp <= 0){
                    event.membersInParty[targetToDealDmg].statuses = [];
                    event.membersInParty[targetToDealDmg].statuses.push("dead");
                    event.membersInParty[targetToDealDmg].hp = 0;
                    event.membersInParty[targetToDealDmg].buffs = [];
                    abilityToString = abilityToString + targetToDealDmgName + " has died. :skull_crossbones: \n";
                }
            }
        }
    }
    if (rpgAbility && rpgAbility.heal && stillAlive){
        // this is a healing ability, heal the target
        var hpToHeal = calculateHealingDone(event, abilityCaster, abilityObject.target, rpgAbility);

        if (rpgAbility.areawide){
            
            if (abilityCaster > 1000){
                // if caster is party of membersInParty then target = all the membersInParty
                var caster = event.membersInParty["rpg-"+abilityCaster] ? event.membersInParty["rpg-"+abilityCaster].name : undefined;
                abilityToString = abilityToString + caster +  " healed the group for " + hpToHeal + " with " + ability + "\n";                
                for (var targetToHeal in event.membersInParty){
                    if (event.membersInParty[targetToHeal].hp > 0
                    && event.membersInParty[targetToHeal].statuses.indexOf("dead") == -1){
                        event.membersInParty[targetToHeal].hp = event.membersInParty[targetToHeal].hp + hpToHeal;
                        if (event.membersInParty[targetToHeal].hp > event.membersInParty[targetToHeal].maxhp){
                            event.membersInParty[targetToHeal].hp = event.membersInParty[targetToHeal].maxhp
                        }
                    }
                }
            }
            else{
                // if caster is in enemies then target = all the members of party
                var caster = event.enemies[abilityCaster] ? event.enemies[abilityCaster].name : undefined;
                abilityToString = abilityToString + caster +  " healed the group for " + hpToHeal + " with " + ability + "\n";                
                for (var targetToHeal in event.enemies){
                    if (event.enemies[targetToHeal].hp > 0
                        && event.enemies[targetToHeal].statuses.indexOf("dead") == -1){
                        event.enemies[targetToHeal].hp = event.enemies[targetToHeal].hp + hpToHeal;
                        if (event.enemies[targetToHeal].hp > event.enemies[targetToHeal].maxhp){
                            event.enemies[targetToHeal].hp = event.enemies[targetToHeal].maxhp
                        }
                    }
                }
            }
        }else{
            var targetToHeal = abilityObject.target;
            if (event.membersInParty[targetToHeal]){
                var targetToHealName = event.membersInParty[targetToHeal].name;
                if (event.membersInParty[targetToHeal].statuses.indexOf("dead") == -1){
                    // target is not dead
                    event.membersInParty[targetToHeal].hp = event.membersInParty[targetToHeal].hp + hpToHeal;
                    abilityToString = abilityToString + targetToHealName + " was healed for " + hpToHeal + "\n"
                    if (event.membersInParty[targetToHeal].hp > event.membersInParty[targetToHeal].maxhp){
                        event.membersInParty[targetToHeal].hp = event.membersInParty[targetToHeal].maxhp
                    }
                }
            }
            else if (event.enemies[targetToHeal]){
                var targetToHealName = event.enemies[targetToHeal].name;
                if (event.enemies[targetToHeal].statuses.indexOf("dead") == -1){
                    event.enemies[targetToHeal].hp = event.enemies[targetToHeal].hp + hpToHeal;  
                    abilityToString = abilityToString + targetToHealName + " was healed for " + hpToHeal + "\n"
                    if (event.enemies[targetToHeal].hp > event.enemies[targetToHeal].maxhp){
                        event.enemies[targetToHeal].hp = event.enemies[targetToHeal].maxhp
                    }
                }
            }
        }
    }
    // buffs
    if (rpgAbility && rpgAbility.buff && stillAlive){
        // this is a status changing ability, add / remove the status
        var statusToAdd = rpgAbility.buff;
        var targetToAddStatus = abilityObject.target
        if (rpgAbility.buff.selfbuff){
            targetToAddStatus = abilityObject.user
            if (targetToAddStatus >= 1000){
                targetToAddStatus = "rpg-"+targetToAddStatus;
            }
        }
        if (event.membersInParty[targetToAddStatus]){
            var targetToAddStatusName = event.membersInParty[targetToAddStatus].name;
            if (event.membersInParty[targetToAddStatus].statuses.indexOf("dead") == -1){
                // target is not dead
                // check that the the user doesn't already have the buff if they do, replace it
                if (rpgAbility.buff.name != "warm up"){
                    for (var index = event.membersInParty[targetToAddStatus].buffs.length - 1; index >= 0; index-- ){
                        if (event.membersInParty[targetToAddStatus].buffs[index].name == rpgAbility.buff.name){
                            // pop this object
                            event.membersInParty[targetToAddStatus].buffs.splice(index, 1);
                        }
                    }
                    let buffCloned = Object.assign({}, statusToAdd);
                    event.membersInParty[targetToAddStatus].buffs.push(buffCloned);
                    abilityToString = abilityToString + targetToAddStatusName + " was affected with " + statusToAdd.name + "\n"    
                }
                else{
                    // only add it if we dont find it
                    var foundBuff = false;
                    for (var index = event.membersInParty[targetToAddStatus].buffs.length - 1; index >= 0; index-- ){
                        if (event.membersInParty[targetToAddStatus].buffs[index].name == rpgAbility.buff.name){
                            // pop this object
                            foundBuff = true;
                        }
                    }
                    if (!foundBuff){
                        let buffCloned = Object.assign({}, statusToAdd);
                        event.membersInParty[targetToAddStatus].buffs.push(buffCloned);
                        abilityToString = abilityToString + targetToAddStatusName + " was affected with " + statusToAdd.name + "\n"        
                    }
                }
            }
        }

        else if (event.enemies[targetToAddStatus]){
            var targetToAddStatusName = event.enemies[targetToAddStatus].name;
            if (event.enemies[targetToAddStatus].statuses.indexOf("dead") == -1){
                if (rpgAbility.buff.name != "warm up"){
                    for (var index = event.enemies[targetToAddStatus].buffs.length - 1; index >= 0; index-- ){
                        if (event.enemies[targetToAddStatus].buffs[index].name == rpgAbility.buff.name ){
                            // pop this object
                            event.enemies[targetToAddStatus].buffs.splice(index, 1);
                        }
                    }
                    let buffCloned = Object.assign({}, statusToAdd);
                    event.enemies[targetToAddStatus].buffs.push(buffCloned);
                    abilityToString = abilityToString + targetToAddStatusName + " was affected with " + statusToAdd.name + " \n"
                }
                else{
                    var foundBuff = false;
                    for (var index = event.enemies[targetToAddStatus].buffs.length - 1; index >= 0; index-- ){
                        if (event.enemies[targetToAddStatus].buffs[index].name == rpgAbility.buff.name ){
                            // pop this object
                            foundBuff = true;
                        }
                    }
                    if (!foundBuff){
                        let buffCloned = Object.assign({}, statusToAdd);
                        event.enemies[targetToAddStatus].buffs.push(buffCloned);
                        abilityToString = abilityToString + targetToAddStatusName + " was affected with " + statusToAdd.name + " \n"     
                    }
                }
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
                // ONLY ADD STATUS IF THEY DO NOT ALREADY HAVE IT
                var alreadyHaveStatus = false;
                for (var status in event.membersInParty[targetToAddStatus].statuses){
                    if (event.membersInParty[targetToAddStatus].statuses[status].dot
                        && event.membersInParty[targetToAddStatus].statuses[status].dot.caster == abilityObject.user ){
                        alreadyHaveStatus = true;
                    }
                    // add the status here
                    if (event.membersInParty[targetToAddStatus].statuses[status].name == "weakened"
                        || event.membersInParty[targetToAddStatus].statuses[status].name == "crippled"
                        || event.membersInParty[targetToAddStatus].statuses[status].name == "frozen" ){
                            alreadyHaveStatus = true;
                    }
                }
                if (!alreadyHaveStatus){
                    event.membersInParty[targetToAddStatus].statuses.push(statusToAdd);
                    abilityToString = abilityToString + targetToAddStatusName + " was affected with " + statusToAdd.name + "\n"
                }
            }
        }
        else if (event.enemies[targetToAddStatus]){
            var targetToAddStatusName = event.enemies[targetToAddStatus].name;
            if (event.enemies[targetToAddStatus].statuses.indexOf("dead") == -1){
                // ONLY ADD STATUS IF THEY DO NOT ALREADY HAVE IT 
                var alreadyHaveStatus = false;
                for (var status in event.enemies[targetToAddStatus].statuses){
                    if (event.enemies[targetToAddStatus].statuses[status].dot
                        && event.enemies[targetToAddStatus].statuses[status].dot.caster == abilityObject.user ){
                        alreadyHaveStatus = true;
                    }

                    if (event.enemies[targetToAddStatus].statuses[status].name == "weakened"
                        || event.enemies[targetToAddStatus].statuses[status].name == "crippled"
                        || event.enemies[targetToAddStatus].statuses[status].name == "frozen" ){
                            alreadyHaveStatus = true;
                    }
                }
                if (!alreadyHaveStatus){
                    event.enemies[targetToAddStatus].statuses.push(statusToAdd);
                    abilityToString = abilityToString + targetToAddStatusName + " was affected with " + statusToAdd.name + " \n"    
                }
            }
        }
    }

    if (rpgAbility && rpgAbility.dot && stillAlive){
        // dot has been applied
        // calculate the dot damage based on MD or AD, target armor, special buff
        var dotToAdd = {}
        dotToAdd.dot = rpgAbility.dot;
        var targetToAddDot = abilityObject.target
        dotToAdd.dot.expireOnTurn = currentTurn + dotToAdd.dot.turnsToExpire;
        dotToAdd.dot.caster = abilityCaster// id of the caster
        // enemy added a dot to party member
        if (event.membersInParty[targetToAddDot]){
            var targetToAddDotName = event.membersInParty[targetToAddDot].name;
            if (event.membersInParty[targetToAddDot].statuses.indexOf("dead") == -1){
                // target is not dead
                // ONLY ADD THE DOT IF THEY DONT ALREADY HAVE IT
                for (var status in event.membersInParty[targetToAddDot].statuses){
                    if (event.membersInParty[targetToAddDot].statuses[status].dot
                        && event.membersInParty[targetToAddDot].statuses[status].dot.caster == abilityObject.user ){
                        alreadyHaveStatus = true;
                    }
                }
                if (!alreadyHaveStatus){
                    event.membersInParty[targetToAddDot].statuses.push(dotToAdd);
                    abilityToString = abilityToString + targetToAddDotName + " was affected with " + dotToAdd.dot.name + "\n"
                }
            }
        }

        else if (event.enemies[targetToAddDot]){
            var targetToAddDotName = event.enemies[targetToAddDot].name;
            if (event.enemies[targetToAddDot].statuses.indexOf("dead") == -1){

                var alreadyHaveStatus = false;
                for (var status in event.enemies[targetToAddDot].statuses){
                    if (event.enemies[targetToAddDot].statuses[status].dot
                        && event.enemies[targetToAddDot].statuses[status].dot.caster == abilityObject.user ){
                        alreadyHaveStatus = true;
                    }
                }
                if (!alreadyHaveStatus){
                    event.enemies[targetToAddDot].statuses.push(dotToAdd);
                    abilityToString = abilityToString + targetToAddDotName + " was affected with " + dotToAdd.dot.name + " \n" 
                }
            }
        }
    }

    if (rpgAbility && rpgAbility.hot && stillAlive){
        // hot has been applied
        // calculate the hot healing based on MD, special buff, debuff
        var hotToAdd = {}
        hotToAdd.hot = rpgAbility.hot;
        var targetToAddHot = abilityObject.target
        hotToAdd.hot.expireOnTurn = currentTurn + hotToAdd.hot.turnsToExpire;
        hotToAdd.hot.caster = abilityCaster // id of caster
        // enemy added a hot to party member
        if (event.membersInParty[targetToAddHot]){
            var targetToAddHotName = event.membersInParty[targetToAddHot].name;
            if (event.membersInParty[targetToAddHot].statuses.indexOf("dead") == -1){
                // target is not dead
                event.membersInParty[targetToAddHot].buffs.push(hotToAdd);
                abilityToString = abilityToString + targetToAddHotName + " was affected with " + hotToAdd.hot.name + "\n"
            }
        }

        else if (event.enemies[targetToAddHot]){
            var targetToAddHotName = event.enemies[targetToAddHot].name;
            if (event.enemies[targetToAddHot].statuses.indexOf("dead") == -1){
                event.enemies[targetToAddHot].buffs.push(hotToAdd);
                abilityToString = abilityToString + targetToAddHotName + " was affected with " + hotToAdd.hot.name + " \n"
            }
        }
    }

    if (rpgAbility && rpgAbility.special && stillAlive){
        // handle the ability in a special manner
        if (rpgAbility.special == "selfdamage"){
            // deal self damage to the user
            if (event.membersInParty["rpg-"+abilityCaster] 
                && event.membersInParty["rpg-"+abilityCaster].statuses.indexOf("dead") == -1 ){
                var targetToDealDmgName = event.membersInParty["rpg-"+abilityCaster].name
                // set damage temporarily
                var tempDamage = rpgAbility.dmg;
                rpgAbility.dmg = rpgAbility.selfdamage;
                var damageToDeal = Math.floor(calculateDamageDealt(event, abilityCaster, "rpg-"+abilityCaster, rpgAbility) * 0.4)
                event.membersInParty["rpg-"+abilityCaster].hp = event.membersInParty["rpg-"+abilityCaster].hp - damageToDeal;
                abilityToString = abilityToString + targetToDealDmgName + " suffered " + damageToDeal + " damage from " + rpgAbility.name + "\n"
                rpgAbility.dmg = tempDamage
                if (event.membersInParty["rpg-"+abilityCaster].hp <= 0){
                    event.membersInParty["rpg-"+abilityCaster].statuses = [];
                    event.membersInParty["rpg-"+abilityCaster].statuses.push("dead")
                    event.membersInParty["rpg-"+abilityCaster].buffs = [];
                    abilityToString = abilityToString + targetToDealDmgName + " has died. :skull_crossbones: \n";   
                }              
            }
            // deal self damage to the enemy
            if (event.enemies[abilityCaster] 
            && event.enemies[abilityCaster].statuses.indexOf("dead") == -1 ){
                var targetToDealDmgName = event.enemies[abilityCaster].name
                // set damage temporarily
                var tempDamage = rpgAbility.dmg;
                rpgAbility.dmg = rpgAbility.selfdamage;
                var damageToDeal = Math.floor(calculateDamageDealt(event, abilityCaster, abilityCaster, rpgAbility) * 0.4)
                event.enemies[abilityCaster].hp = event.enemies[abilityCaster].hp - damageToDeal;
                abilityToString = abilityToString + targetToDealDmgName + " suffered " + damageToDeal + " damage from " + rpgAbility.name + "\n"
                rpgAbility.dmg = tempDamage
                if (event.enemies[abilityCaster].hp <= 0){
                    event.enemies[abilityCaster].statuses = [];
                    event.enemies[abilityCaster].statuses.push("dead")
                    event.enemies[abilityCaster].buffs = [];
                    abilityToString = abilityToString + targetToDealDmgName + " has died. :skull_crossbones: \n";   
                }              
            }
        }
        if (ability == "bandaid"){
            // remove a status from the target except dead
            var targetToRemoveFrom = abilityObject.target
            if (event.membersInParty[targetToRemoveFrom]){
                if (event.membersInParty[targetToRemoveFrom].statuses.indexOf("dead") == -1 
                    && event.membersInParty[targetToRemoveFrom].statuses.length > 0){
                    event.membersInParty[targetToRemoveFrom].statuses.splice(0, 1)
                    abilityToString = abilityToString + event.membersInParty[targetToRemoveFrom].name + " was cured with " + ability + " \n"                
                }
            }
            else if (event.enemies[targetToRemoveFrom]){
                if (event.enemies[targetToRemoveFrom].statuses.indexOf("dead") == -1 
                    && event.enemies[targetToRemoveFrom].statuses.length > 0){
                    event.enemies[targetToRemoveFrom].statuses.splice(0, 1)
                    abilityToString = abilityToString + event.enemies[targetToRemoveFrom].name + " was cured with " + ability + " \n"                
                }
            }
            
        }
        else if (ability == "revive"){
            // remove dead from statuses and give 40% of max hp
            var targetToRevive = abilityObject.target;
            if (event.membersInParty[targetToRevive]){
                var deadIndex = event.membersInParty[targetToRevive].statuses.indexOf("dead")
                if (deadIndex > -1){
                    // target is dead
                    event.membersInParty[targetToRevive].statuses.splice(index, 1)
                    // set their hp to 40%
                    event.membersInParty[targetToRevive].hp = Math.floor(event.membersInParty[targetToRevive].maxhp * 0.4);
                    // reset their buffs
                    event.membersInParty[targetToRevive].buffs = []
                    abilityToString = abilityToString + targetToRevive + " was revived \n"                
                }
            }
            else if (event.enemies[targetToRevive]){
                var deadIndex = event.enemies[targetToRevive].statuses.indexOf("dead")
                if (deadIndex > -1){
                    // target is dead
                    event.enemies[targetToRevive].statuses.splice(index, 1)
                    // set their hp to 40%
                    event.enemies[targetToRevive].hp = Math.floor(event.enemies[targetToRevive].maxhp * 0.4);
                    // reset their buffs
                    event.enemies[targetToRevive].buffs = []
                    abilityToString = abilityToString + targetToRevive + " was revived \n"                
                }
            }
            
        }
        else if(ability == "drain"){
            // deal damage to target and heal caster
            var damageToDeal = calculateDamageDealt(event, abilityCaster, abilityObject.target, rpgAbility.special)
            var targetToDealDmg = abilityObject.target;
            // dealing damage to enemies
            if (event.enemies[targetToDealDmg]){
                var targetToDealDmgName = event.enemies[targetToDealDmg].name;
                event.enemies[targetToDealDmg].hp = event.enemies[targetToDealDmg].hp - damageToDeal;
                abilityToString = abilityToString + targetToDealDmgName + " took " + damageToDeal + " damage from " + ability + "\n";
                if (event.enemies[targetToDealDmg].hp <= 0){
                    event.enemies[targetToDealDmg].statuses = [];
                    event.enemies[targetToDealDmg].statuses.push("dead")
                    event.enemies[targetToDealDmg].hp = 0;
                    event.enemies[targetToDealDmg].buffs = [];
                    abilityToString = abilityToString + targetToDealDmgName + " has died. :skull_crossbones: \n";
                }
            }
            // dealing damage to members of party (friendly fire or enemy attacking)
            else if (event.membersInParty[targetToDealDmg]){
                var targetToDealDmgName = event.membersInParty[targetToDealDmg].name;
                event.membersInParty[targetToDealDmg].hp = event.membersInParty[targetToDealDmg].hp - damageToDeal;
                abilityToString = abilityToString + targetToDealDmgName + " took " + damageToDeal + " damage from " + ability + "\n";
                if (event.membersInParty[targetToDealDmg].hp <= 0){
                    event.membersInParty[targetToDealDmg].statuses = [];
                    event.membersInParty[targetToDealDmg].statuses.push("dead");
                    event.membersInParty[targetToDealDmg].hp = 0;
                    event.membersInParty[targetToDealDmg].buffs = [];
                    abilityToString = abilityToString + targetToDealDmgName + " has died. :skull_crossbones: \n";
                }
            }

            var targetToHeal = abilityObject.user;
            var hpToHeal = calculateHealingDone(event, abilityCaster, abilityObject.target, rpgAbility.special);
            if (event.membersInParty["rpg-"+targetToHeal]){
                targetToHeal = "rpg-"+targetToHeal;
                var targetToHealName = event.membersInParty[targetToHeal].name;
                if (event.membersInParty[targetToHeal].statuses.indexOf("dead") == -1){
                    // target is not dead
                    event.membersInParty[targetToHeal].hp = event.membersInParty[targetToHeal].hp + hpToHeal;
                    abilityToString = abilityToString + targetToHealName + " was healed for " + hpToHeal + " from " + rpgAbility.name + "\n"
                    if (event.membersInParty[targetToHeal].hp > event.membersInParty[targetToHeal].maxhp){
                        event.membersInParty[targetToHeal].hp = event.membersInParty[targetToHeal].maxhp
                    }
                }
            }
            else if (event.enemies[targetToHeal]){
                var targetToHealName = event.enemies[targetToHeal].name;
                if (event.enemies[targetToHeal].statuses.indexOf("dead") == -1){
                    event.enemies[targetToHeal].hp = event.enemies[targetToHeal].hp + hpToHeal;  
                    abilityToString = abilityToString + targetToHealName + " was healed for " + hpToHeal + "\n"
                    if (event.enemies[targetToHeal].hp > event.enemies[targetToHeal].maxhp){
                        event.enemies[targetToHeal].hp = event.enemies[targetToHeal].maxhp
                    }
                }
            }
        }
        else if(ability == "rockthrow"){
            // check stacks of "warm up" on buffs on the caster, then check if max have been reached
            // if max have been reached damage is atMaxStacksDealDamage, then remove all stacks
            var targetToCheck = abilityObject.user
            if (event.membersInParty["rpg-"+targetToCheck]){
                var targetToCheck = "rpg-"+targetToCheck
                for (var buff in event.membersInParty[targetToCheck].buffs){
                    if (event.membersInParty[targetToCheck].buffs[buff].name == "warm up" ){
                        var stacksOfWarmUp = event.membersInParty[targetToCheck].buffs[buff].stacksOfWarmUp ? event.membersInParty[targetToCheck].buffs[buff].stacksOfWarmUp : 0;
                        if (stacksOfWarmUp >= rpgAbility.buff.maxStacks){
                            // damage is atMaxStacksDealDamage
                            var tempDmg = rpgAbility.dmg;
                            rpgAbility.dmg = rpgAbility.buff.atMaxStacksDealDamage;
                            var damageToDeal = calculateDamageDealt(event, abilityObject.user, abilityObject.target, rpgAbility);
                            rpgAbility.dmg = tempDmg;
                            // deal the damage and then remove the buff
                            var targetToDealDmg = abilityObject.target;
                            if (event.enemies[targetToDealDmg]){
                                var targetToDealDmgName = event.enemies[targetToDealDmg].name;
                                event.enemies[targetToDealDmg].hp = event.enemies[targetToDealDmg].hp - damageToDeal;
                                abilityToString = abilityToString + targetToDealDmgName + " took " + damageToDeal + " damage from " + ability + "\n";
                                if (event.enemies[targetToDealDmg].hp <= 0){
                                    event.enemies[targetToDealDmg].statuses = [];
                                    event.enemies[targetToDealDmg].statuses.push("dead")
                                    event.enemies[targetToDealDmg].hp = 0;
                                    event.enemies[targetToDealDmg].buffs = [];
                                    abilityToString = abilityToString + targetToDealDmgName + " has died. :skull_crossbones: \n";
                                }
                            }
                            // dealing damage to members of party (friendly fire or enemy attacking)
                            else if (event.membersInParty[targetToDealDmg]){
                                var targetToDealDmgName = event.membersInParty[targetToDealDmg].name;
                                event.membersInParty[targetToDealDmg].hp = event.membersInParty[targetToDealDmg].hp - damageToDeal;
                                abilityToString = abilityToString + targetToDealDmgName + " took " + damageToDeal + " damage from " + ability + "\n";
                                if (event.membersInParty[targetToDealDmg].hp <= 0){
                                    event.membersInParty[targetToDealDmg].statuses = [];
                                    event.membersInParty[targetToDealDmg].statuses.push("dead");
                                    event.membersInParty[targetToDealDmg].hp = 0;
                                    event.membersInParty[targetToDealDmg].buffs = [];
                                    abilityToString = abilityToString + targetToDealDmgName + " has died. :skull_crossbones: \n";
                                }
                            }
                            event.membersInParty[targetToCheck].buffs.splice(buff, 1);
                        }else{
                            // deal the damage and add a stack
                            if (event.membersInParty[targetToCheck].buffs[buff].stacksOfWarmUp > 1){
                                abilityToString = abilityToString + targetToAddStatusName + " gained a stack of " + event.membersInParty[targetToCheck].buffs[buff].name + "\n"                                
                            }
                            event.membersInParty[targetToCheck].buffs[buff].stacksOfWarmUp = event.membersInParty[targetToCheck].buffs[buff].stacksOfWarmUp + 1;                            
                        }
                    }
                }
            }
            else if(event.enemies[targetToCheck]){
                // enemy casted the rock throw
                for (var buff in event.enemies[targetToCheck].buffs){
                    if (event.enemies[targetToCheck].buffs[buff].name == "warm up" ){
                        var stacksOfWarmUp = event.enemies[targetToCheck].buffs[buff].stacksOfWarmUp ? event.enemies[targetToCheck].buffs[buff].stacksOfWarmUp : 0;
                        if (stacksOfWarmUp >= rpgAbility.buff.maxStacks){
                            // damage is atMaxStacksDealDamage
                            var tempDmg = rpgAbility.dmg;
                            rpgAbility.dmg = rpgAbility.buff.atMaxStacksDealDamage;
                            var damageToDeal = calculateDamageDealt(event, abilityObject.user, abilityObject.target, rpgAbility);
                            rpgAbility.dmg = tempDmg;
                            // deal the damage and then remove the buff
                            var targetToDealDmg = abilityObject.target;
                            if (event.membersInParty[targetToDealDmg]){
                                var targetToDealDmgName = event.membersInParty[targetToDealDmg].name;
                                event.membersInParty[targetToDealDmg].hp = event.membersInParty[targetToDealDmg].hp - damageToDeal;
                                abilityToString = abilityToString + targetToDealDmgName + " took " + damageToDeal + " damage from " + ability + "\n";
                                if (event.membersInParty[targetToDealDmg].hp <= 0){
                                    event.membersInParty[targetToDealDmg].statuses = [];
                                    event.membersInParty[targetToDealDmg].statuses.push("dead")
                                    event.membersInParty[targetToDealDmg].hp = 0;
                                    event.membersInParty[targetToDealDmg].buffs = [];
                                    abilityToString = abilityToString + targetToDealDmgName + " has died. :skull_crossbones: \n";
                                }
                            }
                            // dealing damage to members of party (friendly fire or enemy attacking)
                            else if (event.enemies["rpg-"+targetToDealDmg]){
                                var targetToDealDmg = "rpg-"+targetToDealDmg;
                                var targetToDealDmgName = event.enemies[targetToDealDmg].name;
                                event.enemies[targetToDealDmg].hp = event.enemies[targetToDealDmg].hp - damageToDeal;
                                abilityToString = abilityToString + targetToDealDmgName + " took " + damageToDeal + " damage from " + ability + "\n";
                                if (event.enemies[targetToDealDmg].hp <= 0){
                                    event.enemies[targetToDealDmg].statuses = [];
                                    event.enemies[targetToDealDmg].statuses.push("dead");
                                    event.enemies[targetToDealDmg].hp = 0;
                                    event.enemies[targetToDealDmg].buffs = [];
                                    abilityToString = abilityToString + targetToDealDmgName + " has died. :skull_crossbones: \n";
                                }
                            }
                            event.enemies[targetToCheck].buffs.splice(buff, 1);
                        }
                        else{
                            // deal the damage and add a stack
                            if (event.enemies[targetToCheck].buffs[buff].stacksOfWarmUp > 1){
                                abilityToString = abilityToString + targetToAddStatusName + " gained a stack of " + event.enemies[targetToCheck].buffs[buff].name + "\n"                                
                            }
                            event.enemies[targetToCheck].buffs[buff].stacksOfWarmUp = event.enemies[targetToCheck].buffs[buff].stacksOfWarmUp + 1;                            
                        }
                    }
                }
            }
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
        userString = ":heart_decoration: "  + (userStats.hp + userStats.statBuffs.hp) + "/" + (userStats.maxhp + userStats.statBuffs.maxhp)
        userString = userString + " - **" + userStats.id + "** **" + name + "**" + "\n"
    }else{
        userString = ":green_heart:  " + (userStats.hp + userStats.statBuffs.hp) + "/" + (userStats.maxhp + userStats.statBuffs.maxhp) + " - **" + name + "**" + "\n"
        userString = userString + " 👕 " + (userStats.armor + userStats.statBuffs.armor)
        userString = userString + " 🙌 " + (userStats.spirit + userStats.statBuffs.spirit)
        userString = userString + " 🗡 " + (userStats.attackDmg + userStats.statBuffs.attackDmg)
        userString = userString + " ☄️ " + (userStats.magicDmg + userStats.statBuffs.magicDmg) + "\n"
    }
    if (userStats.element){
        // TODO: show that they are of a certain element
    }
    if (!isEnemy){
        var abilitiesString = "";
        for (var a in userStats.abilities){
            abilitiesString = abilitiesString  + userStats.abilities[a] + ", "
        }
        userString = userString + "**Abilities:** " + abilitiesString + "\n"
    }
    var statusesString = "";
    for (var i in userStats.statuses){
        if (userStats.statuses[i].name){
            statusesString = statusesString + userStats.statuses[i].emoji + " "
        }
        else if (userStats.statuses[i].dot && userStats.statuses[i].dot.name){
            statusesString = statusesString + userStats.statuses[i].dot.emoji + " "
        }
        else if (userStats.statuses[i].hot && userStats.statuses[i].hot.name){
            statusesString = statusesString + userStats.statuses[i].hot.emoji + " "
        }else if(userStats.statuses[i] == "dead"){
            statusesString = statusesString + "💀" + ", "
        }
    }
    userString = userString + "**Status:** " + statusesString
    var buffsString = "";
    for (var i in userStats.buffs){
        if (userStats.buffs[i].name){
            buffsString = buffsString + userStats.buffs[i].emoji + " ";
        }
        else if(userStats.buffs[i].hot && userStats.buffs[i].hot.name){
            buffsString = buffsString + userStats.buffs[i].hot.emoji + " ";
        }
    }
    userString = userString + " **Buffs:** " + buffsString

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
        // calculate buffs
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
        // calculate statuses
        for (var status in event.membersInParty[member].statuses){
            var statusToProcess = event.membersInParty[member].statuses[status];
            var statToAffectArray = statusToProcess.affects;
            for (var index in statToAffectArray){
                var statToAffect = statToAffectArray[index]
                if (statusToProcess.multiplier){
                    // do a multiplier of the user's current stat
                    var currentStat = userToProcess[statToAffect];
                    if (currentStat){
                        userToProcess.statBuffs[statToAffect] = userToProcess.statBuffs[statToAffect] + (Math.floor((statusToProcess.multiplier * currentStat) - currentStat));
                    }
                }
    
                if (statusToProcess.additive){
                    // do a multiplier of the user's current stat
                    var currentStat = userToProcess[statToAffect];
                    if (currentStat){
                        userToProcess.statBuffs[statToAffect] = userToProcess.statBuffs[statToAffect] + (Math.floor(statusToProcess.additive));
                    }
                }
            }
        }
    }

    for (var enemy in event.enemies){
        var userToProcess = event.enemies[enemy];
        userToProcess.statBuffs = {
            hp: 0,
            attackDmg: 0,
            magicDmg: 0,
            armor: 0,
            spirit: 0,
            maxhp: 0
        }
        for (var buff in event.enemies[enemy].buffs){
            var buffToProcess = event.enemies[enemy].buffs[buff];
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
        // calculate statuses
        for (var status in event.enemies[enemy].statuses){
            var statusToProcess = event.enemies[enemy].statuses[status];
            var statToAffectArray = statusToProcess.affects;
            for (var index in statToAffectArray){
                var statToAffect = statToAffectArray[index]
                if (statusToProcess.multiplier){
                    // do a multiplier of the user's current stat
                    var currentStat = userToProcess[statToAffect];
                    if (currentStat){
                        userToProcess.statBuffs[statToAffect] = userToProcess.statBuffs[statToAffect] + (Math.floor((statusToProcess.multiplier * currentStat) - currentStat));
                    }
                }
    
                if (statusToProcess.additive){
                    // do a multiplier of the user's current stat
                    var currentStat = userToProcess[statToAffect];
                    if (currentStat){
                        userToProcess.statBuffs[statToAffect] = userToProcess.statBuffs[statToAffect] + (Math.floor(statusToProcess.additive));
                    }
                }
            }
        }
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
            if (rpgAbilities[abilityPicked].dmg
                || rpgAbilities[abilityPicked].dot
                || rpgAbilities[abilityPicked].status
                || rpgAbilities[abilityPicked].name == "drain"){
                // target SHOULD be the membersinparty

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

            }else if(rpgAbilities[abilityPicked].heal
                || rpgAbilities[abilityPicked].hot
                || rpgAbilities[abilityPicked].buff
                || rpgAbilities[abilityPicked].special){
                // target SHOULD be the enemies
                var validTarget = false;
                var stuckCount = 0
                var target;
                while(!validTarget && stuckCount < 100){
                    if (abilityPicked == "revive"){
                        // check for a dead teammate and revive them, if no dead teammates, just attack ?
                        var ableToRevive = false;
                        for (var enemy in event.enemies){
                            if (event.enemies[enemy].statuses.indexOf("dead") > -1){
                                // enemy is dead, pick them as the target
                                target = event.enemies[enemy].id; // for actual id
                                validTarget = true;
                                ableToRevive = true;
                                break;
                            }
                        }
                        if (!ableToRevive){
                            // attack
                            abilityPicked = "attack";
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
                        }
                    }
                    if (abilityPicked == "bandaid"){
                        // check for an enemy with a status that is not dead, if none with statuses, just attack ?
                        var ableToBandaid = false;
                        for (var enemy in event.enemies){
                            if (event.enemies[enemy].statuses.indexOf("dead") == -1
                                && event.enemies[enemy].statuses.length > 1){
                                // enemy is dead, pick them as the target
                                target = event.enemies[enemy].id; // for actual id
                                validTarget = true;
                                var ableToBandaid = true;
                                break;
                            }
                        }
                        if (!ableToBandaid){
                            // attack
                            abilityPicked = "attack";
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
                        }
                    }
                    else{
                        var targetMember = Math.floor(Math.random() * event.enemiesCount) + 1;
                        if (event.enemies[targetMember].statuses.indexOf("dead") == -1){
                            // valid target
                            target = targetMember;
                            validTarget = true;
                        }
                        stuckCount++;
                    }
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
}

var rpgAbilities = {
    attack : {
        name: "attack",
        dmg: 50,
        type: "physical"
    },
    tacoheal : {
        name: "heal",
        heal: 30
    },
    bandaid : {
        name: "bandaid",
        special: "remove status"
    },
    orchatasip: {
        name:"orchata sip",
        hot: {
            name: "orchata sip",
            heal: 4,
            emoji: "🥛",
            healingOnHotApply: false,
            turnsToExpire: 3,
            healingOnDotExpire: false,
            healingOnExpire: 0
        }
    },
    tacowall: {
        buff: {
            name: "taco wall",
            emoji : "🏛",
            affects: ["armor"],
            multiplier: 1.25
        }
    },
    barrier: {
        buff: {
            name: "barrier",
            emoji: "🚧 ",
            affects: ["spirit"],
            additive: 30
        }
    },
    flameblast: {
        dmg: 50,
        type: "fire",
        dot: {
            name: "burning",
            dmg: 5,
            type: "fire",
            emoji: "🔥",
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
            dmg: 8,
            emoji : "🤢",
            type: "poison",
            damageOnDotApply: false,
            turnsToExpire: 3,
            damageOnDotExpire: false,
            damageOnExpire: 0
        }
    },
    iceshards: {
        dmg: 30,
        type: "ice",
        areawide: true,
        targets: "enemy"
    },
    shock: {
        name: "shock",
        dmg: 90,
        type: "electric",
        special: "selfdamage",
        selfdamage: 15
    },
    rockthrow: {
        dmg: 20,
        type: "earth",
        special: "warm up",
        buff: {
            selfbuff: true,
            stacksOfWarmUp: 1,
            emoji: "🤾",
            name: "warm up",
            maxStacks: 5,
            atMaxStacksDealDamage: 200
        }
    },
    drain: {
        name: "drain",
        type: "physical",
        special: {
            name: "drain",
            dmg: 40,
            heal: 20,
        }
    },
    haste: {
        passive: true,
        name: "name",
        buff: {
            name: "haste",
            emoji: "💨"
        }
    },

    //
    revive: {
        special: "remove death"
    },
    empower: {
        buff: {
            name: "empower",
            emoji: "💪🏼",
            affects: ["attackDmg", "magicDmg"],
            multiplier: 2
        }
    },
    shoot: {
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
            emoji: "❄️",
            affects: ["armor"],
            multiplier: 0.7
        }
    },
    cripple: {
        status: {
            name: "crippled",
            emoji: "🤕",
            affects: ["attackDmg"],
            multiplier: 0.7
        }
    },
    weaken: {
        status: {
            name: "weakened",
            emoji: "😵 ",
            affects: ["magicDmg"],
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
            emoji: "🛡️",
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
            name: "Rabbid Wolf",
            abilities: ["attack", "attack", "foodpoisoning", "foodpoisoning", "tacowall"],
            buffs: [],
            hp: 300,
            attackDmg: 30,
            magicDmg: 30,
            armor: 24,
            spirit: 24,
            element: "normal"
        },
        {
            name: "Bad Chef",
            abilities: ["attack", "attack", "foodpoisoning", "foodpoisoning", "barrier"],
            buffs: [],
            hp: 250,
            attackDmg: 45,
            magicDmg: 37,
            armor: 30,
            spirit: 17,
            element: "normal"
        },
        {
            name: "Angry Mob Member",
            abilities: ["attack", "attack", "foodpoisoning", "iceshards", "iceshards", "cripple"],
            buffs: [],
            hp: 260,
            attackDmg: 43,
            magicDmg: 35,
            armor: 30,
            spirit: 17,
            element: "normal"
        },
        {
            name: "Taco Dealer",
            abilities: ["attack", "attack", "drain", "drain", "freeze"],
            buffs: [],
            hp: 325,
            attackDmg: 25,
            magicDmg: 49,
            armor: 17,
            spirit: 30,
            element: "normal"
        }
    ],
    medium: [
        {
            name: "Taco Bandit",
            abilities: ["attack", "attack", "rockthrow", "rockthrow", "orchatasip"],
            buffs: [],
            hp: 550,
            attackDmg: 120,
            magicDmg: 90,
            armor: 55,
            spirit: 40,
            element: "normal"
        },
        {
            name: "Taco Thief",
            abilities: ["attack", "attack", "orchatasip", "flameblast", "flameblast"],
            buffs: [],
            hp: 500,
            attackDmg: 80,
            magicDmg: 140,
            armor: 35,
            spirit: 50,
            element: "normal"
        },
        {
            name: "Slots Gambler",
            abilities: ["attack", "attack", "elixir", "shock", "shock"],
            buffs: [],
            hp: 575,
            attackDmg: 110,
            magicDmg: 110,
            armor: 30,
            spirit: 70,
            element: "normal"
        }
    ],
    hard: [
        {
            name: "Football Player",
            abilities: ["attack", "attack", "barrier", "shock", "shock", "rockthrow", "rockthrow", "empower"],
            buffs: [
                {
                    name: "frenzy",
                    emoji: "😡",
                    onTurnEnd: {
                        attackDmgPlus : 15,
                        everyNTurns: 2,
                        startTurn: 2
                    }
                }
            ],
            hp: 1000,
            attackDmg: 160,
            magicDmg: 160,
            armor: 80,
            spirit: 80,
            element: "normal"
        },
        {
            name: "Samurai Warrior",
            abilities: ["attack", "attack", "iceshards", "iceshards", "drain", "drain", "bandaid"],
            buffs: [
                {
                    name: "frenzy",
                    emoji: "😡",
                    onTurnEnd: {
                        attackDmgPlus : 15,
                        everyNTurns: 2,
                        startTurn: 2
                    }
                }
            ],
            hp: 1200,
            attackDmg: 200,
            magicDmg: 80,
            armor: 100,
            spirit: 50,
            element: "normal"
        },
        {
            name: "Funny Politician",
            abilities: ["attack" , "attack" , "revive", "foodpoisoning", "shoot", "shoot","freeze"],
            buffs: [
                {
                    name: "frenzy",
                    emoji: "😡",
                    onTurnEnd: {
                        attackDmgPlus : 15,
                        everyNTurns: 2,
                        startTurn: 2
                    }
                }
            ],
            hp: 850,
            attackDmg: 50,
            magicDmg: 170,
            armor: 110,
            spirit: 70,
            element: "normal"
        }
    ],
    boss: [
        {
            name: "Vampire",
            abilities: [
               "attack", "attack", "rockthrow", "rockthrow", "shock", "shock", "barrier"
            ],
            buffs: [
                {
                    name: "frenzy",
                    emoji: "😡",
                    onTurnEnd: {
                        attackDmgPlus : 30,
                        everyNTurns: 2,
                        startTurn: 2
                    }
                }
            ],
            hp: 2000,
            attackDmg: 200,
            magicDmg: 200,
            armor: 150,
            spirit: 150,
            element: "normal"
        },
        {
            name: "Escaped Robot",
            abilities: [
                "attack", "attack", "drain", "drain", "iceshards", "iceshards", "shield"
            ],
            buffs: [
                {
                    name: "frenzy",
                    emoji: "😡",
                    onTurnEnd: {
                        attackDmgPlus : 30,
                        everyNTurns: 2,
                        startTurn: 2
                    }
                }
            ],
            hp: 2500,
            attackDmg: 250,
            magicDmg: 160,
            armor: 100,
            spirit: 200,
            element: "normal"
        },
        {
            name: "Desperado",
            abilities: [
                "attack", "attack", "shoot", "shoot", "shock", "shock", "empower"
            ],
            buffs: [
                {
                    name: "frenzy",
                    emoji: "😡",
                    onTurnEnd: {
                        attackDmgPlus : 30,
                        everyNTurns: 2,
                        startTurn: 2
                    }
                }
            ],
            hp: 1500,
            attackDmg: 170,
            magicDmg: 250,
            armor: 180,
            spirit: 120,
            element: "normal"
        }
    ],
    special: [
        {
            name: "Taco Monster 13",
            abilities: [
                "attack",
                "attack",
                "foodpoisoning",
                "foodpoisoning",
                "shock",
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
    