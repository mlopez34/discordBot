const Discord = require("discord.js");
var experience = require("./experience.js")
var Promise = require('bluebird');
var profileDB = require("./profileDB.js");
var config = require("./config");
var rpglib = require("./rpglib");
var moment = require("moment");
var RPG_COOLDOWN_HOURS = 0
var activeRPGEvents = {};
var activeRPGItemIds = {};
var usersInRPGEvents = {};
var TEAM_MAX_LENGTH = 5;
var rpgAbilities = rpglib.rpgAbilities;
var enemiesToEncounter = rpglib.enemiesToEncounter;

module.exports.rpgInitialize = function(message, special){
    // create an embed saying that b is about to happen, for users MAX of 5 users and they must all say -ready to start costs 5 tacos per person
    var discordUserId = message.author.id;
    var users  = message.mentions.users
    var team = [];
    team.push(message.author);

    users.forEach(function(user){
        if (team.length < TEAM_MAX_LENGTH ){//&& discordUserId != user.id){
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

    if (team.length >= 2 && team.length <= TEAM_MAX_LENGTH && validTeam){
        // send an embed that the users are needed for the RPG event to say -ready or -notready
        // if the user says -ready, they get added to activeRPGEvents that they were invited to
        const embed = new Discord.RichEmbed()
        .setAuthor("RPG Event initiated by " + message.author.username + "!" )
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
            activeRPGEvents["rpg-" + sentMessage.id].lastEmbedMessage = sentMessage;
            activeRPGEvents["rpg-" + sentMessage.id].endOfTurnEvents = [];
            if (special && special.challenge){
                activeRPGEvents["rpg-" + sentMessage.id].challenge = {
                    challenge: special.challenge,
                    valid: false
                };
                activeRPGEvents["rpg-" + sentMessage.id].leader = message.author;
            }else if (special){
                activeRPGEvents["rpg-" + sentMessage.id].special = special;
                activeRPGEvents["rpg-" + sentMessage.id].leader = message.author;
            }
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
                    // also delete the list of items the user is using from activeItems
                    if (usersInRPGEvents["rpg-" + idToRemove] && usersInRPGEvents["rpg-" + idToRemove].memberStats){
                        // free up the items the user is using
                        for (var item in usersInRPGEvents["rpg-" + idToRemove].memberStats.itemsBeingWornUserIds){
                            var itemInQuestion = usersInRPGEvents["rpg-" + idToRemove].memberStats.itemsBeingWornUserIds[item];
                            if (activeRPGItemIds[itemInQuestion]){
                                delete activeRPGItemIds[itemInQuestion]
                            }
                        }
                    }
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

module.exports.showRpgStats = function(message, itemsAvailable, amuletItemsById){
    var discordUserId = message.author.id;
    
    profileDB.getUserProfileData(discordUserId, function(err, userData){
        if (err){
            console.log(err);
            message.channel.send(err + " something went wrong [profile]");
        }else{
            var userStats = userData.data;
            // get amulets data
            profileDB.getUserItems(discordUserId, function(err, inventoryResponse){
                if (err){
                    console.log(err);
                }
                else{
                    // console.log(inventoryResponse.data);
                    // get all the data for each item
                    var itemsInInventoryCountMap = {};
                    var itemsMapbyId = {};

                    for (var item in inventoryResponse.data){

                        if (!itemsInInventoryCountMap[inventoryResponse.data[item].itemid] ){
                            // item hasnt been added to be counted, add it as 1
                            itemsInInventoryCountMap[inventoryResponse.data[item].itemid] = 1;
                        }
                    }
                    // have items mapped by id and items in inventory
                    // check if i have any of all the possible amulet items
                    var userAmuletData = []
                    for (var amulet in amuletItemsById){
                        var idToCheck = amuletItemsById[amulet].id;
                        if (itemsInInventoryCountMap[idToCheck]){
                            userAmuletData.push(amuletItemsById[amulet]);
                        }
                    }

                    profileDB.getUserWearInfo(discordUserId, function(wearErr, wearData){
                        if (wearErr){
                            console.log(wearErr);
                            message.channel.send(wearErr + " something went wrong [wearing] - someone doesn't have a wearing profile");
                        }else{
                            // get the wearing data
                            var singleItemsStrings = {};
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
                                var singleItemString = "**Abilities**: ";
                                if (itemsAvailable[items[i]].ability1){
                                    abilities.push(itemsAvailable[items[i]].ability1);
                                    singleItemString = singleItemString + itemsAvailable[items[i]].ability1 + ","
                                }
                                if (itemsAvailable[items[i]].ability2){
                                    abilities.push(itemsAvailable[items[i]].ability2);
                                    singleItemString = singleItemString + itemsAvailable[items[i]].ability2 + ","
                                }
                                if (itemsAvailable[items[i]].specialability){
                                    abilities.push(itemsAvailable[items[i]].specialability)
                                    singleItemString = singleItemString + itemsAvailable[items[i]].specialability + ","
                                }
                                if (itemsAvailable[items[i]].passiveability){
                                    abilities.push(itemsAvailable[items[i]].passiveability);
                                    singleItemString = singleItemString + itemsAvailable[items[i]].passiveability + ","
                                }
                                singleItemString = singleItemString + "\n"

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

                                singleItemString = singleItemString + "**Stats**: ";
                                singleItemString = singleItemString + " 💚 " + hpPlus;
                                singleItemString = singleItemString + " 🗡️ " + attackDmgPlus;
                                singleItemString = singleItemString + " ☄️ " + magicDmgPlus;
                                singleItemString = singleItemString + " 🛡️ " + armorPlus;
                                singleItemString = singleItemString + " 🙌 " + spiritPlus;

                                // add to map
                                singleItemsStrings[itemsAvailable[items[i]].itemname] = singleItemString;
                            }

                            // stats from amulets
                            var amuletString = "";
                            var amuletHpPlus = 0;
                            var amuletAttackDmgPlus = 0;
                            var amuletMagicDmgPlus = 0;
                            var amuletSpiritPlus = 0;
                            var amuletArmorPlus = 0;
                            var amuletLuckPlus = 0;
                            for (var i in userAmuletData){
                                singleItemString = singleItemString + "\n"

                                var hpPlus = itemsAvailable[userAmuletData[i].id].hpplus ? itemsAvailable[userAmuletData[i].id].hpplus : 0;
                                var attackDmgPlus = itemsAvailable[userAmuletData[i].id].attackdmgplus ? itemsAvailable[userAmuletData[i].id].attackdmgplus : 0;
                                var magicDmgPlus = itemsAvailable[userAmuletData[i].id].magicdmgplus ? itemsAvailable[userAmuletData[i].id].magicdmgplus : 0;
                                var armorPlus = itemsAvailable[userAmuletData[i].id].armorplus ? itemsAvailable[userAmuletData[i].id].armorplus : 0;
                                var spiritPlus = itemsAvailable[userAmuletData[i].id].spiritplus ? itemsAvailable[userAmuletData[i].id].spiritplus : 0;
                                var luckPlus = itemsAvailable[userAmuletData[i].id].luckplus ? itemsAvailable[userAmuletData[i].id].luckplus : 0;
                                amuletHpPlus = amuletHpPlus + hpPlus;
                                amuletAttackDmgPlus = amuletAttackDmgPlus + attackDmgPlus
                                amuletMagicDmgPlus = amuletMagicDmgPlus + magicDmgPlus;
                                amuletSpiritPlus = amuletSpiritPlus + spiritPlus;
                                amuletArmorPlus = amuletArmorPlus + armorPlus;
                                amuletLuckPlus = amuletLuckPlus + luckPlus;

                                statisticsFromItemsAndLevel.hpPlus = statisticsFromItemsAndLevel.hpPlus + hpPlus;
                                statisticsFromItemsAndLevel.attackDmgPlus = statisticsFromItemsAndLevel.attackDmgPlus + attackDmgPlus;
                                statisticsFromItemsAndLevel.magicDmgPlus = statisticsFromItemsAndLevel.magicDmgPlus + magicDmgPlus;
                                statisticsFromItemsAndLevel.armorPlus = statisticsFromItemsAndLevel.armorPlus + armorPlus;
                                statisticsFromItemsAndLevel.spiritPlus = statisticsFromItemsAndLevel.spiritPlus + spiritPlus;
                                statisticsFromItemsAndLevel.luckPlus = statisticsFromItemsAndLevel.luckPlus + luckPlus;

                            }
                            // stats from amulets
                            amuletString = amuletString + "**Amulet Stats**: ";
                            amuletString = amuletString + " 💚 " + amuletHpPlus;
                            amuletString = amuletString + " 🗡️ " + amuletAttackDmgPlus;
                            amuletString = amuletString + " ☄️ " + amuletMagicDmgPlus;
                            amuletString = amuletString + " 🛡️ " + amuletArmorPlus;
                            amuletString = amuletString + " 🙌 " + amuletSpiritPlus;
                            if (userAmuletData.length > 0){
                                singleItemsStrings['Amulets'] = amuletString
                            }

                            // added stats from level
                            statisticsFromItemsAndLevel.hpPlus = statisticsFromItemsAndLevel.hpPlus + userStats.level
                            statisticsFromItemsAndLevel.attackDmgPlus = statisticsFromItemsAndLevel.attackDmgPlus + userStats.level
                            statisticsFromItemsAndLevel.magicDmgPlus = statisticsFromItemsAndLevel.magicDmgPlus + userStats.level
                            statisticsFromItemsAndLevel.armorPlus = statisticsFromItemsAndLevel.armorPlus + userStats.level
                            statisticsFromItemsAndLevel.spiritPlus = statisticsFromItemsAndLevel.spiritPlus + userStats.level
                            statisticsFromItemsAndLevel.luckPlus = statisticsFromItemsAndLevel.luckPlus + userStats.level


                            var partyMemberStats = {
                                level: userStats.level,
                                plusStats: statisticsFromItemsAndLevel,
                                itemsBeingWorn: items,
                                abilities: abilities
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
                                partyMemberSpiritPlus = partyMemberStats.plusStats.spiritPlus ? partyMemberStats.plusStats.spiritPlus : 0
                                partyMemberLuckPlus = partyMemberStats.plusStats.luckPlus ? partyMemberStats.plusStats.luckPlus: 0
                            }
                            var myStats = {
                                id: message.author.id,
                                name: message.author.username,
                                username: message.author.username,
                                hp: 250 + (27 *  partyMemberStats.level ) + partyMemberHpPlus,
                                attackDmg: 10 + (9 * partyMemberStats.level) + partyMemberAttackDmgPlus,
                                magicDmg:  10 + (9 * partyMemberStats.level) + partyMemberMagicDmgPlus,
                                armor: 5 + (partyMemberStats.level * partyMemberStats.level) + partyMemberArmorPlus,
                                spirit: 5 + (partyMemberStats.level * partyMemberStats.level) + partyMemberSpiritPlus,
                                luck: 1 + partyMemberLuckPlus,
                                abilitiesMap : {},
                                abilities: ["attack"],
                                passiveAbilities: [],
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
                            myStats.maxhp = myStats.hp;
                            // insert the abilities and statuses for the party member
                            if (partyMemberStats && partyMemberStats.abilities){
                                for( var ability in partyMemberStats.abilities){
                                    if (rpgAbilities[partyMemberStats.abilities[ability]].passive){
                                        // add it as a buff and a passive ability
                                        var passiveAbilityBuff = JSON.parse(JSON.stringify( rpgAbilities[partyMemberStats.abilities[ability]].buff ));
                                        myStats.buffs.push(passiveAbilityBuff);
                                        myStats.passiveAbilities.push(passiveAbilityBuff);
                                        myStats.abilitiesMap[passiveAbilityBuff.name] = passiveAbilityBuff;
                                    }
                                    else{
                                        if (myStats.abilities.indexOf(partyMemberStats.abilities[ability]) == -1){
                                            var playerAbility = JSON.parse(JSON.stringify( partyMemberStats.abilities[ability] ));
                                            myStats.abilities.push( playerAbility );
                                            var playerAbilityObject = JSON.parse(JSON.stringify( rpgAbilities[partyMemberStats.abilities[ability]] ));
                                            myStats.abilitiesMap[playerAbility] = playerAbilityObject;
                                        }                                
                                    }
                                }
                            }

                            var now = new Date();
                            var oneHourAgo = new Date();
                            oneHourAgo = new Date(oneHourAgo.setHours(oneHourAgo.getHours() - RPG_COOLDOWN_HOURS ));
                            var lastrpgtime = userData.data.lastrpgtime;
                            var rpgTimeLeft = "";
                            if (lastrpgtime && oneHourAgo > lastrpgtime || !lastrpgtime){
                                rpgTimeLeft = "ready";
                            }
                            else{
                                now = new Date(now.setMinutes(now.getMinutes()));
                                var numberOfHours = getDateDifference(userData.data.lastrpgtime, now, RPG_COOLDOWN_HOURS);
                                rpgTimeLeft = " `" + numberOfHours +"` left on cooldown";
                            }
                            const embed = new Discord.RichEmbed()
                            //.setThumbnail("https://media.giphy.com/media/mIZ9rPeMKefm0/giphy.gif")
                            .setColor(0xF2E93E)
                            
                            var playerString = userStatsStringBuilder(myStats, message.author.username, false);
                            playerString = playerString + "\nTime remaining: " + rpgTimeLeft;
                            embed.addField( message.author.username, playerString )
                            // set the item strings
                            for (var s in singleItemsStrings){
                                embed.addField( s, singleItemsStrings[s] )
                            }
                            message.channel.send({embed})
                        }
                    })
                }
            })
        }
    })
}

module.exports.rpgReady = function(message, itemsAvailable, amuletItemsById){
    // create an embed saying that b is about to happen, for users MAX of 5 users and they must all say -ready to start costs 5 tacos per person
    var discordUserId = message.author.id;
    
    if (usersInRPGEvents["rpg-" + discordUserId] && usersInRPGEvents["rpg-" + discordUserId].ready != true){
        message.channel.send( message.author + " is ready");
        // get the user's profile and get the user's wearing
        profileDB.getUserProfileData(discordUserId, function(err, userData){
            if (err){
                console.log(err);
                message.channel.send(err + " something went wrong [profile]");
            }else{

                var now = new Date();
                var oneHourAgo = new Date();
                var rpgEventId = usersInRPGEvents["rpg-" + discordUserId].id;
                var isSpecialEvent = activeRPGEvents[ "rpg-" +  rpgEventId ] ? activeRPGEvents[ "rpg-" + rpgEventId ].special : false;
                var currentPlayerChallenge = userData.data.currentchallenge || 0 ;
                var challengePicked = (activeRPGEvents[ "rpg-" +  rpgEventId ] && activeRPGEvents[ "rpg-" +  rpgEventId ].challenge) ? activeRPGEvents[ "rpg-" + rpgEventId ].challenge.challenge : false;
                if ((currentPlayerChallenge + 1) >= (parseInt( challengePicked ) ) 
                    && (parseInt( challengePicked ) ) > 0 
                    && (parseInt( challengePicked ) ) < 7){
                    activeRPGEvents[ "rpg-" +  rpgEventId ].challenge.valid = true;
                }
                oneHourAgo = new Date(oneHourAgo.setHours(oneHourAgo.getHours() - RPG_COOLDOWN_HOURS ));
                var lastrpgtime = userData.data.lastrpgtime;
                if ((lastrpgtime && oneHourAgo > lastrpgtime) 
                    || isSpecialEvent 
                    || !lastrpgtime ){
                    // get the user profile data
                    var userStats = userData.data;

                    profileDB.getUserItems(discordUserId, function(err, inventoryResponse){
                        if (err){
                            console.log(err);
                        }
                        else{
                            // console.log(inventoryResponse.data);
                            // get all the data for each item
                            var itemsInInventoryCountMap = {};
                            var itemsMapbyId = {};
        
                            for (var item in inventoryResponse.data){
        
                                if (!itemsInInventoryCountMap[inventoryResponse.data[item].itemid] ){
                                    // item hasnt been added to be counted, add it as 1
                                    itemsInInventoryCountMap[inventoryResponse.data[item].itemid] = 1;
                                }
                            }
                            // have items mapped by id and items in inventory
                            // check if i have any of all the possible amulet items
                            var userAmuletData = []
                            for (var amulet in amuletItemsById){
                                var idToCheck = amuletItemsById[amulet].id;
                                if (itemsInInventoryCountMap[idToCheck]){
                                    userAmuletData.push(amuletItemsById[amulet]);
                                }
                            }        

                            profileDB.getUserWearInfo(discordUserId, function(wearErr, wearData){
                                if (wearErr){
                                    console.log(wearErr);
                                    message.channel.send(wearErr + " something went wrong [wearing] - someone doesn't have a wearing profile");
                                }else{
                                    // get the wearing data
                                    var wearingStats = wearData.data[0];
                                    var items = [];
                                    var userItemIds = [];

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
                                        // check that the itemid is not already being used
                                        if (!activeRPGItemIds[wearingStats.slot1useritemid]){
                                            items.push(wearingStats.slot1itemid);
                                            userItemIds.push(wearingStats.slot1useritemid);
                                            activeRPGItemIds[wearingStats.slot1useritemid] = true;
                                        }
                                    }
                                    if (wearingStats.slot2itemid){
                                        if (!activeRPGItemIds[wearingStats.slot2useritemid]){
                                            items.push(wearingStats.slot2itemid);
                                            userItemIds.push(wearingStats.slot2useritemid);
                                            activeRPGItemIds[wearingStats.slot2useritemid] = true;
                                        }
                                    }
                                    if (wearingStats.slot3itemid){
                                        if (!activeRPGItemIds[wearingStats.slot3useritemid]){
                                            items.push(wearingStats.slot3itemid);
                                            userItemIds.push(wearingStats.slot3useritemid);
                                            activeRPGItemIds[wearingStats.slot3useritemid] = true;
                                        }
                                    }
                                    // added stats from items
                                    for (var i in items){
                                        if (itemsAvailable[items[i]].ability1){
                                            abilities.push(itemsAvailable[items[i]].ability1);
                                        }
                                        if (itemsAvailable[items[i]].ability2){
                                            abilities.push(itemsAvailable[items[i]].ability2);
                                        }
                                        if (itemsAvailable[items[i]].specialability){
                                            abilities.push(itemsAvailable[items[i]].specialability)
                                        }
                                        if (itemsAvailable[items[i]].passiveability){
                                            abilities.push(itemsAvailable[items[i]].passiveability);
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

                                    for (var i in userAmuletData){

                                        var hpPlus = itemsAvailable[userAmuletData[i].id].hpplus ? itemsAvailable[userAmuletData[i].id].hpplus : 0;
                                        var attackDmgPlus = itemsAvailable[userAmuletData[i].id].attackdmgplus ? itemsAvailable[userAmuletData[i].id].attackdmgplus : 0;
                                        var magicDmgPlus = itemsAvailable[userAmuletData[i].id].magicdmgplus ? itemsAvailable[userAmuletData[i].id].magicdmgplus : 0;
                                        var armorPlus = itemsAvailable[userAmuletData[i].id].armorplus ? itemsAvailable[userAmuletData[i].id].armorplus : 0;
                                        var spiritPlus = itemsAvailable[userAmuletData[i].id].spiritplus ? itemsAvailable[userAmuletData[i].id].spiritplus : 0;
                                        var luckPlus = itemsAvailable[userAmuletData[i].id].luckplus ? itemsAvailable[userAmuletData[i].id].luckplus : 0;

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
                                        currentchallenge: currentPlayerChallenge,
                                        plusStats: statisticsFromItemsAndLevel,
                                        itemsBeingWorn: items,
                                        itemsBeingWornUserIds: userItemIds,
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
                                            var validEvent = true;
                                            if (activeRPGEvents[rpgEvent].challenge 
                                                && !activeRPGEvents[rpgEvent].challenge.valid){
                                                // the event is a challenge and it is valid
                                                validEvent = false;
                                            }
                                            if (validEvent) {
                                                if (!activeRPGEvents[rpgEvent].special){
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
                                                }
                                                // if all team members are ready, create the RPG event
                                                var maxLevelInParty = 1;
                                                var averageLevelInParty = 0;
                                
                                                // create team members list
                                                // team members get abilities based on their items, 1 ult ability at random
                                                // create their stats based on their level + items
                                                // hp, attack dmg, magic dmg, armor
                                                var membersInParty = {};
                                                for (var member in activeRPGEvents[rpgEvent].members){
                                                    var partyMember = activeRPGEvents[rpgEvent].members[member];
                                                    var partyMemberStats = usersInRPGEvents["rpg-"+partyMember.id].memberStats ? usersInRPGEvents["rpg-"+partyMember.id].memberStats : undefined;
                                                    averageLevelInParty = averageLevelInParty + partyMemberStats.level;
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
                                                        var abilities = [ ]
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
                                                        partyMemberSpiritPlus = partyMemberStats.plusStats.spiritPlus ? partyMemberStats.plusStats.spiritPlus : 0
                                                        partyMemberLuckPlus = partyMemberStats.plusStats.luckPlus ? partyMemberStats.plusStats.luckPlus: 0
                                                    }
                                                    membersInParty["rpg-" + partyMember.id] = {
                                                        id: partyMember.id,
                                                        name: partyMember.username,
                                                        username: partyMember.username,
                                                        hp: 250000 + (27 *  partyMemberStats.level ) + partyMemberHpPlus,
                                                        attackDmg: 1000 + (9 * partyMemberStats.level) + partyMemberAttackDmgPlus,
                                                        magicDmg:  10 + (9 * partyMemberStats.level) + partyMemberMagicDmgPlus,
                                                        armor: 5 + (partyMemberStats.level * partyMemberStats.level) + partyMemberArmorPlus,
                                                        spirit: 5 + (partyMemberStats.level * partyMemberStats.level) + partyMemberSpiritPlus,
                                                        luck: 1 + partyMemberLuckPlus,
                                                        abilitiesMap : {},
                                                        abilities: ["attack"],
                                                        passiveAbilities: [],
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
                                                                // add it as a buff and a passive ability
                                                                var passiveAbilityBuff = JSON.parse(JSON.stringify( rpgAbilities[partyMemberStats.abilities[ability]].buff ));
                                                                membersInParty["rpg-" + partyMember.id].buffs.push(passiveAbilityBuff);
                                                                membersInParty["rpg-" + partyMember.id].passiveAbilities.push(passiveAbilityBuff);
                                                                membersInParty["rpg-" + partyMember.id].abilitiesMap[passiveAbilityBuff.name] = passiveAbilityBuff;
                                                            }
                                                            else{
                                                                if (membersInParty["rpg-" + partyMember.id].abilities.indexOf(partyMemberStats.abilities[ability]) == -1){
                                                                    var playerAbility = JSON.parse(JSON.stringify( partyMemberStats.abilities[ability] ));
                                                                    membersInParty["rpg-" + partyMember.id].abilities.push( playerAbility );
                                                                    var playerAbilityObject = JSON.parse(JSON.stringify( rpgAbilities[partyMemberStats.abilities[ability]] ));
                                                                    membersInParty["rpg-" + partyMember.id].abilitiesMap[playerAbility] = playerAbilityObject;
                                                                }                                
                                                            }
                                                        }
                                                    }
                                                }
                                                averageLevelInParty = Math.ceil( averageLevelInParty / activeRPGEvents[rpgEvent].members.length );
                                                // create the enemy list and add to the embed
                                                // enemy list has regular attack, 2 abilities, 1 ult ability
                                                // create enemy stats, enemy stats scale with current user's average level
                                                // hp, attack dmg, magic dmg, armor, element(optional)
                                                var enemyCount = activeRPGEvents[rpgEvent].members.length

                                                var enemies = {};
                                                var enemyIdCount = 1
                                                if (activeRPGEvents[rpgEvent].challenge){
                                                    var challengeNum = activeRPGEvents[rpgEvent].challenge.challenge;
                                                    var specialEnemies = enemiesToEncounter.challenge[challengeNum].enemies;

                                                    for (var i = 0; i < specialEnemies.length; i++){
                                                        enemyFound = JSON.parse(JSON.stringify( specialEnemies[i] ));

                                                        enemies[enemyIdCount] = {
                                                            id: enemyIdCount,
                                                            name: enemyFound.name,
                                                            hp: enemyFound.hp + (21 * maxLevelInParty) + (enemyFound.hpPerPartyMember * enemyCount), 
                                                            attackDmg: enemyFound.attackDmg + (10 * maxLevelInParty) + (enemyFound.adPerPartyMember * enemyCount), 
                                                            magicDmg: enemyFound.magicDmg + (10 * maxLevelInParty) + (enemyFound.mdPerPartyMember * enemyCount),
                                                            armor: enemyFound.armor + (maxLevelInParty * maxLevelInParty),
                                                            spirit: enemyFound.spirit + ( maxLevelInParty * maxLevelInParty),
                                                            statuses: [],
                                                            endOfTurnEvents: [],
                                                            statBuffs: {
                                                                hp: 0,
                                                                attackDmg: 0,
                                                                magicDmg: 0,
                                                                armor: 0,
                                                                spirit: 0,
                                                                maxhp: 0
                                                            },
                                                            buffs: enemyFound.buffs,
                                                            difficulty: enemyFound.difficulty,
                                                            abilities: enemyFound.abilities,
                                                            effectsOnDeath: enemyFound.effectsOnDeath,
                                                            abilitiesMap : {},
                                                            element: enemyFound.element
                                                        }

                                                        if (enemyFound.abilityOrder){
                                                            enemies[enemyIdCount].abilityOrder = enemyFound.abilityOrder
                                                        }

                                                        for( var ability in enemies[enemyIdCount].abilities){
                                                            var abilityName = enemies[enemyIdCount].abilities[ability]
                                                            if (rpgAbilities[abilityName] && rpgAbilities[abilityName].passive){
                                                                // add it as a buff and a passive ability
                                                                var passiveAbilityBuff = JSON.parse(JSON.stringify( rpgAbilities[abilityName].buff ));
                                                                enemies[enemyIdCount].buffs.push(passiveAbilityBuff);
                                                                enemies[enemyIdCount].passiveAbilities.push(passiveAbilityBuff);
                                                                enemies[enemyIdCount].abilitiesMap[passiveAbilityBuff.name] = passiveAbilityBuff;
                                                            }
                                                            else if (rpgAbilities[abilityName]){
                                                                var playerAbility = JSON.parse(JSON.stringify( abilityName ));
                                                                var playerAbilityObject = JSON.parse(JSON.stringify( rpgAbilities[ abilityName ] ));
                                                                enemies[enemyIdCount].abilitiesMap[playerAbility] = playerAbilityObject;       
                                                            }
                                                            else{
                                                                message.channel.send("enemy has an ability that doesnt exist!")
                                                            }
                                                        }

                                                        for (var eventAtEndOfTurn in enemyFound.endOfTurnEvents){
                                                            var endOfTurnEventName =  enemyFound.endOfTurnEvents[ eventAtEndOfTurn ]
                                                            if ( rpgAbilities[ endOfTurnEventName ] ){
                                                                var eventToPush = JSON.parse(JSON.stringify( rpgAbilities[ endOfTurnEventName ] ));
                                                                if ( eventToPush.belongsToEvent ){
                                                                    activeRPGEvents[rpgEvent].endOfTurnEvents.push( eventToPush );
                                                                }else if ( eventToPush.belongsToMember ){
                                                                    enemies[enemyIdCount].endOfTurnEvents.push( eventToPush );
                                                                }
                                                            }
                                                        }

                                                        enemies[enemyIdCount].maxhp = enemies[enemyIdCount].hp;
                                                        enemyIdCount++;
                                                    }
                                                }
                                                else if (activeRPGEvents[rpgEvent].special){
                                                    // get 
                                                    var specialRpg = activeRPGEvents[rpgEvent].special.questName;
                                                    var specialEnemies = enemiesToEncounter.special[specialRpg];
                                                    
                                                    for (var i = 0; i < specialEnemies.length; i++){
                                                        enemyFound = JSON.parse(JSON.stringify( specialEnemies[i] ));

                                                        enemies[enemyIdCount] = {
                                                            id: enemyIdCount,
                                                            name: enemyFound.name,
                                                            hp: enemyFound.hp + (21 * averageLevelInParty),
                                                            attackDmg: enemyFound.attackDmg + (11 * averageLevelInParty),
                                                            magicDmg: enemyFound.magicDmg + (11 * averageLevelInParty),
                                                            armor: enemyFound.armor + (maxLevelInParty * maxLevelInParty),
                                                            spirit: enemyFound.spirit + ( maxLevelInParty * maxLevelInParty),
                                                            statuses: [],
                                                            endOfTurnEvents: [],
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
                                                            effectsOnDeath: enemyFound.effectsOnDeath,
                                                            abilitiesMap : {},
                                                            element: enemyFound.element
                                                        }

                                                        if (enemyFound.abilityOrder){
                                                            enemies[enemyIdCount].abilityOrder = enemyFound.abilityOrder
                                                        }

                                                        for( var ability in enemies[enemyIdCount].abilities){
                                                            var abilityName = enemies[enemyIdCount].abilities[ability]
                                                            if (rpgAbilities[abilityName] && rpgAbilities[abilityName].passive){
                                                                // add it as a buff and a passive ability
                                                                var passiveAbilityBuff = JSON.parse(JSON.stringify( rpgAbilities[abilityName].buff ));
                                                                enemies[enemyIdCount].buffs.push(passiveAbilityBuff);
                                                                enemies[enemyIdCount].passiveAbilities.push(passiveAbilityBuff);
                                                                enemies[enemyIdCount].abilitiesMap[passiveAbilityBuff.name] = passiveAbilityBuff;
                                                            }
                                                            else if (rpgAbilities[abilityName]){
                                                                var playerAbility = JSON.parse(JSON.stringify( abilityName ));
                                                                var playerAbilityObject = JSON.parse(JSON.stringify( rpgAbilities[ abilityName ] ));
                                                                enemies[enemyIdCount].abilitiesMap[playerAbility] = playerAbilityObject;       
                                                            }
                                                            else{
                                                                message.channel.send("enemy has an ability that doesnt exist!")
                                                            }
                                                        }

                                                        for (var eventAtEndOfTurn in enemyFound.endOfTurnEvents){
                                                            var endOfTurnEventName =  enemyFound.endOfTurnEvents[ eventAtEndOfTurn ]
                                                            if ( rpgAbilities[ endOfTurnEventName ] ){
                                                                var eventToPush = JSON.parse(JSON.stringify( rpgAbilities[ endOfTurnEventName ] ));
                                                                if ( eventToPush.belongsToEvent ){
                                                                    activeRPGEvents[rpgEvent].endOfTurnEvents.push( eventToPush );
                                                                }else if ( eventToPush.belongsToMember ){
                                                                    enemies[enemyIdCount].endOfTurnEvents.push( eventToPush );
                                                                }
                                                            }
                                                        }

                                                        enemies[enemyIdCount].maxhp = enemies[enemyIdCount].hp;
                                                        enemyIdCount++;
                                                    }
                                                }
                                                else{
                                                    var foundBoss = false;
                                                    for (var i = 1; i <= enemyCount; i++){
                                                        // roll for enemy rarity, then roll for the actual enemy
                                                        var rollForRarity;
                                                        if (!foundBoss){
                                                            rollForRarity = Math.floor(Math.random() * 10000) + 1;
                                                        }
                                                        else{
                                                            if (enemyCount > 3){
                                                                rollForRarity = Math.floor(Math.random() * 9650) + 1;
                                                            }else{
                                                                rollForRarity = Math.floor(Math.random() * 8250) + 1;
                                                            }
                                                        }
                                                        var enemyFound;
                                                        if (rollForRarity >= 9650 ){
                                                            // boss
                                                            var enemyRoll = Math.floor(Math.random() * enemiesToEncounter.boss.length);
                                                            enemyFound = JSON.parse(JSON.stringify( enemiesToEncounter.boss[enemyRoll] ));
                                                            foundBoss = true;
                                                        }
                                                        else if (rollForRarity >= 8250 && rollForRarity < 9650 ){
                                                            // hard
                                                            var enemyRoll = Math.floor(Math.random() * enemiesToEncounter.hard.length);
                                                            enemyFound = JSON.parse(JSON.stringify( enemiesToEncounter.hard[enemyRoll]));
                                                        }
                                                        else if (rollForRarity >= 4000 && rollForRarity < 8250 ){
                                                            // medium
                                                            var enemyRoll = Math.floor(Math.random() * enemiesToEncounter.medium.length);
                                                            enemyFound = JSON.parse(JSON.stringify( enemiesToEncounter.medium[enemyRoll]));
                                                        }
                                                        else {
                                                            // easy :)
                                                            var enemyRoll = Math.floor(Math.random() * enemiesToEncounter.easy.length);
                                                            enemyFound = JSON.parse(JSON.stringify(  enemiesToEncounter.easy[enemyRoll]));
                                                        }
                                                        enemies[enemyIdCount] = {
                                                            id: enemyIdCount,
                                                            name: enemyFound.name,
                                                            hp: enemyFound.hp + (21 * averageLevelInParty) + (enemyFound.hpPerPartyMember * enemyCount), 
                                                            attackDmg: enemyFound.attackDmg + (10 * averageLevelInParty) + (enemyFound.adPerPartyMember * enemyCount), 
                                                            magicDmg: enemyFound.magicDmg + (10 * averageLevelInParty) + (enemyFound.mdPerPartyMember * enemyCount),
                                                            armor: enemyFound.armor + (averageLevelInParty * averageLevelInParty),
                                                            spirit: enemyFound.spirit + ( averageLevelInParty * averageLevelInParty),
                                                            statuses: [],
                                                            endOfTurnEvents: [],
                                                            statBuffs: {
                                                                hp: 0,
                                                                attackDmg: 0,
                                                                magicDmg: 0,
                                                                armor: 0,
                                                                spirit: 0,
                                                                maxhp: 0
                                                            },
                                                            buffs: enemyFound.buffs,
                                                            difficulty: enemyFound.difficulty,
                                                            abilities: enemyFound.abilities,
                                                            effectsOnDeath: enemyFound.effectsOnDeath,
                                                            abilitiesMap : {},
                                                            element: enemyFound.element
                                                        }

                                                        if (enemyFound.abilityOrder){
                                                            enemies[enemyIdCount].abilityOrder = enemyFound.abilityOrder
                                                        }

                                                        for( var ability in enemies[enemyIdCount].abilities){
                                                            var abilityName = enemies[enemyIdCount].abilities[ability]
                                                            if (rpgAbilities[abilityName] && rpgAbilities[abilityName].passive){
                                                                // add it as a buff and a passive ability
                                                                var passiveAbilityBuff = JSON.parse(JSON.stringify( rpgAbilities[abilityName].buff ));
                                                                enemies[enemyIdCount].buffs.push(passiveAbilityBuff);
                                                                enemies[enemyIdCount].passiveAbilities.push(passiveAbilityBuff);
                                                                enemies[enemyIdCount].abilitiesMap[passiveAbilityBuff.name] = passiveAbilityBuff;
                                                            }
                                                            else if (rpgAbilities[abilityName]){
                                                                var playerAbility = JSON.parse(JSON.stringify( abilityName ));
                                                                var playerAbilityObject = JSON.parse(JSON.stringify( rpgAbilities[ abilityName ] ));
                                                                enemies[enemyIdCount].abilitiesMap[playerAbility] = playerAbilityObject;       
                                                            }
                                                            else{
                                                                message.channel.send("enemy has an ability that doesnt exist!")
                                                            }
                                                        }
                                                        for (var eventAtEndOfTurn in enemyFound.endOfTurnEvents){
                                                            var endOfTurnEventName =  enemyFound.endOfTurnEvents[ eventAtEndOfTurn ]
                                                            if (rpgAbilities[ endOfTurnEventName ]){
                                                                var eventToPush = JSON.parse(JSON.stringify( rpgAbilities[ endOfTurnEventName ] ));
                                                                if ( eventToPush.belongsToEvent ){
                                                                    activeRPGEvents[rpgEvent].endOfTurnEvents.push( eventToPush );
                                                                }else if ( eventToPush.belongsToMember ){
                                                                    enemies[enemyIdCount].endOfTurnEvents.push( eventToPush );
                                                                }
                                                            }
                                                        }

                                                        enemies[enemyIdCount].maxhp = enemies[enemyIdCount].hp;
                                                        enemyIdCount++;
                                                    }
                                                }
                                                
                                                activeRPGEvents[rpgEvent].enemies = enemies;
                                                activeRPGEvents[rpgEvent].enemiesCount = enemyIdCount - 1;

                                                activeRPGEvents[rpgEvent].membersInParty = membersInParty
                                
                                                activeRPGEvents[rpgEvent].turn = 1;
                                                activeRPGEvents[rpgEvent].enemyTurnAbilities = [];
                                                activeRPGEvents[rpgEvent].memberTurnAbilities = [];
                                                activeRPGEvents[rpgEvent].status = "in progress"
                                                activeRPGEvents[rpgEvent].limitDefensiveReady = true;
                                                activeRPGEvents[rpgEvent].limitOffensiveReady = true;
                                                activeRPGEvents[rpgEvent].averageLevelInParty = averageLevelInParty;
                                
                                                const embed = new Discord.RichEmbed()
                                                .setAuthor("Taco RPG Event has started !!")
                                                .setDescription("do -cast [ability name] [target (1-5 for enemies, @user for group members)] \n example: -cast attack 1 OR -cast tacoheal @bender")
                                                //.setThumbnail("https://media.giphy.com/media/mIZ9rPeMKefm0/giphy.gif")
                                                .setColor(0xF2E93E)
                                                if (activeRPGEvents[rpgEvent].special && activeRPGEvents[rpgEvent].special.avatar){
                                                    embed.setThumbnail(activeRPGEvents[rpgEvent].special.avatar);
                                                }
                                                // party members
                                                //var groupString = "";
                                                var enemiesString = "";

                                                for (var member in activeRPGEvents[rpgEvent].members){
                                                    var memberInRpgEvent = activeRPGEvents[rpgEvent].members[member];
                                                    var memberInParty = activeRPGEvents[rpgEvent].membersInParty["rpg-" + memberInRpgEvent.id]
                                                    var playerString = userStatsStringBuilder(memberInParty, memberInRpgEvent.username, false);
                                                    embed.addField( memberInRpgEvent.username, playerString )
                                                }
                                                // enemies
                                                for (var enemy in activeRPGEvents[rpgEvent].enemies){
                                                    var enemyInRpgEvent = activeRPGEvents[rpgEvent].enemies[enemy];
                                                    var enemyName = activeRPGEvents[rpgEvent].enemies[enemy].name;
                                                    enemiesString = enemiesString + "\n" + userStatsStringBuilder(enemyInRpgEvent, enemyName, true);
                                                }
                                                //embed.addField( "Group", groupString )
                                                embed.addField( "Enemy", enemiesString )
                                                message.channel.send({embed})
                                                .then(function (sentMessage) {
                                                    recalculateStatBuffs(activeRPGEvents[rpgEvent])

                                                    var lastMessage = activeRPGEvents[rpgEvent].lastEmbedMessage
                                                    if (lastMessage){
                                                        lastMessage.delete()
                                                        .then(function(res){
                                                            activeRPGEvents[rpgEvent].lastEmbedMessage = sentMessage
                                                        })
                                                        .catch(function(err){
                                                            console.log(err);
                                                        })
                                                    }
                                                })
                                
                                            }
                                            else{
                                                message.channel.send("cannot start this challenge")
                                            }
                                        }
                                        else{
                                            message.channel.send("waiting on the rest of the group");
                                        }
                                    }
                                }
                            })
                        }
                    })
                }
                else{
                    now = new Date(now.setMinutes(now.getMinutes()));
                    var numberOfHours = getDateDifference(userData.data.lastrpgtime, now, RPG_COOLDOWN_HOURS);
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
        // if user is dead send message that they are dead and cannot cast

        // check that they are able to use the ability they specified (it is in their abilities array)
        if (activeRPGEvents["rpg-"+idOfEventUserIsIn].membersInParty && activeRPGEvents["rpg-"+idOfEventUserIsIn].membersInParty["rpg-"+discordUserId]){
            var userAbilities = activeRPGEvents["rpg-"+idOfEventUserIsIn].membersInParty["rpg-"+discordUserId].abilities;
            var statuses = activeRPGEvents["rpg-"+idOfEventUserIsIn].membersInParty["rpg-"+discordUserId].statuses;

            if (statuses.indexOf("dead") == -1){
                if (userAbilities.indexOf(abilityToUse) > -1){
                    // user can use the ability specified

                    // check that ability is not on cd
                    var cooldown = 0;
                    var abilityInMap = activeRPGEvents["rpg-"+idOfEventUserIsIn].membersInParty["rpg-"+discordUserId].abilitiesMap[abilityToUse]
                    if (abilityInMap){
                        cooldown = abilityInMap.cooldown ? abilityInMap.cooldown : 0;
                    }
                    var validAbility = true
                    if (abilityInMap && abilityInMap.limitDefensive){
                        if (!activeRPGEvents["rpg-"+idOfEventUserIsIn].limitDefensiveReady){
                            validAbility = false;
                        }
                    }
                    if (abilityInMap && abilityInMap.limitOffensive){
                        if (!activeRPGEvents["rpg-"+idOfEventUserIsIn].limitOffensiveReady){
                            validAbility = false;
                        }
                    }
                    if (cooldown == 0 && validAbility){
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
                                try{
                                    processRpgTurn(message, activeRPGEvents["rpg-"+idOfEventUserIsIn]);
                                }
                                catch(err){
                                    console.log(err);
                                }
                            }
                        }else{
                            message.channel.send("invalid ability or already used ability");
                        }
                    }else if (!validAbility){
                        if (!activeRPGEvents["rpg-"+idOfEventUserIsIn].limitOffensiveReady){
                            message.channel.send("limit offensive ability already used in this event")
                        }else if (!activeRPGEvents["rpg-"+idOfEventUserIsIn].limitDefensiveReady){
                            message.channel.send("limit defensive ability already used in this event")
                        }
                    }
                    else{
                        message.channel.send("ability is on cooldown");
                    }
                }else{
                    message.channel.send("can't do that, you do not have that ability");
                }
            }else{
                message.channel.send("you are dead, you can't do that")
            }
        }else{
            message.channel.send("event has not started yet");
        }
    }
    else{
        message.channel.send("can't do that, you are not in an event or you are not ready")
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
    recalculateStatBuffs(event)
    var passiveEffectsString = processPassiveEffects(event);
    recalculateStatBuffs(event)
    enemiesUseAbilities(event);
    recalculateStatBuffs(event)
    // check all members and enemies and set an order for abilities to take place
    // process all abilities, then check if rpg event ended, if it ended then yield results

    // abilities of members with haste
    for ( var index = event.memberTurnAbilities.length - 1; index >= 0; index--){
        var abilityObject = event.memberTurnAbilities[index];
        for (var i in event.membersInParty["rpg-"+abilityObject.user].buffs){
            if (event.membersInParty["rpg-"+abilityObject.user].buffs[i].name == "Haste"){
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

    while ( order.length > 0 ){
        var currentAbility = order.shift();

        // do the ability
        var abilityToString = processAbility(currentAbility, event)
        recalculateStatBuffs(event)
        turnString = turnString + abilityToString;
    }
    recalculateStatBuffs(event)
    // the order array is empty, check if the rpg event ended
    var endOfTurnString = effectsOnTurnEnd(event)
    recalculateStatBuffs(event)
    var eventHasEnded = checkRpgEventEnd(event);
    if (eventHasEnded.enemiesDead && eventHasEnded.partySuccess){
        // event is over, yield rewards and anouncements
        //var endOfTurnString = effectsOnTurnEnd(event)
        turnFinishedEmbedBuilder(message, event, turnString, passiveEffectsString, endOfTurnString);
        event.status = "ended";
        eventEndedEmbedBuilder(message, event, eventHasEnded.partySuccess)

        // cleanup
        // cleanupEventEnded(event);
    }
    else if(eventHasEnded.partyDead && !eventHasEnded.partySuccess){
        // event is over, party did not succeed
        // var endOfTurnString = effectsOnTurnEnd(event)
        turnFinishedEmbedBuilder(message, event, turnString, passiveEffectsString, endOfTurnString);
        event.status = "ended";
        eventEndedEmbedBuilder(message, event, eventHasEnded.partySuccess)

        // cleanup
        // cleanupEventEnded(event);
    }
    else{
        // event is not over, continue with event
        event.enemyTurnAbilities = [];
        event.memberTurnAbilities = [];
        // var endOfTurnString = effectsOnTurnEnd(event)
        event.turn = event.turn + 1;
        turnFinishedEmbedBuilder(message, event, turnString, passiveEffectsString, endOfTurnString);
    }
}

function cleanupEventEnded(event){
    var idOfEventToDelete = "";
    for (var member in event.membersInParty){
        var idToRemove = event.membersInParty[member].id

        // free up the items the user is using
        for (var item in usersInRPGEvents["rpg-" + idToRemove].memberStats.itemsBeingWornUserIds){
            var itemInQuestion = usersInRPGEvents["rpg-" + idToRemove].memberStats.itemsBeingWornUserIds[item];
            if (activeRPGItemIds[itemInQuestion]){
                delete activeRPGItemIds[itemInQuestion]
            }
        }
        // free up the user
        if (usersInRPGEvents["rpg-" + idToRemove]){
            idOfEventToDelete = "rpg-" + usersInRPGEvents["rpg-" + idToRemove].id;
            delete usersInRPGEvents["rpg-" + idToRemove];
        }
    }
    // dispose of event
    if (activeRPGEvents[idOfEventToDelete]){
        delete activeRPGEvents[idOfEventToDelete];
    }
}

function turnFinishedEmbedBuilder(message, event, turnString, passiveEffectsString, endOfTurnString){
    // create a string of all the events that happened
    const embed = new Discord.RichEmbed()
    .setAuthor("Taco RPG Event")
    .setColor(0xF2E93E)
    .setDescription(passiveEffectsString + turnString + endOfTurnString)
    // party members
    //var groupString = "";
    var enemiesString = "";
    if (event.special && event.special.avatar){
        embed.setThumbnail(event.special.avatar);
    }

    for (var member in event.members){
        var memberInRpgEvent = event.members[member];
        var memberInParty = event.membersInParty["rpg-" + memberInRpgEvent.id]
        var playerString = userStatsStringBuilder(memberInParty, memberInRpgEvent.username, false);
        embed.addField( memberInRpgEvent.username, playerString )
    }
    // enemies
    for (var enemy in event.enemies){
        if (enemiesString.length > 950){
            embed.addField( "Enemy", enemiesString )
            enemiesString = "";
            if (event.enemies[enemy].difficulty == "summoned"){
                if (event.enemies[enemy].hp > 0){
                    var enemyInRpgEvent = event.enemies[enemy];
                    var enemyName = event.enemies[enemy].name;
                    enemiesString = enemiesString + "\n" + userStatsStringBuilder(enemyInRpgEvent, enemyName, true);        
                }
            }else{
                var enemyInRpgEvent = event.enemies[enemy];
                var enemyName = event.enemies[enemy].name;
                enemiesString = enemiesString + "\n" + userStatsStringBuilder(enemyInRpgEvent, enemyName, true);  
            }
        }else{
            if (event.enemies[enemy].difficulty == "summoned"){
                if (event.enemies[enemy].hp > 0){
                    var enemyInRpgEvent = event.enemies[enemy];
                    var enemyName = event.enemies[enemy].name;
                    enemiesString = enemiesString + "\n" + userStatsStringBuilder(enemyInRpgEvent, enemyName, true);        
                }
            }else{
                var enemyInRpgEvent = event.enemies[enemy];
                var enemyName = event.enemies[enemy].name;
                enemiesString = enemiesString + "\n" + userStatsStringBuilder(enemyInRpgEvent, enemyName, true);  
            }
        }
    }
    //embed.addField( "Group", groupString )
    embed.addField( "Enemy", enemiesString )
    message.channel.send({embed})
    .then(function (sentMessage) {
        var lastMessage = event.lastEmbedMessage
        if (lastMessage){
            lastMessage.delete()
            .then(function(res){
                event.lastEmbedMessage = sentMessage
            })
            .catch(function(err){
                console.log(err);
            })
        }
    })
}

function eventEndedEmbedBuilder(message, event, partySuccess){
    profileDB.getItemData(function(err, getItemResponse){
        if (err){
            console.log(err);
        }else{
            const embed = new Discord.RichEmbed()
            .setAuthor("Event has ended")
            .setColor(0xF2E93E)
            if (event.special && event.special.avatar){
                embed.setThumbnail(event.special.avatar);
            }
            if (event.challenge && partySuccess){
                for (var member in event.members){
                    var memberInRpgEvent = event.members[member];
                    var memberInParty = event.membersInParty["rpg-" + memberInRpgEvent.id];
                    // get members current challenge
                    var challengenumber = usersInRPGEvents["rpg-" + memberInParty.id].memberStats.currentchallenge;
                    if ( (challengenumber + 1) == event.challenge.challenge ){
                        profileDB.updateCurrentChallenge( memberInParty.id, challengenumber + 1, function(error, challengeRes){
                            if (error){
                                console.log(error);
                            }else{
                                console.log(challengeRes);
                                //embed.addField("Challenge complete", challengenumber);
                            }
                        })
                    }
                    
                }
            }
            else if (event.special && event.special.reward && partySuccess){
                if (event.special.reward.type == "note"){
                    embed.addField(event.special.reward.fieldTitle, event.special.reward.note)
                }

                if (event.special.reward.questline && event.special.reward.stageAdvance){
                    // TODO: advance the user to the next step of the questline
                    profileDB.updateQuestlineStage(event.leader.id, event.special.questData.questname, event.special.questData.stage + 1, function(error, updateRes){
                        if (error){
                            console.log(error);
                        }else{
                            message.channel.send("advanced");
                        }
                    })
                }
            }
            var numberOfMembers = event.members.length;
            for (var member in event.members){
                var memberInRpgEvent = event.members[member];
                var memberInParty = event.membersInParty["rpg-" + memberInRpgEvent.id];
                var rewards;
                var rewardString = "";
                if (partySuccess){
                    var rewards =  calculateRewards( event, memberInRpgEvent, getItemResponse, numberOfMembers)
                    // add experience and rpgpoints to user
                    updateUserRewards(message, memberInParty, rewards);

                    rewardString = rewardString + "**Experience:** " + rewards.xp + "\n**Rpg Points**: " + rewards.rpgPoints + "\n**Items:** \n";
                    for (var item in rewards.items){
                        rewardString = rewardString + rewards.items[item].itemname + " \n";
                    }
                }
                else{
                    rewards = "No rewards :skull_crossbones:"
                    rewardString = rewardString + " " + rewards + " \n";
                }
                embed.addField(memberInRpgEvent.username,  rewardString, true);
            }
            message.channel.send({embed})
            cleanupEventEnded(event);
        }
    })
}

function updateUserRewards(message, memberInParty, rewards){
    profileDB.getUserProfileData( memberInParty.id, function(err, profileResponse) {
        if(err){
            console.log(err);
        }
        else{
            var firstRpgGain = profileResponse.data.rpgpoints;

            profileDB.updateRpgPoints(memberInParty.id, rewards.rpgPoints, firstRpgGain, function(error, res){
                if (error){
                    console.log(error);
                }else{
                    console.log(res);
                    // add experience and then items
                    experience.gainExperience(message, memberInParty, rewards.xp);
                    if (rewards.items.length > 0){
                        addToUserInventory(memberInParty.id, rewards.items);                        
                    }
                }
            })
        }
    })
}

function addToUserInventory(discordUserId, items){
    profileDB.addNewItemToUser(discordUserId, items, function(itemError, itemAddResponse){
        if (itemError){
            console.log(itemError);
        }
        else{
            console.log(itemAddResponse);
        }
    })
}

function calculateRewards(event, memberInRpgEvent, getItemResponse, numberOfMembers){
    var rewardsForPlayer =  {
        xp: 1,
        rpgPoints: 1,
        items: []
    }
    
    var additionalExperience = 0;
    var additionalRpgPoints = 0;

    var ANCIENT_MAX_ROLL = 9995
    var ANCIENT_MIN_ROLL = 9975;
    var RARE_MAX_ROLL = 9975;
    var RARE_MIN_ROLL = 9800;
    var UNCOMMON_MAX_ROLL = 9800;
    var UNCOMMON_MIN_ROLL = 8750;
    var COMMON_MAX_ROLL = 8750;
    var COMMON_ITEMS_TO_OBTAIN = 1;

    var allItems = getItemResponse.data
    var commonItems = [];
    var uncommonItems = [];
    var rareItems = [];
    var ancientItems = [];
    var artifactItems = [];
    var mythItems = [];

    for (var item in allItems){
        if (allItems[item].itemraritycategory == "common"){
            commonItems.push(allItems[item]);
        }
        else if(allItems[item].itemraritycategory == "uncommon"){
            uncommonItems.push(allItems[item]);
        }
        else if(allItems[item].itemraritycategory == "rare"){
            rareItems.push(allItems[item]);
        }
        else if(allItems[item].itemraritycategory == "ancient"){
            ancientItems.push(allItems[item]);
        }
        else if(allItems[item].itemraritycategory == "artifact"){
            artifactItems.push(allItems[item]);
        }
        else if(allItems[item].itemraritycategory == "myth"){
            mythItems.push(allItems[item]);
        }
    }

    var itemsObtainedArray = [];
    // calculate xp based on level and difficulty of enemies and items
    for (var enemy in event.enemies){
        var rarityRoll = undefined;
        var enemyDifficulty =  event.enemies[enemy].difficulty
        if (enemyDifficulty == "easy"){
            additionalExperience = additionalExperience + 1
            additionalRpgPoints = additionalRpgPoints + 1
            // common items
            rarityRoll = Math.floor(Math.random() * COMMON_MAX_ROLL) + 1;
        }
        else if (enemyDifficulty == "medium"){
            additionalExperience = additionalExperience + 2
            additionalRpgPoints = additionalRpgPoints + 2
            // common ? uncommon
            rarityRoll = Math.floor(Math.random() * UNCOMMON_MAX_ROLL) + 1;
        }
        else if (enemyDifficulty == "hard"){
            additionalExperience = additionalExperience + 9
            additionalRpgPoints = additionalRpgPoints + 9
            // common + uncommon maybe rare
            rarityRoll = Math.floor(Math.random() * 3975) + 6000;
        }
        else if (enemyDifficulty == "boss"){
            additionalExperience = additionalExperience + 19
            additionalRpgPoints = additionalRpgPoints + 19
            // common + uncommon maybe rare maybe ancient
            rarityRoll = Math.floor(Math.random() * 1000) + 9000;
        }

        // push the item to items
        if (rarityRoll){
            if(rarityRoll > ANCIENT_MIN_ROLL ){
                var itemRoll = Math.floor(Math.random() * ancientItems.length);
                console.log(ancientItems[itemRoll]);
                itemsObtainedArray.push(ancientItems[itemRoll])
            }
            else if(rarityRoll > RARE_MIN_ROLL && rarityRoll <= RARE_MAX_ROLL){
                var itemRoll = Math.floor(Math.random() * rareItems.length);
                console.log(rareItems[itemRoll]);
                itemsObtainedArray.push(rareItems[itemRoll]);
            }
            else if (rarityRoll > UNCOMMON_MIN_ROLL && rarityRoll <= UNCOMMON_MAX_ROLL){
                var itemRoll = Math.floor(Math.random() * uncommonItems.length);
                console.log(uncommonItems[itemRoll]);
                itemsObtainedArray.push( uncommonItems[itemRoll] );
            }
            else {
                var itemRoll = Math.floor(Math.random() * commonItems.length);
                console.log(commonItems[itemRoll]);
                commonItems[itemRoll].itemAmount = COMMON_ITEMS_TO_OBTAIN
                itemsObtainedArray.push( commonItems[itemRoll] );
            }
        }
    }
    if (event.challenge){
        // get the challenge points
        var challengeNum = event.challenge.challenge;
        var challengePts = enemiesToEncounter.challenge[challengeNum].points;

        rewardsForPlayer.xp = rewardsForPlayer.xp + challengePts;
        rewardsForPlayer.rpgPoints = rewardsForPlayer.rpgPoints + challengePts;
    }
    // calculate finds based on luck and diff of enemies
    rewardsForPlayer.xp = rewardsForPlayer.xp + additionalExperience + numberOfMembers
    rewardsForPlayer.rpgPoints = rewardsForPlayer.rpgPoints + additionalRpgPoints + numberOfMembers;
    rewardsForPlayer.items = itemsObtainedArray
    return rewardsForPlayer;
}

function effectsOnTurnEnd(event){
    var endOfTurnString = "";
    // check buffs and statuses for each member, and enemy. if "onTurnEnd" exists then do the effect
    var currentTurn = event.turn;

    ///// Effects on turn end for members in party
    for (var member in event.membersInParty){
        if (event.membersInParty[member].statuses.indexOf("dead") == -1){
            for (var index = event.membersInParty[member].buffs.length - 1; index >= 0; index--){
                if (event.membersInParty[member].buffs.indexOf("dead") == -1){
                    // process the on turn end buff
                    if (event.membersInParty[member].buffs[index].onTurnEnd){
                        if (event.membersInParty[member].buffs[index].onTurnEnd.attackDmgPlus){
                            if (event.membersInParty[member].buffs[index].onTurnEnd.currentTurn >= event.membersInParty[member].buffs[index].onTurnEnd.startTurn
                            && (event.membersInParty[member].buffs[index].onTurnEnd.startTurn + event.membersInParty[member].buffs[index].onTurnEnd.everyNTurns + currentTurn % event.membersInParty[member].buffs[index].onTurnEnd.everyNTurns) == 0){
                                event.membersInParty[member].attackDmg = event.membersInParty[member].attackDmg + event.membersInParty[member].buffs[index].onTurnEnd.attackDmgPlus                                
                                // TODO: add to end of turn string
                            }
                        }
                    }
                }
            }
        }
    }
    
    
    // TODO: events at end of turn that belong to an enemy or member
    for (var enemy in event.enemies){
        if (event.enemies[enemy].statuses.indexOf("dead") == -1){
            if (event.enemies[enemy].endOfTurnEvents){
                // process the end of turn event
                for (var index = event.enemies[enemy].endOfTurnEvents.length - 1; index >= 0; index--){
                    if (!event.enemies[enemy].endOfTurnEvents[index].invalid){
                        // event is areawide 
                        if ( event.enemies[enemy].endOfTurnEvents[index].areawide ){
                            // TODO: create the areawide event tied to the enemy
                            
                        }

                        // event is focus
                        if ( event.enemies[enemy].endOfTurnEvents[index].name == "Focus" ){
                            // check to see that there is no focus on any party member, if there isnt, add focus to whoever has the highest hp (for now)
                            var focusing = false;
                            var maxHp = 0;
                            var maxHpIndex = 0;
                            var target = 0;
                            var targetName = "";
                            for ( var member in event.membersInParty ){
                                // check if focus is on a member
                                // check max hp of member
                                if (event.membersInParty[member].statuses.indexOf("dead") == -1 ){
                                    var memberBeingChecked = event.membersInParty[member];
                                    if (memberBeingChecked.maxhp > maxHp){
                                        maxHp = memberBeingChecked.maxhp;
                                        maxHpIndex = member;
                                        target = "rpg-" + memberBeingChecked.id
                                        targetName = memberBeingChecked.name
                                    }
                                    for (var statusToCheck in memberBeingChecked.statuses){
                                        if (memberBeingChecked.statuses[statusToCheck] && memberBeingChecked.statuses[statusToCheck].name == "Focus"){
                                            if (memberBeingChecked.statuses[statusToCheck].focusedBy == enemy){
                                                focusing = true;
                                            }
                                        }
                                    }
                                }
                            }

                            // if focusing == false then set focus to maxHpIndex
                            if (!focusing){
                                // cast focus on maxHpIndex (member)
                                var rpgAbility =  JSON.parse(JSON.stringify ( rpgAbilities[ "focus" ].status ));
                                rpgAbility.focusedBy = enemy;

                                // process ability
                                if (target == 0 ){
                                    // no valid targets left, everyone is dead TODO: figure this out later
                                }else{
                                    event.membersInParty[target].statuses.push(rpgAbility);
                                    endOfTurnString = endOfTurnString + targetName + " was affected with " + rpgAbility.name + "\n"
                                }
                            }
                        }
                        var eotEvent = event.enemies[enemy].endOfTurnEvents[index]
                        ////// Event happens every N turns, and then every N turns after that
                        if ( eotEvent.afterNTurns ){
                            var currTurn = eotEvent.currentTurn;
                            var afterNTurns = eotEvent.afterNTurns;
                            var everyNTurns = eotEvent.everyNTurns;
                            
                            // 4 - ( 4 - 3 ) % 3 == 0
                            if (currTurn >= afterNTurns && ((currTurn - (afterNTurns - everyNTurns)) % everyNTurns == 0 )){

                                //////// Event is areawide dmg
                                if ( eotEvent.areawidedmg ){
                                    // 
                                    var rpgAbility = eotEvent
                                    var damageToDeal = 1;
                                    
                                    var abilityObject = {
                                        user: event.enemies[enemy].id,
                                        ability: rpgAbility.name
                                    }
                                    var nameOfDeadMember = event.enemies[enemy].name;
                                    var ability = abilityObject.ability;
                                    var abilityCaster = abilityObject.user;
                    
                                    // deal the damage to all the users
                                    damageToDeal = calculateDamageDealt(event, abilityCaster, abilityObject.target, rpgAbility.areawidedmg)
                                    endOfTurnString = endOfTurnString + "The group suffered " + damageToDeal + " damage from " + nameOfDeadMember + "'s " + rpgAbility.name + "\n";
                                    for (var targetToDealDmg in event.membersInParty){
                                        var targetToDealDmgName = event.membersInParty[targetToDealDmg].name
                                        if (event.membersInParty[targetToDealDmg].statuses.indexOf("dead") == -1){
                                            event.membersInParty[targetToDealDmg].hp = event.membersInParty[targetToDealDmg].hp - damageToDeal;
                                            if (event.membersInParty[targetToDealDmg].hp <= 0){
                                                endOfTurnString = endOfTurnString + hasDied(event, event.membersInParty[targetToDealDmg]);
                                            }
                                        }
                                    }
                                }
                                ////// effect is a regular ability that should be processed as an ability
                                else if (event.enemies[enemy].endOfTurnEvents[index].processAbility){

                                    var abilityPicked = event.enemies[enemy].endOfTurnEvents[index].abilityId
                                    var untargettable = event.enemies[enemy].endOfTurnEvents[index].status ? event.enemies[enemy].endOfTurnEvents[index].status.untargettable : undefined;
                                    // get the rpgAbility from lib
                                    var rpgAbility = rpgAbilities[abilityPicked] ? JSON.parse(JSON.stringify(rpgAbilities[abilityPicked])) : undefined; 

                                    var validTarget = false;
                                    var stuckCount = 0
                                    var target;
                                    while(!validTarget && stuckCount < 100){
                                        var targetRoll = Math.floor(Math.random() * event.members.length);
                                        var targetMember = event.members[targetRoll].id;
                                        var targetFocusedMember = true;
                                        var targettingFocusedMember = false;
                                        if (stuckCount < 5){
                                            for (var member in event.members){
                                                // TODO: IGNORE FOCUS EFFECT
                                                var idOfMemberBeingChecked = "rpg-" + event.members[member].id;
                                                for (var statusToCheck in event.membersInParty[idOfMemberBeingChecked].statuses){
                                                    if (rpgAbility && rpgAbility.ignoreFocus){
                                                        console.log("ignoring focus for ability")
                                                        targettingFocusedMember = true;
                                                    }else{
                                                        // check if someone has focus on them if they do then the target should be the focused person 
                                                        if ( event.membersInParty[idOfMemberBeingChecked].statuses[statusToCheck].name == "Focus"
                                                            && event.membersInParty[idOfMemberBeingChecked].statuses[statusToCheck].focusedBy == enemy){
                                                            //target roll should be 
                                                            targetMember = event.members[member].id;
                                                            break;
                                                        }
                                                    }
                                                    
                                                }
                                            }
                                        }
                                        
                                        if (event.membersInParty["rpg-"+targetMember].statuses.indexOf("dead") == -1){
                                            // valid target
                                            if (untargettable && !targettingFocusedMember){
                                                // check that no status contains the id of the ability which the player
                                                // cannot be targetted by
                                                target = "rpg-"+targetMember;
                                                validTarget = true;
                                                for ( var s in event.membersInParty["rpg-"+targetMember].statuses ){
                                                    var statusToCheck = event.membersInParty["rpg-"+targetMember].statuses[s];
                                                    if ( statusToCheck.abilityId == abilityPicked ){
                                                        validTarget = false;
                                                        target = undefined;
                                                    }
                                                }
                                                console.log(stuckCount)

                                            }else{
                                                if (!targettingFocusedMember){
                                                    target = "rpg-"+targetMember;
                                                    validTarget = true;
                                                    console.log("stuck count" + stuckCount)
                                                }
                                            }
                                            
                                        }
                                        stuckCount++;
                                    }

                                    var abilityToProcess = {
                                        user: enemy,
                                        ability: abilityPicked,
                                        target: target
                                    }
                                    if (abilityToProcess.target != undefined){
                                        endOfTurnString = endOfTurnString  + processAbility(abilityToProcess, event);                                        
                                    }
                                }
                                //////// effect is a summoning
                                else if( event.enemies[enemy].endOfTurnEvents[index].summon ){

                                    endOfTurnString = endOfTurnString + summonEnemy(event, enemy, index);
                                }
                            }
                            eotEvent.currentTurn++;
                        }
                        ////// Event is enemy under certain hp %
                        if ( event.enemies[enemy].endOfTurnEvents[index].hppercentage ){
                            var enemyHpInPercentage = event.enemies[enemy].hp / event.enemies[enemy].maxhp;
                            if ( event.enemies[enemy].endOfTurnEvents[index].summon
                                && enemyHpInPercentage < event.enemies[enemy].endOfTurnEvents[index].hppercentage){
                                
                                var averageLevelInParty = event.averageLevelInParty;
                                var nameOfSummon = event.enemies[enemy].endOfTurnEvents[index].summon.enemy;
                                // TODO: get the + ad and + MD
                                var enemyFound = JSON.parse(JSON.stringify(  enemiesToEncounter.summoned[nameOfSummon]));
                                var enemyIdCount = event.enemiesCount + 1;
                                var enemyCount = event.enemiesCount;
                                var enemySummoned = {
                                    id: enemyIdCount,
                                    name: enemyFound.name,
                                    hp: enemyFound.hp + (21 * averageLevelInParty) + (enemyFound.hpPerPartyMember * enemyCount), 
                                    attackDmg: enemyFound.attackDmg + (10 * averageLevelInParty) + (enemyFound.adPerPartyMember * enemyCount), 
                                    magicDmg: enemyFound.magicDmg + (10 * averageLevelInParty) + (enemyFound.mdPerPartyMember * enemyCount),
                                    armor: enemyFound.armor + (averageLevelInParty * averageLevelInParty),
                                    spirit: enemyFound.spirit + ( averageLevelInParty * averageLevelInParty),
                                    statuses: [],
                                    endOfTurnEvents: [],
                                    statBuffs: {
                                        hp: 0,
                                        attackDmg: 0,
                                        magicDmg: 0,
                                        armor: 0,
                                        spirit: 0,
                                        maxhp: 0
                                    },
                                    buffs: enemyFound.buffs,
                                    difficulty: enemyFound.difficulty,
                                    abilities: enemyFound.abilities,
                                    effectsOnDeath: enemyFound.effectsOnDeath,
                                    abilitiesMap : {},
                                    element: enemyFound.element
                                }

                                for( var ability in enemySummoned.abilities){
                                    var abilityName = enemySummoned.abilities[ability]
                                    if (rpgAbilities[abilityName] && rpgAbilities[abilityName].passive){
                                        // add it as a buff and a passive ability
                                        var passiveAbilityBuff = JSON.parse(JSON.stringify( rpgAbilities[abilityName].buff ));
                                        enemySummoned.buffs.push(passiveAbilityBuff);
                                        enemySummoned.passiveAbilities.push(passiveAbilityBuff);
                                        enemySummoned.abilitiesMap[passiveAbilityBuff.name] = passiveAbilityBuff;
                                    }
                                    else if (rpgAbilities[abilityName]){
                                        var playerAbility = JSON.parse(JSON.stringify( abilityName ));
                                        var playerAbilityObject = JSON.parse(JSON.stringify( rpgAbilities[ abilityName ] ));
                                        enemySummoned.abilitiesMap[playerAbility] = playerAbilityObject;       
                                    }
                                    else{
                                        message.channel.send("enemy has an ability that doesnt exist!")
                                    }
                                }
                                for (var eventAtEndOfTurn in enemyFound.endOfTurnEvents){
                                    var endOfTurnEventName =  enemyFound.endOfTurnEvents[ eventAtEndOfTurn ]
                                    if (rpgAbilities[ endOfTurnEventName ]){
                                        var eventToPush = JSON.parse(JSON.stringify( rpgAbilities[ endOfTurnEventName ] ));
                                        if ( eventToPush.belongsToEvent ){
                                            activeRPGEvents[rpgEvent].endOfTurnEvents.push( eventToPush );
                                        }else if ( eventToPush.belongsToMember ){
                                            enemySummoned.endOfTurnEvents.push( eventToPush );
                                        }
                                    }
                                }

                                enemySummoned.maxhp = enemySummoned.hp;
                                enemyIdCount++;
                                // add the enemy to the list
                                event.enemiesCount++;
                                event.enemies[enemySummoned.id] = enemySummoned;
                                // make the event invalid so it doesnt happen anymore
                                // or else it would happen every turn afterwards
                                event.enemies[enemy].endOfTurnEvents[index].invalid = true;
                                endOfTurnString = endOfTurnString + enemySummoned.name + " has been summoned\n"
                            }
                            // do stuff
                        }

                        /////// event happens at certain event turn
                        if ( event.enemies[enemy].endOfTurnEvents[index].turnbased 
                            &&  event.enemies[enemy].endOfTurnEvents[index].turnbased % event.turn == 0){
                            if ( event.enemies[enemy].endOfTurnEvents[index].summon ){

                            }
                        }
                    }
                }
            }
        }
    }
    ////// Events on end of turn for enemies
    for (var enemy in event.enemies){
        if (event.enemies[enemy].statuses.indexOf("dead") == -1){
            for (var index = event.enemies[enemy].buffs.length - 1; index >= 0; index--){
                if (event.enemies[enemy].buffs.indexOf("dead") == -1){
                    // process the on turn end buff
                    if (event.enemies[enemy].buffs[index].onTurnEnd){
                        
                        if (event.enemies[enemy].buffs[index].onTurnEnd.attackDmgPlus){
                            if (currentTurn >= event.enemies[enemy].buffs[index].onTurnEnd.startTurn
                            && (event.enemies[enemy].buffs[index].onTurnEnd.startTurn + event.enemies[enemy].buffs[index].onTurnEnd.everyNTurns + currentTurn) % event.enemies[enemy].buffs[index].onTurnEnd.everyNTurns == 0){
                                event.enemies[enemy].attackDmg = event.enemies[enemy].attackDmg + event.enemies[enemy].buffs[index].onTurnEnd.attackDmgPlus
                                endOfTurnString = endOfTurnString + event.enemies[enemy].name + 
                                " +" + event.enemies[enemy].buffs[index].onTurnEnd.attackDmgPlus + " 🗡 " +
                                " from " + event.enemies[enemy].buffs[index].name + " \n"
                            }
                        }

                        if (event.enemies[enemy].buffs[index].onTurnEnd.magicDmgPlus){
                            if (currentTurn >= event.enemies[enemy].buffs[index].onTurnEnd.startTurn
                            && (event.enemies[enemy].buffs[index].onTurnEnd.startTurn + event.enemies[enemy].buffs[index].onTurnEnd.everyNTurns + currentTurn) % event.enemies[enemy].buffs[index].onTurnEnd.everyNTurns  == 0){
                                event.enemies[enemy].magicDmg = event.enemies[enemy].magicDmg + event.enemies[enemy].buffs[index].onTurnEnd.magicDmgPlus
                                endOfTurnString = endOfTurnString + event.enemies[enemy].name + 
                                " +" + event.enemies[enemy].buffs[index].onTurnEnd.magicDmgPlus + " ☄️ " +
                                " from " + event.enemies[enemy].buffs[index].name + " \n"
                            }
                        }
                    }
                }
            }
        }
    }

    // TODO: end of turn event that belongs to the rpg event
    if (event.endOfTurnEvents){
        // there is an event that happens at the end of the turn
        for (var index in event.endOfTurnEvents){

            ////// Event is an aoe aura dmg
            if (event.endOfTurnEvents[index].dmgaura){
                var ability = event.endOfTurnEvents[index].abilityId;
                var nameOfEndOfTurnAbility = event.endOfTurnEvents[index].name;
                // check that the event should be done this turn
                var rpgAbility = rpgAbilities[ability] ? JSON.parse(JSON.stringify(rpgAbilities[ability])) : undefined;                
                var damageToDeal = 1;
                
                var abilityObject = {
                    user: 0, // aura
                    ability: event.endOfTurnEvents[index].name
                }
                var abilityCaster = abilityObject.user;
                var rpgAbility = rpgAbilities[ability] ? JSON.parse(JSON.stringify(rpgAbilities[ability])) : undefined;
                if (rpgAbility && rpgAbility.areawidedmg && rpgAbility.areawidedmg.dmgPerTurn){
                    rpgAbility.areawidedmg.dmg = rpgAbility.areawidedmg.dmg + rpgAbility.areawidedmg.dmgPerTurn * event.turn
                }
                if (rpgAbility && rpgAbility.areawidedmg && (event.turn % rpgAbility.areawidedmg.hitsEveryNTurn  == 0)){
                    // deal the damage to all the users
                    damageToDeal = calculateDamageDealt(event, abilityCaster, abilityObject.target, rpgAbility.areawidedmg)
                    endOfTurnString = endOfTurnString + "The group suffered " + damageToDeal + " damage from " + nameOfEndOfTurnAbility +"\n"
                    for (var targetToDealDmg in event.membersInParty){
                        var targetToDealDmgName = event.membersInParty[targetToDealDmg].name
                        if (event.membersInParty[targetToDealDmg].statuses.indexOf("dead") == -1){
                            event.membersInParty[targetToDealDmg].hp = event.membersInParty[targetToDealDmg].hp - damageToDeal;
                            if (event.membersInParty[targetToDealDmg].hp <= 0){
                                endOfTurnString = endOfTurnString + hasDied(event, event.membersInParty[targetToDealDmg]);
                            }
                        }
                    }
                }
            }
            // event is focus

            // event is an aoe aura heal

            // event is a check of HP percentage for members

            // event is a loss of max HP

            // event is an aoe drain

            // event is a change in focus

            // event is a check on how long someone has been dead

            // event is a summononing of a new enemy

            // event is a cast of a status
        }
    }

    return endOfTurnString;
}

function summonEnemy(event, enemy, index){
    // summoning plus ad, md, armor, spirit
    var summoningAdPlus = event.enemies[enemy].endOfTurnEvents[index].summon.attackDmg || 0;
    var summoningMdPlus = event.enemies[enemy].endOfTurnEvents[index].summon.magicDmg || 0;
    
    var averageLevelInParty = event.averageLevelInParty;
    var nameOfSummon = event.enemies[enemy].endOfTurnEvents[index].summon.enemy;
    var enemyFound = JSON.parse(JSON.stringify(  enemiesToEncounter.summoned[nameOfSummon]));
    var enemyIdCount = event.enemiesCount + 1;
    var enemyCount = event.enemiesCount;
    var enemySummoned = {
        id: enemyIdCount,
        name: enemyFound.name,
        hp: enemyFound.hp + (21 * averageLevelInParty) + (enemyFound.hpPerPartyMember * enemyCount), 
        attackDmg: enemyFound.attackDmg + (10 * averageLevelInParty) + (enemyFound.adPerPartyMember * enemyCount) + summoningAdPlus, 
        magicDmg: enemyFound.magicDmg + (10 * averageLevelInParty) + (enemyFound.mdPerPartyMember * enemyCount) + summoningMdPlus,
        armor: enemyFound.armor + (averageLevelInParty * averageLevelInParty),
        spirit: enemyFound.spirit + ( averageLevelInParty * averageLevelInParty),
        statuses: [],
        endOfTurnEvents: [],
        statBuffs: {
            hp: 0,
            attackDmg: 0,
            magicDmg: 0,
            armor: 0,
            spirit: 0,
            maxhp: 0
        },
        buffs: enemyFound.buffs,
        difficulty: enemyFound.difficulty,
        abilities: enemyFound.abilities,
        effectsOnDeath: enemyFound.effectsOnDeath,
        abilitiesMap : {},
        element: enemyFound.element
    }

    for( var ability in enemySummoned.abilities){
        var abilityName = enemySummoned.abilities[ability]
        if (rpgAbilities[abilityName] && rpgAbilities[abilityName].passive){
            // add it as a buff and a passive ability
            var passiveAbilityBuff = JSON.parse(JSON.stringify( rpgAbilities[abilityName].buff ));
            enemySummoned.buffs.push(passiveAbilityBuff);
            enemySummoned.passiveAbilities.push(passiveAbilityBuff);
            enemySummoned.abilitiesMap[passiveAbilityBuff.name] = passiveAbilityBuff;
        }
        else if (rpgAbilities[abilityName]){
            var playerAbility = JSON.parse(JSON.stringify( abilityName ));
            var playerAbilityObject = JSON.parse(JSON.stringify( rpgAbilities[ abilityName ] ));
            enemySummoned.abilitiesMap[playerAbility] = playerAbilityObject;       
        }
        else{
            // message.channel.send("enemy has an ability that doesnt exist!")
        }
    }
    for (var eventAtEndOfTurn in enemyFound.endOfTurnEvents){
        var endOfTurnEventName =  enemyFound.endOfTurnEvents[ eventAtEndOfTurn ]
        if (rpgAbilities[ endOfTurnEventName ]){
            var eventToPush = JSON.parse(JSON.stringify( rpgAbilities[ endOfTurnEventName ] ));
            if ( eventToPush.belongsToEvent ){
                activeRPGEvents[rpgEvent].endOfTurnEvents.push( eventToPush );
            }else if ( eventToPush.belongsToMember ){
                enemySummoned.endOfTurnEvents.push( eventToPush );
            }
        }
    }

    enemySummoned.maxhp = enemySummoned.hp;
    enemyIdCount++;
    // add the enemy to the list
    event.enemiesCount++;
    event.enemies[enemySummoned.id] = enemySummoned;


    // make the event invalid so it doesnt happen anymore
    // or else it would happen every turn afterwards
    var summonString = enemySummoned.name + " has been summoned\n" 
    return summonString;
}

function effectsOnDeath(event, member){
    var onDeathString = "";
    // do effect on death
    var idOfMember = member.id
    if ( event.enemies[idOfMember] && event.enemies[idOfMember].effectsOnDeath){
        // the enemy has an effect on death, get the rpgAbility based on name
        for (var effect in event.enemies[idOfMember].effectsOnDeath){
            var rpgAbility = JSON.parse(JSON.stringify( rpgAbilities[ event.enemies[idOfMember].effectsOnDeath[effect] ] ));
            
            /////// death effect is aoe dmg
            if (rpgAbility && rpgAbility.areawidedmg){
                // process 
                var damageToDeal = 1;
                
                var abilityObject = {
                    user: event.enemies[idOfMember].id,
                    ability: rpgAbility.name
                }
                var nameOfDeadMember = event.enemies[idOfMember].name;
                var ability = abilityObject.ability;
                var abilityCaster = abilityObject.user;

                // deal the damage to all the users
                damageToDeal = calculateDamageDealt(event, abilityCaster, abilityObject.target, rpgAbility.areawidedmg)
                onDeathString = onDeathString + "The group suffered " + damageToDeal + " damage from " + nameOfDeadMember + "'s " + rpgAbility.name + "\n";
                for (var targetToDealDmg in event.membersInParty){
                    var targetToDealDmgName = event.membersInParty[targetToDealDmg].name
                    if (event.membersInParty[targetToDealDmg].statuses.indexOf("dead") == -1){
                        event.membersInParty[targetToDealDmg].hp = event.membersInParty[targetToDealDmg].hp - damageToDeal;
                        if (event.membersInParty[targetToDealDmg].hp <= 0){
                            onDeathString = onDeathString + hasDied(event, event.membersInParty[targetToDealDmg]);
                        }
                    }
                }
            }
            ///// effect gives a buff to members in party
            if (rpgAbility && rpgAbility.buff){

            }
            ////// effect heals the rest of the enemies
            if (rpgAbility && rpgAbility.heal && rpgAbility.areawide){

                var rpgAbility = JSON.parse(JSON.stringify( rpgAbilities[ event.enemies[idOfMember].effectsOnDeath[effect] ] ));
                
                var abilityObject = {
                    user: event.enemies[idOfMember].id,
                    ability: rpgAbility.name
                }
                var ability = abilityObject.ability;
                var abilityCaster = abilityObject.user;

                var caster = event.enemies[abilityCaster] ? event.enemies[abilityCaster].name : undefined;
                
                var hpToHeal = calculateHealingDone(event, abilityCaster, abilityObject.target, rpgAbility);

                onDeathString = onDeathString + caster +  " healed the group for " + hpToHeal + " with " + ability + "\n";                
                for (var targetToHeal in event.enemies){
                    if (event.enemies[targetToHeal].hp > 0
                    && event.enemies[targetToHeal].statuses.indexOf("dead") == -1
                    && event.enemies[targetToHeal].difficulty == "boss"){
                        event.enemies[targetToHeal].hp = event.enemies[targetToHeal].hp + hpToHeal;
                        if (event.enemies[targetToHeal].hp > event.enemies[targetToHeal].maxhp){
                            event.enemies[targetToHeal].hp = event.enemies[targetToHeal].maxhp
                        }
                    }
                }
            }
            //////// Effect is transfer of abilities from dead boss to living bosses
            if (rpgAbility && rpgAbility.transfer){
                // transfer endOfTurnAbilities to living bosses
                // empower other enemies abilities before transfering current
                var bossesAlive = [];
                // go through each enemy and improve their current EOT abilities
                for (var enemy in event.enemies){
                    if (event.enemies[enemy].hp > 0
                        && event.enemies[enemy].statuses.indexOf("dead") == -1){
                        // empower their EOT abilities
                        if (event.enemies[enemy].difficulty == "boss"){
                            onDeathString = onDeathString + event.enemies[enemy].name + " has grown stronger\n";
                            bossesAlive.push(
                                {
                                    name: event.enemies[enemy].name,
                                    enemyNumber: enemy
                                }
                            );
                        }
                        event.enemies[enemy].endOfTurnEvents.forEach(function(eotEffect){
                            // improve the effect
                            var rpgAbility = eotEffect;
                            if (rpgAbility.name == "Summon Demon"){
                                rpgAbility.summon.attackDmg = rpgAbility.summon.attackDmg * 2;
                                rpgAbility.summon.magicDmg = rpgAbility.summon.magicDmg * 2;
                                rpgAbility.everyNTurns = rpgAbility.everyNTurns - 1;
                            }else if (rpgAbility.name == "Electric Orb"){
                                rpgAbility.dmg = rpgAbility.dmg * 2;
                                rpgAbility.status.dmgOnExpire = rpgAbility.status.dmgOnExpire * 2;
                                rpgAbility.everyNTurns = rpgAbility.everyNTurns - 1;
                            }else if (rpgAbility.name == "Tremor"){
                                rpgAbility.areawidedmg.dmg = rpgAbility.areawidedmg.dmg * 2;
                                rpgAbility.everyNTurns = rpgAbility.everyNTurns - 1;
                            }
                        })
                    }
                }

                if (bossesAlive.length == 1){
                    onDeathString = onDeathString + bossesAlive[0].name + " Gains Unimaginable Power\n";
                    // give the enemy + 400 magic and attack
                    var enemy = bossesAlive[0].enemyNumber;
                    event.enemies[enemy].attackDmg = event.enemies[enemy].attackDmg + 400;
                    event.enemies[enemy].magicDmg = event.enemies[enemy].magicDmg + 400;                
                }

                // array of end of turn abilities
                var deadUnitEOTAbilities = event.enemies[idOfMember].endOfTurnEvents;
                // check that the units receiving the effects, do not already have them and are not dead
                for (var targetToTransfer in event.enemies){
                    if (event.enemies[targetToTransfer].hp > 0
                        && event.enemies[targetToTransfer].statuses.indexOf("dead") == -1
                        && event.enemies[targetToTransfer].difficulty == "boss"){
                        // check the current enemy and see if it doesnt have the ability to be pushed
                        deadUnitEOTAbilities.forEach( function(eotAbility){
                            var eotexists = false;
                            event.enemies[targetToTransfer].endOfTurnEvents.forEach(function(eotA){
                                // see if it already exists
                                if ( eotA.name == eotAbility.name){
                                    eotexists = true;
                                }
                            })
                            if ( !eotexists ){
                                var copyOfeotAbility = JSON.parse( JSON.stringify( eotAbility ) );
                                event.enemies[targetToTransfer].endOfTurnEvents.push( copyOfeotAbility );
                            }
                        })
                    }
                }
            }
        }
    }
    return onDeathString;
}

function hasDied(event, member){
    // player is dead, remove all statuses, add dead
    if (member.hp <= 0 && (member.statuses.indexOf("dead") == -1)){
        var deathString = member.name + " has died. :skull_crossbones: \n";
        member.hp = 0;
        // TODO: if the user has a dmgondotremove dot then the dot should deal its damage to all the member's party
        for (var status in member.statuses){
            try{
                if (member.statuses[status].dot
                    && member.statuses[status].dot.dmgOnDotRemove){
                    // deal the dmg on dot remove to everyone

                    var nameOfEndOfTurnAbility = member.statuses[status].dot.name;
                    
                    var damageToDeal = 1;
                    
                    var abilityObject = {
                        ability: member.statuses[status].dot
                    }

                    // remove the dot first to avoid callstack size exceed
                    member.statuses.splice(status, 1);

                    abilityObject.ability.dmg = abilityObject.ability.dmgOnRemove
                    abilityObject.ability.mdPercentage = abilityObject.ability.mdPercentageOnRemove;
                    abilityObject.ability.areawide = true;
                    var abilityCaster = abilityObject.ability.caster;
                    delete abilityObject.ability.turnsToExpire

                    var damageToDeal = calculateDamageDealt(event, abilityCaster, abilityObject.target, abilityObject.ability)
                    deathString = deathString + "The group suffered " + damageToDeal + " damage from " + nameOfEndOfTurnAbility +"\n"
                    for (var targetToDealDmg in event.membersInParty){
                        var targetToDealDmgName = event.membersInParty[targetToDealDmg].name
                        if (event.membersInParty[targetToDealDmg].statuses.indexOf("dead") == -1){
                            event.membersInParty[targetToDealDmg].hp = event.membersInParty[targetToDealDmg].hp - damageToDeal;
                            if (event.membersInParty[targetToDealDmg].hp <= 0){
                                deathString = deathString + hasDied(event, event.membersInParty[targetToDealDmg]);
                            }
                        }
                    }
                }
            }catch(err){
                break;
            }
        }

        member.statuses = [];
        member.statuses.push("dead");
        member.buffs = [];
        deathString = deathString + effectsOnDeath(event, member)
        return deathString;
    }else{
        member.hp = 0;
        member.statuses = [];
        member.statuses.push("dead");
        member.buffs = [];
        return "";
    }
    
}

function hasRevived(member, deadIndex, hpPercentageToReviveAt){
    member.statuses.splice(deadIndex, 1)
    // set their hp to 40%
    if (hpPercentageToReviveAt){
        member.hp = Math.floor(member.maxhp * hpPercentageToReviveAt);
    }else{
        member.hp = Math.floor(member.maxhp * 0.5);
    }
    // reset their buffs
    member.buffs = []
    if (member.passiveAbilities){
        for (var passive in member.passiveAbilities){
            member.buffs.push(member.passiveAbilities[passive])
        }
    }
}

function processPassiveEffects(event){
    var passiveEffectsString = "";
    

    // reset cooldowns
    for(var member in event.membersInParty){
        for ( var ability in event.membersInParty[member].abilitiesMap ){
            // ability has a cooldown count
            if ( event.membersInParty[member].abilitiesMap[ability].maxcooldown
                &&  event.membersInParty[member].abilitiesMap[ability].cooldown > 0){
                    // lower the cooldown count by 1
                    event.membersInParty[member].abilitiesMap[ability].cooldown = event.membersInParty[member].abilitiesMap[ability].cooldown - 1;
            }
        }
    }

    // process dots, effects individually
    // go through each member
    for(var member in event.membersInParty){
        
        if (event.membersInParty[member].statuses.indexOf("dead") == -1){
            for (var index = event.membersInParty[member].statuses.length - 1; index >= 0; index--){
                // go through each status
                if (event.membersInParty[member].statuses.indexOf("dead") == -1){
                    // if it is a dot, then process the damage of the dot
                    if (event.membersInParty[member].statuses[index].dot){
                        // process the dot
                        var damageToDealToPlayer = calculateDamageDealt(event, event.membersInParty[member].statuses[index].dot.caster, member, event.membersInParty[member].statuses[index].dot)
                        event.membersInParty[member].hp = event.membersInParty[member].hp - damageToDealToPlayer;
                        passiveEffectsString = passiveEffectsString + event.membersInParty[member].name + " took " + damageToDealToPlayer + " damage from " + event.membersInParty[member].statuses[index].dot.name + "\n"
                        if (event.membersInParty[member].hp <= 0){
                            // player is dead, remove all statuses, add dead
                            passiveEffectsString = passiveEffectsString + hasDied(event, event.membersInParty[member]);
                            break;
                        }
                        // remove dot after processing
                        if (event.membersInParty[member].statuses[index].dot.expireOnTurn == event.turn){
                            if (event.membersInParty[member].statuses[index].dot.dmgOnDotExpire){
                                event.membersInParty[member].statuses[index].dot.dmg = event.membersInParty[member].statuses[index].dot.dmgOnExpire;
                                delete event.membersInParty[member].statuses[index].dot.turnsToExpire
                                var damageToDealToPlayer = calculateDamageDealt(event, event.membersInParty[member].statuses[index].dot.caster, member, event.membersInParty[member].statuses[index].dot)
                                event.membersInParty[member].hp = event.membersInParty[member].hp - damageToDealToPlayer;
                                passiveEffectsString = passiveEffectsString + event.membersInParty[member].name + " took " + damageToDealToPlayer + " damage from " + event.membersInParty[member].statuses[index].dot.name + "\n"
                                if (event.membersInParty[member].hp <= 0){
                                    // player is dead, remove all statuses, add dead
                                    passiveEffectsString = passiveEffectsString + hasDied(event, event.membersInParty[member]);
                                    break;
                                }
                            }
                            event.membersInParty[member].statuses.splice(index, 1);
                            continue;
                        }
                    }

                    /// status is expiring
                    if (event.membersInParty[member].statuses[index].status){

                        if (event.membersInParty[member].statuses[index].expireOnTurn == event.turn){
                            // remove the status if it is the turn to expire on
                            if (event.membersInParty[member].statuses[index].dmgOnStatusExpire){
                                event.membersInParty[member].statuses[index].dmg = event.membersInParty[member].statuses[index].dmgOnExpire;
                                delete event.membersInParty[member].statuses[index].turnsToExpire
                                var damageToDealToPlayer = calculateDamageDealt(event, event.membersInParty[member].statuses[index].caster, member, event.membersInParty[member].statuses[index])
                                event.membersInParty[member].hp = event.membersInParty[member].hp - damageToDealToPlayer;
                                passiveEffectsString = passiveEffectsString + event.membersInParty[member].name + " took " + damageToDealToPlayer + " damage from " + event.membersInParty[member].statuses[index].name + "\n"
                                if (event.membersInParty[member].hp <= 0){
                                    // player is dead, remove all statuses, add dead
                                    passiveEffectsString = passiveEffectsString + hasDied(event, event.membersInParty[member]);
                                    break;
                                }
                            }
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
        if (event.membersInParty[member].statuses.indexOf("dead") == -1){
            for (var index = event.membersInParty[member].buffs.length - 1; index >= 0; index--){
                // go through each status
                if (event.membersInParty[member].statuses.indexOf("dead") == -1){
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
    // reset cooldowns
    for(var enemy in event.enemies){
        for ( var ability in event.enemies[enemy].abilitiesMap ){
            // ability has a cooldown count
            if ( event.enemies[enemy].abilitiesMap[ability].maxcooldown
                &&  event.enemies[enemy].abilitiesMap[ability].cooldown > 0){
                    // lower the cooldown count by 1
                    event.enemies[enemy].abilitiesMap[ability].cooldown = event.enemies[enemy].abilitiesMap[ability].cooldown - 1;
            }
        }
    }
    // go through each enemy
    for(var enemy in event.enemies){
        if (event.enemies[enemy].statuses.indexOf("dead") == -1){
            for (var index = event.enemies[enemy].statuses.length - 1; index >= 0; index--){
                // go through each status
                if (event.enemies[enemy].statuses.indexOf("dead") == -1){
                    // if it is a dot, then process the damage of the dot
                    if (event.enemies[enemy].statuses[index].dot){
                        // process the dot
                        var damageToDealToPlayer = calculateDamageDealt(event, event.enemies[enemy].statuses[index].dot.caster, enemy, event.enemies[enemy].statuses[index].dot)
                        event.enemies[enemy].hp = event.enemies[enemy].hp - damageToDealToPlayer;
                        passiveEffectsString = passiveEffectsString + event.enemies[enemy].name + " took " + damageToDealToPlayer + " damage from " + event.enemies[enemy].statuses[index].dot.name + "\n"
                        
                        if (event.enemies[enemy].hp <= 0){
                            passiveEffectsString = passiveEffectsString + hasDied(event, event.enemies[enemy]);
                            break;
                        }
                        // remove dot after processing
                        if (event.enemies[enemy].statuses[index].dot.expireOnTurn == event.turn){
                            if (event.enemies[enemy].statuses[index].dot.dmgOnDotExpire){
                                event.enemies[enemy].statuses[index].dot.dmg = event.enemies[enemy].statuses[index].dot.dmgOnExpire;
                                var damageToDealToPlayer = calculateDamageDealt(event, event.enemies[enemy].statuses[index].dot.caster, enemy, event.enemies[enemy].statuses[index].dot)
                                event.enemies[enemy].hp = event.enemies[enemy].hp - damageToDealToPlayer;
                                passiveEffectsString = passiveEffectsString + event.enemies[enemy].name + " took " + damageToDealToPlayer + " damage from " + event.enemies[enemy].statuses[index].dot.name + "\n"
                                
                                if (event.enemies[enemy].hp <= 0){
                                    passiveEffectsString = passiveEffectsString + hasDied(event, event.enemies[enemy]);
                                    break;
                                }                                  
                            }
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
        if (event.enemies[enemy].statuses.indexOf("dead") == -1){
            for (var index = event.enemies[enemy].buffs.length - 1; index >= 0; index--){
                // go through each status
                if (event.enemies[enemy].statuses.indexOf("dead") == -1){
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

function additionalDamageAD(rpgAbility, userStats, damageToIncrease, baseDamage){
    if (rpgAbility && rpgAbility.turnsToExpire){
        damageToIncrease = damageToIncrease + ((userStats.attackDmg + userStats.statBuffs.attackDmg) * rpgAbility.adPercentage);
        baseDamage = baseDamage + ( damageToIncrease / rpgAbility.turnsToExpire )
    }else{
        if (rpgAbility.areawide){
            damageToIncrease = damageToIncrease + ((userStats.attackDmg + userStats.statBuffs.attackDmg) * rpgAbility.adPercentage);
            baseDamage = baseDamage + damageToIncrease
        }else if (rpgAbility.endOfTurnAura){
            baseDamage = baseDamage;
        }
        else{
            damageToIncrease = damageToIncrease + ((userStats.attackDmg + userStats.statBuffs.attackDmg) * rpgAbility.adPercentage);
            baseDamage = baseDamage + damageToIncrease
        }
    }
    return Math.floor(baseDamage);
}
function additionalDamageMD(rpgAbility, userStats, damageToIncrease, baseDamage){
    if (rpgAbility && rpgAbility.turnsToExpire){
        damageToIncrease = damageToIncrease + ((userStats.magicDmg + userStats.statBuffs.magicDmg) * rpgAbility.mdPercentage);
        baseDamage = baseDamage + ( damageToIncrease / rpgAbility.turnsToExpire )
    }else{
        if (rpgAbility.areawide){
            damageToIncrease = damageToIncrease + ((userStats.magicDmg + userStats.statBuffs.magicDmg) * rpgAbility.mdPercentage);
            baseDamage = baseDamage + damageToIncrease
        }else if (rpgAbility.endOfTurnAura){
            baseDamage = baseDamage;
        }else{
            damageToIncrease = damageToIncrease + ((userStats.magicDmg + userStats.statBuffs.magicDmg) * rpgAbility.mdPercentage);
            baseDamage = baseDamage + damageToIncrease
        }
    }
    return Math.floor(baseDamage)
}

function getDamageToReduceFromArmor( rpgAbility, event, targetStats, damageToReduce, target ){
    if (rpgAbility.areawide || rpgAbility.endOfTurnAura){
        // get the average armor of membersInPary
        var totalArmor = 0;
        var numberOfMembers = 0;
        var checkGroupArmor;
        if (target == "party"){
            checkGroupArmor = event.membersInParty
        }else if (target == "enemy"){
            checkGroupArmor = event.enemies
        }
        for (var member in checkGroupArmor){
            numberOfMembers++;
            totalArmor = totalArmor + (checkGroupArmor[member].armor + checkGroupArmor[member].statBuffs.armor);
        }
        var averageArmor = totalArmor / numberOfMembers;
        damageToReduce = calculateDamageReduced( averageArmor );
    }
    else{
        if (rpgAbility && rpgAbility.turnsToExpire){
            damageToReduce = calculateDamageReduced( targetStats.armor + targetStats.statBuffs.armor )
        }else{
            damageToReduce = calculateDamageReduced( targetStats.armor + targetStats.statBuffs.armor )
        }
    }
    return damageToReduce;
}

function getDamageToReduceFromSpirit( rpgAbility, event, targetStats, damageToReduce, target ){
    if (rpgAbility.areawide || rpgAbility.endOfTurnAura){
        // get the average spirit of membersInParty
        var totalSpirit = 0;
        var numberOfMembers = 0;
        var checkGroupArmor;
        if (target == "party"){
            checkGroupArmor = event.membersInParty
        }else if (target == "enemy"){
            checkGroupArmor = event.enemies
        }
        for (var member in checkGroupArmor){
            numberOfMembers++;
            totalSpirit = totalSpirit + (checkGroupArmor[member].spirit + checkGroupArmor[member].statBuffs.spirit);
        }
        var averageSpirit = totalSpirit / numberOfMembers;
        damageToReduce = calculateDamageReduced( averageSpirit );
    }
    else{
        if (rpgAbility && rpgAbility.turnsToExpire){
            damageToReduce = calculateDamageReduced( targetStats.spirit + targetStats.statBuffs.spirit )
        }
        else{
            damageToReduce = calculateDamageReduced( targetStats.spirit + targetStats.statBuffs.spirit )
        }
    }
    return damageToReduce;
}

function calculateDamageReduced(statUsedToReduce){
    // formula = 100 / ((65 * 60 - 1716) / ARMOR + 1) OR 100 / ((45 * 60 - 1716.5) / SPIRIT + 1)

    // statUsedToReduce could be armor or spirit
    var formula = 100 / ((65 * 60 - 1716) / statUsedToReduce + 1)
    formula = formula * 0.01
    return formula;

    // gain armor squared by level
    // rares give 75, 125, 250 armor average, ancients 150, 300, 450 armor average, artifacts 600
    // 200 base + 10 HP * level
    // AD + MD 50 base + 5 per level ?
}

function calculateDamageDealt(event, caster, target, rpgAbility){
    // damage dealt to user, or damage dealt by dot
    // check the ability is cast by a member of party or enemy and get their stats
    var baseDamage = rpgAbility.dmg;
    var abilityType = rpgAbility.type;
    var areaWideAbility = rpgAbility.areawide;
    var endOfTurnAura = rpgAbility.endOfTurnAura;

    if (caster <= 1000){
        // the caster is an enemy
        var checkTarget = event.membersInParty[target];
        
        if (checkTarget || areaWideAbility || endOfTurnAura){
            // the target is a user
            var userStats = event.enemies[caster];
            var targetStats = event.membersInParty[target];
            // add damage 
            if (abilityType == "physical"){
                // use attack damage
                var damageToIncrease = 0
                baseDamage = additionalDamageAD(rpgAbility, userStats, damageToIncrease, baseDamage);
                // reduce damage from armor
                var damageToReduce = getDamageToReduceFromArmor(rpgAbility, event, targetStats, 0, "party");

                if (damageToReduce > 0.75){
                    damageToReduce = 0.75
                }else{
                    baseDamage = baseDamage * (1 - damageToReduce);
                }
                // additional RNG
                var rngDmgRoll = Math.floor(Math.random() * Math.floor(baseDamage * 0.07)) + 1;
                baseDamage = baseDamage  + rngDmgRoll;
            }else{
                // use magic damage
                var damageToIncrease = 0
                baseDamage = additionalDamageMD(rpgAbility, userStats, damageToIncrease, baseDamage);
                // reduce damage from spirit
                var damageToReduce = getDamageToReduceFromSpirit(rpgAbility, event, targetStats, 0, "party");
                
                if (damageToReduce > 0.75){
                    damageToReduce = 0.75
                }
                baseDamage = baseDamage * (1 - damageToReduce);
                
                // additional RNG
                var rngDmgRoll = Math.floor(Math.random() * Math.floor(baseDamage * 0.07)) + 1;
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
                    baseDamage = additionalDamageAD(rpgAbility, userStats, damageToIncrease, baseDamage);
                    // reduce damage from armor
                    var damageToReduce = getDamageToReduceFromArmor(rpgAbility, event, targetStats, 0, "enemy");

                    if (damageToReduce > 0.75){
                        damageToReduce = 0.75
                    }
                    baseDamage = baseDamage * ( 1 - damageToReduce );
                    
                    // additional RNG
                    var rngDmgRoll = Math.floor(Math.random() * Math.floor(baseDamage * 0.07)) + 1;
                    baseDamage = baseDamage  + rngDmgRoll;
                }else{
                    // use magic damage
                    var damageToIncrease = 0
                    baseDamage = additionalDamageMD(rpgAbility, userStats, damageToIncrease, baseDamage);                    
                    // now reduce damage from spirit
                    var damageToReduce = getDamageToReduceFromSpirit(rpgAbility, event, targetStats, 0, "enemy");                    
                    
                    if (damageToReduce > 0.75){
                        damageToReduce = 0.75
                    }
                    baseDamage = baseDamage * ( 1 - damageToReduce );
                    
                    // additional RNG
                    var rngDmgRoll = Math.floor(Math.random() * Math.floor(baseDamage * 0.07)) + 1;
                    baseDamage = baseDamage + rngDmgRoll;
                }
            }
        }
    }
    else{

        // the caster is a user
        var checkTarget = event.enemies[target];
        
        if (checkTarget || areaWideAbility || endOfTurnAura){
            // the target is an enemy
            // get the stats for caster and target
            var userStats = event.membersInParty["rpg-"+caster];
            var targetStats = event.enemies[target];
            // add damage 
            if (abilityType == "physical"){
                // use attack damage
                var damageToIncrease = 0
                baseDamage = additionalDamageAD(rpgAbility, userStats, damageToIncrease, baseDamage);
                // reduce damage from armor of target
                var damageToReduce = getDamageToReduceFromArmor(rpgAbility, event, targetStats, 0, "enemy");

                if (damageToReduce > 0.75){
                    damageToReduce = 0.75
                }
                baseDamage = baseDamage * (1 - damageToReduce );
                
                // additional RNG
                var rngDmgRoll = Math.floor(Math.random() * Math.floor(baseDamage * 0.07)) + 1;
                baseDamage = baseDamage  + rngDmgRoll;
                
            }else{
                // use magic damage
                var damageToIncrease = 0
                baseDamage = additionalDamageMD(rpgAbility, userStats, damageToIncrease, baseDamage);                
                // now reduce damage from spirit
                var damageToReduce = getDamageToReduceFromSpirit(rpgAbility, event, targetStats, 0, "enemy");                    
                
                if (damageToReduce > 0.75){
                    damageToReduce = 0.75
                }
                baseDamage = baseDamage * (1 - damageToReduce);
                
                // additional RNG
                var rngDmgRoll = Math.floor(Math.random() * Math.floor(baseDamage * 0.07)) + 1;
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
                    baseDamage = additionalDamageAD(rpgAbility, userStats, damageToIncrease, baseDamage);                    
                    // now reduce damage from armor
                    var damageToReduce = getDamageToReduceFromArmor(rpgAbility, event, targetStats, 0, "party");

                    if (damageToReduce > 0.75){
                        damageToReduce = 0.75
                    }
                    baseDamage = baseDamage * (1 - damageToReduce);
                    
                    // additional RNG
                    var rngDmgRoll = Math.floor(Math.random() * Math.floor(baseDamage * 0.07)) + 1;
                    baseDamage = baseDamage  + rngDmgRoll;
                    
                }else{
                    // use magic damage
                    var damageToIncrease = 0
                    baseDamage = additionalDamageMD(rpgAbility, userStats, damageToIncrease, baseDamage);                                    
                    // now reduce damage from spirit
                    var damageToReduce = getDamageToReduceFromSpirit(rpgAbility, event, targetStats, 0, "party");                    
                    
                    if (damageToReduce > 0.75){
                        damageToReduce = 0.75
                    }
                    baseDamage = baseDamage * ( 1 - damageToReduce );
                    
                    // additional RNG
                    var rngDmgRoll = Math.floor(Math.random() * Math.floor(baseDamage * 0.07)) + 1;
                    baseDamage = baseDamage + rngDmgRoll;
                }
            }
        }
    }
    
    return Math.floor(baseDamage);
}

function calculateHealingDone(event, caster, target, rpgAbility){
    // healing done to user or healing done by hot
    var baseHealing = rpgAbility.heal;
    var abilityType = rpgAbility.type;
    var areaWideAbility = rpgAbility.areawide;
    var endOfTurnAura = rpgAbility.endOfTurnAura;

    if (caster < 1000){
        var checkTarget = event.enemies[target]
        if (checkTarget || areaWideAbility || endOfTurnAura){
            var userStats = event.enemies[caster];
            
            var healingToDo = 0

            if (rpgAbility.turnsToExpire){
                healingToDo = healingToDo + (userStats.magicDmg + userStats.statBuffs.magicDmg);
                baseHealing = baseHealing + Math.floor(( healingToDo / rpgAbility.turnsToExpire ) * rpgAbility.mdPercentage)
            }else{
                if (rpgAbility.areawide){
                    healingToDo = healingToDo + (userStats.magicDmg + userStats.statBuffs.magicDmg);
                    baseHealing = baseHealing + Math.floor(healingToDo * rpgAbility.mdPercentage)
                }else{
                    healingToDo = healingToDo + (userStats.magicDmg + userStats.statBuffs.magicDmg);
                    baseHealing = baseHealing + Math.floor(healingToDo * rpgAbility.mdPercentage)
                }
            }
            // additional RNG
            var rngDmgRoll = Math.floor(Math.random() * Math.floor(baseHealing * 0.07)) + 1;
            baseHealing = baseHealing + rngDmgRoll;
        }else{
            // enemy healed user
            checkTarget = event.membersInParty[target]
            if (checkTarget){
                var userStats = event.enemies[caster];
                
                var healingToDo = 0

                if (rpgAbility.turnsToExpire){
                    healingToDo = healingToDo + (userStats.magicDmg + userStats.statBuffs.magicDmg);
                    baseHealing = baseHealing + Math.floor(( healingToDo / rpgAbility.turnsToExpire ) * rpgAbility.mdPercentage)
                }else{
                    if (rpgAbility.areawide){
                        healingToDo = healingToDo + (userStats.magicDmg + userStats.statBuffs.magicDmg);
                        baseHealing = baseHealing + Math.floor(healingToDo *  rpgAbility.mdPercentage)
                    }else{
                        healingToDo = healingToDo + (userStats.magicDmg + userStats.statBuffs.magicDmg);
                        baseHealing = baseHealing + Math.floor(healingToDo * rpgAbility.mdPercentage)
                    }
                }
                // additional RNG
                var rngDmgRoll = Math.floor(Math.random() * Math.floor(baseHealing * 0.07)) + 1;
                baseHealing = baseHealing + rngDmgRoll;
            }
        }
        
    }
    else{
        // the caster is a user
        var userStats = event.membersInParty["rpg-"+caster];
        
        var checkTarget = event.membersInParty[target];
        if (checkTarget || areaWideAbility || endOfTurnAura){
            var healingToDo = 0

            if (rpgAbility.turnsToExpire){
                healingToDo = healingToDo + (userStats.magicDmg + userStats.statBuffs.magicDmg);
                baseHealing = baseHealing + Math.floor(( healingToDo / rpgAbility.turnsToExpire ) * rpgAbility.mdPercentage)
            }else{
                if (rpgAbility.areawide){
                    healingToDo = healingToDo + (userStats.magicDmg + userStats.statBuffs.magicDmg);
                    baseHealing = baseHealing + Math.floor(healingToDo * rpgAbility.mdPercentage)
                }else{
                    healingToDo = healingToDo + (userStats.magicDmg + userStats.statBuffs.magicDmg);
                    baseHealing = baseHealing + Math.floor(healingToDo * rpgAbility.mdPercentage)
                }
                // additional RNG
                var rngDmgRoll = Math.floor(Math.random() * Math.floor(baseHealing * 0.07)) + 1;
                baseHealing = baseHealing + rngDmgRoll;
            }
        }else{
            // user healed enemy
            checkTarget = event.enemies[target];
            if (checkTarget){
                var healingToDo = 0

                if (rpgAbility.turnsToExpire){
                    healingToDo = healingToDo + (userStats.magicDmg + userStats.statBuffs.magicDmg);
                    baseHealing = baseHealing + Math.floor(( healingToDo / rpgAbility.turnsToExpire ) * rpgAbility.mdPercentage)
                }else{
                    if (rpgAbility.areawide){
                        healingToDo = healingToDo + (userStats.magicDmg + userStats.statBuffs.magicDmg);
                        baseHealing = baseHealing + Math.floor(healingToDo * rpgAbility.mdPercentage)
                    }else{
                        healingToDo = healingToDo + (userStats.magicDmg + userStats.statBuffs.magicDmg);
                        baseHealing = baseHealing + Math.floor(healingToDo * rpgAbility.mdPercentage)
                    }
                }
                // additional RNG
                var rngDmgRoll = Math.floor(Math.random() * Math.floor(baseHealing * 0.07)) + 1;
                baseHealing = baseHealing + rngDmgRoll;
            }
        }
    }
    return Math.floor(baseHealing);
}

function processAbility(abilityObject, event){
    // process the ability individually
    // get the type of ability first
    // damage, healing, status change, 

    // string
    var ability = abilityObject.ability;
    // will return this
    var abilityToString = "";
    var rpgAbility = rpgAbilities[ability] ? JSON.parse(JSON.stringify(rpgAbilities[ability])) : undefined;
    var currentTurn = event.turn;
    // check that the user of the ability is still alive
    var abilityCaster = abilityObject.user;
    var stillAlive = true;

    var validAbility = true;
    // if ability has a cooldown, set cooldown to maxcooldown
    if (rpgAbility.maxcooldown){
        if (abilityCaster > 1000){
            // caster is a member
            var memberInQuestion = event.membersInParty["rpg-"+abilityCaster]
            if (memberInQuestion.abilitiesMap[rpgAbility.abilityId]){
                memberInQuestion.abilitiesMap[rpgAbility.abilityId].cooldown = memberInQuestion.abilitiesMap[rpgAbility.abilityId].maxcooldown;                
            }
        }else{
            // caster is an enemy
            var enemyInQuestion = event.enemies[abilityCaster]
            if (enemyInQuestion.abilitiesMap[rpgAbility.abilityId].cooldown){
                enemyInQuestion.abilitiesMap[rpgAbility.abilityId].cooldown = enemyInQuestion.abilitiesMap[rpgAbility.abilityId].maxcooldown;                
            }
        }
    }

    if (rpgAbility.charges){
        // check who casted the ability
        if (abilityCaster > 1000){
            // caster is a member
            var memberInQuestion = event.membersInParty["rpg-"+abilityCaster]
            if (memberInQuestion.abilitiesMap[rpgAbility.abilityId].charges > 0){
                memberInQuestion.abilitiesMap[rpgAbility.abilityId].charges = memberInQuestion.abilitiesMap[rpgAbility.abilityId].charges - 1;
                abilityToString = abilityToString + memberInQuestion.name + " " + memberInQuestion.abilitiesMap[rpgAbility.abilityId].charges + " charges left "
            }else{
                var memberInQuestion = event.membersInParty["rpg-"+abilityCaster]
                memberInQuestion.abilitiesMap[rpgAbility.abilityId].charges = memberInQuestion.abilitiesMap[rpgAbility.abilityId].maxcharges;
                abilityToString = abilityToString + memberInQuestion.name + " has recharged \n"
                var validAbility = false;
            }
        }else{
            // caster is an enemy
            var enemyInQuestion = event.enemies[abilityCaster]
            if (enemyInQuestion.abilitiesMap[rpgAbility.abilityId].charges > 0){
                enemyInQuestion.abilitiesMap[rpgAbility.abilityId].charges = enemyInQuestion.abilitiesMap[rpgAbility.abilityId].charges - 1;
                abilityToString = abilityToString + enemyInQuestion.name + " " + enemyInQuestion.abilitiesMap[rpgAbility.abilityId].charges + " charges left "    
            }else{
                var enemyInQuestion = event.enemies[abilityCaster]
                enemyInQuestion.abilitiesMap[rpgAbility.abilityId].charges = enemyInQuestion.abilitiesMap[rpgAbility.abilityId].maxcharges;
                abilityToString = abilityToString + enemyInQuestion.name + " has recharged \n"
                var validAbility = false;
            }
        }
    }

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

    var limitReady = true;
    if (rpgAbility.limitDefensive && stillAlive){
        // 
        if (!event.limitDefensiveReady){
            limitReady = false;
        }
    }
    if (rpgAbility.limitOffensive && stillAlive){
        // 
        if (!event.limitOffensiveReady){
            limitReady = false;
        }
    }
    if (!limitReady){
        validAbility = false;
    }

    if (rpgAbility.limitDefensive && event.limitDefensiveReady && stillAlive){
        event.limitDefensiveReady = false;
    }
    if (rpgAbility.limitOffensive && event.limitOffensiveReady && stillAlive){
        event.limitOffensiveReady = false;
    }

    if (rpgAbility && rpgAbility.dmg && stillAlive && validAbility){
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
                abilityToString = abilityToString + caster +  " dealt " + damageToDeal + " damage to all enemies with " + rpgAbility.name + "\n";                
                for (var targetToDealDmg in event.enemies){
                    var targetToDealDmgName = event.enemies[targetToDealDmg].name
                    if (event.enemies[targetToDealDmg].statuses.indexOf("dead") == -1){
                        // target is not dead, damage them
                        event.enemies[targetToDealDmg].hp = event.enemies[targetToDealDmg].hp - damageToDeal;
                        if (event.enemies[targetToDealDmg].hp <= 0){
                            abilityToString = abilityToString + hasDied(event, event.enemies[targetToDealDmg]);
                        }
                    }
                }
            }
            else{
                // if caster is in enemies then target = all the members of party
                var caster = event.enemies[abilityCaster] ? event.enemies[abilityCaster].name : undefined;
                abilityToString = abilityToString + caster +  " dealt " + damageToDeal + " damage to the group with " + rpgAbility.name + "\n";                
                for (var targetToDealDmg in event.membersInParty){
                    var targetToDealDmgName = event.membersInParty[targetToDealDmg].name
                    if (event.membersInParty[targetToDealDmg].statuses.indexOf("dead") == -1){
                        event.membersInParty[targetToDealDmg].hp = event.membersInParty[targetToDealDmg].hp - damageToDeal;
                        if (event.membersInParty[targetToDealDmg].hp <= 0){
                            abilityToString = abilityToString + hasDied(event, event.membersInParty[targetToDealDmg]);
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
                abilityToString = abilityToString + targetToDealDmgName + " took " + damageToDeal + " damage from " + rpgAbility.name + "\n";
                if (event.enemies[targetToDealDmg].hp <= 0){
                    abilityToString = abilityToString + hasDied(event, event.enemies[targetToDealDmg]);
                }
            }
            // dealing damage to members of party (friendly fire or enemy attacking)
            else if (event.membersInParty[targetToDealDmg]){
                var targetToDealDmgName = event.membersInParty[targetToDealDmg].name;
                event.membersInParty[targetToDealDmg].hp = event.membersInParty[targetToDealDmg].hp - damageToDeal;
                abilityToString = abilityToString + targetToDealDmgName + " took " + damageToDeal + " damage from " + rpgAbility.name + "\n";
                if (event.membersInParty[targetToDealDmg].hp <= 0){
                    abilityToString = abilityToString + hasDied(event, event.membersInParty[targetToDealDmg]);
                }
            }
        }
    }
    if (rpgAbility && rpgAbility.heal && stillAlive && validAbility){
        // this is a healing ability, heal the target
        var hpToHeal = calculateHealingDone(event, abilityCaster, abilityObject.target, rpgAbility);

        if (rpgAbility.areawide){
            
            if (abilityCaster > 1000){
                // if caster is party of membersInParty then target = all the membersInParty
                var caster = event.membersInParty["rpg-"+abilityCaster] ? event.membersInParty["rpg-"+abilityCaster].name : undefined;
                abilityToString = abilityToString + caster +  " healed the group for " + hpToHeal + " with " + rpgAbility.name + "\n";                
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
                abilityToString = abilityToString + caster +  " healed the group for " + hpToHeal + " with " + rpgAbility.name + "\n";                
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
    if (rpgAbility && rpgAbility.buff && stillAlive && validAbility){
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
                if (rpgAbility.buff.name != "Warm Up"){
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
                if (rpgAbility.buff.name != "Warm Up"){
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

    if (rpgAbility && rpgAbility.status && stillAlive && validAbility){
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
                        && event.membersInParty[targetToAddStatus].statuses[status].dot.caster == abilityObject.user
                        && event.membersInParty[targetToAddStatus].statuses[status].dot.name == statusToAdd.name ){
                        alreadyHaveStatus = true;
                    }
                    // add the status here
                    if (event.membersInParty[targetToAddStatus].statuses[status].name == statusToAdd.name){
                            alreadyHaveStatus = true;
                    }
                }
                if (!alreadyHaveStatus){
                    event.membersInParty[targetToAddStatus].statuses.push(statusToAdd);
                    if (statusToAdd.turnsToExpire){
                        statusToAdd.caster = abilityCaster // id of the caster
                        statusToAdd.expireOnTurn = currentTurn + statusToAdd.turnsToExpire;
                    }
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
                        && event.enemies[targetToAddStatus].statuses[status].dot.caster == abilityObject.user
                        && event.enemies[targetToAddStatus].statuses[status].dot.name == statusToAdd.name ){
                        alreadyHaveStatus = true;
                    }

                    if (event.enemies[targetToAddStatus].statuses[status].name == statusToAdd.name){
                            alreadyHaveStatus = true;
                    }
                }
                if (!alreadyHaveStatus){
                    event.enemies[targetToAddStatus].statuses.push(statusToAdd);
                    if (statusToAdd.turnsToExpire){
                        statusToAdd.caster = abilityCaster // id of the caster
                        statusToAdd.expireOnTurn = currentTurn + statusToAdd.turnsToExpire;
                    }
                    abilityToString = abilityToString + targetToAddStatusName + " was affected with " + statusToAdd.name + " \n"    
                }
            }
        }
    }

    if (rpgAbility && rpgAbility.dot && stillAlive && validAbility){
        // dot has been applied
        // calculate the dot damage based on MD or AD, target armor, special buff
        var dotToAdd = {}
        dotToAdd.dot = rpgAbility.dot;
        var targetToAddDot = abilityObject.target
        dotToAdd.dot.expireOnTurn = currentTurn + dotToAdd.dot.turnsToExpire;
        dotToAdd.dot.caster = abilityCaster // id of the caster
        // enemy added a dot to party member
        if (rpgAbility.dot.areawide){
            // deal damage area wide against opposite party
            if (abilityCaster > 1000){
                // if caster is party of membersInParty then target = all the enemies
                for (var targetToAddDot in event.enemies){
                    if (event.enemies[targetToAddDot].hp > 0
                        && event.enemies[targetToAddDot].statuses.indexOf("dead") == -1){
                        var alreadyHaveStatus = false;
                        for (var status in event.enemies[targetToAddDot].statuses){
                            if (event.enemies[targetToAddDot].statuses[status].dot
                                && event.enemies[targetToAddDot].statuses[status].dot.caster == abilityObject.user
                                && event.enemies[targetToAddDot].statuses[status].dot.name == dotToAdd.dot.name ){
                                alreadyHaveStatus = true;
                            }
                        }
                        if (!alreadyHaveStatus){
                            event.enemies[targetToAddDot].statuses.push(dotToAdd);
                        }
                    }
                }
                abilityToString = abilityToString + "The group was affected with " + dotToAdd.dot.name + " \n" 
            }else{
                var caster = event.membersInParty["rpg-"+abilityCaster] ? event.membersInParty["rpg-"+abilityCaster].name : undefined;
                for (var targetToAddDot in event.membersInParty){
                    if (event.membersInParty[targetToAddDot].hp > 0
                    && event.membersInParty[targetToAddDot].statuses.indexOf("dead") == -1){
                        var alreadyHaveStatus = false;
                        for (var status in event.membersInParty[targetToAddDot].statuses){
                            if (event.membersInParty[targetToAddDot].statuses[status].dot
                                && event.membersInParty[targetToAddDot].statuses[status].dot.caster == abilityObject.user ){
                                alreadyHaveStatus = true;
                            }
                        }
                        if (!alreadyHaveStatus){
                            event.membersInParty[targetToAddDot].statuses.push(dotToAdd);
                        }
                    }
                }
                abilityToString = abilityToString + "The group was affected with " + dotToAdd.dot.name + " \n"                 
            }
        }else{
            var caster = event.enemies[abilityCaster] ? event.enemies[abilityCaster].name : undefined;
            if (event.membersInParty[targetToAddDot]){
                var targetToAddDotName = event.membersInParty[targetToAddDot].name;
                if (event.membersInParty[targetToAddDot].statuses.indexOf("dead") == -1){
                    // target is not dead
                    // ONLY ADD THE DOT IF THEY DONT ALREADY HAVE IT
                    for (var status in event.membersInParty[targetToAddDot].statuses){
                        if (event.membersInParty[targetToAddDot].statuses[status].dot
                            && event.membersInParty[targetToAddDot].statuses[status].dot.caster == abilityObject.user
                            && event.membersInParty[targetToAddDot].statuses[status].dot.name == dotToAdd.dot.name ){
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
                            && event.enemies[targetToAddDot].statuses[status].dot.caster == abilityObject.user
                            && event.enemies[targetToAddDot].statuses[status].dot.name == dotToAdd.dot.name ){
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
        
    }

    if (rpgAbility && rpgAbility.hot && stillAlive && validAbility){
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
                var alreadyHaveHot = false;
                for (var buff in event.membersInParty[targetToAddHot].buffs){
                    if (event.membersInParty[targetToAddHot].buffs[buff].hot
                        && event.membersInParty[targetToAddHot].buffs[buff].hot.caster == abilityObject.user
                        && event.membersInParty[targetToAddHot].buffs[buff].hot.name == hotToAdd.hot.name ){
                            alreadyHaveHot = true;
                    }
                }
                if (!alreadyHaveHot){
                    event.membersInParty[targetToAddHot].buffs.push(hotToAdd);
                    abilityToString = abilityToString + targetToAddHotName + " was affected with " + hotToAdd.hot.name + " \n" 
                }
            }
        }

        else if (event.enemies[targetToAddHot]){
            var targetToAddHotName = event.enemies[targetToAddHot].name;
            if (event.enemies[targetToAddHot].statuses.indexOf("dead") == -1){

                var alreadyHaveHot = false;
                for (var buff in event.enemies[targetToAddHot].buffs){
                    if (event.enemies[targetToAddHot].buffs[buff].hot
                        && event.enemies[targetToAddHot].buffs[buff].hot.caster == abilityObject.user
                        && event.enemies[targetToAddHot].buffs[buff].hot.name == hotToAdd.hot.name ){
                            alreadyHaveHot = true;
                    }
                }
                if (!alreadyHaveHot){
                    event.enemies[targetToAddHot].buffs.push(hotToAdd);
                    abilityToString = abilityToString + targetToAddHotName + " was affected with " + hotToAdd.hot.name + " \n" 
                }
            }
        }
    }

    if (rpgAbility && rpgAbility.special && stillAlive && validAbility){
        // handle the ability in a special manner
        if (rpgAbility.special == "selfdamage"){
            // deal self damage to the user
            if (event.membersInParty["rpg-"+abilityCaster] 
                && event.membersInParty["rpg-"+abilityCaster].statuses.indexOf("dead") == -1 ){
                var targetToDealDmgName = event.membersInParty["rpg-"+abilityCaster].name
                // set damage temporarily
                var tempDamage = rpgAbility.dmg;
                rpgAbility.dmg = rpgAbility.selfdamage;
                var damageToDeal = Math.floor(calculateDamageDealt(event, abilityCaster, "rpg-"+abilityCaster, rpgAbility) * 0.2)
                event.membersInParty["rpg-"+abilityCaster].hp = event.membersInParty["rpg-"+abilityCaster].hp - damageToDeal;
                abilityToString = abilityToString + targetToDealDmgName + " suffered " + damageToDeal + " damage from " + rpgAbility.name + "\n"
                rpgAbility.dmg = tempDamage
                if (event.membersInParty["rpg-"+abilityCaster].hp <= 0){
                    abilityToString = abilityToString + hasDied(event, event.membersInParty["rpg-"+abilityCaster])
                }              
            }
            // deal self damage to the enemy
            if (event.enemies[abilityCaster] 
            && event.enemies[abilityCaster].statuses.indexOf("dead") == -1 ){
                var targetToDealDmgName = event.enemies[abilityCaster].name
                // set damage temporarily
                var tempDamage = rpgAbility.dmg;
                rpgAbility.dmg = rpgAbility.selfdamage;
                var damageToDeal = Math.floor(calculateDamageDealt(event, abilityCaster, abilityCaster, rpgAbility) * 0.2)
                event.enemies[abilityCaster].hp = event.enemies[abilityCaster].hp - damageToDeal;
                abilityToString = abilityToString + targetToDealDmgName + " suffered " + damageToDeal + " damage from " + rpgAbility.name + "\n"
                rpgAbility.dmg = tempDamage
                if (event.enemies[abilityCaster].hp <= 0){
                    abilityToString = abilityToString + hasDied(event, event.enemies[abilityCaster]);
                }              
            }
        }
        if (ability == "bandaid"){
            // remove a status from the target except dead
            var targetToRemoveFrom = abilityObject.target
            if (event.membersInParty[targetToRemoveFrom]){
                if (event.membersInParty[targetToRemoveFrom].statuses.indexOf("dead") == -1 
                    && event.membersInParty[targetToRemoveFrom].statuses.length > 0){
                    
                    for (var status in event.membersInParty[targetToRemoveFrom].statuses){
                        if (event.membersInParty[targetToRemoveFrom].statuses[status].dot
                            && event.membersInParty[targetToRemoveFrom].statuses[status].dot.dmgOnDotRemove){
                            // deal the dmg on dot remove to everyone

                            var nameOfEndOfTurnAbility = event.membersInParty[targetToRemoveFrom].statuses[status].dot.name;
                            
                            var damageToDeal = 1;
                            
                            var abilityObject = {
                                ability: event.membersInParty[targetToRemoveFrom].statuses[status].dot
                            }

                            event.membersInParty[targetToRemoveFrom].statuses.splice(status, 1);

                            abilityObject.ability.dmg = abilityObject.ability.dmgOnRemove
                            abilityObject.ability.mdPercentage = abilityObject.ability.mdPercentageOnRemove;
                            abilityObject.ability.areawide = true;
                            var abilityCaster = abilityObject.ability.caster;
                            delete abilityObject.ability.turnsToExpire

                            var damageToDeal = calculateDamageDealt(event, abilityCaster, abilityObject.target, abilityObject.ability)
                            abilityToString = abilityToString + "The group suffered " + damageToDeal + " damage from " + nameOfEndOfTurnAbility +"\n"
                            for (var targetToDealDmg in event.membersInParty){
                                var targetToDealDmgName = event.membersInParty[targetToDealDmg].name
                                if (event.membersInParty[targetToDealDmg].statuses.indexOf("dead") == -1){
                                    event.membersInParty[targetToDealDmg].hp = event.membersInParty[targetToDealDmg].hp - damageToDeal;
                                    if (event.membersInParty[targetToDealDmg].hp <= 0){
                                        abilityToString = abilityToString + hasDied(event, event.membersInParty[targetToDealDmg]);
                                    }
                                }
                            }
                        }
                    }
                    
                    event.membersInParty[targetToRemoveFrom].statuses = []
                    abilityToString = abilityToString + event.membersInParty[targetToRemoveFrom].name + " was cured with " + rpgAbility.name + " \n"                
                }
            }
            else if (event.enemies[targetToRemoveFrom]){
                if (event.enemies[targetToRemoveFrom].statuses.indexOf("dead") == -1 
                    && event.enemies[targetToRemoveFrom].statuses.length > 0){
                    event.enemies[targetToRemoveFrom].statuses = []
                    abilityToString = abilityToString + event.enemies[targetToRemoveFrom].name + " was cured with " + rpgAbility.name + " \n"                
                }
            }
            
        }
        else if (ability == "revive" || ability == "replenish"){
            // remove dead from statuses and give 40% of max hp
            var targetToRevive = abilityObject.target;
            if (event.membersInParty[targetToRevive]){
                var targetToReviveName = event.membersInParty[targetToRevive].name
                var deadIndex = event.membersInParty[targetToRevive].statuses.indexOf("dead")
                if (deadIndex > -1){
                    // target is dead
                    if (ability == "replenish"){
                        hasRevived( event.membersInParty[targetToRevive], deadIndex, 1 );
                    }
                    else{
                        hasRevived( event.membersInParty[targetToRevive], deadIndex);
                    }
                    abilityToString = abilityToString + targetToReviveName + " was Revived \n"                
                }
            }
            else if (event.enemies[targetToRevive]){
                var targetToReviveName = event.enemies[targetToRevive].name
                var deadIndex = event.enemies[targetToRevive].statuses.indexOf("dead")
                if (deadIndex > -1){
                    // target is dead
                    if (ability == "replenish"){
                        hasRevived( event.enemies[targetToRevive], deadIndex, 1 );
                    }
                    else{
                        hasRevived( event.enemies[targetToRevive], deadIndex );
                    }
                    abilityToString = abilityToString + targetToReviveName + " was Revived \n"                
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
                abilityToString = abilityToString + targetToDealDmgName + " took " + damageToDeal + " damage from " + rpgAbility.name + "\n";
                if (event.enemies[targetToDealDmg].hp <= 0){
                    abilityToString = abilityToString + hasDied(event, event.enemies[targetToDealDmg]);
                }
            }
            // dealing damage to members of party (friendly fire or enemy attacking)
            else if (event.membersInParty[targetToDealDmg]){
                var targetToDealDmgName = event.membersInParty[targetToDealDmg].name;
                event.membersInParty[targetToDealDmg].hp = event.membersInParty[targetToDealDmg].hp - damageToDeal;
                abilityToString = abilityToString + targetToDealDmgName + " took " + damageToDeal + " damage from " + rpgAbility.name + "\n";
                if (event.membersInParty[targetToDealDmg].hp <= 0){
                    abilityToString = abilityToString + hasDied(event, event.membersInParty[targetToDealDmg]);
                }
            }

            var targetToHeal = abilityObject.user;
            var hpToHeal = calculateHealingDone(event, abilityCaster, abilityObject.target, rpgAbility.special);
            hpToHeal = Math.floor(hpToHeal * rpgAbility.special.healPercentage);
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
                    abilityToString = abilityToString + targetToHealName + " was healed for " + hpToHeal + " from " + rpgAbility.name + "\n"
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
                    if (event.membersInParty[targetToCheck].buffs[buff].name == "Warm Up" ){
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
                                abilityToString = abilityToString + targetToDealDmgName + " took " + damageToDeal + " damage from " + rpgAbility.name + "\n";
                                if (event.enemies[targetToDealDmg].hp <= 0){
                                    abilityToString = abilityToString + hasDied(event, event.enemies[targetToDealDmg]);
                                }
                            }
                            // dealing damage to members of party (friendly fire or enemy attacking)
                            else if (event.membersInParty[targetToDealDmg]){
                                var targetToDealDmgName = event.membersInParty[targetToDealDmg].name;
                                event.membersInParty[targetToDealDmg].hp = event.membersInParty[targetToDealDmg].hp - damageToDeal;
                                abilityToString = abilityToString + targetToDealDmgName + " took " + damageToDeal + " damage from " + rpgAbility.name + "\n";
                                if (event.membersInParty[targetToDealDmg].hp <= 0){
                                    abilityToString = abilityToString + hasDied(event, event.membersInParty[targetToDealDmg]);
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
                    if (event.enemies[targetToCheck].buffs[buff].name == "Warm Up" ){
                        var stacksOfWarmUp = event.enemies[targetToCheck].buffs[buff].stacksOfWarmUp ? event.enemies[targetToCheck].buffs[buff].stacksOfWarmUp : 0;
                        if (stacksOfWarmUp >= rpgAbility.buff.maxStacks){
                            // damage is atMaxStacksDealDamage
                            var tempDmg = rpgAbility.dmg;
                            var tmpMdPercentage = rpgAbility.mdPercentage
                            rpgAbility.dmg = rpgAbility.buff.atMaxStacksDealDamage;
                            rpgAbility.mdPercentage = rpgAbility.buff.mdPercentageAtMaxStacks;
                            var damageToDeal = calculateDamageDealt(event, abilityObject.user, abilityObject.target, rpgAbility);
                            rpgAbility.dmg = tempDmg;
                            rpgAbility.mdPercentage = tmpMdPercentage;
                            // deal the damage and then remove the buff
                            var targetToDealDmg = abilityObject.target;
                            if (event.membersInParty[targetToDealDmg]){
                                var targetToDealDmgName = event.membersInParty[targetToDealDmg].name;
                                event.membersInParty[targetToDealDmg].hp = event.membersInParty[targetToDealDmg].hp - damageToDeal;
                                abilityToString = abilityToString + targetToDealDmgName + " took " + damageToDeal + " damage from " + rpgAbility.name + "\n";
                                if (event.membersInParty[targetToDealDmg].hp <= 0){
                                    abilityToString = abilityToString + hasDied(event, event.membersInParty[targetToDealDmg]);
                                }
                            }
                            // dealing damage to members of party (friendly fire or enemy attacking)
                            else if (event.enemies["rpg-"+targetToDealDmg]){
                                var targetToDealDmg = "rpg-"+targetToDealDmg;
                                var targetToDealDmgName = event.enemies[targetToDealDmg].name;
                                event.enemies[targetToDealDmg].hp = event.enemies[targetToDealDmg].hp - damageToDeal;
                                abilityToString = abilityToString + targetToDealDmgName + " took " + damageToDeal + " damage from " + rpgAbility.name + "\n";
                                if (event.enemies[targetToDealDmg].hp <= 0){
                                    abilityToString = abilityToString + hasDied(event, event.enemies[targetToDealDmg]);
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
        else if (ability == "guac"){
            // deal damage depending on dots on target
            var targetToDealDmg = abilityObject.target;
            // dealing damage to enemies
            if (event.enemies[targetToDealDmg]){
                // deal damage to enemy
                // check the number of dots on target
                var numberOfDots = 0;
                for (var status in event.enemies[targetToDealDmg].statuses){
                    var statusToCheck = event.enemies[targetToDealDmg].statuses[status];
                    if (statusToCheck.dot){
                        numberOfDots++;
                    }
                }
                rpgAbility.special.mdPercentage = rpgAbility.special.mdPercentage + rpgAbility.special.mdPerDot * numberOfDots;

                var damageToDeal = calculateDamageDealt(event, abilityCaster, abilityObject.target, rpgAbility.special)
                // deal the damage                
                var targetToDealDmgName = event.enemies[targetToDealDmg].name;
                event.enemies[targetToDealDmg].hp = event.enemies[targetToDealDmg].hp - damageToDeal;
                abilityToString = abilityToString + targetToDealDmgName + " took " + damageToDeal + " damage from " + rpgAbility.name + "\n";
                if (event.enemies[targetToDealDmg].hp <= 0){
                    abilityToString = abilityToString + hasDied(event, event.enemies[targetToDealDmg]);
                }
                
            }
            else if (event.membersInParty[targetToDealDmg]){
                // dealing damage to party member
                var numberOfDots = 0;
                for (var status in event.membersInParty[targetToDealDmg].statuses){
                    var statusToCheck = event.membersInParty[targetToDealDmg].statuses[status];
                    if (statusToCheck.dot){
                        numberOfDots++;
                    }
                }
                rpgAbility.special.mdPercentage = rpgAbility.special.mdPercentage + rpgAbility.special.mdPerDot * numberOfDots;

                var damageToDeal = calculateDamageDealt(event, abilityCaster, abilityObject.target, rpgAbility.special)

                var targetToDealDmgName = event.membersInParty[targetToDealDmg].name;
                event.membersInParty[targetToDealDmg].hp = event.membersInParty[targetToDealDmg].hp - damageToDeal;
                abilityToString = abilityToString + targetToDealDmgName + " took " + damageToDeal + " damage from " + rpgAbility.name + "\n";
                if (event.membersInParty[targetToDealDmg].hp <= 0){
                    abilityToString = abilityToString + hasDied( event, event.membersInParty[targetToDealDmg]);
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
        userString = " :green_heart:  " + (userStats.hp + userStats.statBuffs.hp) + "/" + (userStats.maxhp + userStats.statBuffs.maxhp) + " "
        userString = userString + " 🛡️ " + (userStats.armor + userStats.statBuffs.armor)
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
    // calculate enemies alive
    var enemiesAlive = 0;
    for (var enemy in event.enemies){
        if (event.enemies[enemy].statuses.indexOf("dead") == -1){
            enemiesAlive++;
        }
    }

    for (var enemy in event.enemies){
        console.log(event.enemies[enemy]);
        // check that the enemy is not dead first 
        if (event.enemies[enemy].statuses.indexOf("dead") == -1){
            // pick an ability, then pick a target, the target must be a member of the party that isnt dead
            var abilityPicked;
            var abilityRoll;
            if (event.enemies[enemy].abilityOrder){
                var indexToPickInOrder = (event.turn -1) % event.enemies[enemy].abilityOrder.length;
                abilityRoll = event.enemies[enemy].abilityOrder[indexToPickInOrder];
                ///// abilityRoll is an array of abilities to chose at random
                if (Array.isArray(abilityRoll)){
                    var abilityInArray = Math.floor(Math.random() * (abilityRoll.length));
                    abilityRoll = abilityRoll[abilityInArray]
                }
                abilityPicked = event.enemies[enemy].abilities[abilityRoll];
            }else{
                abilityRoll= Math.floor(Math.random() * event.enemies[enemy].abilities.length);
                if (enemiesAlive == 1){
                    abilityRoll= Math.floor(Math.random() * (event.enemies[enemy].abilities.length - 1));
                }
                abilityPicked = event.enemies[enemy].abilities[abilityRoll];
            }
            

            // now pick a target
            if (abilityPicked != undefined
                && (rpgAbilities[abilityPicked].dmg
                || rpgAbilities[abilityPicked].dot
                || rpgAbilities[abilityPicked].status
                || rpgAbilities[abilityPicked].name == "Guac"
                || rpgAbilities[abilityPicked].name == "Drain")){
                // target SHOULD be the membersinparty

                var validTarget = false;
                var stuckCount = 0
                var target;
                while(!validTarget && stuckCount < 100){
                    var targetRoll = Math.floor(Math.random() * event.members.length);
                    var targetMember = event.members[targetRoll].id;
                    var targetFocusedMember = true;
                    if (stuckCount < 5){
                        for (var member in event.members){
                            // 
                            var idOfMemberBeingChecked = "rpg-" + event.members[member].id;
                            for (var statusToCheck in event.membersInParty[idOfMemberBeingChecked].statuses){
                                // check if someone has focus on them if they do then the target should be the focused person 
                                if ( event.membersInParty[idOfMemberBeingChecked].statuses[statusToCheck].name == "Focus"
                                    && event.membersInParty[idOfMemberBeingChecked].statuses[statusToCheck].focusedBy == enemy){
                                    //target roll should be 
                                    targetMember = event.members[member].id;
                                    break;
                                }
                            }
                        }
                    }
                    
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

            }else if( abilityPicked != undefined
                && (rpgAbilities[abilityPicked].heal
                || rpgAbilities[abilityPicked].hot
                || rpgAbilities[abilityPicked].buff
                || rpgAbilities[abilityPicked].special)){
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
