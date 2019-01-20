'use strict'
var profileDB = require("./profileDB.js");
var reputation = require("./reputation.js")
var commands = require("./commands")
// functions for disassembling an item

function individualRoll(gotCurrentLevelDust, gotCrystal, crystalChance, cutoff, possibleItems, rarityOfDisassemble){
    // do an individual roll based on parameters and return the item
    var itemReturnedObject = { item: [], cutoffIncrease : 0 }

    if (!gotCurrentLevelDust){
        // only roll possibleItems current level
        var adjustedListOfObtainableItems = filterListOfObtainableItems(possibleItems, rarityOfDisassemble, true, false)
        // got current level dust, roll for the amount to get
        var itemToGetRoll = Math.floor( Math.random() * adjustedListOfObtainableItems.length);
        itemReturnedObject.item.push( adjustedListOfObtainableItems[itemToGetRoll] )
        var itemCount = Math.floor(Math.random() * 1000) + 1;
        if (itemCount > 950){
            itemReturnedObject.item[0].itemAmount = 5
        }else if (itemCount > 750 && itemCount <= 900){
            itemReturnedObject.item[0].itemAmount = 4
        }else if (itemCount > 450 && itemCount <= 750){
            itemReturnedObject.item[0].itemAmount = 3
        }else if (itemCount > 150 && itemCount <= 450){
            itemReturnedObject.item[0].itemAmount = 2
        }else {
            itemReturnedObject.item[0].itemAmount = 1
        }
        itemReturnedObject.gotCurrentLevelDust = true;
    }else{
        if (!gotCrystal){
            // do a roll with crystal in mind
            var CRYSTAL_CHANCE = crystalChance
            var itemRoll = Math.floor(Math.random() * 1000) + 1;
            if (itemRoll > CRYSTAL_CHANCE){
                // got a crystal - only current level crystal
                // roll for type of crystal to obtain
                var crystalRoll = Math.floor(Math.random() * 1000) + 1;
                if (crystalRoll > 8000){
                    // got elemental crystal - roll for the elemental crystal to get
                    var adjustedListOfObtainableItems = filterListOfObtainableItems(possibleItems, rarityOfDisassemble, false, true)
                    var itemToGetRoll = Math.floor( Math.random() * adjustedListOfObtainableItems.length);
                    itemReturnedObject.item.push( adjustedListOfObtainableItems[itemToGetRoll] )
                    itemReturnedObject.item[0].itemAmount = 1
                }else{
                    // got regular crystal push the crystal of current level
                    var adjustedListOfObtainableItems = filterListOfObtainableItems(possibleItems, rarityOfDisassemble, true, true)
                    var itemToGetRoll = Math.floor( Math.random() * adjustedListOfObtainableItems.length);
                    itemReturnedObject.item.push( adjustedListOfObtainableItems[itemToGetRoll] )
                    itemReturnedObject.item[0].itemAmount = 1
                }
                itemReturnedObject.gotCrystal = true;
            }else{
                // didnt get a crystal then roll for current and above level dust
                var itemRoll = Math.floor(Math.random() * 10000) + 1;
                if (itemRoll > cutoff){
                    // got dust now roll if current level dust or higher level dust
                    var itemLevel = Math.floor(Math.random() * 10000) + 1;
                    if (itemLevel > 8000){
                        // got higher level dust, now roll for the amount to get
                        var adjustedListOfObtainableItems = filterListOfObtainableItems(possibleItems, rarityOfDisassemble, false, false)
                        var itemToGetRoll = Math.floor( Math.random() * adjustedListOfObtainableItems.length);
                        itemReturnedObject.item.push( adjustedListOfObtainableItems[itemToGetRoll] )
                        var itemCount = Math.floor(Math.random() * 1000) + 1;
                        if (itemCount > 900){
                            itemReturnedObject.item[0].itemAmount = 3
                        }else if (itemCount > 450 && itemCount <= 900){
                            itemReturnedObject.item[0].itemAmount = 2
                        }else {
                            itemReturnedObject.item[0].itemAmount = 1
                        }
                    }else{
                        // got current level dust, roll for the amount to get
                        var adjustedListOfObtainableItems = filterListOfObtainableItems(possibleItems, rarityOfDisassemble, true, false)
                        var itemToGetRoll = Math.floor( Math.random() * adjustedListOfObtainableItems.length);
                        itemReturnedObject.item.push( adjustedListOfObtainableItems[itemToGetRoll] )
                        var itemCount = Math.floor(Math.random() * 1000) + 1;
                        if (itemCount > 950){
                            itemReturnedObject.item[0].itemAmount = 5
                        }else if (itemCount > 750 && itemCount <= 900){
                            itemReturnedObject.item[0].itemAmount = 4
                        }else if (itemCount > 450 && itemCount <= 750){
                            itemReturnedObject.item[0].itemAmount = 3
                        }else if (itemCount > 150 && itemCount <= 450){
                            itemReturnedObject.item[0].itemAmount = 2
                        }else {
                            itemReturnedObject.item[0].itemAmount = 1
                        }
                    }
                }else if ( itemRoll > 6000 ){
                    // get an uncommon item
                    var uncommonItems = commands.getItemsByRarity("uncommon")
                    // roll for the item
                    var itemRoll = Math.floor(Math.random() * uncommonItems.length);
                    uncommonItems[itemRoll].itemAmount = 3
                    itemReturnedObject.item.push( uncommonItems[itemRoll] )

                }else {
                    // get a common item
                    var commonItems = commands.getItemsByRarity("common")
                    // roll for the item
                    var itemRoll = Math.floor(Math.random() * commonItems.length);
                    commonItems[itemRoll].itemAmount = 5
                    itemReturnedObject.item.push( commonItems[itemRoll] )
                }
            }
        }else{
            // do a roll for only current and above level dust
            var itemRoll = Math.floor(Math.random() * 1000) + 1;
            if (itemRoll > cutoff){
                // got dust now roll if current level dust or higher level dust
                var itemLevel = Math.floor(Math.random() * 10000) + 1;
                if (itemLevel > 8000){
                    var adjustedListOfObtainableItems = filterListOfObtainableItems(possibleItems, rarityOfDisassemble, false, false)
                    var itemToGetRoll = Math.floor( Math.random() * adjustedListOfObtainableItems.length);
                    itemReturnedObject.item.push( adjustedListOfObtainableItems[itemToGetRoll] )
                    // got higher level dust, now roll for the amount to get
                    var itemCount = Math.floor(Math.random() * 1000) + 1;
                    if (itemCount > 900){
                        itemReturnedObject.item[0].itemAmount = 3
                    }else if (itemCount > 450 && itemCount <= 900){
                        itemReturnedObject.item[0].itemAmount = 2
                    }else {
                        itemReturnedObject.item[0].itemAmount = 1
                    }
                }else{
                    var adjustedListOfObtainableItems = filterListOfObtainableItems(possibleItems, rarityOfDisassemble, true, false)
                    var itemToGetRoll = Math.floor( Math.random() * adjustedListOfObtainableItems.length);
                    itemReturnedObject.item.push( adjustedListOfObtainableItems[itemToGetRoll] )
                    // got current level dust, roll for the amount to get
                    var itemCount = Math.floor(Math.random() * 1000) + 1;
                    if (itemCount > 950){
                        itemReturnedObject.item[0].itemAmount = 5
                    }else if (itemCount > 750 && itemCount <= 900){
                        itemReturnedObject.item[0].itemAmount = 4
                    }else if (itemCount > 450 && itemCount <= 750){
                        itemReturnedObject.item[0].itemAmount = 3
                    }else if (itemCount > 150 && itemCount <= 450){
                        itemReturnedObject.item[0].itemAmount = 2
                    }else {
                        itemReturnedObject.item[0].itemAmount = 1
                    }
                }
            }else if ( itemRoll > 6000 ){
                // get an uncommon item
                var uncommonItems = commands.getItemsByRarity("uncommon")
                // roll for the item
                var itemRoll = Math.floor(Math.random() * uncommonItems.length);
                uncommonItems[itemRoll].itemAmount = 3
                itemReturnedObject.item.push( uncommonItems[itemRoll] )

            }else {
                // get a common item
                var commonItems = commands.getItemsByRarity("common")
                // roll for the item
                var itemRoll = Math.floor(Math.random() * commonItems.length);
                commonItems[itemRoll].itemAmount = 5
                itemReturnedObject.item.push( commonItems[itemRoll] )
            }
        }
    }

    if (itemReturnedObject.gotCrystal == undefined ){
        itemReturnedObject.gotCrystal = gotCrystal
    }
    if (itemReturnedObject.gotCurrentLevelDust == undefined){
        itemReturnedObject.gotCurrentLevelDust = gotCurrentLevelDust
    }

    return itemReturnedObject
}

