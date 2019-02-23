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

    if (rollForNewRecipe > 950){
        var possibleRecipesToRollFrom = buildPossibleRecipesArray(params)

        // roll for recipes - number of recipes depends on the templeLevel
        // 3 = 1, 7 = 2, 11 = 3
        var recipesObj = {}
        if (params.templeLevel >= 11){
            var recipesToRoll = 3
            var rollForRecipe1 = Math.floor(Math.random() * possibleRecipesToRollFrom.length)
            var recipe1id = possibleRecipesToRollFrom[rollForRecipe1].itemId
            var recipe1name = possibleRecipesToRollFrom[rollForRecipe1].itemshortname
            var rollForRecipe2 = Math.floor(Math.random() * possibleRecipesToRollFrom.length)
            var recipe2id = possibleRecipesToRollFrom[rollForRecipe2].itemId
            var recipe2name = possibleRecipesToRollFrom[rollForRecipe2].itemshortname
            var rollForRecipe3 = Math.floor(Math.random() * possibleRecipesToRollFrom.length)
            var recipe3id = possibleRecipesToRollFrom[rollForRecipe3].itemId
            var recipe3name = possibleRecipesToRollFrom[rollForRecipe3].itemshortname

            // these should be itemids
            recipesObj.templecraft1id = recipe1id
            recipesObj.templecraft1name = recipe1name
            recipesObj.templecraft2id = recipe2id
            recipesObj.templecraft2name = recipe2name
            recipesObj.templecraft3id = recipe3id
            recipesObj.templecraft3name = recipe3name

        }else if (params.templeLevel >= 7){
            var recipesToRoll = 2
            var recipesObj = {}
            var rollForRecipe1 = Math.floor(Math.random() * possibleRecipesToRollFrom.length)
            var recipe1id = possibleRecipesToRollFrom[rollForRecipe1].itemId
            var recipe1name = possibleRecipesToRollFrom[rollForRecipe1].itemshortname
            var rollForRecipe2 = Math.floor(Math.random() * possibleRecipesToRollFrom.length)
            var recipe2id = possibleRecipesToRollFrom[rollForRecipe2].itemId
            var recipe2name = possibleRecipesToRollFrom[rollForRecipe2].itemshortname

            recipesObj.templecraft1id = recipe1id
            recipesObj.templecraft1name = recipe1name
            recipesObj.templecraft2id = recipe2id
            recipesObj.templecraft2name = recipe2name

        }else if (params.templeLevel >= 3){
            var recipesToRoll = 1
            var recipesObj = {}
            var rollForRecipe1 = Math.floor(Math.random() * possibleRecipesToRollFrom.length)
            var recipe1id = possibleRecipesToRollFrom[rollForRecipe1].itemId
            var recipe1name = possibleRecipesToRollFrom[rollForRecipe1].itemshortname

            recipesObj.templecraft1id = recipe1id
            recipesObj.templecraft1name = recipe1name
        }
        // update temple profile with the recipes in each slot
        setRecipesOnTemple(message, params, recipesObj)
    }
}

