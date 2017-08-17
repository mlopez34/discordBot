
var achiev = require("./achievements.js");
var profileDB = require("./profileDB.js");
var stats = require("./statistics.js");
const Discord = require("discord.js");
var Promise = require('bluebird');
var config = require("./config.js");
var useItem = require("./useItem.js")
var experience = require("./experience.js")
var wearStats = require("./wearStats.js")
// game files
/*
var game = require("./card_game/miniGame.js");
var board = require("./card_game/board.js");
var unit = require("./card_game/unit.js");
var player = require("./card_game/player.js");
*/
var moment = require("moment");

var BASE_TACO_COST = 50;
var BASE_TACO_PREPARE = 10;
var BASE_TACO_COOK = 2;
var PICKAXE_COST = 35;
var IMPROVED_PICKAXE_COST = 300;
var PASTA_COST = 250
var SCAVENGE_TACO_FIND_CHANCE_HIGHER = 94
var SCAVENGE_TACO_FIND_CHANCE = 75;
var Last_Five_Welcomes = [];
var ROCK_ITEM_ID = 5;
var PIECE_OF_WOOD_ITEM_ID = 4;
var TERRY_CLOTH_ITEM_ID = 3;
var SODA_CAN_ITEM_ID = 1;
var SOIL_ITEM_ID = 2;
var PET_COST = 75;
var QueueOfTacosDropped = [];
var THANK_COOLDOWN_HOURS = 2;
var SORRY_COOLDOWN_HOURS = 6;
var COOK_COOLDOWN_HOURS = 24;
var PREPARE_COOLDOWN_HOURS = 48;
var SCAVENGE_COOLDOWN_HOURS = 1;

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
    buyPickaxe: 4,

}

var commandHoursToActivate = {
    thank: 2,
    sorry: 6,
    cook: 12,
    prepare: 24,
    scavenge: 1,
    fetch: 3
}

var Levels = config.Levels;

var PETS_AVAILABLE = {
    dog: {
        speak: "WOOF",
        emoji: ":dog:",
        fetch: 2,
        cooldown: 6
    },
    cat: {
        speak: "MEOW",
        emoji: ":cat:",
        fetch: 1,
        cooldown: 3
    },
    monkey: {
        speak: "HUEAHuaHEUEHAHUEAUHAEEA",
        emoji: ":monkey:",
        fetch: 3,
        cooldown: 9
    },
    pig: {
        speak: "OINK OINK OINK OINK",
        emoji: ":pig:",
        fetch: 5,
        cooldown: 27
    },
    rabbit: {
        speak: ".....",
        emoji: ":rabbit:",
        fetch: 1,
        cooldown: 3
    }
}

var REPUTATIONS = config.reputations;

