
var achiev = require("./achievements.js");
var rpg = require("./rpg.js")
var rpglib = require("./rpglib");
var profileDB = require("./profileDB.js");
var stats = require("./statistics.js");
const Discord = require("discord.js");
var Promise = require('bluebird');
var config = require("./config.js");
var useItem = require("./useItem.js")
var disassembleItem = require("./disassemble.js")
var experience = require("./experience.js")
var wearStats = require("./wearStats.js")
var quest = require("./quest.js")
// game files
/*
var game = require("./card_game/miniGame.js");
var board = require("./card_game/board.js");
var unit = require("./card_game/unit.js");
var player = require("./card_game/player.js");

*/
var miniboard = require("./minigame/board.js");
var miniplayer = require("./minigame/player.js");

var moment = require("moment");

var BASE_TACO_COST = 500;
var BASE_TACO_PREPARE = 100;
var PICKAXE_COST = 250;
var IMPROVED_PICKAXE_COST = 10000;
var MASTER_PICKAXE_COST = 750000;
var ETHEREAL_PICKAXE_COST = 12500000
var ZEUS_TRIDENT_COST = 175000000
var PASTA_COST = 2500
var SCAVENGE_TACO_FIND_CHANCE_HIGHER = 94
var SCAVENGE_TACO_FIND_CHANCE = 75;
var Last_Five_Welcomes = [];
var ROCK_ITEM_ID = 5;
var PIECE_OF_WOOD_ITEM_ID = 4;
var TERRY_CLOTH_ITEM_ID = 3;
var SODA_CAN_ITEM_ID = 1;
var SOIL_ITEM_ID = 2;
var PET_COST = 750;
var QueueOfTacosDropped = [];
var THANK_COOLDOWN_HOURS = 2;
var SORRY_COOLDOWN_HOURS = 6;
var COOK_COOLDOWN_HOURS = 24;
var PREPARE_COOLDOWN_HOURS = 48;
var SCAVENGE_COOLDOWN_HOURS = 1;
var RAFFLE_ENTRY_COST = 50;
var RAFFLE_USER_SIZE = 7
// make recipe be available at lvl 2 reputation
var ARTIFACT_RECIPE_COST = 35000;
var FLASK_COST = 500;
var ARTIFACT_RECIPE_ID = 69;
var TRANSFORMIUM_ID = 155;
var ETHEREUM_ID = 200;
var TACO_PARTY_TIME_TO_LIVE = 300000
var SHOP_ITEM_COST = 125


var activeAuctions = {};
var itemsInAuction = {};
var tacosInUseAuction = {};
var activeTrades = {}
var hasOpenTrade = {};
var activeTradeItems = {}
var activeRaffle = {
    entriesId: [],
    users: {}
}
var activeTables = {};
var marketItems = {}
var marketItemsUserCount = {} // keeps track of number of items a user has in the market
var client;
var usersMinigames = {};

var NeedsToAgree = {}

var EXPERIENCE_GAINS = {
    thank: 2,
    sorry: 5,
    cook: 13,
    prepare: 18,
    preparePerStand: 4,
    scavenge: 1,
    fetch: 1,
    perFetchCd: 2,
    useCommonItem: 1,
    useCommonItemFive: 5,
    buyStand: 5,
    buyStandPerStand: 2,
    buyPickaxe: 4

}

var commandHoursToActivate = {
    rpg: 2,
    thank: 2,
    sorry: 5,
    cook: 12,
    prepare: 24,
    scavenge: 1,
    fetch: 2
}

var Levels = config.Levels;

var REWARDS = {
    ArtifactRecipe : {
        repLevel : 3
    },
    Flask : {
        repLevel : 4
    }
}

var PETS_AVAILABLE = {
    dog: {
        speak: "WOOF",
        emoji: ":dog:",
        fetch: 20,
        cooldown: 6,
        reputation: "liked",
        repLevel: 2
    },
    cat: {
        speak: "MEOW",
        emoji: ":cat:",
        fetch: 10,
        cooldown: 3,
        reputation: "liked",
        repLevel: 2
    },
    monkey: {
        speak: "HUEAHuaHEUEHAHUEAUHAEEA",
        emoji: ":monkey:",
        fetch: 30,
        cooldown: 9,
        reputation: "liked",
        repLevel: 2
    },
    pig: {
        speak: "OINK OINK OINK OINK",
        emoji: ":pig:",
        fetch: 50,
        cooldown: 27,
        reputation: "liked",
        repLevel: 2
    },
    rabbit: {
        speak: ".....",
        emoji: ":rabbit:",
        fetch: 10,
        cooldown: 3,
        reputation: "liked",
        repLevel: 2
    },
    wolf: {
        speak: "HaWoooooo",
        emoji: ":wolf:",
        fetch: 20,
        cooldown: 6,
        reputation: "respected",
        repLevel: 3
    },
    butterfly: {
        speak: ".....",
        emoji: ":butterfly:",
        fetch: 10,
        cooldown: 3,
        reputation: "respected",
        repLevel: 3
    },
    penguin: {
        speak: ".....",
        emoji: ":penguin:",
        fetch: 30,
        cooldown: 9,
        reputation: "respected",
        repLevel: 3
    },
    scorpion: {
        speak: ".....",
        emoji: ":scorpion:",
        fetch: 10,
        cooldown: 3,
        reputation: "respected",
        repLevel: 3
    },
    elephant: {
        speak: ".....",
        emoji: ":elephant:",
        fetch: 50,
        cooldown: 27,
        reputation: "respected",
        repLevel: 3
    },
    horse: {
        speak: ".....",
        emoji: ":horse:",
        fetch: 20,
        cooldown: 6,
        reputation: "respected",
        repLevel: 3
    },
    tiger: {
        speak: ".....",
        emoji: ":tiger:",
        fetch: 20,
        cooldown: 6,
        reputation: "admired",
        repLevel: 4
    },
    gorilla: {
        speak: ".....",
        emoji: ":gorilla:",
        fetch: 40,
        cooldown: 12,
        reputation: "admired",
        repLevel: 4
    },
    snake: {
        speak: ".....",
        emoji: ":snake:",
        fetch: 10,
        cooldown: 3,
        reputation: "admired",
        repLevel: 4
    },
    dolphin: {
        speak: ".....",
        emoji: ":dolphin:",
        fetch: 30,
        cooldown: 9,
        reputation: "admired",
        repLevel: 4
    },
    rhino: {
        speak: ".....",
        emoji: ":rhino:",
        fetch: 50,
        cooldown: 27,
        reputation: "admired",
        repLevel: 4
    },
    crocodile: {
        speak: ".....",
        emoji: ":crocodile:",
        fetch: 40,
        cooldown: 12,
        reputation: "admired",
        repLevel: 4
    },
    chipmunk: {
        speak: ".....",
        emoji: ":chipmunk:",
        fetch: 20,
        cooldown: 6,
        reputation: "admired",
        repLevel: 4
    },
    unicorn: {
        speak: ".....",
        emoji: ":unicorn:",
        fetch: 10,
        cooldown: 3,
        reputation: "glorified",
        repLevel: 5
    },
    dragon: {
        speak: ".....",
        emoji: ":dragon:",
        fetch: 50,
        cooldown: 27,
        reputation: "glorified",
        repLevel: 5
    }
}

var REPUTATIONS = config.reputations;
//// TEMPORARY COMMANDS
var trickOrTreatMap = {};
var TOTCOOLDOWNHOURS = 1;

module.exports.trickOrTreatCommand = function(message){
    
    var discordUserId = message.author.id;
    // if they get treat, their pet becomes a jackolantern and they gain 5 tacos and 1 item
    // if they get trick, their pet becomes a ghost and they lose 5 tacos
    profileDB.getUserProfileData( discordUserId, function(err, totData) {
        if(err){
            // console.log("in error : " + err.code);
            agreeToTerms(message, discordUserId);
        }else{
            var trickOrTreat = Math.floor(Math.random() * 2);
            
            var now = new Date();
            var twoHoursAgo = new Date();
            ///////// CALCULATE THE MINUTES REDUCED HERE 
            twoHoursAgo = new Date(twoHoursAgo.setHours(twoHoursAgo.getHours() - TOTCOOLDOWNHOURS));
            // added the CDR
            twoHoursAgo = new Date(twoHoursAgo.setMinutes(twoHoursAgo.getMinutes()));

            if (!totData.data.lasttrickortreattime || (twoHoursAgo > totData.data.lasttrickortreattime)){
                if (trickOrTreat == 0){
                    var trickOrTreatDate = new Date();
                    trickOrTreatMap["tot-" + discordUserId] = {
                        tot: "trick"
                    };
                    profileDB.updateUserTacosTrickOrTreat(discordUserId, -50, function(updateerr, updateResponse) {
                        if (updateerr){
                            // console.log(updateerr);
                        }
                        else{
                            message.channel.send("You have been tricked! 👻 Bender took 50 tacos from your candy bag");
                            // update lasttrickortreattime
                            
                        }
                    })
                    
                }else if (trickOrTreat == 1){
                    var trickOrTreatDate = new Date();
                    trickOrTreatMap["tot-" + discordUserId] = {
                        tot: "treat"
                    };
                    
                    profileDB.updateUserTacosTrickOrTreat(discordUserId, 100, function(updateerr, updateResponse) {
                        if (updateerr){
                            // console.log(updateerr);
                        }
                        else{
                            message.channel.send("You have been treated! 🎃 Bender put 100 tacos in your candy bag");
                            // update lasttrickortreattime
                        }
                    })
                }
            }else{
                now = new Date(now.setMinutes(now.getMinutes() + 0 ));
                var numberOfHours = getDateDifference(totData.data.lasttrickortreattime, now, 1);
                message.channel.send(message.author + " You are being too greedy! Please wait `" + numberOfHours +"` ");
            }
        }
    })
}

module.exports.openPresentCommand = function(message){
    // open a present, tacos, or an item, or a flask, or 
    var discordUserId = message.author.id;
    
    // roll the number of items to get
    var tacosFound = 0
    var roll = Math.floor(Math.random() * 100) + 1;
    profileDB.getUserProfileData( discordUserId, function(error, getUserResponse) {
        if(error){
            console.log(error);
            agreeToTerms(message, discordUserId);
        }else{
            // get all the possible items from items DB - Bad implementation but idgaf
            var userLevel = getUserResponse.data.level;
            var now = new Date();
            var oneDayAgo = new Date();
            ///////// CALCULATE THE MINUTES REDUCED HERE 
            oneDayAgo = new Date(oneDayAgo.setHours(oneDayAgo.getHours() - 24));
            // added the CDR
            oneDayAgo = new Date( oneDayAgo.setMinutes( oneDayAgo.getMinutes() ));

            if ( !getUserResponse.data.lastpresenttime || (oneDayAgo > getUserResponse.data.lastpresenttime) ){
                if (roll >= 50){
                    // roll an item
                    var itemsObtainedArray = [];                
                    profileDB.getItemData(function(err, getItemResponse){
                        if (err){
                            console.log(err);
                        }
                        else{
                            var allItems = getItemResponse.data
                            var uncommonItems = [];
                            var rareItems = [];
                            var ancientItems = [];                        
                            for (var item in allItems){
                                if(allItems[item].itemraritycategory == "uncommon"){
                                    uncommonItems.push(allItems[item]);
                                }
                                else if(allItems[item].itemraritycategory == "rare"){
                                    rareItems.push(allItems[item]);
                                }
                                else if(allItems[item].itemraritycategory == "ancient"){
                                    ancientItems.push(allItems[item]);
                                }
                            }
                            var rarityRoll = Math.floor(Math.random() * 10000) + 1;

                            var ANCIENT_MAX_ROLL = 10000
                            var ANCIENT_MIN_ROLL = 9920;
                            var RARE_MAX_ROLL = 9920;
                            var RARE_MIN_ROLL = 9700;
                            
                            if(rarityRoll > ANCIENT_MIN_ROLL && rarityRoll <= ANCIENT_MAX_ROLL){
                                var itemRoll = Math.floor(Math.random() * ancientItems.length);
                                itemsObtainedArray.push(ancientItems[itemRoll])
                            }
                            else if(rarityRoll > RARE_MIN_ROLL && rarityRoll <= RARE_MAX_ROLL){
                                var itemRoll = Math.floor(Math.random() * rareItems.length);
                                itemsObtainedArray.push(rareItems[itemRoll]);
                            }
                            else {
                                var itemRoll = Math.floor(Math.random() * uncommonItems.length);
                                itemsObtainedArray.push( uncommonItems[itemRoll] );
                            }

                            addToUserInventory(discordUserId, itemsObtainedArray);

                            profileDB.updateUserTacosPresent(discordUserId, tacosFound, function(updateerr, updateResponse) {
                                if (updateerr){
                                    console.log(updateerr);
                                }
                                else{
                                    var itemsMessage = ""
                                    for (var item in itemsObtainedArray){
                                        itemsMessage = itemsMessage + "[**" + itemsObtainedArray[item].itemraritycategory +"**] " + "**"  + itemsObtainedArray[item].itemname + "** - " + itemsObtainedArray[item].itemdescription + ", " +
                                        itemsObtainedArray[item].itemslot + ", " +itemsObtainedArray[item].itemstatistics + " \n";
                                    }
                                
                                    const embed = new Discord.RichEmbed()
                                    .addField(message.author.username + "'s present contained :gift: :christmas_tree:", itemsMessage, true)
                                    .setThumbnail(message.author.avatarURL)
                                    .setColor(0xbfa5ff)
                                    message.channel.send({embed});
                                }
                            })
                        }
                    })
                }
                else if (roll < 50){
                    // give the user tacos           
                    tacosFound = 250;
                    profileDB.updateUserTacosPresent(discordUserId, tacosFound, function(updateerr, updateResponse) {
                        if (updateerr){
                            console.log(updateerr);
                        }
                        else{
                            message.channel.send(message.author + " received `" + tacosFound + "` tacos :taco: :gift: :christmas_tree: ")
                        }
                    })
                }
            } else{
                now = new Date(now.setMinutes(now.getMinutes()));
                var numberOfHours = getDateDifference(getUserResponse.data.lastpresenttime, now, 24);
                message.channel.send(message.author + " You have recently opened a present! :gift: Please wait `" + numberOfHours +"` ");
            }
        }
    })
}

module.exports.thankCommand = function(message){
    
    var discordUserId = message.author.id;
    var users  = message.mentions.users;
    var mentionedId;
    var mentionedUser;
    // console.log(users);
    users.forEach(function(user){
        // console.log(user.id);
        mentionedId = user.id;
        mentionedUser = user
    })
    
    // check the user mentioned someone, and the user is not the same user
    if ( message.mentions.users.size > 0 && discordUserId != mentionedId && !NeedsToAgree[mentionedId]){
        profileDB.getUserProfileData( discordUserId, function(err, thankResponse) {
            if(err){
                // console.log("in error : " + err.code);
                agreeToTerms(message, discordUserId);
            }else{
                var userLevel = thankResponse.data.level;
                wearStats.getUserWearingStats(message, discordUserId, {userLevel: userLevel}, function(wearErr, wearRes){
                    if (wearErr){
                        
                    }else{
                        // // console.log(wearRes);
                        var secondsToRemove = wearStats.calculateSecondsReduced(wearRes, "thank");
                        // check against thank timestamp and if 2 hours have passed
                        var now = new Date();
                        var twoHoursAgo = new Date();
                        ///////// CALCULATE THE MINUTES REDUCED HERE 
                        twoHoursAgo = new Date(twoHoursAgo.setHours(twoHoursAgo.getHours() - THANK_COOLDOWN_HOURS));
                        // added the CDR
                        twoHoursAgo = new Date(twoHoursAgo.setSeconds(twoHoursAgo.getSeconds() + secondsToRemove));

                        if ( twoHoursAgo > thankResponse.data.lastthanktime ){
                            ///////// CALCULATE THE EXTRA TACOS HERE 
                            var extraTacosFromItems = wearStats.calculateExtraTacos(wearRes, "thank"); // 0 or extra
                            // add tacos to user's profile if they got extra tacos
                            profileDB.updateUserTacos(mentionedId, 10, function(updateerr, updateResponse) {
                                if (updateerr){
                                    // console.log(updateerr);
                                    message.channel.send("The user has not yet agreed to the terms");
                                }
                                else{
                                    profileDB.updateUserTacosThank(discordUserId, extraTacosFromItems, function(updateerr, updateResponse) {
                                        if (updateerr){
                                            // console.log(updateerr);
                                        }
                                        else{
                                            // // console.log(updateResponse);
                                            var experienceFromItems = wearStats.calculateExtraExperienceGained(wearRes, "thank", null);
                                            ///// For Artifact or Missions
                                            var dataForMission = {}
                                            missionCheckCommand(message, discordUserId, "thank", mentionedId, dataForMission)

                                            experience.gainExperience(message, message.author, EXPERIENCE_GAINS.thank + experienceFromItems, thankResponse);
                                            //update statistic
                                            stats.statisticsManage(discordUserId, "thankcount", 1, function(staterr, statSuccess){
                                                if (staterr){
                                                    // console.log(staterr);
                                                }
                                                else{
                                                    // check achievements??
                                                    getProfileForAchievement(discordUserId, message, thankResponse )
                                                }
                                            })
                                        }
                                    })
                                    // send message that the user has 1 more taco
                                    if (extraTacosFromItems > 0){
                                        message.channel.send(message.author + " thanked " + mentionedUser.username + ", they received `10` tacos! :taco:" + " you received `" + extraTacosFromItems + "` extra tacos");
                                    }
                                    else{
                                        message.channel.send(message.author + " thanked " + mentionedUser.username + ", they received `10` tacos! :taco: ");
                                    }
                                }
                            })
                        }else{
                            // six hours have not passed, tell the user they need to wait 
                            now = new Date(now.setSeconds(now.getSeconds() + secondsToRemove));
                            var numberOfHours = getDateDifference(thankResponse.data.lastthanktime, now, 2);
                            message.channel.send(message.author + " You are being too thankful! Please wait `" + numberOfHours +"` ");
                        }
                    }
                })
            }
        });
    }
    else if (NeedsToAgree[mentionedId] && NeedsToAgree[mentionedId].hasNotAgreed){
        //message.channel.send(message.author + " You must mention a user or a user that isn't you whom you want to thank!");
        message.channel.send("the user has not yet agreed to the terms!")
    }
}

module.exports.sorryCommand = function(message){
    // say sorry to somebody every 6 hours
    var discordUserId = message.author.id;
    var users  = message.mentions.users;
    var mentionedId;
    var mentionedUser;
    // console.log(users);
    users.forEach(function(user){
        // console.log(user.id);
        mentionedId = user.id;
        mentionedUser = user.username
    })

    if ( message.mentions.users.size > 0 && discordUserId != mentionedId && !NeedsToAgree[mentionedId]){
        profileDB.getUserProfileData( discordUserId, function(err, sorryResponse) {
            if(err){
                agreeToTerms(message, discordUserId);
            }
            else{
                var userLevel = sorryResponse.data.level;
                wearStats.getUserWearingStats(message, discordUserId, {userLevel: userLevel}, function(wearErr, wearRes){
                    if (wearErr){
                        
                    }else{
                        // // console.log(wearRes);
                        var secondsToRemove = wearStats.calculateSecondsReduced(wearRes, "sorry");
                        // check six hours ago
                        var achievements = sorryResponse.data.achievements;
                        var now = new Date();
                        var sixHoursAgo = new Date();
                        ///////// CALCULATE THE MINUTES REDUCED HERE 
                        sixHoursAgo = new Date(sixHoursAgo.setHours(sixHoursAgo.getHours() - SORRY_COOLDOWN_HOURS));
                        // added the CDR
                        sixHoursAgo = new Date(sixHoursAgo.setSeconds(sixHoursAgo.getSeconds() + secondsToRemove));
                        if ( sixHoursAgo > sorryResponse.data.lastsorrytime ){
                            ///////// CALCULATE THE EXTRA TACOS HERE 
                            var extraTacosFromItems = wearStats.calculateExtraTacos(wearRes, "sorry"); // 0 or extra
                            
                            profileDB.updateUserTacos(mentionedId, 10, function(updateerr, updateResponse) {
                                if (updateerr){
                                    // console.log(updateerr);
                                    // create mentioned user
                                    var mentionedData = initialUserProfile(mentionedId);
                                    mentionedData.tacos = mentionedData.tacos + 10
                                    profileDB.createUserProfile(mentionedData, function(createerr, createUserResponse){
                                        if (createerr){
                                            // console.log(createerr); // cant create user RIP
                                        }
                                        else{
                                            var experienceFromItems = wearStats.calculateExtraExperienceGained(wearRes, "sorry", null);
                                            experience.gainExperience(message, message.author, (EXPERIENCE_GAINS.sorry + experienceFromItems) , sorryResponse);
                                            ///// For Artifact or Missions
                                            var dataForMission = {}
                                            missionCheckCommand(message, discordUserId, "sorry", mentionedId, dataForMission)

                                            stats.statisticsManage(discordUserId, "sorrycount", 1, function(staterr, statSuccess){
                                                if (staterr){
                                                    // console.log(staterr);
                                                }
                                                else{
                                                    // check achievements??
                                                    getProfileForAchievement(discordUserId, message, sorryResponse )
                                                }
                                            })
                                        }
                                    }) 
                                }
                                else{
                                    profileDB.updateUserTacosSorry(discordUserId, extraTacosFromItems, function(updateerr, updateResponse) {
                                        if (updateerr){
                                            // console.log(updateerr);
                                        }
                                        else{
                                            //// console.log(updateResponse);
                                            var experienceFromItems = wearRes.sorryCommandExperienceGain ? wearRes.sorryCommandExperienceGain : 0;
                                            experience.gainExperience(message, message.author,  (EXPERIENCE_GAINS.sorry + experienceFromItems) , sorryResponse);
                                            stats.statisticsManage(discordUserId, "sorrycount", 1, function(staterr, statSuccess){
                                                if (staterr){
                                                    console.log(staterr);
                                                }
                                                else{
                                                    // check achievements??
                                                    getProfileForAchievement(discordUserId, message, sorryResponse)
                                                }
                                            })
                                        }
                                    })
                                    // send message that the user has 1 more taco
                                    if (extraTacosFromItems > 0){
                                        message.channel.send(message.author + " apologized to " + mentionedUser + ", they received `10` tacos! :taco:" + " " + " received `" + extraTacosFromItems + "` extra tacos");
                                    }else{
                                        message.channel.send(message.author + " apologized to " + mentionedUser + ", they received `10` tacos! :taco:");
                                    }
                                }
                            })
                        }else{
                            // six hours have not passed, tell the user they need to wait 
                            now = new Date(now.setSeconds(now.getSeconds() + secondsToRemove));
                            var numberOfHours = getDateDifference(sorryResponse.data.lastsorrytime, now, 6);
                            message.channel.send(message.author + " You are being too apologetic! Please wait `" + numberOfHours +"` ");
                        }
                    }
                })
                
            }
        })
    }
    else if (NeedsToAgree[mentionedId] && NeedsToAgree[mentionedId].hasNotAgreed){
        message.channel.send("the user has not yet agreed to the terms!")
        // message.channel.send(message.author + " You must mention a user or a user that isn't you whom you want to apologize to!");
    }

}

module.exports.buyStandCommand = function (message){
    // buy a stand for x number of tacos
    var discordUserId = message.author.id

    profileDB.getUserProfileData( discordUserId, function(err, buyStandResponse) {
        if(err){
            // user doesnt exist tell the user they should get some tacos
            message.channel.send(message.author + " You can't afford a stand atm!");
            agreeToTerms(message, discordUserId);
        }
        else{
            // if user has enough tacos to purchase the stand, add 1 tree, subtract x tacos
            var achievements = buyStandResponse.data.achievements;
            var userTacoStands = 0;
            if (buyStandResponse.data.tacostands && buyStandResponse.data.tacostands > -1){
                userTacoStands = buyStandResponse.data.tacostands;
            }
            //// console.log(buyStandResponse.data.tacos);
            var standCost = BASE_TACO_COST + (userTacoStands * 250);
            if (buyStandResponse.data.tacos >= standCost){
                // purchaseStand
                var tacosSpent = standCost * -1
                profileDB.purchaseTacoStand(discordUserId, tacosSpent, buyStandResponse.data.tacostands, function(err, data){
                    if (err){
                        // console.log(err);
                        // couldn't purchase stand
                    }
                    else{
                        message.channel.send(message.author + " Congratulations!, you have purchased a taco stand! :bus:");
                        experience.gainExperience(message, message.author, EXPERIENCE_GAINS.buyStand + (EXPERIENCE_GAINS.buyStandPerStand * userTacoStands) , buyStandResponse);
                        // check achievements??
                        var data = {}
                        data.achievements = achievements;
                        data.tacostands = userTacoStands + 1;
                        //// console.log(data);
                        achiev.checkForAchievements(discordUserId, data, message);
                            
                    }
                 })
            }
            else{
                // can't afford stand
                var standCost = BASE_TACO_COST + (userTacoStands * 250);
                message.channel.send(message.author + " You can't afford a stand , you need `" + standCost + " tacos`!");
            }
        }
    })
}

module.exports.prepareCommand = function (message){
    // prepare tacos based on number of taco trees
    var discordUserId = message.author.id

    profileDB.getUserProfileData( discordUserId, function(err, prepareResponse) {
        if(err){
            // user doesnt exist, they cannot prepare
            var userData = initialUserProfile(discordUserId);
            agreeToTerms(message, discordUserId);
        }
        else{
            // get number of trees the user has
            // check lastprepare time
            var HAS_SPRINTING_SHOES = prepareResponse.data.sprintingshoes;
            var userWearingData = {
                userLevel : prepareResponse.data.level,
                hasSprintingShoes : HAS_SPRINTING_SHOES
            }
            wearStats.getUserWearingStats(message, discordUserId, userWearingData, function(wearErr, wearRes){
                if (wearErr){
                    
                }else{
                    var achievements = prepareResponse.data.achievements;
                    
                    var now = new Date();
                    var threeDaysAgo = new Date();
                    ///////// CALCULATE THE MINUTES REDUCED HERE 
                    var secondsToRemove = wearStats.calculateSecondsReduced(wearRes, "prepare");

                    threeDaysAgo = new Date(threeDaysAgo.setHours(threeDaysAgo.getHours() - PREPARE_COOLDOWN_HOURS));
                    threeDaysAgo = new Date(threeDaysAgo.setSeconds(threeDaysAgo.getSeconds() + secondsToRemove));

                    if ( threeDaysAgo > prepareResponse.data.lastpreparetime ){
                        // able to prepare again
                        var userTacoStands = 0;
                        if (prepareResponse.data.tacostands && prepareResponse.data.tacostands > -1){
                            userTacoStands = prepareResponse.data.tacostands;
                        }
                        if (userTacoStands > 0){
                            // add tacos x10 of # of trees
                            // get extra tacos based on soiled crops
                            var tacosToPrepare = BASE_TACO_PREPARE * userTacoStands;
                            var soiledCrops = prepareResponse.data.soiledcrops;
                            var soiledToTaco = 0;
                            for (i = 0; i < soiledCrops; i++) {
                                var soilRoll = Math.floor(Math.random() * 100) + 1;
                                if ( soilRoll > 50 ){
                                    soiledToTaco = soiledToTaco + 10;
                                }
                            }
        
                            ///////// CALCULATE THE EXTRA TACOS HERE 
                            var extraTacosFromItems = wearStats.calculateExtraTacos(wearRes, "prepare"); // 0 or extra

                            tacosToPrepare = tacosToPrepare + soiledToTaco;
                            profileDB.prepareTacos(discordUserId, tacosToPrepare + extraTacosFromItems, function(err, data){
                                if (err){
                                    // console.log(err);
                                    // something happened
                                }
                                else{
                                    // update protection also
                                    var protection = prepareResponse.data.protect;
                                    profileDB.updateUserProtect(discordUserId, 1, protection, function(updateerr, updateResponse) {
                                        if (updateerr){
                                            // console.log(updateerr);
                                        }
                                        else{
                                            //// console.log(updateResponse);
                                            
                                            if (extraTacosFromItems > 0){
                                                message.channel.send(message.author + " You have prepared `" + tacosToPrepare + "` tacos :taco:! `" + soiledToTaco +"` were from soiled crops. The tacos also come with `1` warranty protection" + " received `" + extraTacosFromItems + "` extra tacos");
                                            }else{
                                                message.channel.send(message.author + " You have prepared `" + tacosToPrepare + "` tacos :taco:! `" + soiledToTaco +"` were from soiled crops. The tacos also come with `1` warranty protection");
                                            }
                                            var experienceFromItems = wearStats.calculateExtraExperienceGained(wearRes, "prepare", null)
                                            experience.gainExperience(message, message.author, (EXPERIENCE_GAINS.prepare + (EXPERIENCE_GAINS.preparePerStand * userTacoStands) + experienceFromItems) , prepareResponse);
                                            stats.statisticsManage(discordUserId, "maxextratacos", soiledToTaco, function(staterr, statSuccess){
                                                if (staterr){
                                                    // console.log(staterr);
                                                }
                                                else{
                                                    // check achievements??
                                                    // console.log(statSuccess);
                                                    // check achievements??
                                                    var data = {}
                                                    data.achievements = achievements;
                                                    data.maxextratacos = soiledToTaco;
                                                    // console.log(data);
                                                    achiev.checkForAchievements(discordUserId, data, message);
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        }
                        else{
                            message.channel.send(message.author + " You do not have any stands to prepare tacos with! buy some from the shop. Do -shop to see what you can buy");
                        }
                    }
                    else{
                        now = new Date(now.setSeconds(now.getSeconds() + secondsToRemove));
                        var numberOfHours = getDateDifference(prepareResponse.data.lastpreparetime, now, 48);
                        message.channel.send(message.author + " You ran out of ingredients! Please wait `" + numberOfHours + "` ");
                    }
                }
            })
        }
    })
}

module.exports.welcomeCommand = function(message){
    // welcome a user to the server gain 2 tacos
    var discordUserId = message.author.id;
    var users  = message.mentions.users;
    var mentionedId;
    var mentionedUser;
    // console.log(users);
    users.forEach(function(user){
        // console.log(user.id);
        mentionedId = user.id;
        mentionedUser = user
    })
    var valid = true;
    if (Last_Five_Welcomes.length >= 4){
        valid = false;
        for (var welcomer in Last_Five_Welcomes){
            if (Last_Five_Welcomes[welcomer] != message.author.id){
                valid = true;
            }
        }
    }
    
    if (!valid){
        message.channel.send(message.author +" Stop. you are spamming!")
    }
    else if (mentionedId == discordUserId){
        message.channel.send(message.author +" You can't welcome yourself!")
    }
    else if(mentionedUser && !mentionedUser.bot){
        // check first that user exists, if user doesn't exist create user, then check if welcomed user exists
        // if welcomed user exists set to true, if not then create the user and set to true
        profileDB.getUserProfileData( mentionedId, function(err, welcomeResponse) {
            if(err){
                // user doesnt exist, create their profile first
                if(err.code === 0 && ( !NeedsToAgree[mentionedId] || (NeedsToAgree[mentionedId] && NeedsToAgree[mentionedId].hostUser == "Bender")) ){
                    welcomeAgreeToTerms(message, mentionedId, mentionedUser, message.author);
                }
                else{
                    message.channel.send("The user has already been welcomed and needs to agree, or deny the terms.");
                }
            }
            else{
                // user exists, check if user has already been welcomed
                if ( !welcomeResponse.data.welcomed ){
                    profileDB.updateUserTacosWelcome(mentionedId, 50, function(err, updateResponse) {
                        if (err){
                            // console.log(err);
                        }
                        else{
                            // send message that the user has 1 more taco
                            Last_Five_Welcomes.push(discordUserId);
                            if (Last_Five_Welcomes.length >= 5){
                                Last_Five_Welcomes.shift();
                            }
                            message.channel.send(mentionedUser + " Welcome! You now have " + (welcomeResponse.data.tacos + 50) + " tacos! :taco:");
                            stats.statisticsManage(discordUserId, "welcomecount", 1, function(err, statSuccess){
                                if (err){
                                    // console.log(err);
                                }
                                else{
                                    // check achievements??
                                    getProfileForAchievement(discordUserId, message)
                                }
                            })
                        }
                    })
                }
                else{
                    Last_Five_Welcomes.push(discordUserId);
                    if (Last_Five_Welcomes.length >= 5){
                        Last_Five_Welcomes.shift();
                    }
                    message.channel.send(message.author + " This user has already been welcomed!");
                }
            }
        }) 
    }else{
        message.channel.send("You must mention the user that you want to welcome! example: `-welcome @user`")
    }
}

module.exports.giveCommand = function(message, giveTacoAmount){
    var discordUserId = message.author.id;
    var users  = message.mentions.users;
    var mentionedId;
    var mentionedUser;
    giveTacoAmount = Math.floor(giveTacoAmount);
    // console.log("giveTacoAmount " + giveTacoAmount)
    // console.log(users);
    users.forEach(function(user){
        // console.log(user.id);
        mentionedId = user.id;
        mentionedUser = user
    })
    var tacosInUse = 0;
    if (tacosInUseAuction[discordUserId] && tacosInUseAuction[discordUserId] > 0){
        tacosInUse = tacosInUseAuction[discordUserId];
    }
    // get user
    if (!mentionedId || !mentionedUser){
        message.channel.send(message.author + " You must mention a user whom you want to give your tacos to!")
    }
    else if (mentionedId == discordUserId){
        message.channel.send(message.author + " You can't give yourself taco!")
    }
    else if(giveTacoAmount < 2){
        message.channel.send(message.author + " You must give more than 2 tacos!")
    }
    else if (NeedsToAgree[mentionedId] && NeedsToAgree[mentionedId].hasNotAgreed){
        message.channel.send("the user has not yet agreed to the terms!")
    }
    else{
        profileDB.getUserProfileData( discordUserId, function(err, giveResponse) {
            if(err){
                // user doesnt exist, 
                if(err.code === 0){
                    agreeToTerms(message, discordUserId);
                    message.channel.send(message.author + " You have no tacos to give!");
                }
            }
            else{
                // check if user has enough tacos to give
                var achievements = giveResponse.data.achievements;
                if (giveResponse.data.tacos - tacosInUse - giveTacoAmount >= 0 ){
                    // console.log("have enough");
                    profileDB.getUserProfileData( mentionedId, function(mentionederr, giveMentionedResponse) {
                        if(mentionederr){
                            // console.log(mentionederr);
                            // create user and give them the number of tacos
                            var now = new Date();
                            var threedaysAgo = new Date();
                            threedaysAgo = new Date(threedaysAgo.setHours(threedaysAgo.getHours() - 72));
                            var userData = {

                                discordId: mentionedId,
                                tacos: 0,
                                birthdate: "2001-10-05",
                                lastthanktime: threedaysAgo,
                                lastcooktime: threedaysAgo,
                                lastsorrytime: threedaysAgo,
                                lastscavangetime: threedaysAgo,
                                tacostands: 1,
                                welcomed: false,
                                lastpreparetime: threedaysAgo,
                                pickaxe: "none",
                                map: false,
                                phone: false
                            }
                            profileDB.createUserProfile(userData, function(createerr, createResponse){
                                if(createerr){
                                    // console.log(createerr);
                                }
                                else{
                                    // console.log(createResponse);
                                    exports.giveCommand(message, giveTacoAmount);
                                }
                            })
                        }
                        else{
                            var initialTacoTax = Math.floor(giveTacoAmount * 0.1);
                            var tacoTax = initialTacoTax;
                            // console.log(tacoTax);
                            if (initialTacoTax < 1){
                                tacoTax = 1;
                            }
                            if (initialTacoTax >= 1){
                                tacoTax = tacoTax + 1
                            }
                            var negativeGiveTacoAmount = giveTacoAmount * -1
                            // console.log(negativeGiveTacoAmount);
                            profileDB.updateUserTacosGive(discordUserId, negativeGiveTacoAmount, function(givererr, giverUpdateResponse) {
                                if (givererr){
                                    // console.log(givererr);
                                }
                                else{
                                    // 
                                    giveTacoAmount = giveTacoAmount - tacoTax;
                                    // console.log(giveTacoAmount);
                                    profileDB.updateUserTacosGive(mentionedId, giveTacoAmount, function(receivererr, receiverUpdateResponse) {
                                        if (receivererr){
                                            // console.log(receivererr);
                                        }
                                        else{
                                            // send message that the user has gotten tacos
                                            message.channel.send(message.author + " gifted " + mentionedUser + " `" + giveTacoAmount + "` tacos! :taco: and Bender kept `" + tacoTax + "` tacos for tax purposes." );
                                            ///// For Artifact or Missions
                                            var dataForMission = {
                                                giveAmount: giveTacoAmount
                                            }
                                            missionCheckCommand(message, discordUserId, "give", mentionedId, dataForMission)
                                            
                                            stats.statisticsManage(discordUserId, "givecount", giveTacoAmount, function(err, statSuccess){
                                                if (err){
                                                    // console.log(err);
                                                }
                                                else{
                                                    // console.log(statSuccess);
                                                    // check achievements??
                                                    var data = {}
                                                    data.achievements = achievements;
                                                    data.givecount = giveTacoAmount;
                                                    // console.log(data);
                                                    achiev.checkForAchievements(discordUserId, data, message);
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
                else{
                    // console.log('dont have enough tacos.')
                }
            }
        })
    }
}

module.exports.cookCommand = function(message){
    var discordUserId = message.author.id;
    var cookRoll = 20;
    // roll for cook
    var rolls = Math.floor(Math.random() * 100) + 1;
    if (rolls > 97){
        cookRoll = 70
    }
    else if(rolls > 85){
        cookRoll = 60
    }
    else if(rolls > 70){
        cookRoll = 50
    }
    else if(rolls > 50){
        cookRoll = 40
    }
    else if(rolls > 20 ){
        cookRoll = 30
    }
    else{
        cookRoll = 20
    }

    profileDB.getUserProfileData( discordUserId, function(err, cookResponse) {
        if(err){
            // user doesnt exist, they cannot cook
            agreeToTerms(message, discordUserId);
        }
        else{
            var userLevel = cookResponse.data.level;
            var extraTacosFromCasserole = 0;
            var HAS_CASSEROLE = cookResponse.data.casserole;
            if (HAS_CASSEROLE){
                extraTacosFromCasserole = cookResponse.data.level * 5;
            }
            wearStats.getUserWearingStats(message, discordUserId, {userLevel: userLevel}, function(wearErr, wearRes){
                if (wearErr){
                    
                }else{
                    // check six hours ago
                    var secondsToRemove = wearStats.calculateSecondsReduced(wearRes, "cook");

                    var achievements = cookResponse.data.achievements;
                    var now = new Date();
                    var threeDaysAgo = new Date();
                    ///////// CALCULATE THE MINUTES REDUCED HERE 
                    threeDaysAgo = new Date(threeDaysAgo.setHours(threeDaysAgo.getHours() - COOK_COOLDOWN_HOURS));

                    threeDaysAgo = new Date(threeDaysAgo.setSeconds(threeDaysAgo.getSeconds() + secondsToRemove));

                    if ( threeDaysAgo > cookResponse.data.lastcooktime ){
                        ///////// CALCULATE THE EXTRA TACOS HERE 
                        var extraTacosFromItems = wearStats.calculateExtraTacos(wearRes, "cook"); // 0 or extra

                        profileDB.updateUserTacosCook(discordUserId, cookRoll + extraTacosFromItems + extraTacosFromCasserole , function(err, updateResponse) {
                            if (err){
                                // console.log(err);
                            }
                            else{
                                // send message that the user has 1 more taco
                                if (extraTacosFromItems > 0 && HAS_CASSEROLE){
                                    message.channel.send(message.author + " Cooked `" + cookRoll + "` tacos! you now have `" + (cookResponse.data.tacos + cookRoll) + "` tacos :taco:" + "! received `" + extraTacosFromCasserole + "` extra tacos :taco: from your casserole " + " and received `" + extraTacosFromItems + "` extra tacos from items" );
                                }
                                else if (extraTacosFromItems > 0 && !HAS_CASSEROLE){
                                    message.channel.send(message.author + " Cooked `" + cookRoll + "` tacos! you now have `" + (cookResponse.data.tacos + cookRoll) + "` tacos :taco:" + "! " + "received `" + extraTacosFromItems + "` extra tacos");
                                }
                                else if (HAS_CASSEROLE){
                                    message.channel.send(message.author + " Cooked `" + cookRoll + "` tacos! you now have `" + (cookResponse.data.tacos + cookRoll) + "` tacos :taco:" + "! received `" + extraTacosFromCasserole + "` extra tacos :taco: from your casserole" );
                                }else{
                                    message.channel.send(message.author + " Cooked `" + cookRoll + "` tacos! you now have `" + (cookResponse.data.tacos + cookRoll) + "` tacos :taco:" );
                                }
                                var data = {}
                                data.achievements = achievements;
                                data.cookcount = cookRoll
                                // console.log(data);
                                achiev.checkForAchievements(discordUserId, data, message);
                                var experienceFromItems = wearStats.calculateExtraExperienceGained(wearRes, "cook", null);
                                experience.gainExperience(message, message.author, (EXPERIENCE_GAINS.cook + experienceFromItems), cookResponse);
                            }
                        })
                    }else{
                        // six hours have not passed, tell the user they need to wait 
                        now = new Date(now.setSeconds(now.getSeconds() + secondsToRemove));
                        var numberOfHours = getDateDifference(cookResponse.data.lastcooktime, now, 24);
                        message.channel.send(message.author + " You cannot cook tacos currently! Please wait `" + numberOfHours + "` ");
                    }
                }
            })
            
        }
    })
}

module.exports.throwCommand = function(message){
    // console.log(message);
    var discordUserId = message.author.id;
    var users  = message.mentions.users;
    var userMentioned;
    var mentionedId;
    var mentionedUser;
    var mentionedDiscriminator;
    // console.log(users);
    users.forEach(function(user){
        // console.log(user.id);
        userMentioned = user;
        mentionedId = user.id;
        mentionedUser = user
        mentionedDiscriminator = user.discriminator;
    })
    var tacosInUse = 0;
    if (tacosInUseAuction[discordUserId] && tacosInUseAuction[discordUserId] > 0){
        tacosInUse = tacosInUseAuction[discordUserId];
    }
    
    // throw a taco at someone
    if ( message.mentions.users.size > 0 && discordUserId != mentionedId){
        // 
        profileDB.getUserProfileData( discordUserId, function(err, throwResponse) {
            if(err){
                // user doesnt exist, create their profile first
                if(err.code === 0){
                    // user doesn't exist
                    agreeToTerms(message, discordUserId);
                    message.reply(" you do not have any tacos to throw!");
                }
            }
            else{
                // user exists, subtract 1 taco 
                var achievements = throwResponse.data.achievements;
                // console.log("asdfasfsd " + throwResponse.data.tacos)
                if (throwResponse.data.tacos - tacosInUse >= 1){
                    profileDB.updateUserTacosThrow(discordUserId, -10, function(err, updateResponse) {
                        if (err){
                            // console.log(err);
                        }
                        else{
                            // send message that the user has 1 more taco
                            message.channel.send(message.author + " threw `10` tacos at " + userMentioned + " :dizzy_face: :taco: :wave: :smiling_imp:");
                            // if they drop a taco someone else can pick it up
                            var poisonedTacoRoll = Math.floor(Math.random() * 100) + 1;
                            var poisonedTaco = false;
                            if (poisonedTacoRoll > 75){
                                poisonedTaco = true;
                            }
                            QueueOfTacosDropped.push({ droppedBy: mentionedId, cannotPickUp: discordUserId, poisoned: poisonedTaco })
                        
                            stats.statisticsManage(discordUserId, "throwntocount", 1, function(err, statSuccess){
                                if (err){
                                    // console.log(err);
                                }
                                else{
                                    // check achievements??
                                    var data = {}
                                    data.achievements = achievements;
                                    // console.log(data);
                                    achiev.checkForAchievements(discordUserId, data, message);
                                    stats.statisticsManage(mentionedId, "thrownatcount", 1, function(err, statSuccess){
                                        if (err){
                                            // console.log(err);
                                        }
                                        else{
                                            profileDB.getUserProfileData( mentionedId, function(err, thrownAtRes) {
                                                if(err){
                                                }
                                                else{
                                                    // check achievements for thrown at user
                                                    var mentionedAchievements = thrownAtRes.data.achievements
                                                    var mentionedData = {}
                                                    mentionedData.achievements = mentionedAchievements;
                                                    // console.log(mentionedData);
                                                    achiev.checkForAchievements(mentionedUser.id, mentionedData, message, false, mentionedUser);
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
                else{
                    message.reply(" you do not have any tacos to throw! ")
                }
            }
        })
    }
}

module.exports.profileCommand = function(message){
    // console.log(message);
    var discordUserId = message.author.id;
    var users  = message.mentions.users;
    var mentionedId;
    var mentionedUser;
    var mentionedUserAvatarURL;
    // console.log(users);
    users.forEach(function(user){
        // console.log(user.id);
        mentionedId = user.id;
        mentionedUser = user.username
        mentionedUserAvatarURL = user.avatarURL;
    })
    if ( message.mentions.users.size > 0 ){
        profileDB.getUserProfileData( mentionedId, function(err, profileResponse) {
            if(err){
                // user doesnt exist, create their profile first
                message.channel.send("user has not yet agreed to the terms!")
            }
            else{
                var profileData = {}
                profileData.userName = mentionedUser;
                profileData.avatarURL = mentionedUserAvatarURL;
                profileData.userTacos = profileResponse.data.tacos;
                if (tacosInUseAuction[discordUserId] && tacosInUseAuction[discordUserId] > 0){
                    profileData.userTacos = profileData.userTacos - tacosInUseAuction[discordUserId];
                }
                profileData.userTacoStands = profileResponse.data.tacostands ? profileResponse.data.tacostands : 0;
                profileData.userItems = "none";
                profileData.pasta = profileResponse.data.pasta;
                profileData.reputation = profileResponse.data.reputation;
                profileData.level = profileResponse.data.level ? profileResponse.data.level : 1;
                profileData.experience = profileResponse.data.experience ? profileResponse.data.experience : 0;
                profileData.rpgPoints = profileResponse.data.rpgpoints ? profileResponse.data.rpgpoints : 0;
                profileData.currentRpgChallenge = profileResponse.data.currentchallenge ? profileResponse.data.currentchallenge : 0;
                profileData.nextLevelExp = Levels[profileData.level + 1];
                if (!profileData.reputation){
                    profileData.reputation = 0;
                }
                profileData.reputationStatus = profileResponse.data.repstatus;
                profileData.nextReputation = ""
                if (profileData.reputationStatus == null){
                    profileData.nextReputation = "liked"
                    profileData.reputationStatus = "Friendly"
                }
                else if (profileData.reputationStatus.toLowerCase() == "liked"){
                    profileData.nextReputation = "respected"
                }
                else if (profileData.reputationStatus.toLowerCase() == "respected"){
                    profileData.nextReputation = "admired"
                }
                else if (profileData.reputationStatus.toLowerCase() == "admired"){
                    profileData.nextReputation = "glorified"
                }
                else if (profileData.reputationStatus.toLowerCase() == "glorified"){
                    profileData.nextReputation = "sanctified"
                }
                else if (profileData.reputationStatus.toLowerCase() == "sanctified"){
                    profileData.nextReputation = "sanctified"
                }
                profileData.achievementString = achiev.achievementStringBuilder(profileResponse.data.achievements, false);
                if (profileResponse.data.pickaxe == "basic"){
                    
                    profileData.userItems = "Pickaxe :pick: \n"
                }
                else if(profileResponse.data.pickaxe == "improved"){
                    profileData.userItems = "Improved Pickaxe :small_blue_diamond::pick: \n"
                }
                else if(profileResponse.data.pickaxe == "master"){
                    profileData.userItems = "Master Pickaxe :diamond_shape_with_a_dot_inside::pick: \n"
                }
                else if(profileResponse.data.pickaxe == "ethereal"){
                    profileData.userItems = "Ethereal Pickaxe :cyclone::pick: \n"
                }
                else if(profileResponse.data.pickaxe == "zeus"){
                    profileData.userItems = "Zeus' Trident :sparkles::pick: \n"
                }
                if (profileResponse.data.casserole == true){
                    profileData.userItems = profileData.userItems + "Casserole :shallow_pan_of_food: \n"
                }
                if (profileResponse.data.sprintingshoes == true){
                    profileData.userItems = profileData.userItems + "Sprinting Shoes :athletic_shoe: \n"
                }
                if (profileResponse.data.flasks){
                    profileData.userItems = profileData.userItems + "Flasks :alembic: " + profileResponse.data.flasks + "\n"
                }
                if (profileResponse.data.petname){
                    if (profileResponse.data.pet && PETS_AVAILABLE[profileResponse.data.pet]){
                        profileData.petname = profileResponse.data.petname
                        profileData.petemoji = PETS_AVAILABLE[profileResponse.data.pet].emoji
                    }
                }
                profileBuilder(message, profileData);
            }
        })
    }
    else{
        profileDB.getUserProfileData( discordUserId, function(err, profileResponse) {
            if(err){
                // user doesnt exist, create their profile first
                agreeToTerms(message, discordUserId);
            }
            else{
                var profileData = {}
                profileData.userName = message.author.username;
                profileData.avatarURL = message.author.avatarURL;
                profileData.userTacos = profileResponse.data.tacos;
                if (tacosInUseAuction[discordUserId] && tacosInUseAuction[discordUserId] > 0){
                    profileData.userTacos = profileData.userTacos - tacosInUseAuction[discordUserId];
                }
                profileData.userTacoStands = profileResponse.data.tacostands ? profileResponse.data.tacostands : 0;
                profileData.userItems = "none";
                profileData.pasta = profileResponse.data.pasta;
                profileData.reputation = profileResponse.data.reputation;
                profileData.reputationStatus = profileResponse.data.repstatus;
                profileData.level = profileResponse.data.level ? profileResponse.data.level : 1;
                profileData.experience = profileResponse.data.experience ? profileResponse.data.experience : 0;
                profileData.nextLevelExp = Levels[profileData.level + 1];
                profileData.rpgPoints = profileResponse.data.rpgpoints ? profileResponse.data.rpgpoints : 0;
                profileData.currentRpgChallenge = profileResponse.data.currentchallenge ? profileResponse.data.currentchallenge : 0;
                if (!profileData.reputation){
                    profileData.reputation = 0;
                }
                profileData.nextReputation = ""
                if (profileData.reputationStatus == null){
                    profileData.nextReputation = "liked"
                    profileData.reputationStatus = "Friendly"
                }
                else if (profileData.reputationStatus.toLowerCase() == "liked"){
                    profileData.nextReputation = "respected"
                }
                else if (profileData.reputationStatus.toLowerCase() == "respected"){
                    profileData.nextReputation = "admired"
                }
                else if (profileData.reputationStatus.toLowerCase() == "admired"){
                    profileData.nextReputation = "glorified"
                }
                else if (profileData.reputationStatus.toLowerCase() == "glorified"){
                    profileData.nextReputation = "sanctified"
                }
                else if (profileData.reputationStatus.toLowerCase() == "sanctified"){
                    profileData.nextReputation = "sanctified"
                }
                profileData.achievementString = achiev.achievementStringBuilder(profileResponse.data.achievements, false);
                if (profileResponse.data.pickaxe == "basic"){
                    
                    profileData.userItems = "Pickaxe :pick: \n"
                }
                else if(profileResponse.data.pickaxe == "improved"){
                    profileData.userItems = "Improved Pickaxe :small_blue_diamond::pick: \n"
                }
                else if(profileResponse.data.pickaxe == "master"){
                    profileData.userItems = "Master Pickaxe :diamond_shape_with_a_dot_inside::pick: \n"
                }
                else if(profileResponse.data.pickaxe == "ethereal"){
                    profileData.userItems = "Ethereal Pickaxe :cyclone::pick: \n"
                }
                else if(profileResponse.data.pickaxe == "zeus"){
                    profileData.userItems = "Zeus' Trident :sparkles::pick: \n"
                }
                if (profileResponse.data.casserole == true){
                    profileData.userItems = profileData.userItems + "Casserole :shallow_pan_of_food: \n"
                }
                if (profileResponse.data.sprintingshoes == true){
                    profileData.userItems = profileData.userItems + "Sprinting Shoes :athletic_shoe: \n"
                }
                if (profileResponse.data.flasks){
                    profileData.userItems = profileData.userItems + "Flasks :alembic: " + profileResponse.data.flasks + "\n"
                }
                if (profileResponse.data.petname){
                    if (profileResponse.data.pet && PETS_AVAILABLE[profileResponse.data.pet]){
                        profileData.petname = profileResponse.data.petname
                        profileData.petemoji = PETS_AVAILABLE[profileResponse.data.pet].emoji
                    }
                }
                profileBuilder(message, profileData);
            }
        })
    }
}

module.exports.achievementsCommand = function(message){
    var discordUserId = message.author.id;
    
    profileDB.getUserProfileData( discordUserId, function(err, profileResponse) {
        if(err){
            // user doesnt exist, create their profile first
            agreeToTerms(message, discordUserId);
        }
        else{
            var profileData = {}
            profileData.userName = message.author.username;
            profileData.achievementStrings = achiev.achievementStringBuilder(profileResponse.data.achievements, true);            
            achievEmbedBuilder(message, profileData);
        }
    })
}

function achievEmbedBuilder(message, profileData){
    const embed = new Discord.RichEmbed()
    .setColor(0xF2E93E)
    for (var i = profileData.achievementStrings.length - 1; i >= 0; i--){
        embed.addField(profileData.userName + "'s Achievements " + ':medal:', profileData.achievementStrings[i])
    }
    message.channel.send({embed});
}

module.exports.xpCommand = function(message){
    var discordUserId = message.author.id;

    profileDB.getUserProfileData( discordUserId, function(err, profileResponse) {
        if(err){
            // user doesnt exist, create their profile first
            agreeToTerms(message, discordUserId);
        }
        else{
            var profileData = {}
            profileData.userName = message.author.username;
            profileData.experience = profileResponse.data.experience ? profileResponse.data.experience : 0;
            profileData.level = profileResponse.data.level ? profileResponse.data.level : 1;
            profileData.nextLevelExp = Levels[profileData.level + 1];
            xpEmbedBuilder(message, profileData);
        }
    })
}

function xpEmbedBuilder(message, profileData){
    const embed = new Discord.RichEmbed()
    .setAuthor(profileData.userName + "'s Level and Experience")
    .setColor(0xF2E93E)
    .addField('Level ' + profileData.level + ' :trident:', "**Next Level:** " + profileData.experience + " / " + profileData.nextLevelExp)
    message.channel.send({embed});
}

module.exports.tacosCommand = function(message){
    var discordUserId = message.author.id;

    profileDB.getUserProfileData( discordUserId, function(err, profileResponse) {
        if(err){
            // user doesnt exist, create their profile first
            if(err.code === 0){
                // user doesnt exist
                agreeToTerms(message, discordUserId);
            }
        }
        else{
            var profileData = {}
            profileData.userName = message.author.username;
            profileData.userTacos = profileResponse.data.tacos;
            if (tacosInUseAuction[discordUserId] && tacosInUseAuction[discordUserId] > 0){
                profileData.userTacos = profileData.userTacos - tacosInUseAuction[discordUserId];
            }
            tacoEmbedBuilder(message, profileData);
        }
    })
}

function tacoEmbedBuilder(message, profileData){
    const embed = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .addField( profileData.userName +"'s Tacos" + ' :taco:', profileData.userTacos, true)
    .setFooter('use ' + config.commandString + 'give @user to give a user some tacos!')
    message.channel.send({embed});
}

module.exports.tacoStandsCommand = function(message){
    var discordUserId = message.author.id;

    profileDB.getUserProfileData( discordUserId, function(err, profileResponse) {
        if(err){
            // user doesnt exist, create their profile first
            if(err.code === 0){
                // user doesnt exist
                agreeToTerms(message, discordUserId);
            }
        }
        else{
            var profileData = {}
            profileData.userName = message.author.username;
            profileData.userTacoStands = profileResponse.data.tacostands;
            tacoStandsEmbedBuilder(message, profileData);
        }
    })
}

function tacoStandsEmbedBuilder(message, profileData){
    const embed = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .addField(profileData.userName +"'s Taco Stands :bus:", profileData.userTacoStands, true)

    message.channel.send({embed});
}

module.exports.buyPickaxeCommand = function(message){
    // purchase pickaxe
    var discordUserId = message.author.id

    profileDB.getUserProfileData( discordUserId, function(err, pickaxeResponse) {
        if(err){
            // user doesnt exist tell the user they should get some tacos
            agreeToTerms(message, discordUserId);
            message.channel.send(message.author + " You can't afford a pickaxe!");
        }
        else{
            if (pickaxeResponse.data.pickaxe == "none"){
                if (pickaxeResponse.data.tacos >= PICKAXE_COST){
                    // purchaseStand
                    var tacosSpent = PICKAXE_COST * -1;
                    profileDB.purchasePickAxe(discordUserId, tacosSpent, function(err, data){
                        if (err){
                            // console.log(err);
                            // couldn't purchase stand
                        }
                        else{
                            experience.gainExperience(message, message.author, EXPERIENCE_GAINS.buyPickaxe , pickaxeResponse);
                            message.channel.send(message.author + " Congratulations, you have purchased a pickaxe :pick:!");
                        }
                    })
                }
                else{
                    message.channel.send(message.author + " You cannot afford the `Pickaxe`");
                }
            }
            else if (pickaxeResponse.data.pickaxe == "basic"){
                if (pickaxeResponse.data.tacos >= IMPROVED_PICKAXE_COST){
                    // purchaseStand
                    var tacosSpent = IMPROVED_PICKAXE_COST * -1;
                    profileDB.purchasePickAxe(discordUserId, tacosSpent, function(err, data){
                        if (err){
                            // console.log(err);
                            // couldn't purchase stand
                        }
                        else{
                            experience.gainExperience(message, message.author, EXPERIENCE_GAINS.buyPickaxe * 3 , pickaxeResponse);
                            message.channel.send(message.author + " Congratulations, you have purchased an Improved Pickaxe :pick:!");
                        }
                    })
                }
                else{
                    message.channel.send(message.author + " You cannot afford the `Improved Pickaxe`");
                }
            }
            else if (pickaxeResponse.data.pickaxe == "improved"){
                if (pickaxeResponse.data.tacos >= MASTER_PICKAXE_COST){
                    // purchaseStand
                    var tacosSpent = MASTER_PICKAXE_COST * -1;
                    profileDB.purchasePickAxe(discordUserId, tacosSpent, function(err, data){
                        if (err){
                            // console.log(err);
                            // couldn't purchase stand
                        }
                        else{
                            experience.gainExperience(message, message.author, EXPERIENCE_GAINS.buyPickaxe * 10 , pickaxeResponse);
                            message.channel.send(message.author + " Congratulations, you have purchased the Master Pickaxe :pick:!");
                        }
                    })
                }
                else{
                    message.channel.send(message.author + " You cannot afford the `Master Pickaxe`");
                }
            }
            else if (pickaxeResponse.data.pickaxe == "master"){
                if (pickaxeResponse.data.tacos >= ETHEREAL_PICKAXE_COST){
                    // purchaseStand
                    var tacosSpent = ETHEREAL_PICKAXE_COST * -1;
                    profileDB.purchasePickAxe(discordUserId, tacosSpent, function(err, data){
                        if (err){
                            // console.log(err);
                            // couldn't purchase stand
                        }
                        else{
                            experience.gainExperience(message, message.author, EXPERIENCE_GAINS.buyPickaxe * 50 , pickaxeResponse);
                            message.channel.send(message.author + " Congratulations, you have purchased the Ethereal Pickaxe :pick:!");
                        }
                    })
                }
                else{
                    message.channel.send(message.author + " You cannot afford the `Ethereal Pickaxe`");
                }
            }
            else if (pickaxeResponse.data.pickaxe == "ethereal"){
                if (pickaxeResponse.data.tacos >= ZEUS_TRIDENT_COST){
                    // purchaseStand
                    var tacosSpent = ZEUS_TRIDENT_COST * -1;
                    profileDB.purchasePickAxe(discordUserId, tacosSpent, function(err, data){
                        if (err){
                            // console.log(err);
                            // couldn't purchase stand
                        }
                        else{
                            experience.gainExperience(message, message.author, EXPERIENCE_GAINS.buyPickaxe * 500 , pickaxeResponse);
                            message.channel.send(message.author + " Congratulations, you have purchased Zeus' Trident :pick:!");
                        }
                    })
                }
                else{
                    message.channel.send(message.author + " You cannot afford `Zeus' Trident`");
                }
            }
        }
    })
}
    

function profileBuilder(message, profileData){
    const embed = new Discord.RichEmbed()
    //.setTitle('This is your title, it can hold 256 characters')
    .setAuthor(profileData.userName +"'s profile")
    /*
    * Alternatively, use '#00AE86', [0, 174, 134] or an integer number.
    */
    .setColor(0x00AE86)
    
    //.setFooter('This is the footer text, it can hold 2048 characters', 'http://i.imgur.com/w1vhFSR.png')
    //.setImage(message.author.avatarURL)
    .setThumbnail(profileData.avatarURL)
    /*
    * Takes a Date object, defaults to current date.
    */
    .setTimestamp()
    .addField('Tacos  :taco:', profileData.userTacos, true)
    
    .addField('Taco Stands :bus:', profileData.userTacoStands, true)
    .addField('Level ' + profileData.level + ' :trident:', "**Next Level:** " + profileData.experience + " / " + profileData.nextLevelExp, true)
    .addField('Bender Reputation :statue_of_liberty:', " **"+ profileData.reputationStatus +"** : " + profileData.reputation + " / " + REPUTATIONS[profileData.nextReputation].repToGet , true)
    if (profileData.petname){
        embed.addField('Pet', profileData.petname + " " + profileData.petemoji , true)
    }
    if (profileData.pasta && profileData.pasta.length > 0){
        embed.setDescription(profileData.pasta)
    }
    embed.addField('Items :shopping_bags:', profileData.userItems, true)
    .addField('Achievements :military_medal: ', profileData.achievementString, true)
    .addField('RPG stats :fleur_de_lis:  ', "Points : " + profileData.rpgPoints + "\nChallenge: " + profileData.currentRpgChallenge + "\nRating: 1500 ", true)
    message.channel.send({embed});
}

function shopBuilder(message, shopData, long){
    if (!long){
        var treeCost = BASE_TACO_COST + (shopData.userTacoCost * 250) + " :taco:"        
        // show short shop
        const embed = new Discord.RichEmbed()
        .setColor(0x87CEFA)
        .addField('Taco Stands', treeCost, true)        
        if(shopData.pickaxe == "none"){
            var pickaxeCost = PICKAXE_COST +" :taco:";
            embed.addField('Pickaxe', pickaxeCost, true)
        }
        else if (shopData.pickaxe == "basic"){
            // improved pickaxe
            pickaxeCost = IMPROVED_PICKAXE_COST + " :taco:";
            embed.addField('Improved Pickaxe', pickaxeCost, true)
        }
        else if (shopData.pickaxe == "improved"){
            // improved pickaxe
            pickaxeCost = MASTER_PICKAXE_COST + " :taco:";
            embed.addField('Master Pickaxe', pickaxeCost, true)
        }
        else if (shopData.pickaxe == "master"){
            // improved pickaxe
            pickaxeCost = ETHEREAL_PICKAXE_COST + " :taco:";
            embed.addField('Ethereal Pickaxe', pickaxeCost, true)
        }
        else if (shopData.pickaxe == "ethereal"){
            // improved pickaxe
            pickaxeCost = ZEUS_TRIDENT_COST + " :taco:";
            embed.addField("Zeus' Trident", pickaxeCost, true)
        }
        embed.addField('Pasta', PASTA_COST + " :taco:", true)
        embed.addField('Knife',  SHOP_ITEM_COST + " :taco:", true)
        embed.addField('Shorts', SHOP_ITEM_COST + " :taco:", true)
        embed.addField('T-Shirt', SHOP_ITEM_COST + " :taco:", true)
        embed.addField('Skirt',  SHOP_ITEM_COST + " :taco:", true)
        embed.addField('Belt', SHOP_ITEM_COST + " :taco:", true)
        embed.addField('Socks', SHOP_ITEM_COST + " :taco:", true)
        
        // allow for pet to be purchased
        if (shopData.repstatus && (REPUTATIONS[shopData.repstatus.toLowerCase()]) ){
            var userRepLevel = REPUTATIONS[shopData.repstatus.toLowerCase()].level;
            if (userRepLevel >= 2){
                var repDescription = "Bender's Reputation shop. use -repshop to see what Bender has to offer.";         
                embed.addField('Reputation shop', repDescription, true)
            }
        }
        embed.addField('Your current tacos', shopData.userTacos + " :taco:", false)   
        embed.addField('Descriptions', "-shop long to see descriptions", false)   
        message.channel.send({embed});        
    }
    else {
        var welcomeMessage = "Hey " + message.author.username + "! Welcome to Bender's shop."
        var tacoStandDescription = "Taco stands can be used to produce tacos based on the number of stands you have. \nYou can produce " + BASE_TACO_PREPARE + " per taco stand. \nThe cost of each additional stand will be higher - city tax bro. "
        var treeCost = BASE_TACO_COST + (shopData.userTacoCost * 250) + " :taco:"
        var pickaxeDescription = "The pickaxe can be used to scavenge. You never know what you will find in these lands ";
        var pastaDescription = "Add a quote to your profile, to purchase do: " +config.commandString + "buypasta [your pasta message]."
        
        var pickaxeCost = PICKAXE_COST +" :taco:";
        const embed = new Discord.RichEmbed()
        .setColor(0x87CEFA)
        .setTitle(welcomeMessage)
        .setThumbnail()
        .setDescription("Bender accepts Tacos as currency since he's a hungry guy :shrug:. Have a look around!")
        .addField('Taco Stands', ":bus:", true)
        .addField('Description', tacoStandDescription, true)
        .addField('Cost', treeCost, true)
        .addField('Command', config.commandString+ "buystand", true)
        if(shopData.pickaxe == "none"){
            embed.addBlankField(true)
            .addBlankField(false)
            .addField('Pickaxe', ":pick:", true)
            .addField('Description', pickaxeDescription, true)
            .addField('Cost', pickaxeCost, true)
            .addField('Command', config.commandString + "buypickaxe", true)
        }
        else if (shopData.pickaxe == "basic"){
            // improved pickaxe
            pickaxeDescription = "The Improved Pickaxe can be used to scavenge. Success rate compared to the pickaxe has increased.";
            pickaxeCost = IMPROVED_PICKAXE_COST + " :taco:";
            embed.addBlankField(true)
            .addBlankField(false)
            .addField('Improved Pickaxe', ":small_blue_diamond::pick:", true)
            .addField('Description', pickaxeDescription, true)
            .addField('Cost', pickaxeCost, true)
            .addField('Command', config.commandString + "buypickaxe", true)
        }
        else if (shopData.pickaxe == "improved"){
            // improved pickaxe
            pickaxeDescription = "The Master Pickaxe can be used to scavenge. This is the master pickaxe, your adventures will be rewarded with the greatest treasures :diamond_shape_with_a_dot_inside: ."
            pickaxeCost = MASTER_PICKAXE_COST + " :taco:";
            embed.addBlankField(true)
            .addBlankField(false)
            .addField('Master Pickaxe', ":diamond_shape_with_a_dot_inside::pick:", true)
            .addField('Description', pickaxeDescription, true)
            .addField('Cost', pickaxeCost, true)
            .addField('Command', config.commandString + "buypickaxe", true)
        }
        else if (shopData.pickaxe == "master"){
            // improved pickaxe
            pickaxeDescription = "The Ethereal Pickaxe can be used to scavenge. This is the Ethereal pickaxe, your adventures will be rewarded with unbelievable treasures :cyclone: .";
            pickaxeCost = ETHEREAL_PICKAXE_COST + " :taco:";
            embed.addBlankField(true)
            .addBlankField(false)
            .addField('Ethereal Pickaxe', ":cyclone::pick:", true)
            .addField('Description', pickaxeDescription, true)
            .addField('Cost', pickaxeCost, true)
            .addField('Command', config.commandString + "buypickaxe", true)
        }
        else if (shopData.pickaxe == "ethereal"){
            // improved pickaxe
            pickaxeDescription = "Zeus' Trident can be used to scavenge. This is the Ultimate Pickaxe, the gods will grant you the power to find mankind's most valuable treasures :sparkles: .";
            pickaxeCost = ZEUS_TRIDENT_COST + " :taco:";
            embed.addBlankField(true)
            .addBlankField(false)
            .addField("Zeus' Trident", ":sparkles::pick:", true)
            .addField('Description', pickaxeDescription, true)
            .addField('Cost', pickaxeCost, true)
            .addField('Command', config.commandString + "buypickaxe", true)
        }
        
        embed.addBlankField(true)
        .addBlankField(false)
        .addField('Pasta', ":spaghetti:", true)
        .addField('Description', pastaDescription, true)
        .addField('Cost', PASTA_COST + " :taco:", true)
        .addField('Command', config.commandString + "buyPasta", true)
        embed.addBlankField(true)
        embed.addField('Wearable Items', "Knife/Socks: " + SHOP_ITEM_COST + " :taco: gives chance at additional tacos when thanking\nShorts/Skirt: " + SHOP_ITEM_COST + ":taco: gives chance at additional tacos when sorrying\nT-shirt/Belt: " + SHOP_ITEM_COST + ":taco: gives chance at additional tacos when cooking\ndo `-buyitem details` for more info on these items\n****Each of these items can be combined into improved versions (requires 5 of the same item to combine | use command `-combine [itemname]`) ", true)
        .addField('Command', config.commandString + "buyitem [itemname] \n**example**: -buyitem knife", true)

        // allow for pet to be purchased
        if (shopData.repstatus && (REPUTATIONS[shopData.repstatus.toLowerCase()]) ){
            var userRepLevel = REPUTATIONS[shopData.repstatus.toLowerCase()].level;
            if (userRepLevel >= 2){
                var repDescription = "Bender's Reputation shop. use -repshop to see what Bender has to offer.";        
                embed.addBlankField(true)
                .addBlankField(false)
                .addField('Reputation shop', ":shopping_cart: ", true)
                .addField('Description', repDescription, true)
            }
        }
        embed.addBlankField(false)
        .addField('Your current tacos', shopData.userTacos + " :taco:", false)
        .setTimestamp()
        message.channel.send({embed});
    }
}

module.exports.shopCommand = function(message, args){
    var discordUserId = message.author.id;
    var includeDescriptions = false;
    if (args && args.length > 1){
        var long = args[1];
        if (long == "long"){
            includeDescriptions = true;
        }
    }
    profileDB.getUserProfileData( discordUserId, function(err, shopResponse) {
        if(err){
            // user doesnt exist tell the user they should get some tacos
            console.log(err)
            agreeToTerms(message, discordUserId);
        }
        else{
            // if user has enough tacos to purchase the tree, add 1 tree, subtract x tacos
            var shopData = {};
            var userTacoStands = 0;
            var userTacos = shopResponse.data.tacos;
            shopData.userTacos = userTacos;
            shopData.pickaxe = shopResponse.data.pickaxe;
            if (shopResponse.data.tacostands && shopResponse.data.tacostands > -1){
                userTacoStands = shopResponse.data.tacostands;
            }
            shopData.repstatus = shopResponse.data.repstatus
            shopData.userTacoCost = userTacoStands;
            shopBuilder(message, shopData, includeDescriptions);
        }
    })
}

module.exports.createPotionCommand = function(message){
    var discordUserId = message.author.id;

    profileDB.getUserProfileData( discordUserId, function(err, potionRes) {
        if(err){
            console.log(err);
        }
        else{
            // consume a flask and create a potion
            var currentFlasks = potionRes.data.flasks;
            if (currentFlasks > 0){
                // create random potion that reduces a command by 1 hour and gives effect in rpg (only 1 effect)
                profileDB.getItemData(function(err, getItemResponse){
                    if (err){
                        console.log(err);
                    }else{
                        var allItems = getItemResponse.data
                        var potionItems = [];
        
                        for (var item in allItems){
                            
                            if(allItems[item].itemraritycategory == "uncommon+" && allItems[item].amuletsource == "createpotion"){
                                potionItems.push(allItems[item]);
                            }
                        }
                        var itemsObtainedArray = [];
                        // roll for ancient
                        var potionRoll = Math.floor(Math.random() * potionItems.length);
                        console.log(potionItems[potionRoll]);
                        itemsObtainedArray.push(potionItems[potionRoll])

                        if (itemsObtainedArray.length > 0){
                            // consume the flask
                            profileDB.consumeFlask(discordUserId, function(consumeErr, consumeRes){
                                if (consumeErr){
                                    console.log(consumeErr);
                                }else{
                                    console.log(consumeRes);
                                    addToUserInventory(message.author.id, itemsObtainedArray);
                                }
                            })
                        }
        
                        const embed = new Discord.RichEmbed()
                        .setColor(0xF2E93E)
                        var rewardString = "";
                        
                        for (var item in itemsObtainedArray){
                            var itemAmount = itemsObtainedArray[item].itemAmount ? itemsObtainedArray[item].itemAmount : 1;
                            rewardString = rewardString + ":alembic: **" + itemsObtainedArray[item].itemname + "** - " + itemsObtainedArray[item].itemdescription + ", " +itemsObtainedArray[item].itemstatistics + " \n";
                        }
                        embed.addField("Potion Created", rewardString, true)
                        message.channel.send({embed});
                    }
                })
            }else{
                message.channel.send("You need a flask to create a potion")
            }
        }
    })
}

function shopItemDetailsBuilder(message){
    const embed = new Discord.RichEmbed()
    .setColor(0x87CEFA)
    .addField('Knife ', SHOP_ITEM_COST + " :taco: \ngives chance at additional tacos when **thanking**\n💚24 🗡️30 ☄️0 👕25 🙌25 \nbarrier - increase your target's spirit by 650\nstab - deal physical damage to your target", true)
    .addField('Shorts ', SHOP_ITEM_COST + ":taco: \ngives chance at additional tacos when **sorrying**\n💚24 🗡️0 ☄️30 👕25 🙌25 \nprotect - increase your target's armor by 650 \npoison - deal magical damage and magical damage over time for 3 turns", true)
    .addField('T-Shirt ', SHOP_ITEM_COST + ":taco: \ngives chance at additional tacos when **cooking**\n💚52 🗡️5 ☄️5 👕43 🙌43 \ntacoheal - heal your target\nhaste - your abilities are cast before enemy abilities", true)
    .addField('Skirt ', SHOP_ITEM_COST + " :taco: \ngives chance at additional tacos when **sorrying**\n💚24 🗡️0 ☄️30 👕25 🙌25 \nweaken - reduce your targets magical damage by 20%\ncurse - deal magical damage over time to your target", true)
    .addField('Belt ', SHOP_ITEM_COST + " :taco: \ngives chance at additional tacos when **cooking**\n💚52 🗡️5 ☄️5 👕43 🙌43 \nassist - heal yourself and your target\nfreeze - reduce target's armor by 20%", true)
    .addField('Socks ', SHOP_ITEM_COST + " :taco: \ngives chance at additional tacos when **thanking**\n💚24 🗡️30 ☄️0 👕25 🙌25 \nscold - reduce your targets spirit by 20%\nslash - deal physical damage to all enemies (60% of your physical damage)", true)
    .setTimestamp()
    message.channel.send({embed});
}

module.exports.buyShopItem = function(message, args){
    var discordUserId = message.author.id;
    var itemShortName = args[1]

    profileDB.getUserProfileData( discordUserId, function(err, buyItemRes) {
        if(err){
            // user doesnt exist
            console.log(err);
        }else{
            var userTacos = buyItemRes.data.tacos
            if (userTacos >= SHOP_ITEM_COST){
                profileDB.getItemData(function(err, getItemResponse){
                    if (err){
                        console.log(err);
                    }
                    else{
                        var SHOP_ITEM_ID;
                        if (itemShortName.toLowerCase() == "knife"){
                            SHOP_ITEM_ID = 201
                        }else if (itemShortName.toLowerCase() == "shorts"){
                            SHOP_ITEM_ID = 202
                        }else if (itemShortName.toLowerCase() == "t-shirt"){
                            SHOP_ITEM_ID = 203
                        }else if (itemShortName.toLowerCase() == "skirt"){
                            SHOP_ITEM_ID = 204
                        }else if (itemShortName.toLowerCase() == "belt"){
                            SHOP_ITEM_ID = 205
                        }else if (itemShortName.toLowerCase() == "socks"){
                            SHOP_ITEM_ID = 206
                        }
                        else if (itemShortName.toLowerCase() == "pickaxe"){
                            message.channel.send("to buy a pickaxe type `-buypickaxe`")
                        }else if (itemShortName.toLowerCase() == "details"){
                            // display shop builder
                            shopItemDetailsBuilder(message)
                        }
                        if (SHOP_ITEM_ID){
                            var itemsToAddToInventory = [];
                            for (var item in getItemResponse.data){
                                if (getItemResponse.data[item].id == SHOP_ITEM_ID){
                                    itemsToAddToInventory.push(getItemResponse.data[item])
                                }
                            }
                            addToUserInventory(discordUserId, itemsToAddToInventory);
                            profileDB.updateUserTacos(discordUserId, SHOP_ITEM_COST * -1, function(updateLSErr, updateLSres){
                                if(updateLSErr){
                                    console.log(updateLSErr);
                                }
                                else{
                                    var tacosFound = 0
                                    shopItemEmbedBuilder(message, itemsToAddToInventory, tacosFound);
                                    message.channel.send(message.author + " successfully purchased `" + itemShortName.toLowerCase() + "`! \ndo -puton 1 " + itemShortName.toLowerCase() + " OR -puton 2 " + itemShortName.toLowerCase() + "  OR -puton 3 " + itemShortName.toLowerCase() + " \ndo -wearing to check your new item bonuses!")
                                }
                            })
                        }else{
                            if (itemShortName.toLowerCase() != "details"){
                                message.channel.send("that is not an item you can buy!")
                            }
                        }
                    }
                })
            }else if (itemShortName.toLowerCase() == "details"){
                shopItemDetailsBuilder(message)
            }
        }
    })
}



module.exports.buyFlaskCommand = function(message){
    var discordUserId = message.author.id;

    profileDB.getUserProfileData( discordUserId, function(err, buyFlaskResponse) {
        if(err){
            // user doesnt exist
            // console.log(err);
        }
        else{
            var userReputation = buyFlaskResponse.data.repstatus;
            var currentFlasks = buyFlaskResponse.data.flasks;
            var userRepLevel = REPUTATIONS[userReputation.toLowerCase()] ? REPUTATIONS[userReputation.toLowerCase()].level : 1;
            if (userRepLevel >= REWARDS["Flask"].repLevel){
                // able to shop, spend the tacos and then create the item and store it in the user's inventory
                var flaskCostForUser = FLASK_COST + (30 * (buyFlaskResponse.data.level - 20 ))
                if (buyFlaskResponse.data.tacos >= flaskCostForUser){
                    // add a flask to the user's profile
                    profileDB.buyFlask(discordUserId, currentFlasks, flaskCostForUser, function(flaskErr, flaskRes){
                        if (flaskErr){
                            console.log(flaskErr);
                        }else{
                            console.log(flaskRes);
                            // create message that the user purchased a flask
                            message.channel.send(message.author + " has purchased a flask! :alembic:")
                        }
                    })
                }
            }
        }
    })
}

module.exports.buyRecipeCommand = function(message){
    var discordUserId = message.author.id;

    profileDB.getUserProfileData( discordUserId, function(err, buyRecipeResponse) {
        if(err){
            // user doesnt exist
            // console.log(err);
        }
        else{
            var userReputation = buyRecipeResponse.data.repstatus;
            var userRepLevel = REPUTATIONS[userReputation.toLowerCase()] ? REPUTATIONS[userReputation.toLowerCase()].level : 1;
            if (userRepLevel >= REWARDS["ArtifactRecipe"].repLevel){
                // able to shop, spend the tacos and then create the item and store it in the user's inventory
                if (buyRecipeResponse.data.tacos >= ARTIFACT_RECIPE_COST){
                    // check that user has enough tacos, if they do, create the item and add it to user
                    profileDB.getItemData(function(err, getItemResponse){
                        if (err){
                            // console.log(err);
                        }
                        else{
                            var artifactRecipeItem = [];
                            for (var item in getItemResponse.data){
                                if (getItemResponse.data[item].id == ARTIFACT_RECIPE_ID){
                                    artifactRecipeItem.push(getItemResponse.data[item])
                                }
                            }
                            // add the item to user's inventory
                            // remove tacos from user\
                            if (artifactRecipeItem && artifactRecipeItem.length > 0){
                                addToUserInventory(discordUserId, artifactRecipeItem);
                                profileDB.updateUserTacos(discordUserId, ARTIFACT_RECIPE_COST * -1, function(updateLSErr, updateLSres){
                                    if(updateLSErr){
                                        // console.log(updateLSErr);
                                    }
                                    else{
                                        message.channel.send(message.author + " successfully purchased an artifact recipe :rosette:!")
                                    }
                                })
                            }
                        }
                    })
                }
                else{
                    message.channel.send("You cannot afford this item.")
                }
            }
            else{
                // unavailable
                message.channel.send("You cannot afford this item.")
            }
        }
    })
}

function repShopBuilder(message, shopData){
    var welcomeMessage = "Hey " + message.author.username + "! Welcome to Bender's Reputation shop."

    const embed = new Discord.RichEmbed()
    .setColor(0x87CEFA)
    .setTitle(welcomeMessage)
    .setThumbnail()
    .setDescription("Bender accepts Tacos as currency since he's a hungry guy :shrug:. Have a look around!")
    // allow for pet to be purchased
    if (shopData.repstatus && (REPUTATIONS[shopData.repstatus.toLowerCase()]) ){
        var userRepLevel = REPUTATIONS[shopData.repstatus.toLowerCase()].level;
        var petsToPurchase = "";
        for (var key in PETS_AVAILABLE) {
            if (PETS_AVAILABLE.hasOwnProperty(key)) {
                // add the pets to petsToPurchase if the userRepLevel >= repLevel
                if (userRepLevel >= PETS_AVAILABLE[key].repLevel){
                    petsToPurchase = petsToPurchase + key +  ", "
                }
            }
        }
        var petDescription = "Purchase a pet! Pets are always great companions to have. You may only have 1 pet, buying a new pet will replace the old one - current pets available: " + petsToPurchase;
        var petCost = PET_COST + " :taco:";
        
        embed
        .addField('Pet (Liked Reputation or Better Only)', ":dog2:", true)
        .addField('Description', petDescription, true)
        .addField('Cost', petCost, true)
        .addField('Command', config.commandString + "buypet [kind of pet] [pet name]", true)
    }
    if (shopData.repstatus && (REPUTATIONS[shopData.repstatus.toLowerCase()]) ){
        var userRepLevel = REPUTATIONS[shopData.repstatus.toLowerCase()].level;
        if (userRepLevel >= REWARDS["ArtifactRecipe"].repLevel){
            var recipeDescription = "Recipe required to combine a complete set of artifact items obtained via scavenge, not tradeable."

            embed.addBlankField(true)
            .addBlankField(false)
            .addField('Artifact Recipe (Respected Reputation or Better Only)', ":rosette:", true)
            .addField('Description', recipeDescription, true)
            .addField('Cost', ARTIFACT_RECIPE_COST + " :taco:", true)
            .addField('Command', config.commandString + "buyrecipe", true)
        }
    }
    if (shopData.repstatus && (REPUTATIONS[shopData.repstatus.toLowerCase()]) ){
        var userRepLevel = REPUTATIONS[shopData.repstatus.toLowerCase()].level;
        if (userRepLevel >= REWARDS["Flask"].repLevel){
            var flaskDescription = "Purchase a Flask! used to create potions for random effects, not tradeable."
            var flaskCostForUser = FLASK_COST + (30 * (shopData.userLevel - 20 ))
            embed.addBlankField(true)
            .addBlankField(false)
            .addField('Flask (Admired Reputation or Better Only)', ":alembic:", true)
            .addField('Description', flaskDescription, true)
            .addField('Cost', flaskCostForUser + " :taco:", true)
            .addField('Command', config.commandString + "buyflask", true)
        }
    }
    embed.addBlankField(false)
    .addField('Your current tacos', shopData.userTacos + " :taco:", false)
    .setTimestamp()
    message.channel.send({embed});
}

module.exports.repShopCommand = function(message){
    var discordUserId = message.author.id;
    profileDB.getUserProfileData( discordUserId, function(err, shopResponse) {
        if(err){
            // user doesnt exist tell the user they should get some tacos
            agreeToTerms(message, discordUserId);
        }
        else{
            // if user has enough tacos to purchase the tree, add 1 tree, subtract x tacos
            var shopData = {};
            var userTacoStands = 0;
            var userTacos = shopResponse.data.tacos;
            var userLevel = shopResponse.data.level
            shopData.userTacos = userTacos;
            shopData.pickaxe = shopResponse.data.pickaxe;
            if (shopResponse.data.tacostands && shopResponse.data.tacostands > -1){
                userTacoStands = shopResponse.data.tacostands;
            }
            shopData.repstatus = shopResponse.data.repstatus
            shopData.userTacoCost = userTacoStands;
            shopData.userLevel = userLevel
            repShopBuilder(message, shopData);
        }
    })
}

function getDateDifference(beforeDate, now, hoursDifference){
    // get difference between now and beforeDate + hoursDifference 
    
    var afterDate = new Date(beforeDate.setHours(beforeDate.getHours() + hoursDifference));
    var momentAfterDate = moment(afterDate);

    var daysToAdd = momentAfterDate.diff(now, 'days');
    var nowPlusDays = new Date(now.setHours(now.getHours() + (daysToAdd * 24) ));
    var hoursToAdd =  momentAfterDate.diff(now, 'hours'); 
    var nowPlusHours = new Date(now.setHours(now.getHours() + hoursToAdd));
    var minutesToAdd = momentAfterDate.diff(nowPlusHours, 'minutes');
    var nowPlusMinutes = new Date(nowPlusHours.setMinutes(nowPlusHours.getMinutes() + minutesToAdd));
    var secondsToAdd = momentAfterDate.diff(nowPlusMinutes, 'seconds');
    var nowPlusSeconds = new Date(nowPlusMinutes.setSeconds(nowPlusMinutes.getSeconds() + secondsToAdd));
    
    var dateDifferenceString = "";
    if (daysToAdd > 0){
        dateDifferenceString = dateDifferenceString + daysToAdd + " Days ";
    }
    if (hoursToAdd > 0){
        dateDifferenceString = dateDifferenceString + hoursToAdd + " Hours ";
    }
    if (minutesToAdd > 0){
        dateDifferenceString = dateDifferenceString + minutesToAdd + " Minutes ";
    }
    if (secondsToAdd > 0){
        dateDifferenceString = dateDifferenceString + secondsToAdd + " Seconds ";
    }
    return dateDifferenceString;
}

module.exports.buyPastaCommand = function(message, pasta){
    // purchase a quote for your profile
    var discordUserId = message.author.id
    
    profileDB.getUserProfileData( discordUserId, function(err, pastaRespond) {
        if(err){
            // user doesnt exist tell the user they should get some tacos
            message.channel.send(message.author + " you can't afford pasta currently!");
            agreeToTerms(message, discordUserId);
        }
        else{
            if ( pastaRespond.data.tacos >= PASTA_COST && pasta.length > 0 && pasta.length < 125){
                // user can buy the pasta, insert the pasta message into the user's pasta column
                profileDB.updateUserPasta( discordUserId, PASTA_COST * -1, pasta, function(err, pastaRespond) {
                    if(err){
                        message.channel.send(message.author + " Could not purchase pasta!");
                    }
                    else{
                        // user has updated their pasta
                        message.channel.send(message.author + " You have purchased a new pasta :spaghetti:!");
                    }
                });
            }
            else if (pastaRespond.data.tacos >= PASTA_COST){
                message.channel.send(message.author + " You do not have enough tacos to purchase a pasta!");
            }
            else if(pasta.length > 125){
                message.channel.send(message.author + " The pasta is too long. Pasta must be less than 125 characters long");
            }

        }
    });

}
// TODO: mission logic

module.exports.helpCommand = function(message){
    // var commandsList = "List of commands \n ____________ \n "
    // var profile = config.commandString + "profile - display users profile \n "
    // var thank = config.commandString + "thank [user] - thank a user and they get 10 tacos! \n "
    // var sorry = config.commandString + "sorry [user] - say sorry to a user and they get 10 tacos! \n "
    // var welcome = config.commandString + "welcome [user] - welcome a user and they get 50 tacoss! \n "
    // var cook = config.commandString + "cook - cook some tacos! \n "
    // var give = config.commandString + "give [user] number - give the mentioned user some number of tacos! \n "
    // var shop = config.commandString + "shop OR -shop long - enter Benders shop! \n "
    // var prepare = config.commandString + "prepare - prepare some tacos from your taco stands! \n "
    // var throwTaco = config.commandString + "throw [user] - throw a taco at the mentioned user \n "
    // var scavenge = config.commandString + "scavenge - use your pickaxe to scavenge! \n "
    // var standings = config.commandString + "standings - show taco standings \n "
    // var ach = config.commandString + "ach - show your achievements completed \n "
    // var itemHelp = config.commandString + "itemhelp - show item help  \n"
    // var useItem = config.commandString + "use [item name] [user](if applicable) - uses an item (common or uncommon) do -inventory \n"
    // var slots = config.commandString + "slots [number] - play slots and bet [number] of tacos \n"
    // var fruits = config.commandString + "fruits [user] [user] [user].. up to 10 users to play a game of fruits. -take 1 OR -take 2 last player alive wins \n"
    // var raffle = config.commandString + "raffle - enter the raffle, costs 50 tacos, raffle ends when 7 players are in \n"
    // //var commandsList = "```xl Uppercase lowercase 123 ```"
    // var commandsList = "```css\n" + commandsList + profile + thank + sorry + fruits + welcome + cook + give + shop + prepare + throwTaco + scavenge + ach + standings + itemHelp + useItem + slots + raffle + "```";
    // message.channel.send(commandsList);
    const embed = {
        "description": "Don't know where to start? No idea what to do?\nCheck out our [Website](http://benderdiscord.com/) and join our [Support Server](https://discord.gg/sHdKrHW)!",
        "color": 11795163,
        "author": {
          "name": "Bender Help",
          "url": "http://benderdiscord.com/",
          "icon_url": "https://cdn.discordapp.com/avatars/320703328730349578/af68d11f9ecf74bd3f9bf99cebcfe107.jpg"
        },
        "fields": [
          {
            "name": "Command List",
            "value": "`-profile [user]        >` Display someone's profile!\n`-ach                   >` Display your achievements!\n`-standings             >` Display your local leaderboard!\n\n`-welcome [user]        >` Welcome a user and they get **50** tacos!\n`-thank [user]          >` Thank a user and they get **10** tacos!\n`-sorry [user]          >` Say sorry to a user and they get **10** tacos!\n\n`-shop (long)           >` Display the (detailed) shop!\n`-repshop               >` Display the Reputation shop!\n\n`-scavenge              >` Scavenge items using your pickaxe!\n`-prepare               >` Prepare tacos using your stands!\n`-cook                  >` Cook some tacos!\n\n`-give [user] [number]  >` Give a user a certain amount of your tacos!\n`-throw [user]          >` Throw **10** tacos at a user!\n`-pickup                >` Pick up tacos off the ground!\n\n`-slots [number]        >` Play slots and lose or win tacos!\n`-raffle                >` Enter the raffle, joining costs for **50** tacos!\n"
          },
          {
            "name": "-fruits [user] [user] [user] ...",
            "value": "Play a game of fruits by tagging up to 9 other people with this command!\nTake one or two fruits and attempt to force your opponents to take a bomb!\n`-hint                >` Bender tells you a hint!"
          },
          {
            "name": "Other Help Commands",
            "value": "`-itemhelp              >` Display all commands related to items!\n`-rpghelp               >` Display all commands related to RPGs!"
          }
        ]
      };
      
      message.channel.send({ embed });      
}

module.exports.itemhelpCommand = function(message){
    // var commandsList = "```css\nList of commands \n ____________ \n"
    // var inventory =   " -inventory, shows your commons or uncommons collected!\n"
    // var party =   " -party, create a 5 minute party with uncommons collected!\n"
    // var rares =   " -rares OR -rares long, shows your rares collected!\n"
    // var ancients =   " -ancients OR -ancients long, shows your ancients collected!\n"
    // var artifacts =   " -artifacts OR -artifacts long, shows your artifacts collected!\n"
    // var amulets =   " -amulets, shows your amulets collected!\n"
    // var rpghelp =   " **** -rpghelp, show rpg help ****\n"
    // var puton =   " -puton [1-3] [item code, ie running OR runningimproved] - you will wear the item!\n"
    // var takeoff = " -takeoff [1-3] - you will take off the item!\n"
    // var wearing = " -wearing - list of all the items you are wearing, and a summary\n"
    // var combine = " -combine - combine the item into an improved or refined item - you need 5 for rares, and 4 for ancients\n"
    // var trade =   " -trade [user] [first word of item] [amount] or -trade [user] [item code, ie running OR runningimproved] [amount] tacos [amount] to trade an item with a user\n"
    // var auction = " -auction [first word of item] create an auction for an item where users can bid \n"
    // var bid =     " -bid [user] [amount] bid for the item the user is auctioning for the amount of tacos\n"
    // var rules = " \nRules: You can only wear 3 items MAX at a time, you cannot wear an item of the same item slot as another item. \nItem bonuses take effect after the number of hours the command they affect. \nItems must be taken off before putting on another item on the same slot. \nThe tag [ACTIVE] means the item is now affecting your commands!```"
    // commandsList = commandsList + inventory + party + rares + ancients + artifacts + amulets + rpghelp + puton + takeoff + wearing + combine + trade + auction + bid + rules
    const embed = {
        "description": "Don't know where to start? No idea what to do?\nCheck out our [Website](http://benderdiscord.com/) and join our [Support Server](https://discord.gg/sHdKrHW)!",
        "color": 11795163,
        "author": {
          "name": "Bender Item Help",
          "url": "http://benderdiscord.com/",
          "icon_url": "https://cdn.discordapp.com/avatars/320703328730349578/af68d11f9ecf74bd3f9bf99cebcfe107.jpg"
        },
        "fields": [
          {
            "name": "Inventories",
            "value": "`-inventory             >` Display all your common and uncommon items!\n`-rares (long)          >` Display all your rare items (with their details)!\n`-ancients (long)       >` Display all your ancient items (with their details)!\n`-artifacts (long)      >` Display all your artifacts (with their details)!\n`-amulets               >` Display all your amulets!\n`-iteminfo (name of item)               >` Display information about the item!"
          },
          {
            "name": "Wearing Items",
            "value": "`-puton [1-3] [ItemID]  >` Put on a rare or ancient item to wear it!\n`-takeoff [1-3]         >` Take off an item from one of the slots!\n`-wearing               >` Display all items you're wearing with their stats!\n`-combine [ItemID]      >` Combine 5 rares or 4 ancients of the same kind!"
          },
          {
            "name": "Trading Items",
            "value": "`-auction [ItemID] [Amount]      >` Put up one or more items for auction!\n`-bid [user] [amount]            >` Bid tacos on someones auctioned item!\n`-trade [user] [ItemID] [Amount] >` Trade items with someone!\n⤷ Alternatively:\n`-trade [user] [ItemID] [Amount] tacos [amount] >` to trade in exchange for tacos!"
          },
          {
            "name": "Item Rules",
            "value": "You can only wear three items at a time, one in each slot.\n\nEach item belongs to a respective body part *(Chest, Wrist, etc.)*, you cannot wear two items that would go on the same part.\n\nEach item gives certain bonuses, those will activate after a certain amount of time after putting on the item.\n\nThe tag **[ACTIVE]** when displaying the items you are wearing indicates that said bonus currently applies.\n\nThe Item ID of any item is mostly the first word of its name, though there are few exceptions where the second word is used instead. (E.g. Running Shoes -> running)"
          }
        ]
      };
      message.channel.send({ embed });
}

module.exports.rpghelpCommand = function(message){
    // var commandsList = "```css\nList of commands \n ____________ \n"
    // var rpgchallenge = " -rpgchallenge [1-10] [user] [user] [user] start an rpg challenge event with the mentioned users [ 2-4 mentions required (5 player intended)] example: -rpgchallenge 1 [user] [user]\n"
    // var rpg =   " -rpgstart [user] [user] [user] start an rpg event with the mentioned users [ 2-4 mentions required]\n"
    // var cast = " -cast [ability] [target] - eg: -cast tacoheal [user] OR -cast attack 2 OR -cast iceshards\n"
    // var rules = " abilities and stats come from the items you are wearing and level\n"
    // var stats = " 👕 = armor (reduces damage from attacks) \n 🙌 = spirit (reduces damage from magic attacks) \n 🗡 = attack dmg (increases damage from attacks) \n ☄️ = magic dmg (increases damage from magic attacks) \n"
    // var buffsStatuses = " buffs = helpful abilities, statuses = harmful abilities \n"
    // var death = " 💀 = dead, can no longer use abilities unless revived \n"
    // var allMustUseAbilities = " all users must use one ability per event turn```"
    // commandsList = commandsList + rpg + rpgchallenge + cast + rules + stats + buffsStatuses + death + allMustUseAbilities 
    // message.channel.send(commandsList);
    const embed = {
        "description": "Don't know where to start? No idea what to do?\nCheck out our [Website](http://benderdiscord.com/) and join our [Support Server](https://discord.gg/sHdKrHW)!",
        "color": 11795163,
        "author": {
          "name": "Bender RPG Help",
          "url": "http://benderdiscord.com/",
          "icon_url": "https://cdn.discordapp.com/avatars/320703328730349578/af68d11f9ecf74bd3f9bf99cebcfe107.jpg"
        },
        "fields": [
          {
            "name": "Inventories",
            "value": "`-rpgstats                       >` Display your abilities and rpg stats!\n`-rpgstart [1-4 user mentions]   >` Start an rpg with up to four other people!\n`-rpgchallege [1-10] [1-4 users] >` Start an rpg challenge with four other people!\n`-cast [ability] [target number/user]   >` Cast an ability on a target or user!\n**example**: -cast attack 1 (attacks enemy 1)\n-cast barrier @user (casts barrier on the user mentioned)\n-cast slash (deals damage to all enemies)"
          },
          {
            "name": "Abilities",
            "value": "You will get different abilities and stats depending on what items you are wearing.\nAll users must cast one ability per event turn."
          },
          {
            "name": "Stats",
            "value": ":green_heart: = Health (The amount of  HP you have.)\n:shield: = Armor (Reduces damage taken from physical attacks.)\n:raised_hands: = Spirit (Reduces damage taken from magical attacks.)\n:dagger: = Physical Strength\n:comet: = Magical Strength "
          }
        ]
      };
      message.channel.send({ embed });
}

function getProfileForAchievement(discordUserId, message, profileResponse){
    if (!profileResponse){
        profileDB.getUserProfileData(discordUserId, function(err, profileResponse){
            if (err){
                // console.log(err);
            }
            else{
                var achievements = profileResponse.data.achievements;
                var data = {}
                data.achievements = achievements;
                // console.log(data);
                achiev.checkForAchievements(discordUserId, data, message);
            }
        });
    }
    else{
        var achievements = profileResponse.data.achievements;
        var data = {}
        data.achievements = achievements;
        // console.log(data);
        achiev.checkForAchievements(discordUserId, data, message);
    }
}

module.exports.raresCommand = function(message, args, rarity){
    // get all items for the discord id
    var discordUserId = message.author.id;
    var includeDescriptions = false;
    if (args && args.length > 1){
        var long = args[1];
        if (long == "long"){
            includeDescriptions = true;
        }
    }
    profileDB.getUserItems(discordUserId, function(err, inventoryResponse){
        if (err){
            // console.log(err);
        }
        else{
            // console.log(inventoryResponse.data);
            // get all the data for each item
            var itemsInInventoryCountMap = {};
            var itemsMapbyId = {};
            profileDB.getItemData(function(error, allItemsResponse){
                //// console.log(allItemsResponse.data);
                for (var item in inventoryResponse.data){
                    var validItem = useItem.itemValidate(inventoryResponse.data[item]);
                    var itemBeingAuctioned = false;
                    if (itemsInAuction[inventoryResponse.data[item].id]){
                        itemBeingAuctioned = true;
                    }
                    var itemBeingTraded = false;
                    if (activeTradeItems[inventoryResponse.data[item].id]){
                        itemBeingTraded = true;
                    }
                    var notWearing = useItem.itemNotWearing(inventoryResponse.data[item])
                    if (!itemsInInventoryCountMap[inventoryResponse.data[item].itemid] 
                        && validItem && notWearing && !itemBeingAuctioned && !itemBeingTraded){
                        // item hasnt been added to be counted, add it as 1
                        itemsInInventoryCountMap[inventoryResponse.data[item].itemid] = 1;
                    }
                    else if (validItem && notWearing && !itemBeingAuctioned && !itemBeingTraded){
                        itemsInInventoryCountMap[inventoryResponse.data[item].itemid] = itemsInInventoryCountMap[inventoryResponse.data[item].itemid] + 1
                    }
                }
                //// console.log(itemsInInventoryCountMap);
                for (var index in allItemsResponse.data){
                    itemsMapbyId[allItemsResponse.data[index].id] = allItemsResponse.data[index];
                }
                raresEmbedBuilder(message, itemsInInventoryCountMap, itemsMapbyId, includeDescriptions, rarity);

            })
        }
    })
}

function raresEmbedBuilder(message, itemsMap, allItems, long, rarity){
    // create a field for each item and add the count
    const embed = new Discord.RichEmbed()
    var inventoryStringsRegular = [];
    var inventoryStringsImproved = [];
    var inventoryStringsRefined = [];
    var inventoryStringRegular = "";
    var inventoryStringImproved = "";
    var inventoryStringRefined = "";
    var fieldCount = 0
    for (var key in itemsMap) {
        if (itemsMap.hasOwnProperty(key)) {
            //
            if ( allItems[key] && 
                ( (allItems[key].itemraritycategory == "rare" && rarity == "rare")
                || (allItems[key].itemraritycategory == "rare+" && rarity == "rare")
                || (allItems[key].itemraritycategory == "rare++" && rarity == "rare")
                || (allItems[key].itemraritycategory == "rare+++" && rarity == "rare")
                || (allItems[key].itemraritycategory == "ancient" && rarity == "ancient")
                || (allItems[key].itemraritycategory == "ancient+" && rarity == "ancient")
                || (allItems[key].itemraritycategory == "ancient++" && rarity == "ancient")
                || (allItems[key].itemraritycategory == "ancient+++" && rarity == "ancient")
                || (allItems[key].itemraritycategory == "artifact" && rarity == "artifact")
                || (allItems[key].itemraritycategory == "artifact+" && rarity == "artifact")
                || (allItems[key].itemraritycategory == "myth" && rarity == "artifact")) ){
                // console.log(key + " " + allItems[key].itemname)
                
                var emoji = "";
                if (allItems[key].itemraritycategory === "myth" ){
                    emoji = ":cyclone: "
                }
                else if (allItems[key].itemraritycategory === "artifact" 
                    || allItems[key].itemraritycategory === "artifact+"){
                    emoji = ":diamond_shape_with_a_dot_inside: "
                }
                else if (allItems[key].itemraritycategory === "ancient"){
                    emoji = ":small_orange_diamond: "
                }
                else if (allItems[key].itemraritycategory === "rare"){
                    emoji = ":small_blue_diamond: "
                }
                else if (allItems[key].itemraritycategory === "rare+"){
                    emoji = ":large_blue_diamond: "
                }
                else if (allItems[key].itemraritycategory === "ancient+"){
                    emoji = ":large_orange_diamond: "
                }
                else if (allItems[key].itemraritycategory === "ancient++" || allItems[key].itemraritycategory === "ancient+++"){
                    emoji = ":star: "
                }
                else if (allItems[key].itemraritycategory === "rare++" || allItems[key].itemraritycategory === "rare+++"){
                    emoji = ":diamonds: "
                }
                
                if (long && fieldCount < 25){
                    embed.addField(emoji + " " + allItems[key].itemname, itemsMap[key] + " - " + allItems[key].itemslot + " - " + allItems[key].itemstatistics, true)
                    fieldCount++
                }else{
                    if (allItems[key].itemraritycategory == "rare" 
                        || allItems[key].itemraritycategory == "ancient" 
                        || allItems[key].itemraritycategory == "artifact" ){

                        if (inventoryStringRegular.length > 900){
                            inventoryStringsRegular.push(inventoryStringRegular);
                            inventoryStringRegular = "";
                            inventoryStringRegular = "**"+allItems[key].itemname + "** - " +  itemsMap[key] + " - " + allItems[key].itemslot + "\n" + inventoryStringRegular;                        
                        }else{
                            inventoryStringRegular = "**"+allItems[key].itemname + "** - " +  itemsMap[key] + " - " + allItems[key].itemslot + "\n" + inventoryStringRegular;                        
                        }

                    }else if (allItems[key].itemraritycategory == "rare+" 
                        || allItems[key].itemraritycategory == "ancient+" 
                        || allItems[key].itemraritycategory == "artifact+" ){

                        if (inventoryStringImproved.length > 900){
                            inventoryStringsImproved.push(inventoryStringImproved);
                            inventoryStringImproved = "";
                            inventoryStringImproved = "**"+allItems[key].itemname + "** - " +  itemsMap[key] + " - " + allItems[key].itemslot + "\n" + inventoryStringImproved;                        
                        }else{
                            inventoryStringImproved = "**"+allItems[key].itemname + "** - " +  itemsMap[key] + " - " + allItems[key].itemslot + "\n" + inventoryStringImproved;                        
                        }

                    }else if (allItems[key].itemraritycategory == "rare++" 
                        || allItems[key].itemraritycategory == "rare+++" 
                        || allItems[key].itemraritycategory == "ancient++" 
                        || allItems[key].itemraritycategory == "ancient+++" 
                        || allItems[key].itemraritycategory == "myth" ){

                        if (inventoryStringRefined.length > 900){
                            inventoryStringsRefined.push(inventoryStringRefined);
                            inventoryStringRefined = "";
                            inventoryStringRefined = "**"+allItems[key].itemname + "** - " +  itemsMap[key] + " - " + allItems[key].itemslot + "\n" + inventoryStringRefined;                        
                        }else{
                            inventoryStringRefined = "**"+allItems[key].itemname + "** - " +  itemsMap[key] + " - " + allItems[key].itemslot + "\n" + inventoryStringRefined;                        
                        }

                    }

                }
            }
        }
    }
    // push the leftover
    if (inventoryStringRegular.length > 0){
        inventoryStringsRegular.push(inventoryStringRegular);
    }
    if (inventoryStringImproved.length > 0){
        inventoryStringsImproved.push(inventoryStringImproved);
    }
    if (inventoryStringRefined.length > 0){
        inventoryStringsRefined.push(inventoryStringRefined);
    }
    if (!long){
        for (var invString = inventoryStringsRefined.length -1; invString >= 0; invString--){
            var emoji = ""
            if ( rarity == "rare"){
                emoji = ":diamonds: "
            }else if (rarity == "ancient"){
                emoji = ":star:  "
            }else if (rarity == "artifact"){
                emoji = ":cyclone:  "
            }
            embed.addField(emoji + " Item Name  |  Count  |  Slot " + emoji, inventoryStringsRefined[invString], true)
        }
        for (var invString = inventoryStringsImproved.length -1; invString >= 0; invString--){
            var emoji = ""
            if ( rarity == "rare"){
                emoji = ":large_blue_diamond: "
            }else if (rarity == "ancient"){
                emoji = ":large_orange_diamond: "
            }else if (rarity == "artifact"){
                emoji = ":diamond_shape_with_a_dot_inside: "
            }
            embed.addField(emoji + " Item Name  |  Count  |  Slot " + emoji, inventoryStringsImproved[invString], true)
        }
        for (var invString = inventoryStringsRegular.length -1; invString >= 0; invString--){
            var emoji = ""
            if ( rarity == "rare"){
                emoji = ":small_blue_diamond: "
            }else if (rarity == "ancient"){
                emoji = ":small_orange_diamond: "
            }else if (rarity == "artifact"){
                emoji = ":diamond_shape_with_a_dot_inside: "
            }
            embed.addField(emoji + " Item Name  |  Count  |  Slot " + emoji, inventoryStringsRegular[invString], true)
        }
    }
    embed
    .setAuthor(message.author.username +"'s Inventory ")
    .setDescription( ":left_luggage:" )
    .setThumbnail(message.author.avatarURL)
    .setColor(0x06e8e8)
    message.channel.send({embed});
}

module.exports.itemDetailsCommand = function(message, args){
    var discordUserId = message.author.id;
    if (args && args.length >= 2){
        var itemToWear = args[1]; // must be a valid itemname
        profileDB.getUserItemsForInfo(discordUserId, function(err, inventoryResponse){
            if (err){
                // console.log(err);
            }
            else{
                // console.log(inventoryResponse.data);
                // get all the data for each item
                var itemsInInventoryCountMap = {}
                var itemsMapbyId = {}
                var itemsMapbyName = {}
                profileDB.getItemData(function(error, allItemsResponse){
                    if (error){
                        // console.log(error);
                    }
                    else{
                        // console.log("allitemsres " + allItemsResponse.data);
                        for (var item in inventoryResponse.data){
                            var ItemInQuestion = inventoryResponse.data[item];
                            var validItem = useItem.itemValidate(ItemInQuestion);
                            var itemBeingAuctioned = false;
                            if (itemsInAuction[ItemInQuestion.id]){
                                itemBeingAuctioned = true;
                            }
                            var itemBeingTraded = false;
                            if (activeTradeItems[inventoryResponse.data[item].id]){
                                itemBeingTraded = true;
                            }
                            if (!itemsInInventoryCountMap[inventoryResponse.data[item].itemid] 
                                && validItem 
                                && !itemBeingAuctioned
                                && !itemBeingTraded){
                                // item hasnt been added to be counted, add it as 1
                                itemsInInventoryCountMap[inventoryResponse.data[item].itemid] = 1;
                            }
                            else if (validItem && !itemBeingAuctioned && !itemBeingTraded){
                                itemsInInventoryCountMap[inventoryResponse.data[item].itemid] = itemsInInventoryCountMap[inventoryResponse.data[item].itemid] + 1
                            }
                        }
                        // console.log(itemsInInventoryCountMap);
                        for (var index in allItemsResponse.data){
                            itemsMapbyId[allItemsResponse.data[index].id] = allItemsResponse.data[index];
                        }

                        for (var index in allItemsResponse.data){
                            itemsMapbyName[allItemsResponse.data[index].itemshortname] = allItemsResponse.data[index];
                        }

                        if (itemsMapbyName[itemToWear]){
                            // check that i have the item
                            var idOfItemChosen = itemsMapbyName[itemToWear].id
                            if (itemsInInventoryCountMap[idOfItemChosen]){
                                var itemToDisplay = itemsMapbyName[itemToWear]
                                var rpgItemInfoString = rpgInfoStringBuilder(message, itemToDisplay)
                                itemInfoEmbedBuilder(message, itemToDisplay, rpgItemInfoString)    
                            }else{
                                message.channel.send("you do not own that item or item does not exist")
                            }
                        }else{
                            message.channel.send("you do not own that item or item does not exist")
                        }
                    }
                })
            }
        })
    }
}

// build the string for rpgstats and abilities
function rpgInfoStringBuilder(message, item){
    if (item.hpplus || item.attackdmgplus || item.magicdmgplus || item.armorplus || item.spiritplus){
        var hp = item.hpplus || 0
        var attackdmg = item.attackdmgplus || 0
        var magicdmg = item.magicdmgplus || 0
        var armor = item.armorplus || 0 
        var spirit = item.spiritplus || 0

        var rpgItemInfoString = " 💚 " + hp + " 🗡️ " + attackdmg + " ☄️ " + magicdmg + " 🛡️ " + armor + " 🙌 " + spirit + "\n"
        // TODO: get the ability descriptions and append to itemToDisplay
        rpgItemInfoString = rpgItemInfoString + "**Abilities:**\n"
        var rpgAbilities = rpglib.rpgAbilities
        if (item.ability1){
            var abilityName = rpgAbilities[item.ability1].name
            var abilityDescription = rpgAbilities[item.ability1].description
            rpgItemInfoString = rpgItemInfoString + "**" + abilityName + "** - " + abilityDescription + "\n"
        }
        if (item.ability2){
            var abilityName = rpgAbilities[item.ability2].name
            var abilityDescription = rpgAbilities[item.ability2].description
            rpgItemInfoString = rpgItemInfoString + "**" + abilityName + "** - " + abilityDescription + "\n"
        }
        if (item.specialability){
            var abilityName = rpgAbilities[item.specialability].name
            var abilityDescription = rpgAbilities[item.specialability].description
            rpgItemInfoString = rpgItemInfoString + "**" + abilityName + "** - " + abilityDescription + "\n"
        }
        if (item.passiveability){
            var abilityName = rpgAbilities[item.passiveability].name
            var abilityDescription = rpgAbilities[item.passiveability].description
            rpgItemInfoString = rpgItemInfoString + "**" + abilityName + "** - " + abilityDescription + "\n"
        }
        return rpgItemInfoString
    }else{
        return ""
    }
    

}

function itemInfoEmbedBuilder(message, item, rpgItemInfoString){
    const embed = new Discord.RichEmbed()
    console.log(item)
    embed
    .setAuthor( item.itemname )
    .addField("Command Stats", item.itemstatistics, false)
    .setColor(0x04e8e8)
    if (item.itemslot){
        embed.addField("Slot", item.itemslot, false )
    }
    if (rpgItemInfoString.length > 1){
        //embed.addField("Putting on", "`-puton " + item.itemshortname + "`", false)
        embed.addField("RPG Stats", rpgItemInfoString, false )
    }
    if (item.itemimage){
        embed.setThumbnail(item.itemimage)
    }
    // .setAuthor(message.author.username +"'s Inventory ")
    // .setDescription( ":left_luggage: \n-rares | -rares long to view your rare items\n-ancients | -ancients long to view your ancient items\n-artifacts | -artifacts long to view your artifacts\n-amulets to view your amulets " )
    // TODO: create an image? .setThumbnail(message.author.avatarURL)
    message.channel.send({embed});
}

module.exports.inventoryCommand = function(message){
    // get all items for the discord id
    var discordUserId = message.author.id;
    profileDB.getUserItems(discordUserId, function(err, inventoryResponse){
        if (err){
            // console.log(err);
        }
        else{
            // console.log(inventoryResponse.data);
            // get all the data for each item
            var itemsInInventoryCountMap = {};
            var itemsMapbyId = {};
            profileDB.getItemData(function(error, allItemsResponse){
                if (error){
                    // console.log(error);
                }
                else{
                    // console.log("allitemsres " + allItemsResponse.data);
                    for (var item in inventoryResponse.data){
                        var ItemInQuestion = inventoryResponse.data[item];
                        var validItem = useItem.itemValidate(ItemInQuestion);
                        var itemBeingAuctioned = false;
                        if (itemsInAuction[ItemInQuestion.id]){
                            itemBeingAuctioned = true;
                        }
                        var itemBeingTraded = false;
                        if (activeTradeItems[inventoryResponse.data[item].id]){
                            itemBeingTraded = true;
                        }
                        if (!itemsInInventoryCountMap[inventoryResponse.data[item].itemid] 
                            && validItem 
                            && !itemBeingAuctioned
                            && !itemBeingTraded){
                            // item hasnt been added to be counted, add it as 1
                            itemsInInventoryCountMap[inventoryResponse.data[item].itemid] = 1;
                        }
                        else if (validItem && !itemBeingAuctioned && !itemBeingTraded){
                            itemsInInventoryCountMap[inventoryResponse.data[item].itemid] = itemsInInventoryCountMap[inventoryResponse.data[item].itemid] + 1
                        }
                    }
                    // console.log(itemsInInventoryCountMap);
                    for (var index in allItemsResponse.data){
                        itemsMapbyId[allItemsResponse.data[index].id] = allItemsResponse.data[index];
                    }
                    inventoryEmbedBuilder(message, itemsInInventoryCountMap, itemsMapbyId);
                }
            })
        }
    })
}

function inventoryEmbedBuilder(message, itemsMap, allItems){
    // create a field for each item and add the count
    const embed = new Discord.RichEmbed()
    var inventoryString = "";
    for (var key in itemsMap) {
        if (itemsMap.hasOwnProperty(key)) {
            // 
            if (allItems[key] && (allItems[key].itemraritycategory == "common" 
                || allItems[key].itemraritycategory == "uncommon"
                || allItems[key].itemraritycategory == "uncommon+" )){
                // console.log(key + " " + allItems[key].itemname)
                inventoryString = "**"+allItems[key].itemname + "** - " +  itemsMap[key] + " - " + allItems[key].itemslot +"\n" + inventoryString;
            }
        }
    }
    embed
    .addField("Item Name  |  Count  |  Slot", inventoryString, true)
    .setAuthor(message.author.username +"'s Inventory ")
    .setDescription( ":left_luggage: \n-rares | -rares long to view your rare items\n-ancients | -ancients long to view your ancient items\n-artifacts | -artifacts long to view your artifacts\n-amulets to view your amulets " )
    .setThumbnail(message.author.avatarURL)
    .setColor(0x06e8e8)
    message.channel.send({embed});
}

module.exports.scavangeCommand = function (message){
    var discordUserId = message.author.id;
    
    // roll the number of items to get
    var tacoRoll = Math.floor(Math.random() * 100) + 1;
    var tacosFound = 0
    var rolls = Math.floor(Math.random() * 100) + 1;
    var rollsCount = 1;
    // 25 + = 2, 80 + = 3, 95 + = 4, 98 + = 5
    if (rolls > 98){
        rollsCount = 5;
    }
    else if (rolls > 95){
        rollsCount = 4;
    }
    else if (rolls > 80){
        rollsCount = 3;
    }
    else if (rolls > 25){
        rollsCount = 2;
    }
    else{
        rollsCount = 1
    }
    // only scavenge if the user has a pickaxe
    profileDB.getUserProfileData( discordUserId, function(error, getUserResponse) {
        if(error){
            // console.log(error);
            // create user profile then send a message saying they need a pickaxe
            agreeToTerms(message, discordUserId);
        }
        else if (getUserResponse.data.pickaxe && getUserResponse.data.pickaxe != "none"){
            // get all the possible items from items DB - Bad implementation but idgaf
            var userLevel = getUserResponse.data.level;
            wearStats.getUserWearingStats(message, discordUserId, {userLevel: userLevel}, function(wearErr, wearRes){
                if (wearErr){
                    // console.log(wearErr);
                }else{
                    var secondsToRemove = wearStats.calculateSecondsReduced(wearRes, "scavenge");
                    //check for more than 1 hours
                    var now = new Date();
                    var oneHourAgo = new Date();
                    ///////// CALCULATE THE MINUTES REDUCED HERE 
                    oneHourAgo = new Date(oneHourAgo.setHours(oneHourAgo.getHours() - SCAVENGE_COOLDOWN_HOURS));
                    oneHourAgo = new Date(oneHourAgo.setSeconds(oneHourAgo.getSeconds() + secondsToRemove));

                    if ( oneHourAgo > getUserResponse.data.lastscavangetime ){
                        profileDB.getItemData(function(err, getItemResponse){
                            if (err){
                                // console.log(err);
                            }
                            else{
                                var ARTIFACT_MIN_ROLL = 9995;
                                var ANCIENT_MAX_ROLL = 9995
                                var ANCIENT_MIN_ROLL = 9975;
                                var RARE_MAX_ROLL = 9975;
                                var RARE_MIN_ROLL = 9800;
                                var UNCOMMON_MAX_ROLL = 9800;
                                var UNCOMMON_MIN_ROLL = 8750;
                                var COMMON_MAX_ROLL = 8750;
                                var UNCOMMON_ITEMS_TO_OBTAIN = 1;
                                var COMMON_ITEMS_TO_OBTAIN = 1;
                                var TACOS_FOUND_MULTIPLIER = 1;
                                var EXPERIENCE_MULTIPLIER = 1;

                                if (getUserResponse.data.pickaxe == "improved"){
                                    COMMON_ITEMS_TO_OBTAIN = 2
                                    UNCOMMON_ITEMS_TO_OBTAIN = 1
                                    TACOS_FOUND_MULTIPLIER = 3
                                    ARTIFACT_MIN_ROLL = 9992
                                    ANCIENT_MAX_ROLL = 9992;
                                    ANCIENT_MIN_ROLL = 9955;
                                    RARE_MAX_ROLL = 9955;
                                    RARE_MIN_ROLL = 9750;
                                    UNCOMMON_MAX_ROLL = 9750;
                                    EXPERIENCE_MULTIPLIER = 2;

                                }
                                else if (getUserResponse.data.pickaxe == "master"){
                                    ARTIFACT_MIN_ROLL = 9985
                                    ANCIENT_MAX_ROLL = 9985;
                                    ANCIENT_MIN_ROLL = 9940;
                                    RARE_MAX_ROLL = 9940;
                                    RARE_MIN_ROLL = 9725;
                                    UNCOMMON_MAX_ROLL = 9725;
                                    COMMON_ITEMS_TO_OBTAIN = 4
                                    UNCOMMON_ITEMS_TO_OBTAIN = 2
                                    TACOS_FOUND_MULTIPLIER = 6
                                    EXPERIENCE_MULTIPLIER = 6
                                    rollsCount++
                                }
                                else if (getUserResponse.data.pickaxe == "ethereal"){
                                    ARTIFACT_MIN_ROLL = 9978
                                    ANCIENT_MAX_ROLL = 9978;
                                    ANCIENT_MIN_ROLL = 9925;
                                    RARE_MAX_ROLL = 9925;
                                    RARE_MIN_ROLL = 9700;
                                    UNCOMMON_MAX_ROLL = 9700;
                                    COMMON_ITEMS_TO_OBTAIN = 12
                                    UNCOMMON_ITEMS_TO_OBTAIN = 4
                                    TACOS_FOUND_MULTIPLIER = 20
                                    EXPERIENCE_MULTIPLIER = 20
                                    rollsCount++
                                    var extraExtraRoll = Math.floor(Math.random() * 10000) + 1;
                                    if (extraExtraRoll > 7500){
                                        rollsCount++
                                    }
                                }

                                var allItems = getItemResponse.data
                                var commonItems = [];
                                var uncommonItems = [];
                                var rareItems = [];
                                var ancientItems = [];
                                var artifactItems = [];
                                var mythItems = [];
                                // TODO: add check for rarity chance % to be > 0 
                                for (var item in allItems){
                                    if (allItems[item].itemraritycategory == "common"){
                                        commonItems.push(allItems[item]);
                                    }
                                    else if(allItems[item].itemraritycategory == "uncommon"){
                                        uncommonItems.push(allItems[item]);
                                    }
                                    else if(allItems[item].itemraritycategory == "rare"){
                                        rareItems.push(allItems[item]);
                                    }
                                    else if(allItems[item].itemraritycategory == "ancient"){
                                        ancientItems.push(allItems[item]);
                                    }
                                    else if(allItems[item].itemraritycategory == "artifact"){
                                        artifactItems.push(allItems[item]);
                                    }
                                    else if(allItems[item].itemraritycategory == "myth"){
                                        mythItems.push(allItems[item]);
                                    }
                                }
                                // roll to randomly get only 5 amulets in the pool of amulets
                                var poolOfAmulets = []
                                for (var item in allItems){
                                    if(allItems[item].itemraritycategory == "amulet" 
                                    && allItems[item].amuletsource == "scavenge"){
                                        poolOfAmulets.push(allItems[item]);
                                    }
                                }
                                for (var i = 0; i < 5; i++){
                                    var amuletRoll = Math.floor(Math.random() * poolOfAmulets.length - 1)
                                    ancientItems.push(poolOfAmulets[amuletRoll])
                                }
                                
                                // roll rarity, roll item from rarity
                                var gotUncommon = false;
                                var itemsObtainedArray = [];
                                var highestRarityFound = 1
				
                                if (discordUserId == "248946965633564673"){
                                    if (rollsCount < 4){
                                        rollsCount++
                                    }
                                }

                                for (var i = 0; i < rollsCount; i++){
                                    var rarityRoll = Math.floor(Math.random() * 10000) + 1;
                                    var rarityString = "";
                                    // console.log(rarityRoll);
                                    if (!gotUncommon && rollsCount > 4){
                                        // guaranteed more than uncommon +
                                        rarityRoll = Math.floor(Math.random() * 1500) + 8501;
                                        if (discordUserId == "248946965633564673"){
                                            rarityRoll = 9965
                                        }
                                        gotUncommon = true;
                                    }
                                    else if(!gotUncommon && rollsCount > 3){
                                        // guaranteed uncommon +
                                        rarityRoll = Math.floor(Math.random() * 2000) + 8001;
                                        if (discordUserId == "248946965633564673"){
                                            rarityRoll = 9900
                                        }
                                        gotUncommon = true;
                                    }
                                    if (rarityRoll > ARTIFACT_MIN_ROLL){
                                        rarityString = "artifact"
                                        var itemRoll = Math.floor(Math.random() * artifactItems.length);
                                        // console.log(artifactItems[itemRoll]);
                                        itemsObtainedArray.push(artifactItems[itemRoll]);
                                        if (highestRarityFound <= 4){
                                            highestRarityFound = 5;
                                        }
                                    }
                                    else if(rarityRoll > ANCIENT_MIN_ROLL && rarityRoll <= ANCIENT_MAX_ROLL){
                                        rarityString = "ancient"
                                        var itemRoll = Math.floor(Math.random() * ancientItems.length);
                                        // console.log(ancientItems[itemRoll]);
                                        itemsObtainedArray.push(ancientItems[itemRoll])
                                        if (highestRarityFound <= 3){
                                            highestRarityFound = 4;
                                        }
                                    }
                                    else if(rarityRoll > RARE_MIN_ROLL && rarityRoll <= RARE_MAX_ROLL){
                                        rarityString = "rare"
                                        var itemRoll = Math.floor(Math.random() * rareItems.length);
                                        // console.log(rareItems[itemRoll]);
                                        itemsObtainedArray.push(rareItems[itemRoll]);
                                        if (highestRarityFound <= 2){
                                            highestRarityFound = 3;
                                        }
                                    }
                                    else if (rarityRoll > UNCOMMON_MIN_ROLL && rarityRoll <= UNCOMMON_MAX_ROLL){
                                        rarityString = "uncommon"
                                        var itemRoll = Math.floor(Math.random() * uncommonItems.length);
                                        // console.log(uncommonItems[itemRoll]);
                                        uncommonItems[itemRoll].itemAmount = UNCOMMON_ITEMS_TO_OBTAIN
                                        itemsObtainedArray.push( uncommonItems[itemRoll] );
                                        if (highestRarityFound <= 1){
                                            highestRarityFound = 2;
                                        }
                                    }
                                    else {
                                        rarityString = "common"
                                        var itemRoll = Math.floor(Math.random() * commonItems.length);
                                        // console.log(commonItems[itemRoll]);
                                        commonItems[itemRoll].itemAmount = COMMON_ITEMS_TO_OBTAIN
                                        itemsObtainedArray.push( commonItems[itemRoll] );
                                    }
                                }
                                if (tacoRoll > SCAVENGE_TACO_FIND_CHANCE_HIGHER){
                                    tacosFound = 20 * TACOS_FOUND_MULTIPLIER;
                                }
                                else if(tacoRoll > SCAVENGE_TACO_FIND_CHANCE){
                                    tacosFound = 10 * TACOS_FOUND_MULTIPLIER;
                                }
                                // send the items to be written all at once
                                addToUserInventory(discordUserId, itemsObtainedArray);

                                // send message of all items obtained
                                scavengeEmbedBuilder(message, itemsObtainedArray, tacosFound);
                                // update lastscavengetime
                                profileDB.updateLastScavengeTime(discordUserId, function(updateLSErr, updateLSres){
                                    if(updateLSErr){
                                        // console.log(updateLSErr);
                                    }
                                    else{
                                        // console.log(updateLSres);
                                        var experienceFromItems = wearStats.calculateExtraExperienceGained(wearRes, "scavenge", null);                                     
                                        experience.gainExperience(message, message.author, ((EXPERIENCE_GAINS.scavenge * EXPERIENCE_MULTIPLIER) + experienceFromItems), getUserResponse);
                                    }
                                })
                                // add the tacos to user
                                ///////// CALCULATE THE EXTRA TACOS HERE 
                                var extraTacosFromItems = wearStats.calculateExtraTacos(wearRes, "scavenge"); // 0 or extra
                                if (extraTacosFromItems > 0){
                                    message.channel.send(message.author + " received `" + extraTacosFromItems + "` for scavenging! :taco:" + " received `" + extraTacosFromItems + "` extra tacos" );
                                }
                                // early adopter ids to get tacos
                                var earlyAdopterIds = config.earlyAdopterIds
                                if (earlyAdopterIds.indexOf(discordUserId) > -1 && !getUserResponse.data.earlyadopt){
                                    message.channel.send("hey " + message.author + " thanks for being an early adopter here's :taco: `1000` for you to feed me with! make sure to vote on discordbots.org for me")
                                    profileDB.updateUserTacosEarly(discordUserId, 1000, function(earlyErr, earlyRes){
                                        if (earlyErr){
                                            console.log(earlyErr)
                                        }else{
                                            console.log(earlyRes)
                                        }
                                    })
                                }

                                profileDB.updateUserTacos(discordUserId, tacosFound + extraTacosFromItems, function(updateLSErr, updateLSres){
                                    if(updateLSErr){
                                        // console.log(updateLSErr);
                                    }
                                    else{
                                        // console.log(updateLSres);
                                        // add to statistics
                                        var achievements = getUserResponse.data.achievements;
                                        stats.statisticsManage(discordUserId, "scavengecount", 1, function(err, statSuccess){
                                            if (err){
                                                // console.log(err);
                                            }
                                            else{
                                                // check achievements
                                                var data = {}
                                                data.achievements = achievements;
                                                // add the highestRarity
                                                if (highestRarityFound == 5){
                                                    data.rarity = "artifact"
                                                }
                                                else if (highestRarityFound == 4){
                                                    data.rarity = "ancient"
                                                }
                                                else if (highestRarityFound == 3){
                                                    data.rarity = "rare"
                                                }
                                                else if (highestRarityFound == 2){
                                                    data.rarity = "uncommon"
                                                }
                                                if (highestRarityFound == 1){
                                                    data.rarity = "common"
                                                }
                                                // console.log(data);
                                                achiev.checkForAchievements(discordUserId, data, message);
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    }
                    else{
                        now = new Date(now.setSeconds(now.getSeconds() + secondsToRemove));
                        var numberOfHours = getDateDifference(getUserResponse.data.lastscavangetime, now, 1);
                        message.channel.send(message.author + " You have scavenged too recently! Please wait `" + numberOfHours +"` ");
                    }
                }
            })
            
        }
        else{
            message.channel.send(message.author + " You need a pickaxe! buy one from the shop, do `-shop` OR `-shop long` to see what you can buy");
        }
    })
}

function scavengeEmbedBuilder(message, itemsScavenged, tacosFound){
    // create a quoted message of all the items
    var itemsMessage = ""
    for (var item in itemsScavenged){
        var itemAmount = itemsScavenged[item].itemAmount ? itemsScavenged[item].itemAmount : 1;
        itemsMessage = itemsMessage + "**" +itemAmount + "**x " + "[**" + itemsScavenged[item].itemraritycategory +"**] " + "**"  + itemsScavenged[item].itemname + "** - " + itemsScavenged[item].itemdescription + ", " +
        itemsScavenged[item].itemslot + ", " +itemsScavenged[item].itemstatistics
        if (itemsScavenged[item].itemraritycategory == "ancient" || (itemsScavenged[item].itemraritycategory == "rare" && itemsScavenged[item].itemslot != "consumable" ) || itemsScavenged[item].itemraritycategory == "artifact"){
            itemsMessage = itemsMessage + ". **to wear** -puton [1-3] " + itemsScavenged[item].itemshortname
        }
        itemsMessage = itemsMessage + " \n";
    }
    if (tacosFound > 0){
        itemsMessage = itemsMessage + "**Tacos Found**: :taco: " + tacosFound;
    }

    const embed = new Discord.RichEmbed()
    .addField("[" + message.author.username +"'s Scavenge] :pick: Items found: ", itemsMessage, true)
    .setThumbnail(message.author.avatarURL)
    .setColor(0xbfa5ff)
    message.channel.send({embed});
}

function shopItemEmbedBuilder(message, itemsScavenged, tacosFound){
    // create a quoted message of all the items
    var itemsMessage = ""
    for (var item in itemsScavenged){
        var itemAmount = itemsScavenged[item].itemAmount ? itemsScavenged[item].itemAmount : 1;
        itemsMessage = itemsMessage + "**" +itemAmount + "**x " + "**"  + itemsScavenged[item].itemname + "** - " + itemsScavenged[item].itemdescription + ", " +
        itemsScavenged[item].itemslot + ", " +itemsScavenged[item].itemstatistics + " \n";
    }
    if (tacosFound > 0){
        itemsMessage = itemsMessage + "**Tacos Found**: :taco: " + tacosFound;
    }

    const embed = new Discord.RichEmbed()
    .addField("Items purchased: ", itemsMessage, true)
    .setThumbnail(message.author.avatarURL)
    .setColor(0xbfa5ff)
    message.channel.send({embed});
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

module.exports.slotsCommand = function(message, tacosBet){
    var discordUserId = message.author.id;
    // check that tacosBet is less than users tacos
    var bet = Math.floor(parseInt(tacosBet));
    if (bet > 19 ){
        profileDB.getUserProfileData(discordUserId, function(getProfileError, getProfileResponse){
            if (getProfileError){
                // console.log(getProfileError);
                console.log(getProfileError)
                agreeToTerms(message, discordUserId);
            }
            else{
                if (getProfileResponse.data.tacos >= bet){
                    var userLevel = getProfileResponse.data.level;
                    wearStats.getUserWearingStats(message, discordUserId, {userLevel: userLevel}, function(wearErr, wearRes){
                        if (wearErr){
                            console.log(wearErr)
                        }else{
                            // spin the slots
                            var firstRoll = Math.floor(Math.random() * 8);
                            var secondRoll = Math.floor(Math.random() * 8);
                            var thirdRoll = Math.floor(Math.random() * 8);
                            // 7 emojis
                            var emojis = [
                                ":taco:",
                                ":burrito:",
                                ":hot_pepper:",
                                ":grapes:",
                                ":avocado:",
                                ":tropical_drink:",
                                ":stuffed_flatbread:",
                                ":eggplant:"
                            ]
                            var emojisRolled = [emojis[firstRoll], emojis[secondRoll], emojis[thirdRoll]];
                            var tacosWon = calculateSlotsWin(firstRoll, secondRoll, thirdRoll, bet);
                            var extraTacosFromItems = 0
                            var experienceFromItems = 0;
                            // IF SLOTS WIN IS HIGHER THAN 0 ADD TO THE TACOS WON
                            if (tacosWon > 0){
                                extraTacosFromItems = wearStats.calculateExtraTacos( wearRes, "slots", {userBid: bet } ); // 0 or extra
                                experienceFromItems = wearStats.calculateExtraExperienceGained(wearRes, "slots", null);
                            }

                            profileDB.updateUserTacos(discordUserId, tacosWon + extraTacosFromItems, function(updateErr, updateRes){
                                if (updateErr){
                                    // console.log(updateErr);
                                }
                                else{
                                    // console.log(updateRes);
                                    // check for achievement
                                    if (tacosWon >= 1 && bet >= 5000){
                                        var data = {
                                            slotsTacosBet: bet
                                        };
                                        data.achievements = getProfileResponse.data.achievements;
                                        achiev.checkForAchievements(discordUserId, data, message);

                                        // get experience from winning
                                        if ( tacosWon + extraTacosFromItems >= 10000 ){
                                            experience.gainExperience(message, message.author, experienceFromItems, getProfileResponse);
                                        }
                                    }
                                    stats.statisticsManage(discordUserId, "slotscount", 1, function(staterr, statSuccess){
                                        if (staterr){
                                            // console.log(staterr);
                                        }
                                        else{
                                            // check achievements??
                                            getProfileForAchievement(discordUserId, message, getProfileResponse)
                                        }
                                    })
                                }
                            })
                            slotsEmbedBuilder(emojisRolled, tacosWon, message, extraTacosFromItems);
                        }
                    })
                    
                }
                else{
                    message.channel.send(message.author + " You don't have enough tacos!");
                }
            }
        })
    }
    else{
        message.channel.send(message.author + " You must bet more than 19 tacos when using slots!");
    }
}



function calculateSlotsWin(firstRoll, secondRoll, thirdRoll, bet){
    // all equal you double
    // 1 taco get half, 2 tacos, get same amount, 3 tacos double
    // 2 avocados get half
    // 2 burritos get half
    if (firstRoll == secondRoll && secondRoll == thirdRoll){
        // win double
        return (bet * 2);
    }

    if (firstRoll == 0 || secondRoll == 0 || thirdRoll == 0){
        // win half
        var count = 0;
        if (firstRoll == 0){
            count++;
        }
        if (secondRoll == 0){
            count++;
        }
        if (thirdRoll == 0){
            count++;
        }

        if (count > 2){
            // win double
            return (bet * 2)
        }
        else if(count > 1){
            // win same amount
            return bet
        }
        else{
            // win half
            return Math.ceil( bet * 0.5);
        }
    }

    if (firstRoll == 4 || secondRoll == 4 || thirdRoll ==4){
        // count for at least 2 avocados
        var count = 0;
        if (firstRoll == 4){
            count++;
        }
        if (secondRoll == 4){
            count++;
        }
        if (thirdRoll == 4){
            count++;
        }
        if (count > 1){
            // win half
            return Math.ceil( bet * 0.5);
        }
    }

    if (firstRoll == 2 || secondRoll == 2 || thirdRoll == 2){
        // count for at least 2 burritos
        var count = 0;
        if (firstRoll == 2){
            count++;
        }
        if (secondRoll == 2){
            count++;
        }
        if (thirdRoll == 2){
            count++;
        }
        if (count > 1){
            // win half
            return Math.ceil( bet * 0.5);
        }
    }
    // lost tacos
    return (bet * -1);
}

function slotsEmbedBuilder(emojisRolled, tacosWon, message, extraTacosFromItems){

    const embed = new Discord.RichEmbed()
    .setColor(0xff9c4c)
    embed.addField("Taco Slots", emojisRolled[0] + " " + emojisRolled[1] + " " +  emojisRolled[2] , false)
    if (tacosWon > 0){
        embed.addField('You win!', tacosWon + " :taco: tacos won" , true)
    }
    if (extraTacosFromItems > 0){
        embed.addField('Extra tacos from Items!', extraTacosFromItems + " :taco: tacos won" , true)
    }
    message.channel.send({embed});
}

module.exports.miniGameCommand = function(message) {
    try{
        // create a game where users get to pick between the numbers 1 or 2
        // the user has 10 seconds to pick or else a number is chosen at random
        // if they eat a bomb they will be taken out of the game
        // the number is the number of fruits they will eat
        // random fruits and fruit numbers in between bombs, possible chance at amulets, items
        var discordUserId = message.author.id;

        var users  = message.mentions.users
        var team = [];
        team.push(message.author);

        users.forEach(function(user){
            if (team.length < 11 && discordUserId != user.id){
                team.push(user);
            }
        })
        var listOfPlayers = []
        var validGroup = true;
        // the user challenged create game
        for (var user in team){
            if (usersMinigames[team[user].id]){
                validGroup = false;
                break;
            }else{
                // create a player object and push to list of players
                var player = new miniplayer(team[user].username , team[user]);
                listOfPlayers.push(player);
            }
            
        }
        if (listOfPlayers.length >= 3 && validGroup){
            // TODO: get rares available, amulets available, ancients available
            profileDB.getItemData(function(err, getItemResponse){
                if (err){
                    // console.log(err);
                    message.channel.send("something went terribly wrong please save me")
                }else{
                    var allItems = getItemResponse.data
                    var raresAvailable = []
                    var ancientsAvailable = []
                    var amuletsAvailable = []
                    for (var item in allItems){
                        if(allItems[item].itemraritycategory == "rare"){
                            raresAvailable.push(allItems[item]);
                        }
                        else if(allItems[item].itemraritycategory == "ancient"){
                            ancientsAvailable.push(allItems[item]);
                        }
                        else if(allItems[item].itemraritycategory == "amulet"
                        && allItems[item].amuletsource == "scavenge"){
                            amuletsAvailable.push(allItems[item]);
                        }
                    }

                    var currentGame = new miniboard(listOfPlayers, message, raresAvailable, amuletsAvailable, ancientsAvailable );
                    
                    for (var user in team){
                        usersMinigames[team[user].id] = currentGame;
                    }
                    message.channel.send(message.author + " has started a game of fruits :strawberry: type -ready to start!")
                }
            })


        }else{
            message.channel.send("there must be more than 3 players in the game! OR your someone is already in a game")
        }
    }
    catch(error){
        message.channel.send(error);
    }
}

function miniGameEmbedBuilder(message, data){
    const embed = new Discord.RichEmbed()
    .setDescription(data.visual)
    .setAuthor("Take one or two fruits use -take 1 OR -take 2")
    if (data.rules){
        embed.addField("Rules", "-take 1 or -take 2, to take one or two fruits, if you take a bomb you lose");
    }
    embed.addField("player to take " , data.nextTurn.user, true)
    if (data.playerThatLost){
        embed.addField("Lost", data.playerThatLost, true)
    }
    if (data.currentTurn){
        embed.addField("Turn", data.currentTurn, true)
    }
    embed
    .setColor(0xff9c4c)
    message.channel.send({embed})
    .then(function (sentMessage) {
        var currentGame = data.currentGame;
        var currentGameLastMessage = currentGame.getLastMessage();

        if (currentGameLastMessage){
            // delete the message
            currentGameLastMessage.delete()
            .then(function(res){
                currentGame.setLastMessage(sentMessage);
            })
        }else{
            currentGame.setLastMessage(sentMessage);
        }
    })
}

module.exports.miniGamePlay = function(message, args){
    try{
        // check the user's current game in list of games, check that the game status is "in progress"
        // if the game is in progress, check to see whose turn it is in the game
        // if current player's turn, check that player can make move on the board
        // make move on board and create new embed, the embed should read whose turn is next and visual
        var discordUserId = message.author.id;
        var amount = args[1] || 1;
        amount = Math.floor(amount);
        var currentGame = usersMinigames[discordUserId];
        if (currentGame){
            // user is matched to a game
            var userIdTurn = currentGame.isTurn();
            var status = currentGame.getStatus();
            if (userIdTurn == discordUserId && status == "in progress"){
                // it is the user's turn
                var playerTakingTurn = currentGame.getPlayer(discordUserId);

                if (playerTakingTurn && amount && amount > 0 && amount < 3){

                    takeFruits(message, playerTakingTurn, currentGame, amount)
                }else{
                    // something went wrong, the player isnt part of the game even though map said he was
                    if (playerTakingTurn){
                        message.channel.send("You can only take 1 or 2 fruits!");
                    }else{
                        message.channel.send("you are not in a fruit game currently!")
                    }
                }
            }else{
                message.channel.send("it is not your turn");
            }
        }else{
            message.channel.send("not in game currently");
        }
    }
    catch(error){
        message.channel.send("error");
    }
}

function fruitsRewardsEmbedBuilder(message, itemsScavenged, tacosFound, user){
    // create a quoted message of all the items
    var itemsMessage = ""
    for (var item in itemsScavenged){
        var itemAmount = itemsScavenged[item].itemAmount ? itemsScavenged[item].itemAmount : 1;
        itemsMessage = itemsMessage + "**" +itemAmount + "**x " + "[**" + itemsScavenged[item].itemraritycategory +"**] " + "**"  + itemsScavenged[item].itemname + "** - " + itemsScavenged[item].itemdescription + ", " +
        itemsScavenged[item].itemslot + ", " +itemsScavenged[item].itemstatistics
        if (itemsScavenged[item].itemraritycategory == "ancient" || (itemsScavenged[item].itemraritycategory == "rare" && itemsScavenged[item].itemslot != "consumable" ) || itemsScavenged[item].itemraritycategory == "artifact"){
            itemsMessage = itemsMessage + ". **to wear** -puton [1-3] " + itemsScavenged[item].itemshortname
        }
        itemsMessage = itemsMessage + " \n";
    }
    if (tacosFound > 0){
        itemsMessage = itemsMessage + "**Tacos Found**: :taco: " + tacosFound;
    }

    const embed = new Discord.RichEmbed()
    .addField("[" + user.username +" :strawberry: Fruits Rewards]  ", itemsMessage, true)
    .setThumbnail(user.avatarURL)
    .setColor(0xbfa5ff)
    message.channel.send({embed});
}

function takeFruits(message, playerTakingTurn, currentGame, amount){
    var playerThatLost = playerTakingTurn.takeTurn(amount, currentGame);
    var gameEnded = currentGame.gameEnded();

    var boardVisualize = currentGame.visualize();
    var idOfNextTurnUser = currentGame.isTurn();
    var userObjectNextTurnUser = currentGame.getPlayer(idOfNextTurnUser);
    var data = {};
    if (playerThatLost){
        data.playerThatLost = playerThatLost;
    }
    data.currentTurn = currentGame.getCurrentTurn();                    
    data.visual = boardVisualize;
    data.nextTurn = userObjectNextTurnUser
    data.currentGame = currentGame;
    
    if (gameEnded){
        miniGameEmbedBuilder(message, data);
        var winner = currentGame.checkWinner();
        message.channel.send("game is over! **" + winner.username + "** wins!");
        // do cleanup and handout rewards
        var usersToCleanUp = currentGame.cleanup();
        for(var user in usersToCleanUp){
            let discordUserId = usersToCleanUp[user]            
            // do a get to the user and then give them the experience
            giveFruitsRewards(discordUserId, message, usersToCleanUp)
        }
    }else{
        miniGameEmbedBuilder(message, data);
        // timeout make move for next player after 10 seconds
        var turnToTakeRandomFruits = currentGame.getCurrentTurn();
        var nextPlayer = currentGame.getPlayer(currentGame.isTurn());

        var timeout = setTimeout (function(){ 
            // get the next player's to make move
            
            var currentTurn = currentGame.getCurrentTurn();
            if (currentTurn == turnToTakeRandomFruits){
                var randomAmount = Math.floor(Math.random() * 2) + 1;
                takeFruits(message, nextPlayer, currentGame, randomAmount);
            }
            // get the turn number, and compare with turn numbres to make sure this timeout is valid
            
        }, 15000);
    }
}

function giveFruitsRewards(discordUserId, message, usersToCleanUp ){

    profileDB.getUserProfileData(discordUserId, function(getProfileError, getProfileResponse){
        if (getProfileError){
            console.log(getProfileError)
        }else{
            let itemsObtainedArray = usersMinigames[discordUserId].mapOfUsers[discordUserId].itemsObtained 
            let tacosFound = usersMinigames[discordUserId].mapOfUsers[discordUserId].tacosEarned
            let extraTacosFound = usersMinigames[discordUserId].mapOfUsers[discordUserId].extraTacosEarned
            let xpGained = usersMinigames[discordUserId].mapOfUsers[discordUserId].experienceGained
            let extraXpGained = usersMinigames[discordUserId].mapOfUsers[discordUserId].extraExperienceGained 
            let discordUser = usersMinigames[discordUserId].mapOfUsers[discordUserId].user

            if (itemsObtainedArray.length > 0 || tacosFound > 0 ){
                addToUserInventory(discordUserId, itemsObtainedArray);
                fruitsRewardsEmbedBuilder(message, itemsObtainedArray, tacosFound + ( extraTacosFound * getProfileResponse.data.level ), discordUser);
                profileDB.updateUserTacos(discordUserId, tacosFound + (extraTacosFound * getProfileResponse.data.level), function(err, res){
                    if (err){
                        console.log(err)
                    }else{
                        console.log(res)
                    }
                })
            }
            
            if (xpGained || extraXpGained){
                experience.gainExperience(message, discordUser, xpGained + (extraXpGained * getProfileResponse.data.level), getProfileResponse);
            }
            ///// Finalize cleanup
            if (usersMinigames[discordUserId]){
                delete usersMinigames[discordUserId];
                console.log("SUCCESSFUL CLEANUP")
            }
        }
    })
}

module.exports.gameCommand = function(message){

    var discordUserId = message.author.id;
    var users  = message.mentions.users;
    var mentionedId;
    var mentionedUser;
    // console.log(users);
    users.forEach(function(user){
        // console.log(user.id);
        mentionedId = user.id;
        mentionedUser = user
    })

    if (mentionedUser){
        // the user challenged create game
        var player1 = new player("random" , message.author);
        var player2 = new player("random" , mentionedUser);
        var newBoard = new board();
        var newGame = new game(player1, player2, newBoard);
        
        // TODO: game announce
        var boardVisualize = newBoard.visualize();
        var data = {};
        data.visual = boardVisualize;
        gameEmbedBuilder(message, data)
    }

    // player challenges other player OR queues up for a match
    // if challenged other mentioned player, check that neither are in an ongoing match 

    // create empty board, pick cards for players based on players cards, create players, create game match
    // Bender PMs the user what their cards are

    // randomly pick who has first turn, start both players at 5 pts

    // player picks spot on board A, B, C.. ETC and takes that spot as theirs (change color)

    // update board after every turn

    // next player's turn - player picks the spot they want to place their card on A, B, C..  check adjacent spots
    // if number is higher than adjacent number, turn that adjacent card as theirs, increase their score

    // game ends when a player quits or the board is full, winner is player with highest score

    
}

function gameEmbedBuilder(message, data){
    // TODO: take all the data and create the board

    //var array = data.board.visualize();
    //message.channel.send("``` 2      | 1       |\n        |         |\n        |         |\n        |         |\n— — — — — — — — — — — — - -\n        |         |\n        |         |\n        |         |\n        |         |\n— — — — — — — — — — — — - -\n        |         |\n        |         |\n        |         |\n        |         |\n   ```");
    const embed = new Discord.RichEmbed()
    .setDescription("```" + data.visual + "```")
    //.addBlankField(false)
    .addField("Score:", "Player 1 : " + 5 + "\nPlayer 2: " + 5 , true)
    .addField("Turn: ", "Player 1", true)
    .addField("Last Action", "C Name - " + "I", true)
    
    .setColor(0xff9c4c)
    message.channel.send({embed});
}

module.exports.playCommand = function(message){
    // TODO: check for user's current match and attempt to make the play on that match
}


module.exports.toplistCommand = function(message, listOfUsers, global){
    // query for top 10 then build the embed for top ten users
    profileDB.getToplistUsers(function(error, toplistResponse){
        if (error){
            // console.log(error);
            agreeToTerms(message, message.author.id);
        }
        else{
            //create embed
            // console.log(toplistResponse);
            // create the string
            var toplistMap = {};
            var toplistCount = 1;
            for (var index in toplistResponse.data){
                if (toplistCount < 10){
                    // TODO: get a new batch until we have 9 users
                    var user = toplistResponse.data[index]
                    // console.log(user);
                    var toplistUser = listOfUsers.get(user.discordid)
                    // console.log(toplistUser);
                    if (!toplistUser){
                        // user is not on the server currently - just skip them
                        continue;
                    }
                    var toplistUsername;
                    if (global){
                        toplistUsername = toplistUser.username
                    }else{
                        toplistUsername = toplistUser.user.username; 
                    }
                    var toplistXP = user.experience;
                    var userLevel = user.level;
                    toplistMap[toplistCount] = {username: toplistUsername, experience: toplistXP, level: userLevel}
                    toplistCount++;
                }
            }
            topListEmbedBuilder(toplistMap, message);
        }
    })
}

function topListEmbedBuilder(topXpString, message){
    // console.log(topXpString);
    const embed = new Discord.RichEmbed()
    .setTitle("Top List Standings :trident:")
    .setColor(0xe521ff)
    for (var key in topXpString) {
        if (topXpString.hasOwnProperty(key)) {
            embed.addField("#" + key + ": `" + topXpString[key].username+"`", "LVL:  **" +topXpString[key].level + "** XP:  **" + topXpString[key].experience + "**", true)
        }
    }

    embed.setDescription("-toplist global to view global toplist standings")
    message.channel.send({embed});
}

module.exports.rpgTopListCommand = function(message, listOfUsers, global){
    // query for top 10 then build the embed for top ten users
    profileDB.getRpgTopList(function(error, toplistResponse){
        if (error){
            console.log(error);
            agreeToTerms(message, discordUserId);
        }
        else{
            //create embed
            // console.log(toplistResponse);
            // create the string
            var toplistMap = {};
            var toplistCount = 1;
            for (var index in toplistResponse.data){
                if (toplistCount < 10){
                    // TODO: get a new batch until we have 9 users
                    var user = toplistResponse.data[index]
                    // console.log(user);
                    var toplistUser = listOfUsers.get(user.discordid)
                    // console.log(toplistUser);
                    if (!toplistUser){
                        // user is not on the server currently - just skip them
                        continue;
                    }
                    var toplistUsername;
                    if (global){
                        toplistUsername = toplistUser.username
                    }else{
                        toplistUsername = toplistUser.user.username; 
                    }
                    var toplistChallenge = user.currentchallenge || 0;
                    var toplistRpg = user.rpgpoints;
                    toplistMap[toplistCount] = { username: toplistUsername, rpgPoints: toplistRpg, challengedefeated: toplistChallenge }
                    toplistCount++;
                }
            }
            rpgTopListEmbedBuilder(toplistMap, message);
        }
    })
}

function rpgTopListEmbedBuilder(topRpgString, message){
    // console.log(topRpgString);
    const embed = new Discord.RichEmbed()
    .setTitle("Top RPG list Standings :fleur_de_lis:")
    .setColor(0xe521ff)
    for (var key in topRpgString) {
        if (topRpgString.hasOwnProperty(key)) {
            embed.addField("#" + key + ": `" + topRpgString[key].username+"`","**Challenges:** " + topRpgString[key].challengedefeated +  "\n**Points:  **" +topRpgString[key].rpgPoints , true)
        }
    }
    embed.setDescription("-toprpg global to view global rpg standings")
    message.channel.send({embed});
}

module.exports.standingsCommand = function(message, listOfUsers, global){
    // query for top 10 then build the embed for top ten users
    profileDB.getTopTenTacoUsers(function(error, topTenResponse){
        if (error){
            console.log(error);
            agreeToTerms(message, discordUserId);
        }
        else{
            //create embed
            // console.log(topTenResponse);
            // create the string
            var topTenMap = {};
            var topTenCount = 1;
            for (var index in topTenResponse.data){
                if (topTenCount < 10){
                    // TODO: get a new batch until we have 9 users
                    var user = topTenResponse.data[index]
                    // console.log(user);
                    var topTenUser = listOfUsers.get(user.discordid)
                    // console.log(topTenUser);
                    if (!topTenUser){
                        // user is not on the server currently - just skip them
                        continue;
                    }
                    var toplistUsername;
                    if (global){
                        toplistUsername = topTenUser.username
                    }else{
                        toplistUsername = topTenUser.user.username; 
                    }
                    var topTenTacos = user.tacos;
                    topTenMap[topTenCount] = {username: toplistUsername, tacos: topTenTacos}
                    topTenCount++;
                }
            }
            topTenEmbedBuilder(topTenMap, message);
        }
    })
}

function topTenEmbedBuilder(topTenString, message){
    // console.log(topTenString);
    const embed = new Discord.RichEmbed()
    .setTitle("Taco Standings :taco:")
    .setColor(0xe521ff)
    for (var key in topTenString) {
        if (topTenString.hasOwnProperty(key)) {
            embed.addField("#" + key + ": `" + topTenString[key].username+"`", topTenString[key].tacos, true)
        }
    }
    embed.setDescription("-standings global to view global standings")
    //.addField('Top Ten Tacos:', topTenString, true)
    message.channel.send({embed});
}

function initialUserProfile(discordUserId){
    var now = new Date();
    var threedaysAgo = new Date();
    threedaysAgo = new Date(threedaysAgo.setHours(threedaysAgo.getHours() - 72));
    var userData = {
        discordId: discordUserId,
        tacos: 0,
        birthdate: "2001-10-05",
        lastthanktime: threedaysAgo,
        lastcooktime: threedaysAgo,
        lastsorrytime: threedaysAgo,
        lastscavangetime: threedaysAgo,
        tacostands: 1,
        welcomed: false,
        lastpreparetime: threedaysAgo,
        pickaxe: "none",
        map: false,
        phone: false
    }
    return userData;
}

// hints
module.exports.hintCommand = function(message){
    var listOfHints = [
        "tacos can be given, throw, used for shopping, or collecting. -standings lets you see who has the most tacos.",
        "rpg enemies scale as you level up. the higher your level the more enemies you will encounter",
        "rpg enemies have different difficulties. easy, medium, hard, boss, and boss+. boss+ can only be found in challenges.",
        "welcoming a user will award them 50 tacos upon agreeing to bender terms",
        "you can wear up to 3 regular items using -puton 1,2,3 itemid to check their bonuses do -wearing and -rpgstats",
        "amulets are not worn, you can have as many amulets as you want and their bonuses stack. amulets are not tradeable",
        "stands get more expensive the more you buy, but also award more experience and tacos when preparing.",
        "common items can be consumed for different purposes, uncommon items can be used for parties.",
        "rares can be combined by having 5 of the same rare, ancients can be combined by having 4 of the same ancient, artifacts must be combined with a set of items to start a quest.",
        "achievements can be obtained through many different means, try thanking lots of friends",
        "when you throw a taco, or use a rock on someone, neither you or the other person can pick it up, but everyone else can.",
        "more people working together means higher chances at finding the items you want via scavenge",
        "rpg events provide rewards when your group succeeds. you can have up to 5 players in an rpg group.",
        "the reputation shop opens when you reach liked status with bender",
        "slots are dangerous",
        "if you want to trade an item for tacos do -trade @user rock 1 tacos 5 this will trade the rock for 5 tacos",
        "leveling up awards rpg stats, each level gives 21 HP, 10 AD and MD, and armor/spirit based on your current level",
        "most items give higher bonuses the higher level you are."
    ]
    var hintRoll = Math.floor(Math.random() * (listOfHints.length -1) )
    var hintPicked = listOfHints[hintRoll]
    // get one of the hints at random

    message.channel.send("`" + hintPicked + "`")
}
/*
- tacos can be given, throw, used for shopping, or collecting. `-standings` lets you see who has the most tacos.
- rpg enemies scale as you level up. the higher your level the more enemies you will encounter
- rpg enemies have different difficulties. easy, medium, hard, boss, and boss+. boss+ can only be found in challenges.
- welcoming a user will award them 50 tacos upon agreeing to bender terms
- you can wear up to 3 regular items using `-puton 1,2,3 itemid` to check their bonuses do `-wearing` and `-rpgstats`
- amulets are not worn, you can have as many amulets as you want and their bonuses stack. amulets are not tradeable
- stands get more expensive the more you buy, but also award more experience and tacos when preparing.
- common items can be consumed for different purposes, uncommon items can be used for parties.
- rares can be combined by having 5 of the same rare, ancients can be combined by having 4 of the same ancient, artifacts must be combined with a set of items to start a quest.
- achievements can be obtained through many different means, try thanking lots of friends
- when you throw a taco, or use a rock on someone, neither you or the other person can pick it up, but everyone else can.
- more people working together means higher chances at finding the items you want via scavenge
- rpg events provide rewards when your group succeeds. you can have up to 5 players in an rpg group.
- the reputation shop opens when you reach liked status with bender
- slots are dangerous
- if you want to trade an item for tacos do `-trade @user rock 1 tacos 5` this will trade the rock for 5 tacos
- leveling up awards rpg stats, each level gives 21 HP, 10 AD and MD, and armor/spirit based on your current level
- most items give higher bonuses the higher level you are.
*/

module.exports.pickupCommand = function (message){
    // check the queueOfTacos and if there are tacos pick them up - updateUserTacos by +1
    var discordUserId = message.author.id;
    var ableToPickUp = false;
    var indexOfQueue = index;
    for (var index in QueueOfTacosDropped){
        if (QueueOfTacosDropped[index].droppedBy != discordUserId && QueueOfTacosDropped[index].cannotPickUp != discordUserId){
            // user can pick this one up
            ableToPickUp = true;
            indexOfQueue = index;
            break;
        }
    }
    if (ableToPickUp){
        if (QueueOfTacosDropped[indexOfQueue].poisoned){
            // taco is poisoned, take away instead of giving
            // update user tacos
            profileDB.updateUserTacos(discordUserId, -10, function(updateErr, updateRes){
                if (updateErr){
                    // TODO: create user profile
                    // console.log(updateErr)
                    agreeToTerms(message, discordUserId);
                }
                else{
                    QueueOfTacosDropped.splice(indexOfQueue, 1);
                    stats.statisticsManage(discordUserId, "poisonedtacoscount", 1, function(staterr, statSuccess){
                        if (staterr){
                            // console.log(staterr);
                        }
                        else{
                            // check achievements??
                            getProfileForAchievement(discordUserId, message) // FIX THIS SHIT
                        }
                    })
                    message.channel.send(message.author + " picked up `10` tacos from the ground :taco: but one was poisoned.. :nauseated_face: you ate `10` tacos to cure your sickness.");
                }
            })
        }
        else{
            // update user tacos
            
            profileDB.updateUserTacos(discordUserId, 10, function(updateErr, updateRes){
                if (updateErr){
                    // TODO: create user profile
                    // console.log(updateErr)
                    agreeToTerms(message, discordUserId);
                }
                else{
                    QueueOfTacosDropped.splice(indexOfQueue, 1);
                    stats.statisticsManage(discordUserId, "tacospickedup", 1, function(staterr, statSuccess){
                        if (staterr){
                            // console.log(staterr);
                        }
                        else{
                            // check achievements??
                            getProfileForAchievement(discordUserId, message) // FIX THSI SHIT
                        }
                    })
                    message.channel.send(message.author + " picked up `10` tacos from the ground :taco:");
                }
            })
        }
    }
    else{
        // console.log("There are no tacos for you to pick up.. ");
    }
}

module.exports.buypetCommand = function(message, args){
    // console.log(args);
    var discordUserId = message.author.id;
    if (args.length > 3){
        message.channel.send(" Pet names should be only 1 word long");
    }
    else if (args.length == 3){
        var pet = args[1];
        var petName = args[2] // 15 characters or less, more than 0 characters

        // check that the user has the reputation needed (liked and up)
        if (args[2].length > 0 && args[2].length < 15){
            // add the pet to his profile and take away tacos
            if (args[2].indexOf("@") > -1
                || args[2].indexOf("?") > -1
                || args[2].indexOf("*") > -1
                || args[2].indexOf("#") > -1
                || args[2].indexOf("/") > -1
                || args[2].indexOf(":") > -1
                || args[2].indexOf("`") > -1){
                // invalid characters
                message.channel.send(" Name contains invalid characters")
            }
            else{
                profileDB.getUserProfileData( discordUserId, function(err, buyPetResponse) {
                    if(err){
                        // user doesnt exist
                        // console.log(err);
                    }
                    else{
                        var userReputation = buyPetResponse.data.repstatus;
                        var userRepLevel = REPUTATIONS[userReputation.toLowerCase()] ? REPUTATIONS[userReputation.toLowerCase()].level : 1;
                        if (userReputation && (REPUTATIONS[userReputation.toLowerCase()]) ){
                            // if user has enough tacos to purchase the stand, add 1 tree, subtract x tacos
                            var achievements = buyPetResponse.data.achievements;
                            var userTacos = buyPetResponse.data.tacos;
                            if (userTacos >= PET_COST){
                                if (PETS_AVAILABLE[pet] != undefined && userRepLevel && userRepLevel >= PETS_AVAILABLE[pet].repLevel){
                                    // can afford the pet update user pet, take away tacos.
                                    var threedaysAgo = new Date();
                                    if (!buyPetResponse.data.pet){
                                        threedaysAgo = new Date(threedaysAgo.setHours(threedaysAgo.getHours() - 72));                                        
                                    }else{
                                        threedaysAgo = buyPetResponse.data.lastfetchtime
                                    }
                                    profileDB.updateUserPet(discordUserId, pet, petName, threedaysAgo, function( petError, petResponse){
                                        if (petError){
                                            // console.log(petError);
                                        }
                                        else{
                                            // take away tacos from user
                                            profileDB.updateUserTacos(discordUserId, (PET_COST * -1), function(updateErr, updateRes){
                                                if (updateErr){
                                                    // TODO: create user profile
                                                    // console.log(updateErr)
                                                    message.channel.send(" error, check bender now");
                                                }
                                                else{
                                                    // anounce the user has a new pet!
                                                    message.channel.send(" Congratulations! " + message.author + " has a new " + pet + " called: `" + petName + "` \n" + PETS_AVAILABLE[pet].emoji + " " + PETS_AVAILABLE[pet].speak + "\n use -fetch while your pet is not tired!");
                                                }
                                            })
                                        }
                                    })
                                }
                                else{
                                    message.channel.send(" That pet is not available.. ");
                                }

                            }
                            else{
                                message.channel.send(" You cannot afford a pet currently.. ");
                            }
                        }else{
                            message.channel.send(" You do not have the reputation with Bender needed to buy a pet yet! ");
                        }
                    }
                });
            }
            
        }
        else{
            message.channel.send(" Pet names should be between 0 and 15 characters long")
        }
    }
    else if (args.length == 2){
        message.channel.send(" You must give a name to your pet try:\n `-buypet [kind of pet] [pet name]` ");
    }
    else{
        message.channel.send(" You must pick a pet and give a name to your pet try:\n `-buypet [kind of pet] [pet name]` ");
    }
}

module.exports.fetchCommand = function(message){
    var discordUserId = message.author.id;

    // the pet has gone to fetch, get taco amount = their fetch
    profileDB.getUserProfileData(discordUserId, function(fetchError, fetchResponse){
        if (fetchError){
            // console.log(fetchError);
        }
        else{
            var userLevel = fetchResponse.data.level;
            var userPet = fetchResponse.data.pet ? fetchResponse.data.pet : undefined;
            var userPetName = fetchResponse.data.petname ? fetchResponse.data.petname : undefined;
            if (userPet){
                var userData = {
                    userLevel : userLevel,
                    fetchCD: PETS_AVAILABLE[userPet].cooldown,
                    fetchCount: PETS_AVAILABLE[userPet].fetch
                }
                wearStats.getUserWearingStats(message, discordUserId, userData, function(wearErr, wearRes){
                    if (wearErr){
                        
                    }else{
                        var now = new Date();
                        if (userPet){
                            var secondsToRemove = wearStats.calculateSecondsReduced(wearRes, "fetch");

                            var cooldownDate = new Date();
                            cooldownDate = new Date(cooldownDate.setHours(cooldownDate.getHours() - PETS_AVAILABLE[userPet].cooldown));
                            ///////// CALCULATE THE MINUTES REDUCED HERE 
                            cooldownDate = new Date(cooldownDate.setSeconds(cooldownDate.getSeconds() + secondsToRemove));

                            if (!fetchResponse.data.lastfetchtime || ( cooldownDate > fetchResponse.data.lastfetchtime )){
                                // fetch whatever and then set lastfetchtime to now
                                var fetchTacos = PETS_AVAILABLE[userPet].fetch;
                                ///////// CALCULATE THE EXTRA TACOS HERE 
                                var extraTacosFromItems = wearStats.calculateExtraTacos(wearRes, "fetch"); // 0 or extra

                                profileDB.updateUserTacosFetch(discordUserId, fetchTacos + extraTacosFromItems, function(err, updateResponse) {
                                    if (err){
                                        // console.log(err);
                                    }
                                    else{
                                        var experienceFromItems = wearStats.calculateExtraExperienceGained(wearRes, "fetch", null);                                                                             
                                        experience.gainExperience(message, message.author, (( (EXPERIENCE_GAINS.perFetchCd * PETS_AVAILABLE[userPet].fetch) / 10) + experienceFromItems) , fetchResponse);
                                        // user's pet fetched some tacos
                                        if (extraTacosFromItems > 0){
                                            /* SEASONAL
                                            if (trickOrTreatMap["tot-" + discordUserId] && trickOrTreatMap["tot-" + discordUserId].tot == "trick"){
                                                message.channel.send("**" + userPetName + "** fetched:` " + fetchTacos + "` tacos :taco: \n 👻 BOOOOOOOO " + PETS_AVAILABLE[userPet].speak + " you received `" + extraTacosFromItems + "` extra tacos");                                                
                                            }else if (trickOrTreatMap["tot-" + discordUserId] && trickOrTreatMap["tot-" + discordUserId].tot == "treat"){

                                            }else{
                                                */
                                            message.channel.send("**" + userPetName + "** fetched:` " + fetchTacos + "` tacos :taco: \n" + PETS_AVAILABLE[userPet].emoji + " " + PETS_AVAILABLE[userPet].speak + " you received `" + extraTacosFromItems + "` extra tacos");                                                
                                            //}
                                        }else{
                                            /* SEASONAL
                                            if (trickOrTreatMap["tot-" + discordUserId] && trickOrTreatMap["tot-" + discordUserId].tot == "trick"){
                                                message.channel.send("**" + userPetName + "** fetched:` " + fetchTacos + "` tacos :taco: \n 👻 BOOOOOOOO " + PETS_AVAILABLE[userPet].speak);                                                
                                            }else if (trickOrTreatMap["tot-" + discordUserId] && trickOrTreatMap["tot-" + discordUserId].tot == "treat"){
                                                message.channel.send("**" + userPetName + "** fetched:` " + fetchTacos + "` tacos :taco: \n 🎃 HEEEHEEEHEHEHEE " + PETS_AVAILABLE[userPet].speak);                                                
                                            }else{
                                                */
                                            message.channel.send("**" + userPetName + "** fetched:` " + fetchTacos + "` tacos :taco: \n" + PETS_AVAILABLE[userPet].emoji + " " + PETS_AVAILABLE[userPet].speak);                                                
                                            //}
                                        }
                                    }
                                })
                            }
                            else{
                                // console.log("cd " + PETS_AVAILABLE[userPet].cooldown)
                                now = new Date(now.setSeconds(now.getSeconds() + secondsToRemove));
                                var numberOfHours = getDateDifference(fetchResponse.data.lastfetchtime, now, PETS_AVAILABLE[userPet].cooldown);
                                message.channel.send(message.author + " **" + userPetName + "** needs to rest and cannot fetch currently! Please wait `" + numberOfHours + "` ");
                            }
                        }
                        else{
                            // user doesnt have a pet
                            // console.log("doesnt have pet")
                        }
                    }
                })
            }
            else{
                message.channel.send("You do not have a pet to fetch with!")
            }
        }
    })
}

module.exports.useCommand = function(message, args){
    // the use command will obtain args[1] as the name of the item
    // args[2] as the number of the item that will be used
    // and a mentioned user if there is one
    // console.log(args);
    var discordUserId = message.author.id;
    var users  = message.mentions.users;
    var mentionedId;
    var mentionedUser;
    var mentionedUserName;
    // console.log(users);
    users.forEach(function(user){
        // console.log(user.id);
        mentionedId = user.id;
        mentionedUser = user
        mentionedUserName = user.username;
    })
    if (NeedsToAgree[discordUserId] && NeedsToAgree[discordUserId].hasNotAgreed){
        message.channel.send("You have not agreed to the terms yet!")
    }
    else if (args && args.length > 1 && args[1].toLowerCase() == "rock" && !mentionedUser && !useItem.getItemsLock(discordUserId)){
        // create a rare item (chance) if not then receive tacos
        useItem.setItemsLock(discordUserId, true)
        profileDB.getUserItems(discordUserId, function(error, inventoryResponse){
            if (error){
                // console.log(error);
                useItem.setItemsLock(discordUserId, false)
                agreeToTerms(message, discordUserId);
            }
            else{
                console.log("got item")
                 // map of user's inventory
                var itemsInInventoryCountMap = {};
                // map of all items
                var itemsMapbyId = {};

                // array of item objects for using piece of wood
                var rocksToUse = []
                var listOfAmulets = []
                profileDB.getItemData(function(itemDataError, allItemsResponse){
                    if (itemDataError){
                        // console.log(itemDataError);
                    }
                    else{
                        //// console.log(allItemsResponse.data);
                        for (var item in inventoryResponse.data){
                            // check the rock hasnt been used
                            var validItem = useItem.itemValidate(inventoryResponse.data[item]);
                            var itemBeingAuctioned = false;
                            if (itemsInAuction[inventoryResponse.data[item].id]){
                                itemBeingAuctioned = true;
                            }
                            var itemBeingTraded = false;
                            if (activeTradeItems[inventoryResponse.data[item].id]){
                                itemBeingTraded = true;
                            }
                            if (!itemsInInventoryCountMap[inventoryResponse.data[item].itemid] 
                                && validItem && !itemBeingTraded && !itemBeingAuctioned){
                                // item hasnt been added to be counted, add it as 1
                                itemsInInventoryCountMap[inventoryResponse.data[item].itemid] = 1;

                                if (inventoryResponse.data[item].itemid == ROCK_ITEM_ID && rocksToUse.length <= 10){
                                    // make this the rock use
                                    rocksToUse.push(inventoryResponse.data[item]);
                                }
                            }
                            else if (validItem && !itemBeingTraded && !itemBeingAuctioned){
                                itemsInInventoryCountMap[inventoryResponse.data[item].itemid] = itemsInInventoryCountMap[inventoryResponse.data[item].itemid] + 1;
                                if (inventoryResponse.data[item].itemid == ROCK_ITEM_ID && rocksToUse.length < 10){
                                    // make this the rock use
                                    rocksToUse.push(inventoryResponse.data[item]);
                                }
                            }
                        }

                        // console.log(itemsInInventoryCountMap);
                        for (var index in allItemsResponse.data){
                            itemsMapbyId[allItemsResponse.data[index].id] = allItemsResponse.data[index];
                            // console.log(allItemsResponse.data[index]);
                            if (allItemsResponse.data[index].itemraritycategory == "amulet" && allItemsResponse.data[index].amuletsource == "scavenge"){
                                // add to list of rares
                                listOfAmulets.push(allItemsResponse.data[index]);
                            }
                        }
                        // console.log(rocksToUse.length);
                        // 
                        if (rocksToUse.length == 10){
                            // able to use those 20 pieces
                            useItem.useRock(message, discordUserId, rocksToUse, listOfAmulets, function(useError, useRes){
                                if (useError){
                                    useItem.setItemsLock(discordUserId, false)
                                    // console.log(useError);
                                }
                                else{
                                    // console.log(useRes[0]);
                                    if (useRes.length && useRes.length > 0 && useRes[0].itemname){
                                        message.channel.send(message.author + " has polished a **" + useRes[0].itemname + "** -" + "`" + useRes[0].itemdescription + ", " + useRes[0].itemslot + ", " + useRes[0].itemstatistics + "`");
                                    }
                                    else if (useRes == 50){
                                        message.channel.send(message.author + " polished something that Bender really likes, Bender gave you `50` tacos :taco:");
                                    }
                                    else if (useRes == 20){
                                        message.channel.send(message.author + " polished something that Bender likes, Bender gave you `20` tacos :taco:");
                                    }
                                    var timeout = setTimeout (function(){ 
                                        experience.gainExperience(message, message.author, EXPERIENCE_GAINS.useCommonItemFive);
                                        stats.statisticsManage(discordUserId, "polishcount", 1, function(staterr, statSuccess){
                                            if (staterr){
                                                // console.log(staterr);
                                            }
                                            else{
                                                // check achievements??
                                                // console.log(statSuccess);
                                                getProfileForAchievement(discordUserId, message) 
                                            }
                                        })
                                    }, 1000);
                                }
                            });
                        }
                        else{
                            useItem.setItemsLock(discordUserId, false)
                            message.channel.send(message.author + " you need at least `10` rocks to polish something shiny");
                        }
                    }
                })
            }
        })
    }

    else if (args && args.length > 1 && args[1].toLowerCase() == "rock" && !useItem.getItemsLock(discordUserId)){
        if (mentionedUser && !mentionedUser.bot && mentionedId != message.author.id){
            // use rock
            useItem.setItemsLock(discordUserId, true)
            profileDB.getUserItems(discordUserId, function(error, inventoryResponse){
                if (error){
                    // console.log(error);
                    useItem.setItemsLock(discordUserId, false)
                    agreeToTerms(message, discordUserId);
                }
                else{
                    // check that the user has enough rocks to throw at someone
                    // map of user's inventory
                    var itemsInInventoryCountMap = {};
                    // item object for rock to use
                    var rockToUse;
                    for (var item in inventoryResponse.data){
                        // check the rock hasnt been used
                        var validItem = useItem.itemValidate(inventoryResponse.data[item]);
                        var itemBeingAuctioned = false;
                        if (itemsInAuction[inventoryResponse.data[item].id]){
                            itemBeingAuctioned = true;
                        }
                        var itemBeingTraded = false;
                        if (activeTradeItems[inventoryResponse.data[item].id]){
                            itemBeingTraded = true;
                        }
                        if (!itemsInInventoryCountMap[inventoryResponse.data[item].itemid] && validItem
                            && !itemBeingAuctioned && !itemBeingTraded){
                            // item hasnt been added to be counted, add it as 1
                            itemsInInventoryCountMap[inventoryResponse.data[item].itemid] = 1;

                            if (inventoryResponse.data[item].itemid == ROCK_ITEM_ID){
                                // make this the rockToUse
                                rockToUse = inventoryResponse.data[item];
                            }
                        }
                        else if (validItem && !itemBeingAuctioned && !itemBeingTraded){
                            itemsInInventoryCountMap[inventoryResponse.data[item].itemid] = itemsInInventoryCountMap[inventoryResponse.data[item].itemid] + 1
                        }
                    }
                    // console.log(itemsInInventoryCountMap);
                    if (itemsInInventoryCountMap[ROCK_ITEM_ID] && itemsInInventoryCountMap[ROCK_ITEM_ID] > 0){
                        // user has this many rocks if greater than 0 then able to throw rock
                        // console.log(itemsInInventoryCountMap[ROCK_ITEM_ID]);
                        //tacos being used in auction
                        var tacosInUse = 0;
                        if (tacosInUseAuction[mentionedId] && tacosInUseAuction[mentionedId] > 0){
                            tacosInUse = tacosInUseAuction[mentionedId];
                        }
                        useItem.useRock(message, mentionedId, rockToUse, tacosInUse, function(throwRockError, throwRes){
                            if (throwRockError){
                                // console.log(throwRockError);
                                useItem.setItemsLock(discordUserId, false)
                            }
                            else{
                                // console.log(throwRes);
                                useItem.setItemsLock(discordUserId, false)
                                if (throwRes == "success"){
                                    message.channel.send( message.author + " threw a rock at " + mentionedUserName + ", they became dizzy and dropped `10` tacos :taco:");
                                    // if they drop a taco someone else can pick it up
                                    var poisonedTacoRoll = Math.floor(Math.random() * 100) + 1;
                                    var poisonedTaco = false;
                                    if (poisonedTacoRoll > 75){
                                        poisonedTaco = true;
                                    }
                                    QueueOfTacosDropped.push({ droppedBy: mentionedId, cannotPickUp: discordUserId, poisoned: poisonedTaco })
                                }
                                else if (throwRes == "protection"){
                                    message.channel.send(message.author + " threw a rock at " + mentionedUserName + " but one of their fences protected them!");
                                }
                                else{
                                    message.channel.send(message.author + " threw a rock at " + mentionedUserName);
                                }
                                var timeout = setTimeout (function(){ 
                                    experience.gainExperience(message, message.author, EXPERIENCE_GAINS.useCommonItem);
                                    stats.statisticsManage(discordUserId, "rocksthrown", 1, function(staterr, statSuccess){
                                        if (staterr){
                                            // console.log(staterr);
                                        }
                                        else{
                                            // check achievements??
                                            getProfileForAchievement(discordUserId, message) 
                                        }
                                    })
                                }, 1000);
                            }
                        })
                    }
                    else{
                        // tell the user they don't have enough rocks
                        useItem.setItemsLock(discordUserId, false)
                        message.channel.send("don't have enough rocks to throw...");
                    }
                }
            })
        }
        else{
            // TODO: grind rocks to find amulets
            message.channel.send("mention a user to throw a rock at, you cannot throw rocks at bots or yourself... grind");
        }
    }
    else if(args && args.length > 1 && !useItem.getItemsLock(discordUserId) && (args[1].toLowerCase() == "pieceofwood" || args[1].toLowerCase() == "wood")){
        // use pieces of wood - protect against rocks being thrown at you (uses 6 pieces, protects against 3)
        useItem.setItemsLock(discordUserId, true)
        profileDB.getUserItems(discordUserId, function(error, inventoryResponse){
            if (error){
                // console.log(error);
                useItem.setItemsLock(discordUserId, false)
                agreeToTerms(message, discordUserId);
            }
            else{
                 // check the user has enough pieces of wood
                 // map of user's inventory
                var itemsInInventoryCountMap = {};
                // array of item objects for using piece of wood
                var piecesOfWoodToUse = [];
                //// console.log(allItemsResponse.data);
                for (var item in inventoryResponse.data){
                    // check the rock hasnt been used
                    var validItem = useItem.itemValidate(inventoryResponse.data[item]);
                    var itemBeingAuctioned = false;
                    if (itemsInAuction[inventoryResponse.data[item].id]){
                        itemBeingAuctioned = true;
                    }
                    var itemBeingTraded = false;
                    if (activeTradeItems[inventoryResponse.data[item].id]){
                        itemBeingTraded = true;
                    }
                    if (!itemsInInventoryCountMap[inventoryResponse.data[item].itemid] 
                        && validItem && !itemBeingTraded && !itemBeingAuctioned){
                        // item hasnt been added to be counted, add it as 1
                        itemsInInventoryCountMap[inventoryResponse.data[item].itemid] = 1;

                        if (inventoryResponse.data[item].itemid == PIECE_OF_WOOD_ITEM_ID && piecesOfWoodToUse.length <= 5){
                            // make this the pieceOfWoodToUse
                            piecesOfWoodToUse.push(inventoryResponse.data[item]);
                        }
                    }
                    else if (validItem && !itemBeingTraded && !itemBeingAuctioned){
                        itemsInInventoryCountMap[inventoryResponse.data[item].itemid] = itemsInInventoryCountMap[inventoryResponse.data[item].itemid] + 1;
                        if (inventoryResponse.data[item].itemid == PIECE_OF_WOOD_ITEM_ID && piecesOfWoodToUse.length < 5){
                            // make this the pieceOfWoodToUse
                            piecesOfWoodToUse.push(inventoryResponse.data[item]);
                        }
                    }
                }

                // console.log(itemsInInventoryCountMap);
                // console.log(piecesOfWoodToUse.length);
                // 
                if (piecesOfWoodToUse.length == 5){
                    // able to use those 5 pieces
                    useItem.usePieceOfWood(message, discordUserId, piecesOfWoodToUse, function(useError, useRes){
                        if (useError){
                            // couldnt update the user protect
                            // console.log(useError);
                            useItem.setItemsLock(discordUserId, false)
                        }
                        else{
                            // console.log(useRes);
                            var timeout = setTimeout (function(){ 
                                experience.gainExperience(message, message.author, EXPERIENCE_GAINS.useCommonItemFive);
                            }, 1000);
                            message.channel.send(message.author + " has built a fence, counts as `3` protection points");
                        }
                    });
                }
                else{
                    useItem.setItemsLock(discordUserId, false)
                    message.channel.send(message.author + " you need at least `5` pieces of wood to build a fence");
                }
            }
        })
    }
    else if (args && args.length > 1 && !useItem.getItemsLock(discordUserId) && (args[1].toLowerCase() == "terrycloth" || args[1].toLowerCase() == "terry")){
        // create a rare item (chance) if not then receive tacos
        useItem.setItemsLock(discordUserId, true)
        profileDB.getUserItems(discordUserId, function(error, inventoryResponse){
            if (error){
                // console.log(error);
                useItem.setItemsLock(discordUserId, false)
                agreeToTerms(message, discordUserId);
            }
            else{
                // check the user has enough pieces of wood
                 // map of user's inventory
                var itemsInInventoryCountMap = {};
                // map of all items
                var itemsMapbyId = {};

                // array of item objects for using piece of wood
                var terryClothToUse = []
                var listOfRares = []
                profileDB.getItemData(function(itemDataError, allItemsResponse){
                    if (itemDataError){
                        // console.log(itemDataError);
                    }
                    else{
                        //// console.log(allItemsResponse.data);
                        for (var item in inventoryResponse.data){
                            // check the rock hasnt been used
                            var validItem = useItem.itemValidate(inventoryResponse.data[item]);
                            var itemBeingAuctioned = false;
                            if (itemsInAuction[inventoryResponse.data[item].id]){
                                itemBeingAuctioned = true;
                            }
                            var itemBeingTraded = false;
                            if (activeTradeItems[inventoryResponse.data[item].id]){
                                itemBeingTraded = true;
                            }
                            if (!itemsInInventoryCountMap[inventoryResponse.data[item].itemid] 
                                && validItem && !itemBeingTraded && !itemBeingAuctioned){
                                // item hasnt been added to be counted, add it as 1
                                itemsInInventoryCountMap[inventoryResponse.data[item].itemid] = 1;

                                if (inventoryResponse.data[item].itemid == TERRY_CLOTH_ITEM_ID && terryClothToUse.length <= 5){
                                    // make this the terry cloth use
                                    terryClothToUse.push(inventoryResponse.data[item]);
                                }
                            }
                            else if (validItem && !itemBeingTraded && !itemBeingAuctioned){
                                itemsInInventoryCountMap[inventoryResponse.data[item].itemid] = itemsInInventoryCountMap[inventoryResponse.data[item].itemid] + 1;
                                if (inventoryResponse.data[item].itemid == TERRY_CLOTH_ITEM_ID && terryClothToUse.length < 5){
                                    // make this the terry cloth use
                                    terryClothToUse.push(inventoryResponse.data[item]);
                                }
                            }
                        }

                        // console.log(itemsInInventoryCountMap);
                        for (var index in allItemsResponse.data){
                            itemsMapbyId[allItemsResponse.data[index].id] = allItemsResponse.data[index];
                            // console.log(allItemsResponse.data[index]);
                            if (allItemsResponse.data[index].itemraritycategory == "rare" && allItemsResponse.data[index].emoji != ":seedling:"){
                                // add to list of rares
                                listOfRares.push(allItemsResponse.data[index]);
                            }
                        }
                        // console.log(terryClothToUse.length);
                        // 
                        if (terryClothToUse.length == 5){
                            // able to use those 20 pieces
                            useItem.useTerryCloth(message, discordUserId, terryClothToUse, listOfRares, function(useError, useRes){
                                if (useError){
                                    // couldnt update the user protect
                                    // console.log(useError);
                                    useItem.setItemsLock(discordUserId, false)
                                }
                                else{
                                    // console.log(useRes[0]);
                                    if (useRes.length && useRes.length > 0 && useRes[0].itemname){
                                        message.channel.send(message.author + " has tailored a **" + useRes[0].itemname + "** -" + "`" + useRes[0].itemdescription + ", " + useRes[0].itemslot + ", " + useRes[0].itemstatistics + "`");
                                    }
                                    else if (useRes == 50){
                                        message.channel.send(message.author + " tailored something that Bender really likes, Bender gave you `50` tacos :taco:");
                                    }
                                    else if (useRes == 20){
                                        message.channel.send(message.author + " tailored something that Bender likes, Bender gave you `20` tacos :taco:");
                                    }
                                    var timeout = setTimeout (function(){ 
                                        experience.gainExperience(message, message.author, EXPERIENCE_GAINS.useCommonItemFive);
                                        stats.statisticsManage(discordUserId, "tailorcount", 1, function(staterr, statSuccess){
                                            if (staterr){
                                                // console.log(staterr);
                                            }
                                            else{
                                                // check achievements??
                                                // console.log(statSuccess);
                                                getProfileForAchievement(discordUserId, message) 
                                            }
                                        })
                                    }, 1000);
                                    
                                    
                                }
                            });
                        }
                        else{
                            useItem.setItemsLock(discordUserId, false)
                            message.channel.send(message.author + " you need at least `5` terry cloths to tailor some clothes");
                        }
                    }
                })
            }
        })
    }

    
    else if (args && args.length > 1 && !useItem.getItemsLock(discordUserId) && (args[1].toLowerCase() == "sodacan" || args[1].toLowerCase() == "soda")){
        // recycle for an item only obtainable by recycling - reputation with Bender allows u to shop for
        // 50 - pet, 175 - 20% reduced price benders shop, 400 - 50 tacos (casserole, triple cooked tacos), 1000 (server title on profile, roll one of the rarest items)
        var cansToUse = args[2] ? args[2] : 1;
        if (typeof cansToUse == "string" && cansToUse.toLowerCase() == "all"){
            cansToUse = 999999
        }
        useItem.setItemsLock(discordUserId, true)
        profileDB.getUserItems(discordUserId, function(error, inventoryResponse){
            if (error){
                // console.log(error);
                useItem.setItemsLock(discordUserId, false)
                agreeToTerms(message, discordUserId);
            }
            else{
                
                var itemsInInventoryCountMap = {};
                // array of item objects for using sodacan
                var sodaCansToUse = [];
                for (var item in inventoryResponse.data){
                    // check the rock hasnt been used
                    var validItem = useItem.itemValidate(inventoryResponse.data[item]);
                    var itemBeingAuctioned = false;
                    if (itemsInAuction[inventoryResponse.data[item].id]){
                        itemBeingAuctioned = true;
                    }
                    var itemBeingTraded = false;
                    if (activeTradeItems[inventoryResponse.data[item].id]){
                        itemBeingTraded = true;
                    }
                    if (!itemsInInventoryCountMap[inventoryResponse.data[item].itemid] 
                        && validItem && !itemBeingTraded && !itemBeingAuctioned){
                        // item hasnt been added to be counted, add it as 1
                        itemsInInventoryCountMap[inventoryResponse.data[item].itemid] = 1;

                        if (inventoryResponse.data[item].itemid == SODA_CAN_ITEM_ID){
                            // make this the soda can use
                            sodaCansToUse.push(inventoryResponse.data[item]);
                        }
                    }
                    else if (validItem && !itemBeingTraded && !itemBeingAuctioned){
                        itemsInInventoryCountMap[inventoryResponse.data[item].itemid] = itemsInInventoryCountMap[inventoryResponse.data[item].itemid] + 1;
                        if (inventoryResponse.data[item].itemid == SODA_CAN_ITEM_ID 
                            && sodaCansToUse
                            && sodaCansToUse.length < cansToUse ){
                            // make this the soda can use
                            sodaCansToUse.push(inventoryResponse.data[item]);
                        }
                    }
                }
                if (cansToUse == 999999){
                    cansToUse = itemsInInventoryCountMap[SODA_CAN_ITEM_ID] ? itemsInInventoryCountMap[SODA_CAN_ITEM_ID] : 999999
                }

                // use soda can
                if (sodaCansToUse && sodaCansToUse.length == cansToUse){
                    // able to use soda can
                    useItem.useSodaCan(message, discordUserId, sodaCansToUse, function(useError, useRes){
                        if (useError){
                            // console.log(useError);
                            useItem.setItemsLock(discordUserId, false)
                            message.channel.send(useError);
                        }
                        else{
                            // console.log(useRes);
                            var timeout = setTimeout (function(){ 
                                experience.gainExperience(message, message.author, EXPERIENCE_GAINS.useCommonItem * cansToUse);
                            }, 200);
                            
                            message.channel.send(message.author + " recycled a soda can, you have gained `" + cansToUse + "` reputation with Bender.\n`" + message.author.username + "'s Current reputation " + useRes.repNumber + ", Status: " + useRes.repStatus + "`")
                        }
                    })
                }
                else if (sodaCansToUse.length < cansToUse && sodaCansToUse.length == 0){
                    useItem.setItemsLock(discordUserId, false)
                    message.channel.send(message.author + " you do not have any soda cans to recycle..")
                }
                else if (sodaCansToUse.length < cansToUse){
                    useItem.setItemsLock(discordUserId, false)
                    message.channel.send(message.author + " you do not have that many soda cans to recycle..")
                }
            }
        })
    }
    
    else if (args && args.length > 1 && args[1].toLowerCase() == "soil" && !useItem.getItemsLock(discordUserId)){
        // soil your land -  bender seeds ur soil - use before preparing to get + 1 more taco per soil used

        // get inventory and get the soil that will be used
        // add it to user profile as soil to be used on next prepare
        // chance of soil giving extra tacos is 50%
        // add as extra tacos on user profile
        var soilsCountToUse = args[2] ? args[2] : 1;
        if (typeof soilsCountToUse == "string" && soilsCountToUse.toLowerCase() == "all"){
            soilsCountToUse = 999999
        }
        useItem.setItemsLock(discordUserId, true)
        profileDB.getUserItems(discordUserId, function(error, inventoryResponse){
            if (error){
                // console.log(error);
                useItem.setItemsLock(discordUserId, false)
                agreeToTerms(message, discordUserId);
            }
            else{
                var itemsInInventoryCountMap = {};
                // array of item objects for using soil
                var soilToUse = [];
                for (var item in inventoryResponse.data){
                    // check the rock hasnt been used
                    var validItem = useItem.itemValidate(inventoryResponse.data[item]);
                    var itemBeingAuctioned = false;
                    if (itemsInAuction[inventoryResponse.data[item].id]){
                        itemBeingAuctioned = true;
                    }
                    var itemBeingTraded = false;
                    if (activeTradeItems[inventoryResponse.data[item].id]){
                        itemBeingTraded = true;
                    }
                    if (!itemsInInventoryCountMap[inventoryResponse.data[item].itemid] 
                        && validItem && !itemBeingTraded && !itemBeingAuctioned){
                        // item hasnt been added to be counted, add it as 1
                        itemsInInventoryCountMap[inventoryResponse.data[item].itemid] = 1;

                        if (inventoryResponse.data[item].itemid == SOIL_ITEM_ID){
                            // make this the soda can use
                            soilToUse.push(inventoryResponse.data[item]);
                        }
                    }
                    else if (validItem && !itemBeingTraded && !itemBeingAuctioned){
                        itemsInInventoryCountMap[inventoryResponse.data[item].itemid] = itemsInInventoryCountMap[inventoryResponse.data[item].itemid] + 1;
                        if (inventoryResponse.data[item].itemid == SOIL_ITEM_ID 
                            && soilToUse
                            && soilToUse.length < soilsCountToUse){
                            // make this the soda can use
                            soilToUse.push(inventoryResponse.data[item]);
                        }
                    }
                }

                if (soilsCountToUse == 999999){
                    soilsCountToUse = itemsInInventoryCountMap[SOIL_ITEM_ID] ? itemsInInventoryCountMap[SOIL_ITEM_ID] : 999999
                }

                // use soil
                if (soilToUse && soilToUse.length == soilsCountToUse){
                    // able to use soil
                    useItem.useSoil(message, discordUserId, soilToUse, function(useError, useRes){
                        if (useError){
                            // console.log(useError);
                            useItem.setItemsLock(discordUserId, false)
                            message.channel.send(useError);
                        }
                        else{
                            // console.log(useRes);
                            var timeout = setTimeout (function(){ 
                                experience.gainExperience( message, message.author, EXPERIENCE_GAINS.useCommonItem * soilsCountToUse );
                                stats.statisticsManage(discordUserId, "soilcount", soilsCountToUse, function(staterr, statSuccess){
                                    if (staterr){
                                        // console.log(staterr);
                                    }
                                    else{
                                        // check achievements??
                                        getProfileForAchievement(discordUserId, message)
                                    }
                                })
                            }, 1000);
                            
                            message.channel.send(message.author + " soiled their crops, Bender planted some seeds. current soiled crops `" + useRes + "` \n")
                        }
                    })
                }
                else if (soilToUse.length < soilsCountToUse && soilToUse.length == 0){
                    useItem.setItemsLock(discordUserId, false)
                    message.channel.send(message.author + " you do not have any soil to use..")
                }
                else if (soilToUse.length < soilsCountToUse){
                    useItem.setItemsLock(discordUserId, false)
                    message.channel.send(message.author + " you do not have that many soil to use..")
                }
            }
        })
    }else if (args && args.length > 1 && (args[1].toLowerCase() == "chicken"
            || args[1].toLowerCase() == "tortilla"
            || args[1].toLowerCase() == "steak"
            || args[1].toLowerCase() == "beef"
            || args[1].toLowerCase() == "salsa"
            || args[1].toLowerCase() == "orchata" )){
            message.channel.send("These are ingredients for a party, when you have all 6 uncommons do -party to create a party for everyone!")
    }else{
        // use the item based on itemshortname
        var itemShortName = (args.length >= 2) ? args[1] : undefined;
        if (!useItem.getItemsLock(discordUserId)){
            useItem.setItemsLock(discordUserId, true)
            profileDB.getUserItems(discordUserId, function(error, inventoryResponse){
                if (error){
                    // console.log(error);
                    useItem.setItemsLock(discordUserId, false)
                    agreeToTerms(message, discordUserId);
                }
                else{
                    var itemsInInventoryCountMap = {};
                    var userInventory = inventoryResponse.data
                    for (var item in inventoryResponse.data){
                        // check the rock hasnt been used
                        var validItem = useItem.itemValidate(inventoryResponse.data[item]);
                        var itemBeingAuctioned = false;
                        if (itemsInAuction[inventoryResponse.data[item].id]){
                            itemBeingAuctioned = true;
                        }
                        var itemBeingTraded = false;
                        if (activeTradeItems[inventoryResponse.data[item].id]){
                            itemBeingTraded = true;
                        }
                        if (!itemsInInventoryCountMap[inventoryResponse.data[item].itemid] 
                            && validItem && !itemBeingTraded && !itemBeingAuctioned){
                            // item hasnt been added to be counted, add it as 1
                            itemsInInventoryCountMap[inventoryResponse.data[item].itemid] = 1;
                        }
                        else if (validItem && !itemBeingTraded && !itemBeingAuctioned){
                            itemsInInventoryCountMap[inventoryResponse.data[item].itemid] = itemsInInventoryCountMap[inventoryResponse.data[item].itemid] + 1;
                        }
                    }
    
                    // have the inventory done, now call 
                    useItem.useBasedOnShortName(message, discordUserId, itemShortName, itemsInInventoryCountMap, userInventory, function(err, res){
                        if (err){
                            useItem.setItemsLock(discordUserId, false)
                            console.log(err);
                        }else{
                            useItem.setItemsLock(discordUserId, false)
                            console.log(res);
                        }
                    })
                }
            })
        }
    }
}

module.exports.disassembleCommand = function(message, args){
    // disassemble the item that you want via args id
    // console.log(args);
    var discordUserId = message.author.id;
    if (args && args.length > 1 && !useItem.getItemsLock(discordUserId)){
        var myItemShortName =  args[1];

        // TODO: Check for hacksaw
        useItem.setItemsLock(discordUserId, true)
        profileDB.getUserItems(discordUserId, function(err, inventoryResponse){
            if (err){
                // console.log(err);
                agreeToTerms(message, discordUserId);
            }
            else{
                var itemsInInventoryCountMap = {};
                var itemsMapbyShortName = {};
                var itemsMapById = {};
                var IdsOfItemsBeingedDisassembled = []

                profileDB.getItemData(function(error, allItemsResponse){
                    if (error){
                        console.log(error)
                    }else{
                        for (var index in allItemsResponse.data){
                            itemsMapbyShortName[allItemsResponse.data[index].itemshortname] = allItemsResponse.data[index];
                        }
                        for (var index in allItemsResponse.data){
                            itemsMapById[allItemsResponse.data[index].id] = allItemsResponse.data[index];
                        }
                        for (var item in inventoryResponse.data){
                            var validItem = useItem.itemValidate(inventoryResponse.data[item]);
                            var notWearing = useItem.itemNotWearing(inventoryResponse.data[item])
                            var auctionedItem = false;
                            var ItemInQuestion = inventoryResponse.data[item]

                            if (itemsInAuction[inventoryResponse.data[item].id]){
                                auctionedItem = true;
                            }
                            var itemBeingTraded = false;
                            if (activeTradeItems[inventoryResponse.data[item].id]){
                                itemBeingTraded = true;
                            }
                            if (!itemsInInventoryCountMap[inventoryResponse.data[item].itemid] 
                                && validItem && notWearing && !auctionedItem && !itemBeingTraded){
                                // item hasnt been added to be counted, add it as 1
                                itemsInInventoryCountMap[inventoryResponse.data[item].itemid] = 1;

                                // console.log(ItemInQuestion);
                                if (itemsMapbyShortName[myItemShortName] 
                                    && itemsMapById[ItemInQuestion.itemid].itemshortname === myItemShortName){
                                        IdsOfItemsBeingedDisassembled.push(ItemInQuestion.id);
                                }
                            }
                        }
                        // console.log(itemsInInventoryCountMap);
                        for (var index in allItemsResponse.data){
                            itemsMapbyId[allItemsResponse.data[index].id] = allItemsResponse.data[index];
                            // console.log(allItemsResponse.data[index]);
                            if (allItemsResponse.data[index].itemraritycategory == "rare" && allItemsResponse.data[index].emoji != ":seedling:"){
                                // add to list of rares
                                listOfRares.push(allItemsResponse.data[index]);
                            }
                        }
                        // have items to disassemble
                        if (IdsOfItemsBeingedDisassembled.length > 0){
                            disassembleItem.performDisassemble(message, discordUserId, IdsOfItemsBeingedDisassembled, listOfRares, function(useError, daRes){
                                if (useError){
                                    console.log(useError);
                                }
                                else{
                                    console.log(daRes[0]);

                                    // TODO: create embed like scavenge 
                                    // TODO: should this have a cooldown?


                                    // if (daRes.length && daRes.length > 0 && daRes[0].itemname){
                                    //     message.channel.send(message.author + " has tailored a **" + daRes[0].itemname + "** -" + "`" + daRes[0].itemdescription + ", " + daRes[0].itemslot + ", " + daRes[0].itemstatistics + "`");
                                    // }
                                }
                            })
                        }
                    }
                })

            }
        })
    }

}

module.exports.greenHouseCommand = function(message){
    // display your greenhouse, and greenhouse information
    var discordUserId = message.author.id;
    // get user profile and greenhouse info
    profileDB.getGreenHouseData(discordUserId, function(ghErr, ghRes){
        if (ghErr){
            console.log(ghErr)
        }else{
            var greenHouseData = {
                plots: ghRes.data.plotsoflandplantid,
                plotsItemIds: ghRes.data.plotsoflanditemid,
                lastharvest: ghRes.data.lastharvest,
                timesharvested: ghRes.data.timesharvested,
                name: message.author.username
            }

            profileDB.getItemData(function(error, allItemsResponse){
                if (error){
                    console.log(error)
                }else{
                    var itemsMapById = {}
                    for (var index in allItemsResponse.data){
                        itemsMapById[allItemsResponse.data[index].id] = allItemsResponse.data[index];
                    }
                    greenHouseEmbedBuilder(message, greenHouseData, itemsMapById)
                }
            })
        }
    })
    // create embed based off of their greenhouse info stats | visual representation
    // a bunch of plants - watering item - shears - soil available

}

function greenHouseEmbedBuilder(message, greenHouseData, itemsMapById){
            
    var greenHousePlotVisual = plotsVisualBuilder(greenHouseData, itemsMapById)
    var weather = ":sunny:"
    var harvestTimeRemaining = "1 hour" // GET the harvest time, should be every 24 hours
    var shears = ":scissors:"

    const embed = new Discord.RichEmbed()
    .setColor(0x87CEFA)
    .setTitle(greenHouseData.name + "'s Green House :house_with_garden:")
    //.setThumbnail()
    .setDescription("")
    .setColor(0x87CEFA)
    .addField('Plots', greenHousePlotVisual, false)
    .addField('Weather', weather, true)
    .addField('harvestTimeRemaining', harvestTimeRemaining, true)
    .addField('shears', shears, true)
    message.channel.send({embed});
}

function plotsVisualBuilder(greenHouseData, itemsMapById){
    // make it look like ..
    // plant, plant, plant plant, plant, 📥, 📥, 📥, 📥, 
    // 
    var plotVisual = ""
    var plotCount = 1
    for (var i in greenHouseData.plots){
        // plots[i] has an emoji in items table
        var plotId = greenHouseData.plots[i]
        var plotEmoji = itemsMapById[plotId] ? itemsMapById[plotId].emoji : null
        if (!plotEmoji){
            plotEmoji = "📥"
        }
        if (plotCount > 9){
            plotVisual = plotVisual + "\n"
        }
        plotVisual = plotVisual + plotEmoji + " | "
        plotCount++
    }

    return plotVisual
}


module.exports.stableCommand = function(message){
    // display your stable, and stable information

    // get user profile and stable info

    // create embed based off of their stable info stats | visual representation
    // a bunch of animal - brush - fishing rod - lures
    
}

function stableEmbedBuilder(message, stableData){
            
    var stablesPlotVisual = plotsVisualBuilder(stableData)

    const embed = new Discord.RichEmbed()
    .setColor(0x87CEFA)
    .setTitle(greenHouseData.name + "'s Stables")
    //.setThumbnail()
    .setDescription("")
    .setColor(0x87CEFA)
    .addField('Stables', stablesPlotVisual, false)
    message.channel.send({embed});
}

function stablesVisualBuilder(stableData){
    // make it look like ..
    // pet, pet, pet, pet etc
    var stablesVisual = ""
    
    return stablesVisual
}

module.exports.templeCommand = function(message){
    // display your temple, and temple information

    // get user profile and temple info

    // create embed based off of their temple info stats | visual representation
    // a bunch of random shit - sanctum? - recipes? 
    // ( blueprints for rares, and ancients )
    // 
}

function templeEmbedBuilder(message, templeData){
            
    var templePlotVisual = templeVisualBuilder(templeData)

    const embed = new Discord.RichEmbed()
    .setColor(0x87CEFA)
    .setTitle(greenHouseData.name + "'s Temple")
    //.setThumbnail()
    .setDescription("")
    .setColor(0x87CEFA)
    .addField('Temple', templePlotVisual, false)
    message.channel.send({embed});
}

function templeVisualBuilder(templeData){
    // make it look like ..
    // recipes active | dust collected
    var templeVisual = ""
    
    return templeVisual
}

module.exports.bakeCommand = function(message, args){
    // use fruits harvested in order to bake things
    
    
    // individual plants and fruits are also materials used to upgrade stable and temple

    // 
}

module.exports.plantCommand = function(message, args){
    var discordUserId = message.author.id;
    // arguments will be, seednameid, greenhouse slot
    // -plant bambooseed 5
    // plant a bamboo seed in slot 5 of your greenhouse
    if (args && args.length > 2 ){
        var myItemShortName =  args[1];
        var plotOfLand = Math.floor( args[2] );  // in an array this will always be -1 of index

        profileDB.getUserItems(discordUserId, function(err, inventoryResponse){
            if (err){
                // console.log(err);
                agreeToTerms(message, discordUserId);
            }
            else{
                var itemsInInventoryCountMap = {};
                var itemsMapbyShortName = {};
                var itemsMapById = {};
                var plantBeingPlanted = []
                profileDB.getItemData(function(error, allItemsResponse){
                    if (error){
                        console.log(error)
                    }else{
                        for (var index in allItemsResponse.data){
                            itemsMapbyShortName[allItemsResponse.data[index].itemshortname] = allItemsResponse.data[index];
                        }
                        for (var index in allItemsResponse.data){
                            itemsMapById[allItemsResponse.data[index].id] = allItemsResponse.data[index];
                        }

                        for (var item in inventoryResponse.data){
                            var validItem = useItem.itemValidate(inventoryResponse.data[item]);
                            var notWearing = useItem.itemNotWearing(inventoryResponse.data[item])
                            var auctionedItem = false;
                            var ItemInQuestion = inventoryResponse.data[item]

                            if (itemsInAuction[inventoryResponse.data[item].id]){
                                auctionedItem = true;
                            }
                            var itemBeingTraded = false;
                            if (activeTradeItems[inventoryResponse.data[item].id]){
                                itemBeingTraded = true;
                            }
                            if (!itemsInInventoryCountMap[inventoryResponse.data[item].itemid] 
                                && validItem && notWearing && !auctionedItem && !itemBeingTraded){
                                // item hasnt been added to be counted, add it as 1
                                itemsInInventoryCountMap[inventoryResponse.data[item].itemid] = 1;

                                // console.log(ItemInQuestion);
                                if (itemsMapbyShortName[myItemShortName] 
                                    && itemsMapById[ItemInQuestion.itemid].itemshortname === myItemShortName){
                                        plantBeingPlanted.push(ItemInQuestion);
                                }
                            }
                        }

                        // get the user's inventory, make sure they have the seed, 
                        if (plantBeingPlanted.length > 0){
                            // 
                            profileDB.getGreenHouseData(discordUserId, function(ghError, ghRes){
                                if (ghError){
                                    console.log(ghError)
                                }else{
                                    var greenHouseData = {
                                        numberOfPlots: ghRes.data.plotsofland,
                                        plots: ghRes.data.plotsoflandplantid,
                                        plotsItemIds: ghRes.data.plotsoflanditemid,
                                        lastharvest: ghRes.data.lastharvest,
                                        timesharvested: ghRes.data.timesharvested,
                                        plantName: itemsMapById[plantBeingPlanted[0].itemid].itemname,
                                        name: message.author.username
                                    }

                                    // if they do get the user's greenhouse, check that the slot is available (not higher than their #ofplots)
                                    if ( plotOfLand > 0 && plotOfLand <= greenHouseData.numberOfPlots){
                                        // plant on plot an update
                                        plantOnPlotOfLand(message, discordUserId, plotOfLand, greenHouseData, plantBeingPlanted[0])
                                    }else{
                                        message.channel.send("Invalid plot of land, try planting in a slot that is available to you")
                                    }
                                    // if available, plant the seed in the plot of land, insert itemid, plantid, and set total harv = 0

                                }
                            })
                        }else{
                            message.channel.send("missing plant seed")
                        }
                    }
                })
            }
        })
    }else{
        message.channel.send("example: `-plant [seed] [plot of land #]")
    }
}

function plantOnPlotOfLand(message, discordUserId, plotOfLand, greenHouseData, plantBeingPlanted){
    // set the timesharvested to 0 plotsoflanditemid to inventoryid plotsoflandplantid itemid
    // plotOfLand is the slot for all the arrays that will be edited
    // greenHouseData mainly remainds the same
    // plantBeingPlanted will be the item object - the id will be the inventoryid
    // column: value
    var index = plotOfLand - 1
    var updateInfoObject = {
        timesharvested: greenHouseData.timesharvested,
        plotsoflanditemid: greenHouseData.plotsItemIds,
        plotsoflandplantid: greenHouseData.plots

    }
    updateInfoObject.timesharvested[index] = 0;
    updateInfoObject.plotsoflandplantid[index] = plantBeingPlanted.itemid
    updateInfoObject.plotsoflanditemid[index] = plantBeingPlanted.id

    profileDB.updateItemStatus(plantBeingPlanted.id, "used", function(err, res){
        if (err){
            console.log(err)
        }else{
            profileDB.updatePlotInfo(discordUserId, updateInfoObject, function(plotErr, plotRes){
                if (plotErr){
                    console.log(plotErr)
                }else{
                    console.log(plotRes)
                    message.channel.send(message.author + " has planted a " + greenHouseData.plantName + " !")
                }
            })
        }
    })
}

// TODO: Finish these
var itemHarvested = {
    "pear": "pears",
    "tulip": "tulips",
    "cactus": "cacti"
}

module.exports.harvestCommand = function(message, args){
    var discordUserId = message.author.id;
    // harvest your greenhouse plots of land
    profileDB.getGreenHouseData(discordUserId, function(err, profileData) {
        if(err){
            console.log(err)
        }else{
            var greenHouseData = {
                plots: profileData.data.plotsoflandplantid,
                harvestCounts: profileData.data.timesharvested,
                plotsItemIds: profileData.data.plotsoflanditemid,
                lastharvest: profileData.data.lastharvest,
                timesharvested: profileData.data.timesharvested,
                name: message.author.username
            }
            profileDB.getItemData(function(error, allItemsResponse){
                if (error){
                    console.log(error)
                }else{
                    var itemsMapById = {}
                    for (var index in allItemsResponse.data){
                        itemsMapById[allItemsResponse.data[index].id] = allItemsResponse.data[index];
                    }
                    var fruitsHarvested = harvestPlotsOfLand(greenHouseData, itemsMapById)
                    // harvest your plots of land
                    var fruitsColumnsWithCount = {}
                    for (var f in fruitsHarvested){
                        if ( itemHarvested[f] ){
                            var actualFruitColumnId = itemHarvested[f]
                            fruitsColumnsWithCount[actualFruitColumnId] = fruitsHarvested[f]
                        }
                    }
                    var newHarvestCounts = []
                    for (var h in greenHouseData.harvestCounts){
                        var currentCount = greenHouseData.harvestCounts[h]
                        newHarvestCounts.push(currentCount + 1)
                    }

                    // go through all the plants in your garden, harvest them, and then add them to your fruits profile
                    profileDB.bulkupdateUserFruits(discordUserId, fruitsColumnsWithCount, function(err, bulkRes){
                        if (err){
                            console.log(err)
                        }else{
                            console.log(bulkRes)
                            var now = new Date();
                            profileDB.updatePlotInfo(discordUserId, { lastharvest: now, timesharvested: newHarvestCounts }, function(plotErr, plotRes){
                                if (plotErr){
                                    console.log(plotErr)
                                }else{
                                    console.log(plotRes)
                                }
                            })
                        }
                    })
                }
            })
        }
    })
}

function harvestPlotsOfLand(greenHouseData, itemsMapById){
    // return an object with all the plants harvested, and the count harvested
    var fruitsObject = {}
    for (var i in greenHouseData.plots){
        // plots[i] has an emoji in items table
        var plotId = greenHouseData.plots[i]
        // get the shortname of that item
        if (plotId){
            var plotShortName = itemsMapById[plotId].itemshortname
            if (!fruitsObject[plotShortName]){
                fruitsObject[plotShortName] = 1
            }else{
                fruitsObject[plotShortName] = fruitsObject[plotShortName] + 1
            }
        }
    }
    return fruitsObject
}

module.exports.craftCommand = function(message, args){
    // TEMPLE COMMAND
    var discordUserId = message.author.id;

    // create an item based on itemnameid
    if (args && args.length > 1 ){
        var myItemShortName =  args[1];

        // craft the item if you have the materials required, and are able to craft it
        // materials required will vary, you can only craft the item if you own the recipe
    }
}

module.exports.upgradeCommand = function(message, args){
    var discordUserId = message.author.id;

    // upgrade a specific building - stable, greenhouse, temple
    // 15 upgrades in total currently
    // commons required per upgrade: first upgrade should be ~175 commons,  final upgrade currently should be 50k commons
    if (args && args.length > 1 ){
        var buildingName =  args[1];

            // must have the materials required to upgrade the building
            // must have the reputation required to upgrade the building
        
        if (buildingName.toLowerCase() == "stable"){
            // uses items from greenhouse and commons to feed, and upgrade
            // increase the slots for pets
            // increase the maximum stats the pet can gain
        }else if (buildingName.toLowerCase() == "greenhouse"){
            // uses commons to upgrade
            // increase the plots of land you can obtain
            // increase the number of times harvested allowed
        }else if (buildingName.toLowerCase() == "temple"){
            // uses items from greenhouse and commons to upgrade
            // increase tacos given to others via sorry / thank
            // unlock ability to craft rares
            // increase tacos given to others via sorry / thank
            // unlock ability to craft ancients
            // increase tacos given to others via sorry / thank
            // unlock ability to craft amulets
            // unlock pool of items to craft, and be able to craft lvl 35+ items
        }
    }
}

module.exports.fishCommand = function(message, args){
    // STABLES COMMAND
    var discordUserId = message.author.id;

    // go fishing 
    if (args && args.length > 1 ){
        var lureName =  args[1];

        // check the lure you're using

        // add the fish to your fishies
    }
}

module.exports.raceCommand = function(message, args){
    // STABLES COMMAND
    var discordUserId = message.author.id;

    // go racing 
    if (args && args.length > 1 ){
        var petName =  args[1];

        // check the pet you are using to race
    }
}

module.exports.combineCommand = function(message, args){
    // console.log(args);
    var discordUserId = message.author.id;

    if (args && args.length > 1 && !useItem.getItemsLock(discordUserId)){
        var myItemShortName =  args[1];
        var itemCount = 1
        // get all the items available
        useItem.setItemsLock(discordUserId, true)
        profileDB.getUserItems(discordUserId, function(err, inventoryResponse){
            if (err){
                // console.log(err);
                agreeToTerms(message, discordUserId);
                useItem.setItemsLock(discordUserId, false)
            }
            else{
                // 
                // get all the data for each item
                var itemsInInventoryCountMap = {};
                var itemsMapbyShortName = {};
                var itemsMapById = {};
                var itemsBeingedCombined = []
                profileDB.getItemData(function(error, allItemsResponse){
                    if (error){
                        useItem.setItemsLock(discordUserId, false)
                        console.log(error)
                    }else{
                        for (var index in allItemsResponse.data){
                            itemsMapbyShortName[allItemsResponse.data[index].itemshortname] = allItemsResponse.data[index];
                        }
                        for (var index in allItemsResponse.data){
                            itemsMapById[allItemsResponse.data[index].id] = allItemsResponse.data[index];
                        }
                        //// console.log(allItemsResponse.data);
                        for (var item in inventoryResponse.data){
                            var validItem = useItem.itemValidate(inventoryResponse.data[item]);
                            var notWearing = useItem.itemNotWearing(inventoryResponse.data[item])
                            var auctionedItem = false;
                            var ItemInQuestion = inventoryResponse.data[item]

                            if (itemsInAuction[inventoryResponse.data[item].id]){
                                auctionedItem = true;
                            }
                            var itemBeingTraded = false;
                            if (activeTradeItems[inventoryResponse.data[item].id]){
                                itemBeingTraded = true;
                            }
                            if (!itemsInInventoryCountMap[inventoryResponse.data[item].itemid] 
                                && validItem && notWearing && !auctionedItem && !itemBeingTraded){
                                // item hasnt been added to be counted, add it as 1
                                itemsInInventoryCountMap[inventoryResponse.data[item].itemid] = 1;
                                if (itemsMapbyShortName[myItemShortName] 
                                    && itemsMapById[ItemInQuestion.itemid]
                                    && itemsMapById[ItemInQuestion.itemid].itemshortname === myItemShortName ){
                                    var rarityOfItem = itemsMapbyShortName[myItemShortName].itemraritycategory
                                    if (rarityOfItem == "uncommon+"){
                                        itemCount = 5
                                    }
                                    else if (rarityOfItem == "rare"){
                                        itemCount = 5
                                    }else if (rarityOfItem == "ancient"){
                                        itemCount = 4
                                    }
                                    else if (rarityOfItem == "rare+"){
                                        itemCount = 5
                                    }
                                    else if (rarityOfItem == "rare++"){
                                        itemCount = 5
                                    }
                                    else if (rarityOfItem == "ancient+"){
                                        itemCount = 4
                                    }
                                    else if (rarityOfItem == "ancient++"){
                                        itemCount = 4
                                    }
                                    else if (rarityOfItem == "artifact"){
                                        itemCount = 4
                                    }
                                }
                                // console.log(ItemInQuestion);
                                if (itemsMapbyShortName[myItemShortName] 
                                    && itemsBeingedCombined.length < itemCount
                                    && itemsMapById[ItemInQuestion.itemid]
                                    && itemsMapById[ItemInQuestion.itemid].itemshortname === myItemShortName){
                                        itemsBeingedCombined.push(ItemInQuestion);
                                }
                            }
                            else if (validItem && notWearing && !auctionedItem && !itemBeingTraded){
                                itemsInInventoryCountMap[inventoryResponse.data[item].itemid] = itemsInInventoryCountMap[inventoryResponse.data[item].itemid] + 1;
                                if (itemsMapbyShortName[myItemShortName] 
                                    && itemsBeingedCombined.length < itemCount
                                    && itemsMapById[ItemInQuestion.itemid]
                                    && itemsMapById[ItemInQuestion.itemid].itemshortname === myItemShortName){
                                        itemsBeingedCombined.push(ItemInQuestion);
                                }
                            }
                        }
                        var combineToId = itemsMapbyShortName[myItemShortName] ? itemsMapbyShortName[myItemShortName].combinetoid : undefined;
                        if (combineToId){
                            // item short name is valid
                            if (itemsMapbyShortName[myItemShortName]){
                                var idOfMyItem = itemsMapbyShortName[myItemShortName].id;

                                var rarityOfMyItem = itemsMapbyShortName[myItemShortName].itemraritycategory
                                //////////////////// TODO: do not allow user to combine if they are on stage # of the artifact quest
                                if (rarityOfMyItem && rarityOfMyItem == "artifact"){
                                    // take the ids of the other 2 artifacts + artifact recipe and push them onto itemsBeingCombined array
                                    
                                    var artifactId = ARTIFACT_RECIPE_ID
                                    var recipeAdded = false;
                                    var firstArtifact = itemsMapbyShortName[myItemShortName] ? itemsMapbyShortName[myItemShortName].firstartifact : undefined; 
                                    var firstArtifactAdded = false;
                                    var secondArtifact = itemsMapbyShortName[myItemShortName] ? itemsMapbyShortName[myItemShortName].secondartifact : undefined; 
                                    var secondArtifactAdded = false;

                                    // Check that the user has an artifact recipe, and the other two artifacts in their inventory
                                    if (itemsInInventoryCountMap[artifactId] >= 1
                                        && itemsInInventoryCountMap[firstArtifact] >= 1
                                        && itemsInInventoryCountMap[secondArtifact] >= 1){
                                        for (var item in inventoryResponse.data){
                                            var validItem = useItem.itemValidate(inventoryResponse.data[item]);
                                            var notWearing = useItem.itemNotWearing(inventoryResponse.data[item])
                                            var auctionedItem = false;
                                            var ItemInQuestion = inventoryResponse.data[item]

                                            if ( itemsMapById[ItemInQuestion.itemid] && itemsMapById[ItemInQuestion.itemid].id === artifactId && !recipeAdded){
                                                itemsBeingedCombined.push(ItemInQuestion);
                                                recipeAdded = true;
                                            }
                                            else if (itemsMapById[ItemInQuestion.itemid] && itemsMapById[ItemInQuestion.itemid].id === firstArtifact && !firstArtifactAdded){
                                                itemsBeingedCombined.push(ItemInQuestion);
                                                firstArtifactAdded = true;
                                            }
                                            else if (itemsMapById[ItemInQuestion.itemid] && itemsMapById[ItemInQuestion.itemid].id === secondArtifact && !secondArtifactAdded){
                                                itemsBeingedCombined.push(ItemInQuestion);
                                                secondArtifactAdded = true
                                            }
                                        }
                                        // added all required items - set the artifacts to 'questing'

                                        var itemToCreate = itemsMapById[combineToId];  // maybe create the item and keep it inactive?
                                        var itemToCreateById = itemsMapById[combineToId].id;
                                        var itemToCreateByName = itemsMapById[combineToId].itemname
                                        // enable user to be in quest stage 1 of the quest series (user profile)
                                        var questName = itemsMapbyShortName[myItemShortName] ? itemsMapbyShortName[myItemShortName].questname : undefined;
                                        // var questName = "ring" // get from item.questname

                                        if (questName && recipeAdded && firstArtifactAdded && secondArtifactAdded ){
                                            profileDB.userStartQuest(discordUserId, questName, function(createErr, createRes){
                                                if (createErr){
                                                    useItem.setItemsLock(discordUserId, false)
                                                    console.log(createErr);
                                                }
                                                else{
                                                    // console.log(createRes);                                        
                                                    profileDB.bulkUpdateItemStatus(itemsBeingedCombined, "questing", function(combineErr, combineRes){
                                                        if (combineErr){
                                                            console.log(combineErr);
                                                            useItem.setItemsLock(discordUserId, false)
                                                        }else{
                                                            // console.log(combineRes);
                                                            // embed showing the questline has begun
                                                            profileDB.getUserProfileData(discordUserId, function(profileErr, profileRes){
                                                                if (profileErr){
                                                                    console.log(profileErr)
                                                                    useItem.setItemsLock(discordUserId, false)
                                                                    message.channel.send("something wrong in getting user profile")
                                                                }else{
                                                                    useItem.setItemsLock(discordUserId, false)
                                                                    var data = { achievements: profileRes.data.achievements, itemraritycombined: "artifact"}
                                                                    achiev.checkForAchievements(discordUserId, data, message)
                                                                }
                                                            })
                                                            var questData = {
                                                                stage: "start"
                                                            }
                                                            var questString = quest.questStringBuilder(questName, questData)
                                                            quest.questStartEmbedBuilder(message, questName, questString);
                                                        }
                                                    })
                                                }
                                            })
                                        }
                                        else{
                                            useItem.setItemsLock(discordUserId, false)
                                            message.channel.send("You do not have all the items required to combine")
                                        }
                                    }else{
                                        useItem.setItemsLock(discordUserId, false)
                                    }
                                    
                                }else if (rarityOfMyItem && rarityOfMyItem == "rare++"
                                    && itemsInInventoryCountMap[idOfMyItem] 
                                    && itemsInInventoryCountMap[idOfMyItem] >= itemCount){
                                    // use transformium
                                    var transId = TRANSFORMIUM_ID
                                    var transAdded = false;
                                    if (itemsInInventoryCountMap[transId] >= 1){
                                        for (var item in inventoryResponse.data){
                                            var ItemInQuestion = inventoryResponse.data[item]
                                            if ( itemsMapById[ItemInQuestion.itemid] && itemsMapById[ItemInQuestion.itemid].id === transId && !transAdded){
                                                itemsBeingedCombined.push(ItemInQuestion);
                                                transAdded = true;
                                            }
                                        }
                                        var itemToCreate = itemsMapById[combineToId];  // maybe create the item and keep it inactive?
                                        var itemToCreateById = itemsMapById[combineToId].id;
                                        var itemToCreateByName = itemsMapById[combineToId].itemname
                                        // use the transformium
                                        if (transAdded){
                                            profileDB.addNewItemToUser(discordUserId, [itemToCreate], function(createErr, createRes){
                                                if (createErr){
                                                    // console.log(createErr);
                                                    useItem.setItemsLock(discordUserId, false)
                                                }
                                                else{
                                                    // console.log(createRes);                                        
                                                    profileDB.bulkUpdateItemStatus(itemsBeingedCombined, "used", function(combineErr, combineRes){
                                                        if (combineErr){
                                                            // console.log(combineErr);
                                                            useItem.setItemsLock(discordUserId, false)
                                                        }else{
                                                            // console.log(combineRes);
                                                            useItem.setItemsLock(discordUserId, false)
                                                            combineEmbedBuilder(message, itemToCreateByName, itemToCreate, rarityOfItem);
                                                        }
                                                    })
                                                }
                                            })        
                                        }else{
                                            useItem.setItemsLock(discordUserId, false)
                                        }
                                    }else{
                                        useItem.setItemsLock(discordUserId, false)
                                    }
                                }
                                else if (rarityOfMyItem && rarityOfMyItem == "ancient++"
                                    && itemsInInventoryCountMap[idOfMyItem] 
                                    && itemsInInventoryCountMap[idOfMyItem] >= itemCount){
                                    // use transformium
                                    var ethereumId = ETHEREUM_ID
                                    var transAdded = false;
                                    if (itemsInInventoryCountMap[ethereumId] >= 1){
                                        for (var item in inventoryResponse.data){
                                            var ItemInQuestion = inventoryResponse.data[item]
                                            if ( itemsMapById[ItemInQuestion.itemid] && itemsMapById[ItemInQuestion.itemid].id === ethereumId && !transAdded){
                                                itemsBeingedCombined.push(ItemInQuestion);
                                                transAdded = true;
                                            }
                                        }
                                        var itemToCreate = itemsMapById[combineToId];  // maybe create the item and keep it inactive?
                                        var itemToCreateById = itemsMapById[combineToId].id;
                                        var itemToCreateByName = itemsMapById[combineToId].itemname
                                        // use the transformium
                                        if (transAdded){
                                            profileDB.addNewItemToUser(discordUserId, [itemToCreate], function(createErr, createRes){
                                                if (createErr){
                                                    // console.log(createErr);
                                                    useItem.setItemsLock(discordUserId, false)
                                                }
                                                else{
                                                    // console.log(createRes);                                        
                                                    profileDB.bulkUpdateItemStatus(itemsBeingedCombined, "used", function(combineErr, combineRes){
                                                        if (combineErr){
                                                            useItem.setItemsLock(discordUserId, false)
                                                            // console.log(combineErr);
                                                        }else{
                                                            // console.log(combineRes);
                                                            useItem.setItemsLock(discordUserId, false)
                                                            combineEmbedBuilder(message, itemToCreateByName, itemToCreate, rarityOfItem);
                                                        }
                                                    })
                                                }
                                            })        
                                        }else{
                                            useItem.setItemsLock(discordUserId, false)
                                        }
                                    }else{
                                        useItem.setItemsLock(discordUserId, false)
                                    }
                                }
                                else if (itemsInInventoryCountMap[idOfMyItem] && 
                                    itemsInInventoryCountMap[idOfMyItem] >= itemCount){
                                    // combine all the items into a next level item
                                    var itemToCreate = itemsMapById[combineToId];
                                    var itemToCreateById = itemsMapById[combineToId].id;
                                    var itemToCreateByName = itemsMapById[combineToId].itemname
                                    
                                    //create an item of that kind for the user and set all the other items to 'used'
                                    profileDB.addNewItemToUser(discordUserId, [itemToCreate], function(createErr, createRes){
                                        if (createErr){
                                            useItem.setItemsLock(discordUserId, false)
                                            // console.log(createErr);
                                        }
                                        else{
                                            // console.log(createRes);                                        
                                            profileDB.bulkUpdateItemStatus(itemsBeingedCombined, "used", function(combineErr, combineRes){
                                                if (combineErr){
                                                    // console.log(combineErr);
                                                    useItem.setItemsLock(discordUserId, false)
                                                }else{
                                                    // console.log(combineRes);
                                                    useItem.setItemsLock(discordUserId, false)
                                                    combineEmbedBuilder(message, itemToCreateByName, itemToCreate, rarityOfItem);
                                                }
                                            })
                                        }
                                    })
                                }
                                else{
                                    useItem.setItemsLock(discordUserId, false)
                                    message.channel.send("unable to combine.. you need " + itemCount);
                                }
                            }else{
                                useItem.setItemsLock(discordUserId, false)
                            }
                        }
                        else{
                            useItem.setItemsLock(discordUserId, false)
                            message.channel.send("cannot combine that item");
                        }
                    }
                })
            }
        })
    }else{
        //print usage
        message.channel.send("example use: -combine loincloth OR -combine polyester");
    }

    // combine rock for boulder, 5 rares to make 1 improved, 5 improved to make 1 refined
}

function missionCheckCommand(message, discordUserId, command, commandDoneToId, data){

    // if not on ring stage then just check for other regular missions (future)
    profileDB.getUserProfileData(discordUserId, function(profileErr, profileData){
        if (profileErr){
            console.log (profileErr);
        }else{
            var stage = profileData.data.ringqueststage;

            if (stage == 2){
                // on the give 20000 tacos step
                if (command == "give"){
                    var questData = {
                        giveAmount: data.giveAmount,
                        commandTo: commandDoneToId,
                        command: command
                    }
                    var team = []
                    quest.questHandler(message, discordUserId, "ring", stage, team, questData, message.channel)
                }
                
            }else if (stage == 3){
                if (command == "thank"){ // TODO:  || command == "sorry"){
                    // thank / sorry command
                    var questData = {
                        command: command,
                        commandTo: commandDoneToId
                    }
                    var team = []
                    quest.questHandler(message, discordUserId, "ring", stage, team, questData, message.channel)
                }
                
            }else if (stage == 4){
                // wedding step - 15 required for reactions (should be done via -marry instead)
            }
        }
    })
}

module.exports.proposeCommand = function(message, channel){
    // travel to the specified date in args
    var discordUserId = message.author.id;
    var users  = message.mentions.users;
    var mentionedId;
    var mentionedUser;
    users.forEach(function(user){
        mentionedId = user.id;
        mentionedUser = user
    })
    if (mentionedUser && !mentionedUser.bot && mentionedUser != discordUserId){
        profileDB.getUserProfileData(discordUserId, function(profileErr, profileData){
            if (profileErr){
                console.log (profileErr);
            }else{
                var stage = profileData.data.ringqueststage;

                if (stage == 1){
                    // first stage of ring, user proposes
                    var questData = {
                        proposedTo: mentionedUser
                    }
                    var team = []
                    quest.questHandler(message, discordUserId, "ring", stage, team, questData, channel)
                }
                if (stage >= 2 && stage <= 5){
                    // create a mission in quest for the user with proposedTo and the data depending on what stage they are on
                    quest.proposedTo(message, discordUserId, stage, mentionedUser)
                }
            }
        })
    }else{
        message.channel.send("You must propose to another user that is not a bot")
    }
}

module.exports.weddingCommand = function(message, channel){
    // travel to the specified date in args
    var discordUserId = message.author.id;
    var users  = message.mentions.users;
    var mentionedId;
    var mentionedUser;
    users.forEach(function(user){
        mentionedId = user.id;
        mentionedUser = user
    })

    profileDB.getUserProfileData(discordUserId, function(profileErr, profileData){
        if (profileErr){
            console.log (profileErr);
        }else{
            var stage = profileData.data.ringqueststage;

            if (stage == 4){
                // first stage of ring, user proposes
                var questData = {
                    proposedTo: mentionedUser
                }
                var team = [] 
                /// TEAM MUST BE > 5
                quest.questHandler(message, discordUserId, "ring", stage, team, questData, channel)
            }
            if (stage == 5){
                // user marries - creates embed for wedding
                var questData = {
                    marriedTo: mentionedUser
                }
                var team = []
                quest.questHandler(message, discordUserId, "ring", stage, team, questData, channel)
            }
            // TODO: give, thanks, and sorry should check whether the user is in stages 2, 3 and complete the stages
            // on stage 4, everyone can react to the embed and receive rewards
            // stage 5 should be started via -wedding @users
        }
    })
}

module.exports.exploreTombCommand = function(message, args, channel){
    // travel to the specified date in args
    var discordUserId = message.author.id;

    var users  = message.mentions.users
    
    var team = [];
    team.push(message.author);

    users.forEach(function(user){
        if (team.length < 5 && discordUserId != user.id){
            team.push(user);
        }
    })
    // check to see all the team members are available and not already in an event
    var validTeam = true;
    for (var member in team){
        /*
        if (usersInRPGEvents["rpg-"+team[member].id]){
            validTeam = false;
        }
        */
        if (team[member].bot){
            validTeam = false;
        }
    }
    // TODO: change this to 5
    if (team.length > 1 && team.length <= 5){
        profileDB.getUserProfileData(discordUserId, function(profileErr, profileData){
            if (profileErr){
                console.log (profileErr);
            }else{
                var stage = profileData.data.tombqueststage;
                var questData = {}
                if (stage == 1){
                    // first stage of tomb, enter tomb
                    quest.questHandler(message, discordUserId, "tomb", stage, team, questData, channel)
                }
                else if (stage == 2){
                    // second stage of tomb
                    quest.questHandler(message, discordUserId, "tomb", stage, team, questData, channel)
                }
                else if (stage == 3){
                    // third stage of tomb
                    quest.questHandler(message, discordUserId, "tomb", stage, team, questData, channel)
                }
                else if (stage == 4){
                    // 4th stage, tomb
                    quest.questHandler(message, discordUserId, "tomb", stage, team, questData, channel)
                }
                else if (stage == 5){
                    // 5th stage, tomb
                    quest.questHandler(message, discordUserId, "tomb", stage, team, questData, channel)
                }
                else if (stage == 6){
                    // 6th stage, defeat archvampires
                    quest.questHandler(message, discordUserId, "tomb", stage, team, questData, channel)
                }
                else if (stage == 7){
                    message.channel.send("exploring tomb ")
                }
            }
        })
    }
}

module.exports.ritualCommand = function(message, args, channel){
    
    var discordUserId = message.author.id;

    var users  = message.mentions.users
    
    var team = [];
    team.push(message.author);

    users.forEach(function(user){
        if (team.length < 5 && discordUserId != user.id){
            team.push(user);
        }
    })
    // check to see all the team members are available and not already in an event
    var validTeam = true;
    for (var member in team){
        /*
        if (usersInRPGEvents["rpg-"+team[member].id]){
            validTeam = false;
        }
        */
        if (team[member].bot){
            validTeam = false;
        }
    }
    if (team.length >= 1 && team.length <= 5){
        profileDB.getUserProfileData(discordUserId, function(profileErr, profileData){
            if (profileErr){
                console.log (profileErr);
            }else{
                var stage = profileData.data.demonicqueststage;

                if (stage == 1){
                    // first stage of demonic
                    var questData = {

                    }
                    quest.questHandler(message, discordUserId, "demonic", stage, team, questData, channel)

                }
                else if (stage == 2){
                    // second stage of demonic
                    var questData = {
                    }
                    quest.questHandler(message, discordUserId, "demonic", stage, team, questData, channel)
                }
                else if (stage == 3){
                    // third stage of demonic
                    var questData = {
                    }
                    quest.questHandler(message, discordUserId, "demonic", stage, team, questData, channel)
                }
                else if (stage == 4){
                    // 4th stage, defeat the swarm of demons
                    var questData = {
                    }
                    quest.questHandler(message, discordUserId, "demonic", stage, team, questData, channel)
                }
                else if (stage == 5){
                    // 5th stage, defeat andromalius
                    var questData = {
                    }
                    quest.questHandler(message, discordUserId, "demonic", stage, team, questData, channel)
                }
                else{
                    message.channel.send("performed ritual ")
                }
            }
        })
    }
}

module.exports.timeTravelCommand = function(message, args, channel){
    // travel to the specified date in args
    var discordUserId = message.author.id;

    var users  = message.mentions.users
    
    var team = [];
    team.push(message.author);

    users.forEach(function(user){
        if (team.length < 5 && discordUserId != user.id){
            team.push(user);
        }
    })
    // check to see all the team members are available and not already in an event
    var validTeam = true;
    for (var member in team){
        /*
        if (usersInRPGEvents["rpg-"+team[member].id]){
            validTeam = false;
        }
        */
        if (team[member].bot){
            validTeam = false;
        }
    }

    if (args.length > 1 && args[1] >= 1210 && args[1] <= 1215 && team.length <= 5){
        // travel back in time to the year... 

        // check that author is on stage 1 of timetravel 
        profileDB.getUserProfileData(discordUserId, function(profileErr, profileData){
            if (profileErr){
                console.log (profileErr);
            }else{
                var stage = profileData.data.timetravelqueststage;

                if (stage == 1){
                    // create an rpg event with the tagged members to time travel
                    var questData = {
                        year: args[1]
                    }
                    quest.questHandler(message, discordUserId, "timetravel", stage, team, questData, channel)

                }
                else if (stage == 2){
                    var questData = {
                        year: args[1]
                    }
                    quest.questHandler(message, discordUserId, "timetravel", stage, team, questData, channel)
                }
                else{
                    // TODO: make this just be a travel in time
                    message.channel.send("traveled to the year " + args[1])
                }
            }
        })
        
        // post an embed message that shows the team members back in time, they can react
        // to the embed and obtain items from these reactions - advance to stage 2
        
        // when all 5 members react to this embed they will fight against genghis khan and his 4 knights
        // (special monsters)
        // when members succeed and defeat them they will all obtain rewards (group leader advances to stage2) 

        // skipping will close the event
    }else if (args.length > 1 && args[1] >= -66000000 && args[1] <= -64000000 && team.length <= 5){
        profileDB.getUserProfileData(discordUserId, function(profileErr, profileData){
            if (profileErr){
                // console.log (profileErr);
            }else{
                var stage = profileData.data.timetravelqueststage;

                if (stage == 3){
                    var questData = {
                        year: args[1]
                    }
                    quest.questHandler(message, discordUserId, "timetravel", stage, team, questData, channel)
                }
                else if (stage == 4){
                    var questData = {
                        year: args[1]
                    }
                    quest.questHandler(message, discordUserId, "timetravel", stage, team, questData, channel)
                }
                else{
                    message.channel.send("traveled to the year " + args[1])
                }
            }
        })
    }else if (args.length > 1 && args[1] >= 3120 && args[1] <= 3130 && team.length <= 5){
        profileDB.getUserProfileData(discordUserId, function(profileErr, profileData){
            if (profileErr){
                // console.log (profileErr);
            }else{
                var stage = profileData.data.timetravelqueststage;

                if (stage == 5){
                    var questData = {
                        year: args[1]
                    }
                    quest.questHandler(message, discordUserId, "timetravel", stage, team, questData, channel)
                }
                else if (stage == 6){
                    var questData = {
                        year: args[1]
                    }
                    quest.questHandler(message, discordUserId, "timetravel", stage, team, questData, channel)
                }
                else{
                    message.channel.send("traveled to the year " + args[1])
                }
            }
        })
    }else if (args.length > 1 && args[1] >= 220000000 && args[1] <= 240000000 && team.length <= 5){
        profileDB.getUserProfileData(discordUserId, function(profileErr, profileData){
            if (profileErr){
                // console.log (profileErr);
            }else{
                var stage = profileData.data.timetravelqueststage;

                if (stage == 6){
                    var questData = {
                        year: args[1]
                    }
                    quest.questHandler(message, discordUserId, "timetravel", stage, team, questData, channel)
                }
                else{
                    message.channel.send("traveled to the year " + args[1])
                }
            }
        })
    }
}

function combineEmbedBuilder(message, itemToCreateByName, ItemDetails, itemRarity){
    // create a quoted message of all the items
    if (itemRarity == "ancient"){
        var description = "**Item Stats:** " + ItemDetails.itemstatistics + "\n" + "**Item Slot:** " + ItemDetails.itemslot + "\n" + "**To Wear:** -puton " + ItemDetails.itemshortname;
        const embed = new Discord.RichEmbed()
        .setAuthor(message.author.username + " has created " + itemToCreateByName)
        .addField(ItemDetails.itemdescription, description, true)
        .setDescription( ":sparkles: :comet: :sparkles:" )
        .setThumbnail(message.author.avatarURL)
        .setColor(0xFF7A1C)
        if (ItemDetails.itemimage){
            embed.setImage(ItemDetails.itemimage)
        }
        message.channel.send({embed});
    }
    else{
        var description = "**Item Stats:** " + ItemDetails.itemstatistics + "\n" + "**Item Slot:** " + ItemDetails.itemslot + "\n" + "**To Wear:** -puton " + ItemDetails.itemshortname;
        const embed = new Discord.RichEmbed()
        .setAuthor(message.author.username + " has created " + itemToCreateByName)
        .addField(ItemDetails.itemdescription, description, true)
        .setDescription( ":sparkles: :sparkles: :sparkles:" )
        .setThumbnail(message.author.avatarURL)
        .setColor(0xFF7A1C)
        message.channel.send({embed});
    }
}

module.exports.amuletsWearingCommand = function(message, args){
    var discordUserId = message.author.id;
    profileDB.getUserProfileData(discordUserId, function (profileErr, profileRes){
        if (profileErr){
            console.log(profileErr);
            agreeToTerms(message, discordUserId);
        }
        else{
            var userLevel = profileRes.data.level;
            // get the user's wearing data

            profileDB.getItemData(function(err, getItemResponse){
                if (err){
                    console.log(err);
                }
                else{
                    var allItems = getItemResponse.data
                    // all possible amulet items
                    var amuletItemsById = {};
                    
                    for (var item in allItems){
                        if (allItems[item].itemraritycategory == "amulet"){
                            amuletItemsById[allItems[item].id] = allItems[item];
                        }
                    }
                    // get user's Items
                    profileDB.getUserItems(discordUserId, function(err, inventoryResponse){
                        if (err){
                            console.log(err);
                        }
                        else{
                            // console.log(inventoryResponse.data);
                            // get all the data for each item
                            var itemsInInventoryCountMap = {};
                            var itemsMapbyId = {};
        
                            for (var item in inventoryResponse.data){
        
                                if (!itemsInInventoryCountMap[inventoryResponse.data[item].itemid] ){
                                    // item hasnt been added to be counted, add it as 1
                                    itemsInInventoryCountMap[inventoryResponse.data[item].itemid] = 1;
                                }else{
                                    // 
                                    itemsInInventoryCountMap[inventoryResponse.data[item].itemid] = itemsInInventoryCountMap[inventoryResponse.data[item].itemid] + 1
                                }
                            }
                            // have items mapped by id and items in inventory
                            // check if i have any of all the possible amulet items
                            var userAmuletData = []
                            for (var amulet in amuletItemsById){
                                var idToCheck = amuletItemsById[amulet].id;
                                if (itemsInInventoryCountMap[idToCheck]){
                                    var amuletToAdd = amuletItemsById[amulet]
                                    amuletToAdd.count = itemsInInventoryCountMap[idToCheck]
                                    userAmuletData.push(amuletItemsById[amulet]);
                                }
                            }
                            var userPet = profileRes.data.pet ? profileRes.data.pet : undefined;                            
                            var userData;
                            if (!userPet){
                                userData = {
                                    userLevel : userLevel,
                                }
                            }else{
                                userData = {
                                    userLevel : userLevel,
                                    fetchCD: PETS_AVAILABLE[userPet].cooldown,
                                    fetchCount: PETS_AVAILABLE[userPet].fetch
                                }
                            }                       
                            var userItemStats = wearStats.statsObjectBuilder(message, null, null, null, userData, true, true, true, userAmuletData);
                            var statsString = wearStats.statsStringBuilder(message, userItemStats);

                            var amuletsString = wearStats.amuletsStringBuilder(userAmuletData);
                            amuletsEmbedBuilder(message, amuletsString, statsString);

                        }
                    })
                }
            })
        }
    })
}

module.exports.wearingCommand = function(message, args){
    // create embed of items the user is wearing
    var discordUserId = message.author.id;
    profileDB.getUserProfileData(discordUserId, function (profileErr, profileRes){
        if (profileErr){
            console.log(profileErr);
            agreeToTerms(message, discordUserId);
        }
        else{
            var userLevel = profileRes.data.level;
            // get the user's wearing data
            profileDB.getUserWearInfo(discordUserId, function(getWearErr, getWearRes){
                if (getWearErr){
                    console.log(getWearErr);
                }
                else{
                    // console.log(getWearRes);
                    // get the item info by calling items table
                    if (getWearRes.data.length > 0){
                        var slot1Id = getWearRes.data[0].slot1itemid;
                        var slot2Id = getWearRes.data[0].slot2itemid;
                        var slot3Id = getWearRes.data[0].slot3itemid;
                        var slot1activeDate = getWearRes.data[0].activate1date;
                        var slot2activeDate = getWearRes.data[0].activate2date;
                        var slot3activeDate = getWearRes.data[0].activate3date;
                        var slot1active = false;
                        var slot2active = false;
                        var slot3active = false;
                        var now = new Date();
                        now.setMinutes(now.getMinutes() + 1);
                        if (now > slot1activeDate){
                            slot1active = true;
                        }
                        if (now > slot2activeDate){
                            slot2active = true
                        }
                        if (now > slot3activeDate){
                            slot3active = true
                        }

                        // console.log(slot1Id);
                        profileDB.getItemByIdsWear(slot1Id, slot2Id, slot3Id, function(error, itemResponse){
                            if (error){
                                console.log(error);
                            }
                            else{
                                //console.log(itemResponse);
                                var slot1Item;
                                var slot2Item;
                                var slot3Item;
                                for (var slotItem in itemResponse.data){
                                    if (itemResponse.data[slotItem].id == slot1Id){
                                        slot1Item = itemResponse.data[slotItem]
                                    }
                                    if (itemResponse.data[slotItem].id == slot2Id){
                                        slot2Item = itemResponse.data[slotItem]
                                    }
                                    if (itemResponse.data[slotItem].id == slot3Id){
                                        slot3Item = itemResponse.data[slotItem]
                                    }
                                }
                                // console.log(slot1Item);
                                // console.log(slot2Item);
                                // console.log(slot3Item);
                                var slot1String = wearStats.slotStringBuilder(message, slot1Item, slot1active)
                                var slot2String = wearStats.slotStringBuilder(message, slot2Item, slot2active)
                                var slot3String = wearStats.slotStringBuilder(message, slot3Item, slot3active)

                                var userPet = profileRes.data.pet ? profileRes.data.pet : undefined;
                                var userData;
                                var HAS_SPRINTING_SHOES = profileRes.data.sprintingshoes;
                                if (!userPet){
                                    userData = {
                                        userLevel : userLevel,
                                        hasSprintingShoes : HAS_SPRINTING_SHOES
                                    }
                                }
                                else{
                                    userData = {
                                        userLevel : userLevel,
                                        fetchCD: PETS_AVAILABLE[userPet].cooldown,
                                        fetchCount: PETS_AVAILABLE[userPet].fetch,
                                        hasSprintingShoes : HAS_SPRINTING_SHOES
                                    }
                                }
                                
                                var userItemStats = wearStats.statsObjectBuilder(message, slot1Item, slot2Item, slot3Item, userData, true, true, true, null);
                                var statsString = wearStats.statsStringBuilder(message, userItemStats);

                                var profileData = {};
                                profileData.slot1String = slot1String;
                                profileData.slot2String = slot2String;
                                profileData.slot3String = slot3String;
                                var activeSlots = {
                                    activeSlot1: slot1active, 
                                    activeSlot2: slot2active, 
                                    activeSlot3: slot3active
                                }
                                wearingEmbedBuilder(message, profileData, statsString, activeSlots);

                            }
                        })
                    }
                    else{
                        message.channel.send(message.author + " you are not wearing any items. if you are new, check the shop for cheap starter items!")
                    }
                }
            })
        }
    })
}

function wearingEmbedBuilder(message, profileData, statsString, activeSlots){
    const embed = new Discord.RichEmbed()
    .setAuthor(message.author.username + "'s Wearing Items")
    .setThumbnail(message.author.avatarURL)
    .setColor(0x00AE86)
    if (profileData.slot1String && profileData.slot1String.length > 0){
        var activeText1 = activeSlots.activeSlot1 ? "**ACTIVE**" : "";
        embed.addField('Slot 1 ' + activeText1, profileData.slot1String, false)
    }
    if (profileData.slot2String && profileData.slot2String.length > 0){
        var activeText2 = activeSlots.activeSlot2 ? "**ACTIVE**" : "";
        embed.addField('Slot 2 ' + activeText2, profileData.slot2String, false)
    }
    if (profileData.slot3String && profileData.slot3String.length > 0){
        var activeText3 = activeSlots.activeSlot3 ? "**ACTIVE**" : "";
        embed.addField('Slot 3 ' + activeText3, profileData.slot3String, false)
    }
    if (statsString && statsString.length > 0){
        embed.addField('Stats Summary', statsString, false)
    }
    if (statsString.length == 0){
        message.channel.send("You are not wearing any items! check the shop for starter items.")
    }
    message.channel.send({embed});
}

function amuletsEmbedBuilder(message, amuletsString, statsString){
    const embed = new Discord.RichEmbed()
    .setThumbnail(message.author.avatarURL)
    .setColor(0x00AE86)
    if (amuletsString && amuletsString.length > 0){
        embed.addField(message.author.username + "'s Amulets", amuletsString, false)
    }
    if (statsString && statsString.length > 0){
        embed.addField('Stats Summary', statsString, false)
    }
    message.channel.send({embed});
}

module.exports.putonCommand = function(message, args, retry){
    // wear an item must have a slot, you can only wear 3 slots, slots are unique
    // wearing on an empty slot activates immediately
    // if replacing an item, it requires 1 command use for it to take effect
    var discordUserId = message.author.id;
    if (args && args.length >= 3 && !retry){
        var slot = args[1]; // must be a number between 1 and 4
        var itemToWear = args[2]; // must be a valid itemname
        // get the user's wear information, then get their item information, 
        // check user doesnt have the same slot category in 1 and 3, if so then valid command, update slot 2 with all the info for sundress
        profileDB.getUserWearInfo(discordUserId, function(getWearErr, getWearRes){
            if (getWearErr){
                // console.log(getWearErr);
                // user isn't wearing any items
                profileDB.createUserWearInfo(discordUserId, false, function(error, res){
                    if (error){
                        // console.log(error);
                    }
                    else{
                        // console.log(res);
                    }
                })
            }
            else{
                // console.log("wear res " + JSON.stringify(getWearRes, null, 2));
                if (getWearRes.data.length == 0){
                    // create the user
                    var data = {
                        discordId : discordUserId,
                        slot1replacing: false,
                        slot2replacing: false,
                        slot3replacing: false,
                        slot4replacing: false
                    }
                    profileDB.createUserWearInfo(data, function(error, res){
                        if (error){
                            // console.log(error);
                        }
                        else{
                            // console.log(res);
                            // call the same function again now that the user exists
                            exports.putonCommand(message, args, false)
                        }
                    })
                }else{
                    // get the user's items
                    var currentSlot1Slot = getWearRes.data[0].slot1slot;
                    var currentSlot2Slot = getWearRes.data[0].slot2slot;
                    var currentSlot3Slot = getWearRes.data[0].slot3slot;
                    var currentSlot4Slot = getWearRes.data[0].slot4slot;

                    // is the user replacing the current slot?
                    var replacingCurrentSlot; 
                    if (slot == 1){
                        replacingCurrentSlot = getWearRes.data[0].slot1replacing;
                    }
                    else if (slot == 2){
                        replacingCurrentSlot = getWearRes.data[0].slot2replacing;
                    }
                    else if (slot == 3){
                        replacingCurrentSlot = getWearRes.data[0].slot3replacing;
                    }
                    else if (slot == 4){
                        replacingCurrentSlot = getWearRes.data[0].slot4replacing;
                    }

                    profileDB.getUserItems(discordUserId, function(err, inventoryResponse){
                        if (err){
                            // console.log(err);
                        }
                        else{
                            // 
                            // get all the data for each item
                            var itemsInInventoryCountMap = {};
                            var userItemsById = {};
                            var itemsMapbyId = {};
                            var itemsMapbyName = {};
                            profileDB.getItemData(function(error, allItemsResponse){
                                if (error){
                                    // console.log(error);
                                }
                                else{
                                    // console.log("allitemsres " + allItemsResponse.data);
                                    for (var item in inventoryResponse.data){
                                        var validItem = useItem.itemValidate(inventoryResponse.data[item]);
                                        // item not being auctioned
                                        var itemBeingAuctioned = false;
                                        if (itemsInAuction[inventoryResponse.data[item].id]){
                                            itemBeingAuctioned = true;
                                        }
                                        var itemBeingTraded = false;
                                        if (activeTradeItems[inventoryResponse.data[item].id]){
                                            itemBeingTraded = true;
                                        }
                                        if (!itemsInInventoryCountMap[inventoryResponse.data[item].itemid] 
                                            && validItem
                                            && !itemBeingAuctioned 
                                            && !itemBeingTraded){
                                            // item hasnt been added to be counted, add it as 1
                                            itemsInInventoryCountMap[inventoryResponse.data[item].itemid] = 1;
                                            userItemsById[inventoryResponse.data[item].itemid] = [];
                                            userItemsById[inventoryResponse.data[item].itemid].push(inventoryResponse.data[item]);
                                        }
                                        else if (validItem && !itemBeingAuctioned && !itemBeingTraded){
                                            itemsInInventoryCountMap[inventoryResponse.data[item].itemid] = itemsInInventoryCountMap[inventoryResponse.data[item].itemid] + 1;
                                            userItemsById[inventoryResponse.data[item].itemid].push(inventoryResponse.data[item]);
                                        }
                                    }
                                    // console.log(itemsInInventoryCountMap);
                                    // console.log(userItemsById);
                                    for (var index in allItemsResponse.data){
                                        itemsMapbyId[allItemsResponse.data[index].id] = allItemsResponse.data[index];
                                    }
                                    for (var index in allItemsResponse.data){
                                        itemsMapbyName[allItemsResponse.data[index].itemshortname] = allItemsResponse.data[index];
                                    }
                                    // have the items count map, have the items mapbyid
                                    
                                    // itemsMapbyId is the map of all the items, itemsInInventoryCountMap has the count of all these items
                                    
                                    // have the item available to wear
                                    if (itemsMapbyName[itemToWear]){
                                        // console.log(itemsMapbyName[itemToWear])
                                        // get all the data needed for equiping  for the item
                                        
                                        // name of the slot the item is taking up
                                        var itemslot = itemsMapbyName[itemToWear].itemslot;
                                        // id of the item in the item db
                                        var itemid = itemsMapbyName[itemToWear].id;
                                        var itemstats = {
                                            itemBaseCdr : itemsMapbyName[itemToWear].itembasecdr,
                                            itemBaseTacoChance : itemsMapbyName[itemToWear].itembasetacochance,
                                            itemBaseExtraTacos : itemsMapbyName[itemToWear].itembaseextratacos,
                                            itemCdrPerLevel : itemsMapbyName[itemToWear].itemcdrperlevel,
                                            itemTacoChancePerLevel : itemsMapbyName[itemToWear].itemtacochanceperlevel,
                                            itemExtraTacosPerLevel : itemsMapbyName[itemToWear].itemextratacosperlevel,
                                            itemCommand: itemsMapbyName[itemToWear].command
                                        }
                                        // id if the specific item the user will wear (pick the first item)
                                        var itemuserid;
                                        var itemObtainDate;
                                        for (var item in userItemsById[itemid]){
                                            if (userItemsById[itemid][item].status != "wearing"){
                                                itemuserid = userItemsById[itemid][item].id;
                                                itemObtainDate = userItemsById[itemid][item].itemobtaindate;
                                                break;
                                            }
                                        }
                                        // validate the user owns that item
                                        if (itemuserid){
                                            
                                            var validateSlotToWear;
                                            if (slot == 1 && !currentSlot1Slot){
                                                validateSlotToWear = validateSlot(itemslot, currentSlot2Slot, currentSlot3Slot)
                                            }
                                            else if (slot == 2 && !currentSlot2Slot){
                                                validateSlotToWear = validateSlot(itemslot, currentSlot1Slot, currentSlot3Slot)
                                            }
                                            else if (slot == 3 && !currentSlot3Slot){
                                                validateSlotToWear = validateSlot(itemslot, currentSlot1Slot, currentSlot2Slot)
                                            }
                                            else if (slot == 4 && !currentSlot4Slot && itemsMapbyName[itemToWear].itemraritycategory == "myth" ){
                                                validateSlotToWear = true
                                            }
                                            if (validateSlotToWear){
                                                // check that the item slot is not already equiped elsewhere
                                                // console.log("updating: slot: " + slot + " itemslot: " + itemslot + " itemid: " + itemid + " itemuserid: " + itemuserid + " itemstats: " + JSON.stringify(itemstats, null, 2));
                                                // equip the item
                                                // create a date for when the item is active
                                                var activateDate;
                                                if (!replacingCurrentSlot){
                                                    activateDate = new Date(); // now
                                                    replacingCurrentSlot = true;
                                                }
                                                else{
                                                    var hoursToAdd = commandHoursToActivate[itemstats.itemCommand] ? commandHoursToActivate[itemstats.itemCommand] : 0 // depending on the item's command
                                                    // console.log("hours to add " + hoursToAdd);
                                                    activateDate = new Date() // + hours for the command
                                                    // if obtain date is greater than 1 hour ago, activate date gets no + hours
                                                    var oneHourAgo = new Date();
                                                    oneHourAgo = new Date(oneHourAgo.setHours(oneHourAgo.getHours() - 1));
                                                    if (itemObtainDate < oneHourAgo){
                                                        // just got the item, activate immediately
                                                        activateDate = new Date(activateDate.setHours(activateDate.getHours() + hoursToAdd));
                                                    }
                                                    replacingCurrentSlot = true;
                                                }
                                                // console.log("activate date " + activateDate)
                                                // each command has a different date activate
                                                profileDB.updateUserWearInfo(discordUserId, slot + "", itemslot, itemid, itemuserid, activateDate, replacingCurrentSlot, function(err, res){
                                                    // set the item to equipped in userinventory
                                                    if (err){
                                                        // console.log(err);
                                                    }
                                                    else{
                                                        // console.log(res);
                                                        // change the item status to wearing in user inventory
                                                        profileDB.updateItemStatus(itemuserid, "wearing", function(updateRockStatusErr, updateRockStatusRes){
                                                            if (updateRockStatusErr){
                                                                // console.log(updateRockStatusErr);
                                                            }
                                                            else{
                                                                // console.log(updateRockStatusRes);
                                                                message.channel.send(message.author + " you are now wearing **" + itemsMapbyName[itemToWear].itemname + "**")
                                                            }
                                                        })
                                                    }
                                                })
                                            }
                                            else{
                                                message.channel.send(message.author + " you are already wearing an item of that slot!")
                                            }
                                        }
                                        else{
                                            message.channel.send(message.author + " invalid item!")
                                        }
                                    }
                                }
                            })
                        }
                    })
                }
            }
        })
    }else{
        message.channel.send(message.author + " do -puton [1-4] [itemname] \n example: -puton 2 loincloth OR -puton 2 loinclothimproved \n Slot 4 is only for artifact+ items or higher");
    }
}

function validateSlot(slotToEquip, currentSlot1, currentSlot2){
    var slotIsValid = false;
    if (!currentSlot1 && !currentSlot2)
    {
        return true;
    }
    else if (slotToEquip != currentSlot1 && slotToEquip != currentSlot2){
        slotIsValid = true;
    }
    return slotIsValid
}

module.exports.takeoffCommand = function(message, args){
    // take off the existing item on the selected slot in userwear
    var discordUserId = message.author.id;
    var slot = args[1];

    // get the user's wear information ( to get the itemuserid from that slot)
    profileDB.getUserWearInfo(discordUserId, function(takeoffError, takeoffRes){
        if (takeoffError){
            console.log(takeoffError);
        }
        else{
            // console.log(takeoffRes);
            // item id of item to be set status to null in userinventory
            var itemId;
            var itemslot;
            if (slot == 1 && takeoffRes.data.length > 0){
                itemId = takeoffRes.data[0].slot1useritemid
                itemslot = takeoffRes.data[0].slot1slot
            }
            else if (slot == 2 && takeoffRes.data.length > 0){
                itemId = takeoffRes.data[0].slot2useritemid
                itemslot = takeoffRes.data[0].slot2slot
            }
            else if (slot == 3 && takeoffRes.data.length > 0){
                itemId = takeoffRes.data[0].slot3useritemid
                itemslot = takeoffRes.data[0].slot3slot
            }
            else if (slot == 4 && takeoffRes.data.length > 0){
                itemId = takeoffRes.data[0].slot4useritemid
                itemslot = takeoffRes.data[0].slot4slot
            }
            // console.log("itemid " + itemId);
            if (itemId){
                // change the item status from wearing to null in userinventory using the item id
                profileDB.updateItemStatus(itemId, null, function(updateErr, updateRes){
                    if (updateErr){
                        // console.log(updateErr);
                    }
                    else{
                        //user wearing slot to null
                        profileDB.takeOffWear(discordUserId, slot, function(err, res){
                            if (err){
                                // console.log(err);
                            }
                            else{
                                // console.log(res);
                                message.channel.send(message.author.username + " took off item from slot " + slot);
                            }
                        })
                    }
                })
            }
            else if (!itemId && itemslot){
                // have an item lingering, just take off everything

                //user wearing slot to null
                profileDB.takeOffWear(discordUserId, slot, function(err, res){
                    if (err){
                        // console.log(err);
                    }
                    else{
                        // console.log(res);
                        message.channel.send(message.author.username + " took off item from slot " + slot);
                    }
                })
            }
        }
    })
}

module.exports.initializeMarketPlace = function(c){
    client = c
    profileDB.getMarketItems(function(error, marketRes){
        if (error){
            console.log(error)
        }else{
            console.log(marketRes)
            var itemsMapbyShortName = {};
            var itemsMapById = {};
            profileDB.getItemData(function(error, allItemsResponse){
                for (var index in allItemsResponse.data){
                    itemsMapbyShortName[allItemsResponse.data[index].itemshortname] = allItemsResponse.data[index];
                }
                for (var index in allItemsResponse.data){
                    itemsMapById[allItemsResponse.data[index].id] = allItemsResponse.data[index];
                }
                var items = marketRes.data
                for (var i in items){
                    var individualItem = items[i]
                    var itemDetails = itemsMapById[individualItem.itemid]

                    var emoji = getEmojiBasedOnRarityCategory(itemDetails);

                    marketItems[individualItem.id] = {
                        emoji: emoji,
                        name: itemDetails.itemname,
                        auctionenddate: individualItem.auctionenddate,
                        currentbid: individualItem.currentbid,
                        buyout: individualItem.buyout,
                        seller: individualItem.discordid,
                        currentbiduserid: individualItem.currentbiduserid,
                        creatorchannel: individualItem.auctioncreatorchannel,
                        lastHighestbidderchannel: individualItem.lastbidchannel,
                        item: individualItem,
                        itemraritycategory: itemDetails.itemraritycategory,
                        itemshortname: itemDetails.itemshortname,
                        itemId: individualItem.id
                    }
                    if (marketItems[individualItem.id].currentbid == null){
                        marketItems[individualItem.id].currentbid = marketItems[individualItem.id].buyout
                    }
                    // take away the highest bidder's tacos immediately
                    
                    if (individualItem.currentbiduserid){
                        if (!tacosInUseAuction[individualItem.currentbiduserid]){
                            tacosInUseAuction[individualItem.currentbiduserid] = 0;
                        }
                        tacosInUseAuction[individualItem.currentbiduserid] = tacosInUseAuction[individualItem.currentbiduserid] + individualItem.currentbid
                    }

                    if ( marketItemsUserCount[individualItem.discordid] == undefined){
                        marketItemsUserCount[individualItem.discordid] = 1
                    }else{
                        marketItemsUserCount[individualItem.discordid] = marketItemsUserCount[individualItem.discordid] + 1
                    }
                    
                    handleAuctionItem(individualItem)

                    // set a timeout on this auction for milisecondsUntilEnd
                }
                // TODO: if an item auctionenddate is past now, and it still is in status waiting
                // award it to the last bid
                console.log("Market Initialized")
            })
        }
    })
}

function getEmojiBasedOnRarityCategory(itemDetails){
    var emoji = ""
    if (itemDetails.itemraritycategory === "myth" ){
        emoji = ":cyclone: "
    }
    else if (itemDetails.itemraritycategory === "artifact" 
        || itemDetails.itemraritycategory === "artifact+"){
        emoji = ":diamond_shape_with_a_dot_inside: "
    }
    else if (itemDetails.itemraritycategory === "ancient"){
        emoji = ":small_orange_diamond: "
    }
    else if (itemDetails.itemraritycategory === "rare"){
        emoji = ":small_blue_diamond: "
    }
    else if (itemDetails.itemraritycategory === "rare+"){
        emoji = ":large_blue_diamond: "
    }
    else if (itemDetails.itemraritycategory === "ancient+"){
        emoji = ":large_orange_diamond: "
    }
    else if (itemDetails.itemraritycategory === "ancient++" || itemDetails.itemraritycategory === "ancient+++"){
        emoji = ":star: "
    }
    else if (itemDetails.itemraritycategory === "rare++" || itemDetails.itemraritycategory === "rare+++"){
        emoji = ":diamonds: "
    }else{
        emoji = ":black_small_square:"
    }
    return emoji
}

function handleAuctionItem(individualItem){
    // TODO: create a timeout for each of these items that ends on auctionenddate
    var auctionEnd = new Date(individualItem.auctionenddate)
    var now = new Date();
    var milisecondsUntilEnd = auctionEnd.getTime() - now.getTime()

    if (milisecondsUntilEnd > 1){
        // auction has not ended, just reinitialize
        var itemAuctionTimeout = setTimeout(function(){
            // do things here
            console.log(marketItems[individualItem.id].name + " " + individualItem.id + " has ended" )
            // someone has bid on the item - announce, and change item to belong to them
            handleMarketItemAuctionEnded(individualItem)
    
        }, milisecondsUntilEnd) // replace this with milisecondsuntilend
    
        marketItems[individualItem.id].auctionTimeout = itemAuctionTimeout
    }else{
        // auction has ended - either return the item to its owner and set its status to null
        // or transfer the items and tacos right there and then
        handleMarketItemAuctionEnded(individualItem)
    }
}

function handleMarketItemAuctionEnded(individualItem){
    if (marketItems[individualItem.id].currentbiduserid){
        // switch the item's owner + give them the tacos they earned, take away the tacos from the user
        if (marketItems[individualItem.id].creatorchannel){
            // send a message to the channel the user created the auction initially to announce their auction ended
            var winner = client.users.get(marketItems[individualItem.id].currentbiduserid)
            var seller = client.users.get(marketItems[individualItem.id].seller)
            var itemsArray = [ individualItem.id ];
            var tacosPaid = marketItems[individualItem.id].currentbid;
            tacosInUseAuction[winner.id] = tacosInUseAuction[winner.id] - tacosPaid;
            var tacosWon = marketItems[individualItem.id].currentbid;
            var initialTacoTax = 0;
            if (tacosWon > 50){
                initialTacoTax = Math.floor(tacosWon * 0.1);
            }
            else if (tacosWon >= 5 && tacosWon <= 50){
                initialTacoTax = Math.floor(tacosWon * 0.1);
            }
            tacosWon = tacosWon - initialTacoTax
            transferItemsAndTacos(winner.id, seller.id, itemsArray, tacosPaid, tacosWon, function(transferErr, transferRes){
                if (transferErr){
                    console.log(transferErr)
                }
                else{
                    
                    try{
                        if (marketItems[individualItem.id].lastHighestbidderchannel){
                            // send a message to the winners channel that they won the auction    
                            client.channels.get(marketItems[individualItem.id].lastHighestbidderchannel).send(winner + " :loudspeaker: - You WON " + marketItems[individualItem.id].name + " for :taco: " + marketItems[individualItem.id].currentbid + " in the marketplace")
                        }
                        // send message to the creator channel that they sold an item 
                        client.channels.get(marketItems[individualItem.id].creatorchannel).send(seller + " :loudspeaker: - Your " + marketItems[individualItem.id].name + " sold for :taco: " + tacosWon + " in the marketplace")
                        removeItemFromMarket(individualItem)
                    }catch(ex){
                        console.log(ex)
                    }
                }
            })
            
        }
    }else{
        if (marketItems[individualItem.id].creatorchannel){
            var seller = client.users.get(marketItems[individualItem.id].seller)
            //// take the item out of the market in DB
            var itemId = individualItem.id;
            itemDidNotSell(itemId, function(noSellErr, noSellRes){
                if (noSellErr){
                    console.log(noSellErr)
                }else{
                    try{
                        client.channels.get(marketItems[individualItem.id].creatorchannel).send(seller + " :x: - Your " + marketItems[individualItem.id].name + " did not sell in the marketplace")
                        removeItemFromMarket(individualItem)
                    }catch(error){
                        // unable to send to channel
                        console.log(error)
                    }
                }
            })
        }else{
            // there is no creator channel but item is still in market hmmmm....
            // remove it from the market ..
            var itemId = individualItem.id;
            itemDidNotSell(itemId, function(noSellErr, noSellRes){
                console.log("done resetting item in limbo")
            })
            removeItemFromMarket(individualItem)
        }
    }
}

function removeItemFromMarket(individualItem){
    if ( marketItemsUserCount[individualItem.discordid] == undefined){
        marketItemsUserCount[individualItem.discordid] = 0
    }else if (marketItemsUserCount[individualItem.discordid] < 0){
        marketItemsUserCount[individualItem.discordid] = 0
    }else{
        marketItemsUserCount[individualItem.discordid] = marketItemsUserCount[individualItem.discordid] - 1
    }
    if (marketItems[individualItem.id]){
        if (marketItems[individualItem.id].auctionTimeout){
            clearTimeout(marketItems[individualItem.id].auctionTimeout)
        }
        delete marketItems[individualItem.id]
    }
}

function itemDidNotSell(itemId, cb){
    // item did not sell reset status to null, and all market values to null as well
    profileDB.unsoldMarketItem(itemId, function(unsoldErr, unsoldRes){
        if (unsoldErr){
            console.log(unsoldErr);
            cb('fail');
        }else{
            cb(null, unsoldRes);
        }
    })
}

function marketBuilderParamsBuilder(args){
    // check for rarity, item name, page
    var marketParams = {}
    if (args.length >= 2){
        // check the first parameter
        if (args[1].toLowerCase() == "rares"){
            marketParams.rarityCategory = "rare"
        }else if (args[1].toLowerCase() == "ancients"){
            marketParams.rarityCategory = "ancient"
        }else if (args[1].toLowerCase() == "artifacts"){
            marketParams.rarityCategory = "artifact"
        }else if (args[1].toLowerCase() == "uncommons"){
            marketParams.rarityCategory = "uncommon"
        }else if (args[1].toLowerCase() == "commons"){
            marketParams.rarityCategory = "common"
        }else if(args[1].toLowerCase() != "page"){
            marketParams.itemshortname = args[1].toLowerCase()
        }

        if ( args.length == 3 && args[1].toLowerCase() == "page" ){
            // no name or rarity argument
            marketParams.marketPage = Math.floor( args[2] )
            
        }else if ( args.length == 4 && args[2].toLowerCase() == "page" ){
            // first argument is either name or rarity
            marketParams.marketPage = Math.floor( args[3] )
        }
    }

    if (marketParams.marketPage && marketParams.marketPage <= 0){
        marketParams.marketPage = 1
    }

    return marketParams
}

module.exports.marketCommand = function(message, args){
    var discordUserId = message.author.id;
    // var includeDescriptions = false
    // if (args && args.length > 1){
    //     var long = args[1];
    //     if (long == "long"){
    //         includeDescriptions = true;
    //     }
    // }
    var marketParams = marketBuilderParamsBuilder(args)
    profileDB.getUserProfileData( discordUserId, function(err, userResponse) {
        if(err){
            console.log(err)
            agreeToTerms(message, discordUserId);
        }else{
            // create an embed that displays any items that are currently in the market
            var marketData = {
                userTacos: userResponse.data.tacos,
                marketParams: marketParams
            }
            var long = false
            marketBuilder(message, marketData, long)
        }
    })
}

function filterMarketItemsByRarity(rarityCategory){
    var itemsByRarityMap = {}
    for (var item in marketItems){
        if (rarityCategory == "rare"){
            // check for rares only
            if (marketItems[item].itemraritycategory == "rare"
                || marketItems[item].itemraritycategory == "rare+"
                || marketItems[item].itemraritycategory == "rare++"
                || marketItems[item].itemraritycategory == "rare+++"){
                    itemsByRarityMap[item] = marketItems[item]
            }
        }else if (rarityCategory == "ancient"){
            if (marketItems[item].itemraritycategory == "ancient"
            || marketItems[item].itemraritycategory == "ancient+"
            || marketItems[item].itemraritycategory == "ancient++"
            || marketItems[item].itemraritycategory == "ancient+++"){
                itemsByRarityMap[item] = marketItems[item]
            }
        }else if (rarityCategory == "artifact"){
            if (marketItems[item].itemraritycategory == "artifact"){
                itemsByRarityMap[item] = marketItems[item]
            }
        }else if (rarityCategory == "common"){
            if (marketItems[item].itemraritycategory == "common"){
                itemsByRarityMap[item] = marketItems[item]
            }
        }else if (rarityCategory == "uncommon"){
            if (marketItems[item].itemraritycategory == "uncommon"){
                itemsByRarityMap[item] = marketItems[item]
            }
        }
    }
    return itemsByRarityMap
}

function filterMarketItemsByShortName(itemshortname){
    var itemsByNameMap = {}
    for (var item in marketItems){
        if (marketItems[item].itemshortname == itemshortname){
            itemsByNameMap[item] = marketItems[item]
        }
    }
    return itemsByNameMap
}

function marketBuilder(message, marketData, long){
    var marketItemsCount = Object.keys(marketItems).length
    var marketItemsByPage = []
    var marketString = "**Item** | **Current Bid** :taco: | **Buyout** :taco: | **Time Left** \n"
    var filteredMarketItems = {}
    if (marketData.marketParams.itemshortname){
        filteredMarketItems = filterMarketItemsByShortName(marketData.marketParams.itemshortname)
    }
    else if (marketData.marketParams.rarityCategory){
        filteredMarketItems = filterMarketItemsByRarity(marketData.marketParams.rarityCategory)
    }else{
        filteredMarketItems = marketItems
    }
    for (var item in filteredMarketItems){
        
        var auctionEnd = new Date(filteredMarketItems[item].auctionenddate)
        var now = new Date();
        var milisecondsAuction = auctionEnd.getTime()
        var milisecondsNow = now.getTime()
        var milisecondsUntilEnd = milisecondsAuction - milisecondsNow
        
        var dateString = ""
        if (milisecondsUntilEnd >= 43200000){
            dateString = "Long"
        }else if (milisecondsUntilEnd >= 1800000 && milisecondsUntilEnd < 43200000){
            dateString = "Medium"
        }else if (milisecondsUntilEnd < 1800000){
            dateString = "Short"
        }
        var buyoutString = ""
        if (filteredMarketItems[item].buyout == 100000000000){
            buyoutString = "N/A"
        }else{
            buyoutString = filteredMarketItems[item].buyout
        }
        var itemNameString = filteredMarketItems[item].name
        if (filteredMarketItems[item].seller == message.author.id){
            itemNameString = "**" + filteredMarketItems[item].name + "**"
        }
        if (filteredMarketItems[item].currentbiduserid == message.author.id){
            itemNameString = "__" + itemNameString + "__"
        }
        if (marketString.length < 875){
            marketString = marketString + filteredMarketItems[item].emoji + " " + item + " - " + itemNameString + " | " + filteredMarketItems[item].currentbid + " | " + buyoutString + " | " + dateString + "\n"
        }else{
            marketItemsByPage.push(marketString)
            marketString = "**Item** | **Current Bid** :taco: | **Buyout** :taco: | **Time Left** \n"
            marketString = marketString + filteredMarketItems[item].emoji + " " + item + " - " + itemNameString + " | " + filteredMarketItems[item].currentbid + " | " + buyoutString + " | " + dateString + "\n"
        }
    }
    if (marketString.length > 0 ){
        marketItemsByPage.push(marketString)
    }
    // dictate the page we will show the user
    var page = 0
    if (marketData.marketParams.marketPage){
        if (marketItemsByPage.length >= marketData.marketParams.marketPage){
            page = marketData.marketParams.marketPage - 1
        }
    }

    if (!long){
        // show short shop
        const embed = new Discord.RichEmbed()
        .setColor(0x000000)
        .setDescription("-markethelp for more info!\nThere are `" + marketItemsCount + "` items in the market currently \nYou are viewing page: " + (page + 1))
        .addField("Market Items :shinto_shrine:", marketItemsByPage[page] , false)
        .addField('Your current tacos', marketData.userTacos + " :taco:", false)
        .setTimestamp()
        message.channel.send({embed});
    }else{
        const embed = new Discord.RichEmbed()
        .setColor(0x000000)
        .addField("Market Items :shinto_shrine:", marketString , false)
        .addField('Your current tacos', marketData.userTacos + " :taco:", false)
        .setTimestamp()
        message.channel.send({embed});
    }
}

module.exports.marketHelpCommand = function(message){

    const embed = {
        "description": "Want to sell an item in the market? See an item in the market that you'd like to buy? use these commands!",
        "color": 11795163,
        "fields": [
          {
            "name": "Market",
            "value": "`-mkauction [itemname] bid [bid] buyout [buyout] time [short/medium/long]                       >` Create an auction in the market!\n**example**: -mkauction sundress bid 500 buyout 2000 time medium\n**NOTE**:   bid, buyout, and time parameters are optional\n`-mkbid [id] tacos [bid]   >` Bid on an item in the market!\n**example**: -mkbid 74832 tacos 500\n`-market rares,\n -market ancients,\n -market artifacts,\n -market commons,\n -market uncommons >` Display market items based on rarity!\n`-market [item short name]   >` Display market items based on their name id!\n**example**: -market sundress\n`-market page [page number]                       >` Display a different page of the Market!"
          }
        ]
      };
      message.channel.send({ embed });
}

function extractItemName(args){
    return args[1].toLowerCase();
}

function extractStartBid(args){
    var startBid = 100
    if (args.length == 4 &&  args[2].toLowerCase() == "bid"){
        startBid = Math.floor( args[3] )
    }else if (args.length == 6 && args[4].toLowerCase() == "bid"){
        startBid = Math.floor( args[5] )
    }else if (args.length == 6 && args[2].toLowerCase() == "bid"){
        startBid = Math.floor( args[3] )
    }else if (args.length == 8 && args[6].toLowerCase() == "bid"){
        startBid = Math.floor( args[7] )
    }else if (args.length == 8 && args[4].toLowerCase() == "bid"){
        startBid = Math.floor( args[5] )
    }else if (args.length == 8 && args[2].toLowerCase() == "bid"){
        startBid = Math.floor( args[3] )
    }
    if ( isNaN( startBid) ){
        return 100
    }else{
        if (startBid >= 100000000000){
            startBid = 10000000
        }
        return startBid

    }
}

function extractBuyout(args){
    var buyout = 100000000000
    if (args.length == 4 && args[2].toLowerCase() == "buyout"){
        buyout = Math.floor( args[3] )
    }else if (args.length == 6 && args[4].toLowerCase() == "buyout"){
        buyout = Math.floor( args[5] )
    }else if (args.length == 6 && args[2].toLowerCase() == "buyout"){
        buyout = Math.floor( args[3] )
    }else if (args.length == 8 && args[6].toLowerCase() == "buyout"){
        buyout = Math.floor( args[7] )
    }else if (args.length == 8 && args[4].toLowerCase() == "buyout"){
        buyout = Math.floor( args[5] )
    }else if (args.length == 8 && args[2].toLowerCase() == "buyout"){
        buyout = Math.floor( args[3] )
    }
    if ( isNaN( buyout) ){
        return 100000000000
    }else{
        return buyout

    }
}

function extractTimeToEnd(args){
    var timeToEnd = "medium"
    if (args.length == 4 && args[2].toLowerCase() == "time"){
        if (args[3].toLowerCase() == "short" || args[3].toLowerCase() == "long"){
            timeToEnd = args[3].toLowerCase()
        }
    }else if (args.length == 6 && args[4].toLowerCase() == "time"){
        if (args[5].toLowerCase() == "short" || args[5].toLowerCase() == "long"){
            timeToEnd = args[5].toLowerCase()
        }
    }else if (args.length == 6 && args[2].toLowerCase() == "time"){
        if (args[3].toLowerCase() == "short" || args[3].toLowerCase() == "long"){
            timeToEnd = args[3].toLowerCase()
        }
    }else if (args.length == 8 && args[6].toLowerCase() == "time"){
        if (args[7].toLowerCase() == "short" || args[7].toLowerCase() == "long"){
            timeToEnd = args[7].toLowerCase()
        }
    }else if (args.length == 8 && args[4].toLowerCase() == "time"){
        if (args[5].toLowerCase() == "short" || args[5].toLowerCase() == "long"){
            timeToEnd = args[5].toLowerCase()
        }
    }else if (args.length == 8 && args[2].toLowerCase() == "time"){
        if (args[3].toLowerCase() == "short" || args[3].toLowerCase() == "long"){
            timeToEnd = args[3].toLowerCase()
        }
    }
    return timeToEnd
}

function marketAuctionPostCommand(args){
    var auctionPostObj = {
        valid: false
    }
    if (args.length == 2 || args.length == 4 || args.length == 6 || args.length == 8){
        auctionPostObj.myItemShortName = extractItemName(args)
        auctionPostObj.startBid = extractStartBid(args)
        auctionPostObj.buyout = extractBuyout(args)
        auctionPostObj.timeToEnd = extractTimeToEnd(args)
        auctionPostObj.valid = true
    }
    // bid is always less than or equal to buyout price
    if (auctionPostObj.startBid && auctionPostObj.startBid > auctionPostObj.buyout){
        auctionPostObj.startBid = auctionPostObj.buyout
    }
    return auctionPostObj
}

module.exports.marketAuctionCommand = function(message, args){
    var discordUserId = message.author.id;
    // only allow the user to put up 10 auctions
    var auctionPost = marketAuctionPostCommand(args)
    if (auctionPost.valid && (marketItemsUserCount[discordUserId] == undefined || marketItemsUserCount[discordUserId] <= 10)){
        if ( args && args.length > 1){
            var myItemShortName = auctionPost.myItemShortName;
            var itemCount = 1;
            var startBid = auctionPost.startBid
            var buyout = auctionPost.buyout
            var timeToEnd = auctionPost.timeToEnd

            profileDB.getUserItems(discordUserId, function(err, inventoryResponse){
                if (err){
                    console.log(err);
                }
                else{
                    // get all the data for each item
                    var itemsInInventoryCountMap = {};
                    var itemsMapbyShortName = {};
                    var itemsMapById = {};
                    var ItemsBeingedAuctioned = []
                    var individualItem = []
                    profileDB.getItemData(function(error, allItemsResponse){
                        for (var index in allItemsResponse.data){
                            itemsMapbyShortName[allItemsResponse.data[index].itemshortname] = allItemsResponse.data[index];
                        }
                        for (var index in allItemsResponse.data){
                            itemsMapById[allItemsResponse.data[index].id] = allItemsResponse.data[index];
                        }
                        //// console.log(allItemsResponse.data);
                        for (var item in inventoryResponse.data){
                            var validItem = useItem.itemValidate(inventoryResponse.data[item]);
                            var notWearing = useItem.itemNotWearing(inventoryResponse.data[item])
                            var auctionedItem = false;
                            var ItemInQuestion = inventoryResponse.data[item]
    
                            if (itemsInAuction[inventoryResponse.data[item].id]){
                                auctionedItem = true;
                            }
                            var itemBeingTraded = false;
                            if (activeTradeItems[inventoryResponse.data[item].id]){
                                itemBeingTraded = true;
                            }
                            if (!itemsInInventoryCountMap[inventoryResponse.data[item].itemid] 
                                && validItem && notWearing && !auctionedItem && !itemBeingTraded){
                                // item hasnt been added to be counted, add it as 1
                                itemsInInventoryCountMap[inventoryResponse.data[item].itemid] = 1;
                                
                                // console.log(ItemInQuestion);
                                if (itemsMapbyShortName[myItemShortName] 
                                    && ItemsBeingedAuctioned.length < itemCount
                                    && itemsMapById[ItemInQuestion.itemid].itemshortname === myItemShortName){
                                    // console.log("IN HERE");
                                    ItemsBeingedAuctioned.push(ItemInQuestion.id);
                                    individualItem.push(ItemInQuestion)
                                }
                            }
                            else if (validItem && notWearing && !auctionedItem && !itemBeingTraded){
                                itemsInInventoryCountMap[inventoryResponse.data[item].itemid] = itemsInInventoryCountMap[inventoryResponse.data[item].itemid] + 1;
                                if (itemsMapbyShortName[myItemShortName] 
                                    && ItemsBeingedAuctioned.length < itemCount
                                    && itemsMapById[ItemInQuestion.itemid].itemshortname === myItemShortName){
                                    // console.log("IN HERE");
                                    ItemsBeingedAuctioned.push(ItemInQuestion.id);
                                    individualItem.push(ItemInQuestion)
                                }
                            }
                        }
                        if (itemsMapbyShortName[myItemShortName] 
                            && itemsMapbyShortName[myItemShortName].itemraritycategory != "myth"
                            && itemsMapbyShortName[myItemShortName].itemraritycategory != "artifact+"){
                            var idOfMyItem = itemsMapbyShortName[myItemShortName].id;
                            var itemNameInMarket = itemsMapbyShortName[myItemShortName].itemname
                            // console.log(idOfMyItem);
                            if (itemsInInventoryCountMap[idOfMyItem] && 
                                itemsInInventoryCountMap[idOfMyItem] >= itemCount){
                                // if so, then I can put the item in the market
                                var emoji = getEmojiBasedOnRarityCategory(itemsMapbyShortName[myItemShortName]);
                                var rarityCategory = itemsMapbyShortName[myItemShortName].itemraritycategory
                                var itemshortname = itemsMapbyShortName[myItemShortName].itemshortname
                                individualItem = individualItem[0]
                                ////////////////
                                // this is where marketItems[individualItem.id] gets set
                                // post to marketItems and post the item information to the database
                                // initialize the timeout for the specified date
                                // long = 2 days, medium = 24 hours, short = 12 hours from NOW
                                var auctionenddate = new Date();
                                var hoursToAdd = 48
                                if (timeToEnd == "short"){
                                    hoursToAdd = 12
                                }else if (timeToEnd == "medium"){
                                    hoursToAdd = 24
                                }
                                auctionenddate = new Date( auctionenddate.setHours(auctionenddate.getHours() + hoursToAdd) )

                                marketItems[individualItem.id] = {
                                    emoji: emoji,
                                    name: itemNameInMarket,
                                    auctionenddate: auctionenddate,
                                    currentbid: startBid,
                                    buyout: buyout,
                                    seller: discordUserId,
                                    currentbiduserid: null,
                                    creatorchannel: message.channel.id,
                                    lastHighestbidderchannel: null,
                                    item: individualItem,
                                    itemraritycategory: rarityCategory,
                                    itemshortname: itemshortname,
                                    itemId: individualItem.id
                                }
                                individualItem.auctionenddate = auctionenddate
                                individualItem.currentbid = startBid
                                individualItem.buyout = buyout
                                individualItem.creatorchannel = message.channel.id
                                individualItem.seller = discordUserId
                                // POST item to database
                                profileDB.postItemToMarket(individualItem, function(postErr, postRes){
                                    if (postErr){
                                        console.log(postErr)
                                    }else{
                                        if ( marketItemsUserCount[discordUserId] == undefined){
                                            marketItemsUserCount[discordUserId] = 1
                                        }else{
                                            marketItemsUserCount[discordUserId] = marketItemsUserCount[discordUserId] + 1
                                        }
                                        // TODO: create cancel auction command
                                        message.channel.send(message.author + ", your auction for **" + marketItems[individualItem.id].name +  "** was successfully created!")
                                        handleAuctionItem(individualItem)
                                    }
                                })
                            }
                            else{
                                message.channel.send(message.author + " example: `-mkauction [item] bid [minimum bid] buyout [maximum bid] time [short/medium/long]`")  
                            }
                        }
                        else{
                            message.channel.send(message.author + " invalid item! example: `-mkauction [item] bid [minimum bid] buyout [maximum bid] time [short/medium/long]`")  
                        }
                    })
                }
            })
        }

    }else{
        if (!auctionPost.valid){
            message.channel.send("Your auction is not valid try: -mkauction [itemname] to start off with a simple auction!")

        }else{
            message.channel.send("You have reached the maximum allowed auctions in the market!")
        }
    }

}

module.exports.auctionCommand = function(message, args){
    var discordUserId = message.author.id;
    var discordUserIdString = "auction-" + message.author.id;
    // arguments are 1 = item short name, item number
    if (!activeAuctions[discordUserIdString]){
        // dont have an active auction yet

        if ( args && args.length > 1){
            var myItemShortName = args[1].toLowerCase();
            var itemCount = 1;
            if (args.length > 2){
                itemCount = args[2];
            }
            
            profileDB.getUserItems(discordUserId, function(err, inventoryResponse){
                if (err){
                    // console.log(err);
                }
                else{
                    // get all the data for each item
                    var itemsInInventoryCountMap = {};
                    var itemsMapbyShortName = {};
                    var itemsMapById = {};
                    var IdsOfItemsBeingedAuctioned = []
                    profileDB.getItemData(function(error, allItemsResponse){
                        for (var index in allItemsResponse.data){
                            itemsMapbyShortName[allItemsResponse.data[index].itemshortname] = allItemsResponse.data[index];
                        }
                        for (var index in allItemsResponse.data){
                            itemsMapById[allItemsResponse.data[index].id] = allItemsResponse.data[index];
                        }
                        //// console.log(allItemsResponse.data);
                        for (var item in inventoryResponse.data){
                            var validItem = useItem.itemValidate(inventoryResponse.data[item]);
                            var notWearing = useItem.itemNotWearing(inventoryResponse.data[item])
                            var auctionedItem = false;
                            var ItemInQuestion = inventoryResponse.data[item]
    
                            if (itemsInAuction[inventoryResponse.data[item].id]){
                                auctionedItem = true;
                            }
                            var itemBeingTraded = false;
                            if (activeTradeItems[inventoryResponse.data[item].id]){
                                itemBeingTraded = true;
                            }
                            if (!itemsInInventoryCountMap[inventoryResponse.data[item].itemid] 
                                && validItem && notWearing && !auctionedItem && !itemBeingTraded){
                                // item hasnt been added to be counted, add it as 1
                                itemsInInventoryCountMap[inventoryResponse.data[item].itemid] = 1;
                                
                                // console.log(ItemInQuestion);
                                if (itemsMapbyShortName[myItemShortName] 
                                    && IdsOfItemsBeingedAuctioned.length < itemCount
                                    && itemsMapById[ItemInQuestion.itemid].itemshortname === myItemShortName){
                                    // console.log("IN HERE");
                                    IdsOfItemsBeingedAuctioned.push(ItemInQuestion.id);
                                }
                            }
                            else if (validItem && notWearing && !auctionedItem && !itemBeingTraded){
                                itemsInInventoryCountMap[inventoryResponse.data[item].itemid] = itemsInInventoryCountMap[inventoryResponse.data[item].itemid] + 1;
                                if (itemsMapbyShortName[myItemShortName] 
                                    && IdsOfItemsBeingedAuctioned.length < itemCount
                                    && itemsMapById[ItemInQuestion.itemid].itemshortname === myItemShortName){
                                    // console.log("IN HERE");
                                    IdsOfItemsBeingedAuctioned.push(ItemInQuestion.id);
                                }
                            }
                        }
                        //// console.log(itemsInInventoryCountMap);
                        //// console.log(itemsMapbyShortName);
                        if (itemsMapbyShortName[myItemShortName] 
                            && itemsMapbyShortName[myItemShortName].itemraritycategory != "myth"
                            && itemsMapbyShortName[myItemShortName].itemraritycategory != "artifact+"){
                            var idOfMyItem = itemsMapbyShortName[myItemShortName].id;
                            var itemNameInAuction = itemsMapbyShortName[myItemShortName].itemname
                            // console.log(idOfMyItem);
                            if (itemsInInventoryCountMap[idOfMyItem] && 
                                itemsInInventoryCountMap[idOfMyItem] >= itemCount){
                                // if so, then I can create an auction just fine
                                // create an auction
                                var userAuction = {
                                    itemShortname: myItemShortName,
                                    itemName: itemNameInAuction,
                                    itemId: idOfMyItem,
                                    idsToTransfer: [],
                                    userAuctionName: message.author.username,
                                    highestBidderUserObj: null,
                                    highestBidder: null, //id of bidder
                                    highestBidderName: null,
                                    tacoBid: 0
                                }
                                activeAuctions[discordUserIdString] = userAuction;
                                for (var item in IdsOfItemsBeingedAuctioned){
                                    itemsInAuction[IdsOfItemsBeingedAuctioned[item]] = true;
                                    userAuction.idsToTransfer.push(IdsOfItemsBeingedAuctioned[item])
                                }
                                // to the highest bidder by changing their discordid and setting status to null as safety
                                // adjust the tacos of the two users, and take tax
                                // send message for winner of the auction
                                var auctionEnds = setTimeout (function(){ 
                                    if (activeAuctions[discordUserIdString] && activeAuctions[discordUserIdString].tacoBid == 0){
                                        // nobody bought the item
                                        message.channel.send(message.author + " your auction ended without a buyer :cry:")  
                                        // delete the auction from activeAuctions
                                        for (var transferId in activeAuctions[discordUserIdString].idsToTransfer){
                                            // delete from itemsInAuction
                                            var idToDelete = activeAuctions[discordUserIdString].idsToTransfer[transferId];
                                            delete itemsInAuction[idToDelete];
                                        }
                                        if (idToDelete){
                                            delete itemsInAuction[idToDelete];
                                        }
                                        delete activeAuctions[discordUserIdString];
                                    }
                                    else if (activeAuctions[discordUserIdString]){
                                        // somebody bought the auction, transfer the items and adjust tacos
                                        var winner = activeAuctions[discordUserIdString].highestBidder;
                                        var auctionCreator = discordUserId;
                                        var itemsArray = activeAuctions[discordUserIdString].idsToTransfer;
                                        var tacosPaid = activeAuctions[discordUserIdString].tacoBid;
                                        tacosInUseAuction[winner] = tacosInUseAuction[winner] - tacosPaid;
                                        var tacosWon = activeAuctions[discordUserIdString].tacoBid;
                                        // take tax on the item if the item is over 15 tacos
                                        var initialTacoTax = 0;
                                        if (tacosWon > 50){
                                            initialTacoTax = Math.floor(tacosWon * 0.1);
                                        }
                                        else if (tacosWon >= 5 && tacosWon <= 50){
                                            initialTacoTax = Math.floor(tacosWon * 0.1);
                                        }
                                        message.channel.send(":loudspeaker: " + activeAuctions[discordUserIdString].highestBidderUserObj + " has won the auction of **" + activeAuctions[discordUserIdString].itemName + "** for `" + activeAuctions[discordUserIdString].tacoBid + "` :taco: tacos! " + "Bender kept `" + initialTacoTax + "` for tax purposes.") 
                                        tacosWon = tacosWon - initialTacoTax;
                                        // console.log(winner);
                                        transferItemsAndTacos(winner, auctionCreator, itemsArray, tacosPaid, tacosWon, function(transferErr, transferRes){
                                            if (transferErr){
                                                // console.log(transferErr)
                                            }
                                            else{
                                                // console.log(transferRes);
                                                
                                            }
                                        })
                                        for (var transferId in activeAuctions[discordUserIdString].idsToTransfer){
                                            // delete from itemsInAuction
                                            var idToDelete = activeAuctions[discordUserIdString].idsToTransfer[transferId];
                                            if (idToDelete){
                                                delete itemsInAuction[idToDelete];
                                            }
                                        }
                                        delete activeAuctions[discordUserIdString];
                                    }
                                    
                                }, 360000);
                                message.channel.send(message.author + " has created an auction for **" + itemNameInAuction +"** x`" + itemCount + "` !")  
                                // console.log("items in auction " + JSON.stringify(itemsInAuction, null, 2));
                            }
                            else{
                                message.channel.send(message.author + " can't create that auction! example use: -auction loincloth OR example use: -auction polyester")  
                                // console.log("items in auction " + JSON.stringify(itemsInAuction, null, 2));
                            }
                        }
                        else{
                            message.channel.send(message.author + " invalid item! example use: -auction loincloth OR example use: -auction polyester")  
                            // console.log("items in auction " + JSON.stringify(itemsInAuction, null, 2));
                        }
                        // check if myItem exists in items, check if otherItem exists in items, if not then turn the string
                    })
                }
            })
        }
        else{
            // message use case
            message.channel.send("example use: -auction loincloth OR -auction polyester")
        }
    }
    else{
        message.channel.send(message.author + " You already have an active auction! Please wait until it ends to create a new one!")
    }
}

function transferItemsAndTacos(winner, auctionCreator, itemsArray, tacosPaid, tacosWon, cb){
    // transfer - tacosPaid to winner, +tacosWon to auctionCreator, 
    // transfer all items in the Array to winner
    profileDB.updateUserTacos(winner, tacosPaid * -1, function(paidErr, paidRes){
        if (paidErr){
            cb('fail');
        }else{
            profileDB.updateUserTacos(auctionCreator, tacosWon, function(wonErr, wonRes){
                if (wonErr){
                    cb('fail');
                }else{
                    //paid and won now transfer items
                    if (itemsArray.length > 1){
                        profileDB.bulkUpdateItemOwner(itemsArray, winner, function(transferErr, transferRes){
                            if (transferErr){
                                cb('fail');
                            }
                            else{
                                cb(null, transferRes);
                            }
                        })
                    }else{
                        profileDB.updateMarketItemSold(itemsArray, winner, function(transferErr, transferRes){
                            if (transferErr){
                                cb('fail');
                            }
                            else{
                                cb(null, transferRes);
                            }
                        })
                    }
                }
            })
        }
    })
}

module.exports.marketBidCommand = function(message, args){
    var discordUserId = message.author.id;
    // bid via ITEM id not user Id
    // -marketbid 1283121 tacos 5000
    // make the bidder the highest bidder and keep their t h
    if (args && args.length >= 4 && args[2] == "tacos"){
        var idOfItemToBid = args[1]
        var biddingTacos = args[3]
        biddingTacos = Math.floor(biddingTacos);
        profileDB.getUserProfileData(discordUserId, function(profileErr, profileRes){
            if (profileErr){
                // console.log(profileErr);
                agreeToTerms(message, discordUserId);
            }else{
                var userTacosToBid = profileRes.data.tacos;
                if (userTacosToBid >= biddingTacos){
                    var auctionToBidOn = marketItems[idOfItemToBid] ? marketItems[idOfItemToBid] : 0;
                    // your bid has to be higher than current bid + 5% of current bid
                    var adjustedCurrentBid = Math.floor( auctionToBidOn.currentbid + (auctionToBidOn.currentbid * .03) )
                    if (adjustedCurrentBid >= auctionToBidOn.buyout || adjustedCurrentBid == 0){
                        adjustedCurrentBid = auctionToBidOn.buyout
                    }
                    if (biddingTacos > 0 && auctionToBidOn && biddingTacos >= adjustedCurrentBid && auctionToBidOn.seller != discordUserId){

                        var lastHighestBidder = auctionToBidOn.currentbiduserid;
                        if (lastHighestBidder){
                            tacosInUseAuction[lastHighestBidder] = tacosInUseAuction[lastHighestBidder] - auctionToBidOn.currentbid
                            // tell the user they have been outbid
                            try{
                                var outBidUser = client.users.get(lastHighestBidder)
                                client.channels.get(auctionToBidOn.lastHighestbidderchannel).send(outBidUser + " You were outbid on **" + auctionToBidOn.name + "** in the marketplace")
                            }catch(ex){
                                console.log(ex)
                            }
                        }

                        // edit local marketItems and database
                        // if the bid >= buyout cost then award the user the item and close the auction and stop the timeout
                        auctionToBidOn.currentbid = biddingTacos;
                        auctionToBidOn.currentbiduserid = discordUserId;
                        auctionToBidOn.lastHighestbidderchannel = message.channel.id
                        profileDB.bidOnMarketItem(auctionToBidOn, function(err, res){
                            if (err){
                                console.log(err)
                            }else{
                                // get the number of items being auctioned
                                if (!tacosInUseAuction[discordUserId]){
                                    tacosInUseAuction[discordUserId] = 0;
                                }
                                // cannot use these tacos
                                tacosInUseAuction[discordUserId] = tacosInUseAuction[discordUserId] + biddingTacos;
                                message.channel.send(message.author + " is now the highest bidder on **" + auctionToBidOn.name + "**!")
                                if (biddingTacos >= auctionToBidOn.buyout){
                                    var individualItem = auctionToBidOn.item
                                    handleMarketItemAuctionEnded(individualItem)
                                }
                            }
                        })
                    }else{
                        if (!auctionToBidOn){
                            message.channel.send(message.author + " that item is not available on the market"); 
                        }else if (auctionToBidOn.seller == discordUserId){
                            message.channel.send(message.author + " can't bid on your own items in the market"); 
                        }
                        else{
                            message.channel.send(message.author + " your bid is lower than the current highest bid. Highest bid is `" + adjustedCurrentBid + "` tacos!")                            
                        }
                    }
                }else{
                    message.channel.send("You do not have the tacos to bid on this auction")
                }
            }
        })
    }else{
        // print example on how to bid on the market
        message.channel.send(message.author + " example: `-mkbid [id] tacos [bid]` "  )
    }
}

module.exports.bidCommand = function(message, args){
    var discordUserId = message.author.id;
    var discordUserIdString = "auction-" + discordUserId;
    // arguments are 1 = tagged person, 2 = #of 
    var users  = message.mentions.users;
    var mentionedId;
    var mentionedUser;
    // console.log(users);
    users.forEach(function(user){
        // console.log(user.id);
        mentionedId = user.id;
        mentionedUser = user
    })
    if (args && args.length >= 3 && mentionedId && mentionedId != discordUserId){
        var mentionedIdString = "auction-" + mentionedId;
        var biddingTacos = parseInt(args[2]);
        biddingTacos = Math.floor(biddingTacos);
        profileDB.getUserProfileData(discordUserId, function(profileErr, profileRes){
            if (profileErr){
                // console.log(profileErr);
                agreeToTerms(message, discordUserId);
            }
            else{
                var userTacosToBid = profileRes.data.tacos;
                if (userTacosToBid >= biddingTacos){
                    // can bid, get the auction that the mentioned user has available
                    var auctionToBidOn = activeAuctions[mentionedIdString] ? activeAuctions[mentionedIdString] : 0;
                    // set the new data to the auction
                    if (biddingTacos > 0 && auctionToBidOn && biddingTacos > auctionToBidOn.tacoBid){
                        // also remove tacos being used by the last person that had highest bid
                        var lastHighestBidder = auctionToBidOn.highestBidder;
                        if (lastHighestBidder){
                            tacosInUseAuction[lastHighestBidder] = tacosInUseAuction[lastHighestBidder] - auctionToBidOn.tacoBid
                        }
                        
                        auctionToBidOn.tacoBid = biddingTacos;
                        auctionToBidOn.highestBidder = discordUserId;
                        auctionToBidOn.highestBidderName = message.author.username;
                        auctionToBidOn.highestBidderUserObj = message.author;
                        // get the number of items being auctioned
                        var itemCountBeingAuctioned = auctionToBidOn.idsToTransfer.length
                        if (!tacosInUseAuction[discordUserId]){
                            tacosInUseAuction[discordUserId] = 0;
                        }
                        // cannot use these tacos
                        tacosInUseAuction[discordUserId] = tacosInUseAuction[discordUserId] + biddingTacos;
                        message.channel.send(message.author + " is now the highest bidder on **" + auctionToBidOn.itemName + "** x`" + itemCountBeingAuctioned + "` with `" + biddingTacos + "` tacos!")
                    }
                    else{
                        if (!auctionToBidOn){
                            message.channel.send(message.author + " the user currently does not have an auction open"); 
                        }
                        else{
                            message.channel.send(message.author + " your bid is lower than the current highest bid. Highest bid is `" + auctionToBidOn.tacoBid + "` tacos!")                            
                        }
                    }
                }
                else{
                    message.channel.send(message.author + " you only have `" + userTacosToBid + "` tacos to bid!")
                }
            }
        })
    }
    else{
        message.channel.send("example use: -bid @user 5")
    }
}

module.exports.tradeCommand = function(message, args){
    var discordUserId = message.author.id;
    // arguments are 1 = tagged person, 2 = item to trade
    var mentionedId;
    var mentionedUser;
    var users  = message.mentions.users
    // console.log(users);
    users.forEach(function(user){
        // console.log(user.id);
        mentionedId = user.id;
        mentionedUser = user
    })
    var mentionedIdString;
    if (mentionedUser){
        var mentionedIdString = "trading-" + mentionedId;
    }
    var discordUserIdString = "trading-" + discordUserId;
    if (args && args.length >= 3 && mentionedUser && !activeTrades[mentionedIdString] && !hasOpenTrade[discordUserIdString] && !hasOpenTrade[mentionedIdString] ){ //&& mentionedId != discordUserId){
        
        var itemCount = 1;
        var myItemShortName = args[2].toLowerCase();
        if (args.length > 3){
            itemCount = args[3];
        }
        var tacoAsk = 0;
        if (args[args.length - 2] == "tacos" && args.length >= 5){
            if (args[args.length -1] >= 0){
                tacoAsk = Math.floor( args[args.length -1] )
            }
            if (itemCount == "tacos"){
                itemCount = 1;
            }
        }
        if (tacoAsk != 1){
            profileDB.getUserProfileData(discordUserId, function(getProfileErr, getProfileRes){
                if (getProfileErr){
                    // console.log(getProfileErr);
                    agreeToTerms(message, discordUserId);
                }
                else{
                    // get the user's item based on discordid and shortname and check that they have an item that they want to trade
                    profileDB.getUserItems(discordUserId, function(err, inventoryResponse){
                        if (err){
                            // console.log(err);
                        }
                        else{
                            // console.log(inventoryResponse.data);
                            // get all the data for each item
                            var itemsInInventoryCountMap = {};
                            var itemsMapbyShortName = {};
                            var itemsMapById = {};
                            var IdsOfItemsBeingedTraded = []
                            profileDB.getItemData(function(error, allItemsResponse){
                                for (var index in allItemsResponse.data){
                                    itemsMapbyShortName[allItemsResponse.data[index].itemshortname] = allItemsResponse.data[index];
                                }
                                for (var index in allItemsResponse.data){
                                    itemsMapById[allItemsResponse.data[index].id] = allItemsResponse.data[index];
                                }
                                for (var item in inventoryResponse.data){
                                    var validItem = useItem.itemValidate(inventoryResponse.data[item]);
                                    var notWearing = useItem.itemNotWearing(inventoryResponse.data[item])
                                    var ItemInQuestion = inventoryResponse.data[item]
                                    var auctionedItem = false;
                                    if (itemsInAuction[inventoryResponse.data[item].id]){
                                        auctionedItem = true;
                                    }
                                    var itemBeingTraded = false;
                                    if (activeTradeItems[inventoryResponse.data[item].id]){
                                        itemBeingTraded = true;
                                    }
                                    if (!itemsInInventoryCountMap[inventoryResponse.data[item].itemid] 
                                        && validItem && notWearing && !auctionedItem && !itemBeingTraded){
                                        // item hasnt been added to be counted, add it as 1
                                        itemsInInventoryCountMap[inventoryResponse.data[item].itemid] = 1;

                                        // console.log(ItemInQuestion);
                                        if (itemsMapbyShortName[myItemShortName] 
                                            && IdsOfItemsBeingedTraded.length < itemCount
                                            && itemsMapById[ItemInQuestion.itemid].itemshortname === myItemShortName){
                                            IdsOfItemsBeingedTraded.push(ItemInQuestion.id);
                                        }
                                    }
                                    else if (validItem && notWearing && !auctionedItem && !itemBeingTraded){
                                        itemsInInventoryCountMap[inventoryResponse.data[item].itemid] = itemsInInventoryCountMap[inventoryResponse.data[item].itemid] + 1

                                        if (itemsMapbyShortName[myItemShortName] 
                                            && IdsOfItemsBeingedTraded.length < itemCount
                                            && itemsMapById[ItemInQuestion.itemid].itemshortname === myItemShortName){
                                            IdsOfItemsBeingedTraded.push(ItemInQuestion.id);
                                        }
                                    }
                                }
                                
                                // args[2] is your item(or # of tacos)
                                // check if myItem exists in items, check if otherItem exists in items, if not then turn the string
                                if (itemsMapbyShortName[myItemShortName] 
                                    && itemsMapbyShortName[myItemShortName].itemraritycategory != "myth"
                                    && itemsMapbyShortName[myItemShortName].itemraritycategory != "artifact+" ){
                                    var idOfMyItem = itemsMapbyShortName[myItemShortName].id;
                                    var itemNameInTrade = itemsMapbyShortName[myItemShortName].itemname
                                    // console.log(idOfMyItem);
                                    if (itemsInInventoryCountMap[idOfMyItem] && 
                                        itemsInInventoryCountMap[idOfMyItem] >= itemCount){
                                        // the item exists in my inventory
                                        // create an active trade with the mentioned use, myItem = trading
                                        var userTrade = {
                                            item: myItemShortName,
                                            fullItemName: itemNameInTrade,
                                            itemid: itemsMapbyShortName[myItemShortName].itemid,
                                            idsToTransfer: [],
                                            tradeFrom: discordUserIdString,
                                            tradingWith: mentionedUser.username,
                                            itemRarity: itemsMapbyShortName[myItemShortName].itemraritycategory,
                                            tacoAsk: tacoAsk
                                        }
                                        activeTrades[mentionedIdString] = userTrade;
                                        hasOpenTrade[discordUserIdString] = mentionedIdString;
                                        hasOpenTrade[mentionedIdString] = discordUserIdString;

                                        for (var item in IdsOfItemsBeingedTraded){
                                            activeTradeItems[IdsOfItemsBeingedTraded[item]] = true;
                                            userTrade.idsToTransfer.push(IdsOfItemsBeingedTraded[item])
                                        }

                                        message.channel.send(message.author + " has offered " + mentionedUser + " **" + itemNameInTrade + "** x`" + IdsOfItemsBeingedTraded.length + "` to trade for `" +tacoAsk + "` tacos :taco:" )
                                        // if the trade is of an uncommon, tax = 1, rare tax = 2, ancient tax = 3, artifact tax = 5

                                        var tradeEnds = setTimeout (function(){ 
                                            // trade has expired if still there cancel the trade
                                            // cancel the trade
                                            if (activeTrades[mentionedIdString]){
                                                // trade is still active, just cancel it
                                                var itemToTradeName = activeTrades[mentionedIdString].fullItemName;
                                                var userTradingWith = activeTrades[mentionedIdString].tradingWith;
                                                var tradeFrom = activeTrades[mentionedIdString].tradeFrom
                                                for (var transferId in activeTrades[mentionedIdString].idsToTransfer){
                                                    // delete from itemsInAuction
                                                    var idToDelete = activeTrades[mentionedIdString].idsToTransfer[transferId];
                                                    if (idToDelete){
                                                        delete activeTradeItems[idToDelete];
                                                    }
                                                }
                                                delete activeTrades[mentionedIdString];
                                                if (hasOpenTrade[tradeFrom]){
                                                    delete hasOpenTrade[tradeFrom];
                                                }
                                                if (hasOpenTrade[mentionedIdString]){
                                                    delete hasOpenTrade[mentionedIdString]
                                                }
                                                message.channel.send(message.author + " your trade offer of **" + itemToTradeName + "** with **" + userTradingWith + "** has expired :x:" )
                                            }
                                        }, 60000)

                                        activeTrades[mentionedIdString].tradeTimeout = tradeEnds
                                    }
                                    else{
                                        message.channel.send(message.author + " you cannot create that trade")
                                    }
                                }
                                else{
                                    message.channel.send(message.author + " invalid item!");
                                }
                            })
                        }
                    })
                }
            })
        }
        else{
            message.channel.send(message.author + " trade for more than 1 taco, cannot tax 1 taco :(")
        }
    }
    else{
        if (activeTrades[mentionedIdString] || hasOpenTrade[mentionedIdString]){
            // can't trade with the user at this time
            message.channel.send("the user is currently trading with someone else");
        }else{
            //print usage
            message.channel.send("example use:\n-trade @user rock \n-trade @user rock 10 \n-trade @user rock 10 tacos 5");
        }
    }
}

module.exports.acceptTradeCommand = function(message, args){
    var discordUserId = message.author.id;
    var discordUserIdString = "trading-" + discordUserId

    var tacosAgreedOn = 0;
    if (args.length > 1){
        tacosAgreedOn = args[1]
    }
    // check that the user accepting the trade has tacos to pay the tax
    profileDB.getUserProfileData(discordUserId, function(profileErr, profileRes){
        if (profileErr){
            // console.log(profileErr);
        }
        else{
            // there is an active trade with the user
            if (activeTrades[discordUserIdString] && hasOpenTrade[discordUserIdString]){
                var mentionedId = hasOpenTrade[discordUserIdString].substr(8);
                var currentTacos = profileRes.data.tacos;
                var tacosToPay = activeTrades[discordUserIdString].tacoAsk;
                var tacosAuctioned = 0
                var itemsArray = activeTrades[discordUserIdString].idsToTransfer;
                if (tacosInUseAuction[discordUserId]){
                    tacosAuctioned = tacosInUseAuction[discordUserId]
                }
                var tradeTax = Math.floor(tacosToPay * 0.1);
                var tacoTax = tradeTax;
                // console.log(tacoTax);
                if (tradeTax < 1){
                    tacoTax = 1;
                }
                if (tradeTax >= 1){
                    tacoTax = tacoTax + 1
                }
                if (currentTacos - tacosAuctioned - tacosToPay >= 0 && tacosToPay == tacosAgreedOn){
                    // accept the trade and transfer the item
                    message.channel.send(":handshake:  " + message.author + " has accepted the trade of **" + activeTrades[discordUserIdString].fullItemName + "** ! " + " Bender kept `" + tacoTax + "` tacos for tax purposes.") 
                    transferItemsAndTacos(discordUserId, mentionedId, itemsArray, tacosToPay, tacosToPay-tacoTax, function(transErr, transRes){
                        if (transErr){
                            console.log(transErr);
                        }else{
                            console.log(transRes);
                        }
                    })
                    // delete the item from all the maps
                    for (var transferId in activeTrades[discordUserIdString].idsToTransfer){
                        // delete from itemsInAuction
                        var idToDelete = activeTrades[discordUserIdString].idsToTransfer[transferId];
                        if (idToDelete){
                            delete activeTradeItems[idToDelete];
                        }
                    }
                    if (hasOpenTrade[discordUserIdString]){
                        var tradeCreator = hasOpenTrade[discordUserIdString]
                        if (hasOpenTrade[tradeCreator]){
                            delete hasOpenTrade[tradeCreator];
                        }
                        delete hasOpenTrade[discordUserIdString];
                    }
                    if (activeTrades[discordUserIdString].tradeTimeout){
                        clearTimeout(activeTrades[discordUserIdString].tradeTimeout)
                    }
                    delete activeTrades[discordUserIdString];
                }
                else{
                    message.channel.send("You can't afford that trade OR you need to do -accept #oftacos")
                }
            }
            else{
                message.channel.send(message.author + " You do not currently have open trades!")
            }
        }
    })
}

module.exports.cancelTradeCommand = function(message, args){
    var discordUserId = message.author.id;
    var discordUserIdString = "trading-" + discordUserId

    // cancel the active trade
    if (hasOpenTrade[discordUserIdString]){
        var tradingWith = hasOpenTrade[discordUserIdString]
        // delete the item from all the maps
        if (activeTrades[tradingWith]){
            for (var transferId in activeTrades[tradingWith].idsToTransfer){
                // delete from itemsInAuction
                var idToDelete = activeTrades[tradingWith].idsToTransfer[transferId];
                if (idToDelete){
                    delete activeTradeItems[idToDelete];
                }
            }
            if (hasOpenTrade[tradingWith]){
                delete hasOpenTrade[tradingWith];
                delete hasOpenTrade[discordUserIdString];
            }
            delete activeTrades[tradingWith];
            message.channel.send(":x:  " + message.author + " Canceled a trade ") 
        }
        else{
            if (activeTrades[discordUserIdString]){
                for (var transferId in activeTrades[discordUserIdString].idsToTransfer){
                    // delete from itemsInAuction
                    var idToDelete = activeTrades[discordUserIdString].idsToTransfer[transferId];
                    if (idToDelete){
                        delete activeTradeItems[idToDelete];
                    }
                }
                if (hasOpenTrade[tradingWith]){
                    delete hasOpenTrade[tradingWith];
                    delete hasOpenTrade[discordUserIdString];
                }
                if (activeTrades[discordUserIdString].tradeTimeout){
                    clearTimeout(activeTrades[discordUserIdString].tradeTimeout)
                }
                delete activeTrades[discordUserIdString];
                message.channel.send(":x:  " + message.author + " Canceled a trade ") 
            }else{
                message.channel.send("there is some fishy stuff going on and I am investigating....")
            }
        }
        
    }
    else{
        message.channel.send(message.author + " You do not currently have open trades !")
    }
}

module.exports.agreeTermsCommand = function(message, args){
    var discordUserId = message.author.id
    if (NeedsToAgree[discordUserId] && NeedsToAgree[discordUserId].hasNotAgreed){
        profileDB.getUserProfileData(discordUserId, function(error, data){
            if (error){
                // this is what we are expecting, from here we expect to create the user profile
                var userData = initialUserProfile(discordUserId);
                var host = NeedsToAgree[discordUserId].hostUser;
                profileDB.createUserProfile(userData, function(err, createResponse){
                    if(err){
                        // console.log(err);
                        message.channel.send("user already exists")
                    }
                    else{
                        profileDB.updateUserTacosWelcome(discordUserId, 50, function(err, updateResponse) {
                            if (err){
                                // console.log(err);
                            }
                            else{
                                // send message that the user has 1 more taco
                                Last_Five_Welcomes.push(discordUserId);
                                if (Last_Five_Welcomes.length >= 5){
                                    Last_Five_Welcomes.shift();
                                }
                                message.channel.send("welcome aboard ! " + message.author + " your profile has been created. " + host + " will be your host!" );
                                if (host.id){
                                    stats.statisticsManage(host.id, "welcomecount", 1, function(err, statSuccess){
                                        if (err){
                                            // console.log(err);
                                        }
                                        else{
                                            // check achievements??
                                            getProfileForAchievement(host.id, message)
                                        }
                                    })
                                }
                            }
                        })
                        delete NeedsToAgree[discordUserId]
                    }
                })
            }
            else{
                // the user profile already exists, ignore this command
            }
        })
    }
    else{
        message.channel.send("already accepted");
    }
}

module.exports.denyTermsCommand = function(message, args){
    var discordUserId = message.author.id
    if (NeedsToAgree[discordUserId] && NeedsToAgree[discordUserId].hasNotAgreed){
        message.channel.send(message.author + " Your profile will not be created.")
    }
    else{
        message.channel.send("already accepted contact an admin to have your data deleted");
    }
}

function agreeToTerms(message, discordUserId){
    // only create or replace in needstoagree if doesnt exist or exists but the hostUser is bender
    if (!NeedsToAgree[discordUserId]){
        NeedsToAgree[discordUserId] = {};
        NeedsToAgree[discordUserId].hasNotAgreed = true;
        if (!NeedsToAgree[discordUserId].hostUser){
            NeedsToAgree[discordUserId].hostUser = "Bender";
        }
    }
    
    message.channel.send("Hey " + message.author + " Bender will be storing and encrypting your discord id to bring you the best experience. Please type -agree to accept these terms, or -deny to decline them!")
}

function welcomeAgreeToTerms(message, mentionedId, mentionedUser, host){
    NeedsToAgree[mentionedId] = {
        hasNotAgreed: true,
        hostUser: host
    };
    message.channel.send("Hey " + mentionedUser + " Bender will be storing and encrpyting your discord id to bring you the best experience. Please type -agree to accept these terms, or -deny to decline them!")
}

module.exports.enterRaffleCommand = function(message, args){
    var discordUserId = message.author.id;
    // check that the user accepting the trade has tacos to pay the tax
    if (!activeRaffle.users[discordUserId]){
        profileDB.getUserProfileData(discordUserId, function(profileErr, profileRes){
            if (profileErr){
                // console.log(profileErr);
                // they need to agree to terms
            }
            else{
                var userTacos = profileRes.data.tacos
                if (userTacos >= RAFFLE_ENTRY_COST){
                    // add the user to the raffle
                    activeRaffle.users[discordUserId] = message.author;
                    activeRaffle.entriesId.push(discordUserId);
                    var size = activeRaffle.entriesId.length
                    if (size <= RAFFLE_USER_SIZE){
                        message.channel.send(":ticket: " + message.author + " you have entered the taco raffle!")
                    }
                    if (size == RAFFLE_USER_SIZE){
                        // just got to 7, trigger the raffle event for someone to win
                        calculateRaffleWinner(message);
                        
                    }
                    else if (size >= RAFFLE_USER_SIZE + 1){
                        activeRaffle = {
                            entriesId: [],
                            users: {}
                        }
                        message.channel.send(message.author + " Try again, a raffle might have been in session ;(")
                    }
                }
                else{
                    message.channel.send(message.author + " You cannot afford the raffle!")
                }
            }
        })
    }else{
        message.channel.send("You are already in the raffle!");
    }
    
    
}

function calculateRaffleWinner(message){
    var raffleWinnerRoll = Math.floor(Math.random() * 7);
    var raffleWinner = activeRaffle.entriesId[raffleWinnerRoll]
    var raffleWinnerUserName = "";
    var raffleWinnerUser;
    // get the username via activeRaffle.users
    for (var key in activeRaffle.users) {
        if (activeRaffle.users.hasOwnProperty(key)) {
            if (key == raffleWinner){
                raffleWinnerUserName = activeRaffle.users[key].username
                raffleWinnerUser = activeRaffle.users[key]
            }
        }
    }
    //// TODO: after collecting the channels that were used for the raffle, send the message below to all of those channels
    message.channel.send(":ticket: Congratulations " + raffleWinnerUser + " You are the winner of the taco raffle! You win `" + (RAFFLE_ENTRY_COST * (activeRaffle.entriesId.length - 2)) + "` tacos :taco:");
    // update the user tacos for all entrants of the raffle
    profileDB.updateUserTacos(raffleWinner, (RAFFLE_ENTRY_COST * (activeRaffle.entriesId.length - 2)), function(updateErr, updateRes){
        if (updateErr){
            // console.log(updateErr);
        }
        else{
            var copyOfEntries = []
            for (var i in activeRaffle.entriesId){
                copyOfEntries.push(activeRaffle.entriesId[i])
            }
            // updated the user tacos, now delete from other users
            for (var entry in copyOfEntries){
                // if it isnt the id of the winner, just remove their tacos
                if (copyOfEntries[entry] != raffleWinner){
                    profileDB.updateUserTacos(copyOfEntries[entry], (RAFFLE_ENTRY_COST * -1), function(removeErr, removeRes){
                        if (removeErr){
                            // console.log(removeErr);
                        }
                        else{
                            // console.log(removeRes);
                        }
                    })
                }
            }
            activeRaffle = {
                entriesId: [],
                users: {}
            }
        }
    })
}

module.exports.createTableCommand = function(message){

    var discordUserId = message.author.id;
    var IDS_OF_UNCOMMONS_FOR_PARTY = [];
    var uncommonsToUse = [];
    // get the user's inventory and use up 1 of each of the 6 items that are uncommon items
    if (!useItem.getItemsLock(discordUserId)){
        useItem.setItemsLock(discordUserId, true)
        profileDB.getUserItems(discordUserId, function(err, inventoryResponse){
            if (err){
                // console.log(err);
                useItem.setItemsLock(discordUserId, false)
            }
            else{
                // console.log(inventoryResponse.data);
                // get all the data for each item
                var itemsInInventoryCountMap = {};
                var itemsMapbyId = {};
                profileDB.getItemData(function(error, allItemsResponse){
                    if (error){
                        console.log(error);
                        useItem.setItemsLock(discordUserId, false)
                    }
                    else{
                        // console.log("allitemsres " + allItemsResponse.data);
                        for (var item in inventoryResponse.data){
                            var ItemInQuestion = inventoryResponse.data[item];
                            var validItem = useItem.itemValidate(ItemInQuestion);
                            var itemBeingAuctioned = false;
                            if (itemsInAuction[ItemInQuestion.id]){
                                itemBeingAuctioned = true;
                            }
                            var itemBeingTraded = false;
                            if (activeTradeItems[inventoryResponse.data[item].id]){
                                itemBeingTraded = true;
                            }
                            if (!itemsInInventoryCountMap[inventoryResponse.data[item].itemid] 
                                && validItem 
                                && !itemBeingAuctioned
                                && !itemBeingTraded){
                                // item hasnt been added to be counted, add it as 1
                                itemsInInventoryCountMap[inventoryResponse.data[item].itemid] = 1;
                            }
                            else if (validItem && !itemBeingAuctioned && !itemBeingTraded){
                                itemsInInventoryCountMap[inventoryResponse.data[item].itemid] = itemsInInventoryCountMap[inventoryResponse.data[item].itemid] + 1
                            }
                        }
                        // console.log(itemsInInventoryCountMap);
                        for (var index in allItemsResponse.data){
                            itemsMapbyId[allItemsResponse.data[index].id] = allItemsResponse.data[index];
                            if (allItemsResponse.data[index].itemraritycategory == "uncommon"){
                                IDS_OF_UNCOMMONS_FOR_PARTY.push(allItemsResponse.data[index].id);
                            }
                        }
                        // have items map by id for all items, and itemsInInventoryCountMap itemid : count
                        // only create table if we have > 1 of the uncommons ids
                        var ableToCreateTable = true;
                        for (var uncommon in IDS_OF_UNCOMMONS_FOR_PARTY){
                            if (!itemsInInventoryCountMap[IDS_OF_UNCOMMONS_FOR_PARTY[uncommon]] 
                                || itemsInInventoryCountMap[IDS_OF_UNCOMMONS_FOR_PARTY[uncommon]] == 0){
                                ableToCreateTable = false;
                            }
                        }
    
                        if (ableToCreateTable){
                            // go through list of uncommons
                            for (var uncommon in IDS_OF_UNCOMMONS_FOR_PARTY){
                                // go through list of items in my inventory
                                for (var item in inventoryResponse.data){
                                    // only need 1 item
                                    var ItemInQuestion = inventoryResponse.data[item];
                                    var validItem = useItem.itemValidate(ItemInQuestion);
                                    var itemBeingAuctioned = false;
                                    if (itemsInAuction[ItemInQuestion.id]){
                                        itemBeingAuctioned = true;
                                    }
                                    var itemBeingTraded = false;
                                    if (activeTradeItems[inventoryResponse.data[item].id]){
                                        itemBeingTraded = true;
                                    }
                                    if (inventoryResponse.data[item].itemid == IDS_OF_UNCOMMONS_FOR_PARTY[uncommon]
                                        && validItem && !itemBeingAuctioned && !itemBeingTraded){
                                        uncommonsToUse.push(inventoryResponse.data[item]);
                                        break;
                                    }
                                }
                            }
                            createParty(message, discordUserId, uncommonsToUse);
                        }
                        else{
                            useItem.setItemsLock(discordUserId, false)
                            message.channel.send("Missing ingredients for the Taco Party!!");
                        }
                    }
                })
            }
        })
    }
    
}

function createParty(message, discordUserId, uncommonsToUse){
    
    const embed = new Discord.RichEmbed()
    .setThumbnail("https://i.imgur.com/dI1PWNo.png")
    .setColor(0xF2E93E)
    .addField("Taco party created by " + message.author.username + "!! " + 'Eat some tacos, drink some orchata water, or dance with Aileen your taco hostess', "Pick one! 🌮 = taco x20, 🍹 = terry cloth x1, 💃🏼 = rock x1 \nYou will receive it at the end of the party (5 minutes)" )

    useItem.useUncommons(message, discordUserId, uncommonsToUse, function(useError, useRes){
        if (useError){
            useItem.setItemsLock(discordUserId, false)
            console.log(useError);
        }
        else{
            // console.log(useRes);
            if (useRes == "success"){
                message.channel.send({embed})
                .then(function (sentMessage) {
                    // match the sent message to the discord user that sent it
                    activeTables["table-"+sentMessage.id] = { id: discordUserId, username: message.author.username };
                    sentMessage.react("🌮")
                    sentMessage.react("🍹")
                    sentMessage.react("💃🏼")
                    var tacoParty = new Discord.ReactionCollector(sentMessage, function(){ return true; } , { time: TACO_PARTY_TIME_TO_LIVE, max: 1000, maxEmojis: 100, maxUsers: 100 } );
                    tacoParty.on('collect', function(element, collector){
                        // remove the reaction if the user already reacted
                        // console.log(element)
                        element.users.forEach(function(user){
                            if (!user.bot){
                                var userId = user.id;
                                collector.collected.forEach(function(reaction){
                                    // console.log(reaction);
                                    reaction.users.forEach(function(collectorUser){
                                        if (!collectorUser.bot){
                                            var collectorUser = collectorUser.id;
                                            if (collectorUser == userId && element.emoji.name != reaction.emoji.name){
                                                // remove the reaction by the user
                                                element.remove(userId)
                                            }
                                        }
                                    })
                                })
                            }
                        })
                    })
                    tacoParty.on('end', function(collected, reason){
                        // party lasts 10 minutes - upon ending the reaction collector the party has ended
                        var ownerOfTable;
                        var ownerOfTableUsername;
                        var idOfTable;
                        var reactionCount = 0;
                        collected.forEach(function(reactionEmoji){
                            ownerOfTable = activeTables["table-" + reactionEmoji.message.id]; // discord id of owner
                            ownerOfTableUsername = activeTables["table-" + reactionEmoji.message.id].username;
                            idOfTable = "table-" + reactionEmoji.message.id;
                            if (reactionEmoji._emoji.name == "🌮"){
                                reactionEmoji.users.forEach(function(user){
                                    if (!user.bot && ownerOfTable.id != user.id){
                                        tacoPartyReactRewards(message, user, "🌮", "taco")
                                        reactionCount++;
                                    }
                                })
                            }
                            else if (reactionEmoji._emoji.name == "🍹"){
                                reactionEmoji.users.forEach(function(user){
                                    if (!user.bot && ownerOfTable.id != user.id){
                                        tacoPartyReactRewards(message, user, "🍹", "terrycloth")
                                        reactionCount++;
                                    }
                                })
                            }
                            else if (reactionEmoji._emoji.name == "💃🏼"){
                                reactionEmoji.users.forEach(function(user){
                                    if (!user.bot && ownerOfTable.id != user.id){
                                        tacoPartyReactRewards(message, user, "💃🏼", "rock")
                                        reactionCount++;
                                    }
                                })
                            }
                            
                        })
                        if (ownerOfTable.id){
                            // give owner of table 1xp per reaction, 2 tacos per reaction 
                            var attendees = reactionCount;
                            if (reactionCount > 15){
                                reactionCount = 15;
                            }
                            profileDB.getUserProfileData(ownerOfTable.id, function(getDataErr, getDataRes){
                                if (getDataErr){
                                    // console.log(getDataErr);
                                    message.channel.send(err);
                                }
                                else{
                                    // for gaining xp
                                    var userData = getDataRes;
                                    profileDB.updateUserTacos(ownerOfTable.id, reactionCount * 20, function(err, res){
                                        if (err){
                                            // console.log(err);
                                            message.channel.send(err);
                                        }
                                        else{
                                            // console.log(res);
                                            experience.gainExperience(message, ownerOfTable, reactionCount, userData);
                                            message.channel.send("The party for `" + ownerOfTableUsername + "` was a great success! There were `" + attendees + "` guests that showed up")
                                            var achievements = getDataRes.data.achievements;
                                            var data = {}
                                            data.achievements = achievements;
                                            data.attendees = attendees;
                                            achiev.checkForAchievements(ownerOfTable.id, data, message);
                                            // delete the party from the list
                                            if (activeTables[idOfTable]){
                                                delete activeTables[idOfTable];
                                            }
                                        }
                                    })
                                }
                            })
                        }
                    })
                }).catch(function(err) {
                    message.channel.send(err);
                });
            }
        }
    })
}

function tacoPartyReactRewards(message, user, emoji, reward){
    // each of these ids will receive 1 taco, 1 xp, or 1 rock
    var giveRewardTo = user.id;
    var giveRewardToUsername = user.username
    // console.log(user.id);
    if (reward === "taco"){
        profileDB.updateUserTacos(giveRewardTo, 20, function(err, res){
            if (err){
                // console.log(err);
                message.channel.send(err);
            }else{
                // console.log(res);
            }
        })
    }
    else if (reward === "terrycloth" || reward === "rock"){
        profileDB.getItemData(function(err, getItemResponse){
            if (err){
                // console.log(err);
            }
            else{
                var itemsObtainedArray = [];
                if (reward === "terrycloth"){
                    // ID of terry cloth
                    for (var index in getItemResponse.data){
                        if (getItemResponse.data[index].id == TERRY_CLOTH_ITEM_ID){
                            itemsObtainedArray.push( getItemResponse.data[index] );
                            break;
                        }
                    }
                }
                else if (reward === "rock"){
                    for (var index in getItemResponse.data){
                        if (getItemResponse.data[index].id == ROCK_ITEM_ID){
                            itemsObtainedArray.push( getItemResponse.data[index] );
                            break;
                        }
                    }
                }
                addToUserInventory(giveRewardTo, itemsObtainedArray);
            }
        })
    }
}

module.exports.rpgBattleCommand = function(message){
    rpg.rpgInitialize(message);
}

module.exports.rpgChallengeCommand = function(message, args){
    var challengeNumber = args[1];
    var special = { challenge: challengeNumber }
    rpg.rpgInitialize(message, special);
}

module.exports.rpgReadyCommand = function(message){
    if (usersMinigames[message.author.id]){
        var currentGame = usersMinigames[message.author.id];
        var playerToReady = currentGame.getPlayer(message.author.id);
        playerToReady.playerIsReady();
        var isGameReady = currentGame.gameIsReady();
        if (isGameReady){
            // start the game
            currentGame.setStatus("in progress");
            var boardVisualize = currentGame.visualize();
            var data = {};
            var idOfNextTurnUser = currentGame.isTurn();
            var userObjectNextTurnUser = currentGame.getPlayer(idOfNextTurnUser);
            data.rules = true;
            data.visual = boardVisualize;
            data.nextTurn = userObjectNextTurnUser
            data.currentTurn = currentGame.getCurrentTurn();
            data.currentGame = currentGame;
            miniGameEmbedBuilder(message, data);

            var turnToTakeRandomFruits = currentGame.getCurrentTurn();
            var nextPlayer = currentGame.getPlayer(currentGame.isTurn());

            var timeout = setTimeout (function(){ 
                // get the next player's to make move
                
                var currentTurn = currentGame.getCurrentTurn();
                if (currentTurn == turnToTakeRandomFruits){
                    var randomAmount = Math.floor(Math.random() * 2) + 1;
                    takeFruits(message, nextPlayer, currentGame, randomAmount);
                }
                // get the turn number, and compare with turn numbres to make sure this timeout is valid
                
            }, 10000);
        }else{
            message.channel.send(message.author + " is ready, waiting on players")
        }
    }else{
        var itemsMapbyId = {};
        profileDB.getItemData(function(error, allItemsResponse){
            if (error){
                console.log(error);
            }
            else{
                for (var index in allItemsResponse.data){
                    itemsMapbyId[allItemsResponse.data[index].id] = allItemsResponse.data[index];
                }
                var amuletItemsById = {}
                for (var item in allItemsResponse.data){
                    if (allItemsResponse.data[item].itemraritycategory == "amulet"){
                        amuletItemsById[allItemsResponse.data[item].id] = allItemsResponse.data[item];
                    }
                }
                rpg.rpgReady(message, itemsMapbyId, amuletItemsById);
            }
        });
    }
}

module.exports.rpgSkipCommand = function(message){
    if (usersMinigames[message.author.id]){
        var currentGame = usersMinigames[message.author.id];
        var gameStatus = usersMinigames[message.author.id].getStatus();
        if (gameStatus == "waiting"){
            var usersToCleanUp = currentGame.cleanup();
            for(var user in usersToCleanUp){
                if (usersMinigames[usersToCleanUp[user]]){
                    delete usersMinigames[usersToCleanUp[user]];
                }
            }
            message.channel.send(message.author + " has skipped! game will not start");            
        }else if (gameStatus == "in progress"){
            message.channel.send(message.author + " game is in progress, you cannot skip!");                        
        }
    }else{
        rpg.rpgSkip(message);
    }
}

module.exports.castCommand = function(message, args){
    rpg.useRpgAbility(message, args);
}

module.exports.rpgstatsCommand = function(message){
    var itemsMapbyId = {};
    profileDB.getItemData(function(error, allItemsResponse){
        if (error){
            console.log(error);
        }
        else{
            for (var index in allItemsResponse.data){
                itemsMapbyId[allItemsResponse.data[index].id] = allItemsResponse.data[index];
            }
            var amuletItemsById = {}
            for (var item in allItemsResponse.data){
                if (allItemsResponse.data[item].itemraritycategory == "amulet"){
                    amuletItemsById[allItemsResponse.data[item].id] = allItemsResponse.data[item];
                }
            }
            rpg.showRpgStats(message, itemsMapbyId, amuletItemsById);
        }
    });
}
