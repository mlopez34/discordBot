'use strict'
var profileDB = require("./profileDB.js");
const Discord = require("discord.js");

var achievementsData = {
    "Nice guy" : {
        emoji : ":boy::skin-tone-2:",
        description: "Thank 25 users"
    },
    "Fidel cashflow": {
        emoji : ":chart_with_upwards_trend:",
        description: "Obtain 10 taco stands"
    },
    "Get a room": {
        emoji : ":kiss:",
        description: "Give 150 tacos to one person at once"
    },
    "Apologetic geek": {
        emoji : ":shrug::skin-tone-2:",
        description: "Sorry 12 users"
    },
    "Adventure girl": {
        emoji : ":mag:",
        description: "Buy a pickaxe & scavenge 20 times"
    },
    "Hoarder": {
        emoji : ":moneybag:",
        description: "Obtain 300 tacos"
    },
    "Host": {
        emoji : ":guardsman:",
        description: "Welcome 5 users"
    },
    "Hand work": {
        emoji : ":cooking:",
        description: "Cook 7 tacos at one time"
    },
    "Stripper": {
        emoji : ":dancer::skin-tone-2:",
        description: "Get 100 tacos thrown at you"
    },
    "Make it rain": {
        emoji : ":man_in_tuxedo:",
        description: "Throw 100 tacos at other people"
    },
    "Luck is on your side": {
        emoji : ":tickets:",
        description: "Scavenge a ancient quality item or better"
    },
    "Get a room": {
        emoji : ":kiss:",
        description: "Give 150 tacos to one person at once"
    },
    "Harvester": {
        emoji: ":tractor:",
        description: "Get 30 extra tacos from soiled crops after preparing"
    },
    "Executioner" : {
        emoji : ":skull_crossbones:",
        description : "Throw 75 rocks at the same person in a row"
    },
    "The Exalted" : {
        emoji: ":crown:",
        description: "Become Glorified by Bender"
    },
    "Rolechecker" : {
        emoji: ":scroll:",
        description : "Win the TOS August 2017 Tournament"
    }
}


