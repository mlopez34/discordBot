'use strict'
var profileDB = require("./profileDB.js");
var reputation = require("./reputation.js")
var commands = require("./commands")
// functions for disassembling an item

function individualRoll(gotCurrentLevelDust, gotCrystal, crystalChance, cutoff, possibleItems, rarityOfDisassemble, canGetCrystal){
    // do an individual roll based on parameters and return the item
    var itemReturnedObject = { item: [], cutoffIncrease : 0, crystalChanceIncrease : 0 }

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
        if ( ( !gotCrystal && canGetCrystal ) || ( rarityOfDisassemble && canGetCrystal ) ){
            // do a roll with crystal in mind
            var CRYSTAL_CHANCE = crystalChance
            var itemRoll = Math.floor(Math.random() * 10000) + 1;
            if (itemRoll > CRYSTAL_CHANCE){
                // got elemental crystal - roll for the elemental crystal to get
                var adjustedListOfObtainableItems = filterListOfObtainableItems(possibleItems, rarityOfDisassemble, true, true)
                var itemToGetRoll = Math.floor( Math.random() * adjustedListOfObtainableItems.length);
                itemReturnedObject.item.push( JSON.parse(JSON.stringify(adjustedListOfObtainableItems[itemToGetRoll] ) ))
                itemReturnedObject.item[0].itemAmount = 1
                itemReturnedObject.gotCrystal = true;
                itemReturnedObject.crystalChanceIncrease = 2500
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
                        itemReturnedObject.item.push( JSON.parse(JSON.stringify( adjustedListOfObtainableItems[itemToGetRoll] ) ))
                        var itemCount = Math.floor(Math.random() * 1000) + 1;
                        if (itemCount > 900){
                            itemReturnedObject.item[0].itemAmount = 3
                        }else if (itemCount > 450 && itemCount <= 900){
                            itemReturnedObject.item[0].itemAmount = 2
                        }else {
                            itemReturnedObject.item[0].itemAmount = 1
                        }
                        itemReturnedObject.cutoffIncrease = 2000
                    }else{
                        // got current level dust, roll for the amount to get
                        var adjustedListOfObtainableItems = filterListOfObtainableItems(possibleItems, rarityOfDisassemble, true, false)
                        var itemToGetRoll = Math.floor( Math.random() * adjustedListOfObtainableItems.length);
                        itemReturnedObject.item.push( JSON.parse(JSON.stringify( adjustedListOfObtainableItems[itemToGetRoll] ) ))
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
                        itemReturnedObject.cutoffIncrease = 1000
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
            var itemRoll = Math.floor(Math.random() * 10000) + 1;
            if (itemRoll > cutoff){
                // got dust now roll if current level dust or higher level dust
                var itemLevel = Math.floor(Math.random() * 10000) + 1;
                if (itemLevel > 8000){
                    var adjustedListOfObtainableItems = filterListOfObtainableItems(possibleItems, rarityOfDisassemble, false, false)
                    var itemToGetRoll = Math.floor( Math.random() * adjustedListOfObtainableItems.length);
                    itemReturnedObject.item.push( JSON.parse(JSON.stringify( adjustedListOfObtainableItems[itemToGetRoll] ) ))
                    // got higher level dust, now roll for the amount to get
                    var itemCount = Math.floor(Math.random() * 1000) + 1;
                    if (itemCount > 900){
                        itemReturnedObject.item[0].itemAmount = 3
                    }else if (itemCount > 450 && itemCount <= 900){
                        itemReturnedObject.item[0].itemAmount = 2
                    }else {
                        itemReturnedObject.item[0].itemAmount = 1
                    }
                    itemReturnedObject.cutoffIncrease = 2000
                }else{
                    var adjustedListOfObtainableItems = filterListOfObtainableItems(possibleItems, rarityOfDisassemble, true, false)
                    var itemToGetRoll = Math.floor( Math.random() * adjustedListOfObtainableItems.length);
                    itemReturnedObject.item.push( JSON.parse(JSON.stringify( adjustedListOfObtainableItems[itemToGetRoll] ) ))
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
                    itemReturnedObject.cutoffIncrease = 1000
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

    // if a crystal was obtained make it harder to get another crystal
    // if current level dust was obtained make it harder to get another dust

    if (itemReturnedObject.gotCrystal == undefined ){
        itemReturnedObject.gotCrystal = gotCrystal
    }
    if (itemReturnedObject.gotCurrentLevelDust == undefined){
        itemReturnedObject.gotCurrentLevelDust = gotCurrentLevelDust
    }

    if (itemReturnedObject.cutoffIncrease == 0){
        itemReturnedObject.cutoffIncrease = -800
    }
    if (itemReturnedObject.crystalChanceIncrease == 0){
        itemReturnedObject.crystalChanceIncrease = -150
    }

    return itemReturnedObject
}

function rollForItems(rarityOfDisassemble, numberOfItems, possibleItems, templelevel){
    var itemsCollected = [] // RETURNED BACK
    var gotCurrentLevelDust = false
    var gotCrystal = false
    var currentCuttoff = 7500
    var crystalChance = 10000
    var crystalChanceIncrease = 0
    for (var i = 0; i < numberOfItems; i++){
        if (rarityOfDisassemble == "rare"){
            crystalChance = 10150 + crystalChanceIncrease
        }else if (rarityOfDisassemble == "rare+"){
            crystalChance = 9500 + crystalChanceIncrease
        }else if (rarityOfDisassemble == "rare++"){
            crystalChance = 8500 + crystalChanceIncrease
        }else if (rarityOfDisassemble == "rare+++"){
            crystalChance = 7500 + crystalChanceIncrease
        }else if (rarityOfDisassemble == "ancient"){
            crystalChance = 9500 + crystalChanceIncrease
        }else if (rarityOfDisassemble == "ancient+"){
            crystalChance = 8000 + crystalChanceIncrease
        }else if (rarityOfDisassemble == "ancient++"){
            crystalChance = 7500 + crystalChanceIncrease
        }else if (rarityOfDisassemble == "ancient+++"){
            crystalChance = 5500 + crystalChanceIncrease
        }else if (rarityOfDisassemble == "artifact"){
            crystalChance = 7000 + crystalChanceIncrease
        }
        let canGetCrystal = calculateCanGetCrystal(rarityOfDisassemble, templelevel )
        var indivRoll = individualRoll(gotCurrentLevelDust, gotCrystal, crystalChance, currentCuttoff, possibleItems, rarityOfDisassemble, canGetCrystal)
        itemsCollected.push(indivRoll.item[0])
        currentCuttoff = currentCuttoff + indivRoll.cutoffIncrease
        crystalChanceIncrease = crystalChanceIncrease + indivRoll.crystalChanceIncrease
        gotCurrentLevelDust = indivRoll.gotCurrentLevelDust
        gotCrystal = indivRoll.gotCrystal
    }
    
    // based on the rarityOfDisassemble we will get specific items
    // the first roll should be guaranteed whatever (essence, shard, crystal)
    // rares are essences, ancients are shards, artifacts are crystals
    // the first roll should be for the above ^ and only amount
    // roll for a regular shard/crystal, or elemental shard, crystal   80 - 20

    // *** elemental
    // rares can give fire, earth, water
    // ancients can give lightning, ice, wind
    // artifacts can give shadow, spirit, steel

    // the cutoff should go up (lower chance to get next one) or down, depending on the previous roll

    return itemsCollected
}

function calculateCanGetCrystal(rarityOfDisassemble, templelevel){
    if (templelevel >= 9 
    && (rarityOfDisassemble.startsWith("artifact") 
    || rarityOfDisassemble.startsWith("ancient") 
    || rarityOfDisassemble.startsWith("rare")) ){
        return true
    }else if (templelevel >= 5
    && (rarityOfDisassemble.startsWith("ancient") 
    || rarityOfDisassemble.startsWith("rare")) ){
        return true
    }else if (templelevel >= 4
    && ( rarityOfDisassemble.startsWith("rare") ) ){
        return true
    }
    return false
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
        crystalRarity: [ "ancient", "rare" ]
    },
    "ancient+": {
        level: 3,
        essenceRarity: "ancient",
        crystalRarity: [ "ancient", "rare" ]
    },
    "ancient++": {
        level: 4,
        essenceRarity: "ancient",
        crystalRarity: [ "ancient", "rare" ]
    },
    "ancient+++": {
        level: 5,
        essenceRarity: "ancient",
        crystalRarity: [ "ancient", "rare" ]
    },
    "artifact": {
        level: 2,
        essenceRarity: "artifact",
        crystalRarity: ["artifact", "ancient", "rare" ] 
    }
}

var armamentEssenceLevels = {
    "rare": {
        level: 1,
        essenceRarity: "rare",
        crystalRarity: "rare",
        essenceEmoji: "🔹",
        crystalEmoji: ":rosette:"
    },
    "rare+": {
        level: 2,
        essenceRarity: "rare",
        crystalRarity: "rare",
        essenceEmoji: "🔹",
        crystalEmoji: ":rosette:"
    },
    "rare++": {
        level: 3,
        essenceRarity: "rare",
        crystalRarity: "rare",
        essenceEmoji: "🔹",
        crystalEmoji: ":rosette:"
    },
    "rare+++": {
        level: 4,
        essenceRarity: "rare",
        crystalRarity: "rare",
        essenceEmoji: "🔹",
        crystalEmoji: ":rosette:"
    },
    "rare++++": {
        level: 5,
        essenceRarity: "rare",
        crystalRarity: "rare",
        essenceEmoji: "🔹",
        crystalEmoji: ":rosette:"
    },
    "ancient": {
        level: 1,
        essenceRarity: "ancient",
        crystalRarity: "ancient",
        essenceEmoji: "🔸",
        crystalEmoji: ":rosette:"
    },
    "ancient+": {
        level: 2,
        essenceRarity: "ancient",
        crystalRarity: "ancient",
        essenceEmoji: "🔸",
        crystalEmoji: ":rosette:"
    },
    "ancient++": {
        level: 3,
        essenceRarity: "ancient",
        crystalRarity: "ancient",
        essenceEmoji: "🔸",
        crystalEmoji: ":rosette:"
    },
    "ancient+++": {
        level: 4,
        essenceRarity: "ancient",
        crystalRarity: "ancient",
        essenceEmoji: "🔸",
        crystalEmoji: ":rosette:"
    },
    "ancient++++": {
        level: 5,
        essenceRarity: "ancient",
        crystalRarity: "ancient",
        essenceEmoji: "🔸",
        crystalEmoji: ":rosette:"
    },
    "artifact": {
        level: 1,
        essenceRarity: "artifact",
        crystalRarity: "artifact",
        essenceEmoji: "💠",
        crystalEmoji: ":rosette:"
    },
    "myth": {
        level: 2,
        essenceRarity: "artifact",
        crystalRarity: "artifact",
        essenceEmoji: "💠",
        crystalEmoji: ":rosette:"
    },
    "myth+": {
        level: 3,
        essenceRarity: "artifact",
        crystalRarity: "artifact",
        essenceEmoji: "💠",
        crystalEmoji: ":rosette:"
    },
    "myth++": {
        level: 3,
        essenceRarity: "artifact",
        crystalRarity: "artifact",
        essenceEmoji: "💠",
        crystalEmoji: ":rosette:"
    },
    "myth+++": {
        level: 4,
        essenceRarity: "artifact",
        crystalRarity: "artifact",
        essenceEmoji: "💠",
        crystalEmoji: ":rosette:"
    },
    "myth++++": {
        level: 5,
        essenceRarity: "artifact",
        crystalRarity: "artifact",
        essenceEmoji: "💠",
        crystalEmoji: ":rosette:"
    }
}

module.exports.getRarityOfItemGemCanCreateArmamentFor = function(item){
    for (var i in armamentEssenceLevels){
        if (armamentEssenceLevels[i].level == item.essencelevel){
            if (armamentEssenceLevels[i].essenceRarity == item.essencerarity){
                return i
            }
            if (armamentEssenceLevels[i].crystalRarity == item.crystalrarity){
                return i
            }
        }
    }
}

module.exports.getEmojiBasedOnRarityToCraftFor = function(item){
    for (var i in armamentEssenceLevels){
        if (armamentEssenceLevels[i].level == item.essencelevel){
            if (armamentEssenceLevels[i].essenceRarity == item.essencerarity){
                return armamentEssenceLevels[i].essenceEmoji
            }
            if (armamentEssenceLevels[i].crystalRarity == item.crystalrarity){
                return armamentEssenceLevels[i].crystalEmoji
            }
        }
    }
}

 //// TODO: do something here with crystalrarity
 /*
Temple - 4 - elemental crystals rare items
temple - 5 - elemental crystals ancient items
temple - 8 craft ancient items
temple - 9 - elemental crystals artiact items
temple - 10 - craft artifacts and amulets
temple - 12 - craft lvl 40 items
 */
module.exports.checkRequirements = function(item, itemToCreateArmament, itemlevelrequirement){
    var itemRarity = itemToCreateArmament.itemraritycategory
    if (itemlevelrequirement >= 40){
        itemRarity = itemRarity + "+"
    }
    var requirements = armamentEssenceLevels[itemRarity]
    if (requirements){
        if (item.essencelevel){
            if (item.essencelevel == requirements.level && item.essencerarity == requirements.essenceRarity){
                return true
            }else{
                return false
            }
        }else{
            return false
        }
    }else{
        return false
    }
}

module.exports.rollForArmamentStats = function(itemToCreateArmament){
    // based on the item rarity that we're crafting an armament for, we'll roll for the stats
    var itemRarity = itemToCreateArmament.itemraritycategory
    var itemSlot = itemToCreateArmament.itemslot
    var itemMainOffensiveStat = "physical"
    var itemMainDefensiveStat = "armor"
    if (itemToCreateArmament.mdplus > itemToCreateArmament.adplus){
        itemMainOffensiveStat = "magical"
    }
    if (itemToCreateArmament.spiritplus > itemToCreateArmament.armorplus){
        itemMainDefensiveStat = "spirit"
    }
    // set floors and ceilings for the stats based on itemRarity
    // distributions will not be equal, 65% of the time between 1/2 of the floor and ceilings
    // 20% of time other 25% of the floor and ceilings
    // 15% of the time will be other 25% of floor and ceilings

    // weapons give MORE offensive stat - give LESS defensive stat
    // chest / legs / helm give MORE defensive stat - give LESS critical strike rating
    // back / belt / wrist give MORE critical strike rating - give LESS HP
    // feet / hands / shoulders give MORE HP - give LESS offensive stat

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
        statMap.hpplus.ceiling = 30

        statMap.adplus.floor = -18
        statMap.adplus.ceiling = 20

        statMap.mdplus.floor = -18
        statMap.mdplus.ceiling = 20

        statMap.armorplus.floor = -20
        statMap.armorplus.ceiling = 30

        statMap.spiritplus.floor = -20
        statMap.spiritplus.ceiling = 30

        statMap.critplus.floor = -20
        statMap.critplus.ceiling = 20

        statMap.luckplus.floor = -20
        statMap.luckplus.ceiling = 20

    }else if (itemRarity == "rare+"){
        statMap.hpplus.floor = -22
        statMap.hpplus.ceiling = 40

        statMap.adplus.floor = -16
        statMap.adplus.ceiling = 30

        statMap.mdplus.floor = -16
        statMap.mdplus.ceiling = 30

        statMap.armorplus.floor = -18
        statMap.armorplus.ceiling = 45

        statMap.spiritplus.floor = -18
        statMap.spiritplus.ceiling = 45

        statMap.critplus.floor = -20
        statMap.critplus.ceiling = 30

        statMap.luckplus.floor = -25
        statMap.luckplus.ceiling = 35

    }else if (itemRarity == "rare++"){
        statMap.hpplus.floor = -25
        statMap.hpplus.ceiling = 50

        statMap.adplus.floor = -21
        statMap.adplus.ceiling = 38

        statMap.mdplus.floor = -21
        statMap.mdplus.ceiling = 38

        statMap.armorplus.floor = -30
        statMap.armorplus.ceiling = 60

        statMap.spiritplus.floor = -30
        statMap.spiritplus.ceiling = 60

        statMap.critplus.floor = -25
        statMap.critplus.ceiling = 40

        statMap.luckplus.floor = -30
        statMap.luckplus.ceiling = 50

    }else if (itemRarity == "rare+++"){
        statMap.hpplus.floor = -29
        statMap.hpplus.ceiling = 65

        statMap.adplus.floor = -27
        statMap.adplus.ceiling = 44

        statMap.mdplus.floor = -27
        statMap.mdplus.ceiling = 44

        statMap.armorplus.floor = -33
        statMap.armorplus.ceiling = 70

        statMap.spiritplus.floor = -33
        statMap.spiritplus.ceiling = 70

        statMap.critplus.floor = -25
        statMap.critplus.ceiling = 50

        statMap.luckplus.floor = -33
        statMap.luckplus.ceiling = 70

    }else if (itemRarity == "ancient"){
        statMap.hpplus.floor = -21
        statMap.hpplus.ceiling = 45

        statMap.adplus.floor = -18
        statMap.adplus.ceiling = 45

        statMap.mdplus.floor = -18
        statMap.mdplus.ceiling = 45

        statMap.armorplus.floor = -25
        statMap.armorplus.ceiling = 55

        statMap.spiritplus.floor = -25
        statMap.spiritplus.ceiling = 55

        statMap.critplus.floor = -30
        statMap.critplus.ceiling = 45

        statMap.luckplus.floor = -30
        statMap.luckplus.ceiling = 33

    }else if (itemRarity == "ancient+"){
        statMap.hpplus.floor = -23
        statMap.hpplus.ceiling = 65

        statMap.adplus.floor = -20
        statMap.adplus.ceiling = 60

        statMap.mdplus.floor = -20
        statMap.mdplus.ceiling = 60

        statMap.armorplus.floor = -31
        statMap.armorplus.ceiling = 75

        statMap.spiritplus.floor = -31
        statMap.spiritplus.ceiling = 75

        statMap.critplus.floor = -23
        statMap.critplus.ceiling = 62

        statMap.luckplus.floor = -23
        statMap.luckplus.ceiling = 50

    }else if (itemRarity == "ancient++"){
        statMap.hpplus.floor = -27
        statMap.hpplus.ceiling = 79

        statMap.adplus.floor = -22
        statMap.adplus.ceiling = 80

        statMap.mdplus.floor = -22
        statMap.mdplus.ceiling = 80

        statMap.armorplus.floor = -35
        statMap.armorplus.ceiling = 95

        statMap.spiritplus.floor = -35
        statMap.spiritplus.ceiling = 95

        statMap.critplus.floor = -25
        statMap.critplus.ceiling = 75

        statMap.luckplus.floor = -25
        statMap.luckplus.ceiling = 65

    }else if (itemRarity == "ancient+++"){
        statMap.hpplus.floor = -30
        statMap.hpplus.ceiling = 110

        statMap.adplus.floor = -30
        statMap.adplus.ceiling = 100

        statMap.mdplus.floor = -30
        statMap.mdplus.ceiling = 100

        statMap.armorplus.floor = -40
        statMap.armorplus.ceiling = 125

        statMap.spiritplus.floor = -40
        statMap.spiritplus.ceiling = 125

        statMap.critplus.floor = -30
        statMap.critplus.ceiling = 90

        statMap.luckplus.floor = -30
        statMap.luckplus.ceiling = 80

    }
    else if (itemRarity == "artifact"){
        statMap.hpplus.floor = -25
        statMap.hpplus.ceiling = 40

        statMap.adplus.floor = -20
        statMap.adplus.ceiling = 55

        statMap.mdplus.floor = -20
        statMap.mdplus.ceiling = 55

        statMap.armorplus.floor = -35
        statMap.armorplus.ceiling = 70

        statMap.spiritplus.floor = -35
        statMap.spiritplus.ceiling = 70

        statMap.critplus.floor = -20
        statMap.critplus.ceiling = 45

        statMap.luckplus.floor = -20
        statMap.luckplus.ceiling = 45
    }else if (itemRarity == "myth"){
        statMap.hpplus.floor = -35
        statMap.hpplus.ceiling = 60

        statMap.adplus.floor = -40
        statMap.adplus.ceiling = 75

        statMap.mdplus.floor = -40
        statMap.mdplus.ceiling = 75

        statMap.armorplus.floor = -55
        statMap.armorplus.ceiling = 100

        statMap.spiritplus.floor = -55
        statMap.spiritplus.ceiling = 100

        statMap.critplus.floor = -40
        statMap.critplus.ceiling = 65

        statMap.luckplus.floor = -40
        statMap.luckplus.ceiling = 55
    }else if (itemRarity == "myth+"){
        statMap.hpplus.floor = -135
        statMap.hpplus.ceiling = 260

        statMap.adplus.floor = -140
        statMap.adplus.ceiling = 275

        statMap.mdplus.floor = -140
        statMap.mdplus.ceiling = 275

        statMap.armorplus.floor = -155
        statMap.armorplus.ceiling = 300

        statMap.spiritplus.floor = -55
        statMap.spiritplus.ceiling = 300

        statMap.critplus.floor = -140
        statMap.critplus.ceiling = 165

        statMap.luckplus.floor = -40
        statMap.luckplus.ceiling = 55
    }else if (itemRarity == "myth++"){
        statMap.hpplus.floor = -135
        statMap.hpplus.ceiling = 260

        statMap.adplus.floor = -140
        statMap.adplus.ceiling = 275

        statMap.mdplus.floor = -140
        statMap.mdplus.ceiling = 275

        statMap.armorplus.floor = -155
        statMap.armorplus.ceiling = 300

        statMap.spiritplus.floor = -55
        statMap.spiritplus.ceiling = 300

        statMap.critplus.floor = -140
        statMap.critplus.ceiling = 165

        statMap.luckplus.floor = -140
        statMap.luckplus.ceiling = 155
    }else if (itemRarity == "myth+++"){
        statMap.hpplus.floor = -135
        statMap.hpplus.ceiling = 260

        statMap.adplus.floor = -140
        statMap.adplus.ceiling = 275

        statMap.mdplus.floor = -140
        statMap.mdplus.ceiling = 275

        statMap.armorplus.floor = -155
        statMap.armorplus.ceiling = 300

        statMap.spiritplus.floor = -55
        statMap.spiritplus.ceiling = 300

        statMap.critplus.floor = -140
        statMap.critplus.ceiling = 165

        statMap.luckplus.floor = -140
        statMap.luckplus.ceiling = 155
    }

    if (itemSlot == "weapon"
    || itemSlot == "finger"
    || itemSlot == "neck"){

        statMap.adplus.floor = statMap.adplus.floor + 3
        statMap.adplus.ceiling = statMap.adplus.ceiling + 10

        statMap.mdplus.floor = statMap.mdplus.floor + 3
        statMap.mdplus.ceiling = statMap.mdplus.ceiling + 10

        statMap.armorplus.floor = statMap.armorplus.floor - 5
        statMap.armorplus.ceiling = statMap.armorplus.ceiling - 20

        statMap.spiritplus.floor = statMap.spiritplus.floor - 5
        statMap.spiritplus.ceiling = statMap.spiritplus.ceiling - 20

    }else if (itemSlot == "chest"
    || itemSlot == "legs"
    || itemSlot == "head"){

        statMap.armorplus.floor = statMap.armorplus.floor + 5
        statMap.armorplus.ceiling = statMap.armorplus.ceiling + 20

        statMap.spiritplus.floor = statMap.spiritplus.floor + 5
        statMap.spiritplus.ceiling = statMap.spiritplus.ceiling + 20

        statMap.critplus.floor = statMap.critplus.floor - 4 
        statMap.critplus.ceiling = statMap.critplus.ceiling - 8

    
    }else if (itemSlot == "back"
    || itemSlot == "belt"
    || itemSlot == "wrist"){
        statMap.critplus.floor = statMap.critplus.floor + 4 
        statMap.critplus.ceiling = statMap.critplus.ceiling + 8

        statMap.hpplus.floor = statMap.hpplus.floor - 4
        statMap.hpplus.ceiling = statMap.hpplus.ceiling - 10


    }else if (itemSlot == "feet"
    || itemSlot == "hands"
    || itemSlot == "shoulders"){
        statMap.hpplus.floor = statMap.hpplus.floor + 4
        statMap.hpplus.ceiling = statMap.hpplus.ceiling + 10

        statMap.adplus.floor = statMap.adplus.floor - 3
        statMap.adplus.ceiling = statMap.adplus.ceiling - 10

        statMap.mdplus.floor = statMap.mdplus.floor - 3
        statMap.mdplus.ceiling = statMap.mdplus.ceiling - 10

    }
    
    if (itemToCreateArmament.itemlevelrequirement >= 40
    && itemToCreateArmament.rpglevelrequirement >= 40){
        // add floors and ceilings based on a percentage of the item's stats
        let itemhpplus = itemToCreateArmament.hpplus
        let itemadplus = itemToCreateArmament.attackdmgplus
        let itemmdplus = itemToCreateArmament.magicdmgplus
        let itemarmorplus = itemToCreateArmament.armorplus
        let itemspiritplus = itemToCreateArmament.spiritplus
        if (itemmdplus > itemadplus){
            itemadplus = itemmdplus
        }else{
            itemmdplus = itemadplus
        }
        if (itemarmorplus > itemspiritplus){
            itemspiritplus = itemarmorplus
        }else{
            itemarmorplus = itemspiritplus
        }
        if (itemRarity == "rare"){
            statMap.hpplus.floor = statMap.hpplus.floor + ( itemhpplus * 0.1 * -1 )
            statMap.hpplus.ceiling = statMap.hpplus.ceiling + ( itemhpplus * 0.23 )
    
            statMap.adplus.floor = statMap.adplus.floor + (itemadplus * 0.1 * -1 )
            statMap.adplus.ceiling = statMap.adplus.ceiling + ( itemadplus * 0.23 )
    
            statMap.mdplus.floor = statMap.mdplus.floor + (itemmdplus * 0.1 * -1 )
            statMap.mdplus.ceiling = statMap.mdplus.ceiling + ( itemmdplus * 0.23 )
    
            statMap.armorplus.floor = statMap.armorplus.floor + (itemarmorplus * 0.05 * -1 )
            statMap.armorplus.ceiling = statMap.armorplus.ceiling + ( itemarmorplus * 0.20 )
    
            statMap.spiritplus.floor = statMap.spiritplus.floor + (itemspiritplus * 0.05 * -1 )
            statMap.spiritplus.ceiling = statMap.spiritplus.ceiling + ( itemspiritplus * 0.20 )
    
            statMap.critplus.floor = statMap.critplus.floor + (statMap.critplus.floor * 0.23 * -1 )
            statMap.critplus.ceiling = statMap.critplus.ceiling + ( statMap.critplus.ceiling * 0.23 )
    
            statMap.luckplus.floor = statMap.luckplus.floor + (statMap.luckplus.floor * 0.23 * -1 )
            statMap.luckplus.ceiling = statMap.luckplus.ceiling + ( statMap.luckplus.ceiling * 0.23 )
    
        }else if (itemRarity == "rare+"){
            statMap.hpplus.floor = statMap.hpplus.floor + ( itemhpplus * 0.1 * -1 )
            statMap.hpplus.ceiling = statMap.hpplus.ceiling + ( itemhpplus * 0.23 )
    
            statMap.adplus.floor = statMap.adplus.floor + (itemadplus * 0.1 * -1 )
            statMap.adplus.ceiling = statMap.adplus.ceiling + ( itemadplus * 0.23 )
    
            statMap.mdplus.floor = statMap.mdplus.floor + (itemmdplus * 0.1 * -1 )
            statMap.mdplus.ceiling = statMap.mdplus.ceiling + ( itemmdplus * 0.23 )
    
            statMap.armorplus.floor = statMap.armorplus.floor + (itemarmorplus * 0.05 * -1 )
            statMap.armorplus.ceiling = statMap.armorplus.ceiling + ( itemarmorplus * 0.20 )
    
            statMap.spiritplus.floor = statMap.spiritplus.floor + (itemspiritplus * 0.05 * -1 )
            statMap.spiritplus.ceiling = statMap.spiritplus.ceiling + ( itemspiritplus * 0.20 )
    
            statMap.critplus.floor = statMap.critplus.floor + (statMap.critplus.floor * 0.23 * -1 )
            statMap.critplus.ceiling = statMap.critplus.ceiling + ( statMap.critplus.ceiling * 0.23 )
    
            statMap.luckplus.floor = statMap.luckplus.floor + (statMap.luckplus.floor * 0.23 * -1 )
            statMap.luckplus.ceiling = statMap.luckplus.ceiling + ( statMap.luckplus.ceiling * 0.23 )

    
        }else if (itemRarity == "rare++"){
            statMap.hpplus.floor = statMap.hpplus.floor + ( itemhpplus * 0.1 * -1 )
            statMap.hpplus.ceiling = statMap.hpplus.ceiling + ( itemhpplus * 0.23 )
    
            statMap.adplus.floor = statMap.adplus.floor + (itemadplus * 0.1 * -1 )
            statMap.adplus.ceiling = statMap.adplus.ceiling + ( itemadplus * 0.23 )
    
            statMap.mdplus.floor = statMap.mdplus.floor + (itemmdplus * 0.1 * -1 )
            statMap.mdplus.ceiling = statMap.mdplus.ceiling + ( itemmdplus * 0.23 )
    
            statMap.armorplus.floor = statMap.armorplus.floor + (itemarmorplus * 0.05 * -1 )
            statMap.armorplus.ceiling = statMap.armorplus.ceiling + ( itemarmorplus * 0.20 )
    
            statMap.spiritplus.floor = statMap.spiritplus.floor + (itemspiritplus * 0.05 * -1 )
            statMap.spiritplus.ceiling = statMap.spiritplus.ceiling + ( itemspiritplus * 0.20 )
    
            statMap.critplus.floor = statMap.critplus.floor + (statMap.critplus.floor * 0.23 * -1 )
            statMap.critplus.ceiling = statMap.critplus.ceiling + ( statMap.critplus.ceiling * 0.23 )
    
            statMap.luckplus.floor = statMap.luckplus.floor + (statMap.luckplus.floor * 0.23 * -1 )
            statMap.luckplus.ceiling = statMap.luckplus.ceiling + ( statMap.luckplus.ceiling * 0.23 )

    
        }else if (itemRarity == "rare+++"){
            statMap.hpplus.floor = statMap.hpplus.floor + ( itemhpplus * 0.1 * -1 )
            statMap.hpplus.ceiling = statMap.hpplus.ceiling + ( itemhpplus * 0.23 )
    
            statMap.adplus.floor = statMap.adplus.floor + (itemadplus * 0.1 * -1 )
            statMap.adplus.ceiling = statMap.adplus.ceiling + ( itemadplus * 0.23 )
    
            statMap.mdplus.floor = statMap.mdplus.floor + (itemmdplus * 0.1 * -1 )
            statMap.mdplus.ceiling = statMap.mdplus.ceiling + ( itemmdplus * 0.23 )
    
            statMap.armorplus.floor = statMap.armorplus.floor + (itemarmorplus * 0.05 * -1 )
            statMap.armorplus.ceiling = statMap.armorplus.ceiling + ( itemarmorplus * 0.20 )
    
            statMap.spiritplus.floor = statMap.spiritplus.floor + (itemspiritplus * 0.05 * -1 )
            statMap.spiritplus.ceiling = statMap.spiritplus.ceiling + ( itemspiritplus * 0.20 )
    
            statMap.critplus.floor = statMap.critplus.floor + (statMap.critplus.floor * 0.23 * -1 )
            statMap.critplus.ceiling = statMap.critplus.ceiling + ( statMap.critplus.ceiling * 0.23 )
    
            statMap.luckplus.floor = statMap.luckplus.floor + (statMap.luckplus.floor * 0.23 * -1 )
            statMap.luckplus.ceiling = statMap.luckplus.ceiling + ( statMap.luckplus.ceiling * 0.23 )

    
        }else if (itemRarity == "ancient"){
            statMap.hpplus.floor = statMap.hpplus.floor + ( itemhpplus * 0.1 * -1 )
            statMap.hpplus.ceiling = statMap.hpplus.ceiling + ( itemhpplus * 0.23 )
    
            statMap.adplus.floor = statMap.adplus.floor + (itemadplus * 0.1 * -1 )
            statMap.adplus.ceiling = statMap.adplus.ceiling + ( itemadplus * 0.23 )
    
            statMap.mdplus.floor = statMap.mdplus.floor + (itemmdplus * 0.1 * -1 )
            statMap.mdplus.ceiling = statMap.mdplus.ceiling + ( itemmdplus * 0.23 )
    
            statMap.armorplus.floor = statMap.armorplus.floor + (itemarmorplus * 0.05 * -1 )
            statMap.armorplus.ceiling = statMap.armorplus.ceiling + ( itemarmorplus * 0.20 )
    
            statMap.spiritplus.floor = statMap.spiritplus.floor + (itemspiritplus * 0.05 * -1 )
            statMap.spiritplus.ceiling = statMap.spiritplus.ceiling + ( itemspiritplus * 0.20 )
    
            statMap.critplus.floor = statMap.critplus.floor + (statMap.critplus.floor * 0.23 * -1 )
            statMap.critplus.ceiling = statMap.critplus.ceiling + ( statMap.critplus.ceiling * 0.23 )
    
            statMap.luckplus.floor = statMap.luckplus.floor + (statMap.luckplus.floor * 0.23 * -1 )
            statMap.luckplus.ceiling = statMap.luckplus.ceiling + ( statMap.luckplus.ceiling * 0.23 )

    
        }else if (itemRarity == "ancient+"){
            statMap.hpplus.floor = statMap.hpplus.floor + ( itemhpplus * 0.1 * -1 )
            statMap.hpplus.ceiling = statMap.hpplus.ceiling + ( itemhpplus * 0.23 )
    
            statMap.adplus.floor = statMap.adplus.floor + (itemadplus * 0.1 * -1 )
            statMap.adplus.ceiling = statMap.adplus.ceiling + ( itemadplus * 0.23 )
    
            statMap.mdplus.floor = statMap.mdplus.floor + (itemmdplus * 0.1 * -1 )
            statMap.mdplus.ceiling = statMap.mdplus.ceiling + ( itemmdplus * 0.23 )
    
            statMap.armorplus.floor = statMap.armorplus.floor + (itemarmorplus * 0.05 * -1 )
            statMap.armorplus.ceiling = statMap.armorplus.ceiling + ( itemarmorplus * 0.20 )
    
            statMap.spiritplus.floor = statMap.spiritplus.floor + (itemspiritplus * 0.05 * -1 )
            statMap.spiritplus.ceiling = statMap.spiritplus.ceiling + ( itemspiritplus * 0.20 )
    
            statMap.critplus.floor = statMap.critplus.floor + (statMap.critplus.floor * 0.23 * -1 )
            statMap.critplus.ceiling = statMap.critplus.ceiling + ( statMap.critplus.ceiling * 0.23 )
    
            statMap.luckplus.floor = statMap.luckplus.floor + (statMap.luckplus.floor * 0.23 * -1 )
            statMap.luckplus.ceiling = statMap.luckplus.ceiling + ( statMap.luckplus.ceiling * 0.23 )

    
        }else if (itemRarity == "ancient++"){
            statMap.hpplus.floor = statMap.hpplus.floor + ( itemhpplus * 0.1 * -1 )
            statMap.hpplus.ceiling = statMap.hpplus.ceiling + ( itemhpplus * 0.23 )
    
            statMap.adplus.floor = statMap.adplus.floor + (itemadplus * 0.1 * -1 )
            statMap.adplus.ceiling = statMap.adplus.ceiling + ( itemadplus * 0.23 )
    
            statMap.mdplus.floor = statMap.mdplus.floor + (itemmdplus * 0.1 * -1 )
            statMap.mdplus.ceiling = statMap.mdplus.ceiling + ( itemmdplus * 0.23 )
    
            statMap.armorplus.floor = statMap.armorplus.floor + (itemarmorplus * 0.05 * -1 )
            statMap.armorplus.ceiling = statMap.armorplus.ceiling + ( itemarmorplus * 0.20 )
    
            statMap.spiritplus.floor = statMap.spiritplus.floor + (itemspiritplus * 0.05 * -1 )
            statMap.spiritplus.ceiling = statMap.spiritplus.ceiling + ( itemspiritplus * 0.20 )
    
            statMap.critplus.floor = statMap.critplus.floor + (statMap.critplus.floor * 0.23 * -1 )
            statMap.critplus.ceiling = statMap.critplus.ceiling + ( statMap.critplus.ceiling * 0.23 )
    
            statMap.luckplus.floor = statMap.luckplus.floor + (statMap.luckplus.floor * 0.23 * -1 )
            statMap.luckplus.ceiling = statMap.luckplus.ceiling + ( statMap.luckplus.ceiling * 0.23 )

    
        }else if (itemRarity == "ancient+++"){
            statMap.hpplus.floor = statMap.hpplus.floor + ( itemhpplus * 0.1 * -1 )
            statMap.hpplus.ceiling = statMap.hpplus.ceiling + ( itemhpplus * 0.23 )
    
            statMap.adplus.floor = statMap.adplus.floor + (itemadplus * 0.1 * -1 )
            statMap.adplus.ceiling = statMap.adplus.ceiling + ( itemadplus * 0.23 )
    
            statMap.mdplus.floor = statMap.mdplus.floor + (itemmdplus * 0.1 * -1 )
            statMap.mdplus.ceiling = statMap.mdplus.ceiling + ( itemmdplus * 0.23 )
    
            statMap.armorplus.floor = statMap.armorplus.floor + (itemarmorplus * 0.05 * -1 )
            statMap.armorplus.ceiling = statMap.armorplus.ceiling + ( itemarmorplus * 0.20 )
    
            statMap.spiritplus.floor = statMap.spiritplus.floor + (itemspiritplus * 0.05 * -1 )
            statMap.spiritplus.ceiling = statMap.spiritplus.ceiling + ( itemspiritplus * 0.20 )
    
            statMap.critplus.floor = statMap.critplus.floor + (statMap.critplus.floor * 0.23 * -1 )
            statMap.critplus.ceiling = statMap.critplus.ceiling + ( statMap.critplus.ceiling * 0.23 )
    
            statMap.luckplus.floor = statMap.luckplus.floor + (statMap.luckplus.floor * 0.23 * -1 )
            statMap.luckplus.ceiling = statMap.luckplus.ceiling + ( statMap.luckplus.ceiling * 0.23 )
    
        }
        else if (itemRarity == "artifact"){
            statMap.hpplus.floor = statMap.hpplus.floor + ( itemhpplus * 0.1 * -1 )
            statMap.hpplus.ceiling = statMap.hpplus.ceiling + ( itemhpplus * 0.23 )
    
            statMap.adplus.floor = statMap.adplus.floor + (itemadplus * 0.1 * -1 )
            statMap.adplus.ceiling = statMap.adplus.ceiling + ( itemadplus * 0.23 )
    
            statMap.mdplus.floor = statMap.mdplus.floor + (itemmdplus * 0.1 * -1 )
            statMap.mdplus.ceiling = statMap.mdplus.ceiling + ( itemmdplus * 0.23 )
    
            statMap.armorplus.floor = statMap.armorplus.floor + (itemarmorplus * 0.05 * -1 )
            statMap.armorplus.ceiling = statMap.armorplus.ceiling + ( itemarmorplus * 0.20 )
    
            statMap.spiritplus.floor = statMap.spiritplus.floor + (itemspiritplus * 0.05 * -1 )
            statMap.spiritplus.ceiling = statMap.spiritplus.ceiling + ( itemspiritplus * 0.20 )
    
            statMap.critplus.floor = statMap.critplus.floor + (statMap.critplus.floor * 0.23 * -1 )
            statMap.critplus.ceiling = statMap.critplus.ceiling + ( statMap.critplus.ceiling * 0.23 )
    
            statMap.luckplus.floor = statMap.luckplus.floor + (statMap.luckplus.floor * 0.23 * -1 )
            statMap.luckplus.ceiling = statMap.luckplus.ceiling + ( statMap.luckplus.ceiling * 0.23 )

        }else if (itemRarity == "myth"){
            statMap.hpplus.floor = statMap.hpplus.floor + ( itemhpplus * 0.1 * -1 )
            statMap.hpplus.ceiling = statMap.hpplus.ceiling + ( itemhpplus * 0.23 )
    
            statMap.adplus.floor = statMap.adplus.floor + (itemadplus * 0.1 * -1 )
            statMap.adplus.ceiling = statMap.adplus.ceiling + ( itemadplus * 0.23 )
    
            statMap.mdplus.floor = statMap.mdplus.floor + (itemmdplus * 0.1 * -1 )
            statMap.mdplus.ceiling = statMap.mdplus.ceiling + ( itemmdplus * 0.23 )
    
            statMap.armorplus.floor = statMap.armorplus.floor + (itemarmorplus * 0.05 * -1 )
            statMap.armorplus.ceiling = statMap.armorplus.ceiling + ( itemarmorplus * 0.20 )
    
            statMap.spiritplus.floor = statMap.spiritplus.floor + (itemspiritplus * 0.05 * -1 )
            statMap.spiritplus.ceiling = statMap.spiritplus.ceiling + ( itemspiritplus * 0.20 )
    
            statMap.critplus.floor = statMap.critplus.floor + (statMap.critplus.floor * 0.23 * -1 )
            statMap.critplus.ceiling = statMap.critplus.ceiling + ( statMap.critplus.ceiling * 0.23 )
    
            statMap.luckplus.floor = statMap.luckplus.floor + (statMap.luckplus.floor * 0.23 * -1 )
            statMap.luckplus.ceiling = statMap.luckplus.ceiling + ( statMap.luckplus.ceiling * 0.23 )

        }
    
        if (itemSlot == "weapon"
        || itemSlot == "finger"
        || itemSlot == "neck"){
            statMap.adplus.floor = statMap.adplus.floor + (itemadplus * 0.06 )
            statMap.adplus.ceiling = statMap.adplus.ceiling + ( itemadplus * 0.06 )
    
            statMap.mdplus.floor = statMap.mdplus.floor + (itemadplus * 0.06 )
            statMap.mdplus.ceiling = statMap.mdplus.ceiling + ( itemadplus * 0.06 )
    
            statMap.armorplus.floor = statMap.armorplus.floor - (itemarmorplus * 0.06 )
            statMap.armorplus.ceiling = statMap.armorplus.ceiling - ( itemarmorplus * 0.06 )
    
            statMap.spiritplus.floor = statMap.spiritplus.floor - (itemspiritplus * 0.06)
            statMap.spiritplus.ceiling = statMap.spiritplus.ceiling - (itemspiritplus * 0.06 )
    
        }else if (itemSlot == "chest"
        || itemSlot == "legs"
        || itemSlot == "head"){
    
            statMap.armorplus.floor = statMap.armorplus.floor + (itemarmorplus * 0.06 )
            statMap.armorplus.ceiling = statMap.armorplus.ceiling + ( itemarmorplus * 0.06 )
    
            statMap.spiritplus.floor = statMap.spiritplus.floor + (itemspiritplus * 0.06)
            statMap.spiritplus.ceiling = statMap.spiritplus.ceiling + (itemspiritplus * 0.06 )
    
            statMap.critplus.floor = statMap.critplus.floor - ( statMap.critplus.floor * 0.06)
            statMap.critplus.ceiling = statMap.critplus.ceiling - ( statMap.critplus.ceiling * 0.06 )
    
        
        }else if (itemSlot == "back"
        || itemSlot == "belt"
        || itemSlot == "wrist"){
            statMap.critplus.floor = statMap.critplus.floor + ( statMap.critplus.floor * 0.06)
            statMap.critplus.ceiling = statMap.critplus.ceiling + ( statMap.critplus.ceiling * 0.06 )
    
            statMap.hpplus.floor = statMap.hpplus.floor - (itemhpplus * 0.06 )
            statMap.hpplus.ceiling = statMap.hpplus.ceiling - (itemhpplus * 0.06 )
    
    
        }else if (itemSlot == "feet"
        || itemSlot == "hands"
        || itemSlot == "shoulders"){
            statMap.hpplus.floor = statMap.hpplus.floor + (itemhpplus * 0.06 )
            statMap.hpplus.ceiling = statMap.hpplus.ceiling + (itemhpplus * 0.06 )
    
            statMap.adplus.floor = statMap.adplus.floor - (itemadplus * 0.06 )
            statMap.adplus.ceiling = statMap.adplus.ceiling - (itemadplus * 0.06 )
    
            statMap.mdplus.floor = statMap.mdplus.floor - ( itemadplus * 0.06 )
            statMap.mdplus.ceiling = statMap.mdplus.ceiling - ( itemadplus * 0.06 )
    
        }
    }

    // roll for stat distribution
    for (var stat in statMap){
        var distributionRoll = Math.floor(Math.random() * 100) + 1;
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
    
        }else if (distributionRoll > 37){
            // roll for 50-75% of distribution
            var range = statceiling + (statfloor * -1)
            var newstatfloor = statceiling - (range * 0.5)
            var newstatceiling = statceiling - (range * 0.25)
            var newRange = newstatceiling + (newstatfloor * -1 )
    
            var statRoll = Math.floor( Math.random() *  newRange ) + newstatfloor;
            armamentStats[stat] = Math.ceil( statRoll )
        }else if (distributionRoll > 15){
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
            if ( listOfObtainableItems[i].essencelevel < essenceInfo.level
            && essenceInfo.crystalRarity.indexOf(listOfObtainableItems[i].crystalrarity) > -1){
                // this one should be included          
                adjustedList.push(listOfObtainableItems[i])
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

module.exports.performDisassemble =  function(message, discordUserId, itemsToDisassemble, itemProfile, templelevel, cb){
    if (itemsToDisassemble){
        // first check the kind of item to disassemble
        console.log()
        // if rare, or ancient, or artifact, get pool of items to obtain
        var numberOfItems = 3
        var validDisassemble = false
        var itemsObtained = []

        if ( itemProfile.itemraritycategory == "rare" && !itemProfile.isseed){
            numberOfItems = 3
            validDisassemble = true
        }else if (itemProfile.itemraritycategory == "rare+"){
            numberOfItems = 4
            validDisassemble = true
        }else if (itemProfile.itemraritycategory == "rare++"){
            numberOfItems = 5
            validDisassemble = true
        }else if (itemProfile.itemraritycategory == "rare+++"){
            numberOfItems = 7
            validDisassemble = true
        }else if (itemProfile.itemraritycategory == "ancient"){
            numberOfItems = 5
            validDisassemble = true
        }else if (itemProfile.itemraritycategory == "ancient+"){
            numberOfItems = 6
            validDisassemble = true
        }else if (itemProfile.itemraritycategory == "ancient++"){
            numberOfItems = 7
            validDisassemble = true
        }else if (itemProfile.itemraritycategory == "ancient+++"){
            numberOfItems = 8
            validDisassemble = true
        }else if (itemProfile.itemraritycategory == "artifact"){
            numberOfItems = 7
            validDisassemble = true
        }
        // can get commons, uncommons, and shards (shards will be used for armaments, crafting, building)
        // console.log(itemsObtained);
        if (validDisassemble){
            itemsObtained = rollForItems(itemProfile.itemraritycategory, numberOfItems, listOfObtainableItems, templelevel )        
            profileDB.addNewItemToUser(discordUserId, itemsObtained, function(error, response){
                if (error){
                    console.log(error)
                    cb(error);
                }else{
                    // added item, use the disassembled item
                    profileDB.bulkUpdateItemStatus( [ itemsToDisassemble ], "disassembled", function(updateBulkErr, updateBulkRes){
                        if (updateBulkErr){
                            cb(updateBulkErr);
                        }else{
                            cb(null, itemsObtained);
                        }
                    })
                }
            });
        }else{
            message.channel.send("Can't disassemble that item")
            cb("Can't disassemble that item")
        }
        
    }
}

module.exports.initializeDissassembleItems = function(itemsMapById, callback){
    // go through all items, if they are essences or crystals then add to list
    for (var i in itemsMapById){
        if (itemsMapById[i].essencerarity || itemsMapById[i].crystalrarity){
            listOfObtainableItems.push(itemsMapById[i])
        }
    }
    callback()
}

var listOfObtainableItems = []