'use strict'
var profileDB = require("./profileDB.js");
var reputation = require("./reputation.js")
// functions for disassembling an item

function individualRoll(gotCurrentLevelDust, gotCrystal, crystalChance, cutoff, possibleItems){
    // do an individual roll based on parameters and return the item
    var itemReturnedObject = { item: [], cutoffIncrease : 0 }

    if (!gotCurrentLevelDust){
        // only roll possibleItems current level

        // got current level dust, roll for the amount to get
        var itemCount = Math.floor(Math.random() * 1000) + 1;
        if (itemCount > 950){
            // get 5

            /////// THIS NEEDS WORK
            var itemToGetRoll = Math.floor( Math.random() * possibleItems.length-1 );
            possibleItems[itemToGetRoll].itemAmount = 5
        }else if (itemCount > 750 && itemCount <= 900){
            // get 4
        }else if (itemCount > 450 && itemCount <= 750){
            // get 3
        }else if (itemCount > 150 && itemCount <= 450){
            // get 2
        }else {
            // get 1
        }
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
                    // got elemental crystal
                    // roll for the elemental crystal to get
                    var itemToGetRoll = Math.floor( Math.random() * possibleItems.length-1 );
                    possibleItems[itemToGetRoll].itemAmount = 1
                }else{
                    // got regular crystal
                    // push the crystal of current level
                }
            }else{
                // didnt get a crystal then roll for current and above level dust
                var itemRoll = Math.floor(Math.random() * 1000) + 1;
                if (itemRoll > cutoff){
                    // got dust now roll if current level dust or higher level dust
                    var itemLevel = Math.floor(Math.random() * 10000) + 1;
                    if (itemLevel > 8000){
                        // got higher level dust, now roll for the amount to get
                        var itemCount = Math.floor(Math.random() * 1000) + 1;
                        if (itemCount > 900){
                            // get 3
                        }else if (itemCount > 450 && itemCount <= 900){
                            // get 2
                        }else {
                            // get 1
                        }
                    }else{
                        // got current level dust, roll for the amount to get
                        var itemCount = Math.floor(Math.random() * 1000) + 1;
                        if (itemCount > 950){
                            // get 5
                        }else if (itemCount > 750 && itemCount <= 900){
                            // get 4
                        }else if (itemCount > 450 && itemCount <= 750){
                            // get 3
                        }else if (itemCount > 150 && itemCount <= 450){
                            // get 2
                        }else {
                            // get 1
                        }
                    }
                }else if ( itemRoll > 6000 ){
                    // get an uncommon item
                    var itemCount = Math.floor(Math.random() * 1000) + 1;
                    if (itemCount > 900){
                        // get 3
                    }else if (itemCount > 450 && itemCount <= 900){
                        // get 2
                    }else {
                        // get 1
                    }
                }else {
                    // get a common item
                    var itemCount = Math.floor(Math.random() * 1000) + 1;
                    if (itemCount > 950){
                        // get 5
                    }else if (itemCount > 750 && itemCount <= 900){
                        // get 4
                    }else if (itemCount > 450 && itemCount <= 750){
                        // get 3
                    }else if (itemCount > 150 && itemCount <= 450){
                        // get 2
                    }else {
                        // get 1
                    }
                }
            }
        }else{
            // do a roll for only current and above level dust
            var itemRoll = Math.floor(Math.random() * 1000) + 1;
            if (itemRoll > cutoff){
                // got dust now roll if current level dust or higher level dust
                var itemLevel = Math.floor(Math.random() * 10000) + 1;
                if (itemLevel > 8000){
                    // got higher level dust, now roll for the amount to get
                    var itemCount = Math.floor(Math.random() * 1000) + 1;
                    if (itemCount > 900){
                        // get 3
                    }else if (itemCount > 450 && itemCount <= 900){
                        // get 2
                    }else {
                        // get 1
                    }
                }else{
                    // got current level dust, roll for the amount to get
                    var itemCount = Math.floor(Math.random() * 1000) + 1;
                    if (itemCount > 950){
                        // get 5
                    }else if (itemCount > 750 && itemCount <= 900){
                        // get 4
                    }else if (itemCount > 450 && itemCount <= 750){
                        // get 3
                    }else if (itemCount > 150 && itemCount <= 450){
                        // get 2
                    }else {
                        // get 1
                    }
                }
            }else if ( itemRoll > 6000 ){
                // get an uncommon item
                var itemCount = Math.floor(Math.random() * 1000) + 1;
                if (itemCount > 900){
                    // get 3
                }else if (itemCount > 450 && itemCount <= 900){
                    // get 2
                }else {
                    // get 1
                }
            }else {
                // get a common item
                var itemCount = Math.floor(Math.random() * 1000) + 1;
                if (itemCount > 950){
                    // get 5
                }else if (itemCount > 750 && itemCount <= 900){
                    // get 4
                }else if (itemCount > 450 && itemCount <= 750){
                    // get 3
                }else if (itemCount > 150 && itemCount <= 450){
                    // get 2
                }else {
                    // get 1
                }
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
        var item = individualRoll(gotCurrentLevelDust, gotCrystal, crystalChance, currentCuttoff, possibleItems)
        itemsCollected.push(item.item)
        // TODO: 
        // increase the cutoff from item.cutoffIncrease
        // checkoff if we got currentLevelDust
        // checkoff if we got a crystal
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

module.exports.performDisassemble =  function(message, discordUserId, itemsToDisassemble, listOfObtainableItems, cb){
    if (itemsToDisassemble.length == 1){
        // first check the kind of item to disassemble
        console.log()
        // if rare, or ancient, or artifact, get pool of items to obtain
        var numberOfItems = 3
        var itemsObtained = []

        if ( itemsToDisassemble.itemraritycategory == "rare" ){
            // set the number of items
        }
        else if (itemsToDisassemble.itemraritycategory == "rare+"){

        }else if (itemsToDisassemble.itemraritycategory == "rare++"){
            
        }else if (itemsToDisassemble.itemraritycategory == "rare+++"){

        }else if (itemsToDisassemble.itemraritycategory == "ancient"){
            
        }else if (itemsToDisassemble.itemraritycategory == "ancient+"){
            
        }else if (itemsToDisassemble.itemraritycategory == "ancient++"){
            
        }else if (itemsToDisassemble.itemraritycategory == "ancient+++"){
            
        }else if (itemsToDisassemble.itemraritycategory == "artifact"){
            
        }
        itemsObtained = rollForItems(itemsToDisassemble.itemraritycategory, numberOfItems, listOfObtainableItems )        
        // can get commons, uncommons, and shards (shards will be used for armaments, crafting, building)
        
        // console.log(itemsObtained);
        profileDB.addNewItemToUser(discordUserId, itemsObtained, function(error, response){
            if (error){
                // console.log("couldnt add item");
                cb("error");
            }
            else{
                // added item, use the disassembled item
                profileDB.bulkUpdateItemStatus(itemsToDisassemble, "used", function(updateBulkErr, updateBulkRes){
                    if (updateBulkErr){
                        // console.log(updateBulkErr);
                        cb(updateBulkErr);
                    }
                    else{
                        // console.log(updateBulkRes);
                        cb(null, itemsObtained);
                    }
                })
            }
        });
    }
}