function rollForItems(rarityOfDisassemble, numberOfItems, possibleItems ){
    var itemsCollected = [] // RETURNED BACK
    var gotCurrentLevelDust = false
    var gotCrystal = false
    var currentCuttoff = 7500
    for (var i = 0; i < numberOfItems; i++){
        var crystalChance = 10000
        if (rarityOfDisassemble == "rare"){
            crystalChance = 10000
        }else if (rarityOfDisassemble == "rare+"){
            crystalChance = 10000
        }else if (rarityOfDisassemble == "rare++"){
            crystalChance = 9000
        }else if (rarityOfDisassemble == "rare+++"){
            crystalChance = 8000
        }else if (rarityOfDisassemble == "ancient"){
            crystalChance = 10000
        }else if (rarityOfDisassemble == "ancient+"){
            crystalChance = 9000
        }else if (rarityOfDisassemble == "ancient++"){
            crystalChance = 8000
        }else if (rarityOfDisassemble == "ancient+++"){
            crystalChance = 7000
        }else if (rarityOfDisassemble == "artifact"){
            crystalChance = 0
        }
        var indivRoll = individualRoll(gotCurrentLevelDust, gotCrystal, crystalChance, currentCuttoff, possibleItems, rarityOfDisassemble)
        itemsCollected.push(indivRoll.item[0])
        currentCuttoff = currentCuttoff + indivRoll.cutoffIncrease
        gotCurrentLevelDust = indivRoll.gotCurrentLevelDust
        gotCrystal = indivRoll.gotCrystal
    }
    
    // based on the rarityOfDisassemble we will get specific items
    // the first roll should be guaranteed whatever (essence, shard, crystal)
    // rares are essences, ancients are shards, artifacts are crystals
    // the first roll should be for the above ^ and only amount
    // roll for a regular shard/crystal, or elemental shard, crystal   80 - 20

    // *** elemental
    // rares can give fire, ice, water
    // ancients can give lightning, earth
    // artifacts can give shadow, life


    // rares have small chance at shards 75 - 25, ancients have small chance at crystals 75 - 25
    // rares have small chance at higher shards - step above, 87 - 13, **
    // the cutoff roll for these should start at a certain number, and if you get one
    // the cutoff should go up (lower chance to get next one) + 10

    return itemsCollected
}

