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
const bakingRecipes = {
    ratvial: {
        items: [
            {
                itemId: 184,
                itemCount: 3
            },
            {
                itemId: 185,
                itemCount: 4
            }
        ]
    },
    applepie : {
        items: [
            {
                itemId: 186,
                itemCount: 3
            },
            {
                itemId: 187,
                itemCount: 4
            }
        ]
    },
    bananacake : {

    },
    bananacookie : {

    },
    tangerinesundae : {

    },
    chocolatecookie : {

    },
    brownie : {

    },
    bananapudding: {

    },
    cupcake:{

    },
    peardumpling: {

    },
    weddingcake: {

    },
    donut: {

    }

}

// vials are also listed here

// uses fruits + plants from greenhouse + tacos + uncommon items