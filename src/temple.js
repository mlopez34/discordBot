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

module.exports.upgradeTemple = function(message, params){
    // check level of temple - get requirements for next level - check upgrade requirements
    var templeNextLevel = params.templeLevel + 1
    var requirements = upgradeRequirements[templeNextLevel]
    // check reputation level 
    if (params.userTacos >= requirements.tacos && params.replevel >= reputationLevel){
        // check inventory items

        // check fruits?

        // if both are met - consume items, remove fruits, add level to temple
    }else{
        message.channel.send("missing requirements")
    }
}

var upgradeRequirements = {
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