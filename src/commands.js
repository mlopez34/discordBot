
var achiev = require("./achievements.js");
var profileDB = require("./profileDB.js");
var stats = require("./statistics.js");
const Discord = require("discord.js");
var Promise = require('bluebird');
var config = require("./config.js");
var useItem = require("./useItem.js")
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
var PASTA_COST = 125
var SCAVENGE_TACO_FIND_CHANCE_HIGHER = 94
var SCAVENGE_TACO_FIND_CHANCE = 75;
var Last_Five_Welcomes = [];
var ROCK_ITEM_ID = 5;
var PIECE_OF_WOOD_ITEM_ID = 4;
var QueueOfTacosDropped = [];

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
                // check against thank timestamp and if 6 hours have passed
                var now = new Date();
                var twoHoursAgo = new Date();
                twoHoursAgo = new Date(twoHoursAgo.setHours(twoHoursAgo.getHours() - 2));
                //console.log("now: " + now);
                //console.log("twoHoursAgo: " + twoHoursAgo);
                //console.log("timestamp: " + thankResponse.data.lastthanktime);
                if ( twoHoursAgo > thankResponse.data.lastthanktime ){
                    // six hours have passed - update the user to have 1 more taco
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
                                    message.channel.send(message.author + " thanked " + mentionedUser + ", they received a taco! :taco:");
                                    stats.statisticsManage(discordUserId, "thankCount", 1, function(staterr, statSuccess){
                                        if (staterr){
                                            console.log(staterr);
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
                            profileDB.updateUserTacosThank(discordUserId, 0, function(updateerr, updateResponse) {
                                 if (updateerr){
                                     console.log(updateerr);
                                 }
                                 else{
                                     console.log(updateResponse);
                                 }
                            })
                            // send message that the user has 1 more taco
                            message.channel.send(message.author + " thanked " + mentionedUser + ", they received a taco! :taco:");
                            //update statistic
                            stats.statisticsManage(discordUserId, "thankCount", 1, function(staterr, statSuccess){
                                if (staterr){
                                    console.log(staterr);
                                }
                                else{
                                    // check achievements??
                                    getProfileForAchievement(discordUserId, message)
                                }
                            })
                        }
                    })
                }else{
                    // six hours have not passed, tell the user they need to wait 
                    var numberOfHours = getDateDifference(thankResponse.data.lastthanktime, now, 2);
                    message.channel.send(message.author + " You are being too thankful! please wait `" + numberOfHours +"`");
                }
            }
        });
    }
    else{
        message.channel.send(message.author + " You must mention a user or a user that isn't you whom you want to thank!");
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
                // check six hours ago
                var achievements = sorryResponse.data.achievements;
                var now = new Date();
                var sixHoursAgo = new Date();
                sixHoursAgo = new Date(sixHoursAgo.setHours(sixHoursAgo.getHours() - 6));

                if ( sixHoursAgo > sorryResponse.data.lastsorrytime ){
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
                                    message.channel.send(message.author + " thanked to " + mentionedUser + ", they received a taco! :taco:");
                                    stats.statisticsManage(discordUserId, "thankCount", 1, function(staterr, statSuccess){
                                        if (staterr){
                                            console.log(staterr);
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
                            profileDB.updateUserTacosSorry(discordUserId, 0, function(updateerr, updateResponse) {
                                 if (updateerr){
                                     console.log(updateerr);
                                 }
                                 else{
                                     console.log(updateResponse);
                                 }
                            })
                            // send message that the user has 1 more taco
                            message.channel.send(message.author + " apologized to " + mentionedUser + ", they received a taco! :taco:");
                            stats.statisticsManage(discordUserId, "sorryCount", 1, function(err, statSuccess){
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
                }else{
                    // six hours have not passed, tell the user they need to wait 
                    var numberOfHours = getDateDifference(sorryResponse.data.lastsorrytime, now, 6);
                    message.channel.send(message.author + " You are being too apologetic! Please wait `" + numberOfHours +"`");
                }
            }
        })
    }
    else{
        message.channel.send(message.author + " You must mention a user or a user that isn't you whom you want to apologize to!");
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
            var achievements = prepareResponse.data.achievements;
            var now = new Date();
            var threeDaysAgo = new Date();
            threeDaysAgo = new Date(threeDaysAgo.setHours(threeDaysAgo.getHours() - 48));

            if ( threeDaysAgo > prepareResponse.data.lastpreparetime ){
                // able to prepare again
                var userTacoStands = 0;
                if (prepareResponse.data.tacostands && prepareResponse.data.tacostands > -1){
                    userTacoStands = prepareResponse.data.tacostands;
                }
                if (userTacoStands > 0){
                    // add tacos x10 of # of trees
                    var tacosToPrepare = BASE_TACO_PREPARE * userTacoStands;
                    profileDB.prepareTacos(discordUserId, tacosToPrepare, function(err, data){
                        if (err){
                            console.log(err);
                            // something happened
                        }
                        else{
                            message.channel.send(message.author + " You have prepared `" + tacosToPrepare + "` tacos :taco:!");
                        }
                    })
                }
                else{
                    message.channel.send(message.author + " You do not have any stands to prepare tacos with!");
                }
            }
            else{
                var numberOfHours = getDateDifference(prepareResponse.data.lastpreparetime, now, 48);
                message.channel.send(message.author + " You ran out of ingredients! Please wait `" + numberOfHours + "`");
            }
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
                                stats.statisticsManage(discordUserId, "welcomeCount", 1, function(err, statSuccess){
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
                            stats.statisticsManage(discordUserId, "welcomeCount", 1, function(err, statSuccess){
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
                                            stats.statisticsManage(discordUserId, "giveCount", giveTacoAmount, function(err, statSuccess){
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
            // check six hours ago
            var achievements = cookResponse.data.achievements;
            var now = new Date();
            var threeDaysAgo = new Date();
            threeDaysAgo = new Date(threeDaysAgo.setHours(threeDaysAgo.getHours() - 24));

            if ( threeDaysAgo > cookResponse.data.lastcooktime ){
                profileDB.updateUserTacosCook(discordUserId, cookRoll, function(err, updateResponse) {
                    if (err){
                        console.log(err);
                    }
                    else{
                        // send message that the user has 1 more taco
                        message.channel.send(message.author + " Cooked `" + cookRoll + "` tacos! you now have `" + (cookResponse.data.tacos + cookRoll) + "` tacos :taco:");

                        var data = {}
                        data.achievements = achievements;
                        data.cookcount = cookRoll
                        console.log(data);
                        achiev.checkForAchievements(discordUserId, data, message);
                    }
                })
            }else{
                // six hours have not passed, tell the user they need to wait 
                var numberOfHours = getDateDifference(cookResponse.data.lastcooktime, now, 24);
                message.channel.send(message.author + " You cannot cook tacos currently, Please wait `" + numberOfHours + "`");
            }
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
                            stats.statisticsManage(discordUserId, "thrownToCount", 1, function(err, statSuccess){
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
                            stats.statisticsManage(mentionedId, "thrownAtCount", 1, function(err, statSuccess){
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
                profileData.achievementString = achiev.achievementStringBuilder(profileResponse.data.achievements);
                if (profileResponse.data.pickaxe == "basic"){
                    
                    profileData.userItems = "Pickaxe :pick: \n"
                }
                else if(profileResponse.data.pickaxe == "improved"){
                    profileData.userItems = "Improved Pickaxe :small_blue_diamond::pick: \n"
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
                profileData.achievementString = achiev.achievementStringBuilder(profileResponse.data.achievements);
                if (profileResponse.data.pickaxe == "basic"){
                    
                    profileData.userItems = "Pickaxe :pick: \n"
                }
                else if(profileResponse.data.pickaxe == "improved"){
                    profileData.userItems = "Improved Pickaxe :small_blue_diamond::pick: \n"
                }
                profileBuilder(message, profileData);
            }
        })
    }
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
    /*
    * Inline fields may not display as inline if the thumbnail and/or image is too big.
    */
    .addField('Taco Stands :bus:', profileData.userTacoStands, true)
    .addField('Achievements :military_medal: ', profileData.achievementString, true)

    .addField('Items :shopping_bags:', profileData.userItems, true)
    /*
    * Blank field, useful to create some space.
    
    .addBlankField(true)
    .addField('Taco Stands', 3, true);
    */
    if (profileData.pasta && profileData.pasta.length > 0){
        embed.setDescription(profileData.pasta)
    }

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
    .addBlankField(false)
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
    var standings = config.commandString + "standings - show taco standings "
    //var commandsList = "```xl Uppercase lowercase 123 ```"
    var commandsList = "```css\n" + commandsList + profile + thank + sorry + welcome + cook + give + shop + prepare + throwTaco + scavenge + standings + "```";
    message.channel.send(commandsList);
}

function getProfileForAchievement(discordUserId, message){
    profileDB.getUserProfileData( discordUserId, function(err, profileResponse) {
        if(err){
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
                //console.log(allItemsResponse.data);
                for (var item in inventoryResponse.data){
                    var validItem = useItem.itemValidate(inventoryResponse.data[item]);
                    if (!itemsInInventoryCountMap[inventoryResponse.data[item].itemid] && validItem){
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

            //check for more than 1 hours
            var now = new Date();
            var oneHourAgo = new Date();
            oneHourAgo = new Date(oneHourAgo.setHours(oneHourAgo.getHours() - 1));
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
                            else if(rarityRoll > 9700 && rarityRoll <= 9975){
                                rarityString = "rare"
                                var itemRoll = Math.floor(Math.random() * rareItems.length);
                                console.log(rareItems[itemRoll]);
                                itemsObtainedArray.push(rareItems[itemRoll]);
                                if (highestRarityFound <= 2){
                                    highestRarityFound = 3;
                                }
                            }
                            else if (rarityRoll > 8000 && rarityRoll <= 9700){
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
                            }
                        })
                        // add the tacos to user
                        profileDB.updateUserTacos(discordUserId, tacosFound, function(updateLSErr, updateLSres){
                            if(updateLSErr){
                                console.log(updateLSErr);
                            }
                            else{
                                console.log(updateLSres);
                            }
                        })
                        // add to statistics
                        var achievements = getUserResponse.data.achievements;
                        stats.statisticsManage(discordUserId, "scavengeCount", 1, function(err, statSuccess){
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
            else{
                var numberOfHours = getDateDifference(getUserResponse.data.lastscavangetime, now, 1);
                message.channel.send(message.author + " You have scavenged too recently! please wait `" + numberOfHours +"`");
                
            }
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
    if (bet > 0 ){
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
                    // TODO: update the user's tacos then send the embed
                    slotsEmbedBuilder(emojisRolled, tacosWon, message);
                }
                else{
                    message.channel.send(message.author + " You don't have enough tacos!");
                }
            }
        })
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
    embed.addField("(BETA) Taco Slots", emojisRolled[0] + " " + emojisRolled[1] + " " +  emojisRolled[2] , false)
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
        if (QueueOfTacosDropped[index].poisoned){
            // taco is poisoned, take away instead of giving
            // update user tacos
            profileDB.updateUserTacos(discordUserId, -1, function(updateErr, updateRes){
                if (updateErr){
                    // TODO: create user profile
                    console.log(updateErr)
                }
                else{
                    QueueOfTacosDropped.splice(index, 1);
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
                    QueueOfTacosDropped.splice(index, 1);
                    message.channel.send(message.author + " picked up a taco from the ground :taco:");
                }
            })
        }
    }
    else{
        message.channel.send("There are no tacos for you to pick up.. ");
    }
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
    if (args[1].toLowerCase() == "rock"){
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
                    // map of all items
                    var itemsMapbyId = {};
                    // item object for rock to use
                    var rockToUse;

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
                            for (var index in allItemsResponse.data){
                                itemsMapbyId[allItemsResponse.data[index].id] = allItemsResponse.data[index];
                            }
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
                                            if (poisonedTacoRoll > 66){
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
            })
        }
        else{
            message.channel.send("mention a user to throw a rock at, you cannot throw rocks at bots or yourself...");
        }
    }
    else if(args[1].toLowerCase() == "pieceofwood"){
        // use pieces of wood - protect against rocks being thrown at you (uses 6 pieces, protects against 3)
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
                var piecesOfWoodToUse = []
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
                        for (var index in allItemsResponse.data){
                            itemsMapbyId[allItemsResponse.data[index].id] = allItemsResponse.data[index];
                        }
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
        })
        
    }
    else if (args[1].toLowerCase() == "soda can"){
        // recycle for an item only obtainable by recycling
        
    }
    else if (args[1].toLowerCase() == "soil"){
        // soil your land? bender seeds ur soil
    }
}

module.exports.combineCommand = function(message, args){
    // combine certain things (only terry cloth, and soil for now?)
}