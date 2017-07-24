
var achiev = require("./achievements.js");
var profileDB = require("./profileDB.js");
var stats = require("./statistics.js");
const Discord = require("discord.js");

var moment = require("moment");

var BASE_TACO_COST = 50;
var BASE_TACO_PREPARE = 10;
var BASE_TACO_COOK = 10;
var PICKAXE_COST = 35;
var PASTA_COST = 125

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
        profileDB.getUserProfileData( mentionedId, function(err, thankResponse) {
            if(err){
                console.log("in error : " + err.code);
                // user doesn't exist
                if(err.code === 0){
                    // create new user
                    var now = new Date();
                    var threedaysAgo = new Date();
                    threedaysAgo = new Date(threedaysAgo.setHours(threedaysAgo.getHours() - 72));
                    var userData = {
                        discordId: mentionedId,
                        tacos: 1,
                        birthdate: "2001-10-05",
                        lastthanktime: now,
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
                    stats.statisticsManage(discordUserId, "thankCount", 1, function(err, statSuccess){
                        if (err){
                            console.log(err);
                        }
                        else{
                            // check achievements??
                            getProfileForAchievement(discordUserId, message)
                        }
                    })
                }
            }else{
                // check against thank timestamp and if 6 hours have passed
                var now = new Date();
                var twoHoursAgo = new Date();
                twoHoursAgo = new Date(twoHoursAgo.setHours(twoHoursAgo.getHours() - 0));
                //console.log("now: " + now);
                //console.log("twoHoursAgo: " + twoHoursAgo);
                //console.log("timestamp: " + thankResponse.data.lastthanktime);
                if ( twoHoursAgo > thankResponse.data.lastthanktime ){
                    // six hours have passed - update the user to have 1 more taco
                    profileDB.updateUserTacosThank(mentionedId, 1, function(err, updateResponse) {
                        if (err){
                            console.log(err);
                        }
                        else{
                            // send message that the user has 1 more taco
                            message.channel.send(message.author + " you thanked " + mentionedUser + ", they received a taco! :taco:");
                            //update statistic
                            stats.statisticsManage(discordUserId, "thankCount", 1, function(err, statSuccess){
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
                    var numberOfHours = getDateDifference(thankResponse.data.lastthanktime, now, 2);
                    message.channel.send(message.author + " you are being too thankful! please wait `" + numberOfHours +"`");
                }
            }
        });
    }
    else{
        message.channel.send(message.author + " you must mention a user or a user that isn't you whom you want to thank!");
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
        profileDB.getUserProfileData( mentionedId, function(err, sorryResponse) {
            if(err){
                console.log("in error : " + err.code);
                // user doesn't exist
                if(err.code === 0){
                    // create new user
                    var now = new Date();
                    var threedaysAgo = new Date();
                    threedaysAgo = new Date(threedaysAgo.setHours(threedaysAgo.getHours() - 72));
                    var userData = {
                        discordId: mentionedId,
                        tacos: 1,
                        birthdate: "2001-10-05",
                        lastthanktime: threedaysAgo,
                        lastcooktime: threedaysAgo,
                        lastsorrytime: now,
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
                }
            }
            else{
                // check six hours ago
                var achievements = sorryResponse.data.achievements;
                var now = new Date();
                var sixHoursAgo = new Date();
                sixHoursAgo = new Date(sixHoursAgo.setHours(sixHoursAgo.getHours() - 0));

                if ( sixHoursAgo > sorryResponse.data.lastsorrytime ){
                    profileDB.updateUserTacosSorry(mentionedId, 1, function(err, updateResponse) {
                        if (err){
                            console.log(err);
                        }
                        else{
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
                    var numberOfHours = getDateDifference(sorryResponse.data.lastthanktime, now, 6);
                    message.channel.send(message.author + " you are being too sorryful! Please wait `" + numberOfHours +"`");
                }
            }
        })
    }
    else{
        message.channel.send(message.author + " you must mention a user or a user that isn't you whom you want to apologize to!");
    }

}

module.exports.buyStandCommand = function (message){
    // buy a stand for x number of tacos
    var discordUserId = message.author.id

    profileDB.getUserProfileData( discordUserId, function(err, buyStandResponse) {
        if(err){
            // user doesnt exist tell the user they should get some tacos
            message.channel.send(message.author + " you can't afford a stand atm!");
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
                        message.channel.send(message.author + " congratulations you have purchased a taco stand!");
                        
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
                message.channel.send(message.author + " you can't afford a stand , you need `" + standCost + " tacos`!");
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
            message.channel.send(message.author + " you can't prepare atm because you do not have taco stands!");
        }
        else{
            // get number of trees the user has
            // check lastprepare time
            var achievements = prepareResponse.data.achievements;
            var now = new Date();
            var threeDaysAgo = new Date();
            threeDaysAgo = new Date(threeDaysAgo.setHours(threeDaysAgo.getHours() - 0));

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
                            message.channel.send(message.author + " you have prepared " + tacosToPrepare + " tacos :taco:!");
                        }
                    })
                }
                else{
                    message.channel.send(message.author + " you do not have any stands to prepare tacos with!");
                }
            }
            else{
                var numberOfHours = getDateDifference(prepareResponse.data.lastpreparetime, now, 24);
                message.channel.send(message.author + " you ran out of ingredients! Please wait `" + numberOfHours + "`");
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
    if (mentionedId == discordUserId){
        message.channel.send(message.author +" you can't welcome yourself!")
    }
    else{
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
                        welcomed: false,
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
                                message.channel.send(" welcome! " + mentionedUser + " you now have " + userData.tacos + " tacos!")
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
                            message.reply( err );
                        }
                        else{
                            // send message that the user has 1 more taco
                            message.channel.send(mentionedUser + " welcome! you now have " + (welcomeResponse.data.tacos + 2) + " tacos! :taco:");
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
                    message.channel.send(message.author + " the user has already been welcomed!");
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
    if (mentionedId == discordUserId){
        message.channel.send(message.author + " you can't give yourself taco!")
    }
    else{
        profileDB.getUserProfileData( discordUserId, function(err, giveResponse) {
            if(err){
                // user doesnt exist, 
                if(err.code === 0){
                    message.channel.send(message.author + " you have no tacos to give!");
                }
            }
            else{
                // check if user has enough tacos to give
                var achievements = giveResponse.data.achievements;
                if (giveResponse.data.tacos - giveTacoAmount >= 0 ){
                    console.log("have enough");
                    var negativeGiveTacoAmount = giveTacoAmount * -1
                    profileDB.updateUserTacosGive(discordUserId, negativeGiveTacoAmount, function(err, updateResponse) {
                        if (err){
                            console.log(err);
                        }
                        else{
                            // 
                            profileDB.updateUserTacosGive(mentionedId, giveTacoAmount, function(err, updateResponse) {
                                if (err){
                                    console.log(err);
                                    var now = new Date();
                                    var threedaysAgo = new Date();
                                    threedaysAgo = new Date(threedaysAgo.setHours(threedaysAgo.getHours() - 72));
                                    var userData = {

                                        discordId: mentionedId,
                                        tacos: giveTacoAmount,
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
                                    profileDB.createUserProfile(userData, function(err, createResponse){
                                        if(err){
                                            console.log(err);
                                        }
                                        else{
                                            message.channel.send("welcome! " + mentionedUser + " you now have " + userData.tacos + " tacos!")
                                            stats.statisticsManage(discordUserId, "giveCount", userData.tacos, function(err, statSuccess){
                                                if (err){
                                                    console.log(err);
                                                }
                                                else{
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
                                else{
                                    // send message that the user has 1 more taco
                                    message.channel.send(message.author + " gifted " + mentionedUser + " " + giveTacoAmount + " tacos! :taco:");
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
                else{
                    console.log('dont have enough tacos ')
                }
            }
        })
    }
}

module.exports.cookCommand = function(message){
    var discordUserId = message.author.id;

    profileDB.getUserProfileData( discordUserId, function(err, cookResponse) {
        if(err){
            // user doesnt exist, they cannot cook
            var achievements = cookResponse.data.achievements;
            var now = new Date();
            var threedaysAgo = new Date();
            threedaysAgo = new Date(threedaysAgo.setHours(threedaysAgo.getHours() - 72));
            var userData = {
                discordId: mentionedId,
                tacos: BASE_TACO_COOK,
                birthdate: "2001-10-05",
                lastthanktime: threedaysAgo,
                lastcooktime: now,
                lastsorrytime: threeDaysAgo,
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
                    message.author + " cooked " + BASE_TACO_COOK + " tacos! you now have " + BASE_TACO_COOK + " tacos :taco:"

                    var data = {}
                    data.achievements = achievements;
                    data.cookcount = BASE_TACO_COOK
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
            threeDaysAgo = new Date(threeDaysAgo.setHours(threeDaysAgo.getHours() - 0));

            if ( threeDaysAgo > cookResponse.data.lastcooktime ){
                profileDB.updateUserTacosCook(discordUserId, BASE_TACO_COOK, function(err, updateResponse) {
                    if (err){
                        console.log(err);
                    }
                    else{
                        // send message that the user has 1 more taco
                        message.channel.send(message.author + " cooked " + BASE_TACO_COOK + " tacos! you now have " + (cookResponse.data.tacos + BASE_TACO_COOK) + " tacos :taco:");

                        var data = {}
                        data.achievements = achievements;
                        data.cookcount = BASE_TACO_COOK
                        console.log(data);
                        achiev.checkForAchievements(discordUserId, data, message);
                    }
                })
            }else{
                // six hours have not passed, tell the user they need to wait 
                var numberOfHours = getDateDifference(cookResponse.data.lastcooktime, now, 24);
                message.channel.send(message.author + " you cannot cook tacos currently, Please wait `" + numberOfHours + "`");
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
                if (throwResponse.data.tacos > 1){
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
                if(err.code === 0){
                    // user doesn't exist
                }
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
                profileBuilder(message, profileData);
            }
        })
    }
    else{
        profileDB.getUserProfileData( discordUserId, function(err, profileResponse) {
            if(err){
                // user doesnt exist, create their profile first
                if(err.code === 0){
                    // user doesnt exist
                }
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
    .setFooter('use !give @user to give a user some tacos!')
    message.channel.send({embed});
}

module.exports.tacoStandsCommand = function(message){
    var discordUserId = message.author.id;

    profileDB.getUserProfileData( discordUserId, function(err, profileResponse) {
        if(err){
            // user doesnt exist, create their profile first
            if(err.code === 0){
                // user doesnt exist
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
            message.channel.send(message.author + " you can't afford a stand atm!");
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
                            message.channel.send(message.author + " congratulations you have purchased a pickaxe :pick:!");
                        }
                    })
                }
            }
            else{
                message.channel.send(message.author + " you already own the pickaxe selected");
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
    .setURL('https://discord.js.org/#/docs/main/indev/class/RichEmbed')
    .addField('Tacos  :taco:', profileData.userTacos, true)
    /*
    * Inline fields may not display as inline if the thumbnail and/or image is too big.
    */
    .addField('Taco Stands :bus:', profileData.userTacoStands, true)
    .addField('Achievements: ', profileData.achievementString, true)

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
    var pickaxeDescription = "The pickaxe can be used to scavange. You never know what you will find in these lands ";
    var pastaDescription = "Add a quote to your profile, after purchasing type !pasta quote - you will no longer be basic."
    
    var pickaxeCost = PICKAXE_COST +" :taco:";
    const embed = new Discord.RichEmbed()
    .setColor(0x87CEFA)
    .setTitle(welcomeMessage)
    .setThumbnail()
    .setDescription("Bender accepts Tacos as currency since he's a hungry guy :shrug:. Have a look around!")
    .addField('Your current tacos', shopData.userTacos + " :taco:", false)
    .addBlankField(false)
    .addField('Taco Stands', ":bus:", true)
    .addField('Description', tacoStandDescription, true)
    .addField('Cost', treeCost, true)
    .addField('Command', "!buystand", true)

    .addBlankField(true)
    .addBlankField(false)
    .addField('Pickaxe', ":pick:", true)
    .addField('Description', pickaxeDescription, true)
    .addField('Cost', pickaxeCost, true)
    .addField('Command', "!buypickaxe", true)

    .addBlankField(true)
    .addBlankField(false)
    .addField('Pasta', ":spaghetti:", true)
    .addField('Description', pastaDescription, true)
    .addField('Cost', PASTA_COST + " :taco:", true)
    .addField('Command', "!buyPasta", true)
    .setTimestamp()
    message.channel.send({embed});
}

module.exports.shopCommand = function(message){
    var discordUserId = message.author.id;
    profileDB.getUserProfileData( discordUserId, function(err, sorryResponse) {
        if(err){
            // user doesnt exist tell the user they should get some tacos
            message.reply( " you can't afford a stand atm!" + err);
        }
        else{
            // if user has enough tacos to purchase the tree, add 1 tree, subtract x tacos
            var shopData = {};
            var userTacoStands = 0;
            var userTacos = sorryResponse.data.tacos;
            shopData.userTacos = userTacos;
            if (sorryResponse.data.tacostands && sorryResponse.data.tacostands > -1){
                userTacoStands = sorryResponse.data.tacostands;
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
            if ( pastaRespond.data.tacos >= PASTA_COST && pasta.length > 0){
                // user can buy the pasta, insert the pasta message into the user's pasta column
                profileDB.updateUserPasta( discordUserId, PASTA_COST * -1, pasta, function(err, pastaRespond) {
                    if(err){
                        message.channel.send(message.author + " could not purchase pasta!");
                    }
                    else{
                        // user has updated their pasta
                        message.channel.send(message.author + " you have purchased a new pasta :spaghetti:!");
                    }
                });
            }
            else{
                message.channel.send(message.author + " you do not have enough tacos to purchase a pasta");
            }

        }
    });

}
// TODO: scavenge logic, Inventory logic, mission logic, casino logic, combine logic

module.exports.helpCommand = function(message){
    var commandsList = "List of commands \n ____________ \n "
    var profile = "!profile  display users profile \n "
    var thank = "!thank [user] - thank a user and they get 1 taco! \n "
    var sorry = "!sorry [user] - say sorry to a user and they get 1 taco! \n "
    var welcome = "!welcome [user] - welcome a user and they get 2 tacos! \n "
    var cook = "!cook - cook some tacos! \n "
    var give = "!give user number - give the mentioned user some number of tacos! \n "
    var shop = "!shop - enter Benders shop! \n "
    var prepare = "!prepare - prepare some tacos from your taco stands! \n "
    var throwTaco = "!throw [user] - throw a taco at the mentioned user \n "
    var scavenge = "!scavenge - in progress "
    //var commandsList = "```xl Uppercase lowercase 123 ```"
    var commandsList = "```css\n" + commandsList + profile + thank + sorry + welcome + cook + give + shop + prepare + throwTaco + scavenge + "```";
    message.channel.send(commandsList);
}

function getProfileForAchievement(discordUserId, message){
    profileDB.getUserProfileData( discordUserId, function(err, profileResponse) {
        if(err){

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

module.exports.scavangeCommand = function (message){
    // scavange every 3 hours
    var discordUserId = message.author.id;
    
    // roll the number of items to get

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
    console.log("FOUND THIS MANY ITEMS " + rollsCount)
    
    // get all the possible items from items DB
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
            // TODO: Add scavenge statistic
            // roll rarity, roll item from rarity
            var gotUncommon = false;
            for (var i = 0; i < rollsCount; i++){
                var rarityRoll = Math.floor(Math.random() * 10000) + 1;
                var rarityString = "";
                console.log(rarityRoll);
                if (!gotUncommon && rollsCount > 4){
                    // guaranteed rare +
                    rarityRoll = Math.floor(Math.random() * 300) + 9700;
                    gotUncommon = true;
                }
                else if(!gotUncommon && rollsCount > 3){
                    // guaranteed uncommon +
                    rarityRoll = Math.floor(Math.random() * 2000) + 8000;
                    gotUncommon = true;
                }
                if (rarityRoll > 9995){
                    rarityString = "artifact"
                    var itemRoll = Math.floor(Math.random() * artifactItems.length);
                    console.log(artifactItems[itemRoll]);
                    message.channel.send(rarityRoll + message.author + " Found: " + JSON.stringify(artifactItems[itemRoll]));
                }
                else if(rarityRoll > 9950 && rarityRoll <= 9995){
                    rarityString = "ancient"
                    var itemRoll = Math.floor(Math.random() * ancientItems.length);
                    console.log(ancientItems[itemRoll]);
                    message.channel.send(rarityRoll + message.author + " Found: " + JSON.stringify(ancientItems[itemRoll]));
                }
                else if(rarityRoll > 9700 && rarityRoll <= 9950){
                    rarityString = "rare"
                    var itemRoll = Math.floor(Math.random() * rareItems.length);
                    console.log(rareItems[itemRoll]);
                    message.channel.send(rarityRoll + message.author + " Found: " + JSON.stringify(rareItems[itemRoll]));
                }
                else if (rarityRoll > 8000 && rarityRoll <= 9700){
                    rarityString = "uncommon"
                    var itemRoll = Math.floor(Math.random() * uncommonItems.length);
                    console.log(uncommonItems[itemRoll]);
                    message.channel.send(rarityRoll + message.author + " Found: " + JSON.stringify(uncommonItems[itemRoll]));
                }
                else {
                    rarityString = "common"
                    var itemRoll = Math.floor(Math.random() * commonItems.length);
                    console.log(commonItems[itemRoll]);
                    message.channel.send(rarityRoll + message.author + " Found: " + JSON.stringify(commonItems[itemRoll]));
                }
            }
            
        }
    })
    // TODO: store the item on the user's inventory
}

function scavengeEmbedBuilder(message, itemsScavenged){
    /*
    const embed = new Discord.RichEmbed()
    .setAuthor(profileData.userName +"'s Tacos")
    .setColor(0x00AE86)
    .addField('Tacos  :taco:', profileData.userTacos, true)
    .setFooter('use !give @user to give a user some tacos!')
    message.channel.send({embed});
    */
}

