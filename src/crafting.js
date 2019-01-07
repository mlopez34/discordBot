'use strict'
var profileDB = require("./profileDB.js");
const Discord = require("discord.js");

// commands used for crafting items from the TEMPLE

// requirements for certain items are listed here

// uses dust from dissassemble + common items + tacos

/*
rares - level 30
rare - level 35
rares - level 40
rares - level 45
ancients - level 30
ancients - level 35
ancients - level 40
ancients - level 45
*/


module.exports.rollForRecipes = function(message, params){
    // userlevel, userzone, templelevel
    var rollForNewRecipe = Math.floor(Math.random() * 1000) + 1;

    if (rollForNewRecipe > 750){
        var possibleRecipesToRollFrom = buildPossibleRecipesArray(params)

        // roll for recipes - number of recipes depends on the templeLevel
        // 3 = 1, 7 = 2, 11 = 3
        var recipesObj = {}
        if (params.templeLevel >= 11){
            var recipesToRoll = 3
            var rollForRecipe1 = Math.floor(Math.random() * possibleRecipesToRollFrom.length)
            var recipe1 = possibleRecipesToRollFrom[rollForRecipe1].itemId
            var rollForRecipe2 = Math.floor(Math.random() * possibleRecipesToRollFrom.length)
            var recipe2 = possibleRecipesToRollFrom[rollForRecipe2].itemId
            var rollForRecipe3 = Math.floor(Math.random() * possibleRecipesToRollFrom.length)
            var recipe3 = possibleRecipesToRollFrom[rollForRecipe3].itemId

            // these should be itemids
            recipesObj.templecraft1id = recipe1
            recipesObj.templecraft2id = recipe2
            recipesObj.templecraft3id = recipe3

        }else if (params.templeLevel >= 7){
            var recipesToRoll = 2
            var recipesObj = {}
            var rollForRecipe1 = Math.floor(Math.random() * possibleRecipesToRollFrom.length)
            var recipe1 = possibleRecipesToRollFrom[rollForRecipe1].itemId
            var rollForRecipe2 = Math.floor(Math.random() * possibleRecipesToRollFrom.length)
            var recipe2 = possibleRecipesToRollFrom[rollForRecipe2].itemId

            recipesObj.templecraft1id = recipe1
            recipesObj.templecraft2id = recipe2

        }else if (params.templeLevel >= 3){
            var recipesToRoll = 1
            var recipesObj = {}
            var rollForRecipe1 = Math.floor(Math.random() * possibleRecipesToRollFrom.length)
            var recipe1 = possibleRecipesToRollFrom[rollForRecipe1].itemId

            recipesObj.templecraft1id = recipe1
        }
        // update temple profile with the recipes in each slot
        setRecipesOnTemple(message, params, recipesObj)
    }
}

function buildPossibleRecipesArray(params){
    var possibleRecipesToRollFrom = []
    for (var r in availableRecipes){
        let rarityLevel = availableRecipes[r]

        for (var i in rarityLevel){
            let levelRange = rarityLevel[i]

            for (var item in levelRange){
                var includeItem = rollForItemInRecipeBasedCategory(levelRange[item], params.userLevel, i, rarityLevel, params.templeLevel)

                if (includeItem){
                    possibleRecipesToRollFrom.push(levelRange[item])
                }else{
                    // TODO: what to do if we dont include that item?
                }
            }
        }
    }

    return possibleRecipesToRollFrom
}

function rollForItemInRecipeBasedCategory(itemObject, userLevel, categoryLevel, rarityLevel, templeLevel){

    var rollAboveChance = getItemRollChance(userLevel, categoryLevel)
    var rollForItem = Math.floor(Math.random() * 100) + 1;

    if (templeLevel < 12 && categoryLevel >= 35){
        return false
    }
    if (templeLevel < 9 && ( rarityLevel == "artifacts" || rarityLevel == "amulets" ) ){
        return false
    }
    if (templeLevel < 6 && (rarityLevel == "ancients" || rarityLevel == "artifacts" || rarityLevel == "amulets" )){
        return false
    }
    if (templeLevel < 3 && ( rarityLevel == "rares" || rarityLevel == "ancients" || rarityLevel == "artifacts" || rarityLevel == "amulets" )){
        return false
    }
    // passed all requirements, now roll
    if (rollAboveChance >= rollForItem){
        return true
    }else{
        return false
    }    
}

