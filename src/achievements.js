'use strict'
var profileDB = require("./profileDB.js");
const Discord = require("discord.js");

var achievementsData = {
    "Nice guy" : {
        emoji : ":boy::skin-tone-2:",
        score: 10,
        description: "Thank 25 users"
    },
    "Fidel cashflow": {
        emoji : ":chart_with_upwards_trend:",
        score: 15,
        description: "Obtain 15 taco stands"
    },
    "Get a room": {
        emoji : ":kiss:",
        score: 10,
        description: "Give 150 tacos to one person at once"
    },
    "Apologetic geek": {
        emoji : ":shrug::skin-tone-2:",
        score: 10,
        description: "Sorry 12 users"
    },
    "Adventure girl": {
        emoji : ":mag:",
        score: 10,
        description: "Buy a pickaxe & scavenge 20 times"
    },
    "Hoarder": {
        emoji : ":moneybag:",
        score: 15,
        description: "Obtain 100,000 tacos"
    },
    "Host": {
        emoji : ":guardsman:",
        score: 10,
        description: "Welcome 5 users"
    },
    "Hand work": {
        emoji : ":cooking:",
        score: 10,
        description: "Cook 7 tacos at one time"
    },
    "Stripper": {
        emoji : ":dancer::skin-tone-2:",
        score: 10,
        description: "Get 350 tacos thrown at you"
    },
    "Make it rain": {
        emoji : ":man_in_tuxedo:",
        score: 10,
        description: "Throw 100 tacos at other people"
    },
    "Luck is on your side": {
        emoji : ":tickets:",
        score: 10,
        description: "Scavenge a ancient quality item or better"
    },
    "Harvester": {
        emoji: ":tractor:",
        score: 10,
        description: "Get 30 extra tacos from soiled crops after preparing"
    },
    "Miss Popularity": {
        emoji: ":champagne: ",
        score: 15,
        description: "Get 50 or more people to attend your party"
    },
    "Executioner" : {
        emoji : ":skull_crossbones:",
        score: 15,
        description : "Throw 2000 rocks at other users"
    },
    "The Exalted" : {
        emoji: ":crown:",
        score: 20,
        description: "Become Glorified by Bender"
    },
    "Rolechecker" : {
        emoji: ":scroll:",
        score: 15,
        description : "Win the TOS August 2017 Tournament"
    },
    "Confirmed Not Hitler" : {
        emoji: ":white_check_mark:",
        score: 15,
        description : "Win the SH August 2017 Tournament"
    }
}


module.exports.checkForAchievements = function(discordUserId, data, message, calledByError, mentionedUser){
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
                        exports.checkForAchievements(discordUserId, data, message, true, mentionedUser);
                    }

                })
            }
            else{
                var achievementEarner = message.author;
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
                            achievementEmbedBuilder(message, "Nice guy", achievementEarner);
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
                            achievementEmbedBuilder(message, "Apologetic geek", achievementEarner);
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
                            achievementEmbedBuilder(message, "Host", achievementEarner);
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
                            achievementEmbedBuilder(message, "Adventure girl", achievementEarner);
                        }
                    })
                }

                if(statistics.data.thrownatcount && 
                statistics.data.thrownatcount >= 350 && 
                (data.achievements === null || data.achievements.indexOf("Stripper") == -1)){
                    // the achievement earner is the MENTIONED USER
                    profileDB.updateAchievements(mentionedUser.id, "{Stripper}", function(err, r){
                        if (err){
                            console.log(err);
                        }
                        {
                            
                            achievementEarner = mentionedUser
                            achievementEmbedBuilder(message, "Stripper", achievementEarner);
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
                            achievementEmbedBuilder(message, "Make it rain", achievementEarner);
                        }
                    })
                }

                if(statistics.data.rocksthrown && 
                statistics.data.rocksthrown >= 2000 && 
                (data.achievements === null || data.achievements.indexOf("Executioner") == -1)){

                    profileDB.updateAchievements(discordUserId, "{Executioner}", function(err, r){
                        if (err){
                            console.log(err);
                        }
                        {
                            achievementEmbedBuilder(message, "Executioner", achievementEarner);
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
                            achievementEmbedBuilder(message, "Get a room", achievementEarner);
                        }
                    })
                }
                
                if(data.tacostands && 
                data.tacostands >= 15 &&
                (data.achievements === null || data.achievements.indexOf("Fidel cashflow") == -1 )){
                    profileDB.updateAchievements(discordUserId, "{Fidel cashflow}", function(err, r){
                        if (err){
                            console.log(err);
                        }
                        {
                            achievementEmbedBuilder(message, "Fidel cashflow", achievementEarner);
                        }
                    })
                }

                if(data.tacos && 
                data.tacos >= 100000 && 
                (data.achievements === null || data.achievements.indexOf("Hoarder") == -1)){

                    profileDB.updateAchievements(discordUserId, "{Hoarder}", function(err, r){
                        if (err){
                            console.log(err);
                        }
                        {
                            achievementEmbedBuilder(message, "Hoarder", achievementEarner);
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
                            achievementEmbedBuilder(message, "Hand work", achievementEarner);
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
                            achievementEmbedBuilder(message, "Luck is on your side", achievementEarner);
                        }
                    })
                }
                if(data.attendees && 
                    (data.attendees >= 50) && 
                    (data.achievements === null || data.achievements.indexOf("Miss Popularity") == -1)){
    
                        profileDB.updateAchievements(discordUserId, "{Miss Popularity}", function(err, r){
                            if (err){
                                console.log(err);
                            }
                            {
                                achievementEmbedBuilder(message, "Miss Popularity", achievementEarner);
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
                            achievementEmbedBuilder(message, "Harvester", achievementEarner);
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
                            achievementEmbedBuilder(message, "Harvester", achievementEarner);
                        }
                    })
                }
            }
        })
    }
}

function achievementEmbedBuilder(message, achievementName, achievementEarner){
    const embed = new Discord.RichEmbed()
    .setTitle(achievementEarner.username + " has earned the achievement " + achievementName + " " + achievementsData[achievementName].emoji)
    .setColor(0x00AE86)
    .setDescription(achievementsData[achievementName].description)
    .setThumbnail(achievementEarner.avatarURL)
    message.channel.send({embed});
}

module.exports.achievementStringBuilder = function(achievements, long){
    if (long){
        var achievementStrings = [];

        var achievementString = "";
        for (var ach in achievements){
            // append each achievmenet string
            if (achievementString.length > 900){
                achievementStrings.push(achievementString);
                achievementString = "";
                achievementString = achievementString + (achievementsData[achievements[ach]].emoji) + " **" + achievements[ach] + "** - " + achievementsData[achievements[ach]].description +  " \n"                
            }
            if (achievementsData[achievements[ach]]){
                achievementString = achievementString + (achievementsData[achievements[ach]].emoji) + " **" + achievements[ach] + "** - " + achievementsData[achievements[ach]].description +  " \n"
            }
        }
        if (achievementString.length > 0){
            achievementStrings.push(achievementString);
        }
        if (achievementString.length == 0 && achievementStrings.length == 0){
            achievementStrings.push("No achievements")
            return achievementStrings
        }
        else{
            return achievementStrings;
        }
    }
    else{
        var achievementString = "";
        for (var ach in achievements){
            // append each achievmenet string
            if (achievementsData[achievements[ach]]){
                achievementString = achievementString + (achievementsData[achievements[ach]].emoji) +  " "
            }
        }
        if (achievementString.length == 0){
            return "No achievements"
        }
        else{
            return achievementString;
        }
    }
}