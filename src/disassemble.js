'use strict'
var profileDB = require("./profileDB.js");
var reputation = require("./reputation.js")
// functions for disassembling an item

function individualRoll(gotCurrentLevelDust, gotCrystal, crystalChance, cutoff, possibleItems, rarityOfDisassemble){
    // do an individual roll based on parameters and return the item
    var itemReturnedObject = { item: [], cutoffIncrease : 0 }

    if (!gotCurrentLevelDust){
        // only roll possibleItems current level
        var adjustedListOfObtainableItems = filterListOfObtainableItems(possibleItems, rarityOfDisassemble, false, false)
        // got current level dust, roll for the amount to get
        var itemToGetRoll = Math.floor( Math.random() * adjustedListOfObtainableItems.length-1 );
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
                    var itemToGetRoll = Math.floor( Math.random() * adjustedListOfObtainableItems.length-1 );
                    itemReturnedObject.item.push( adjustedListOfObtainableItems[itemToGetRoll] )
                    itemReturnedObject.item[0].itemAmount = 1
                }else{
                    // got regular crystal push the crystal of current level
                    var adjustedListOfObtainableItems = filterListOfObtainableItems(possibleItems, rarityOfDisassemble, true, true)
                    var itemToGetRoll = Math.floor( Math.random() * adjustedListOfObtainableItems.length-1 );
                    itemReturnedObject.item.push( adjustedListOfObtainableItems[itemToGetRoll] )
                    itemReturnedObject.item[0].itemAmount = 1
                }
                itemReturnedObject.gotCrystal = true;
            }else{
                // didnt get a crystal then roll for current and above level dust
                var itemRoll = Math.floor(Math.random() * 1000) + 1;
                if (itemRoll > cutoff){
                    // got dust now roll if current level dust or higher level dust
                    var itemLevel = Math.floor(Math.random() * 10000) + 1;
                    if (itemLevel > 8000){
                        // got higher level dust, now roll for the amount to get
                        var adjustedListOfObtainableItems = filterListOfObtainableItems(possibleItems, rarityOfDisassemble, false, false)
                        var itemToGetRoll = Math.floor( Math.random() * adjustedListOfObtainableItems.length-1 );
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
                        var itemToGetRoll = Math.floor( Math.random() * adjustedListOfObtainableItems.length-1 );
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
                    
                }else {
                    // get a common item
                    
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
                    var itemToGetRoll = Math.floor( Math.random() * adjustedListOfObtainableItems.length-1 );
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
                    var itemToGetRoll = Math.floor( Math.random() * adjustedListOfObtainableItems.length-1 );
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
                
            }else {
                // get a common item
                
            }
        }
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
    "rare++": {
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

function filterListOfObtainableItems(listOfObtainableItems, disassembleRarity, current, crystal){
    var adjustedList = []
    var essenceInfo = rarityEssenceLevels[disassembleRarity]

    for (var i in listOfObtainableItems){
        if (crystal){
            if (current){
                if ( listOfObtainableItems[i].crystalRarity == essenceInfo.level - 1 
                    && listOfObtainableItems[i].crystalRarity == essenceInfo.crystalRarity){
                    // this one should be included
                    adjustedList.push(listOfObtainableItems[i])
                }
            }else{
                if ( listOfObtainableItems[i].essenceLevel == essenceInfo.level 
                    && listOfObtainableItems[i].crystalRarity == essenceInfo.crystalRarity){
                    // this one should be included
                    adjustedList.push(listOfObtainableItems[i])
                }
            }
        }else{
            if (current){
                if ( listOfObtainableItems[i].essenceLevel == essenceInfo.level - 1 
                    && listOfObtainableItems[i].essenceRarity == essenceInfo.essenceRarity){
                    // this one should be included
                    adjustedList.push(listOfObtainableItems[i])
                }
            }else{
                if ( listOfObtainableItems[i].essenceLevel == essenceInfo.level 
                    && listOfObtainableItems[i].essenceRarity == essenceInfo.essenceRarity){
                    // this one should be included
                    adjustedList.push(listOfObtainableItems[i])
                }
            }
        }
        
    }
    return adjustedList
}

module.exports.performDisassemble =  function(message, discordUserId, itemsToDisassemble, listOfObtainableItems, cb){
    if (itemsToDisassemble){
        // first check the kind of item to disassemble
        console.log()
        // if rare, or ancient, or artifact, get pool of items to obtain
        var numberOfItems = 3
        var itemsObtained = []

        if ( itemsToDisassemble.itemraritycategory == "rare" ){
            numberOfItems = 3
        }else if (itemsToDisassemble.itemraritycategory == "rare+"){
            numberOfItems = 4
        }else if (itemsToDisassemble.itemraritycategory == "rare++"){
            numberOfItems = 5
        }else if (itemsToDisassemble.itemraritycategory == "rare+++"){
            numberOfItems = 7
        }else if (itemsToDisassemble.itemraritycategory == "ancient"){
            numberOfItems = 5
        }else if (itemsToDisassemble.itemraritycategory == "ancient+"){
            numberOfItems = 6
        }else if (itemsToDisassemble.itemraritycategory == "ancient++"){
            numberOfItems = 7
        }else if (itemsToDisassemble.itemraritycategory == "ancient+++"){
            numberOfItems = 8
        }else if (itemsToDisassemble.itemraritycategory == "artifact"){
            numberOfItems = 7
        }
        itemsObtained = rollForItems(itemsToDisassemble.itemraritycategory, numberOfItems, listOfObtainableItems )        
        // can get commons, uncommons, and shards (shards will be used for armaments, crafting, building)
        // console.log(itemsObtained);
        profileDB.addNewItemToUser(discordUserId, itemsObtained, function(error, response){
            if (error){
                console.log(error)
                cb(error);
            }
            else{
                // added item, use the disassembled item
                profileDB.bulkUpdateItemStatus(itemsToDisassemble, "disassembled", function(updateBulkErr, updateBulkRes){
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

module.exports.initializeDissassembleItems = function(itemsMapbyId, callback){
    // go through all items, if they are essences or crystals then add to list
    for (var i in itemsMapbyId){
        if (itemsMapbyId[i].essencerarity){
            listOfObtainableItems.push(itemsMapbyId[i])
        }
    }
    callback()
}

var listOfObtainableItems = [

]