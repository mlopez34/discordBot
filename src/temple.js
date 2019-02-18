'use strict'
var profileDB = require("./profileDB.js");
const Discord = require("discord.js");

var upgradeLock = {}

var upgradeLevelTimes = {
    1: 1,
    2: 2,
    3: 4,
    5: 7,
    6: 10,
    7: 15,
    8: 24,
    9: 48,
    10: 70,
    11: 120,
    12: 200
}

module.exports.getUpgradeCooldownHoursByLevel = function(level){
    return upgradeLevelTimes[1]
}

module.exports.setupgradeLock = function(discordUserId, set){
    upgradeLock[discordUserId] = set
}

module.exports.getupgradeLock = function(discordUserId){
    return upgradeLock[discordUserId]
}

module.exports.checkRequirements = function(params){
    // check level of temple - get requirements for next level - check upgrade requirements
    var requirementsMet = true;
    var requirements = upgradeRequirements[params.nextLevel]
    console.log(requirements)
    console.log(params)
    // check reputation level 
    if (params.tacos >= requirements.tacos && params.reputationLevel >= requirements.reputationlevel){
        // check fruits and check items now 
        if (requirements.fruits){
            // check params.fruits contains all the fruits
            for (var f in requirements.fruits){
                if (params.fruitData[f] && params.fruitData[f] < requirements.fruits[f]){
                    requirementsMet = false
                    break;
                }
            }
        }
        if (requirements.itemRequirements){
            for (var i in requirements.itemRequirements){
                // check params.itemsToUse contains all the items
                var itemToCheck = requirements.itemRequirements[i]
                if (params.inventoryCountMap[itemToCheck.itemId] < itemToCheck.itemCount){
                    requirementsMet = false
                    break;
                }
            }
        }
    }else{
        requirementsMet = false
    }
    return requirementsMet
}

module.exports.upgradeTemple = function(message, params){
    var discordUserId = message.author.id
    consumeTacos(discordUserId, params, function(error, res){
        if (error){
            console.log(error)
        }else{
            removeFruits(discordUserId, params, function(error, res){
                if (error){
                    console.log(error)
                }else{
                    useItems(params, function(error, res){
                        if (error){
                            console.log(error)
                        }else{
                            // SET building level higher
                            profileDB.upgradeTemple(discordUserId, function(err, res){
                                if (err){
                                    console.log(err)
                                }else{
                                    message.channel.send(message.author + " Has upgraded their Temple to level `" + params.nextLevel + "` :sparkler: :hammer: ")
                                }
                            })
                        }
                    })
                }
            })
        }
    })
}

function consumeTacos(discordUserId, params, cb){
    profileDB.updateUserTacos(discordUserId, (params.upgradeRequirements.tacos * -1), function(err, res){
        if (err){
            cb(err)
        }else{
            cb(null, res)
        }
    })
}

function useItems(params, cb){
    profileDB.bulkUpdateItemStatus(params.itemsToUse, "used", function(err, res){
        if (err){
            cb(err)
        }else{
            cb(null, res)
        }
    })
}

function removeFruits(discordUserId, params, cb){
    // TODO: get object of fruits to remove
    if (params.upgradeRequirements.fruits){
        profileDB.bulkupdateUserFruits(discordUserId, params.upgradeRequirements.fruits, false, function(err, res){
            if (err){
                cb(err)
            }else{
                cb(null, res)
            }
        })
    }else{
        cb(null, "no fruits to remove")
    }
}

module.exports.getUpgradeRequirements = function(level){
    return upgradeRequirements[level]
}

module.exports.getUpgradeRequirementsForLevel = function(level, itemsMapById){
    var requirementString = ""
    var upgradeReqs = exports.getUpgradeRequirements(level)
    if (upgradeReqs){
        var itemReq = ""
        for (var i in upgradeReqs.itemRequirements){
            var itemid = upgradeReqs.itemRequirements[i].itemId
            var itemcount = upgradeReqs.itemRequirements[i].itemCount
            var itemname = itemsMapById[itemid].itemname
            var itemReq = itemReq + itemname + " x" + itemcount + "\n"
        }
        requirementString = requirementString + "tacos: " + upgradeReqs.tacos + "\nreputation: " + upgradeReqs.reputationlevel + "\nItems:\n" + itemReq
    }
    return requirementString
}

function createUpgradeObject(upgrade){

    var individualUpgrade = {
        tacos: upgrade.tacos ? upgrade.tacos : 0,
        levelinfo: upgrade.levelinfo,
        reputationlevel: upgrade.reputationlevel ? upgrade.reputationlevel : 1,
        itemRequirements: []
    }

    if (upgrade.item1id){
        individualUpgrade.itemRequirements.push({
            itemId: upgrade.item1id,
            itemCount: upgrade.item1count ? upgrade.item1count : 1
        })
    }
    if (upgrade.item2id){
        individualUpgrade.itemRequirements.push({
            itemId: upgrade.item2id,
            itemCount: upgrade.item2count ? upgrade.item2count : 1
        })
    }
    if (upgrade.item3id){
        individualUpgrade.itemRequirements.push({
            itemId: upgrade.item3id,
            itemCount: upgrade.item3count ? upgrade.item3count : 1
        })
    }
    if (upgrade.item4id){
        individualUpgrade.itemRequirements.push({
            itemId: upgrade.item4id,
            itemCount: upgrade.item4count ? upgrade.item4count : 1
        })
    }

    return individualUpgrade
}

module.exports.initializeUpgradeRequirements = function( upgradeReqs, callback){

    for (var u in upgradeReqs){
        var requirement = upgradeReqs[u]
        if (requirement.building == "temple"){
            var prepareUpgrade = createUpgradeObject(requirement)
            upgradeRequirements[requirement.buildinglevel] = prepareUpgrade
        }
    }
    callback()
}

module.exports.getLevelInfo = function(level){
    if (upgradeRequirements[level]){
        return upgradeRequirements[level].levelinfo
    }else{
        return "-"
    }
}

const upgradeRequirements = {
    1: {
        items: [
            {
                itemId: 5,
                itemCount: 40
            },
            {
                itemId: 1,
                itemCount: 80
            },
            {
                itemId: 11,
                itemCount: 7
            }
            // normal rare dust
        ],
        tacos: 450,
    },
    2: {
        items: [
            {
                itemId: 5,
                itemCount: 95
            },
            {
                itemId: 1,
                itemCount: 173
            },
            {
                itemId: 11,
                itemCount: 13
            }
            // improved rare dust
        ],
        tacos: 1050,
    },
    3: {
        // normal rare + improved rare dust
    },
    4: {
        // ancient dust
    },
    5: {
        // refined rare dust
    },
    6: {
        // ancient + refined rare dust
    },
    7: {
        // refined rare dust + improved rare dust
    },
    8: {
        // improved ancient dust
    },
    8: {
        // improved ancient dust + refined rare dust
    },
    9: {
        // improved rare + refined rare + improved ancient
    },
    10: {
        // artifact dust
    },
    11: {
        // refined ancient dust
    },
    12: {
        // artifact dust + refined ancient dust
    }
}