function getItemRollChance(userLevel, categoryLevel, templeLevel){
    var chance = 0;
    // rolling in array of items
    // 100% chance to include items from 2 level ranges before - if lvl 23, 100% chance to get from lvl 10
    // 50% chance to include items from a level range before - if lvl 23, 50% chance to get from lvl 15
    // 25% chance to include items from current level range - if lvl 23, 25% chance to get from lvl 20
    // 0% chance to include items from level range above - if lvl 23, 0% chance to get from lvl 25+
    if (categoryLevel > userLevel){
        return chance
    }else{
        if (templeLevel < 12 && categoryLevel >= 35){
            // chance of 35 > is 0
            return chance
        }
        else if (userLevel - 10 >= categoryLevel){
            chance = 100
        }else if (userLevel - 5 >= categoryLevel){
            chance = 50
        }else if (userLevel >= categoryLevel){
            chance = 25
        }
    }

    return chance;
}

module.exports.checkRequirements = function(params){
    // check level of temple - get requirements for next level - check upgrade requirements
    var requirementsMet = true;
    var requirements = params.recipeRequirements
    // check reputation level 
    if (params.tacos >= requirements.tacos ){
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

function setRecipesOnTemple(message, params, recipesObj){
    profileDB.updateTempleRecipes(params.discordUserId, recipesObj, function(err, res){
        if (err){
            console.log(err)
            if (err == "no columns"){
                message.channel.send("temple not high enough lvl")
            }
        }else{
            // send message displaying the new recipes aquired
            message.channel.send("got new recipes")
        }
    })
}

module.exports.getRecipeRequirements = function(itemshortname){
    // TODO: get requirements based on shortname
    return availableRecipesByShortName[itemshortname]
}

module.exports.craftRecipe = function(message, params){
    var discordUserId = message.author.id
    consumeTacos(discordUserId, params, function(error, res){
        if (error){
            console.log(error)
        }else{
            useItems(params, function(error, res){
                if (error){
                    console.log(error)
                }else{
                    addToUserInventory(discordUserId, params.itemToCreate)
                }
            })
        }
    })
}

function consumeTacos(discordUserId, params, cb){
    profileDB.updateUserTacos(discordUserId, (params.recipeRequirements.tacos * -1), function(err, res){
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

function addToUserInventory(discordUserId, items){
    profileDB.addNewItemToUser(discordUserId, items, function(itemError, itemAddResponse){
        if (itemError){
            console.log(itemError);
        }else{
            console.log(itemAddResponse);
        }
    })
}

const availableRecipes = {
    rares: {
        10: [
            {
                recipeName: "level 10 sword",
                itemId: 13,
                itemRequirements: [
                    {
                        tacos: 3500
                    },
                    {
                        itemId: 4,
                        itemCount: 250
                    },
                    {
                        itemId: "someDustId",
                        itemCount: 1
                    }
                ]
            }
        ],
        15: [
            {
                recipeName: "level 15 sword",
                itemId: 14,
                itemRequirements: [

                ]
            }
        ],
        20: {

        },
        25: {

        },
        30: {

        },
        35:{

        },
        40:{

        },
        45:{

        }
    },
    ancients: {
        10: {

        },
        15: {

        },
        20: {

        },
        25: {

        },
        30: {

        },
        35:{

        },
        40:{

        },
        45:{
            
        }
    },
    artifacts: {
        10: {

        },
        15: {

        },
        20: {

        },
        25: {

        },
        30: {

        },
        35:{

        },
        40:{

        },
        45:{
            
        }
    },
    amulets: {
        10: {

        },
        15: {

        },
        20: {

        },
        25: {

        },
        30: {

        },
        35:{

        },
        40:{

        },
        45:{
            
        }
    }
}

const availableRecipesByShortName = {
    roman: {
        itemId: 13,
        tacos: 3500,
        items: [
            {
                itemId: 4,
                itemCount: 1
            }
            // {
            //     itemId: "someDustId",
            //     itemCount: 1
            // }
        ]
    }
}