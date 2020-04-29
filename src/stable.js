'use strict'
var profileDB = require("./profileDB.js");
var reputation = require("./reputation.js")
var rpgMap = require("./rpg/rpgMap");
var areaToZoneMap = rpgMap.areaToZoneMap
const PETS_FETCH_SEEDS_LEVEL = 8;
const PETS_FETCH_RARE_MATS_LEVEL = 4;
const PETS_FETCH_ANCIENT_MATS_LEVEL = 10;

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
                if (!params.inventoryCountMap[itemToCheck.itemId] 
                    || params.inventoryCountMap[itemToCheck.itemId] < itemToCheck.itemCount){
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
                            profileDB.upgradeStable(discordUserId, function(err, res){
                                if (err){
                                    console.log(err)
                                }else{
                                    message.channel.send(message.author + " Has upgraded their Stable to level `" + params.nextLevel + "` :sparkler: :hammer: ")
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
        requirementString = requirementString + "*Tacos:* " + upgradeReqs.tacos + "\n*Reputation:* " + reputation.getReputationBasedOnLevel( upgradeReqs.reputationlevel ) + "\n*Items:*\n" + itemReq
    }else{
        requirementString = "N/A"
    }
    return requirementString
}

module.exports.validateStablePetSlot = function(stableLevel, slot){
    if (slot == 5){
        if (stableLevel >= 12 ){
            return true
        }else{
            return false
        }
    }else if (slot == 4){
        if (stableLevel >= 9){
            return true
        }else{
            return false
        }
    }else if (slot == 3){
        if (stableLevel >= 6 ){
            return true
        }else{
            return false
        }
    }else if (slot == 2){
        if (stableLevel >= 3){
            return true
        }else{
            return false
        }
    }else if (slot == 1){
        if (stableLevel >= 1){
            return true
        }else{
            return false
        }
    }else{
        return false
    }

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
        if (requirement.building == "stable"){
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

module.exports.eventsForCommand = function(message, eventParams){
    if (eventParams.command === "fetch"){
        petFetchSeeds(message, eventParams)
        petFetchItemBasedOnArea(message, eventParams)
    }
}

function filterForSeeds(allItems){
    let seedItems = []
    for (var i in allItems){
        if (allItems[i].isseed){
            seedItems.push(allItems[i])
        }
    }
    return seedItems
}

function filterForAreaMatsAncient(allItems, userArea, userZone){
    let matAncientsFromArea = []
    for (var i in allItems){
        for (var z in allItems[i].findinareaarray){
            if (userArea && (userArea == allItems[i].findinareaarray[z])
            && allItems[i].itemstatistics == "consumable for ancient item"){
                matAncientsFromArea.push(allItems[i])
            }
        }

        for (var z in allItems[i].findinzonearray){
            if (userZone && (userZone == allItems[i].findinzonearray[z])
            && allItems[i].itemstatistics == "consumable for ancient item"){
                matAncientsFromArea.push(allItems[i])
            }
        }
    }
    return matAncientsFromArea
}

function filterForAreaMatsRare(allItems, userArea, userZone){
    let matRaresFromArea = []
    for (var i in allItems){
        for (var z in allItems[i].findinareaarray){
            if (userArea && (userArea == allItems[i].findinareaarray[z])
            && allItems[i].itemstatistics == "consumable for rare item"){
                matRaresFromArea.push(allItems[i])
            }
        }

        for (var z in allItems[i].findinzonearray){
            if (userZone && (userZone == allItems[i].findinzonearray[z])
            && allItems[i].itemstatistics == "consumable for rare item"){
                matRaresFromArea.push(allItems[i])
            }
        }
    }
    return matRaresFromArea
}

function petFetchSeeds(message, eventParams){
    if (eventParams.discordUserId){
        if (eventParams.stableRes && eventParams.stableRes.data.stablelevel >= PETS_FETCH_SEEDS_LEVEL){
            // how to calculate chance to get seeds? pet cooldown 
            let itemsObtainedArray = []
            let getSeedRoll = Math.floor(Math.random() * 100) + 1;
            if (getSeedRoll <= eventParams.fetchCD){
                // higher CD higher chance user gets a random seed
                let seedItems = filterForSeeds(eventParams.allItems)
                let seedRoll = Math.floor(Math.random() * seedItems.length )
                itemsObtainedArray.push(seedItems[seedRoll])
                addToUserInventory(eventParams.discordUserId, itemsObtainedArray);
                obtainedItemEmbedBuilder(message, itemsObtainedArray, eventParams)
            }
        }
    }
}

function getRpgZone(areaname){
    return areaToZoneMap[areaname]
}

function petFetchItemBasedOnArea(message, eventParams){
    // get commons and uncommons here only, never rares or above
    if (eventParams.discordUserId){
        profileDB.getUserRpgProfleData(eventParams.discordUserId, function(err, rpgRes){
            if (err){
                console.log(err)
            }else{
                if (eventParams.stableRes && eventParams.stableRes.data.stablelevel >= PETS_FETCH_ANCIENT_MATS_LEVEL){
                    let itemsObtainedArray = []
                    let getMatRoll = Math.floor(Math.random() * 150) + 1;
                    if (getMatRoll <= eventParams.fetchCD){
                        // higher CD higher chance user gets a random ancient mat
                        let matItems = filterForAreaMatsAncient(eventParams.allItems, rpgRes.data.currentarea, getRpgZone(rpgRes.data.currentarea))
                        if (matItems.length > 0){
                            let matRoll = Math.floor(Math.random() * matItems.length )
                            itemsObtainedArray.push(matItems[matRoll])
                            
                            addToUserInventory(eventParams.discordUserId, itemsObtainedArray);
                            obtainedItemEmbedBuilder(message, itemsObtainedArray, eventParams)    
                        }
                    }
                }
                if (eventParams.stableRes && eventParams.stableRes.data.stablelevel >= PETS_FETCH_RARE_MATS_LEVEL){
                    let itemsObtainedArray = []
                    let getMatRoll = Math.floor(Math.random() * 75) + 1;
                    if (getMatRoll <= eventParams.fetchCD){
                        // higher CD higher chance user gets a random ancient mat
                        let matItems = filterForAreaMatsRare(eventParams.allItems, rpgRes.data.currentarea, getRpgZone(rpgRes.data.currentarea))
                        if (matItems.length > 0){
                            let matRoll = Math.floor(Math.random() * matItems.length )
                            itemsObtainedArray.push(matItems[matRoll])
    
                            addToUserInventory(eventParams.discordUserId, itemsObtainedArray);
                            obtainedItemEmbedBuilder(message, itemsObtainedArray, eventParams)    
                        }
                    }
                }
            }
        })
    }
}

function obtainedItemEmbedBuilder(message, itemobtained, eventParams){
    message.channel.send(message.author + " " + eventParams.emoji + " " + eventParams.userPetName + " also fetched `" + itemobtained[0].itemname + "`" )
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