const rarityEssenceLevels = {
    "rare": {
        level: 2,
        essenceRarity: "rare",
        crystalRarity: "rare"
    },
    "rare+": {
        level: 3,
        essenceRarity: "rare",
        crystalRarity: "rare"
    },
    "rare++": {
        level: 4,
        essenceRarity: "rare",
        crystalRarity: "rare"
    },
    "rare+++": {
        level: 5,
        essenceRarity: "rare",
        crystalRarity: "rare"
    },
    "ancient": {
        level: 2,
        essenceRarity: "ancient",
        crystalRarity: "ancient"
    },
    "ancient+": {
        level: 3,
        essenceRarity: "ancient",
        crystalRarity: "ancient"
    },
    "ancient++": {
        level: 4,
        essenceRarity: "ancient",
        crystalRarity: "ancient"
    },
    "ancient+++": {
        level: 5,
        essenceRarity: "ancient",
        crystalRarity: "ancient"
    },
    "artifact": {
        level: 2,
        essenceRarity: "artifact",
        crystalRarity: "artifact"
    }
}

var armamentEssenceLevels = {
    "rare": {
        level: 1,
        essenceRarity: "rare",
        crystalRarity: "rare"
    },
    "rare+": {
        level: 2,
        essenceRarity: "rare",
        crystalRarity: "rare"
    },
    "rare++": {
        level: 3,
        essenceRarity: "rare",
        crystalRarity: "rare"
    },
    "rare+++": {
        level: 4,
        essenceRarity: "rare",
        crystalRarity: "rare"
    },
    "ancient": {
        level: 1,
        essenceRarity: "ancient",
        crystalRarity: "ancient"
    },
    "ancient+": {
        level: 2,
        essenceRarity: "ancient",
        crystalRarity: "ancient"
    },
    "ancient++": {
        level: 3,
        essenceRarity: "ancient",
        crystalRarity: "ancient"
    },
    "ancient+++": {
        level: 4,
        essenceRarity: "ancient",
        crystalRarity: "ancient"
    },
    "artifact": {
        level: 1,
        essenceRarity: "artifact",
        crystalRarity: "artifact"
    },
    "artifact": {
        level: 1,
        essenceRarity: "artifact",
        crystalRarity: "artifact"
    }
}