function buildPossibleRecipesArray(params){
    var possibleRecipesToRollFrom = []
    for (var r in recipesToCraftMap){
        let rarityLevel = recipesToCraftMap[r]

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

    var rollAboveChance = getItemRollChance(userLevel, categoryLevel, templeLevel)
    var rollForItem = Math.floor(Math.random() * 100) + 1;

    if (templeLevel < 12 && categoryLevel >= 40){
        return false
    }
    if (templeLevel < 10 && ( rarityLevel == "artifacts" || rarityLevel == "amulets" ) ){
        return false
    }
    if (templeLevel < 8 && (rarityLevel == "ancients" || rarityLevel == "artifacts" || rarityLevel == "amulets" )){
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
                    message.channel.send(message.author + " crafted **" + params.itemToCreate[0].itemname +"**")
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

function createRecipeObject(recipe, itemToCraftId){

    var individualRecipe = {
        recipeName: recipe.recipename,
        itemshortname: recipe.recipeshortname,
        itemId: itemToCraftId,
        tacos: recipe.tacos ? recipe.tacos : 0,
        reputationlevel: recipe.reputationlevel ? recipe.reputationlevel : 1,
        itemRequirements: []
    }

    if (recipe.item1id){
        individualRecipe.itemRequirements.push({
            itemId: recipe.item1id,
            itemCount: recipe.item1count ? recipe.item1count : 1
        })
    }
    if (recipe.item2id){
        individualRecipe.itemRequirements.push({
            itemId: recipe.item2id,
            itemCount: recipe.item2count ? recipe.item2count : 1
        })
    }
    if (recipe.item3id){
        individualRecipe.itemRequirements.push({
            itemId: recipe.item3id,
            itemCount: recipe.item3count ? recipe.item3count : 1
        })
    }
    if (recipe.item4id){
        individualRecipe.itemRequirements.push({
            itemId: recipe.item4id,
            itemCount: recipe.item4count ? recipe.item4count : 1
        })
    }
    if (recipe.item5id){
        individualRecipe.itemRequirements.push({
            itemId: recipe.item5id,
            itemCount: recipe.item5count ? recipe.item5count : 1
        })
    }
    if (recipe.item6id){
        individualRecipe.itemRequirements.push({
            itemId: recipe.item6id,
            itemCount: recipe.item6count ? recipe.item6count : 1
        })
    }
    if (recipe.item7id){
        individualRecipe.itemRequirements.push({
            itemId: recipe.item7id,
            itemCount: recipe.item7count ? recipe.item7count : 1
        })
    }
    return individualRecipe
}

module.exports.initializeCraftingRecipes = function(recipes, itemsMapById, callback){
    // get the crafting recipes from itemrecipesprod
    
    for (var r in recipes){
        var recipe = recipes[r]
        if (recipe.type == "crafting"){
            var itemToCraftId = recipes[r].itemid
            var recipeCraftingLevel = recipes[r].craftinglevel
            var itemToCraft = itemsMapById[itemToCraftId]
            var raritylevel = itemToCraft.itemraritycategory

            var recipeConverted = createRecipeObject(recipe, itemToCraftId )
            availableRecipesByShortName[recipe.recipeshortname] = recipeConverted
            if (raritylevel == "rare"){
                if (recipesToCraftMap.rares[recipeCraftingLevel]){
                    recipesToCraftMap.rares[recipeCraftingLevel].push(recipeConverted)
                }
            }else if (raritylevel == "ancient"){
                if (recipesToCraftMap.ancients[recipeCraftingLevel]){
                    recipesToCraftMap.ancients[recipeCraftingLevel].push(recipeConverted)
                }
            }else if(raritylevel == "amulet"){
                if (recipesToCraftMap.amulets[recipeCraftingLevel]){
                    recipesToCraftMap.amulets[recipeCraftingLevel].push(recipeConverted)
                }
            }else if (raritylevel == "artifact"){
                if (recipesToCraftMap.artifacts[recipeCraftingLevel]){
                    recipesToCraftMap.artifacts[recipeCraftingLevel].push(recipeConverted)
                }
            }
        }
    }
    callback()
}

var recipesToCraftMap = {
    rares:{
        10: [],
        15: [],
        20: [],
        25: [],
        30: [],
        35: [],
        40: [],
        45: []
    },
    ancients:{
        10: [],
        15: [],
        20: [],
        25: [],
        30: [],
        35: [],
        40: [],
        45: []
    },
    amulets:{
        10: [],
        15: [],
        20: [],
        25: [],
        30: [],
        35: [],
        40: [],
        45: []
    },
    artifacts:{
        10: [],
        15: [],
        20: [],
        25: [],
        30: [],
        35: [],
        40: [],
        45: []
    }
}

var availableRecipesByShortName = {}