'use strict'
var profileDB = require("./profileDB.js");

const greenHouseBakingLevels = {
    regular: 4,
    improved: 8,
    super: 10
}
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
module.exports.bakeItem = function(discordUserId, itemToBake, itemsMapById, userFruitsCount, userData, cb){
    if (bakingRecipes[itemToBake]){
        // attempt to bake the item | check fruit requirements | check its the right day
        var today = new Date()
        var todaysRecipes = exports.getRecipesForToday(today, userData)
        if (todaysRecipes.indexOf(itemToBake) > -1){
            var itemRequirements = bakingRecipes[itemToBake].itemRequirements
            var ableToBake = true;
            for (var item in itemRequirements){
                var singleItem = itemRequirements[item]
                // here we check for the user fruits
                if (!userFruitsCount[singleItem.itemId]
                    || userFruitsCount[singleItem.itemId] < singleItem.itemCount){
                    ableToBake = false
                    break;
                }
            }
            var fruitsToRemove = {}
            for (var i in itemRequirements){
                fruitsToRemove[itemRequirements[i].itemId] = itemRequirements[i].itemCount
            }

            if (ableToBake){
                var itemToCreateId = bakingRecipes[itemToBake].itemId
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
            cb("not available today")
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

module.exports.getRecipesForToday = function(today, userData){
    // get day of the month then go through all recipes and grab all the available ones
    var todaysRecipes = []
    var dayOfTheMonth = today.getDate()
    if ( dayOfTheMonth > 15 ){
        dayOfTheMonth = dayOfTheMonth - 15
    }
    for(var r in bakingRecipes){
        let difficulty =  greenHouseBakingLevels[bakingRecipes[r].recipeDifficulty] || 0
        if (bakingRecipes[r].dayavailable 
        && bakingRecipes[r].dayavailable == dayOfTheMonth
        && userData.greenhouselevel >= difficulty){
            todaysRecipes.push(r)
        }
    }
    return todaysRecipes
}

module.exports.recipesForTodayObjectBuilder = function(recipesAvailable){
    var recipesAvailableObjects = []
    for (var r in recipesAvailable){
        var recipename = recipesAvailable[r]
        var recipeObject = {
            recipeName: bakingRecipes[recipename].recipeName,
            itemshortname: bakingRecipes[recipename].itemshortname,
            itemId: bakingRecipes[recipename].itemId,
            recipeRequirementsString: exports.buildRecipeRequirementString(recipename)
        }
        recipesAvailableObjects.push(recipeObject)
    }
    return recipesAvailableObjects
}

module.exports.buildRecipeRequirementString = function(recipename){
    var recipeString = ""
    recipeString = recipeString + "Tacos: " + bakingRecipes[recipename].tacos + "\n"
    recipeString = recipeString + "Reputation: " + bakingRecipes[recipename].reputationlevel + "\n"
    recipeString = recipeString + "Items: \n"
    for (var i in bakingRecipes[recipename].itemRequirements){
        var itemId = bakingRecipes[recipename].itemRequirements[i].itemId
        var itemCount = bakingRecipes[recipename].itemRequirements[i].itemCount
        recipeString = recipeString + itemId + " x" + itemCount + "\n"
    }

    return recipeString
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
        dayavailable: recipe.dayavailable,
        itemId: itemToCraftId,
        tacos: recipe.tacos ? recipe.tacos : 0,
        reputationlevel: recipe.reputationlevel ? recipe.reputationlevel : 1,
        recipeDifficulty: recipe.recipedifficulty ? recipe.recipedifficulty : "regular",
        itemRequirements: []
    }

    if (recipe.fruit1name){
        individualRecipe.itemRequirements.push({
            itemId: recipe.fruit1name,
            itemCount: recipe.fruit1count ? recipe.fruit1count : 1
        })
    }
    if (recipe.fruit2name){
        individualRecipe.itemRequirements.push({
            itemId: recipe.fruit2name,
            itemCount: recipe.fruit2count ? recipe.fruit2count : 1
        })
    }
    if (recipe.fruit3name){
        individualRecipe.itemRequirements.push({
            itemId: recipe.fruit3name,
            itemCount: recipe.fruit3count ? recipe.fruit3count : 1
        })
    }
    return individualRecipe
}

module.exports.initializeBakingRecipes = function(recipes, callback){
    // get the baking recipes from itemrecipesprod
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

module.exports.getListOfBakingShortNames = function(){
    let arrayOfShortNames = []
    for (var r in bakingRecipes){
        arrayOfShortNames.push(bakingRecipes[r].itemshortname)
    }
    return arrayOfShortNames
}

const bakingRecipes = {}