module.exports.checkRequirements = function(item, itemToCreateArmament){
    var itemRarity = itemToCreateArmament.itemraritycategory
    var requirements = armamentEssenceLevels[itemRarity]
    if (item.essencelevel){
        if (item.essencelevel == requirements.level && item.essencerarity == requirements.essenceRarity){
            return true
        }else{
            return false
        }
    }else{
        return false
    }
    
}

module.exports.rollForArmamentStats = function(itemToCreateArmament){
    // based on the item rarity that we're crafting an armament for, we'll roll for the stats
    // additional criteria to check - what slot it occupies
    var itemRarity = itemToCreateArmament.itemraritycategory
    // set floors and ceilings for the stats based on itemRarity
    // based on rarity we will also get "extra bonuses" added ie if its a rare, we get + 5
    // if we get a ancient++ we get +24
    // once the distributions are done, the extra bonuses are added to the rolls
    // if initially we get hpplus -10 then the extra bonus would kick in and give the roll -8 instead

    // distributions will not be equal, 65% of the time between 1/2 of the floor and ceilings
    // 20% of time other 25% of the floor and ceilings
    // 15% of the time will be other 25% of floor and ceilings

    var armamentStats = {
        hpplus: 0,
        adplus: 0,
        mdplus: 0,
        armorplus: 0,
        spiritplus: 0,
        luckplus: 0,
        critplus: 0
    }

    var statMap = {
        hpplus: {
            floor: -10,
            ceiling: 10
        },
        adplus: {
            floor: -10,
            ceiling: 10
        },
        mdplus: {
            floor: -10,
            ceiling: 10
        },
        armorplus: {
            floor: -10,
            ceiling: 10
        },
        spiritplus: {
            floor: -10,
            ceiling: 10
        },
        critplus: {
            floor: -10,
            ceiling: 10
        },
        luckplus: {
            floor: -10,
            ceiling: 10
        }
    }

    if (itemRarity == "rare"){
        statMap.hpplus.floor = -20
        statMap.hpplus.ceiling = 95

        statMap.adplus.floor = -18
        statMap.adplus.ceiling = 55

        statMap.mdplus.floor = -18
        statMap.mdplus.ceiling = 55

        statMap.armorplus.floor = -18
        statMap.armorplus.ceiling = 55

        statMap.spiritplus.floor = -20
        statMap.spiritplus.ceiling = 95

        statMap.critplus.floor = -20
        statMap.critplus.ceiling = 95

        statMap.luckplus.floor = -20
        statMap.luckplus.ceiling = 95

    }else if (itemRarity == "rare+"){
        statMap.hpplus.floor = -10
        statMap.hpplus.ceiling = 19

        statMap.adplus.floor = -20
        statMap.adplus.ceiling = 95

        statMap.mdplus.floor = -20
        statMap.mdplus.ceiling = 95

        statMap.armorplus.floor = -20
        statMap.armorplus.ceiling = 95

        statMap.spiritplus.floor = -20
        statMap.spiritplus.ceiling = 95

        statMap.critplus.floor = -20
        statMap.critplus.ceiling = 95

        statMap.luckplus.floor = -20
        statMap.luckplus.ceiling = 95

    }else if (itemRarity == "rare++"){
        statMap.hpplus.floor = -9
        statMap.hpplus.ceiling = 28

        statMap.adplus.floor = -20
        statMap.adplus.ceiling = 95

        statMap.mdplus.floor = -20
        statMap.mdplus.ceiling = 95

        statMap.armorplus.floor = -20
        statMap.armorplus.ceiling = 95

        statMap.spiritplus.floor = -20
        statMap.spiritplus.ceiling = 95

        statMap.critplus.floor = -20
        statMap.critplus.ceiling = 95

        statMap.luckplus.floor = -20
        statMap.luckplus.ceiling = 95

    }else if (itemRarity == "rare+++"){
        statMap.hpplus.floor = -8
        statMap.hpplus.ceiling = 40

        statMap.adplus.floor = -20
        statMap.adplus.ceiling = 95

        statMap.mdplus.floor = -20
        statMap.mdplus.ceiling = 95

        statMap.armorplus.floor = -20
        statMap.armorplus.ceiling = 95

        statMap.spiritplus.floor = -20
        statMap.spiritplus.ceiling = 95

        statMap.critplus.floor = -20
        statMap.critplus.ceiling = 95

        statMap.luckplus.floor = -20
        statMap.luckplus.ceiling = 95

    }else if (itemRarity == "ancient"){
        statMap.hpplus.floor = -25
        statMap.hpplus.ceiling = 35

        statMap.adplus.floor = -20
        statMap.adplus.ceiling = 95

        statMap.mdplus.floor = -20
        statMap.mdplus.ceiling = 95

        statMap.armorplus.floor = -20
        statMap.armorplus.ceiling = 95

        statMap.spiritplus.floor = -20
        statMap.spiritplus.ceiling = 95

        statMap.critplus.floor = -20
        statMap.critplus.ceiling = 95

        statMap.luckplus.floor = -20
        statMap.luckplus.ceiling = 95

    }else if (itemRarity == "ancient+"){
        statMap.hpplus.floor = -23
        statMap.hpplus.ceiling = 45

        statMap.adplus.floor = -20
        statMap.adplus.ceiling = 95

        statMap.mdplus.floor = -20
        statMap.mdplus.ceiling = 95

        statMap.armorplus.floor = -20
        statMap.armorplus.ceiling = 95

        statMap.spiritplus.floor = -20
        statMap.spiritplus.ceiling = 95

        statMap.critplus.floor = -20
        statMap.critplus.ceiling = 95

        statMap.luckplus.floor = -20
        statMap.luckplus.ceiling = 95

    }else if (itemRarity == "ancient++"){
        statMap.hpplus.floor = -22
        statMap.hpplus.ceiling = 68

        statMap.adplus.floor = -20
        statMap.adplus.ceiling = 95

        statMap.mdplus.floor = -20
        statMap.mdplus.ceiling = 95

        statMap.armorplus.floor = -20
        statMap.armorplus.ceiling = 95

        statMap.spiritplus.floor = -20
        statMap.spiritplus.ceiling = 95

        statMap.critplus.floor = -20
        statMap.critplus.ceiling = 95

        statMap.luckplus.floor = -20
        statMap.luckplus.ceiling = 95

    }else if (itemRarity == "ancient+++"){
        statMap.hpplus.floor = -20
        statMap.hpplus.ceiling = 95

        statMap.adplus.floor = -20
        statMap.adplus.ceiling = 95

        statMap.mdplus.floor = -20
        statMap.mdplus.ceiling = 95

        statMap.armorplus.floor = -20
        statMap.armorplus.ceiling = 95

        statMap.spiritplus.floor = -20
        statMap.spiritplus.ceiling = 95

        statMap.critplus.floor = -20
        statMap.critplus.ceiling = 95

        statMap.luckplus.floor = -20
        statMap.luckplus.ceiling = 95

    }else if (itemRarity == "myth"){
        statMap.hpplus.floor = -8
        statMap.hpplus.ceiling = 24

        statMap.adplus.floor = -20
        statMap.adplus.ceiling = 95

        statMap.mdplus.floor = -20
        statMap.mdplus.ceiling = 95

        statMap.armorplus.floor = -20
        statMap.armorplus.ceiling = 95

        statMap.spiritplus.floor = -20
        statMap.spiritplus.ceiling = 95

        statMap.critplus.floor = -20
        statMap.critplus.ceiling = 95

        statMap.luckplus.floor = -20
        statMap.luckplus.ceiling = 95
    }

    // roll for stat distribution
    var distributionRoll = Math.floor(Math.random() * 100) + 1;

    for (var stat in statMap){
        var statfloor = statMap[stat].floor
        var statceiling = statMap[stat].ceiling
        if (distributionRoll > 80){
            // roll for top 25% of distribution
            var range = statceiling + (statfloor * -1)
            var newstatfloor = statceiling - (range * 0.25)
            var newstatceiling = statceiling
            var newRange = newstatceiling + (newstatfloor * -1 )
    
            var statRoll = Math.floor( Math.random() *  newRange ) + newstatfloor;
            // floor is new floor and ceiling remains same
            armamentStats[stat] = Math.ceil( statRoll )
    
        }else if (distributionRoll > 20){
            // roll for 50-75% of distribution
            var range = statceiling + (statfloor * -1)
            var newstatfloor = statceiling - (range * 0.5)
            var newstatceiling = statceiling - (range * 0.25)
            var newRange = newstatceiling + (newstatfloor * -1 )
    
            var statRoll = Math.floor( Math.random() *  newRange ) + newstatfloor;
            armamentStats[stat] = Math.ceil( statRoll )
        }else if (distributionRoll > 5){
            // roll for 25%-50% of distribution
            var range = statceiling + (statfloor * -1)
            var newstatfloor = statceiling - (range * 0.75)
            var newstatceiling = statceiling - (range * 0.5)
            var newRange = newstatceiling + (newstatfloor * -1 )
    
            var statRoll = Math.floor( Math.random() *  newRange ) + newstatfloor;
            armamentStats[stat] = Math.ceil( statRoll )
        }else{
            // roll for 0-25% of distribution
            var range = statceiling + (statfloor * -1)
            var newstatceiling = statceiling - (range * 0.75)
            var newstatfloor = statfloor
            var newRange = newstatceiling + (newstatfloor * -1 )
    
            var statRoll = Math.floor( Math.random() *  newRange ) + newstatfloor;
            armamentStats[stat] = Math.ceil( statRoll )
        }
    }

    return armamentStats
}

