'use strict'
var profileDB = require("./profileDB.js");
const Discord = require("discord.js");

// commands used for baking items from the fruits collected via greenhouse

// can bake to:
// increase stats for 2 hours in RPG
// increase chances to get tacos
// miscellanous collections

// each day you can bake 1 of 4 recipes
// they will require a combination of fruits
// pie : apple + pear
// cookies : etc

// vials create potions:
// rat, ox, tiger, rabbit, dragon, snake
// horse, goat, monkey, rooster, dog, pig
// these come from: tulips	roses	evergreens	cacti	palms	blossoms	bamboos sunflowers
// give RPG boosts and taco boosts and experience boosts - (Wow flasks) - long term small boost
// 1,2,3 % of magic etc

// baking creates treats: 
// apple pie, banana cake, banana cookie, tangerine sundae
// chocolate cookie, brownie, banana pudding, cupcake, pear dumpling, wedding cake, donut
// come from:  hibiscuses bananas pears tangerines
// give RPG boosts and taco boosts and experience boosts - (Wow flasks) - long term small boost
// // 1,2,3 % of magic etc

// recipes are listed here | recipes change every day of the month 
module.exports.bakeItem = function(discordUserId, itemToBake, itemsMapById, userFruitsCount, cb){
    if (bakingRecipes[itemToBake]){
        // attempt to bake the item | check fruit requirements 
        // check its the right day  
        // if all requirements are met, set all items to used + insert new item into DB for user
        var itemRequirements = bakingRecipes[itemToBake].items
        var ableToBake = true;
        for (var item in itemRequirements){
            var singleItem = itemRequirements[item]
            // here we check for the user fruits
            if (userFruitsCount[singleItem.itemId] < singleItem.itemCount){
                ableToBake = false
                break;
            }
        }
        var fruitsToRemove = {}
        for (var i in itemRequirements){
            fruitsToRemove[itemRequirements[i].itemId] = itemRequirements[i].itemCount
        }

        if (ableToBake){
            var itemToCreateId = bakingRecipes[itemToBake].itemToCreateId
            var itemToCreate = itemsMapById[itemToCreateId]

            // take away the fruits required
            profileDB.bulkupdateUserFruits(discordUserId, fruitsToRemove, false, function(err, bulkRes){
                if (err){
                    console.log(err)
                }else{
                    // add the item to user's inventory
                    var itemsToAdd = [itemToCreate]
                    addToUserInventory(discordUserId, itemsToAdd)
                    cb(null, itemsToAdd)
                }
            })
        }else{
            cb("failed")
        }
    }else{
        cb("doesn't exist")
    }
}

function addToUserInventory(discordUserId, items){
    profileDB.addNewItemToUser(discordUserId, items, function(itemError, itemAddResponse){
        if (itemError){
            // console.log(itemError);
        }
        else{
            // console.log(itemAddResponse);
        }
    })
}

module.exports.obtainFruitsCountObject = function(userFruitsData){
    var fruitsCountObject = {
        tulips: userFruitsData.tulips || 0,
        roses: userFruitsData.roses || 0,
        evergreens : userFruitsData.evergreens || 0,	
        cacti: userFruitsData.cacti || 0,
        palms: userFruitsData.palms || 0,
        blossoms: userFruitsData.blossoms || 0,
        apples: userFruitsData.apples || 0,
        sunflowers: userFruitsData.sunflowers || 0,
        hibiscuses: userFruitsData.hibiscuses || 0,
        bananas: userFruitsData.bananas || 0,
        pears: userFruitsData.pears || 0,
        tangerines: userFruitsData.tangerines || 0,
        eggplants: userFruitsData.eggplants || 0
    }

    return fruitsCountObject
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

    if (recipe.fruit1name){
        recipeConverted.itemRequirements.push({
            itemId: recipe.fruit1name,
            itemCount: recipe.fruit1count ? recipe.fruit1count : 1
        })
    }
    if (recipe.fruit2name){
        recipeConverted.itemRequirements.push({
            itemId: recipe.fruit2name,
            itemCount: recipe.fruit2count ? recipe.fruit2count : 1
        })
    }
    if (recipe.fruit3name){
        recipeConverted.itemRequirements.push({
            itemId: recipe.fruit3name,
            itemCount: recipe.fruit3count ? recipe.fruit3count : 1
        })
    }
    return individualRecipe
}

module.exports.initializeBakingRecipes = function(recipes, callback){
    // get the baking recipes from itemrecipesprod
    // compare them with itemsMapById

    for (var r in recipes){
        var recipe = recipes[r]
        if (recipe.type == "baking"){
            var itemToCraftId = recipes[r].itemid
            var recipeConverted = createRecipeObject( recipe, itemToCraftId )
            bakingRecipes[recipe.recipeshortname] = recipeConverted
        }
    }
    callback()
}

const bakingRecipes = {}
