'use strict'
var profileDB = require("./profileDB.js");
const Discord = require("discord.js");

var upgradeLock = {}

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
    // check reputation level 
    if (params.userTacos >= requirements.tacos && params.replevel >= requirements.reputationLevel){
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
        if (requirements.items){
            for (var i in requirements.items){
                // check params.itemsToUse contains all the items
                var itemToCheck = requirements.items[i]
                if (params.itemsInInventoryCountMap[itemToCheck.itemId] < itemToCheck.itemCount){
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

module.exports.upgradeStable = function(message, params){
    consumeTacos(params, function(error, res){
        if (error){

        }else{
            removeFruits(params, function(error, res){
                if (error){
                    
                }else{
                    useItems(params, function(error, res){
                        if (error){
                            
                        }else{
                            // SET building level higher
                            profileDB.upgradeStable(message.author.id, function(err, res){
                                if (err){

                                }else{
                                    message.channel.send("upgraded stable")
                                }
                            })
                        }
                    })
                }
            })
        }
    })
}

function consumeTacos(params, cb){
    profileDB.updateUserTacos(message.author.id, params.upgradeRequirements.tacos, function(err, res){
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

function removeFruits(params, cb){
    // TODO: get object of fruits to remove
    profileDB.bulkupdateUserFruits(message.author.id, params.upgradeRequirements.fruits, false, function(err, res){
        if (err){
            cb(err)
        }else{
            cb(null, res)
        }
    })
}

module.exports.getUpgradeRequirements = function(level){
    return upgradeRequirements[level]
}

const upgradeRequirements = {
    1: {
        items: [
            {
                itemId: 4,
                itemCount: 40
            },
            {
                itemId: 2,
                itemCount: 80
            },
            {
                itemId: 11,
                itemCount: 7
            }
            // normal rare dust
        ],
        tacos: 450,
        reputationLevel: 2,
    },
    2: {
        items: [
            {
                itemId: 4,
                itemCount: 95
            },
            {
                itemId: 2,
                itemCount: 173
            },
            {
                itemId: 11,
                itemCount: 13
            }
            // improved rare dust
        ],
        tacos: 1050,
        reputationLevel: 2,
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