module.exports.checkForAchievements = function(discordUserId, data, message, calledByError){
    // check for achievements by calling get on user statistics, or checking data
    // check for all the possible achievements
    if (!calledByError){
        profileDB.checkStatistics(discordUserId, function(err, statistics){
            if (err){
                // cant find the user's statistics create the user's statistics and check for achievements
                profileDB.createUserStatistics(discordUserId, null, null, function(createError, statsSuccess){
                    if(createError){
                        console.log(createError);
                    }
                    else{
                        exports.checkForAchievements(discordUserId, data, message, true);
                    }

                })
            }
            else{
                console.log(statistics);
                // check for all possible achievments here (achievement logic goes here)
                console.log(data.achievements);
                // statistics table achievements
                if(statistics.data.thankcount && 
                statistics.data.thankcount >= 25 && 
                (data.achievements === null || data.achievements.indexOf("Nice guy") == -1)){

                    profileDB.updateAchievements(discordUserId, "{Nice guy}", function(err, r){
                        if (err){
                            console.log(err);
                        }
                        {
                            achievementEmbedBuilder(message, "Nice guy");
                        }
                    })
                }

                if(statistics.data.sorrycount && 
                statistics.data.sorrycount >= 12 && 
                (data.achievements === null || data.achievements.indexOf("Apologetic geek") == -1)){

                    profileDB.updateAchievements(discordUserId, "{Apologetic geek}", function(err, r){
                        if (err){
                            console.log(err);
                        }
                        {
                            achievementEmbedBuilder(message, "Apologetic geek");
                        }
                    })
                }

                if(statistics.data.welcomecount && 
                statistics.data.welcomecount >= 5 && 
                (data.achievements === null || data.achievements.indexOf("Host") == -1)){

                    profileDB.updateAchievements(discordUserId, "{Host}", function(err, r){
                        if (err){
                            console.log(err);
                        }
                        {
                            achievementEmbedBuilder(message, "Host");
                        }
                    })
                }

                if(statistics.data.scavengecount && 
                statistics.data.scavengecount >= 20 && 
                (data.achievements === null || data.achievements.indexOf("Adventure girl") == -1)){

                    profileDB.updateAchievements(discordUserId, "{Adventure girl}", function(err, r){
                        if (err){
                            console.log(err);
                        }
                        {
                            achievementEmbedBuilder(message, "Adventure girl");
                        }
                    })
                }

                if(statistics.data.thrownatcount && 
                statistics.data.thrownatcount >= 100 && 
                (data.achievements === null || data.achievements.indexOf("Stripper") == -1)){

                    profileDB.updateAchievements(discordUserId, "{Stripper}", function(err, r){
                        if (err){
                            console.log(err);
                        }
                        {
                            achievementEmbedBuilder(message, "Stripper");
                        }
                    })
                }

                if(statistics.data.throwntocount && 
                statistics.data.throwntocount >= 100 && 
                (data.achievements === null || data.achievements.indexOf("Make it rain") == -1)){

                    profileDB.updateAchievements(discordUserId, "{Make it rain}", function(err, r){
                        if (err){
                            console.log(err);
                        }
                        {
                            achievementEmbedBuilder(message, "Make it rain");
                        }
                    })
                }
                // data achievements
                if(data.givecount && 
                data.givecount >= 150 && 
                (data.achievements === null || data.achievements.indexOf("Get a room") == -1)){

                    profileDB.updateAchievements(discordUserId, "{Get a room}", function(err, r){
                        if (err){
                            console.log(err);
                        }
                        {
                            achievementEmbedBuilder(message, "Get a room");
                        }
                    })
                }
                
                if(data.tacostands && 
                data.tacostands >= 10 &&
                (data.achievements === null || data.achievements.indexOf("Fidel cashflow") == -1 )){
                    profileDB.updateAchievements(discordUserId, "{Fidel cashflow}", function(err, r){
                        if (err){
                            console.log(err);
                        }
                        {
                            achievementEmbedBuilder(message, "Fidel cashflow");
                        }
                    })
                }

                if(data.tacos && 
                data.tacos >= 500 && 
                (data.achievements === null || data.achievements.indexOf("Hoarder") == -1)){

                    profileDB.updateAchievements(discordUserId, "{Hoarder}", function(err, r){
                        if (err){
                            console.log(err);
                        }
                        {
                            achievementEmbedBuilder(message, "Hoarder");
                        }
                    })
                }

                if(data.cookcount && 
                data.cookcount >= 7 && 
                (data.achievements === null || data.achievements.indexOf("Hand work") == -1)){

                    profileDB.updateAchievements(discordUserId, "{Hand work}", function(err, r){
                        if (err){
                            console.log(err);
                        }
                        {
                            achievementEmbedBuilder(message, "Hand work");
                        }
                    })
                }

                if(data.rarity && 
                (data.rarity == "ancient" || data.rarity == "artifact") && 
                (data.achievements === null || data.achievements.indexOf("Luck is on your side") == -1)){

                    profileDB.updateAchievements(discordUserId, "{Luck is on your side}", function(err, r){
                        if (err){
                            console.log(err);
                        }
                        {
                            achievementEmbedBuilder(message, "Luck is on your side");
                        }
                    })
                }

                if(data.maxextratacos && 
                data.maxextratacos >= 30 && 
                (data.achievements === null || data.achievements.indexOf("Harvester") == -1)){

                    profileDB.updateAchievements(discordUserId, "{Harvester}", function(err, r){
                        if (err){
                            console.log(err);
                        }
                        {
                            achievementEmbedBuilder(message, "Harvester");
                        }
                    })
                }

                if(data.reputation && 
                data.reputation.toLowerCase() == "glorified" && 
                (data.achievements === null || data.achievements.indexOf("Harvester") == -1)){

                    profileDB.updateAchievements(discordUserId, "{Harvester}", function(err, r){
                        if (err){
                            console.log(err);
                        }
                        {
                            achievementEmbedBuilder(message, "Harvester");
                        }
                    })
                }

                if(data.rocksthrowninrow && 
                data.rocksthrowninrow >= 75 && 
                (data.achievements === null || data.achievements.indexOf("Harvester") == -1)){

                    profileDB.updateAchievements(discordUserId, "{Harvester}", function(err, r){
                        if (err){
                            console.log(err);
                        }
                        {
                            achievementEmbedBuilder(message, "Harvester");
                        }
                    })
                }
            }
        })
    }
}

function achievementEmbedBuilder(message, achievementName){
    const embed = new Discord.RichEmbed()
    .setTitle(message.author.username + " has earned the achievement " + achievementName + " " + achievementsData[achievementName].emoji)
    .setColor(0x00AE86)
    .setDescription(achievementsData[achievementName].description)
    .setThumbnail(message.author.avatarURL)
    message.channel.send({embed});
}

module.exports.achievementStringBuilder = function(achievements){
    var achievementString = "";
    for (var ach in achievements){
        // append each achievmenet string
        if (achievementsData[achievements[ach]]){
            achievementString = achievementString + (achievementsData[achievements[ach]].emoji) + " " + achievements[ach] +  " \n"
        }
    }
    if (achievementString.length == 0){
        return "No achievements"
    }
    else{
        return achievementString;
    }
}