function filterListOfObtainableItems(listOfObtainableItems, disassembleRarity, current, crystal){
    var adjustedList = []
    var essenceInfo = rarityEssenceLevels[disassembleRarity]

    for (var i in listOfObtainableItems){
        if (crystal){
            if (current){
                if ( listOfObtainableItems[i].level == essenceInfo.level - 1 
                    && listOfObtainableItems[i].crystalrarity == essenceInfo.crystalRarity){
                    // this one should be included
                    adjustedList.push(listOfObtainableItems[i])
                }
            }else{
                if ( listOfObtainableItems[i].essencelevel == essenceInfo.level 
                    && listOfObtainableItems[i].crystalrarity == essenceInfo.crystalRarity){
                    // this one should be included
                    adjustedList.push(listOfObtainableItems[i])
                }
            }
        }else{
            if (current){
                if ( listOfObtainableItems[i].essencelevel == essenceInfo.level - 1 
                    && listOfObtainableItems[i].essencerarity == essenceInfo.essenceRarity){
                    // this one should be included
                    adjustedList.push(listOfObtainableItems[i])
                }
            }else{
                if ( listOfObtainableItems[i].essencelevel == essenceInfo.level 
                    && listOfObtainableItems[i].essencerarity == essenceInfo.essenceRarity){
                    // this one should be included
                    adjustedList.push(listOfObtainableItems[i])
                }
            }
        }
        
    }
    return adjustedList
}