module.exports.thankCommand = function(message){
    
    var discordUserId = message.author.id;
    var users  = message.mentions.users;
    var mentionedId;
    var mentionedUser;
    console.log(users);
    users.forEach(function(user){
        console.log(user.id);
        mentionedId = user.id;
        mentionedUser = user
    })
    
    // check the user mentioned someone, and the user is not the same user
    if ( message.mentions.users.size > 0 && discordUserId != mentionedId ){
        profileDB.getUserProfileData( discordUserId, function(err, thankResponse) {
            if(err){
                console.log("in error : " + err.code);
                // user doesn't exist
                if(err.code === 0){
                    // create new user
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
                        tacostands: 0,
                        welcomed: false,
                        lastpreparetime: threedaysAgo,
                        pickaxe: "none",
                        map: false,
                        phone: false
                    }
                    profileDB.createUserProfile(userData, function(createerr, createUserResponse){
                        if (createerr){
                            console.log(createerr); // cant create user RIP
                        }
                        else{
                            exports.thankCommand(message);
                        }
                    })
                }
            }else{
                var userLevel = thankResponse.data.level;
                wearStats.getUserWearingStats(message, discordUserId, userLevel, function(wearErr, wearRes){
                    if (wearErr){
                        
                    }else{
                        console.log(wearRes);
                        var minutesToRemove = wearStats.calculateMinutesReduced(wearRes, "thank");
                        console.log("MINUTES TO REMOVE " + minutesToRemove);
                        // continue with task
                        // check against thank timestamp and if 2 hours have passed
                        var now = new Date();
                        var twoHoursAgo = new Date();
                        ///////// CALCULATE THE MINUTES REDUCED HERE 
                        twoHoursAgo = new Date(twoHoursAgo.setHours(twoHoursAgo.getHours() - THANK_COOLDOWN_HOURS));
                        // added the CDR
                        twoHoursAgo = new Date(twoHoursAgo.setMinutes(twoHoursAgo.getMinutes() + minutesToRemove));

                        if ( twoHoursAgo > thankResponse.data.lastthanktime ){
                            ///////// CALCULATE THE EXTRA TACOS HERE 

                            var extraTacosFromItems = wearStats.calculateExtraTacos(wearRes, "thank"); // 0 or extra
                            // add tacos to user's profile if they got extra tacos
                            profileDB.updateUserTacos(mentionedId, 1, function(updateerr, updateResponse) {
                                if (updateerr){
                                    console.log(updateerr);
                                    var mentionedData = initialUserProfile(mentionedId);
                                    mentionedData.tacos = mentionedData.tacos + 1;

                                    // create mentionedId
                                    profileDB.createUserProfile(mentionedData, function(createerr, createUserResponse){
                                        if (createerr){
                                            console.log(createerr); // cant create user RIP
                                        }
                                        else{
                                            message.channel.send(message.author + " thanked " + mentionedUser.username + ", they received a taco! :taco:");
                                            stats.statisticsManage(discordUserId, "thankcount", 1, function(staterr, statSuccess){
                                                if (staterr){
                                                    console.log(staterr);
                                                }
                                                else{
                                                    // check achievements??
                                                    getProfileForAchievement(discordUserId, message, thankResponse)
                                                }
                                            })
                                        }
                                    }) 
                                }
                                else{
                                    profileDB.updateUserTacosThank(discordUserId, extraTacosFromItems, function(updateerr, updateResponse) {
                                        if (updateerr){
                                            console.log(updateerr);
                                        }
                                        else{
                                            console.log(updateResponse);
                                            experience.gainExperience(message, discordUserId, EXPERIENCE_GAINS.thank, thankResponse);
                                            //update statistic
                                            stats.statisticsManage(discordUserId, "thankcount", 1, function(staterr, statSuccess){
                                                if (staterr){
                                                    console.log(staterr);
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
                                        message.channel.send(message.author + " thanked " + mentionedUser.username + ", they received a taco! :taco:" + "you received `" + extraTacosFromItems + "` extra tacos");
                                    }
                                    else{
                                        message.channel.send(message.author + " thanked " + mentionedUser.username + ", they received a taco! :taco:");
                                    }
                                }
                            })
                        }else{
                            // six hours have not passed, tell the user they need to wait 
                            now = new Date(now.setMinutes(now.getMinutes() + minutesToRemove));
                            var numberOfHours = getDateDifference(thankResponse.data.lastthanktime, now, 2);
                            message.channel.send(message.author + " You are being too thankful! please wait `" + numberOfHours +"` ");
                        }
                    }
                })
            }
        });
    }
    else{
        //message.channel.send(message.author + " You must mention a user or a user that isn't you whom you want to thank!");
    }
}

module.exports.sorryCommand = function(message){
    // say sorry to somebody every 6 hours
    var discordUserId = message.author.id;
    var users  = message.mentions.users;
    var mentionedId;
    var mentionedUser;
    console.log(users);
    users.forEach(function(user){
        console.log(user.id);
        mentionedId = user.id;
        mentionedUser = user.username
    })

    if ( message.mentions.users.size > 0 && discordUserId != mentionedId ){
        profileDB.getUserProfileData( discordUserId, function(err, sorryResponse) {
            if(err){
                console.log("in error : " + err.code);
                // user doesn't exist
                if(err.code === 0){
                    // create new user
                    var now = new Date();
                    var threedaysAgo = new Date();
                    threedaysAgo = new Date(threedaysAgo.setHours(threedaysAgo.getHours() - 72));
                    var userData = {
                        discordId: discordUserId,
                        tacos: 1,
                        birthdate: "2001-10-05",
                        lastthanktime: threedaysAgo,
                        lastcooktime: threedaysAgo,
                        lastsorrytime: threedaysAgo,
                        lastscavangetime: threedaysAgo,
                        tacostands: 0,
                        welcomed: false,
                        lastpreparetime: threedaysAgo,
                        pickaxe: "none",
                        map: false,
                        phone: false
                    }
                    profileDB.createUserProfile(userData, function(createerr, createUserResponse){
                        if (createerr){
                            console.log(createerr); // cant create user RIP
                        }
                        else{
                            exports.sorryCommand(message);
                        }
                    }) 
                }
            }
            else{
                var userLevel = sorryResponse.data.level;
                wearStats.getUserWearingStats(message, discordUserId, userLevel, function(wearErr, wearRes){
                    if (wearErr){
                        
                    }else{
                        console.log(wearRes);
                        var minutesToRemove = wearStats.calculateMinutesReduced(wearRes, "sorry");
                        console.log("MINUTES TO REMOVE " + minutesToRemove);
                        // check six hours ago
                        var achievements = sorryResponse.data.achievements;
                        var now = new Date();
                        var sixHoursAgo = new Date();
                        ///////// CALCULATE THE MINUTES REDUCED HERE 
                        sixHoursAgo = new Date(sixHoursAgo.setHours(sixHoursAgo.getHours() - SORRY_COOLDOWN_HOURS));
                        // added the CDR
                        sixHoursAgo = new Date(sixHoursAgo.setMinutes(sixHoursAgo.getMinutes() + minutesToRemove));
                        if ( sixHoursAgo > sorryResponse.data.lastsorrytime ){
                            ///////// CALCULATE THE EXTRA TACOS HERE 
                            var extraTacosFromItems = wearStats.calculateExtraTacos(wearRes, "sorry"); // 0 or extra
                            
                            profileDB.updateUserTacos(mentionedId, 1, function(updateerr, updateResponse) {
                                if (updateerr){
                                    console.log(updateerr);
                                    // create mentioned user
                                    var mentionedData = initialUserProfile(mentionedId);
                                    mentionedData.tacos = mentionedData.tacos + 1
                                    profileDB.createUserProfile(mentionedData, function(createerr, createUserResponse){
                                        if (createerr){
                                            console.log(createerr); // cant create user RIP
                                        }
                                        else{
                                            message.channel.send(message.author + " apologized to " + mentionedUser + ", they received a taco! :taco:" + " cd reduction in minutes " + minutesToRemove + " " + (wearRes.sorryCommandCDRPercentage*100) + "%");
                                            experience.gainExperience(message, discordUserId, EXPERIENCE_GAINS.sorry , sorryResponse);
                                            stats.statisticsManage(discordUserId, "sorrycount", 1, function(staterr, statSuccess){
                                                if (staterr){
                                                    console.log(staterr);
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
                                            console.log(updateerr);
                                        }
                                        else{
                                            console.log(updateResponse);
                                            experience.gainExperience(message, discordUserId, EXPERIENCE_GAINS.sorry , sorryResponse);
                                            stats.statisticsManage(discordUserId, "sorrycount", 1, function(err, statSuccess){
                                                if (err){
                                                    console.log(err);
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
                                        message.channel.send(message.author + " apologized to " + mentionedUser + ", they received a taco! :taco:" + " " + "received `" + extraTacosFromItems + "` extra tacos");
                                    }else{
                                        message.channel.send(message.author + " apologized to " + mentionedUser + ", they received a taco! :taco:");
                                    }
                                }
                            })
                        }else{
                            // six hours have not passed, tell the user they need to wait 
                            now = new Date(now.setMinutes(now.getMinutes() + minutesToRemove));
                            var numberOfHours = getDateDifference(sorryResponse.data.lastsorrytime, now, 6);
                            message.channel.send(message.author + " You are being too apologetic! Please wait `" + numberOfHours +"` ");
                        }
                    }
                })
                
            }
        })
    }
    else{
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
        }
        else{
            // if user has enough tacos to purchase the stand, add 1 tree, subtract x tacos
            var achievements = buyStandResponse.data.achievements;
            var userTacoStands = 0;
            if (buyStandResponse.data.tacostands && buyStandResponse.data.tacostands > -1){
                userTacoStands = buyStandResponse.data.tacostands;
            }
            console.log(buyStandResponse.data.tacos);
            var standCost = BASE_TACO_COST + (userTacoStands * 25);
            if (buyStandResponse.data.tacos >= standCost){
                // purchaseStand
                var tacosSpent = standCost * -1
                profileDB.purchaseTacoStand(discordUserId, tacosSpent, buyStandResponse.data.tacostands, function(err, data){
                    if (err){
                        console.log(err);
                        // couldn't purchase stand
                    }
                    else{
                        message.channel.send(message.author + " Congratulations!, you have purchased a taco stand! :bus:");
                        experience.gainExperience(message, discordUserId, EXPERIENCE_GAINS.buyStand + (EXPERIENCE_GAINS.buyStandPerStand * userTacoStands) , buyStandResponse);
                        // check achievements??
                        var data = {}
                        data.achievements = achievements;
                        data.tacostands = userTacoStands + 1;
                        console.log(data);
                        achiev.checkForAchievements(discordUserId, data, message);
                            
                    }
                 })
            }
            else{
                // can't afford stand
                var standCost = BASE_TACO_COST + (userTacoStands * 25);
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
            profileDB.createUserProfile(userData, function(error, createUserResponse){
                if (error){
                    console.log(error); // cant create user RIP
                }
                else{
                    message.channel.send(message.author + " You can't prepare atm because you do not have taco stands!");
                }
            })
        }
        else{
            // get number of trees the user has
            // check lastprepare time
            var userLevel = prepareResponse.data.level;
            wearStats.getUserWearingStats(message, discordUserId, userLevel, function(wearErr, wearRes){
                if (wearErr){
                    
                }else{
                    var achievements = prepareResponse.data.achievements;
                    var now = new Date();
                    var threeDaysAgo = new Date();
                    ///////// CALCULATE THE MINUTES REDUCED HERE 
                    var minutesToRemove = wearStats.calculateMinutesReduced(wearRes, "prepare");
                    console.log("MINUTES TO REMOVE " + minutesToRemove);
                    threeDaysAgo = new Date(threeDaysAgo.setHours(threeDaysAgo.getHours() - PREPARE_COOLDOWN_HOURS));
                    threeDaysAgo = new Date(threeDaysAgo.setMinutes(threeDaysAgo.getMinutes() + minutesToRemove));

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
                                    soiledToTaco = soiledToTaco + 1;
                                }
                            }
        
                            ///////// CALCULATE THE EXTRA TACOS HERE 
                            var extraTacosFromItems = wearStats.calculateExtraTacos(wearRes, "prepare"); // 0 or extra

                            tacosToPrepare = tacosToPrepare + soiledToTaco;
                            profileDB.prepareTacos(discordUserId, tacosToPrepare + extraTacosFromItems, function(err, data){
                                if (err){
                                    console.log(err);
                                    // something happened
                                }
                                else{
                                    // update protection also
                                    var protection = prepareResponse.data.protect;
                                    profileDB.updateUserProtect(discordUserId, 2, protection, function(updateerr, updateResponse) {
                                        if (updateerr){
                                            console.log(updateerr);
                                        }
                                        else{
                                            console.log(updateResponse);
                                            
                                            if (extraTacosFromItems > 0){
                                                message.channel.send(message.author + " You have prepared `" + tacosToPrepare + "` tacos :taco:! `" + soiledToTaco +"` were from soiled crops. The tacos also come with `2` warranty protection" + " received `" + extraTacosFromItems + "` extra tacos");
                                            }else{
                                                message.channel.send(message.author + " You have prepared `" + tacosToPrepare + "` tacos :taco:! `" + soiledToTaco +"` were from soiled crops. The tacos also come with `2` warranty protection");
                                            }
                                            experience.gainExperience(message, discordUserId, EXPERIENCE_GAINS.prepare + (EXPERIENCE_GAINS.preparePerStand * userTacoStands) , prepareResponse);
                                            stats.statisticsManage(discordUserId, "maxextratacos", soiledToTaco, function(staterr, statSuccess){
                                                if (staterr){
                                                    console.log(staterr);
                                                }
                                                else{
                                                    // check achievements??
                                                    console.log(statSuccess);
                                                    // check achievements??
                                                    var data = {}
                                                    data.achievements = achievements;
                                                    data.maxextratacos = soiledToTaco;
                                                    console.log(data);
                                                    achiev.checkForAchievements(discordUserId, data, message);
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        }
                        else{
                            message.channel.send(message.author + " You do not have any stands to prepare tacos with!");
                        }
                    }
                    else{
                        now = new Date(now.setMinutes(now.getMinutes() + minutesToRemove));
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
    console.log(users);
    users.forEach(function(user){
        console.log(user.id);
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
                if(err.code === 0){
                    var now = new Date();
                    var threedaysAgo = new Date();
                    threedaysAgo = new Date(threedaysAgo.setHours(threedaysAgo.getHours() - 72));
                    var userData = {

                        discordId: mentionedId,
                        tacos: 2,
                        birthdate: "2001-10-05",
                        lastthanktime: threedaysAgo,
                        lastcooktime: threedaysAgo,
                        lastsorrytime: threedaysAgo,
                        lastscavangetime: threedaysAgo,
                        tacostands: 0,
                        welcomed: true,
                        lastpreparetime: threedaysAgo,
                        pickaxe: "none",
                        map: false,
                        phone: false
                    }
                    profileDB.createUserProfile(userData, function(err, createResponse){
                        if(err){
                            console.log(err);
                        }
                        else{
                            if (mentionedUser.id){
                                Last_Five_Welcomes.push(discordUserId);
                                if (Last_Five_Welcomes.length >= 5){
                                    Last_Five_Welcomes.shift();
                                }
                                message.channel.send(" Welcome! " + mentionedUser + " You now have " + userData.tacos + " tacos!")
                                stats.statisticsManage(discordUserId, "welcomecount", 1, function(err, statSuccess){
                                    if (err){
                                        console.log(err);
                                    }
                                    else{
                                        // check achievements??
                                        getProfileForAchievement(discordUserId, message)
                                    }
                                })
                            }
                        }
                    })
                }
            }
            else{
                // user exists, check if user has already been welcomed
                if ( !welcomeResponse.data.welcomed ){
                    profileDB.updateUserTacosWelcome(mentionedId, 1, function(err, updateResponse) {
                        if (err){
                            console.log(err);
                        }
                        else{
                            // send message that the user has 1 more taco
                            Last_Five_Welcomes.push(discordUserId);
                            if (Last_Five_Welcomes.length >= 5){
                                Last_Five_Welcomes.shift();
                            }
                            message.channel.send(mentionedUser + " Welcome! You now have " + (welcomeResponse.data.tacos + 2) + " tacos! :taco:");
                            stats.statisticsManage(discordUserId, "welcomecount", 1, function(err, statSuccess){
                                if (err){
                                    console.log(err);
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
    }
}

module.exports.giveCommand = function(message, giveTacoAmount){
    var discordUserId = message.author.id;
    var users  = message.mentions.users;
    var mentionedId;
    var mentionedUser;
    console.log("giveTacoAmount " + giveTacoAmount)
    console.log(users);
    users.forEach(function(user){
        console.log(user.id);
        mentionedId = user.id;
        mentionedUser = user
    })
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
    else{
        profileDB.getUserProfileData( discordUserId, function(err, giveResponse) {
            if(err){
                // user doesnt exist, 
                if(err.code === 0){
                    message.channel.send(message.author + " You have no tacos to give!");
                }
            }
            else{
                // check if user has enough tacos to give
                var achievements = giveResponse.data.achievements;
                if (giveResponse.data.tacos - giveTacoAmount >= 0 ){
                    console.log("have enough");
                    profileDB.getUserProfileData( mentionedId, function(mentionederr, giveMentionedResponse) {
                        if(mentionederr){
                            console.log(mentionederr);
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
                                tacostands: 0,
                                welcomed: false,
                                lastpreparetime: threedaysAgo,
                                pickaxe: "none",
                                map: false,
                                phone: false
                            }
                            profileDB.createUserProfile(userData, function(createerr, createResponse){
                                if(createerr){
                                    console.log(createerr);
                                }
                                else{
                                    console.log(createResponse);
                                    exports.giveCommand(message, giveTacoAmount);
                                }
                            })
                        }
                        else{
                            var initialTacoTax = Math.floor(giveTacoAmount * 0.1);
                            var tacoTax = initialTacoTax;
                            console.log(tacoTax);
                            if (initialTacoTax < 1){
                                tacoTax = 1;
                            }
                            if (initialTacoTax >= 1){
                                tacoTax = tacoTax + 1
                            }
                            var negativeGiveTacoAmount = giveTacoAmount * -1
                            console.log(negativeGiveTacoAmount);
                            profileDB.updateUserTacosGive(discordUserId, negativeGiveTacoAmount, function(givererr, giverUpdateResponse) {
                                if (givererr){
                                    console.log(givererr);
                                }
                                else{
                                    // 
                                    giveTacoAmount = giveTacoAmount - tacoTax;
                                    console.log(giveTacoAmount);
                                    profileDB.updateUserTacosGive(mentionedId, giveTacoAmount, function(receivererr, receiverUpdateResponse) {
                                        if (receivererr){
                                            console.log(receivererr);
                                        }
                                        else{
                                            // send message that the user has gotten tacos
                                            message.channel.send(message.author + " gifted " + mentionedUser + " `" + giveTacoAmount + "` tacos! :taco: and Bender kept `" + tacoTax + "` tacos for tax purposes." );
                                            stats.statisticsManage(discordUserId, "givecount", giveTacoAmount, function(err, statSuccess){
                                                if (err){
                                                    console.log(err);
                                                }
                                                else{
                                                    console.log(statSuccess);
                                                    // check achievements??
                                                    var data = {}
                                                    data.achievements = achievements;
                                                    data.givecount = giveTacoAmount;
                                                    console.log(data);
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
                    console.log('dont have enough tacos ')
                }
            }
        })
    }
}

module.exports.cookCommand = function(message){
    var discordUserId = message.author.id;
    var cookRoll = 2;
    // roll for cook
    var rolls = Math.floor(Math.random() * 100) + 1;
    if (rolls > 97){
        cookRoll = 7
    }
    else if(rolls > 85){
        cookRoll = 6
    }
    else if(rolls > 70){
        cookRoll = 5
    }
    else if(rolls > 50){
        cookRoll = 4
    }
    else if(rolls > 20 ){
        cookRoll = 3
    }
    else{
        cookRoll = 2
    }

    profileDB.getUserProfileData( discordUserId, function(err, cookResponse) {
        if(err){
            // user doesnt exist, they cannot cook
            var achievements = cookResponse.data.achievements;
            var now = new Date();
            var threedaysAgo = new Date();
            threedaysAgo = new Date(threedaysAgo.setHours(threedaysAgo.getHours() - 72));
            var userData = {
                discordId: mentionedId,
                tacos: cookRoll,
                birthdate: "2001-10-05",
                lastthanktime: threedaysAgo,
                lastcooktime: now,
                lastsorrytime: threedaysAgo,
                lastscavangetime: threedaysAgo,
                tacostands: 0,
                welcomed: false,
                lastpreparetime: threedaysAgo,
                pickaxe: "none",
                map: false,
                phone: false
            }
            profileDB.createUserProfile(userData, function(err, createUserResponse){
                if (err){
                    console.log(err); // cant create user RIP
                }
                else{
                    message.author + " Cooked `" + cookRoll + "` tacos! you now have `" + cookRoll + "` tacos :taco:"

                    var data = {}
                    data.achievements = achievements;
                    data.cookcount = cookRoll
                    console.log(data);
                    achiev.checkForAchievements(discordUserId, data, message);
                }
            }) 
        }
        else{

            var userLevel = cookResponse.data.level;
            wearStats.getUserWearingStats(message, discordUserId, userLevel, function(wearErr, wearRes){
                if (wearErr){
                    
                }else{
                    // check six hours ago
                    var minutesToRemove = wearStats.calculateMinutesReduced(wearRes, "cook");
                    console.log("MINUTES TO REMOVE " + minutesToRemove);

                    var achievements = cookResponse.data.achievements;
                    var now = new Date();
                    var threeDaysAgo = new Date();
                    ///////// CALCULATE THE MINUTES REDUCED HERE 
                    threeDaysAgo = new Date(threeDaysAgo.setHours(threeDaysAgo.getHours() - COOK_COOLDOWN_HOURS));

                    threeDaysAgo = new Date(threeDaysAgo.setMinutes(threeDaysAgo.getMinutes() + minutesToRemove));

                    if ( threeDaysAgo > cookResponse.data.lastcooktime ){
                        ///////// CALCULATE THE EXTRA TACOS HERE 
                        var extraTacosFromItems = wearStats.calculateExtraTacos(wearRes, "cook"); // 0 or extra

                        profileDB.updateUserTacosCook(discordUserId, cookRoll + extraTacosFromItems, function(err, updateResponse) {
                            if (err){
                                console.log(err);
                            }
                            else{
                                // send message that the user has 1 more taco
                                if (extraTacosFromItems > 0){
                                    message.channel.send(message.author + " Cooked `" + cookRoll + "` tacos! you now have `" + (cookResponse.data.tacos + cookRoll) + "` tacos :taco:" + " " + "received `" + extraTacosFromItems + "` extra tacos");
                                }else{
                                    message.channel.send(message.author + " Cooked `" + cookRoll + "` tacos! you now have `" + (cookResponse.data.tacos + cookRoll) + "` tacos :taco:" );
                                }
                                var data = {}
                                data.achievements = achievements;
                                data.cookcount = cookRoll
                                console.log(data);
                                achiev.checkForAchievements(discordUserId, data, message);
                                experience.gainExperience(message, discordUserId, EXPERIENCE_GAINS.cook , cookResponse);
                            }
                        })
                    }else{
                        // six hours have not passed, tell the user they need to wait 
                        now = new Date(now.setMinutes(now.getMinutes() + minutesToRemove));
                        var numberOfHours = getDateDifference(cookResponse.data.lastcooktime, now, 24);
                        message.channel.send(message.author + " You cannot cook tacos currently, Please wait `" + numberOfHours + "` ");
                    }
                }
            })
            
        }
    })
}

module.exports.throwCommand = function(message){
    console.log(message);
    var discordUserId = message.author.id;
    var users  = message.mentions.users;
    var userMentioned;
    var mentionedId;
    var mentionedUser;
    var mentionedDiscriminator;
    console.log(users);
    users.forEach(function(user){
        console.log(user.id);
        userMentioned = user;
        mentionedId = user.id;
        mentionedUser = user.username
        mentionedDiscriminator = user.discriminator;
    })
    // throw a taco at someone
    if ( message.mentions.users.size > 0 && discordUserId != mentionedId){
        // 
        profileDB.getUserProfileData( discordUserId, function(err, throwResponse) {
            if(err){
                // user doesnt exist, create their profile first
                if(err.code === 0){
                    // user doesn't exist
                    message.reply(" you do not have any tacos to throw!");
                }
            }
            else{
                // user exists, subtract 1 taco 
                var achievements = throwResponse.data.achievements;
                console.log("asdfasfsd " + throwResponse.data.tacos)
                if (throwResponse.data.tacos >= 1){
                    profileDB.updateUserTacosThrow(discordUserId, -1, function(err, updateResponse) {
                        if (err){
                            console.log(err);
                        }
                        else{
                            // send message that the user has 1 more taco
                            message.channel.send(message.author + " threw a taco at " + userMentioned + " :dizzy_face: :taco: :wave: :smiling_imp:");
                            // if they drop a taco someone else can pick it up
                            var poisonedTacoRoll = Math.floor(Math.random() * 100) + 1;
                            var poisonedTaco = false;
                            if (poisonedTacoRoll > 75){
                                poisonedTaco = true;
                            }
                            QueueOfTacosDropped.push({ droppedBy: mentionedId, cannotPickUp: discordUserId, poisoned: poisonedTaco })
                        
                            stats.statisticsManage(discordUserId, "throwntocount", 1, function(err, statSuccess){
                                if (err){
                                    console.log(err);
                                }
                                else{
                                    // check achievements??
                                    var data = {}
                                    data.achievements = achievements;
                                    console.log(data);
                                    achiev.checkForAchievements(discordUserId, data, message);
                                    stats.statisticsManage(mentionedId, "thrownatcount", 1, function(err, statSuccess){
                                        if (err){
                                            console.log(err);
                                        }
                                        else{
                                            // check achievements??
                                            var data = {}
                                            data.achievements = achievements;
                                            console.log(data);
                                            achiev.checkForAchievements(discordUserId, data, message);
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
    console.log(message);
    var discordUserId = message.author.id;
    var users  = message.mentions.users;
    var mentionedId;
    var mentionedUser;
    var mentionedUserAvatarURL;
    console.log(users);
    users.forEach(function(user){
        console.log(user.id);
        mentionedId = user.id;
        mentionedUser = user.username
        mentionedUserAvatarURL = user.avatarURL;
    })
    if ( message.mentions.users.size > 0 ){
        profileDB.getUserProfileData( mentionedId, function(err, profileResponse) {
            if(err){
                // user doesnt exist, create their profile first
                var userData = initialUserProfile(mentionedId);
                profileDB.createUserProfile(userData, function(error, createUserResponse){
                    if (error){
                        console.log(error); // cant create user RIP
                    }
                    else{
                        exports.profileCommand(message);
                    }
                })
            }
            else{
                var profileData = {}
                profileData.userName = mentionedUser;
                profileData.avatarURL = mentionedUserAvatarURL;
                profileData.userTacos = profileResponse.data.tacos;
                profileData.userTacoStands = profileResponse.data.tacostands ? profileResponse.data.tacostands : 0;
                profileData.userItems = "none";
                profileData.pasta = profileResponse.data.pasta;
                profileData.reputation = profileResponse.data.reputation;
                profileData.level = profileResponse.data.level ? profileResponse.data.level : 1;
                profileData.experience = profileResponse.data.experience ? profileResponse.data.experience : 0;
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
                else if (profileData.reputationStatus.toLowerCase() == "glorified"){
                    profileData.nextReputation = "glorified"
                }
                profileData.achievementString = achiev.achievementStringBuilder(profileResponse.data.achievements);
                if (profileResponse.data.pickaxe == "basic"){
                    
                    profileData.userItems = "Pickaxe :pick: \n"
                }
                else if(profileResponse.data.pickaxe == "improved"){
                    profileData.userItems = "Improved Pickaxe :small_blue_diamond::pick: \n"
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
                var userData = initialUserProfile(discordUserId);
                
                profileDB.createUserProfile(userData, function(error, createUserResponse){
                    if (error){
                        console.log(error); // cant create user RIP
                    }
                    else{
                        exports.profileCommand(message);
                    }
                })
            }
            else{
                var profileData = {}
                profileData.userName = message.author.username;
                profileData.avatarURL = message.author.avatarURL;
                profileData.userTacos = profileResponse.data.tacos;
                profileData.userTacoStands = profileResponse.data.tacostands ? profileResponse.data.tacostands : 0;
                profileData.userItems = "none";
                profileData.pasta = profileResponse.data.pasta;
                profileData.reputation = profileResponse.data.reputation;
                profileData.reputationStatus = profileResponse.data.repstatus;
                profileData.level = profileResponse.data.level ? profileResponse.data.level : 1;
                profileData.experience = profileResponse.data.experience ? profileResponse.data.experience : 0;
                profileData.nextLevelExp = Levels[profileData.level + 1];
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
                else if (profileData.reputationStatus.toLowerCase() == "glorified"){
                    profileData.nextReputation = "glorified"
                }
                profileData.achievementString = achiev.achievementStringBuilder(profileResponse.data.achievements);
                if (profileResponse.data.pickaxe == "basic"){
                    
                    profileData.userItems = "Pickaxe :pick: \n"
                }
                else if(profileResponse.data.pickaxe == "improved"){
                    profileData.userItems = "Improved Pickaxe :small_blue_diamond::pick: \n"
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

module.exports.xpCommand = function(message){
    var discordUserId = message.author.id;

    profileDB.getUserProfileData( discordUserId, function(err, profileResponse) {
        if(err){
            // user doesnt exist, create their profile first
            if(err.code === 0){
                // user doesnt exist
                var userData = initialUserProfile(discordUserId);
                profileDB.createUserProfile(userData, function(error, createUserResponse){
                    if (error){
                        console.log(error); // cant create user RIP
                    }
                    else{
                        exports.tacosCommand(message);
                    }
                })
            }
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
                var userData = initialUserProfile(discordUserId);
                profileDB.createUserProfile(userData, function(error, createUserResponse){
                    if (error){
                        console.log(error); // cant create user RIP
                    }
                    else{
                        exports.tacosCommand(message);
                    }
                })
            }
        }
        else{
            var profileData = {}
            profileData.userName = message.author.username;
            profileData.userTacos = profileResponse.data.tacos;
            tacoEmbedBuilder(message, profileData);
        }
    })
}

function tacoEmbedBuilder(message, profileData){
    const embed = new Discord.RichEmbed()
    .setAuthor(profileData.userName +"'s Tacos")
    .setColor(0x00AE86)
    .addField('Tacos  :taco:', profileData.userTacos, true)
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
                var userData = initialUserProfile(discordUserId);

                profileDB.createUserProfile(userData, function(error, createUserResponse){
                    if (error){
                        console.log(error); // cant create user RIP
                    }
                    else{
                        exports.tacoStandsCommand(message);
                    }
                })
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
    .setAuthor(profileData.userName +"'s Taco Stands")
    .setColor(0x00AE86)
    .addField('Taco Stands  :bus:', profileData.userTacoStands, true)

    message.channel.send({embed});
}

module.exports.buyPickaxeCommand = function(message){
    // purchase pickaxe
    var discordUserId = message.author.id

    profileDB.getUserProfileData( discordUserId, function(err, pickaxeResponse) {
        if(err){
            // user doesnt exist tell the user they should get some tacos
            message.channel.send(message.author + " You can't afford a stand atm!");
        }
        else{
            if (pickaxeResponse.data.pickaxe == "none"){
                if (pickaxeResponse.data.tacos >= PICKAXE_COST){
                    // purchaseStand
                    var tacosSpent = PICKAXE_COST * -1;
                    profileDB.purchasePickAxe(discordUserId, tacosSpent, function(err, data){
                        if (err){
                            console.log(err);
                            // couldn't purchase stand
                        }
                        else{
                            experience.gainExperience(message, discordUserId, EXPERIENCE_GAINS.buyPickaxe , pickaxeResponse);
                            message.channel.send(message.author + " Congratulations, you have purchased a pickaxe :pick:!");
                        }
                    })
                }
                else{
                    message.channel.send(message.author + " You cannot afford the Pickaxe");
                }
            }
            else if (pickaxeResponse.data.pickaxe == "basic"){
                if (pickaxeResponse.data.tacos >= IMPROVED_PICKAXE_COST){
                    // purchaseStand
                    var tacosSpent = IMPROVED_PICKAXE_COST * -1;
                    profileDB.purchasePickAxe(discordUserId, tacosSpent, function(err, data){
                        if (err){
                            console.log(err);
                            // couldn't purchase stand
                        }
                        else{
                            message.channel.send(message.author + " Congratulations, you have purchased an Improved Pickaxe :pick:!");
                        }
                    })
                }
                else{
                    message.channel.send(message.author + " You cannot afford the Improved Pickaxe");
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
    .addField('Bender Reputation :statue_of_liberty:', " **"+ profileData.reputationStatus +"** : " + profileData.reputation + " / " + REPUTATIONS[profileData.nextReputation] , true)
    if (profileData.petname){
        embed.addField('Pet', profileData.petname + " " + profileData.petemoji , true)
    }
    if (profileData.pasta && profileData.pasta.length > 0){
        embed.setDescription(profileData.pasta)
    }
    embed.addField('Items :shopping_bags:', profileData.userItems, true)
    .addField('Achievements :military_medal: ', profileData.achievementString, true)
    

    message.channel.send({embed});
}

function shopBuilder(message, shopData){
    var welcomeMessage = "Hey " + message.author.username + "! Welcome to Bender's shop."
    var tacoStandDescription = "Taco stands can be used to produce tacos based on the number of stands you have. \nYou can produce " + BASE_TACO_PREPARE + " per taco stand. \nThe cost of each additional stand will be higher - city tax bro. "
    var treeCost = BASE_TACO_COST + (shopData.userTacoCost * 25) + " :taco:"
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
    
    embed.addBlankField(true)
    .addBlankField(false)
    .addField('Pasta', ":spaghetti:", true)
    .addField('Description', pastaDescription, true)
    .addField('Cost', PASTA_COST + " :taco:", true)
    .addField('Command', config.commandString + "buyPasta", true)
    
    // allow for pet to be purchased
    if (shopData.repstatus && (shopData.repstatus.toLowerCase() == "liked" 
        || shopData.repstatus.toLowerCase() == "respected" 
        || shopData.repstatus.toLowerCase() == "admired" 
        || shopData.repstatus.toLowerCase() == "glorified") ){
        var petDescription = "Purchase a pet! Pets are always great companions to have. You may only have 1 pet, buying a new pet will replace the old one - current pets available: dog, cat, monkey, pig, rabbit";
        var petCost = PET_COST + " :taco:";
        embed.addBlankField(true)
        .addBlankField(false)
        .addField('Pet (Liked Reputation Only)', ":dog2:", true)
        .addField('Description', petDescription, true)
        .addField('Cost', petCost, true)
        .addField('Command', config.commandString + "buypet [kind of pet] [pet name]", true)
    }
    embed.addBlankField(false)
    .addField('Your current tacos', shopData.userTacos + " :taco:", false)
    .setTimestamp()
    message.channel.send({embed});
}

module.exports.shopCommand = function(message){
    var discordUserId = message.author.id;
    profileDB.getUserProfileData( discordUserId, function(err, shopResponse) {
        if(err){
            // user doesnt exist tell the user they should get some tacos
            var userData = initialUserProfile(discordUserId);
            profileDB.createUserProfile(userData, function(error, createUserResponse){
                if (error){
                    console.log(error); // cant create user RIP
                }
                else{
                    exports.shopCommand(message);
                }
            })
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
            shopBuilder(message, shopData);
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
    var nowPlusSeconds = new Date(nowPlusMinutes.setMinutes(nowPlusMinutes.getSeconds() + secondsToAdd));
    
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
// TODO: mission logic, casino logic, combine logic

module.exports.helpCommand = function(message){
    var commandsList = "List of commands \n ____________ \n "
    var profile = config.commandString + "profile - display users profile \n "
    var thank = config.commandString + "thank [user] - thank a user and they get 1 taco! \n "
    var sorry = config.commandString + "sorry [user] - say sorry to a user and they get 1 taco! \n "
    var welcome = config.commandString + "welcome [user] - welcome a user and they get 2 tacos! \n "
    var cook = config.commandString + "cook - cook some tacos! \n "
    var give = config.commandString + "give [user] number - give the mentioned user some number of tacos! \n "
    var shop = config.commandString + "shop - enter Benders shop! \n "
    var prepare = config.commandString + "prepare - prepare some tacos from your taco stands! \n "
    var throwTaco = config.commandString + "throw [user] - throw a taco at the mentioned user \n "
    var scavenge = config.commandString + "scavenge - use your pickaxe \n "
    var standings = config.commandString + "standings - show taco standings \n "
    var useItem = config.commandString + "use [item name] [user](if applicable) - uses an item \n "
    var slots = config.commandString + "slots [number] - play slots and bet [number] of tacos "
    //var commandsList = "```xl Uppercase lowercase 123 ```"
    var commandsList = "```css\n" + commandsList + profile + thank + sorry + welcome + cook + give + shop + prepare + throwTaco + scavenge + standings + useItem + slots+ "```";
    message.channel.send(commandsList);
}

module.exports.itemhelpCommand = function(message){
    var commandsList = "```List of commands \n ____________ \n "
    var puton = "-puton [1-3] [first word of item] - you will wear the item!\n"
    var takeoff = "-takeoff [1-3 - you will take off the item!\n"
    var wearing = "-wearing - list of all the items you are wearing, and a summary\n"
    var rules = " You can only wear 3 items MAX at a time, you cannot wear an item of the same item slot as another item. \nItem bonuses take effect after the number of hours the command they affect. \nItems must be taken off before putting on another item on the same slot. \nThe tag [ACTIVE] means the item is now affecting your commands!```"
    commandsList = commandsList + puton + takeoff + wearing + rules
    message.channel.send(commandsList);
}

function getProfileForAchievement(discordUserId, message, profileResponse){
    if (!profileResponse){
        profileDB.getUserProfileData(discordUserId, function(err, profileResponse){
            if (err){
                console.log(err);
            }
            else{
                var achievements = profileResponse.data.achievements;
                var data = {}
                data.achievements = achievements;
                console.log(data);
                achiev.checkForAchievements(discordUserId, data, message);
            }
        });
    }
    else{
        var achievements = profileResponse.data.achievements;
        var data = {}
        data.achievements = achievements;
        console.log(data);
        achiev.checkForAchievements(discordUserId, data, message);
    }
}

module.exports.raresCommand = function(message, args){
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
            console.log(err);
        }
        else{
            console.log(inventoryResponse.data);
            // get all the data for each item
            var itemsInInventoryCountMap = {};
            var itemsMapbyId = {};
            profileDB.getItemData(function(error, allItemsResponse){
                //console.log(allItemsResponse.data);
                for (var item in inventoryResponse.data){
                    var validItem = useItem.itemValidate(inventoryResponse.data[item]);
                    var notWearing = useItem.itemNotWearing(inventoryResponse.data[item])
                    if (!itemsInInventoryCountMap[inventoryResponse.data[item].itemid] 
                        && validItem && notWearing){
                        // item hasnt been added to be counted, add it as 1
                        itemsInInventoryCountMap[inventoryResponse.data[item].itemid] = 1;
                    }
                    else if (validItem && notWearing){
                        itemsInInventoryCountMap[inventoryResponse.data[item].itemid] = itemsInInventoryCountMap[inventoryResponse.data[item].itemid] + 1
                    }
                }
                //console.log(itemsInInventoryCountMap);
                for (var index in allItemsResponse.data){
                    itemsMapbyId[allItemsResponse.data[index].id] = allItemsResponse.data[index];
                }
                raresEmbedBuilder(message, itemsInInventoryCountMap, itemsMapbyId, includeDescriptions);

            })
        }
    })
}

function raresEmbedBuilder(message, itemsMap, allItems, long){
    // create a field for each item and add the count
    const embed = new Discord.RichEmbed()
    var inventoryString = "";
    for (var key in itemsMap) {
        if (itemsMap.hasOwnProperty(key)) {
            // 
            if (allItems[key].itemraritycategory == "rare"
                || allItems[key].itemraritycategory == "ancient"
                || allItems[key].itemraritycategory == "artifact"
                || allItems[key].itemraritycategory == "myth"){
                console.log(key + " " + allItems[key].itemname)
                var emoji = "";
                if (allItems[key].itemraritycategory === "artifact"){
                    emoji = ":small_orange_diamond::small_orange_diamond::small_orange_diamond: "
                }
                else if (allItems[key].itemraritycategory === "ancient"){
                    emoji = ":small_orange_diamond::small_orange_diamond: "
                }
                else if (allItems[key].itemraritycategory === "rare"){
                    emoji = ":small_orange_diamond: "
                }
                if (long){
                    embed.addField(emoji + " " + allItems[key].itemname, itemsMap[key] + " - " + allItems[key].itemslot + " - " + allItems[key].itemstatistics, true)
                }else{
                    inventoryString = emoji + "**"+allItems[key].itemname + "** - " +  itemsMap[key] + " - " + allItems[key].itemslot + "\n" + inventoryString;
                }
            }
        }
    }
    if (!long){
        embed.addField("Item Name  |  Count  |  Slot", inventoryString, true)
    }
    embed
    .setAuthor(message.author.username +"'s Inventory ")
    .setDescription( ":left_luggage:" )
    .setThumbnail(message.author.avatarURL)
    .setColor(0x06e8e8)
    message.channel.send({embed});
}

module.exports.inventoryCommand = function(message){
    // get all items for the discord id
    var discordUserId = message.author.id;
    profileDB.getUserItems(discordUserId, function(err, inventoryResponse){
        if (err){
            console.log(err);
        }
        else{
            console.log(inventoryResponse.data);
            // get all the data for each item
            var itemsInInventoryCountMap = {};
            var itemsMapbyId = {};
            profileDB.getItemData(function(error, allItemsResponse){
                if (error){
                    console.log(error);
                }
                else{
                    console.log("allitemsres " + allItemsResponse.data);
                    for (var item in inventoryResponse.data){
                        var validItem = useItem.itemValidate(inventoryResponse.data[item]);
                        if (!itemsInInventoryCountMap[inventoryResponse.data[item].itemid] 
                            && validItem ){
                            // item hasnt been added to be counted, add it as 1
                            itemsInInventoryCountMap[inventoryResponse.data[item].itemid] = 1;
                        }
                        else if (validItem){
                            itemsInInventoryCountMap[inventoryResponse.data[item].itemid] = itemsInInventoryCountMap[inventoryResponse.data[item].itemid] + 1
                        }
                    }
                    console.log(itemsInInventoryCountMap);
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
            if (allItems[key].itemraritycategory == "common" || allItems[key].itemraritycategory == "uncommon"){
                console.log(key + " " + allItems[key].itemname)
                var emoji = "";
                if (allItems[key].itemraritycategory === "artifact"){
                    emoji = ":small_orange_diamond::small_orange_diamond::small_orange_diamond: "
                }
                else if (allItems[key].itemraritycategory === "ancient"){
                    emoji = ":small_orange_diamond::small_orange_diamond: "
                }
                else if (allItems[key].itemraritycategory === "rare"){
                    emoji = ":small_orange_diamond: "
                }
                inventoryString = emoji + "**"+allItems[key].itemname + "** - " +  itemsMap[key] + " - " + allItems[key].itemslot +"\n" + inventoryString;
            }
        }
    }
    embed
    .addField("Item Name  |  Count  |  Slot", inventoryString, true)
    .setAuthor(message.author.username +"'s Inventory ")
    .setDescription( ":left_luggage:" )
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

    if (tacoRoll > SCAVENGE_TACO_FIND_CHANCE_HIGHER){
        tacosFound = 2;
    }
    else if(tacoRoll > SCAVENGE_TACO_FIND_CHANCE){
        tacosFound = 1
    }
    // only scavenge if the user has a pickaxe
    profileDB.getUserProfileData( discordUserId, function(error, getUserResponse) {
        if(error){
            console.log(error);
            // create user profile then send a message saying they need a pickaxe
            var userData = initialUserProfile(discordUserId);

            profileDB.createUserProfile(userData, function(error, createUserResponse){
                if (error){
                    console.log(error); // cant create user RIP
                }
                else{
                    message.channel.send(message.author + " You need a pickaxe!");
                }
            })
        }
        else if (getUserResponse.data.pickaxe && getUserResponse.data.pickaxe != "none"){
            // get all the possible items from items DB - Bad implementation but idgaf
            var userLevel = getUserResponse.data.level;
            wearStats.getUserWearingStats(message, discordUserId, userLevel, function(wearErr, wearRes){
                if (wearErr){
                    console.log(wearErr);
                }else{
                    console.log("asf " + wearRes);
                    var minutesToRemove = wearStats.calculateMinutesReduced(wearRes, "scavenge");
                    console.log("MINUTES TO REMOVE " + minutesToRemove);
                    //check for more than 1 hours
                    var now = new Date();
                    var oneHourAgo = new Date();
                    ///////// CALCULATE THE MINUTES REDUCED HERE 
                    oneHourAgo = new Date(oneHourAgo.setHours(oneHourAgo.getHours() - SCAVENGE_COOLDOWN_HOURS));
                    oneHourAgo = new Date(oneHourAgo.setMinutes(oneHourAgo.getMinutes() + minutesToRemove));

                    if ( oneHourAgo > getUserResponse.data.lastscavangetime ){
                        profileDB.getItemData(function(err, getItemResponse){
                            if (err){
                                console.log(err);
                            }
                            else{
                                var allItems = getItemResponse.data
                                var commonItems = [];
                                var uncommonItems = [];
                                var rareItems = [];
                                var ancientItems = [];
                                var artifactItems = [];
                                var mythItems = [];

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
                                // roll rarity, roll item from rarity
                                var gotUncommon = false;
                                var itemsObtainedArray = [];
                                var highestRarityFound = 1

                                for (var i = 0; i < rollsCount; i++){
                                    var rarityRoll = Math.floor(Math.random() * 10000) + 1;
                                    var rarityString = "";
                                    console.log(rarityRoll);
                                    if (!gotUncommon && rollsCount > 4){
                                        // guaranteed more than uncommon +
                                        rarityRoll = Math.floor(Math.random() * 1500) + 8501;
                                        gotUncommon = true;
                                    }
                                    else if(!gotUncommon && rollsCount > 3){
                                        // guaranteed uncommon +
                                        rarityRoll = Math.floor(Math.random() * 2000) + 8001;
                                        gotUncommon = true;
                                    }
                                    if (rarityRoll > 9995){
                                        rarityString = "artifact"
                                        var itemRoll = Math.floor(Math.random() * artifactItems.length);
                                        console.log(artifactItems[itemRoll]);
                                        itemsObtainedArray.push(artifactItems[itemRoll]);
                                        if (highestRarityFound <= 4){
                                            highestRarityFound = 5;
                                        }
                                    }
                                    else if(rarityRoll > 9975 && rarityRoll <= 9995){
                                        rarityString = "ancient"
                                        var itemRoll = Math.floor(Math.random() * ancientItems.length);
                                        console.log(ancientItems[itemRoll]);
                                        itemsObtainedArray.push(ancientItems[itemRoll])
                                        if (highestRarityFound <= 3){
                                            highestRarityFound = 4;
                                        }
                                    }
                                    else if(rarityRoll > 9850 && rarityRoll <= 9975){
                                        rarityString = "rare"
                                        var itemRoll = Math.floor(Math.random() * rareItems.length);
                                        console.log(rareItems[itemRoll]);
                                        itemsObtainedArray.push(rareItems[itemRoll]);
                                        if (highestRarityFound <= 2){
                                            highestRarityFound = 3;
                                        }
                                    }
                                    else if (rarityRoll > 8000 && rarityRoll <= 9850){
                                        rarityString = "uncommon"
                                        var itemRoll = Math.floor(Math.random() * uncommonItems.length);
                                        console.log(uncommonItems[itemRoll]);
                                        itemsObtainedArray.push( uncommonItems[itemRoll] );
                                        if (highestRarityFound <= 1){
                                            highestRarityFound = 2;
                                        }
                                    }
                                    else {
                                        rarityString = "common"
                                        var itemRoll = Math.floor(Math.random() * commonItems.length);
                                        console.log(commonItems[itemRoll]);
                                        itemsObtainedArray.push( commonItems[itemRoll] );
                                    }
                                }
                                // send the items to be written all at once
                                addToUserInventory(discordUserId, itemsObtainedArray);

                                // send message of all items obtained
                                scavengeEmbedBuilder(message, itemsObtainedArray, tacosFound);
                                // update lastscavengetime
                                profileDB.updateLastScavengeTime(discordUserId, function(updateLSErr, updateLSres){
                                    if(updateLSErr){
                                        console.log(updateLSErr);
                                    }
                                    else{
                                        console.log(updateLSres);
                                        experience.gainExperience(message, discordUserId, EXPERIENCE_GAINS.scavenge , getUserResponse);
                                    }
                                })
                                // add the tacos to user
                                ///////// CALCULATE THE EXTRA TACOS HERE 
                                var extraTacosFromItems = wearStats.calculateExtraTacos(wearRes, "scavenge"); // 0 or extra
                                if (extraTacosFromItems > 0){
                                    message.channel.send(message.author + " received `" + extraTacosFromItems + "` for scavenging! :taco:" + "received `" + extraTacosFromItems + "` extra tacos" );
                                }
                                profileDB.updateUserTacos(discordUserId, tacosFound + extraTacosFromItems, function(updateLSErr, updateLSres){
                                    if(updateLSErr){
                                        console.log(updateLSErr);
                                    }
                                    else{
                                        console.log(updateLSres);
                                        // add to statistics
                                        var achievements = getUserResponse.data.achievements;
                                        stats.statisticsManage(discordUserId, "scavengecount", 1, function(err, statSuccess){
                                            if (err){
                                                console.log(err);
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
                                                console.log(data);
                                                achiev.checkForAchievements(discordUserId, data, message);
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    }
                    else{
                        now = new Date(now.setMinutes(now.getMinutes() + minutesToRemove));
                        var numberOfHours = getDateDifference(getUserResponse.data.lastscavangetime, now, 1);
                        message.channel.send(message.author + " You have scavenged too recently! please wait `" + numberOfHours +"` ");
                    }
                }
            })
            
        }
        else{
            message.channel.send(message.author + " You need a pickaxe!");
        }
    })
}

function scavengeEmbedBuilder(message, itemsScavenged, tacosFound){
    // create a quoted message of all the items
    var itemsMessage = ""
    for (var item in itemsScavenged){
        itemsMessage = itemsMessage + "[**" + itemsScavenged[item].itemraritycategory +"**] " + "**"  + itemsScavenged[item].itemname + "** - " + itemsScavenged[item].itemdescription + ", " +
        itemsScavenged[item].itemslot + ", " +itemsScavenged[item].itemstatistics + " \n";
    }
    if (tacosFound > 0){
        itemsMessage = itemsMessage + "**Tacos Found**: :taco: " + tacosFound;
    }

    const embed = new Discord.RichEmbed()
    .setAuthor(message.author.username +"'s Scavenge ")
    .addField("Items found:", itemsMessage, true)
    .setDescription( ":pick:" )
    .setThumbnail(message.author.avatarURL)
    .setColor(0xbfa5ff)
    message.channel.send({embed});
}

function addToUserInventory(discordUserId, items){
    profileDB.addNewItemToUser(discordUserId, items, function(itemError, itemAddResponse){
        if (itemError){
            console.log(itemError);
        }
        else{
            console.log(itemAddResponse);
        }
    })
}

module.exports.slotsCommand = function(message, tacosBet){
    var discordUserId = message.author.id;
    // check that tacosBet is less than users tacos
    var bet = Math.floor(parseInt(tacosBet));
    if (bet > 1 ){
        profileDB.getUserProfileData(discordUserId, function(getProfileError, getProfileResponse){
            if (getProfileError){
                console.log(getProfileError);
            }
            else{
                if (getProfileResponse.data.tacos >= bet){
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

                    profileDB.updateUserTacos(discordUserId, tacosWon, function(updateErr, updateRes){
                        if (updateErr){
                            console.log(updateErr);
                        }
                        else{
                            console.log(updateRes);
                            stats.statisticsManage(discordUserId, "slotscount", 1, function(staterr, statSuccess){
                                if (staterr){
                                    console.log(staterr);
                                }
                                else{
                                    // check achievements??
                                    getProfileForAchievement(discordUserId, message, getProfileResponse)
                                }
                            })
                        }
                    })
                    slotsEmbedBuilder(emojisRolled, tacosWon, message);
                }
                else{
                    message.channel.send(message.author + " You don't have enough tacos!");
                }
            }
        })
    }
    else{
        message.channel.send(message.author + " You must bet more than 1 taco when using slots!");
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

function slotsEmbedBuilder(emojisRolled, tacosWon, message){

    const embed = new Discord.RichEmbed()
    .setColor(0xff9c4c)
    embed.addField("Taco Slots", emojisRolled[0] + " " + emojisRolled[1] + " " +  emojisRolled[2] , false)
    if (tacosWon > 0){
        embed
        .addField('You win!', tacosWon + " :taco: tacos won" , true)
    }
    message.channel.send({embed});
}

// by discordUserId
var challengesHappening = {};

module.exports.gameCommand = function(message){

    var discordUserId = message.author.id;
    var users  = message.mentions.users;
    var mentionedId;
    var mentionedUser;
    console.log(users);
    users.forEach(function(user){
        console.log(user.id);
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


module.exports.toplistCommand = function(message, listOfUsers){
    // query for top 10 then build the embed for top ten users
    profileDB.getToplistUsers(function(error, toplistResponse){
        if (error){
            console.log(error);
        }
        else{
            //create embed
            console.log(toplistResponse);
            // create the string
            var toplistMap = {};
            var toplistCount = 1;
            for (var index in toplistResponse.data){
                if (toplistCount < 10){
                    // TODO: get a new batch until we have 9 users
                    var user = toplistResponse.data[index]
                    console.log(user);
                    var toplistUser = listOfUsers.get(user.discordid)
                    console.log(toplistUser);
                    if (!toplistUser){
                        // user is not on the server currently - just skip them
                        continue;
                    }
                    var toplistUsername = toplistUser.username;
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
    console.log(topXpString);
    const embed = new Discord.RichEmbed()
    .setTitle("Top List Standings :trident:")
    .setColor(0xe521ff)
    for (var key in topXpString) {
        if (topXpString.hasOwnProperty(key)) {
            embed.addField("#" + key + ": `" + topXpString[key].username+"`", "LVL:  **" +topXpString[key].level + "** XP:  **" + topXpString[key].experience + "**", true)
        }
    }

    //.addField('Top Ten Tacos:', topTenString, true)
    message.channel.send({embed});
}

module.exports.standingsCommand = function(message, listOfUsers){
    // query for top 10 then build the embed for top ten users
    profileDB.getTopTenTacoUsers(function(error, topTenResponse){
        if (error){
            console.log(error);
        }
        else{
            //create embed
            console.log(topTenResponse);
            // create the string
            var topTenMap = {};
            var topTenCount = 1;
            for (var index in topTenResponse.data){
                if (topTenCount < 10){
                    // TODO: get a new batch until we have 9 users
                    var user = topTenResponse.data[index]
                    console.log(user);
                    var topTenUser = listOfUsers.get(user.discordid)
                    console.log(topTenUser);
                    if (!topTenUser){
                        // user is not on the server currently - just skip them
                        continue;
                    }
                    var topTenUsername = topTenUser.username;
                    var topTenTacos = user.tacos;
                    topTenMap[topTenCount] = {username: topTenUsername, tacos: topTenTacos}
                    topTenCount++;
                }
            }
            topTenEmbedBuilder(topTenMap, message);
        }
    })
}

function topTenEmbedBuilder(topTenString, message){
    console.log(topTenString);
    const embed = new Discord.RichEmbed()
    .setTitle("Taco Standings :taco:")
    .setColor(0xe521ff)
    for (var key in topTenString) {
        if (topTenString.hasOwnProperty(key)) {
            embed.addField("#" + key + ": `" + topTenString[key].username+"`", topTenString[key].tacos, true)
        }
    }

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
        tacostands: 0,
        welcomed: false,
        lastpreparetime: threedaysAgo,
        pickaxe: "none",
        map: false,
        phone: false
    }
    return userData;
}

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
            profileDB.updateUserTacos(discordUserId, -1, function(updateErr, updateRes){
                if (updateErr){
                    // TODO: create user profile
                    console.log(updateErr)
                }
                else{
                    QueueOfTacosDropped.splice(indexOfQueue, 1);
                    stats.statisticsManage(discordUserId, "poisonedtacoscount", 1, function(staterr, statSuccess){
                        if (staterr){
                            console.log(staterr);
                        }
                        else{
                            // check achievements??
                            getProfileForAchievement(discordUserId, message) // FIX THIS SHIT
                        }
                    })
                    message.channel.send(message.author + " picked up a taco from the ground :taco: but it was poisoned.. :nauseated_face: you ate a taco to cure your sickness.");
                }
            })
        }
        else{
            // update user tacos
            
            profileDB.updateUserTacos(discordUserId, 1, function(updateErr, updateRes){
                if (updateErr){
                    // TODO: create user profile
                    console.log(updateErr)
                }
                else{
                    QueueOfTacosDropped.splice(indexOfQueue, 1);
                    stats.statisticsManage(discordUserId, "tacospickedup", 1, function(staterr, statSuccess){
                        if (staterr){
                            console.log(staterr);
                        }
                        else{
                            // check achievements??
                            getProfileForAchievement(discordUserId, message) // FIX THSI SHIT
                        }
                    })
                    message.channel.send(message.author + " picked up a taco from the ground :taco:");
                }
            })
        }
    }
    else{
        message.channel.send("There are no tacos for you to pick up.. ");
    }
}

module.exports.buypetCommand = function(message, args){
    console.log(args);
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
                        console.log(err);
                    }
                    else{

                        if (buyPetResponse.data.repstatus && (buyPetResponse.data.repstatus.toLowerCase() == "liked" 
                            || buyPetResponse.data.repstatus.toLowerCase() == "respected" 
                            || buyPetResponse.data.repstatus.toLowerCase() == "admired" 
                            || buyPetResponse.data.repstatus.toLowerCase() == "glorified") ){
                            // if user has enough tacos to purchase the stand, add 1 tree, subtract x tacos
                            var achievements = buyPetResponse.data.achievements;
                            var userTacos = buyPetResponse.data.tacos;
                            if (userTacos >= PET_COST){
                                if (PETS_AVAILABLE[pet] != undefined){
                                    // can afford the pet update user pet, take away tacos.
                                    var threedaysAgo = new Date();
                                    threedaysAgo = new Date(threedaysAgo.setHours(threedaysAgo.getHours() - 72));
                                    profileDB.updateUserPet(discordUserId, pet, petName, threedaysAgo, function( petError, petResponse){
                                        if (petError){
                                            console.log(petError);
                                        }
                                        else{
                                            // take away tacos from user
                                            profileDB.updateUserTacos(discordUserId, (PET_COST * -1), function(updateErr, updateRes){
                                                if (updateErr){
                                                    // TODO: create user profile
                                                    console.log(updateErr)
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

module.exports.fetchCommand = function(message, args){
    console.log(args);
    var discordUserId = message.author.id;

    // the pet has gone to fetch, get taco amount = their fetch
    profileDB.getUserProfileData(discordUserId, function(fetchError, fetchResponse){
        if (fetchError){
            console.log(fetchError);
        }
        else{
            var userLevel = fetchResponse.data.level;
            wearStats.getUserWearingStats(message, discordUserId, userLevel, function(wearErr, wearRes){
                if (wearErr){
                    
                }else{
                    var userPet = fetchResponse.data.pet;
                    var userPetName = fetchResponse.data.petname;
                    var now = new Date();
                    if (userPet){
                        var minutesToRemove = wearStats.calculateMinutesReduced(wearRes, "fetch");
                        console.log("MINUTES TO REMOVE " + minutesToRemove);

                        var cooldownDate = new Date();
                        cooldownDate = new Date(cooldownDate.setHours(cooldownDate.getHours() - PETS_AVAILABLE[userPet].cooldown));
                        ///////// CALCULATE THE MINUTES REDUCED HERE 
                        cooldownDate = new Date(cooldownDate.setMinutes(cooldownDate.getMinutes() + minutesToRemove));

                        if (!fetchResponse.data.lastfetchtime || ( cooldownDate > fetchResponse.data.lastfetchtime )){
                            // fetch whatever and then set lastfetchtime to now
                            var fetchTacos = PETS_AVAILABLE[userPet].fetch;
                            ///////// CALCULATE THE EXTRA TACOS HERE 
                            var extraTacosFromItems = wearStats.calculateExtraTacos(wearRes, "fetch"); // 0 or extra

                            profileDB.updateUserTacosFetch(discordUserId, fetchTacos + extraTacosFromItems, function(err, updateResponse) {
                                if (err){
                                    console.log(err);
                                }
                                else{
                                    experience.gainExperience(message, discordUserId, (EXPERIENCE_GAINS.perFetchCd * PETS_AVAILABLE[userPet].fetch) , fetchResponse);
                                    // user's pet fetched some tacos
                                    if (extraTacosFromItems > 0){
                                        message.channel.send("**" + userPetName + "** fetched:` " + fetchTacos + "` tacos :taco: \n" + PETS_AVAILABLE[userPet].emoji + " " + PETS_AVAILABLE[userPet].speak   + + "you received `" + extraTacosFromItems + "` extra tacos");
                                    }else{
                                        message.channel.send("**" + userPetName + "** fetched:` " + fetchTacos + "` tacos :taco: \n" + PETS_AVAILABLE[userPet].emoji + " " + PETS_AVAILABLE[userPet].speak);
                                    }
                                }
                            })
                        }
                        else{
                            console.log("cd " + PETS_AVAILABLE[userPet].cooldown)
                            now = new Date(now.setMinutes(now.getMinutes() + minutesToRemove));
                            var numberOfHours = getDateDifference(fetchResponse.data.lastfetchtime, now, PETS_AVAILABLE[userPet].cooldown);
                            message.channel.send(message.author + " **" + userPetName + "** needs to rest and cannot fetch currently, Please wait `" + numberOfHours + "` ");
                        }
                    }
                    else{
                        // user doesnt have a pet
                        console.log("doesnt have pet")
                    }
                }
            })
        }
    })
}

module.exports.useCommand = function(message, args){
    // the use command will obtain args[1] as the name of the item
    // args[2] as the number of the item that will be used
    // and a mentioned user if there is one
    console.log(args);
    var discordUserId = message.author.id;
    var users  = message.mentions.users;
    var mentionedId;
    var mentionedUser;
    var mentionedUserName;
    console.log(users);
    users.forEach(function(user){
        console.log(user.id);
        mentionedId = user.id;
        mentionedUser = user
        mentionedUserName = user.username;
    })
    if (args && args.length > 1 && args[1].toLowerCase() == "rock"){
        if (mentionedUser && !mentionedUser.bot && mentionedId != message.author.id){
            // use rock
            profileDB.getUserItems(discordUserId, function(error, inventoryResponse){
                if (error){
                    console.log(error);
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
                        if (!itemsInInventoryCountMap[inventoryResponse.data[item].itemid] && validItem){
                            // item hasnt been added to be counted, add it as 1
                            itemsInInventoryCountMap[inventoryResponse.data[item].itemid] = 1;

                            if (inventoryResponse.data[item].itemid == ROCK_ITEM_ID){
                                // make this the rockToUse
                                rockToUse = inventoryResponse.data[item];
                            }
                        }
                        else if (validItem){
                            itemsInInventoryCountMap[inventoryResponse.data[item].itemid] = itemsInInventoryCountMap[inventoryResponse.data[item].itemid] + 1
                        }
                    }
                    console.log(itemsInInventoryCountMap);
                    if (itemsInInventoryCountMap[ROCK_ITEM_ID] && itemsInInventoryCountMap[ROCK_ITEM_ID] > 0){
                        // user has this many rocks if greater than 0 then able to throw rock
                        console.log(itemsInInventoryCountMap[ROCK_ITEM_ID]);
                        useItem.useRock(message, mentionedId, rockToUse, function(throwRockError, throwRes){
                            if (throwRockError){
                                console.log(throwRockError);
                            }
                            else{
                                console.log(throwRes);
                                if (throwRes == "success"){
                                    message.channel.send( message.author + " threw a rock at " + mentionedUserName + ", they became dizzy and dropped `1` taco :taco:");
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
                                    experience.gainExperience(message, discordUserId, EXPERIENCE_GAINS.useCommonItem);
                                    stats.statisticsManage(discordUserId, "rocksthrown", 1, function(staterr, statSuccess){
                                        if (staterr){
                                            console.log(staterr);
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
                        message.channel.send("dont have enough rocks to throw...");
                    }
                }
            })
        }
        else{
            message.channel.send("mention a user to throw a rock at, you cannot throw rocks at bots or yourself...");
        }
    }
    else if(args && args.length > 1 && args[1].toLowerCase() == "pieceofwood"){
        // use pieces of wood - protect against rocks being thrown at you (uses 6 pieces, protects against 3)
        profileDB.getUserItems(discordUserId, function(error, inventoryResponse){
            if (error){
                console.log(error);
            }
            else{
                 // check the user has enough pieces of wood
                 // map of user's inventory
                var itemsInInventoryCountMap = {};
                // array of item objects for using piece of wood
                var piecesOfWoodToUse = [];
                //console.log(allItemsResponse.data);
                for (var item in inventoryResponse.data){
                    // check the rock hasnt been used
                    var validItem = useItem.itemValidate(inventoryResponse.data[item]);
                    if (!itemsInInventoryCountMap[inventoryResponse.data[item].itemid] && validItem){
                        // item hasnt been added to be counted, add it as 1
                        itemsInInventoryCountMap[inventoryResponse.data[item].itemid] = 1;

                        if (inventoryResponse.data[item].itemid == PIECE_OF_WOOD_ITEM_ID && piecesOfWoodToUse.length <= 5){
                            // make this the pieceOfWoodToUse
                            piecesOfWoodToUse.push(inventoryResponse.data[item]);
                        }
                    }
                    else if (validItem){
                        itemsInInventoryCountMap[inventoryResponse.data[item].itemid] = itemsInInventoryCountMap[inventoryResponse.data[item].itemid] + 1;
                        if (inventoryResponse.data[item].itemid == PIECE_OF_WOOD_ITEM_ID && piecesOfWoodToUse.length < 5){
                            // make this the pieceOfWoodToUse
                            piecesOfWoodToUse.push(inventoryResponse.data[item]);
                        }
                    }
                }

                console.log(itemsInInventoryCountMap);
                console.log(piecesOfWoodToUse.length);
                // 
                if (piecesOfWoodToUse.length == 5){
                    // able to use those 5 pieces
                    useItem.usePieceOfWood(message, discordUserId, piecesOfWoodToUse, function(useError, useRes){
                        if (useError){
                            // couldnt update the user protect
                            console.log(useError);
                        }
                        else{
                            console.log(useRes);
                            var timeout = setTimeout (function(){ 
                                experience.gainExperience(message, discordUserId, EXPERIENCE_GAINS.useCommonItemFive);
                            }, 1000);
                            message.channel.send(message.author + " has built a fence, counts as `2` protection points");
                        }
                    });
                }
                else{
                    message.channel.send(message.author + " you need at least `5` pieces of wood to build a fence");
                }
            }
        })
    }
    else if (args && args.length > 1 && args[1].toLowerCase() == "terrycloth"){
        // create a rare item (chance) if not then receive tacos
        profileDB.getUserItems(discordUserId, function(error, inventoryResponse){
            if (error){
                console.log(error);
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
                        console.log(itemDataError);
                    }
                    else{
                        //console.log(allItemsResponse.data);
                        for (var item in inventoryResponse.data){
                            // check the rock hasnt been used
                            var validItem = useItem.itemValidate(inventoryResponse.data[item]);
                            if (!itemsInInventoryCountMap[inventoryResponse.data[item].itemid] && validItem){
                                // item hasnt been added to be counted, add it as 1
                                itemsInInventoryCountMap[inventoryResponse.data[item].itemid] = 1;

                                if (inventoryResponse.data[item].itemid == TERRY_CLOTH_ITEM_ID && terryClothToUse.length <= 5){
                                    // make this the terry cloth use
                                    terryClothToUse.push(inventoryResponse.data[item]);
                                }
                            }
                            else if (validItem){
                                itemsInInventoryCountMap[inventoryResponse.data[item].itemid] = itemsInInventoryCountMap[inventoryResponse.data[item].itemid] + 1;
                                if (inventoryResponse.data[item].itemid == TERRY_CLOTH_ITEM_ID && terryClothToUse.length < 5){
                                    // make this the terry cloth use
                                    terryClothToUse.push(inventoryResponse.data[item]);
                                }
                            }
                        }

                        console.log(itemsInInventoryCountMap);
                        for (var index in allItemsResponse.data){
                            itemsMapbyId[allItemsResponse.data[index].id] = allItemsResponse.data[index];
                            console.log(allItemsResponse.data[index]);
                            if (allItemsResponse.data[index].itemraritycategory == "rare"){
                                // add to list of rares
                                listOfRares.push(allItemsResponse.data[index]);
                            }
                        }
                        console.log(terryClothToUse.length);
                        // 
                        if (terryClothToUse.length == 5){
                            // able to use those 20 pieces
                            useItem.useTerryCloth(message, discordUserId, terryClothToUse, listOfRares, function(useError, useRes){
                                if (useError){
                                    // couldnt update the user protect
                                    console.log(useError);
                                }
                                else{
                                    console.log(useRes[0]);
                                    if (useRes.length && useRes.length > 0 && useRes[0].itemname){
                                        message.channel.send(message.author + " has tailored a **" + useRes[0].itemname + "** -" + "`" + useRes[0].itemdescription + ", " + useRes[0].itemslot + ", " + useRes[0].itemstatistics + "`");
                                    }
                                    else if (useRes == 5){
                                        message.channel.send(message.author + " tailored something that Bender really likes, Bender gave you `5` tacos :taco:");
                                    }
                                    else if (useRes == 2){
                                        message.channel.send(message.author + " tailored something that Bender likes, Bender gave you `2` tacos :taco:");
                                    }
                                    var timeout = setTimeout (function(){ 
                                        experience.gainExperience(message, discordUserId, EXPERIENCE_GAINS.useCommonItemFive);
                                        stats.statisticsManage(discordUserId, "tailorcount", 1, function(staterr, statSuccess){
                                            if (staterr){
                                                console.log(staterr);
                                            }
                                            else{
                                                // check achievements??
                                                console.log(statSuccess);
                                                getProfileForAchievement(discordUserId, message) 
                                            }
                                        })
                                    }, 1000);
                                    
                                    
                                }
                            });
                        }
                        else{
                            message.channel.send(message.author + " you need at least `5` terry cloths to tailor some clothes");
                        }
                    }
                })
            }
        })
    }

    
    else if (args && args.length > 1 && args[1].toLowerCase() == "sodacan"){
        // recycle for an item only obtainable by recycling - reputation with Bender allows u to shop for
        // 50 - pet, 175 - 20% reduced price benders shop, 400 - 50 tacos (casserole, triple cooked tacos), 1000 (server title on profile, roll one of the rarest items)

        profileDB.getUserItems(discordUserId, function(error, inventoryResponse){
            if (error){
                console.log(error);
            }
            else{
                var itemsInInventoryCountMap = {};
                // array of item objects for using sodacan
                var sodaCanToUse;
                for (var item in inventoryResponse.data){
                    // check the rock hasnt been used
                    var validItem = useItem.itemValidate(inventoryResponse.data[item]);
                    if (!itemsInInventoryCountMap[inventoryResponse.data[item].itemid] && validItem){
                        // item hasnt been added to be counted, add it as 1
                        itemsInInventoryCountMap[inventoryResponse.data[item].itemid] = 1;

                        if (inventoryResponse.data[item].itemid == SODA_CAN_ITEM_ID){
                            // make this the soda can use
                            sodaCanToUse = inventoryResponse.data[item];
                        }
                    }
                    else if (validItem){
                        itemsInInventoryCountMap[inventoryResponse.data[item].itemid] = itemsInInventoryCountMap[inventoryResponse.data[item].itemid] + 1;
                        if (inventoryResponse.data[item].itemid == SODA_CAN_ITEM_ID && !sodaCanToUse){
                            // make this the soda can use
                            sodaCanToUse = inventoryResponse.data[item];
                        }
                    }
                }

                // use soda can
                if (sodaCanToUse){
                    // able to use soda can
                    useItem.useSodaCan(message, discordUserId, sodaCanToUse, function(useError, useRes){
                        if (useError){
                            console.log(useError);
                            message.channel.send(useError);
                        }
                        else{
                            console.log(useRes);
                            var timeout = setTimeout (function(){ 
                                experience.gainExperience(message, discordUserId, EXPERIENCE_GAINS.useCommonItem);
                            }, 1000);
                            
                            message.channel.send(message.author + " recycled a soda can, you have gained `1` reputation with Bender.\n`" + message.author.username + "'s Current reputation " + useRes.repNumber + ", Status: " + useRes.repStatus + "`")
                        }
                    })
                }
                else{
                    message.channel.send(message.author + " you do not have any soda cans to recycle..")
                }
            }
        })
    }
    
    else if (args && args.length > 1 && args[1].toLowerCase() == "soil"){
        // soil your land -  bender seeds ur soil - use before preparing to get + 1 more taco per soil used

        // get inventory and get the soil that will be used
        // add it to user profile as soil to be used on next prepare
        // chance of soil giving extra tacos is 50%
        // add as extra tacos on user profile

        profileDB.getUserItems(discordUserId, function(error, inventoryResponse){
            if (error){
                console.log(error);
            }
            else{
                var itemsInInventoryCountMap = {};
                // array of item objects for using soil
                var soilToUse;
                for (var item in inventoryResponse.data){
                    // check the rock hasnt been used
                    var validItem = useItem.itemValidate(inventoryResponse.data[item]);
                    if (!itemsInInventoryCountMap[inventoryResponse.data[item].itemid] && validItem){
                        // item hasnt been added to be counted, add it as 1
                        itemsInInventoryCountMap[inventoryResponse.data[item].itemid] = 1;

                        if (inventoryResponse.data[item].itemid == SOIL_ITEM_ID){
                            // make this the soda can use
                            soilToUse = inventoryResponse.data[item];
                        }
                    }
                    else if (validItem){
                        itemsInInventoryCountMap[inventoryResponse.data[item].itemid] = itemsInInventoryCountMap[inventoryResponse.data[item].itemid] + 1;
                        if (inventoryResponse.data[item].itemid == SOIL_ITEM_ID && !soilToUse){
                            // make this the soda can use
                            soilToUse = inventoryResponse.data[item];
                        }
                    }
                }

                // use soil
                if (soilToUse){
                    // able to use soil
                    useItem.useSoil(message, discordUserId, soilToUse, function(useError, useRes){
                        if (useError){
                            console.log(useError);
                            message.channel.send(useError);
                        }
                        else{
                            console.log(useRes);
                            var timeout = setTimeout (function(){ 
                                experience.gainExperience(message, discordUserId, EXPERIENCE_GAINS.useCommonItem);
                                stats.statisticsManage(discordUserId, "soilcount", 1, function(staterr, statSuccess){
                                    if (staterr){
                                        console.log(staterr);
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
                else{
                    message.channel.send(message.author + " you do not have any soil to use..")
                }
            }
        })
    }
}

/*
module.exports.combineCommand = function(message, args){
    // combine certain things (only terry cloth, and soil for now?)
    console.log(args);
    var discordUserId = message.author.id;
    var users  = message.mentions.users;
    var mentionedId;
    var mentionedUser;
    var mentionedUserName;
    console.log(users);
    users.forEach(function(user){
        console.log(user.id);
        mentionedId = user.id;
        mentionedUser = user
        mentionedUserName = user.username;
    })

    // combine rock for boulder, 5 rares to make 1 improved, 5 improved to make 1 refined
    // combine 2 ancients to make 1 improved ancients, and 2 improved to make 1 refined
    // combine 2 diff artifacts to make a myth item
    // combine different rares to make something else?
}
*/
module.exports.wearingCommand = function(message, args){
    // create embed of items the user is wearing
    var discordUserId = message.author.id;
    profileDB.getUserProfileData(discordUserId, function (profileErr, profileRes){
        if (profileErr){
            console.log(profileErr);
        }
        else{
            var userLevel = profileRes.data.level;
            // get the user's wearing data
            profileDB.getUserWearInfo(discordUserId, function(getWearErr, getWearRes){
                if (getWearErr){
                    console.log(getWearErr);
                }
                else{
                    console.log(getWearRes);
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

                        console.log(slot1Id);
                        profileDB.getItemByIdsWear(slot1Id, slot2Id, slot3Id, function(error, itemResponse){
                            if (error){
                                console.log(error);
                            }
                            else{
                                console.log(itemResponse);
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
                                console.log(slot1Item);
                                console.log(slot2Item);
                                console.log(slot3Item);
                                var slot1String = wearStats.slotStringBuilder(message, slot1Item, slot1active)
                                var slot2String = wearStats.slotStringBuilder(message, slot2Item, slot2active)
                                var slot3String = wearStats.slotStringBuilder(message, slot3Item, slot3active)

                                var userItemStats = wearStats.statsObjectBuilder(message, slot1Item, slot2Item, slot3Item, userLevel, true, true, true);
                                var statsString = wearStats.statsStringBuilder(message, userItemStats);

                                var profileData = {}
                                profileData.slot1String = slot1String;
                                profileData.slot2String = slot2String;
                                profileData.slot3String = slot3String;
                                wearingEmbedBuilder(message, profileData, statsString);

                            }
                        })
                    }
                    else{
                        message.channel.send(message.author + " you are not wearing any items!")
                    }
                }
            })
        }
    });
}

function wearingEmbedBuilder(message, profileData, statsString){
    const embed = new Discord.RichEmbed()
    .setAuthor(message.author.username + "'s Wearing Items")
    .setThumbnail(message.author.avatarURL)
    .setColor(0x00AE86)
    if (profileData.slot1String && profileData.slot1String.length > 0){
        embed.addField('Slot 1', profileData.slot1String, false)
    }
    if (profileData.slot2String && profileData.slot2String.length > 0){
        embed.addField('Slot 2', profileData.slot2String, false)
    }
    if (profileData.slot3String && profileData.slot3String.length > 0){
        embed.addField('Slot 3', profileData.slot3String, false)
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
        var slot = args[1]; // must be a number between 1 and 3
        var itemToWear = args[2]; // must be a valid itemname
        // get the user's wear information, then get their item information, 
        // check user doesnt have the same slot category in 1 and 3, if so then valid command, update slot 2 with all the info for sundress
        profileDB.getUserWearInfo(discordUserId, function(getWearErr, getWearRes){
            if (getWearErr){
                console.log(getWearErr);
                // user isn't wearing any items
                profileDB.createUserWearInfo(discordUserId, false, function(error, res){
                    if (error){
                        console.log(error);
                    }
                    else{
                        console.log(res);
                    }
                })
            }
            else{
                console.log("wear res " + JSON.stringify(getWearRes, null, 2));
                if (getWearRes.data.length == 0){
                    // create the user
                    var data = {
                        discordId : discordUserId,
                        slot1replacing: false,
                        slot2replacing: false,
                        slot3replacing: false
                    }
                    profileDB.createUserWearInfo(data, function(error, res){
                        if (error){
                            console.log(error);
                        }
                        else{
                            console.log(res);
                            // call the same function again now that the user exists
                            exports.putonCommand(message, args, true)
                        }
                    })
                }else{
                    // get the user's items
                    var currentSlot1Slot = getWearRes.data[0].slot1slot;
                    var currentSlot2Slot = getWearRes.data[0].slot2slot;
                    var currentSlot3Slot = getWearRes.data[0].slot3slot;

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

                    profileDB.getUserItems(discordUserId, function(err, inventoryResponse){
                        if (err){
                            console.log(err);
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
                                    console.log(error);
                                }
                                else{
                                    console.log("allitemsres " + allItemsResponse.data);
                                    for (var item in inventoryResponse.data){
                                        var validItem = useItem.itemValidate(inventoryResponse.data[item]);
                                        if (!itemsInInventoryCountMap[inventoryResponse.data[item].itemid] 
                                            && validItem ){
                                            // item hasnt been added to be counted, add it as 1
                                            itemsInInventoryCountMap[inventoryResponse.data[item].itemid] = 1;
                                            userItemsById[inventoryResponse.data[item].itemid] = [];
                                            userItemsById[inventoryResponse.data[item].itemid].push(inventoryResponse.data[item]);
                                        }
                                        else if (validItem){
                                            itemsInInventoryCountMap[inventoryResponse.data[item].itemid] = itemsInInventoryCountMap[inventoryResponse.data[item].itemid] + 1;
                                            userItemsById[inventoryResponse.data[item].itemid].push(inventoryResponse.data[item]);
                                        }
                                    }
                                    console.log(itemsInInventoryCountMap);
                                    console.log(userItemsById);
                                    for (var index in allItemsResponse.data){
                                        itemsMapbyId[allItemsResponse.data[index].id] = allItemsResponse.data[index];
                                    }
                                    for (var index in allItemsResponse.data){
                                        itemsMapbyName[allItemsResponse.data[index].itemshortname] = allItemsResponse.data[index];
                                    }
                                    // have the items count map, have the items mapbyid
                                    var inventoryString = "";
                                    for (var key in itemsInInventoryCountMap) {
                                        if (itemsInInventoryCountMap.hasOwnProperty(key)) {
                                            // 
                                            if (itemsMapbyId[key].itemraritycategory == "rare" || itemsMapbyId[key].itemraritycategory == "ancient"){
                                                console.log(key + " " + itemsMapbyId[key].itemname)
                                                var emoji = "";
                                                if (itemsMapbyId[key].itemraritycategory === "artifact"){
                                                    emoji = ":small_orange_diamond::small_orange_diamond::small_orange_diamond: "
                                                }
                                                else if (itemsMapbyId[key].itemraritycategory === "ancient"){
                                                    emoji = ":small_orange_diamond::small_orange_diamond: "
                                                }
                                                else if (itemsMapbyId[key].itemraritycategory === "rare"){
                                                    emoji = ":small_orange_diamond: "
                                                }
                                                inventoryString = emoji + "**"+itemsMapbyId[key].itemname + "** - " +  itemsInInventoryCountMap[key] + " - " + itemsMapbyId[key].itemslot +"\n" + inventoryString;
                                            }
                                        }
                                    }
                                    console.log(inventoryString);
                                    // itemsMapbyId is the map of all the items, itemsInInventoryCountMap has the count of all these items
                                    
                                    // have the item available to wear
                                    if (itemsMapbyName[itemToWear]){
                                        console.log(itemsMapbyName[itemToWear])
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
                                        for (var item in userItemsById[itemid]){
                                            if (userItemsById[itemid][item].status != "wearing"){
                                                itemuserid = userItemsById[itemid][item].id;
                                                break;
                                            }
                                        }
                                        // TODO: do a bunch of checks if item is equippable or not
                                        
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
                                        if (validateSlotToWear){
                                            // check that the item slot is not already equiped elsewhere
                                            console.log("updating: slot: " + slot + " itemslot: " + itemslot + " itemid: " + itemid + " itemuserid: " + itemuserid + " itemstats: " + JSON.stringify(itemstats, null, 2));
                                            // equip the item
                                            // create a date for when the item is active
                                            var activateDate;
                                            if (!replacingCurrentSlot){
                                                activateDate = new Date(); // now
                                                replacingCurrentSlot = true;
                                            }
                                            else{
                                                var hoursToAdd = commandHoursToActivate[itemstats.itemCommand] ? commandHoursToActivate[itemstats.itemCommand] : 0 // depending on the item's command
                                                console.log("hours to add " + hoursToAdd);
                                                activateDate = new Date() // + hours for the command
                                                activateDate = new Date(activateDate.setHours(activateDate.getHours() + hoursToAdd));
                                                replacingCurrentSlot = true;
                                            }
                                            console.log("activate date " + activateDate)
                                            // each command has a different date activate
                                            profileDB.updateUserWearInfo(discordUserId, slot + "", itemslot, itemid, itemuserid, activateDate, replacingCurrentSlot, function(err, res){
                                                // set the item to equipped in userinventory
                                                if (err){
                                                    console.log(err);
                                                }
                                                else{
                                                    console.log(res);
                                                    // change the item status to wearing in user inventory
                                                    profileDB.updateItemStatus(itemuserid, "wearing", function(updateRockStatusErr, updateRockStatusRes){
                                                        if (updateRockStatusErr){
                                                            console.log(updateRockStatusErr);
                                                        }
                                                        else{
                                                            console.log(updateRockStatusRes);
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
                                }
                            })
                        }
                    })
                }
            }
        })
    }else{
        message.channel.send(message.author + " do -puton [1-3] [itemname]");
    }
}

function validateSlot(slotToEquip, currentSlot1, currentSlot2){
    console.log("in validateSlot");
    console.log(slotToEquip);
    console.log(currentSlot1);
    console.log(currentSlot2);
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
            console.log(takeoffRes);
            // item id of item to be set status to null in userinventory
            var itemId;
            if (slot == 1 && takeoffRes.data.length > 0){
                itemId = takeoffRes.data[0].slot1useritemid
            }
            else if (slot == 2 && takeoffRes.data.length > 0){
                itemId = takeoffRes.data[0].slot2useritemid
            }
            else if (slot == 3 && takeoffRes.data.length > 0){
                itemId = takeoffRes.data[0].slot3useritemid
            }
            console.log("itemid " + itemId);
            if (itemId){
                // change the item status from wearing to null in userinventory using the item id
                profileDB.updateItemStatus(itemId, null, function(updateErr, updateRes){
                    if (updateErr){
                        console.log(updateErr);
                    }
                    else{
                        //user wearing slot to null
                        profileDB.takeOffWear(discordUserId, slot, function(err, res){
                            if (err){
                                console.log(err);
                            }
                            else{
                                console.log(res);
                                message.channel.send(message.author.username + " took off item from slot " + slot);
                            }
                        })
                    }
                })
            }
        }
    })
}