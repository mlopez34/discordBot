const Discord = require("discord.js");
var experience = require("../experience.js")
var profileDB = require("../profileDB.js");
var config = require("../config");
var rpgAbilities = require("./rpgAbilities");
var rpgEnemies = require("./rpgEnemies");
var rpgMap = require("./rpgMap");
var wearStats = require("../wearStats.js")
var achiev = require("../achievements")
var commands = require("../commands.js")
var moment = require("moment");
var _ = require("lodash");

var RPG_COOLDOWN_HOURS = 1
var activeRPGEvents = {};
var activeRPGItemIds = {};
var usersInRPGEvents = {};
var rpgQueuesByUsers = []
var TEAM_MAX_LENGTH = 5;
var CURRENT_CHALLENGES_AVAILABLE = 15
var CHALLENGE_TO_TEST = 13
var KEYSTONE_UNLOCK_LEVEL = 35
var RPG_TEMPLE_LEVEL_PET = 5
var rpgAbilities = rpgAbilities.rpgAbilities;
var enemiesToEncounter = rpgEnemies.enemiesToEncounter;
var areaToZoneMap = rpgMap.areaToZoneMap
var rpgZones = rpgMap.rpgZones

module.exports.rpgInitialize = function(message, special){
    // create an embed saying that b is about to happen, for users MAX of 5 users and they must all say -ready to start costs 5 tacos per person
    let discordUserId = message.author.id;
    let users  = message.mentions.users
    let team = [];
    team.push(message.author);

    users.forEach(function(user){
        if (team.length < TEAM_MAX_LENGTH && discordUserId != user.id){
            team.push(user);
        }
    })
    // check to see all the team members are available and not already in an event
    let validTeam = true;
    for (let member in team){
        if (usersInRPGEvents["rpg-"+team[member].id]){
            validTeam = false;
        }

        if (checkIfUserInQueue(team[member].id)){
            validTeam = false
        }
        
        if (team[member].bot){
            validTeam = false;
        }
    }
    // stop initialization of multiple rpgs to avoid items being stuck
    // lock members from initialize
    

    if (team.length >= 2 && team.length <= TEAM_MAX_LENGTH && validTeam && !exports.isTeamLocked(team)){
        team.forEach(function(member){
            exports.setInitializeLock(member.id, true)
        })
        // send an embed that the users are needed for the RPG event to say -ready or -notready
        // if the user says -ready, they get added to activeRPGEvents that they were invited to
        let embed = new Discord.RichEmbed()
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
                exports.setInitializeLock(member.id, false)
            })
            // unlock team members from initialize 
            activeRPGEvents["rpg-" + sentMessage.id] = { members: membersOfParty };
            activeRPGEvents["rpg-" + sentMessage.id].status = "waiting";
            activeRPGEvents["rpg-" + sentMessage.id].lastEmbedMessage = sentMessage;
            activeRPGEvents["rpg-" + sentMessage.id].endOfTurnEvents = [];
            if (special && special.challenge){
                activeRPGEvents["rpg-" + sentMessage.id].challenge = {
                    challenge: parseInt( special.challenge ),
                    keystone: special.keystone,
                    valid: false
                };
                activeRPGEvents["rpg-" + sentMessage.id].leader = message.author;
            }else if (special && !special.currentarea){
                activeRPGEvents["rpg-" + sentMessage.id].special = special;
                activeRPGEvents["rpg-" + sentMessage.id].leader = message.author;
            }else{
                activeRPGEvents["rpg-" + sentMessage.id].area = special.currentarea
                activeRPGEvents["rpg-" + sentMessage.id].usersInArea = []
            }
        })
        .catch(function(err){
            // console.log(err)
            message.channel.send("error : Please report this to support server! " + JSON.stringify(err))
            message.channel.send("Unable to display RPG initialize embed, Enable embeds in this channel to begin an RPG event!")
        })
    }
    else{
        message.channel.send("not enough members in your party for this event or someone is already in an event, \ndo `-rpgstart @user @user ...` to start an rpg event with a group (2 minimum, 5 maximum) OR `-rpgchallenge 1 @user @user ..`")
    }
}

function checkIfUserInQueue(discordUserId){
    let isInQueue = false
    for(var i in rpgQueuesByUsers){
        if (rpgQueuesByUsers[i].discordUserId == discordUserId){
            return true
        }
    }

    return isInQueue
}

function removeUserFromQueue(discordUserId){
    for(var i in rpgQueuesByUsers){
        if (rpgQueuesByUsers[i].discordUserId == discordUserId){
            rpgQueuesByUsers.splice(i, 1)
        }
    }
}

module.exports.rpgSkip = function(message){
    var discordUserId = message.author.id;
    var idOfUserInEvent = usersInRPGEvents["rpg-" + discordUserId] ? usersInRPGEvents["rpg-" + discordUserId].id : undefined;
    var idOfActiveRPGEvent = activeRPGEvents["rpg-"+idOfUserInEvent] ? activeRPGEvents["rpg-"+idOfUserInEvent] : undefined;
    var statusOfEvent;
    var isQueueEvent;
    if (idOfActiveRPGEvent){
        statusOfEvent = activeRPGEvents["rpg-"+idOfUserInEvent].status ? activeRPGEvents["rpg-"+idOfUserInEvent].status : undefined;  
        isQueueEvent = activeRPGEvents["rpg-"+idOfUserInEvent].queueEvent ? activeRPGEvents["rpg-"+idOfUserInEvent].queueEvent : undefined;  
    }
    if (!exports.getreadyLock(idOfUserInEvent)
    && idOfUserInEvent
    && idOfActiveRPGEvent
    && (statusOfEvent == "waiting"
    || statusOfEvent == "in progress") ){
        if (isQueueEvent == true){
            // tell all the channels that the event was skipped
            let groupOfMessagesSent = activeRPGEvents["rpg-"+idOfUserInEvent].groupOfMessagesSent
            let groupOfUniqueChannels = filterForUniqueChannels(groupOfMessagesSent)
            for (var m in groupOfUniqueChannels){
                groupOfUniqueChannels[m].channel.send("A user has skipped and event has been canceled")
                .then(function(sentMessage){
                })
                .catch(function(err){
                    // console.log(err)
                })
            }

        }else{
            message.channel.send( message.author + " skipped and event has been canceled");
        }
        activeRPGEvents["rpg-"+idOfUserInEvent].status = "ended"
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
    else if(exports.getreadyLock(idOfUserInEvent)){
        message.channel.send(message.author + " a user recently readied, try again!")
    }else{
        message.channel.send(message.author + " you are not in an event");
    }
}

module.exports.showRpgStats = function(message, itemsAvailable, amuletItemsById, buffItemsById){
    var discordUserId = message.author.id;
    
    profileDB.getUserRpgProfleData(discordUserId, function(err, userData){
        if (err){
            // console.log(err);
            message.channel.send("You do not have a profile yet! type -agree to agree to Bender's terms ");
        }else{
            var userStats = userData.data;
            // get amulets data
            profileDB.getUserItems(discordUserId, function(err, inventoryResponse){
                if (err){
                    // console.log(err);
                }else{
                    // // console.log(inventoryResponse.data);
                    // get all the data for each item
                    var itemsInInventoryCountMap = {};
                    var userArmamentForItemId = {}
                    for (var item in inventoryResponse.data){
                        if (!itemsInInventoryCountMap[inventoryResponse.data[item].itemid] ){
                            // item hasnt been added to be counted, add it as 1
                            itemsInInventoryCountMap[inventoryResponse.data[item].itemid] = 1;
                        }else{
                            itemsInInventoryCountMap[inventoryResponse.data[item].itemid] = itemsInInventoryCountMap[inventoryResponse.data[item].itemid] + 1
                        }
                    }

                    for (var arm in inventoryResponse.data){
                        if (inventoryResponse.data[arm].armamentforitemid 
                            && !userArmamentForItemId[inventoryResponse.data[arm].armamentforitemid]){
                            userArmamentForItemId[inventoryResponse.data[arm].armamentforitemid] = inventoryResponse.data[arm]
                        }
                    }
                    // have items mapped by id and items in inventory
                    // check if i have any of all the possible amulet items
                    var userAmuletData = []
                    for (var amulet in amuletItemsById){
                        var idToCheck = amuletItemsById[amulet].id;
                        if (itemsInInventoryCountMap[idToCheck]){
                            var amuletToAdd = amuletItemsById[amulet]
                            amuletToAdd.count = itemsInInventoryCountMap[idToCheck]
                            userAmuletData.push(amuletItemsById[amulet]);
                        }
                    }

                    var userTemporaryBuffData = []
                    for (var buffItem in buffItemsById){
                        var idToCheck = buffItemsById[buffItem].id
                        var buffTime = userStats.rpgbuffactivatetime
                        var now = new Date()
                        if (now <= buffTime){
                            // buff is still active
                            if (userStats.rpgbuffitemid == idToCheck){
                                // add the buff to the stats
                                userTemporaryBuffData.push(buffItemsById[buffItem])
                            }
                        }
                    }

                    profileDB.getUserWearInfo(discordUserId, function(wearErr, wearData){
                        if (wearErr){
                            // console.log(wearErr);
                            message.channel.send(" something went wrong in [wearing] - someone doesn't have a wearing profile! get some items from the shop");
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
                                critPlus: 0,
                                statuses: [],
                                buffs: []
                            }
                            
                            if (wearingStats.slot1itemid){
                                items.push({
                                    itemid: wearingStats.slot1itemid,
                                    ability1: true,
                                    ability2: true,
                                    specialability: true,
                                    passiveability: true
                                })
                            }
                            if (wearingStats.slot2itemid){
                                items.push({
                                    itemid: wearingStats.slot2itemid,
                                    ability1: true,
                                    ability2: true,
                                    specialability: true,
                                    passiveability: true
                                })
                            }
                            if (wearingStats.slot3itemid){
                                items.push({
                                    itemid: wearingStats.slot3itemid,
                                    ability1: true,
                                    ability2: true,
                                    specialability: true,
                                    passiveability: true
                                })
                            }
                            if (wearingStats.slot4itemid){
                                items.push({
                                    itemid: wearingStats.slot4itemid,
                                    ability1: true,
                                    ability2: true,
                                    specialability: true,
                                    passiveability: true
                                })
                            }
                            // temple
                            if (wearingStats.slot5itemid){
                                items.push({
                                    itemid: wearingStats.slot5itemid,
                                    ability1: false,
                                    ability2: false,
                                    specialability: false,
                                    passiveability: false
                                })
                            }
                            // stable
                            if (wearingStats.slot6itemid){
                                items.push({
                                    itemid: wearingStats.slot6itemid,
                                    ability1: false,
                                    ability2: false,
                                    specialability: false,
                                    passiveability: false
                                })
                            }
                            // greenhouse
                            if (wearingStats.slot7itemid){
                                items.push({
                                    itemid: wearingStats.slot7itemid,
                                    ability1: false,
                                    ability2: false,
                                    specialability: false,
                                    passiveability: false
                                })
                            }
                            // added stats from items
                            for (var i in userTemporaryBuffData){
                                var activatebilityallslots = itemsAvailable[userTemporaryBuffData[i].id].activatebilityallslots ? itemsAvailable[userTemporaryBuffData[i].id].activatebilityallslots : 0
                                for (var i in items){
                                    var slotItemId = items[i].itemid
                                    if (activatebilityallslots == 1){
                                        items[i].ability1 = true
                                    }
                                    if (activatebilityallslots == 2){
                                        items[i].ability2 = true
                                    }
                                    if (activatebilityallslots == 3){
                                        items[i].specialability = true
                                    }
                                    if (activatebilityallslots == 4){
                                        items[i].passiveability = true
                                    }
                                }
                            }
                            for (var i in items){
                                var slotItemId = items[i].itemid
                                var singleItemString = items[i].ability1 || items[i].ability2 || items[i].specialability || items[i].passiveability ? "**Abilities**: " : "";
                                if (items[i].ability1){
                                    if (itemsAvailable[slotItemId].ability1){
                                        abilities.push(itemsAvailable[slotItemId].ability1);
                                        singleItemString = singleItemString + itemsAvailable[slotItemId].ability1 + ","
                                    }  
                                }
                                if (items[i].ability2){
                                    if (itemsAvailable[slotItemId].ability2){
                                        abilities.push(itemsAvailable[slotItemId].ability2);
                                        singleItemString = singleItemString + itemsAvailable[slotItemId].ability2 + ","
                                    }
                                }
                                if (items[i].specialability){
                                    if (itemsAvailable[slotItemId].specialability){
                                        abilities.push(itemsAvailable[slotItemId].specialability)
                                        singleItemString = singleItemString + itemsAvailable[slotItemId].specialability + ","
                                    }
                                }
                                if (items[i].passiveability){
                                    if (itemsAvailable[slotItemId].passiveability){
                                        abilities.push(itemsAvailable[slotItemId].passiveability);
                                        singleItemString = singleItemString + itemsAvailable[slotItemId].passiveability + ","
                                    }
                                }
                                singleItemString = singleItemString = singleItemString + "\n"

                                var hpPlus = itemsAvailable[slotItemId].hpplus ? itemsAvailable[slotItemId].hpplus : 0;
                                var attackDmgPlus = itemsAvailable[slotItemId].attackdmgplus ? itemsAvailable[slotItemId].attackdmgplus : 0;
                                var magicDmgPlus = itemsAvailable[slotItemId].magicdmgplus ? itemsAvailable[slotItemId].magicdmgplus : 0;
                                var armorPlus = itemsAvailable[slotItemId].armorplus ? itemsAvailable[slotItemId].armorplus : 0;
                                var spiritPlus = itemsAvailable[slotItemId].spiritplus ? itemsAvailable[slotItemId].spiritplus : 0;
                                var critPlus = itemsAvailable[slotItemId].critplus ? itemsAvailable[slotItemId].critplus : 0;
                                var luckPlus = itemsAvailable[slotItemId].luckplus ? itemsAvailable[slotItemId].luckplus : 0;
                                // check for an amulet for this item
                                if (userArmamentForItemId[slotItemId]){
                                    // HAVE armament for this item - add the stats to the item
                                    hpPlus = hpPlus + userArmamentForItemId[slotItemId].hpplus;
                                    attackDmgPlus = attackDmgPlus + userArmamentForItemId[slotItemId].adplus;
                                    magicDmgPlus = magicDmgPlus + userArmamentForItemId[slotItemId].mdplus;
                                    armorPlus = armorPlus + userArmamentForItemId[slotItemId].armorplus;
                                    spiritPlus = spiritPlus + userArmamentForItemId[slotItemId].spiritplus;
                                    critPlus = critPlus + userArmamentForItemId[slotItemId].critplus;
                                    luckPlus = luckPlus + userArmamentForItemId[slotItemId].luckplus;
                                }

                                statisticsFromItemsAndLevel.hpPlus = statisticsFromItemsAndLevel.hpPlus + hpPlus;
                                statisticsFromItemsAndLevel.attackDmgPlus = statisticsFromItemsAndLevel.attackDmgPlus + attackDmgPlus;
                                statisticsFromItemsAndLevel.magicDmgPlus = statisticsFromItemsAndLevel.magicDmgPlus + magicDmgPlus;
                                statisticsFromItemsAndLevel.armorPlus = statisticsFromItemsAndLevel.armorPlus + armorPlus;
                                statisticsFromItemsAndLevel.spiritPlus = statisticsFromItemsAndLevel.spiritPlus + spiritPlus;
                                statisticsFromItemsAndLevel.critPlus = statisticsFromItemsAndLevel.critPlus + critPlus;
                                statisticsFromItemsAndLevel.luckPlus = statisticsFromItemsAndLevel.luckPlus + luckPlus;

                                singleItemString = singleItemString + "**Stats**: ";
                                singleItemString = singleItemString + " 💚 " + hpPlus;
                                singleItemString = singleItemString + " :dagger: " + attackDmgPlus;
                                singleItemString = singleItemString + " :comet: " + magicDmgPlus;
                                singleItemString = singleItemString + " :shield: " + armorPlus;
                                singleItemString = singleItemString + " 🙌 " + spiritPlus;
                                singleItemString = singleItemString + " 💥 " + critPlus;
                                singleItemString = singleItemString + " 🌟 " + luckPlus;

                                // add to map
                                singleItemsStrings[itemsAvailable[slotItemId].itemname] = singleItemString;
                            }

                            // stats from amulets
                            var amuletString = "";
                            var amuletHpPlus = 0;
                            var amuletAttackDmgPlus = 0;
                            var amuletMagicDmgPlus = 0;
                            var amuletSpiritPlus = 0;
                            var amuletArmorPlus = 0;
                            var amuletCritPlus = 0;
                            var amuletLuckPlus = 0;
                            for (var i in userAmuletData){
                                singleItemString = singleItemString + "\n"

                                var hpPlus = itemsAvailable[userAmuletData[i].id].hpplus ? itemsAvailable[userAmuletData[i].id].hpplus * userAmuletData[i].count : 0;
                                var attackDmgPlus = itemsAvailable[userAmuletData[i].id].attackdmgplus ? itemsAvailable[userAmuletData[i].id].attackdmgplus * userAmuletData[i].count : 0;
                                var magicDmgPlus = itemsAvailable[userAmuletData[i].id].magicdmgplus ? itemsAvailable[userAmuletData[i].id].magicdmgplus * userAmuletData[i].count : 0;
                                var armorPlus = itemsAvailable[userAmuletData[i].id].armorplus ? itemsAvailable[userAmuletData[i].id].armorplus * userAmuletData[i].count : 0;
                                var spiritPlus = itemsAvailable[userAmuletData[i].id].spiritplus ? itemsAvailable[userAmuletData[i].id].spiritplus * userAmuletData[i].count : 0;
                                var critPlus = itemsAvailable[userAmuletData[i].id].critplus ? itemsAvailable[userAmuletData[i].id].critplus * userAmuletData[i].count : 0;
                                var luckPlus = itemsAvailable[userAmuletData[i].id].luckplus ? itemsAvailable[userAmuletData[i].id].luckplus * userAmuletData[i].count : 0;
                                amuletHpPlus = amuletHpPlus + hpPlus;
                                amuletAttackDmgPlus = amuletAttackDmgPlus + attackDmgPlus
                                amuletMagicDmgPlus = amuletMagicDmgPlus + magicDmgPlus;
                                amuletSpiritPlus = amuletSpiritPlus + spiritPlus;
                                amuletArmorPlus = amuletArmorPlus + armorPlus;
                                amuletCritPlus = amuletCritPlus + critPlus;
                                amuletLuckPlus = amuletLuckPlus + luckPlus;

                                statisticsFromItemsAndLevel.hpPlus = statisticsFromItemsAndLevel.hpPlus + hpPlus;
                                statisticsFromItemsAndLevel.attackDmgPlus = statisticsFromItemsAndLevel.attackDmgPlus + attackDmgPlus;
                                statisticsFromItemsAndLevel.magicDmgPlus = statisticsFromItemsAndLevel.magicDmgPlus + magicDmgPlus;
                                statisticsFromItemsAndLevel.armorPlus = statisticsFromItemsAndLevel.armorPlus + armorPlus;
                                statisticsFromItemsAndLevel.spiritPlus = statisticsFromItemsAndLevel.spiritPlus + spiritPlus;
                                statisticsFromItemsAndLevel.critPlus = statisticsFromItemsAndLevel.critPlus + critPlus
                                statisticsFromItemsAndLevel.luckPlus = statisticsFromItemsAndLevel.luckPlus + luckPlus;

                            }
                            // stats from amulets
                            amuletString = amuletString + "**Amulet Stats**: ";
                            amuletString = amuletString + " 💚 " + amuletHpPlus;
                            amuletString = amuletString + " :dagger: " + amuletAttackDmgPlus;
                            amuletString = amuletString + " :comet: " + amuletMagicDmgPlus;
                            amuletString = amuletString + " :shield: " + amuletArmorPlus;
                            amuletString = amuletString + " 🙌 " + amuletSpiritPlus;
                            amuletString = amuletString + " 🙌 " + amuletCritPlus;
                            amuletString = amuletString + " 🌟 " + amuletLuckPlus;
                            if (userAmuletData.length > 0){
                                singleItemsStrings['Amulets'] = amuletString
                            }
                            // added stats from level
                            statisticsFromItemsAndLevel.hpPlus = statisticsFromItemsAndLevel.hpPlus + userStats.level
                            statisticsFromItemsAndLevel.attackDmgPlus = statisticsFromItemsAndLevel.attackDmgPlus + userStats.level
                            statisticsFromItemsAndLevel.magicDmgPlus = statisticsFromItemsAndLevel.magicDmgPlus + userStats.level
                            statisticsFromItemsAndLevel.armorPlus = statisticsFromItemsAndLevel.armorPlus + userStats.level
                            statisticsFromItemsAndLevel.spiritPlus = statisticsFromItemsAndLevel.spiritPlus + userStats.level
                            // statisticsFromItemsAndLevel.critPlus = statisticsFromItemsAndLevel.critPlus
                            
                            let usingBakeEmoji = ""
                            for (var i in userTemporaryBuffData){
                                var hppluspercentage = itemsAvailable[userTemporaryBuffData[i].id].hppluspercentage ? itemsAvailable[userTemporaryBuffData[i].id].hppluspercentage : 0
                                var attackdmgpluspercentage = itemsAvailable[userTemporaryBuffData[i].id].attackdmgpluspercentage ? itemsAvailable[userTemporaryBuffData[i].id].attackdmgpluspercentage : 0
                                var magicdmgpluspercentage = itemsAvailable[userTemporaryBuffData[i].id].magicdmgpluspercentage ? itemsAvailable[userTemporaryBuffData[i].id].magicdmgpluspercentage : 0
                                var armorpluspercentage = itemsAvailable[userTemporaryBuffData[i].id].armorpluspercentage ? itemsAvailable[userTemporaryBuffData[i].id].armorpluspercentage : 0
                                var spiritpluspercentage = itemsAvailable[userTemporaryBuffData[i].id].spiritpluspercentage ? itemsAvailable[userTemporaryBuffData[i].id].spiritpluspercentage : 0
                                var critpluspercentage = itemsAvailable[userTemporaryBuffData[i].id].critpluspercentage ? itemsAvailable[userTemporaryBuffData[i].id].critpluspercentage : 0
                                var luckpluspercentage = itemsAvailable[userTemporaryBuffData[i].id].luckpluspercentage ? itemsAvailable[userTemporaryBuffData[i].id].luckpluspercentage : 0
                                
                                hppluspercentage = hppluspercentage / 100
                                attackdmgpluspercentage = attackdmgpluspercentage / 100
                                magicdmgpluspercentage = magicdmgpluspercentage / 100
                                armorpluspercentage = armorpluspercentage / 100
                                spiritpluspercentage = spiritpluspercentage / 100
                                critpluspercentage = critpluspercentage / 100
                                luckpluspercentage = luckpluspercentage / 100
                                
                                statisticsFromItemsAndLevel.hpPlusPercentage = hppluspercentage;
                                statisticsFromItemsAndLevel.attackDmgPlusPercentage = attackdmgpluspercentage;
                                statisticsFromItemsAndLevel.magicDmgPlusPercentage = magicdmgpluspercentage;
                                statisticsFromItemsAndLevel.armorPlusPercentage = armorpluspercentage;
                                statisticsFromItemsAndLevel.spiritPlusPercentage = spiritpluspercentage;
                                statisticsFromItemsAndLevel.critPlusPercentage = critpluspercentage;
                                statisticsFromItemsAndLevel.luckPlusPercentage = luckpluspercentage;
                                usingBakeEmoji = ":cake:"
                            }

                            var partyMemberStats = {
                                level: userStats.level,
                                rpglevel: userStats.rpglevel,
                                plusStats: statisticsFromItemsAndLevel,
                                itemsBeingWorn: items,
                                abilities: abilities
                            }

                            var partyMemberHpPlus =  0
                            var partyMemberAttackDmgPlus =  0
                            var partyMemberMagicDmgPlus =  0
                            var partyMemberArmorPlus =  0
                            var partyMemberSpiritPlus = 0
                            var partyMemberCritPlus = 0
                            var partyMemberLuckPlus = 0
                            if (partyMemberStats && partyMemberStats.plusStats){
                                partyMemberHpPlus = partyMemberStats.plusStats.hpPlus ? partyMemberStats.plusStats.hpPlus : 0
                                partyMemberAttackDmgPlus = partyMemberStats.plusStats.attackDmgPlus ? partyMemberStats.plusStats.attackDmgPlus : 0
                                partyMemberMagicDmgPlus = partyMemberStats.plusStats.magicDmgPlus ? partyMemberStats.plusStats.magicDmgPlus : 0
                                partyMemberArmorPlus = partyMemberStats.plusStats.armorPlus ? partyMemberStats.plusStats.armorPlus : 0
                                partyMemberSpiritPlus = partyMemberStats.plusStats.spiritPlus ? partyMemberStats.plusStats.spiritPlus : 0
                                partyMemberCritPlus = partyMemberStats.plusStats.critPlus ? partyMemberStats.plusStats.critPlus : 0
                                partyMemberLuckPlus = partyMemberStats.plusStats.luckPlus ? partyMemberStats.plusStats.luckPlus: 0
                            }
                            var playerName = message.author.username.length <= 35 ? message.author.username : "default"
                            var myStats = {
                                id: message.author.id,
                                name: playerName,
                                bakeEmoji: usingBakeEmoji,
                                username: message.author.username,
                                hp: 250 + (7 *  partyMemberStats.level ) + (20 *  partyMemberStats.rpglevel ) + partyMemberHpPlus,
                                attackDmg: 10 + (2 * partyMemberStats.level) + (7 * partyMemberStats.rpglevel ) + partyMemberAttackDmgPlus,
                                magicDmg:  10 + (2 * partyMemberStats.level) + (7 * partyMemberStats.rpglevel ) + partyMemberMagicDmgPlus,
                                armor: 5 + Math.floor((partyMemberStats.level * partyMemberStats.level) / 2) + Math.floor((partyMemberStats.rpglevel * partyMemberStats.rpglevel) / 2 ) + partyMemberArmorPlus,
                                spirit: 5 + Math.floor((partyMemberStats.level * partyMemberStats.level) / 2)+ Math.floor((partyMemberStats.rpglevel * partyMemberStats.rpglevel) / 2 ) + partyMemberSpiritPlus,
                                criticalChance: partyMemberCritPlus,
                                luck: partyMemberLuckPlus,
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
                            myStats.hp = myStats.hp + Math.floor( myStats.hp * partyMemberStats.plusStats.hpPlusPercentage || 0)
                            myStats.attackDmg = myStats.attackDmg + Math.floor( myStats.attackDmg * partyMemberStats.plusStats.attackDmgPlusPercentage || 0)
                            myStats.magicDmg = myStats.magicDmg + Math.floor( myStats.magicDmg * partyMemberStats.plusStats.magicDmgPlusPercentage || 0)
                            myStats.spirit = myStats.spirit + Math.floor( myStats.spirit * partyMemberStats.plusStats.spiritPlusPercentage || 0)
                            myStats.armor = myStats.armor + Math.floor( myStats.armor * partyMemberStats.plusStats.armorPlusPercentage || 0)
                            myStats.criticalChance = myStats.criticalChance + Math.floor( myStats.criticalChance * partyMemberStats.plusStats.critPlusPercentage || 0)
                            myStats.luck = myStats.luck + Math.floor( myStats.luck * partyMemberStats.plusStats.luckPlusPercentage || 0)

                            myStats.criticalChance = calculateCritChance( myStats.criticalChance )
                            myStats.luck = calculateLuckPlus( myStats.luck )
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
                                        if (rpgAbilities[partyMemberStats.abilities[ability]].status){
                                            var passiveAbilityStatus = JSON.parse(JSON.stringify( rpgAbilities[partyMemberStats.abilities[ability]].status ));
                                            myStats.statuses.push(passiveAbilityStatus);
                                            myStats.passiveAbilities.push(passiveAbilityStatus);
                                            myStats.abilitiesMap[passiveAbilityStatus.name] = passiveAbilityStatus;    
                                        }
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
                            }else{
                                now = new Date(now.setMinutes(now.getMinutes()));
                                var numberOfHours = getDateDifference(userData.data.lastrpgtime, now, RPG_COOLDOWN_HOURS);
                                rpgTimeLeft = " `" + numberOfHours +"` left on cooldown";
                            }
                            const embed = new Discord.RichEmbed()
                            //.setThumbnail("https://media.giphy.com/media/mIZ9rPeMKefm0/giphy.gif")
                            .setColor(0xF2E93E)
                            
                            var playerString = userStatsStringBuilder(myStats, message.author.username, false, 0);
                            playerString = playerString + "\nTime remaining: " + rpgTimeLeft;
                            var userAreaId =  userData.data.currentarea 
                            var zoneUserIsIn = getRpgZone(userAreaId)
                            var userAreaName = rpgZones[zoneUserIsIn].areas[userAreaId].name
                            var userZoneName = rpgZones[zoneUserIsIn].name
                            
                            embed.addField( message.author.username, playerString )
                            if (userAreaId){
                                embed.addField( "Adventure Whereabouts", userZoneName + " - " + userAreaName )
                            }
                            // set the item strings
                            for (var s in singleItemsStrings){
                                embed.addField( s, singleItemsStrings[s] )
                            }
                            message.channel.send({embed})
                            .then(function(res){
                                // console.log(res)
                            })
                            .catch(function(err){
                                // console.log(err)
                                message.channel.send("Unable to display rpg stats embed, Enable embeds in this channel for RPG stats announcements!")
                            })
                        }
                    })
                }
            })
        }
    })
}

module.exports.pvpReady = function(message, itemsAvailable, amuletItemsById){
    // same thing as rpgReady except - > 
    // add items to activeRPGItemIds list
    // add users to being in an event usersInRPGEvents
    // activePVPEvents will hold 2 teams, both teams will be users, unlike rpg which is one team of users, one team of enemies
    // the embed should send 1 message if all players are in the same channel OR to 2 separate channels
    // the channels are determined by where the user started the pvp event
    // no cooldown
    // rating change after event is over
    // need a queue system where the players are instantly matched up against people
    // the embed will show only the players stats, not abilities
    // the turn will end after 30 seconds
    // players go in order based on a predetermined order
    // skipping will clear the user, and 
    // abilities are processed as a pvp ability instead of an RPG ability (looks against a player, not an enemy)
    // reusable functions additionalDamageAD, additionalDamageMD, getDamageToReduceFromArmor, getDamageToReduceFromSpirit
    // healTarget, dealDamageTo, recalculateStatBuffs
    // recreate PVP functions for validateTarget, usePVPability, processPVPturn, calculateDamageReduced, checkRpgEventEnd
    // processAbility, processPVPTurn
    // add if pvp statement to turnfinishedEmbedBuilder, 
}

var initializeLock = {}

module.exports.setInitializeLock = function( discordUserId, set){
    if (initializeLock[discordUserId]){
        initializeLock[discordUserId] = set
    }else{
        initializeLock[discordUserId] = {}
        initializeLock[discordUserId] = set
    }
}

module.exports.isTeamLocked = function(members){
    let teamLocked = false
    members.forEach(function(member){
        let memberIsLocked = exports.getinitializeLock(member.id)
        if (memberIsLocked == true){
            teamLocked = true
        }
    })
    return teamLocked
}

module.exports.getinitializeLock = function(discordUserId){
    if (initializeLock[discordUserId]){
        let locked = false
        if (initializeLock[discordUserId] == true){
            locked = true
        }
        return locked
    }else{
        return false
    }
}

var readyLock = {}

module.exports.setreadyLock = function(activeRPGEvent, discordUserId, set){
    if (readyLock[activeRPGEvent]){
        readyLock[activeRPGEvent][discordUserId] = set
    }else{
        readyLock[activeRPGEvent] = {}
        readyLock[activeRPGEvent][discordUserId] = set
    }
}

module.exports.getreadyLock = function(activeRPGEvent){
    if (readyLock[activeRPGEvent]){
        let locked = false
        for (var member in readyLock[activeRPGEvent]){
            if (readyLock[activeRPGEvent][member] == true){
                locked = true
            }
        }
        return locked
    }else{
        return false
    }
}

module.exports.getReadyLockUser = function(activeRPGEvent, discordUserId){
    if (readyLock[activeRPGEvent]){
        let locked = false
        for (var member in readyLock[activeRPGEvent]){
            if (member == discordUserId){
                if (readyLock[activeRPGEvent][member] == true){
                    locked = true
                }
            }
        }
        return locked
    }else{
        return false
    }
}

module.exports.removeUserFromQueue = function(message){
    let discordUserId = message.author.id
    removeUserFromQueue(discordUserId)
    message.channel.send("You have been removed from the RPG queue")
}

module.exports.initializeRPGQueue = function(){
    serverQueue = setInterval(function(){ 
        if (rpgQueuesByUsers.length > 1){
            while(rpgQueuesByUsers.length > 1){
                rpgQueuesByUsers = _.shuffle(rpgQueuesByUsers)
                let queueSize = rpgQueuesByUsers.length
                let teamInQueueByDiscordIds = []
                let areasForUsers = []
                let groupOfMessagesSent = []
                if (queueSize > 5){
                    queueSize = 5
                }
                let rpgEventId = undefined;
                for (var i = 0; i < queueSize; i++){
                    let userObjectToEnterRPG = rpgQueuesByUsers.shift()
                    // announce in the users channel that their rpg is ready
                    let channelToAnnounceIn = userObjectToEnterRPG.channelToAnnounceIn
                    if (rpgEventId == undefined){
                        rpgEventId = userObjectToEnterRPG.uniqueMessageId
                    }
                    let authorToPing = userObjectToEnterRPG.author
                    let userId = userObjectToEnterRPG.discordUserId
                    let userarea = userObjectToEnterRPG.userArea
                    channelToAnnounceIn.send(authorToPing + " Your rpg event is ready, type `-ready` to begin, or `-skip` to skip! you have 60 seconds until you are automatically skipped")
                    .then(function(sentMessage){
                        groupOfMessagesSent.push(sentMessage)
                    })
                    .catch(function(error){
                        channelToAnnounceIn.send("error " + error)
                    })
                    usersInRPGEvents["rpg-"+userId] = { id: rpgEventId, ready: false }; // basing off of a unique message Id
                    teamInQueueByDiscordIds.push(authorToPing)
                    areasForUsers.push(userarea)
                }
                let userToUseAreaIndex = Math.floor(Math.random() * areasForUsers.length);
                let userToUseAreaId = areasForUsers[userToUseAreaIndex]
                activeRPGEvents["rpg-" + rpgEventId] = { members: teamInQueueByDiscordIds };
                activeRPGEvents["rpg-" + rpgEventId].status = "waiting";
                activeRPGEvents["rpg-" + rpgEventId].groupOfMessagesSent = groupOfMessagesSent;
                activeRPGEvents["rpg-" + rpgEventId].endOfTurnEvents = [];
                activeRPGEvents["rpg-" + rpgEventId].area = userToUseAreaId
                activeRPGEvents["rpg-" + rpgEventId].usersInArea = []
                activeRPGEvents["rpg-" + rpgEventId].queueEvent = true;
            }
        }else{
            // console.log(rpgQueuesByUsers.length)
        }
        
    }, 65000);
}

module.exports.enterUserToQueue = function(message, userArea){
    // user can enter the queue at any time, then they will be notified that their rpg is ready
    // only allow 2-5
    let discordUserId = message.author.id
    // check the user is not already in an rpg
    var ableToJoinQueue = true
    if (usersInRPGEvents["rpg-"+discordUserId]){
        ableToJoinQueue = false;
    }
    if (checkIfUserInQueue(discordUserId)){
        ableToJoinQueue = false
    }
    if (ableToJoinQueue){
        rpgQueuesByUsers.push({
            discordUserId: discordUserId,
            author: message.author,
            userArea: userArea,
            channelToAnnounceIn: message.channel,
            uniqueMessageId: message.id
        })
        // check if the queue is full and there is enough to start
        message.channel.send("You have entered the queue for an rpg event there are currently `" + rpgQueuesByUsers.length + "` users in the queue, your event will begin as soon as there are enough users!")
        
    }else{
        message.channel.send("You cannot join the queue at this time, you may be in queue or in an rpg event already, type `-rpgleave` to be removed from the queue, or `-rpgskip` to skip the event ")
    }
    
}

module.exports.rpgReady = function(message, itemsAvailable, amuletItemsById, buffItemsById, allItems){
    // create an embed saying that b is about to happen, for users MAX of 5 users and they must all say -ready to start costs 5 tacos per person
    var discordUserId = message.author.id;
    var idOfUserInEvent = usersInRPGEvents["rpg-" + discordUserId] ? usersInRPGEvents["rpg-" + discordUserId].id : undefined;
    if ( usersInRPGEvents["rpg-" + discordUserId]
    && usersInRPGEvents["rpg-" + discordUserId].ready != true
    && !exports.getReadyLockUser(idOfUserInEvent, discordUserId) ){
        // message.channel.send( message.author + " is ready");
        var readyString = message.author.username + " is ready"
        var rpgEventId = usersInRPGEvents["rpg-" + discordUserId].id;
        // get the user's profile and get the user's wearing
        // lock the RPG event so that skipping doesnt cause users to lock their rpg items
        if (activeRPGEvents[ "rpg-" +  rpgEventId ] 
        && activeRPGEvents[ "rpg-" +  rpgEventId ].queueEvent
        && activeRPGEvents[ "rpg-" +  rpgEventId ].groupOfMessagesSent
        && activeRPGEvents[ "rpg-" +  rpgEventId ].groupOfMessagesSent.length == 0){
            message.channel.send(message.author + " - Still setting up the event. Try again!")
        }else{
            exports.setreadyLock(rpgEventId, discordUserId, true)
            profileDB.getUserRpgProfleData(discordUserId, function(err, userData){
                if (err){
                    // console.log(err);
                    exports.setreadyLock(rpgEventId, discordUserId, false)
                    message.channel.send("You must agree to Bender's terms by typing -agree before rpging!");
                }else{

                    var now = new Date();
                    var oneHourAgo = new Date();
                    var extraPetHelp = false
                    if (userData.data.templelevel >= RPG_TEMPLE_LEVEL_PET){
                        extraPetHelp = true
                    }
                    var isSpecialEvent = activeRPGEvents[ "rpg-" +  rpgEventId ] ? activeRPGEvents[ "rpg-" + rpgEventId ].special : false;
                    let isQueueEvent = activeRPGEvents[ "rpg-" +  rpgEventId ].queueEvent
                    var currentPlayerChallenge = userData.data.currentchallenge || 0 ;
                    var challengePicked = (activeRPGEvents[ "rpg-" +  rpgEventId ] && activeRPGEvents[ "rpg-" +  rpgEventId ].challenge) ? activeRPGEvents[ "rpg-" + rpgEventId ].challenge.challenge : false;
                    var challengeId = getKeystoneIdFromChallenge(parseInt( challengePicked ))
                    var currentPlayerKeystone = userData.data[challengeId] || 0;
                    var keystonePicked = (activeRPGEvents[ "rpg-" +  rpgEventId ] && activeRPGEvents[ "rpg-" +  rpgEventId ].challenge) ? activeRPGEvents[ "rpg-" + rpgEventId ].challenge.keystone : false;
                    if ((currentPlayerChallenge + 1) >= (parseInt( challengePicked ) )
                    && (currentPlayerKeystone) >= (parseInt( keystonePicked ) ) 
                    && (parseInt( challengePicked ) ) > 0 
                    && (parseInt( challengePicked ) ) <= CURRENT_CHALLENGES_AVAILABLE ){
                        activeRPGEvents[ "rpg-" +  rpgEventId ].challenge.valid = true;
                    }
                    var myRpgArea = userData.data.currentarea
                    
                    if (activeRPGEvents[ "rpg-" +  rpgEventId ]
                    && activeRPGEvents[ "rpg-" +  rpgEventId ].area 
                    && activeRPGEvents[ "rpg-" +  rpgEventId ].area == myRpgArea
                    && activeRPGEvents[ "rpg-" +  rpgEventId ].usersInArea){
                        var currentareacompletion = userData.data[myRpgArea] || 0
                        activeRPGEvents["rpg-" + rpgEventId].usersInArea.push({
                            userid: discordUserId,
                            currentareacompletion: currentareacompletion,
                            userdata: userData.data,
                            username: message.author.username
                        })
                    }
                    oneHourAgo = new Date(oneHourAgo.setHours(oneHourAgo.getHours() - RPG_COOLDOWN_HOURS ));
                    var lastrpgtime = userData.data.lastrpgtime;
                    if ((lastrpgtime && oneHourAgo > lastrpgtime)
                    || isSpecialEvent 
                    || !lastrpgtime
                    || !challengePicked
                    || challengePicked >= CHALLENGE_TO_TEST){
                        // get the user profile data
                        var userStats = userData.data;
                        // console.log("START " + start)
                        profileDB.getUserItemsForRpg(discordUserId, function(err, inventoryResponse){
                            if (err){
                                exports.setreadyLock(rpgEventId, discordUserId, false)
                                // console.log(err);
                            }else{
                                // console.log("DONE " + done)
                                // console.log("millis " + ( done - start))
                                // get all the data for each item
                                var itemsInInventoryCountMap = {};
                                var userArmamentForItemId = {}
                                for (var item in inventoryResponse.data){
                                    if (!itemsInInventoryCountMap[inventoryResponse.data[item].itemid] ){
                                        // item hasnt been added to be counted, add it as 1
                                        itemsInInventoryCountMap[inventoryResponse.data[item].itemid] = 1;
                                    }else{
                                        itemsInInventoryCountMap[inventoryResponse.data[item].itemid] = itemsInInventoryCountMap[inventoryResponse.data[item].itemid] + 1
                                    }
                                }
                                for (var arm in inventoryResponse.data){
                                    if (inventoryResponse.data[arm].armamentforitemid 
                                    && !userArmamentForItemId[inventoryResponse.data[arm].armamentforitemid]){
                                        userArmamentForItemId[inventoryResponse.data[arm].armamentforitemid] = inventoryResponse.data[arm]
                                    }
                                }
                                // have items mapped by id and items in inventory
                                // check if i have any of all the possible amulet items
                                var userAmuletData = []
                                for (var amulet in amuletItemsById){
                                    var idToCheck = amuletItemsById[amulet].id;
                                    if (itemsInInventoryCountMap[idToCheck]){
                                        var amuletToAdd = amuletItemsById[amulet]
                                        amuletToAdd.count = itemsInInventoryCountMap[idToCheck]        
                                        userAmuletData.push(amuletItemsById[amulet]);
                                    }
                                }
                                var userTemporaryBuffData = []
                                for (var buffItem in buffItemsById){
                                    var idToCheck = buffItemsById[buffItem].id
                                    var buffTime = userStats.rpgbuffactivatetime
                                    var now = new Date()
                                    if (now <= buffTime){
                                        // buff is still active
                                        if (userStats.rpgbuffitemid == idToCheck){
                                            // add the buff to the stats
                                            userTemporaryBuffData.push(buffItemsById[buffItem])
                                        }
                                    }
                                }

                                profileDB.getUserWearInfo(discordUserId, function(wearErr, wearData){
                                    if (wearErr){
                                        // console.log(wearErr);
                                        exports.setreadyLock(rpgEventId, discordUserId, false)
                                        message.channel.send(wearErr + " something went wrong [wearing] - someone doesn't have a wearing profile");
                                    }else{
                                        var userLevel = userStats.level;
                                        wearStats.getUserWearingStats(message, discordUserId, { userLevel: userLevel, inventoryResponse: inventoryResponse }, allItems, function(wearErr, wearRes){
                                            if (wearErr){
                                                exports.setreadyLock(rpgEventId, discordUserId, false)
                                                // console.log(wearErr)
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
                                                    critPlus: 0,
                                                    statuses: [],
                                                    buffs: []
                                                }
                                                
                                                if (wearingStats.slot1itemid){
                                                    // check that the itemid is not already being used
                                                    if (!activeRPGItemIds[wearingStats.slot1useritemid]){
                                                        items.push({
                                                            itemid: wearingStats.slot1itemid,
                                                            ability1: true,
                                                            ability2: true,
                                                            specialability: true,
                                                            passiveability: true
                                                        });
                                                        userItemIds.push(wearingStats.slot1useritemid);
                                                        activeRPGItemIds[wearingStats.slot1useritemid] = true;
                                                    }
                                                }
                                                if (wearingStats.slot2itemid){
                                                    if (!activeRPGItemIds[wearingStats.slot2useritemid]){
                                                        items.push({
                                                            itemid: wearingStats.slot2itemid,
                                                            ability1: true,
                                                            ability2: true,
                                                            specialability: true,
                                                            passiveability: true
                                                        });
                                                        userItemIds.push(wearingStats.slot2useritemid);
                                                        activeRPGItemIds[wearingStats.slot2useritemid] = true;
                                                    }
                                                }
                                                if (wearingStats.slot3itemid){
                                                    if (!activeRPGItemIds[wearingStats.slot3useritemid]){
                                                        items.push({
                                                            itemid: wearingStats.slot3itemid,
                                                            ability1: true,
                                                            ability2: true,
                                                            specialability: true,
                                                            passiveability: true
                                                        });
                                                        userItemIds.push(wearingStats.slot3useritemid);
                                                        activeRPGItemIds[wearingStats.slot3useritemid] = true;
                                                    }
                                                }
                                                if (wearingStats.slot4itemid){
                                                    if (!activeRPGItemIds[wearingStats.slot4useritemid]){
                                                        items.push({
                                                            itemid: wearingStats.slot4itemid,
                                                            ability1: true,
                                                            ability2: true,
                                                            specialability: true,
                                                            passiveability: true
                                                        });
                                                        userItemIds.push(wearingStats.slot4useritemid);
                                                        activeRPGItemIds[wearingStats.slot4useritemid] = true;
                                                    }
                                                }
                                                if (wearingStats.slot5itemid){
                                                    if (!activeRPGItemIds[wearingStats.slot5useritemid]){
                                                        items.push({
                                                            itemid: wearingStats.slot5itemid,
                                                            ability1: false,
                                                            ability2: false,
                                                            specialability: false,
                                                            passiveability: false
                                                        });
                                                        userItemIds.push(wearingStats.slot5useritemid);
                                                        activeRPGItemIds[wearingStats.slot5useritemid] = true;
                                                    }
                                                }
                                                if (wearingStats.slot6itemid){
                                                    if (!activeRPGItemIds[wearingStats.slot6useritemid]){
                                                        items.push({
                                                            itemid: wearingStats.slot6itemid,
                                                            ability1: false,
                                                            ability2: false,
                                                            specialability: false,
                                                            passiveability: false
                                                        });
                                                        userItemIds.push(wearingStats.slot6useritemid);
                                                        activeRPGItemIds[wearingStats.slot6useritemid] = true;
                                                    }
                                                }
                                                if (wearingStats.slot7itemid){
                                                    if (!activeRPGItemIds[wearingStats.slot7useritemid]){
                                                        items.push({
                                                            itemid: wearingStats.slot7itemid,
                                                            ability1: false,
                                                            ability2: false,
                                                            specialability: false,
                                                            passiveability: false
                                                        });
                                                        userItemIds.push(wearingStats.slot7useritemid);
                                                        activeRPGItemIds[wearingStats.slot7useritemid] = true;
                                                    }
                                                }
                                                for (var i in userTemporaryBuffData){
                                                    var activatebilityallslots = itemsAvailable[userTemporaryBuffData[i].id].activatebilityallslots ? itemsAvailable[userTemporaryBuffData[i].id].activatebilityallslots : 0
                                                    for (var i in items){
                                                        var slotItemId = items[i].itemid
                                                        if (activatebilityallslots == 1){
                                                            items[i].ability1 = true
                                                        }
                                                        if (activatebilityallslots == 2){
                                                            items[i].ability2 = true
                                                        }
                                                        if (activatebilityallslots == 3){
                                                            items[i].specialability = true
                                                        }
                                                        if (activatebilityallslots == 4){
                                                            items[i].passiveability = true
                                                        }
                                                    }
                                                }
                                                // added stats from items
                                                for (var i in items){
                                                    let validItem = true;
                                                    if (activeRPGEvents[ "rpg-" +  rpgEventId ].challenge 
                                                    && activeRPGEvents[ "rpg-" +  rpgEventId ].challenge.keystone == 0
                                                    && (currentPlayerChallenge + 1) == activeRPGEvents[ "rpg-" +  rpgEventId ].challenge.challenge){
                                                        // console.log("in challenge without keystone")
                                                        var slotItemId = items[i].itemid
                                                        if (itemsAvailable[slotItemId].rpglevelrequirement >= 40){
                                                            validItem = false
                                                        }
                                                    }
                                                    if (validItem){
                                                        var slotItemId = items[i].itemid
                                                        if (items[i].ability1){
                                                            if (itemsAvailable[slotItemId].ability1){
                                                                abilities.push(itemsAvailable[slotItemId].ability1);
                                                            }
                                                        }
                                                        if (items[i].ability2){
                                                            if (itemsAvailable[slotItemId].ability2){
                                                                abilities.push(itemsAvailable[slotItemId].ability2);
                                                            }
                                                        }
                                                        if (items[i].specialability){
                                                            if (itemsAvailable[slotItemId].specialability){
                                                                abilities.push(itemsAvailable[slotItemId].specialability)
                                                            }
                                                        }
                                                        if (items[i].passiveability){
                                                            if (itemsAvailable[slotItemId].passiveability){
                                                                abilities.push(itemsAvailable[slotItemId].passiveability);
                                                            }
                                                        }
        
                                                        var hpPlus = itemsAvailable[slotItemId].hpplus ? itemsAvailable[slotItemId].hpplus : 0;
                                                        var attackDmgPlus = itemsAvailable[slotItemId].attackdmgplus ? itemsAvailable[slotItemId].attackdmgplus : 0;
                                                        var magicDmgPlus = itemsAvailable[slotItemId].magicdmgplus ? itemsAvailable[slotItemId].magicdmgplus : 0;
                                                        var armorPlus = itemsAvailable[slotItemId].armorplus ? itemsAvailable[slotItemId].armorplus : 0;
                                                        var spiritPlus = itemsAvailable[slotItemId].spiritplus ? itemsAvailable[slotItemId].spiritplus : 0;
                                                        var critPlus = itemsAvailable[slotItemId].critplus ? itemsAvailable[slotItemId].critplus : 0;
                                                        var luckPlus = itemsAvailable[slotItemId].luckplus ? itemsAvailable[slotItemId].luckplus : 0;
                                                        // check for an amulet for this item
                                                        if (userArmamentForItemId[slotItemId]){
                                                            // HAVE armament for this item - add the stats to the item
                                                            hpPlus = hpPlus + userArmamentForItemId[slotItemId].hpplus;
                                                            attackDmgPlus = attackDmgPlus + userArmamentForItemId[slotItemId].adplus;
                                                            magicDmgPlus = magicDmgPlus + userArmamentForItemId[slotItemId].mdplus;
                                                            armorPlus = armorPlus + userArmamentForItemId[slotItemId].armorplus;
                                                            spiritPlus = spiritPlus + userArmamentForItemId[slotItemId].spiritplus;
                                                            critPlus = critPlus + userArmamentForItemId[slotItemId].critplus;
                                                            luckPlus = luckPlus + userArmamentForItemId[slotItemId].luckplus;
                                                        }
                                                        statisticsFromItemsAndLevel.hpPlus = statisticsFromItemsAndLevel.hpPlus + hpPlus;
                                                        statisticsFromItemsAndLevel.attackDmgPlus = statisticsFromItemsAndLevel.attackDmgPlus + attackDmgPlus;
                                                        statisticsFromItemsAndLevel.magicDmgPlus = statisticsFromItemsAndLevel.magicDmgPlus + magicDmgPlus;
                                                        statisticsFromItemsAndLevel.armorPlus = statisticsFromItemsAndLevel.armorPlus + armorPlus;
                                                        statisticsFromItemsAndLevel.spiritPlus = statisticsFromItemsAndLevel.spiritPlus + spiritPlus;
                                                        statisticsFromItemsAndLevel.critPlus = statisticsFromItemsAndLevel.critPlus + critPlus;
                                                        statisticsFromItemsAndLevel.luckPlus = statisticsFromItemsAndLevel.luckPlus + luckPlus;
                                                    }
                                                }

                                                for (var i in userAmuletData){

                                                    var hpPlus = itemsAvailable[userAmuletData[i].id].hpplus ? itemsAvailable[userAmuletData[i].id].hpplus * userAmuletData[i].count : 0;
                                                    var attackDmgPlus = itemsAvailable[userAmuletData[i].id].attackdmgplus ? itemsAvailable[userAmuletData[i].id].attackdmgplus * userAmuletData[i].count : 0;
                                                    var magicDmgPlus = itemsAvailable[userAmuletData[i].id].magicdmgplus ? itemsAvailable[userAmuletData[i].id].magicdmgplus * userAmuletData[i].count : 0;
                                                    var armorPlus = itemsAvailable[userAmuletData[i].id].armorplus ? itemsAvailable[userAmuletData[i].id].armorplus * userAmuletData[i].count : 0;
                                                    var spiritPlus = itemsAvailable[userAmuletData[i].id].spiritplus ? itemsAvailable[userAmuletData[i].id].spiritplus * userAmuletData[i].count : 0;
                                                    var luckPlus = itemsAvailable[userAmuletData[i].id].luckplus ? itemsAvailable[userAmuletData[i].id].luckplus * userAmuletData[i].count : 0;

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


                                                // now include any RPG buffs
                                                for (var i in userTemporaryBuffData){
                                                    var hppluspercentage = itemsAvailable[userTemporaryBuffData[i].id].hppluspercentage ? itemsAvailable[userTemporaryBuffData[i].id].hppluspercentage : 0
                                                    var attackdmgpluspercentage = itemsAvailable[userTemporaryBuffData[i].id].attackdmgpluspercentage ? itemsAvailable[userTemporaryBuffData[i].id].attackdmgpluspercentage : 0
                                                    var magicdmgpluspercentage = itemsAvailable[userTemporaryBuffData[i].id].magicdmgpluspercentage ? itemsAvailable[userTemporaryBuffData[i].id].magicdmgpluspercentage : 0
                                                    var armorpluspercentage = itemsAvailable[userTemporaryBuffData[i].id].armorpluspercentage ? itemsAvailable[userTemporaryBuffData[i].id].armorpluspercentage : 0
                                                    var spiritpluspercentage = itemsAvailable[userTemporaryBuffData[i].id].spiritpluspercentage ? itemsAvailable[userTemporaryBuffData[i].id].spiritpluspercentage : 0
                                                    var critpluspercentage = itemsAvailable[userTemporaryBuffData[i].id].critpluspercentage ? itemsAvailable[userTemporaryBuffData[i].id].critpluspercentage : 0
                                                    var luckpluspercentage = itemsAvailable[userTemporaryBuffData[i].id].luckpluspercentage ? itemsAvailable[userTemporaryBuffData[i].id].luckpluspercentage : 0
                                                    
                                                    hppluspercentage = hppluspercentage / 100
                                                    attackdmgpluspercentage = attackdmgpluspercentage / 100
                                                    magicdmgpluspercentage = magicdmgpluspercentage / 100
                                                    armorpluspercentage = armorpluspercentage / 100
                                                    spiritpluspercentage = spiritpluspercentage / 100
                                                    critpluspercentage = critpluspercentage / 100
                                                    luckpluspercentage = luckpluspercentage / 100
                                                    
                                                    statisticsFromItemsAndLevel.hpPlusPercentage = hppluspercentage;
                                                    statisticsFromItemsAndLevel.attackDmgPlusPercentage = attackdmgpluspercentage;
                                                    statisticsFromItemsAndLevel.magicDmgPlusPercentage = magicdmgpluspercentage;
                                                    statisticsFromItemsAndLevel.armorPlusPercentage = armorpluspercentage;
                                                    statisticsFromItemsAndLevel.spiritPlusPercentage = spiritpluspercentage;
                                                    statisticsFromItemsAndLevel.critPlusPercentage = critpluspercentage;
                                                    statisticsFromItemsAndLevel.luckPlusPercentage = luckpluspercentage;
                                                }

                                                // get the abilities the user will have
                                                // get the extra stats obtained from level, item+ stats, 
                                                // insert the data to the event info to be able to use it once the team is ready
                                                
                                                // check to see if the items are active and
                                                // var experienceFromItems = wearRes.rpgSuccessExtraExperienceGain ? wearRes.rpgSuccessExtraExperienceGain : 0;
                                                var experienceFromItems = wearStats.calculateExtraExperienceGained(wearRes, "rpg", null)
                                                var extraTacosFromItems = wearStats.calculateExtraTacos(wearRes, "rpg"); // 0 or extra
                                                if (!challengePicked){
                                                    // normal rpg reduced exp and extra tacos
                                                    experienceFromItems = Math.floor( experienceFromItems / 20)
                                                    extraTacosFromItems = Math.floor( extraTacosFromItems / 20)
                                                }
                                                if (usersInRPGEvents["rpg-" + discordUserId]){
                                                    usersInRPGEvents["rpg-" + discordUserId].memberStats = {
                                                        level: userStats.level,
                                                        rpglevel: userStats.rpglevel,
                                                        currentchallenge: currentPlayerChallenge,
                                                        currentkeystone: currentPlayerKeystone,
                                                        plusStats: statisticsFromItemsAndLevel,
                                                        itemsBeingWorn: items,
                                                        itemsBeingWornUserIds: userItemIds,
                                                        abilities: abilities,
                                                        extraTacos: extraTacosFromItems,
                                                        extraExperience: experienceFromItems,
                                                        extraPetHelp: extraPetHelp
                                                    }
        
                                                    usersInRPGEvents["rpg-" + discordUserId].ready = true;
                                                    if ( userStats.level >= 20 || challengePicked ){ // under level 20 or doing normal rpg
                                                        usersInRPGEvents["rpg-" + discordUserId].setRPGcooldown = true
                                                    }
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
                                                                        var partyMembersetRPGcooldown = usersInRPGEvents["rpg-" + partyMember.id].setRPGcooldown
                                                                        // if the user is the last user needed to be ready, create the RPG event
                                                                        if (!partyMember.bot){
                                                                            if (challengePicked < CHALLENGE_TO_TEST && partyMembersetRPGcooldown ){
                                                                                profileDB.updateLastRpgTime(partyMember.id, function(updateLSErr, updateLSres){
                                                                                    if(updateLSErr){
                                                                                        // console.log(updateLSErr);
                                                                                    }else{
                                                                                        // console.log(updateLSres)
                                                                                    }
                                                                                })
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                                // if all team members are ready, create the RPG event
                                                                var maxLevelInParty = 1;
                                                                var averageLevelInParty = 0;
                                                                var embedDescription = "do -cast [ability name] [target (1-5 for enemies, @user for group members)] \n example: -cast attack 1 OR -cast tacoheal @bender"
                                                                // create team members list
                                                                // team members get abilities based on their items, 1 ult ability at random
                                                                // create their stats based on their level + items
                                                                // hp, attack dmg, magic dmg, armor
                                                                var membersInParty = {};
                                                                let aliasCount = 1
                                                                for (var member in activeRPGEvents[rpgEvent].members){
                                                                    var partyMember = activeRPGEvents[rpgEvent].members[member];
                                                                    var partyMemberStats = usersInRPGEvents["rpg-"+partyMember.id].memberStats ? usersInRPGEvents["rpg-"+partyMember.id].memberStats : undefined;
                                                                    averageLevelInParty = averageLevelInParty + partyMemberStats.rpglevel;
                                                                    if (partyMemberStats && partyMemberStats.rpglevel > maxLevelInParty){
                                                                        maxLevelInParty = partyMemberStats.rpglevel;
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
                                                                    // console.log("STATISTICS FROM ITEMS N LEVEL" ) 
                                                                    // console.log(JSON.stringify(statisticsFromItemsAndLevel, null, 2))
                                                                    var partyMemberHpPlus =  0
                                                                    var partyMemberAttackDmgPlus =  0
                                                                    var partyMemberMagicDmgPlus =  0
                                                                    var partyMemberArmorPlus =  0
                                                                    var partyMemberSpiritPlus = 0
                                                                    var partyMemberCritPlus = 0
                                                                    var partyMemberLuckPlus = 0
                                                                    if (partyMemberStats && partyMemberStats.plusStats){
                                                                        partyMemberHpPlus = partyMemberStats.plusStats.hpPlus ? partyMemberStats.plusStats.hpPlus : 0
                                                                        partyMemberAttackDmgPlus = partyMemberStats.plusStats.attackDmgPlus ? partyMemberStats.plusStats.attackDmgPlus : 0
                                                                        partyMemberMagicDmgPlus = partyMemberStats.plusStats.magicDmgPlus ? partyMemberStats.plusStats.magicDmgPlus : 0
                                                                        partyMemberArmorPlus = partyMemberStats.plusStats.armorPlus ? partyMemberStats.plusStats.armorPlus : 0
                                                                        partyMemberSpiritPlus = partyMemberStats.plusStats.spiritPlus ? partyMemberStats.plusStats.spiritPlus : 0
                                                                        partyMemberCritPlus = partyMemberStats.plusStats.critPlus ? partyMemberStats.plusStats.critPlus : 0
                                                                        partyMemberLuckPlus = partyMemberStats.plusStats.luckPlus ? partyMemberStats.plusStats.luckPlus: 0
                                                                    }
                                                                    membersInParty["rpg-" + partyMember.id] = {
                                                                        id: partyMember.id,
                                                                        name: partyMember.username,
                                                                        alias: "p" + aliasCount++,
                                                                        username: partyMember.username,
                                                                        hp: 250 + (7 *  partyMemberStats.level ) + (20 *  partyMemberStats.rpglevel ) + partyMemberHpPlus,
                                                                        attackDmg: 10 + (2 * partyMemberStats.level) + (7 * partyMemberStats.rpglevel ) + partyMemberAttackDmgPlus,
                                                                        magicDmg:  10 + (2 * partyMemberStats.level) + (7 * partyMemberStats.rpglevel ) + partyMemberMagicDmgPlus,
                                                                        armor: 5 + Math.floor((partyMemberStats.level * partyMemberStats.level) / 2) + Math.floor((partyMemberStats.rpglevel * partyMemberStats.rpglevel) / 2 ) + partyMemberArmorPlus,
                                                                        spirit: 5 + Math.floor((partyMemberStats.level * partyMemberStats.level) / 2)+ Math.floor((partyMemberStats.rpglevel * partyMemberStats.rpglevel) / 2 ) + partyMemberSpiritPlus,                                                                    
                                                                        criticalChance: partyMemberCritPlus,
                                                                        luck: 1 + partyMemberLuckPlus,
                                                                        abilitiesMap : {},
                                                                        abilities: ["attack"],
                                                                        passiveAbilities: [],
                                                                        statuses: [],
                                                                        auras: [],
                                                                        globalStatuses: {
                                                                            ableToAttack: true,
                                                                            abletotakedamage: true,
                                                                            abletobehealed: true,
                                                                            endofturnenable: true,
                                                                            damageDealtPercentage: 1,
                                                                            damageTakenPercentage: 1,
                                                                            magicDamageTakenPercentage: 1,
                                                                            physicalDamageTakenPercentage: 1,
                                                                            healingDonePercentage: 1,
                                                                            healingTakenPercentage: 1
                                                                        },
                                                                        statBuffs: {
                                                                            hp: 0,
                                                                            attackDmg: 0,
                                                                            magicDmg: 0,
                                                                            armor: 0,
                                                                            spirit: 0,
                                                                            maxhp: 0
                                                                        },
                                                                        buffs: [
                                                                        ]
                                                                    }
                                                                    membersInParty["rpg-" + partyMember.id].hp = membersInParty["rpg-" + partyMember.id].hp + Math.floor( membersInParty["rpg-" + partyMember.id].hp * partyMemberStats.plusStats.hpPlusPercentage || 0)
                                                                    membersInParty["rpg-" + partyMember.id].attackDmg = membersInParty["rpg-" + partyMember.id].attackDmg + Math.floor( membersInParty["rpg-" + partyMember.id].attackDmg * partyMemberStats.plusStats.attackDmgPlusPercentage || 0)
                                                                    membersInParty["rpg-" + partyMember.id].magicDmg = membersInParty["rpg-" + partyMember.id].magicDmg + Math.floor( membersInParty["rpg-" + partyMember.id].magicDmg * partyMemberStats.plusStats.magicDmgPlusPercentage || 0)
                                                                    membersInParty["rpg-" + partyMember.id].spirit = membersInParty["rpg-" + partyMember.id].spirit + Math.floor( membersInParty["rpg-" + partyMember.id].spirit * partyMemberStats.plusStats.spiritPlusPercentage || 0)
                                                                    membersInParty["rpg-" + partyMember.id].armor = membersInParty["rpg-" + partyMember.id].armor + Math.floor( membersInParty["rpg-" + partyMember.id].armor * partyMemberStats.plusStats.armorPlusPercentage || 0)
                                                                    membersInParty["rpg-" + partyMember.id].criticalChance = membersInParty["rpg-" + partyMember.id].criticalChance + Math.floor( membersInParty["rpg-" + partyMember.id].criticalChance * partyMemberStats.plusStats.critPlusPercentage || 0)
                                                                    membersInParty["rpg-" + partyMember.id].luck = membersInParty["rpg-" + partyMember.id].luck + Math.floor( membersInParty["rpg-" + partyMember.id].luck * partyMemberStats.plusStats.luckPlusPercentage || 0)

                                                                    membersInParty["rpg-" + partyMember.id].criticalChance = calculateCritChance( membersInParty["rpg-" + partyMember.id].criticalChance )
                                                                    membersInParty["rpg-" + partyMember.id].luck = calculateLuckPlus( membersInParty["rpg-" + partyMember.id].luck )
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
                                                                                if (rpgAbilities[partyMemberStats.abilities[ability]].status){
                                                                                    var passiveAbilityStatus = JSON.parse(JSON.stringify( rpgAbilities[partyMemberStats.abilities[ability]].status ));
                                                                                    membersInParty["rpg-" + partyMember.id].statuses.push(passiveAbilityStatus);
                                                                                    membersInParty["rpg-" + partyMember.id].passiveAbilities.push(passiveAbilityStatus);
                                                                                    membersInParty["rpg-" + partyMember.id].abilitiesMap[passiveAbilityStatus.name] = passiveAbilityStatus;    
                                                                                }
                                                                            }else{
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
                                                                //membersInParty["rpg-" + partyMember.id + "1"] = JSON.parse(JSON.stringify( membersInParty["rpg-" + partyMember.id] ))
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
                                                                    var keystoneNum = activeRPGEvents[rpgEvent].challenge.keystone;
                                                                    var specialEnemies = enemiesToEncounter.challenge[challengeNum].enemies;
                                                                    if (enemiesToEncounter.challenge[challengeNum].description){
                                                                        embedDescription = enemiesToEncounter.challenge[challengeNum].description;
                                                                    }
                                                                    if (enemiesToEncounter.challenge[challengeNum].timed){
                                                                        activeRPGEvents[rpgEvent].TIMER = enemiesToEncounter.challenge[challengeNum].timedPerTurn
                                                                    }
                                                                    for (var i = 0; i < specialEnemies.length; i++){
                                                                        enemyFound = JSON.parse(JSON.stringify( specialEnemies[i] ));
                                                                        enemies[enemyIdCount] = {
                                                                            id: enemyIdCount,
                                                                            name: enemyFound.name,
                                                                            emoji: enemyFound.emoji,
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
                                                                            globalStatuses: {
                                                                                ableToAttack: true,
                                                                                abletotakedamage: true,
                                                                                abletobehealed: true,
                                                                                endofturnenable: true,
                                                                                damageDealtPercentage: 1,
                                                                                damageTakenPercentage: 1,
                                                                                magicDamageTakenPercentage: 1,
                                                                                physicalDamageTakenPercentage: 1,
                                                                                healingDonePercentage: 1,
                                                                                healingTakenPercentage: 1
                                                                            },
                                                                            difficulty: enemyFound.difficulty,
                                                                            abilities: enemyFound.abilities,
                                                                            effectsOnDeath: enemyFound.effectsOnDeath,
                                                                            abilitiesMap : {},
                                                                            element: enemyFound.element
                                                                        }
        
                                                                        if (keystoneNum > 0){
                                                                            // add stats to enemies TODO: add it to summoned enemies
                                                                            var keystoneStatsArrayIndex = keystoneNum - 1
                                                                            if (enemyFound.keystoneStats){
                                                                                enemies[enemyIdCount].hp = enemies[enemyIdCount].hp  + enemyFound.keystoneStats.hp[keystoneStatsArrayIndex]
                                                                                enemies[enemyIdCount].attackDmg = enemies[enemyIdCount].attackDmg + enemyFound.keystoneStats.attackDmg[keystoneStatsArrayIndex]
                                                                                enemies[enemyIdCount].magicDmg = enemies[enemyIdCount].magicDmg + enemyFound.keystoneStats.magicDmg[keystoneStatsArrayIndex]
                                                                                if (enemyFound.keystoneStats.frenzy){
                                                                                    for (var b in enemies[enemyIdCount].buffs){
                                                                                        if (enemies[enemyIdCount].buffs[b].name == "frenzy"){
                                                                                            enemies[enemyIdCount].buffs[b].onTurnEnd.attackDmgPlus = enemyFound.keystoneStats.frenzy.attackDmgPlus[keystoneStatsArrayIndex]
                                                                                            enemies[enemyIdCount].buffs[b].onTurnEnd.magicDmgPlus = enemyFound.keystoneStats.frenzy.magicDmgPlus[keystoneStatsArrayIndex]
                                                                                        }
                                                                                    }
                                                                                }
                                                                                // replace the lists instead of adding onto them
                                                                                if (enemyFound.keystoneStats.abilities){
        
                                                                                }
                                                                                if (enemyFound.keystoneStats.abilityOrder){
        
                                                                                }
                                                                                if (enemyFound.keystoneStats.endOfTurnEvents){
                                                                                    for (var eventAtEndOfTurn in enemyFound.keystoneStats.endOfTurnEvents){
                                                                                        var endOfTurnEventName =  enemyFound.keystoneStats.endOfTurnEvents[ eventAtEndOfTurn ]
                                                                                        // check it is at the right keystone num
                                                                                        if ( rpgAbilities[ endOfTurnEventName ] ){
                                                                                            var eventToPush = JSON.parse(JSON.stringify( rpgAbilities[ endOfTurnEventName ] ));
                                                                                            if (keystoneNum >= eventToPush.aboveKeystone){
                                                                                                if ( eventToPush.belongsToEvent ){
                                                                                                    activeRPGEvents[rpgEvent].endOfTurnEvents.push( eventToPush );
                                                                                                }else if ( eventToPush.belongsToMember ){
                                                                                                    enemies[enemyIdCount].endOfTurnEvents.push( eventToPush );
                                                                                                }
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                }
                                                                                if (enemyFound.keystoneStats.effectsOnDeath){
                                                                                    
                                                                                }
                                                                            }
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
                                                                                if (rpgAbilities[rpgAbilities[abilityName]].status){
                                                                                    var passiveAbilityStatus = JSON.parse(JSON.stringify( rpgAbilities[rpgAbilities[abilityName]].status ));
                                                                                    enemies[enemyIdCount].statuses.push(passiveAbilityStatus);
                                                                                    enemies[enemyIdCount].passiveAbilities.push(passiveAbilityStatus);
                                                                                    enemies[enemyIdCount].abilitiesMap[passiveAbilityStatus.name] = passiveAbilityStatus;    
                                                                                }
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
        
                                                                        if (challengeNum == 6){
                                                                            // if challenge 6, randomize energy crystal summons
                                                                            var shuffledCrystals =  _.shuffle( JSON.parse(JSON.stringify(enemyFound.crystalCombosToRandomize)));
                                                                            // events already created, just need to push the shuffled crystals
                                                                            for (var eventAtEndOfTurn in enemies[enemyIdCount].endOfTurnEvents){
                                                                                if (enemies[enemyIdCount].endOfTurnEvents[eventAtEndOfTurn].name == shuffledCrystals[0]){
                                                                                    enemies[enemyIdCount].endOfTurnEvents[eventAtEndOfTurn].afterNTurns = 1
                                                                                }
                                                                                if (enemies[enemyIdCount].endOfTurnEvents[eventAtEndOfTurn].name == shuffledCrystals[1]){
                                                                                    enemies[enemyIdCount].endOfTurnEvents[eventAtEndOfTurn].afterNTurns = 11
                                                                                }
                                                                                if (enemies[enemyIdCount].endOfTurnEvents[eventAtEndOfTurn].name == shuffledCrystals[2]){
                                                                                    enemies[enemyIdCount].endOfTurnEvents[eventAtEndOfTurn].afterNTurns = 21
                                                                                }
                                                                                if (enemies[enemyIdCount].endOfTurnEvents[eventAtEndOfTurn].name == shuffledCrystals[3]){
                                                                                    enemies[enemyIdCount].endOfTurnEvents[eventAtEndOfTurn].afterNTurns = 31
                                                                                }
                                                                                if (enemies[enemyIdCount].endOfTurnEvents[eventAtEndOfTurn].name == shuffledCrystals[4]){
                                                                                    enemies[enemyIdCount].endOfTurnEvents[eventAtEndOfTurn].afterNTurns = 41
                                                                                }
                                                                                if (enemies[enemyIdCount].endOfTurnEvents[eventAtEndOfTurn].name == shuffledCrystals[5]){
                                                                                    enemies[enemyIdCount].endOfTurnEvents[eventAtEndOfTurn].afterNTurns = 51
                                                                                }
                                                                            }
                                                                        }else if (challengeNum == 13){
                                                                            let duplicateEOTevents = []
                                                                            if (enemyFound.summonsToRearrangeAndDuplicate){
                                                                                var shuffledSummons = _.shuffle(JSON.parse(JSON.stringify(enemyFound.summonsToRearrangeAndDuplicate)))
                                                                                for (var eventAtEndOfTurn in enemies[enemyIdCount].endOfTurnEvents){
                                                                                    let endOfTurnEventObject = enemies[enemyIdCount].endOfTurnEvents[eventAtEndOfTurn]
                                                                                    if (endOfTurnEventObject.name == shuffledSummons[0]){
                                                                                        endOfTurnEventObject.afterNTurns = 2
                                                                                        var dupEOTEventObject = JSON.parse(JSON.stringify(endOfTurnEventObject))
                                                                                        dupEOTEventObject.afterNTurns = 23
                                                                                        duplicateEOTevents.push(dupEOTEventObject)
                                                                                    }
                                                                                    if (endOfTurnEventObject.name == shuffledSummons[1]){
                                                                                        endOfTurnEventObject.afterNTurns = 9
                                                                                        var dupEOTEventObject = JSON.parse(JSON.stringify(endOfTurnEventObject))
                                                                                        dupEOTEventObject.afterNTurns = 30
                                                                                        duplicateEOTevents.push(dupEOTEventObject)
                                                                                    }
                                                                                    if (endOfTurnEventObject.name == shuffledSummons[2]){
                                                                                        endOfTurnEventObject.afterNTurns = 16
                                                                                        var dupEOTEventObject = JSON.parse(JSON.stringify(endOfTurnEventObject))
                                                                                        dupEOTEventObject.afterNTurns = 37
                                                                                        duplicateEOTevents.push(dupEOTEventObject)
                                                                                    }
                                                                                }
                                                                                enemies[enemyIdCount].endOfTurnEvents = enemies[enemyIdCount].endOfTurnEvents.concat(duplicateEOTevents)
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
                                                                    var specialXp = 0
                                                                    
                                                                    for (var i = 0; i < specialEnemies.length; i++){
                                                                        enemyFound = JSON.parse(JSON.stringify( specialEnemies[i] ));
        
                                                                        enemies[enemyIdCount] = {
                                                                            id: enemyIdCount,
                                                                            name: enemyFound.name,
                                                                            emoji: enemyFound.emoji,
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
                                                                            globalStatuses: {
                                                                                ableToAttack: true,
                                                                                abletotakedamage: true,
                                                                                abletobehealed: true,
                                                                                endofturnenable: true,
                                                                                damageDealtPercentage: 1,
                                                                                damageTakenPercentage: 1,
                                                                                magicDamageTakenPercentage: 1,
                                                                                physicalDamageTakenPercentage: 1,
                                                                                healingDonePercentage: 1,
                                                                                healingTakenPercentage: 1
                                                                            },
                                                                            difficulty: enemyFound.difficulty,
                                                                            abilities: enemyFound.abilities,
                                                                            effectsOnDeath: enemyFound.effectsOnDeath,
                                                                            abilitiesMap : {},
                                                                            element: enemyFound.element
                                                                        }
        
                                                                        if (enemyFound.abilityOrder){
                                                                            enemies[enemyIdCount].abilityOrder = enemyFound.abilityOrder
                                                                        }
                                                                        if (enemyFound.xp){
                                                                            specialXp = specialXp + enemyFound.xp
                                                                        }
        
                                                                        for( var ability in enemies[enemyIdCount].abilities){
                                                                            var abilityName = enemies[enemyIdCount].abilities[ability]
                                                                            if (rpgAbilities[abilityName] && rpgAbilities[abilityName].passive){
                                                                                // add it as a buff and a passive ability
                                                                                var passiveAbilityBuff = JSON.parse(JSON.stringify( rpgAbilities[abilityName].buff ));
                                                                                enemies[enemyIdCount].buffs.push(passiveAbilityBuff);
                                                                                enemies[enemyIdCount].passiveAbilities.push(passiveAbilityBuff);
                                                                                enemies[enemyIdCount].abilitiesMap[passiveAbilityBuff.name] = passiveAbilityBuff;
                                                                                if (rpgAbilities[rpgAbilities[abilityName]].status){
                                                                                    var passiveAbilityStatus = JSON.parse(JSON.stringify( rpgAbilities[rpgAbilities[abilityName]].status ));
                                                                                    enemies[enemyIdCount].statuses.push(passiveAbilityStatus);
                                                                                    enemies[enemyIdCount].passiveAbilities.push(passiveAbilityStatus);
                                                                                    enemies[enemyIdCount].abilitiesMap[passiveAbilityStatus.name] = passiveAbilityStatus;    
                                                                                }
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
                                                                    activeRPGEvents[rpgEvent].special.xp = specialXp
                                                                }
                                                                else{
                                                                    var foundBoss = false;
                                                                    var areaToCheck = activeRPGEvents[rpgEvent].area
                                                                    var zoneUserIsIn = getRpgZone(areaToCheck)
                                                                    var zoneAvatar = rpgZones[zoneUserIsIn].zoneAvatar

                                                                    // FIRST check if the area has predefined enemies, if it doesnt then go for the zone enemies
                                                                    if (rpgZones[zoneUserIsIn].areas[areaToCheck].enemies){
                                                                        let areaEnemies = rpgZones[zoneUserIsIn].areas[areaToCheck].enemies
                                                                        let uniqueEOTevents = []
                                                                        for (var en in areaEnemies){
                                                                            // create the enemy
                                                                            var enemyFound;
                                                                            enemyObj = areaEnemies[en]
                                                                            enemyId = areaEnemies[en].enemyId
                                                                            enemyDifficulty = areaEnemies[en].enemyDifficulty
                                                                            if (enemyId && enemyDifficulty && enemiesToEncounter[enemyDifficulty]){
                                                                                enemyFound = JSON.parse(JSON.stringify( enemiesToEncounter[enemyDifficulty][enemyId] ));
                                                                            }
                                                                            let enemyAreaStatBuffs = rpgZones[zoneUserIsIn].enemyStatBuffs || {}
                                                                            let hpAreaBuff = enemyAreaStatBuffs.hpPlusPercentage || 1
                                                                            let adAreaBuff = enemyAreaStatBuffs.adPlusPercentage || 1
                                                                            let mdAreaBuff = enemyAreaStatBuffs.mdPlusPercentage || 1
                                                                            let armorAreaBuff = enemyAreaStatBuffs.armorPlusPercentage || 1
                                                                            let spiritAreaBuff = enemyAreaStatBuffs.spiritPlusPercentage || 1

                                                                            enemies[enemyIdCount] = {
                                                                                id: enemyIdCount,
                                                                                enemyIdName: enemyFound.enemyIdName,
                                                                                emoji: enemyFound.emoji,
                                                                                name: enemyFound.name,
                                                                                hp: Math.floor( hpAreaBuff * ( enemyFound.hp + (21 * averageLevelInParty) + (enemyFound.hpPerPartyMember * enemyCount)) ) , 
                                                                                attackDmg: Math.floor( adAreaBuff * ( enemyFound.attackDmg + (10 * averageLevelInParty) + (enemyFound.adPerPartyMember * enemyCount)) ), 
                                                                                magicDmg: Math.floor( mdAreaBuff * ( enemyFound.magicDmg + (10 * averageLevelInParty) + (enemyFound.mdPerPartyMember * enemyCount)) ) ,
                                                                                armor: Math.floor( armorAreaBuff * ( enemyFound.armor + (averageLevelInParty * averageLevelInParty)) ),
                                                                                spirit: Math.floor( spiritAreaBuff * ( enemyFound.spirit + ( averageLevelInParty * averageLevelInParty)) ),
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
                                                                                globalStatuses: {
                                                                                    ableToAttack: true,
                                                                                    abletotakedamage: true,
                                                                                    abletobehealed: true,
                                                                                    endofturnenable: true,
                                                                                    damageDealtPercentage: 1,
                                                                                    damageTakenPercentage: 1,
                                                                                    magicDamageTakenPercentage: 1,
                                                                                    physicalDamageTakenPercentage: 1,
                                                                                    healingDonePercentage: 1,
                                                                                    healingTakenPercentage: 1
                                                                                },
                                                                                difficulty: enemyFound.difficulty,
                                                                                abilities: enemyFound.abilities,
                                                                                effectsOnDeath: enemyFound.effectsOnDeath,
                                                                                abilitiesMap : {},
                                                                                element: enemyFound.element
                                                                            }
                                                                            if (enemyAreaStatBuffs.frenzyAdIncreasePercentage){
                                                                                for (var b in enemies[enemyIdCount].buffs){
                                                                                    if (enemies[enemyIdCount].buffs[b].name == "frenzy"){
                                                                                        enemies[enemyIdCount].buffs[b].onTurnEnd.attackDmgPlus = Math.floor( enemies[enemyIdCount].buffs[b].onTurnEnd.attackDmgPlus * enemyAreaStatBuffs.frenzyAdIncreasePercentage)
                                                                                        enemies[enemyIdCount].buffs[b].onTurnEnd.magicDmgPlus = Math.floor(enemies[enemyIdCount].buffs[b].onTurnEnd.magicDmgPlus * enemyAreaStatBuffs.frenzyAdIncreasePercentage)
                                                                                    }
                                                                                }
                                                                            }
                                                                            if (enemyFound.abilityOrder){
                                                                                enemies[enemyIdCount].abilityOrder = enemyFound.abilityOrder
                                                                            }
            
                                                                            if (averageLevelInParty < 12){
                                                                                enemies[enemyIdCount].attackDmg = Math.floor(enemies[enemyIdCount].attackDmg / 2 )
                                                                                enemies[enemyIdCount].magicDmg = Math.floor(enemies[enemyIdCount].magicDmg / 2 )
                                                                            }
            
                                                                            for( var ability in enemies[enemyIdCount].abilities){
                                                                                var abilityName = enemies[enemyIdCount].abilities[ability]
                                                                                if (rpgAbilities[abilityName] && rpgAbilities[abilityName].passive){
                                                                                    // add it as a buff and a passive ability
                                                                                    var passiveAbilityBuff = JSON.parse(JSON.stringify( rpgAbilities[abilityName].buff ));
                                                                                    enemies[enemyIdCount].buffs.push(passiveAbilityBuff);
                                                                                    enemies[enemyIdCount].passiveAbilities.push(passiveAbilityBuff);
                                                                                    enemies[enemyIdCount].abilitiesMap[passiveAbilityBuff.name] = passiveAbilityBuff;
                                                                                    if (rpgAbilities[rpgAbilities[abilityName]].status){
                                                                                        var passiveAbilityStatus = JSON.parse(JSON.stringify( rpgAbilities[rpgAbilities[abilityName]].status ));
                                                                                        enemies[enemyIdCount].statuses.push(passiveAbilityStatus);
                                                                                        enemies[enemyIdCount].passiveAbilities.push(passiveAbilityStatus);
                                                                                        enemies[enemyIdCount].abilitiesMap[passiveAbilityStatus.name] = passiveAbilityStatus;    
                                                                                    }
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
                                                                                    if ( eventToPush.belongsToEvent && uniqueEOTevents.indexOf(endOfTurnEventName) == -1){
                                                                                        activeRPGEvents[rpgEvent].endOfTurnEvents.push( eventToPush );
                                                                                        uniqueEOTevents.push(endOfTurnEventName)
                                                                                    }else if ( eventToPush.belongsToMember ){
                                                                                        enemies[enemyIdCount].endOfTurnEvents.push( eventToPush );
                                                                                    }
                                                                                }
                                                                            }
            
                                                                            enemies[enemyIdCount].maxhp = enemies[enemyIdCount].hp;
                                                                            enemyIdCount++;
                                                                        }
                                                                    }else{
                                                                        let uniqueEOTevents = []
                                                                        for (var i = 1; i <= enemyCount; i++){
                                                                            // roll for enemy rarity, then roll for the actual enemy
                                                                            var rollForRarity;
                                                                            if (!foundBoss){
                                                                                if (averageLevelInParty < 12){
                                                                                    // only easy enemies before level 12
                                                                                    rollForRarity = 3000; 
                                                                                }else if (averageLevelInParty < 17){
                                                                                    // able to get bosses at level 18
                                                                                    rollForRarity = Math.floor(Math.random() * 9650) + 1;
                                                                                }else{
                                                                                    rollForRarity = Math.floor(Math.random() * 10000) + 1;
                                                                                }
                                                                            }else{
                                                                                if (enemyCount > 3){
                                                                                    rollForRarity = Math.floor(Math.random() * 9650) + 1;
                                                                                }else{
                                                                                    rollForRarity = Math.floor(Math.random() * 8250) + 1;
                                                                                }
                                                                            }
                                                                            var enemyFound;
                                                                            /*
                                                                            based on the leaders current zone we'll get enemies based on that
                                                                            anyone in the same zone as leader will be awarded completion
                                                                            can still partifipate in rpg if not in same zone, just no completion
            
                                                                            get the possible enemies for the party based off of rpgzones
                                                                            
                                                                            if success -> advance user +1 on that area - if area complete
                                                                            move them to next zone immediately (linear)
                                                                            area completion is based on number of rpgs completed there
                                                                            if all areas completed in a zone complete the zone
                                                                            zone completion is based on area completion
            
                                                                            zones are locked, only certain zones are available depending on completion 
                                                                            always start in area 1 - can move to next area once completed
                                                                            can go back to that area once completed as well
            
                                                                            how to store on DB?
                                                                            userprofile contains current area by name
                                                                            userrpgprofile contains one row per user, rows are:
                                                                            area1completion
                                                                            area2completion
                                                                            area3completion
                                                                            area4completion
            
                                                                            all integers
            
                                                                            the full completion is calculated on the server, 
                                                                            #ofRpgs to complete are stored server side
                                                                            based on the areas completed we calculate if the zone has been completed
            
                                                                            everytime an rpg in an area gets completed we add 1 to the existing area
                                                                            once an area is completed the user can move to any area they want
                                                                            areas have unique shops
                                                                            areas are not linear - once an area is finished you can chose where to go next 
                                                                            from a limited number of areas
            
                                                                            */
                                                                            
                                                                            var enemiesInArea = rpgZones[zoneUserIsIn].enemies
                                                                            if (rollForRarity >= 9650 ){
                                                                                // boss
                                                                                var enemyRoll = Math.floor(Math.random() * enemiesInArea.boss.length);
                                                                                enemyString = enemiesInArea.boss[enemyRoll]
                                                                                enemyFound = JSON.parse(JSON.stringify( enemiesToEncounter.boss[enemyString] ));
                                                                                foundBoss = true;
                                                                            }
                                                                            else if (rollForRarity >= 8250 && rollForRarity < 9650 ){
                                                                                // hard
                                                                                var enemyRoll = Math.floor(Math.random() * enemiesInArea.hard.length);
                                                                                enemyString = enemiesInArea.hard[enemyRoll]
                                                                                enemyFound = JSON.parse(JSON.stringify( enemiesToEncounter.hard[enemyString]));
                                                                            }
                                                                            else if (rollForRarity >= 4000 && rollForRarity < 8250 ){
                                                                                // medium
                                                                                var enemyRoll = Math.floor(Math.random() * enemiesInArea.medium.length);
                                                                                enemyString = enemiesInArea.medium[enemyRoll]
                                                                                enemyFound = JSON.parse(JSON.stringify( enemiesToEncounter.medium[enemyString]));
                                                                            }
                                                                            else {
                                                                                // easy :)
                                                                                var enemyRoll = Math.floor(Math.random() * enemiesInArea.easy.length);
                                                                                enemyString = enemiesInArea.easy[enemyRoll]
                                                                                enemyFound = JSON.parse(JSON.stringify(  enemiesToEncounter.easy[enemyString]));
                                                                            }

                                                                            let enemyAreaStatBuffs = rpgZones[zoneUserIsIn].enemyStatBuffs || {}
                                                                            let hpAreaBuff = enemyAreaStatBuffs.hpPlusPercentage || 1
                                                                            let adAreaBuff = enemyAreaStatBuffs.adPlusPercentage || 1
                                                                            let mdAreaBuff = enemyAreaStatBuffs.mdPlusPercentage || 1
                                                                            let armorAreaBuff = enemyAreaStatBuffs.armorPlusPercentage || 1
                                                                            let spiritAreaBuff = enemyAreaStatBuffs.spiritPlusPercentage || 1

                                                                            enemies[enemyIdCount] = {
                                                                                id: enemyIdCount,
                                                                                enemyIdName: enemyFound.enemyIdName,
                                                                                name: enemyFound.name,
                                                                                emoji: enemyFound.emoji,
                                                                                hp: Math.floor( hpAreaBuff * ( enemyFound.hp + (21 * averageLevelInParty) + (enemyFound.hpPerPartyMember * enemyCount)) ) , 
                                                                                attackDmg: Math.floor( adAreaBuff * ( enemyFound.attackDmg + (10 * averageLevelInParty) + (enemyFound.adPerPartyMember * enemyCount)) ), 
                                                                                magicDmg: Math.floor( mdAreaBuff * ( enemyFound.magicDmg + (10 * averageLevelInParty) + (enemyFound.mdPerPartyMember * enemyCount)) ) ,
                                                                                armor: Math.floor( armorAreaBuff * ( enemyFound.armor + (averageLevelInParty * averageLevelInParty)) ),
                                                                                spirit: Math.floor( spiritAreaBuff * ( enemyFound.spirit + ( averageLevelInParty * averageLevelInParty)) ),
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
                                                                                globalStatuses: {
                                                                                    ableToAttack: true,
                                                                                    abletotakedamage: true,
                                                                                    abletobehealed: true,
                                                                                    endofturnenable: true,
                                                                                    damageDealtPercentage: 1,
                                                                                    damageTakenPercentage: 1,
                                                                                    magicDamageTakenPercentage: 1,
                                                                                    physicalDamageTakenPercentage: 1,
                                                                                    healingDonePercentage: 1,
                                                                                    healingTakenPercentage: 1
                                                                                },
                                                                                difficulty: enemyFound.difficulty,
                                                                                abilities: enemyFound.abilities,
                                                                                effectsOnDeath: enemyFound.effectsOnDeath,
                                                                                abilitiesMap : {},
                                                                                element: enemyFound.element
                                                                            }
                                                                            if (enemyAreaStatBuffs.frenzyAdIncreasePercentage){
                                                                                for (var b in enemies[enemyIdCount].buffs){
                                                                                    if (enemies[enemyIdCount].buffs[b].name == "frenzy"){
                                                                                        enemies[enemyIdCount].buffs[b].onTurnEnd.attackDmgPlus = Math.floor( enemies[enemyIdCount].buffs[b].onTurnEnd.attackDmgPlus * enemyAreaStatBuffs.frenzyAdIncreasePercentage)
                                                                                        enemies[enemyIdCount].buffs[b].onTurnEnd.magicDmgPlus = Math.floor(enemies[enemyIdCount].buffs[b].onTurnEnd.magicDmgPlus * enemyAreaStatBuffs.frenzyAdIncreasePercentage)
                                                                                    }
                                                                                }
                                                                            }
                                                                            if (enemyFound.abilityOrder){
                                                                                enemies[enemyIdCount].abilityOrder = enemyFound.abilityOrder
                                                                            }
            
                                                                            if (averageLevelInParty < 12){
                                                                                enemies[enemyIdCount].attackDmg = Math.floor(enemies[enemyIdCount].attackDmg / 2 )
                                                                                enemies[enemyIdCount].magicDmg = Math.floor(enemies[enemyIdCount].magicDmg / 2 )
                                                                            }
            
                                                                            for( var ability in enemies[enemyIdCount].abilities){
                                                                                var abilityName = enemies[enemyIdCount].abilities[ability]
                                                                                if (rpgAbilities[abilityName] && rpgAbilities[abilityName].passive){
                                                                                    // add it as a buff and a passive ability
                                                                                    var passiveAbilityBuff = JSON.parse(JSON.stringify( rpgAbilities[abilityName].buff ));
                                                                                    enemies[enemyIdCount].buffs.push(passiveAbilityBuff);
                                                                                    enemies[enemyIdCount].passiveAbilities.push(passiveAbilityBuff);
                                                                                    enemies[enemyIdCount].abilitiesMap[passiveAbilityBuff.name] = passiveAbilityBuff;
                                                                                    if (rpgAbilities[rpgAbilities[abilityName]].status){
                                                                                        var passiveAbilityStatus = JSON.parse(JSON.stringify( rpgAbilities[rpgAbilities[abilityName]].status ));
                                                                                        enemies[enemyIdCount].statuses.push(passiveAbilityStatus);
                                                                                        enemies[enemyIdCount].passiveAbilities.push(passiveAbilityStatus);
                                                                                        enemies[enemyIdCount].abilitiesMap[passiveAbilityStatus.name] = passiveAbilityStatus;    
                                                                                    }
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
                                                                                    if ( eventToPush.belongsToEvent && uniqueEOTevents.indexOf(endOfTurnEventName) == -1 ){
                                                                                        // check that the event is unique
                                                                                        activeRPGEvents[rpgEvent].endOfTurnEvents.push( eventToPush );
                                                                                        uniqueEOTevents.push(endOfTurnEventName)
                                                                                    }else if ( eventToPush.belongsToMember ){
                                                                                        enemies[enemyIdCount].endOfTurnEvents.push( eventToPush );
                                                                                    }
                                                                                }
                                                                            }
            
                                                                            enemies[enemyIdCount].maxhp = enemies[enemyIdCount].hp;
                                                                            enemyIdCount++;
                                                                        }
                                                                    }
                                                                }
                                                                
                                                                activeRPGEvents[rpgEvent].enemies = enemies;
                                                                activeRPGEvents[rpgEvent].enemiesCount = enemyIdCount - 1;
        
                                                                activeRPGEvents[rpgEvent].membersInParty = membersInParty
                                                                activeRPGEvents[rpgEvent].memberLastChannel = {}
                                                                activeRPGEvents[rpgEvent].turn = 1;
                                                                activeRPGEvents[rpgEvent].enemyTurnAbilities = [];
                                                                activeRPGEvents[rpgEvent].memberTurnAbilities = [];
                                                                activeRPGEvents[rpgEvent].status = "in progress"
                                                                activeRPGEvents[rpgEvent].limitDefensiveReady = true;
                                                                activeRPGEvents[rpgEvent].limitDefensiveTurnUsed = 0;
                                                                activeRPGEvents[rpgEvent].limitOffensiveReady = true;
                                                                activeRPGEvents[rpgEvent].limitOffensiveTurnUsed = 0;
                                                                activeRPGEvents[rpgEvent].averageLevelInParty = averageLevelInParty;
                                                                // start date
                                                                var eventStartDate = new Date();
                                                                activeRPGEvents[rpgEvent].eventStartDate = eventStartDate
                                                                activeRPGEvents[rpgEvent].lastTurnTaken = eventStartDate
                                                
                                                                const embed = new Discord.RichEmbed()
                                                                .setAuthor("Taco RPG Event has started !!")
                                                                .setDescription(embedDescription)
                                                                //.setThumbnail("https://media.giphy.com/media/mIZ9rPeMKefm0/giphy.gif")
                                                                .setColor(0xF2E93E)
                                                                if (activeRPGEvents[rpgEvent].special && activeRPGEvents[rpgEvent].special.avatar){
                                                                    embed.setThumbnail(activeRPGEvents[rpgEvent].special.avatar);
                                                                }else if (activeRPGEvents[rpgEvent].challenge){
                                                                    var challengeNum = activeRPGEvents[rpgEvent].challenge.challenge
                                                                    var keystoneNum = activeRPGEvents[rpgEvent].challenge.keystone
                                                                    if (keystoneNum >= 5){
                                                                        var avatarURL = getThumbnailFromChallenge(challengeNum)
                                                                        embed.setThumbnail(avatarURL);
                                                                    }
                                                                }else if (zoneAvatar){
                                                                    embed.setThumbnail(zoneAvatar);
                                                                    activeRPGEvents[rpgEvent].zoneAvatar = zoneAvatar
                                                                }
                                                                // party members
                                                                //var groupString = "";
                                                                var enemiesString = "";
                                                                recalculateStatBuffs(activeRPGEvents[rpgEvent])
                                                                for (var member in activeRPGEvents[rpgEvent].members){
                                                                    var memberInRpgEvent = activeRPGEvents[rpgEvent].members[member];
                                                                    var memberInParty = activeRPGEvents[rpgEvent].membersInParty["rpg-" + memberInRpgEvent.id]
                                                                    var playerString = userStatsStringBuilder(memberInParty, memberInRpgEvent.username, false, 0);
                                                                    var playerAlias = memberInParty.alias
                                                                    var playerUsername = memberInRpgEvent.username.length <= 35 ? memberInRpgEvent.username : "default"
                                                                    embed.addField( playerUsername + " (" + playerAlias + ")", playerString )
                                                                }
                                                                // limit abilities
                                                                var limitsReadyString = "";
                                                                if (activeRPGEvents[rpgEvent].limitOffensiveReady){
                                                                    limitsReadyString = limitsReadyString + ":crossed_swords: ";
                                                                }
                                                                if (activeRPGEvents[rpgEvent].limitDefensiveReady){
                                                                    limitsReadyString = limitsReadyString + " :shield: "
                                                                }
                                                                if (limitsReadyString.length > 0){
                                                                    embed.addField("Limit", limitsReadyString)
                                                                }
                                                                // enemies
                                                                for (var enemy in activeRPGEvents[rpgEvent].enemies){
                                                                    var enemyInRpgEvent = activeRPGEvents[rpgEvent].enemies[enemy];
                                                                    var enemyName = activeRPGEvents[rpgEvent].enemies[enemy].name;
                                                                    enemiesString = enemiesString + "\n" + userStatsStringBuilder(enemyInRpgEvent, enemyName, true, 1);
                                                                }
                                                                //embed.addField( "Group", groupString )
                                                                embed.addField( "Enemy", enemiesString )
                                                                if (isQueueEvent){
                                                                    // send embed to all channels
                                                                    var groupOfMessagesSent = activeRPGEvents[rpgEvent].groupOfMessagesSent
                                                                    // filter to only unique channels to send
                                                                    let groupOfUniqueChannels = filterForUniqueChannels(groupOfMessagesSent)
                                                                    let newGroupOfMessagesSent = []
                                                                    if (groupOfMessagesSent){
                                                                        groupOfUniqueChannels.forEach(function(uniqueChannel){
                                                                            uniqueChannel.channel.send({embed})
                                                                            .then(function(sentMessage){
                                                                                recalculateStatBuffs(activeRPGEvents[rpgEvent])
                                                                                newGroupOfMessagesSent.push(sentMessage)
                                                                                exports.setreadyLock(rpgEventId, discordUserId, false)
                                                                                if (newGroupOfMessagesSent.length == groupOfUniqueChannels.length){
                                                                                    activeRPGEvents[rpgEvent].groupOfMessagesSent = newGroupOfMessagesSent
                                                                                }
                                                                            })
                                                                            .catch(function(err){
                                                                                // console.log(err)
                                                                                exports.setreadyLock(rpgEventId, discordUserId, false)
                                                                                newGroupOfMessagesSent.push(uniqueChannel)
                                                                                if (newGroupOfMessagesSent.length == groupOfUniqueChannels.length){
                                                                                    activeRPGEvents[rpgEvent].groupOfMessagesSent = newGroupOfMessagesSent
                                                                                }
                                                                                message.channel.send("Unable to display RPG embed, Enable embeds in this channel to begin RPG events!")
                                                                            })
                                                                        })
                                                                        // sent the messages
                                                                        for (var m in groupOfMessagesSent){
                                                                            groupOfMessagesSent[m].delete()
                                                                            .then(function(res){
                                                                                // console.log(res)
                                                                            })
                                                                            .catch(function(err){
                                                                                // console.log(err)
                                                                            })
                                                                        }
                                                                    }else{
                                                                        exports.setreadyLock(rpgEventId, discordUserId, false)
                                                                    }
                                                                }else{
                                                                    message.channel.send({embed})
                                                                    .then(function (sentMessage) {
                                                                        recalculateStatBuffs(activeRPGEvents[rpgEvent])
                                                                        var lastMessage = activeRPGEvents[rpgEvent].lastEmbedMessage
                                                                        if (lastMessage){
                                                                            lastMessage.delete()
                                                                            .then(function(res){
                                                                                exports.setreadyLock(rpgEventId, discordUserId, false)
                                                                                activeRPGEvents[rpgEvent].lastEmbedMessage = sentMessage
                                                                            })
                                                                            .catch(function(err){
                                                                                exports.setreadyLock(rpgEventId, discordUserId, false)
                                                                                // console.log(err);
                                                                            })
                                                                        }else{
                                                                            exports.setreadyLock(rpgEventId, discordUserId, false)
                                                                        }
                                                                    })
                                                                    .catch(function(err){
                                                                        // console.log(err)
                                                                        exports.setreadyLock(rpgEventId, discordUserId, false)
                                                                        message.channel.send("Unable to display RPG embed, Enable embeds in this channel to begin RPG events!")
                                                                    })
                                                                }
                                                            }else{
                                                                exports.setreadyLock(rpgEventId, discordUserId, false)
                                                                message.channel.send("cannot start this challenge")
                                                            }
                                                            // unlock readying
                                                        }else{
                                                            exports.setreadyLock(rpgEventId, discordUserId, false)
                                                            message.channel.send( readyString + ", waiting on the rest of the group");
                                                        }
                                                    }else{
                                                        exports.setreadyLock(rpgEventId, discordUserId, false)
                                                    }
                                                }else{
                                                    exports.setreadyLock(rpgEventId, discordUserId, false)
                                                }
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    }
                    else{
                        exports.setreadyLock(rpgEventId, discordUserId, false)
                        now = new Date(now.setMinutes(now.getMinutes()));
                        var numberOfHours = getDateDifference(userData.data.lastrpgtime, now, RPG_COOLDOWN_HOURS);
                        message.channel.send(message.author + " You have rpgd too recently! please wait `" + numberOfHours +"` ");
                    }
                }
            })
        }
        
    }
    else if (exports.getReadyLockUser(idOfUserInEvent, discordUserId)){
        message.channel.send(message.author + " you are being processed")
    }
    else if (usersInRPGEvents["rpg-" + discordUserId] && usersInRPGEvents["rpg-" + discordUserId].ready == true){
        message.channel.send(message.author + " you are already ready")
    }
    else{
        message.channel.send(message.author + " you are not in an event");
    }
}

function calculateCritChance(critchanceRating){
    // initial should be 3%
    var critChance = 3.00
    // each percentage is a certain critrating required
    critChance = critChance + ( critchanceRating / 44 )
    return critChance
}

function calculateLuckPlus(luck){
    // initial should be 50% more damage
    var luckPercentage = 0.5
    luckPercentage = luckPercentage + ( ( luck / 9) / 100 )
    return luckPercentage * 100
}

function getKeystoneIdFromChallenge(challengeNumber){
    if (enemiesToEncounter.challenge[challengeNumber]){
        return enemiesToEncounter.challenge[challengeNumber].challengeId
    }else{
        return -1
    }
}

function getThumbnailFromChallenge(challengeNumber){
    if (enemiesToEncounter.challenge[challengeNumber]){
        return enemiesToEncounter.challenge[challengeNumber].avatar
    }else{
        return -1
    }
}

function getKeystoneUnlockNameFromChallenge(challengeNumber){
    if (enemiesToEncounter.challenge[challengeNumber]){
        return enemiesToEncounter.challenge[challengeNumber].keystoneUnlockName
    }else{
        return -1
    }
}

module.exports.displayMap = function(message, zoneToCheck){
    var discordUserId = message.author.id
    profileDB.getUserRpgProfleData(discordUserId, function(err, userData){
        if (err){
            // console.log(err)
        }else{
            if (!zoneToCheck){
                let usercurrentarea = userData.data.currentarea
                zoneToCheck = getRpgZone(usercurrentarea)
            }

            // create an embed that includes the zone name currently and available zones
            // and areas in current zone
            var zonesAvailable = getZonesAvailableForUser(userData.data)
            if (rpgZones[zoneToCheck] && zonesAvailable[zoneToCheck]){
                var listOfAreasInZone = getAreasInZone(zoneToCheck, userData.data)
                var zonesAvailableForUserMap = getZonesAvailableForUser(userData.data)
                var currentZoneName = rpgZones[ getRpgZone( userData.data.currentarea ) ].name
                var zonePicked = rpgZones[ zoneToCheck ].name
                var currentAreaName = rpgZones[ getRpgZone( userData.data.currentarea ) ].areas[userData.data.currentarea].name
                var zoneAvatar = rpgZones[ zoneToCheck ].zoneAvatar
                var zoneLevelIntendedString = rpgZones[ zoneToCheck ].intendedLevelString
                mapEmbedBuilder(message, listOfAreasInZone, zonesAvailableForUserMap, currentZoneName, currentAreaName, zoneAvatar, zonePicked, zoneLevelIntendedString)    
            }else{
                let usercurrentarea = userData.data.currentarea
                zoneToCheck = getRpgZone(usercurrentarea)

                var listOfAreasInZone = getAreasInZone(zoneToCheck, userData.data)
                var zonesAvailableForUserMap = getZonesAvailableForUser(userData.data)
                var currentZoneName = rpgZones[ getRpgZone( usercurrentarea ) ].name
                var currentAreaName = rpgZones[ getRpgZone( usercurrentarea ) ].areas[usercurrentarea].name
                var zoneAvatar = rpgZones[ getRpgZone( usercurrentarea ) ].zoneAvatar
                var zoneLevelIntendedString = rpgZones[ getRpgZone( usercurrentarea ) ].intendedLevelString
                mapEmbedBuilder(message, listOfAreasInZone, zonesAvailableForUserMap, currentZoneName, currentAreaName, zoneAvatar, currentZoneName, zoneLevelIntendedString)
            }
        }
    })
}

module.exports.displayKeystones = function(message){
    var discordUserId = message.author.id
    profileDB.getUserRpgProfleData(discordUserId, function(err, userData){
        if (err){
            // console.log(err)
        }else{
            var keystonesString = keystonesStringBuilder(userData)
            if (keystonesString.length > 0){
                keystonesEmbedBuilder(message, keystonesString, userData)
            }
        }
    })
}

function keystonesStringBuilder(userData){
    var keystonesString = ""
    for (var i = 1; i <= CURRENT_CHALLENGES_AVAILABLE; i++){
        var keystoneId = getKeystoneIdFromChallenge(i)
        if (userData.data[keystoneId] && userData.data[keystoneId] > 0){
            keystonesString = keystonesString + keystoneId + " - " + userData.data[keystoneId] + "\n"
        }
    }
    return keystonesString
}

function keystonesEmbedBuilder(message, keystonesString, userData){

    const embed = new Discord.RichEmbed()
    .setAuthor(message.author.username)
    .addField("Keystones available: :key: :asterisk:", keystonesString, true)
    .setThumbnail(message.author.avatarURL)
    .setColor(0xbfa5ff)
    message.channel.send({embed})
    .then(function(res){
        // console.log(res)
    })
    .catch(function(err){
        // console.log(err)
        message.channel.send("Unable to display keystones embed, Enable embeds in this channel for keystones embeds!")
    })
}

function mapEmbedBuilder(message, listOfAreasInZone, zonesAvailableForUserMap, currentZoneName, currentAreaName, zoneAvatar, zonePicked, zoneLevelIntendedString){
    var zonesAvailableString = ""
    var areasInZoneString = ""
    for (var z in zonesAvailableForUserMap){
        if (zonesAvailableForUserMap[z].completed){
            zonesAvailableString = zonesAvailableString + "**" + zonesAvailableForUserMap[z].name + "**\n"
        }else{
            zonesAvailableString = zonesAvailableString + zonesAvailableForUserMap[z].name + "\n"
        }
    }
    for (var a in listOfAreasInZone){
        if (listOfAreasInZone[a].completed){
            areasInZoneString = areasInZoneString + "**" + listOfAreasInZone[a].name + "**\n"
        }else{
            // display the completion
            areasInZoneString = areasInZoneString + listOfAreasInZone[a].name + " " + listOfAreasInZone[a].progressionString +  "\n"
        }
    }

    const embed = new Discord.RichEmbed()
    .setAuthor(message.author.username + " Map")
    .setDescription(":map: travel to different areas via:\n-travel [areaname] OR -travel [zonename]\nBegin an RPG event via:\n-rpgstart @user @user (up to 5 users)\nYou are currently in " + currentZoneName + " - " + currentAreaName + " (" + zoneLevelIntendedString + ")")
    .addField("Zones available", zonesAvailableString, true)
    .addField("Areas available in " + zonePicked, areasInZoneString, true)
    .setColor(0xbfa5ff)
    if (zoneAvatar){
        embed.setImage(zoneAvatar)
    }
    message.channel.send({embed})
    .then(function(res){
        // console.log(res)
    })
    .catch(function(err){
        // console.log(err)
        message.channel.send("Unable to display map embed, Enable embeds in this channel to display MAP embeds!")
    })
}

function getAreasInZone(zoneid, userData){
    // get the areas in the zone that are available to the user
    var areasInZone = {}
    var startingAreaForZone = rpgZones[zoneid].startingArea
    var currentAreasCheck = [ startingAreaForZone ]
    var done = false
    while(!done){
        var newAreasToCheck = []
        for (var key in currentAreasCheck){
            var areaId = currentAreasCheck[key]
            var area = rpgZones[zoneid].areas[areaId]
            // check that area was already cleared
            if (isAreaCompleted(area, userData[areaId], areaId)  ){
                if (!areasInZone[ currentAreasCheck[key] ]){
                    areasInZone[currentAreasCheck[key]] = {
                        name: currentAreasCheck[key], 
                        completed: true 
                    }
                }
                for (var adjacent in area.onCompleteAreasUnlocked){
                    if (!areasInZone[area.onCompleteAreasUnlocked[adjacent] ] ){
                        newAreasToCheck.push( area.onCompleteAreasUnlocked[adjacent] )
                    }
                }
            }else{
                let progression = areaProgressionString(area, userData[areaId])
                areasInZone[currentAreasCheck[key]] = {
                    name: currentAreasCheck[key],
                    completed: false,
                    progressionString: progression
                }
            }
        }

        if(newAreasToCheck.length == 0){
            done = true
        }else{
            currentAreasCheck = newAreasToCheck
        }
    }
    return areasInZone
}

function isAreaCompleted(area, userAreaCompletion){
    return userAreaCompletion >= area.enemiesToDefeat
}

function areaProgressionString(area, userAreaCompletion){
    return ( (userAreaCompletion || 0 ) + " / " + area.enemiesToDefeat )
}

function getZonesAvailableForUser(userData){
    var zonesAvailable = {}
    // get the zones available to the user - go through the zones, compare to completion of zone in user profile
    var currentZonesCheck = [ "prarie" ] // default starting area
    var done = false
    while(!done){
        var newZonesToCheck = [] // THESE WILL ALWAYS BE UNIQUE
        for (var i in currentZonesCheck){
            var zone = rpgZones[ currentZonesCheck[i] ]
            if (userData[ currentZonesCheck[i]] ){
                if (!zonesAvailable[ currentZonesCheck[i] ]){
                    zonesAvailable[currentZonesCheck[i]] = { 
                        name: currentZonesCheck[i], 
                        completed: true 
                    } 
                }
                for (var adjacent in zone.onCompleteZonesUnlocked){
                    if (!zonesAvailable[zone.onCompleteZonesUnlocked[adjacent] ] ){
                        newZonesToCheck.push( zone.onCompleteZonesUnlocked[adjacent] )
                    }
                }
            }
            // did not complete the zone yet
            if (!zonesAvailable[ currentZonesCheck[i] ]){
                zonesAvailable[currentZonesCheck[i]] = { 
                    name: currentZonesCheck[i], 
                    completed: false 
                } 
            }
        }
        if(newZonesToCheck.length == 0){
            done = true
        }else{
            currentZonesCheck = newZonesToCheck
        }
    }

    return zonesAvailable
}

module.exports.travelToNewArea = function(message, placeName){
    var discordUserId = message.author.id
    profileDB.getUserRpgProfleData(discordUserId, function(err, userData){
        if (err){
            // console.log(err)
        }else{
            // figure out if the user specified an area, or a zone
            var zonesAvailable = getZonesAvailableForUser(userData.data)
            if (rpgZones[placeName]){
                // if a zone, no cooldown and take them to the starting area in that zone
                // check that the zone is available to the user
                var startingArea = rpgZones[placeName].startingArea
                if (zonesAvailable[placeName]){
                    profileDB.updateUserRpgArea(discordUserId, startingArea, false, function(error, res){
                        if (error){
                            // console.log(error)
                        }else{
                            let areaName = rpgZones[placeName].areas[startingArea].name
                            message.channel.send("You are now in `" + areaName + "` !")
                        }
                    })
                }else{
                    message.channel.send("that place is not on your map")
                }

            }else{
                var now = new Date();
                var oneHourAgo = new Date();
                ///////// CALCULATE THE MINUTES REDUCED HERE 
                oneHourAgo = new Date(oneHourAgo.setHours(oneHourAgo.getHours() - 1));

                if (!userData.data.lasttraveltime || oneHourAgo > userData.data.lasttraveltime){
                    var rpgZoneToTravel = getRpgZone(placeName)
                    if (rpgZones[rpgZoneToTravel] && zonesAvailable[rpgZoneToTravel]){
                        var area = placeName
                        // if an area then give them a cooldown and change their area there
                        let areasAvailable = getAreasInZone(rpgZoneToTravel, userData.data)
                        if (areasAvailable[area]){
                            profileDB.updateUserRpgArea(discordUserId, area, true, function(error, res){
                                if (error){
                                    // console.log(error)
                                }else{
                                    let areaName = rpgZones[rpgZoneToTravel].areas[area].name
                                    message.channel.send("You are now in `" + areaName + "` !")
                                }
                            })
                        }else{
                            message.channel.send("not an area you can travel to yet")
                        }
                    }else{
                        message.channel.send("that place is not on your map")
                    }
                }else{
                    var numberOfHours = getDateDifference(userData.data.lasttraveltime, now, 1);
                    message.channel.send(message.author + " You just recently traveled! Please wait `" + numberOfHours +"` ");
                }
            }
        }
    })
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
                        let aliasTarget = false;
                        if (target == "p1"
                        || target == "p2"
                        || target == "p3"
                        || target == "p4"
                        || target == "p5"){
                            let ev = activeRPGEvents["rpg-"+idOfEventUserIsIn]
                            for (var m in ev.membersInParty){
                                if (ev.membersInParty[m].alias == target){
                                    target = ev.membersInParty[m].id
                                    aliasTarget = true
                                }
                            }
                        }

                        if (mentionedUser && target == mentionedUser.id){
                            abilityToProcess = {
                                user: discordUserId,
                                ability: abilityToUse,
                                target: "rpg-"+target
                            }
                        }else if(aliasTarget){
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
                        var validTarget = validateTarget(target, abilityToUse, activeRPGEvents["rpg-"+idOfEventUserIsIn], abilityToProcess.user);
                        if (validTarget && !alreadyUsedAbility){
                            activeRPGEvents["rpg-"+idOfEventUserIsIn].memberTurnAbilities.push(abilityToProcess);
                            // if all users have used their abilities the turn should be processed
                            activeRPGEvents["rpg-"+idOfEventUserIsIn].memberLastChannel[discordUserId] = message.channel
                            // get the number of users that are alive and compare to the memberturnabilities array length
                            var membersAlive = 0;
                            for (var member in activeRPGEvents["rpg-"+idOfEventUserIsIn].membersInParty){
                                if (!checkIfDeadByObject(activeRPGEvents["rpg-"+idOfEventUserIsIn].membersInParty[member])){
                                    membersAlive++;
                                }
                            }
                            if (membersAlive == activeRPGEvents["rpg-"+idOfEventUserIsIn].memberTurnAbilities.length){
                                try{
                                    processRpgTurn(message, activeRPGEvents["rpg-"+idOfEventUserIsIn]);
                                }catch(err){
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

function validateTarget(target, abilityToUse, event, caster){
    if (!target){
        // check to see if it is an areawide ability
        if (rpgAbilities[abilityToUse] && (rpgAbilities[abilityToUse].areawide || rpgAbilities[abilityToUse].selfTarget)){
            return true;
        }
        else{
            return false;
        }
    }
    if (rpgAbilities[abilityToUse].selfUntargettable){
        if (target == caster){
            return false
        }
    }
    // using player aliases
    if (target == "p1"
    || target =="p2"
    || target =="p3"
    || target =="p4"
    || target =="p5"){
        // check that there is a user with that alias
        for (var m in event.membersInParty){
            if (event.membersInParty[m].alias == target){
                return true
            }
        }

    }
    // check that target is valid
    if (target > 0 && target <= event.enemiesCount){
        // check if the ability can only be cast on a certain difficulty enemy
        if (rpgAbilities[abilityToUse].difficultiesAllowed){
            var enemyDiff = event.enemies[target].difficulty
            if (rpgAbilities[abilityToUse].difficultiesAllowed.indexOf(enemyDiff) > -1
                || !enemyDiff){
                return true;
            }else{
                return false
            }
        }else{
            return true;
        }
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
    try{
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
                if (event.membersInParty["rpg-"+abilityObject.user].buffs[i].hasted == true){
                    order.push(abilityObject);
                    event.memberTurnAbilities.splice(index, 1);
                    break;
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
            // event OVER, yield rewards and anouncements
            turnFinishedEmbedBuilder(message, event, turnString, passiveEffectsString, endOfTurnString);
            event.status = "ended";
            eventEndedEmbedBuilder(message, event, eventHasEnded.partySuccess)
        }
        else if(eventHasEnded.partyDead && !eventHasEnded.partySuccess){
            // event OVER, party did not succeed
            turnFinishedEmbedBuilder(message, event, turnString, passiveEffectsString, endOfTurnString);
            event.status = "ended";
            eventEndedEmbedBuilder(message, event, eventHasEnded.partySuccess)
        }
        else{
            // event NOT OVER, continue with event
            event.enemyTurnAbilities = [];
            event.memberTurnAbilities = [];
            //////// permanent statuses for players and users reset here, they get recalculated before dots / hots next turn
            recalculateStatBuffs(event)

            event.turn = event.turn + 1;
            try {
                turnFinishedEmbedBuilder(message, event, turnString, passiveEffectsString, endOfTurnString);
                // attempt to process the next turn if the event is in turn + 1
                if (event.TIMER){
                    var turnToAttempt = event.turn;
                
                    var countdownTimeout = setTimeout (function(){ 
                        if (event.turn == turnToAttempt && event.status != "ended"){
                            message.channel.send("15 seconds")
                        }
                    }, event.TIMER - 15000);

                    var turnTimeout = setTimeout (function(){ 
                        if (event.turn == turnToAttempt && event.status != "ended"){
                            processRpgTurn(message, event)
                        }
                    }, event.TIMER);
                }
            }catch(exception){
                message.channel.send("exception : " + exception)
            }
        }
    }catch(ex){
       message.channel.send("turn processing exception : " + ex)
    }
}

function cleanupEventEnded(event){
    let idOfEventToDelete = "";
    for (var member in event.membersInParty){
        let idToRemove = event.membersInParty[member].id

        // free up the items the user is using
        for (let item in usersInRPGEvents["rpg-" + idToRemove].memberStats.itemsBeingWornUserIds){
            let itemInQuestion = usersInRPGEvents["rpg-" + idToRemove].memberStats.itemsBeingWornUserIds[item];
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
    let descriptionString = passiveEffectsString + turnString + endOfTurnString
    if (descriptionString.length > 1950){
        descriptionString = descriptionString.substring(0, 1950)
    }
    let embed = new Discord.RichEmbed()
    .setAuthor("Taco RPG Event | Turn: " + event.turn)
    .setColor(0xF2E93E)
    .setDescription( descriptionString )
    // party members
    //var groupString = "";
    let enemiesString = "";
    if (event.special && event.special.avatar){
        embed.setThumbnail(event.special.avatar);
    }else if (event.challenge){
        let challengeNum = event.challenge.challenge
        let keystoneNum = event.challenge.keystone
        if (keystoneNum >= 5){
            let avatarURL = getThumbnailFromChallenge(challengeNum)
            embed.setThumbnail(avatarURL);
        }
    }else if (event.zoneAvatar){
        embed.setThumbnail(event.zoneAvatar);
    }

    for (let member in event.members){
        let memberInRpgEvent = event.members[member];
        let memberInParty = event.membersInParty["rpg-" + memberInRpgEvent.id]
        let playerString = userStatsStringBuilder(memberInParty, memberInRpgEvent.username, false, event.turn);
        let playerUsername = memberInRpgEvent.username.length <= 35 ? memberInRpgEvent.username : "default"
        let playerAlias = memberInParty.alias
        embed.addField( playerUsername + " (" + playerAlias + ")", playerString )
    }
    // show limit availables
    let limitsReadyString = "";
    if (event.limitOffensiveReady){
        limitsReadyString = limitsReadyString + ":crossed_swords: ";
    }
    if (event.limitDefensiveReady){
        limitsReadyString = limitsReadyString + " :shield: "
    }
    if (limitsReadyString.length > 0){
        embed.addField("Limit", limitsReadyString)
    }
    // enemies
    for (let enemy in event.enemies){
        if (enemiesString.length > 700){
            embed.addField( "Enemy", enemiesString )
            enemiesString = "";
            if (event.enemies[enemy].difficulty == "summoned" || event.enemies[enemy].difficulty == "summoned-boss"){
                if (event.enemies[enemy].hp > 0){
                    let enemyInRpgEvent = event.enemies[enemy];
                    let enemyName = event.enemies[enemy].name;
                    enemiesString = enemiesString + "\n" + userStatsStringBuilder(enemyInRpgEvent, enemyName, true, event.turn);        
                }
            }else{
                let enemyInRpgEvent = event.enemies[enemy];
                let enemyName = event.enemies[enemy].name;
                enemiesString = enemiesString + "\n" + userStatsStringBuilder(enemyInRpgEvent, enemyName, true, event.turn);  
            }
        }else{
            if (event.enemies[enemy].difficulty == "summoned" || event.enemies[enemy].difficulty == "summoned-boss"){
                if (event.enemies[enemy].hp > 0){
                    let enemyInRpgEvent = event.enemies[enemy];
                    let enemyName = event.enemies[enemy].name;
                    enemiesString = enemiesString + "\n" + userStatsStringBuilder(enemyInRpgEvent, enemyName, true, event.turn);        
                }
            }else{
                let enemyInRpgEvent = event.enemies[enemy];
                let enemyName = event.enemies[enemy].name;
                enemiesString = enemiesString + "\n" + userStatsStringBuilder(enemyInRpgEvent, enemyName, true, event.turn);  
            }
        }
    }
    //embed.addField( "Group", groupString )
    if (enemiesString.length > 0 ){
        embed.addField( "Enemy", enemiesString )
    }
    let isQueueEvent = event.queueEvent
    if (isQueueEvent){
        let groupOfMessagesSent = event.groupOfMessagesSent
        // filter to only unique channels to send
        let groupOfUniqueChannels = filterForUniqueChannels(groupOfMessagesSent)
        let newGroupOfMessagesSent = []
        for (let m in groupOfUniqueChannels){
            groupOfUniqueChannels[m].channel.send({embed})
            .then(function(sentMessage){
                newGroupOfMessagesSent.push(sentMessage)
                if (newGroupOfMessagesSent.length == groupOfUniqueChannels.length){
                    event.groupOfMessagesSent = newGroupOfMessagesSent
                }
            })
            .catch(function(err){
                // console.log(err)
                newGroupOfMessagesSent.push(groupOfUniqueChannels[m])
                if (newGroupOfMessagesSent.length == groupOfUniqueChannels.length){
                    event.groupOfMessagesSent = newGroupOfMessagesSent
                }
                message.channel.send("Unable to display RPG embed, Enable embeds in this channel to begin RPG events!")
            })
        }
        // sent the messages
        for (let m in groupOfMessagesSent){
            groupOfMessagesSent[m].delete()
            .then(function(res){
                // console.log(res)
            })
            .catch(function(err){
                // console.log(err)
            })
        }
    }else{
        message.channel.send({embed})
        .then(function (sentMessage) {
            let lastMessage = event.lastEmbedMessage
            if (lastMessage){
                lastMessage.delete()
                .then(function(res){
                    event.lastEmbedMessage = sentMessage
                })
                .catch(function(err){
                    // console.log(err);
                })
            }
        })
        .catch(function(err){
            // console.log(err)
            message.channel.send(JSON.stringify(err))
        })
    }
}

function filterForUniqueChannels(groupOfMessagesSent){
    // filter to only unique channels to send
    let groupOfUniqueChannels = []
    for (var c in groupOfMessagesSent){
        let isUniqueChannel = true
        for (var u in groupOfUniqueChannels){
            if (groupOfMessagesSent[c].channel.id == groupOfUniqueChannels[u].channel.id){
                isUniqueChannel = false
                break;
            }
        }
        if (isUniqueChannel){
            groupOfUniqueChannels.push(groupOfMessagesSent[c])
        }
    }
    return groupOfUniqueChannels
}

function eventEndedEmbedBuilder(message, event, partySuccess){
    var allItems = commands.getAllItems()
    var usersFirstComplete = []
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
            var keystonenumber = usersInRPGEvents["rpg-" + memberInParty.id].memberStats.currentkeystone;
            var userLevel = usersInRPGEvents["rpg-" + memberInParty.id].memberStats.level
            if ( (challengenumber + 1) == event.challenge.challenge && keystonenumber == 0 ){
                profileDB.updateCurrentChallenge( memberInParty.id, challengenumber + 1, function(err, res){

                })
                usersFirstComplete.push(memberInParty.id)
            }
            if ( (keystonenumber) == event.challenge.keystone && userLevel >= KEYSTONE_UNLOCK_LEVEL){
                var challengeId = getKeystoneIdFromChallenge(event.challenge.challenge)
                profileDB.updateCurrentChallengeKeystone( memberInParty.id, keystonenumber + 1, challengeId, function(err, res){
                    
                })
                if ( keystonenumber > 0 && (challengenumber + 1) >= event.challenge.challenge ){
                    usersFirstComplete.push(memberInParty.id)
                }
            }
            
        }
    }
    else if (event.special && event.special.reward && partySuccess){
        if (event.special.reward.type == "note"){
            embed.addField(event.special.reward.fieldTitle, event.special.reward.note)
        }

        if (event.special.reward.questline && event.special.reward.stageAdvance){            
            if ( event.special.reward.item ){
                var extraItem = event.special.reward.item
                // add the artifact item
                var rewardsArtifact = addArtifactItem(allItems, extraItem)
                // event.leader.id
                updateUserRewards(message, event.leader, rewardsArtifact);
                artifactEmbedBuilder(message, rewardsArtifact.items, event.leader)

                profileDB.getUserProfileData(event.leader.id, function(profileErr, profileRes){
                    if (profileErr){
                        // console.log("FAILURE SOMETHING WENT WRONG")
                    }else{
                        var achievData = { achievements: profileRes.data.achievements, rpgDefeated: event.special.questName }
                        achiev.checkForAchievements(event.leader.id, achievData, message)
                    }
                })
                
            }
            
            profileDB.updateQuestlineStage(event.leader.id, event.special.questData.questname, event.special.questData.stage + 1, function(error, updateRes){
                if (error){
                    // console.log(error);
                }else{
                    // console.log("advanced special rpg ");
                }
            })
        }
    }

    else if (event.area && event.usersInArea && partySuccess){
        // give completion to everyone in the area
        for (var u in event.usersInArea){
            var discordUserId = event.usersInArea[u].userid
            let customChannel = event.memberLastChannel[discordUserId]
            increaseCompletionForUser(event.usersInArea[u], event.area, message, event.enemiesCount, customChannel)
        }
    }

    var numberOfMembers = event.members.length;
    event.experienceHandedOut = 0
    var rewardStringForStatistics = "";
    for (var member in event.members){
        var memberInRpgEvent = event.members[member];
        var memberInParty = event.membersInParty["rpg-" + memberInRpgEvent.id];
        var rewards;
        var rewardString = "";
        if (partySuccess){
            var extraTacosForUser = usersInRPGEvents["rpg-" + memberInParty.id].memberStats.extraTacos;
            var extraXp = usersInRPGEvents["rpg-" + memberInParty.id].memberStats.extraExperience;
            memberInRpgEvent.extraTacosForUser = extraTacosForUser
            memberInRpgEvent.extraXp = extraXp
            var firstKill = false;
            if (usersFirstComplete.indexOf(memberInParty.id) > -1){
                firstKill = true
            }
            
            var rewards =  calculateRewards( event, memberInRpgEvent, allItems, numberOfMembers, firstKill)
            // add experience and rpgpoints to user
            let memberLastChannel = event.memberLastChannel[memberInRpgEvent.id]
            updateUserRewards(message, memberInParty, rewards, memberLastChannel);
            if (rewards.extraTacos && rewards.extraTacos > 0 ){
                rewardString = rewardString + "**Tacos:** " + rewards.extraTacos + "\n"
            }
            rewardString = rewardString + "**Experience:** " + rewards.xp + "\n**Rpg Points**: " + rewards.rpgPoints + "\n**Items:** \n";
            event.experienceHandedOut = event.experienceHandedOut + rewards.xp
            for (var item in rewards.items){
                if (rewardString.length < 950){
                    rewardString = rewardString + rewards.items[item].itemname + "\n";
                }else{
                    rewardString = rewardString + "."
                }
            }
            // unlocked the next keystone
            var userLevel = usersInRPGEvents["rpg-" + memberInParty.id].memberStats.level
            if (firstKill && userLevel >= KEYSTONE_UNLOCK_LEVEL){
                var challengeId = getKeystoneUnlockNameFromChallenge(event.challenge.challenge)
                var keystoneNumString = event.challenge.keystone > 0 ? (event.challenge.keystone + 1) : ""
                rewardString = rewardString + challengeId + " " + keystoneNumString + "\n"
            }
            rewardStringForStatistics = rewardStringForStatistics + rewardString
        }
        else{
            rewards = "No rewards :skull_crossbones:"
            rewardString = rewardString + " " + rewards + " \n";
            rewardStringForStatistics = rewardStringForStatistics + rewardString
        }
        var playerUsername = memberInRpgEvent.username.length <= 35 ? memberInRpgEvent.username : "default"
        embed.addField(playerUsername,  rewardString, true);
        // TODO: check for achievments, timed, special kills, 
    }
    var rpgStatData = createRpgStatData(rewardStringForStatistics, event, partySuccess)
    profileDB.createRpgStatistics(rpgStatData, function(statErr, statRes){
        if (statErr){
            // console.log(statErr)
        }else{
            // console.log(statRes)
        }
    })
    let isQueueEvent = event.queueEvent
    if (isQueueEvent){
        let groupOfMessagesSent = event.groupOfMessagesSent
        // filter to only unique channels to send
        let groupOfUniqueChannels = filterForUniqueChannels(groupOfMessagesSent)
        let newGroupOfMessagesSent = []
        for (var m in groupOfUniqueChannels){
            groupOfUniqueChannels[m].channel.send({embed})
            .then(function(sentMessage){
                newGroupOfMessagesSent.push(sentMessage)
                if (newGroupOfMessagesSent.length == groupOfUniqueChannels.length){
                    event.groupOfMessagesSent = newGroupOfMessagesSent
                }
            })
            .catch(function(err){
                // console.log(err)
                newGroupOfMessagesSent.push(groupOfUniqueChannels[m])
                if (newGroupOfMessagesSent.length == groupOfUniqueChannels.length){
                    event.groupOfMessagesSent = newGroupOfMessagesSent
                }
                message.channel.send("Unable to display RPG embed, Enable embeds in this channel to begin RPG events!")
            })
        }
    }else{
        message.channel.send({embed})
        .then(function(res){
            // console.log(res)
        })
        .catch(function(err){
            // console.log(err)
            message.channel.send("Unable to display event end embed, Enable embeds in this channel for future event end announcements!")
        })
    }
    
    cleanupEventEnded(event);
}

function increaseCompletionForUser(eventUser, rpgareaId, message, enemiesCount, customChannel){
    var discordUserId = eventUser.userid
    var currentareacompletion = eventUser.currentareacompletion || 0
    var enemiesToDefeatArea = getEnemiesToDefeatForArea(rpgareaId)
    profileDB.rpgAreaIncreaseCompletion(discordUserId, rpgareaId, currentareacompletion, enemiesCount, function(err, res){
        if (err){
            // console.log(err)
        }else{
            var areaCompletionForUser = currentareacompletion + enemiesCount
            var areaCompletedCheck = 0 
            var zoneUserIsIn = getRpgZone(rpgareaId)
            if ( areaCompletionForUser >= enemiesToDefeatArea
            && currentareacompletion < enemiesToDefeatArea ){
                var listOfRares = []
                var itemsForClaim = commands.getAllItems()
                for (var index in itemsForClaim){
                    if (itemsForClaim[index].itemraritycategory == "rare"
                    && itemsForClaim[index].fromscavenge == true
                    && !itemsForClaim[index].isseed){
                        // add to list of rares
                        listOfRares.push(itemsForClaim[index]);
                    }
                    if (itemsForClaim[index].itemraritycategory == "rare"
                    && itemFoundInZone(itemsForClaim[index], zoneUserIsIn)){
                        listOfRares.push(itemsForClaim[index]);
                    }
                }
                var indexOfRare = Math.floor(Math.random() * listOfRares.length);
                var rareWon = [listOfRares[indexOfRare]];
                addToUserInventory(discordUserId, rareWon);
                newAreaEmbedBuilder( eventUser.username, rpgareaId, message, rareWon, customChannel)
                // reward the user with a rare
                areaCompletedCheck = 1
            }
            var zoneComplete = eventUser.userdata[zoneUserIsIn]
            var areasToComplete = getAreasToCompletForZone(zoneUserIsIn)
            var areascompletedForUser = getAreasCompletedInZoneForUser(eventUser.userdata, zoneUserIsIn) + areaCompletedCheck
            // calculate areascompletedForUser 
            if (!zoneComplete && ( areascompletedForUser >= areasToComplete ) ){
                // reward the user with an ancient
                var listOfAncients = []
                var itemsForZoneComplete = commands.getAllItems()
                for (var index in itemsForZoneComplete){
                    if (itemsForZoneComplete[index].itemraritycategory == "ancient"
                    && itemsForZoneComplete[index].fromscavenge == true
                    && !itemsForZoneComplete[index].isseed){
                        // add to list of ancients
                        listOfAncients.push(itemsForZoneComplete[index]);
                    }
                    if (itemsForZoneComplete[index].itemraritycategory == "ancient"
                    && itemFoundInZone(itemsForZoneComplete[index], zoneUserIsIn) ){
                        listOfAncients.push(itemsForZoneComplete[index]);
                    }
                }
                var indexOfAncient = Math.floor(Math.random() * listOfAncients.length);
                var ancientWon = [listOfAncients[indexOfAncient]];
                addToUserInventory(discordUserId, ancientWon);
                // complete zone
                newZoneEmbedBuilder( eventUser.username, zoneUserIsIn, message, ancientWon, customChannel )
                profileDB.setZoneComplete(discordUserId, zoneUserIsIn, function(err, res){
                    if (err){
                        // console.log(err)
                    }else{
                        // console.log(res)
                    }
                })
            }
        }
    })
}

function getAreasCompletedInZoneForUser(userdata, zoneUserIsIn){
    // first calculate current zone based on area
    // only calculate that zone's completion
    // go through all areas in that zone, and get their completion and then compare to user reqs
    var numberOfAreasCompleted = 0
    var zoneAreas = rpgZones[zoneUserIsIn].areas
    for (var a in zoneAreas){
        var areaToCheck = zoneAreas[a]
        var enemiesToDefeatInArea = areaToCheck.enemiesToDefeat
        var rpgsCompletedByUser = userdata[a] || 0
        if (rpgsCompletedByUser >= enemiesToDefeatInArea){
            numberOfAreasCompleted++
        }
    }

    return numberOfAreasCompleted
}

function newAreaEmbedBuilder(username, areaId, message, itemWon, customChannel){
    let itemname = itemWon[0].itemname
    let itemshortname = itemWon[0].itemshortname
    const embed = new Discord.RichEmbed()
    .setAuthor("Area completed!")
    .setColor(0xF2E93E)
    // include the username
    // new areas + the number of RPGs needed in them
    var areaString = getAreaString(areaId)
    var zoneAreaIsIn = getRpgZone(areaId)
    var areaName = rpgZones[zoneAreaIsIn].areas[areaId].name
    embed.addField(username + " completed " + areaName ,  areaString);
    embed.addField("Item Reward", "Found a :small_blue_diamond: `" + itemname + "`! use `-iteminfo " + itemshortname + "` for more information on this item!", true);
    if (customChannel){
        customChannel.send({embed})
        .then(function(res){
            // console.log(res)
        })
        .catch(function(err){
            // console.log(err)
            message.channel.send("Unable to display new area embed, Enable embeds in this channel for future area unlock announcements!")
        })
    }else{
        message.channel.send({embed})
        .then(function(res){
            // console.log(res)
        })
        .catch(function(err){
            // console.log(err)
            message.channel.send("Unable to display new area embed, Enable embeds in this channel for future area unlock announcements!")
        })
    }
    
}

function newZoneEmbedBuilder(username, zoneId, message, itemWon, customChannel){
    let itemname = itemWon[0].itemname
    let itemshortname = itemWon[0].itemshortname
    const embed = new Discord.RichEmbed()
    .setAuthor("Zone completed!")
    .setColor(0xF2E93E)
    // include the username
    // new Zone + the level requirements
    var zoneString = getZoneString(zoneId)
    embed.addField(username,  zoneString, true);
    embed.addField("Item Reward",  "Found a :small_orange_diamond: `" + itemname + "`! use `-iteminfo " + itemshortname + "` for more information on this item!", true);
    if (customChannel){
        customChannel.send({embed})
        .then(function(res){
            // console.log(res)
        })
        .catch(function(err){
            // console.log(err)
            message.channel.send("Unable to display new zone embed, Enable embeds in this channel for future zone unlock announcements!")
        })
    }else{
        message.channel.send({embed})
        .then(function(res){
            // console.log(res)
        })
        .catch(function(err){
            // console.log(err)
            message.channel.send("Unable to display new zone embed, Enable embeds in this channel for future zone unlock announcements!")
        })
    }
}   

function getAreaString(areaId){
    var zoneAreaIsIn = getRpgZone(areaId)
    var areaString = "*" + rpgZones[zoneAreaIsIn].areas[areaId].areaString + "*"
    areaString = areaString + "\n\n" + "Map areas unlocked:\n"
    let areasUnlocked = rpgZones[zoneAreaIsIn].areas[areaId].onCompleteAreasUnlocked
    for (var a in areasUnlocked){
        areaString = areaString + "**" + areasUnlocked[a] + "**\n"
    }
    return areaString
}

function getZoneString(zoneId){
    return rpgZones[zoneId].zoneString
}

function getEnemiesToDefeatForArea(areaId){
    var zoneAreaIsIn = getRpgZone(areaId)
    var enemiesToDefeatForArea = rpgZones[zoneAreaIsIn].areas[areaId].enemiesToDefeat
    return enemiesToDefeatForArea
}

function getAreasToCompletForZone(rpgZoneId){
    var count = 0
    for (var key in rpgZones[rpgZoneId].areas){
        count++
    }
    return count
}

function createRpgStatData(rewardString, event, partySuccess){
    var dataToReturn = {}
    dataToReturn.success = partySuccess
    dataToReturn.rewards = rewardString
    dataToReturn.averagelevel = event.averageLevelInParty
    dataToReturn.xp = event.experienceHandedOut || 0
    var enemyString = ""
    for (var enemy in event.enemies){
        enemyString = enemyString + " " + event.enemies[enemy].name
    }
    for (var member in event.membersInParty){
        if (!dataToReturn.user1){
            dataToReturn.user1 = event.membersInParty[member].id
            dataToReturn.user1stats = event.membersInParty[member].maxhp + ", " + event.membersInParty[member].attackDmg + ", "+ event.membersInParty[member].magicDmg + ", " + event.membersInParty[member].armor + ", " + event.membersInParty[member].spirit + ", " + event.membersInParty[member].abilities
            continue;
        }else if (!dataToReturn.user2){
            dataToReturn.user2 = event.membersInParty[member].id
            dataToReturn.user2stats = event.membersInParty[member].maxhp + ", " + event.membersInParty[member].attackDmg + ", "+ event.membersInParty[member].magicDmg + ", " + event.membersInParty[member].armor + ", " + event.membersInParty[member].spirit + ", " + event.membersInParty[member].abilities
            continue;
        }else if (!dataToReturn.user3){
            dataToReturn.user3 = event.membersInParty[member].id
            dataToReturn.user3stats = event.membersInParty[member].maxhp + ", " + event.membersInParty[member].attackDmg + ", "+ event.membersInParty[member].magicDmg + ", " + event.membersInParty[member].armor + ", " + event.membersInParty[member].spirit + ", " + event.membersInParty[member].abilities
            continue;
        }else if (!dataToReturn.user4){
            dataToReturn.user4 = event.membersInParty[member].id
            dataToReturn.user4stats = event.membersInParty[member].maxhp + ", " + event.membersInParty[member].attackDmg + ", "+ event.membersInParty[member].magicDmg + ", " + event.membersInParty[member].armor + ", " + event.membersInParty[member].spirit + ", " + event.membersInParty[member].abilities
            continue;
        }else if (!dataToReturn.user5){
            dataToReturn.user5 = event.membersInParty[member].id
            dataToReturn.user5stats = event.membersInParty[member].maxhp + ", " + event.membersInParty[member].attackDmg + ", "+ event.membersInParty[member].magicDmg + ", " + event.membersInParty[member].armor + ", " + event.membersInParty[member].spirit + ", " + event.membersInParty[member].abilities
            continue;
        }
    }
    dataToReturn.enemies = enemyString
    dataToReturn.challenge = event.challenge ? event.challenge.challenge : null
    dataToReturn.keystone = event.challenge ? event.challenge.keystone : null
    return dataToReturn
}

function updateUserRewards(message, memberInParty, rewards, memberLastChannel){
    experience.gainExperience(message, memberInParty, rewards.rpgPoints, null, true, memberLastChannel) // true for RPG points
    experience.gainExperience(message, memberInParty, rewards.xp, null, false, memberLastChannel);
    if (rewards.items.length > 0){
        addToUserInventory(memberInParty.id, rewards.items);                        
    }
    if (rewards.extraTacos && rewards.extraTacos > 0){
        // add the tacos to the user
        profileDB.updateUserTacos(memberInParty.id, rewards.extraTacos, function(err, tacosRes){
            if (err){
                // console.log(err)
            }else{
                // console.log(tacosRes)
            }
        })
    }
}

function addToUserInventory(discordUserId, items){
    profileDB.addNewItemToUser(discordUserId, items, function(itemError, itemAddResponse){
        if (itemError){
            // console.log(itemError);
        }else{
            // console.log(itemAddResponse);
        }
    })
}

function addArtifactItem( allItems, extraItem){
    var rewardsForPlayer =  {
        xp: 0,
        rpgPoints: 0,
        items: []
    }
    var itemsObtainedArray = [];
    if (extraItem){
        for (var i in allItems){
            if (allItems[i].id == extraItem ){
                itemsObtainedArray.push(allItems[i])
            }
        }
    }
    rewardsForPlayer.items = itemsObtainedArray
    return rewardsForPlayer
}

function artifactEmbedBuilder(message, artifactItems, user){
    // create a quoted message of all the items
    var itemsMessage = ""
    for (var item in artifactItems){
        var itemAmount = artifactItems[item].itemAmount ? artifactItems[item].itemAmount : 1;
        itemsMessage = itemsMessage + "**" +itemAmount + "**x " + "[**" + artifactItems[item].itemraritycategory +"**] " + "**"  + artifactItems[item].itemname + "** - " + artifactItems[item].itemdescription + ", " +
        artifactItems[item].itemslot + ", " + artifactItems[item].itemstatistics + " \n";
    }

    const embed = new Discord.RichEmbed()
    .addField("[" + user.username +" has created an myth item :cyclone: ]  Items found: ", itemsMessage, true)
    .setThumbnail(user.avatarURL)
    .setColor(0xbfa5ff)
    message.channel.send({embed})
    .then(function(res){
        // console.log(res)
    })
    .catch(function(err){
        // console.log(err)
        message.channel.send("Unable to display artifact reward, Enable embeds in this channel for future artifact reward announcements!")
    })
}

function itemFoundInArea(item, eventArea){
    let foundinarea = false
    for (var a in item.findinareaarray){
        if (eventArea && item.findinareaarray[a] == eventArea){
            foundinarea = true
        }
    }
    return foundinarea
}

function itemFoundInZone(item, eventZone){
    let foundinzone = false
    for (var z in item.findinzonearray){
        if (eventZone && item.findinzonearray[z] == eventZone){
            foundinzone = true
        }
    }
    return foundinzone
}

function calculateRewards(event, memberInRpgEvent, allItems, numberOfMembers, firstKill){
    var rewardsForPlayer =  {
        xp: 1,
        extraTacos: 0,
        rpgPoints: 1,
        items: []
    }
    
    var additionalExperience = 0;
    var additionalRpgPoints = 0;

    var ANCIENT_MAX_ROLL = 9995
    var ANCIENT_MIN_ROLL = 9940;
    var RARE_MAX_ROLL = 9940;
    var RARE_MIN_ROLL = 9780;
    var UNCOMMON_MAX_ROLL = 9780;
    var UNCOMMON_MIN_ROLL = 8000;
    var COMMON_MAX_ROLL = 8000;
    var COMMON_ITEMS_TO_OBTAIN = 1;

    var commonItems = [];
    var uncommonItems = [];
    var rareItems = [];
    var ancientItems = [];
    var artifactItems = [];

    for (var item in allItems){
        if (allItems[item].itemraritycategory == "common"){
            commonItems.push(allItems[item]);
        }
        else if(allItems[item].itemraritycategory == "uncommon"){
            uncommonItems.push(allItems[item]);
        }
        else if(allItems[item].itemraritycategory == "rare"
        && (allItems[item].fromscavenge == true
        || (itemFoundInArea(allItems[item], event.area))
        || (itemFoundInZone(allItems[item], getRpgZone(event.area)) ) ) ){
            rareItems.push(allItems[item]);
        }
        else if(allItems[item].itemraritycategory == "ancient"
        && ( allItems[item].fromscavenge == true
        || (itemFoundInArea(allItems[item], event.area))
        || (itemFoundInZone(allItems[item], getRpgZone(event.area)) ) ) ){
            ancientItems.push(allItems[item]);
        }
        else if (allItems[item].itemraritycategory == "amulet"
        && ( allItems[item].amuletsource == "rpgchallenge"
        || (itemFoundInArea(allItems[item], event.area) )
        || (itemFoundInZone(allItems[item], getRpgZone(event.area)) ) ) ){
            ancientItems.push(allItems[item]);
        }
        else if(allItems[item].itemraritycategory == "artifact"
        && (allItems[item].fromscavenge == true
        || (itemFoundInArea(allItems[item], event.area))
        || (itemFoundInZone(allItems[item], getRpgZone(event.area)) ) ) ){
            artifactItems.push(allItems[item]);
        }
    }

    var itemsObtainedArray = [];
    // calculate xp based on level and difficulty of enemies and items
    if (event.challenge){
        var rarityRoll = undefined
        var challengeNum = event.challenge.challenge
        var keystone = event.challenge.keystone || 0

        var rareKeystoneItems = []
        var ancientsKeystoneItems = []
        // items based on 
        for (var item in allItems){
            let challengeDivider = Math.floor( (challengeNum - 1) / 3 ) + 1
            let itemRequirementDivider = (allItems[item].rpglevelrequirement / 9 )
            if (itemRequirementDivider == challengeDivider
            && allItems[item].itemraritycategory == "rare"
            && !allItems[item].findinchallenge){
                rareItems.push(allItems[item])
            }else if (itemRequirementDivider == challengeDivider
            && allItems[item].itemraritycategory == "ancient"
            && !allItems[item].findinchallenge){
                ancientItems.push(allItems[item])
            }
        }
        for (var item in allItems){
            if (allItems[item].itemraritycategory == "ancient"
            && allItems[item].findinchallenge == challengeNum
            && allItems[item].findinkeystone <= keystone){
                ancientsKeystoneItems.push(allItems[item]);
            }else if (allItems[item].itemraritycategory == "rare"
            && allItems[item].findinchallenge == challengeNum
            && allItems[item].findinkeystone <= keystone){
                rareKeystoneItems.push(allItems[item]);
            }
        }

        var numberOfRolls = enemiesToEncounter.challenge[challengeNum].lootcount || 3
        if (firstKill){
            numberOfRolls = numberOfRolls * 3
        }else{
            numberOfRolls = numberOfRolls + keystone
        }
        var gotKeystoneAncient = false;
        var gotKeystoneRare = false;
        for (var enemy = 0; enemy < numberOfRolls; enemy++){
            rarityRoll = Math.floor(Math.random() * 2500) + 7500;
            if (rarityRoll){
                if(rarityRoll > ANCIENT_MIN_ROLL ){
                    // check if keystone and roll for keystone loot / challenge loot
                    if (keystone && !gotKeystoneAncient){
                        var getKeystoneLootRoll = Math.floor(Math.random() * 15);
                        if (keystone >= getKeystoneLootRoll && ancientsKeystoneItems.length > 0){
                            var itemRoll = Math.floor(Math.random() * ancientsKeystoneItems.length);
                            itemsObtainedArray.push(ancientsKeystoneItems[itemRoll])  
                            gotKeystoneAncient = true;
                        }else{
                            var itemRoll = Math.floor(Math.random() * ancientItems.length);
                            itemsObtainedArray.push(ancientItems[itemRoll])        
                        }
                    }else{
                        var itemRoll = Math.floor(Math.random() * ancientItems.length);
                        itemsObtainedArray.push(ancientItems[itemRoll])    
                    }
                }
                else if(rarityRoll > RARE_MIN_ROLL && rarityRoll <= RARE_MAX_ROLL){
                    // check if keystone and roll for keystone loot challenge loot
                    if (keystone && !gotKeystoneRare){
                        var getKeystoneLootRoll = Math.floor(Math.random() * 10) + 1;
                        if (keystone >= getKeystoneLootRoll && rareKeystoneItems.length > 0){
                            var itemRoll = Math.floor(Math.random() * rareKeystoneItems.length);
                            itemsObtainedArray.push(rareKeystoneItems[itemRoll])  
                            gotKeystoneRare = true      
                        }else{
                            var itemRoll = Math.floor(Math.random() * rareItems.length);
                            itemsObtainedArray.push(rareItems[itemRoll]);    
                        }
                    }else{
                        var itemRoll = Math.floor(Math.random() * rareItems.length);
                        itemsObtainedArray.push(rareItems[itemRoll]);    
                    }
                }
                else if (rarityRoll > UNCOMMON_MIN_ROLL && rarityRoll <= UNCOMMON_MAX_ROLL){
                    var itemRoll = Math.floor(Math.random() * uncommonItems.length);
                    // console.log(uncommonItems[itemRoll]);
                    itemsObtainedArray.push( uncommonItems[itemRoll] );
                }
                else {
                    var itemRoll = Math.floor(Math.random() * commonItems.length);
                    // console.log(commonItems[itemRoll]);
                    commonItems[itemRoll].itemAmount = COMMON_ITEMS_TO_OBTAIN
                    itemsObtainedArray.push( commonItems[itemRoll] );
                }
            }
        }

        // get the challenge points
        var challengePts = enemiesToEncounter.challenge[challengeNum].points;
        var challengeXpPts = enemiesToEncounter.challenge[challengeNum].xppoints;
        if (keystone > 0){
            let pts = enemiesToEncounter.challenge[challengeNum].keystonePoints
            challengePts = pts && pts.length >= keystone ? challengePts + pts[keystone - 1] : challengePts
        }
        if (firstKill){
            challengePts = challengePts * ( 6 + challengeNum + keystone )
            challengeXpPts = challengeXpPts * ( 6 + challengeNum + keystone )
        }
        if (keystone > 0){
            challengeXpPts = challengeXpPts + ( ( enemiesToEncounter.challenge[challengeNum].xppoints * keystone ) / 2.5 )
        }
        var challengeDifficulty = enemiesToEncounter.challenge[challengeNum].difficulty ? enemiesToEncounter.challenge[challengeNum].difficulty : 1
        var extraXP =  memberInRpgEvent.extraXp
        rewardsForPlayer.extraTacos = rewardsForPlayer.extraTacos + memberInRpgEvent.extraTacosForUser
        rewardsForPlayer.xp = rewardsForPlayer.xp + challengeXpPts + extraXP;
        rewardsForPlayer.rpgPoints = rewardsForPlayer.rpgPoints + challengePts * challengeDifficulty
        
    }else{
        for (var enemy in event.enemies){
            let getThisRoll = true;
            let rpgZoneDifficulty = 1
            if (event.area){
                let craftingItems = []
                // number of rolls based on the number of people in the area
                let zoneAreaIsIn = getRpgZone(event.area)
                rpgZoneDifficulty = rpgZones[zoneAreaIsIn].zoneDifficulty
                for (var item in allItems){
                    if (allItems[item].itemraritycategory == "rare"
                    && ( event.area && allItems[item].dropsfromenemy 
                    && allItems[item].dropsfromenemy == event.enemies[enemy].enemyIdName ) ){
                        craftingItems.push(allItems[item]);
                    }
                }
                // roll for crafting items
                if (craftingItems.length > 0){
                    let craftingRoll = Math.floor(Math.random() * 1000 )
                    let craftingRollHasToBeOver = 930
                    if (craftingRoll > craftingRollHasToBeOver){
                        var itemRoll = Math.floor(Math.random() * craftingItems.length);
                        let itemObtained = craftingItems[itemRoll]
                        itemsObtainedArray.push( itemObtained )
                    }
                }
                let thresholdMap = {
                    2: 500,
                    3: 333,
                    4: 250,
                    5: 200
                }
                let extraRoll = Math.floor(Math.random() * 1000 )
                let extraRollHasToBeOver = 1000 - ( event.usersInArea.length * thresholdMap[event.members.length])
                if (extraRoll < extraRollHasToBeOver){
                    // got extra roll
                    getThisRoll = false
                }
                ///// grab the items that are available to the area, zone, and enemy
            }
            if (getThisRoll){
                var rarityRoll = undefined;
                var enemyDifficulty =  event.enemies[enemy].difficulty
                additionalExperience = additionalExperience + getAdditionalExperienceByDiffuclty(enemyDifficulty, rpgZoneDifficulty)
                additionalRpgPoints = additionalRpgPoints + getAdditionalRPGPtsByDifficulty(enemyDifficulty, rpgZoneDifficulty)
                rarityRoll = getRarityRollByDifficulty(enemyDifficulty, COMMON_MAX_ROLL, UNCOMMON_MAX_ROLL)
                let rollParams = {
                    ANCIENT_MIN_ROLL: ANCIENT_MIN_ROLL,
                    ancientItems: ancientItems,
                    RARE_MIN_ROLL: RARE_MIN_ROLL,
                    RARE_MAX_ROLL: RARE_MAX_ROLL,
                    rareItems: rareItems,
                    UNCOMMON_MIN_ROLL: UNCOMMON_MIN_ROLL,
                    UNCOMMON_MAX_ROLL: UNCOMMON_MAX_ROLL,
                    uncommonItems: uncommonItems,
                    commonItems: commonItems,
                    COMMON_ITEMS_TO_OBTAIN: COMMON_ITEMS_TO_OBTAIN
                }
                if (rarityRoll){
                    let itemObtained = rollForItemByRarity(rarityRoll, rollParams )
                    itemsObtainedArray.push( itemObtained )
                }
                if (event.queueEvent){
                    for (var n = 0; n < 2; n++){
                        // create rarity roll function
                        rarityRoll = getRarityRollByDifficulty(enemyDifficulty, COMMON_MAX_ROLL, UNCOMMON_MAX_ROLL)
                        let itemObtained = rollForItemByRarity(rarityRoll, rollParams )
                        itemsObtainedArray.push( itemObtained )
                    }
                }
            }
        }
        rewardsForPlayer.extraTacos = rewardsForPlayer.extraTacos + memberInRpgEvent.extraTacosForUser
    }
    if (event.special && event.special.xp){
        // get the special points, they should be in event.special.
        var specialPts = event.special.xp;

        rewardsForPlayer.xp = rewardsForPlayer.xp + specialPts;
        rewardsForPlayer.rpgPoints = rewardsForPlayer.rpgPoints + specialPts;
    }
    // calculate finds based on luck and diff of enemies
    rewardsForPlayer.xp = Math.floor(rewardsForPlayer.xp + additionalExperience + numberOfMembers)
    rewardsForPlayer.rpgPoints = Math.floor(rewardsForPlayer.rpgPoints + additionalRpgPoints + numberOfMembers);
    rewardsForPlayer.items = itemsObtainedArray
    return rewardsForPlayer
}

function getAdditionalRPGPtsByDifficulty(enemyDifficulty, rpgZoneDifficulty){
    if (enemyDifficulty == "easy"){
        return (1 * rpgZoneDifficulty)
    }else if (enemyDifficulty == "medium"){
        return (2 * rpgZoneDifficulty)
    }else if (enemyDifficulty == "hard"){
        return (9 * rpgZoneDifficulty)
    }else if (enemyDifficulty == "boss"){
        return (19 * rpgZoneDifficulty)
    }else if (enemyDifficulty == "special"){
        return (19 * rpgZoneDifficulty)
    }else{
        return (1 * rpgZoneDifficulty)
    }
}

function getAdditionalExperienceByDiffuclty(enemyDifficulty, rpgZoneDifficulty){
    if (enemyDifficulty == "easy"){
        return (1 * rpgZoneDifficulty)
    }else if (enemyDifficulty == "medium"){
        return (2 * rpgZoneDifficulty)
    }else if (enemyDifficulty == "hard"){
        return (9 * rpgZoneDifficulty)
    }else if (enemyDifficulty == "boss"){
        return + (19 * rpgZoneDifficulty)
    }else if (enemyDifficulty == "special"){
        return (19 * rpgZoneDifficulty)
    }else{
        return (1 * rpgZoneDifficulty)
    }
}

function getRarityRollByDifficulty(enemyDifficulty, COMMON_MAX_ROLL, UNCOMMON_MAX_ROLL ){
    if (enemyDifficulty == "easy"){
        return Math.floor(Math.random() * COMMON_MAX_ROLL) + 1;
    }else if (enemyDifficulty == "medium"){
        return Math.floor(Math.random() * UNCOMMON_MAX_ROLL) + 1;;
    }else if (enemyDifficulty == "hard"){
        return Math.floor(Math.random() * 3940) + 6000;
    }else if (enemyDifficulty == "boss" || enemyDifficulty == "boss+"){
        return Math.floor(Math.random() * 2000) + 8000;
    }else if (enemyDifficulty == "special"){
        return Math.floor(Math.random() * 2000) + 8000;
    }else{
        return Math.floor(Math.random() * 3780) + 6000;
    }
}

function rollForItemByRarity(rarityRoll, rollParams ){
    if(rarityRoll > rollParams.ANCIENT_MIN_ROLL ){
        var itemRoll = Math.floor(Math.random() * rollParams.ancientItems.length);
        return rollParams.ancientItems[itemRoll]
    }else if(rarityRoll > rollParams.RARE_MIN_ROLL && rarityRoll <= rollParams.RARE_MAX_ROLL){
        var itemRoll = Math.floor(Math.random() * rollParams.rareItems.length);
        return rollParams.rareItems[itemRoll]
    }else if (rarityRoll > rollParams.UNCOMMON_MIN_ROLL && rarityRoll <= rollParams.UNCOMMON_MAX_ROLL){
        var itemRoll = Math.floor(Math.random() * rollParams.uncommonItems.length);
        return rollParams.uncommonItems[itemRoll]
    }else {
        var itemRoll = Math.floor(Math.random() * rollParams.commonItems.length);
        rollParams.commonItems[itemRoll].itemAmount = rollParams.COMMON_ITEMS_TO_OBTAIN
        return rollParams.commonItems[itemRoll]
    }
}

function effectsOnTurnEnd(event){
    var endOfTurnString = "";
    // check buffs and statuses for each member, and enemy. if "onTurnEnd" exists then do the effect
    var currentTurn = event.turn;

    ///// Effects on turn end for members in party
    for (var member in event.membersInParty){
        if (!checkIfDeadByObject(event.membersInParty[member])){
            for (var index = event.membersInParty[member].buffs.length - 1; index >= 0; index--){
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
    
    
    // events at end of turn that belong to an enemy or member
    for (var enemy in event.enemies){
        if (!checkIfDeadByObject(event.enemies[enemy])){
            if (event.enemies[enemy].endOfTurnEvents){
                // process the end of turn event
                for (var index = event.enemies[enemy].endOfTurnEvents.length - 1; index >= 0; index--){
                    // check if there is a buff that makes this endofturnevent invalid
                    var validEOT = true;
                    if (event.enemies[enemy].endOfTurnEvents[index].invalidIfBuff){
                        for (var b in event.enemies[enemy].buffs){
                            if (event.enemies[enemy].buffs[b].abilityId == event.enemies[enemy].endOfTurnEvents[index].invalidIfBuff
                                && !event.enemies[enemy].buffs[b].invalid ){
                                // console.log("invalid " + event.enemies[enemy].buffs[b].abilityId )
                                // console.log("enemy to cast this " + event.enemies[enemy].name)
                                validEOT = false;
                                continue
                            }
                        }
                    }
                    if (!event.enemies[enemy].endOfTurnEvents[index].invalid && validEOT){
                        // event is areawide 
                        if ( event.enemies[enemy].endOfTurnEvents[index].areawide ){
                            // TODO: create the areawide event tied to the enemy
                            // console.log("in here")
                            if (event.enemies[enemy].endOfTurnEvents[index].processAbility){

                            }
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
                                if (!checkIfDeadByObject(event.membersInParty[member])){
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
                                var validCast = true
                                if (eotEvent.validIfBuff){
                                    // check that enemy has the buff required
                                    validCast = false;
                                    var buffToCheck = eotEvent.validIfBuff
                                    for (var i = event.enemies[enemy].buffs.length - 1; i >= 0; i--){
                                        if (event.enemies[enemy].buffs.indexOf("dead") == -1){
                                            // process the on turn end buff
                                            if (event.enemies[enemy].buffs[i].abilityId == buffToCheck
                                                && !event.enemies[enemy].buffs[i].invalid ){
                                                validCast = true;
                                                break;
                                            }
                                        }
                                    }
                                }
                                //////// Event is areawide dmg
                                if ( eotEvent.areawidedmg && validCast){
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
                                    var critStrike = damageToDeal.critical ? ">" : ""
                                    endOfTurnString = endOfTurnString + critStrike + "The group suffered " + damageToDeal.dmg + " damage - " + nameOfDeadMember + "'s " + rpgAbility.name + "\n";
                                    for (var targetToDealDmg in event.membersInParty){
                                        if (!checkIfDeadByObject(event.membersInParty[targetToDealDmg])){
                                            var abType = rpgAbility.areawidedmg.type
                                            damageToDealToPlayer = dealDamageTo( event.membersInParty[targetToDealDmg], damageToDeal.dmg, event, abType)
                                            endOfTurnString = endOfTurnString + triggerBufFromDamage(event, event.membersInParty[targetToDealDmg] )
                                            if (checkHasDied(event.membersInParty[targetToDealDmg])){
                                                endOfTurnString = endOfTurnString + hasDied(event, event.membersInParty[targetToDealDmg]);
                                            }
                                        }
                                    }
                                    if (eotEvent.areawidedmg.increaseDamagePerTurn){
                                        eotEvent.areawidedmg.dmg = eotEvent.areawidedmg.dmg + eotEvent.areawidedmg.increaseDamagePerTurn
                                    }
                                }
                                /// ability is rampage or glare (switch focus target)
                                if ( event.enemies[enemy].endOfTurnEvents[index].name == "Rampage"
                                || event.enemies[enemy].endOfTurnEvents[index].name == "Glare"){

                                    var rpgAbility;
                                    if (event.enemies[enemy].endOfTurnEvents[index].name == "Rampage"){
                                        rpgAbility =  JSON.parse(JSON.stringify ( rpgAbilities[ "rampage" ].status ));
                                    }
                                    if (event.enemies[enemy].endOfTurnEvents[index].name == "Glare"){
                                        rpgAbility =  JSON.parse(JSON.stringify ( rpgAbilities[ "glare" ].status ));
                                    }
                                    rpgAbility.focusedBy = enemy;
                                    rpgAbility.expireOnTurn = currentTurn + rpgAbility.turnsToExpire
                                    
                                    // must pick a random target but use ignore
                                    var validTarget = false;
                                    var stuckCount = 0
                                    var target = 0;

                                    while(!validTarget && stuckCount < 100){
                                        var targetRoll = Math.floor(Math.random() * event.members.length);
                                        var targetMember = event.members[targetRoll].id;
                                        var targetFocusedMember = false;
                                        if (stuckCount < 5){
                                            for (var member in event.members){
                                                var idOfMemberBeingChecked = "rpg-" + event.members[member].id;
                                                for (var statusToCheck in event.membersInParty[idOfMemberBeingChecked].statuses){
                                                    if (rpgAbility && rpgAbility.ignoreFocus){
                                                        // console.log("ignoring focus for ability")
                                                        // IGNORE FOCUS EFFECT - check if the person being targetted by the ability is being focused by the caster
                                                        if (rpgAbility.targetToApplyOn == "random"){
                                                            // ignore anything focus related randomize the target by just going with whatever was used for target
                                                            break;
                                                        }
                                                        if ( (targetMember == event.members[member].id) 
                                                            &&  event.membersInParty[idOfMemberBeingChecked].statuses[statusToCheck].name == "Focus"
                                                            && event.membersInParty[idOfMemberBeingChecked].statuses[statusToCheck].focusedBy == enemy){
                                                                targetFocusedMember = true;
                                                            }
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
                                        
                                        if (!checkIfDeadByObject(event.membersInParty["rpg-"+targetMember])){
                                            // valid target
                                            if (!targetFocusedMember){
                                                target = "rpg-"+targetMember;
                                                validTarget = true;
                                                // console.log("stuck count" + stuckCount)
                                            }
                                        }
                                        stuckCount++;
                                    }

                                    if (target == 0 ){
                                        // no valid targets left, everyone is dead TODO: figure this out later
                                    }else{
                                        if (event.membersInParty[target]
                                        && event.membersInParty[target].statuses){
                                            var targetName = event.membersInParty[target].name
                                            event.membersInParty[target].statuses.push(rpgAbility);
                                            endOfTurnString = endOfTurnString + targetName + " was affected with " + rpgAbility.name + "\n"
                                            if (event.enemies[enemy].endOfTurnEvents[index].name == "Glare"){
                                                // glare at the person that they are focusing
                                                var glaringAbility = JSON.parse(JSON.stringify ( rpgAbilities[ "glaring" ].buff ));
                                                glaringAbility.onlyTargettableBy.push( event.membersInParty[target].id )
                                                event.enemies[enemy].buffs.push(glaringAbility);
                                                endOfTurnString = endOfTurnString + event.enemies[enemy].name + " was affected with " + glaringAbility.name + "\n"

                                            }
                                        }
                                    }
                                }

                                ////// effect is a regular ability that should be processed as an ability
                                else if (event.enemies[enemy].endOfTurnEvents[index].processAbility){
                                    var validCast = true;
                                    if (event.enemies[enemy].endOfTurnEvents[index].validIfBuff){
                                        // check that enemy has the buff required
                                        validCast = false;
                                        var buffToCheck = event.enemies[enemy].endOfTurnEvents[index].validIfBuff
                                        for (var i = event.enemies[enemy].buffs.length - 1; i >= 0; i--){
                                            if (event.enemies[enemy].buffs.indexOf("dead") == -1){
                                                // process the on turn end buff
                                                if ( (event.enemies[enemy].buffs[i].name == buffToCheck
                                                    || event.enemies[enemy].buffs[i].abilityId == buffToCheck )
                                                    && !event.enemies[enemy].buffs[i].invalid){
                                                    validCast = true;
                                                    break;
                                                }
                                            }
                                        }
                                    }
                                    if (validCast){
                                        var abilityPicked = event.enemies[enemy].endOfTurnEvents[index].abilityId
                                        // get the rpgAbility from lib
                                        var rpgAbility = rpgAbilities[abilityPicked] ? JSON.parse(JSON.stringify(rpgAbilities[abilityPicked])) : undefined; 
                                        var untargettable = event.enemies[enemy].endOfTurnEvents[index].status ? event.enemies[enemy].endOfTurnEvents[index].status.untargettable : undefined;
                                        if (!untargettable){
                                            untargettable = event.enemies[enemy].endOfTurnEvents[index].dot ? event.enemies[enemy].endOfTurnEvents[index].dot.untargettable : undefined;
                                        }

                                        var validTarget = false;
                                        var stuckCount = 0
                                        var target = undefined;

                                        if (rpgAbility.targetWithName){

                                            // look for an enemy with that name
                                            for (var e in event.enemies){
                                                if (event.enemies[e].name == rpgAbility.targetWithName){
                                                    target = event.enemies[e].id
                                                    validTarget = true
                                                    break
                                                }
                                            }
                                        }
                                        if (rpgAbility.listOfPossibleTarget){
                                            // chose a target from list of possible and then send
                                            for (var e in event.enemies){
                                                if (rpgAbility.listOfPossibleTarget.indexOf(event.enemies[e].name) > -1 ){
                                                    if (rpgAbility.targetLowestPercent){
                                                        if (!target){
                                                            // no available target just so this is the first target
                                                            if (!checkIfDeadByObject(event.enemies[e])){
                                                                target = e
                                                                validTarget = true
                                                            }
                                                        }else{
                                                            // must be lower HP than current low HP
                                                            if (!checkIfDeadByObject(event.enemies[e])
                                                            && (event.enemies[e].hp / event.enemies[e].maxhp) <= event.enemies[target].hp / event.enemies[target].maxhp ) {
                                                                target = e
                                                            }
                                                        }
                                                    }else{
                                                        if (!target){
                                                            target = e
                                                            validTarget = true    
                                                        }
                                                    }
                                                }else{
                                                    if (!target){
                                                        target = e
                                                    }
                                                }
                                            }
                                        }
                                        while(!validTarget && stuckCount < 100){
                                            var targetRoll = Math.floor(Math.random() * event.members.length);
                                            var targetMember = event.members[targetRoll].id;
                                            var targetFocusedMember = false;
                                            if (stuckCount < 5){
                                                for (var member in event.members){
                                                    var idOfMemberBeingChecked = "rpg-" + event.members[member].id;
                                                    for (var statusToCheck in event.membersInParty[idOfMemberBeingChecked].statuses){
                                                        if (rpgAbility && rpgAbility.ignoreFocus){
                                                            // console.log("ignoring focus for ability")
                                                            // IGNORE FOCUS EFFECT - check if the person being targetted by the ability is being focused by the caster
                                                            if (rpgAbility.targetToApplyOn == "random"){
                                                                // ignore anything focus related randomize the target by just going with whatever was used for target
                                                                break;
                                                            }
                                                            if ( (targetMember == event.members[member].id) 
                                                                &&  event.membersInParty[idOfMemberBeingChecked].statuses[statusToCheck].name == "Focus"
                                                                && event.membersInParty[idOfMemberBeingChecked].statuses[statusToCheck].focusedBy == enemy){
                                                                    targetFocusedMember = true;
                                                                }
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
                                            
                                            if (!checkIfDeadByObject(event.membersInParty["rpg-"+targetMember])){
                                                // valid target
                                                if (untargettable && !targetFocusedMember){
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
                                                    if (!targetFocusedMember){
                                                        target = "rpg-"+targetMember;
                                                        validTarget = true;
                                                        // console.log("stuck count" + stuckCount)
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
                                }
                                //////// effect is a summoning
                                else if( event.enemies[enemy].endOfTurnEvents[index].summon ){
                                    var validSummon = true;
                                    if (event.enemies[enemy].endOfTurnEvents[index].validIfBuff){
                                        // check that enemy has the buff required
                                        validSummon = false;
                                        var buffToCheck = event.enemies[enemy].endOfTurnEvents[index].validIfBuff
                                        for (var i = event.enemies[enemy].buffs.length - 1; i >= 0; i--){
                                            if (event.enemies[enemy].buffs.indexOf("dead") == -1){
                                                // process the on turn end buff
                                                if ( (event.enemies[enemy].buffs[i].name == buffToCheck
                                                    || event.enemies[enemy].buffs[i].abilityId == buffToCheck ) 
                                                    &&  !event.enemies[enemy].buffs[i].invalid){
                                                    validSummon = true;
                                                    break;
                                                }
                                            }
                                        }
                                    }
                                    if (validSummon){
                                        if (event.enemies[enemy].endOfTurnEvents[index].summon.enemies){
                                            var listOfEnemies = event.enemies[enemy].endOfTurnEvents[index].summon.enemies
                                            for (var enemyToSummon in listOfEnemies){
                                                var nameOfSummon = listOfEnemies[enemyToSummon];
                                                var enemyBeingSummoned = event.enemies[enemy].endOfTurnEvents[index].summon
                                                var enemyFound = JSON.parse(JSON.stringify(  enemiesToEncounter.summoned[nameOfSummon]));
                                                endOfTurnString = endOfTurnString + summonEnemy(event, enemy, index, enemyFound, enemyBeingSummoned )
                                            }
                                            if (event.enemies[enemy].endOfTurnEvents[index].oneTimeCast){
                                                event.enemies[enemy].endOfTurnEvents[index].invalid = true;
                                            }
                                        }else{
                                            var nameOfSummon = event.enemies[enemy].endOfTurnEvents[index].summon.enemy;
                                            var enemyBeingSummoned = event.enemies[enemy].endOfTurnEvents[index].summon
                                            var enemyFound = JSON.parse(JSON.stringify(  enemiesToEncounter.summoned[nameOfSummon]));
                                            if (eotEvent.summon.summonCountPerDot){
                                                var dotCount = 0;
                                                dotCount = checkNumberOfDotsInGroupById(event, eotEvent.summon.summonCountPerDot)
                                                for (var i = 0; i < dotCount; i++){
                                                    endOfTurnString = endOfTurnString + summonEnemy(event, enemy, index, enemyFound, enemyBeingSummoned);
                                                }
                                            }else{
                                                endOfTurnString = endOfTurnString + summonEnemy(event, enemy, index, enemyFound, enemyBeingSummoned);
                                            }
                                            if (nameOfSummon == "energyCore"){
                                                var energize = rpgAbilities["energize"] ? JSON.parse(JSON.stringify(rpgAbilities["energize"])) : undefined;
                                                energize.buff.expireOnTurn = currentTurn + energize.buff.turnsToExpire
                                                event.enemies[enemy].buffs.push(energize.buff);
                                                endOfTurnString = endOfTurnString + event.enemies[enemy].name + " gained Energized 🗡 +22%, ☄️ + 22% \n\n"
                                            }
                                            if (event.enemies[enemy].endOfTurnEvents[index].oneTimeCast){
                                                event.enemies[enemy].endOfTurnEvents[index].invalid = true;
                                            }
                                        }
                                    }
                                }
                                if (eotEvent.eotMessage){
                                    endOfTurnString = endOfTurnString + eotEvent.eotMessage + "\n"
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
                                var enemyBeingSummoned = event.enemies[enemy].endOfTurnEvents[index].summon
                                // TODO: get the + ad and + MD
                                var enemyFound = JSON.parse(JSON.stringify(  enemiesToEncounter.summoned[nameOfSummon]));

                                endOfTurnString = endOfTurnString + summonEnemy(event, enemy, index, enemyFound, enemyBeingSummoned, true)
                            }
                            // EOT event is a regular ability to process
                            if (event.enemies[enemy].endOfTurnEvents[index].processAbility
                                && enemyHpInPercentage < event.enemies[enemy].endOfTurnEvents[index].hppercentage){

                                var validCast = true;
                                if (event.enemies[enemy].endOfTurnEvents[index].validIfBuff){
                                    // check that enemy has the buff required
                                    validCast = false;
                                    var buffToCheck = event.enemies[enemy].endOfTurnEvents[index].validIfBuff
                                    for (var i = event.enemies[enemy].buffs.length - 1; i >= 0; i--){
                                        if (event.enemies[enemy].buffs.indexOf("dead") == -1){
                                            // process the on turn end buff
                                            if ( (event.enemies[enemy].buffs[i].name == buffToCheck
                                                || event.enemies[enemy].buffs[i].abilityId == buffToCheck )
                                                && !event.enemies[enemy].buffs[i].invalid ){
                                                validCast = true;
                                                break;
                                            }
                                        }
                                    }
                                }
                                if (validCast){
                                    var abilityPicked = event.enemies[enemy].endOfTurnEvents[index].abilityId
                                    var untargettable = event.enemies[enemy].endOfTurnEvents[index].status ? event.enemies[enemy].endOfTurnEvents[index].status.untargettable : undefined;
                                    // get the rpgAbility from lib
                                    var rpgAbility = rpgAbilities[abilityPicked] ? JSON.parse(JSON.stringify(rpgAbilities[abilityPicked])) : undefined; 

                                    var validTarget = false;
                                    var stuckCount = 0
                                    var target;
                                    
                                    if (event.enemies[enemy].endOfTurnEvents[index].buff ){
                                        if (event.enemies[enemy].endOfTurnEvents[index].targetSelf){
                                            target = enemy
                                        }else{
                                            // TODO: target can be another random enemy
                                            target = undefined // replace with random enemy
                                        }
                                    }else{
                                        while(!validTarget && stuckCount < 100){
                                            var targetRoll = Math.floor(Math.random() * event.members.length);
                                            var targetMember = event.members[targetRoll].id;
                                            var targetFocusedMember = false;
                                            if (stuckCount < 5){
                                                for (var member in event.members){
                                                    var idOfMemberBeingChecked = "rpg-" + event.members[member].id;
                                                    for (var statusToCheck in event.membersInParty[idOfMemberBeingChecked].statuses){
                                                        if (rpgAbility && rpgAbility.ignoreFocus){
                                                            // console.log("ignoring focus for ability")
                                                            // IGNORE FOCUS EFFECT - check if the person being targetted by the ability is being focused by the caster
                                                            if ( (targetMember == event.members[member].id) 
                                                                &&  event.membersInParty[idOfMemberBeingChecked].statuses[statusToCheck].name == "Focus"
                                                                && event.membersInParty[idOfMemberBeingChecked].statuses[statusToCheck].focusedBy == enemy){
                                                                    targetFocusedMember = true;
                                                                }
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
                                            
                                            if (!checkIfDeadByObject(event.membersInParty["rpg-"+targetMember])){
                                                // valid target
                                                if (untargettable && !targetFocusedMember){
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
                                                    // console.log(stuckCount)
    
                                                }else{
                                                    if (!targetFocusedMember){
                                                        target = "rpg-"+targetMember;
                                                        validTarget = true;
                                                        // console.log("stuck count" + stuckCount)
                                                    }
                                                }
                                                
                                            }
                                            stuckCount++;
                                        }
                                    }
                                    

                                    var abilityToProcess = {
                                        user: enemy,
                                        ability: abilityPicked,
                                        target: target
                                    }
                                    if (abilityToProcess.target != undefined){
                                        endOfTurnString = endOfTurnString  + processAbility(abilityToProcess, event);                                        
                                    }
                                    if (event.enemies[enemy].endOfTurnEvents[index].oneTimeCast){
                                        event.enemies[enemy].endOfTurnEvents[index].invalid = true;
                                    }
                                }        

                            }

                            // special case for hppercentage and the event has dmgaura, and currentHealthPercentageDamage - (last part of exploretomb)
                            if ( event.enemies[enemy].endOfTurnEvents[index].dmgaura
                            && enemyHpInPercentage < event.enemies[enemy].endOfTurnEvents[index].hppercentage){
                                var validCast = true;
                                if (validCast){
                                    if (event.enemies[enemy].endOfTurnEvents[index].currentHealthPercentageDamage){
                                        var percentageToDeal = event.enemies[enemy].endOfTurnEvents[index].currentHealthPercentageDamage
                                        var ability = event.enemies[enemy].endOfTurnEvents[index].abilityId;
                                        var nameOfEndOfTurnAbility = event.enemies[enemy].endOfTurnEvents[index].name;
                                        // check that the event should be done this turn
                                        var rpgAbility = rpgAbilities[ability] ? JSON.parse(JSON.stringify(rpgAbilities[ability])) : undefined;                
                                        var damageToDeal = 1;
                                        
                                        var abilityObject = {
                                            user: 0, // aura
                                            ability: event.enemies[enemy].endOfTurnEvents[index].name
                                        }
                                        var abilityCaster = abilityObject.user;
                                        var rpgAbility = rpgAbilities[ability] ? JSON.parse(JSON.stringify(rpgAbilities[ability])) : undefined;
                                        endOfTurnString = endOfTurnString + event.enemies[enemy].name + " has dealt " + (percentageToDeal * 100).toFixed() + "% of the group's current health - " + nameOfEndOfTurnAbility +"\n"
                                        if (rpgAbility && (event.turn % rpgAbility.everyNTurns == 0) ){
                                            // deal damage depending on target's current health areawide
                                            var damageDrained = 0;
                                            for (var targetToDealDmg in event.membersInParty){
                                                var targetCurrentHp = event.membersInParty[targetToDealDmg].hp + event.membersInParty[targetToDealDmg].statBuffs.maxhp
                                                damageToDeal = Math.floor( targetCurrentHp * (1 - percentageToDeal) )
                                                if (rpgAbility.minimumDamageToDeal && damageToDeal.dmg < rpgAbility.minimumDamageToDeal){
                                                    damageToDeal = Math.floor( rpgAbility.minimumDamageToDeal )
                                                }
                                                if (!checkIfDeadByObject(event.membersInParty[targetToDealDmg])
                                                && !event.membersInParty[targetToDealDmg].immuneToAoe){
                                                    var abType = "physical"
                                                    damageToDealToPlayer = dealDamageTo( event.membersInParty[targetToDealDmg] , damageToDeal, event, abType)
                                                    endOfTurnString = endOfTurnString + triggerBufFromDamage(event, event.membersInParty[targetToDealDmg] )
                                                    //// CHECK if damage should be drained
                                                    if (event.enemies[enemy].endOfTurnEvents[index].drainDamage){
                                                        // check if keystone and multiply  the .drainDamage by .33
                                                        let keystoneBaseHealAddition = (event.challenge && event.challenge.keystone ? event.challenge.keystone : 0)
                                                        let keystoneExtraDrainDamage = .333 * keystoneBaseHealAddition
                                                        let drainDamageEOT = event.enemies[enemy].endOfTurnEvents[index].drainDamage 
                                                        drainDamageEOT = drainDamageEOT + (drainDamageEOT * keystoneExtraDrainDamage )
                                                        let damageDrainedFromPlayer = Math.floor( damageToDeal * drainDamageEOT )
                                                        damageDrained = damageDrained + damageDrainedFromPlayer
                                                        healTarget( event.enemies[enemy], { heal: damageDrainedFromPlayer })
                                                        if (event.enemies[enemy].hp > event.enemies[enemy].maxhp){
                                                            event.enemies[enemy].hp = event.enemies[enemy].maxhp
                                                        }
                                                    }
    
                                                    if ( checkHasDied(event.membersInParty[targetToDealDmg])){
                                                        endOfTurnString = endOfTurnString + hasDied(event, event.membersInParty[targetToDealDmg]);
                                                    }
                                                }
                                            }
                                            if (damageDrained > 0){
                                                endOfTurnString = endOfTurnString + event.enemies[enemy].name + " was healed for " + damageDrained + " - " + nameOfEndOfTurnAbility + "\n"
                                            }
                                        }
                                        else{
                                            ////// TODO: This code is the same as above, make a function out of this instead
                                            for (var targetToDealDmg in event.membersInParty){
                                                var targetCurrentHp = event.membersInParty[targetToDealDmg].hp + event.membersInParty[targetToDealDmg].statBuffs.maxhp
                                                damageToDeal = Math.floor( targetCurrentHp * (1 - percentageToDeal) )
                                                if (rpgAbility.minimumDamageToDeal && damageToDeal.dmg < rpgAbility.minimumDamageToDeal){
                                                    damageToDeal = Math.floor( rpgAbility.minimumDamageToDeal )
                                                }
                                                if (!checkIfDeadByObject(event.membersInParty[targetToDealDmg])
                                                && !event.membersInParty[targetToDealDmg].immuneToAoe){
                                                    var abType = "physical"
                                                    damageToDealToPlayer = dealDamageTo( event.membersInParty[targetToDealDmg] , damageToDeal, event, abType)
                                                    endOfTurnString = endOfTurnString + triggerBufFromDamage(event, event.membersInParty[targetToDealDmg] )
                                                }
                                            }
                                        }
                                        if (event.enemies[enemy].endOfTurnEvents[index].oneTimeCast){
                                            event.enemies[enemy].endOfTurnEvents[index].invalid = true;
                                        }
                                    }else{
                                        var ability = event.enemies[enemy].endOfTurnEvents[index].abilityId;
                                        var nameOfEndOfTurnAbility = event.enemies[enemy].endOfTurnEvents[index].name;
                                        // check that the event should be done this turn
                                        var rpgAbility = rpgAbilities[ability] ? JSON.parse(JSON.stringify(rpgAbilities[ability])) : undefined;                
                                        var damageToDeal = 1;
                                        
                                        var abilityObject = {
                                            user: 0, // aura
                                            ability: ability
                                        }
                                        var abilityCaster = abilityObject.user;
                                        var rpgAbility = rpgAbilities[ability] ? JSON.parse(JSON.stringify(rpgAbilities[ability])) : undefined;
                                        if (rpgAbility && rpgAbility.areawidedmg && rpgAbility.areawidedmg.dmgPerTurn){
                                            if (rpgAbility.rpgAbilityStartTurn){
                                                rpgAbility.areawidedmg.dmg = rpgAbility.areawidedmg.dmg + (rpgAbility.areawidedmg.dmgPerTurn * (event.turn - rpgAbilityStartTurn))
                                            }else{
                                                rpgAbility.areawidedmg.dmg = rpgAbility.areawidedmg.dmg + rpgAbility.areawidedmg.dmgPerTurn * event.turn
                                            }
                                            if (event.area){
                                                var zoneUserIsIn = getRpgZone(event.area)
                                                let enemyAreaStatBuffs = rpgZones[zoneUserIsIn].enemyStatBuffs || {}
                                                if (enemyAreaStatBuffs.echoIncreasePercentage){
                                                    rpgAbility.areawidedmg.dmg = Math.floor(rpgAbility.areawidedmg.dmg * enemyAreaStatBuffs.echoIncreasePercentage)
                                                }
                                            }
                                        }
                                        if (rpgAbility && rpgAbility.areawidedmg && (event.turn % rpgAbility.areawidedmg.hitsEveryNTurn  == 0)){
                                            // deal the damage to all the users
                                            damageToDeal = calculateDamageDealt(event, abilityCaster, abilityObject.target, rpgAbility.areawidedmg)
                                            var critStrike = damageToDeal.critical ? ">" : ""
                                            endOfTurnString = endOfTurnString + critStrike + "The group suffered " + damageToDeal.dmg + " damage - " + nameOfEndOfTurnAbility +"\n"
                                            for (var targetToDealDmg in event.membersInParty){
                                                if (!checkIfDeadByObject(event.membersInParty[targetToDealDmg])
                                                && !event.membersInParty[targetToDealDmg].immuneToAoe){
                                                    var abType = rpgAbility.areawidedmg.type
                                                    damageToDealToPlayer = dealDamageTo(event.membersInParty[targetToDealDmg], damageToDeal.dmg, event, abType)
                                                    endOfTurnString = endOfTurnString + triggerBufFromDamage(event, event.membersInParty[targetToDealDmg] )
                                                    if (checkHasDied(event.membersInParty[targetToDealDmg])){
                                                        endOfTurnString = endOfTurnString + hasDied(event, event.membersInParty[targetToDealDmg]);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                
                            }
                            else if (eotEvent.zombifyAll
                            && enemyHpInPercentage < event.enemies[enemy].endOfTurnEvents[index].hppercentage){
                                var validCast = true;
                                if (validCast){
                                    var abilityPicked = event.enemies[enemy].endOfTurnEvents[index].abilityId
                                    var rpgAbility = rpgAbilities[abilityPicked] ? JSON.parse(JSON.stringify(rpgAbilities[abilityPicked])) : undefined; 
                                    // go through each enemy, check if they are dead, create a zombie of them
                                    // statswise they should have same HP, but 50% more dmg
                                    let casterOfReanimate = event.enemies[enemy]
                                    endOfTurnString = endOfTurnString +  casterOfReanimate.name + " reanimated the fallen enemies\n"
                                    for (var e in event.enemies){
                                        // do not reanimate self
                                        if (checkHasDied(event.enemies[e])
                                        && e != enemy){
                                            // zombify this enemy
                                            let enemyToReanimate = event.enemies[e]
                                            endOfTurnString = endOfTurnString + reanimateEnemy(event, enemyToReanimate, rpgAbility);
                                        }
                                    }
                                    if (event.enemies[enemy].endOfTurnEvents[index].oneTimeCast){
                                        event.enemies[enemy].endOfTurnEvents[index].invalid = true;
                                    }
                                }
                            }
                            if (eotEvent.eotMessage
                            && enemyHpInPercentage < event.enemies[enemy].endOfTurnEvents[index].hppercentage){
                                endOfTurnString = endOfTurnString + eotEvent.eotMessage + "\n"
                                if (event.enemies[enemy].endOfTurnEvents[index].oneTimeCast){
                                    event.enemies[enemy].endOfTurnEvents[index].invalid = true;
                                }
                            }
                        }

                        // reset dmg under certain conditions
                        if (eotEvent.resetEOTDamageForAbilityWhenBuffLost){
                            if (checkBuffCountByAbilityId(eotEvent.resetEOTDamageForAbilityWhenBuffLost, event.enemies[enemy]) == 0){
                                // for areawide dmg
                                if (eotEvent.areawidedmg && eotEvent.areawidedmg.damageToResetTo){
                                    eotEvent.areawidedmg.dmg = eotEvent.areawidedmg.damageToResetTo
                                }
                            }
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
        if (!checkIfDeadByObject(event.enemies[enemy])){
            for (var index = event.enemies[enemy].buffs.length - 1; index >= 0; index--){
                // process the on turn end buff
                if (event.enemies[enemy].buffs[index].onTurnEnd){
                    
                    if (event.enemies[enemy].buffs[index].onTurnEnd.attackDmgPlus){
                        var onTurnEndCurrentTurn = event.enemies[enemy].buffs[index].onTurnEnd.currentTurn || 0
                        if (onTurnEndCurrentTurn){
                            if (onTurnEndCurrentTurn >= event.enemies[enemy].buffs[index].onTurnEnd.startTurn
                            && (event.enemies[enemy].buffs[index].onTurnEnd.startTurn + event.enemies[enemy].buffs[index].onTurnEnd.everyNTurns + onTurnEndCurrentTurn) % event.enemies[enemy].buffs[index].onTurnEnd.everyNTurns == 0){
                                event.enemies[enemy].attackDmg = event.enemies[enemy].attackDmg + event.enemies[enemy].buffs[index].onTurnEnd.attackDmgPlus
                                endOfTurnString = endOfTurnString + event.enemies[enemy].name + 
                                " +" + event.enemies[enemy].buffs[index].onTurnEnd.attackDmgPlus + " 🗡 " +
                                " from " + event.enemies[enemy].buffs[index].name + " \n"
                            }
                        }else{
                            if (currentTurn >= event.enemies[enemy].buffs[index].onTurnEnd.startTurn
                            && (event.enemies[enemy].buffs[index].onTurnEnd.startTurn + event.enemies[enemy].buffs[index].onTurnEnd.everyNTurns + currentTurn) % event.enemies[enemy].buffs[index].onTurnEnd.everyNTurns == 0){
                                event.enemies[enemy].attackDmg = event.enemies[enemy].attackDmg + event.enemies[enemy].buffs[index].onTurnEnd.attackDmgPlus
                                endOfTurnString = endOfTurnString + event.enemies[enemy].name + 
                                " +" + event.enemies[enemy].buffs[index].onTurnEnd.attackDmgPlus + " 🗡 " +
                                " from " + event.enemies[enemy].buffs[index].name + " \n"
                            }
                        }
                    }

                    if (event.enemies[enemy].buffs[index].onTurnEnd.magicDmgPlus){
                        var onTurnEndCurrentTurn = event.enemies[enemy].buffs[index].onTurnEnd.currentTurn || 0
                        if (onTurnEndCurrentTurn){
                            if (onTurnEndCurrentTurn >= event.enemies[enemy].buffs[index].onTurnEnd.startTurn
                            && (event.enemies[enemy].buffs[index].onTurnEnd.startTurn + event.enemies[enemy].buffs[index].onTurnEnd.everyNTurns + onTurnEndCurrentTurn) % event.enemies[enemy].buffs[index].onTurnEnd.everyNTurns  == 0){
                                event.enemies[enemy].magicDmg = event.enemies[enemy].magicDmg + event.enemies[enemy].buffs[index].onTurnEnd.magicDmgPlus
                                endOfTurnString = endOfTurnString + event.enemies[enemy].name + 
                                " +" + event.enemies[enemy].buffs[index].onTurnEnd.magicDmgPlus + " ☄️ " +
                                " from " + event.enemies[enemy].buffs[index].name + " \n"
                            }
                        }else{
                            if (currentTurn >= event.enemies[enemy].buffs[index].onTurnEnd.startTurn
                            && (event.enemies[enemy].buffs[index].onTurnEnd.startTurn + event.enemies[enemy].buffs[index].onTurnEnd.everyNTurns + currentTurn) % event.enemies[enemy].buffs[index].onTurnEnd.everyNTurns  == 0){
                                event.enemies[enemy].magicDmg = event.enemies[enemy].magicDmg + event.enemies[enemy].buffs[index].onTurnEnd.magicDmgPlus
                                endOfTurnString = endOfTurnString + event.enemies[enemy].name + 
                                " +" + event.enemies[enemy].buffs[index].onTurnEnd.magicDmgPlus + " ☄️ " +
                                " from " + event.enemies[enemy].buffs[index].name + " \n"
                            }
                        }
                    }

                    if (event.enemies[enemy].buffs[index].onTurnEnd.currentTurn){
                        event.enemies[enemy].buffs[index].onTurnEnd.currentTurn++
                    }
                }
            }
        }
    }

    //end of turn event that belongs to the rpg event
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
                    if (rpgAbility.rpgAbilityStartTurn){
                        rpgAbility.areawidedmg.dmg = rpgAbility.areawidedmg.dmg + (rpgAbility.areawidedmg.dmgPerTurn * (event.turn - rpgAbilityStartTurn))
                    }else{
                        rpgAbility.areawidedmg.dmg = rpgAbility.areawidedmg.dmg + rpgAbility.areawidedmg.dmgPerTurn * event.turn
                    }
                    if (event.area){
                        var zoneUserIsIn = getRpgZone(event.area)
                        let enemyAreaStatBuffs = rpgZones[zoneUserIsIn].enemyStatBuffs || {}
                        if (enemyAreaStatBuffs.echoIncreasePercentage){
                            rpgAbility.areawidedmg.dmg = Math.floor(rpgAbility.areawidedmg.dmg * enemyAreaStatBuffs.echoIncreasePercentage)
                        }
                    }
                }
                if (rpgAbility && rpgAbility.areawidedmg && (event.turn % rpgAbility.areawidedmg.hitsEveryNTurn  == 0)){
                    // deal the damage to all the users
                    damageToDeal = calculateDamageDealt(event, abilityCaster, abilityObject.target, rpgAbility.areawidedmg)
                    var critStrike = damageToDeal.critical ? ">" : ""
                    endOfTurnString = endOfTurnString + critStrike + "The group suffered " + damageToDeal.dmg + " damage - " + nameOfEndOfTurnAbility +"\n"
                    for (var targetToDealDmg in event.membersInParty){
                        if (!checkIfDeadByObject(event.membersInParty[targetToDealDmg])
                        && !event.membersInParty[targetToDealDmg].immuneToAoe){
                            var abType = rpgAbility.areawidedmg.type
                            damageToDealToPlayer = dealDamageTo(event.membersInParty[targetToDealDmg], damageToDeal.dmg, event, abType)
                            endOfTurnString = endOfTurnString + triggerBufFromDamage(event, event.membersInParty[targetToDealDmg] )
                            if (checkHasDied(event.membersInParty[targetToDealDmg])){
                                endOfTurnString = endOfTurnString + hasDied(event, event.membersInParty[targetToDealDmg]);
                            }
                        }
                    }
                }
            }

            if (event.endOfTurnEvents[index].deadCheck){
                var enemiesToCheckIfKilled = event.endOfTurnEvents[index].deadCheck
                var enemiesKilled = event.endOfTurnEvents[index].enemiesKilled
                var checkOver = event.endOfTurnEvents[index].addBuffIfOverCount
                let castAbility = false
                let buffToCast = event.endOfTurnEvents[index].addBuffIfCheck
                for (var e in enemiesToCheckIfKilled){
                    let checkCount = 0
                    for (var k in enemiesKilled){
                        if (enemiesKilled[k] == enemiesToCheckIfKilled[e]){
                            checkCount++
                        }
                    }
                    if (checkCount > checkOver){
                        // 
                        castAbility = true
                        // clear out the enemieskilled to not duplicate
                        for (var k = enemiesKilled.length - 1; k >= 0; k--){
                            if (enemiesKilled[k] == enemiesToCheckIfKilled[e]){
                                enemiesKilled.splice(k, 1)
                            }
                        }
                    }
                }
                if (castAbility){
                    abilityPicked = buffToCast
                    rpgAbility = rpgAbilities[abilityPicked] ? JSON.parse(JSON.stringify(rpgAbilities[abilityPicked])) : undefined; 
                    var target = undefined
                    var enemy = undefined
                    for (var e in event.enemies){
                        if (event.enemies[e].name == event.endOfTurnEvents[index].targetName){
                            if (!checkIfDeadByObject(event.enemies[e])){
                                target = e
                                enemy = e
                            }
                        }
                    }
                    abilityToProcess = {
                        user: enemy,
                        ability: abilityPicked,
                        target: target
                    }
                    if (abilityToProcess.target != undefined){
                        endOfTurnString = endOfTurnString  + processAbility(abilityToProcess, event);    
                    }
                }
            }
            // event is ressurrection after N turns
            if (event.endOfTurnEvents[index].reviveCheck){
                var enemiesToCheckIfDead = event.endOfTurnEvents[index].reviveCheck
                var enemiesAlive = enemiesToCheckIfDead.length;
                for (var e in enemiesToCheckIfDead){
                    // if both are alive, or if both are dead, do nothing do nothing
                    for (var k in event.enemies){
                        if ( event.enemies[k].name == enemiesToCheckIfDead[e] 
                        && !checkIfDeadByObject(event.enemies[k])){
                            // enemy checked is dead
                            enemiesAlive--
                        }
                    }
                }

                if ( !(enemiesAlive == 0 || enemiesAlive == enemiesToCheckIfDead.length) ){
                    event.endOfTurnEvents[index].currentTurnsAfterFirstDeath++
                }
                if (event.endOfTurnEvents[index].currentTurnsAfterFirstDeath >= event.endOfTurnEvents[index].afterNTurnsFirstDeath){
                    // revive the dead enemies in enemiesToCheckIfDead
                    for (var e in enemiesToCheckIfDead){
                        for (var k in event.enemies){
                            if ( event.enemies[k].name == enemiesToCheckIfDead[e] 
                            && checkIfDeadByObject(event.enemies[k])){
                                var deadIndex = event.enemies[k].statuses.indexOf("dead")
                                var targetToReviveName = event.enemies[k].name
                                hasRevived(event.enemies[k], deadIndex, .75)
                                endOfTurnString = endOfTurnString + targetToReviveName + " was Ressurrected\n" 
                            }
                        }
                        
                    }
                    event.endOfTurnEvents[index].currentTurnsAfterFirstDeath = 0
                }
            }

            var eotEvent = event.endOfTurnEvents[index]

            if ( eotEvent.afterNTurns ){
                var currTurn = eotEvent.currentTurn;
                var afterNTurns = eotEvent.afterNTurns;
                var everyNTurns = eotEvent.everyNTurns;
                // 4 - ( 4 - 3 ) % 3 == 0
                if (currTurn >= afterNTurns && ((currTurn - (afterNTurns - everyNTurns)) % everyNTurns == 0 )){
                    if (eotEvent.reviveCheck){
                        var enemiesToCheckIfDead = eotEvent.reviveCheck
                        // revive the dead enemies in enemiesToCheckIfDead
                        for (var e in enemiesToCheckIfDead){
                            for (var k in event.enemies){
                                if ( event.enemies[k].name == enemiesToCheckIfDead[e] 
                                && !checkIfDeadByObject(event.enemies[k])){
                                    var deadIndex = event.enemies[k].statuses.indexOf("dead")
                                    var targetToReviveName = event.enemies[k].name
                                    hasRevived(event.enemies[k], deadIndex, 1)
                                    endOfTurnString = endOfTurnString + targetToReviveName + " was Ressurrected\n" 
                                }
                            }
                        }
                    }
                    // is a summon
                    if (eotEvent.summon){
                        var validSummon = true;
                        // TODO: logic where it wouldn't be valid
                        if (validSummon){
                            
                            if (eotEvent.summon.enemies){
                                // multiple enemies
                                var listOfEnemies = eotEvent.summon.enemies
                                for (var enemyToSummon in listOfEnemies){
                                    var nameOfSummon = listOfEnemies[enemyToSummon];
                                    var enemyBeingSummoned = eotEvent.summon
                                    var enemyFound = JSON.parse(JSON.stringify(  enemiesToEncounter.summoned[nameOfSummon]));
                                    endOfTurnString = endOfTurnString + summonEnemy(event, enemy, index, enemyFound, enemyBeingSummoned )
                                }
                                if (eotEvent.oneTimeCast){
                                    eotEvent.invalid = true;
                                }
                            }else{
                                // single enemy
                                var nameOfSummon = eotEvent.summon.enemy;
                                var enemyBeingSummoned = eotEvent.summon
                                var enemyFound = JSON.parse(JSON.stringify(  enemiesToEncounter.summoned[nameOfSummon]));
                                endOfTurnString = endOfTurnString + summonEnemy(event, enemy, index, enemyFound, enemyBeingSummoned);
                                if (eotEvent.oneTimeCast){
                                    eotEvent.invalid = true;
                                }
                            }
        
                        }
                    }
                }
                eotEvent.currentTurn++;
            }

            if (eotEvent.startTarget){
                // cast this whenever there is no target with the buff to handle
                // if the target is dead, instead grab one from listOfpossibleTransfer
                // if theres transferToHighestHpOnRemove then pick highest hp
                // if no options then random it
                var target = undefined;
                var enemy = undefined;
                var abilityPicked = eotEvent.buffToHandleId
                if (event.turn < 2){
                    for (var e in event.enemies){
                        if (event.enemies[e].name == eotEvent.startTarget
                            && !checkIfDeadByObject(event.enemies[e])){
                                target = e
                                enemy = e
                        }
                    }
                }
                
                // check no other target has the buff
                var buffIsCurrentlyActive = false
                for (var enemy in event.enemies){
                    for (var b in event.enemies[enemy].buffs){
                        if (event.enemies[enemy].buffs[b].abilityId == abilityPicked){
                            buffIsCurrentlyActive = true
                            break;
                        }
                    }
                }
                if (!buffIsCurrentlyActive){
                    if (!target){
                        // get a new valid target
                        // TODO: still might be highest
                        for (var e in event.enemies){
                            if ( !target || (eotEvent.listOfpossibleTransfer.indexOf(event.enemies[e].name ) > -1
                            && !checkIfDeadByObject(event.enemies[e])
                            && event.enemies[e].hp >= event.enemies[target].hp)){
                                target = e
                                enemy = e
                            }
                        }
                    }
                    var abilityToProcess = {
                        user: target,
                        ability: abilityPicked,
                        target: target
                    }
                    if (abilityToProcess.target != undefined){
                        endOfTurnString = endOfTurnString  + processAbility(abilityToProcess, event);                                        
                    }
                    // go through the buffs and check abilitypicked
                    if (eotEvent.removeAtHpPercentagePerTransfer){
                        for (var b in event.enemies[target].buffs){
                            if (event.enemies[target].buffs[b].abilityId == abilityPicked){
                                // edit the buff to be removed at a certain %
                                // check current HP percentage, then calculate the percentage where it should be removed
                                var currentHpPercentForTarget = ( event.enemies[target].hp / event.enemies[enemy].maxhp )
                                var hpToTransferAt = currentHpPercentForTarget - eotEvent.removeAtHpPercentagePerTransfer
                                eotEvent.transferAtHpPercentage = hpToTransferAt
                                event.enemies[target].buffs[b].removeAtHpPercentage = hpToTransferAt
                            }
                        }
                    }
                    if (eotEvent.onNewCastAddBuff){
                        // cast energy
                        abilityPicked = eotEvent.onNewCastAddBuff
                        rpgAbility = rpgAbilities[abilityPicked] ? JSON.parse(JSON.stringify(rpgAbilities[abilityPicked])) : undefined; 

                        abilityToProcess = {
                            user: enemy,
                            ability: abilityPicked,
                            target: target
                        }
                        if (abilityToProcess.target != undefined){
                            endOfTurnString = endOfTurnString  + processAbility(abilityToProcess, event);    
                        }
                    }
                }
            }

            if (eotEvent.transferAtHpPercentage){
                // transferToHighestHpOnRemove
                var transfering = false
                var enemyHoldingBuff = undefined
                // removeAtHpPercentagePerTransfer
                if (eotEvent.transferToHighestHpOnRemove){
                    // listOfpossibleTransfer
                    var buffToHandleId = eotEvent.buffToHandleId
                    for (var enemy in event.enemies){
                        for (var buff in event.enemies[enemy].buffs){
                            var buffBeingChecked = event.enemies[enemy].buffs[buff]
                            if (buffBeingChecked.abilityId == buffToHandleId){
                                enemyHoldingBuff = enemy
                            }
                        }
                    }
                    // check if enemy is under hp threshold
                    if (enemyHoldingBuff 
                        && eotEvent.transferAtHpPercentage != undefined
                        && (event.enemies[enemyHoldingBuff].hp / event.enemies[enemyHoldingBuff].maxhp) < eotEvent.transferAtHpPercentage){
                        transfering = true
                    }
                }

                if (transfering){
                    // get the next possible target to transfer the buff to
                    var enemyToTransferTo = undefined
                    var sameEnemy = false
                    if (eotEvent.transferToHighestHpOnRemove){
                        for (var enemy in event.enemies){
                            if (eotEvent.listOfpossibleTransfer.indexOf( event.enemies[enemy].name ) > -1 ){
                                if (!enemyToTransferTo
                                    || event.enemies[enemy].hp >= event.enemies[enemyToTransferTo].hp){
                                    
                                    enemyToTransferTo = enemy
                                }
                            }
                        }
                        if (enemyToTransferTo == enemyHoldingBuff){
                            sameEnemy = true
                        }
                    }else{
                        // transfer to random ?
                    }
                    
                    if (enemyToTransferTo){
                        // cast strength on current darkness enemy
                        if (eotEvent.onTransferCasterGainsBuff && enemyHoldingBuff){
                            var abilityPicked = eotEvent.onTransferCasterGainsBuff
                            var rpgAbility = rpgAbilities[abilityPicked] ? JSON.parse(JSON.stringify(rpgAbilities[abilityPicked])) : undefined; 
                            var target = enemyHoldingBuff;
                            var abilityToProcess = {
                                user: target,
                                ability: abilityPicked,
                                target: target
                            }
                            endOfTurnString = endOfTurnString  + processAbility(abilityToProcess, event);    
                        }
                        if (enemyHoldingBuff){
                            // remove the buff from the enemy holding it
                            for (var b in event.enemies[enemyHoldingBuff].buffs){
                                if (event.enemies[enemyHoldingBuff].buffs[b].abilityId == eotEvent.buffToHandleId){
                                    event.enemies[enemyHoldingBuff].buffs.splice(b, 1)
                                }
                            }
                        }

                        // transfer darkness
                        var abilityPicked = eotEvent.buffToHandleId
                        var rpgAbility = rpgAbilities[abilityPicked] ? JSON.parse(JSON.stringify(rpgAbilities[abilityPicked])) : undefined; 
                        var target = enemyToTransferTo;

                        var abilityToProcess = {
                            user: target,
                            ability: abilityPicked,
                            target: target
                        }
                        if (abilityToProcess.target != undefined){
                            endOfTurnString = endOfTurnString  + processAbility(abilityToProcess, event);    
                            // go through the buffs and check abilitypicked
                            for (var b in event.enemies[target].buffs){
                                if (event.enemies[target].buffs[b].abilityId == abilityPicked){
                                    // edit the buff to be removed at a certain %
                                    if (eotEvent.removeAtHpPercentagePerTransfer){
                                        // check current HP percentage, then calculate the percentage where it should be removed
                                        var currentHpPercentForTarget = ( event.enemies[target].hp / event.enemies[target].maxhp )
                                        var hpToTransferAt = currentHpPercentForTarget - eotEvent.removeAtHpPercentagePerTransfer
                                        eotEvent.transferAtHpPercentage = hpToTransferAt
                                        event.enemies[target].buffs[b].removeAtHpPercentage = hpToTransferAt
                                    }
                                }
                            }                             
                        }
                        if (transfering && eotEvent.onTransferGiveBuffToTransferTarget){
                            // cast the energy buff on same target that gained darkness
                            // cast energy
                            var abilityPicked = eotEvent.onTransferGiveBuffToTransferTarget
                            var rpgAbility = rpgAbilities[abilityPicked] ? JSON.parse(JSON.stringify(rpgAbilities[abilityPicked])) : undefined; 
                            var target = enemyToTransferTo;
        
                            var abilityToProcess = {
                                user: target,
                                ability: abilityPicked,
                                target: target
                            }
                            if (abilityToProcess.target != undefined){
                                endOfTurnString = endOfTurnString  + processAbility(abilityToProcess, event);    
                            }
                        }

                        if (eotEvent.onTransferResetAbilityDamage){
                            var abilityPicked = eotEvent.onTransferResetAbilityDamage
                            // check for end of turn ability and reset it
                            for (var e in event.enemies[enemyHoldingBuff].endOfTurnEvents){
                                let enemyEOTEvent = event.enemies[enemyHoldingBuff].endOfTurnEvents[e]
                                if (enemyEOTEvent.abilityId == abilityPicked){
                                    if (enemyEOTEvent.areawidedmg){
                                        enemyEOTEvent.areawidedmg.dmg = enemyEOTEvent.areawidedmg.damageToResetTo
                                    }else{
                                        enemyEOTEvent.dmg = enemyEOTEvent.damageToResetTo
                                    }
                                }
                            }
                        }
                        
                        // cast puncture on random player
                        if (eotEvent.onTransferCastAbility){
                            var abilityPicked = eotEvent.onTransferCastAbility
                            var rpgAbility = rpgAbilities[abilityPicked] ? JSON.parse(JSON.stringify(rpgAbilities[abilityPicked])) : undefined; 
                            // should be random target
                            var validTarget = false;
                            var stuckCount = 0
                            var target = undefined;
                            
                            if (rpgAbility.buff ){
                                if (rpgAbility.targetSelf){
                                    target = enemy
                                }else{
                                    // TODO: target can be another random enemy
                                    target = undefined // replace with random enemy
                                }
                            }else{
                                while(!validTarget && stuckCount < 100){
                                    var targetRoll = Math.floor(Math.random() * event.members.length);
                                    var targetMember = event.members[targetRoll].id;
                                    var targetFocusedMember = false;
                                    if (stuckCount < 5){
                                        for (var member in event.members){
                                            var idOfMemberBeingChecked = "rpg-" + event.members[member].id;
                                            for (var statusToCheck in event.membersInParty[idOfMemberBeingChecked].statuses){
                                                if (rpgAbility && rpgAbility.ignoreFocus){
                                                    // console.log("ignoring focus for ability")
                                                    // IGNORE FOCUS EFFECT - check if the person being targetted by the ability is being focused by the caster
                                                    if ( (targetMember == event.members[member].id) 
                                                        &&  event.membersInParty[idOfMemberBeingChecked].statuses[statusToCheck].name == "Focus"
                                                        && event.membersInParty[idOfMemberBeingChecked].statuses[statusToCheck].focusedBy == enemy){
                                                            targetFocusedMember = true;
                                                        }
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
                                    
                                    if (!checkIfDeadByObject(event.membersInParty["rpg-"+targetMember])){
                                        // valid target
                                        if (untargettable && !targetFocusedMember){
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
                                            // console.log(stuckCount)

                                        }else{
                                            if (!targetFocusedMember){
                                                target = "rpg-"+targetMember;
                                                validTarget = true;
                                                // console.log("stuck count" + stuckCount)
                                            }
                                        }
                                        
                                    }
                                    stuckCount++;
                                }
                            }

                            var abilityToProcess = {
                                user: enemyHoldingBuff,
                                ability: abilityPicked,
                                target: target
                            }
                            if (abilityToProcess.target != undefined){
                                endOfTurnString = endOfTurnString  + processAbility(abilityToProcess, event);    
                            }
                        }
                    }
                }

                if (eotEvent.clearBuffIfBuffToHandleNotExists){
                    // TODO: check for any targets that have the buff and do not have bufftohandleId
                    
                }
                
            }


            // event is message
            
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

function checkIfDeadByName(enemyName, event){
    return 
}

function checkIfDeadByTargetId(targetId, event){
    return
}

function checkIfDeadByObject(playerObject){
    return (playerObject.statuses.indexOf("dead") > -1)
}

function reanimateEnemy(event, enemy, reanimateRpgAbility){
    if (enemy){
        let copyOfEnemy = JSON.parse(JSON.stringify(enemy))
        copyOfEnemy.name = "Zombie"
        var enemyIdCount = event.enemiesCount + 1;
        copyOfEnemy.id = enemyIdCount
        var reanimateAdPlus = reanimateRpgAbility.admdMultiplier || 1;
        var reanimateMdPlus = reanimateRpgAbility.admdMultiplier || 1;
        copyOfEnemy.attackDmg = copyOfEnemy.attackDmg * reanimateAdPlus
        copyOfEnemy.magicDmg = copyOfEnemy.magicDmg * reanimateMdPlus
        copyOfEnemy.hp = copyOfEnemy.maxhp
        copyOfEnemy.endOfTurnEvents = []
        copyOfEnemy.buffs = []
        copyOfEnemy.statuses = []
        event.enemiesCount++;
        event.enemies[copyOfEnemy.id] = copyOfEnemy;

        var summonString = enemy.name + " has been reanimated\n" 
        return summonString;
    }else{
        return ""
    }
}

function summonEnemy(event, enemy, index, enemyFound, summonRpgAbility, castOnce){
    // summoning plus ad, md, armor, spirit

    // check that an enemy already exists with that name
    var areaToCheck = event.area
    let hpAreaBuff = 1
    let adAreaBuff = 1
    let mdAreaBuff = 1
    let armorAreaBuff = 1
    let spiritAreaBuff = 1  
    let enemyAreaStatBuffs;  
    if (areaToCheck){
        var zoneUserIsIn = getRpgZone(areaToCheck)
        enemyAreaStatBuffs = rpgZones[zoneUserIsIn].enemyStatBuffs || {}
        hpAreaBuff = enemyAreaStatBuffs.hpPlusPercentage || 1
        adAreaBuff = enemyAreaStatBuffs.adPlusPercentage || 1
        mdAreaBuff = enemyAreaStatBuffs.mdPlusPercentage || 1
        armorAreaBuff = enemyAreaStatBuffs.armorPlusPercentage || 1
        spiritAreaBuff = enemyAreaStatBuffs.spiritPlusPercentage || 1    
    }

    var enemyWithNameExists = false
    for (var e in event.enemies){
        if (event.enemies[e].name == enemyFound.name){
            enemyWithNameExists = true
            break
        }
    }
    var ableToSummon = true;
    if (enemyFound.uniqueEnemy == true && enemyWithNameExists){
        ableToSummon = false
    }

    if (ableToSummon){
        var summoningAdPlus = summonRpgAbility.attackDmg || 0;
        var summoningMdPlus = summonRpgAbility.magicDmg || 0;
        var summoningHpPlus = summonRpgAbility.hpPlus || 0;
    
        var averageLevelInParty = event.averageLevelInParty;
        var enemyIdCount = event.enemiesCount + 1;
        var enemyCount = event.enemiesCount;
        var enemySummoned = {
            id: enemyIdCount,
            name: enemyFound.name,
            emoji: enemyFound.emoji,
            hp: Math.floor( hpAreaBuff * (enemyFound.hp + (21 * averageLevelInParty) + (enemyFound.hpPerPartyMember * enemyCount) + summoningHpPlus ) ), 
            attackDmg: Math.floor( adAreaBuff * ( enemyFound.attackDmg + (enemyFound.adPerPartyMember * enemyCount) + summoningAdPlus ) ), 
            magicDmg: Math.floor( mdAreaBuff * ( enemyFound.magicDmg + (enemyFound.mdPerPartyMember * enemyCount) + summoningMdPlus ) ),
            armor: Math.floor( armorAreaBuff * ( enemyFound.armor ) ),
            spirit: Math.floor( spiritAreaBuff * ( enemyFound.spirit ) ),
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
            globalStatuses: {
                ableToAttack: true,
                abletotakedamage: true,
                abletobehealed: true,
                endofturnenable: true,
                damageDealtPercentage: 1,
                damageTakenPercentage: 1,
                magicDamageTakenPercentage: 1,
                physicalDamageTakenPercentage: 1,
                healingDonePercentage: 1,
                healingTakenPercentage: 1
            },
            difficulty: enemyFound.difficulty,
            abilities: enemyFound.abilities,
            effectsOnDeath: enemyFound.effectsOnDeath,
            abilitiesMap : {},
            element: enemyFound.element
        }

        if (enemyAreaStatBuffs && enemyAreaStatBuffs.frenzyAdIncreasePercentage){
            for (var b in enemySummoned.buffs){
                if (enemySummoned.buffs[b].name == "frenzy"){
                    enemySummoned.buffs[b].onTurnEnd.attackDmgPlus = Math.floor( enemySummoned.buffs[b].onTurnEnd.attackDmgPlus * enemyAreaStatBuffs.frenzyAdIncreasePercentage)
                    enemySummoned.buffs[b].onTurnEnd.magicDmgPlus = Math.floor( enemySummoned.buffs[b].onTurnEnd.magicDmgPlus * enemyAreaStatBuffs.frenzyAdIncreasePercentage)
                }
            }
        }
        
        if (enemyFound.abilityOrder){
            enemySummoned.abilityOrder = enemyFound.abilityOrder
            for (var c = 0; c < event.turn; c++){
                enemySummoned.abilityOrder.unshift(enemySummoned.abilityOrder.pop())
            }
        }
        for( var ability in enemySummoned.abilities){
            var abilityName = enemySummoned.abilities[ability]
            if (rpgAbilities[abilityName] && rpgAbilities[abilityName].passive){
                // add it as a buff and a passive ability
                var passiveAbilityBuff = JSON.parse(JSON.stringify( rpgAbilities[abilityName].buff ));
                enemySummoned.buffs.push(passiveAbilityBuff);
                enemySummoned.passiveAbilities.push(passiveAbilityBuff);
                enemySummoned.abilitiesMap[passiveAbilityBuff.name] = passiveAbilityBuff;
                if (rpgAbilities[rpgAbilities[abilityName]].status){
                    var passiveAbilityStatus = JSON.parse(JSON.stringify( rpgAbilities[rpgAbilities[abilityName]].status ));
                    enemySummoned.statuses.push(passiveAbilityStatus);
                    enemySummoned.passiveAbilities.push(passiveAbilityStatus);
                    enemySummoned.abilitiesMap[passiveAbilityStatus.name] = passiveAbilityStatus;    
                }
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
                    event.endOfTurnEvents.push( eventToPush );
                }else if ( eventToPush.belongsToMember ){
                    enemySummoned.endOfTurnEvents.push( eventToPush );
                }
            }
        }
        var keystoneNum = event.challenge ? event.challenge.keystone : 0
        if (keystoneNum > 0){
            // add stats to enemies TODO: add it to summoned enemies
            var keystoneStatsArrayIndex = keystoneNum - 1
            if (enemyFound.keystoneStats){
                enemySummoned.hp = enemySummoned.hp  + enemyFound.keystoneStats.hp[keystoneStatsArrayIndex]
                enemySummoned.attackDmg = enemySummoned.attackDmg + enemyFound.keystoneStats.attackDmg[keystoneStatsArrayIndex]
                enemySummoned.magicDmg = enemySummoned.magicDmg + enemyFound.keystoneStats.magicDmg[keystoneStatsArrayIndex]
                if (enemyFound.keystoneStats.frenzy){
                    for (var b in enemySummoned.buffs){
                        if (enemySummoned.buffs[b].name == "frenzy"){
                            enemySummoned.buffs[b].onTurnEnd.attackDmgPlus = enemyFound.keystoneStats.frenzy.attackDmgPlus[keystoneStatsArrayIndex]
                            enemySummoned.buffs[b].onTurnEnd.magicDmgPlus = enemyFound.keystoneStats.frenzy.magicDmgPlus[keystoneStatsArrayIndex]
                        }
                    }
                }

                // replace the lists instead of adding onto them
                if (enemyFound.keystoneStats.abilities){

                }
                if (enemyFound.keystoneStats.abilityOrder){

                }
                if (enemyFound.keystoneStats.endOfTurnEvents){
                    for (var eventAtEndOfTurn in enemyFound.keystoneStats.endOfTurnEvents){
                        var endOfTurnEventName =  enemyFound.keystoneStats.endOfTurnEvents[ eventAtEndOfTurn ]
                        // check it is at the right keystone num
                        if ( rpgAbilities[ endOfTurnEventName ] ){
                            var eventToPush = JSON.parse(JSON.stringify( rpgAbilities[ endOfTurnEventName ] ));
                            if (keystoneNum >= eventToPush.aboveKeystone){
                                if ( eventToPush.belongsToEvent ){
                                    activeRPGEvents[rpgEvent].endOfTurnEvents.push( eventToPush );
                                }else if ( eventToPush.belongsToMember ){
                                    enemySummoned.endOfTurnEvents.push( eventToPush );
                                }
                            }
                        }
                    }
                }
                if (enemyFound.keystoneStats.effectsOnDeath){
                    
                }
            }
        }
        enemySummoned.immuneToAoe = enemyFound.immuneToAoe
        enemySummoned.maxhp = enemySummoned.hp;
        enemyIdCount++;
        // add the enemy to the list
        event.enemiesCount++;
        event.enemies[enemySummoned.id] = enemySummoned;
        if (enemyFound.baseHpOn){
            // set the HP to the hp of the 
            var hpAccumulated = 0
            for (var n in enemyFound.baseHpOn){
                for (var e in event.enemies){
                    if (event.enemies[e].name == enemyFound.baseHpOn[n]){
                        var hpOfEnemy = event.enemies[e].hp
                        hpAccumulated = hpAccumulated + hpOfEnemy
                    }
                }
            }
            hpAccumulated = hpAccumulated * enemyFound.baseHpOnMultiplier
            enemySummoned.hp = hpAccumulated
        }
    
        // make the event invalid so it doesnt happen anymore
        // or else it would happen every turn afterwards
        if (castOnce){
            event.enemies[enemy].endOfTurnEvents[index].invalid = true;
        }
        var summonString = enemySummoned.name + " has been summoned\n" 
        return summonString;
    }else{
        return ""
    }
    
}

function effectsOnDeath(event, member, killerId){
    var onDeathString = "";
    var currentTurn = event.turn;
    // do effect on death
    var idOfMember = member.id
    var effectsToRemove = []
    if ( event.enemies[idOfMember] && event.enemies[idOfMember].effectsOnDeath){
        // the enemy has an effect on death, get the rpgAbility based on name
        for (var effect in event.enemies[idOfMember].effectsOnDeath){
            var validEOD = true
            var rpgAbility = JSON.parse(JSON.stringify( rpgAbilities[ event.enemies[idOfMember].effectsOnDeath[effect] ] ));
            if (rpgAbility.invalidIfBuff){
                for (var b in event.enemies[idOfMember].buffs){
                    if (event.enemies[idOfMember].buffs[b].abilityId == rpgAbility.invalidIfBuff
                        && !event.enemies[idOfMember].buffs[b].invalid){
                        validEOD = false;
                        continue
                    }
                }
            }
            /////// death effect is aoe dmg
            if (rpgAbility && rpgAbility.areawidedmg && validEOD){
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
                var critStrike = damageToDeal.critical ? ">" : ""
                onDeathString = onDeathString + critStrike + "The group suffered " + damageToDeal.dmg + " damage - " + nameOfDeadMember + "'s " + rpgAbility.name + "\n";
                for (var targetToDealDmg in event.membersInParty){
                    if (!checkIfDeadByObject(event.membersInParty[targetToDealDmg])
                    && !event.membersInParty[targetToDealDmg].immuneToAoe){
                        var abType = rpgAbility.areawidedmg.type
                        damageToDealToPlayer = dealDamageTo( event.membersInParty[targetToDealDmg], damageToDeal.dmg, event, abType)
                        onDeathString = onDeathString + triggerBufFromDamage(event, event.membersInParty[targetToDealDmg] )
                        if (checkHasDied(event.membersInParty[targetToDealDmg])){
                            onDeathString = onDeathString + hasDied(event, event.membersInParty[targetToDealDmg]);
                        }
                    }
                }
            }
            ////// death effect is a message
            if (rpgAbility.deathMessage){
                onDeathString = onDeathString + rpgAbility.deathMessage + "\n"
            }
            ///// effect gives a buff to members in party
            if (rpgAbility && rpgAbility.buff && validEOD){
                if (rpgAbility.targetToApplyOn == "random"){
                    var validCast = true;
                    if (validCast){
                        var untargettable = rpgAbility.untargettable;
                        var abilityPicked = rpgAbility.abilityId
                        var validTarget = false;
                        var stuckCount = 0
                        var target;

                        while(!validTarget && stuckCount < 100){
                            var targetFocusedMember = false;
                            var targetRoll = Math.floor(Math.random() * event.members.length);
                            var targetMember = event.members[targetRoll].id;
                            if (stuckCount < 5){
                                for (var member in event.members){
                                    var idOfMemberBeingChecked = "rpg-" + event.members[member].id;
                                    for (var statusToCheck in event.membersInParty[idOfMemberBeingChecked].statuses){
                                        if (rpgAbility && rpgAbility.ignoreFocus){
                                            // console.log("ignoring focus for ability")
                                            // IGNORE FOCUS EFFECT - check if the person being targetted by the ability is being focused by the caster
                                            if ( (targetMember == event.members[member].id) 
                                                &&  event.membersInParty[idOfMemberBeingChecked].statuses[statusToCheck].name == "Focus"
                                                && event.membersInParty[idOfMemberBeingChecked].statuses[statusToCheck].focusedBy == idOfMember){
                                                    targetFocusedMember = true;
                                                }
                                        }else{
                                            // check if someone has focus on them if they do then the target should be the focused person 
                                            if ( event.membersInParty[idOfMemberBeingChecked].statuses[statusToCheck].name == "Focus"
                                                && event.membersInParty[idOfMemberBeingChecked].statuses[statusToCheck].focusedBy == idOfMember){
                                                //target roll should be 
                                                targetMember = event.members[member].id;
                                                break;
                                            }
                                        }
                                        
                                    }
                                }
                            }
                            
                            if (!checkIfDeadByObject(event.membersInParty["rpg-"+targetMember])){
                                // valid target
                                if (untargettable && !targetFocusedMember){
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
                                    // console.log(stuckCount)

                                }else{
                                    if (!targetFocusedMember){
                                        target = "rpg-"+targetMember;
                                        validTarget = true;
                                        // console.log("stuck count" + stuckCount)
                                    }
                                }
                                
                            }
                            stuckCount++;
                        }

                        var abilityToProcess = {
                            user: idOfMember,
                            ability: abilityPicked,
                            target: target
                        }
                        if (abilityToProcess.target != undefined){
                            onDeathString = onDeathString  + processAbility(abilityToProcess, event);  
                            if ( rpgAbility.effectDone == false ){
                                // remove this effect from effectsOnDeath Array
                                effectsToRemove.push(rpgAbility.abilityId)
                            }                                    
                        }
                    }
                }
            }
            ///// effect is a dot applied
            if (rpgAbility && rpgAbility.dot && validEOD){
                if (rpgAbility.targetToApplyOn == "random"){
                    var validCast = true;
                    if (validCast){
                        var untargettable = rpgAbility.untargettable;
                        var abilityPicked = rpgAbility.abilityId
                        var validTarget = false;
                        var stuckCount = 0
                        var target;

                        while(!validTarget && stuckCount < 100){
                            var targetFocusedMember = false;
                            var targetRoll = Math.floor(Math.random() * event.members.length);
                            var targetMember = event.members[targetRoll].id;
                            if (stuckCount < 5){
                                for (var member in event.members){
                                    var idOfMemberBeingChecked = "rpg-" + event.members[member].id;
                                    for (var statusToCheck in event.membersInParty[idOfMemberBeingChecked].statuses){
                                        if (rpgAbility && rpgAbility.ignoreFocus){
                                            // console.log("ignoring focus for ability")
                                            // IGNORE FOCUS EFFECT - check if the person being targetted by the ability is being focused by the caster
                                            if ( (targetMember == event.members[member].id) 
                                                &&  event.membersInParty[idOfMemberBeingChecked].statuses[statusToCheck].name == "Focus"
                                                && event.membersInParty[idOfMemberBeingChecked].statuses[statusToCheck].focusedBy == idOfMember){
                                                    targetFocusedMember = true;
                                                }
                                        }else{
                                            // check if someone has focus on them if they do then the target should be the focused person 
                                            if ( event.membersInParty[idOfMemberBeingChecked].statuses[statusToCheck].name == "Focus"
                                                && event.membersInParty[idOfMemberBeingChecked].statuses[statusToCheck].focusedBy == idOfMember){
                                                //target roll should be 
                                                targetMember = event.members[member].id;
                                                break;
                                            }
                                        }
                                        
                                    }
                                }
                            }
                            
                            if (!checkIfDeadByObject(event.membersInParty["rpg-"+targetMember])){
                                // valid target
                                if (untargettable && !targetFocusedMember){
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
                                    // console.log(stuckCount)
                                }else{
                                    if (!targetFocusedMember){
                                        target = "rpg-"+targetMember;
                                        validTarget = true;
                                        // console.log("stuck count" + stuckCount)
                                    }
                                }
                            }
                            stuckCount++;
                        }

                        var abilityToProcess = {
                            user: idOfMember,
                            ability: abilityPicked,
                            target: target
                        }
                        if (abilityToProcess.target != undefined){
                            onDeathString = onDeathString  + processAbility(abilityToProcess, event);  
                            if ( rpgAbility.effectDone == false ){
                                // remove this effect from effectsOnDeath Array
                                effectsToRemove.push(rpgAbility.abilityId)
                            }                                    
                        }
                    }
                }
            }
            ///// effect removes buff from enemy
            if (rpgAbility && rpgAbility.removeEnemyBuff && validEOD){
                for (var enemyToCheck in event.enemies){
                    var enemyToCheckBuff = event.enemies[enemyToCheck]
                    for (var b in enemyToCheckBuff.buffs){
                        if (enemyToCheckBuff.buffs[b].name == rpgAbility.removeEnemyBuff){
                            onDeathString = onDeathString + enemyToCheckBuff.name + " lost " + enemyToCheckBuff.buffs[b].name + "\n"
                            enemyToCheckBuff.buffs.splice(b, 1);
                            break;
                        }
                    }
                }
            }
            ////// effect heals the rest of the enemies
            if (rpgAbility && rpgAbility.heal && rpgAbility.areawide && validEOD){

                var rpgAbility = JSON.parse(JSON.stringify( rpgAbilities[ event.enemies[idOfMember].effectsOnDeath[effect] ] ));
                
                var abilityObject = {
                    user: event.enemies[idOfMember].id,
                    ability: rpgAbility.name
                }
                var ability = abilityObject.ability;
                var abilityCaster = abilityObject.user;

                var caster = event.enemies[abilityCaster] ? event.enemies[abilityCaster].name : undefined;
                
                var hpToHeal = calculateHealingDone(event, abilityCaster, abilityObject.target, rpgAbility);
                var critStrike = hpToHeal.critical ? ">" : ""
                onDeathString = onDeathString + critStrike + caster +  " healed the group for " + hpToHeal.heal + " - " + ability + "\n";                
                for (var targetToHeal in event.enemies){
                    if (event.enemies[targetToHeal].hp > 0
                    && !checkIfDeadByObject(event.enemies[targetToHeal])
                    && event.enemies[targetToHeal].difficulty == "boss"){
                        healTarget( event.enemies[targetToHeal], hpToHeal)
                        if (event.enemies[targetToHeal].hp > event.enemies[targetToHeal].maxhp){
                            event.enemies[targetToHeal].hp = event.enemies[targetToHeal].maxhp
                        }
                    }
                }
            }
            /////// Effect cleanly transfers the abilities to another enemy
            if (rpgAbility && rpgAbility.transferTo){
                var abilitiesToTransfer = rpgAbility.abilitiesToTransfer
                var transferToEnemies = rpgAbility.transferTo
                var abilitiesToPush = []
                for (var a in member.endOfTurnEvents){
                    if ( abilitiesToTransfer.indexOf( member.endOfTurnEvents[a].abilityId ) > -1 ){
                        abilitiesToPush.push(member.endOfTurnEvents[a])
                    }
                }
                // got all the abilities, now look for the enemies to push onto
                for (var en in event.enemies){
                    if ( transferToEnemies.indexOf(  event.enemies[en].name ) > -1
                    && !checkIfDeadByObject(event.enemies[en])) {
                        onDeathString = onDeathString + event.enemies[en].name + " grows stronger\n"
                        for (var a in abilitiesToPush){
                            event.enemies[en].endOfTurnEvents.push( abilitiesToPush[a] )
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
                    && !checkIfDeadByObject(event.enemies[enemy])){
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
                            if (rpgAbility.name == "Summon Demon" && !rpgAbility.transferred){
                                rpgAbility.summon.attackDmg = rpgAbility.summon.attackDmg + (rpgAbility.summon.attackDmg * .1);
                                rpgAbility.summon.magicDmg = rpgAbility.summon.magicDmg + (rpgAbility.summon.magicDmg * .1);;
                                rpgAbility.everyNTurns = rpgAbility.everyNTurns - 1;
                            }else if (rpgAbility.name == "Electric Orb" && !rpgAbility.transferred){
                                rpgAbility.dmg = rpgAbility.dmg + (rpgAbility.dmg * .05);
                                rpgAbility.status.dmgOnExpire = rpgAbility.status.dmgOnExpire + (rpgAbility.status.dmgOnExpire * .15);
                                rpgAbility.status.dmgOnRemove = rpgAbility.status.dmgOnRemove + (rpgAbility.status.dmgOnRemove * .15);
                                rpgAbility.everyNTurns = rpgAbility.everyNTurns - 1;
                            }else if (rpgAbility.name == "Tremor" && !rpgAbility.transferred){
                                rpgAbility.areawidedmg.dmg = rpgAbility.areawidedmg.dmg + (rpgAbility.areawidedmg.dmg * .1);;
                                rpgAbility.everyNTurns = rpgAbility.everyNTurns - 1;
                            }
                        })
                    }
                }

                if (bossesAlive.length == 1){
                    onDeathString = onDeathString + bossesAlive[0].name + " Gains Unimaginable Power 🗡 +30%, ☄️ +15% \n";
                    // give the enemy + 30%/15% magic and attack
                    var enemy = bossesAlive[0].enemyNumber;
                    event.enemies[enemy].attackDmg = event.enemies[enemy].attackDmg + ( event.enemies[enemy].attackDmg * .3 );
                    event.enemies[enemy].magicDmg = event.enemies[enemy].magicDmg + ( event.enemies[enemy].magicDmg * .15 );
                    // add an ability for keystone
                    let unimaginablePower = JSON.parse( JSON.stringify( rpgAbilities["unimaginablePower"] ) );
                    if (event.challenge.keystone >= unimaginablePower.aboveKeystone){
                        event.enemies[enemy].endOfTurnEvents.push(unimaginablePower)
                    }
                }else if (bossesAlive.length == 2){
                    // give the enemy + 10%/5% magic and attack
                    var enemyOne = bossesAlive[0].enemyNumber;
                    var enemyTwo = bossesAlive[1].enemyNumber;
                    event.enemies[enemyOne].attackDmg = event.enemies[enemyOne].attackDmg + ( event.enemies[enemyOne].attackDmg * .1 );
                    event.enemies[enemyOne].magicDmg = event.enemies[enemyOne].magicDmg + ( event.enemies[enemyOne].magicDmg * .05 );
                    event.enemies[enemyTwo].attackDmg = event.enemies[enemyTwo].attackDmg + ( event.enemies[enemyTwo].attackDmg * .1 );
                    event.enemies[enemyTwo].magicDmg = event.enemies[enemyTwo].magicDmg + ( event.enemies[enemyTwo].magicDmg * .05 );
                }

                // array of end of turn abilities
                var deadUnitEOTAbilities = event.enemies[idOfMember].endOfTurnEvents;
                // check that the units receiving the effects, do not already have them and are not dead
                var numberOfEnemiesAlive = 0;
                for (var targetToTransfer in event.enemies){
                    if (event.enemies[targetToTransfer].hp > 0
                    && !checkIfDeadByObject(event.enemies[targetToTransfer])
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
                                numberOfEnemiesAlive++;
                                var copyOfeotAbility = JSON.parse( JSON.stringify( eotAbility ) );
                                copyOfeotAbility.afterNTurns = currentTurn + numberOfEnemiesAlive;
                                copyOfeotAbility.transferred = true;
                                event.enemies[targetToTransfer].endOfTurnEvents.push( copyOfeotAbility );
                            }
                        })
                    }
                }
            }
            //////// Effect kills all enemies that have a certain buff
            if (rpgAbility && rpgAbility.killIfEnemyBuff){
                for (var e in event.enemies){
                    for (var b in event.enemies[e].buffs){
                        if (event.enemies[e].buffs[b].name == "Entomb"){
                            // remove all buffs and statuses and has died
                            event.enemies[e].buffs = []
                            event.enemies[e].statuses = []
                            event.enemies[e].hp = 0
                            event.enemies[e].statuses.push("dead")
                            hasDied(event, event.enemies[e])
                            break;
                        }
                    }
                }
            }
            // process it as an ability
            if (rpgAbility.processAbility && validEOD){
                ////// FIX FOR RADIO
                if (effectsToRemove.indexOf(rpgAbility.abilityId) > -1){
                    continue
                }

                var validCast = true;
                // if (event.enemies[enemy].endOfTurnEvents[index].validIfBuff){
                //     // check that enemy has the buff required
                //     validCast = false;
                //     var buffToCheck = event.enemies[enemy].endOfTurnEvents[index].validIfBuff
                //     for (var i = event.enemies[enemy].buffs.length - 1; i >= 0; i--){
                //         if (event.enemies[enemy].buffs.indexOf("dead") == -1){
                //             // process the on turn end buff
                //             if (event.enemies[enemy].buffs[i].name == buffToCheck){
                //                 validCast = true;
                //                 break;
                //             }
                //         }
                //     }
                // }
                if (validCast){
                    // cast on multiple targets
                    
                    if (rpgAbility.targetNames){
                        for (var n in rpgAbility.targetNames){
                            let toTarget = rpgAbility.targetNames[n]
                            var abilityPicked = rpgAbility.abilityId
                            var untargettable = rpgAbility.status ? rpgAbility.status.untargettable : undefined;
                            // get the rpgAbility from lib

                            var validTarget = false;
                            var stuckCount = 0
                            var target;

                            for (var enemy in event.enemies){
                                if (event.enemies[enemy].name == toTarget
                                && !checkHasDied(event.enemies[enemy])){
                                    target = enemy;
                                }
                            }
                            if (target){
                                var abilityToProcess = {
                                    user: idOfMember,
                                    ability: abilityPicked,
                                    target: target
                                }
                                if (abilityToProcess.target != undefined){
                                    onDeathString = onDeathString  + processAbility(abilityToProcess, event); 
                                    // special case for entomb on death in ch6
                                    recalculateStatBuffs(event)
                                    if ( rpgAbility.effectDone == false ){
                                        // remove this effect from effectsOnDeath Array
                                        effectsToRemove.push(rpgAbility.abilityId)
                                    }                                          
                                }
                            }
                        }
                        
                    }else{
                        // cast on a single target
                        let abilityPicked = rpgAbility.abilityId
                        let untargettable = rpgAbility.status ? rpgAbility.status.untargettable : undefined;
                        // get the rpgAbility from lib

                        let validTarget = false;
                        let stuckCount = 0
                        let target;
                        
                        if (rpgAbility.buff ){
                            if (rpgAbility.targetSelf){
                                target = idOfMember
                            }else{
                                if (rpgAbility.buff.areawide == true){
                                    target = "areawide"
                                }else{
                                    // TODO: target can be another random enemy
                                    target = undefined // replace with random enemy
                                }
                            }
                        }else{
                            if (rpgAbility.listOfPossibleTarget){
                                for (var e in event.enemies){
                                    if (rpgAbility.listOfPossibleTarget.indexOf(event.enemies[e].name) > -1
                                    && !checkHasDied(event.enemies[e]) ){
                                        if (!target){
                                            target = e
                                            validTarget = true    
                                        }
                                    }
                                }
                            }
                            while(!validTarget && stuckCount < 100){
                                var targetRoll = Math.floor(Math.random() * event.members.length);
                                var targetMember = event.members[targetRoll].id;
                                var targetFocusedMember = false;
                                if (stuckCount < 5){
                                    for (var member in event.members){
                                        var idOfMemberBeingChecked = "rpg-" + event.members[member].id;
                                        for (var statusToCheck in event.membersInParty[idOfMemberBeingChecked].statuses){
                                            if (rpgAbility && rpgAbility.ignoreFocus){
                                                // console.log("ignoring focus for ability")
                                                // IGNORE FOCUS EFFECT - check if the person being targetted by the ability is being focused by the caster
                                                if ( (targetMember == event.members[member].id) 
                                                    &&  event.membersInParty[idOfMemberBeingChecked].statuses[statusToCheck].name == "Focus"
                                                    && event.membersInParty[idOfMemberBeingChecked].statuses[statusToCheck].focusedBy == enemy){
                                                        targetFocusedMember = true;
                                                    }
                                            }else{
                                                // check if someone has focus on them if they do then the target should be the focused person 
                                                if ( event.membersInParty[idOfMemberBeingChecked].statuses[statusToCheck].name == "Focus"
                                                    && event.membersInParty[idOfMemberBeingChecked].statuses[statusToCheck].focusedBy == enemy){
                                                    //target roll should be 
                                                    targetMember = event.members[member].id;
                                                    break;
                                                }else if (rpgAbility.castOnKiller){
                                                    targetMember = killerId
                                                }
                                            }
                                            
                                        }
                                    }
                                }
                                
                                if (!checkIfDeadByObject(event.membersInParty["rpg-"+targetMember])){
                                    // valid target
                                    if (untargettable && !targetFocusedMember){
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
                                        // console.log(stuckCount)

                                    }else{
                                        if (!targetFocusedMember){
                                            target = "rpg-"+targetMember;
                                            validTarget = true;
                                            // console.log("stuck count" + stuckCount)
                                        }
                                    }
                                    
                                }
                                stuckCount++;
                            }
                        }
                        

                        let abilityToProcess = {
                            user: idOfMember,
                            ability: abilityPicked,
                            target: target
                        }
                        if (abilityToProcess.target != undefined){
                            onDeathString = onDeathString  + processAbility(abilityToProcess, event); 
                            if ( rpgAbility.effectDone == false ){
                                // remove this effect from effectsOnDeath Array
                                effectsToRemove.push(rpgAbility.abilityId)
                            }                                          
                        }
                    }
                }
            }
            //////// Effect is a summon
            else if( rpgAbility.summon && validEOD ){
                var validSummon = true;
                // if (event.enemies[enemy].endOfTurnEvents[index].validIfBuff){
                //     // check that enemy has the buff required
                //     validSummon = false;
                //     var buffToCheck = event.enemies[enemy].endOfTurnEvents[index].validIfBuff
                //     for (var i = event.enemies[enemy].buffs.length - 1; i >= 0; i--){
                //         if (event.enemies[enemy].buffs.indexOf("dead") == -1){
                //             // process the on turn end buff
                //             if (event.enemies[enemy].buffs[i].name == buffToCheck){
                //                 validSummon = true;
                //                 break;
                //             }
                //         }
                //     }
                // }
                if (rpgAbility.summonDeadCheck){
                    let summonDeadCount = 1
                    let enemiesDeadCount = 0
                    if (rpgAbility.summonDeadCheckCount){
                        summonDeadCount = rpgAbility.summonDeadCheckCount
                    }
                    for (var enemy in event.enemies){
                        if ( rpgAbility.summonDeadCheck.indexOf(event.enemies[enemy].name) > -1  && checkHasDied(event.enemies[enemy]) ){
                            enemiesDeadCount++
                        }
                    }
                    if (enemiesDeadCount < summonDeadCount){
                        validSummon = false
                    }
                }
                if (validSummon){
                    if (rpgAbility.summon.enemies){
                        var listOfEnemies = rpgAbility.summon.enemies
                        for (var enemyToSummon in listOfEnemies){
                            var nameOfSummon = listOfEnemies[enemyToSummon];
                            var enemyFound = JSON.parse(JSON.stringify(  enemiesToEncounter.summoned[nameOfSummon]));
                            onDeathString = onDeathString + summonEnemy(event, idOfMember, effect, enemyFound, rpgAbility.summon )
                        }
                        if (rpgAbility.oneTimeCast){
                            rpgAbility.invalid = true;
                        }
                    }else{
                        var nameOfSummon = rpgAbility.summon.enemy;
                        var enemyFound = JSON.parse(JSON.stringify(  enemiesToEncounter.summoned[nameOfSummon]));
                        if (rpgAbility.summon.summonCountPerDot){
                            // count the number of on the group
                            var dotCount = 0;
                            dotCount = checkNumberOfDotsInGroupById(event, rpgAbility.summon.summonCountPerDot)
                            for (var i = 0; i < dotCount; i++){
                                onDeathString = onDeathString + summonEnemy(event, idOfMember, effect, enemyFound, rpgAbility.summon);
                            }
                        }else{
                            onDeathString = onDeathString + summonEnemy(event, idOfMember, effect, enemyFound, rpgAbility.summon);
                        }
                        // if (nameOfSummon == "energyCore"){
                        //     var energize = rpgAbilities["energize"] ? JSON.parse(JSON.stringify(rpgAbilities["energize"])) : undefined;
                        //     energize.buff.expireOnTurn = currentTurn + energize.buff.turnsToExpire
                        //     event.enemies[enemy].buffs.push(energize.buff);
                        //     endOfTurnString = endOfTurnString + event.enemies[enemy].name + " gained Energized 🗡 +350, ☄️ + 350 \n\n"
                        // }
                        if (rpgAbility.oneTimeCast){
                            rpgAbility.invalid = true;
                        }
                    }
                }
            }
            //////// Effect reanimates current dead enemies
            else if (rpgAbility.zombifyAll){
                var validCast = true;

                if (validCast){
                    // go through each enemy, check if they are dead, create a zombie of them
                    // statswise they should have same HP, but 50% more dmg
                    let casterOfReanimate = event.enemies[idOfMember]
                    onDeathString = onDeathString +  casterOfReanimate.name + " reanimated the fallen enemies\n"
                    for (var enemy in event.enemies){
                        // do not reanimate self
                        if (checkHasDied(event.enemies[enemy])
                        && enemy != idOfMember){
                            // zombify this enemy
                            let enemyToReanimate = event.enemies[enemy]
                            onDeathString = onDeathString + reanimateEnemy(event, enemyToReanimate, rpgAbility);
                        }
                    }
                    if (rpgAbility.oneTimeCast){
                        rpgAbility.invalid = true;
                    }
                }
            }
            else if (rpgAbility.addToEventKilledList){
                // not an ability, just an add
                let eotListName = rpgAbility.addToEventKilledList
                for (var ev in event.endOfTurnEvents){
                    if (event.endOfTurnEvents[ev].abilityId == eotListName){
                        event.endOfTurnEvents[ev].enemiesKilled.push(member.name)
                    }
                }
            }
        }
    }
    if (event.enemies[idOfMember] && event.enemies[idOfMember].effectsOnDeath){
        for (var index = event.enemies[idOfMember].effectsOnDeath.length - 1; index >= 0; index--){
            var effectBeingChecked = event.enemies[idOfMember].effectsOnDeath[index]
            if (effectsToRemove.indexOf(effectBeingChecked) > -1){
                event.enemies[idOfMember].effectsOnDeath.splice(index, 1)
            }
        }
    }
    
    return onDeathString;
}

function processYellowEnergyCrystal(event, active){
    /*
    reduceEveryNTurnsFurnace: 1,
    reduceEveryNTurnsDismantle: 1,
    reduceEveryNTurnsSummonTorturedRobot: 5,
    reduceEveryNTurnsRocketStrike: 1,
    rocketStrikeAreawide: true,
    */
    for (var enemy in event.enemies){
        // check enemy statuses
        for ( var e in event.enemies[enemy].endOfTurnEvents){
            // check for each event
            var eventToCheck = event.enemies[enemy].endOfTurnEvents[e]
            if (active){
                if (eventToCheck.name == "Furnace"){
                    // reduce by 1 turn
                    eventToCheck.everyNTurns = eventToCheck.everyNTurns - 1
                }
                if (eventToCheck.name == "Dismantle"){
                    // reduce by 1 turn
                    eventToCheck.everyNTurns = eventToCheck.everyNTurns - 1
                }
                if (eventToCheck.name == "Rocket Strike"){
                    // turn it into areawide dmg, reduce by 1 turn
                    eventToCheck.everyNTurns = eventToCheck.everyNTurns - 1
                    eventToCheck.abilityId = "rocketStrikeAreaWide"
                }
            }else{
                if (eventToCheck.name == "Furnace"){
                    // reduce by 1 turn
                    eventToCheck.everyNTurns = eventToCheck.everyNTurns + 1
                }
                if (eventToCheck.name == "Dismantle"){
                    // reduce by 1 turn
                    eventToCheck.everyNTurns = eventToCheck.everyNTurns + 1
                }
                if (eventToCheck.name == "Rocket Strike"){
                    // turn it into areawide dmg, reduce by 1 turn
                    eventToCheck.everyNTurns = eventToCheck.everyNTurns + 1
                    if (eventToCheck.areawide){
                        delete eventToCheck.areawide
                    }
                    if (eventToCheck.abilityId == "rocketStrikeAreaWide"){
                        eventToCheck.abilityId = "rocketStrike"
                    }
                }
            }
        }
    }
}

function processDamageDealingBuffs(event, damageToDealToPlayer, targetToDealDmg, abilityCaster){
    var damageByBuffsString = ""
    // check that the abilityCaster has certain buffs ie maniac
    if ( abilityCaster < 1000){
        // caster is an enemy
        for (var b in event.enemies[abilityCaster].buffs){
            // check for buff maniac
            if ( event.enemies[abilityCaster].buffs[b].dealToRestOfParty ){
                // deal the damage to the rest of the partymembers, except to targetToDealDmg
                damageByBuffsString = damageByBuffsString + "The group also suffered " + damageToDealToPlayer + " damage\n";
                
                for (var member in event.membersInParty){
                    if (!checkIfDeadByObject(event.membersInParty[member])
                    && !event.membersInParty[member].immuneToAoe
                    && "rpg-" + targetToDealDmg.id != member){
                        var abType = "ice"
                        dealDamageTo( event.membersInParty[member], damageToDealToPlayer, event, abType)
                        damageByBuffsString = damageByBuffsString + triggerBufFromDamage(event, event.membersInParty[member] )
                        if (checkHasDied(event.membersInParty[member])){
                            damageByBuffsString = damageByBuffsString + hasDied(event, event.membersInParty[member]);
                        }
                    }
                }
            }
        }
    }
    // if they do then deal damage to the rest of the group based on damageToDealToPlayer
    // do not deal damage to targetToDealDmg
    // return a string
    return damageByBuffsString
}

function checkNumberOfDotsInGroupById(event, dotName){
    var dotCount = 0
    for (var member in event.membersInParty){
        dotCount = dotCount + checkDotCountByAbilityId(dotName, event.membersInParty[member])
    }
    return dotCount
}

function processSafeGuard(event, targetToCheck, abilityObject, rpgAbility){
    var safeGuardString = ""

    // check if the caster already has safeguard, if they dont then add the buff, if they do add the buff and add 4% more until reaching max number of stacks available
    if (event.membersInParty[targetToCheck]){
        // check their statuses
        var foundSafeGuard = false;
        for (var s in event.membersInParty[targetToCheck].buffs){
            if (event.membersInParty[targetToCheck].buffs[s].multiplierPerStack){
                // found the buff that needs to be edited
                foundSafeGuard = true;
                // DIRECTLY editing the buff
                var currentMultiplier = event.membersInParty[targetToCheck].buffs[s].multiplier
                var currentStacks = event.membersInParty[targetToCheck].buffs[s].currentStacks
                var maxAllowedStacks = event.membersInParty[targetToCheck].buffs[s].maxAllowedStacks
                if (currentStacks < maxAllowedStacks){
                    event.membersInParty[targetToCheck].buffs[s].multiplier = currentMultiplier + event.membersInParty[targetToCheck].buffs[s].multiplierPerStack
                    event.membersInParty[targetToCheck].buffs[s].currentStacks = event.membersInParty[targetToCheck].buffs[s].currentStacks + 1
                    var buffName = event.membersInParty[targetToCheck].buffs[s].name
                    safeGuardString = safeGuardString + event.membersInParty[targetToCheck].name + " Gains " + buffName + "\n" 
                    break;
                }
            }
        }
        if (!foundSafeGuard){
            // add a damage reduction buff
            var buffToAdd = JSON.parse( JSON.stringify( rpgAbilities[rpgAbility.buff.onMaxStacksGainBuff] ))
            event.membersInParty[targetToCheck].buffs.push(buffToAdd.buff)
            safeGuardString = safeGuardString + event.membersInParty[targetToCheck].name + " Gains " + buffToAdd.name + "\n" 
        }
    }
    return safeGuardString
}

function processStrength(event, target, dotBeingRemoved, abilityIdOfBuff){
    var strengthString = ""
    // strength is removed, get the caster and then give the caster the buff
    var BREAK = "Break"
    var Shadow_Shield = "Shadow Shield"
    var SHATTER = "Shatter"
    var FEVER = "feverChallenge"
    var RUPTURE = "rupture"
    var addedBreak = false
    var addedShatter = false
    var addedRupture = false
    for (var s in target.statuses){
        if ( Shadow_Shield == target.statuses[s].name){
            // get the caster of this debuff
            var caster = target.statuses[s].caster
            var buffToAdd = JSON.parse( JSON.stringify( rpgAbilities[target.statuses[s].onBandaidCasterGainsBuff] ))
            buffToAdd.buff.expireOnTurn = event.turn + buffToAdd.buff.turnsToExpire
            if (caster < 1000){
                event.enemies[caster].buffs.push(buffToAdd.buff)
            }
            strengthString = strengthString + event.enemies[caster].name + " Gains " + buffToAdd.name + "\n"
        }
        if ( BREAK == target.statuses[s].name && !addedBreak){
            // get the caster of this debuff
            var caster = target.statuses[s].caster
            var buffToAdd = JSON.parse( JSON.stringify( rpgAbilities[target.statuses[s].onBandaidCasterGainsBuff] ))
            buffToAdd.buff.expireOnTurn = event.turn + buffToAdd.buff.turnsToExpire
            if (caster < 1000){
                event.enemies[caster].buffs.push(buffToAdd.buff)
            }
            addedBreak = true
            strengthString = strengthString + event.enemies[caster].name + " Gains " + buffToAdd.name + "\n"
        }
        if ( target.statuses[s].dot && 
            SHATTER == target.statuses[s].dot.name && !addedShatter){
            // get the caster of this debuff
            var caster = target.statuses[s].dot.caster
            var buffToAdd = JSON.parse( JSON.stringify( rpgAbilities[target.statuses[s].dot.onBandaidCasterGainsBuff] ))
            buffToAdd.buff.expireOnTurn = event.turn + buffToAdd.buff.turnsToExpire
            if (caster < 1000){
                event.enemies[caster].buffs.push(buffToAdd.buff)
            }
            addedShatter = true
            strengthString = strengthString + event.enemies[caster].name + " Gains " + buffToAdd.name + "\n"
        }
        if ( target.statuses[s].dot && 
            FEVER == target.statuses[s].dot.abilityId){
            // get the caster of this debuff
            var caster = target.statuses[s].dot.caster
            var buffToAdd = JSON.parse( JSON.stringify( rpgAbilities[target.statuses[s].dot.onBandaidCasterGainsBuff] ))
            buffToAdd.buff.expireOnTurn = event.turn + buffToAdd.buff.turnsToExpire
            if (caster < 1000){
                event.enemies[caster].buffs.push(buffToAdd.buff)
            }
            strengthString = strengthString + event.enemies[caster].name + " Gains " + buffToAdd.name + "\n"
        }
        if ( target.statuses[s].dot && 
            RUPTURE == target.statuses[s].dot.abilityId && !addedRupture){
            // get the target of this debuff
            let caster;
            if (target.statuses[s].dot.targetToApplyOn){
                for (var e in event.enemies){
                    if (target.statuses[s].dot.targetToApplyOn == event.enemies[e].name ){
                        caster = e
                        break;
                    }
                }
            }else{
                caster = target.statuses[s].dot.caster
            }
            var buffToAdd = JSON.parse( JSON.stringify( rpgAbilities[target.statuses[s].dot.abilityTriggerOnDeath] ))
            buffToAdd.buff.expireOnTurn = event.turn + buffToAdd.buff.turnsToExpire
            if (caster < 1000){
                event.enemies[caster].buffs.push(buffToAdd.buff)
            }
            if (event.enemies[caster]){
                addedRupture = true
                strengthString = strengthString + event.enemies[caster].name + " Gains " + buffToAdd.name + "\n"
            }
        }
    }
    return strengthString
}
function processReflectEffects(event, target, damageToDealToPlayer, damageCaster, abilityType){
    // check if the target is enemy or player
    var reflectString = ""
    if (target < 1000){
        for (var b in event.enemies[target].buffs){
            var buffToCheck = event.enemies[target].buffs[b]
            // if the target has a reflection buff then
            // calculate the amount of damage to reflect back at the caster
            // deal damage to the caster

            if (buffToCheck.reflectPercentage
            && (abilityType == "dmg" || abilityType == "dot")) {
                var damageToReflect = Math.floor( damageToDealToPlayer * buffToCheck.reflectPercentage )
                var abType = buffToCheck.abType
                dealDamageTo(event.membersInParty["rpg-"+damageCaster], damageToReflect, event, abType)
                var damageReflectedToName = event.membersInParty["rpg-"+damageCaster].name
                reflectString = reflectString + damageReflectedToName + " suffered " + damageToReflect + " reflected damage\n"
                reflectString = reflectString + triggerBufFromDamage(event, event.membersInParty["rpg-"+damageCaster] )
            }
            if (buffToCheck.reflectPercentageToAll
            && (abilityType == "dmg" || abilityType == "dot")){
                var damageToReflect = Math.floor( damageToDealToPlayer * buffToCheck.reflectPercentageToAll )
                // damage reflected to the group
                var abType = buffToCheck.abType
                reflectString = reflectString + "The group suffered " + damageToReflect + " reflected damage\n"
                for (var targetToDealDmg in event.membersInParty){
                    if (!checkIfDeadByObject(event.membersInParty[targetToDealDmg])
                    && !event.membersInParty[targetToDealDmg].immuneToAoe){
                        damageToDealToPlayer = dealDamageTo(event.membersInParty[targetToDealDmg], damageToReflect, event, abType)
                        reflectString = reflectString + triggerBufFromDamage(event, event.membersInParty[targetToDealDmg] )
                        if (checkHasDied(event.membersInParty[targetToDealDmg])){
                            reflectString = reflectString + hasDied(event, event.membersInParty[targetToDealDmg]);
                        }
                    }
                }

            }
            if (buffToCheck.areaewideReflectPercentage 
            && abilityType == "areawide"){
                var damageToReflect = Math.floor( damageToDealToPlayer * buffToCheck.areaewideReflectPercentage )
                var abType = buffToCheck.abType
                dealDamageTo(event.membersInParty["rpg-"+damageCaster], damageToReflect, event, abType)
                var damageReflectedToName = event.membersInParty["rpg-"+damageCaster].name
                reflectString = reflectString + damageReflectedToName + " suffered " + damageToReflect + " reflected damage\n"
                reflectString = reflectString + triggerBufFromDamage(event, event.membersInParty["rpg-"+damageCaster] )

            }
            if (buffToCheck.areaewideReflectPercentageToAll
            && abilityType == "areawide"){
                var damageToReflect = Math.floor( damageToDealToPlayer * buffToCheck.areaewideReflectPercentageToAll )
                // damage reflected to the group
                reflectString = reflectString + "The group suffered " + damageToReflect + " damage - reflected damage\n"

                var abType = buffToCheck.abType
                for (var targetToDealDmg in event.membersInParty){
                    if (!checkIfDeadByObject(event.membersInParty[targetToDealDmg])
                    && !event.membersInParty[targetToDealDmg].immuneToAoe){
                        damageToDealToPlayer = dealDamageTo(event.membersInParty[targetToDealDmg], damageToReflect, event, abType)
                        if (checkHasDied(event.membersInParty[targetToDealDmg])){
                            reflectString = reflectString + hasDied(event, event.membersInParty[targetToDealDmg]);
                            reflectString = reflectString + triggerBufFromDamage(event, event.membersInParty[targetToDealDmg] )
                        }
                    }
                }
            }
        }
    }else{
        // target is a player - means reflect buff is on player - dont implement for now
        for (var b in event.membersInParty[target].buffs){
            var buffToCheck = event.membersInParty[target].buffs[b]
            // if the target has a reflection buff then calculate the amount of damage to reflect back at the caster
            // deal damage to the caster
            if (buffToCheck.reflectPercentage
            && (abilityType == "dmg" || abilityType == "dot")) {
                var damageToReflect = Math.floor( damageToDealToPlayer * buffToCheck.reflectPercentage )
                var abType = buffToCheck.abType
                if (event.enemies[damageCaster]){
                    dealDamageTo(event.enemies[damageCaster], damageToReflect, event, abType)
                    var damageReflectedToName = event.enemies[damageCaster].name
                    reflectString = reflectString + damageReflectedToName + " suffered " + damageToReflect + " reflected damage\n"    
                    reflectString = reflectString + triggerBufFromDamage(event, event.enemies[damageCaster] )
                }
            }
            if (buffToCheck.reflectPercentageToAll
            && (abilityType == "dmg" || abilityType == "dot")){
                var damageToReflect = Math.floor( damageToDealToPlayer * buffToCheck.reflectPercentageToAll )
                // damage reflected to the group
                var abType = buffToCheck.abType
                reflectString = reflectString + "The group suffered " + damageToReflect + " reflected damage\n"
                for (var targetToDealDmg in event.enemies){
                    if (!checkIfDeadByObject(event.enemies[targetToDealDmg])
                    && !event.enemies[targetToDealDmg].immuneToAoe){
                        damageToDealToPlayer = dealDamageTo(event.enemies[targetToDealDmg], damageToReflect, event, abType)
                        reflectString = reflectString + triggerBufFromDamage(event, event.enemies[targetToDealDmg] )
                        if (checkHasDied(event.enemies[targetToDealDmg])){
                            reflectString = reflectString + hasDied(event, event.enemies[targetToDealDmg]);
                        }
                    }
                }

            }
            if (buffToCheck.areaewideReflectPercentage 
            && abilityType == "areawide"){
                var damageToReflect = Math.floor( damageToDealToPlayer * buffToCheck.areaewideReflectPercentage )
                var abType = buffToCheck.abType
                if (event.enemies[damageCaster]){
                    dealDamageTo(event.enemies[damageCaster], damageToReflect, event, abType)
                    var damageReflectedToName = event.enemies[damageCaster].name
                    reflectString = reflectString + damageReflectedToName + " suffered " + damageToReflect + " reflected damage\n"    
                    reflectString = reflectString + triggerBufFromDamage(event, event.enemies[damageCaster] )
                }
            }
            if (buffToCheck.areaewideReflectPercentageToAll
            && abilityType == "areawide"){
                var damageToReflect = Math.floor( damageToDealToPlayer * buffToCheck.areaewideReflectPercentageToAll )
                // damage reflected to the group
                reflectString = reflectString + "The group suffered " + damageToReflect + " damage - reflected damage\n"

                var abType = buffToCheck.abType
                for (var targetToDealDmg in event.enemies){
                    if (!checkIfDeadByObject(event.enemies[targetToDealDmg])
                    && !event.enemies[targetToDealDmg].immuneToAoe){
                        damageToDealToPlayer = dealDamageTo(event.enemies[targetToDealDmg], damageToReflect, event, abType)
                        reflectString = reflectString + triggerBufFromDamage(event, event.enemies[targetToDealDmg] )
                        if (checkHasDied(event.enemies[targetToDealDmg])){
                            reflectString = reflectString + hasDied(event, event.enemies[targetToDealDmg]);
                        }
                    }
                }
            }
        }
    }

    return reflectString
}

/// new
function processDebilitate(event, abilityIdOfStatus, dotTarget){
    var debilitateString = ""
    var debilitateObject;
    var foundDebilitate = false;
    var targetName = event.membersInParty[dotTarget].name
    for (var status in event.membersInParty[dotTarget].statuses){
        var statusToProcess = event.membersInParty[dotTarget].statuses[status];
        if (statusToProcess.abilityId == "debilitate"){
            debilitateObject = statusToProcess;

            statusToProcess.multiplier = statusToProcess.multiplier + ( statusToProcess.multiplierPerDotTurn )
            foundDebilitate = true;
            break;
        }
    }
    if (!foundDebilitate){
        var statusBeingAdded = rpgAbilities[abilityIdOfStatus] ? JSON.parse(JSON.stringify(rpgAbilities[abilityIdOfStatus])) : undefined;
        if (statusBeingAdded){
            var statusToAdd = statusBeingAdded.status;
            let statusCloned = Object.assign({}, statusToAdd);

            debilitateObject = statusCloned;
            statusCloned.multiplier = statusCloned.multiplier + ( statusCloned.multiplierPerDotTurn )
            event.membersInParty[dotTarget].statuses.push(statusCloned);
        }
    }
    if (debilitateObject){
        //var percentageGain = stacksOfAdrenaline * debilitateObject.multiplierPerDotTurn * 100
        debilitateString = targetName + " debilitated " + (debilitateObject.multiplierPerDotTurn * 100) + "% more dmg taken\n"
    }
    return debilitateString
}

function processBurningAdrenaline(event, dotBeingRemoved, abilityIdOfBuff){
    var burningAdrenalineString = ""
    var stacksOfAdrenaline = 0;
    var adrenalineBuffObject;
    for ( var m in event.membersInParty ){
        // get the buffs for the user
        var foundBurningAdrenaline = false;
        for (var buff in event.membersInParty[m].buffs){
            var buffToProcess = event.membersInParty[m].buffs[buff];
            if (buffToProcess.abilityId == "burningAdrenaline"){
                // manipulate it here
                // calculate the number of ticks
                adrenalineBuffObject = buffToProcess;
                var temp = dotBeingRemoved.expireOnTurn - event.turn
                var ticks = dotBeingRemoved.turnsToExpire - temp;
                stacksOfAdrenaline = ticks;
                // edit the multiplier
                buffToProcess.multiplier = buffToProcess.multiplier + ( buffToProcess.multiplierPerDotTurn * ticks )

                foundBurningAdrenaline = true;
                break;
            }
        }
        if (!foundBurningAdrenaline){
            var buffBeingAdded = rpgAbilities[abilityIdOfBuff] ? JSON.parse(JSON.stringify(rpgAbilities[abilityIdOfBuff])) : undefined;
            if (buffBeingAdded){
                var statusToAdd = buffBeingAdded.buff;
                let buffCloned = Object.assign({}, statusToAdd);
                var temp = dotBeingRemoved.expireOnTurn - event.turn
                var ticks = dotBeingRemoved.turnsToExpire - temp;
                stacksOfAdrenaline = ticks
                adrenalineBuffObject = buffCloned;
                // edit the multiplier
                buffCloned.multiplier = buffCloned.multiplier + ( buffCloned.multiplierPerDotTurn * ticks )
                event.membersInParty[m].buffs.push(buffCloned);
            }
        }
    }
    if (adrenalineBuffObject){
        var percentageGain = stacksOfAdrenaline * adrenalineBuffObject.multiplierPerDotTurn * 100
        burningAdrenalineString = "The group gains Burning Adrenaline + " + percentageGain.toFixed() + "% 🗡 , ☄️\n"
    }
    
    return burningAdrenalineString
}

function removeRadiactive(event){
    for(var member in event.membersInParty){
        if (!checkIfDeadByObject(event.membersInParty[member])){
            for (var index = event.membersInParty[member].statuses.length - 1; index >= 0; index--){
                // go through each status
                if (!checkIfDeadByName(event.membersInParty[member])){
                    if (event.membersInParty[member].statuses[index].name == "Radioactive"){
                        event.membersInParty[member].statuses.splice(index, 1);
                    }
                }
            }
        }
    }
}

function checkRadioactive(event, member){
    // if the user has a stack of radioactive, then add another stack
    var radioactiveCount = 0;
    var hasRadioactive = false;
    var copyOfRadioactive = {};
    var radioactiveString = "";
    for (var status in member.statuses){
        try{
            if (member.statuses[status].name == "Radioactive"){
                // add another stack
                radioactiveCount++;
                hasRadioactive = true;
                copyOfRadioactive = JSON.parse(JSON.stringify ( member.statuses[status] ) );
            }
        }
        catch(error){
            // console.log(error);
        }
    }
    if (hasRadioactive){
        radioactiveString = radioactiveString + member.name + " gained Radioactive\n"
        member.statuses.push( copyOfRadioactive );
        radioactiveCount++;
    }

    if (radioactiveCount >= 5){
        // deal 1300 damage to all members
        var damageToDeal = 1300;

        radioactiveString = radioactiveString + "The group suffered " + damageToDeal + " damage - Radioactive Explosion\n"
        for (var targetToDealDmg in event.membersInParty){
            if (!checkIfDeadByObject(event.membersInParty[targetToDealDmg])){
                var abType = "fire"
                damageToDealToPlayer = dealDamageTo( event.membersInParty[targetToDealDmg], damageToDeal, event, abType)
                radioactiveString = radioactiveString + triggerBufFromDamage(event, event.membersInParty[targetToDealDmg] )
                if ( checkHasDied(event.membersInParty[targetToDealDmg])){
                    radioactiveString = radioactiveString + hasDied(event, event.membersInParty[targetToDealDmg]);
                }
            }
        }

    }
    return radioactiveString;
    // return stack of radioactive gained, if 5 stacks, deal 1000 damage to all members
}

function checkIfDamageTakenCastAbility(event, target, caster){
    var abilityTriggeredString = ""
    for (var b in target.statuses){
        // if a status exists where ability is cast based on direct damage taken then trigger the damage
        if (target.statuses[b].onDamageTakenCastAbility){
            if (caster > 1000){
                // ability is deal arewide damage
                var abilId = target.statuses[b].onDamageTakenCastAbility
                var abilityToCast = JSON.parse(JSON.stringify(rpgAbilities[abilId]))

                if (abilityToCast && abilityToCast.areawidedmg){
                    // deal areawide dmg to members of event  
                    var nameOfEndOfTurnAbility = abilityToCast.name
                    var damageToDeal = 1;
                    damageToDeal = calculateDamageDealt(event, target.id, undefined, abilityToCast.areawidedmg)
                    var critStrike = damageToDeal.critical ? ">" : ""
                    abilityTriggeredString = abilityTriggeredString + critStrike + "The group suffered " + damageToDeal.dmg + " damage - " + nameOfEndOfTurnAbility +"\n"
                    for (var targetToDealDmg in event.membersInParty){
                        if (!checkIfDeadByObject(event.membersInParty[targetToDealDmg])
                        && !event.membersInParty[targetToDealDmg].immuneToAoe){
                            var abType = abilityToCast.areawidedmg.type
                            damageToDealToPlayer = dealDamageTo(event.membersInParty[targetToDealDmg], damageToDeal.dmg, event, abType)
                            abilityTriggeredString = abilityTriggeredString + triggerBufFromDamage(event, event.membersInParty[targetToDealDmg] )
                            if (checkHasDied(event.membersInParty[targetToDealDmg])){
                                abilityTriggeredString = abilityTriggeredString + hasDied(event, event.membersInParty[targetToDealDmg]);
                            }
                        }
                    }
                }
            }
        }
    }
    return abilityTriggeredString
}

function checkIfDamageTakenGiveBuff(event, target, caster){
    // check all the target buffs
    for (var b in target.buffs){
        if (target.buffs[b].onDamageTakenGiveBuff){
            var buffId = target.buffs[b].onDamageTakenGiveBuff.buffId
            var buffToGive = JSON.parse(JSON.stringify(rpgAbilities[buffId]))
            // give this buff to the caster
            if (caster > 1000){
                var memberToGiveBuff = event.membersInParty["rpg-"+caster];
                // check if the caster already has the buff
                var casterHasBuff = false;
                for (var cb in memberToGiveBuff.buffs){
                    if (memberToGiveBuff.buffs[cb].name == buffToGive.name){
                        casterHasBuff = true
                        break;
                    }
                }

                if (buffToGive.buff && buffToGive.buff.turnsToExpire){
                    buffToGive.buff.caster = caster // id of the caster
                    buffToGive.buff.expireOnTurn = event.turn + buffToGive.buff.turnsToExpire;
                }
                if (!casterHasBuff){
                    // just add it
                    memberToGiveBuff.buffs.push(buffToGive.buff)
                    if (buffToGive.removeBuff){
                        // search for the specific buff via id
                        for (var cb in memberToGiveBuff.buffs){
                            if (memberToGiveBuff.buffs[cb].name == buffToGive.removeBuff){
                                memberToGiveBuff.buffs.splice(cb, 1)
                                break;
                            }
                        }
                    }
                    if (buffToGive.buff && buffToGive.buff.additionalDescription){
                        return memberToGiveBuff.name + " was affected with " + buffToGive.name + "\n" + memberToGiveBuff.name + buffToGive.buff.additionalDescription + "\n"
                    }else{
                        return memberToGiveBuff.name + " was affected with " + buffToGive.name + "\n"
                    }
                }else{
                    // check if theres ignore unique
                    if (buffToGive.ignoreUnique){
                        memberToGiveBuff.buffs.push(buffToGive.buff)
                        if (buffToGive.removeBuff){
                            // search for the specific buff via id
                            for (var cb in memberToGiveBuff.buffs){
                                if (memberToGiveBuff.buffs[cb].name == buffToGive.removeBuff){
                                    memberToGiveBuff.buffs.splice(cb, 1)
                                    break;
                                }
                            }
                        }
                        if (buffToGive.buff && buffToGive.buff.additionalDescription){
                            return memberToGiveBuff.name + " was affected with " + buffToGive.name + "\n" + memberToGiveBuff.name + buffToGive.buff.additionalDescription + "\n"
                        }else{
                            return memberToGiveBuff.name + " was affected with " + buffToGive.name + "\n"
                        }
                    }else{
                        // console.log("have buff already")
                        return ""
                    }
                }                
            }else{
                // caster is enemy
            }

        }
    }
    return ""
    
}

function checkHasDied(member){
    var dead = false
    if ( member.hp + member.statBuffs.maxhp <= 0  ){
        dead = true;
    }else{
        dead = false;
    }

    return dead
}

function hasDied(event, member, killerId){
    // player is dead, remove all statuses, add dead
    if (member.hp + member.statBuffs.maxhp <= 0
    && !checkIfDeadByObject(member)){
        var deathString = member.name + " died :skull:\n";
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
                    var critStrike = damageToDeal.critical ? ">" : ""
                    deathString = deathString + critStrike + "The group suffered " + damageToDeal.dmg + " damage - " + nameOfEndOfTurnAbility +"\n"
                    for (var targetToDealDmg in event.membersInParty){
                        if (!checkIfDeadByObject(event.membersInParty[targetToDealDmg])){
                            var abType = abilityObject.ability.type
                            damageToDealToPlayer = dealDamageTo(event.membersInParty[targetToDealDmg], damageToDeal.dmg, event, abType)
                            deathString = deathString + triggerBufFromDamage(event, event.membersInParty[targetToDealDmg] )
                            if ( checkHasDied(event.membersInParty[targetToDealDmg])){
                                deathString = deathString + hasDied(event, event.membersInParty[targetToDealDmg]);
                            }
                        }
                    }
                }
                if (member.statuses[status].abilityTriggerOnDeath 
                || (member.statuses[status].dot 
                && member.statuses[status].dot.abilityTriggerOnDeath)){
                    // get the ability that triggered
                    var rpgAbility;
                    if (member.statuses[status].abilityTriggerOnDeath){
                        rpgAbility = JSON.parse(JSON.stringify(rpgAbilities[member.statuses[status].abilityTriggerOnDeath]))
                    }else{
                        rpgAbility = JSON.parse(JSON.stringify(rpgAbilities[member.statuses[status].dot.abilityTriggerOnDeath]))
                    }

                    if (rpgAbility.name == "Heal All"){
                        // heal all enemies
                        for (var targetToHeal in event.enemies){
                            if (!checkHasDied(event.enemies[targetToHeal])){
                                let healPlayer = healTarget(event.enemies[targetToHeal], {heal: rpgAbility.heal })
                                if (event.enemies[targetToHeal].hp > event.enemies[targetToHeal].maxhp){
                                    event.enemies[targetToHeal].hp = event.enemies[targetToHeal].maxhp
                                }
                            }
                        }
                        deathString = deathString + " The enemies have healed for " + rpgAbility.heal + "\n"
                    }
                    if (rpgAbility.abilityId == "strengthFever" 
                    || rpgAbility.abilityId == "strength"
                    || rpgAbility.abilityId == "strengthRupture"){
                        var strengthString = processStrength( event, member  )
                        if (strengthString.length > 5){
                            checkedStrength = true
                        }
                        deathString = deathString + strengthString
                        if (rpgAbility.abilityId == "strengthRupture"){
                            // only want to cause this to happen once per death
                            break;
                        }
                    }
                }
                if (member.statuses[status].dot
                    && member.statuses[status].dot.onRemoveSelectNewTarget){
                    var newTarget = getRandomLivingPlayer(event, "rpg-" + member.id)
                    if (newTarget){
                        var statusToTransfer = member.statuses[status]
                        abilityToString = abilityToString + transferStatusToNewTarget(newTarget, statusToTransfer, event)
                    }
                }
            }catch(err){
                break;
            }
        }

        member.statuses = [];
        member.statuses.push("dead");
        member.buffs = [];
        deathString = deathString + effectsOnDeath(event, member, killerId)
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
            if (member.passiveAbilities[passive].buff){
                member.buffs.push(member.passiveAbilities[passive])
            }else if (member.passiveAbilities[passive].status){
                member.statuses.push(member.passiveAbilities[passive])
            }
        }
    }
}

function processPassiveEffects(event){
    var passiveEffectsString = "";
    // reset limit defensive and limit offensive
    var LIMIT_ABILITIES_COOLDOWN = 10
    var currentTurn = event.turn;
    if (event.limitDefensiveReady == false && event.limitDefensiveTurnUsed + LIMIT_ABILITIES_COOLDOWN < currentTurn){
        event.limitDefensiveReady = true;
    }
    if (event.limitOffensiveReady == false && event.limitOffensiveTurnUsed + LIMIT_ABILITIES_COOLDOWN < currentTurn){
        event.limitOffensiveReady = true;
    }

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
        
        if (!checkIfDeadByObject(event.membersInParty[member])){
            for (var index = event.membersInParty[member].statuses.length - 1; index >= 0; index--){
                // go through each status
                if (!checkIfDeadByObject(event.membersInParty[member])){
                    // if it is a dot, then process the damage of the dot
                    if (event.membersInParty[member].statuses[index].dot){
                        var dotCurrentTurn = event.turn - (event.membersInParty[member].statuses[index].dot.expireOnTurn - event.membersInParty[member].statuses[index].dot.turnsToExpire)
                        // check if a dot's tick gets ignored
                        if (event.membersInParty[member].statuses[index].dot.ignoreDmgOnTurn && event.membersInParty[member].statuses[index].dot.ignoreDmgOnTurn == dotCurrentTurn){
                            continue;
                        }
                        // remove dot if it has removeDotOnHpPercentage
                        if (event.membersInParty[member].statuses[index].dot.removeDotOnHpPercentage){
                            // check the hp percentage of the member
                            var removeDotOnHpPercentage = event.membersInParty[member].statuses[index].dot.removeDotOnHpPercentage
                            var currentHp = event.membersInParty[member].hp + event.membersInParty[member].statBuffs.maxhp
                            var totalMax = event.membersInParty[member].maxhp + event.membersInParty[member].statBuffs.maxhp
                            var hpPercentage = currentHp / totalMax
                            if (hpPercentage >= removeDotOnHpPercentage){
                                // remove the dot here and continue
                                passiveEffectsString = passiveEffectsString + event.membersInParty[member].statuses[index].dot.name + " has vanished from " + event.membersInParty[member].name + "\n"
                                event.membersInParty[member].statuses.splice(index, 1);
                                continue;
                            }
                        }
                        // process the dot
                        var dotCaster = event.membersInParty[member].statuses[index].dot.caster
                        var damageToDealToPlayer = calculateDamageDealt(event, dotCaster, member, event.membersInParty[member].statuses[index].dot)
                        var critStrike = damageToDealToPlayer.critical ? ">" : ""
                        var abType = event.membersInParty[member].statuses[index].dot.type
                        damageToDealToPlayer = dealDamageTo( event.membersInParty[member], damageToDealToPlayer.dmg, event, abType)
                        passiveEffectsString = passiveEffectsString + critStrike + event.membersInParty[member].name + " took " + damageToDealToPlayer + " damage - " + event.membersInParty[member].statuses[index].dot.name + "\n"
                        passiveEffectsString = passiveEffectsString + processReflectEffects(event, member, damageToDealToPlayer, dotCaster, "dot")
                        passiveEffectsString = passiveEffectsString + triggerBufFromDamage(event, event.membersInParty[member] )
                        if ( checkHasDied(event.membersInParty[member])){
                            passiveEffectsString = passiveEffectsString + hasDied(event, event.membersInParty[member]);
                            break;
                        }
                        // the dot increases in damage
                        if ( event.membersInParty[member].statuses[index].dot.dmgIncreasePerTick ){
                            event.membersInParty[member].statuses[index].dot.dmg = event.membersInParty[member].statuses[index].dot.dmg + event.membersInParty[member].statuses[index].dot.dmgIncreasePerTick
                        }
                        
                        if (event.membersInParty[member].statuses[index].dot.applyDebuffOnDotDmg){
                            var dotBeingProcessed = event.membersInParty[member].statuses[index].dot
                            var abilityIdOfDebuff = dotBeingProcessed.applyDebuffOnDotDmg
                            if ( abilityIdOfDebuff == "debilitate" ){
                                passiveEffectsString = passiveEffectsString + processDebilitate(event, abilityIdOfDebuff, member)
                            }
                        }
                        if (event.membersInParty[member].statuses[index].dot.dealDamageToGroupBasedOnHealthMissing){
                            // deal areawide damage
                            let healthMissing = calculateMissingHealth(event.membersInParty[member]) 
                            var abilityCastName = event.membersInParty[member].statuses[index].dot.name
                            var damageToDeal = healthMissing;
                            let dotHolder = member
                            passiveEffectsString = passiveEffectsString + "The group suffered " + damageToDeal + " damage - " + abilityCastName +"\n"
                            for (var targetToDealDmg in event.membersInParty){
                                if (!checkIfDeadByObject(event.membersInParty[targetToDealDmg])
                                && dotHolder != targetToDealDmg
                                && !event.membersInParty[targetToDealDmg].immuneToAoe){
                                    var abType = event.membersInParty[member].statuses[index].dot.type
                                    damageToDealToPlayer = dealDamageTo(event.membersInParty[targetToDealDmg], damageToDeal, event, abType)
                                    passiveEffectsString = passiveEffectsString + triggerBufFromDamage(event, event.membersInParty[targetToDealDmg] )
                                    if (checkHasDied(event.membersInParty[targetToDealDmg])){
                                        passiveEffectsString = passiveEffectsString + hasDied(event, event.membersInParty[targetToDealDmg]);
                                    }
                                }
                            }
                        }
                        if ( checkHasDied(event.membersInParty[member])){
                            // check once again if the target is alive
                            break;
                        }
                        // remove dot after processing
                        if (event.membersInParty[member].statuses[index].dot.expireOnTurn == event.turn){
                            if (event.membersInParty[member].statuses[index].dot.dmgOnDotExpire){
                                event.membersInParty[member].statuses[index].dot.dmg = event.membersInParty[member].statuses[index].dot.dmgOnExpire;
                                delete event.membersInParty[member].statuses[index].dot.turnsToExpire
                                var damageToDealToPlayer = calculateDamageDealt(event, event.membersInParty[member].statuses[index].dot.caster, member, event.membersInParty[member].statuses[index].dot)
                                var critStrike = damageToDealToPlayer.critical ? ">" : ""
                                var abType = event.membersInParty[member].statuses[index].dot.type
                                damageToDealToPlayer = dealDamageTo( event.membersInParty[member], damageToDealToPlayer.dmg, event, abType)
                                passiveEffectsString = passiveEffectsString + critStrike + event.membersInParty[member].name + " took " + damageToDealToPlayer + " damage - " + event.membersInParty[member].statuses[index].dot.name + "\n"
                                passiveEffectsString = passiveEffectsString + triggerBufFromDamage(event, event.membersInParty[member] )
                                if ( checkHasDied(event.membersInParty[member])){
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
                        var statusCaster = event.membersInParty[member].statuses[index].caster
                        if (event.membersInParty[member].statuses[index].expireOnTurn == event.turn){
                            // remove the status if it is the turn to expire on
                            if (event.membersInParty[member].statuses[index].dmgOnStatusExpire){
                                event.membersInParty[member].statuses[index].dmg = event.membersInParty[member].statuses[index].dmgOnExpire;
                                delete event.membersInParty[member].statuses[index].turnsToExpire
                                var damageToDealToPlayer = calculateDamageDealt(event, event.membersInParty[member].statuses[index].caster, member, event.membersInParty[member].statuses[index])
                                var critStrike = damageToDealToPlayer.critical ? ">" : ""
                                var abType = event.membersInParty[member].statuses[index].type
                                damageToDealToPlayer = dealDamageTo( event.membersInParty[member], damageToDealToPlayer.dmg, event, abType)
                                passiveEffectsString = passiveEffectsString + critStrike + event.membersInParty[member].name + " took " + damageToDealToPlayer + " damage - " + event.membersInParty[member].statuses[index].name + "\n"
                                passiveEffectsString = passiveEffectsString + processReflectEffects(event, member, damageToDealToPlayer, statusCaster, "dot")
                                passiveEffectsString = passiveEffectsString + triggerBufFromDamage(event, event.membersInParty[member] )
                                if ( checkHasDied(event.membersInParty[member])){
                                    passiveEffectsString = passiveEffectsString + hasDied(event, event.membersInParty[member]);
                                    break;
                                }
                            }
                            if (event.membersInParty[member].statuses[index].deathOnStatusExpire){
                                event.membersInParty[member].hp = -9999999999999999
                                if ( checkHasDied(event.membersInParty[member])){
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
        if (!checkIfDeadByObject(event.membersInParty[member])){
            for (var index = event.membersInParty[member].buffs.length - 1; index >= 0; index--){
                // go through each status
                if (!checkIfDeadByObject(event.membersInParty[member])){
                    // if it is a hot, process the healing of the hot
                    if (event.membersInParty[member].buffs[index].hot){
                        // process the hot
                        var healingToPlayer = calculateHealingDone(event, event.membersInParty[member].buffs[index].hot.caster, member, event.membersInParty[member].buffs[index].hot)
                        healTarget( event.membersInParty[member], healingToPlayer)
                        var critStrike = healingToPlayer.critical ? ">" : ""
                        passiveEffectsString = passiveEffectsString + critStrike + event.membersInParty[member].name + " took " + healingToPlayer.heal + " healing - " + event.membersInParty[member].buffs[index].hot.name + "\n"                        
                        if (event.membersInParty[member].hp > event.membersInParty[member].maxhp){
                            event.membersInParty[member].hp = event.membersInParty[member].maxhp
                        }

                        if (event.membersInParty[member].buffs[index].hot.expireOnTurn == event.turn){
                            event.membersInParty[member].buffs.splice(index, 1);
                            continue;
                        }
                    }
                    if (event.membersInParty[member].buffs[index].buff){
                        if (event.membersInParty[member].buffs[index].expireOnTurn == event.turn){
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
        if (!checkIfDeadByObject(event.enemies[enemy])){
            for (var index = event.enemies[enemy].statuses.length - 1; index >= 0; index--){
                // go through each status
                if (!checkIfDeadByObject(event.enemies[enemy])){
                    // if it is a dot, then process the damage of the dot
                    if (event.enemies[enemy].statuses[index].dot){
                        // process the dot
                        var dotCaster = event.enemies[enemy].statuses[index].dot.caster
                        var damageToDealToPlayer = calculateDamageDealt(event, dotCaster, enemy, event.enemies[enemy].statuses[index].dot)
                        var critStrike = damageToDealToPlayer.critical ? ">" : ""
                        var abType = event.enemies[enemy].statuses[index].dot.type
                        damageToDealToPlayer = dealDamageTo(event.enemies[enemy], damageToDealToPlayer.dmg, event, abType)
                        passiveEffectsString = passiveEffectsString + critStrike + event.enemies[enemy].name + " took " + damageToDealToPlayer + " damage - " + event.enemies[enemy].statuses[index].dot.name + "\n"
                        passiveEffectsString = passiveEffectsString + triggerBufFromDamage(event, event.enemies[enemy] )
                        // process reflect effects
                        passiveEffectsString = passiveEffectsString + processReflectEffects(event, enemy, damageToDealToPlayer, dotCaster, "dot")
                        if ( checkHasDied(event.enemies[enemy])){
                            passiveEffectsString = passiveEffectsString + hasDied(event, event.enemies[enemy], dotCaster);
                            break;
                        }
                        // remove dot after processing
                        if (event.enemies[enemy].statuses[index].dot.expireOnTurn == event.turn){
                            if (event.enemies[enemy].statuses[index].dot.dmgOnDotExpire){
                                event.enemies[enemy].statuses[index].dot.dmg = event.enemies[enemy].statuses[index].dot.dmgOnExpire;
                                var damageToDealToPlayer = calculateDamageDealt(event, dotCaster, enemy, event.enemies[enemy].statuses[index].dot)
                                var critStrike = damageToDealToPlayer.critical ? ">" : ""
                                var abType = event.enemies[enemy].statuses[index].dot.type
                                damageToDealToPlayer = dealDamageTo( event.enemies[enemy], damageToDealToPlayer.dmg, event, abType)
                                passiveEffectsString = passiveEffectsString + critStrike + event.enemies[enemy].name + " took " + damageToDealToPlayer + " damage - " + event.enemies[enemy].statuses[index].dot.name + "\n"
                                passiveEffectsString = passiveEffectsString + triggerBufFromDamage(event, event.enemies[enemy] )
                                if ( checkHasDied(event.enemies[enemy])){
                                    passiveEffectsString = passiveEffectsString + hasDied(event, event.enemies[enemy], dotCaster);
                                    break;
                                }                                  
                            }
                            event.enemies[enemy].statuses.splice(index, 1);
                            continue;
                        }
                    }
                    /// status is expiring
                    if (event.enemies[enemy].statuses[index].status){
                        var statusCaster = event.enemies[enemy].statuses[index].caster
                        if (event.enemies[enemy].statuses[index].expireOnTurn == event.turn){
                            // remove the status if it is the turn to expire on
                            if (event.enemies[enemy].statuses[index].dmgOnStatusExpire){
                                event.enemies[enemy].statuses[index].dmg = event.enemies[enemy].statuses[index].dmgOnExpire;
                                delete event.enemies[enemy].statuses[index].turnsToExpire
                                var damageToDealToPlayer = calculateDamageDealt(event, event.enemies[enemy].statuses[index].caster, member, event.enemies[enemy].statuses[index])
                                var critStrike = damageToDealToPlayer.critical ? ">" : ""
                                var abType = event.enemies[enemy].statuses[index].type
                                damageToDealToPlayer = dealDamageTo( event.enemies[enemy], damageToDealToPlayer.dmg, event, abType)
                                passiveEffectsString = passiveEffectsString + critStrike + event.enemies[enemy].name + " took " + damageToDealToPlayer + " damage - " + event.enemies[enemy].statuses[index].name + "\n"
                                passiveEffectsString = passiveEffectsString + processReflectEffects(event, enemy, damageToDealToPlayer, statusCaster, "dot")
                                passiveEffectsString = passiveEffectsString + triggerBufFromDamage(event, event.enemies[enemy] )
                                if ( checkHasDied(event.enemies[enemy])){
                                    passiveEffectsString = passiveEffectsString + hasDied(event, event.enemies[enemy], statusCaster);
                                    break;
                                }
                            }
                            if (event.enemies[enemy].statuses[index].deathOnStatusExpire){
                                event.enemies[enemy].hp = 0
                                if ( checkHasDied(event.enemies[enemy])){
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
        if (!checkIfDeadByObject(event.enemies[enemy])){
            for (var index = event.enemies[enemy].buffs.length - 1; index >= 0; index--){
                // go through each status
                if (!checkIfDeadByObject(event.enemies[enemy])){
                     // if it is a hot, process the healing of the hot
                     if (event.enemies[enemy].buffs[index].hot){
                        // process the hot
                        var healingToPlayer = calculateHealingDone(event, event.enemies[enemy].buffs[index].hot.caster, enemy, event.enemies[enemy].buffs[index].hot)
                        healTarget( event.enemies[enemy], healingToPlayer)
                        var critStrike = healingToPlayer.critical ? ">" : ""
                        passiveEffectsString = passiveEffectsString + critStrike + event.enemies[enemy].name + " took " + healingToPlayer.heal + " healing - " + event.enemies[enemy].buffs[index].hot.name + "\n"                                                
                        if (event.enemies[enemy].hp > event.enemies[enemy].maxhp){
                            event.enemies[enemy].hp = event.enemies[enemy].maxhp
                        }

                        if (event.enemies[enemy].buffs[index].hot.expireOnTurn == event.turn){
                            event.enemies[enemy].buffs.splice(index, 1);
                            continue;
                        }
                    }
                    if (event.enemies[enemy].buffs[index].expireOnTurn){
                        if (event.enemies[enemy].buffs[index].expireOnTurn == event.turn){
                            if (event.enemies[enemy].buffs[index].specialOnExpire){
                                // do the special on expire effect
                                if (event.enemies[enemy].buffs[index].onExpireRemoveMemberStatus
                                    && event.enemies[enemy].buffs[index].onExpireRemoveMemberStatus == "Radioactive"){
                                    removeRadiactive(event);
                                }
                                if (event.enemies[enemy].buffs[index].name == "yellowEnergyCrystal"){
                                    processYellowEnergyCrystal(event, false);
                                }
                            }
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
            if (target == "enemy"){
                var foundEntomb = false
                // TODO: check if dead also, why should we check dead enemies armor ??
                for (var b = checkGroupArmor[member].buffs.length - 1; b >= 0; b--){
                    if (checkGroupArmor[member].buffs[b].name == "Entomb"){
                        foundEntomb = true
                        break;
                    }
                }
                if (!foundEntomb){
                    numberOfMembers++;
                    totalArmor = totalArmor + (checkGroupArmor[member].armor + checkGroupArmor[member].statBuffs.armor);    
                }
            }
            else{
                numberOfMembers++;
                totalArmor = totalArmor + (checkGroupArmor[member].armor + checkGroupArmor[member].statBuffs.armor);    
            }
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
            if (target == "enemy"){
                var foundEntomb = false
                // TODO: check if dead also, why should we check dead enemies armor ??
                for (var b = checkGroupArmor[member].buffs.length - 1; b >= 0; b--){
                    if (checkGroupArmor[member].buffs[b].name == "Entomb"){
                        foundEntomb = true
                        break;
                    }
                }
                if (!foundEntomb){
                    numberOfMembers++;
                    totalSpirit = totalSpirit + (checkGroupArmor[member].spirit + checkGroupArmor[member].statBuffs.spirit);    
                }
            }
            else{
                numberOfMembers++;
                totalSpirit = totalSpirit + (checkGroupArmor[member].spirit + checkGroupArmor[member].statBuffs.spirit);    
            }
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
    var formula = 100 / ((65 * 70 - 1716) / statUsedToReduce + 1)
    formula = formula * 0.01
    return formula;

    // gain armor squared by level
    // rares give 75, 125, 250 armor average, ancients 150, 300, 450 armor average, artifacts 600
    // 200 base + 10 HP * level
    // AD + MD 50 base + 5 per level ?
}

function calculateMissingHealth(member){
    let missingHealth = 0
    missingHealth = (member.maxhp + member.statBuffs.maxhp) - member.hp

    return missingHealth
}

function checkCasterCanDamageTarget(caster, target){
    // check that target is able to be attacked by the caster
    var canBeDamagedByCaster = true;
    if (target && target.buffs){
        for (var b in target.buffs){
            if (target.buffs[b].onlyTargettableBy && target.buffs[b].onlyTargettableBy.indexOf(caster.id) == -1){
                canBeDamagedByCaster = false
            }
        }
    }
    return canBeDamagedByCaster
}

function calculateDamageDealt(event, caster, target, rpgAbility){
    // damage dealt to user, or damage dealt by dot
    // check the ability is cast by a member of party or enemy and get their stats
    var baseDamage = rpgAbility.dmg;
    var abilityType = rpgAbility.type;
    var areaWideAbility = rpgAbility.areawide;
    var endOfTurnAura = rpgAbility.endOfTurnAura;
    var casterDamageDealtPercentage = 1
    var criticalStrikeChance = 0
    var criticalDamagePlus = 1

    if (caster <= 1000){
        let keystoneBaseDmgMultiplier = 1 + (event.challenge && event.challenge.keystone ? event.challenge.keystone * 0.33 : 0)
        if (event.area){
            var areaToCheck = event.area
            var zoneAreaIsIn = getRpgZone(areaToCheck)
            let rpgZoneDifficulty = 1
            rpgZoneDifficulty = rpgZones[zoneAreaIsIn].zoneDifficulty || 1
            keystoneBaseDmgMultiplier = 1 + ( rpgZoneDifficulty )
        }
        var baseDamage = baseDamage * keystoneBaseDmgMultiplier
        // the caster is an enemy
        var checkTarget = event.membersInParty[target];
        
        if (checkTarget || areaWideAbility || endOfTurnAura){
            // the target is a user
            var userStats = event.enemies[caster];
            // obtain the caster's damageDealtPercentage
            if (userStats && userStats.globalStatuses){
                casterDamageDealtPercentage = userStats.globalStatuses.damageDealtPercentage
            }
            var targetStats = event.membersInParty[target];
            // add damage 
            if (abilityType == "physical"){
                // use attack damage
                var damageToIncrease = 0
                baseDamage = additionalDamageAD(rpgAbility, userStats, damageToIncrease, baseDamage);
                // reduce damage from armor
                var damageToReduce = getDamageToReduceFromArmor(rpgAbility, event, targetStats, 0, "party");

                if (damageToReduce > 0.95){
                    damageToReduce = 0.95
                }
                baseDamage = baseDamage * (1 - damageToReduce);
                
                // additional RNG
                var rngDmgRoll = Math.floor(Math.random() * Math.floor(baseDamage * 0.07)) + 1;
                baseDamage = baseDamage  + rngDmgRoll;
            }else{
                // use magic damage
                var damageToIncrease = 0
                baseDamage = additionalDamageMD(rpgAbility, userStats, damageToIncrease, baseDamage);
                // reduce damage from spirit
                var damageToReduce = getDamageToReduceFromSpirit(rpgAbility, event, targetStats, 0, "party");
                
                if (damageToReduce > 0.95){
                    damageToReduce = 0.95
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
                // obtain the caster's damageDealtPercentage
                if (userStats && userStats.globalStatuses){
                    casterDamageDealtPercentage = userStats.globalStatuses.damageDealtPercentage
                }
                var targetStats = event.enemies[target];
                // add damage 
                if (abilityType == "physical"){
                    // use attack damage
                    var damageToIncrease = 0
                    baseDamage = additionalDamageAD(rpgAbility, userStats, damageToIncrease, baseDamage);
                    // reduce damage from armor
                    var damageToReduce = getDamageToReduceFromArmor(rpgAbility, event, targetStats, 0, "enemy");

                    if (damageToReduce > 0.95){
                        damageToReduce = 0.95
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
                    
                    if (damageToReduce > 0.95){
                        damageToReduce = 0.95
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
        if (checkTarget && checkTarget.globalStatuses){
            casterDamageDealtPercentage = checkTarget.globalStatuses.damageDealtPercentage
        }
        
        if (checkTarget || areaWideAbility || endOfTurnAura){
            // the target is an enemy
            // get the stats for caster and target
            var userStats = event.membersInParty["rpg-"+caster];
            // obtain the caster's damageDealtPercentage
            if (userStats && userStats.globalStatuses){
                casterDamageDealtPercentage = userStats.globalStatuses.damageDealtPercentage
            }
            criticalStrikeChance = userStats.criticalChance
            criticalDamagePlus = criticalDamagePlus + (userStats.luck / 100 )

            var targetStats = event.enemies[target];
            // check that the enemy can be damaged by this caster
            var canDamageTarget = checkCasterCanDamageTarget(userStats, targetStats)
            if (!canDamageTarget){
                return {
                    dmg: 0,
                    critical: false
                }
            }

            // add damage 
            if (abilityType == "physical"){
                // use attack damage
                var damageToIncrease = 0
                baseDamage = additionalDamageAD(rpgAbility, userStats, damageToIncrease, baseDamage);
                // reduce damage from armor of target
                var damageToReduce = getDamageToReduceFromArmor(rpgAbility, event, targetStats, 0, "enemy");

                if (damageToReduce > 0.95){
                    damageToReduce = 0.95
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
                
                if (damageToReduce > 0.95){
                    damageToReduce = 0.95
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
                // obtain the caster's damageDealtPercentage
                if (userStats && userStats.globalStatuses){
                    casterDamageDealtPercentage = userStats.globalStatuses.damageDealtPercentage
                }
                criticalStrikeChance = userStats.criticalChance
                criticalDamagePlus = criticalDamagePlus + ( userStats.luck / 100 )
                var targetStats = event.membersInParty[target];
                // add damage 
                if (abilityType == "physical"){
                    // use attack damage
                    var damageToIncrease = 0
                    baseDamage = additionalDamageAD(rpgAbility, userStats, damageToIncrease, baseDamage);                    
                    // now reduce damage from armor
                    var damageToReduce = getDamageToReduceFromArmor(rpgAbility, event, targetStats, 0, "party");

                    if (damageToReduce > 0.95){
                        damageToReduce = 0.95
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
                    
                    if (damageToReduce > 0.95){
                        damageToReduce = 0.95
                    }
                    baseDamage = baseDamage * ( 1 - damageToReduce );
                    
                    // additional RNG
                    var rngDmgRoll = Math.floor(Math.random() * Math.floor(baseDamage * 0.07)) + 1;
                    baseDamage = baseDamage + rngDmgRoll;
                }
            }
        }
    }
    // roll for crit strike
    var criticalStrike = rollForCriticalStrike(criticalStrikeChance)
    if (criticalStrike){
        // tag the user as having scored a CRIT
        event.membersInParty["rpg-"+caster].lastCritOnTurn = event.turn
        return {
            dmg: Math.floor( (baseDamage * casterDamageDealtPercentage)  *  criticalDamagePlus ),
            critical: true
        }
    }else{
        return {
            dmg: Math.floor(baseDamage * casterDamageDealtPercentage),
            critical: false
        }
    }
}

function rollForCriticalStrike(criticalStrikeChance){
    var critRoll = Math.floor(Math.random() * 10000) + 1;
    var critToRollOver = criticalStrikeChance * 100
    if (critRoll > (10000 -  critToRollOver) ){
        return true
    }else{
        return false
    }
}

function calculateHealingDone(event, caster, target, rpgAbility){
    // healing done to user or healing done by hot
    var baseHealing = rpgAbility.heal;
    if (baseHealing == undefined && rpgAbility.healWhenDamageTaken){
        baseHealing = rpgAbility.healWhenDamageTaken
    }
    var abilityType = rpgAbility.type;
    var areaWideAbility = rpgAbility.areawide;
    var endOfTurnAura = rpgAbility.endOfTurnAura;
    var casterHealingDonePercentage = 1
    var targetHealingTakenPercentage = 1
    var criticalStrikeChance = 0
    var criticalHealingPlus = 1
    let useAdStat = false
    if (!rpgAbility.mdPercentage && rpgAbility.adPercentage){
        useAdStat = true
    }

    if (caster < 1000){
        let keystoneBaseHealingMultiplier = 1 + (event.challenge && event.challenge.keystone ? event.challenge.keystone * 0.33 : 0)
        var checkTarget = event.enemies[target]
        baseHealing = baseHealing * keystoneBaseHealingMultiplier
        if (checkTarget || areaWideAbility || endOfTurnAura){
            var userStats = event.enemies[caster];
            if (userStats && userStats.globalStatuses){
                casterHealingDonePercentage = userStats.globalStatuses.healingDonePercentage
            }
            if (checkTarget && checkTarget.globalStatuses){
                targetHealingTakenPercentage = checkTarget.globalStatuses.healingTakenPercentage
            }
            var healingToDo = 0
            if (rpgAbility.turnsToExpire){
                if (rpgAbility.arAndSpPercentage){
                    var armor = userStats.armor + userStats.statBuffs.armor
                    var spirit = userStats.spirit + userStats.statBuffs.spirit
                    var combined = armor + spirit
                    
                    healingToDo = healingToDo + combined;
                    baseHealing = baseHealing + Math.floor((healingToDo / rpgAbility.turnsToExpire) * rpgAbility.arAndSpPercentage)
                }else{
                    if (useAdStat){
                        healingToDo = healingToDo + (userStats.attackDmg + userStats.statBuffs.attackDmg);
                        baseHealing = baseHealing + Math.floor(( healingToDo / rpgAbility.turnsToExpire ) * rpgAbility.adPercentage)        
                    }else{
                        healingToDo = healingToDo + (userStats.magicDmg + userStats.statBuffs.magicDmg);
                        baseHealing = baseHealing + Math.floor(( healingToDo / rpgAbility.turnsToExpire ) * rpgAbility.mdPercentage)        
                    }
                }
            }else{
                if (rpgAbility.areawide){
                    if (useAdStat){
                        healingToDo = healingToDo + (userStats.attackDmg + userStats.statBuffs.attackDmg);
                        baseHealing = baseHealing + Math.floor(healingToDo * rpgAbility.adPercentage)    
                    }else{
                        healingToDo = healingToDo + (userStats.magicDmg + userStats.statBuffs.magicDmg);
                        baseHealing = baseHealing + Math.floor(healingToDo * rpgAbility.mdPercentage)    
                    }
                }else{
                    if (useAdStat){
                        healingToDo = healingToDo + (userStats.attackDmg + userStats.statBuffs.attackDmg);
                        baseHealing = baseHealing + Math.floor(healingToDo * rpgAbility.adPercentage)
    
                    }else{
                        healingToDo = healingToDo + (userStats.magicDmg + userStats.statBuffs.magicDmg);
                        baseHealing = baseHealing + Math.floor(healingToDo * rpgAbility.mdPercentage)
                    }
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
                if (userStats && userStats.globalStatuses){
                    casterHealingDonePercentage = userStats.globalStatuses.healingDonePercentage
                }
                if (checkTarget && checkTarget.globalStatuses){
                    targetHealingTakenPercentage = checkTarget.globalStatuses.healingTakenPercentage
                }
                var healingToDo = 0

                if (rpgAbility.turnsToExpire){
                    if (useAdStat){
                        healingToDo = healingToDo + (userStats.attackDmg + userStats.statBuffs.attackDmg);
                        baseHealing = baseHealing + Math.floor(( healingToDo / rpgAbility.turnsToExpire ) * rpgAbility.adPercentage)    
                    }else{
                        healingToDo = healingToDo + (userStats.magicDmg + userStats.statBuffs.magicDmg);
                        baseHealing = baseHealing + Math.floor(( healingToDo / rpgAbility.turnsToExpire ) * rpgAbility.mdPercentage)    
                    }
                }else{
                    if (rpgAbility.areawide){
                        if (useAdStat){
                            healingToDo = healingToDo + (userStats.attackDmg + userStats.statBuffs.attackDmg);
                            baseHealing = baseHealing + Math.floor(healingToDo *  rpgAbility.adPercentage)    
                        }else{
                            healingToDo = healingToDo + (userStats.magicDmg + userStats.statBuffs.magicDmg);
                            baseHealing = baseHealing + Math.floor(healingToDo *  rpgAbility.mdPercentage)    
                        }
                    }else{
                        if (useAdStat){
                            healingToDo = healingToDo + (userStats.attackDmg + userStats.statBuffs.attackDmg);
                            baseHealing = baseHealing + Math.floor(healingToDo * rpgAbility.adPercentage)    
                        }else{
                            healingToDo = healingToDo + (userStats.magicDmg + userStats.statBuffs.magicDmg);
                            baseHealing = baseHealing + Math.floor(healingToDo * rpgAbility.mdPercentage)    
                        }
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
        if (userStats && userStats.globalStatuses){
            casterHealingDonePercentage = userStats.globalStatuses.healingDonePercentage
        }
        criticalStrikeChance = userStats.criticalChance
        criticalHealingPlus = criticalHealingPlus + (userStats.luck / 100) // damage and healing are same stat
        var checkTarget = event.membersInParty[target];
        if (checkTarget || areaWideAbility || endOfTurnAura){
            var healingToDo = 0
            if (checkTarget && checkTarget.globalStatuses){
                targetHealingTakenPercentage = checkTarget.globalStatuses.healingTakenPercentage
            }
            if (rpgAbility.turnsToExpire){
                if (rpgAbility.arAndSpPercentage){
                    var armor = userStats.armor + userStats.statBuffs.armor
                    var spirit = userStats.spirit + userStats.statBuffs.spirit
                    var combined = armor + spirit

                    healingToDo = healingToDo + combined;
                    baseHealing = baseHealing + Math.floor((healingToDo / rpgAbility.turnsToExpire) * rpgAbility.arAndSpPercentage)
                }else{
                    if (useAdStat){
                        healingToDo = healingToDo + (userStats.attackDmg + userStats.statBuffs.attackDmg);
                        baseHealing = baseHealing + Math.floor(( healingToDo / rpgAbility.turnsToExpire ) * rpgAbility.adPercentage)        
                    }else{
                        healingToDo = healingToDo + (userStats.magicDmg + userStats.statBuffs.magicDmg);
                        baseHealing = baseHealing + Math.floor(( healingToDo / rpgAbility.turnsToExpire ) * rpgAbility.mdPercentage)        
                    }
                }
            }else{
                if (rpgAbility.areawide){
                    if (useAdStat){
                        healingToDo = healingToDo + (userStats.attackDmg + userStats.statBuffs.attackDmg);
                        baseHealing = baseHealing + Math.floor(healingToDo * rpgAbility.adPercentage)
                    }else{
                        healingToDo = healingToDo + (userStats.magicDmg + userStats.statBuffs.magicDmg);
                        baseHealing = baseHealing + Math.floor(healingToDo * rpgAbility.mdPercentage)
                    }
                }
                else{
                    if (useAdStat){
                        healingToDo = healingToDo + (userStats.attackDmg + userStats.statBuffs.attackDmg);
                        baseHealing = baseHealing + Math.floor(healingToDo * rpgAbility.adPercentage)    
                    }else{
                        healingToDo = healingToDo + (userStats.magicDmg + userStats.statBuffs.magicDmg);
                        baseHealing = baseHealing + Math.floor(healingToDo * rpgAbility.mdPercentage)    
                    }
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
                if (checkTarget && checkTarget.globalStatuses){
                    targetHealingTakenPercentage = checkTarget.globalStatuses.healingTakenPercentage
                }
                if (rpgAbility.turnsToExpire){
                    if (useAdStat){
                        healingToDo = healingToDo + (userStats.attackDmg + userStats.statBuffs.attackDmg);
                        baseHealing = baseHealing + Math.floor(( healingToDo / rpgAbility.turnsToExpire ) * rpgAbility.adPercentage)    
                    }else{
                        healingToDo = healingToDo + (userStats.magicDmg + userStats.statBuffs.magicDmg);
                        baseHealing = baseHealing + Math.floor(( healingToDo / rpgAbility.turnsToExpire ) * rpgAbility.mdPercentage)    
                    }
                }else{
                    if (rpgAbility.areawide){
                        if (useAdStat){
                            healingToDo = healingToDo + (userStats.attackDmg + userStats.statBuffs.attackDmg);
                            baseHealing = baseHealing + Math.floor(healingToDo * rpgAbility.adPercentage)    
                        }else{
                            healingToDo = healingToDo + (userStats.magicDmg + userStats.statBuffs.magicDmg);
                            baseHealing = baseHealing + Math.floor(healingToDo * rpgAbility.mdPercentage)    
                        }
                    }else{
                        if (useAdStat){
                            healingToDo = healingToDo + (userStats.attackDmg + userStats.statBuffs.attackDmg);
                            baseHealing = baseHealing + Math.floor(healingToDo * rpgAbility.adPercentage)    
                        }else{
                            healingToDo = healingToDo + (userStats.magicDmg + userStats.statBuffs.magicDmg);
                            baseHealing = baseHealing + Math.floor(healingToDo * rpgAbility.mdPercentage)    
                        }
                    }
                }
                // additional RNG
                var rngDmgRoll = Math.floor(Math.random() * Math.floor(baseHealing * 0.07)) + 1;
                baseHealing = baseHealing + rngDmgRoll;
            }
        }
    }
    // roll for crit strike
    var criticalStrike = rollForCriticalStrike(criticalStrikeChance)
    if (criticalStrike){
        event.membersInParty["rpg-"+caster].lastCritOnTurn = event.turn
        return {
            heal: Math.floor( (baseHealing * casterHealingDonePercentage) * targetHealingTakenPercentage  *  criticalHealingPlus ),
            critical: true,
            target: target
        }
    }else{
        return {
            heal: Math.floor((baseHealing * casterHealingDonePercentage) * targetHealingTakenPercentage ),
            critical: false,
            target: target
        }
    }
}

function healTarget(target, healingDoneObject){
    if (target.globalStatuses.abletobehealed){
        if (!healingDoneObject.target){
            let targetHealingTakenPercentage = 1
            if (target && target.globalStatuses.healingTakenPercentage){
                targetHealingTakenPercentage = target.globalStatuses.healingTakenPercentage
            }
            target.hp = target.hp + Math.floor( healingDoneObject.heal * targetHealingTakenPercentage )
        }else{
            target.hp = target.hp + healingDoneObject.heal
        }
    }else{
        return 0
    }
}

function dealDamageTo(target, damageDealt, event, type){
    if (target.globalStatuses.abletotakedamage){
        // check the target statuses, if they have a status that should be removed from taking damage, remove it
        invalidStatusFromDamage(event, target)
        // check global stats, deal damage according to global status
        damageDealt = damageDealtAdjusted(event, target, damageDealt, type)
        target.hp = target.hp - damageDealt;
        return damageDealt
    }else{
        return 0
    }
}

function damageDealtAdjusted(event, target, damageDealt, type){
    var adjustedDamage = damageDealt
    if (target.id > 1000){
        if (event.membersInParty["rpg-" + target.id].globalStatuses){
            var percentageToReduceBy = event.membersInParty["rpg-" + target.id].globalStatuses.damageTakenPercentage
            adjustedDamage = damageDealt * percentageToReduceBy
        }
        if (type == "physical"){
            var physPercentageToReduceBy = event.membersInParty["rpg-" + target.id].globalStatuses.physicalDamageTakenPercentage
            adjustedDamage = adjustedDamage * physPercentageToReduceBy
        }else{
            var magicPercentageToReduceBy = event.membersInParty["rpg-" + target.id].globalStatuses.magicDamageTakenPercentage
            adjustedDamage = adjustedDamage * magicPercentageToReduceBy
        }
    }else{
        if (event.enemies[target.id].globalStatuses){
            var percentageToReduceBy = event.enemies[target.id].globalStatuses.damageTakenPercentage
            adjustedDamage = damageDealt * percentageToReduceBy
        }
        if (type == "physical"){
            var physPercentageToReduceBy = event.enemies[target.id].globalStatuses.physicalDamageTakenPercentage
            adjustedDamage = adjustedDamage * physPercentageToReduceBy
        }else{
            var magicPercentageToReduceBy = event.enemies[target.id].globalStatuses.magicDamageTakenPercentage
            adjustedDamage = adjustedDamage * magicPercentageToReduceBy
        }
    }
    return Math.floor(adjustedDamage)
}

function invalidStatusFromDamage(event, target){
    // check if enemy or member
    if (target.id > 1000){
        for (var index = event.membersInParty["rpg-" + target.id].statuses.length - 1; index >= 0; index--){
            if (event.membersInParty["rpg-" + target.id].statuses[index].invalidOnDamage){
                event.membersInParty["rpg-" + target.id].statuses[index].invalid = true
            }
        }
    }else{
        for (var index = event.enemies[target.id].statuses.length - 1; index >= 0; index--){
            if (event.enemies[target.id].statuses[index].invalidOnDamage){
                event.enemies[target.id].statuses[index].invalid = true
            }
        }
    }
}
function triggerBufFromDamage(event, target){
    let buffFromDamageString = ""
    for (var index = target.buffs.length - 1; index >= 0; index--){
        if (target.buffs[index].healWhenDamageTaken){
            // heal them based on the damage TODO check if they are not dead first
            if (!checkHasDied( target)){
                var healingToPlayer;
                if (target.id > 1000){
                    var healingToPlayer = calculateHealingDone(event, target.buffs[index].caster, "rpg-"+target.id, target.buffs[index])
                }else{
                    var healingToPlayer = calculateHealingDone(event, target.buffs[index].caster, target.id, target.buffs[index])
                }
                healTarget( target, healingToPlayer)
                var critStrike = healingToPlayer.critical ? ">" : ""
                buffFromDamageString = buffFromDamageString + critStrike + target.name + " took " + healingToPlayer.heal + " healing - " + target.buffs[index].name + "\n"
                if (target.hp > target.maxhp){
                    target.hp = target.maxhp
                }
                if (target.buffs[index].maxcharges){
                    target.buffs[index].charges = target.buffs[index].charges--
                    if (target.buffs[index].charges <= 0){
                        target.buffs.splice(index, 1);
                        continue;
                    }
                }
            }
        }
        // can be other effects
    }
    return buffFromDamageString
}

function checkCasterCritLastTurn(event, abilityCaster, currentTurn){
    if (event.membersInParty["rpg-"+abilityCaster].lastCritOnTurn + 1 >= currentTurn){
        return true
    }else{
        return false
    }
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
    if (rpgAbility.castAbilityAfterCriticalStrike
    && checkCasterCritLastTurn(event, abilityCaster, currentTurn)){
        rpgAbility = rpgAbilities[rpgAbility.castAbilityAfterCriticalStrike]
    }
    var stillAlive = true;
    var onDeathAbilityCast = rpgAbility.onDeathEffect

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
                abilityToString = abilityToString + memberInQuestion.name + " has recharged\n"
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
                abilityToString = abilityToString + enemyInQuestion.name + " has recharged\n"
                var validAbility = false;
            }
        }
    }

    if (abilityCaster > 1000){
        // this is a user
        if (checkIfDeadByObject(event.membersInParty["rpg-"+abilityCaster])){
            // caster is no longer alive
            stillAlive = false;
        }
        if (!event.membersInParty["rpg-"+abilityCaster].globalStatuses.ableToAttack){
            validAbility = false
        }
    }else{
        // this is an enemy
        if (checkIfDeadByObject(event.enemies[abilityCaster])){
            // enemy is no longer alive
            stillAlive = false;
        }
        if (!event.enemies[abilityCaster].globalStatuses.ableToAttack){
            validAbility = false
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

    if (rpgAbility.limitDefensive && abilityCaster > 1000 && event.limitDefensiveReady && stillAlive){
        event.limitDefensiveReady = false;
        event.limitDefensiveTurnUsed = currentTurn
    }
    if (rpgAbility.limitOffensive && abilityCaster > 1000 && event.limitOffensiveReady && stillAlive){
        event.limitOffensiveReady = false;
        event.limitOffensiveTurnUsed = currentTurn
    }

    if (rpgAbility && rpgAbility.dmg && stillAlive && validAbility){
        // this is a damage ability, deal the damage to the target
        
        // calculate the amount of damage that you will do to the target based on:
        // caster AD or MD depending on ability, target armor, special buffs, special debuffs some random number gen
        var damageToDeal = rpgAbility.dmg;
        damageToDeal = calculateDamageDealt(event, abilityCaster, abilityObject.target, rpgAbility)
        // TODO: add damage from pet 
        var critStrike = damageToDeal.critical ? ">" : ""
        if (rpgAbility.areawide){
            // deal damage area wide against opposite party
            if (abilityCaster > 1000){
                // if caster is party of membersInParty then target = all the enemies
                var caster = event.membersInParty["rpg-"+abilityCaster] ? event.membersInParty["rpg-"+abilityCaster].name : undefined;
                abilityToString = abilityToString + critStrike + caster +  " dealt " + damageToDeal.dmg + " damage to all enemies - " + rpgAbility.name + "\n";                
                for (var targetToDealDmg in event.enemies){
                    var targetToDealDmgName = event.enemies[targetToDealDmg].name
                    if (!checkIfDeadByObject(event.enemies[targetToDealDmg])
                    && !event.enemies[targetToDealDmg].immuneToAoe){
                        // target is not dead, damage them
                        var abType = rpgAbility.type
                        let damageToDealToPlayer = dealDamageTo( event.enemies[targetToDealDmg], damageToDeal.dmg, event, abType)
                        abilityToString = abilityToString + processReflectEffects(event, targetToDealDmg, damageToDealToPlayer, abilityCaster, "areawide")
                        abilityToString = abilityToString + triggerBufFromDamage(event, event.enemies[targetToDealDmg] )
                        if (checkHasDied( event.enemies[targetToDealDmg])){
                            abilityToString = abilityToString + hasDied(event, event.enemies[targetToDealDmg], abilityCaster);
                        }
                    }
                }
            }else{
                // if caster is in enemies then target = all the members of party
                var caster = event.enemies[abilityCaster] ? event.enemies[abilityCaster].name : undefined;
                abilityToString = abilityToString + critStrike + caster +  " dealt " + damageToDeal.dmg + " damage to the group with " + rpgAbility.name + "\n";                
                for (var targetToDealDmg in event.membersInParty){
                    var targetToDealDmgName = event.membersInParty[targetToDealDmg].name
                    if (!checkIfDeadByObject(event.membersInParty[targetToDealDmg])){
                        var abType = rpgAbility.type
                        let damageToDealToPlayer = dealDamageTo( event.membersInParty[targetToDealDmg] , damageToDeal.dmg, event, abType)
                        abilityToString = abilityToString + processReflectEffects(event, targetToDealDmg, damageToDealToPlayer, abilityCaster, "areawide")
                        abilityToString = abilityToString + triggerBufFromDamage(event, event.membersInParty[targetToDealDmg] )
                        if (checkHasDied(event.membersInParty[targetToDealDmg])){
                            abilityToString = abilityToString + hasDied(event, event.membersInParty[targetToDealDmg]);
                        }
                    }
                }
            }
        }else{
            var targetToDealDmg = abilityObject.target;
            // dealing damage to enemies
            if (event.enemies[targetToDealDmg]){
                let extraLine = true
                let numberOfAttacks = 1
                if (rpgAbility.randomNumberOfCasts){
                    numberOfAttacks = Math.ceil(Math.random() * rpgAbility.randomNumberOfCasts)
                }
                for(let noa = 0; noa < numberOfAttacks; noa++){
                    var targetToDealDmgName = event.enemies[targetToDealDmg].name
                    var abType = rpgAbility.type
                    damageToDeal = calculateDamageDealt(event, abilityCaster, abilityObject.target, rpgAbility)
                    let damageToDealToPlayer = dealDamageTo(event.enemies[targetToDealDmg], damageToDeal.dmg, event, abType)
                    if (noa == 0){
                        abilityToString = abilityToString + critStrike + targetToDealDmgName + " took " + damageToDealToPlayer + " damage - " + rpgAbility.name
                    }else{
                        abilityToString = abilityToString + " + " + damageToDealToPlayer
                    }
                    // check onDamageTakenGiveBuff, and if the target has that buff, create the buff and give it to caster
                    abilityToString = abilityToString + checkIfDamageTakenGiveBuff( event, event.enemies[targetToDealDmg], abilityCaster )
                    abilityToString = abilityToString + checkIfDamageTakenCastAbility( event, event.enemies[targetToDealDmg], abilityCaster )
                    abilityToString = abilityToString + processReflectEffects(event, targetToDealDmg, damageToDealToPlayer, abilityCaster, "dmg")
                    abilityToString = abilityToString + triggerBufFromDamage(event, event.enemies[targetToDealDmg] )
                    if ( checkHasDied(event.enemies[targetToDealDmg])){
                        abilityToString = abilityToString + "\n"
                        abilityToString = abilityToString + hasDied(event, event.enemies[targetToDealDmg], abilityCaster);
                        extraLine = false
                    }
                }
                if (extraLine){
                    abilityToString = abilityToString + "\n"
                }
            }else if (event.membersInParty[targetToDealDmg]){
                let extraLine = true
                let numberOfAttacks = 1
                if (rpgAbility.randomNumberOfCasts){
                    numberOfAttacks = Math.ceil(Math.random() * rpgAbility.randomNumberOfCasts)
                }
                for(let noa = 0; noa < numberOfAttacks; noa++){
                    // dealing damage to members of party (friendly fire or enemy attacking)
                    var targetToDealDmgName = event.membersInParty[targetToDealDmg].name;
                    var abType = rpgAbility.type
                    damageToDeal = calculateDamageDealt(event, abilityCaster, abilityObject.target, rpgAbility)
                    let damageToDealToPlayer = dealDamageTo( event.membersInParty[targetToDealDmg], damageToDeal.dmg, event, abType )
                    if (noa == 0){
                        abilityToString = abilityToString + critStrike + targetToDealDmgName + " took " + damageToDealToPlayer + " damage - " + rpgAbility.name
                    }else{
                        abilityToString = abilityToString + " + " + damageToDealToPlayer
                    }
                    // check if the caster dealing damage has "maniac" buff, if so, deal aoe damage to everyone else except the target
                    abilityToString = abilityToString + processDamageDealingBuffs(event, damageToDealToPlayer, event.membersInParty[targetToDealDmg], abilityCaster)
                    abilityToString = abilityToString + processReflectEffects(event, targetToDealDmg, damageToDealToPlayer, abilityCaster, "dmg")
                    abilityToString = abilityToString + triggerBufFromDamage(event, event.membersInParty[targetToDealDmg] )
                    if (checkHasDied(event.membersInParty[targetToDealDmg])){
                        abilityToString = abilityToString + "\n"
                        abilityToString = abilityToString + hasDied(event, event.membersInParty[targetToDealDmg]);
                        extraLine = false
                    }
                }
                if (extraLine){
                    abilityToString = abilityToString + "\n"
                }
            }
        }
    }
    if (rpgAbility && rpgAbility.heal && stillAlive && validAbility){
        // this is a healing ability, heal the target
        var hpToHeal = calculateHealingDone(event, abilityCaster, abilityObject.target, rpgAbility);
        var critStrike = hpToHeal.critical ? ">" : ""
        let validHeal = true
        if (rpgAbility.areawide){
            
            if (validHeal && abilityCaster > 1000){
                // if caster is party of membersInParty then target = all the membersInParty
                var caster = event.membersInParty["rpg-"+abilityCaster] ? event.membersInParty["rpg-"+abilityCaster].name : undefined;
                abilityToString = abilityToString + critStrike + caster +  " healed the group for " + hpToHeal.heal + " - " + rpgAbility.name + "\n";                
                for (var targetToHeal in event.membersInParty){
                    if (!checkIfDeadByObject(event.membersInParty[targetToHeal])){
                        healTarget( event.membersInParty[targetToHeal], hpToHeal)
                        // gain stack of radioactive
                        abilityToString = abilityToString + checkRadioactive(event, event.membersInParty[targetToHeal])
                        if (event.membersInParty[targetToHeal].hp > event.membersInParty[targetToHeal].maxhp){
                            event.membersInParty[targetToHeal].hp = event.membersInParty[targetToHeal].maxhp
                        }
                    }
                }
            }else if (validHeal){
                // if caster is in enemies then target = all the members of party
                var caster = event.enemies[abilityCaster] ? event.enemies[abilityCaster].name : undefined;
                abilityToString = abilityToString + critStrike + caster +  " healed the group for " + hpToHeal.heal + " - " + rpgAbility.name + "\n";                
                for (var targetToHeal in event.enemies){
                    if (!checkIfDeadByObject(event.enemies[targetToHeal])){
                        healTarget( event.enemies[targetToHeal], hpToHeal)
                        if (event.enemies[targetToHeal].hp > event.enemies[targetToHeal].maxhp){
                            event.enemies[targetToHeal].hp = event.enemies[targetToHeal].maxhp
                        }
                    }
                }
            }
        }else{
            var targetToHeal = abilityObject.target;
            if (validHeal && rpgAbility.healMaxHpPercentage){
                if (event.enemies[targetToHeal]){
                    hpToHeal.heal = Math.floor(event.enemies[targetToHeal].maxhp * rpgAbility.healMaxHpPercentage)
                }else{
                    abilityToString = abilityToString + "could not heal anyone\n"
                    validHeal = false
                }
            }
            if (validHeal && event.membersInParty[targetToHeal]){
                var targetToHealName = event.membersInParty[targetToHeal].name;
                if (!checkIfDeadByObject(event.membersInParty[targetToHeal])){
                    // target is not dead
                    healTarget( event.membersInParty[targetToHeal], hpToHeal)
                    // gain stack of radioactive
                    abilityToString = abilityToString + checkRadioactive(event, event.membersInParty[targetToHeal])
                    abilityToString = abilityToString + critStrike + targetToHealName + " was healed for " + hpToHeal.heal + "\n"
                    if (event.membersInParty[targetToHeal].hp > event.membersInParty[targetToHeal].maxhp){
                        event.membersInParty[targetToHeal].hp = event.membersInParty[targetToHeal].maxhp
                    }
                }
            }else if (validHeal && event.enemies[targetToHeal]){
                var targetToHealName = event.enemies[targetToHeal].name;
                if (!checkIfDeadByObject(event.enemies[targetToHeal])){
                    healTarget( event.enemies[targetToHeal] , hpToHeal)
                    abilityToString = abilityToString + critStrike + targetToHealName + " was healed for " + hpToHeal.heal + "\n"
                    if (event.enemies[targetToHeal].hp > event.enemies[targetToHeal].maxhp){
                        event.enemies[targetToHeal].hp = event.enemies[targetToHeal].maxhp
                    }
                }
            }
        }
    }
    // buffs
    if (rpgAbility && rpgAbility.buff && (stillAlive || onDeathAbilityCast) && validAbility){
        // this is a status changing ability, add / remove the status
        var statusToAdd = rpgAbility.buff;
        var targetToAddStatus = abilityObject.target
        if (rpgAbility.buff.selfbuff){
            targetToAddStatus = abilityObject.user
            if (targetToAddStatus >= 1000){
                targetToAddStatus = "rpg-"+targetToAddStatus;
            }
        }
        if (rpgAbility.buff.areawide){
            if (abilityCaster > 1000 || rpgAbility.buff.buffPartyMembers == true){
                var caster = event.membersInParty["rpg-"+abilityCaster] ? event.membersInParty["rpg-"+abilityCaster].name : undefined;
                for (var targetToAddStatus in event.membersInParty){
                    if (!checkIfDeadByObject(event.membersInParty[targetToAddStatus])){
                        var alreadyHaveStatus = false;
                        var buffsToStop = []
                        for (var status in event.membersInParty[targetToAddStatus].buffs){
                            if (event.membersInParty[targetToAddStatus].buffs[status]
                            && event.membersInParty[targetToAddStatus].buffs[status].name == statusToAdd.name
                            && event.membersInParty[targetToAddStatus].buffs[status].caster == abilityObject.user 
                            && !event.membersInParty[targetToAddStatus].buffs[status].ignoreUnique){
                                alreadyHaveStatus = true;
                            }
                        }
                        for (var status in event.membersInParty[targetToAddStatus].statuses){
                            if (event.membersInParty[targetToAddStatus].statuses[status].buffToStop){
                                buffsToStop.push(event.membersInParty[targetToAddStatus].statuses[status].buffToStop)
                            }
                        }
                        if (!alreadyHaveStatus){
                            delete statusToAdd.areawide 
                            if (statusToAdd.turnsToExpire){
                                statusToAdd.caster = abilityCaster // id of the caster
                                statusToAdd.expireOnTurn = currentTurn + statusToAdd.turnsToExpire;
                            }
                            // check the 
                            if (buffsToStop.indexOf(statusToAdd.abilityId) == -1){
                                event.membersInParty[targetToAddStatus].buffs.push(statusToAdd);
                            }
                        }
                    }
                }
                abilityToString = abilityToString + "The group was affected with " + statusToAdd.name + "\n"
                if (statusToAdd.additionalDescription){
                    abilityToString = abilityToString + statusToAdd.additionalDescription + "\n"
                } 
            }else{
                // if caster is party of membersInParty then target = all the enemies
                for (var targetToAddStatus in event.enemies){
                    if (!checkIfDeadByObject(event.enemies[targetToAddStatus])){
                        var alreadyHaveStatus = false;
                        var buffsToStop = []
                        for (var status in event.enemies[targetToAddStatus].buffs){
                            if (event.enemies[targetToAddStatus].buffs[status]
                            && event.enemies[targetToAddStatus].buffs[status].caster == abilityObject.user
                            && event.enemies[targetToAddStatus].buffs[status].name == statusToAdd.name
                            && !event.enemies[targetToAddStatus].buffs[status].ignoreUnique ){
                                alreadyHaveStatus = true;
                            }
                        }
                        for (var status in event.enemies[targetToAddStatus].statuses){
                            if (event.enemies[targetToAddStatus].statuses[status].buffToStop){
                                buffsToStop.push(event.enemies[targetToAddStatus].statuses[status].buffToStop)
                            }
                        }
                        if (!alreadyHaveStatus){
                            delete statusToAdd.areawide 
                            if (statusToAdd.turnsToExpire){
                                statusToAdd.caster = abilityCaster // id of the caster
                                statusToAdd.expireOnTurn = currentTurn + statusToAdd.turnsToExpire;
                            }
                            // check the 
                            if (buffsToStop.indexOf(statusToAdd.abilityId) == -1){
                                event.enemies[targetToAddStatus].buffs.push(statusToAdd);
                            }
                            
                        }
                    }
                }
                abilityToString = abilityToString + "The enemies were affected with " + statusToAdd.name + "\n" 
            }
        }else{
            if (event.membersInParty[targetToAddStatus]){
                var targetToAddStatusName = event.membersInParty[targetToAddStatus].name;
                if (!checkIfDeadByObject(event.membersInParty[targetToAddStatus])){
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
                        if (buffCloned.turnsToExpire){
                            buffCloned.caster = abilityCaster // id of the caster
                            buffCloned.expireOnTurn = currentTurn + buffCloned.turnsToExpire;
                        }
                        if (buffCloned.maxcharges){
                            buffCloned.caster = abilityCaster
                        }
                        event.membersInParty[targetToAddStatus].buffs.push(buffCloned);
                        abilityToString = abilityToString + targetToAddStatusName + " was affected with " + statusToAdd.name + "\n"  
                        if (statusToAdd.additionalDescription){
                            abilityToString = abilityToString + targetToAddStatusName + statusToAdd.additionalDescription + "\n"
                        }     
                    }else{
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
            }else if (event.enemies[targetToAddStatus]){
                var targetToAddStatusName = event.enemies[targetToAddStatus].name;
                if (!checkIfDeadByObject(event.enemies[targetToAddStatus])){
                    if (rpgAbility.buff.name != "Warm Up"){
                        if (!statusToAdd.ignoreUnique){
                            for (var index = event.enemies[targetToAddStatus].buffs.length - 1; index >= 0; index-- ){
                                if (event.enemies[targetToAddStatus].buffs[index].name == rpgAbility.buff.name ){
                                    // pop this object
                                    event.enemies[targetToAddStatus].buffs.splice(index, 1);
                                }
                            }
                        }
                        let buffCloned = Object.assign({}, statusToAdd);
                        if (buffCloned.turnsToExpire){
                            buffCloned.caster = abilityCaster // id of the caster
                            if (buffCloned.minusTurnsToExpirePerBuffCount){
                                var buffCount = checkBuffCountByAbilityId(buffCloned.minusTurnsToExpirePerBuffCount, event.enemies[targetToAddStatus])
                                var turnsRemaining = (buffCloned.turnsToExpire - buffCount) >= 1 ? (buffCloned.turnsToExpire - buffCount) : 1
                                buffCloned.expireOnTurn = currentTurn + turnsRemaining
                            }else{
                                buffCloned.expireOnTurn = currentTurn + buffCloned.turnsToExpire;
                            }
                        }
                        if (buffCloned.maxcharges){
                            buffCloned.caster = abilityCaster
                        }
                        event.enemies[targetToAddStatus].buffs.push(buffCloned);
                        abilityToString = abilityToString + targetToAddStatusName + " was affected with " + statusToAdd.name + "\n"
                        if (statusToAdd.additionalDescription){
                            abilityToString = abilityToString + targetToAddStatusName + statusToAdd.additionalDescription + "\n"
                        }
                    }else{
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
                            abilityToString = abilityToString + targetToAddStatusName + " was affected with " + statusToAdd.name + "\n" 
                        }
                    }
                }
            }
        }
        
    }

    if (rpgAbility && rpgAbility.status && (stillAlive || onDeathAbilityCast) && validAbility){
        // this is a status changing ability, add / remove the status
        var statusToAdd = rpgAbility.status;
        var targetToAddStatus = abilityObject.target

        if (rpgAbility.status.areawide){
            // deal damage area wide against opposite party
            if (abilityCaster > 1000){
                // if caster is party of membersInParty then target = all the enemies
                if (statusToAdd.selfDebuff){
                    var caster = event.membersInParty["rpg-"+abilityCaster] ? event.membersInParty["rpg-"+abilityCaster].name : undefined;
                    for (var targetToAddStatus in event.membersInParty){
                        if (!checkIfDeadByObject(event.membersInParty[targetToAddStatus])){
                            var alreadyHaveStatus = false;
                            for (var status in event.membersInParty[targetToAddStatus].statuses){
                                if (event.membersInParty[targetToAddStatus].statuses[status]
                                && event.membersInParty[targetToAddStatus].statuses[status].caster == abilityObject.user
                                && event.membersInParty[targetToAddStatus].statuses[status].name == statusToAdd.name
                                && !event.membersInParty[targetToAddStatus].statuses[status].ignoreUnique ){
                                    alreadyHaveStatus = true;
                                }
                            }
                            if (!alreadyHaveStatus){
                                delete statusToAdd.areawide 
                                if (statusToAdd.turnsToExpire){
                                    statusToAdd.caster = abilityCaster // id of the caster
                                    statusToAdd.expireOnTurn = currentTurn + statusToAdd.turnsToExpire;
                                }
                                event.membersInParty[targetToAddStatus].statuses.push(statusToAdd);
                            }
                        }
                    }
                    abilityToString = abilityToString + "The group was affected with " + statusToAdd.name + "\n"    
                }else{
                    for (var targetToAddStatus in event.enemies){
                        if (!checkIfDeadByObject(event.enemies[targetToAddStatus])){
                            var alreadyHaveStatus = false;
                            for (var status in event.enemies[targetToAddStatus].statuses){
                                if (event.enemies[targetToAddStatus].statuses[status]
                                && event.enemies[targetToAddStatus].statuses[status].caster == abilityObject.user
                                && event.enemies[targetToAddStatus].statuses[status].name == statusToAdd.name
                                && !event.enemies[targetToAddStatus].statuses[status].ignoreUnique ){
                                    alreadyHaveStatus = true;
                                }
                            }
                            if (!alreadyHaveStatus){
                                if (statusToAdd.turnsToExpire){
                                    statusToAdd.caster = abilityCaster // id of the caster
                                    statusToAdd.expireOnTurn = currentTurn + statusToAdd.turnsToExpire;
                                }
                                event.enemies[targetToAddStatus].statuses.push(statusToAdd);
                            }
                        }
                    }
                    abilityToString = abilityToString + "The group was affected with " + statusToAdd.name + "\n"     
                }
            }else{
                if (statusToAdd.selfDebuff){
                    for (var targetToAddStatus in event.enemies){
                        if (!checkIfDeadByObject(event.enemies[targetToAddStatus])){
                            var alreadyHaveStatus = false;
                            for (var status in event.enemies[targetToAddStatus].statuses){
                                if (event.enemies[targetToAddStatus].statuses[status]
                                && event.enemies[targetToAddStatus].statuses[status].caster == abilityObject.user
                                && event.enemies[targetToAddStatus].statuses[status].name == statusToAdd.name
                                && !event.enemies[targetToAddStatus].statuses[status].ignoreUnique ){
                                    alreadyHaveStatus = true;
                                }
                            }
                            if (!alreadyHaveStatus){
                                if (statusToAdd.turnsToExpire){
                                    statusToAdd.caster = abilityCaster // id of the caster
                                    statusToAdd.expireOnTurn = currentTurn + statusToAdd.turnsToExpire;
                                }
                                event.enemies[targetToAddStatus].statuses.push(statusToAdd);
                            }
                        }
                    }
                    abilityToString = abilityToString + "The enemies were affected with " + statusToAdd.name + "\n"     
                }else{
                    var caster = event.membersInParty["rpg-"+abilityCaster] ? event.membersInParty["rpg-"+abilityCaster].name : undefined;
                    for (var targetToAddStatus in event.membersInParty){
                        if (!checkIfDeadByObject(event.membersInParty[targetToAddStatus])){
                            var alreadyHaveStatus = false;
                            for (var status in event.membersInParty[targetToAddStatus].statuses){
                                if (event.membersInParty[targetToAddStatus].statuses[status]
                                && event.membersInParty[targetToAddStatus].statuses[status].caster == abilityObject.user
                                && event.membersInParty[targetToAddStatus].statuses[status].name == statusToAdd.name
                                && !event.membersInParty[targetToAddStatus].statuses[status].ignoreUnique ){
                                    alreadyHaveStatus = true;
                                }

                                // add the status here
                                if (event.membersInParty[targetToAddStatus].statuses[status].name == statusToAdd.name
                                && !event.membersInParty[targetToAddStatus].statuses[status].ignoreUnique){
                                    alreadyHaveStatus = true;
                                }
                            }
                            if (!alreadyHaveStatus){
                                delete statusToAdd.areawide 
                                if (statusToAdd.turnsToExpire){
                                    statusToAdd.caster = abilityCaster // id of the caster
                                    statusToAdd.expireOnTurn = currentTurn + statusToAdd.turnsToExpire;
                                }
                                event.membersInParty[targetToAddStatus].statuses.push(statusToAdd);
                            }
                        }
                    }
                    abilityToString = abilityToString + "The group was affected with " + statusToAdd.name + "\n"    
                }
            }
        }else{
            if (event.membersInParty[targetToAddStatus]){
                var targetToAddStatusName = event.membersInParty[targetToAddStatus].name;
                if (!checkIfDeadByObject(event.membersInParty[targetToAddStatus])){
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
                        if (event.membersInParty[targetToAddStatus].statuses[status].name == statusToAdd.name
                        && !event.membersInParty[targetToAddStatus].statuses[status].ignoreUnique){
                            alreadyHaveStatus = true;
                        }
                    }
                    if (!alreadyHaveStatus){
                        delete statusToAdd.areawide 
                        if (statusToAdd.turnsToExpire){
                            statusToAdd.caster = abilityCaster // id of the caster
                            statusToAdd.expireOnTurn = currentTurn + statusToAdd.turnsToExpire;
                        }
                        event.membersInParty[targetToAddStatus].statuses.push(statusToAdd);
                        abilityToString = abilityToString + targetToAddStatusName + " was affected with " + statusToAdd.name + "\n"
                    }
                }
            }
            else if (event.enemies[targetToAddStatus]){
                var targetToAddStatusName = event.enemies[targetToAddStatus].name;
                if (!checkIfDeadByObject(event.enemies[targetToAddStatus])){
                    // ONLY ADD STATUS IF THEY DO NOT ALREADY HAVE IT 
                    var alreadyHaveStatus = false;
                    for (var status in event.enemies[targetToAddStatus].statuses){
                        if (event.enemies[targetToAddStatus].statuses[status].dot
                        && event.enemies[targetToAddStatus].statuses[status].dot.caster == abilityObject.user
                        && event.enemies[targetToAddStatus].statuses[status].dot.name == statusToAdd.name ){
                            alreadyHaveStatus = true;
                        }
    
                        if (event.enemies[targetToAddStatus].statuses[status].name == statusToAdd.name
                        && !event.enemies[targetToAddStatus].statuses[status].ignoreUnique){
                            alreadyHaveStatus = true;
                        }
                    }
                    if (!alreadyHaveStatus){
                        if (statusToAdd.turnsToExpire){
                            statusToAdd.caster = abilityCaster // id of the caster
                            statusToAdd.expireOnTurn = currentTurn + statusToAdd.turnsToExpire;
                        }
                        event.enemies[targetToAddStatus].statuses.push(statusToAdd);
                        abilityToString = abilityToString + targetToAddStatusName + " was affected with " + statusToAdd.name + "\n"  
                        if (statusToAdd.additionalDescription){
                            abilityToString = abilityToString + targetToAddStatusName + statusToAdd.additionalDescription + "\n"
                        }       
                    }
                }
            }
        }
    }

    if (rpgAbility && rpgAbility.dot && (stillAlive || onDeathAbilityCast) && validAbility){
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
                    if (!checkIfDeadByObject(event.enemies[targetToAddDot])){
                        var alreadyHaveStatus = false;
                        for (var status in event.enemies[targetToAddDot].statuses){
                            if (event.enemies[targetToAddDot].statuses[status].dot
                            && event.enemies[targetToAddDot].statuses[status].dot.caster == abilityObject.user
                            && event.enemies[targetToAddDot].statuses[status].dot.name == dotToAdd.dot.name
                            && !event.enemies[targetToAddDot].statuses[status].dot.ignoreUnique ){
                                alreadyHaveStatus = true;
                            }
                        }
                        if (!alreadyHaveStatus){
                            event.enemies[targetToAddDot].statuses.push(dotToAdd);
                        }
                    }
                }
                abilityToString = abilityToString + "The group was affected with " + dotToAdd.dot.name + "\n" 
            }else{
                var caster = event.membersInParty["rpg-"+abilityCaster] ? event.membersInParty["rpg-"+abilityCaster].name : undefined;
                for (var targetToAddDot in event.membersInParty){
                    if (!checkIfDeadByObject(event.membersInParty[targetToAddDot])){
                        var alreadyHaveStatus = false;
                        for (var status in event.membersInParty[targetToAddDot].statuses){
                            if (event.membersInParty[targetToAddDot].statuses[status].dot
                            && event.membersInParty[targetToAddDot].statuses[status].dot.caster == abilityObject.user
                            && event.membersInParty[targetToAddDot].statuses[status].dot.name == dotToAdd.dot.name
                            && !event.membersInParty[targetToAddDot].statuses[status].dot.ignoreUnique ){
                                alreadyHaveStatus = true;
                            }
                        }
                        if (!alreadyHaveStatus){
                            delete dotToAdd.areawide 
                            event.membersInParty[targetToAddDot].statuses.push(dotToAdd);
                        }
                    }
                }
                abilityToString = abilityToString + "The group was affected with " + dotToAdd.dot.name + "\n"                 
            }
        }else{
            var caster = event.enemies[abilityCaster] ? event.enemies[abilityCaster].name : undefined;
            if (event.membersInParty[targetToAddDot]){
                var targetToAddDotName = event.membersInParty[targetToAddDot].name;
                if (!checkIfDeadByObject(event.membersInParty[targetToAddDot])){
                    // target is not dead
                    // ONLY ADD THE DOT IF THEY DONT ALREADY HAVE IT
                    for (var status in event.membersInParty[targetToAddDot].statuses){
                        if (event.membersInParty[targetToAddDot].statuses[status].dot
                        && event.membersInParty[targetToAddDot].statuses[status].dot.caster == abilityObject.user
                        && event.membersInParty[targetToAddDot].statuses[status].dot.name == dotToAdd.dot.name
                        && !event.membersInParty[targetToAddDot].statuses[status].dot.ignoreUnique ){
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
                if (!checkIfDeadByObject(event.enemies[targetToAddDot])){
    
                    var alreadyHaveStatus = false;
                    for (var status in event.enemies[targetToAddDot].statuses){
                        if (event.enemies[targetToAddDot].statuses[status].dot
                        && event.enemies[targetToAddDot].statuses[status].dot.caster == abilityObject.user
                        && event.enemies[targetToAddDot].statuses[status].dot.name == dotToAdd.dot.name
                        && !event.enemies[targetToAddDot].statuses[status].dot.ignoreUnique ){
                            alreadyHaveStatus = true;
                        }
                    }
                    if (!alreadyHaveStatus){
                        event.enemies[targetToAddDot].statuses.push(dotToAdd);
                        abilityToString = abilityToString + targetToAddDotName + " was affected with " + dotToAdd.dot.name + "\n" 
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
        if (rpgAbility.selfTarget){
            var targetToAddHot =  "rpg-" + abilityCaster
        }
        hotToAdd.hot.expireOnTurn = currentTurn + hotToAdd.hot.turnsToExpire;
        hotToAdd.hot.caster = abilityCaster // id of caster
        if (rpgAbility.hot.areawide){
            if (abilityCaster > 1000){
                var caster = event.membersInParty["rpg-"+abilityCaster] ? event.membersInParty["rpg-"+abilityCaster].name : undefined;
                for (var targetToAddHot in event.membersInParty){
                    if (!checkIfDeadByObject(event.membersInParty[targetToAddHot])){
                        var alreadyHaveStatus = false;
                        for (var buff in event.membersInParty[targetToAddHot].buffs){
                            if (event.membersInParty[targetToAddHot].buffs[buff].hot
                            && event.membersInParty[targetToAddHot].buffs[buff].hot.caster == abilityObject.user
                            && !event.membersInParty[targetToAddHot].buffs[buff].hot.ignoreUnique ){
                                alreadyHaveStatus = true;
                            }
                        }
                        if (!alreadyHaveStatus){
                            delete hotToAdd.areawide 
                            event.membersInParty[targetToAddHot].buffs.push(hotToAdd);
                        }
                    }
                }
                abilityToString = abilityToString + "The group was affected with " + hotToAdd.hot.name + "\n" 
            }else{
                for (var targetToAddHot in event.enemies){
                    if (!checkIfDeadByObject(event.enemies[targetToAddHot])){
                        var alreadyHaveHot = false;
                        for (var buff in event.enemies[targetToAddHot].buffs){
                            if (event.enemies[targetToAddHot].buffs[buff].hot
                            && event.enemies[targetToAddHot].buffs[buff].hot.caster == abilityObject.user
                            && event.enemies[targetToAddHot].buffs[buff].hot.name == hotToAdd.hot.name
                            && !event.enemies[targetToAddHot].buffs[buff].hot.ignoreUnique ){
                                alreadyHaveHot = true;
                            }
                        }
                        if (!alreadyHaveStatus){
                            event.enemies[targetToAddHot].buffs.push(hotToAdd);
                        }
                    }
                }
                abilityToString = abilityToString + "The group was affected with " + hotToAdd.hot.name + "\n"                 
            }
        }else{
            // enemy added a hot to party member
            if (event.membersInParty[targetToAddHot]){
                var targetToAddHotName = event.membersInParty[targetToAddHot].name;
                if (!checkIfDeadByObject(event.membersInParty[targetToAddHot])){
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
                        // gain stack of radioactive
                        abilityToString = abilityToString + checkRadioactive(event, event.membersInParty[targetToAddHot])
                        abilityToString = abilityToString + targetToAddHotName + " was affected with " + hotToAdd.hot.name + "\n" 
                    }
                }
            }

            else if (event.enemies[targetToAddHot]){
                var targetToAddHotName = event.enemies[targetToAddHot].name;
                if (!checkIfDeadByObject(event.enemies[targetToAddHot])){

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
                        abilityToString = abilityToString + targetToAddHotName + " was affected with " + hotToAdd.hot.name + "\n" 
                    }
                }
            }
        }
    }

    if (rpgAbility && rpgAbility.special && stillAlive && validAbility){
        // handle the ability in a special manner
        if (rpgAbility.special == "absorb energy crystals"){
            // check for any enemy of name Red Energy Crystal etc..
            // if enemy matches name and enemy is not dead, absorb the energy crystal
            // (gain buff color) for visual, kill the crystal absorbed
            for (var enemy in event.enemies){
                var nameOfCaster = event.enemies[abilityCaster].name;
                if (event.enemies[enemy].name == "Black Energy Crystal"
                && !checkIfDeadByObject(event.enemies[enemy])){
                    // get the buff to display black energy crystal
                    var energyCrystalBuff = rpgAbilities["blackEnergyCrystal"] ? JSON.parse(JSON.stringify(rpgAbilities["blackEnergyCrystal"])) : undefined;
                    energyCrystalBuff.buff.expireOnTurn = currentTurn + energyCrystalBuff.buff.turnsToExpire
                    event.enemies[abilityCaster].buffs.push(energyCrystalBuff.buff);
                    abilityToString = abilityToString + nameOfCaster + " absorbed Black Energy Crystal\n"
                    hasDied(event, event.enemies[enemy])
                }else if (event.enemies[enemy].name == "Blue Energy Crystal"
                && !checkIfDeadByObject(event.enemies[enemy])){
                    var energyCrystalBuff = rpgAbilities["blueEnergyCrystal"] ? JSON.parse(JSON.stringify(rpgAbilities["blueEnergyCrystal"])) : undefined;
                    energyCrystalBuff.buff.expireOnTurn = currentTurn + energyCrystalBuff.buff.turnsToExpire
                    event.enemies[abilityCaster].buffs.push(energyCrystalBuff.buff);
                    // TODO: make the core immune to areawide dmg
                    abilityToString = abilityToString + nameOfCaster + " absorbed Blue Energy Crystal\n"
                    hasDied(event, event.enemies[enemy])
                }else if (event.enemies[enemy].name == "Purple Energy Crystal"
                && !checkIfDeadByObject(event.enemies[enemy])){
                    var energyCrystalBuff = rpgAbilities["purpleEnergyCrystal"] ? JSON.parse(JSON.stringify(rpgAbilities["purpleEnergyCrystal"])) : undefined;
                    energyCrystalBuff.buff.expireOnTurn = currentTurn + energyCrystalBuff.buff.turnsToExpire
                    event.enemies[abilityCaster].buffs.push(energyCrystalBuff.buff);
                    abilityToString = abilityToString + nameOfCaster + " absorbed Purple Energy Crystal\n"
                    hasDied(event, event.enemies[enemy])
                }else if (event.enemies[enemy].name == "Yellow Energy Crystal"
                && !checkIfDeadByObject(event.enemies[enemy])){
                    var energyCrystalBuff = rpgAbilities["yellowEnergyCrystal"] ? JSON.parse(JSON.stringify(rpgAbilities["yellowEnergyCrystal"])) : undefined;
                    energyCrystalBuff.buff.expireOnTurn = currentTurn + energyCrystalBuff.buff.turnsToExpire
                    event.enemies[abilityCaster].buffs.push(energyCrystalBuff.buff);
                    
                    processYellowEnergyCrystal(event, true);
                    abilityToString = abilityToString + nameOfCaster + " absorbed Yellow Energy Crystal\n"
                    hasDied(event, event.enemies[enemy])
                }else if (event.enemies[enemy].name == "Green Energy Crystal"
                && !checkIfDeadByObject(event.enemies[enemy])){
                    var energyCrystalBuff = rpgAbilities["greenEnergyCrystal"] ? JSON.parse(JSON.stringify(rpgAbilities["greenEnergyCrystal"])) : undefined;
                    energyCrystalBuff.buff.expireOnTurn = currentTurn + energyCrystalBuff.buff.turnsToExpire
                    event.enemies[abilityCaster].buffs.push(energyCrystalBuff.buff);
                    abilityToString = abilityToString + nameOfCaster + " absorbed Green Energy Crystal\n"
                    hasDied(event, event.enemies[enemy])
                }else if (event.enemies[enemy].name == "Red Energy Crystal"
                && !checkIfDeadByObject(event.enemies[enemy])){
                    var energyCrystalBuff = rpgAbilities["redEnergyCrystal"] ? JSON.parse(JSON.stringify(rpgAbilities["redEnergyCrystal"])) : undefined;
                    energyCrystalBuff.buff.expireOnTurn = currentTurn + energyCrystalBuff.buff.turnsToExpire
                    event.enemies[abilityCaster].buffs.push(energyCrystalBuff.buff);
                    abilityToString = abilityToString + nameOfCaster + " absorbed Red Energy Crystal\n"
                    hasDied(event, event.enemies[enemy])
                }
            }

            // check if yellow and black are together
            for (var enemy in event.enemies){
                var haveBlackCrystal = false;
                var haveYellowCrystal = false;
                for (var buff in event.enemies[enemy].buffs){
                    if (event.enemies[enemy].buffs[buff].name == "yellowEnergyCrystal"){
                        haveYellowCrystal = true
                    }
                    if (event.enemies[enemy].buffs[buff].name == "blackEnergyCrystal"){
                        haveBlackCrystal = true;
                    }
                }
                if (haveBlackCrystal && haveYellowCrystal){
                    var chaos = rpgAbilities["chaos"] ? JSON.parse(JSON.stringify(rpgAbilities["chaos"])) : undefined;
                    chaos.buff.expireOnTurn = currentTurn + chaos.buff.turnsToExpire
                    event.enemies[abilityCaster].buffs.push(chaos.buff);
                }

            }
            
        }
        if (rpgAbility.special == "absorb fiends" || rpgAbility.special == "absorb imps"){
            // get the hp of all the fiends and drain it and kill the fiends
            var totalHpToDrain = 0
            for (var enemy in event.enemies){
                var nameOfCaster = event.enemies[abilityCaster].name;
                if ( (event.enemies[enemy].name == "Fiend" || event.enemies[enemy].name == "Imp" )
                && !checkIfDeadByObject(event.enemies[enemy])){
                    totalHpToDrain = totalHpToDrain + event.enemies[enemy].hp
                    hasDied(event, event.enemies[enemy])
                }
            }
            // heal the caster for total hp to drain
            totalHpToDrain = Math.floor( totalHpToDrain / 2 )
            healTarget( event.enemies[abilityCaster], {heal: totalHpToDrain})
            if (event.enemies[abilityCaster].hp > event.enemies[abilityCaster].maxhp){
                event.enemies[abilityCaster].hp = event.enemies[abilityCaster].maxhp
            }
            if (rpgAbility.special == "absorb fiends"){
                abilityToString = abilityToString + nameOfCaster + " absorbed Fiends and drained " + totalHpToDrain + " Health \n"
            }else if (rpgAbility.special == "absorb imps"){
                abilityToString = abilityToString + nameOfCaster + " absorbed Imps and drained " + totalHpToDrain + " Health \n"
            }
        }
        if (rpgAbility.special == "selfdamage"){
            // deal self damage to the user
            if (event.membersInParty["rpg-"+abilityCaster] 
            && !checkIfDeadByObject(event.membersInParty["rpg-"+abilityCaster]) ){
                var targetToDealDmgName = event.membersInParty["rpg-"+abilityCaster].name
                // set damage temporarily
                var tempDamage = rpgAbility.dmg;
                rpgAbility.dmg = rpgAbility.selfdamage;
                var abType = rpgAbility.type
                var damageToDeal = calculateDamageDealt(event, abilityCaster, "rpg-"+abilityCaster, rpgAbility)
                damageToDeal = Math.floor(damageToDeal.dmg * 0.2)
                var critStrike = damageToDeal.critical ? ">" : ""
                damageToDeal = dealDamageTo( event.membersInParty["rpg-"+abilityCaster], damageToDeal, event, abType)
                abilityToString = abilityToString + critStrike + targetToDealDmgName + " suffered " + damageToDeal + " damage - " + rpgAbility.name + "\n"
                abilityToString = abilityToString + triggerBufFromDamage(event, event.membersInParty["rpg-"+abilityCaster] )
                rpgAbility.dmg = tempDamage
                if ( checkHasDied(event.membersInParty["rpg-"+abilityCaster])){
                    abilityToString = abilityToString + hasDied(event, event.membersInParty["rpg-"+abilityCaster])
                }
            }
            // deal self damage to the enemy
            if (event.enemies[abilityCaster] 
            && !checkIfDeadByObject( event.enemies[abilityCaster] ) ){
                var targetToDealDmgName = event.enemies[abilityCaster].name
                // set damage temporarily
                var tempDamage = rpgAbility.dmg;
                rpgAbility.dmg = rpgAbility.selfdamage;
                var damageToDeal = calculateDamageDealt(event, abilityCaster, abilityCaster, rpgAbility)
                damageToDeal = Math.floor(damageToDeal.dmg * 0.2)
                var critStrike = damageToDeal.critical ? ">" : ""
                var abType = rpgAbility.type
                damageToDeal = dealDamageTo( event.enemies[abilityCaster], damageToDeal, event, abType)
                abilityToString = abilityToString + critStrike + targetToDealDmgName + " suffered " + damageToDeal + " damage - " + rpgAbility.name + "\n"
                abilityToString = abilityToString + triggerBufFromDamage(event, event.enemies[abilityCaster] )
                rpgAbility.dmg = tempDamage
                if ( checkHasDied(event.enemies[abilityCaster])){
                    abilityToString = abilityToString + hasDied(event, event.enemies[abilityCaster]);
                }              
            }
        }
        if (rpgAbility.special && rpgAbility.special.selfHeal){
            // caster heals themselves
            if (rpgAbility.special.heal){
                var targetToHeal = abilityObject.user;
                if (targetToHeal > 1000){
                    targetToHeal = "rpg-" + targetToHeal
                }
                if (event.membersInParty[targetToHeal]){
                    var hpToHeal = calculateHealingDone(event, abilityCaster, abilityObject.target, rpgAbility);
                    var critStrike = hpToHeal.critical ? ">" : ""
                    var targetToHealName = event.membersInParty[targetToHeal].name;
                    if (!checkIfDeadByObject(event.membersInParty[targetToHeal])){
                        healTarget( event.membersInParty[targetToHeal], hpToHeal)
                        // gain stack of radioactive
                        abilityToString = abilityToString + checkRadioactive(event, event.membersInParty[targetToHeal])
                        abilityToString = abilityToString + critStrike + targetToHealName + " was healed for " + hpToHeal.heal + "\n"
                        if (event.membersInParty[targetToHeal].hp > event.membersInParty[targetToHeal].maxhp){
                            event.membersInParty[targetToHeal].hp = event.membersInParty[targetToHeal].maxhp
                        }
                    }
                }
            }
        }
        if (rpgAbility.special && rpgAbility.special.randomTargets){
            if (rpgAbility.special.dmg){
                // get a random target to deal damage
                for (var i = 0; i < rpgAbility.special.randomTargets; i ++){
                    var targetToDealDmg = getRandomLivingEnemy(event)
                    if (abilityCaster <= 1000){
                        targetToDealDmg = getRandomLivingPlayer(event)
                    }
                    var damageToDeal = rpgAbility.special.dmg;
                    damageToDeal = calculateDamageDealt( event, abilityCaster, targetToDealDmg, rpgAbility.special )
                    var critStrike = damageToDeal.critical ? ">" : ""
                    // dealing damage to enemies
                    if (event.enemies[targetToDealDmg]){
                        var targetToDealDmgName = event.enemies[targetToDealDmg].name;
                        var abType = rpgAbility.special.type
                        damageToDeal = dealDamageTo(event.enemies[targetToDealDmg], damageToDeal.dmg, event, abType)
                        abilityToString = abilityToString + critStrike + targetToDealDmgName + " took " + damageToDeal + " damage - " + rpgAbility.special.name + "\n";
                        abilityToString = abilityToString + processReflectEffects(event, targetToDealDmg, damageToDeal, abilityCaster, "dmg")
                        abilityToString = abilityToString + triggerBufFromDamage(event, event.enemies[targetToDealDmg] )
                        if ( checkHasDied(event.enemies[targetToDealDmg])){
                            abilityToString = abilityToString + hasDied(event, event.enemies[targetToDealDmg], abilityCaster);
                        }
                    }
                    // dealing damage to members of party (friendly fire or enemy attacking)
                    else if (event.membersInParty[targetToDealDmg]){
                        var targetToDealDmgName = event.membersInParty[targetToDealDmg].name;
                        var abType = rpgAbility.special.type
                        damageToDeal = dealDamageTo( event.membersInParty[targetToDealDmg], damageToDeal.dmg, event, abType )
                        abilityToString = abilityToString + targetToDealDmgName + " took " + damageToDeal + " damage - " + rpgAbility.special.name + "\n";
                        abilityToString = abilityToString + processReflectEffects(event, targetToDealDmg, damageToDeal, abilityCaster, "dmg")
                        abilityToString = abilityToString + triggerBufFromDamage(event, event.membersInParty[targetToDealDmg] )
                        if (checkHasDied(event.membersInParty[targetToDealDmg])){
                            abilityToString = abilityToString + hasDied(event, event.membersInParty[targetToDealDmg], abilityCaster);
                        }
                    }
                }
            }
        }
        if (rpgAbility.special && rpgAbility.special.additionalTargets){
            if (rpgAbility.special.heal){
                if (rpgAbility.special.prioritizeLowestHp){
                    var targetsToHeal = getPrioritizedTargets(event, rpgAbility.special.additionalTargets, abilityCaster, abilityObject.target, rpgAbility.special.ignoreInitialTarget )
                    for (var i = 0; i < targetsToHeal.length; i ++){
                        // targetsToHeal is an array, mdPercentages should use i as well, heal the targets one by one
                        rpgAbility.special.mdPercentage = rpgAbility.special.mdPercentages[i]
                        var hpToHeal = calculateHealingDone(event, abilityCaster, targetsToHeal[i].targetId, rpgAbility.special);
                        var critStrike = hpToHeal.critical ? ">" : ""
                        var targetToHealName;
                        if (abilityCaster > 1000){
                            targetToHealName = event.membersInParty[targetsToHeal[i].targetId].name;
                        }else{
                            targetToHealName = event.enemies[targetsToHeal[i].targetId].name;
                        }
                        if (!checkIfDeadByObject(event.membersInParty[targetsToHeal[i].targetId])){
                            healTarget( event.membersInParty[targetsToHeal[i].targetId], hpToHeal)
                            // gain stack of radioactive
                            abilityToString = abilityToString + checkRadioactive(event, event.membersInParty[targetsToHeal[i].targetId])
                            abilityToString = abilityToString + critStrike + targetToHealName + " was healed for " + hpToHeal.heal + " - " + rpgAbility.special.name + "\n"
                            if (event.membersInParty[targetsToHeal[i].targetId].hp > event.membersInParty[targetsToHeal[i].targetId].maxhp){
                                event.membersInParty[targetsToHeal[i].targetId].hp = event.membersInParty[targetsToHeal[i].targetId].maxhp
                            }
                        }
                    }
                }
            }
        }
        if (ability == "bandaid" || ability == "cleanse"){
            // remove a status from the target except dead
            if (rpgAbility.areawide){
                if (abilityCaster > 1000){
                    // cleanse the group
                    for (var member in event.membersInParty){
                        abilityObject.target = "rpg-"+event.membersInParty[member].id
                        abilityToString = abilityToString + removeStatusByAbility(event, abilityObject, rpgAbility )
                    }
                }else{
                    // enemies get cleansed
                    for (var enemy in event.enemies){
                        abilityObject.target = event.enemies[enemy].id
                        abilityToString = abilityToString + removeStatusByAbility(event, abilityObject, rpgAbility )
                    }
                }
            }else{
                abilityToString = abilityToString + removeStatusByAbility(event, abilityObject, rpgAbility )
            }
        }else if (ability == "revive" || ability == "replenish"){
            // remove dead from statuses and give 40% of max hp
            var targetToRevive = abilityObject.target;
            if (event.membersInParty[targetToRevive]){
                var targetToReviveName = event.membersInParty[targetToRevive].name
                var deadIndex = event.membersInParty[targetToRevive].statuses.indexOf("dead")
                if (deadIndex > -1){
                    // target is dead
                    if (ability == "replenish"){
                        hasRevived( event.membersInParty[targetToRevive], deadIndex, 1 );
                    }else{
                        hasRevived( event.membersInParty[targetToRevive], deadIndex);
                    }
                    abilityToString = abilityToString + targetToReviveName + " was Revived\n"                
                }
            }else if (event.enemies[targetToRevive]){
                var targetToReviveName = event.enemies[targetToRevive].name
                var deadIndex = event.enemies[targetToRevive].statuses.indexOf("dead")
                if (deadIndex > -1){
                    // target is dead
                    if (ability == "replenish"){
                        hasRevived( event.enemies[targetToRevive], deadIndex, 1 );
                    }else{
                        hasRevived( event.enemies[targetToRevive], deadIndex );
                    }
                    abilityToString = abilityToString + targetToReviveName + " was Revived\n"                
                }
            }
        }else if(ability == "drain"){
            // deal damage to target and heal caster
            var damageToDeal = calculateDamageDealt(event, abilityCaster, abilityObject.target, rpgAbility.special)
            var critStrike = damageToDeal.critical ? ">" : ""
            var targetToDealDmg = abilityObject.target;
            // dealing damage to enemies
            if (event.enemies[targetToDealDmg]){
                var targetToDealDmgName = event.enemies[targetToDealDmg].name;
                var abType = rpgAbility.special.type
                damageToDeal = dealDamageTo( event.enemies[targetToDealDmg] , damageToDeal.dmg, event, abType)
                abilityToString = abilityToString + critStrike + targetToDealDmgName + " took " + damageToDeal + " damage - " + rpgAbility.name + "\n";
                abilityToString = abilityToString + processReflectEffects(event, targetToDealDmg, damageToDeal, abilityCaster, "dmg")
                abilityToString = abilityToString + triggerBufFromDamage(event, event.enemies[targetToDealDmg] )
                if ( checkHasDied(event.enemies[targetToDealDmg])){
                    abilityToString = abilityToString + hasDied(event, event.enemies[targetToDealDmg], abilityCaster);
                }
            }
            // dealing damage to members of party (friendly fire or enemy attacking)
            else if (event.membersInParty[targetToDealDmg]){
                var targetToDealDmgName = event.membersInParty[targetToDealDmg].name;
                var abType = rpgAbility.special.type
                damageToDeal = dealDamageTo(event.membersInParty[targetToDealDmg], damageToDeal.dmg, event, abType);
                abilityToString = abilityToString + critStrike + targetToDealDmgName + " took " + damageToDeal + " damage - " + rpgAbility.name + "\n";
                abilityToString = abilityToString + processReflectEffects(event, targetToDealDmg, damageToDeal, abilityCaster, "dmg")
                abilityToString = abilityToString + triggerBufFromDamage(event, event.membersInParty[targetToDealDmg] )
                if ( checkHasDied(event.membersInParty[targetToDealDmg])){
                    abilityToString = abilityToString + hasDied(event, event.membersInParty[targetToDealDmg]);
                }
            }

            var targetToHeal = abilityObject.user;
            var hpToHeal = calculateHealingDone(event, abilityCaster, abilityObject.target, rpgAbility.special);
            hpToHeal.heal = Math.floor(hpToHeal.heal * rpgAbility.special.healPercentage);
            var critStrike = hpToHeal.critical ? ">" : ""
            if (event.membersInParty["rpg-"+targetToHeal]){
                targetToHeal = "rpg-"+targetToHeal;
                var targetToHealName = event.membersInParty[targetToHeal].name;
                if (!checkIfDeadByObject(event.membersInParty[targetToHeal])){
                    // target is not dead
                    healTarget( event.membersInParty[targetToHeal], hpToHeal)
                    abilityToString = abilityToString + critStrike + targetToHealName + " was healed for " + hpToHeal.heal + " - " + rpgAbility.name + "\n"
                    if (event.membersInParty[targetToHeal].hp > event.membersInParty[targetToHeal].maxhp){
                        event.membersInParty[targetToHeal].hp = event.membersInParty[targetToHeal].maxhp
                    }
                }
            }else if (event.enemies[targetToHeal]){
                var targetToHealName = event.enemies[targetToHeal].name;
                if (!checkIfDeadByObject(event.enemies[targetToHeal])){
                    healTarget( event.enemies[targetToHeal], hpToHeal)
                    abilityToString = abilityToString + critStrike + targetToHealName + " was healed for " + hpToHeal.heal + " - " + rpgAbility.name + "\n"
                    if (event.enemies[targetToHeal].hp > event.enemies[targetToHeal].maxhp){
                        event.enemies[targetToHeal].hp = event.enemies[targetToHeal].maxhp
                    }
                }
            }
        }else if(ability == "rockthrow"){
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
                            // TODO: add damage from pet 
                            var critStrike = damageToDeal.critical ? ">" : ""
                            rpgAbility.dmg = tempDmg;
                            // deal the damage and then remove the buff
                            var targetToDealDmg = abilityObject.target;
                            if (event.enemies[targetToDealDmg]){
                                var targetToDealDmgName = event.enemies[targetToDealDmg].name;
                                // event.enemies[targetToDealDmg].hp = event.enemies[targetToDealDmg].hp - damageToDeal;
                                var abType = rpgAbility.type
                                damageToDeal = dealDamageTo( event.enemies[targetToDealDmg], damageToDeal.dmg, event, abType)
                                abilityToString = abilityToString + critStrike + targetToDealDmgName + " took " + damageToDeal + " damage - " + rpgAbility.name + "\n";
                                abilityToString = abilityToString + processReflectEffects(event, targetToDealDmg, damageToDeal, abilityCaster, "dmg")
                                abilityToString = abilityToString + triggerBufFromDamage(event, event.enemies[targetToDealDmg] )
                                if ( checkHasDied(event.enemies[targetToDealDmg])){
                                    abilityToString = abilityToString + hasDied(event, event.enemies[targetToDealDmg], abilityCaster);
                                }
                                abilityToString = abilityToString + processSafeGuard(event, targetToCheck, abilityObject, rpgAbility)
                                                         
    
                            }
                            // dealing damage to members of party (friendly fire or enemy attacking)
                            else if (event.membersInParty[targetToDealDmg]){
                                var targetToDealDmgName = event.membersInParty[targetToDealDmg].name;
                                //event.membersInParty[targetToDealDmg].hp = event.membersInParty[targetToDealDmg].hp - damageToDeal;
                                var abType = rpgAbility.type
                                damageToDeal = dealDamageTo(event.membersInParty[targetToDealDmg], damageToDeal.dmg, event, abType)
                                abilityToString = abilityToString + critStrike + targetToDealDmgName + " took " + damageToDeal + " damage - " + rpgAbility.name + "\n";
                                abilityToString = abilityToString + processReflectEffects(event, targetToDealDmg, damageToDeal, abilityCaster, "dmg")
                                abilityToString = abilityToString + triggerBufFromDamage(event, event.membersInParty[targetToDealDmg] )
                                if (checkHasDied(event.membersInParty[targetToDealDmg])){
                                    abilityToString = abilityToString + hasDied(event, event.membersInParty[targetToDealDmg]);
                                }
                            }
                            event.membersInParty[targetToCheck].buffs.splice(buff, 1);
                        }else{
                            // deal the damage and add a stack
                            if (event.membersInParty[targetToCheck].buffs[buff].stacksOfWarmUp > 1){
                                abilityToString = abilityToString + critStrike + targetToAddStatusName + " gained a stack of " + event.membersInParty[targetToCheck].buffs[buff].name + "\n"                                
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
                            var critStrike = damageToDeal.critical ? ">" : ""
                            rpgAbility.dmg = tempDmg;
                            rpgAbility.mdPercentage = tmpMdPercentage;
                            // deal the damage and then remove the buff
                            var targetToDealDmg = abilityObject.target;
                            if (event.membersInParty[targetToDealDmg]){
                                var targetToDealDmgName = event.membersInParty[targetToDealDmg].name;
                                var abType = rpgAbility.type
                                damageToDeal = dealDamageTo(event.membersInParty[targetToDealDmg], damageToDeal.dmg, event, abType)
                                abilityToString = abilityToString + critStrike + targetToDealDmgName + " took " + damageToDeal + " damage - " + rpgAbility.name + "\n";
                                abilityToString = abilityToString + processReflectEffects(event, targetToDealDmg, damageToDeal, abilityCaster, "dmg")
                                abilityToString = abilityToString + triggerBufFromDamage(event, event.membersInParty[targetToDealDmg] )
                                if (checkHasDied(event.membersInParty[targetToDealDmg])){
                                    abilityToString = abilityToString + hasDied(event, event.membersInParty[targetToDealDmg]);
                                }
                            }
                            // dealing damage to members of party (friendly fire or enemy attacking)
                            else if (event.enemies["rpg-"+targetToDealDmg]){
                                var targetToDealDmg = "rpg-"+targetToDealDmg;
                                var targetToDealDmgName = event.enemies[targetToDealDmg].name;
                                var abType = rpgAbility.type
                                damageToDeal = dealDamageTo( event.enemies[targetToDealDmg], damageToDeal.dmg, event, abType)
                                abilityToString = abilityToString + targetToDealDmgName + " took " + damageToDeal + " damage - " + rpgAbility.name + "\n";
                                abilityToString = abilityToString + processReflectEffects(event, targetToDealDmg, damageToDeal, abilityCaster, "dmg")
                                abilityToString = abilityToString + triggerBufFromDamage(event, event.enemies[targetToDealDmg] )
                                if (checkHasDied(event.enemies[targetToDealDmg])){
                                    abilityToString = abilityToString + hasDied(event, event.enemies[targetToDealDmg], abilityCaster);
                                }
                            }
                            event.enemies[targetToCheck].buffs.splice(buff, 1);
                        }else{
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
                // deal damage to enemy & check the number of dots on target
                var numberOfDots = 0;
                for (var status in event.enemies[targetToDealDmg].statuses){
                    var statusToCheck = event.enemies[targetToDealDmg].statuses[status];
                    if (statusToCheck.dot){
                        numberOfDots++;
                    }
                }
                rpgAbility.special.mdPercentage = rpgAbility.special.mdPercentage + rpgAbility.special.mdPerDot * numberOfDots;

                var damageToDeal = calculateDamageDealt(event, abilityCaster, abilityObject.target, rpgAbility.special)
                // TODO: add damage from pet 
                var critStrike = damageToDeal.critical ? ">" : ""
                // deal the damage                
                var targetToDealDmgName = event.enemies[targetToDealDmg].name;
                var abType = rpgAbility.special.type
                damageToDeal = dealDamageTo( event.enemies[targetToDealDmg], damageToDeal.dmg, event, abType)
                abilityToString = abilityToString + critStrike + targetToDealDmgName + " took " + damageToDeal + " damage - " + rpgAbility.name + "\n";
                abilityToString = abilityToString + checkIfDamageTakenCastAbility( event, event.enemies[targetToDealDmg], abilityCaster )
                abilityToString = abilityToString + processReflectEffects(event, targetToDealDmg, damageToDeal, abilityCaster, "dmg")
                abilityToString = abilityToString + triggerBufFromDamage(event, event.enemies[targetToDealDmg] )
                if (checkHasDied(event.enemies[targetToDealDmg])){
                    abilityToString = abilityToString + hasDied(event, event.enemies[targetToDealDmg], abilityCaster);
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
                var critStrike = damageToDeal.critical ? ">" : ""
                var targetToDealDmgName = event.membersInParty[targetToDealDmg].name;
                var abType = rpgAbility.special.type
                damageToDeal = dealDamageTo(event.membersInParty[targetToDealDmg], damageToDeal.dmg, event, abType)
                abilityToString = abilityToString + critStrike + targetToDealDmgName + " took " + damageToDeal + " damage - " + rpgAbility.name + "\n";
                abilityToString = abilityToString + processDamageDealingBuffs(event, damageToDeal, event.membersInParty[targetToDealDmg], abilityCaster)
                abilityToString = abilityToString + processReflectEffects(event, targetToDealDmg, damageToDeal, abilityCaster, "dmg")
                abilityToString = abilityToString + triggerBufFromDamage(event, event.membersInParty[targetToDealDmg] )
                if (checkHasDied(event.membersInParty[targetToDealDmg])){
                    abilityToString = abilityToString + hasDied( event, event.membersInParty[targetToDealDmg]);
                }
            }
        }
        else if (ability == "tackle"){
            // deal damage depending on dots on target
            var targetToDealDmg = abilityObject.target;
            // dealing damage to enemies
            if (event.enemies[targetToDealDmg]){
                // deal damage to enemy & check the number of dots on target
                var numberOfDots = 0;
                for (var status in event.enemies[targetToDealDmg].statuses){
                    var statusToCheck = event.enemies[targetToDealDmg].statuses[status];
                    if (statusToCheck.dot){
                        numberOfDots++;
                    }
                }
                rpgAbility.special.adPercentage = rpgAbility.special.adPercentage + rpgAbility.special.adPerDot * numberOfDots;

                var damageToDeal = calculateDamageDealt(event, abilityCaster, abilityObject.target, rpgAbility.special)
                // TODO: add damage from pet 
                var critStrike = damageToDeal.critical ? ">" : ""
                // deal the damage                
                var targetToDealDmgName = event.enemies[targetToDealDmg].name;
                var abType = rpgAbility.special.type
                damageToDeal = dealDamageTo( event.enemies[targetToDealDmg], damageToDeal.dmg, event, abType)
                abilityToString = abilityToString + critStrike + targetToDealDmgName + " took " + damageToDeal + " damage - " + rpgAbility.name + "\n";
                abilityToString = abilityToString + processReflectEffects(event, targetToDealDmg, damageToDeal, abilityCaster, "dmg")
                abilityToString = abilityToString + triggerBufFromDamage(event, event.enemies[targetToDealDmg] )
                if ( checkHasDied(event.enemies[targetToDealDmg])){
                    abilityToString = abilityToString + hasDied(event, event.enemies[targetToDealDmg], abilityCaster);
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
                rpgAbility.special.mdPercentage = rpgAbility.special.adPercentage + rpgAbility.special.mdPerDot * numberOfDots;

                var damageToDeal = calculateDamageDealt(event, abilityCaster, abilityObject.target, rpgAbility.special)
                var critStrike = damageToDeal.critical ? ">" : ""
                var targetToDealDmgName = event.membersInParty[targetToDealDmg].name;
                var abType = rpgAbility.special.type
                damageToDeal = dealDamageTo(event.membersInParty[targetToDealDmg], damageToDeal.dmg, event, abType)
                abilityToString = abilityToString + critStrike + targetToDealDmgName + " took " + damageToDeal + " damage - " + rpgAbility.name + "\n";
                abilityToString = abilityToString + processDamageDealingBuffs(event, damageToDeal, event.membersInParty[targetToDealDmg], abilityCaster)
                abilityToString = abilityToString + processReflectEffects(event, targetToDealDmg, damageToDeal, abilityCaster, "dmg")
                abilityToString = abilityToString + triggerBufFromDamage(event, event.membersInParty[targetToDealDmg] )
                if ( checkHasDied(event.membersInParty[targetToDealDmg])){
                    abilityToString = abilityToString + hasDied( event, event.membersInParty[targetToDealDmg]);
                }
            }
        }
    }
    return abilityToString;
}

function removeStatusByAbility(event, abilityObject, rpgAbility){
    let removeStatusString = ""
    var targetToRemoveFrom = abilityObject.target
    if (event.membersInParty[targetToRemoveFrom]){
        if (!checkIfDeadByObject(event.membersInParty[targetToRemoveFrom])
        && event.membersInParty[targetToRemoveFrom].statuses.length > 0){
            var ignoreBandaid = []
            var checkedStrength = false
            for (var status in event.membersInParty[targetToRemoveFrom].statuses){
                if (event.membersInParty[targetToRemoveFrom].statuses[status].ignoreBandaid){
                    ignoreBandaid.push(event.membersInParty[targetToRemoveFrom].statuses[status]);
                }
                if (event.membersInParty[targetToRemoveFrom].statuses[status].dot
                && event.membersInParty[targetToRemoveFrom].statuses[status].dot.ignoreBandaid){
                    ignoreBandaid.push(event.membersInParty[targetToRemoveFrom].statuses[status]);
                }
                if ((event.membersInParty[targetToRemoveFrom].statuses[status].dot
                && event.membersInParty[targetToRemoveFrom].statuses[status].dot.areaWideBuffOnRemove)){
                    // process ability 
                    var dotBeingRemoved = event.membersInParty[targetToRemoveFrom].statuses[status].dot
                    var abilityIdOfBuff = event.membersInParty[targetToRemoveFrom].statuses[status].dot.areaWideBuffOnRemove
                    
                    if (abilityIdOfBuff == "burningAdrenaline"){
                        removeStatusString = removeStatusString + processBurningAdrenaline( event, dotBeingRemoved, abilityIdOfBuff  )
                    }
                }if (event.membersInParty[targetToRemoveFrom].statuses[status].dot
                && event.membersInParty[targetToRemoveFrom].statuses[status].dot.onRemoveSelectNewTarget){
                    var newTarget = getRandomLivingPlayer(event, targetToRemoveFrom)
                    if (newTarget){
                        var statusToTransfer = event.membersInParty[targetToRemoveFrom].statuses[status]
                        removeStatusString = removeStatusString + transferStatusToNewTarget(newTarget, statusToTransfer, event)
                    }
                }
                else if (event.membersInParty[targetToRemoveFrom].statuses[status].dot
                && event.membersInParty[targetToRemoveFrom].statuses[status].dot.onBandaidCasterGainsBuff
                && !checkedStrength){
                    // get the caster of the dot and give them the buff to gain
                    var dotBeingRemoved = event.membersInParty[targetToRemoveFrom].statuses[status].dot
                    var abilityIdOfBuff = event.membersInParty[targetToRemoveFrom].statuses[status].dot.onBandaidCasterGainsBuff
                    if (abilityIdOfBuff == "strength" ){
                        var strengthString = processStrength( event, event.membersInParty[targetToRemoveFrom], dotBeingRemoved, abilityIdOfBuff  )
                        if (strengthString.length > 5){
                            checkedStrength = true
                        }
                        removeStatusString = removeStatusString + strengthString
                    }
                }
                else if ((event.membersInParty[targetToRemoveFrom].statuses[status].dot
                && event.membersInParty[targetToRemoveFrom].statuses[status].dot.dmgOnDotRemove)
                || (event.membersInParty[targetToRemoveFrom].statuses[status].dmgOnStatusRemove)){
                    // deal the dmg on dot remove

                    var nameOfEndOfTurnAbility = "";

                    if (event.membersInParty[targetToRemoveFrom].statuses[status].dot){
                        nameOfEndOfTurnAbility = event.membersInParty[targetToRemoveFrom].statuses[status].dot.name;
                    }else{
                        nameOfEndOfTurnAbility = event.membersInParty[targetToRemoveFrom].statuses[status].name;
                    }
                    var damageToDeal = 1;
                    var abilityObject = { }

                    if (event.membersInParty[targetToRemoveFrom].statuses[status].dot){
                        abilityObject = {
                            ability: event.membersInParty[targetToRemoveFrom].statuses[status].dot
                        }
                    }else{
                        abilityObject = {
                            ability: event.membersInParty[targetToRemoveFrom].statuses[status],
                            target: targetToRemoveFrom
                        }
                    }

                    event.membersInParty[targetToRemoveFrom].statuses.splice(status, 1);

                    abilityObject.ability.dmg = abilityObject.ability.dmgOnRemove
                    abilityObject.ability.mdPercentage = abilityObject.ability.mdPercentageOnRemove;
                    abilityObject.ability.areawide = abilityObject.ability.dmgOnRemoveAreaWide;
                    var abilityCaster = abilityObject.ability.caster;
                    delete abilityObject.ability.turnsToExpire

                    var damageToDeal = calculateDamageDealt(event, abilityCaster, abilityObject.target, abilityObject.ability)
                    var critStrike = damageToDeal.critical ? ">" : ""
                    if (abilityObject.ability.areawide){
                        removeStatusString = removeStatusString + critStrike + "The group suffered " + damageToDeal.dmg + " damage - " + nameOfEndOfTurnAbility +"\n" 
                        for (var targetToDealDmg in event.membersInParty){
                            if (!checkIfDeadByObject(event.membersInParty[targetToDealDmg])){
                                var abType = abilityObject.ability.type
                                damageToDealToPlayer = dealDamageTo(event.membersInParty[targetToDealDmg], damageToDeal.dmg, event, abType)
                                removeStatusString = removeStatusString + triggerBufFromDamage(event, event.membersInParty[targetToDealDmg] )
                                if ( checkHasDied(event.membersInParty[targetToDealDmg])){
                                    removeStatusString = removeStatusString + hasDied(event, event.membersInParty[targetToDealDmg]);
                                }
                            }
                        }                               
                    }else{
                        removeStatusString = removeStatusString + critStrike + event.membersInParty[targetToRemoveFrom].name + " took " + damageToDeal.dmg + " damage - " + nameOfEndOfTurnAbility +"\n"   
                        if (!checkIfDeadByObject(event.membersInParty[targetToRemoveFrom])){
                            var abType = abilityObject.ability.type
                            damageToDealToPlayer = dealDamageTo(event.membersInParty[targetToRemoveFrom], damageToDeal.dmg, event, abType)
                            removeStatusString = removeStatusString + triggerBufFromDamage(event, event.membersInParty[targetToRemoveFrom] )
                            if ( checkHasDied(event.membersInParty[targetToRemoveFrom])){
                                removeStatusString = removeStatusString + hasDied(event, event.membersInParty[targetToRemoveFrom]);
                            }
                        }
                    }
                    
                }
                
            }
            
            event.membersInParty[targetToRemoveFrom].statuses = []
            for (var i in ignoreBandaid){
                event.membersInParty[targetToRemoveFrom].statuses.push(ignoreBandaid[i])
            }
            removeStatusString = removeStatusString + event.membersInParty[targetToRemoveFrom].name + " was cured with " + rpgAbility.name + "\n"                
        }
    }
    else if (event.enemies[targetToRemoveFrom]){
        if (!checkIfDeadByObject(event.enemies[targetToRemoveFrom])
        && event.enemies[targetToRemoveFrom].statuses.length > 0){
            var ignoreBandaid = []
            var checkedStrength = false
            for (var status in event.enemies[targetToRemoveFrom].statuses){
                if (event.enemies[targetToRemoveFrom].statuses[status].ignoreBandaid){
                    ignoreBandaid.push(event.enemies[targetToRemoveFrom].statuses[status]);
                }
                if (event.enemies[targetToRemoveFrom].statuses[status].dot
                && event.enemies[targetToRemoveFrom].statuses[status].dot.ignoreBandaid){
                    ignoreBandaid.push(event.enemies[targetToRemoveFrom].statuses[status]);
                }
                if ((event.enemies[targetToRemoveFrom].statuses[status].dot
                && event.enemies[targetToRemoveFrom].statuses[status].dot.areaWideBuffOnRemove)){
                    // process ability 
                    var dotBeingRemoved = event.enemies[targetToRemoveFrom].statuses[status].dot
                    var abilityIdOfBuff = event.enemies[targetToRemoveFrom].statuses[status].dot.areaWideBuffOnRemove
                    
                    if (abilityIdOfBuff == "burningAdrenaline"){
                        removeStatusString = removeStatusString + processBurningAdrenaline( event, dotBeingRemoved, abilityIdOfBuff  )
                    }
                }else if (event.enemies[targetToRemoveFrom].statuses[status].dot
                && event.enemies[targetToRemoveFrom].statuses[status].dot.onBandaidCasterGainsBuff
                && !checkedStrength){
                    // get the caster of the dot and give them the buff to gain
                    var dotBeingRemoved = event.enemies[targetToRemoveFrom].statuses[status].dot
                    var abilityIdOfBuff = event.enemies[targetToRemoveFrom].statuses[status].dot.onBandaidCasterGainsBuff
                    if (abilityIdOfBuff == "strength" ){
                        var strengthString = processStrength( event, event.enemies[targetToRemoveFrom], dotBeingRemoved, abilityIdOfBuff  )
                        if (strengthString.length > 5){
                            checkedStrength = true
                        }
                        removeStatusString = removeStatusString + strengthString
                    }
                }else if (event.enemies[targetToRemoveFrom].statuses[status].status
                && event.enemies[targetToRemoveFrom].statuses[status].onBandaidCasterGainsBuff
                && !checkedStrength){
                    // get the caster of the dot and give them the buff to gain
                    var dotBeingRemoved = event.enemies[targetToRemoveFrom].statuses[status]
                    var abilityIdOfBuff = event.enemies[targetToRemoveFrom].statuses[status].onBandaidCasterGainsBuff
                    if (abilityIdOfBuff == "headache"){
                        var strengthString = processStrength( event, event.enemies[targetToRemoveFrom], dotBeingRemoved, abilityIdOfBuff  )
                        if (strengthString.length > 5){
                            checkedStrength = true
                        }
                        removeStatusString = removeStatusString + strengthString
                    }
                }
                else if ((event.enemies[targetToRemoveFrom].statuses[status].dot
                && event.enemies[targetToRemoveFrom].statuses[status].dot.dmgOnDotRemove)
                || (event.enemies[targetToRemoveFrom].statuses[status].dmgOnStatusRemove)){
                    // deal the dmg on dot remove to everyone

                    var nameOfEndOfTurnAbility = "";

                    if (event.enemies[targetToRemoveFrom].statuses[status].dot){
                        nameOfEndOfTurnAbility = event.enemies[targetToRemoveFrom].statuses[status].dot.name;
                    }else{
                        nameOfEndOfTurnAbility = event.enemies[targetToRemoveFrom].statuses[status].name;
                    }
                    var damageToDeal = 1;
                    var abilityObject = { }

                    if (event.enemies[targetToRemoveFrom].statuses[status].dot){
                        abilityObject = {
                            ability: event.enemies[targetToRemoveFrom].statuses[status].dot
                        }
                    }else{
                        abilityObject = {
                            ability: event.enemies[targetToRemoveFrom].statuses[status],
                            target: targetToRemoveFrom
                        }
                    }

                    event.enemies[targetToRemoveFrom].statuses.splice(status, 1);

                    abilityObject.ability.dmg = abilityObject.ability.dmgOnRemove
                    abilityObject.ability.mdPercentage = abilityObject.ability.mdPercentageOnRemove;
                    abilityObject.ability.areawide = abilityObject.ability.dmgOnRemoveAreaWide;
                    var abilityCaster = abilityObject.ability.caster;
                    delete abilityObject.ability.turnsToExpire

                    var damageToDeal = calculateDamageDealt(event, abilityCaster, abilityObject.target, abilityObject.ability)
                    var critStrike = damageToDeal.critical ? ">" : ""
                    if (abilityObject.ability.areawide){
                        removeStatusString = removeStatusString + critStrike + "The group suffered " + damageToDeal.dmg + " damage - " + nameOfEndOfTurnAbility +"\n"                                
                    }else{
                        removeStatusString = removeStatusString + critStrike + event.enemies[targetToRemoveFrom].name + " took " + damageToDeal.dmg + " damage - " + nameOfEndOfTurnAbility +"\n"                                
                    }
                    for (var targetToDealDmg in event.enemies){
                        var targetToDealDmgName = event.enemies[targetToDealDmg].name
                        if (!checkIfDeadByObject(event.enemies[targetToDealDmg])){
                            var abType = abilityObject.ability.type
                            damageToDealToPlayer = dealDamageTo(event.enemies[targetToDealDmg], damageToDeal.dmg, event, abType)
                            removeStatusString = removeStatusString + triggerBufFromDamage(event, event.enemies[targetToDealDmg] )
                            if ( checkHasDied(event.enemies[targetToDealDmg])){
                                removeStatusString = removeStatusString + hasDied(event, event.enemies[targetToDealDmg]);
                            }
                        }
                    }
                }
            }
            event.enemies[targetToRemoveFrom].statuses = []
            for (var i in ignoreBandaid){
                event.enemies[targetToRemoveFrom].statuses.push(ignoreBandaid[i])
            }
            removeStatusString = removeStatusString + event.enemies[targetToRemoveFrom].name + " was cured - " + rpgAbility.name + "\n"                
        }
    }
    return removeStatusString
}

function checkBuffCountByAbilityId(abilityIdToCheck, playerObject){
    var buffCount = 0;
    for (var b in playerObject.buffs){
        if (playerObject.buffs[b].abilityId == abilityIdToCheck){
            buffCount++
        }
    }
    return buffCount
}

function checkDotCountByAbilityId(abilityIdToCheck, playerObject){
    var dotCount = 0;
    for (var s in playerObject.statuses){
        if (playerObject.statuses[s].dot && playerObject.statuses[s].dot.abilityId == abilityIdToCheck){
            dotCount++
        }
    }
    return dotCount
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
        if (!checkIfDeadByObject(event.membersInParty[member])){
            eventEndedPartyDead = false;
        }
    }
    // party is dead, no success
    if (eventEndedPartyDead){
        success = false;
    }
    // members of party arent all dead, check if enemies are all dead
    for (var enemy in event.enemies){
        if (!checkIfDeadByObject(event.enemies[enemy]) ){
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

function userStatsStringBuilder(userStats, name, isEnemy, currentTurn){
    var userString = "";
    if (isEnemy){
        userString = ":heart_decoration: "  + (userStats.hp + userStats.statBuffs.hp) + "/" + (userStats.maxhp + userStats.statBuffs.maxhp)
        userString = userString + " - **" + userStats.id + "** " + (userStats.emoji || "") +  " **" + name + "**" + "\n"
    }else{
        userString = " :green_heart:  " + (userStats.hp + userStats.statBuffs.maxhp) + "/" + (userStats.maxhp + userStats.statBuffs.maxhp) + " "
        userString = userString + " :shield: " + (userStats.armor + userStats.statBuffs.armor)
        userString = userString + " 🙌 " + (userStats.spirit + userStats.statBuffs.spirit)
        userString = userString + " 🗡 " + (userStats.attackDmg + userStats.statBuffs.attackDmg)
        userString = userString + " :comet: " + (userStats.magicDmg + userStats.statBuffs.magicDmg)
        if (currentTurn == 0){
            userString = userString + " 💥 " + (userStats.criticalChance).toFixed(2) + "%"
            userString = userString + " 🌟 " + (userStats.luck).toFixed(2) + "%" 
        }
        userString = userString + " " + ( userStats.bakeEmoji || "") + "\n"
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
            if (userStats.buffs[i].displayExpireCount){
                buffsString = buffsString + ( userStats.buffs[i].expireOnTurn - currentTurn)
            }
        }
        else if(userStats.buffs[i].hot && userStats.buffs[i].hot.name){
            buffsString = buffsString + userStats.buffs[i].hot.emoji + " ";
        }
    }
    userString = userString + " **Buffs:** " + buffsString

    return userString;
}

function resetGlobalStatuses(event){
    for (var member in event.membersInParty){
        var userToProcess = event.membersInParty[member];
        userToProcess.globalStatuses = {
            ableToAttack: true,
            abletotakedamage: true,
            abletobehealed: true,
            endofturnenable: true,
            damageDealtPercentage: 1,
            damageTakenPercentage: 1,
            magicDamageTakenPercentage: 1,
            physicalDamageTakenPercentage: 1,
            healingDonePercentage: 1,
            healingTakenPercentage: 1
        }
        userToProcess.auras = []

    }

    for (var enemy in event.enemies){
        var userToProcess = event.enemies[enemy];
        userToProcess.globalStatuses = {
            ableToAttack: true,
            abletotakedamage: true,
            abletobehealed: true,
            endofturnenable: true,
            damageDealtPercentage: 1,
            damageTakenPercentage: 1,
            magicDamageTakenPercentage: 1,
            physicalDamageTakenPercentage: 1,
            healingDonePercentage: 1,
            healingTakenPercentage: 1
        }
        userToProcess.auras = []
    }
}

function processAuras(event){
    var aurasInGroup = {}
    // first check for all the auras that exist
    for(var member in event.membersInParty){
        // check their buffs
        if (!checkIfDeadByObject(event.membersInParty[member])){
            for (var buff in event.membersInParty[member].buffs){
                if (event.membersInParty[member].buffs[buff].aura){
                    var aura = event.membersInParty[member].buffs[buff]
                    aurasInGroup[aura.abilityId] = aura
                }
            }
        }
    }

    // for each aura, do its effect on the group (these are unique since its a map)
    for (var aura in aurasInGroup){
        for ( var memberToGiveAura in event.membersInParty){
            var userToBuff = event.membersInParty[memberToGiveAura];
            var statsToAffect = aurasInGroup[aura].affects
            // go through each stat and affect it
            for (var stat in statsToAffect){
                var statToAffect = statsToAffect[stat]
                var statToBuff = userToBuff[statToAffect] + userToBuff.statBuffs[statToAffect];
                // if user is not dead, buff the user with the stat
                if (!checkIfDeadByObject(userToBuff)){
                    var buffToProcess = aurasInGroup[aura]
                    if (buffToProcess.multiplier){
                        userToBuff.statBuffs[statToAffect] = userToBuff.statBuffs[statToAffect] + (Math.floor((buffToProcess.multiplier * statToBuff) - statToBuff));
                    }else if (buffToProcess.additive){
                        userToBuff.statBuffs[statToAffect] = userToBuff.statBuffs[statToAffect] + (Math.floor(buffToProcess.additive));
                    }
                }
            }
        }
    }
}

function recalculateStatBuffs(event){
    // check the buffs for the user, take the buff data and use it to recalculate the user's statsBuffs
    resetGlobalStatuses(event)
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
                // if it is an aura, do it to every user, else just do it to userToProcess
                if (buffToProcess.multiplier && !buffToProcess.aura){
                    // do a multiplier of the user's current stat
                    var currentStat = userToProcess[statToAffect] + userToProcess.statBuffs[statToAffect];
                    if (currentStat){
                        userToProcess.statBuffs[statToAffect] = userToProcess.statBuffs[statToAffect] + (Math.floor((buffToProcess.multiplier * currentStat) - currentStat));
                    }
                }
    
                if (buffToProcess.additive){
                    // do an additive of the user's current stat
                    var currentStat = userToProcess[statToAffect] + userToProcess.statBuffs[statToAffect];
                    if (currentStat){
                        userToProcess.statBuffs[statToAffect] = userToProcess.statBuffs[statToAffect] + (Math.floor(buffToProcess.additive));
                    }
                }
            }
            var globalStatToAffectArray = buffToProcess.affectsGlobal;
            for (var index in globalStatToAffectArray){
                var globalStatToAffect = globalStatToAffectArray[index]
                if (buffToProcess.additive && !buffToProcess.aura){
                    var currentGlobalStat = userToProcess.globalStatuses[globalStatToAffect];
                    
                    if (currentGlobalStat){
                        userToProcess.globalStatuses[globalStatToAffect] =  currentGlobalStat - buffToProcess.additive;
                    }
                    if (currentGlobalStat < 0){
                        currentGlobalStat = 0
                    }
                }
                if (buffToProcess.multiplier && !buffToProcess.aura){
                    // do a multiplier of the user's current stat
                    var currentGlobalStat = userToProcess.globalStatuses[globalStatToAffect];
                    
                    if (currentGlobalStat){
                        userToProcess.globalStatuses[globalStatToAffect] = (buffToProcess.multiplier * currentGlobalStat);
                    }
                    if (currentGlobalStat < 0){
                        currentGlobalStat = 0
                    }
                }
            }

            if (buffToProcess.setAbleToAttack === false){
                event.membersInParty[member].globalStatuses.ableToAttack = buffToProcess.setAbleToAttack
            }

            if (buffToProcess.setAbleToTakeDamage === false){
                event.membersInParty[member].globalStatuses.abletotakedamage = buffToProcess.setAbleToTakeDamage
            }

            if (buffToProcess.setAbleToBeHealed === false){
                event.membersInParty[member].globalStatuses.abletobehealed = buffToProcess.setAbleToBeHealed
            }
            if (buffToProcess.setEndOfTurnEnable === false){
                event.membersInParty[member].globalStatuses.endofturnenable = buffToProcess.setEndOfTurnEnable
            }
            if (buffToProcess.removeEndOfTurn === true){
                event.membersInParty[member].endOfTurnEvents = []
            }
            if (buffToProcess.removeBuffs === true){
                for (var b = event.membersInParty[member].buffs.length - 1; b >= 0; b--){
                    if (event.membersInParty[member].buffs[b].name != "entomb"){
                        event.membersInParty[member].buffs.splice(b, 1)
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
                    var currentStat = userToProcess[statToAffect] + userToProcess.statBuffs[statToAffect];
                    if (currentStat){
                        userToProcess.statBuffs[statToAffect] = userToProcess.statBuffs[statToAffect] + (Math.floor((statusToProcess.multiplier * currentStat) - currentStat));
                    }
                }
    
                if (statusToProcess.additive){
                    // do a multiplier of the user's current stat
                    var currentStat = userToProcess[statToAffect] + userToProcess.statBuffs[statToAffect];
                    if (currentStat){
                        userToProcess.statBuffs[statToAffect] = userToProcess.statBuffs[statToAffect] + (Math.floor(statusToProcess.additive));
                        if (userToProcess.statBuffs[statToAffect] + userToProcess[statToAffect] < 0 ){
                            userToProcess.statBuffs[statToAffect] = ( userToProcess[statToAffect] * -1 ) // this should = 0
                        }
                    }
                }
            }

            var globalStatToAffectArray = statusToProcess.affectsGlobal;
            for (var index in globalStatToAffectArray){
                var globalStatToAffect = globalStatToAffectArray[index]
                if (statusToProcess.additive && !statusToProcess.aura){
                    var currentGlobalStat = userToProcess.globalStatuses[globalStatToAffect];
                    
                    if (currentGlobalStat){
                        userToProcess.globalStatuses[globalStatToAffect] =  currentGlobalStat - statusToProcess.additive;
                    }
                    if (currentGlobalStat < 0){
                        currentGlobalStat = 0
                    }
                }
                if (statusToProcess.multiplier && !statusToProcess.aura){
                    // do a multiplier of the user's current stat
                    var currentGlobalStat = userToProcess.globalStatuses[globalStatToAffect];
                    
                    if (currentGlobalStat){
                        userToProcess.globalStatuses[globalStatToAffect] = (statusToProcess.multiplier * currentGlobalStat);
                    }
                    if (currentGlobalStat < 0){
                        currentGlobalStat = 0
                    }
                }
            }

            if (statusToProcess.setAbleToAttack === false
                && !statusToProcess.invalid){
                event.membersInParty[member].globalStatuses.ableToAttack = statusToProcess.setAbleToAttack
            }

            if (statusToProcess.setAbleToTakeDamage === false
                && !statusToProcess.invalid){
                event.membersInParty[member].globalStatuses.abletotakedamage = statusToProcess.setAbleToTakeDamage
            }

            if (statusToProcess.setAbleToBeHealed === false
                && !statusToProcess.invalid){
                event.membersInParty[member].globalStatuses.abletobehealed = statusToProcess.setAbleToBeHealed
            }
            if (statusToProcess.setEndOfTurnEnable === false
                && !statusToProcess.invalid){
                event.membersInParty[member].globalStatuses.endofturnenable = buffToProcess.setEndOfTurnEnable
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
        var buffsToRemoveByIndex = []
        for (var buff in event.enemies[enemy].buffs){
            var buffToProcess = event.enemies[enemy].buffs[buff];
            var statToAffectArray = buffToProcess.affects;
            for (var index in statToAffectArray){
                var statToAffect = statToAffectArray[index]
                if (buffToProcess.multiplier){
                    // do a multiplier of the user's current stat
                    var currentStat = userToProcess[statToAffect] + userToProcess.statBuffs[statToAffect];
                    if (currentStat){
                        userToProcess.statBuffs[statToAffect] = userToProcess.statBuffs[statToAffect] + (Math.floor((buffToProcess.multiplier * currentStat) - currentStat));
                    }
                }
    
                if (buffToProcess.additive){
                    // do a multiplier of the user's current stat
                    var currentStat = userToProcess[statToAffect] + userToProcess.statBuffs[statToAffect];
                    if (currentStat){
                        userToProcess.statBuffs[statToAffect] = userToProcess.statBuffs[statToAffect] + (Math.floor(buffToProcess.additive));
                    }
                }
                // mostly for challenge 10 (fury)
                if (buffToProcess.multiplierBasedOnLostHp){
                    // get hp of the enemy
                    var currentHp = userToProcess.hp
                    var maxHp = userToProcess.maxhp
                    var currentHpPercentage = 100 - ( (currentHp / maxHp) * 100)
                    var multiplierPerHp = 1 + currentHpPercentage * buffToProcess.multiplierBasedOnLostHp
                    var currentStat = userToProcess[statToAffect] + userToProcess.statBuffs[statToAffect];
                    if (currentStat){
                        userToProcess.statBuffs[statToAffect] = userToProcess.statBuffs[statToAffect] + (Math.floor((multiplierPerHp * currentStat) - currentStat));
                    }
                }
            }

            var globalStatToAffectArray = buffToProcess.affectsGlobal;
            for (var index in globalStatToAffectArray){
                var globalStatToAffect = globalStatToAffectArray[index]
                if (buffToProcess.additive && !buffToProcess.aura){
                    var currentGlobalStat = userToProcess.globalStatuses[globalStatToAffect];
                    
                    if (currentGlobalStat){
                        userToProcess.globalStatuses[globalStatToAffect] =  currentGlobalStat - buffToProcess.additive;
                    }
                    if (userToProcess.globalStatuses[globalStatToAffect] < 0){
                        userToProcess.globalStatuses[globalStatToAffect] = 0
                    }
                }
                if (buffToProcess.multiplier && !buffToProcess.aura){
                    // do a multiplier of the user's current stat
                    var currentGlobalStat = userToProcess.globalStatuses[globalStatToAffect];
                    
                    if (currentGlobalStat){
                        userToProcess.globalStatuses[globalStatToAffect] = (buffToProcess.multiplier * currentGlobalStat);
                    }
                    if (userToProcess.globalStatuses[globalStatToAffect] < 0){
                        userToProcess.globalStatuses[globalStatToAffect] = 0
                    }
                }
            }
            
            if (buffToProcess.setAbleToAttack === false){
                event.enemies[enemy].globalStatuses.ableToAttack = buffToProcess.setAbleToAttack
            }

            if (buffToProcess.setAbleToTakeDamage === false){
                event.enemies[enemy].globalStatuses.abletotakedamage = buffToProcess.setAbleToTakeDamage
            }

            if (buffToProcess.setAbleToBeHealed === false){
                event.enemies[enemy].globalStatuses.abletobehealed = buffToProcess.setAbleToBeHealed
            }
            if (buffToProcess.removeEndOfTurn === true){
                event.enemies[enemy].endOfTurnEvents = []
            }
            if (buffToProcess.removeBuffs === true){
                // find frenzy buff and squash it
                for (var b = event.enemies[enemy].buffs.length - 1; b >= 0; b--){
                    if (event.enemies[enemy].buffs[b].name != "Entomb"){
                        event.enemies[enemy].buffs.splice(b, 1)
                    }
                }
            }
            if (buffToProcess.setEndOfTurnEnable === false){
                event.enemies[enemy].globalStatuses.endofturnenable = buffToProcess.setEndOfTurnEnable
            }
            if (buffToProcess.removeAtHpPercentage){
                // remove this buff 
                if (event.enemies[enemy].hp / event.enemies[enemy].maxhp < buffToProcess.removeAtHpPercentage){
                    // remove it but also handle other things
                    buffsToRemoveByIndex.push(parseInt(buff))
                }
            }
        }
        for( var i = event.enemies[enemy].buffs.length; i >= 0; i--){
            if (buffsToRemoveByIndex.indexOf(i) > -1){ 
                event.enemies[enemy].buffs[i].invalid = true
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
                    var currentStat = userToProcess[statToAffect] + userToProcess.statBuffs[statToAffect];
                    if (currentStat){
                        userToProcess.statBuffs[statToAffect] = userToProcess.statBuffs[statToAffect] + (Math.floor((statusToProcess.multiplier * currentStat) - currentStat));
                    }
                }
    
                if (statusToProcess.additive){
                    // do a multiplier of the user's current stat
                    var currentStat = userToProcess[statToAffect] + userToProcess.statBuffs[statToAffect];
                    if (currentStat){
                        userToProcess.statBuffs[statToAffect] = userToProcess.statBuffs[statToAffect] + (Math.floor(statusToProcess.additive));
                    }
                }
            }

            var globalStatToAffectArray = statusToProcess.affectsGlobal;
            for (var index in globalStatToAffectArray){
                var globalStatToAffect = globalStatToAffectArray[index]
                if (statusToProcess.additive && !statusToProcess.aura){
                    var currentGlobalStat = userToProcess.globalStatuses[globalStatToAffect];
                    
                    if (currentGlobalStat){
                        userToProcess.globalStatuses[globalStatToAffect] =  currentGlobalStat - statusToProcess.additive;
                    }
                    if (userToProcess.globalStatuses[globalStatToAffect] < 0){
                        userToProcess.globalStatuses[globalStatToAffect] = 0
                    }
                }
                if (statusToProcess.multiplier && !statusToProcess.aura){
                    // do a multiplier of the user's current stat
                    var currentGlobalStat = userToProcess.globalStatuses[globalStatToAffect];
                    
                    if (currentGlobalStat){
                        userToProcess.globalStatuses[globalStatToAffect] = (statusToProcess.multiplier * currentGlobalStat);
                    }
                    if (userToProcess.globalStatuses[globalStatToAffect] < 0){
                        userToProcess.globalStatuses[globalStatToAffect] = 0
                    }
                }
            }

            if (statusToProcess.setAbleToAttack === false
                && !statusToProcess.invalid){
                event.enemies[enemy].globalStatuses.ableToAttack = statusToProcess.setAbleToAttack
            }

            if (statusToProcess.setAbleToTakeDamage === false
                && !statusToProcess.invalid){
                event.enemies[enemy].globalStatuses.abletotakedamage = statusToProcess.setAbleToTakeDamage
            }

            if (statusToProcess.setAbleToBeHealed === false
                && !statusToProcess.invalid){
                event.enemies[enemy].globalStatuses.abletobehealed = statusToProcess.setAbleToBeHealed
            }
            if (statusToProcess.removeEndOfTurn === true){
                event.enemies[enemy].endOfTurnEvents = []
            }
            if (statusToProcess.removeBuffs === true){
                // find frenzy buff and squash it
                for (var b = event.enemies[enemy].buffs.length - 1; b >= 0; b--){
                    if (event.enemies[enemy].buffs[b].name != "Entomb"){
                        event.enemies[enemy].buffs.splice(b, 1)
                    }
                }
            }
            if (statusToProcess.setEndOfTurnEnable === false
                && !statusToProcess.invalid){
                event.enemies[enemy].globalStatuses.endofturnenable = statusToProcess.setEndOfTurnEnable
            }
            if (statusToProcess.removeAtHpPercentage){
                // remove this buff 
                if (event.enemies[enemy].hp / event.enemies[enemy].maxhp < statusToProcess.removeAtHpPercentage){
                    // remove it but also handle other things
                    buffsToRemoveByIndex.push(parseInt(buff))
                }
            }
        }
        for( var i = event.enemies[enemy].buffs.length; i >= 0; i--){
            if (buffsToRemoveByIndex.indexOf(i) > -1){ 
                event.enemies[enemy].buffs[i].invalid = true
            }
        }
    }

    // during recalculate stat buffs
    // check for the existence of a certain aura in the group, if the aura exists in at least one player
    // go through each player and recalculate their stat
    processAuras(event)
}

function transferStatusToNewTarget(newTarget, statusToTransfer, event){
    var transferString = ""
    if (newTarget < 1000){
        // target is an enemy
    }else{
        // target is member
        var newTargetName = event.membersInParty[newTarget].name
        event.membersInParty[newTarget].statuses.push(statusToTransfer)
        transferString = transferString + newTargetName + " was affected with " + statusToTransfer.name + "\n"
    }

    return transferString
}

function getRandomLivingPlayer(event, currentTarget){
    var randomPlayer = undefined
    var livingPlayers = []
    for (var member in event.membersInParty){
        if (!checkIfDeadByTargetId(member)){
            randomPlayer = member
            livingPlayers.push(member)
        }
    }
    var rand = Math.floor(Math.random() * livingPlayers.length)
    var validTarget = false
    var stuckCount = 0
    while(!validTarget && stuckCount < 50){
        if (!checkIfDeadByTargetId(livingPlayers[ rand ] ) 
        && livingPlayers[rand] != currentTarget){
            randomPlayer = livingPlayers[ rand ]
            validTarget = true
        }else{
            rand = rand = Math.floor(Math.random() * livingPlayers.length)
            stuckCount++
        }
    }

    return randomPlayer
}

function getRandomLivingEnemy(event){
    var randomEnemy = 1;
    for (var enemy in event.enemies){
        if (event.enemies[enemy].hp > 0){
            randomEnemy = enemy
        }
    }
    var rand = Math.floor(Math.random() * event.enemiesCount) + 1
    var validTarget = false
    var stuckCount = 0
    while(!validTarget && stuckCount < 50){
        if (event.enemies[rand].hp > 0){
            randomEnemy = rand
            validTarget = true
        }else{
            rand = Math.floor(Math.random() * event.enemiesCount) + 1
            stuckCount++
        }
    }

    return randomEnemy
}

function getPrioritizedTargets(event, numberOfTargets, abilityCaster, initialTarget, ignoreInitialTarget){
    // caster should be prioritized first
    var prioritizedTargets = [];
    // check event members, check their hp, order them in an array by hp, return the lowest numberOfTargets
    if (abilityCaster > 1000){
        for (var m in event.membersInParty){
            if (!checkIfDeadByObject(event.membersInParty[m])){
                prioritizedTargets.push({
                    targetId: m,
                    target: event.membersInParty[m],
                    hp: event.membersInParty[m].hp
                })
            }
        }
    }else{
        for (var m in event.enemies){
            if (!checkIfDeadByObject(event.enemies[m])){
                prioritizedTargets.push({
                    targetId: m,
                    target: event.enemies[m],
                    hp: event.enemies[m].hp
                })
            }
        }
    }
    
    /////////////// for testing
    /*
    prioritizedTargets.push({
        targetId: m,
        target: event.membersInParty[m],
        hp: 105
    })
    prioritizedTargets.push({
        targetId: m,
        target: event.membersInParty[m],
        hp: 10000
    })
    prioritizedTargets.push({
        targetId: m,
        target: event.membersInParty[m],
        hp: 2
    })
    */

    prioritizedTargets.sort(function(a, b){
        var keyA = a.hp
        var keyB = b.hp
        if(keyA < keyB) {
            return -1;
        }
        else if(keyA > keyB) {
            return 1;
        }else{
            return 0;    
        }
    })
    var finalPrioritizedTargets = []
    for (var p in prioritizedTargets){
        if (numberOfTargets > 0){
            if (ignoreInitialTarget 
            && initialTarget == prioritizedTargets[p].targetId){
                // do not include the target
            }else{
                finalPrioritizedTargets.push(prioritizedTargets[p])
                numberOfTargets--;
            }
        }else{
            break;
        }
    }

    return finalPrioritizedTargets
}


function enemiesUseAbilities(event){
    // for each enemy in the event, pick out an ability to use, pick a valid target for the ability
    // queue up the ability used
    // calculate enemies alive
    var enemiesAlive = 0;
    for (var enemy in event.enemies){
        if (!checkIfDeadByObject(event.enemies[enemy])){
            enemiesAlive++;
        }
    }

    for (var enemy in event.enemies){
        // console.log(event.enemies[enemy]);
        // check that the enemy is not dead first 
        if (!checkIfDeadByObject(event.enemies[enemy])
        && event.enemies[enemy].globalStatuses.ableToAttack){
            // pick an ability, then pick a target, the target must be a member of the party that isnt dead
            var abilityPicked;
            var abilityRoll;
            if (event.enemies[enemy].abilityOrder){
                var indexToPickInOrder = (event.turn - 1) % event.enemies[enemy].abilityOrder.length;
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
            || rpgAbilities[abilityPicked].name == "Tackle"
            || rpgAbilities[abilityPicked].name == "Drain")){
                // target SHOULD be the membersinparty
                var validTarget = false;
                var stuckCount = 0
                var target;
                if (rpgAbilities[abilityPicked].targetWithName){

                    // look for an enemy with that name
                    for (var e in event.enemies){
                        if (event.enemies[e].name == rpgAbilities[abilityPicked].targetWithName){
                            target = event.enemies[e].id
                            validTarget = true
                            break
                        }
                    }
                }
                while(!validTarget && stuckCount < 100){
                    var targetRoll = Math.floor(Math.random() * event.members.length);
                    var targetMember = event.members[targetRoll].id;
                    if (stuckCount < 5){
                        var rampaging = false
                        for (var member in event.members){
                            // 
                            var idOfMemberBeingChecked = "rpg-" + event.members[member].id;
                            // then check if someone has rampage
                            for (var statusToCheck in event.membersInParty[idOfMemberBeingChecked].statuses){
                                // check if someone has focus on them if they do then the target should be the focused person 
                                if ( (event.membersInParty[idOfMemberBeingChecked].statuses[statusToCheck].name == "Rampage"
                                || event.membersInParty[idOfMemberBeingChecked].statuses[statusToCheck].name == "Glare")
                                && event.membersInParty[idOfMemberBeingChecked].statuses[statusToCheck].focusedBy == enemy){
                                    //target roll should be 
                                    targetMember = event.members[member].id;
                                    rampaging = true;
                                    break;
                                }
                            }
                        }
                        if (!rampaging){
                            for (var member in event.members){
                                var idOfMemberBeingChecked = "rpg-" + event.members[member].id;
                                // then check if someone has focus
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
                    }
                    
                    if (!checkIfDeadByObject(event.membersInParty["rpg-"+targetMember])){
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
                if (rpgAbilities[abilityPicked].targetWithName){
                    // look for an enemy with that name
                    for (var e in event.enemies){
                        if (event.enemies[e].name == rpgAbilities[abilityPicked].targetWithName){
                            target = event.enemies[e].id
                            validTarget = true
                            break
                        }
                    }
                }
                while(!validTarget && stuckCount < 100){
                    if (abilityPicked == "revive"){
                        // check for a dead teammate and revive them, if no dead teammates, just attack ?
                        var ableToRevive = false;
                        for (var enemy in event.enemies){
                            if (checkIfDeadByObject(event.enemies[enemy])){
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
                                if (!checkIfDeadByObject(event.membersInParty["rpg-"+targetMember])){
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
                            if (!checkIfDeadByObject(event.enemies[enemy])
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
                                if (!checkIfDeadByObject(event.membersInParty["rpg-"+targetMember])){
                                    // valid target
                                    target = "rpg-"+targetMember;
                                    validTarget = true;
                                }
                                stuckCount++;
                            }
                        }
                    }else{
                        var targetMember = Math.floor(Math.random() * event.enemiesCount) + 1;
                        if (!checkIfDeadByObject(event.enemies[targetMember])){
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

function getRpgZone(areaname){
    return areaToZoneMap[areaname]
}

// build the string for rpgstats and abilities
module.exports.rpgInfoStringBuilder = function(item){
    if (item.hpplus || item.attackdmgplus || item.magicdmgplus || item.armorplus || item.spiritplus){
        var hp = item.hpplus || 0
        var attackdmg = item.attackdmgplus || 0
        var magicdmg = item.magicdmgplus || 0
        var armor = item.armorplus || 0 
        var spirit = item.spiritplus || 0
        var crit = item.critplus || 0
        var luck = item.luckplus || 0

        var rpgItemInfoString = " 💚 " + hp + " 🗡️ " + attackdmg + " ☄️ " + magicdmg + " 🛡️ " + armor + " 🙌 " + spirit + " 💥 " + crit + " 🌟 " + luck +  "\n"
        rpgItemInfoString = rpgItemInfoString + "**Abilities:**\n"
        if (item.ability1){
            var abilityName = rpgAbilities[item.ability1].name
            var abilityDescription = rpgAbilities[item.ability1].description
            rpgItemInfoString = rpgItemInfoString + "**" + abilityName + "** - " + abilityDescription + "\n"
        }
        if (item.ability2){
            var abilityName = rpgAbilities[item.ability2].name
            var abilityDescription = rpgAbilities[item.ability2].description
            rpgItemInfoString = rpgItemInfoString + "**" + abilityName + "** - " + abilityDescription + "\n"
        }
        if (item.specialability){
            var abilityName = rpgAbilities[item.specialability].name
            var abilityDescription = rpgAbilities[item.specialability].description
            rpgItemInfoString = rpgItemInfoString + "**" + abilityName + "** - " + abilityDescription + "\n"
        }
        if (item.passiveability){
            var abilityName = rpgAbilities[item.passiveability].name
            var abilityDescription = rpgAbilities[item.passiveability].description
            rpgItemInfoString = rpgItemInfoString + "**" + abilityName + "** - " + abilityDescription + "\n"
        }
        return rpgItemInfoString
    }else{
        return ""
    }
}