module.exports.performDisassemble =  function(message, discordUserId, itemsToDisassemble, itemProfile, cb){
    if (itemsToDisassemble){
        // first check the kind of item to disassemble
        console.log()
        // if rare, or ancient, or artifact, get pool of items to obtain
        var numberOfItems = 3
        var itemsObtained = []

        if ( itemProfile.itemraritycategory == "rare" ){
            numberOfItems = 3
        }else if (itemProfile.itemraritycategory == "rare+"){
            numberOfItems = 4
        }else if (itemProfile.itemraritycategory == "rare++"){
            numberOfItems = 5
        }else if (itemProfile.itemraritycategory == "rare+++"){
            numberOfItems = 7
        }else if (itemProfile.itemraritycategory == "ancient"){
            numberOfItems = 5
        }else if (itemProfile.itemraritycategory == "ancient+"){
            numberOfItems = 6
        }else if (itemProfile.itemraritycategory == "ancient++"){
            numberOfItems = 7
        }else if (itemProfile.itemraritycategory == "ancient+++"){
            numberOfItems = 8
        }else if (itemProfile.itemraritycategory == "artifact"){
            numberOfItems = 7
        }
        itemsObtained = rollForItems(itemProfile.itemraritycategory, numberOfItems, listOfObtainableItems )        
        // can get commons, uncommons, and shards (shards will be used for armaments, crafting, building)
        // console.log(itemsObtained);
        profileDB.addNewItemToUser(discordUserId, itemsObtained, function(error, response){
            if (error){
                console.log(error)
                cb(error);
            }
            else{
                // added item, use the disassembled item
                profileDB.bulkUpdateItemStatus( [ itemsToDisassemble ], "disassembled", function(updateBulkErr, updateBulkRes){
                    if (updateBulkErr){
                        cb(updateBulkErr);
                    }
                    else{
                        cb(null, itemsObtained);
                    }
                })
            }
        });
    }
}

module.exports.initializeDissassembleItems = function(itemsMapById, callback){
    // go through all items, if they are essences or crystals then add to list
    for (var i in itemsMapById){
        if (itemsMapById[i].essencerarity){
            listOfObtainableItems.push(itemsMapById[i])
        }
    }
    callback()
}

var listOfObtainableItems = []